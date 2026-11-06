import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { engine, REGION_HOME } from './engine';
import { fresnelMaterial, pointsMaterial, radialTexture, threadMaterial } from './shaders';
import { HUMAN_NATURE, TOPICS, TRADITIONS } from '../data/catalog';

// WebGL environment: atmosphere + four luminous region structures + the
// threads that connect them + glow halos behind the DOM nodes.
// Everything positional is read from `engine` every frame.

type Mat = THREE.ShaderMaterial;

// Muted mineral pigments, assigned to traditions in fixed curriculum order
// (deliberately not by cultural association).
const TRAD_COLORS = ['#7d9cc4', '#d8b46a', '#79a993', '#b9776d', '#a596c6', '#c9a07a', '#8fa4ad'];

function addAttr(g: THREE.BufferGeometry, name: string, arr: number[], size: number) {
  g.setAttribute(name, new THREE.Float32BufferAttribute(arr, size));
}

/** Build one LineSegments object from many polylines (one draw call). */
function polylines(lines: { pts: THREE.Vector3[]; phase: number; color?: THREE.Color }[], mat: Mat) {
  const pos: number[] = [], u: number[] = [], ph: number[] = [], col: number[] = [];
  for (const l of lines) {
    const n = l.pts.length;
    const c = l.color ?? new THREE.Color(1, 1, 1);
    for (let i = 0; i < n - 1; i++) {
      for (const j of [i, i + 1]) {
        const p = l.pts[j];
        pos.push(p.x, p.y, p.z);
        u.push(j / (n - 1));
        ph.push(l.phase);
        col.push(c.r, c.g, c.b);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  addAttr(g, 'position', pos, 3);
  addAttr(g, 'aU', u, 1);
  addAttr(g, 'aPhase', ph, 1);
  addAttr(g, 'aColor', col, 3);
  return new THREE.LineSegments(g, mat);
}

function pointCloud(pts: THREE.Vector3[], sizes: number[], mat: Mat, colors?: THREE.Color[]) {
  const g = new THREE.BufferGeometry();
  addAttr(g, 'position', pts.flatMap((p) => [p.x, p.y, p.z]), 3);
  addAttr(g, 'aSize', sizes, 1);
  addAttr(g, 'aPhase', pts.map(() => Math.random()), 1);
  addAttr(g, 'aAlpha', pts.map(() => 1), 1);
  addAttr(g, 'aColor', (colors ?? pts.map(() => new THREE.Color(1, 1, 1))).flatMap((c) => [c.r, c.g, c.b]), 3);
  return new THREE.Points(g, mat);
}

interface RegionObj {
  group: THREE.Group;
  mats: Mat[];
  baseOpacity: number[];
  tick: (t: number) => void;
}

// ── History & Traditions: a slowly turning spindle of warp threads ─────────
function buildHistory(): RegionObj {
  const group = new THREE.Group();
  const mat = threadMaterial({ flow: 0.07, base: 0.2, pulses: 1.2 });
  mat.uniforms.uUseAttr.value = 1;
  const lines: { pts: THREE.Vector3[]; phase: number; color: THREE.Color }[] = [];
  const knots: THREE.Vector3[] = [], knotSizes: number[] = [], knotCols: THREE.Color[] = [];
  TRADITIONS.forEach((tr, b) => {
    const base = (b / TRADITIONS.length) * Math.PI * 2;
    const col = new THREE.Color(TRAD_COLORS[b]);
    for (let k = 0; k < 8; k++) {
      const off = (k - 3.5) * 0.028;
      const rr = 1.22 + ((k % 3) - 1) * 0.05;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 72; i++) {
        const u = i / 72;
        const th = base + off + u * 1.05;
        const wob = Math.sin(u * 9 + b + k) * 0.035;
        const pinch = 0.82 + 0.18 * Math.sin(u * Math.PI); // spindle silhouette
        pts.push(new THREE.Vector3(Math.cos(th) * (rr + wob) * pinch, 2.75 - u * 5.5, Math.sin(th) * (rr + wob) * pinch));
      }
      lines.push({ pts, phase: Math.random(), color: col });
    }
    // Course knots: one per course of the tradition, spaced along the bundle.
    for (let i = 0; i < tr.count; i++) {
      const u = 0.12 + (0.76 * (i + 0.5)) / tr.count;
      const th = base + u * 1.05;
      const pinch = 0.82 + 0.18 * Math.sin(u * Math.PI);
      knots.push(new THREE.Vector3(Math.cos(th) * 1.22 * pinch, 2.75 - u * 5.5, Math.sin(th) * 1.22 * pinch));
      knotSizes.push(tr.id === 'cn' && i === 0 ? 0.9 : 0.55);
      knotCols.push(tr.id === 'cn' && i === 0 ? new THREE.Color('#ffe2a0') : col.clone().lerp(new THREE.Color('#fff'), 0.5));
    }
  });
  const threads = polylines(lines, mat);
  const kMat = pointsMaterial({ size: 1, twinkle: 0.25, useAttr: true });
  const knotObj = pointCloud(knots, knotSizes, kMat, knotCols);
  // Spindle caps.
  const capMat = threadMaterial({ color: '#e3b874', flow: 0.05, base: 0.35, pulses: 2 });
  const caps = polylines(
    [2.85, -2.85].map((y, i) => ({
      pts: Array.from({ length: 97 }, (_, j) => {
        const a = (j / 96) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a) * 1.05, y, Math.sin(a) * 1.05);
      }),
      phase: i * 0.5,
    })),
    capMat,
  );
  group.add(threads, knotObj, caps);
  return {
    group,
    mats: [mat, kMat, capMat],
    baseOpacity: [1, 1, 0.7],
    tick: (t) => (group.rotation.y = t * 0.07),
  };
}

// ── Philosophical Questions: a luminous cluster crossed by weft orbits ─────
function buildQuestions(): RegionObj {
  const group = new THREE.Group();
  const pts: THREE.Vector3[] = [], sizes: number[] = [];
  for (let i = 0; i < 650; i++) {
    const v = new THREE.Vector3().randomDirection();
    const r = 0.45 + Math.pow(Math.random(), 0.6) * 1.15;
    pts.push(v.multiplyScalar(r));
    sizes.push(0.12 + Math.random() * 0.28);
  }
  const dustMat = pointsMaterial({ color: '#a9c6ff', size: 1, twinkle: 0.6 });
  const dust = pointCloud(pts, sizes, dustMat);
  const ringMat = threadMaterial({ color: '#9cc0ff', flow: 0.09, base: 0.26, pulses: 3 });
  const rings = new THREE.Group();
  const ringObjs: THREE.Object3D[] = [];
  [
    [1.75, 0.35, 0.1],
    [1.95, -0.5, 0.6],
    [2.2, 1.2, -0.4],
  ].forEach(([r, rx, rz], i) => {
    const o = polylines(
      [
        {
          pts: Array.from({ length: 161 }, (_, j) => {
            const a = (j / 160) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r);
          }),
          phase: i * 0.33,
        },
      ],
      ringMat,
    );
    o.rotation.set(rx, 0, rz);
    rings.add(o);
    ringObjs.push(o);
  });
  const coreMat = pointsMaterial({ color: '#dfe9ff', size: 1, twinkle: 0.2 });
  const core = pointCloud([new THREE.Vector3()], [3.2], coreMat);
  group.add(dust, rings, core);
  return {
    group,
    mats: [dustMat, ringMat, coreMat],
    baseOpacity: [0.85, 1, 0.55],
    tick: (t) => {
      dust.rotation.y = t * 0.05;
      ringObjs.forEach((o, i) => (o.rotation.y = t * (0.12 + i * 0.05) * (i % 2 ? -1 : 1)));
    },
  };
}

// ── Cross-Tradition Dialogue: three interlacing knots of different colours ─
function buildDialogue(): RegionObj {
  const group = new THREE.Group();
  const mat = threadMaterial({ flow: 0.06, base: 0.3, pulses: 4 });
  mat.uniforms.uUseAttr.value = 1;
  const cols = ['#e59bbd', '#e3c27e', '#8fb3f0'].map((c) => new THREE.Color(c));
  const curves: THREE.Vector3[][] = [];
  const lines = cols.map((col, k) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 420; i++) {
      const s = (i / 420) * Math.PI * 2;
      const p = 2, q = 3;
      const r = 1.0 + 0.38 * Math.cos(q * s);
      const v = new THREE.Vector3(r * Math.cos(p * s), 0.38 * Math.sin(q * s) * 1.6, r * Math.sin(p * s));
      v.applyAxisAngle(new THREE.Vector3(0, 1, 0), (k * Math.PI * 2) / 3 / 2);
      v.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.35 * (k - 1));
      pts.push(v);
    }
    curves.push(pts);
    return { pts, phase: k / 3, color: col };
  });
  const knot = polylines(lines, mat);
  // Messengers: bright motes running along the knots.
  const motes = Array.from({ length: 9 }, () => new THREE.Vector3());
  const moteMat = pointsMaterial({ color: '#fff3f8', size: 1, twinkle: 0.1 });
  const moteObj = pointCloud(motes, motes.map(() => 0.9), moteMat);
  group.add(knot, moteObj);
  const posAttr = moteObj.geometry.getAttribute('position') as THREE.BufferAttribute;
  return {
    group,
    mats: [mat, moteMat],
    baseOpacity: [1, 1],
    tick: (t) => {
      group.rotation.y = t * 0.1;
      group.rotation.x = Math.sin(t * 0.13) * 0.18;
      for (let i = 0; i < motes.length; i++) {
        const c = curves[i % 3];
        const idx = Math.floor(((t * 0.035 + i / motes.length) % 1) * (c.length - 1));
        posAttr.setXYZ(i, c[idx].x, c[idx].y, c[idx].z);
      }
      posAttr.needsUpdate = true;
    },
  };
}

// ── Philosophical Methods: a precise, counter-rotating crystal lattice ─────
function buildMethods(): RegionObj {
  const group = new THREE.Group();
  const outer = new THREE.IcosahedronGeometry(0.95, 0);
  const inner = new THREE.OctahedronGeometry(0.48, 0);
  const edgeLines = (geo: THREE.BufferGeometry, mat: Mat) => {
    const e = new THREE.EdgesGeometry(geo);
    const p = e.getAttribute('position') as THREE.BufferAttribute;
    const lines: { pts: THREE.Vector3[]; phase: number }[] = [];
    for (let i = 0; i < p.count; i += 2) {
      const a = new THREE.Vector3().fromBufferAttribute(p, i), b = new THREE.Vector3().fromBufferAttribute(p, i + 1);
      lines.push({ pts: Array.from({ length: 9 }, (_, k) => a.clone().lerp(b, k / 8)), phase: Math.random() });
    }
    return polylines(lines, mat);
  };
  const oMat = threadMaterial({ color: '#93dcc4', flow: 0.25, base: 0.45, pulses: 1 });
  const iMat = threadMaterial({ color: '#e6fff6', flow: 0.35, base: 0.35, pulses: 1 });
  const o = edgeLines(outer, oMat), ii = edgeLines(inner, iMat);
  const shellMat = fresnelMaterial('#7fd6bb');
  const shell = new THREE.Mesh(outer, shellMat);
  const vp = outer.getAttribute('position') as THREE.BufferAttribute;
  const verts: THREE.Vector3[] = [];
  for (let i = 0; i < vp.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(vp, i);
    if (!verts.some((w) => w.distanceTo(v) < 1e-3)) verts.push(v);
  }
  const vMat = pointsMaterial({ color: '#d9fff2', size: 1, twinkle: 0.5 });
  const vObj = pointCloud(verts, verts.map(() => 0.55), vMat);
  const outerG = new THREE.Group();
  outerG.add(o, shell, vObj);
  group.add(outerG, ii);
  return {
    group,
    mats: [oMat, iMat, shellMat as Mat, vMat],
    baseOpacity: [0.75, 0.6, 0.55, 0.7],
    tick: (t) => {
      outerG.rotation.set(t * 0.09, t * 0.16, 0);
      ii.rotation.set(-t * 0.2, -t * 0.12, t * 0.05);
    },
  };
}

const PAIRS: [string, string][] = [
  ['history', 'questions'],
  ['questions', 'dialogue'],
  ['dialogue', 'history'],
  ['methods', 'history'],
  ['methods', 'questions'],
  ['methods', 'dialogue'],
];

export class World {
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  composer: EffectComposer;
  bloom: UnrealBloomPass;
  regions: Record<string, RegionObj>;
  connections: { line: THREE.Line; mat: Mat; a: string; b: string; geo: THREE.BufferGeometry }[] = [];
  nebulae: THREE.Sprite[] = [];
  stars: THREE.Points[] = [];
  halos: THREE.Points;
  haloIds: string[];
  ground: THREE.LineSegments;
  dust: THREE.Points;
  allMats: Mat[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setClearColor('#07080d');
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.scene.fog = new THREE.FogExp2('#07080d', 0.012);

    // Atmosphere: nebula veils at several depths (parallax comes from the camera drift).
    const neb = [
      ['rgba(64,74,160,0.30)', -30, -8, -42, 46],
      ['rgba(26,100,112,0.24)', 26, 9, -48, 52],
      ['rgba(112,46,104,0.22)', 6, -14, -36, 40],
      ['rgba(170,120,62,0.12)', -18, 12, -30, 30],
      ['rgba(56,64,140,0.18)', 34, -12, -26, 28],
      ['rgba(36,80,140,0.14)', -4, 4, -55, 70],
    ] as const;
    for (const [col, x, y, z, s] of neb) {
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: radialTexture(col), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }),
      );
      sp.position.set(x, y, z);
      sp.scale.set(s, s, 1);
      this.scene.add(sp);
      this.nebulae.push(sp);
    }
    // Stars in three shells.
    [
      [900, 60, 0.5],
      [700, 35, 0.7],
      [260, 20, 0.95],
    ].forEach(([n, r, s]) => {
      const pts: THREE.Vector3[] = [], sizes: number[] = [], cols: THREE.Color[] = [];
      for (let i = 0; i < n; i++) {
        const v = new THREE.Vector3().randomDirection().multiplyScalar(r * (0.75 + Math.random() * 0.5));
        v.z = -Math.abs(v.z) - 4;
        pts.push(v);
        sizes.push(s * (0.4 + Math.random()));
        cols.push(new THREE.Color().setHSL(0.6 + Math.random() * 0.12, 0.35, 0.72 + Math.random() * 0.25));
      }
      const m = pointsMaterial({ size: 1, twinkle: 0.5, useAttr: true });
      const p = pointCloud(pts, sizes, m, cols);
      this.stars.push(p);
      this.scene.add(p);
      this.allMats.push(m);
    });
    // A faint astrolabe-like ground of concentric rings gives the space a floor.
    const gMat = threadMaterial({ color: '#5d6fa8', flow: 0.02, base: 0.12, pulses: 1 });
    const rings: { pts: THREE.Vector3[]; phase: number }[] = [];
    for (let r = 2; r <= 22; r += 2.2) {
      rings.push({
        pts: Array.from({ length: 181 }, (_, j) => {
          const a = (j / 180) * Math.PI * 2;
          return new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r);
        }),
        phase: r / 22,
      });
    }
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      rings.push({ pts: [0, 1].map((s) => new THREE.Vector3(Math.cos(a) * (2 + s * 20), 0, Math.sin(a) * (2 + s * 20))), phase: k / 12 });
    }
    this.ground = polylines(rings, gMat);
    this.ground.position.set(0, -5.2, -4);
    this.scene.add(this.ground);
    this.allMats.push(gMat);
    // Near dust drifting in front of the structures.
    const dpts: THREE.Vector3[] = [];
    for (let i = 0; i < 260; i++) dpts.push(new THREE.Vector3((Math.random() - 0.5) * 26, (Math.random() - 0.5) * 14, Math.random() * 9 - 3));
    const dMat = pointsMaterial({ color: '#c9d4ff', size: 1, twinkle: 0.7 });
    this.dust = pointCloud(dpts, dpts.map(() => 0.08 + Math.random() * 0.16), dMat);
    this.scene.add(this.dust);
    this.allMats.push(dMat);

    this.regions = { history: buildHistory(), questions: buildQuestions(), dialogue: buildDialogue(), methods: buildMethods() };
    for (const r of Object.values(this.regions)) {
      this.scene.add(r.group);
      this.allMats.push(...r.mats);
    }

    // Connections between regions.
    for (const [a, b] of PAIRS) {
      const geo = new THREE.BufferGeometry();
      const n = 64;
      addAttr(geo, 'position', new Array(n * 3).fill(0), 3);
      addAttr(geo, 'aU', Array.from({ length: n }, (_, i) => i / (n - 1)), 1);
      addAttr(geo, 'aPhase', new Array(n).fill(Math.random()), 1);
      addAttr(geo, 'aColor', new Array(n * 3).fill(1), 3);
      const mat = threadMaterial({ color: '#d9cfb4', flow: 0.16, base: 0.12, pulses: 1 });
      const line = new THREE.Line(geo, mat);
      line.frustumCulled = false;
      this.scene.add(line);
      this.connections.push({ line, mat, a, b, geo });
      this.allMats.push(mat);
    }

    // Glow halos behind DOM nodes (topics, questions, courses).
    this.haloIds = [
      ...TOPICS.map((t) => 'T:' + t.id),
      ...HUMAN_NATURE.questions.map((q) => 'Q:' + q.id),
      ...engine.courseOrder.map((c) => 'C:' + c),
    ];
    const hpts = this.haloIds.map(() => new THREE.Vector3());
    const hcols = this.haloIds.map((id) =>
      new THREE.Color(id === 'C:CN1' ? '#ffd88a' : id.startsWith('T:') ? '#a9c8ff' : id.startsWith('Q:') ? '#ffe7bd' : '#cdd8ff'),
    );
    const hMat = pointsMaterial({ size: 1, twinkle: 0.15, useAttr: true });
    this.halos = pointCloud(hpts, this.haloIds.map(() => 1), hMat, hcols);
    this.halos.frustumCulled = false;
    this.scene.add(this.halos);
    this.allMats.push(hMat);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, engine.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1440, 900), 0.72, 0.55, 0.16);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  setSize(w: number, h: number) {
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.bloom.resolution.set(w, h);
  }

  private tmpA = new THREE.Vector3();
  private tmpB = new THREE.Vector3();
  private tmpC = new THREE.Vector3();

  render() {
    const t = engine.time;
    for (const m of this.allMats) if (m.uniforms.uTime) m.uniforms.uTime.value = t;

    for (const [k, r] of Object.entries(this.regions)) {
      const e = engine.get('R:' + k)!;
      r.group.position.copy(e.pos);
      r.group.scale.setScalar(e.scale);
      r.tick(t);
      r.mats.forEach((m, i) => {
        m.uniforms.uOpacity.value = e.alpha * r.baseOpacity[i];
        if (m.uniforms.uIntensity) m.uniforms.uIntensity.value = engine.emph[k];
      });
    }

    for (const c of this.connections) {
      const ea = engine.get('R:' + c.a)!, eb = engine.get('R:' + c.b)!;
      const A = this.tmpA.copy(ea.pos), B = this.tmpB.copy(eb.pos);
      const dir = this.tmpC.copy(B).sub(A).normalize();
      A.addScaledVector(dir, 1.5 * ea.scale);
      B.addScaledVector(dir, -1.5 * eb.scale);
      const mid = A.clone().add(B).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.9, 1.1));
      const p = c.geo.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i++) {
        const s = i / (p.count - 1);
        const q = A.clone().multiplyScalar((1 - s) * (1 - s)).addScaledVector(mid, 2 * s * (1 - s)).addScaledVector(B, s * s);
        p.setXYZ(i, q.x, q.y, q.z);
      }
      p.needsUpdate = true;
      const emph = Math.max(engine.emph[c.a], engine.emph[c.b]);
      c.mat.uniforms.uOpacity.value = Math.min(ea.alpha, eb.alpha) * (engine.view === 'home' ? 1 : 0.4);
      c.mat.uniforms.uIntensity.value = emph;
    }

    const hp = this.halos.geometry.getAttribute('position') as THREE.BufferAttribute;
    const ha = this.halos.geometry.getAttribute('aAlpha') as THREE.BufferAttribute;
    const hs = this.halos.geometry.getAttribute('aSize') as THREE.BufferAttribute;
    this.haloIds.forEach((id, i) => {
      const e = engine.get(id)!;
      hp.setXYZ(i, e.pos.x, e.pos.y, e.pos.z);
      const hov = engine.hover === id ? 1.5 : 1;
      ha.setX(i, e.alpha * (id.startsWith('T:') && engine.view === 'home' ? 0.9 : 0.75));
      hs.setX(i, (id === 'C:CN1' ? 2.6 : id.startsWith('T:') ? 1.9 : id.startsWith('Q:') ? 1.6 : 1.3) * e.scale * hov);
    });
    hp.needsUpdate = ha.needsUpdate = hs.needsUpdate = true;

    this.nebulae.forEach((n, i) => {
      n.material.rotation = t * 0.01 * (i % 2 ? 1 : -1);
      (n.material as THREE.SpriteMaterial).opacity = 0.85 + Math.sin(t * 0.18 + i * 1.3) * 0.15;
    });
    this.dust.rotation.y = Math.sin(t * 0.03) * 0.2;
    this.dust.position.y = Math.sin(t * 0.07) * 0.4;
    this.ground.rotation.y = t * 0.01;
    this.composer.render();
  }

  dispose() {
    this.renderer.dispose();
  }
}

export const regionHomePosition = REGION_HOME;

import * as THREE from 'three';
import { HUMAN_NATURE, TOPICS, topicCourseCodes } from '../data/catalog';

// The engine is the single source of spatial truth. It holds the camera and
// every navigable entity (regions, topics, questions, courses), animates them
// toward per-view targets, and projects them to screen coordinates.
// The WebGL scene, the SVG thread layer and the DOM labels all read from it,
// so they can never drift apart — and the DOM/SVG layers still work when
// WebGL is unavailable.

export type View =
  | 'home'
  | 'questions'
  | 'topic'
  | 'region-history'
  | 'region-dialogue'
  | 'region-methods'
  | 'course'
  | 'reader';

export interface Ent {
  id: string;
  pos: THREE.Vector3;
  tgt: THREE.Vector3;
  alpha: number;
  tgtAlpha: number;
  scale: number;
  tgtScale: number;
  delay: number;
}

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

export const REGION_HOME: Record<string, THREE.Vector3> = {
  history: V(-5.5, -0.45, -1.8),
  questions: V(3.8, 0.25, 0.4),
  dialogue: V(-0.4, 2.85, -5.6),
  methods: V(-0.9, -2.65, 2.0),
};

const TOPIC_CENTER = V(2.1, 0.2, 1.6);
const Q_ANGLES = [36, 12, -12, -36].map((d) => (d * Math.PI) / 180);

class Engine {
  camera = new THREE.PerspectiveCamera(45, 16 / 10, 0.1, 400);
  camPos = V(0, 0, 12.5);
  camLook = V(0, 0.1, -0.5);
  tgtCamPos = V(0, 0, 12.5);
  tgtCamLook = V(0, 0.1, -0.5);
  mouse = new THREE.Vector2();
  smoothMouse = new THREE.Vector2();
  ents = new Map<string, Ent>();
  view: View = 'home';
  topic = 'human-nature';
  hover: string | null = null;
  time = 0;
  reduced = false;
  width = 1440;
  height = 900;
  courseOrder: string[] = [];
  courseAngle = new Map<string, number>();
  /** Emphasis 0..1 per region for the WebGL layer (lerped). */
  emph: Record<string, number> = { history: 0, questions: 0, dialogue: 0, methods: 0 };

  constructor() {
    const add = (id: string, p: THREE.Vector3, alpha = 1) =>
      this.ents.set(id, { id, pos: p.clone(), tgt: p.clone(), alpha, tgtAlpha: alpha, scale: 1, tgtScale: 1, delay: 0 });
    Object.entries(REGION_HOME).forEach(([k, p]) => add('R:' + k, p));
    TOPICS.forEach((t) => add('T:' + t.id, REGION_HOME.questions));
    HUMAN_NATURE.questions.forEach((q) => add('Q:' + q.id, TOPIC_CENTER, 0));
    // Order courses around the fan by the mean angle of the questions they serve.
    const codes = topicCourseCodes();
    const mean = (code: string) => {
      const a: number[] = [];
      HUMAN_NATURE.questions.forEach((q, i) => q.links.some((l) => l.code === code) && a.push(Q_ANGLES[i]));
      return a.reduce((s, x) => s + x, 0) / a.length;
    };
    this.courseOrder = codes.sort((a, b) => mean(b) - mean(a));
    // CN1 (the readable entry) gets a wider slot so its card has room.
    const w = (c: string) => (c === 'CN1' ? 2.6 : 1);
    const total = this.courseOrder.reduce((s, c) => s + w(c), 0) - (w(this.courseOrder[0]) + w(this.courseOrder.at(-1)!)) / 2;
    let cum = 0;
    this.courseOrder.forEach((code, i) => {
      if (i > 0) cum += (w(this.courseOrder[i - 1]) + w(code)) / 2;
      this.courseAngle.set(code, ((54 - (108 * cum) / total) * Math.PI) / 180);
      add('C:' + code, TOPIC_CENTER, 0);
    });
    this.camera.position.copy(this.camPos);
    this.layout();
    this.snap();
  }

  get(id: string) {
    return this.ents.get(id);
  }

  setSize(w: number, h: number) {
    this.width = w;
    this.height = h;
    this.camera.aspect = w / h;
    // Keep the composition framed on narrower desktop windows.
    this.camera.fov = w / h < 1.45 ? 45 + (1.45 - w / h) * 22 : 45;
    this.camera.updateProjectionMatrix();
  }

  setView(v: View, topic?: string) {
    const prev = this.view;
    this.view = v;
    if (topic) this.topic = topic;
    if (v === prev) return;
    // Choreography: stagger the arrival of nodes so the structure "unfolds".
    const enteringTopic = v === 'topic' && prev !== 'course' && prev !== 'reader';
    const enteringQuestions = v === 'questions';
    let i = 0;
    for (const e of this.ents.values()) {
      e.delay = 0;
      if (enteringQuestions && e.id.startsWith('T:')) e.delay = 0.12 + i++ * 0.045;
    }
    if (enteringTopic) {
      HUMAN_NATURE.questions.forEach((q, k) => (this.get('Q:' + q.id)!.delay = 0.25 + k * 0.09));
      this.courseOrder.forEach((c, k) => (this.get('C:' + c)!.delay = 0.55 + k * 0.04));
    }
    if (this.reduced) for (const e of this.ents.values()) e.delay = 0;
  }

  /** Recompute targets for the current view (called every frame). */
  layout() {
    const t = this.time;
    const v = this.view;
    const reg = (k: string) => this.get('R:' + k)!;
    const setR = (k: string, p: THREE.Vector3, a: number, s = 1) => {
      const e = reg(k);
      e.tgt.copy(p);
      e.tgtAlpha = a;
      e.tgtScale = s;
    };
    const qc = REGION_HOME.questions;
    const back = (k: string, dz: number, a: number) => setR(k, REGION_HOME[k].clone().add(V(0, 0, -dz)), a);

    // ── regions + camera ──
    if (v === 'home') {
      const h = this.hover?.startsWith('R:') ? this.hover.slice(2) : null;
      for (const k of Object.keys(REGION_HOME)) setR(k, REGION_HOME[k], h && h !== k ? 0.42 : 1, h === k ? 1.1 : 1);
      this.tgtCamPos.set(0, 0, 12.5);
      this.tgtCamLook.set(0, 0.1, -0.5);
    } else if (v === 'questions') {
      back('history', 5, 0.14);
      back('dialogue', 4, 0.14);
      back('methods', 6, 0.1);
      setR('questions', qc, 0.6, 1.8);
      this.tgtCamPos.set(qc.x - 1.1, qc.y + 0.25, 8.4);
      this.tgtCamLook.set(qc.x - 1.1, qc.y, qc.z);
    } else if (v === 'topic' || v === 'course' || v === 'reader') {
      back('history', 7, 0.08);
      back('dialogue', 5, 0.08);
      back('methods', 7, 0.06);
      setR('questions', qc.clone().add(V(0, 0, -1.5)), v === 'topic' ? 0.32 : 0.2, 2.4);
      const look = TOPIC_CENTER.clone().add(V(2.35, 0, 0));
      if (v === 'topic') {
        this.tgtCamPos.copy(look).add(V(0, 0.3, 8.1));
        this.tgtCamLook.copy(look);
      } else {
        const cn1 = this.get('C:CN1')!.tgt;
        this.tgtCamPos.copy(cn1).add(V(-0.4, 0.1, 2.2));
        this.tgtCamLook.copy(cn1);
      }
    } else {
      const which = v.replace('region-', '');
      for (const k of Object.keys(REGION_HOME)) {
        if (k === which) continue;
        back(k, 6, 0.08);
      }
      const p = REGION_HOME[which];
      setR(which, p, 1, which === 'methods' ? 1.5 : 1.25);
      const look = p.clone().add(V(2.3, 0, 0));
      this.tgtCamPos.copy(look).add(V(0, 0.25, which === 'dialogue' ? 6.8 : 6.2));
      this.tgtCamLook.copy(look);
    }

    // ── topics ──
    TOPICS.forEach((tp, i) => {
      const e = this.get('T:' + tp.id)!;
      const n = TOPICS.length;
      if (v === 'home' || v.startsWith('region')) {
        // Fibonacci sphere inside the question cluster, slowly rotating.
        const y = 1 - (2 * (i + 0.5)) / n;
        const r = Math.sqrt(1 - y * y);
        const th = i * 2.39996 + t * 0.12;
        e.tgt.set(qc.x + Math.cos(th) * r * 1.25, qc.y + y * 1.15, qc.z + Math.sin(th) * r * 1.25);
        e.tgtAlpha = v === 'home' ? 0.85 : 0.1;
        e.tgtScale = 0.4;
      } else if (v === 'questions') {
        // The open topic sits on the right, facing the direction it will unfold.
        const a = Math.PI / 2 - ((i - 2.5) / n) * Math.PI * 2;
        const bob = Math.sin(t * 0.6 + i) * 0.05;
        e.tgt.set(qc.x + Math.cos(a) * 3.3, qc.y + Math.sin(a) * 1.95 + bob, qc.z + 0.4 + Math.sin(a) * 0.5);
        e.tgtAlpha = 1;
        e.tgtScale = this.hover === e.id ? 1.25 : 1;
      } else {
        if (tp.id === this.topic) {
          e.tgt.copy(TOPIC_CENTER);
          e.tgtAlpha = 1;
          e.tgtScale = 1.5;
        } else {
          const a = Math.PI / 2 - (i / n) * Math.PI * 2;
          e.tgt.set(TOPIC_CENTER.x + 2.2 + Math.cos(a) * 7.2, TOPIC_CENTER.y + Math.sin(a) * 4.6, TOPIC_CENTER.z - 3);
          e.tgtAlpha = v === 'topic' ? 0.32 : 0.12;
          e.tgtScale = 0.6;
        }
      }
    });

    // ── questions + courses of the open topic ──
    const open = v === 'topic' || v === 'course' || v === 'reader';
    HUMAN_NATURE.questions.forEach((q, i) => {
      const e = this.get('Q:' + q.id)!;
      if (open) {
        const a = Q_ANGLES[i];
        e.tgt.set(TOPIC_CENTER.x + Math.cos(a) * 2.55, TOPIC_CENTER.y + Math.sin(a) * 2.6, TOPIC_CENTER.z + 0.25);
        e.tgt.y += Math.sin(t * 0.5 + i * 1.7) * 0.04;
        e.tgtAlpha = v === 'topic' ? 1 : 0.35;
      } else {
        e.tgt.copy(TOPIC_CENTER);
        e.tgtAlpha = 0;
      }
      e.tgtScale = 1;
    });
    this.courseOrder.forEach((code, i) => {
      const e = this.get('C:' + code)!;
      if (open) {
        const a = this.courseAngle.get(code)!;
        // Alternate radii so neighbouring labels interleave instead of stacking.
        const r = code === 'CN1' ? 4.85 : 4.85 + (i % 2) * 0.75;
        e.tgt.set(
          TOPIC_CENTER.x + Math.cos(a) * r,
          TOPIC_CENTER.y + Math.sin(a) * 3.35,
          TOPIC_CENTER.z + (code === 'CN1' ? 0.7 : (i % 3) * -0.35),
        );
        e.tgt.y += Math.sin(t * 0.45 + i * 2.1) * 0.035;
        e.tgtAlpha = v === 'topic' ? 1 : code === 'CN1' ? 1 : 0.3;
        e.tgtScale = code === 'CN1' ? 1.35 : 1;
      } else {
        e.tgt.copy(TOPIC_CENTER);
        e.tgtAlpha = 0;
        e.tgtScale = 0.5;
      }
    });
  }

  snap() {
    for (const e of this.ents.values()) {
      e.pos.copy(e.tgt);
      e.alpha = e.tgtAlpha;
      e.scale = e.tgtScale;
    }
    this.camPos.copy(this.tgtCamPos);
    this.camLook.copy(this.tgtCamLook);
  }

  step(dt: number) {
    dt = Math.min(dt, 0.05);
    if (!this.reduced) this.time += dt;
    this.layout();
    const kE = this.reduced ? 40 : 3.6;
    const kC = this.reduced ? 40 : 2.1;
    const fE = 1 - Math.exp(-kE * dt);
    const fC = 1 - Math.exp(-kC * dt);
    for (const e of this.ents.values()) {
      if (e.delay > 0) {
        e.delay -= dt;
        continue;
      }
      e.pos.lerp(e.tgt, fE);
      e.alpha += (e.tgtAlpha - e.alpha) * fE;
      e.scale += (e.tgtScale - e.scale) * fE;
    }
    this.camPos.lerp(this.tgtCamPos, fC);
    this.camLook.lerp(this.tgtCamLook, fC);
    // Pointer parallax: the camera drifts, the look target stays fixed, so
    // near and far structures separate in depth.
    const fm = 1 - Math.exp(-2.5 * dt);
    this.smoothMouse.lerp(this.reduced ? new THREE.Vector2() : this.mouse, fm);
    const breathe = this.reduced ? 0 : Math.sin(this.time * 0.25) * 0.08;
    this.camera.position.set(
      this.camPos.x + this.smoothMouse.x * 0.55,
      this.camPos.y + this.smoothMouse.y * 0.32 + breathe,
      this.camPos.z,
    );
    this.camera.lookAt(this.camLook);
    this.camera.updateMatrixWorld();
    // Region emphasis for the WebGL layer.
    for (const k of Object.keys(this.emph)) {
      const on =
        (this.view === 'home' && this.hover === 'R:' + k) ||
        (this.view === 'questions' && k === 'questions') ||
        this.view === 'region-' + k;
      this.emph[k] += ((on ? 1 : 0) - this.emph[k]) * fE;
    }
  }

  private v = new THREE.Vector3();
  project(id: string, cam: THREE.Camera = this.camera) {
    const e = this.get(id);
    if (!e) return null;
    return this.projectPoint(e.pos, cam, e);
  }
  projectPoint(p: THREE.Vector3, cam: THREE.Camera = this.camera, e?: Ent) {
    this.v.copy(p).project(cam);
    return {
      x: ((this.v.x + 1) / 2) * this.width,
      y: ((1 - this.v.y) / 2) * this.height,
      z: this.v.z,
      alpha: e ? e.alpha : 1,
      scale: e ? e.scale : 1,
    };
  }

  /** Where an entity will appear once the current transition settles. */
  projectTarget(id: string) {
    const e = this.get(id);
    if (!e) return null;
    const cam = this.camera.clone();
    cam.position.copy(this.tgtCamPos);
    cam.lookAt(this.tgtCamLook);
    cam.updateMatrixWorld();
    return this.projectPoint(e.tgt, cam, e);
  }
}

export const engine = new Engine();

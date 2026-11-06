import * as THREE from 'three';

// Shared materials. All luminous materials are additive and depth-write-free,
// so overlapping threads accumulate light like silk under a lamp instead of
// occluding each other.

/** A thread with light pulses travelling along it (aU = 0..1 along the thread). */
export function threadMaterial(opts: { color?: THREE.ColorRepresentation; flow?: number; base?: number; pulses?: number }) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: false,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(opts.color ?? '#ffffff') },
      uOpacity: { value: 1 },
      uIntensity: { value: 0 },
      uFlow: { value: opts.flow ?? 0.12 },
      uBase: { value: opts.base ?? 0.22 },
      uPulses: { value: opts.pulses ?? 1.5 },
      uUseAttr: { value: 0 },
    },
    vertexShader: /* glsl */ `
      attribute float aU;
      attribute float aPhase;
      attribute vec3 aColor;
      varying float vU;
      varying float vPhase;
      varying vec3 vCol;
      void main() {
        vU = aU; vPhase = aPhase; vCol = aColor;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; uniform float uTime; uniform float uOpacity; uniform float uIntensity;
      uniform float uFlow; uniform float uBase; uniform float uPulses; uniform float uUseAttr;
      varying float vU; varying float vPhase; varying vec3 vCol;
      void main() {
        float edge = smoothstep(0.0, 0.07, vU) * smoothstep(1.0, 0.93, vU);
        float p = fract(vU * uPulses - uTime * uFlow * (1.0 + uIntensity * 1.5) + vPhase);
        float pulse = smoothstep(0.0, 0.035, p) * smoothstep(0.17, 0.035, p);
        vec3 col = mix(uColor, vCol, uUseAttr);
        float a = (uBase * (0.75 + uIntensity * 0.6) + pulse * (0.55 + uIntensity * 0.9)) * edge * uOpacity;
        gl_FragColor = vec4(col * (0.8 + pulse * 1.4), a);
      }`,
  });
}

/** Soft round sprites with twinkle; per-point size, alpha and colour attributes. */
export function pointsMaterial(opts: { color?: THREE.ColorRepresentation; size?: number; twinkle?: number; useAttr?: boolean }) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(opts.color ?? '#ffffff') },
      uOpacity: { value: 1 },
      uSize: { value: opts.size ?? 1 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.75) },
      uTwinkle: { value: opts.twinkle ?? 0.35 },
      uUseAttr: { value: opts.useAttr ? 1 : 0 },
    },
    vertexShader: /* glsl */ `
      attribute float aSize; attribute float aPhase; attribute float aAlpha; attribute vec3 aColor;
      uniform float uTime; uniform float uSize; uniform float uPixelRatio; uniform float uTwinkle;
      varying float vA; varying vec3 vCol;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float tw = 1.0 - uTwinkle + uTwinkle * (0.5 + 0.5 * sin(uTime * 1.7 + aPhase * 6.283));
        vA = aAlpha * tw; vCol = aColor;
        gl_PointSize = aSize * uSize * uPixelRatio * (260.0 / -mv.z);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; uniform float uOpacity; uniform float uUseAttr;
      varying float vA; varying vec3 vCol;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float core = smoothstep(0.5, 0.0, d);
        float a = core * core * (0.6 + 0.4 * smoothstep(0.18, 0.0, d));
        vec3 col = mix(uColor, vCol, uUseAttr);
        gl_FragColor = vec4(col, a * vA * uOpacity);
      }`,
  });
}

/** Glass-like fresnel shell for the methods crystal. */
export function fresnelMaterial(color: THREE.ColorRepresentation) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { uColor: { value: new THREE.Color(color) }, uOpacity: { value: 1 }, uIntensity: { value: 0 } },
    vertexShader: /* glsl */ `
      varying vec3 vN; varying vec3 vV;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; uniform float uOpacity; uniform float uIntensity;
      varying vec3 vN; varying vec3 vV;
      void main() {
        float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4);
        gl_FragColor = vec4(uColor, f * (0.32 + uIntensity * 0.3) * uOpacity);
      }`,
  });
}

/** Radial-gradient texture for nebula and glow sprites. */
export function radialTexture(inner: string, outer = 'rgba(0,0,0,0)', size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.45, inner.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.35})`));
  grad.addColorStop(1, outer);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

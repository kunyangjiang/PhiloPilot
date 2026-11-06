import { engine } from './engine';
import type { World } from './world';

// One animation loop drives everything: engine → WebGL → SVG threads → DOM
// labels. DOM elements register with an anchor id and are positioned by
// projecting that entity each frame.

interface Anchored {
  el: HTMLElement;
  id: string;
}
interface Thread {
  el: SVGPathElement;
  glow?: SVGPathElement;
  from: string;
  to: string;
  bend: number;
}

const anchored = new Map<HTMLElement, Anchored>();
const threads = new Map<SVGPathElement, Thread>();
let world: World | null = null;
let renderEnabled = true;
let running = false;
let last = 0;

export function setWorld(w: World | null) {
  world = w;
}
export function setRenderEnabled(on: boolean) {
  renderEnabled = on;
}

export function anchor(el: HTMLElement | null, id: string) {
  if (!el) return;
  anchored.set(el, { el, id });
}
export function unanchor(el: HTMLElement | null) {
  if (el) anchored.delete(el);
}
export function thread(el: SVGPathElement | null, from: string, to: string, bend = 0.18, glow?: SVGPathElement | null) {
  if (!el) return;
  el.setAttribute('pathLength', '1'); // lets CSS draw threads in with a 0→1 dash
  threads.set(el, { el, from, to, bend, glow: glow ?? undefined });
}
export function unthread(el: SVGPathElement | null) {
  if (el) threads.delete(el);
}

function frame(now: number) {
  if (!running) return;
  const dt = last ? (now - last) / 1000 : 0.016;
  last = now;
  engine.step(dt);
  if (world && renderEnabled) world.render();

  for (const a of anchored.values()) {
    const p = engine.project(a.id);
    if (!p) continue;
    const vis = p.z < 1 && p.alpha > 0.02;
    a.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
    a.el.style.setProperty('--a', vis ? p.alpha.toFixed(3) : '0');
    a.el.style.setProperty('--s', p.scale.toFixed(3));
    a.el.style.visibility = vis ? 'visible' : 'hidden';
  }
  for (const t of threads.values()) {
    const A = engine.project(t.from), B = engine.project(t.to);
    if (!A || !B) continue;
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    const dx = B.x - A.x, dy = B.y - A.y;
    const cx = mx - dy * t.bend, cy = my + dx * t.bend;
    const d = `M${A.x.toFixed(1)},${A.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${B.x.toFixed(1)},${B.y.toFixed(1)}`;
    t.el.setAttribute('d', d);
    const a = Math.min(A.alpha, B.alpha);
    t.el.style.setProperty('--a', a.toFixed(3));
    if (t.glow) {
      t.glow.setAttribute('d', d);
      t.glow.style.setProperty('--a', a.toFixed(3));
    }
  }
  requestAnimationFrame(frame);
}

export function startLoop() {
  if (running) return;
  running = true;
  last = 0;
  requestAnimationFrame(frame);
}
export function stopLoop() {
  running = false;
}

import { useEffect, useRef, useState } from 'react';
import { engine } from './engine';
import { setRenderEnabled, setWorld, startLoop } from './loop';
import { World } from './world';
import { useMotion } from '../state/store';

function webglAvailable() {
  try {
    if (new URLSearchParams(location.search).has('nogl')) return false; // manual fallback test
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Full-viewport spatial environment. Hidden (and not rendered) while reading. */
export default function SceneCanvas({ hidden }: { hidden: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [gl] = useState(webglAvailable);
  const motion = useMotion();

  useEffect(() => {
    engine.reduced = motion === 'reduced';
  }, [motion]);

  useEffect(() => {
    let world: World | null = null;
    if (gl && ref.current) {
      try {
        world = new World(ref.current);
        setWorld(world);
      } catch (e) {
        console.warn('WebGL scene failed; using fallback', e);
        world = null;
      }
    }
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      engine.setSize(w, h);
      world?.setSize(w, h);
    };
    resize();
    window.addEventListener('resize', resize);
    const move = (e: PointerEvent) => {
      engine.mouse.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener('pointermove', move);
    startLoop();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      setWorld(null);
      world?.dispose();
    };
  }, [gl]);

  useEffect(() => setRenderEnabled(!hidden), [hidden]);

  return (
    <div className={'scene' + (hidden ? ' scene--hidden' : '')} aria-hidden="true">
      {gl ? <canvas ref={ref} className="scene-canvas" /> : <div className="scene-fallback" />}
      <div className="scene-vignette" />
      <div className="scene-grain" />
    </div>
  );
}

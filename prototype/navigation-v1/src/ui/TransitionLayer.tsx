import { useLayoutEffect, useRef, useState } from 'react';
import type { Route } from '../router';
import { engine } from '../scene/engine';
import { isReduced } from '../state/store';
import { peekPending, takePending } from './transition';

// Screen-space choreography between views that are not purely spatial:
//  · course node → course page: a lit disc opens from the node (under the page)
//  · course/reader → topic: the page closes back into the CN1 node
//  · reader → course: paper dims back into the night environment
export default function TransitionLayer({ from, to }: { from: Route; to: Route }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mode] = useState(() => {
    const p = peekPending();
    if (to.name === 'course' && p?.kind === 'iris-open') return 'open';
    if ((from.name === 'course' || from.name === 'reader') && (to.name === 'topic' || to.name === 'questions' || to.name === 'home' || to.name === 'region'))
      return from.name === 'reader' ? 'close-paper' : 'close';
    if (from.name === 'reader' && to.name === 'course') return 'dim';
    return 'none';
  });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || mode === 'none') return;
    const reduced = isReduced();
    const W = window.innerWidth, H = window.innerHeight;
    const cover = Math.hypot(W, H);
    if (mode === 'open') {
      const p = takePending()!;
      const o = p.origin!;
      el.style.left = o.x + 'px';
      el.style.top = o.y + 'px';
      const a = el.animate(
        reduced
          ? [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }]
          : [
              { transform: 'translate(-50%,-50%) scale(0.02)', opacity: 1 },
              { transform: `translate(-50%,-50%) scale(${(cover * 2.1) / 200})`, opacity: 1, offset: 0.62 },
              { transform: `translate(-50%,-50%) scale(${(cover * 2.2) / 200})`, opacity: 0 },
            ],
        { duration: reduced ? 200 : 1250, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' },
      );
      a.onfinish = () => (el.style.display = 'none');
      return;
    }
    if (mode === 'close' || mode === 'close-paper') {
      // Close into where the CN1 node will settle in the topic view.
      const t = to.name === 'topic' ? engine.projectTarget('C:CN1') : null;
      const x = t ? t.x : W / 2, y = t ? t.y : H / 2;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      const a = el.animate(
        reduced
          ? [{ opacity: 1 }, { opacity: 0 }]
          : [
              { transform: `translate(-50%,-50%) scale(${(cover * 2.2) / 200})`, opacity: 1 },
              { transform: 'translate(-50%,-50%) scale(0.06)', opacity: 1, offset: 0.78 },
              { transform: 'translate(-50%,-50%) scale(0.02)', opacity: 0 },
            ],
        { duration: reduced ? 220 : 1050, easing: 'cubic-bezier(.6,0,.25,1)', fill: 'forwards' },
      );
      a.onfinish = () => (el.style.display = 'none');
      return;
    }
    if (mode === 'dim') {
      const a = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: reduced ? 180 : 700, easing: 'ease-out', fill: 'forwards' });
      a.onfinish = () => (el.style.display = 'none');
    }
  }, [mode, to]);

  if (mode === 'none') return null;
  return <div ref={ref} className={'tx tx--' + mode} aria-hidden="true" />;
}

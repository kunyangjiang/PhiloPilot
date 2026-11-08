import { useCallback, useEffect, useRef, useState } from 'react';
import { useRoute } from '../router';
import { isReduced } from '../state/store';
import '../styles/back-to-top.css';

// A floating "back to top" button on every page.
//
// Visibility: it appears once the page has been scrolled down past one
// viewport height, and then stays up while the reader scrolls in either
// direction. It goes away only when the page is back at the top (scrolled
// there by hand, or by pressing the button).
//
// The scrolling element is the window on most pages and `.reader-scroll` in
// the reader; the button follows whichever one is on the current page.
//
// Moving it: a press held for 0.2 s plays a short reminder (the button lifts,
// a ring pulses twice, and a "拖动可以移动" label shows while the press lasts)
// and the button can then be dragged anywhere on screen. Its place is kept between pages and visits, as
// fractions of the viewport so it survives a resize. A quick press (released
// before 0.2 s without moving) scrolls to the top. Keyboard users get the
// same action with Enter or Space.

const SIZE = 48;
const EDGE = 8;
const HOLD_MS = 200;
const KEY = 'philopilot.v2.backToTop.pos';

type Pos = { fx: number; fy: number };
const readPos = (): Pos | null => {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || 'null');
    return p && typeof p.fx === 'number' && typeof p.fy === 'number' ? p : null;
  } catch {
    return null;
  }
};
const writePos = (p: Pos) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable */
  }
};

const scroller = (): HTMLElement | null => document.querySelector<HTMLElement>('.reader-scroll');
const scrollTopOf = (el: HTMLElement | null) => (el ? el.scrollTop : window.scrollY || document.documentElement.scrollTop);

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), Math.max(lo, hi));
const toPx = (p: Pos) => ({
  x: EDGE + p.fx * (window.innerWidth - SIZE - 2 * EDGE),
  y: EDGE + p.fy * (window.innerHeight - SIZE - 2 * EDGE),
});
const toFrac = (x: number, y: number): Pos => ({
  fx: clamp((x - EDGE) / Math.max(1, window.innerWidth - SIZE - 2 * EDGE), 0, 1),
  fy: clamp((y - EDGE) / Math.max(1, window.innerHeight - SIZE - 2 * EDGE), 0, 1),
});

export default function BackToTop() {
  const route = useRoute();
  const [shown, setShown] = useState(false);
  const [pos, setPos] = useState<Pos | null>(readPos);
  const [hint, setHint] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [, setVw] = useState(0); // re-render on resize so the fractions are re-applied
  const btn = useRef<HTMLButtonElement>(null);
  const press = useRef<{
    id: number;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    timer: number;
    armed: boolean;
    moved: boolean;
    cancelled: boolean;
  } | null>(null);
  const swallowClick = useRef(false);

  // Follow the scroll position of the current page's scrolling element.
  useEffect(() => {
    const update = () => {
      const top = scrollTopOf(scroller());
      // Up after one screen; down again only at the very top.
      setShown((was) => (top <= 4 ? false : was || top > window.innerHeight));
    };
    // Scroll events from elements do not bubble, so listen in the capture
    // phase and ignore inner scrollers (tables, side panels, drawers).
    const onScroll = (e: Event) => {
      const sc = scroller();
      const t = e.target;
      if (sc ? t === sc : t === document || t === document.documentElement) update();
    };
    const onResize = () => setVw(window.innerWidth);
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onResize);
    // A new page starts at the top, but a resume or a search result may open
    // the reader part-way down; check once the page has settled.
    setShown(false);
    const t = window.setTimeout(update, 400);
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onResize);
      window.clearTimeout(t);
    };
  }, [route]);

  const toTop = useCallback(() => {
    const behavior: ScrollBehavior = isReduced() ? 'auto' : 'smooth';
    const sc = scroller();
    if (sc) sc.scrollTo({ top: 0, behavior });
    else window.scrollTo({ top: 0, behavior });
    // Keyboard and screen-reader users continue from the start of the page.
    document.getElementById('main')?.focus({ preventScroll: true });
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0 || !btn.current) return;
    const r = btn.current.getBoundingClientRect();
    try {
      btn.current.setPointerCapture(e.pointerId);
    } catch {
      /* pointer already gone */
    }
    const p = {
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      ox: e.clientX - r.left,
      oy: e.clientY - r.top,
      timer: 0,
      armed: false,
      moved: false,
      cancelled: false,
    };
    p.timer = window.setTimeout(() => {
      p.armed = true;
      setHint(true);
      setDragging(true);
      navigator.vibrate?.(10);
    }, HOLD_MS);
    press.current = p;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const p = press.current;
    if (!p || p.id !== e.pointerId) return;
    if (!p.armed) {
      // Moving before the hold completes is not a tap and not a drag.
      if (Math.hypot(e.clientX - p.sx, e.clientY - p.sy) > 8) {
        p.cancelled = true;
        window.clearTimeout(p.timer);
      }
      return;
    }
    p.moved = true;
    const x = clamp(e.clientX - p.ox, EDGE, window.innerWidth - SIZE - EDGE);
    const y = clamp(e.clientY - p.oy, EDGE, window.innerHeight - SIZE - EDGE);
    setPos(toFrac(x, y));
  };

  const finish = (e: React.PointerEvent<HTMLButtonElement>, cancel: boolean) => {
    const p = press.current;
    if (!p || p.id !== e.pointerId) return;
    window.clearTimeout(p.timer);
    press.current = null;
    setDragging(false);
    setHint(false);
    if (p.armed) {
      if (p.moved && pos) writePos(pos);
      swallowClick.current = true;
      return;
    }
    if (p.cancelled || cancel) {
      swallowClick.current = true;
      return;
    }
    swallowClick.current = true; // the pointer path handles the tap itself
    toTop();
  };

  // Keyboard activation (Enter / Space) arrives as a click with no pointer
  // press; pointer taps are handled in `finish` and their click is swallowed.
  const onClick = () => {
    if (swallowClick.current) {
      swallowClick.current = false;
      return;
    }
    toTop();
  };

  const style: React.CSSProperties | undefined = pos
    ? (() => {
        const { x, y } = toPx(pos);
        return { left: x, top: y, right: 'auto', bottom: 'auto' };
      })()
    : undefined;
  const labelLeft = pos ? toPx(pos).x < window.innerWidth / 2 : false;

  return (
    <button
      ref={btn}
      type="button"
      className={
        'btt' +
        (shown ? ' is-shown' : '') +
        (hint ? ' is-hint' : '') +
        (dragging ? ' is-dragging' : '') +
        (labelLeft ? ' btt--label-right' : '')
      }
      style={style}
      aria-label="回到顶部"
      title="回到顶部（按住 0.2 秒可拖动）"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => finish(e, false)}
      onPointerCancel={(e) => finish(e, true)}
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path d="M12 19V6M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
      </svg>
      <span className="btt-label" aria-hidden="true">
        拖动可以移动
      </span>
    </button>
  );
}

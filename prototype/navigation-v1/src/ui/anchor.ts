import { useCallback, useRef } from 'react';
import { anchor, thread, unanchor, unthread } from '../scene/loop';

/** Ref callback that pins a DOM element to a spatial entity. */
export function useAnchor(id: string) {
  const prev = useRef<HTMLElement | null>(null);
  return useCallback(
    (el: HTMLElement | null) => {
      unanchor(prev.current);
      prev.current = el;
      if (el) anchor(el, id);
    },
    [id],
  );
}

/** Ref callback for an SVG path that follows two entities. */
export function useThread(from: string, to: string, bend = 0.18) {
  const prev = useRef<SVGPathElement | null>(null);
  return useCallback(
    (el: SVGPathElement | null) => {
      unthread(prev.current);
      prev.current = el;
      if (el) thread(el, from, to, bend);
    },
    [from, to, bend],
  );
}

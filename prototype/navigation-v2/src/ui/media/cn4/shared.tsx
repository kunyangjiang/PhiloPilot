import { useState, type ReactNode } from 'react';
import { getMedia, setMedia } from '../../../state/store';
export { Seg } from '../gr4/shared';
export { Gu } from '../cn3/shared';

// Small pieces shared by the CN4 components. Every classical line quoted in
// them is one of the chapter's own checked passages (content/CN4_SAMPLE_DRAFT.md,
// Wikisource wording, traditional characters kept) with the chapter's own
// explanation; nothing is quoted from anywhere else.

/** Saved component state, per course and component. */
export function useSaved<T extends object>(id: string, init: T) {
  const [st, setSt] = useState<T>(() => ({ ...init, ...getMedia<Partial<T>>('CN4', id, init) }));
  const save = (next: T) => {
    setSt(next);
    setMedia('CN4', id, next);
  };
  return [st, save] as const;
}

/** Small deterministic random source (mulberry32), so a "run" can be replayed from its seed. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const newSeed = () => Math.floor(Math.random() * 2 ** 31);

/** A fixed teaching-reconstruction notice. */
export function Limits({ children }: { children: ReactNode }) {
  return (
    <div className="c4-limits">
      <p className="c3-layer-k">这个演示是什么，不是什么</p>
      {children}
    </div>
  );
}

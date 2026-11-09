import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
export { Band, Claim, Limits, Seg, Src, Tag, BASIS, type Basis } from '../in2/shared';

// Shared by the 大乘哲学 (IN4) and 弥曼差派 (IN5) components. They reuse the IN2/IN3
// pieces (source block, basis tags, bands, the "what this is not" panel). Every
// Sanskrit or Chinese line quoted in them is one of the chapters' own checked
// passages (content/IN4_SAMPLE_DRAFT.md, content/IN5_SAMPLE_DRAFT.md), with the
// chapters' own translation; nothing is quoted from anywhere else.

/** Saved component state, per course and component. */
export function useSavedIx<T extends object>(code: 'IN4' | 'IN5', id: string, init: T) {
  const [st, setSt] = useState<T>(() => ({ ...init, ...getMedia<Partial<T>>(code, id, init) }));
  const save = (next: T) => {
    setSt(next);
    setMedia(code, id, next);
  };
  return [st, save] as const;
}

/** A short verdict word before feedback (in words, never colour alone). */
export const Verdict = ({ ok, yes, no }: { ok: boolean; yes: string; no: string }) => (
  <span className={'c5-verdict ' + (ok ? 'c5-verdict--ok' : 'c5-verdict--no')}>{ok ? yes : no}</span>
);

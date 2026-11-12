import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
export { Band, Claim, Limits, Seg, Src, Tag, BASIS, type Basis } from '../in2/shared';

// Shared by the 大乘哲学 (IN4), 弥曼差派 (IN5), 吠檀多派 (IN6) and 数论与瑜伽派 (IN7) components,
// and (state only) by the IN8, IA1 and IA2 components. They reuse the IN2/IN3
// pieces (source block, basis tags, bands, the "what this is not" panel). Every
// Sanskrit or Chinese line quoted in them is one of the chapters' own checked
// passages (content/IN4–IN7_SAMPLE_DRAFT.md), with the
// chapters' own translation; nothing is quoted from anywhere else.

/** Saved component state, per course and component. */
export function useSavedIx<T extends object>(code: 'IN4' | 'IN5' | 'IN6' | 'IN7' | 'IN8' | 'IA1' | 'IA2' | 'IA3' | 'IA4' | 'IA5' | 'JW1' | 'EA1' | 'EA2' | 'EA3' | 'EA5' | 'EA6' | 'EA7' | 'EA8' | 'EA9' | 'EA10' | 'EA11' | 'EA12' | 'AF1' | 'AF2' | 'AF3' | 'JP1' | 'KR1' | 'LA1' | 'A1' | 'A2' | 'A3' | 'A4' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8' | 'S9' | 'S10' | 'S11' | 'S12' | 'S13' | 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8' | 'D9' | 'D10' | 'D11', id: string, init: T) {
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

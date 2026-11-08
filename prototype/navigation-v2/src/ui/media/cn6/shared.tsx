import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
export { Seg } from '../gr4/shared';
export { Gu, Stages } from '../cn3/shared';
export { Limits } from '../cn4/shared';

// Small pieces shared by the 宋明理学至清代 components. Every classical
// line quoted in them is one of the chapter's own checked passages
// (content/CN6_SAMPLE_DRAFT.md, Wikisource wording kept) with the chapter's
// own explanation; nothing is quoted from anywhere else.

/** Saved component state, per course and component. */
export function useSaved<T extends object>(id: string, init: T) {
  const [st, setSt] = useState<T>(() => ({ ...init, ...getMedia<Partial<T>>('CN6', id, init) }));
  const save = (next: T) => {
    setSt(next);
    setMedia('CN6', id, next);
  };
  return [st, save] as const;
}

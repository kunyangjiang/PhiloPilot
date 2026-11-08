import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
export { Seg, SrcToggle } from '../gr4/shared';

// Small pieces shared by the CN2 components. Every classical line quoted here
// is one of the chapter's own checked passages (content/CN2_SAMPLE_DRAFT.md,
// Wikisource wording, traditional characters kept) with the chapter's own
// explanation; nothing is quoted from anywhere else.

/** Saved component state, per course and component. */
export function useSaved<T extends object>(id: string, init: T) {
  const [st, setSt] = useState<T>(() => ({ ...init, ...getMedia<Partial<T>>('CN2', id, init) }));
  const save = (next: T) => {
    setSt(next);
    setMedia('CN2', id, next);
  };
  return [st, save] as const;
}

/** A classical passage with its source and the chapter's explanation. */
export function Gu({ src, orig, zh }: { src: string; orig: string; zh?: string }) {
  return (
    <div className="lw-grc c2-gu">
      <p className="pe-src">{src}</p>
      <p className="c2-orig" lang="zh-Hant">
        {orig}
      </p>
      {zh && <p className="pe-zh">意思是：{zh}</p>}
    </div>
  );
}

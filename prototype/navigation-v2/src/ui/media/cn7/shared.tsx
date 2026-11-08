import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
export { Seg } from '../gr4/shared';
export { Limits } from '../cn4/shared';

// Small pieces shared by the 中国哲学与现代 and 体系、马克思主义与当代中国哲学
// components. Every passage quoted in them is one of the chapter's own checked
// passages (content/CN7_SAMPLE_DRAFT.md, content/CN8_SAMPLE_DRAFT.md: Wikisource,
// marxists.org or a cited article, wording and characters kept) with the
// chapter's own 白话; nothing is quoted from anywhere else.

/** Saved component state, per course and component. */
export function useSavedIn<T extends object>(code: 'CN7' | 'CN8', id: string, init: T) {
  const [st, setSt] = useState<T>(() => ({ ...init, ...getMedia<Partial<T>>(code, id, init) }));
  const save = (next: T) => {
    setSt(next);
    setMedia(code, id, next);
  };
  return [st, save] as const;
}

/** A quoted passage with its source and the chapter's 白话. Modern texts keep the characters of their source page. */
export function Quote({ src, orig, zh }: { src: string; orig: string; zh?: string }) {
  return (
    <div className="lw-grc c7-q">
      <p className="pe-src">{src}</p>
      <p className="c7-orig">{orig}</p>
      {zh && <p className="pe-zh">白话：{zh}</p>}
    </div>
  );
}

/** What a statement rests on. Shown on every claim the components make. */
export type Basis = 'text' | 'cited' | 'scholar' | 'common' | 'course';
export const BASIS: Record<Basis, string> = {
  text: '本课核对过的原文',
  cited: '转引的原文',
  scholar: '学者的解释',
  common: '学界的通常概述',
  course: '本课的重构',
};
export function Tag({ b, who }: { b: Basis; who?: string }) {
  return (
    <span className={'c7-tag c7-tag--' + b}>
      {BASIS[b]}
      {who ? `：${who}` : ''}
    </span>
  );
}

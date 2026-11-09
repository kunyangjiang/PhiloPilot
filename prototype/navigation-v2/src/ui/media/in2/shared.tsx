import { useState, type ReactNode } from 'react';
import { getMedia, setMedia } from '../../../state/store';
export { Seg } from '../gr4/shared';
export { Limits } from '../cn4/shared';

// Small pieces shared by the 早期佛教与阿毗达磨 (IN2) and 知识、推理与辩论 (IN3)
// components. Every Pāli or Sanskrit line quoted in them is one of the chapters'
// own checked passages (content/IN2_SAMPLE_DRAFT.md, content/IN3_SAMPLE_DRAFT.md:
// SuttaCentral, GRETIL or CBETA wording kept) with the chapters' own translation.
// The only additions are three Abhidharmakośa verses (1.5, 2.34, 2.35) checked in
// the same GRETIL file the chapter uses; the integration report records them.

/** Saved component state, per course and component. */
export function useSavedIn<T extends object>(code: 'IN2' | 'IN3', id: string, init: T) {
  const [st, setSt] = useState<T>(() => ({ ...init, ...getMedia<Partial<T>>(code, id, init) }));
  const save = (next: T) => {
    setSt(next);
    setMedia(code, id, next);
  };
  return [st, save] as const;
}

/** An original-language passage with its reference and the chapter's translation. */
export function Src({ src, orig, lang, zh }: { src: string; orig: string; lang: 'pi' | 'sa' | 'zh-Hant'; zh?: string }) {
  return (
    <div className="lw-grc ip-src">
      <p className="pe-src">{src}</p>
      <p className={lang === 'zh-Hant' ? 'ip-han' : 'pe-orig'} lang={lang}>
        {orig}
      </p>
      {zh && <p className="pe-zh">本章试译：{zh}</p>}
    </div>
  );
}

/** What a statement rests on. Shown on every claim the components make, in words (never colour alone). */
export type Basis = 'text' | 'school' | 'scholar' | 'common' | 'later' | 'course';
export const BASIS: Record<Basis, string> = {
  text: '本课核对过的原文',
  school: '论书或注释传统的整理',
  scholar: '学者的解释（据百科条目）',
  common: '通常的概述，本课没有核对原文',
  later: '后来的传统',
  course: '本课的重构或举例',
};
export function Tag({ b, who }: { b: Basis; who?: string }) {
  return (
    <span className={'c7-tag ip-tag--' + b}>
      {BASIS[b]}
      {who ? `：${who}` : ''}
    </span>
  );
}

/** A claim with its basis. */
export function Claim({ b, who, children }: { b: Basis; who?: string; children: ReactNode }) {
  return (
    <p className="ip-claim">
      <Tag b={b} who={who} />
      {children}
    </p>
  );
}

/** A labelled band inside a component (一 · …). */
export const Band = ({ children }: { children: ReactNode }) => <p className="c3-layer-k">{children}</p>;

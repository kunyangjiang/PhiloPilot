import type { ReactNode } from 'react';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../in2/ip.css';
import '../in4/in4.css';
import './v21.css';
export { Band, Claim, Limits, Seg, Tag, useSavedIx, Verdict } from '../in4/shared';

// Shared by the V21 components: 近代与殖民时期的印度哲学 (IN8), 翻译运动、凯拉姆与
// 哲学的兴起 (IA1) and 法拉比与阿维森纳 (IA2). Every English or Arabic line
// quoted in them is one of the chapters' own checked passages
// (content/IN8_, IA1_, IA2_SAMPLE_DRAFT.md) with the chapters' own translation;
// nothing is quoted from anywhere else.

/** An original-language passage (English or Arabic) with its reference and the chapter's translation. */
export function OrigSrc({ src, orig, lang, zh }: { src: string; orig: string; lang: 'en' | 'ar'; zh?: string }) {
  return (
    <div className="lw-grc ip-src">
      <p className="pe-src">{src}</p>
      <p className={lang === 'ar' ? 'v21-ar' : 'v21-en'} lang={lang} dir={lang === 'ar' ? 'rtl' : undefined}>
        {orig}
      </p>
      {zh && <p className="pe-zh">本章试译：{zh}</p>}
    </div>
  );
}

/** One step of a numbered reconstruction, optionally marked. */
export function Step({ n, on, children }: { n: number; on?: boolean; children: ReactNode }) {
  return (
    <li className={'v21-step' + (on ? ' is-on' : '')}>
      <span className="v21-n" aria-hidden="true">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

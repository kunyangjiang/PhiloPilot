import '../ia3/v22.css';
import './v23.css';
export { Band, Claim, Limits, Seg, Step, Tag, useSavedIx, Verdict } from '../ia3/shared';

// Shared by the V23 components: 犹太哲学：从萨阿迪亚到列维纳斯 (JW1),
// 从古代晚期到经院哲学 (EA1) and 近代早期理性主义与新科学 (EA2).
// Every Judeo-Arabic, Latin or French line quoted in them is one of the
// chapters' own checked passages (content/JW1_, EA1_, EA2_SAMPLE_DRAFT.md)
// with the chapters' own translation; nothing is quoted from anywhere else.

type Lang = 'jrb' | 'la' | 'fr';

/** An original-language passage with its reference and the chapter's translation. */
export function OrigSrc({ src, orig, lang, zh }: { src: string; orig: string; lang: Lang; zh?: string }) {
  return (
    <div className="lw-grc ip-src">
      <p className="pe-src">{src}</p>
      <p className={lang === 'jrb' ? 'v23-he' : 'v21-en'} lang={lang} dir={lang === 'jrb' ? 'rtl' : undefined}>
        {orig}
      </p>
      {zh && <p className="pe-zh">本章试译：{zh}</p>}
    </div>
  );
}

/** A row of toggle buttons (one pressed at a time); keyboard and touch through native buttons. */
export function Pick<T extends string | number>({
  label,
  value,
  opts,
  onPick,
}: {
  label: string;
  value: T | null | undefined;
  opts: readonly (readonly [T, string])[];
  onPick: (v: T) => void;
}) {
  return (
    <div className="v22-btns" role="group" aria-label={label}>
      {opts.map(([v, t]) => (
        <button key={String(v)} type="button" className="v22-btn" aria-pressed={value === v} onClick={() => onPick(v)}>
          {t}
        </button>
      ))}
    </div>
  );
}

import { useState, type ReactNode } from 'react';
import { getMedia, setMedia } from '../../../state/store';

// Small pieces shared by the GR4 components. Quotations are the chapter's own
// checked passages (content/GR4_SAMPLE_DRAFT.md) with its own translations;
// nothing here is quoted from anywhere else.

/** Saved component state, per course and component (same keys as GR1–GR3). */
export function useSaved<T extends object>(id: string, init: T) {
  const [st, setSt] = useState<T>(() => ({ ...init, ...getMedia<Partial<T>>('GR4', id, init) }));
  const save = (next: T) => {
    setSt(next);
    setMedia('GR4', id, next);
  };
  return [st, save] as const;
}

/** An original-language passage with its source and the course's translation. */
export function Src({ src, orig, lang, zh }: { src: string; orig: string; lang: 'grc' | 'la'; zh: string }) {
  return (
    <div className="lw-grc">
      <p className="pe-src">{src}</p>
      <p className="pe-orig" lang={lang}>
        {orig}
      </p>
      <p className="pe-zh">本章试译：{zh}</p>
    </div>
  );
}

/** A disclosure button with the passage(s) it reveals. */
export function SrcToggle({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="md-disclose" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? '收起原文' : label}
      </button>
      {open && <div className="g4-src">{children}</div>}
    </>
  );
}

/** Radio buttons drawn as a segmented row (or a column with `col`). */
export function Seg<T extends string | number>({
  name,
  value,
  opts,
  onPick,
  col,
  label,
}: {
  name: string;
  value: T | null | undefined;
  opts: readonly (readonly [T, string])[];
  onPick: (v: T) => void;
  col?: boolean;
  label?: string;
}) {
  return (
    <div className={'md-seg' + (col ? ' gr-col' : '')} role="radiogroup" aria-label={label}>
      {opts.map(([v, t]) => (
        <label key={String(v)} className={'md-seg-opt' + (value === v ? ' is-on' : '')}>
          <input type="radio" name={name} checked={value === v} onChange={() => onPick(v)} />
          <span>{t}</span>
        </label>
      ))}
    </div>
  );
}

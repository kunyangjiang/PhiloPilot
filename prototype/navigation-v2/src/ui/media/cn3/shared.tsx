import { useState, type KeyboardEvent } from 'react';
import { getMedia, setMedia } from '../../../state/store';
export { Seg } from '../gr4/shared';

// Small pieces shared by the CN3 components. Every classical line quoted here
// is one of the chapter's own checked passages (content/CN3_SAMPLE_DRAFT.md,
// Wikisource wording, traditional characters kept) with the chapter's own
// explanation; nothing is quoted from anywhere else.

/** Saved component state, per course and component. */
export function useSaved<T extends object>(id: string, init: T) {
  const [st, setSt] = useState<T>(() => ({ ...init, ...getMedia<Partial<T>>('CN3', id, init) }));
  const save = (next: T) => {
    setSt(next);
    setMedia('CN3', id, next);
  };
  return [st, save] as const;
}

/** A classical passage with its source and the chapter's explanation. */
export function Gu({ src, orig, zh }: { src: string; orig: string; zh?: string }) {
  return (
    <div className="lw-grc c3-gu">
      <p className="pe-src">{src}</p>
      <p className="c3-orig" lang="zh-Hant">
        {orig}
      </p>
      {zh && <p className="pe-zh">意思是：{zh}</p>}
    </div>
  );
}

/**
 * A row of stage buttons. Each is an ordinary button (Tab, Enter, Space);
 * Left/Right/Home/End also move between stages while one has focus.
 */
export function Stages({ labels, cur, onPick, label }: { labels: readonly string[]; cur: number; onPick: (i: number) => void; label: string }) {
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = labels.length;
    const to = e.key === 'ArrowRight' ? Math.min(n - 1, cur + 1) : e.key === 'ArrowLeft' ? Math.max(0, cur - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    onPick(to);
    const btns = e.currentTarget.querySelectorAll('button');
    (btns[to] as HTMLButtonElement | undefined)?.focus();
  };
  return (
    <div className="c3-stages" role="group" aria-label={label} onKeyDown={key}>
      {labels.map((t, i) => (
        <button key={t} type="button" className={'c3-stage' + (i === cur ? ' is-cur' : i < cur ? ' is-past' : '')} aria-pressed={i === cur} onClick={() => onPick(i)}>
          <span className="c3-stage-n">{i + 1}</span>
          <span className="c3-stage-t">{t}</span>
        </button>
      ))}
    </div>
  );
}

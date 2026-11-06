import { useEffect, useRef, useState } from 'react';
import { getExercise, setExercise } from '../state/store';

/** “想一想”: the draft's own prompt and hint, with a private local answer box. */
export default function Exercise({ id, promptHtml, hintHtml }: { id: string; promptHtml: string; hintHtml: string }) {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [text, setText] = useState(() => getExercise(id));
  const [saved, setSaved] = useState(false);
  const hintRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);

  useEffect(() => {
    if (hint && hintRef.current) hintRef.current.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' });
  }, [hint]);

  return (
    <aside className={'exercise' + (open ? ' is-open' : '')} aria-label="想一想（练习）">
      <div className="ex-mark" aria-hidden="true">
        <span />
      </div>
      <div className="ex-body">
        <div className="ex-prompt" dangerouslySetInnerHTML={{ __html: promptHtml }} />
        {!open ? (
          <button className="ex-start" onClick={() => setOpen(true)}>
            动笔写下我的答案
          </button>
        ) : (
          <div className="ex-work">
            <label className="ex-label" htmlFor={'ex-' + id}>
              我的答案（只保存在这台设备上，不计分）
            </label>
            <textarea
              id={'ex-' + id}
              value={text}
              rows={5}
              autoFocus
              onChange={(e) => {
                setText(e.target.value);
                setExercise(id, e.target.value);
                setSaved(true);
                window.clearTimeout(timer.current);
                timer.current = window.setTimeout(() => setSaved(false), 1400);
              }}
              placeholder="前提 1：……&#10;前提 2：……&#10;结论：……"
            />
            <span className={'ex-saved' + (saved ? ' on' : '')} aria-live="polite">
              {saved ? '已保存' : ''}
            </span>
          </div>
        )}
        {hintHtml && (
          <>
            <button className="ex-hint-btn" aria-expanded={hint} onClick={() => setHint((h) => !h)}>
              {hint ? '收起提示' : text.trim() ? '对照提示' : '先写，再看提示'}
            </button>
            {hint && <div className="ex-hint" ref={hintRef} dangerouslySetInnerHTML={{ __html: hintHtml }} />}
          </>
        )}
      </div>
    </aside>
  );
}

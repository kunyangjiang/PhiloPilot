import { useState } from 'react';
import type { Block } from '../content/course';
import { practiceFor } from '../content/practiceSets';
import Practice from './Practice';

type ExerciseBlock = Extract<Block, { kind: 'exercise' }>;

/** “想一想”: the course's selection questions for this block when it has
 *  them (see content/practiceSets.ts); otherwise the manuscript's own prompt
 *  and hint, to think through without typing anything here. */
export default function Exercise({ code, block }: { code: string; block: ExerciseBlock }) {
  const set = practiceFor(code, block.text);
  const [hint, setHint] = useState(false);
  if (set) return <Practice code={code} exerciseId={block.id} set={set} promptHtml={block.promptHtml} hintHtml={block.hintHtml} />;

  return (
    <aside className="exercise" aria-label="想一想（练习）">
      <p className="ex-tag">想一想</p>
      <div className="ex-prompt" dangerouslySetInnerHTML={{ __html: block.promptHtml }} />
      {block.hintHtml && (
        <>
          <button className="ex-hint-btn" aria-expanded={hint} onClick={() => setHint((h) => !h)}>
            {hint ? '收起提示' : '先想一想，再看提示'}
          </button>
          {hint && <div className="ex-hint" dangerouslySetInnerHTML={{ __html: block.hintHtml }} />}
        </>
      )}
    </aside>
  );
}

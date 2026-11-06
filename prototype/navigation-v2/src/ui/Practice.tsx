import { useRef, useState } from 'react';
import { LETTERS, type Option, type PracticeSet, type Question } from '../content/practice';
import { getExercise, getPractice, setPractice, type PracticeState } from '../state/store';
import '../styles/practice.css';

// One 想一想 block as a short run of selection questions (see content/practice.ts).
// Each question is answered, checked and, if wrong, retried on its own; the
// answers stay on this device. No score is kept.

const TF: Option[] = [
  { id: 't', text: '对', note: '' },
  { id: 'f', text: '不对', note: '' },
];

const sameSet = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.includes(x));

function isRight(q: Question, pick: string[]) {
  if (q.type === 'single') return pick[0] === q.answer;
  if (q.type === 'tf') return pick[0] === (q.answer ? 't' : 'f');
  if (q.type === 'multi') return sameSet(pick, q.answer);
  return true;
}
const answerIds = (q: Question): string[] =>
  q.type === 'single' ? [q.answer] : q.type === 'multi' ? q.answer : q.type === 'tf' ? [q.answer ? 't' : 'f'] : [];

function QuestionView({
  q,
  n,
  total,
  setKey,
  st,
  onChange,
}: {
  q: Question;
  n: number;
  total: number;
  setKey: string;
  st: PracticeState[string] | undefined;
  onChange: (v: PracticeState[string]) => void;
}) {
  const pick = st?.pick ?? [];
  const stage = st?.stage ?? 'open';
  const fbRef = useRef<HTMLDivElement>(null);
  const options = q.type === 'tf' ? TF : q.options;
  const multi = q.type === 'multi';
  const locked = stage !== 'open';
  const name = `pq-${setKey}-${q.id}`;
  const answers = answerIds(q);

  const toggle = (id: string) => {
    if (locked) return;
    onChange({ stage: 'open', pick: multi ? (pick.includes(id) ? pick.filter((x) => x !== id) : [...pick, id]) : [id] });
  };
  const submit = () => {
    if (!pick.length) return;
    onChange({ pick, stage: q.type === 'view' ? 'shown' : isRight(q, pick) ? 'right' : 'wrong' });
    // Move focus to the feedback so keyboard and screen-reader users land on it.
    window.setTimeout(() => fbRef.current?.focus(), 0);
  };
  const retry = () => onChange({ stage: 'open', pick: multi ? pick : [] });
  const show = () => {
    onChange({ pick, stage: 'shown' });
    window.setTimeout(() => fbRef.current?.focus(), 0);
  };
  const redo = () => onChange({ stage: 'open', pick: [] });

  // What each option shows once the question is settled.
  const reveal = stage === 'right' || stage === 'shown';
  const mark = (o: Option) => {
    if (q.type === 'view') return stage === 'shown' && pick.includes(o.id) ? '你的选择' : '';
    if (reveal) return answers.includes(o.id) ? (multi ? '应选' : '正确答案') : pick.includes(o.id) ? '你的选择' : '';
    if (stage === 'wrong' && pick.includes(o.id)) return '你的选择';
    return '';
  };

  const wrongPicked = q.type === 'view' ? [] : options.filter((o) => pick.includes(o.id) && !answers.includes(o.id));
  const missed = multi ? answers.filter((a) => !pick.includes(a)).length : 0;
  const kind = q.type === 'single' ? '单选' : q.type === 'multi' ? '多选' : q.type === 'tf' ? '判断' : '立场';

  return (
    <li className={'pq-q pq-q--' + stage}>
      <fieldset className="pq-fs" disabled={locked} aria-describedby={locked ? name + '-fb' : undefined}>
        <legend className="pq-stem">
          <span className="pq-n">
            {n} / {total} · {kind}
            {q.type === 'view' ? '（没有唯一正确答案）' : multi ? '（可多选）' : ''}
          </span>
          <span className="pq-stem-t">{q.stem}</span>
        </legend>
        <div className={'pq-opts' + (q.type === 'tf' ? ' pq-opts--tf' : '')}>
          {options.map((o, i) => {
            const m = mark(o);
            const on = pick.includes(o.id);
            const cls =
              'pq-opt' +
              (multi ? ' pq-opt--check' : '') +
              (on ? ' is-on' : '') +
              (reveal && q.type !== 'view' && answers.includes(o.id) ? ' is-answer' : '') +
              (stage !== 'open' && on && q.type !== 'view' && !answers.includes(o.id) ? ' is-miss' : '');
            return (
              <label key={o.id} className={cls}>
                <input type={multi ? 'checkbox' : 'radio'} name={name} value={o.id} checked={on} onChange={() => toggle(o.id)} />
                <span className="pq-opt-box">
                  {q.type !== 'tf' && <span className="pq-letter">{LETTERS[i]}</span>}
                  <span className="pq-opt-t">{o.text}</span>
                  {m && <span className="pq-mark">{m}</span>}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {stage === 'open' && (
        <div className="pq-actions">
          <button type="button" className="btn btn--small" onClick={submit} disabled={!pick.length}>
            {q.type === 'view' ? '确定我的立场' : '提交'}
          </button>
          {!pick.length && <span className="pq-wait">{multi ? '选好所有你认为对的选项后提交' : '先选一项'}</span>}
        </div>
      )}

      <div ref={fbRef} id={name + '-fb'} className="pq-fb" tabIndex={-1} aria-live="polite">
        {stage === 'wrong' && (
          <>
            <p className="pq-verdict pq-verdict--no">还不对。</p>
            {q.type === 'tf' && <p>{q.wrong}</p>}
            {wrongPicked.map((o) => (
              <p key={o.id}>
                <b>{LETTERS[options.indexOf(o)]}：</b>
                {o.note}
              </p>
            ))}
            {missed > 0 && <p>{wrongPicked.length ? '另外，' : ''}还有 {missed} 个应选的选项没有选上。</p>}
            <div className="pq-actions">
              <button type="button" className="btn btn--small" onClick={retry}>
                再试一次
              </button>
              <button type="button" className="pq-link" onClick={show}>
                显示答案和解析
              </button>
            </div>
          </>
        )}
        {reveal && q.type !== 'view' && (
          <>
            <p className={'pq-verdict' + (stage === 'right' ? ' pq-verdict--yes' : '')}>
              {stage === 'right' ? '回答正确。' : q.type === 'tf' ? `答案：${q.answer ? '对' : '不对'}。` : '答案与解析'}
            </p>
            {q.type === 'tf' && stage === 'shown' && pick.length > 0 && !isRight(q, pick) && <p>{q.wrong}</p>}
            {q.type !== 'tf' && (
              <ul className="pq-notes">
                {options.map((o, i) => (
                  <li key={o.id} className={answers.includes(o.id) ? 'is-answer' : ''}>
                    <b>
                      {LETTERS[i]}
                      {answers.includes(o.id) ? (multi ? '（应选）' : '（正确）') : ''}：
                    </b>
                    {o.note}
                  </li>
                ))}
              </ul>
            )}
            {q.explain && <p className="pq-explain">{q.explain}</p>}
            <button type="button" className="pq-link" onClick={redo}>
              重做这一题
            </button>
          </>
        )}
        {stage === 'shown' && q.type === 'view' && (
          <>
            <p className="pq-verdict">这道题没有唯一正确答案。下面是每种立场的长处和代价：</p>
            <ul className="pq-notes">
              {options.map((o, i) => (
                <li key={o.id} className={pick.includes(o.id) ? 'is-mine' : ''}>
                  <b>
                    {LETTERS[i]}
                    {pick.includes(o.id) ? '（你的选择）' : ''}：
                  </b>
                  {o.note}
                </li>
              ))}
            </ul>
            {q.explain && <p className="pq-explain">{q.explain}</p>}
            <button type="button" className="pq-link" onClick={redo}>
              换一个立场再想
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default function Practice({
  code,
  exerciseId,
  set,
  promptHtml,
  hintHtml,
}: {
  code: string;
  exerciseId: string;
  set: PracticeSet;
  promptHtml: string;
  hintHtml: string;
}) {
  // Keyed by the label (e.g. 活动A), which stays put if sections are renumbered.
  const setKey = set.label.replace(/[\s，,]+/g, '');
  const [state, setState] = useState<PracticeState>(() => getPractice(code, setKey));
  const [orig, setOrig] = useState(false);
  // An answer typed into the earlier free-text box, if this device has one.
  const [old] = useState(() => {
    const v = getExercise(exerciseId);
    return typeof v === 'string' ? v.trim() : '';
  });

  const update = (qid: string, v: PracticeState[string]) => {
    const next = { ...state, [qid]: v };
    setState(next);
    setPractice(code, setKey, next);
  };

  return (
    <aside className="exercise pq" aria-label={`想一想（${set.label}）`}>
      <p className="ex-tag">想一想 · {set.label}</p>
      <p className="pq-lede">{set.lede}</p>
      <ol className="pq-list">
        {set.questions.map((q, i) => (
          <QuestionView
            key={q.id}
            q={q}
            n={i + 1}
            total={set.questions.length}
            setKey={setKey}
            st={state[q.id]}
            onChange={(v) => update(q.id, v)}
          />
        ))}
      </ol>
      <p className="pq-foot">选择只保存在这台设备上，不计分。</p>
      <button type="button" className="ex-hint-btn" aria-expanded={orig} onClick={() => setOrig((o) => !o)}>
        {orig ? '收起本章原题' : '本章原题与提示（建议做完再看）'}
      </button>
      {orig && (
        <div className="ex-hint">
          <div dangerouslySetInnerHTML={{ __html: promptHtml }} />
          {hintHtml && <div dangerouslySetInnerHTML={{ __html: hintHtml }} />}
          {old && (
            <>
              <p className="pq-old-k">你以前在这里写下的答案（只读）</p>
              <p className="pq-old">{old}</p>
            </>
          )}
        </div>
      )}
    </aside>
  );
}

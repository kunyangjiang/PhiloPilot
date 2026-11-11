import { Band, Limits, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 三 · after the table of the two scopes of negation (content/EA8_SAMPLE_DRAFT.md).
// Russell's analysis applied to four small worlds: the reader predicts the truth value
// of the sentence and of its two negations, then sees which of the three parts
// (existence, uniqueness, predication) holds. The formulas are the chapter's own;
// the four worlds are constructed for this exercise.

const ID = 'russell-scope';

type W = 'none' | 'bald' | 'hairy' | 'two';
const WORLDS: readonly (readonly [W, string])[] = [
  ['none', '没有国王'],
  ['bald', '一位秃头国王'],
  ['hairy', '一位不秃的国王'],
  ['two', '两位秃头国王'],
];
const WDESC: Record<W, string> = {
  none: '法国是共和国，没有任何人是当今的法国国王。',
  bald: '恰好有一个当今的法国国王，他是秃头。',
  hairy: '恰好有一个当今的法国国王，他不是秃头。',
  two: '有两个人同时自称、并被承认为当今的法国国王，两人都是秃头（一个虚构的世界）。',
};
// existence, uniqueness, predication (predication only meaningful when the first two hold)
const PARTS: Record<W, [boolean, boolean, boolean | null]> = {
  none: [false, true, null],
  bald: [true, true, true],
  hairy: [true, true, false],
  two: [true, false, null],
};

type S = 's' | 'narrow' | 'wide';
const SENT: { id: S; zh: string; f: string }[] = [
  { id: 's', zh: '当今的法国国王是秃头。', f: '∃x ( K(x) ∧ ∀y ( K(y) → y = x ) ∧ B(x) )' },
  { id: 'narrow', zh: '否定的辖域窄：有恰好一个当今的法国国王，并且他不是秃头。', f: '∃x ( K(x) ∧ ∀y ( K(y) → y = x ) ∧ ¬B(x) )' },
  { id: 'wide', zh: '否定的辖域宽：并非"有恰好一个当今的法国国王并且他是秃头"。', f: '¬∃x ( K(x) ∧ ∀y ( K(y) → y = x ) ∧ B(x) )' },
];

function truth(w: W, s: S): boolean {
  const unique = PARTS[w][0] && PARTS[w][1];
  const sTrue = unique && PARTS[w][2] === true;
  if (s === 's') return sTrue;
  if (s === 'narrow') return unique && PARTS[w][2] === false;
  return !sTrue;
}

const TF: readonly (readonly [string, string])[] = [
  ['t', '真'],
  ['f', '假'],
];

interface Saved {
  w: W;
  pred: Record<string, 't' | 'f'>;
}
const INIT: Saved = { w: 'none', pred: {} };

const mark = (b: boolean | null) => (b === null ? '（不必再问）' : b ? '成立' : '不成立');

export default function RussellScope() {
  const [st, save] = useSavedIx<Saved>('EA8', ID, INIT);
  const w = st.w;
  const keys = SENT.map((s) => `${w}-${s.id}`);
  const allDone = keys.every((k) => k in st.pred);
  const [ex, un, pr] = PARTS[w];
  const worldsDone = WORLDS.filter(([v]) => SENT.every((s) => `${v}-${s.id}` in st.pred)).length;

  return (
    <section className="md c3 c5" aria-labelledby="rs-title">
      <header className="md-head">
        <p className="md-tag">摹状词与辖域 · 推演</p>
        <h3 id="rs-title" className="md-title">
          在不同的世界里，这三句话各是真还是假？
        </h3>
        <p className="md-lede">
          K(x)：x 是当今的法国国王；B(x)：x 是秃头。先选一个世界，判断三句话的真假，再看罗素分析的三个部分哪些成立。四个世界都可以试。
        </p>
      </header>

      <Band>一 · 选一个世界（已完成 {worldsDone} / {WORLDS.length}）</Band>
      <Pick label="选择一个世界" value={w} opts={WORLDS} onPick={(v) => save({ ...st, w: v })} />
      <p className="md-muted">{WDESC[w]}</p>

      <Band>二 · 判断真假</Band>
      <ol className="v21-steps" aria-label="三句话">
        {SENT.map((s, i) => {
          const k = `${w}-${s.id}`;
          const p = st.pred[k];
          const t = truth(w, s.id);
          return (
            <li key={k} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>{s.zh}</b>
                <code className="v21-en" lang="und">
                  {' '}
                  {s.f}
                </code>
                <Pick label={`${s.zh}是真还是假`} value={p ?? null} opts={TF} onPick={(v) => save({ ...st, pred: { ...st.pred, [k]: v as 't' | 'f' } })} />
                {p && (
                  <span aria-live="polite">
                    <Verdict ok={(p === 't') === t} yes="对" no="再想想" />
                    {`在这个世界里，它是${t ? '真' : '假'}的。`}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {allDone && (
        <div aria-live="polite">
          <Band>三 · 罗素分析的三个部分</Band>
          <ul className="v21-steps" aria-label="三个部分">
            <li className="v21-step">存在（至少有一个当今的法国国王）：{mark(ex)}</li>
            <li className="v21-step">唯一（至多有一个当今的法国国王）：{mark(un)}</li>
            <li className="v21-step">述谓（这个人是秃头）：{ex && un ? mark(pr) : mark(null)}</li>
          </ul>
          <p className="md-muted">
            {w === 'none' &&
              '"存在"一项不成立，所以原句和窄辖域的否定都是假的，宽辖域的否定是真的。句子中没有任何部分需要指称一个不存在的国王：排中律保住了，因为原句和宽辖域的否定一真一假。'}
            {w === 'bald' && '三个部分都成立，原句是真的，两种否定都是假的。只有在这种世界里，两种读法的区别不影响结论。'}
            {w === 'hairy' && '"存在"和"唯一"成立，"述谓"不成立：原句是假的，两种否定都是真的。'}
            {w === 'two' && '"唯一"一项不成立：严格使用的"the"包含着唯一性，所以原句和窄辖域的否定都是假的。'}
          </p>
        </div>
      )}

      <Limits>
        <p>
          <b>四个世界是为这个练习构造的；公式是本章第三部分的写法。</b>这里演示的是罗素的分析，不是唯一的分析。斯特劳森认为，在没有法国国王的时候说原句，问题不在于它是假的，而在于它的预设落空了，所以既不真也不假。本章"后世批判与回应"讨论了这两种看法。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

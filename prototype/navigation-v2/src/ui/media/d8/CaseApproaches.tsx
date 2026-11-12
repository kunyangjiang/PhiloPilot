import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 六 · after the table "一个案例，两种进路" and its three remarks
// (content/D8_SAMPLE_DRAFT.md). The reader picks one of 宋秀琴's three
// decisions, predicts whether the individual-centred and the family- or
// relation-centred approaches agree, then sees the chapter's two table cells
// and its own remark. A second step walks the chapter's seven-step method on
// the same decision; the reader's notes are kept only in this browser. No
// approach is declared correct; nothing is scored.

const ID = 'bioethics-case-approaches';

type Dec = 'tell' | 'tube' | 'hasten';
const DECS: readonly (readonly [Dec, string])[] = [
  ['tell', '是否告诉她诊断'],
  ['tube', '是否插胃管'],
  ['hasten', '她请求"早点走"'],
];

type Guess = 'same' | 'reasons' | 'differ';
const GUESSES: readonly (readonly [Guess, string])[] = [
  ['same', '结论一致，理由也相同'],
  ['reasons', '结论接近，理由不同'],
  ['differ', '结论不同'],
];

/** The chapter's table (本章的应用), quoted. */
const CELLS: Record<Dec, { ind: string; rel: string; verdict: string; chapter: Guess }> = {
  tell: {
    ind: '她有能力，并且要求知道；应当告诉她，方式和节奏由她决定',
    rel: '告知是家庭的事；但"敬"和"关系的修复"都要求不把她排除在外',
    verdict: '在"不能瞒着她"上可以一致；在"由谁、怎样告诉"上不同',
    chapter: 'reasons',
  },
  tube: {
    ind: '她拒绝，应当尊重',
    rel: '儿子的"不能让我妈饿着"是关心的表达，应当认真对待；但关心不能变成强迫',
    verdict: '结论接近；理由不同',
    chapter: 'reasons',
  },
  hasten: {
    ind: '取决于对自主、福祉和双重效果的权衡，以及法律',
    rel: '家庭的参与可以帮助了解她的请求从哪里来：是疼痛，是孤独，还是怕成为负担？',
    verdict: '两种进路都要求先回应请求背后的苦，再讨论请求本身',
    chapter: 'reasons',
  },
};

/** The chapter's seven steps (本章的重建), with a prompt for this case. */
const STEPS: readonly (readonly [string, string])[] = [
  ['把三种问题分开', '医学上的事实是什么？伦理上的问题是什么？法律上有什么规定？'],
  ['问谁在决定，以及病人希望怎样决定', '她有能力吗？她希望谁参与？她是否选择了把决定交给别人？'],
  ['列出相关的原则和关系', '自主、不伤害、有利、公正；家庭的责任，关系的修复。'],
  ['具体化', '在这个决定中，每一条原则或关系到底要求什么？'],
  ['用另一种进路最强的反驳来检验', '如果你从个人出发，关系性的进路会说什么？反过来也一样。'],
  ['作出判断，并说出它的代价', '谁会因为这个判断承担不利？'],
  ['准备修改', '如果她的情况或意愿改变了，判断也应当重新审查。'],
];

interface Saved {
  dec: Dec | null;
  guess: Partial<Record<Dec, Guess>>;
  shown: boolean;
  notes: Partial<Record<Dec, string[]>>;
}
const INIT: Saved = { dec: null, guess: {}, shown: false, notes: {} };

const areaStyle = {
  width: '100%',
  font: 'inherit',
  fontSize: '14.5px',
  padding: '8px 10px',
  border: '1px solid var(--ink-3)',
  borderRadius: 'var(--radius)',
  background: 'var(--bg)',
  color: 'var(--ink)',
  resize: 'vertical' as const,
};

export default function CaseApproaches() {
  const [st, save] = useSavedIx<Saved>('D8', ID, INIT);
  const dec = st.dec;
  const mine = dec ? st.guess[dec] : undefined;
  const notes = dec ? st.notes[dec] ?? [] : [];
  const setNote = (i: number, v: string) => {
    if (!dec) return;
    const next = [...notes];
    next[i] = v;
    save({ ...st, notes: { ...st.notes, [dec]: next } });
  };

  return (
    <section className="md c3 c5" aria-labelledby="bca-title">
      <header className="md-head">
        <p className="md-tag">宋秀琴的病床边 · 两种进路</p>
        <h3 id="bca-title" className="md-title">两种进路在这里一致吗？</h3>
        <p className="md-lede">选宋秀琴的一个决定，先猜一猜以个人为中心的进路和以家庭、关系为中心的进路是否一致，再看本章的表格。然后可以用本章的七步方法，自己把这个决定走一遍。组件不判定哪一种进路正确，也不评分。</p>
      </header>

      <Band>一 · 选一个决定</Band>
      <Pick label="选择宋秀琴的一个决定" value={dec} opts={DECS} onPick={(d) => save({ ...st, dec: d, shown: false })} />

      {dec && (
        <>
          <Band>二 · 先猜，再看本章的表格</Band>
          <Pick label="两种进路的关系" value={mine ?? null} opts={GUESSES} onPick={(g) => save({ ...st, guess: { ...st.guess, [dec]: g } })} />
          <button type="button" className="md-reset" aria-expanded={st.shown} disabled={!mine && !st.shown} onClick={() => save({ ...st, shown: !st.shown })}>
            {st.shown ? '收起表格' : mine ? '看本章的表格' : '先猜，再看表格'}
          </button>
          {st.shown && (
            <div aria-live="polite">
              <Claim b="course" who="以个人为中心的进路（本章的应用）">
                {CELLS[dec].ind}
              </Claim>
              <Claim b="course" who="以家庭、关系为中心的进路（本章的应用）">
                {CELLS[dec].rel}
              </Claim>
              <Claim b="course" who="本章：一致还是分歧">
                {CELLS[dec].verdict}
              </Claim>
              <p className="md-muted">
                {mine === CELLS[dec].chapter
                  ? '你的猜测和本章的表格相同。'
                  : mine === 'differ'
                    ? '你猜两种进路的结论不同。本章的表格认为它们在这个决定上的结论比理论更接近；但如果宋秀琴失去了能力、事先也没有说过什么，两种进路对"由谁决定"会有不同的回答。'
                    : '你猜两种进路完全一致。本章的表格认为结论接近，但理由不同；理由不同，在别的案例上就可能导向不同的结论。'}{' '}
                本章还说：保护病人不受强迫，是两种进路都需要的。
              </p>
            </div>
          )}

          <Band>三 · 用七步方法走一遍（可选）</Band>
          <p className="md-muted">下面每一步只写一两句话。你写的内容只保存在这个浏览器里，不会被收集，也不评分。</p>
          <ol>
            {STEPS.map(([title, prompt], i) => (
              <li key={title}>
                <label>
                  <b>{title}</b>：<span className="md-muted">{prompt}</span>
                  <textarea rows={2} style={areaStyle} value={notes[i] ?? ''} onChange={(e) => setNote(i, e.target.value)} />
                </label>
              </li>
            ))}
          </ol>
        </>
      )}

      <Limits>
        <p>
          <b>宋秀琴、陈明和何医生都是本章虚构的人物。</b>
          三个决定的两栏和"一致还是分歧"一栏，取自本章第六部分"一个案例，两种进路"的表格；表中两种进路的读法都是本章的应用，不是儒家或 Ubuntu 传统本身的历史立场。七步方法取自本章第六部分"一种案例推理的方法"。本组件是哲学练习，不是医疗或法律建议。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

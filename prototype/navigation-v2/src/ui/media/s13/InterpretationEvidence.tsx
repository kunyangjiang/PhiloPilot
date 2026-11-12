import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 三 · after the worked interpretation of 王维《鹿柴》, the objection and the
// chapter's response, and the paragraph introducing the exercise
// (content/S13_SAMPLE_DRAFT.md). The reader takes one of two claims about the
// poem — the chapter's own interpretation, or the objection's Buddhist
// reading — and for each piece of evidence judges (1) what kind of evidence
// it is (inside the work, context, the author's life) and (2) whether it
// supports the claim, weakens it, or is merely compatible. After both
// judgements the component shows the chapter's analysis next to the reader's,
// with what the evidence can at most show. Every piece of evidence and every
// analysis restates the chapter's evidence table and its three-point
// response; the two lines marked as the component's own say so. The reader's
// judgement is never marked wrong, and no reading is declared the poem's only
// meaning.

const ID = 'interpretation-evidence';

type C = 'a' | 'b';
type K = 'in' | 'ctx' | 'bio';
type E = 'sup' | 'weak' | 'neu';

const CLAIMS: Record<C, { name: string; text: string }> = {
  a: {
    name: '本章的诠释',
    text: '这首诗写的是一次不完整的知觉：先只有声音而没有人，再只有一小片光落在青苔上。诗的效果，来自这种"不完整"使读者意识到四周的寂静和幽暗。',
  },
  b: {
    name: '反驳中的佛教读法',
    text: '"空山"的"空"就是佛教的"空"（śūnyatā）：诗说的是，人的声音和光都是暂时的现象，没有自性；诗人看到的是现象的空。',
  },
};
const COPTS: readonly (readonly [C, string])[] = [
  ['a', CLAIMS.a.name],
  ['b', CLAIMS.b.name],
];

const KNAME: Record<K, string> = { in: '作品内部', ctx: '语境', bio: '作者的传记' };
const KOPTS: readonly (readonly [K, string])[] = [
  ['in', KNAME.in],
  ['ctx', KNAME.ctx],
  ['bio', KNAME.bio],
];
const ENAME: Record<E, string> = { sup: '支持', weak: '削弱', neu: '无关或只是相容' };
const EOPTS: readonly (readonly [E, string])[] = [
  ['sup', ENAME.sup],
  ['weak', ENAME.weak],
  ['neu', ENAME.neu],
];

interface Ev {
  id: string;
  text: string;
  kind: K;
  /** The chapter's analysis for each claim, and what the evidence can at most show. */
  on: Record<C, { e: E; most: string; own?: boolean }>;
}

const EVS: Ev[] = [
  {
    id: 'e1',
    text: '"不見人"与"但聞人語響"相对：有人，却看不见。',
    kind: 'in',
    on: {
      a: { e: 'sup', most: '支持"只有声音而没有人"；但只说明了前两句。' },
      b: { e: 'neu', most: '与佛教的读法相容，但不需要它："有人而看不见"本身不涉及"没有自性"。', own: true },
    },
  },
  {
    id: 'e2',
    text: '"返景"是傍晚的余光，"深林"中光线本来很暗，光只照在"青苔上"。',
    kind: 'in',
    on: {
      a: { e: 'sup', most: '支持"一小片光"；但"一小片"是读者的推断，诗没有说光有多大。' },
      b: { e: 'neu', most: '相容：本章说，佛教的读法可以被理解为对这一效果的进一步诠释（寂静中的光是短暂的）；但这不是诗明说的。' },
    },
  },
  {
    id: 'e3',
    text: '"復照"的"復"：光是"又一次"照在这里。',
    kind: 'in',
    on: {
      a: { e: 'sup', most: '暗示时间：这是一天中的某个时刻，光将要消失；但"復"也可以只是"又、再"，不必有深意。' },
      b: { e: 'neu', most: '本章没有把这条证据用于佛教的读法。它最多说明光是短暂的；"短暂"与"没有自性"不是同一个主张。', own: true },
    },
  },
  {
    id: 'e4',
    text: '这首诗属于《辋川集》，一组描写辋川各处景点的诗。',
    kind: 'ctx',
    on: {
      a: { e: 'sup', most: '这是一首山水诗，读者应当首先把它当作对一个地方的描写；但种类只告诉我们从哪里开始读，不决定读出什么。' },
      b: { e: 'weak', most: '本章说，把一首山水诗读成说理的诗，是对它的种类的改变，这需要更强的证据。它削弱的是"诗说的就是空"，不是"可以联想到空"。' },
    },
  },
  {
    id: 'e5',
    text: '王维与佛教的关系（通行的介绍：他字摩诘，常被称为"诗佛"）。',
    kind: 'bio',
    on: {
      a: { e: 'neu', most: '本章的主张有意没有依靠这条证据。' },
      b: { e: 'sup', most: '最弱的一种证据：传记只能说明一种读法是可能的，不能说明诗里确实有它。' },
    },
  },
  {
    id: 'e6',
    text: '"空山"在山水诗中是一个常见的说法，指人迹稀少的山。',
    kind: 'ctx',
    on: {
      a: { e: 'neu', most: '与主张相容："空"的平常意思，正好与寂静和幽暗一致。' },
      b: { e: 'weak', most: '本章说，"空山"本身不需要佛教的解释；所以"空"字不能单独证明佛教的意思。' },
    },
  },
  {
    id: 'e7',
    text: '诗中没有说理的句子，没有"知""觉""悟"一类的词。',
    kind: 'in',
    on: {
      a: { e: 'neu', most: '与主张相容：本章的诠释也不说诗在讲道理。' },
      b: { e: 'weak', most: '本章说，把它读成教义的诗需要更强的证据；诗的内部没有只有在佛教的读法下才说得通的东西。' },
    },
  },
];

interface Saved {
  c: C | null;
  kind: Record<string, K>;
  eff: Record<string, E>;
}
const INIT: Saved = { c: null, kind: {}, eff: {} };

export default function InterpretationEvidence() {
  const [st, save] = useSavedIx<Saved>('S13', ID, INIT);
  const c = st.c;
  const judged = c ? EVS.filter((ev) => st.kind[ev.id] && st.eff[c + ev.id]).length : 0;

  return (
    <section className="md c3 c5" aria-labelledby="ie-title">
      <header className="md-head">
        <p className="md-tag">一个主张 · 七条证据</p>
        <h3 id="ie-title" className="md-title">这条证据最多能证明什么？</h3>
        <p className="md-lede">先选一个关于《鹿柴》的主张。再逐条判断：这条证据是哪一种证据？它支持、削弱这个主张，还是与它无关或只是相容？两项都判断后，组件会给出本章的分析。组件不会告诉你哪一种诠释是唯一正确的。</p>
      </header>

      <Band>一 · 选一个主张</Band>
      <Pick label="选择一个主张" value={c} opts={COPTS} onPick={(v) => save({ ...st, c: v })} />
      {c && (
        <p>
          <b>主张：</b>
          {CLAIMS[c].text}
        </p>
      )}

      {c && (
        <>
          <Band>二 · 逐条判断证据</Band>
          <ol className="v21-steps" aria-label="七条证据">
            {EVS.map((ev, i) => {
              const k = st.kind[ev.id];
              const e = st.eff[c + ev.id];
              const an = ev.on[c];
              return (
                <li key={ev.id} className="v21-step">
                  <span className="v21-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <p>{ev.text}</p>
                    <Pick
                      label={`证据 ${i + 1} 是哪一种证据`}
                      value={k ?? null}
                      opts={KOPTS}
                      onPick={(v) => save({ ...st, kind: { ...st.kind, [ev.id]: v } })}
                    />
                    <Pick
                      label={`证据 ${i + 1} 与这个主张的关系`}
                      value={e ?? null}
                      opts={EOPTS}
                      onPick={(v) => save({ ...st, eff: { ...st.eff, [c + ev.id]: v } })}
                    />
                    {k && e && (
                      <div aria-live="polite">
                        <p className="md-muted">
                          你的判断：{KNAME[k]}，{ENAME[e]}。本章的分析：{KNAME[ev.kind]}，{ENAME[an.e]}。
                          {k === ev.kind && e === an.e ? '两者一致。' : '如果两者不同，想一想你和本章在哪一点上看法不同；你的理由也可能成立。'}
                        </p>
                        <Claim b="course">最多能证明：{an.most}{an.own ? '（这一条是组件的说明，本章没有直接讨论）' : ''}</Claim>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="md-muted" aria-live="polite">
            你已经判断了 {judged} / {EVS.length} 条证据。
          </p>
          {judged === EVS.length && (
            <div aria-live="polite">
              <Claim b="course">
                本章的诠释：本章的主张主要依靠作品内部的证据；佛教的读法是一种可以被辩护的扩展，与诗的内部证据相容，而把它说成"诗说的就是缘起性空"，则超出了证据。这是本章对证据的权衡，不是唯一可能的结论。
              </Claim>
              <p className="md-muted">{c === 'a' ? '也换成"反驳中的佛教读法"再判断一次：同一条证据，对两个主张的分量可能不同。' : '也换成"本章的诠释"再判断一次：同一条证据，对两个主张的分量可能不同。'}</p>
            </div>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>七条证据和本章的分析，复述本章第三部分的证据表、反驳和三点回应。</b>
          两处标明"组件的说明"的分析是为练习补充的，本章没有直接讨论。"诗佛"的称呼依据通行的介绍。组件不评分：你的判断与本章不同时，组件只把两者并列。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

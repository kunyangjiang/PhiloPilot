import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 一 · after the table of six cases and two theories and the paragraph under it
// (content/S6_SAMPLE_DRAFT.md). Two parts, none graded:
// 1. Six puzzle cases about names. The reader gives their own verdict; then the
//    component shows what descriptivism and the causal-historical picture say,
//    restating the chapter's table. "Needs a further account" is shown as such,
//    not as a failure.
// 2. The martini case: the reader says whom "the man drinking a martini" picks
//    out, and the component separates semantic from speaker's reference.
// Every theory verdict restates the chapter (which follows the SEP entry
// "Reference"); the component adds none of its own and does not say which
// theory is right.

const ID = 'reference-cases';

type V = 'x' | 'y' | 'unsure';
/** What a theory says about a case: agrees with option x or y, or needs a further account. */
type T = 'x' | 'y' | 'more';

interface Case {
  id: string;
  name: string;
  setup: string;
  q: string;
  x: string;
  y: string;
  desc: { v: T; why: string };
  causal: { v: T; why: string };
}

const CASES: Case[] = [
  {
    id: 'child',
    name: '知之甚少的孩子',
    setup: '一个孩子只知道"孔子是古代的大人物"。他说："孔子是鲁国人。"',
    q: '他在谈论孔子吗？',
    x: '是',
    y: '不是',
    desc: { v: 'more', why: '描述太弱，挑不出唯一的人；要借用共同体（特别是专家）的描述，才能说他在谈论孔子。' },
    causal: { v: 'x', why: '孩子的名字来自老师，老师的来自书本，一直追溯到孔子被称呼的时候；所以他在谈论孔子。' },
  },
  {
    id: 'columbus',
    name: '错误的描述',
    setup: '一个人以为"哥伦布"是"第一个认为地球是圆的人"。他说："哥伦布是航海家。"',
    q: '他的"哥伦布"指谁？',
    x: '哥伦布',
    y: '真正第一个认为地球是圆的人',
    desc: { v: 'y', why: '名字指满足描述的那个人，也就是真正第一个这样认为的人，而不是哥伦布。' },
    causal: { v: 'x', why: '名字仍指哥伦布；他只是对哥伦布有一个错误的信念。' },
  },
  {
    id: 'modal',
    name: '可能没有编订',
    setup: '有人说："孔子可能没有编订《春秋》。"',
    q: '这句话是真的吗？',
    x: '是真的',
    y: '不是真的',
    desc: { v: 'more', why: '如果"孔子"的意思是"编订了《春秋》的那位老师"，在自然的读法下这句话有困难；除非让描述"严格化"。' },
    causal: { v: 'x', why: '真：名字在各种可能的情况下指同一个人，而孔子完全可能一生没有碰过《春秋》。' },
  },
  {
    id: 'stars',
    name: '晨星与昏星',
    setup: '古代的天文学家说："晨星就是昏星。"',
    q: '这是一个发现吗？',
    x: '是',
    y: '不是',
    desc: { v: 'x', why: '容易说明：两个名字联系着两个不同的描述，发现它们被同一个东西满足，需要观测。' },
    causal: { v: 'more', why: '需要另作说明：两个名字指同一个对象，名字的差别似乎没有放进内容的地方（第二部分讨论直接指称论的几种回应）。' },
  },
  {
    id: 'santa',
    name: '空的名字',
    setup: '有人说："圣诞老人住在北极。"',
    q: '"圣诞老人"这个名字有意义吗？',
    x: '有',
    y: '没有',
    desc: { v: 'x', why: '有意义：它联系着一个描述，只是没有任何东西满足这个描述。' },
    causal: { v: 'more', why: '链条的起点是一个故事，不是一个对象；因果图景需要另作说明。' },
  },
  {
    id: 'madagascar',
    name: '指称的改变',
    setup: '据说"马达加斯加"原来是非洲大陆某个地方的名字，后来被误用在那个岛上。（埃文斯的例子，本章依据通行的介绍。）',
    q: '今天的"马达加斯加"指什么？',
    x: '那个岛',
    y: '大陆上的那个地方',
    desc: { v: 'x', why: '容易说明：今天说话者联系的描述是"那个岛"。' },
    causal: { v: 'more', why: '如果指称只是沿着链条传下来，今天的名字似乎应该指大陆；需要说明链条怎样被新的用法改变。' },
  },
];

const VOPTS = (c: Case): readonly (readonly [V, string])[] => [
  ['x', c.x],
  ['y', c.y],
  ['unsure', '拿不准'],
];

type M = 'holder' | 'drinker' | 'unsure';
const MOPTS: readonly (readonly [M, string])[] = [
  ['holder', '那个拿着酒杯的人'],
  ['drinker', '真正在喝马提尼的人（如果有的话）'],
  ['unsure', '拿不准'],
];

interface Saved {
  ans: Record<string, V>;
  martini: M | null;
}
const INIT: Saved = { ans: {}, martini: null };

const said = (c: Case, t: T) => (t === 'x' ? `与"${c.x}"一致` : t === 'y' ? `与"${c.y}"一致` : '需要另作说明');

export default function ReferenceCases() {
  const [st, save] = useSavedIx<Saved>('S6', ID, INIT);
  const done = CASES.filter((c) => st.ans[c.id]).length;
  const firm = CASES.filter((c) => st.ans[c.id] === 'x' || st.ans[c.id] === 'y');
  const agree = (k: 'desc' | 'causal') => firm.filter((c) => c[k].v === st.ans[c.id]).length;
  const more = (k: 'desc' | 'causal') => firm.filter((c) => c[k].v === 'more').length;

  return (
    <section className="md c3 c5" aria-labelledby="rc-title">
      <header className="md-head">
        <p className="md-tag">名字的疑难案例 · 先判断，再看理论</p>
        <h3 id="rc-title" className="md-title">六个案例：这个名字指谁？</h3>
        <p className="md-lede">
          对每一个案例先说出你自己的判断——没有对错。然后看描述论和因果—历史的图景各怎样说。"需要另作说明"不等于理论失败，只说明它要再多做一些工作。
        </p>
      </header>

      <Band>一 · 六个案例</Band>
      <p className="md-muted">
        已判断 {done} / {CASES.length}
      </p>
      <ol className="v21-steps" aria-label="六个案例">
        {CASES.map((c, i) => {
          const a = st.ans[c.id];
          return (
            <li key={c.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>{c.name}。</b>
                {c.setup}
                <span className="md-muted">{c.q}</span>
                <Pick label={`案例 ${i + 1}：${c.name}。${c.q}`} value={a} opts={VOPTS(c)} onPick={(v) => save({ ...st, ans: { ...st.ans, [c.id]: v } })} />
                {a && (
                  <span aria-live="polite">
                    <span className="md-muted">描述论（{said(c, c.desc.v)}）：</span>
                    {c.desc.why}
                    <br />
                    <span className="md-muted">因果—历史的图景（{said(c, c.causal.v)}）：</span>
                    {c.causal.why}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {done === CASES.length && (
        <div aria-live="polite">
          <p>
            在你作出明确判断的 {firm.length} 个案例中：描述论与你一致 {agree('desc')} 个、需要另作说明 {more('desc')} 个；因果—历史的图景与你一致 {agree('causal')} 个、需要另作说明 {more('causal')} 个。"拿不准"的案例没有计入。
          </p>
          <Claim b="course">
            每一种理论都有它容易说明的案例和需要另作说明的案例：描述论善于说明认识价值和空的名字，因果图景善于说明知之甚少的说话者和模态的判断。所以本章介绍了各种混合的理论，SEP 的条目也说几种模型"并不严格地互相排斥"。这里的计数只帮你看清你的直觉偏向哪里，不说明哪一种理论正确。
          </Claim>
        </div>
      )}

      <Band>二 · 语义指称与说话者指称</Band>
      <p>
        在一个聚会上，你看见一个人拿着一只马提尼酒杯，问朋友："那个喝马提尼的人是谁？"其实他杯子里装的是水。你的话指的是谁？
      </p>
      <Pick label="马提尼的例子：你的话指的是谁？" value={st.martini} opts={MOPTS} onPick={(m) => save({ ...st, martini: m })} />
      {st.martini && (
        <div aria-live="polite">
          <p>
            <b>两种回答都有道理，因为它们回答的是两个问题。</b>
            "那个拿着酒杯的人"是<b>说话者指称</b>：你想让朋友想到谁，这是一个语用的概念。"真正在喝马提尼的人"是<b>语义指称</b>：这个摹状词按照语言的规则指什么；如果没有人在喝马提尼，它就什么也不指。
          </p>
          <p className="md-muted">
            唐奈兰用这类例子说明摹状词可以被"指称性地"使用；克里普克回应说，这时摹状词本身不必在语义上指那个人。这个区分能帮描述论回答一部分反驳——但因果论者会说，名字的情况与摹状词不同。
          </p>
        </div>
      )}

      <Limits>
        <p>
          <b>六个案例、两种理论的说法和马提尼的例子，复述本章第一部分的表格和讨论（依据 SEP 的"指称"条目）。</b>
          "马达加斯加"一例本章依据通行的介绍。哥伦布的例子和孔子与《春秋》的例子是本章所设。这个组件不评分，也不判定描述论或因果论哪一个正确；混合的理论没有单独列出。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

import { Band, Claim, Limits, OrigSrc, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 三 · after the reading of Cooper p. 134 (content/AF3_SAMPLE_DRAFT.md).
// Reading lived experience as an argument. The chapter's five questions are
// applied to two of its own checked passages: Douglass, Narrative (1845) p. 33,
// and Cooper, A Voice from the South (1892) p. 134. For each passage the reader
// says which question each of five statements answers; last, a view (no right
// answer) on which question to ask first. Both English passages and their
// translations are the chapter's own; every statement restates the chapter's text.

const ID = 'experience-argument';

type Q = 1 | 2 | 3 | 4 | 5;
const QS: readonly (readonly [Q, string])[] = [
  [1, '一 谁的经验'],
  [2, '二 报告了什么'],
  [3, '三 揭示的结构'],
  [4, '四 一般主张'],
  [5, '五 能支持多远'],
];
const QNAME: Record<Q, string> = {
  1: '一、谁的经验，在什么处境中？',
  2: '二、经验报告了什么？',
  3: '三、它揭示了什么结构？',
  4: '四、它支持什么一般主张？',
  5: '五、它能支持多远？',
};

interface Passage {
  id: string;
  title: string;
  src: string;
  orig: string;
  zh: string;
  items: { id: string; text: string; q: Q }[];
}

// Items are listed out of order on purpose.
const PASSAGES: Passage[] = [
  {
    id: 'douglass',
    title: '道格拉斯：主人的禁令',
    src: '道格拉斯《道格拉斯自述》，1845 年，第 33 页',
    orig: 'I now understood what had been to me a most perplexing difficulty--to wit, the white man\'s power to enslave the black man. It was a grand achievement, and I prized it highly. From that moment, I understood the pathway from slavery to freedom.',
    zh: '我现在明白了一件一直使我十分困惑的事情——那就是白人奴役黑人的力量。这是一个巨大的收获，我十分珍视它。从那一刻起，我明白了从奴隶制通向自由的道路。',
    items: [
      { id: 'd-structure', text: '奴隶制不只靠鞭子维持，还靠被奴役者的无知来维持——如果奴隶天生就适合做奴隶，就不需要禁止他识字。', q: 3 },
      { id: 'd-reach', text: '这个推论对美国南方的奴隶制是有力的，那里的法律确实禁止教奴隶识字；推广到其他形式的统治，需要另外的论证。', q: 5 },
      { id: 'd-who', text: '一个被奴役的孩子，在巴尔的摩的奥尔德家，听到主人的话。', q: 1 },
      { id: 'd-claim', text: '获得理性能力（识字、教育）就是反抗奴隶制的道路。', q: 4 },
      { id: 'd-report', text: '主人禁止女主人教他识字，并当着他的面说明了理由：识字会使他不再适合做奴隶。', q: 2 },
    ],
  },
  {
    id: 'cooper',
    title: '库珀：两个问题，一个未被承认的因素',
    src: '库珀《来自南方的声音》，1892 年，第 134 页',
    orig: 'She is confronted by both a woman question and a race problem, and is as yet an unknown or an unacknowledged factor in both.',
    zh: '她同时面对一个女性问题和一个种族问题，而在这两个问题中，她都还是一个未知的、或者说未被承认的因素。',
    items: [
      { id: 'c-claim', text: '一种只以单一维度为标准的解放运动，会遗漏处在两个维度交叉处的人。', q: 4 },
      { id: 'c-who', text: '一位生于奴隶制之下、在教育界工作的黑人女性，从"南方的黑人女性"的位置上发言。', q: 1 },
      { id: 'c-reach', text: '一百年后克伦肖在就业歧视的案例中发现了同样的结构；但纳什追问：交叉性只适用于多重边缘化的人吗？', q: 5 },
      { id: 'c-report', text: '女性运动以白人女性为标准，种族运动以黑人男性为标准；黑人女性在两者中都没有被询问。', q: 2 },
      { id: 'c-structure', text: '问题不在压迫的数量（"双倍"），而在她在两种框架中都是一个"未被承认的因素"。', q: 3 },
    ],
  },
];
const ALL = PASSAGES.flatMap((p) => p.items);

type V = 1 | 3 | 5;
const VS: readonly (readonly [V, string])[] = [
  [1, '先问：谁的经验'],
  [3, '先问：揭示了什么结构'],
  [5, '先问：能支持多远'],
];
const VNOTE: Record<V, string> = {
  1: '长处：在这些文本中，说话者的位置本身就是论证的一部分——被奴役者看到了主人的禁令所透露的东西。代价：如果只停在这一步，就容易滑向"这是我的经验，所以你不能反驳"，或者反过来，用说话者的身份来打发论证。',
  3: '长处：结构是经验与一般主张之间的桥梁；道格拉斯和库珀的论证力量，主要来自他们提炼出的结构（对无知的依赖、两种框架中的不可见）。代价：先找结构，可能会把一段经验过快地纳入现成的概念，忽视它与别的经验的差别。',
  5: '长处：这是检验的问题，斯科特和纳什的批评都落在这里，它使经验成为可以争论的论证。代价：如果一开始就追问推广的范围，可能还没有弄清经验报告了什么，就先怀疑了它。',
};

interface Saved {
  pick: Record<string, Q>;
  view: V | null;
}
const INIT: Saved = { pick: {}, view: null };

export default function ExperienceArgument() {
  const [st, save] = useSavedIx<Saved>('AF3', ID, INIT);
  const doneOf = (p: Passage) => p.items.filter((x) => x.id in st.pick).length;
  const okOf = (p: Passage) => p.items.filter((x) => st.pick[x.id] === x.q).length;
  const firstDone = doneOf(PASSAGES[0]) === PASSAGES[0].items.length;
  const allDone = ALL.every((x) => x.id in st.pick);

  const renderPassage = (p: Passage, n: number) => (
    <div key={p.id}>
      <Band>
        {n === 0 ? '一' : '二'} · {p.title}（已选 {doneOf(p)} / {p.items.length}）
      </Band>
      <OrigSrc src={p.src} orig={p.orig} lang="en" zh={p.zh} />
      <ol className="v21-steps" aria-label={`${p.title}：五条陈述`}>
        {p.items.map((x, i) => {
          const a = st.pick[x.id];
          const has = x.id in st.pick;
          return (
            <li key={x.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span>{x.text}</span>
                <Pick label={`${p.title}，陈述 ${i + 1} 回答的是哪一个问题`} value={a} opts={QS} onPick={(v) => save({ ...st, pick: { ...st.pick, [x.id]: v } })} />
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === x.q} yes="与本章的读法一致" no="本章的读法不同" />
                    {a === x.q ? '' : `本章把它看作对"${QNAME[x.q]}"的回答。`}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
      {doneOf(p) === p.items.length && (
        <p className="md-muted" aria-live="polite">
          {okOf(p)} / {p.items.length} 条与本章的读法一致。
          {p.id === 'douglass'
            ? '注意第三条和第四条的区别：结构是"奴隶制依赖无知"，一般主张是由此推出的"教育是反抗的道路"。'
            : '注意第三条：库珀说的是"未被承认"，不是"受到双倍的压迫"——这正是后来克伦肖批评"相加"思路的地方。'}
        </p>
      )}
    </div>
  );

  return (
    <section className="md c3 c5" aria-labelledby="ea-title">
      <header className="md-head">
        <p className="md-tag">把生活经验读作论证 · 五个问题</p>
        <h3 id="ea-title" className="md-title">两段原文，用本章的五个问题来读</h3>
        <p className="md-lede">
          每段原文下面有五条陈述，顺序是打乱的。请说出每一条回答的是导读中五个问题的哪一个。读完道格拉斯，再读库珀；最后一步只是你的看法，没有标准答案。
        </p>
      </header>

      {renderPassage(PASSAGES[0], 0)}
      {firstDone && <div aria-live="polite">{renderPassage(PASSAGES[1], 1)}</div>}

      {allDone && (
        <div aria-live="polite">
          <Band>三 · 读到一段"我经历过"的陈述，你会先问哪一个问题？</Band>
          <Pick label="读到一段关于生活经验的陈述，先问哪一个问题" value={st.view} opts={VS} onPick={(v) => save({ ...st, view: v })} />
          {st.view && (
            <p className="md-muted" aria-live="polite">
              {VNOTE[st.view]}
            </p>
          )}
          {st.view && (
            <Claim b="course">
              经验是证据，不是结论。五个问题的用处，是把"发生了什么"和"由此能推出什么"分开，再检验后者能支持多远。
            </Claim>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>两段英文原文和试译都是本章核对过的段落（版本和页码见注释）；每一条陈述都复述课文的内容，"回答哪一个问题"是本章的读法，不是道格拉斯或库珀自己的分类。</b>
          有几条陈述放在相邻的两个问题之下也说得通，例如"结构"和"一般主张"之间的界线；反馈说明的是本章的读法。克伦肖和纳什的部分依据 SEP 条目的转述。第三步没有标准答案。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

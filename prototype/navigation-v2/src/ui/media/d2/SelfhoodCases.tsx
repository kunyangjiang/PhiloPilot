import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 六 · after the evaluation (the cases × theories table, the three theories
// with their strongest objections, the distorting categories) and the
// paragraph introducing the exercise (content/D2_SAMPLE_DRAFT.md).
// The reader chooses one of the chapter's five positions, then predicts its
// answer to each of the four introductory cases (including "not its
// question"). The component then shows the chapter's own cell from the table
// in part 六 and, for "not its question", why forcing an answer distorts the
// theory. Every answer and cell is the chapter's reconstruction, not a
// quotation; nothing is scored.

const ID = 'selfhood-cases';

type Th = 'abh' | 'par' | 'simple' | 'akan' | 'conf';
const THEORIES: readonly (readonly [Th, string])[] = [
  ['abh', '阿毗达磨的还原论'],
  ['par', '帕菲特式的还原论'],
  ['simple', '非还原论（"简单的观点"）'],
  ['akan', '关系性的理论（维雷杜的两层观）'],
  ['conf', '儒家的读法'],
];

const NOT = 'x';

interface Case {
  id: string;
  title: string;
  q: string;
  opts: { id: string; text: string }[];
  /** The chapter's answer for each theory (an option id). */
  key: Record<Th, string>;
  /** The chapter's cell for each theory (part 六, table). */
  cell: Record<Th, string>;
}

const CASES: Case[] = [
  {
    id: 'c1',
    title: '案例一：渐忘',
    q: '林老师已经不记得自己的学生和女儿。女儿问："她还是我妈妈吗？"',
    opts: [
      { id: 'a', text: '"还是不是她"是约定的问题；执取于"从前的她"是苦' },
      { id: 'b', text: '连接大大减弱；"她还是不是她"可能是一个空的问题' },
      { id: 'c', text: '她还是她，同一性是全有或全无的' },
      { id: 'd', text: '她作为人类的地位不变；关系的身份由家人维持' },
      { id: 'e', text: '子女的孝不依赖父母是否记得自己' },
      { id: NOT, text: '不是它的问题' },
    ],
    key: { abh: 'a', par: 'b', simple: 'c', akan: 'd', conf: 'e' },
    cell: {
      abh: '相续仍在；"还是不是她"是约定的问题，执取于"从前的她"是苦。',
      par: '心理的连接大大减弱；"她还是不是她"可能是一个空的问题，重要的是剩下多少连接。',
      simple: '她还是她，同一性是全有或全无的。',
      akan: '她作为人类的地位不变；她作为母亲、作为长者的关系身份仍由家人维持。',
      conf: '子女的孝不依赖父母是否记得自己。',
    },
  },
  {
    id: 'c2',
    title: '案例二：复制',
    q: '机器在火星上造出一个分子结构完全相同的人。火星上的那个人，是不是你？',
    opts: [
      { id: 'a', text: '另一条相续的开始，与地球上的相续有因果关系' },
      { id: 'b', text: '他与你有关系 R；在销毁的版本中，这和通常的生存一样好' },
      { id: 'c', text: '至多一个是你；问题有确定的答案，只是我们可能不知道' },
      { id: NOT, text: '不是它的问题' },
    ],
    key: { abh: 'a', par: 'b', simple: 'c', akan: NOT, conf: NOT },
    cell: {
      abh: '古代论师没有讨论；按其原则，火星上的人是另一条相续的开始，与地球上的相续有因果关系。',
      par: '火星上的人与你有关系 R；在销毁的版本中，这和通常的生存一样好。',
      simple: '至多一个是你，或者都不是；问题有确定的答案，只是我们可能不知道。',
      akan: '不是它的问题。',
      conf: '不是它的问题。',
    },
  },
  {
    id: 'c3',
    title: '案例三：旧罪',
    q: '三十年前伤人逃走的人，三十年里成了谁都说好的人。受伤的人说"伤我的那个人已经不在了"，法官说"就是他"。',
    opts: [
      { id: 'a', text: '后果落在因果的相续上；后来的善业影响业的成熟' },
      { id: 'b', text: '连接减弱时，责任可以减弱' },
      { id: 'c', text: '就是他，完全的责任' },
      { id: 'd', text: '他的成就提高了他作为"人"的程度，但不取消对受害者的义务' },
      { id: 'e', text: '改过是修身的一部分，但不取消对受伤者的亏欠' },
      { id: NOT, text: '不是它的问题' },
    ],
    key: { abh: 'a', par: 'b', simple: 'c', akan: 'd', conf: 'e' },
    cell: {
      abh: '后果落在因果的相续上；后来的善业影响业的成熟。',
      par: '连接减弱时，责任可以减弱。',
      simple: '就是他，完全的责任。',
      akan: '他的成就（三十年的善行）提高了他作为"人"的程度，但不取消对受害者的义务。',
      conf: '改过是修身的一部分，但不取消对受伤者的亏欠。',
    },
  },
  {
    id: 'c4',
    title: '案例四："不是人"',
    q: '村里人说抛弃父母、骗走公款的人"不是一个人"。',
    opts: [
      { id: 'a', text: '一个评价：他在成就上失败了，但不能跌破 okra 的底层' },
      { id: 'b', text: '君子与小人的评价；人人可以修身' },
      { id: NOT, text: '不是它的（主要）问题' },
    ],
    key: { abh: NOT, par: NOT, simple: NOT, akan: 'a', conf: 'b' },
    cell: {
      abh: '不是它的主要问题；人人都有成佛的可能，不因恶行而失去。',
      par: '不是它的主要问题。',
      simple: '不是它的主要问题。',
      akan: '一个评价：他在成就上失败了；但不能跌破 okra 的底层。',
      conf: '君子与小人的评价；人人可以修身。',
    },
  },
];

const WHY_NOT: Record<string, string> = {
  c2: '复制是现代分析哲学设计的思想实验。本章说，把关系性的理论放到这个案例上，就像问一位阿肯的长者"复制机器造出的人有没有 okra"：强行回答会制造出虚假的分歧。',
  c4: '数目的同一和心理的连续，回答不了"他还是不是一个人"这个规范的问题；村里人谴责的正是这同一个人。这里，关系性的理论最有话说。',
};

interface Saved {
  th: Th | null;
  pred: Record<string, string>;
  shown: string[];
}
const INIT: Saved = { th: null, pred: {}, shown: [] };

export default function SelfhoodCases() {
  const [st, save] = useSavedIx<Saved>('D2', ID, INIT);
  const th = st.th;
  const thName = THEORIES.find(([v]) => v === th)?.[1];
  const allShown = th !== null && CASES.every((c) => st.shown.includes(c.id));
  const notCases = th ? CASES.filter((c) => c.key[th] === NOT).map((c) => c.title.split('：')[0]) : [];

  return (
    <section className="md c3 c5" aria-labelledby="sc-title">
      <header className="md-head">
        <p className="md-tag">四个案例 · 五种立场</p>
        <h3 id="sc-title" className="md-title">这种立场会怎样回答？</h3>
        <p className="md-lede">先选一种立场，再判断它会怎样回答导读的四个案例——包括"不是它的问题"。然后看本章第六部分表格中的那一格。表格是本章的重建，不是原典的话；组件不评分。</p>
      </header>

      <Band>一 · 选一种立场</Band>
      <Pick
        label="选择一种立场"
        value={th}
        opts={THEORIES}
        onPick={(v) => save({ th: v, pred: v === th ? st.pred : {}, shown: v === th ? st.shown : [] })}
      />

      {th && (
        <>
          <Band>二 · 四个案例</Band>
          <ol className="v21-steps" aria-label={`${thName}在四个案例上的回答`}>
            {CASES.map((c, i) => {
              const mine = st.pred[c.id];
              const shown = st.shown.includes(c.id);
              const key = c.key[th];
              return (
                <li key={c.id} className="v21-step">
                  <span className="v21-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <p>
                      <b>{c.title}。</b>
                      {c.q}
                    </p>
                    <Pick
                      label={`${c.title}：${thName}会怎样回答`}
                      value={mine ?? null}
                      opts={c.opts.map((o) => [o.id, o.text] as const)}
                      onPick={(v) => save({ ...st, pred: { ...st.pred, [c.id]: v } })}
                    />
                    <button
                      type="button"
                      className="md-reset"
                      aria-expanded={shown}
                      disabled={!mine && !shown}
                      onClick={() => save({ ...st, shown: shown ? st.shown.filter((x) => x !== c.id) : [...st.shown, c.id] })}
                    >
                      {shown ? '收起本章的分析' : mine ? '看本章的分析' : '先作一个判断'}
                    </button>
                    {shown && (
                      <div aria-live="polite">
                        <Claim b="course">表格中的这一格：{c.cell[th]}</Claim>
                        <p className="md-muted">
                          {mine === key
                            ? '你的判断与表格一致。'
                            : `你的判断与表格不同：表格选的是"${c.opts.find((o) => o.id === key)?.text}"。想一想，你的回答依赖这种立场的哪一个前提。`}
                        </p>
                        {key === NOT && WHY_NOT[c.id] && <Claim b="course">为什么是"不是它的问题"：{WHY_NOT[c.id]}</Claim>}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          <Band>三 · 这种立场在哪里竞争</Band>
          {allShown ? (
            <div aria-live="polite">
              <Claim b="course">
                {notCases.length
                  ? `对${thName}来说，${notCases.join('、')}不是它的（主要）问题。`
                  : `${thName}对四个案例都有话说。`}
                本章从表格中读出的规律是：还原论和非还原论在案例二、三上竞争；关系性的理论在案例一、四上最有话说。这不只是因为答案不同，而是因为它们首先回答的是不同的问题。
              </Claim>
              <p className="md-muted">再选另一种立场，比较两者在哪一个案例上真正竞争、在哪一个案例上回答的是不同的问题。</p>
            </div>
          ) : (
            <p className="md-muted">看过四个案例的分析后，这里会总结这种立场在哪里竞争、在哪里"不是它的问题"。</p>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>案例是本章所设的，表格是本章的重建。</b>
          每一格是这种立场最可能的回答，依据本章第二至五部分；不是《相应部》、休谟、帕菲特、维雷杜或《论语》的原话。古代佛教论师没有讨论过复制一类的案例。组件不评分。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 二 · after the table of six cases and three criteria and the paragraph
// introducing this component (content/S4_SAMPLE_DRAFT.md). Two steps, none
// graded:
// 1. The reader gives a verdict on each of the six cases (gradual forgetting,
//    severe dementia, brain transplant, teleportation, duplication, fission).
//    After each verdict, what the three criteria in the chapter's table say:
//    psychological continuity with a non-branching clause, bodily or animal
//    continuity, and Parfitian reductionism.
// 2. A count of how often each criterion agrees with the reader's firm
//    verdicts. Where a criterion does not answer yes or no (Parfit's answers,
//    or "it depends"), it is left out of the count, and the component says why.
// Every verdict restates the chapter's table, which says each cell is one
// reading among others; nothing is added to it.

const ID = 'identity-cases';

type V = 'yes' | 'no' | 'unsure';
type S = 'yes' | 'no' | 'open';
type K = 'forget' | 'dementia' | 'transplant' | 'teleport' | 'duplicate' | 'fission';

interface Verdict {
  crit: string;
  says: S;
  why: string;
}

const PSY = '心理连续性（带不分枝条款）';
const BODY = '身体或动物的连续';
const PARFIT = '帕菲特式的还原论';

const CASES: Record<K, { name: string; text: string; q: string; verdicts: Verdict[] }> = {
  forget: {
    name: '渐进的遗忘（勇敢的军官）',
    text: '老将军记得自己做军官时的英勇；做军官时，他记得自己小时候因为偷果子挨了打。现在的将军完全忘了挨打的事。',
    q: '将军和那个挨打的孩子是同一个人吗？',
    verdicts: [
      { crit: PSY, says: 'yes', why: '将军记得军官，军官记得孩子：有一条记忆的链子。' },
      { crit: BODY, says: 'yes', why: '始终是同一个活的人类有机体。' },
      { crit: PARFIT, says: 'yes', why: '是同一个人；只是心理的连接逐渐减弱了。' },
    ],
  },
  dementia: {
    name: '严重失智',
    text: '一位老人患了严重的失智症，不再记得自己的过去，性格和计划也都与从前不同了。',
    q: '现在的他和三十年前的他是同一个人吗？',
    verdicts: [
      { crit: PSY, says: 'no', why: '心理的连续很弱，按这个标准他可能不再是同一个人格。' },
      { crit: BODY, says: 'yes', why: '他仍然是同一个动物，哪怕与过去没有任何心理的联系。' },
      { crit: PARFIT, says: 'open', why: '连接很弱；"是不是同一个"可能是一个空的问题。' },
    ],
  },
  transplant: {
    name: '大脑移植',
    text: '你的大脑被完整地移植到另一个身体中，原来的身体留在原处。醒来的那个人有你全部的记忆和性格。',
    q: '那个新身体里醒来的人是你吗？',
    verdicts: [
      { crit: PSY, says: 'yes', why: '心理连续性跟着大脑走。' },
      { crit: BODY, says: 'no', why: '你留在原来的身体（动物）那里；动物论者说，我们不会说接受肝脏移植的人"跟着肝脏走了"。' },
      { crit: PARFIT, says: 'open', why: '关系 R（心理的连接与连续）跟着大脑走；帕菲特问的是什么重要，而不只是是不是"你"。' },
    ],
  },
  teleport: {
    name: '传送',
    text: '一台机器扫描你的身体，在火星上用新的物质造出一个完全相同的人；地球上原来的身体被毁掉。',
    q: '火星上的那个人是你吗？',
    verdicts: [
      { crit: PSY, says: 'yes', why: '如果因果关系是"适当的"，他与你心理连续，又没有竞争者——而什么是"适当的因果关系"本身有争议。' },
      { crit: BODY, says: 'no', why: '原来的有机体被毁掉了，火星上是另一个有机体。' },
      { crit: PARFIT, says: 'open', why: '重要的东西（关系 R）被保留了。' },
    ],
  },
  duplicate: {
    name: '复制',
    text: '一台机器在你身旁造出了一个与你完全相同的人，有你全部的"记忆"。你自己也还在。',
    q: '那个复制品是你吗？',
    verdicts: [
      { crit: PSY, says: 'no', why: '原来的人是你，复制品不是。' },
      { crit: BODY, says: 'no', why: '原来的人是你，复制品是另一个有机体。' },
      { crit: PARFIT, says: 'open', why: '复制品与你有关系 R。' },
    ],
  },
  fission: {
    name: '分裂',
    text: '你的大脑的两个半球分别被移植到两个身体中，两个人都与你心理连续：都记得你的过去，都有你的性格和计划。',
    q: '左边醒来的那个人是你吗？',
    verdicts: [
      { crit: PSY, says: 'no', why: '有两个竞争者，不分枝的条款不满足：你不再存在。' },
      { crit: BODY, says: 'open', why: '取决于哪一个身体是原来的。' },
      { crit: PARFIT, says: 'open', why: '你不再存在，但重要的东西被保留了两份；"我还存在吗"可能是一个空的问题。' },
    ],
  },
};
const ORDER: K[] = ['forget', 'dementia', 'transplant', 'teleport', 'duplicate', 'fission'];
const OPTS: readonly (readonly [V, string])[] = [
  ['yes', '是'],
  ['no', '不是'],
  ['unsure', '拿不准'],
];
const SAYS: Record<S, string> = { yes: '是', no: '不是', open: '不直接回答"是"或"不是"' };
const word = (v: V) => OPTS.find(([x]) => x === v)![1];

interface Saved {
  verdict: Partial<Record<K, V>>;
}
const INIT: Saved = { verdict: {} };

export default function IdentityCases() {
  const [st, save] = useSavedIx<Saved>('S4', ID, INIT);
  const done = ORDER.filter((k) => st.verdict[k]).length;

  // Per criterion: agreement with the reader's firm verdicts, where the criterion answers yes or no.
  const tally = new Map<string, { agree: number; total: number; open: number }>();
  for (const k of ORDER) {
    const v = st.verdict[k];
    if (!v || v === 'unsure') continue;
    for (const c of CASES[k].verdicts) {
      const t = tally.get(c.crit) ?? { agree: 0, total: 0, open: 0 };
      if (c.says === 'open') t.open += 1;
      else {
        t.total += 1;
        if (c.says === v) t.agree += 1;
      }
      tally.set(c.crit, t);
    }
  }

  return (
    <section className="md c3 c5" aria-labelledby="ic-title">
      <header className="md-head">
        <p className="md-tag">人格同一性的案例 · 先判断，再看标准</p>
        <h3 id="ic-title" className="md-title">六个案例：那还是你吗？</h3>
        <p className="md-lede">
          先对每个案例作你自己的判断——没有对错。每作一个判断，就能看到三种标准对这个案例怎么说。最后看哪一种标准与你的判断吻合得多。
        </p>
      </header>

      <Band>一 · 你的判断（已作 {done} / {ORDER.length}）</Band>
      <ol className="v21-steps" aria-label="六个案例">
        {ORDER.map((k, i) => {
          const x = CASES[k];
          const v = st.verdict[k];
          return (
            <li key={k} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span>
                  <b>{x.name}：</b>
                  {x.text}
                  <b> {x.q}</b>
                </span>
                <Pick label={`${x.name}：${x.q}`} value={v} opts={OPTS} onPick={(nv) => save({ verdict: { ...st.verdict, [k]: nv } })} />
                {v && (
                  <span aria-live="polite">
                    <span className="md-muted">你的判断：{word(v)}。几种标准怎么说：</span>
                    <ul>
                      {x.verdicts.map((c) => (
                        <li key={c.crit}>
                          <b>{c.crit}</b>：{SAYS[c.says]}。{c.why}
                        </li>
                      ))}
                    </ul>
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {done === ORDER.length && (
        <div aria-live="polite">
          <Band>二 · 哪一种标准与你的判断吻合？</Band>
          {tally.size === 0 ? (
            <p className="md-muted">你对六个案例都拿不准，所以还没有可以比较的判断。帕菲特会说，在有些案例中拿不准是合理的：一切事实都清楚了，剩下的也许只是一个用词的选择。</p>
          ) : (
            <ul className="md-muted">
              {[...tally.entries()].map(([crit, t]) => (
                <li key={crit}>
                  {crit}：在它回答"是"或"不是"的 {t.total} 个案例中，与你吻合 {t.agree} 个
                  {t.open > 0 && `；另有 ${t.open} 个案例它不直接回答，不计入`}。
                </li>
              ))}
            </ul>
          )}
          <Claim b="course">
            吻合不等于正确。如果你的判断在不同的案例中支持不同的标准，这本身就是本章第二部分要你注意的：我们关于同一性的直觉也许并不一致。帕菲特的回答常常不是"是"或"不是"，而是改变问题——重要的也许不是同一性，而是心理的连接与连续。
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>六个案例和三种标准的回答复述本章第二部分的表格（依据 SEP 的"人格同一性"和"洛克论人格同一性"条目）。</b>
          本章说明，每一格都是在一种读法下的回答，不是唯一的回答；"适当的因果关系"是什么，本身就有争议。这个组件不评分，也不算出"正确的标准"；它也不讨论关系性的进路（第四部分），因为那一进路问的主要是规范的人格，而不是数目的同一。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

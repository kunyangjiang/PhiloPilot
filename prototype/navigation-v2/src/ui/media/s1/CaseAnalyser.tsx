import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 二 · after the table of four theories of justification and the paragraph
// introducing this component (content/S1_SAMPLE_DRAFT.md). Three steps, none
// graded:
// 1. The reader gives a verdict on each of six cases from parts 一 and 二:
//    three "does she know?" cases (十个硬币, 假谷仓县, 法上的沙漠旅行者) and three
//    "is the belief justified?" cases (千里眼诺曼, 新恶魔的受害者, 被遗忘的证据).
// 2. After each verdict, what the chapter's criteria say about that case.
// 3. A count of how often each criterion agrees with the reader's own firm
//    verdicts — with the chapter's caution that agreement is not truth.
// The cases, the criteria and their verdicts restate the chapter (which follows
// the SEP entries it cites); where the chapter only says a theory "handles many
// cases", the verdict here is the component's application and says so.

const ID = 'case-analyser';

type V = 'yes' | 'no' | 'unsure';
type K = 'coins' | 'barn' | 'desert' | 'norman' | 'demon' | 'forgot';
type Q = 'know' | 'just';

interface Verdict {
  crit: string;
  says: V;
  why: string;
  applied?: boolean;
}

const CASES: Record<K, { q: Q; name: string; text: string; verdicts: Verdict[] }> = {
  coins: {
    q: 'know',
    name: '十个硬币',
    text: '史密斯根据老板的话和自己数过的硬币，推出"将要得到这份工作的人，口袋里有十个硬币"。得到工作的其实是他自己，而他自己口袋里碰巧也有十个硬币。',
    verdicts: [
      { crit: '有辩护的真信念', says: 'yes', why: '三个条件都满足：真的、相信、有辩护。这正是葛梯尔的反例。' },
      { crit: '没有假前提', says: 'no', why: '结论是从一个假信念（"琼斯会得到这份工作"）推出来的。' },
      { crit: '因果的理论', says: 'no', why: '他的信念不是由"他自己得到工作"这个事实引起的。' },
      { crit: '敏感性', says: 'no', why: '如果结论是假的，他仍然会根据关于琼斯的证据相信它。', applied: true },
    ],
  },
  barn: {
    q: 'know',
    name: '假谷仓县',
    text: '一个人看着一座真谷仓，相信"那是谷仓"。周围全是从路上看起来一模一样的假谷仓，他碰巧看的是唯一的真谷仓。',
    verdicts: [
      { crit: '有辩护的真信念', says: 'yes', why: '他看到了谷仓，信念是真的，也有辩护。' },
      { crit: '没有假前提', says: 'yes', why: '他没有用到任何假前提——这正是这个案例给"没有假前提"带来的麻烦。' },
      { crit: '因果的理论', says: 'yes', why: '他的信念确实是由那座真谷仓引起的。', applied: true },
      { crit: '敏感性', says: 'no', why: '如果那是一座假谷仓，他仍然会相信那是谷仓。', applied: true },
    ],
  },
  desert: {
    q: 'know',
    name: '法上的沙漠旅行者',
    text: '口渴的旅行者看到远处有一片水光，相信"那里有水"。他看到的是海市蜃楼，但走到那里，碰巧真的找到了水。',
    verdicts: [
      { crit: '有辩护的真信念', says: 'yes', why: '信念为真，也不是毫无根据：他确实看到了"水"的样子。' },
      { crit: '没有假前提', says: 'no', why: '他的信念依赖于"那片水光是水"这个错误的认识。', applied: true },
      { crit: '敏感性', says: 'no', why: '如果那里没有水，他看到同样的海市蜃楼，仍然会相信那里有水。', applied: true },
      { crit: '正理派的"量"', says: 'no', why: '不真实的知觉根本不是知觉，只是"似知觉"；知识来源是事实性的。（注意：法上本人讨论的框架不是"有辩护的真信念"。）' },
    ],
  },
  norman: {
    q: 'just',
    name: '千里眼诺曼',
    text: '诺曼有一种高度可靠的千里眼能力，却没有任何证据表明自己有这种能力。有一天他突然相信"总统在纽约"，而这是由他的千里眼可靠地产生的。',
    verdicts: [
      { crit: '过程可靠主义', says: 'yes', why: '信念由一个可靠的过程产生。' },
      { crit: '内在论', says: 'no', why: '他通过反思能通达的理由一个也没有；他只是莫名其妙地相信了一件事。' },
    ],
  },
  demon: {
    q: 'just',
    name: '新恶魔的受害者',
    text: '一个人的经验、记忆和推理与你完全相同，但他被一个恶魔系统地欺骗着，他的信念几乎全是假的。他相信"我面前有一张桌子"。',
    verdicts: [
      { crit: '过程可靠主义', says: 'no', why: '在那个世界里，知觉和推理是不可靠的。' },
      { crit: '内在论', says: 'yes', why: '他和你在内在方面完全相同，和你一样仔细地对待证据，只是运气太坏。' },
    ],
  },
  forgot: {
    q: 'just',
    name: '被遗忘的证据',
    text: '你相信"秦始皇统一中国在公元前 221 年"。你当年是从一本可靠的书上读到的，但早已忘记是哪本书、怎样读到的。',
    verdicts: [
      { crit: '过程可靠主义', says: 'yes', why: '信念最初以可靠的方式形成，并被可靠地保存。' },
      { crit: '内在论（可通达论）', says: 'no', why: '你现在能够通达的理由几乎没有了——这正是内在论要回答的困难。', applied: true },
    ],
  },
};
const ORDER: K[] = ['coins', 'barn', 'desert', 'norman', 'demon', 'forgot'];
const QTEXT: Record<Q, string> = { know: '他知道吗？', just: '这个信念有辩护吗？' };
const OPTS: Record<Q, readonly (readonly [V, string])[]> = {
  know: [
    ['yes', '知道'],
    ['no', '不知道'],
    ['unsure', '拿不准'],
  ],
  just: [
    ['yes', '有辩护'],
    ['no', '没有辩护'],
    ['unsure', '拿不准'],
  ],
};
const word = (q: Q, v: V) => OPTS[q].find(([x]) => x === v)![1];

interface Saved {
  verdict: Partial<Record<K, V>>;
}
const INIT: Saved = { verdict: {} };

export default function CaseAnalyser() {
  const [st, save] = useSavedIx<Saved>('S1', ID, INIT);
  const done = ORDER.filter((k) => st.verdict[k]).length;

  // Per criterion: how many of the reader's firm verdicts it matches.
  const tally = new Map<string, { agree: number; total: number }>();
  for (const k of ORDER) {
    const v = st.verdict[k];
    if (!v || v === 'unsure') continue;
    for (const c of CASES[k].verdicts) {
      const key = c.crit.replace(/（.*）$/, '');
      const t = tally.get(key) ?? { agree: 0, total: 0 };
      t.total += 1;
      if (c.says === v) t.agree += 1;
      tally.set(key, t);
    }
  }

  return (
    <section className="md c3 c5" aria-labelledby="ca-title">
      <header className="md-head">
        <p className="md-tag">知识论案例 · 先判断，再看标准</p>
        <h3 id="ca-title" className="md-title">六个案例：他知道吗？他有辩护吗？</h3>
        <p className="md-lede">
          先对每个案例作你自己的判断——没有对错。每作一个判断，就能看到本章讨论的几种标准对这个案例怎么说。最后看哪一种标准与你的判断吻合得多。
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
                </span>
                <Pick label={`${x.name}：${QTEXT[x.q]}`} value={v} opts={OPTS[x.q]} onPick={(nv) => save({ verdict: { ...st.verdict, [k]: nv } })} />
                {v && (
                  <span aria-live="polite">
                    <span className="md-muted">你的判断：{word(x.q, v)}。几种标准怎么说：</span>
                    <ul>
                      {x.verdicts.map((c) => (
                        <li key={c.crit}>
                          <b>{c.crit}</b>：{word(x.q, c.says)}。{c.why}
                          {c.applied && <span className="md-muted">（本组件按本章的定义推出的判断，本章没有直接讨论这个案例。）</span>}
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
            <p className="md-muted">你对六个案例都拿不准，所以还没有可以比较的判断。这本身也值得记下来：也许这些案例的意义，正在于让人拿不准。</p>
          ) : (
            <ul className="md-muted">
              {[...tally.entries()].map(([crit, t]) => (
                <li key={crit}>
                  {crit}：在它适用的 {t.total} 个确定判断中，与你吻合 {t.agree} 个。
                </li>
              ))}
            </ul>
          )}
          <Claim b="course">
            吻合不等于正确。本章提醒：千里眼和新恶魔是一对——"可靠但没有理由"与"有理由但不可靠"——内在论和外在论对它们的判断正好相反；有些哲学家认为，两种直觉针对的是两个不同的概念。一种标准与你的判断不合时，可以修改标准，也可以修改判断。
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>六个案例和各种标准的判断复述本章第一、二部分；本章依据 SEP 的"知识的分析""内在论与外在论""可靠主义"等条目。</b>
          这个组件不评分，也不算出"最好的理论"：它只帮你看清，每一种标准在哪一类案例上与你的判断相合，在哪一类案例上与它冲突。标有"本组件按本章的定义推出"的判断，是把本章给出的定义应用到这个案例上，本章正文没有直接讨论；它们可以被质疑。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

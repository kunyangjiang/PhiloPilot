import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 三 · after the table of six cases and the paragraph introducing this
// component (content/S3_SAMPLE_DRAFT.md). Two steps, none graded:
// 1. The reader gives a verdict on each of the six cases in the chapter's
//    table (one assassin, early pre-emption, late pre-emption, the firing
//    squad, the barometer, oxygen). After each verdict, what four analyses say:
//    the simple regularity theory (二), simple counterfactual dependence and
//    Lewis's causal chains (三, the chapter's table), and a simple structural
//    equations / interventionist model (三).
// 2. A count of how often each analysis agrees with the reader's firm
//    verdicts, with the chapter's caution that agreement is not truth.
// The counterfactual and chain verdicts restate the chapter's table, as does the
// regularity verdict on the barometer. Every other regularity or
// interventionist verdict applies the chapter's definitions to the case and is
// marked as such; the chapter does not discuss it directly. The column of
// intuitions in the chapter is not shown as an answer: the reader gives their own.

const ID = 'causation-cases';

type V = 'yes' | 'no' | 'unsure';
type K = 'single' | 'early' | 'late' | 'squad' | 'barometer' | 'oxygen';

interface Verdict {
  crit: string;
  says: V;
  why: string;
  applied?: boolean;
}

const CASES: Record<K, { name: string; text: string; q: string; verdicts: Verdict[] }> = {
  single: {
    name: '一个刺客，没有后备',
    text: '刺客 A 开枪，打死了独裁者。没有别的人准备开枪。',
    q: 'A 的开枪是独裁者死亡的原因吗？',
    verdicts: [
      { crit: '规律论', says: 'yes', why: 'A 的开枪在死亡之前、与它相邻；如果把"同类"规定为这样瞄准、这样击中的开枪，它后面都跟着死亡。', applied: true },
      { crit: '简单的反事实依赖', says: 'yes', why: '如果 A 没有开枪，独裁者不会死。' },
      { crit: '刘易斯的因果链', says: 'yes', why: '死亡直接依赖于 A 的开枪，这是一条只有一环的链。' },
      { crit: '结构方程与干预', says: 'yes', why: '在一个简单的模型中，干预"A 开枪"这个变量，"独裁者死亡"随之改变。', applied: true },
    ],
  },
  early: {
    name: '早期抢先（两个刺客）',
    text: 'A 先开枪，打死了独裁者；B 看到这一幕，就没有开枪。如果 A 没有开枪，B 会开枪，独裁者照样会死。',
    q: 'A 的开枪是独裁者死亡的原因吗？',
    verdicts: [
      { crit: '规律论', says: 'yes', why: '规律论不问"如果没有会怎样"，所以后备的 B 不影响它的判断；A 的开枪与死亡之间有先后、相邻和规律。', applied: true },
      { crit: '简单的反事实依赖', says: 'no', why: '如果 A 没有开枪，B 会开枪，独裁者照样会死；死亡不依赖于 A 的开枪。' },
      { crit: '刘易斯的因果链', says: 'yes', why: '子弹飞出以后 B 已经决定不开枪：死亡依赖于子弹的飞行，子弹的飞行依赖于 A 的开枪，链子接上了。' },
      { crit: '结构方程与干预', says: 'yes', why: '把"B 开枪"固定在它实际的值（没有开枪），再干预"A 开枪"，死亡随之改变。', applied: true },
    ],
  },
  late: {
    name: '后期抢先（苏西与比利）',
    text: '苏西和比利都向一个瓶子扔石头。苏西的石头先到，打碎了瓶子；比利的石头一瞬间之后飞过瓶子原来所在的地方。',
    q: '苏西的扔是瓶子破碎的原因吗？',
    verdicts: [
      { crit: '规律论', says: 'yes', why: '苏西的扔与破碎之间有先后、相邻和规律；规律论同样不受后备原因的影响。', applied: true },
      { crit: '简单的反事实依赖', says: 'no', why: '如果苏西没有扔，比利的石头会打碎瓶子。' },
      { crit: '刘易斯的因果链', says: 'no', why: '在瓶子破碎之前的每一刻，比利的石头都还在飞，找不到一条每一环都依赖于前一环的链。这是困难所在；刘易斯 2000 年的"作为影响的因果"就是为了处理它。' },
      { crit: '结构方程与干预', says: 'yes', why: '固定"比利的石头实际上没有击中瓶子"，再干预苏西的扔，瓶子不会碎。这类处理来自哈尔彭与珀尔一类的模型，其中"可以固定哪些变量"本身有争议。', applied: true },
    ],
  },
  squad: {
    name: '对称的过度决定（行刑队）',
    text: '两名士兵同时开枪，两颗子弹同时击中心脏，每一颗都足以致死。',
    q: '士兵甲的开枪是犯人死亡的原因吗？',
    verdicts: [
      { crit: '规律论', says: 'yes', why: '士兵甲的开枪属于后面跟着死亡的那一类事件；规律论把两个士兵都算作原因。', applied: true },
      { crit: '简单的反事实依赖', says: 'no', why: '如果士兵甲没有开枪，犯人照样会死。' },
      { crit: '刘易斯的因果链', says: 'no', why: '没有一条链；刘易斯本人认为这类案例中的直觉不够清楚，不宜用来检验理论。' },
      { crit: '结构方程与干预', says: 'yes', why: '本章说希区柯克等作者用结构方程处理这类案例：固定"士兵乙没有开枪"，再干预士兵甲，死亡随之改变。', applied: true },
    ],
  },
  barometer: {
    name: '气压计与暴风雨',
    text: '气压降低，气压计的指针下降，随后暴风雨来了。指针下降之后总是有暴风雨。',
    q: '指针下降是暴风雨的原因吗？',
    verdicts: [
      { crit: '规律论', says: 'yes', why: '本章第二部分的表格说：最简单的规律论会把指针下降算成暴风雨的原因——这是共同原因的困难。' },
      { crit: '简单的反事实依赖', says: 'no', why: '不回溯地读：设想指针因小小的偏差没有动，此前的一切不变，气压仍然降低了，暴风雨照样会来。' },
      { crit: '刘易斯的因果链', says: 'no', why: '暴风雨不依赖于指针，也没有从指针到暴风雨的链。' },
      { crit: '结构方程与干预', says: 'no', why: '干预指针（例如用手把它拨下去）不改变气压，也不改变暴风雨。', applied: true },
    ],
  },
  oxygen: {
    name: '氧气与火',
    text: '有人划了一根火柴，火柴点着了。如果没有氧气，火柴就不会点着。',
    q: '氧气是火柴着火的原因吗？',
    verdicts: [
      { crit: '规律论', says: 'no', why: '最简单的规律论要求"每一个同类事件后面都跟着"；有氧气并不总是跟着着火。把原因理解为一组条件中不可缺少的部分的修补，会把氧气算进去。', applied: true },
      { crit: '简单的反事实依赖', says: 'yes', why: '如果没有氧气，火柴不会点着。' },
      { crit: '刘易斯的因果链', says: 'yes', why: '刘易斯说氧气确实是原因之一；我们不提它，是因为在这个语境中它不值得提——这是语用的问题。' },
      { crit: '结构方程与干预', says: 'yes', why: '干预"有没有氧气"，"着火"随之改变；挑出哪一个原因值得提，是另外的问题。', applied: true },
    ],
  },
};
const ORDER: K[] = ['single', 'early', 'late', 'squad', 'barometer', 'oxygen'];
const OPTS: readonly (readonly [V, string])[] = [
  ['yes', '是原因'],
  ['no', '不是原因'],
  ['unsure', '拿不准'],
];
const word = (v: V) => OPTS.find(([x]) => x === v)![1];

interface Saved {
  verdict: Partial<Record<K, V>>;
}
const INIT: Saved = { verdict: {} };

export default function CausationCases() {
  const [st, save] = useSavedIx<Saved>('S3', ID, INIT);
  const done = ORDER.filter((k) => st.verdict[k]).length;

  // Per analysis: how many of the reader's firm verdicts it matches.
  const tally = new Map<string, { agree: number; total: number }>();
  for (const k of ORDER) {
    const v = st.verdict[k];
    if (!v || v === 'unsure') continue;
    for (const c of CASES[k].verdicts) {
      const t = tally.get(c.crit) ?? { agree: 0, total: 0 };
      t.total += 1;
      if (c.says === v) t.agree += 1;
      tally.set(c.crit, t);
    }
  }

  return (
    <section className="md c3 c5" aria-labelledby="cc-title">
      <header className="md-head">
        <p className="md-tag">因果的案例 · 先判断，再看分析</p>
        <h3 id="cc-title" className="md-title">六个案例：这是原因吗？</h3>
        <p className="md-lede">
          先对每个案例作你自己的判断——没有对错。每作一个判断，就能看到四种分析对这个案例怎么说。最后看哪一种分析与你的判断吻合得多。
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
                    <span className="md-muted">你的判断：{word(v)}。几种分析怎么说：</span>
                    <ul>
                      {x.verdicts.map((c) => (
                        <li key={c.crit}>
                          <b>{c.crit}</b>：{word(c.says)}。{c.why}
                          {c.applied && <span className="md-muted">（本组件按本章的定义推出的判断，本章没有直接讨论这个案例在这种分析下的结果。）</span>}
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
          <Band>二 · 哪一种分析与你的判断吻合？</Band>
          {tally.size === 0 ? (
            <p className="md-muted">你对六个案例都拿不准，所以还没有可以比较的判断。行刑队的案例表明，拿不准本身也是文献中常见的反应。</p>
          ) : (
            <ul className="md-muted">
              {[...tally.entries()].map(([crit, t]) => (
                <li key={crit}>
                  {crit}：在你的 {t.total} 个确定判断中，与你吻合 {t.agree} 个。
                </li>
              ))}
            </ul>
          )}
          <Claim b="course">
            吻合不等于正确。本章的表格记录的是文献中通常报告的直觉，不是实验的结果，也不是唯一可能的判断；刘易斯本人认为行刑队一类案例中的直觉不宜用来检验理论。一种分析与你的判断不合时，可以修改分析，也可以修改判断。另外，规律论在抢先的案例中"吻合"，是因为它根本不问后备的原因；它在气压计上的失败说明，这种吻合有代价。
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>六个案例复述本章第三部分的表格；简单反事实依赖和刘易斯因果链的判断，以及规律论在气压计上的判断，复述本章（依据 SEP 的"反事实因果理论"条目）。</b>
          规律论在其余案例上的判断，以及结构方程与干预的全部判断，是本组件把本章给出的定义应用到案例上的结果，已逐一标出；结构方程的判断取决于模型怎样建立、可以固定哪些变量，这本身有争议。这个组件不评分，也不算出"最好的分析"。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

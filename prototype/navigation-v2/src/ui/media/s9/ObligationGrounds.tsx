import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 一 · after the table of five grounds of political obligation and the
// paragraph under it (content/S9_SAMPLE_DRAFT.md). Three steps, none graded:
// 1. The reader picks one of three people (born here and never signed
//    anything; naturalised by oath; a member of a minority the law treats
//    unequally).
// 2. For each of the five grounds the reader says whether it justifies this
//    person's obligation (yes / in part / no).
// 3. The component then shows what the chapter says bears on each ground for
//    this person, and closes with the chapter's point about generality and
//    particularity. The three people are the component's own examples; every
//    consideration restates the chapter's 一, the part above the anchor (SEP "Political
//    Obligation", "Political Legitimacy"). No ground is declared to succeed.

const ID = 'obligation-grounds';

type P = 'born' | 'oath' | 'minority';
type G = 'consent' | 'fair' | 'natural' | 'member' | 'service';
type J = 'yes' | 'part' | 'no';

const GNAME: Record<G, string> = {
  consent: '同意',
  fair: '公平游戏',
  natural: '自然的义务',
  member: '成员的身份',
  service: '后果与服务',
};
const GORDER: G[] = ['consent', 'fair', 'natural', 'member', 'service'];

const PEOPLE: Record<P, { name: string; setup: string; notes: Record<G, string> }> = {
  born: {
    name: '在这里出生的人',
    setup: '小林在这个国家出生、长大，从没有宣誓或签署过任何东西。他每天走公共的道路，享受治安和公共卫生。',
    notes: {
      consent: '他没有明示的同意，这正是本章指出的困难：大多数人从来没有明确地同意过什么。《克里同》里的法律说，苏格拉底能离开却一直留下，就是约定；这种"留下就是同意"的说法是否成立，第二部分会专门讨论。',
      fair: '他确实从合作中获益。但西蒙斯指出，"收到"好处不等于自愿"接受"好处；克罗斯科回应说，安全这样的公共物品对每一个人都是必需的。',
      natural: '如果这个国家的制度大体正义，他有支持和遵守它们的自然义务。困难是特殊性：为什么特别是这个国家？罗尔斯的回答依赖"适用于我们"这几个字。',
      member: '他是在这个共同体中长大的成员；成员身份的理论说，这种不是选择来的关系也能产生义务，就像家庭成员之间的义务。',
      service: '在交通、协调这类问题上，遵从权威往往比他自己判断更能做到他本来有理由做的事（拉兹）。但按照拉兹的理论，权威是"零碎的"：不是每一条法律都对他有同样的权威。',
    },
  },
  oath: {
    name: '宣誓入籍的人',
    setup: '阿妮成年后移民到这里，入籍时宣誓遵守宪法和法律。',
    notes: {
      consent: '她作过明示的同意，这是五种理由中同意最接近真实的情况。仍然可以问：入籍时她有没有合理的别的选择？一次宣誓是否覆盖以后制定的每一条法律？',
      fair: '她自愿选择来到这里，所以比小林更接近"接受"好处，西蒙斯的反驳对她较弱。',
      natural: '与小林相同：取决于制度是否大体正义；特殊性的问题对她也许可以由她自己的选择来回答。',
      member: '她通过选择成为成员。成员身份的理论不要求出生在这里，但她与共同体的关系较新。',
      service: '与小林相同：在协调的问题上较强，对每一条法律则是零碎的。',
    },
  },
  minority: {
    name: '受到区别对待的人',
    setup: '老周属于一个长期被法律区别对待的少数群体：某些职位不对他开放，他和同伴多年的请愿没有回应。',
    notes: {
      consent: '他没有同意过，离开也不是合理的选择。同意这一类理由对他几乎完全失败。',
      fair: '公平游戏的论证本身要求合作的方案是公平的。如果他承担了负担，却被排除在一部分好处之外，论证的前提就不成立了。',
      natural: '自然的义务只针对正义的制度。在区别对待他的那部分制度上，这个理由不成立；对大体正义的其余部分，它可能仍然成立。',
      member: '这正是批评者的问题：一个把他当作二等公民的共同体，还能产生成员的义务吗？',
      service: '在交通这样的协调问题上，权威对他仍然可能是正当的；在区别对待他的法律上，服从并不能使他更好地做到他有理由做的事。第六部分讨论的公民不服从，与他的处境直接相关。',
    },
  },
};
const PORDER: P[] = ['born', 'oath', 'minority'];
const POPTS: readonly (readonly [P, string])[] = PORDER.map((p) => [p, PEOPLE[p].name] as const);
const JOPTS: readonly (readonly [J, string])[] = [
  ['yes', '能证成'],
  ['part', '部分地'],
  ['no', '不能'],
];
const JNAME: Record<J, string> = { yes: '能证成', part: '部分地', no: '不能' };

interface Saved {
  p: P | null;
  j: Record<string, J>;
}
const INIT: Saved = { p: null, j: {} };

export default function ObligationGrounds() {
  const [st, save] = useSavedIx<Saved>('S9', ID, INIT);
  const x = st.p ? PEOPLE[st.p] : null;
  const key = (g: G) => `${st.p}:${g}`;
  const done = x ? GORDER.every((g) => st.j[key(g)]) : false;
  const yes = x ? GORDER.filter((g) => st.j[key(g)] === 'yes') : [];
  const others = PORDER.filter((p) => p !== st.p && GORDER.every((g) => st.j[`${p}:${g}`]));

  return (
    <section className="md c3 c5" aria-labelledby="og-title">
      <header className="md-head">
        <p className="md-tag">五种理由 · 三个人</p>
        <h3 id="og-title" className="md-title">他们为什么有义务服从？</h3>
        <p className="md-lede">
          选一个人，先说出你认为五种理由中哪些能为他的政治义务辩护——没有对错。然后看本章对每一种理由在他身上指出了什么。组件不会告诉你哪一种理由成立。
        </p>
      </header>

      <Band>一 · 选一个人</Band>
      <Pick label="选择一个人" value={st.p} opts={POPTS} onPick={(p) => save({ ...st, p })} />

      {x && st.p && (
        <>
          <p>{x.setup}</p>
          <Band>二 · 你的判断</Band>
          <ol className="v21-steps" aria-label={`对${x.name}的五种理由`}>
            {GORDER.map((g, i) => (
              <li key={g} className="v21-step">
                <span className="v21-n" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <b>{GNAME[g]}</b>
                  <Pick label={`${GNAME[g]}能否为${x.name}的义务辩护`} value={st.j[key(g)]} opts={JOPTS} onPick={(j) => save({ ...st, j: { ...st.j, [key(g)]: j } })} />
                </span>
              </li>
            ))}
          </ol>

          {done && (
            <div aria-live="polite">
              <Band>三 · 本章指出的考虑</Band>
              <ul>
                {GORDER.map((g) => (
                  <li key={g}>
                    <b>{GNAME[g]}</b>（你的判断：{JNAME[st.j[key(g)]]}）：{x.notes[g]}
                  </li>
                ))}
              </ul>
              <p>
                {yes.length
                  ? `你认为能为${x.name}辩护的理由是：${yes.map((g) => GNAME[g]).join('、')}。`
                  : `你没有认为任何一种理由能完全为${x.name}的义务辩护。`}
                {others.length > 0 && ` 你也检验过${others.map((p) => PEOPLE[p].name).join('、')}：同一种理由，对不同的人是否同样有效？`}
              </p>
              <Claim b="course">
                没有一种理由对三个人同样有效：同意对宣誓的人最强，对受到区别对待的人几乎失败；自然的义务对三个人都取决于制度是否正义，却说明不了为什么是这个国家。这就是第一部分说的普遍性与特殊性的困难。即使结论是没有一般的服从义务（哲学的无政府主义），也不等于主张推翻国家：许多法律要求的事，本来就有别的理由去做。
              </Claim>
            </div>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>三个人是组件所设的例子；每一条考虑复述本章第一部分，并指向后面的部分。</b>
          依据的是 SEP 的"政治义务"和"政治正当性"条目（本章注 1、5），以及本章对《克里同》、诺齐克、西蒙斯、克罗斯科、罗尔斯、德沃金、拉兹的转述。"能证成""部分地""不能"只是你自己的判断，组件不评分，也不判定哪一种理由成立。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

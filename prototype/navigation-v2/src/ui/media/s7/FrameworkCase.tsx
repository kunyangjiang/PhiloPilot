import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 七 · after the table setting the frameworks side by side on 阿梅的周六 and the
// paragraph under it (content/S7_SAMPLE_DRAFT.md). Three steps, none graded:
// 1. The reader picks a case: 阿梅的周六, 移植 or 转轨.
// 2. The reader weighs each morally relevant feature (very / somewhat / not
//    important). Each feature is the one a framework looks at first.
// 3. The component shows what each framework looks at, how it tends to judge
//    and what it notices, then the reader gives their own verdict and sees
//    which frameworks tend toward it and why the frameworks disagree.
// Everything restates the chapter (二 to 五 and 七; the SEP entries on
// consequentialism, deontology and virtue ethics, the IEP entry on care
// ethics). Where the chapter does not apply a framework to a case, the
// component says so instead of inventing a verdict. No framework is declared
// right.

const ID = 'framework-case';

type C = 'amei' | 'transplant' | 'trolley';
type W = 'high' | 'some' | 'low';
type F = 'cons' | 'deon' | 'virt' | 'care';

const FNAME: Record<F, string> = { cons: '后果主义', deon: '义务论', virt: '德性伦理', care: '关怀伦理' };

interface Feature {
  id: string;
  text: string;
  fw: F;
}
interface Row {
  fw: F;
  first: string;
  tends: string;
  notices: string;
}
interface Verdict {
  id: string;
  text: string;
  /** Frameworks that the chapter says tend toward this verdict. */
  fws: F[];
}

const CASES: Record<C, { name: string; setup: string; features: Feature[]; rows: Row[]; missing?: string; verdicts: Verdict[]; why: string }> = {
  amei: {
    name: '阿梅的周六',
    setup: '阿梅答应过每周六下午陪独居的外婆。这个周六，朋友请她去食物救助站帮忙：她去，可以多给大约二十个家庭分发一周的食物。她只能去一个地方。',
    features: [
      { id: 'a1', text: '二十个家庭一周的食物', fw: 'cons' },
      { id: 'a2', text: '阿梅对外婆的承诺', fw: 'deon' },
      { id: 'a3', text: '一个有实践智慧的人会怎样感知这个处境，能不能找到第三种办法', fw: 'virt' },
      { id: 'a4', text: '与外婆的长期关系，以及外婆自己的回应', fw: 'care' },
    ],
    rows: [
      { fw: 'cons', first: '两个选择的全部后果', tends: '常常倾向于去救助站，但要考虑承诺和关系的长期后果', notices: '二十个家庭的需要的分量' },
      { fw: 'deon', first: '承诺；义务的种类', tends: '常常倾向于去外婆家，除非外婆同意解除承诺', notices: '外婆对这个承诺有发言权' },
      { fw: 'virt', first: '一个有实践智慧的好人会怎样做', tends: '不一定给出现成的结论；会寻找第三种办法', notices: '感知、第三种办法、选择之后的情感' },
      { fw: 'care', first: '两种具体的关系和需要', tends: '会先问外婆真正的需要；会追问制度', notices: '被关怀者的回应；关怀工作的分配' },
    ],
    verdicts: [
      { id: 'center', text: '去救助站', fws: ['cons'] },
      { id: 'grandma', text: '去外婆家', fws: ['deon'] },
      { id: 'ask', text: '先打电话问外婆，或者找第三种办法', fws: ['virt', 'care', 'deon'] },
    ],
    why: '几个框架的分歧，主要不是因为某一个算错了，而是因为它们把不同的东西当作首要的：后果、承诺、品格、关系。本章还提醒：无论阿梅怎样选择，她对被放弃的一方感到的歉意，是对一种真实的价值的承认（道德的残余）。',
  },
  transplant: {
    name: '移植',
    setup: '一位外科医生有五个病人，各需要一个不同的器官，否则都会死。一个健康的人来做体检，他的器官正好适合这五个人。',
    features: [
      { id: 't1', text: '一死五生，比五死一生的结果更好', fw: 'cons' },
      { id: 't2', text: '那个人有权利不被当作救别人的手段来使用', fw: 'deon' },
      { id: 't3', text: '如果这样的事被人知道，人们就不敢去医院（或者：这样的规则被普遍接受的后果）', fw: 'cons' },
    ],
    rows: [
      { fw: 'cons', first: '后果', tends: '简单的计算倾向于取器官；规则后果主义说，这样的规则被普遍接受的后果很坏，所以不应取', notices: '长期的后果和规则的后果' },
      { fw: 'deon', first: '那个人怎样被对待', tends: '不应取：这侵犯了他的权利，即使后果更好', notices: '他的器官正是救五个人的手段' },
    ],
    missing: '本章没有用德性伦理和关怀伦理分析这个案例，所以这里不列出它们的说法。',
    verdicts: [
      { id: 'take', text: '医生应当取器官', fws: [] },
      { id: 'notake', text: '医生不应当取器官', fws: ['deon', 'cons'] },
    ],
    why: '几乎所有人都认为取器官是严重的错误。分歧在于理由：规则后果主义说错在规则的后果，义务论说错在侵犯了那个人。批评者说，前者把错误放错了地方。（本章说只有"简单的计算"才倾向于取器官，所以"取器官"这一栏没有列出任何框架。）',
  },
  trolley: {
    name: '转轨',
    setup: '一辆失控的电车将撞死轨道上的五个人。你可以把它转到另一条轨道上，那里有一个人。',
    features: [
      { id: 'r1', text: '一死五生，比五死一生的结果更好', fw: 'cons' },
      { id: 'r2', text: '那个人的死是转轨的一个被预见到的副作用，不是救五个人的手段', fw: 'deon' },
    ],
    rows: [
      { fw: 'cons', first: '后果', tends: '转轨', notices: '数字' },
      { fw: 'deon', first: '那个人怎样被对待', tends: '以受动者为中心的义务论说，转轨不一定侵犯那个人的权利，所以可能是允许的', notices: '如果他不在轨道上，转轨同样能救五个人' },
    ],
    missing: '本章没有用德性伦理和关怀伦理分析这个案例，所以这里不列出它们的说法。',
    verdicts: [
      { id: 'switch', text: '可以转轨', fws: ['cons', 'deon'] },
      { id: 'noswitch', text: '不可以转轨', fws: [] },
    ],
    why: '在这个案例中，后果主义和以受动者为中心的义务论可能得出相同的结论，理由却不同。把它和移植放在一起：两者的数字相同，义务论用"手段与副作用"的区分把它们分开。批评者会用胖子的案例质疑这个区分。（本章只介绍了"许多人认为转轨是可以的"，没有介绍主张不可以转轨的框架，所以那一栏是空的。）',
  },
};
const ORDER: C[] = ['amei', 'transplant', 'trolley'];
const COPTS: readonly (readonly [C, string])[] = ORDER.map((c) => [c, CASES[c].name] as const);
const WOPTS: readonly (readonly [W, string])[] = [
  ['high', '很重要'],
  ['some', '有些重要'],
  ['low', '不重要'],
];

interface Saved {
  c: C | null;
  w: Record<string, W>;
  v: Record<string, string>;
}
const INIT: Saved = { c: null, w: {}, v: {} };

export default function FrameworkCase() {
  const [st, save] = useSavedIx<Saved>('S7', ID, INIT);
  const x = st.c ? CASES[st.c] : null;
  const weighed = x ? x.features.every((f) => st.w[f.id]) : false;
  const high = x ? [...new Set(x.features.filter((f) => st.w[f.id] === 'high').map((f) => f.fw))] : [];
  const verdict = x && st.c ? x.verdicts.find((d) => d.id === st.v[st.c!]) : undefined;

  return (
    <section className="md c3 c5" aria-labelledby="fc-title">
      <header className="md-head">
        <p className="md-tag">几个框架 · 一个案例</p>
        <h3 id="fc-title" className="md-title">它们各首先看什么？为什么不一致？</h3>
        <p className="md-lede">
          选一个案例，先说出你觉得每一个考虑有多重——没有对错。再看几个框架各首先看什么、倾向于怎样判断，最后说出你自己的判断。组件不会告诉你哪一个框架是对的。
        </p>
      </header>

      <Band>一 · 选一个案例</Band>
      <Pick label="选择案例" value={st.c} opts={COPTS} onPick={(c) => save({ ...st, c })} />

      {x && st.c && (
        <>
          <p>{x.setup}</p>
          <Band>二 · 这些考虑有多重？</Band>
          <ol className="v21-steps" aria-label={`${x.name}中的考虑`}>
            {x.features.map((f, i) => (
              <li key={f.id} className="v21-step">
                <span className="v21-n" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <span>{f.text}</span>
                  <Pick label={`考虑 ${i + 1}：${f.text}`} value={st.w[f.id]} opts={WOPTS} onPick={(w) => save({ ...st, w: { ...st.w, [f.id]: w } })} />
                  {st.w[f.id] && <span className="md-muted">这是{FNAME[f.fw]}首先看的东西。</span>}
                </span>
              </li>
            ))}
          </ol>

          {weighed && (
            <div aria-live="polite">
              <Band>三 · 几个框架怎样看</Band>
              <ul>
                {x.rows.map((r) => (
                  <li key={r.fw}>
                    <b>{FNAME[r.fw]}</b>：首先看{r.first}；倾向于：{r.tends}；它特别注意到：{r.notices}。
                  </li>
                ))}
              </ul>
              {x.missing && <p className="md-muted">{x.missing}</p>}
              <p>
                {high.length
                  ? `你认为"很重要"的考虑，是${high.map((f) => FNAME[f]).join('、')}首先看的东西。`
                  : '你没有把任何一个考虑标为"很重要"。'}
                请注意"倾向于"三个字：每一个框架内部都有不同的立场。
              </p>

              <Band>四 · 你的判断</Band>
              <Pick
                label={`你对${x.name}的判断`}
                value={st.v[st.c] ?? null}
                opts={x.verdicts.map((d) => [d.id, d.text] as const)}
                onPick={(d) => save({ ...st, v: { ...st.v, [st.c!]: d } })}
              />
              {verdict && (
                <div aria-live="polite">
                  <p>
                    {verdict.fws.length
                      ? `按照本章，倾向于这个判断的是：${verdict.fws.map((f) => FNAME[f]).join('、')}。`
                      : '本章没有介绍倾向于这个判断的框架。'}
                  </p>
                  <Claim b="course">{x.why}</Claim>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>三个案例、每一个框架首先看什么和倾向于怎样判断，复述本章第二到第五部分和第七部分的表格。</b>
          阿梅的案例是本章所设；移植和转轨依据 SEP 的"后果主义"和"义务论伦理学"条目的介绍。本章没有分析的框架与案例的组合，组件不补出。"倾向于"不等于"必然得出"：每一个框架内部都有不同的立场。这个组件不评分，也不判定哪一个框架正确。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

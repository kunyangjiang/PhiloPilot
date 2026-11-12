import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 六 · after the five analyses of 周岚's winter, the five-point checklist and
// the paragraph introducing the exercise (content/D4_SAMPLE_DRAFT.md).
// The reader picks two of the chapter's five frameworks and sees them side by
// side (premises, standard, leaning, what is left unresolved: the table "五种
// 分析放在一起"). Then one condition of the case is changed; the reader
// predicts, for each chosen framework, whether its leaning changes, and the
// component shows a chapter-style analysis. Only the variant "no brother and
// a patient who will likely die without her" is analysed in the chapter itself
// (for care and Confucian relation); the other analyses are written for this
// exercise from the frameworks as the chapter presents them, and say so.
// No framework is declared correct; nothing is scored.

const ID = 'ethical-case-analyzer';

type Fw = 'virtue' | 'rel' | 'care' | 'karuna' | 'rule';
const FWS: readonly (readonly [Fw, string])[] = [
  ['virtue', '德性（亚里士多德式）'],
  ['rel', '关系（儒家）'],
  ['care', '关怀'],
  ['karuna', '悲（佛教）'],
  ['rule', '不偏的规则'],
];

const ROWS: { k: string; v: Record<Fw, string> }[] = [
  { k: '前提', v: { virtue: '品格；实践智慧', rel: '关系是义务的来源；差等与推', care: '依赖；关系；照顾的分配', karuna: '苦、无我、缘起', rule: '义务、权利、公平' } },
  { k: '判断的标准', v: { virtue: '一个有实践智慧的人会看出什么', rel: '关系的根本性与推的顺序', care: '照顾的需要、质量与公平分配', karuna: '减少苦，平等地看待一切苦', rule: '谁对谁负有什么义务' } },
  { k: '倾向的结论', v: { virtue: '有限度地加班；承认界限', rel: '母亲优先；哥哥必须承担', care: '质疑选择的设定；保护照顾者', karuna: '不带怨恨地做出有限度的选择；照顾自己的苦', rule: '把"应当"分配给正确的承担者' } },
  { k: '没有解决的分歧', v: { virtue: '德性冲突时怎样判断', rel: '性别；在危急中推的顺序', care: '对远处的病人说得较少', karuna: '怎样在平等的悲与具体的选择之间权衡', rule: '特殊关系的理由是否需要从不偏的原则推出' } },
];

type Ch = 'same' | 'changes' | 'dep';
const CH: readonly (readonly [Ch, string])[] = [
  ['same', '倾向的结论不变'],
  ['changes', '倾向的结论改变'],
  ['dep', '取决于进一步的事实'],
];

interface Variant {
  id: string;
  text: string;
  /** Whether the analysis is the chapter's own (part 六) or written for this exercise. */
  inChapter: Partial<Record<Fw, boolean>>;
  a: Record<Fw, { c: Ch; why: string }>;
}

const VARIANTS: Variant[] = [
  {
    id: 'v1',
    text: '周岚没有哥哥，而病房里有一位病人，如果没有她，很可能会死去。',
    inChapter: { care: true, rel: true },
    a: {
      care: { c: 'changes', why: '关怀伦理会转向"制度的责任"和对病人的照顾：病人也是需要照顾的人，而缺人是医院和社会的责任，但眼前的生死使对病人的照顾变得紧迫。' },
      rel: { c: 'same', why: '儒家的关系伦理会更坚持母亲的优先性；"推"在危急中是否允许例外，是它没有解决的问题。' },
      virtue: { c: 'dep', why: '有实践智慧的人会把"没有她病人很可能死去"看作最重要的特征之一，可能答应更多；但她已经差一点发错药，这个界限仍在。结论取决于她实际还能安全地做多少。' },
      karuna: { c: 'changes', why: '生死之苦的分量更重；舍不允许以"我的母亲"作为唯一的理由。但她自己的疲惫同样是苦，过度的疲惫会增加苦。' },
      rule: { c: 'dep', why: '病人的权利对应的义务主要在医院；但如果确实只有她能及时救助，救助的义务会变强。结论取决于医院是否真的没有别的办法。' },
    },
  },
  {
    id: 'v2',
    text: '母亲在清醒的时候明确表示：她宁愿去短期照护，也不愿女儿累垮。',
    inChapter: {},
    a: {
      care: { c: 'changes', why: '在诺丁斯的框架中，被关怀者表达的需要和回应是关怀的一部分；母亲的意愿会使关怀伦理倾向于尊重她的选择，同时注意陌生环境带来的混乱。' },
      rel: { c: 'dep', why: '孝不只是"能养"，也包括敬：尊重父母的意愿是关系的要求。但送母亲去陌生的地方仍然需要很强的理由；结论取决于母亲在多大程度上理解这个决定。' },
      virtue: { c: 'dep', why: '有实践智慧的人会认真对待母亲的意愿，同时判断她理解到什么程度；中度阿尔茨海默病使这个判断本身成为关键。' },
      karuna: { c: 'dep', why: '母亲在陌生环境中的混乱是苦，周岚的疲惫也是苦；悲要求权衡两者，母亲的意愿是重要的事实，但不自动决定结果。' },
      rule: { c: 'changes', why: '如果母亲有能力作这个决定，她的自主的意愿有很大的分量；规则伦理会倾向于尊重它。' },
    },
  },
  {
    id: 'v3',
    text: '哥哥答应回来照顾母亲六个星期。',
    inChapter: {},
    a: {
      care: { c: 'changes', why: '照顾的分配变得公平得多，"特权的不负责任"被纠正；周岚可以更多地照顾病人，前提是她自己的健康也被考虑。' },
      rel: { c: 'changes', why: '哥哥履行了孝的义务，周岚对母亲的义务不再要求她拒绝加班；"推"出去照顾病人有了空间。' },
      virtue: { c: 'dep', why: '有实践智慧的人仍会注意自己的疲惫：哥哥回来解决了母亲的照顾，但没有解决她差一点发错药的问题。' },
      karuna: { c: 'same', why: '平等地看待一切苦的态度不变；变的是事实：母亲的苦有人照看，病房的苦更需要她。' },
      rule: { c: 'changes', why: '负担按公平的方式分配了；周岚对病人的职业义务可以在不牺牲母亲的情况下得到更多的履行。' },
    },
  },
];

interface Saved {
  fws: Fw[];
  vid: string | null;
  pred: Record<string, Ch>;
  shown: boolean;
}
const INIT: Saved = { fws: [], vid: null, pred: {}, shown: false };

const fwName = (f: Fw) => FWS.find(([v]) => v === f)?.[1] ?? f;

export default function EthicalCaseAnalyzer() {
  const [st, save] = useSavedIx<Saved>('D4', ID, INIT);
  const two = st.fws.length === 2;
  const v = VARIANTS.find((x) => x.id === st.vid) ?? null;
  const allPred = two && v !== null && st.fws.every((f) => st.pred[`${v.id}.${f}`]);

  const toggleFw = (f: Fw) => {
    const has = st.fws.includes(f);
    const next = has ? st.fws.filter((x) => x !== f) : st.fws.length < 2 ? [...st.fws, f] : [st.fws[1], f];
    save({ ...st, fws: next, shown: false });
  };

  return (
    <section className="md c3 c5" aria-labelledby="eca-title">
      <header className="md-head">
        <p className="md-tag">周岚的冬天 · 两种框架</p>
        <h3 id="eca-title" className="md-title">改变一个条件，结论会跟着变吗？</h3>
        <p className="md-lede">选两种框架，并排看它们对周岚的案例的分析；然后改变案例的一个条件，判断每一种框架倾向的结论会不会改变。组件不判定哪一个框架正确，也不评分。</p>
      </header>

      <Band>一 · 选两种框架</Band>
      <div className="v22-btns" role="group" aria-label="选择两种框架（最多两种）">
        {FWS.map(([f, t]) => (
          <button key={f} type="button" className="v22-btn" aria-pressed={st.fws.includes(f)} onClick={() => toggleFw(f)}>
            {t}
          </button>
        ))}
      </div>
      <p className="md-muted" aria-live="polite">
        {two ? `已选：${st.fws.map(fwName).join('、')}。` : `还要选 ${2 - st.fws.length} 种。选第三种时，最早选的那一种会被替换。`}
      </p>

      {two && (
        <>
          <Band>二 · 并排比较</Band>
          <ol className="v21-steps" aria-label="两种框架的并排比较">
            {ROWS.map((r, i) => (
              <li key={r.k} className="v21-step">
                <span className="v21-n" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <p>
                    <b>{r.k}</b>
                  </p>
                  {st.fws.map((f) => (
                    <Claim key={f} b="course" who={fwName(f)}>
                      {r.v[f]}
                    </Claim>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <Band>三 · 改变一个条件</Band>
          <Pick
            label="选择一个改变"
            value={st.vid}
            opts={VARIANTS.map((x, i) => [x.id, `改变 ${i + 1}`] as const)}
            onPick={(id) => save({ ...st, vid: id, shown: false })}
          />
          {v && (
            <div>
              <p>
                <b>{v.text}</b>
              </p>
              {st.fws.map((f) => (
                <div key={f}>
                  <p className="md-muted">{fwName(f)}：</p>
                  <Pick
                    label={`${fwName(f)}倾向的结论会不会改变`}
                    value={st.pred[`${v.id}.${f}`] ?? null}
                    opts={CH}
                    onPick={(c) => save({ ...st, pred: { ...st.pred, [`${v.id}.${f}`]: c } })}
                  />
                </div>
              ))}
              <button type="button" className="md-reset" aria-expanded={st.shown} disabled={!allPred && !st.shown} onClick={() => save({ ...st, shown: !st.shown })}>
                {st.shown ? '收起分析' : allPred ? '看分析' : '两种框架都判断以后再看分析'}
              </button>
              {st.shown && (
                <div aria-live="polite">
                  {st.fws.map((f) => {
                    const a = v.a[f];
                    const mine = st.pred[`${v.id}.${f}`];
                    return (
                      <Claim key={f} b="course" who={fwName(f)}>
                        {CH.find(([c]) => c === a.c)?.[1]}。{a.why}
                        {v.inChapter[f] ? '（本章第六部分的分析。）' : '（为本练习而写的分析，依据本章对这个框架的介绍。）'}
                        {mine && mine !== a.c ? `你的判断是"${CH.find(([c]) => c === mine)?.[1]}"：这个差别来自哪一个前提？` : ''}
                      </Claim>
                    );
                  })}
                  <p className="md-muted">
                    {v.a[st.fws[0]].c === v.a[st.fws[1]].c
                      ? '在这个改变下，两种框架的分析朝同一个方向移动；理由仍然不同。再试另一个改变。'
                      : '在这个改变下，两种框架的分析分开了。本章说：一个一致的结论背后，可能是两种在别的情况下会分开的理由。'}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>周岚的案例是本章虚构的，不涉及任何真实的人。</b>
          并排比较依据本章第六部分"五种分析放在一起"的表格。改变 1 中关怀与关系两种框架的分析是本章的；其余的分析是为本练习而写的，依据本章对各个框架的介绍，是一种分析，不是唯一的答案。组件不宣布哪一个框架正确。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

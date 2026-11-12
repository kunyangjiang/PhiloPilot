import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 六 · after the three full analyses of 澄港, the agreement table, the five
// points for a defensible judgment and the paragraph introducing the exercise
// (content/D5_SAMPLE_DRAFT.md). The reader picks one of the four decisions in
// the chapter's table "它们同意什么，分歧在哪里" and two or three of the six
// answers, predicts each answer's leaning, and then sees the chapter's own
// cell with a short explanation drawn from part 六. The four-way grouping of
// the cells (肯定 / 有条件 / 质疑或否定 / 不是它的核心问题) is the component's
// summary of the chapter's wording, and says so. No answer is declared
// correct; nothing is scored.

const ID = 'legitimacy-comparison';

type Ans = 'know' | 'inst' | 'prot' | 'virt' | 'cons' | 'eq';
const ANS: readonly (readonly [Ans, string])[] = [
  ['know', '知识与目的'],
  ['inst', '可靠的制度'],
  ['prot', '保护与福利'],
  ['virt', '德与民心'],
  ['cons', '同意与参与'],
  ['eq', '社会的平等'],
];
const BASIS: Record<Ans, string> = {
  know: '柏拉图；法拉比（据《法拉比与阿维森纳》）',
  inst: '韩非',
  prot: '《利论》',
  virt: '孔子、孟子',
  cons: '契约论；孟子 1B7；尼雷尔的讨论',
  eq: '安贝德卡尔',
};

type Lean = 'pos' | 'dep' | 'neg' | 'blind';
const LEANS: readonly (readonly [Lean, string])[] = [
  ['pos', '倾向于肯定'],
  ['dep', '有条件，要看进一步的事实'],
  ['neg', '倾向于质疑或否定'],
  ['blind', '不是它的核心问题'],
];

type Dec = 'first' | 'stay' | 'house' | 'ban';
const DECS: readonly (readonly [Dec, string])[] = [
  ['first', '前五年的重建'],
  ['stay', '再留任五年'],
  ['house', '按户籍分配安置房'],
  ['ban', '禁止街头集会'],
];

/** cell: the chapter's table cell, verbatim; why: drawn from part 六. */
const T: Record<Dec, Record<Ans, { lean: Lean; cell: string; why: string }>> = {
  first: {
    know: { lean: 'pos', cell: '肯定', why: '他有知识，以城市的安全为目的。' },
    inst: { lean: 'pos', cell: '肯定公开和问责', why: '公开账目、追究腐败，这是"法"。' },
    prot: { lean: 'pos', cell: '肯定', why: '他终结了一种"鱼的法则"：挪用防洪经费，使最弱的人死于洪水。' },
    virt: { lean: 'pos', cell: '肯定"事治"', why: '堤建成了，腐败被追究了。' },
    cons: { lean: 'pos', cell: '假设的同意可能成立', why: '在紧急状态下，一个理性的人也许会同意把权力暂时交给有能力的人。' },
    eq: { lean: 'blind', cell: '说得较少', why: '安贝德卡尔的框架对一个紧急的重建说得比较少。' },
  },
  stay: {
    know: { lean: 'dep', cell: '取决于他的知识是否仍然需要', why: '还要问：堤坝工程的知识，是不是关于"什么对城市好"的知识？' },
    inst: { lean: 'neg', cell: '质疑：依赖于一个人', why: '如果下一个行政官不如他，制度还在吗？这是韩非对依赖贤人的批评。' },
    prot: { lean: 'pos', cell: '倾向于肯定', why: '秩序恢复了，七成满意说明他没有因严厉而"使众生惊恐"；但按 1.13 的逻辑，满意也可能是被管理出来的。' },
    virt: { lean: 'dep', cell: '要看"民受之"的行为证据', why: '禁止集会以后，人们还能不能用行动表示不接受？' },
    cons: { lean: 'neg', cell: '难以成立', why: '紧急状态已经过去，理性的市民会同意的也许恰恰是恢复选举；七成满意是认可，不是同意。' },
    eq: { lean: 'neg', cell: '质疑', why: '多数的满意可能与对少数的排斥并存。' },
  },
  house: {
    know: { lean: 'blind', cell: '不是它的核心问题', why: '这个回答看的是统治者的资格，不是被统治者之间的关系。' },
    inst: { lean: 'blind', cell: '不是它的核心问题', why: '这个回答看的是制度能否让普通的统治者也治理好。' },
    prot: { lean: 'blind', cell: '很难看见这个问题', why: '1.4.16 恰恰要求每个人"走在各自的道路上"，继承来的地位在这个框架里很难被看作问题。' },
    virt: { lean: 'dep', cell: '仁政要求照顾，但不一定要求参与', why: '孟子会特别注意排在最后的人；但他的框架没有关于政治成员资格的理论。' },
    cons: { lean: 'neg', cell: '被排斥者没有参与', why: '外来工人没有参加这个决定。' },
    eq: { lean: 'neg', cell: '否定', why: '用一个继承来的地位分配一项新的公共利益，加强了有户籍者和无户籍者之间的等级。' },
  },
  ban: {
    know: { lean: 'pos', cell: '可以接受', why: '这个回答把正当性放在统治者的知识上；第一部分说，按这种看法，市民的满意只是附带的。' },
    inst: { lean: 'blind', cell: '不是它的核心问题', why: '这个回答看的是制度的可靠性。' },
    prot: { lean: 'pos', cell: '可以是恰如其分的杖', why: '它可以被说成是为了施工安全的、有限的强制。' },
    virt: { lean: 'neg', cell: '质疑：它妨碍了民意的显示', why: '孟子看的是人们实际上去找谁；禁止集会使不接受无法显示。' },
    cons: { lean: 'neg', cell: '质疑', why: '它限制了参与。' },
    eq: { lean: 'neg', cell: '否定', why: '它使受排斥的群体失去了表达的途径。' },
  },
};

interface Saved {
  dec: Dec | null;
  ans: Ans[];
  pred: Record<string, Lean>;
  shown: boolean;
}
const INIT: Saved = { dec: null, ans: [], pred: {}, shown: false };

const ansName = (a: Ans) => ANS.find(([v]) => v === a)?.[1] ?? a;
const leanName = (l: Lean) => LEANS.find(([v]) => v === l)?.[1] ?? l;

export default function LegitimacyComparison() {
  const [st, save] = useSavedIx<Saved>('D5', ID, INIT);
  const enough = st.ans.length >= 2;
  const dec = st.dec;
  const allPred = enough && dec !== null && st.ans.every((a) => st.pred[`${dec}.${a}`]);

  const toggleAns = (a: Ans) => {
    const has = st.ans.includes(a);
    const next = has ? st.ans.filter((x) => x !== a) : st.ans.length < 3 ? [...st.ans, a] : [...st.ans.slice(1), a];
    save({ ...st, ans: next, shown: false });
  };

  const leans = dec ? st.ans.map((a) => T[dec][a].lean) : [];
  const distinct = new Set(leans).size;

  return (
    <section className="md c3 c5" aria-labelledby="lgc-title">
      <header className="md-head">
        <p className="md-tag">澄港的五年 · 几种回答</p>
        <h3 id="lgc-title" className="md-title">同一个决定，几种回答怎样看？</h3>
        <p className="md-lede">选澄港的一个决定，再选两到三种关于"凭什么统治"的回答；先判断每一种回答的倾向，再看本章的分析。组件不判定哪一种回答正确，也不评分。</p>
      </header>

      <Band>一 · 选一个决定</Band>
      <Pick label="选择澄港的一个决定" value={st.dec} opts={DECS} onPick={(d) => save({ ...st, dec: d, shown: false })} />

      <Band>二 · 选两到三种回答</Band>
      <div className="v22-btns" role="group" aria-label="选择两到三种回答（最多三种）">
        {ANS.map(([a, t]) => (
          <button key={a} type="button" className="v22-btn" aria-pressed={st.ans.includes(a)} onClick={() => toggleAns(a)}>
            {t}
          </button>
        ))}
      </div>
      <p className="md-muted" aria-live="polite">
        {enough ? `已选：${st.ans.map(ansName).join('、')}。` : `还要选 ${2 - st.ans.length} 种。选第四种时，最早选的那一种会被替换。`}
      </p>

      {enough && dec && (
        <>
          <Band>三 · 先判断，再看分析</Band>
          <p>
            <b>{DECS.find(([d]) => d === dec)?.[1]}</b>
          </p>
          {st.ans.map((a) => (
            <div key={a}>
              <p className="md-muted">
                {ansName(a)}（{BASIS[a]}）：
              </p>
              <Pick
                label={`${ansName(a)}的倾向`}
                value={st.pred[`${dec}.${a}`] ?? null}
                opts={LEANS}
                onPick={(l) => save({ ...st, pred: { ...st.pred, [`${dec}.${a}`]: l } })}
              />
            </div>
          ))}
          <button type="button" className="md-reset" aria-expanded={st.shown} disabled={!allPred && !st.shown} onClick={() => save({ ...st, shown: !st.shown })}>
            {st.shown ? '收起分析' : allPred ? '看分析' : '每一种回答都判断以后再看分析'}
          </button>
          {st.shown && (
            <div aria-live="polite">
              {st.ans.map((a) => {
                const c = T[dec][a];
                const mine = st.pred[`${dec}.${a}`];
                return (
                  <Claim key={a} b="course" who={ansName(a)}>
                    本章的表格："{c.cell}"。{c.why}
                    {mine && mine !== c.lean ? `你的判断是"${leanName(mine)}"：你看重的是哪一个前提？` : ''}
                  </Claim>
                );
              })}
              <p className="md-muted">
                {distinct === 1
                  ? '在这个决定上，你选的几种回答倾向一致；但理由不同。本章说：理由不同，在别的案例上就可能导向不同的结论。'
                  : '在这个决定上，你选的几种回答分开了。本章说，分歧集中在留任和户籍两处，而且不是"东方与西方"之间的分歧。'}
              </p>
            </div>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>澄港和林岩是本章虚构的，不涉及任何真实的城市或人物。</b>
          引号中的文字是本章第六部分"它们同意什么，分歧在哪里"那张表格的原文；后面的说明取自同一部分的分析。把表格的文字归为四种倾向，是组件的归纳。组件不宣布哪一种回答正确；本章自己的判断写在第六部分，读者可以反对。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

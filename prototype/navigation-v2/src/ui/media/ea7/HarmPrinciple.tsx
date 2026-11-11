import { Band, Claim, Limits, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 二 · after the table "伤害原则排除了什么" (content/EA7_SAMPLE_DRAFT.md).
// Competing criteria for one decision: six proposed restrictions, each offered with
// a single stated reason. The reader names the kind of reason; the harm principle's
// verdict then follows from the chapter's own table. The cases are constructed for
// this exercise; the four kinds of reason and the verdicts are the chapter's table.

const ID = 'harm-principle';

type Kind = 'harm' | 'pater' | 'moral' | 'offense';
const KINDS: readonly (readonly [Kind, string])[] = [
  ['harm', '防止伤害他人'],
  ['pater', '为了当事人自己（家长主义）'],
  ['moral', '行为本身不道德（道德主义）'],
  ['offense', '别人感到被冒犯'],
];
const VERDICT: Record<Kind, string> = {
  harm: '允许考虑（但还要看限制是否值得）',
  pater: '不允许，如果这是唯一的理由',
  moral: '不允许，如果这是唯一的理由',
  offense: '不允许：冒犯不是伤害',
};

const CASES: { id: string; t: string; why: string; kind: Kind }[] = [
  { id: 'c1', t: '禁止成年人在自己家里吃高糖的零食。', why: '理由：这对他们自己的健康有害。', kind: 'pater' },
  { id: 'c2', t: '禁止商家用虚假的广告推销药品。', why: '理由：顾客会因此受骗、受害。', kind: 'harm' },
  { id: 'c3', t: '禁止在报纸上发表一种令多数读者反感的宗教意见。', why: '理由：许多读者看了会很不舒服。', kind: 'offense' },
  { id: 'c4', t: '禁止成年人之间一种自愿的、不伤害他人的生活方式。', why: '理由：多数人认为它不道德。', kind: 'moral' },
  { id: 'c5', t: '禁止酒后驾车。', why: '理由：路上的其他人可能因此受伤。', kind: 'harm' },
  { id: 'c6', t: '禁止成年人独自攀登危险的雪山。', why: '理由：他们可能在山上丧命。', kind: 'pater' },
];

interface Saved {
  ans: Record<string, Kind>;
}
const INIT: Saved = { ans: {} };

export default function HarmPrinciple() {
  const [st, save] = useSavedIx<Saved>('EA7', ID, INIT);
  const done = CASES.filter((x) => x.id in st.ans).length;
  const right = CASES.filter((x) => st.ans[x.id] === x.kind).length;
  const all = done === CASES.length;

  return (
    <section className="md c3 c5" aria-labelledby="hp-title">
      <header className="md-head">
        <p className="md-tag">伤害原则 · 检验</p>
        <h3 id="hp-title" className="md-title">
          这条限制给出的是哪一种理由？伤害原则允许它吗？
        </h3>
        <p className="md-lede">
          下面六条限制，每一条只给出一个理由。先判断这个理由属于本章表中的哪一类；判断以后，会显示伤害原则对这一类理由的回答。
        </p>
      </header>

      <Band>
        一 · 识别理由（已判断 {done} / {CASES.length}）
      </Band>
      <ol className="v21-steps" aria-label="六条限制">
        {CASES.map((x, i) => {
          const a = st.ans[x.id];
          const has = x.id in st.ans;
          return (
            <li key={x.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>{x.t}</b>
                {x.why}
                <Pick label={`${x.t}的理由属于哪一类`} value={a} opts={KINDS} onPick={(v) => save({ ans: { ...st.ans, [x.id]: v } })} />
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === x.kind} yes="对" no="再想想" />
                    {a === x.kind
                      ? `伤害原则：${VERDICT[x.kind]}。`
                      : '看一看这条理由说的是谁受到影响：是别人的利益受到侵犯，还是当事人自己、多数人的道德观念或感受？'}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {all && (
        <div aria-live="polite">
          <Band>二 · 两种标准的结论（{right} / {CASES.length} 条与本章的表一致）</Band>
          <Claim b="course">
            伤害原则说的是什么样的理由<b>有资格</b>被考虑，而不是说一旦有伤害就<b>必须</b>干预。第 2、5 条有资格被考虑；是否值得干预，还要看干预本身的代价。
          </Claim>
          <Claim b="course">
            第 1、3、4、6 条如果<b>只</b>有这些理由，伤害原则不允许。密尔并不反对那些同时可以用伤害原则辩护的法律；他反对的是只能用家长主义或道德主义辩护的限制。
          </Claim>
          <p className="md-muted">
            另一种标准会怎样回答？一位只看总体后果的行为功利主义者，会直接比较每一条限制带来的幸福与痛苦；第 1、6 条也许能这样得到辩护。密尔自己的回答依赖于"最广义的功利"和人作为"进步的存在者"的长远利益。两种标准在这里可能分道扬镳，这正是第一、二部分留给读者的问题。
          </p>
        </div>
      )}

      <Limits>
        <p>
          <b>六个例子是本章为这个练习构造的，每条只给一个理由，是为了让分类清楚。</b>现实中的限制往往同时有几种理由；"什么算伤害"本身也有争议——据 SEP 条目，密尔后来说明，伤害必须侵犯别人"有权利享有的"重要利益。原则只适用于"心智成熟的人"；本章第二部分还讨论了密尔把"成熟"的标准用在整个民族身上的问题。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

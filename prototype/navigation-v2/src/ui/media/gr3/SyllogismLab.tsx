import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import '../gr1/gr1.css';
import './gr3.css';

// 二 · after the first-figure moods ("本课不要求读者记住全部有效式").
// Three steps: a worked example (find the middle term), building a
// categorical syllogism in one of Aristotle's three figures and testing it,
// and substituting everyday terms to separate validity from truth.
//
// The test is bounded on purpose: a form over three terms has 8 Venn regions,
// so all 256 ways of filling them are checked. A form is valid when no way of
// filling them makes both premises true and the conclusion false. Aristotle's
// assumption that terms are not empty is applied by default; the forms that
// depend on it are flagged. Counterexamples are searched for in a small bank
// of everyday terms whose extensions are fixed below. Greek is the chapter's
// checked quotation (content/GR3_SAMPLE_DRAFT.md, 二).

type Q = 'A' | 'E' | 'I' | 'O';
type Fig = 1 | 2 | 3;
type Role = 'S' | 'M' | 'P';

const QS: Q[] = ['A', 'E', 'I', 'O'];
const QNAME: Record<Q, string> = { A: '全称肯定', E: '全称否定', I: '特称肯定', O: '特称否定' };
const ROLE: Record<Role, { name: string; zh: string }> = {
  S: { name: '小词', zh: '结论的主词' },
  P: { name: '大词', zh: '结论的谓词' },
  M: { name: '中词', zh: '只在两个前提中出现' },
};

/** Subject and predicate of the major and minor premise in each figure. */
const FIG: Record<Fig, { major: [Role, Role]; minor: [Role, Role]; where: string }> = {
  1: { major: ['M', 'P'], minor: ['S', 'M'], where: '中词在大前提中作主词，在小前提中作谓词' },
  2: { major: ['P', 'M'], minor: ['S', 'M'], where: '中词在两个前提中都作谓词' },
  3: { major: ['M', 'P'], minor: ['M', 'S'], where: '中词在两个前提中都作主词' },
};

/** The moods Aristotle himself proves in Prior Analytics I.4–6, with their medieval names. */
const NAMED: Record<string, string> = {
  '1AAA': 'Barbara',
  '1EAE': 'Celarent',
  '1AII': 'Darii',
  '1EIO': 'Ferio',
  '2EAE': 'Cesare',
  '2AEE': 'Camestres',
  '2EIO': 'Festino',
  '2AOO': 'Baroco',
  '3AAI': 'Darapti',
  '3EAO': 'Felapton',
  '3IAI': 'Disamis',
  '3AII': 'Datisi',
  '3OAO': 'Bocardo',
  '3EIO': 'Ferison',
};

// ── the bounded check ────────────────────────────────────────────────────────
// A region is a bit pattern over (S, M, P); a model is the set of non-empty regions.
const BIT: Record<Role, number> = { S: 4, M: 2, P: 1 };
const inR = (r: number, t: Role) => (r & BIT[t]) !== 0;

function holds(q: Q, x: Role, y: Role, model: number): boolean {
  let xy = false;
  let xNotY = false;
  for (let r = 0; r < 8; r++) {
    if (!(model & (1 << r)) || !inR(r, x)) continue;
    if (inR(r, y)) xy = true;
    else xNotY = true;
  }
  if (q === 'A') return !xNotY;
  if (q === 'E') return !xy;
  if (q === 'I') return xy;
  return xNotY;
}
const nonEmpty = (t: Role, model: number) => [0, 1, 2, 3, 4, 5, 6, 7].some((r) => model & (1 << r) && inR(r, t));

interface Form {
  fig: Fig;
  mj: Q;
  mn: Q;
  c: Q;
}
function countermodel(f: Form, requireTerms: boolean): number | null {
  const F = FIG[f.fig];
  for (let m = 0; m < 256; m++) {
    if (requireTerms && !(nonEmpty('S', m) && nonEmpty('M', m) && nonEmpty('P', m))) continue;
    if (holds(f.mj, F.major[0], F.major[1], m) && holds(f.mn, F.minor[0], F.minor[1], m) && !holds(f.c, 'S', 'P', m)) return m;
  }
  return null;
}

// ── a bank of everyday terms with fixed extensions ───────────────────────────
// Each term is the set of kinds it covers, in a toy universe of nine kinds.
// The extensions are simplified common knowledge, enough for the examples.
const TERMS: { id: string; zh: string; ext: string[] }[] = [
  { id: 'animal', zh: '动物', ext: ['dog', 'cat', 'whale', 'bat', 'human', 'sparrow', 'penguin', 'shark'] },
  { id: 'mammal', zh: '哺乳动物', ext: ['dog', 'cat', 'whale', 'bat', 'human'] },
  { id: 'dog', zh: '狗', ext: ['dog'] },
  { id: 'cat', zh: '猫', ext: ['cat'] },
  { id: 'whale', zh: '鲸', ext: ['whale'] },
  { id: 'bird', zh: '鸟', ext: ['sparrow', 'penguin'] },
  { id: 'flyer', zh: '会飞的动物', ext: ['sparrow', 'bat'] },
  { id: 'fish', zh: '鱼', ext: ['shark'] },
  { id: 'lungs', zh: '有肺的东西', ext: ['dog', 'cat', 'whale', 'bat', 'human', 'sparrow', 'penguin'] },
  { id: 'stone', zh: '石头', ext: ['stone'] },
];
const term = (id: string) => TERMS.find((t) => t.id === id)!;
function truth(q: Q, x: string, y: string): boolean {
  const X = term(x).ext;
  const Y = term(y).ext;
  const meet = X.some((k) => Y.includes(k));
  const out = X.some((k) => !Y.includes(k));
  return q === 'A' ? !out : q === 'E' ? !meet : q === 'I' ? meet : out;
}
const say = (q: Q, x: string, y: string) =>
  q === 'A' ? `所有${x}都是${y}` : q === 'E' ? `没有${x}是${y}` : q === 'I' ? `有些${x}是${y}` : `有些${x}不是${y}`;
const sayAbs = (q: Q, x: Role, y: Role) =>
  q === 'A' ? `所有 ${x} 是 ${y}` : q === 'E' ? `没有 ${x} 是 ${y}` : q === 'I' ? `有些 ${x} 是 ${y}` : `有些 ${x} 不是 ${y}`;

type Sub = Record<Role, string>;
function findCounter(f: Form): Sub | null {
  const F = FIG[f.fig];
  // Prefer narrow subjects (狗, 鲸…), which make the clearest examples.
  const bySize = [...TERMS].sort((a, b) => a.ext.length - b.ext.length);
  for (const s of bySize)
    for (const m of TERMS)
      for (const p of TERMS) {
        if (s === m || m === p || s === p) continue;
        const sub: Sub = { S: s.id, M: m.id, P: p.id };
        if (truth(f.mj, sub[F.major[0]], sub[F.major[1]]) && truth(f.mn, sub[F.minor[0]], sub[F.minor[1]]) && !truth(f.c, sub.S, sub.P))
          return sub;
      }
  return null;
}

/** The non-empty regions of a countermodel, described in words. */
function describe(model: number): string[] {
  const out: string[] = [];
  for (let r = 0; r < 8; r++) {
    if (!(model & (1 << r)) || r === 0) continue;
    const has = (['S', 'M', 'P'] as Role[]).filter((t) => inR(r, t));
    const not = (['S', 'M', 'P'] as Role[]).filter((t) => !inR(r, t));
    out.push(`有东西是 ${has.join('、')}` + (not.length ? `，但不是 ${not.join('、')}` : ''));
  }
  return out;
}

// ── state ────────────────────────────────────────────────────────────────────
const ID = 'syllogism-lab';
type Step = 'example' | 'build' | 'terms';
interface Saved {
  step: Step;
  pick: Role | null;
  form: Form;
  tested: boolean;
  sub: Sub;
}
const INIT: Saved = {
  step: 'example',
  pick: null,
  form: { fig: 1, mj: 'A', mn: 'A', c: 'A' },
  tested: false,
  sub: { S: 'whale', M: 'mammal', P: 'lungs' },
};

const PRESETS: { k: string; form: Form; sub: Sub }[] = [
  { k: '论证①：有效，前提真', form: { fig: 1, mj: 'A', mn: 'A', c: 'A' }, sub: { S: 'whale', M: 'mammal', P: 'lungs' } },
  { k: '论证②：有效，前提假', form: { fig: 1, mj: 'A', mn: 'A', c: 'A' }, sub: { S: 'whale', M: 'fish', P: 'flyer' } },
  { k: '论证③：无效，前提和结论都真', form: { fig: 2, mj: 'A', mn: 'A', c: 'A' }, sub: { S: 'dog', M: 'animal', P: 'mammal' } },
];

export default function SyllogismLab() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('GR3', ID, INIT));
  const [showGrc, setShowGrc] = useState(false);
  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR3', ID, next);
  };
  const f = st.form;
  const F = FIG[f.fig];
  const key = `${f.fig}${f.mj}${f.mn}${f.c}`;
  const cmStrict = countermodel(f, true);
  const cmLoose = countermodel(f, false);
  const valid = cmStrict === null;
  const needsImport = valid && cmLoose !== null;
  const name = NAMED[key];
  const setForm = (p: Partial<Form>) => save({ ...st, form: { ...f, ...p }, tested: false });

  const subTrue = {
    mj: truth(f.mj, st.sub[F.major[0]], st.sub[F.major[1]]),
    mn: truth(f.mn, st.sub[F.minor[0]], st.sub[F.minor[1]]),
    c: truth(f.c, st.sub.S, st.sub.P),
  };
  const z = (r: Role) => term(st.sub[r]).zh;
  const distinct = new Set(Object.values(st.sub)).size === 3;
  const counter = !valid ? findCounter(f) : null;

  return (
    <section className="md sy" aria-labelledby="sy-title">
      <header className="md-head">
        <p className="md-tag">逻辑实验室</p>
        <h3 id="sy-title" className="md-title">
          三段论实验室：形式、有效与真
        </h3>
        <p className="md-lede">
          先看一个做好的例子，再自己搭一个推论，检验它的形式是否有效，最后代入日常的词项，看"有效"和"真"怎样分开。实验室只处理亚里士多德的三个格中由 A、E、I、O 四种陈述组成的推论，不是一般的逻辑系统。
        </p>
      </header>

      <div className="md-seg sy-tabs" role="radiogroup" aria-label="步骤">
        {(
          [
            ['example', '一、看一个例子'],
            ['build', '二、搭一个推论'],
            ['terms', '三、代入词项'],
          ] as [Step, string][]
        ).map(([k, t]) => (
          <label key={k} className={'md-seg-opt' + (st.step === k ? ' is-on' : '')}>
            <input type="radio" name="sy-step" checked={st.step === k} onChange={() => save({ ...st, step: k })} />
            <span>{t}</span>
          </label>
        ))}
      </div>

      {st.step === 'example' && (
        <div className="sy-panel">
          <p>这是第一格的 Barbara 式（本章表格中的论证①）。三个词项各出现两次：</p>
          <ol className="sy-lines">
            <li>
              所有<b className="sy-t sy-t--M">哺乳动物</b>都<b className="sy-t sy-t--P">有肺</b>
              <small>大前提</small>
            </li>
            <li>
              所有<b className="sy-t sy-t--S">鲸</b>都是<b className="sy-t sy-t--M">哺乳动物</b>
              <small>小前提</small>
            </li>
            <li className="sy-concl">
              所以，所有<b className="sy-t sy-t--S">鲸</b>都<b className="sy-t sy-t--P">有肺</b>
              <small>结论</small>
            </li>
          </ol>
          <fieldset className="cs-group">
            <legend>哪一个是中词？</legend>
            <div className="md-seg">
              {(
                [
                  ['S', '鲸'],
                  ['M', '哺乳动物'],
                  ['P', '有肺'],
                ] as [Role, string][]
              ).map(([r, t]) => (
                <label key={r} className={'md-seg-opt' + (st.pick === r ? ' is-on' : '')}>
                  <input type="radio" name="sy-mid" checked={st.pick === r} onChange={() => save({ ...st, pick: r })} />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {st.pick && (
            <div className="md-feedback" aria-live="polite">
              {st.pick === 'M' ? (
                <p className="md-fb-k">对。"哺乳动物"在两个前提中都出现，在结论中消失：它把"鲸"和"有肺"连了起来。</p>
              ) : (
                <p className="md-fb-k">
                  不对。"{st.pick === 'S' ? '鲸' : '有肺'}"出现在结论中，是{ROLE[st.pick].name}（{ROLE[st.pick].zh}）。中词是在两个前提中出现、在结论中消失的那一个。
                </p>
              )}
              <ul className="sy-roles">
                {(['P', 'S', 'M'] as Role[]).map((r) => (
                  <li key={r}>
                    <b className={'sy-t sy-t--' + r}>{ROLE[r].name}</b> {ROLE[r].zh}
                  </li>
                ))}
              </ul>
              <button type="button" className="md-disclose" aria-expanded={showGrc} onClick={() => setShowGrc(!showGrc)}>
                {showGrc ? '收起希腊原文' : '看亚里士多德的说法（25b35—39）'}
              </button>
              {showGrc && (
                <div className="lw-grc">
                  <p className="pe-src">《前分析篇》第一卷第 4 章，25b35—39</p>
                  <p className="pe-orig" lang="grc">
                    Καλῶ δὲ μέσον μὲν ὃ καὶ αὐτὸ ἐν ἄλλῳ καὶ ἄλλο ἐν τούτῳ ἐστίν……Εἰ γὰρ τὸ Α κατὰ παντὸς τοῦ Β καὶ τὸ Β κατὰ παντὸς τοῦ Γ, ἀνάγκη τὸ Α κατὰ παντὸς τοῦ Γ κατηγορεῖσθαι
                  </p>
                  <p className="pe-zh">
                    本章试译：我把这样的东西称为中词：它自己在另一个东西之中，又有另一个东西在它之中……因为，如果 A 述说所有的 B，而 B 述说所有的 C，那么 A 必然述说所有的 C。
                  </p>
                </div>
              )}
              <button type="button" className="btn btn--small sy-next" onClick={() => save({ ...st, step: 'build' })}>
                下一步：自己搭一个推论
              </button>
            </div>
          )}
        </div>
      )}

      {st.step === 'build' && (
        <div className="sy-panel">
          <fieldset className="cs-group">
            <legend>选一个格</legend>
            <div className="md-seg">
              {([1, 2, 3] as Fig[]).map((g) => (
                <label key={g} className={'md-seg-opt' + (f.fig === g ? ' is-on' : '')}>
                  <input type="radio" name="sy-fig" checked={f.fig === g} onChange={() => setForm({ fig: g })} />
                  <span>第{'一二三'[g - 1]}格</span>
                </label>
              ))}
            </div>
            <p className="md-note">{F.where}。</p>
          </fieldset>
          {(
            [
              ['mj', '大前提', F.major],
              ['mn', '小前提', F.minor],
              ['c', '结论', ['S', 'P']],
            ] as ['mj' | 'mn' | 'c', string, [Role, Role]][]
          ).map(([slot, label, [x, y]]) => (
            <fieldset key={slot} className="cs-group sy-slot">
              <legend>
                {label}：<span className="sy-abs">{sayAbs(f[slot], x, y)}</span>
              </legend>
              <div className="md-seg">
                {QS.map((q) => (
                  <label key={q} className={'md-seg-opt' + (f[slot] === q ? ' is-on' : '')}>
                    <input type="radio" name={'sy-' + slot} checked={f[slot] === q} onChange={() => setForm({ [slot]: q })} />
                    <span>
                      {q} {QNAME[q]}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="lw-nav">
            <button type="button" className="btn btn--small" onClick={() => save({ ...st, tested: true })}>
              检验这个形式
            </button>
          </div>
          {st.tested && (
            <div className="md-feedback" aria-live="polite">
              {valid ? (
                <>
                  <p className="md-fb-k">
                    有效{name ? `：这是 ${name} 式` : ''}。无论 S、M、P 代表什么，只要两个前提都真，结论就必然真。
                  </p>
                  {!name && <p>这个形式有效，但亚里士多德没有单独列出它：它的结论比同一前提能得出的全称结论更弱，是后来的逻辑学家补充的"弱式"。</p>}
                  {needsImport && (
                    <p>
                      注意：这个形式只有在假定 S、M、P 都不是空的（确实有这样的东西）时才有效。亚里士多德默认这个假定；现代逻辑不默认它，会把这一式判为无效。这就是本章所说的"存在含义"问题。
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="md-fb-k">无效。两个前提都真、结论却假的情况是可能的。</p>
                  {counter ? (
                    <p>
                      反例：令 S＝{term(counter.S).zh}，M＝{term(counter.M).zh}，P＝{term(counter.P).zh}。
                      {say(f.mj, term(counter[F.major[0]]).zh, term(counter[F.major[1]]).zh)}（真）；{say(f.mn, term(counter[F.minor[0]]).zh, term(counter[F.minor[1]]).zh)}（真）；但
                      {say(f.c, term(counter.S).zh, term(counter.P).zh)}（假）。这正是亚里士多德证明一个形式无效的方法：保持形式不变，换一组词项（26a4—9）。
                    </p>
                  ) : (
                    cmStrict !== null && (
                      <>
                        <p>在实验室的小词库里没有找到现成的反例，但可以描述一种使前提真、结论假的情况：</p>
                        <ul className="md-fb-list">
                          {describe(cmStrict).map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </>
                    )
                  )}
                  {counter && (
                    <button type="button" className="btn btn--small" onClick={() => save({ ...st, step: 'terms', sub: counter })}>
                      把这组反例带到第三步
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {st.step === 'terms' && (
        <div className="sy-panel">
          <p>
            形式是：第{'一二三'[f.fig - 1]}格，{f.mj}{f.mn}{f.c}
            {name ? `（${name}）` : ''}，{valid ? '有效' : '无效'}。给 S、M、P 各选一个词，看三句话各自是真是假。
          </p>
          <div className="sy-subs">
            {(['S', 'M', 'P'] as Role[]).map((r) => (
              <label key={r} className="sy-sub">
                <span>
                  <b className={'sy-t sy-t--' + r}>{r}</b> {ROLE[r].name}
                </span>
                <select value={st.sub[r]} onChange={(e) => save({ ...st, sub: { ...st.sub, [r]: e.target.value } })}>
                  {TERMS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.zh}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="sy-presets">
            <span className="md-muted">本章表格中的例子：</span>
            {PRESETS.map((p) => (
              <button key={p.k} type="button" className="btn btn--small" onClick={() => save({ ...st, form: p.form, sub: p.sub, tested: true })}>
                {p.k}
              </button>
            ))}
          </div>
          {!distinct ? (
            <p className="md-muted">请为 S、M、P 选三个不同的词。</p>
          ) : (
            <ol className="sy-lines" aria-live="polite">
              <li>
                {say(f.mj, z(F.major[0]), z(F.major[1]))}
                <small className={subTrue.mj ? 'is-t' : 'is-f'}>{subTrue.mj ? '真' : '假'}</small>
              </li>
              <li>
                {say(f.mn, z(F.minor[0]), z(F.minor[1]))}
                <small className={subTrue.mn ? 'is-t' : 'is-f'}>{subTrue.mn ? '真' : '假'}</small>
              </li>
              <li className="sy-concl">
                所以，{say(f.c, z('S'), z('P'))}
                <small className={subTrue.c ? 'is-t' : 'is-f'}>{subTrue.c ? '真' : '假'}</small>
              </li>
            </ol>
          )}
          {distinct && (
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">
                {valid && subTrue.mj && subTrue.mn
                  ? '有效，前提都真：结论必然真。这样的论证，今天称为"可靠的"。'
                  : valid
                    ? '有效，但至少有一个前提是假的：结论可能真也可能假。有效只保证"如果前提真，结论就真"。'
                    : subTrue.mj && subTrue.mn && !subTrue.c
                      ? '前提都真，结论却假：这一组词项就是这个形式无效的反例。'
                      : subTrue.mj && subTrue.mn
                        ? '前提和结论碰巧都真，但形式无效：换一组词项，就可能出现前提真、结论假的情况。结论的真不是由前提保证的。'
                        : '形式无效，而且前提不全真。无论结论真假，这个论证都没有证明什么。'}
              </p>
            </div>
          )}
        </div>
      )}

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>
      <p className="md-note">
        <b>实验室的范围与限度。</b>只包括亚里士多德的三个格（第四格是后人加的）。"有效"按三个词项的八个区域逐一检查得出；默认采用亚里士多德"词项不空"的假定，依赖这一假定的式会特别标出。中世纪的名称（Barbara 等）是后来的记忆口诀，不是亚里士多德的。词库中各词的外延是为了举例而简化的常识。三段论只处理词项之间的包含关系；"如果……就……"这类命题之间的推论，以及关系、量词嵌套等，都不在它的范围之内（本章"三段论能做什么，不能做什么"）。
      </p>
    </section>
  );
}

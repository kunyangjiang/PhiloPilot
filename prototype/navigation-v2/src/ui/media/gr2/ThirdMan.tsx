import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import '../gr1/gr1.css';
import './gr2.css';

// 六 · after the chapter's statement of the three premises and the regress.
// The learner switches each premise on or off and builds the regress one
// level at a time, seeing which premise each step uses and where it stops
// when a premise is dropped; then looks at what each response in the
// dialogue (and in later readings) targets. The division into three premises
// follows SEP "Plato's Parmenides", as the chapter says; the Chinese wording
// and the step-by-step display are the chapter's reconstruction
// (content/GR2_SAMPLE_DRAFT.md, 六). Greek is the chapter's checked quotation.

type P = 'om' | 'sp' | 'ni';
const PREM: Record<P, { name: string; en: string; t: string }> = {
  om: { name: '一统多', en: 'One-over-Many', t: '如果许多东西都是大的，那么有一个大的理型，它们因分有它而是大的。' },
  sp: { name: '自我谓述', en: 'Self-Predication', t: '大的理型本身也是大的。' },
  ni: { name: '非同一', en: 'Non-Identity', t: '因分有大的理型而是大的东西，不等同于这个理型本身。' },
};
const SUP = ['', '¹', '²', '³', '⁴', '⁵'];
const MAX = 4;

const RESPONSES: { id: string; who: string; t: string; target: string; fb: string }[] = [
  {
    id: 'thought',
    who: '对话中苏格拉底的回应（132b）',
    t: '也许每一个理型只是一个思想（νόημα），只存在于灵魂之中。',
    target: '改变"理型是什么"，而不是直接针对三个前提',
    fb: '巴门尼德反驳说：思想总是关于某个"是"的东西的思想，那个被思的"一"不就是理型吗（132b—c）？这个回应在对话中没有成功。它也是本课不以"理念"为主要译名的理由之一。',
  },
  {
    id: 'paradigm',
    who: '对话中苏格拉底的回应（132c—d）',
    t: '理型像范本一样存在于自然之中，其他东西是它们的摹本，分有就是相似。',
    target: '改变"分有"是什么关系',
    fb: '巴门尼德说：摹本与范本相似，范本也就与摹本相似；相似的东西要分有同一个东西，于是又出现新的理型，又是倒退（132d—133a）。这个"相似倒退"是不是"第三人"的另一个版本，学者有讨论。',
  },
  {
    id: 'sp-real',
    who: '后来的一种读法',
    t: '柏拉图的理型论确实承诺了自我谓述（《会饮篇》211a 说美本身"永远美"，《斐多篇》74c 说相等本身从不显得不相等）。',
    target: '承认前提（二），所以论证构成真正的威胁',
    fb: '按照这种读法，"第三人"击中了中期理型论的一个真实承诺。',
  },
  {
    id: 'sp-other',
    who: '后来的另一种读法',
    t: '"美本身是美的"与"海伦是美的"意思不同。',
    target: '针对前提（二）：同一个"是 F"在两处意思不同，所以理型不能和具体事物归为一组',
    fb: '按照这种读法，自我谓述的意思被重新理解，倒退就无法开始。',
  },
];

const ID = 'third-man';
type Saved = { on: Record<P, boolean>; depth: number; resp: string | null };
const INIT: Saved = { on: { om: true, sp: true, ni: true }, depth: 1, resp: null };

/** Build the regress up to `depth` levels under the chosen premises. */
function regress(on: Record<P, boolean>, depth: number) {
  const rows: { k: number; group: string[]; form?: string; uses: P[]; stop?: string }[] = [];
  let group = ['甲', '乙', '丙'];
  for (let k = 1; k <= depth; k++) {
    if (!on.om) {
      rows.push({ k, group, uses: [], stop: '没有"一统多"，就没有理由为这一组大的东西设定一个大的理型。论证无法开始。' });
      break;
    }
    const form = '大' + SUP[k];
    rows.push({ k, group, form, uses: k === 1 ? ['om'] : ['om', 'ni'] });
    if (!on.sp) {
      rows.push({ k: k + 1, group, uses: [], stop: `没有"自我谓述"，${form} 本身不算大的东西，不加入这一组；没有新的一组需要说明。倒退停止。` });
      break;
    }
    const next = [...group, form];
    if (!on.ni) {
      rows.push({ k: k + 1, group: next, uses: ['sp'], stop: `没有"非同一"，${form} 可以就是使这一组（包括它自己）成为大的那个理型，不需要新的理型。倒退停止。` });
      break;
    }
    group = next;
  }
  return rows;
}

export default function ThirdMan() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('GR2', ID, INIT));
  const [showGrc, setShowGrc] = useState(false);
  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR2', ID, next);
  };
  const rows = regress(st.on, st.depth);
  const stopped = rows.some((r) => r.stop);
  const allOn = st.on.om && st.on.sp && st.on.ni;
  const resp = RESPONSES.find((r) => r.id === st.resp);

  return (
    <section className="md tm" aria-labelledby="tm-title">
      <header className="md-head">
        <p className="md-tag">拆开论证</p>
        <h3 id="tm-title" className="md-title">
          "第三人"论证：倒退是怎样产生的
        </h3>
        <p className="md-lede">
          打开或关掉三个前提，再一层一层地往上推，看每一步用到哪个前提，以及去掉某个前提时倒退在哪里停下。这是本章的重构：三个前提的划分据斯坦福哲学百科，学者对论证的结构和柏拉图是否接受这些前提，看法并不一致。
        </p>
      </header>

      <fieldset className="cs-group tm-prem">
        <legend>前提（可以逐个关掉）</legend>
        {(Object.keys(PREM) as P[]).map((p, n) => (
          <button
            key={p}
            type="button"
            className={'tm-p' + (st.on[p] ? ' is-on' : '')}
            aria-pressed={st.on[p]}
            onClick={() => save({ ...st, on: { ...st.on, [p]: !st.on[p] } })}
          >
            <span className="tm-p-n">
              （{'一二三'[n]}）{PREM[p].name} <small>{PREM[p].en}</small>
            </span>
            <span className="tm-p-t">{PREM[p].t}</span>
            <span className="tm-p-s">{st.on[p] ? '接受' : '已关掉'}</span>
          </button>
        ))}
        <p className="md-note">另有一个背景假定：唯一性，每一类只有一个理型。倒退与它相矛盾。</p>
      </fieldset>

      <ol className="tm-levels" aria-live="polite" aria-label="倒退的各层">
        {rows.map((r, n) => (
          <li key={n} className={r.stop ? 'is-stop' : ''}>
            <p className="tm-group">
              <span className="tm-k">第 {r.k} 层</span>
              {r.group.map((g) => (
                <span key={g} className={'tm-item' + (g.startsWith('大') ? ' is-form' : '')}>
                  {g}
                </span>
              ))}
              <span className="tm-is">都是大的</span>
            </p>
            {r.form && (
              <p className="tm-step">
                → 有一个大的理型 <b className="tm-item is-form">{r.form}</b>
                {r.k > 1 && <>，不同于 {r.group.filter((g) => g.startsWith('大')).join('、')}</>}
                <span className="tm-uses">用到：{r.uses.map((u) => PREM[u].name).join('、')}</span>
              </p>
            )}
            {r.form && st.on.sp && !r.stop && n === rows.length - 1 && (
              <p className="tm-step tm-next">
                → 由于自我谓述，{r.form} 本身也是大的，于是与 {r.group.join('、')} 构成新的一组
                <span className="tm-uses">用到：自我谓述</span>
              </p>
            )}
            {r.stop && <p className="tm-stop">{r.stop}</p>}
          </li>
        ))}
      </ol>

      <div className="lw-nav">
        <button type="button" className="btn btn--small" disabled={stopped || st.depth >= MAX} onClick={() => save({ ...st, depth: st.depth + 1 })}>
          再往上推一层
        </button>
        <button type="button" className="btn btn--small" disabled={st.depth <= 1} onClick={() => save({ ...st, depth: 1 })}>
          回到第一层
        </button>
      </div>

      <div className="md-feedback" aria-live="polite">
        {allOn && st.depth >= 2 ? (
          <p className="md-fb-k">
            三个前提都接受时，每一层都会要求一个新的理型，如此以至无穷：{'"'}你的每一个理型就不再是一，而是数目无穷的了。{'"'}这与唯一性相矛盾。
          </p>
        ) : allOn ? (
          <p className="md-muted">三个前提都接受。请再往上推一层，看看会发生什么。</p>
        ) : (
          <p className="md-fb-k">去掉一个前提，倒退就停下来了。所以，回应这个论证的办法，是找出应当放弃或重新理解的那个前提，并说明这样做的代价。</p>
        )}
        <button type="button" className="md-disclose" aria-expanded={showGrc} onClick={() => setShowGrc(!showGrc)}>
          {showGrc ? '收起希腊原文' : '看巴门尼德的原话（132a—b）'}
        </button>
        {showGrc && (
          <div className="lw-grc">
            <p className="pe-src">《巴门尼德篇》132a—b</p>
            <p className="pe-orig" lang="grc">
              οἶμαί σε ἐκ τοῦ τοιοῦδε ἓν ἕκαστον εἶδος οἴεσθαι εἶναι· ὅταν πόλλʼ ἄττα μεγάλα σοι δόξῃ εἶναι, μία τις ἴσως δοκεῖ ἰδέα ἡ αὐτὴ εἶναι ἐπὶ πάντα ἰδόντι, ὅθεν ἓν τὸ μέγα ἡγῇ εἶναι. ... τί δʼ αὐτὸ τὸ μέγα καὶ τἆλλα τὰ μεγάλα, ἐὰν ὡσαύτως τῇ ψυχῇ ἐπὶ πάντα ἴδῃς, οὐχὶ ἕν τι αὖ μέγα φανεῖται, ᾧ ταῦτα πάντα μεγάλα φαίνεσθαι; ... ἄλλο ἄρα εἶδος μεγέθους ἀναφανήσεται, παρʼ αὐτό τε τὸ μέγεθος γεγονὸς καὶ τὰ μετέχοντα αὐτοῦ· καὶ ἐπὶ τούτοις αὖ πᾶσιν ἕτερον, ᾧ ταῦτα πάντα μεγάλα ἔσται· καὶ οὐκέτι δὴ ἓν ἕκαστόν σοι τῶν εἰδῶν ἔσται, ἀλλὰ ἄπειρα τὸ πλῆθος.
            </p>
            <p className="pe-zh">
              本章试译：我想，你之所以认为每一个理型都是一，是出于这样的理由：当许多东西在你看来是大的时候，你看着它们全体，似乎看到有某一个相同的特征（ἰδέα）在它们全体之上，于是你认为"大"是一。……那么，大本身和其他大的东西，如果你同样用灵魂看着它们全体，难道不会又显出某一个大的东西，凭着它，所有这些东西都显得是大的吗？……于是，又会出现另一个大的理型，在大本身和分有它的东西之外；而在所有这些之上，又会有另一个，凭着它，所有这些都是大的。这样，你的每一个理型就不再是一，而是数目无穷的了。
            </p>
          </div>
        )}
      </div>

      <fieldset className="cs-group lw-q">
        <legend>几种回应各针对什么？选一种看看。</legend>
        <div className="md-seg gr-col">
          {RESPONSES.map((r) => (
            <label key={r.id} className={'md-seg-opt' + (st.resp === r.id ? ' is-on' : '')}>
              <input type="radio" name="tm-resp" checked={st.resp === r.id} onChange={() => save({ ...st, resp: r.id })} />
              <span>
                <b>{r.who}：</b>
                {r.t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {resp && (
        <div className="md-feedback" aria-live="polite">
          <p className="md-fb-k">针对：{resp.target}</p>
          <p>{resp.fb}</p>
        </div>
      )}
      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>

      <p className="md-note">
        <b>重构与解释的选择。</b>"第三人"这个名称来自亚里士多德，不是柏拉图起的。三个前提的划分据 SEP "Plato's <i>Parmenides</i>"：该词条说大多数评论者同意论证依赖这三个前提，并称 Vlastos（1954）的分析是开创性的。逐层的演示、"去掉某个前提倒退就停止"的说明，以及对两种后来读法的概括，都是本章的整理；本课没有读到 Vlastos 等人的原文，学者对论证结构的解释并不一致。巴门尼德在批评之后的结论不是放弃理型，而是说：没有理型，思想和对话都不可能（135b—c）。
      </p>
    </section>
  );
}

import { Band, Claim, Limits, OrigSrc, Pick, Step, useSavedIx } from '../jw1/shared';

// 三 · after the method summary ("这张表可以用在其他的怀疑论证上").
// How a sceptical argument works, on Hume's own example:
// 1. The inference examined and the assumption behind it (Enquiry §32, note 26).
// 2. The four possible grounds (the chapter's 2×2 table after SEP Qu & Radcliffe,
//    note 27): pick one and see why it fails; the last one closes the circle (§30, note 25).
// 3. Custom, and the limits of the conclusion: two readings of "not founded on
//    reasoning" (note 33), shown side by side with no verdict.
// Every English line is one of the chapter's checked passages (Selby-Bigge 1902).

const ID = 'hume-induction';

type Cell = 'sense' | 'intuition' | 'demo' | 'probable';
const CELLS: Record<Cell, { t: string; row: string; col: string; why: string; b: 'scholar' | 'course' }> = {
  sense: {
    t: '感觉',
    row: '事实',
    col: '直接的',
    why: '感觉只告诉我现在看见的东西，不告诉我没有看见的东西，也不显示物体产生结果的"秘密的能力"。',
    b: 'scholar',
  },
  intuition: {
    t: '直观',
    row: '观念的关系',
    col: '直接的',
    why: '"将来与过去相似"并不是一眼就能看出为真的命题。',
    b: 'scholar',
  },
  demo: {
    t: '证明',
    row: '观念的关系',
    col: '经过推论的',
    why: '如果齐一性原则可以被证明，它的反面就会包含矛盾；可是"自然的进程可能改变"是可以清楚设想的。这里用上了休谟之叉。',
    b: 'scholar',
  },
  probable: {
    t: '或然的论证',
    row: '事实',
    col: '经过推论的',
    why: '"到目前为止，相信齐一性的推论都成功了，所以将来也会成功。"可是这个论证本身是一个从经验得出的推论，它已经假定了齐一性原则——所以是循环的。',
    b: 'scholar',
  },
};
const COPTS = (['sense', 'intuition', 'demo', 'probable'] as Cell[]).map((k) => [k, CELLS[k].t] as const);

type Reading = 'desc' | 'norm';
const READ: Record<Reading, { t: string; reason: string; concl: string; strain: string }> = {
  desc: {
    t: '描述性的读法',
    reason: '一种心理过程：推理的能力。',
    concl: '一个心理学的事实：使我们迈出归纳那一步的，不是推理，而是习惯。',
    strain: '要说明休谟为什么用"兜圈子""把正在争论的那一点当作已经被认可的东西"这类带有评价意味的话。',
  },
  norm: {
    t: '规范性的读法',
    reason: '带有"有理由""正当"的意思。',
    concl: '一个怀疑论的结论：理性不能为归纳提供辩护。',
    strain: '要说明休谟为什么又说"只有傻瓜或疯子"才会争论经验的权威；规范性读法内部，对排除了哪一种辩护也有分歧。',
  },
};
const ROPTS = (['desc', 'norm'] as Reading[]).map((k) => [k, READ[k].t] as const);

interface Saved {
  tried: Cell[];
  cell: Cell | null;
  reading: Reading | null;
}
const INIT: Saved = { tried: [], cell: null, reading: null };

export default function HumeInduction() {
  const [st, save] = useSavedIx<Saved>('EA3', ID, INIT);
  const c = st.cell ? CELLS[st.cell] : null;
  const allTried = st.tried.length === 4;
  const r = st.reading ? READ[st.reading] : null;

  const pick = (k: Cell) => save({ ...st, cell: k, tried: st.tried.includes(k) ? st.tried : [...st.tried, k] });

  return (
    <section className="md c3 c5" aria-labelledby="hi-title">
      <header className="md-head">
        <p className="md-tag">休谟的归纳论证 · 怎样读一个怀疑论证</p>
        <h3 id="hi-title" className="md-title">
          "将来会与过去相似"能被证明吗？
        </h3>
        <p className="md-lede">
          先看被检验的推论和它背后的假定；再逐一试试四种可能的辩护，看每一种为什么失败；最后看结论的界限。最后一步不判胜负。
        </p>
      </header>

      <Band>一 · 被检验的推论与背后的假定</Band>
      <ol className="v21-steps" aria-label="被检验的推论与假定">
        <Step n={1}>推论：从"到目前为止观察到的 A 都跟着 B"推到"下一个 A 也会跟着 B"。</Step>
        <Step n={2}>假定：将来会与过去相似（后来的解释者称之为"齐一性原则"）。</Step>
      </ol>
      <OrigSrc
        src="休谟《人类理智研究》第四章第二部分，第 32 段（Selby-Bigge 编，1902 年，第 37—38 页）"
        lang="en"
        orig="For all inferences from experience suppose, as their foundation, that the future will resemble the past, and that similar powers will be conjoined with similar sensible qualities."
        zh="因为一切从经验得出的推论，都以“将来会与过去相似”“相似的能力会与相似的可感性质结合在一起”为基础。"
      />

      <Band>二 · 四种可能的辩护</Band>
      <p className="md-muted">
        二乘二：一个维度是"观念的关系"还是"事实"（休谟之叉），另一个维度是"直接的"还是"经过推论的"。选一格。（已试 {st.tried.length} / 4）
      </p>
      <Pick label="选择一种可能的辩护" value={st.cell} opts={COPTS} onPick={pick} />
      {c && (
        <div aria-live="polite">
          <Claim b={c.b} who={`${c.row} · ${c.col}`}>
            <b>{c.t}不行。</b>
            {c.why}
          </Claim>
          {st.cell === 'probable' && (
            <OrigSrc
              src="同上，第 30 段（第 35—36 页）"
              lang="en"
              orig="To endeavour, therefore, the proof of this last supposition by probable arguments, or arguments regarding existence, must be evidently going in a circle, and taking that for granted, which is the very point in question."
              zh="所以，试图用或然的论证，即关于存在的论证，来证明这最后一个假定，显然必定是在兜圈子，把正在争论的那一点当作已经被认可的东西。"
            />
          )}
        </div>
      )}

      {allTried && (
        <>
          <Band>三 · 习惯，以及结论的界限</Band>
          <OrigSrc
            src="同上，第五章第一部分，第 36 段（第 44 页）"
            lang="en"
            orig="Custom, then, is the great guide of human life."
            zh="所以，习惯是人生的伟大向导。"
          />
          <p className="md-muted">
            休谟没有反驳怀疑，而是说明我们为什么照样相信。他没有说我们不应当相信经验，也没有说世界上没有原因。可是，他说归纳"不是建立在理性上的"，是什么意思？
          </p>
          <Pick label="选择一种读法" value={st.reading} opts={ROPTS} onPick={(v) => save({ ...st, reading: v })} />
          {r && (
            <div aria-live="polite">
              <Claim b="scholar" who={`"理性"的意思`}>
                {r.reason}
              </Claim>
              <Claim b="scholar" who="休谟的结论">
                {r.concl}
              </Claim>
              <Claim b="course" who="这种读法要回答的问题">
                {r.strain}
              </Claim>
            </div>
          )}
        </>
      )}
      {!allTried && <p className="md-muted">四种辩护都试过之后，会出现第三步。</p>}

      <Limits>
        <p>
          <b>这是一种读法，不是休谟论证的唯一重建。</b>二乘二表和六步排除依据 SEP 关于休谟的条目（Qu 与 Radcliffe）；条目自己说明，这个论证的逻辑在解释上有争议。描述性和规范性两种读法依据同一条目，本课不判定哪一种对。"这种读法要回答的问题"一栏是本课的整理。三段英文都核对过 Selby-Bigge 1902 年本的扫描本。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

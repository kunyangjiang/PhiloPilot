import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 二 · after the table of responses to the problem of evil and the paragraph
// introducing the exercise (content/S12_SAMPLE_DRAFT.md). Three arguments the
// chapter has reconstructed in parts 一 and 二: Avicenna's argument from the
// necessary existent, Cleanthes' analogy, and Rowe's evidential argument.
// The reader picks one argument, then the premise they find most doubtful;
// the component shows how the chapter's sources attack that premise, how the
// argument's defenders answer, and what is left if the premise fails.
// Premises, objections and replies restate the chapter's reconstructions and
// its summaries of SEP entries (manuscript notes 5–11); nothing here comes
// from after the anchor. No argument is declared to succeed or fail.

const ID = 'argument-analyzer';

type A = 'avicenna' | 'cleanthes' | 'rowe';
type Basis = 'scholar' | 'common' | 'course';

interface Premise {
  text: string;
  /** How the chapter's sources attack this premise, if they do. */
  obj?: { text: string; b: Basis; who?: string }[];
  /** How the argument's defenders answer. */
  reply?: { text: string; b: Basis; who?: string };
  /** What is left of the argument if this premise fails. */
  left: string;
}

const ARGS: Record<A, { name: string; where: string; premises: Premise[]; concl: string; after: string }> = {
  avicenna: {
    name: '阿维森纳：必然存在者',
    where: '第一部分 · 宇宙论论证',
    premises: [
      {
        text: '存在着某些东西，它们的存在依赖于别的东西（"可能的存在者"）。',
        left: '本章没有介绍针对这一前提的主要反驳：它只要求世界上至少有一样依赖别的东西才存在的东西。如果连它也被否认，论证就没有出发点。',
      },
      {
        text: '由这样的东西组成的系列——无论有限还是无限——作为一个整体，也是依赖于别的东西的。',
        obj: [
          { text: '整体与部分：解释了系列中的每一个成员，就解释了整体（休谟借《对话录》中的人物说）；宇宙"就在那里"，不需要再问它的原因（罗素）。', b: 'scholar', who: 'SEP"宇宙论论证"' },
        ],
        reply: { text: '一个由依赖者组成的整体，并不因为成员很多就变得不依赖。', b: 'scholar', who: 'SEP"宇宙论论证"' },
        left: '如果这一步失败，论证就不能从"每一个成员都有原因"走到"整体有一个在它之外的原因"：系列可以只是一串依赖者，没有一个本身必然的存在者。',
      },
      {
        text: '这个整体所依赖的东西，不能是系列中的任何一个成员（因为每一个成员都是依赖的）。',
        left: '本章没有介绍针对这一前提的主要反驳：如果整体确实依赖别的东西，这一步几乎是从"每一个成员都是依赖的"直接得出的。争论集中在上一步。',
      },
    ],
    concl: '所以，存在着一个不依赖于任何别的东西的存在者，即"本身必然的存在者"。',
    after: '即使论证成功，它得出的也只是一个必然存在者；它是不是全知的、全善的、位格的、唯一的，需要另外的论证。本章说这是最要强调的一点。',
  },
  cleanthes: {
    name: '克林塞斯：类比的设计论证',
    where: '第一部分 · 设计论证',
    premises: [
      {
        text: '机器（钟表、房屋）表现出各部分为了一个目的而精巧配合的特征。',
        left: '本章没有介绍针对这一前提的主要反驳：它是关于人造物的一个平常的观察。',
      },
      {
        text: '机器的原因是一个有心灵的设计者。',
        left: '本章没有介绍针对这一前提的主要反驳：我们确实知道钟表和房屋是人设计的。困难在于把这一点推广出去（见第 4 步）。',
      },
      {
        text: '自然（眼睛、整个宇宙）也表现出这样的特征。',
        obj: [
          { text: '类比很弱：宇宙与一部机器相似，也与一个动物或一株植物相似。', b: 'scholar', who: 'SEP 转述《对话录》中的斐洛' },
          { text: '达尔文的自然选择为生物的适应性提供了另一种解释：这是一种"削弱"，不是"反驳"，它没有证明设计者不存在。', b: 'scholar', who: 'SEP"目的论论证"' },
        ],
        reply: { text: '辩护者可以把论证改写为两个假说的似然比较（索伯的分析）：在设计假说下观察到这些现象的可能性，是否更高？可是这样一来，论证的成败取决于能否说出一个设计者会做什么。', b: 'scholar', who: 'SEP"目的论论证"' },
        left: '如果这一步失败，自然与机器的相似就不足以支撑类比；论证最多说明，设计是几种可能的解释之一。',
      },
      {
        text: '相似的结果有相似的原因。',
        obj: [
          { text: '即使结果相似，也只能推出一个与结果相称的原因，推不出一个无限的、完美的原因；世界的缺陷也可能来自一个能力不足的设计者，或许多设计者。', b: 'scholar', who: 'SEP 转述斐洛' },
          { text: '另一个传统中的同一个困难：佛教的哲学家对正理派说，凡是有作者的东西，其作者都有可以被知觉的身体；而草的生长没有这样的作者。', b: 'scholar', who: 'SEP"伽涅舍"，经《知识、推理与辩论》' },
        ],
        reply: { text: '伽涅舍回答：一个需要身体才能有知识的创造者会导致无穷后退（身体由原子组成，又需要一个组合者），所以更简单的设想是一个没有身体的创造者。', b: 'scholar', who: 'SEP"伽涅舍"' },
        left: '如果这一步失败，论证最多推出自然有某种原因，而不是一个有心灵的、无限的设计者。我们是从有身体、有限的作者那里学到"结果有作者"的；推广到一个无限的作者是否合理，正是问题所在。',
      },
    ],
    concl: '所以，自然的原因（很可能）也是一个有心灵的设计者。',
    after: '本章的比较：斐洛说的"与结果相称的原因"和佛教的"附加条件"，是从两个方向对同一个推广的质疑。这是问题层面的比较，不表示两个传统有历史联系。',
  },
  rowe: {
    name: '罗：证据的恶的问题',
    where: '第二部分 · 证据的问题',
    premises: [
      {
        text: '存在这样的剧烈痛苦：一个全能、全知的存在者本可以阻止它，而不因此失去某个更大的善，也不因此允许某个同样坏或更坏的恶。',
        obj: [
          { text: '怀疑的有神论：从"我们看不到理由"推出"没有理由"，只有在"如果有理由，我们很可能会看到"的条件下才合理；人与全知者之间的认识差距，使这个条件很难成立。', b: 'common' },
          { text: '全局的辩护（范·因瓦根）：神可能有理由允许一定总量的骇人苦难；"神本可以阻止这一个"推不出"神应当阻止这一个"。', b: 'scholar', who: 'SEP"恶的问题"' },
        ],
        reply: { text: '罗一方的回应：如果我们对神的理由如此无知，我们也不能从世界上的善推出关于神的结论，日常的道德判断也会失去根据（对怀疑的有神论）；全局的善只是一种"赤裸的可能性"，没有说明某一个具体的恶是被辩护的（图利对范·因瓦根）。', b: 'scholar', who: '前一半据通行的介绍，后一半据 SEP' },
        left: '如果这一步失败，罗的论证就得不出结论。但证据的问题不止一种形式：德雷珀的版本不依靠这一步，它比较有神论和"冷漠假说"，问哪一个更能预期我们观察到的苦乐分布。',
      },
      {
        text: '一个全知、全善的存在者，会阻止它能阻止的任何剧烈痛苦，除非它不能这样做而不失去某个更大的善，或者不允许某个同样坏或更坏的恶。',
        left: '本章说，许多有神论者也接受这个前提。争论集中在第 1 个前提。',
      },
    ],
    concl: '所以，不存在一个全能、全知、全善的存在者。',
    after: '这个论证是归纳的：它的结论是"很可能"，不是"必然"。即使它被成功地回应，回应也只是一种辩护，并没有解释任何一个具体的人或动物为什么受苦。',
  },
};
const AORDER: A[] = ['avicenna', 'cleanthes', 'rowe'];
const AOPTS: readonly (readonly [A, string])[] = AORDER.map((a) => [a, ARGS[a].name] as const);

interface Saved {
  a: A | null;
  pick: Partial<Record<A, number>>;
}
const INIT: Saved = { a: null, pick: {} };

export default function ArgumentAnalyzer() {
  const [st, save] = useSavedIx<Saved>('S12', ID, INIT);
  const arg = st.a ? ARGS[st.a] : null;
  const pi = st.a ? st.pick[st.a] : undefined;
  const p = arg && pi !== undefined ? arg.premises[pi] : null;
  const done = AORDER.filter((a) => st.pick[a] !== undefined).length;
  const popts: readonly (readonly [number, string])[] = arg ? arg.premises.map((_, i) => [i, `前提 ${i + 1}`] as const) : [];

  return (
    <section className="md c3 c5" aria-labelledby="aa-title">
      <header className="md-head">
        <p className="md-tag">三个论证 · 最可疑的前提</p>
        <h3 id="aa-title" className="md-title">哪一个前提最经不起追问？</h3>
        <p className="md-lede">选一个论证，再选出你认为最可疑的前提。组件会给出反驳者怎样攻击它、辩护者怎样回答，以及如果这个前提失败，论证还剩下什么。组件不会告诉你哪一个论证成功了。</p>
      </header>

      <Band>一 · 选一个论证</Band>
      <Pick label="选择一个论证" value={st.a} opts={AOPTS} onPick={(a) => save({ ...st, a })} />

      {arg && st.a && (
        <div aria-live="polite">
          <p className="md-muted">{arg.where}（本章的重建）</p>
          <ol className="v21-steps" aria-label="前提与结论">
            {arg.premises.map((q, i) => (
              <li key={i} className="v21-step">
                <span className="v21-n" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  {pi === i ? <b>{q.text}</b> : q.text}
                  {pi === i && <span className="md-muted">　你选的前提</span>}
                </span>
              </li>
            ))}
            <li className="v21-step">
              <span className="v21-n" aria-hidden="true">
                ∴
              </span>
              <span>{arg.concl}</span>
            </li>
          </ol>

          <Band>二 · 你认为哪一个前提最可疑？</Band>
          <Pick
            label="选择最可疑的前提"
            value={pi ?? null}
            opts={popts}
            onPick={(i) => save({ ...st, pick: { ...st.pick, [st.a as A]: i } })}
          />
        </div>
      )}

      {p && arg && (
        <div aria-live="polite">
          {p.obj ? (
            <>
              <p>
                <b>反驳者怎样攻击它：</b>
              </p>
              {p.obj.map((o, i) => (
                <Claim key={i} b={o.b} who={o.who}>
                  {o.text}
                </Claim>
              ))}
              {p.reply && (
                <>
                  <p>
                    <b>辩护者怎样回答：</b>
                  </p>
                  <Claim b={p.reply.b} who={p.reply.who}>
                    {p.reply.text}
                  </Claim>
                </>
              )}
            </>
          ) : null}
          <p>
            <b>{p.obj ? '如果这个前提失败：' : '关于这个前提：'}</b>
            {p.left}
          </p>
          <Claim b="course">{arg.after}</Claim>
          <p className="md-muted">你已经检查了 {done} / 3 个论证。{done < 3 ? '也试试其他的论证，比较它们最弱的地方在哪里。' : '本章介绍的反驳分别集中在三个地方：整体与部分；从有限的作者推广到无限的作者；从"看不到理由"到"没有理由"。你选的前提和它们一样吗？'}</p>
        </div>
      )}

      <Limits>
        <p>
          <b>前提、反驳和回答，复述本章第一、二部分的重建和转述。</b>
          依据 SEP 的"宇宙论论证""目的论论证""恶的问题"条目和《知识、推理与辩论》一课对伽涅舍的转述（本章注 5—11）；"怀疑的有神论"一段依据通行的介绍，本章没有阅读原始文献。组件不评分，也不判定哪一个论证成功或失败：你选的前提，只是你认为最值得追问的地方。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

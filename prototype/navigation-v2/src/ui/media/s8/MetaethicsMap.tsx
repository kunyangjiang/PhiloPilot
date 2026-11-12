import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 四 · after the table of five positions and their costs and the paragraph under
// it (content/S8_SAMPLE_DRAFT.md). Three steps, none graded:
// 1. Up to four diagnostic questions (can a moral judgment be true or false;
//    are some true; what makes them true; natural or non-natural facts) locate
//    the reader's answers among the chapter's five positions.
// 2. A fifth question on motivation (internalism or externalism) shows how it
//    fits with the answers above (Smith's "moral problem").
// 3. The objections the chapter raises against the located position; for
//    each, the reader says whether they still hold the answer. Wavering sends
//    them back to change an answer; nothing is scored.
// Positions, objections and the motivation notes restate the chapter (一 to
// 五; SEP "Moral Realism", "Moral Anti-Realism", "Moral Cognitivism vs.
// Non-Cognitivism", "Constructivism in Metaethics", "Moral Epistemology",
// "Moral Motivation"). The component does not say which position is right.

const ID = 'metaethics-map';

type U = 'unsure';
type Q1 = 'describe' | 'express' | U;
type Q2 = 'some' | 'none' | U;
type Q3 = 'indep' | 'proc' | U;
type Q4 = 'natural' | 'nonnatural' | U;
type Q5 = 'nec' | 'contingent' | U;
type P = 'nonnat' | 'nat' | 'error' | 'expr' | 'constr';
type H = 'hold' | 'waver';

const PNAME: Record<P, string> = {
  nonnat: '非自然主义的实在论',
  nat: '自然主义的实在论',
  error: '错误论',
  expr: '表达主义',
  constr: '建构主义',
};

const OBJ: Record<P, { id: string; text: string; where: string }[]> = {
  nonnat: [
    { id: 'queer', text: '麦凯的"古怪"论证：一种本身就给每一个人以理由的性质，与宇宙中的其他东西完全不同；要认识它，似乎需要一种特殊的能力。', where: '第一部分' },
    { id: 'harman', text: '哈曼的说明论证：要说明你的"这是错的"，似乎不需要提到"错"这个事实。', where: '第一部分' },
    { id: 'darwin', text: '斯特里特的达尔文困境：如果进化与独立的道德真理没有关系，我们的道德信念符合真理就是一个巨大的巧合。', where: '第四部分' },
  ],
  nat: [
    { id: 'oqa', text: '摩尔的开放问题论证："这是 N，可它是好的吗？"似乎总是开放的问题。（回应："水"和"H₂O"也曾是开放的问题。）', where: '第一部分' },
    { id: 'harman', text: '哈曼的说明论证：即使道德性质是自然性质，它们在说明我们的判断时是否多余？', where: '第一部分' },
    { id: 'norm', text: '规范性从哪里来：如果"错"只是某种自然性质，它怎样给每一个人以不去做的理由？', where: '第四部分的表格' },
  ],
  error: [
    { id: 'companion', text: '"同伴"的论证：认识的规范（"你应当相信证据所支持的东西"）也同样"古怪"，可是错误论者自己正是要求我们应当相信他的结论。', where: '第一部分' },
    { id: 'after', text: '错误论之后怎样生活：虚构主义、废除主义还是保守主义？每一种都有代价。', where: '第一部分' },
  ],
  expr: [
    { id: 'fg', text: '弗雷格—吉奇问题："如果折磨猫是坏的，那么让你的小弟弟去折磨猫也是坏的"——在"如果"从句中，你没有表达任何态度，推理却明显有效。', where: '第二部分' },
    { id: 'neg', text: '否定的问题（施罗德）：表达主义者需要说明"认为它是错的"和"认为它不是错的"为什么冲突，这种不一致很难用他们的材料构造出来。', where: '第二部分' },
  ],
  constr: [
    { id: 'dilemma', text: '沙弗—兰道的两难：程序为什么是正确的？如果因为它追踪独立的真理，你就是实在论者；如果不是，程序就是任意的。', where: '第三部分' },
    { id: 'caligula', text: '卡利古拉：如果理由来自一个行为者自己的评价态度，一个完全融贯的卡利古拉有理由去折磨人（斯特里特接受这个后果，科斯嘉德不接受）。', where: '第三部分' },
  ],
};

const O1: readonly (readonly [Q1, string])[] = [
  ['describe', '在描述一个事实：它能为真或为假'],
  ['express', '在表达一种态度（或一个计划）'],
  ['unsure', '拿不准'],
];
const O2: readonly (readonly [Q2, string])[] = [
  ['some', '有：有些道德判断是真的'],
  ['none', '没有：它们断言的那种事实并不存在'],
  ['unsure', '拿不准'],
];
const O3: readonly (readonly [Q3, string])[] = [
  ['indep', '独立于任何人的态度或观点的事实'],
  ['proc', '一个理性的程序或实践的观点的结果'],
  ['unsure', '拿不准'],
];
const O4: readonly (readonly [Q4, string])[] = [
  ['natural', '自然的事实，可以用经验科学研究'],
  ['nonnatural', '真实的，但不是自然的事实'],
  ['unsure', '拿不准'],
];
const O5: readonly (readonly [Q5, string])[] = [
  ['nec', '必然带有（至少在正常的、理性的人那里）'],
  ['contingent', '不一定：取决于他是否另外有某种欲望'],
  ['unsure', '拿不准'],
];
const HOPTS: readonly (readonly [H, string])[] = [
  ['hold', '我仍然保持这个回答'],
  ['waver', '这条反驳让我动摇了'],
];

interface Saved {
  q1: Q1 | null;
  q2: Q2 | null;
  q3: Q3 | null;
  q4: Q4 | null;
  q5: Q5 | null;
  h: Record<string, H>;
}
const INIT: Saved = { q1: null, q2: null, q3: null, q4: null, q5: null, h: {} };

/** The located position, 'open' while an answer is unsure, null while a question is unanswered. */
function locate(s: Saved): P | 'open' | null {
  if (!s.q1) return null;
  if (s.q1 === 'unsure') return 'open';
  if (s.q1 === 'express') return 'expr';
  if (!s.q2) return null;
  if (s.q2 === 'unsure') return 'open';
  if (s.q2 === 'none') return 'error';
  if (!s.q3) return null;
  if (s.q3 === 'unsure') return 'open';
  if (s.q3 === 'proc') return 'constr';
  if (!s.q4) return null;
  if (s.q4 === 'unsure') return 'open';
  return s.q4 === 'natural' ? 'nat' : 'nonnat';
}

function motivation(p: P, q5: Q5): string {
  if (q5 === 'unsure') return '你对动机的问题拿不准。这正是第五部分的争论："不在乎道德的人"是否可能，史密斯的拜物教论证是否成立。';
  if (q5 === 'contingent')
    return '你接受外在主义。它容易容纳"不在乎道德的人"；要承担的是史密斯的拜物教论证：好人的动机似乎可靠地跟着判断改变，而不只是因为他想"做对的事"。';
  if (p === 'expr') return '你接受内在主义。这与表达主义契合，也是表达主义的一个主要论证：如果道德判断本身就是态度，它与动机的联系就很容易说明。要承担的是：怎样看待"不在乎道德的人"和某些脑损伤病人的情况。';
  if (p === 'error') return '你接受内在主义。这与麦凯的看法相合：他认为日常的道德判断断言的"客观的规定性"本身就能推动认识它的人——而正是这一点使它显得古怪。';
  return '你接受内在主义，又认为道德判断能为真（认知主义）。按照史密斯的"道德问题"，再加上休谟式的动机理论（只有欲望能推动行动），三者似乎不一致；要保持一致，你要么像内格尔、麦克道威尔那样拒绝休谟式的动机理论，要么重新考虑上面的回答。';
}

export default function MetaethicsMap() {
  const [st, save] = useSavedIx<Saved>('S8', ID, INIT);
  const p = locate(st);
  const set = (patch: Partial<Saved>) => save({ ...st, ...patch });
  const objs = p && p !== 'open' ? OBJ[p] : [];
  const weighed = objs.length > 0 && objs.every((o) => st.h[`${p}:${o.id}`]);
  const wavered = objs.filter((o) => st.h[`${p}:${o.id}`] === 'waver');

  return (
    <section className="md c3 c5" aria-labelledby="mm-title">
      <header className="md-head">
        <p className="md-tag">元伦理学的立场 · 先回答，再权衡反驳</p>
        <h3 id="mm-title" className="md-title">当你说"折磨猫是错的"……</h3>
        <p className="md-lede">
          回答几个问题——没有对错。组件会告诉你，你的回答接近本章介绍的哪一种立场，再列出这种立场要面对的反驳，请你一条一条地权衡。它不会告诉你哪一种立场是对的。
        </p>
      </header>

      <Band>一 · 道德判断是什么</Band>
      <p>1. 当你说"折磨猫是错的"，你是在——</p>
      <Pick label="问题 1：你是在描述事实，还是表达态度？" value={st.q1} opts={O1} onPick={(v) => set({ q1: v })} />
      {st.q1 === 'describe' && (
        <>
          <p>2. 有没有这样的判断是真的？</p>
          <Pick label="问题 2：有没有道德判断是真的？" value={st.q2} opts={O2} onPick={(v) => set({ q2: v })} />
        </>
      )}
      {st.q1 === 'describe' && st.q2 === 'some' && (
        <>
          <p>3. 使它为真的，是什么？</p>
          <Pick label="问题 3：使道德判断为真的是什么？" value={st.q3} opts={O3} onPick={(v) => set({ q3: v })} />
        </>
      )}
      {st.q1 === 'describe' && st.q2 === 'some' && st.q3 === 'indep' && (
        <>
          <p>4. 这样的道德事实是——</p>
          <Pick label="问题 4：道德事实是自然的还是非自然的？" value={st.q4} opts={O4} onPick={(v) => set({ q4: v })} />
        </>
      )}

      {p && (
        <div aria-live="polite">
          {p === 'open' ? (
            <p>
              <b>你的位置还没有确定。</b>你在某一个问题上拿不准；本章介绍的几种立场，正是在这里分开的。你可以先读完相关的部分，再回来回答。
            </p>
          ) : (
            <p>
              <b>你的回答接近：{PNAME[p]}。</b>
              这只是一个起点：每一种立场内部都有许多变体。
            </p>
          )}

          <Band>二 · 道德判断与动机</Band>
          <p>5. 一个人真诚地判断"折磨猫是错的"，是否必然带有不去做的动机？</p>
          <Pick label="问题 5：真诚的道德判断是否必然带有动机？" value={st.q5} opts={O5} onPick={(v) => set({ q5: v })} />
          {st.q5 && p !== 'open' && <p aria-live="polite">{motivation(p, st.q5)}</p>}
          {st.q5 && p === 'open' && <p className="md-muted">先确定上面的位置，这里才能说明你的回答与它怎样配合。</p>}

          {p !== 'open' && (
            <>
              <Band>三 · 权衡反驳</Band>
              <ol className="v21-steps" aria-label={`${PNAME[p]}要面对的反驳`}>
                {objs.map((o, i) => (
                  <li key={o.id} className="v21-step">
                    <span className="v21-n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>
                      <span>
                        {o.text}
                        <span className="md-muted">（{o.where}）</span>
                      </span>
                      <Pick
                        label={`反驳 ${i + 1}`}
                        value={st.h[`${p}:${o.id}`]}
                        opts={HOPTS}
                        onPick={(h) => set({ h: { ...st.h, [`${p}:${o.id}`]: h } })}
                      />
                    </span>
                  </li>
                ))}
              </ol>
              {weighed && (
                <div aria-live="polite">
                  <p>
                    {wavered.length
                      ? `有 ${wavered.length} 条反驳让你动摇了。动摇不等于这个立场是错的：你可以回到本章的相应部分看它的回应，或者回到上面修改你的回答，看另一种立场要付出什么代价。`
                      : '你权衡了每一条反驳，仍然保持这个回答。那么你要准备说明，每一条反驳错在哪里，或者为什么它的代价是可以接受的。'}
                  </p>
                  <Claim b="course">
                    没有一种立场能同样好地回答本章的几个问题：实在论容易说明道德判断的形式，却要面对知识和"古怪"的问题；表达主义容易说明动机，却要面对逻辑的问题；建构主义试图兼顾，却要面对坍塌的威胁。选择一种立场，就是选择在哪一个问题上付出代价。
                  </Claim>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>五种立场、它们的困难和关于动机的说明，复述本章第一到第五部分和第四部分的表格（依据 SEP 的相关条目）。</b>
          诊断性的问题是本组件的整理，把每一种立场简化成了几个回答；准实在论者会说道德判断"为真"，却仍然是表达主义者，这类变体在这里没有单独列出。这个组件不评分，也不判定哪一种立场正确。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 四 · after the table setting the three thought experiments side by side and
// the paragraph introducing this component (content/S5_SAMPLE_DRAFT.md).
// Three steps, none graded:
// 1. The reader chooses one of the three thought experiments (Mary's room,
//    zombies, the bat).
// 2. For each premise, the reader says accept, reject or unsure. Rejecting a
//    premise shows the position or reply the chapter associates with that
//    move; accepting all premises shows the conclusion. Either way, what the
//    thought experiment does not establish is shown.
// 3. Across the three, a summary of the reader's choices, and the chapter's
//    point that the arguments rest on different inferences.
// Premises, conclusions, replies and limits restate the chapter (which follows
// the SEP entries on the knowledge argument, zombies and consciousness). Where
// the chapter names no position for rejecting a premise, the component says so
// instead of inventing one; where the link from a premise to a reply is the
// component's own arrangement, it is marked.

const ID = 'thought-experiment-map';

type E = 'mary' | 'zombie' | 'bat';
type A = 'accept' | 'reject' | 'unsure';

interface Premise {
  id: string;
  text: string;
  /** What rejecting this premise amounts to. */
  reject: string;
  /** The link from this premise to the reply is the component's arrangement. */
  arranged?: boolean;
}

const EXPS: Record<E, { name: string; setup: string; premises: Premise[]; conclusion: string; notShown: string[] }> = {
  mary: {
    name: '玛丽的房间',
    setup: '玛丽一直生活在黑白的房间里，通过黑白的屏幕学会了关于颜色视觉的一切物理事实。有一天她走出房间，第一次看见了红色。',
    premises: [
      {
        id: 'm1',
        text: '出房间之前，玛丽拥有关于人类颜色视觉的全部物理信息。',
        reject: '丹尼特一类的质疑：一个真正掌握了一切物理知识的人，也许能推出红色看起来是什么样的；我们很难想象"全部物理信息"意味着什么。',
      },
      {
        id: 'm2',
        text: '出房间时，她获得了关于颜色视觉的新的知识：她知道了一件以前不知道的事。',
        reject: '能力假说（刘易斯、内米罗）：她获得的是新的能力——辨认、想象、记住红色——而不是新的事实知识。亲知假说（科尼）：她获得的是对红色的亲知，既不是事实知识，也不是能力。',
      },
      {
        id: 'm3',
        text: '如果有一种知识不能从物理的知识中获得，就有不是物理的事实或性质。',
        reject: '"旧事实、新方式"（现象概念）：她获得了新的知识，但它关于的仍然是她已经知道的物理事实，只是通过一种新的概念来把握。',
      },
    ],
    conclusion: '不是所有的信息都是物理的信息；所以物理主义是错的',
    notShown: [
      '即使前两个前提成立，从"有一种知识不能从物理的知识中获得"到"有非物理的事实"，还要有第三个前提——这正是"旧事实、新方式"所拒绝的。',
      '它不告诉我们非物理的性质是什么，也不告诉我们它们是否起因果作用。',
      '杰克逊本人后来放弃了这个论证的结论，转而为一种物理主义的说明辩护。',
    ],
  },
  zombie: {
    name: '哲学僵尸',
    setup: '哲学僵尸在物理上与一个正常的人完全相同，却没有任何意识经验——做一个僵尸"不是什么样的"。它的行为和我们一样，甚至会谈论意识。',
    premises: [
      {
        id: 'z1',
        text: '僵尸是可设想的。',
        reject: '丹尼特：设想僵尸的人低估了"完全想象"它要求什么；僵尸其实不可设想。',
      },
      {
        id: 'z2',
        text: '凡是可设想的，都是可能的。',
        reject: '可设想不等于可能：依照克里普克的思路，有些必然的真理只能后天地知道（水是 H₂O）；现象概念的策略（例如洛尔）则说，僵尸的直觉反映的只是概念之间的鸿沟，不是存在的鸿沟。查尔默斯用二维语义学回应。',
      },
      {
        id: 'z3',
        text: '如果僵尸是可能的，物理主义就是错的。',
        reject: '本章没有讨论拒绝这一步的立场：它直接来自用"随附"表述的物理主义（第二部分）——如果物理上相同的世界可以在意识上不同，物理的事实就没有决定意识的事实。',
      },
    ],
    conclusion: '僵尸是可能的，物理的事实没有决定意识的事实；所以物理主义是错的',
    notShown: [
      '它不说僵尸存在，也不说你身边的某个人是僵尸；它只用一种可能性来检验物理主义。',
      '它的力量取决于"可设想的都是可能的"这一前提，而这正是争论的焦点。',
      '接受全部前提的人还要面对副现象论的困难：如果僵尸的世界是可能的，意识似乎不对行为起作用——可是我们谈论自己的意识，而我的僵尸孪生兄弟说的话和我一模一样。',
    ],
  },
  bat: {
    name: '做一只蝙蝠是什么样的',
    setup: '蝙蝠用回声定位来感知世界。即使我们知道了蝙蝠声呐系统的一切客观事实，我们似乎仍然不知道，用回声定位感知世界对蝙蝠来说是什么样的。',
    premises: [
      {
        id: 'b1',
        text: '蝙蝠是有意识的：做一只蝙蝠"是有某种样子的"。',
        reject: '那么这个例子就失去了它的对象。蝙蝠是否有经验，本身是本章第六部分"动物的心灵"要讨论的问题（分布的问题）。',
        arranged: true,
      },
      {
        id: 'b2',
        text: '这种样子只有从蝙蝠的视角才能把握。',
        reject: '有人认为，我们不能想象蝙蝠的经验，只说明我们的想象力有限，不说明有非物理的事实。',
        arranged: true,
      },
      {
        id: 'b3',
        text: '客观的、物理的描述是从任何视角之外作出的，所以它似乎漏掉了经验的主观性质。',
        reject: '"从某个视角把握"是一种认识的方式，而不是一种额外的事实——这与玛丽的"旧事实、新方式"相近。',
      },
    ],
    conclusion: '我们目前不理解物理主义怎样可能为真——这个结论比另外两个论证要弱',
    notShown: [
      'SEP 的条目强调，内格尔并没有论证物理主义是错的；他说的是，我们目前还没有关于物理主义怎样可能为真的理解。',
      '它不告诉我们蝙蝠的经验具体是什么样的。',
      '它预设了蝙蝠有经验，而这本身需要证据和论证。',
    ],
  },
};
const ORDER: E[] = ['mary', 'zombie', 'bat'];
const EOPTS: readonly (readonly [E, string])[] = ORDER.map((e) => [e, EXPS[e].name] as const);
const AOPTS: readonly (readonly [A, string])[] = [
  ['accept', '接受'],
  ['reject', '拒绝'],
  ['unsure', '拿不准'],
];

interface Saved {
  exp: E | null;
  ans: Record<string, A>;
}
const INIT: Saved = { exp: null, ans: {} };

export default function ThoughtExperimentMap() {
  const [st, save] = useSavedIx<Saved>('S5', ID, INIT);
  const x = st.exp ? EXPS[st.exp] : null;
  const answered = (e: E) => EXPS[e].premises.filter((p) => st.ans[p.id]).length;
  const complete = (e: E) => answered(e) === EXPS[e].premises.length;
  const doneAll = ORDER.every(complete);

  return (
    <section className="md c3 c5" aria-labelledby="tem-title">
      <header className="md-head">
        <p className="md-tag">意识的思想实验 · 逐一检查前提</p>
        <h3 id="tem-title" className="md-title">三个思想实验：你拒绝哪一个前提？</h3>
        <p className="md-lede">
          选一个思想实验，对它的每一个前提说出你接受、拒绝还是拿不准——没有对错。拒绝一个前提，就会看到本章把这一步与哪一种立场或回应联系在一起；接受全部前提，就要接受结论。无论哪一种，都会看到这个思想实验没有证明什么。
        </p>
      </header>

      <Band>一 · 选一个思想实验</Band>
      <Pick label="选择思想实验" value={st.exp} opts={EOPTS} onPick={(e) => save({ ...st, exp: e })} />
      <p className="md-muted">
        已检查：
        {ORDER.map((e, i) => `${i ? '；' : ''}${EXPS[e].name} ${answered(e)} / ${EXPS[e].premises.length}`).join('')}
      </p>

      {x && st.exp && (
        <>
          <Band>二 · {x.name}的前提</Band>
          <p>{x.setup}</p>
          <ol className="v21-steps" aria-label={`${x.name}的前提`}>
            {x.premises.map((p, i) => {
              const a = st.ans[p.id];
              return (
                <li key={p.id} className="v21-step">
                  <span className="v21-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>
                    <span>{p.text}</span>
                    <Pick label={`前提 ${i + 1}：${p.text}`} value={a} opts={AOPTS} onPick={(na) => save({ ...st, ans: { ...st.ans, [p.id]: na } })} />
                    {a === 'reject' && (
                      <span aria-live="polite">
                        <span className="md-muted">拒绝这一步：</span>
                        {p.reject}
                        {p.arranged && <span className="md-muted">（把这一前提与这一回应对应起来，是本组件的整理。）</span>}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>

          {complete(st.exp) && (
            <div aria-live="polite">
              {x.premises.every((p) => st.ans[p.id] === 'accept') ? (
                <p>
                  <b>你接受了全部前提，所以要接受结论：</b>
                  {x.conclusion}。
                </p>
              ) : x.premises.some((p) => st.ans[p.id] === 'reject') ? (
                <p>
                  <b>你拒绝了至少一个前提，所以不必接受结论</b>（{x.conclusion}）。但拒绝一个前提也有代价：你要说明它错在哪里。
                </p>
              ) : (
                <p>
                  <b>你没有拒绝任何前提，但对有的前提拿不准，</b>所以结论（{x.conclusion}）对你来说还悬而未决。
                </p>
              )}
              <p className="md-muted">无论你怎样回答，这个思想实验都没有证明：</p>
              <ul className="md-muted">
                {x.notShown.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {doneAll && (
        <div aria-live="polite">
          <Band>三 · 三个思想实验放在一起</Band>
          <ul className="md-muted">
            {ORDER.map((e) => {
              const rej = EXPS[e].premises.map((p, i) => (st.ans[p.id] === 'reject' ? i + 1 : 0)).filter(Boolean);
              return (
                <li key={e}>
                  {EXPS[e].name}：{rej.length ? `你拒绝了前提 ${rej.join('、')}` : '你没有拒绝任何前提'}。
                </li>
              );
            })}
          </ul>
          <Claim b="course">
            三个论证依赖的推论不同：玛丽的论证从"新的知识"推到"非物理的事实"，僵尸论证从"可设想"推到"可能"，蝙蝠的例子从"不能从外部把握"推到"物理描述不完全"。所以拒绝"可设想的都是可能的"，并不自动驳倒玛丽的论证；反过来也一样。但有的回应同时针对几个论证：现象概念的策略既回应僵尸论证，也是玛丽的"旧事实、新方式"。
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>三个思想实验的设定、前提、结论、回应和"没有证明什么"，复述本章第四部分（依据 SEP 的"感质：知识论证""僵尸"和"意识"条目）。</b>
          前提的分步是本章的重建，不是杰克逊、查尔默斯或内格尔原文的写法。蝙蝠例子的前两个前提与回应的对应，是本组件的整理，已标出。这个组件不评分，也不判定物理主义或二元论哪一个正确：它只帮你看清，你的立场取决于哪一个前提。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import '../gr1/gr1.css';
import './gr3.css';

// 四 · after "目的不是意图". Two tasks. First, the learner answers the four
// "why" questions for an artifact (a house), a natural thing (an oak) and a
// natural event (a lunar eclipse), choosing among candidates that are
// answers to the *other* questions, so each choice needs a reason; the
// eclipse shows that a question can have no answer (1044b12). Second, the
// learner sorts claims about purpose into ones Aristotle accepts and ones he
// does not, which separates "for the sake of" from conscious intention
// (199a26—30, 199b26—28). All examples and analyses are the chapter's
// (content/GR3_SAMPLE_DRAFT.md, 四).

type Q = 0 | 1 | 2 | 3;
const QUESTIONS: { name: string; ask: string }[] = [
  { name: '质料因', ask: '它是由什么构成的？' },
  { name: '形式因', ask: '它是什么？' },
  { name: '动力因', ask: '是什么使它产生的？' },
  { name: '目的因', ask: '它是为了什么？' },
];

interface Opt {
  t: string;
  /** Why this answer is right, or which question it really answers. */
  fb: string;
}
interface Example {
  id: string;
  zh: string;
  kind: string;
  /** Per question: the options, the first one right. */
  slots: [Opt[], Opt[], Opt[], Opt[]];
  after: string;
}

const EXAMPLES: Example[] = [
  {
    id: 'house',
    zh: '一所房子',
    kind: '人造物',
    slots: [
      [
        { t: '砖、石、木料', fb: '对。这是房子由之构成、又留在房子之中的东西。' },
        { t: '建筑师的技艺', fb: '这回答的是"是什么使它产生的"，是动力因。' },
        { t: '"防风雨的遮蔽物"这种组织方式', fb: '这回答的是"它是什么"，是形式因。一堆砖石还不是房子。' },
      ],
      [
        { t: '"能防止风雨和炎热损害的遮蔽物"这种组织方式', fb: '对。这是房子的定义：砖石木料被这样组织起来，才是一所房子。' },
        { t: '砖、石、木料的总和', fb: '这是质料。同样的砖石可以堆成一堆，也可以建成一堵墙；它们的总和还不能说明它是什么。' },
        { t: '建筑师这个人', fb: '这是在回答"是什么使它产生的"，而且亚里士多德说，严格地说原因是建筑师的技艺，而不是这个人。' },
      ],
      [
        { t: '建筑师的技艺', fb: '对。亚里士多德说，严格地说，原因是"技艺"，而不是建筑师这个人：他是作为懂建筑的人而建造的。' },
        { t: '砖、石、木料', fb: '砖石不会自己变成房子。这是质料因。' },
        { t: '遮蔽人和财物', fb: '这是房子"为了什么"，是目的因。它确实影响了怎样建造，但它不是变化的起点。' },
      ],
      [
        { t: '遮蔽人和财物', fb: '对。人造物的目的来自使用它、制造它的人。' },
        { t: '建筑师的技艺', fb: '这是动力因：它回答"是什么使它产生"，不回答"它是为了什么"。' },
        { t: '没有目的，房子碰巧建成了', fb: '人造物都是为了某种用途而做的。没有目的因的例子见"一次月食"。' },
      ],
    ],
    after:
      '在房子这里，形式和目的靠得很近（"遮蔽物"既说明它是什么，也说明它为了什么），但它们回答的是不同的问题。动力因在房子之外：建筑师的技艺。',
  },
  {
    id: 'oak',
    zh: '一棵橡树',
    kind: '自然物',
    slots: [
      [
        { t: '橡子以及它吸收的土、水和养分', fb: '对。这是橡树由之生成、又留在它之中的东西。' },
        { t: '产生这颗橡子的那棵成年橡树', fb: '这是动力因：变化的起点。它并不构成新长出的橡树。' },
        { t: '橡树作为一种植物的组织方式', fb: '这是形式因。' },
      ],
      [
        { t: '橡树的本质：它作为一种特定植物的组织方式', fb: '对。正是这种组织方式（生长、吸收养分、结出橡子），使这些木质和汁液成为一棵活的橡树。' },
        { t: '木头和汁液', fb: '这是质料。' },
        { t: '一位设计者心中的蓝图', fb: '亚里士多德的自然物没有设计者。橡树的形式就在橡树之中，不在任何人的心中。' },
      ],
      [
        { t: '产生这颗橡子的成年橡树；在生长中，是橡子自身的生长能力', fb: '对。自然物的变化本原在它自身之中，这正是"自然"的定义。' },
        { t: '土和水', fb: '土和水进入了橡树，是质料。它们自己不会长成橡树。' },
        { t: '一位在外面推动它生长的设计者', fb: '亚里士多德的自然目的论里没有这样的设计者。动力因是产生它的那棵橡树，以及它自身的生长能力。' },
      ],
      [
        { t: '长成一棵成熟的、能够结出橡子的橡树', fb: '对。橡子的发育是朝向这个形式的完全实现的。' },
        { t: '橡子想要长成橡树', fb: '"为了什么"不等于"想要"。橡子没有意图；它的发育朝向橡树这个形式，这才是目的因的意思。下面第二项任务专门讨论这一点。' },
        { t: '没有目的，它只是碰巧长成了橡树', fb: '亚里士多德会反对：橡子总是或在大多数情况下长成橡树，而偶然的事不会总是这样发生（198b34—36）。' },
      ],
    ],
    after:
      '在橡树这里，形式因、动力因和目的因在种类上是同一个东西："橡树"。现实的橡树产生了橡子，橡子的发育又以成为一棵现实的橡树为目的："这三种原因常常合而为一……因为人生人"（198a24—27）。',
  },
  {
    id: 'eclipse',
    zh: '一次月食',
    kind: '自然现象',
    slots: [
      [
        { t: '严格说没有质料；承受这件事的是月亮', fb: '对。月食不是由什么材料构成的东西；亚里士多德说，它的"承受者"是月亮。' },
        { t: '地球', fb: '地球遮住了光，它是动力因。' },
        { t: '光', fb: '月食恰恰是光的缺乏。光不是构成月食的材料。' },
      ],
      [
        { t: '由于地球位于中间而造成的光的缺乏', fb: '对。这是月食的定义。注意定义中已经包括了原因（地球位于中间）：在这里，形式因和动力因合在一起。' },
        { t: '月亮变暗', fb: '这只描述了发生的事，没有说明它是什么样的缺乏、为什么发生。亚里士多德的定义要包括原因。' },
        { t: '月亮', fb: '月亮是承受者，相当于质料的位置。' },
      ],
      [
        { t: '地球（它遮住了光）', fb: '对。' },
        { t: '月亮自身', fb: '月亮是承受月食的东西，它并没有使自己变暗。' },
        { t: '没有原因，偶然发生', fb: '月食有确定的原因，而且可以预测。没有的是另一种原因，见目的因。' },
      ],
      [
        { t: '大概没有', fb: '对。"至于\'为了什么\'，大概是没有的"（1044b12）。亚里士多德并不认为一切事物都有目的因。' },
        { t: '为了提醒人们敬神', fb: '这是把一种意图加给了天象。亚里士多德说月食大概没有"为了什么"。' },
        { t: '为了让人研究天文', fb: '人可以利用月食研究天文，但这不是月食发生的原因。' },
      ],
    ],
    after:
      '四因不是一张必须填满的表格。月食有动力因和形式因（两者在定义里合一），没有严格意义上的质料，大概也没有目的因。所以，把亚里士多德说成认为"万物都有目的"的哲学家，至少是不准确的。',
  },
];

/** Claims about purpose, for the second task. */
const CLAIMS: { t: string; yes: boolean; fb: string }[] = [
  {
    t: '根向下长而不是向上长，是为了吸收养分。',
    yes: true,
    fb: '接受。这是他自己举的例子（199a26—30）。意思是：根向下长这个过程，朝向植物吸收养分这个功能，并要靠这个功能来解释。',
  },
  {
    t: '根向下长，是因为植物想要吸收养分。',
    yes: false,
    fb: '不接受。植物没有任何意图；燕子和蜘蛛"不是靠技艺，也不是靠探究或考虑"来做这些事的（199a20—23，转述）。"为了什么"不需要有人在想。',
  },
  {
    t: '只要看不到有谁在考虑，就不能说一件事是为了什么而发生的。',
    yes: false,
    fb: '不接受。他说这是"荒谬的"，"其实，技艺也不考虑"（199b26—28）：熟练的工匠工作有目的，却不需要每一步都有意识地考虑目的。',
  },
  {
    t: '月食是为了某个目的而发生的。',
    yes: false,
    fb: '不接受。月食的"为了什么"大概是没有的（1044b12）。',
  },
  {
    t: '牙齿的安排总是或在大多数情况下一样，所以不是偶然的。',
    yes: true,
    fb: '接受，这是他对反对者的回答（198b34—36）。不过，由此再推出"所以是为了什么"，要依赖"偶然或目的，二者必居其一"这个前提；现代的自然选择理论正好提供了第三种可能。',
  },
];

const ID = 'four-causes';
type Task = 'causes' | 'purpose';
interface Saved {
  task: Task;
  ex: string;
  picks: Record<string, (number | null)[]>;
  checked: Record<string, boolean>;
  claims: (boolean | null)[];
}
const INIT: Saved = { task: 'causes', ex: 'house', picks: {}, checked: {}, claims: CLAIMS.map(() => null) };

/** A fixed rotation per slot, so the right answer is not always first. */
const order = (ex: number, q: number) => [0, 1, 2].map((i) => (i + ex + q * 2) % 3);

export default function FourCausesWorkshop() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('GR3', ID, INIT));
  const [showGrc, setShowGrc] = useState(false);
  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR3', ID, next);
  };
  const exIdx = Math.max(0, EXAMPLES.findIndex((e) => e.id === st.ex));
  const ex = EXAMPLES[exIdx];
  const picks = st.picks[ex.id] ?? [null, null, null, null];
  const checked = !!st.checked[ex.id];
  const allPicked = picks.every((p) => p !== null);
  const nRight = picks.filter((p) => p === 0).length;
  const setPick = (q: Q, i: number) => {
    const next = picks.slice();
    next[q] = i;
    save({ ...st, picks: { ...st.picks, [ex.id]: next }, checked: { ...st.checked, [ex.id]: false } });
  };
  const claimsDone = st.claims.every((c) => c !== null);

  return (
    <section className="md fc" aria-labelledby="fc-title">
      <header className="md-head">
        <p className="md-tag">分析练习</p>
        <h3 id="fc-title" className="md-title">
          四因工作坊
        </h3>
        <p className="md-lede">
          四因是对"为什么"的四种回答。第一项任务：给三个例子回答四个问题，每个问题的候选答案中，有些其实回答的是别的问题。第二项任务：判断关于"目的"的几种说法，亚里士多德会不会接受。
        </p>
      </header>

      <div className="md-seg" role="radiogroup" aria-label="任务">
        {(
          [
            ['causes', '一、四个问题'],
            ['purpose', '二、目的不是意图'],
          ] as [Task, string][]
        ).map(([k, t]) => (
          <label key={k} className={'md-seg-opt' + (st.task === k ? ' is-on' : '')}>
            <input type="radio" name="fc-task" checked={st.task === k} onChange={() => save({ ...st, task: k })} />
            <span>{t}</span>
          </label>
        ))}
      </div>

      {st.task === 'causes' && (
        <div className="fc-panel">
          <fieldset className="cs-group">
            <legend>选一个例子</legend>
            <div className="md-seg">
              {EXAMPLES.map((e) => (
                <label key={e.id} className={'md-seg-opt' + (ex.id === e.id ? ' is-on' : '')}>
                  <input type="radio" name="fc-ex" checked={ex.id === e.id} onChange={() => save({ ...st, ex: e.id })} />
                  <span>
                    {e.zh}
                    <small className="mf-nat">{e.kind}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {QUESTIONS.map((qq, qi) => {
            const q = qi as Q;
            const pick = picks[q];
            return (
              <fieldset key={q} className={'cs-group fc-q' + (checked ? (pick === 0 ? ' is-right' : ' is-wrong') : '')}>
                <legend>
                  {qq.ask}
                  <small className="fc-name">{qq.name}</small>
                </legend>
                <div className="md-seg gr-col">
                  {order(exIdx, q).map((i) => (
                    <label key={i} className={'md-seg-opt' + (pick === i ? ' is-on' : '')}>
                      <input type="radio" name={`fc-${ex.id}-${q}`} checked={pick === i} onChange={() => setPick(q, i)} />
                      <span>{ex.slots[q][i].t}</span>
                    </label>
                  ))}
                </div>
                {checked && pick !== null && (
                  <p className="fc-fb">
                    <b>{pick === 0 ? '✓ ' : '✗ '}</b>
                    {ex.slots[q][pick].fb}
                    {pick !== 0 && <> 本题的答案是：{ex.slots[q][0].t}。</>}
                  </p>
                )}
              </fieldset>
            );
          })}

          <div className="lw-nav">
            <button
              type="button"
              className="btn btn--small"
              disabled={!allPicked}
              onClick={() => save({ ...st, checked: { ...st.checked, [ex.id]: true } })}
            >
              核对
            </button>
            {!allPicked && <span className="md-muted">四个问题都选了答案后才能核对。</span>}
          </div>
          {checked && (
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">四个问题答对了 {nRight} 个。</p>
              <p>{ex.after}</p>
              {exIdx < EXAMPLES.length - 1 && (
                <button type="button" className="btn btn--small" onClick={() => save({ ...st, ex: EXAMPLES[exIdx + 1].id })}>
                  下一个例子：{EXAMPLES[exIdx + 1].zh}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {st.task === 'purpose' && (
        <div className="fc-panel">
          <p>下面每一种说法，亚里士多德会接受吗？</p>
          <ol className="fc-claims">
            {CLAIMS.map((c, i) => {
              const a = st.claims[i];
              return (
                <li key={i}>
                  <fieldset className="cs-group">
                    <legend>{c.t}</legend>
                    <div className="md-seg">
                      {(
                        [
                          [true, '会接受'],
                          [false, '不会接受'],
                        ] as [boolean, string][]
                      ).map(([v, t]) => (
                        <label key={t} className={'md-seg-opt' + (a === v ? ' is-on' : '')}>
                          <input
                            type="radio"
                            name={`fc-claim-${i}`}
                            checked={a === v}
                            onChange={() => save({ ...st, claims: st.claims.map((x, j) => (j === i ? v : x)) })}
                          />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                    {a !== null && (
                      <p className="fc-fb" aria-live="polite">
                        <b>{a === c.yes ? '✓ ' : '✗ '}</b>
                        {c.fb}
                      </p>
                    )}
                  </fieldset>
                </li>
              );
            })}
          </ol>
          {claimsDone && (
            <div className="md-feedback">
              <p className="md-fb-k">要点：目的因是一种解释，不是一种心理状态。</p>
              <p>
                "X 是为了 Y"的意思是：X 这个过程或结构朝向 Y，并且要靠 Y 来解释。它不要求有谁在想着 Y。自然就像一种在事物内部起作用的技艺，但没有一个工匠在考虑。
              </p>
              <p className="md-muted">
                与现代科学的比较（本章的说明，不是亚里士多德的话）：现代生物学仍然说"心脏是用来泵血的"，但用进化的历史来说明这种功能语言为什么成立；亚里士多德则把功能当作生物形式本身的一部分。两种理解哪一种更好，不完全是一个科学问题。
              </p>
              <button type="button" className="md-disclose" aria-expanded={showGrc} onClick={() => setShowGrc(!showGrc)}>
                {showGrc ? '收起希腊原文' : '看亚里士多德的说法（199a26—30，199b26—28）'}
              </button>
              {showGrc && (
                <>
                  <div className="lw-grc">
                    <p className="pe-src">《物理学》第二卷第 8 章，199a26—30</p>
                    <p className="pe-orig" lang="grc">
                      ὥστʼ εἰ φύσει τε ποιεῖ καὶ ἕνεκά του ἡ χελιδὼν τὴν νεοττιὰν καὶ ὁ ἀράχνης τὸ ἀράχνιον, καὶ τὰ φυτὰ τὰ φύλλα ἕνεκα τῶν καρπῶν καὶ τὰς ῥίζας οὐκ ἄνω ἀλλὰ κάτω τῆς τροφῆς, φανερὸν ὅτι ἔστιν ἡ αἰτία ἡ τοιαύτη ἐν τοῖς φύσει γιγνομένοις καὶ οὖσιν.
                    </p>
                    <p className="pe-zh">
                      本章试译：所以，如果燕子筑巢、蜘蛛结网，既是出于自然，又是为了什么，植物长叶子是为了果实，根不向上而向下长是为了养分，那么显然，在由于自然而生成和存在的东西中，有这样一种原因。
                    </p>
                  </div>
                  <div className="lw-grc">
                    <p className="pe-src">《物理学》第二卷第 8 章，199b26—28</p>
                    <p className="pe-orig" lang="grc">
                      ἄτοπον δὲ τὸ μὴ οἴεσθαι ἕνεκά του γίγνεσθαι, ἐὰν μὴ ἴδωσι τὸ κινοῦν βουλευσάμενον. καίτοι καὶ ἡ τέχνη οὐ βουλεύεται
                    </p>
                    <p className="pe-zh">本章试译：如果因为看不到推动者在考虑，就认为某件事不是为了什么而发生的，那是荒谬的。其实，技艺也不考虑。</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>
      <p className="md-note">
        <b>这个练习的限度。</b>"质料因""形式因""动力因""目的因"是后来的名称，亚里士多德只用描述性的说法。候选答案是本章为了练习而设的，正确答案按本章正文的分析；真实的分析常常没有这么整齐，有些问题（例如房子的形式和目的之间的界线）可以讨论。练习只检查你把一个回答放在了哪个问题之下，不检查四因理论本身是否成立。
      </p>
    </section>
  );
}

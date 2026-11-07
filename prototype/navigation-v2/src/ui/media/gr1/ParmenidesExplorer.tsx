import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import './gr1.css';

// 二 · after the chapter's eight-step reconstruction and its diagram. The
// learner chooses a reading of “ἔστιν”, then accepts or questions each
// premise and watches which conclusions still follow. The steps and their
// wording are the chapter's reconstruction (content/GR1_SAMPLE_DRAFT.md,
// 二 “一步一步重构巴门尼德的论证”), labelled as such; the Greek lines are the
// ones the chapter quotes and has checked. No reading is marked correct and
// nothing is scored.

type Reading = 'exist' | 'pred';
const READINGS: [Reading, string, string][] = [
  ['exist', '"是" = 存在', '"它不是"的意思是"它不存在"：说一个东西"不是"，就是说它什么都不是。'],
  ['pred', '"是" = 是某某', '"它不是"也可以只是"它不是热的""它以前不在这里"，即缺少某种性质或位置，而不是"绝对的无"。'],
];

interface Step {
  n: number;
  kind: 'premise' | 'derived';
  text: string;
  /** Which steps it depends on. A derived step holds when all of them hold. */
  deps?: number[];
  /** Greek line(s) the chapter quotes for this step, with the course's translation. */
  grc?: { ref: string; text: string; zh: string };
  /** What the step amounts to under each reading. */
  note: Record<Reading, string>;
  /** Marked as the place where the reading makes the difference. */
  hinge?: Reading[];
}

const STEPS: Step[] = [
  {
    n: 1,
    kind: 'premise',
    text: '只有两条可以设想的路："它是"，或者"它不是"。',
    grc: {
      ref: 'B2.3—5',
      text: 'ἡ μὲν ὅπως ἔστιν τε καὶ ὡς οὐκ ἔστι μὴ εἶναι, Πειθοῦς ἐστι κέλευθος … ἡ δ᾽ ὡς οὐκ ἔστιν τε καὶ ὡς χρεών ἐστι μὴ εἶναι',
      zh: '一条是"它是"，并且"它不可能不是"，这是说服之路……另一条是"它不是"，并且"它必然不是"。',
    },
    note: {
      exist: '在存在读法下，两条路就是"存在"与"绝对不存在"。',
      pred: '在谓述读法下，"它不是"可以有许多种：不是热的、不在这里……这一步本身仍然可以接受。',
    },
  },
  {
    n: 2,
    kind: 'premise',
    text: '不存在的东西既不能被认识，也不能被说出或被思想。',
    grc: {
      ref: 'B2.7—8；B3',
      text: 'οὔτε γὰρ ἂν γνοίης τό γε μὴ ἐὸν … οὔτε φράσαις· … τὸ γὰρ αὐτὸ νοεῖν ἐστίν τε καὶ εἶναι.',
      zh: '因为你既不能认识不是的东西……也不能把它说出来。……因为思想和存在是同一的。',
    },
    note: {
      exist: '绝对的"无"没有任何可以被思想的内容，这一步看起来很有力。也有人反驳：我们不是能想独角兽吗？',
      pred: '如果"不是的东西"只是指"不是某某的东西"，这一步就显得太强：想"一块不热的石头"并不困难。',
    },
  },
  {
    n: 3,
    kind: 'derived',
    deps: [1, 2],
    text: '所以，"它不是"这条路必须放弃：任何研究都不能以"不存在者"为对象或起点。',
    note: {
      exist: '由第 1、2 步推出。',
      pred: '由第 1、2 步推出；它的力量完全取决于第 2 步怎样理解。',
    },
  },
  {
    n: 4,
    kind: 'premise',
    text: '如果某个东西生成了，那么在它生成之前，它是不存在的。',
    grc: {
      ref: 'B8.20',
      text: 'εἰ γὰρ ἔγεντ᾽, οὐκ ἔστι, οὐδ᾽ εἴ ποτε μέλλει ἔσεσθαι.',
      zh: '因为，如果它生成了，它就（曾经）不是；如果它将来才要存在，它也（现在）不是。',
    },
    note: {
      exist: '在存在读法下，这就是"它以前完全不存在"。',
      pred: '在谓述读法下，这也可以只是"它以前不是这样"，例如一棵树以前不是树，而是种子。',
    },
  },
  {
    n: 5,
    kind: 'premise',
    text: '说某个东西"生成"，就要思想"它不存在"的那个阶段。',
    note: {
      exist: '如果第 4 步的"不存在"是绝对的无，这一步就成立：设想生成，就要设想那个"无"。',
      pred: '关键就在这里。如果"它以前不是"只是"它以前不是这样"，设想生成并不需要思想"绝对的无"，只需要思想"种子还不是树"。所以这一步可能偷换了"不是"的意思。',
    },
    hinge: ['pred'],
  },
  {
    n: 6,
    kind: 'derived',
    deps: [3, 4, 5],
    text: '所以，生成是不能被思想的。',
    note: {
      exist: '由第 3、4、5 步推出。',
      pred: '由第 3、4、5 步推出；如果你在第 5 步看出了歧义，这一步就失去了支持。',
    },
  },
  {
    n: 7,
    kind: 'premise',
    text: '即使它能从无中产生，也没有任何理由说明它为什么在这一刻、而不在另一刻产生，因为"无"之中没有什么可以作出区分。',
    grc: {
      ref: 'B8.9—10',
      text: 'Τί δ᾽ ἄν μιν καὶ χρέος ὦρσεν ὕστερον ἢ πρόσθεν, τοῦ μηδενὸς ἀρξάμενον, φῦν;',
      zh: '而且，如果它从无开始，是什么需要驱使它在较晚而不是较早的时候生长出来呢？',
    },
    note: {
      exist: '这是一条独立的理由：它不依赖"无不可思想"，而依赖"凡事都要有理由"。',
      pred: '这条理由针对的是"从绝对的无中产生"。在谓述读法下，种子长成树是从某种东西开始的，这条理由就不一定适用。',
    },
  },
  {
    n: 8,
    kind: 'derived',
    text: '结论：存在的东西不生成，也不毁灭。',
    note: {
      exist: '结论有两条路线支持：第 6 步，或者第 7 步。',
      pred: '结论有两条路线支持：第 6 步，或者第 7 步。在这种读法下，两条路线都可能比看上去要弱。',
    },
  },
];

const PREMISES = STEPS.filter((s) => s.kind === 'premise').map((s) => s.n);
type Doubt = Record<number, boolean>;
type Saved = { reading: Reading; doubt: Doubt };
const ID = 'parmenides-explorer';

function evaluate(doubt: Doubt) {
  const holds: Record<number, boolean> = {};
  for (const s of STEPS) {
    if (s.kind === 'premise') holds[s.n] = !doubt[s.n];
    else if (s.n === 8) holds[8] = holds[6] || holds[7];
    else holds[s.n] = (s.deps ?? []).every((d) => holds[d]);
  }
  return holds;
}

export default function ParmenidesExplorer() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('GR1', ID, { reading: 'exist', doubt: {} }));
  const [open, setOpen] = useState<number | null>(5);
  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR1', ID, next);
  };
  const holds = evaluate(st.doubt);
  const routes = [holds[6] && '第 6 步（生成不可思想）', holds[7] && '第 7 步（没有理由在此时产生）'].filter(Boolean) as string[];
  const doubted = PREMISES.filter((n) => st.doubt[n]);

  return (
    <section className="md pe" aria-labelledby="pe-title">
      <header className="md-head">
        <p className="md-tag">检查一个论证</p>
        <h3 id="pe-title" className="md-title">
          巴门尼德的论证：哪一步最值得怀疑？
        </h3>
        <p className="md-lede">
          先选一种对"是"（ἔστιν）的读法；再逐一决定接受还是质疑每个前提，看结论还剩下哪些支持。下面的八步是本章根据残篇所作的重构，不是巴门尼德的原文；原文只在注明出处的地方给出。不计分，选择只保存在这台设备上。
        </p>
      </header>

      <fieldset className="cs-group">
        <legend>"它是"指的是什么？</legend>
        <div className="md-seg">
          {READINGS.map(([r, label]) => (
            <label key={r} className={'md-seg-opt' + (st.reading === r ? ' is-on' : '')}>
              <input type="radio" name="pe-reading" checked={st.reading === r} onChange={() => save({ ...st, reading: r })} />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <p className="pe-reading-t">{READINGS.find((x) => x[0] === st.reading)![2]}</p>
      </fieldset>

      <ol className="pe-steps">
        {STEPS.map((s) => {
          const ok = holds[s.n];
          const isOpen = open === s.n;
          const hinge = s.hinge?.includes(st.reading);
          return (
            <li key={s.n} className={'pe-step pe-step--' + s.kind + (ok ? '' : ' is-off') + (hinge ? ' is-hinge' : '')}>
              <div className="pe-row">
                <span className="pe-n" aria-hidden="true">
                  {s.n}
                </span>
                <div className="pe-body">
                  <p className="pe-kind">
                    {s.kind === 'premise' ? '前提' : s.n === 8 ? '结论' : '推出'}
                    {s.deps && <span className="pe-deps"> · 依据第 {s.deps.join('、')} 步</span>}
                    {s.n === 8 && <span className="pe-deps"> · 依据第 6 步或第 7 步</span>}
                    <span className={'pe-state' + (ok ? '' : ' is-off')}>{ok ? (s.kind === 'premise' ? '接受' : '仍然成立') : s.kind === 'premise' ? '质疑' : '失去支持'}</span>
                  </p>
                  <p className="pe-text">{s.text}</p>
                  <div className="pe-actions">
                    {s.kind === 'premise' && (
                      <button
                        type="button"
                        className="btn btn--small"
                        aria-pressed={!!st.doubt[s.n]}
                        onClick={() => save({ ...st, doubt: { ...st.doubt, [s.n]: !st.doubt[s.n] } })}
                      >
                        {st.doubt[s.n] ? '改为接受' : '质疑这一步'}
                      </button>
                    )}
                    <button type="button" className="md-disclose" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : s.n)}>
                      {isOpen ? '收起说明' : s.grc ? '原文与说明' : '说明'}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="pe-more">
                      {s.grc && (
                        <div className="pe-grc">
                          <p className="pe-src">原文 · 巴门尼德残篇 {s.grc.ref}</p>
                          <p className="pe-orig" lang="grc">
                            {s.grc.text}
                          </p>
                          <p className="pe-zh">本章试译：{s.grc.zh}</p>
                        </div>
                      )}
                      <p className="pe-note">
                        {hinge && <b>读法在这里起作用。</b>}
                        {s.note[st.reading]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="md-feedback" aria-live="polite">
        <p className="md-fb-k">
          {holds[8] ? `结论仍然成立，支持它的是：${routes.join('；')}。` : '结论失去了支持：第 6 步和第 7 步都不再成立。'}
        </p>
        {doubted.length === 0 ? (
          <p className="md-muted">你接受了所有前提。试着质疑一个你觉得最可疑的前提，看看结论会怎样。提示：先读第 5 步的说明，再切换上面的读法。</p>
        ) : (
          <p>
            你质疑了第 {doubted.join('、')} 步。
            {holds[8] && !holds[6] && '注意：即使"生成不可思想"这条路线断了，第 7 步仍然独立地支持结论。要推翻结论，两条路线都要处理。'}
            {holds[8] && holds[6] && '这些质疑没有触及结论所依赖的路线。'}
            {!holds[8] && '这是巴门尼德的后继者们实际走过的路：原子论者否认"不存在者不可思想"，柏拉图后来区分了"不是"的不同意思。'}
          </p>
        )}
        <button type="button" className="md-reset" onClick={() => save({ reading: st.reading, doubt: {} })}>
          全部改为接受
        </button>
      </div>

      <p className="md-note">
        <b>这个练习的限度。</b>巴门尼德写的是一首诗，不是编了号的前提和结论；步骤的划分、依赖关系和两种读法的说明都是本章的整理。学者对"是"的读法远不止这两种（见正文和注 21）。这里不评判哪一种读法正确，只显示读法怎样影响论证能否成立。
      </p>
    </section>
  );
}

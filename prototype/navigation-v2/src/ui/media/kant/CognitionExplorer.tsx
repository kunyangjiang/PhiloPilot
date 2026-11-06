import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';

// A stepped picture of 二 · 第四步 to 第七步. It shows conditions of
// cognition, not stages in time and not a process in the brain; the caption
// says so at every step. The left box stays a dashed question mark: what
// affects us is the thing-in-itself problem of section 三, and nothing is
// drawn there. The last step lets the learner take one side away, to see
// "思维无内容是空的，直观无概念是盲的". Steps are buttons; transitions are
// short fades and are removed under reduced motion.

const STEPS = [
  {
    k: '总览',
    t: '人的认识有两个来源：感性（接受的能力）和知性（思维的能力）。下面几步只是讲解的顺序，一次只照亮一部分。',
  },
  {
    k: '感性：空间与时间',
    t: '对象刺激我们，我们由此获得直观。空间（外感官）和时间（内感官）是一切直观的形式，不是从经验里抽象出来的概念。图中的点代表直观中的“杂多”。',
  },
  {
    k: '知性：范畴',
    t: '知性运用概念。其中有一类不来自经验、由知性本身带来的概念，康德称为范畴，共十二个，分为量、质、关系、模态四组。',
  },
  {
    k: '统觉与综合',
    t: '“我思”必须能够伴随我的一切表象。这种统一要靠把杂多结合起来的活动，即综合；知性结合的基本方式，就是范畴所表达的方式。图中的连线代表结合。',
  },
  {
    k: '经验：被认识的对象',
    t: '直观与概念结合，才有一个被经验到的对象。按先验演绎的结论，范畴对一切可能经验的对象必然有效，但也只对它们有效。',
  },
];

type Cut = 'none' | 'concept' | 'intuition';
const CUTS: [Cut, string][] = [
  ['none', '两者都有'],
  ['concept', '去掉概念'],
  ['intuition', '去掉直观'],
];
const CUT_TEXT: Record<Cut, string> = {
  none: '直观给出内容，概念把它结合成一个对象：知识只有在两者结合时才能产生。',
  concept: '直观无概念是盲的：杂多仍在，却没有被结合成“一个对象”。按康德的看法，这比“认不出来”更严重：根本不会有被经验到的对象。',
  intuition: '思维无内容是空的：范畴还能被思维，却没有任何直观能告诉我们它用在什么上。第三节会说明，传统形而上学的许多推理就是这样“空转”的。',
};

// Manifold points inside the sensibility frame, and the edges that "synthesis"
// draws between some of them.
const DOTS: [number, number][] = [
  [178, 70],
  [232, 58],
  [300, 76],
  [362, 62],
  [420, 84],
  [196, 136],
  [258, 118],
  [330, 140],
  [396, 128],
  [440, 160],
  [214, 168],
  [300, 160],
];
const EDGES: [number, number][] = [
  [1, 2],
  [2, 3],
  [1, 6],
  [3, 8],
  [6, 7],
  [7, 8],
  [6, 11],
  [8, 11],
];

const ID = 'cognition-explorer';

export default function CognitionExplorer() {
  const [step, setStep] = useState(() => Math.min(STEPS.length - 1, getMedia<number>('EA4', ID, 0)));
  const [cut, setCut] = useState<Cut>('none');
  const go = (n: number) => {
    setStep(n);
    setMedia('EA4', ID, n);
    if (n !== STEPS.length - 1) setCut('none');
  };
  const last = step === STEPS.length - 1;
  const on = (from: number) => step >= from || step === 0;
  const hot = (n: number) => step === n;
  const showDots = step >= 1 && !(last && cut === 'intuition');
  const showEdges = step >= 3 && !(last && cut !== 'none');
  const showObject = last && cut === 'none';
  const conceptOff = last && cut === 'concept';

  return (
    <section className="md ce" aria-labelledby="ce-title">
      <header className="md-head">
        <p className="md-tag">逐步图解</p>
        <h3 id="ce-title" className="md-title">
          感性与知性：认识的条件
        </h3>
        <p className="md-lede">逐步照亮正文那张流程图的各个环节。这是本章的教学示意，不是康德画的图。</p>
      </header>

      <figure className="ce-fig">
        <svg className="ce-svg" viewBox="0 0 480 320" role="img" aria-labelledby="ce-svg-t">
          <title id="ce-svg-t">{`第 ${step + 1} 步：${STEPS[step].k}`}</title>
          {/* ? — what affects us: not drawn */}
          <g className={'ce-part' + (on(1) ? ' is-on' : '') + (hot(1) ? ' is-hot' : '')}>
            <rect className="ce-unknown" x="8" y="40" width="96" height="110" />
            <text className="ce-q" x="56" y="104" textAnchor="middle">
              ？
            </text>
            <text className="ce-small" x="56" y="138" textAnchor="middle">
              见第三节
            </text>
            <path className="ce-dash-arrow" d="M106 95 H140" />
            <path className="ce-head" d="M140 95 l-8 -5 v10 z" />
          </g>

          {/* Sensibility: the forms of space and time */}
          <g className={'ce-part' + (on(1) ? ' is-on' : '') + (hot(1) ? ' is-hot' : '')}>
            <rect className="ce-frame" x="146" y="22" width="326" height="176" />
            <g className="ce-gridlines">
              {[200, 254, 308, 362, 416].map((x) => (
                <line key={x} x1={x} y1="44" x2={x} y2="196" />
              ))}
              {[80, 120, 160].map((y) => (
                <line key={y} x1="148" y1={y} x2="470" y2={y} />
              ))}
            </g>
            <text className="ce-label" x="156" y="42">
              感性 · 空间与时间
            </text>
          </g>

          {/* Manifold */}
          <g className={'ce-layer' + (showDots ? ' is-on' : '')}>
            {DOTS.map(([x, y], i) => (
              <circle key={i} className="ce-dot" cx={x} cy={y} r="5" />
            ))}
          </g>

          {/* Synthesis */}
          <g className={'ce-layer' + (showEdges ? ' is-on' : '')}>
            {EDGES.map(([a, b], i) => (
              <line key={i} className="ce-edge" x1={DOTS[a][0]} y1={DOTS[a][1]} x2={DOTS[b][0]} y2={DOTS[b][1]} />
            ))}
          </g>
          <g className={'ce-layer' + (showObject ? ' is-on' : '')}>
            <rect className="ce-object" x="220" y="46" width="200" height="126" />
            <text className="ce-obj-t" x="320" y="190" textAnchor="middle">
              一个被经验到的对象
            </text>
          </g>
          <g className={'ce-layer' + (last && cut === 'concept' ? ' is-on' : '')}>
            <text className="ce-verdict" x="309" y="186" textAnchor="middle">
              盲
            </text>
          </g>
          <g className={'ce-layer' + (last && cut === 'intuition' ? ' is-on' : '')}>
            <text className="ce-verdict" x="309" y="124" textAnchor="middle">
              空
            </text>
          </g>

          {/* Understanding */}
          <g className={'ce-part' + (on(2) ? ' is-on' : '') + (hot(2) ? ' is-hot' : '') + (conceptOff ? ' is-off' : '')}>
            <rect className="ce-box" x="146" y="226" width="156" height="86" />
            <text className="ce-label" x="158" y="252">
              知性 · 范畴
            </text>
            <text className="ce-small" x="158" y="280">
              量 质 关系 模态
            </text>
            <text className="ce-small" x="158" y="302">
              （共十二个）
            </text>
            <path className="ce-cond" d="M224 224 V202" />
          </g>

          {/* Apperception */}
          <g className={'ce-part' + (on(3) ? ' is-on' : '') + (hot(3) ? ' is-hot' : '')}>
            <rect className="ce-box" x="316" y="226" width="156" height="86" />
            <text className="ce-label ce-label--long" x="328" y="252">
              统觉 · “我思”
            </text>
            <text className="ce-small" x="328" y="280">
              必须能伴随
            </text>
            <text className="ce-small" x="328" y="302">
              我的一切表象
            </text>
            <path className="ce-cond" d="M394 224 V202" />
          </g>
          <text className="ce-small ce-cond-t" x="56" y="270" textAnchor="middle">
            竖线：条件
          </text>
          <text className="ce-small ce-cond-t" x="56" y="292" textAnchor="middle">
            不是时间先后
          </text>
        </svg>
      </figure>

      <div className="ce-text" aria-live="polite">
        <p className="ox-step-k">
          第 {step + 1} / {STEPS.length} 步 · {STEPS[step].k}
        </p>
        <p>{STEPS[step].t}</p>
        {last && (
          <fieldset className="cs-group ce-cut">
            <legend>动手对照：去掉一边会怎样？</legend>
            <div className="md-seg">
              {CUTS.map(([v, label]) => (
                <label key={v} className={'md-seg-opt' + (cut === v ? ' is-on' : '')}>
                  <input type="radio" name="ce-cut" checked={cut === v} onChange={() => setCut(v)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            <p className="ce-cut-t">{CUT_TEXT[cut]}</p>
          </fieldset>
        )}
      </div>

      <div className="ox-steps">
        <button type="button" className="md-step" onClick={() => go(step - 1)} disabled={step === 0} aria-label="上一步">
          ‹
        </button>
        <ol aria-label="步骤">
          {STEPS.map((x, i) => (
            <li key={i}>
              <button
                type="button"
                className={'ox-dot' + (i === step ? ' is-cur' : i < step ? ' is-past' : '')}
                aria-current={i === step ? 'step' : undefined}
                aria-label={`第 ${i + 1} 步：${x.k}`}
                onClick={() => go(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="md-step" onClick={() => go(step + 1)} disabled={last} aria-label="下一步">
          ›
        </button>
      </div>

      <p className="ox-caution">
        <b>读图提醒。</b>
        步骤的先后只是讲解顺序。康德说的是认识的<b>条件</b>，不是先收到一堆直观、过一会儿再拿去加工，也不是大脑里的神经过程。把“综合”画成连线只是为了醒目：综合究竟由想象力还是知性完成，两版《纯粹理性批判》的说法有所不同。正文“摄像机”比喻的限度在这里同样适用：没有概念的综合，就没有被认出的对象。
      </p>
    </section>
  );
}

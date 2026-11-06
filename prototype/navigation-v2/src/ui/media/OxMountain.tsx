import { useState, type KeyboardEvent } from 'react';
import { getMedia, setMedia } from '../../state/store';

// 牛山之喻 (《孟子》6A8) in six steps. Classical lines and their modern
// renderings are taken from this course's own quotation and 大意 (三 · 牛山之喻);
// the “看什么” lines and the closing question are teaching aids. The picture is
// a schematic illustration, not a historical image.

interface Step {
  t: string;
  /** Classical line as quoted in the course; empty when the course elides it. */
  q: string;
  gloss: string;
  look: string;
  show: Layer[];
}
type Layer = 'trees' | 'axe' | 'stumps' | 'rain' | 'sprouts' | 'sheep' | 'observer';

const STEPS: Step[] = [
  { t: '原本茂盛', q: '牛山之木嘗美矣。', gloss: '牛山上的树木曾经很茂盛。', look: '先记住起点：这座山原本是能长树的。', show: ['trees'] },
  {
    t: '斧斤伐之',
    q: '',
    gloss: '因为它在大都市的郊外，人们天天拿斧头去砍，还能茂盛吗？',
    look: '伤害来自外面，而且一天天反复发生。',
    show: ['axe', 'stumps'],
  },
  {
    t: '萌蘗之生',
    q: '是其日夜之所息，雨露之所潤，非無萌蘗之生焉，',
    gloss: '山日日夜夜仍在生长，雨露滋润着它，并不是没有新芽长出来，',
    look: '即使被砍过，山仍在萌发新芽。在孟子看来，生长的趋势并没有消失。',
    show: ['stumps', 'rain', 'sprouts'],
  },
  {
    t: '牛羊又從而牧之',
    q: '牛羊又從而牧之，',
    gloss: '可牛羊又跟着来放牧，',
    look: '新芽刚长出来就又被吃掉。光秃不是一次造成的，而是伤害不断重复的结果。',
    show: ['stumps', 'sprouts', 'sheep'],
  },
  { t: '濯濯', q: '是以若彼濯濯也。', gloss: '所以变得光秃秃的。', look: '现在看到的，确实是一座光秃秃的山。', show: ['stumps'] },
  {
    t: '旁观者的结论',
    q: '人見其濯濯也，以為未嘗有材焉，此豈山之性也哉？',
    gloss: '人们看见它光秃秃的样子，就以为它从来没有长过树木，这难道是山的本性吗？',
    look: '旁观者从眼前的样子得出了一个结论。这个推论对吗？请在下面判断。',
    show: ['stumps', 'observer'],
  },
];

const OPTIONS = [
  {
    k: 'a',
    label: '他看错了：山上其实还有大树。',
    fb: '不是。第 5 步里山确实光秃秃的，旁观者的观察没有错。问题不在“看到了什么”，而在他从看到的东西推出了什么。',
  },
  {
    k: 'b',
    label: '他把受损后的样子当成了山的本性：从“现在光秃”推出“本来就不长树”。',
    fb: '这正是孟子要指出的推论错误（见下文本章整理的论证第 2—4 步）：现状可能是反复伤害的结果，不能直接证明本性。但请注意，这只说明旁观者的推论不成立，并没有证明山（或人）的本性就是长树（或善）。',
  },
  {
    k: 'c',
    label: '他没有错：山现在光秃，就证明它的本性是不长树。',
    fb: '这正是孟子用“此豈山之性也哉”否认的结论。你如果坚持这一点，就要说明：为什么前面几步里的砍伐、放牧和新芽，都与判断山的本性无关？',
  },
];

const ID = 'ox-mountain';
// Ridge height at each tree position (on the hill curve below).
const Y: Record<number, number> = { 150: 121, 190: 103, 230: 89, 270: 81, 310: 79, 350: 80, 390: 85, 430: 98, 465: 113 };
const XS = Object.keys(Y).map(Number);

function Scene({ show }: { show: Layer[] }) {
  const on = (l: Layer) => 'ox-layer' + (show.includes(l) ? ' is-on' : '');
  return (
    <svg className="ox-svg" viewBox="0 0 640 206" role="img" aria-hidden="true">
      <path className="ox-hill" d="M0 198 L80 160 Q160 112 230 88 Q300 70 380 82 Q450 96 520 150 L640 198 Z" />
      <line className="ox-ground" x1="0" y1="198" x2="640" y2="198" />
      <g className={on('rain')}>
        {[150, 210, 270, 330, 390, 450].map((x, i) => (
          <line key={x} className="ox-rain" x1={x} y1={18 + (i % 2) * 12} x2={x - 6} y2={42 + (i % 2) * 12} />
        ))}
      </g>
      <g className={on('trees')}>
        {XS.map((x) => (
          <g key={x}>
            <line className="ox-trunk" x1={x} y1={Y[x]} x2={x} y2={Y[x] - 14} />
            <path className="ox-crown" d={`M${x - 13} ${Y[x] - 12} L${x} ${Y[x] - 52} L${x + 13} ${Y[x] - 12} Z`} />
          </g>
        ))}
      </g>
      <g className={on('stumps')}>
        {XS.map((x) => (
          <rect key={x} className="ox-stump" x={x - 4} y={Y[x] - 8} width="8" height="8" />
        ))}
      </g>
      <g className={on('sprouts')}>
        {XS.map((x) => (
          <path key={x} className="ox-sprout" d={`M${x + 9} ${Y[x]} q-1 -10 -8 -14 q8 0 8 9 q1 -9 9 -9 q-7 4 -9 14`} />
        ))}
      </g>
      <g className={on('axe')}>
        <line className="ox-axe-h" x1="86" y1="150" x2="126" y2="100" />
        <path className="ox-axe-b" d="M112 104 L130 90 L140 108 L124 118 Z" />
      </g>
      <g className={on('sheep')}>
        {[
          [205, 118],
          [300, 96],
          [410, 108],
        ].map(([x, y]) => (
          <g key={x}>
            <ellipse className="ox-sheep" cx={x} cy={y - 8} rx="13" ry="8" />
            <circle className="ox-sheep-h" cx={x + 14} cy={y - 11} r="4.5" />
          </g>
        ))}
      </g>
      <g className={on('observer')}>
        <circle className="ox-person" cx="604" cy="150" r="7" />
        <line className="ox-person-l" x1="604" y1="157" x2="604" y2="178" />
        <line className="ox-person-l" x1="604" y1="178" x2="596" y2="196" />
        <line className="ox-person-l" x1="604" y1="178" x2="612" y2="196" />
        <rect className="ox-bubble" x="506" y="96" width="128" height="34" />
        <text className="ox-bubble-t" x="570" y="118" textAnchor="middle">
          未嘗有材焉
        </text>
      </g>
    </svg>
  );
}

export default function OxMountain() {
  const [step, setStepRaw] = useState(() => Math.min(STEPS.length - 1, Math.max(0, getMedia<{ step?: number }>('CN1', ID, {}).step ?? 0)));
  const [pick, setPickRaw] = useState<string | null>(() => getMedia<{ pick?: string | null }>('CN1', ID, {}).pick ?? null);
  const save = (s: number, p: string | null) => setMedia('CN1', ID, { step: s, pick: p });
  const setStep = (s: number) => {
    const n = Math.min(STEPS.length - 1, Math.max(0, s));
    setStepRaw(n);
    save(n, pick);
  };
  const setPick = (p: string) => {
    setPickRaw(p);
    save(step, p);
  };
  const s = STEPS[step];
  const last = step === STEPS.length - 1;
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') setStep(step + 1);
    else if (e.key === 'ArrowLeft') setStep(step - 1);
    else return;
    e.preventDefault();
  };
  const chosen = OPTIONS.find((o) => o.k === pick);

  return (
    <section className="md ox" aria-labelledby="ox-title">
      <header className="md-head">
        <p className="md-tag">分步阅读</p>
        <h3 id="ox-title" className="md-title">
          牛山之喻，一步一步看
        </h3>
        <p className="md-lede">把上面引的 6A8 拆成六步。每一步对照原文和大意，看清山是怎样变得光秃的，再判断旁观者的推论。</p>
      </header>

      <div className="ox-stage" role="group" aria-roledescription="分步图示" aria-label={`第 ${step + 1} 步，共 ${STEPS.length} 步：${s.t}`} tabIndex={0} onKeyDown={onKey}>
        <figure className="ox-fig">
          <Scene show={s.show} />
          <figcaption className="md-note">
            教学示意图，不是历史图像。<span className="md-kbd">图示获得焦点后，左右方向键也可以切换步骤。</span>
          </figcaption>
        </figure>
        <div className="ox-text" aria-live="polite">
          <p className="ox-step-k">
            第 {step + 1} 步 / 共 {STEPS.length} 步 · {s.t}
          </p>
          {s.q ? (
            <p className="ox-q">{s.q}</p>
          ) : (
            <p className="ox-q ox-q--elided">（这一句在本章的节引中以“……”省略，下面是本章的白话大意。）</p>
          )}
          <p className="ox-gloss">{s.gloss}</p>
          <p className="ox-look">
            <b>看什么：</b>
            {s.look}
          </p>
        </div>
      </div>

      <nav className="ox-steps" aria-label="选择步骤">
        <button type="button" className="md-step" onClick={() => setStep(step - 1)} disabled={step === 0} aria-label="上一步">
          ‹
        </button>
        <ol>
          {STEPS.map((x, i) => (
            <li key={i}>
              <button type="button" className={'ox-dot' + (i === step ? ' is-cur' : '') + (i < step ? ' is-past' : '')} aria-current={i === step ? 'step' : undefined} aria-label={`第 ${i + 1} 步：${x.t}`} onClick={() => setStep(i)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="md-step" onClick={() => setStep(step + 1)} disabled={last} aria-label="下一步">
          ›
        </button>
      </nav>

      {last && (
        <div className="md-feedback">
          <fieldset className="ox-quiz">
            <legend className="md-fb-k">旁观者的推论错在哪里？</legend>
            {OPTIONS.map((o) => (
              <label key={o.k} className={'ox-opt' + (pick === o.k ? ' is-on' : '')}>
                <input type="radio" name="ox-quiz" value={o.k} checked={pick === o.k} onChange={() => setPick(o.k)} />
                <span>{o.label}</span>
              </label>
            ))}
          </fieldset>
          <div aria-live="polite">{chosen && <p className="ox-fb">{chosen.fb}</p>}</div>
          {chosen && (
            <div className="ox-turn">
              <p className="md-fb-k">从山到人</p>
              <p className="ox-q">雖存乎人者，豈無仁義之心哉？其所以放其良心者，亦猶斧斤之於木也。</p>
              <p className="ox-q">故茍得其養，無物不長；茍失其養，無物不消。</p>
              <p className="ox-caution">
                <b>注意类比的限度。</b>本章指出：“这个论证的力量全在类比上。”孟子默认人的善心像山上的嫩芽一样，自己有恢复和生长的趋势。图里的新芽是比喻，不是证据；养护也不保证一定恢复。下文会讨论这个类比是否会变成循环论证，活动 B 请你亲自检验它。
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

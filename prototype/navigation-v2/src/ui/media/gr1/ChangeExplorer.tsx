import { useEffect, useRef, useState } from 'react';
import { getMedia, isReduced, setMedia } from '../../../state/store';
import './gr1.css';

// 三 · after the table “三种回答，放在一起看”. Four ways of answering the
// question left by 二: how can something change and still be itself? Each is
// a schematic picture drawn for this course (not an ancient image and not a
// physical simulation), moved by a time slider. The learner says where each
// view places identity; feedback is the chapter's reading, never “correct”.
// The play button is hidden under reduced motion; the slider always works.

type Mode = 'river' | 'parmenides' | 'roots' | 'atoms';
type Where = 'parts' | 'pattern' | 'whole';

const MODES: { id: Mode; label: string; who: string; reading: Where; text: string; limit: string }[] = [
  {
    id: 'river',
    label: '河流',
    who: '赫拉克利特（按 B12 的读法）',
    reading: 'pattern',
    text: '水不断流过，几乎每一滴都换掉了，河道和水流的样式却保持不变。按照第二部分对 B12 的读法，河之所以仍是同一条河，正是因为水在流动；同一性在于一个持续的过程或结构。',
    limit: '图中的"水滴"是本课画的，赫拉克利特没有"粒子"的概念；而 B12 只是诸多残篇之一，"同一靠变化维持"是一种读法，不是他学说的全部（见注 16 中的不同读法）。',
  },
  {
    id: 'parmenides',
    label: '存在者',
    who: '巴门尼德（真理之路）',
    reading: 'whole',
    text: '真正存在的东西是一个完整、不动、不生不灭的整体，外面那一层不断变化的东西，是凡人的感官和"意见"所见的样子。按照这种看法，变化不是实在的，同一性也就不成问题。',
    limit: '"意见之路"在巴门尼德诗中究竟有什么地位，学者们争论不休（注 23）；把它画成一层"外壳"只是为了对照，图中的圆形也只是示意，不是巴门尼德的宇宙图景。',
  },
  {
    id: 'roots',
    label: '混合',
    who: '恩培多克勒（四根与爱、恨）',
    reading: 'parts',
    text: '火、气、水、土四根本身永不生灭；爱使它们混合，恨使它们分离。我们所说的"出生"和"死亡"，只是四根的混合与分离。同一性落在不变的组成部分上。',
    limit: '四种颜色只是为了区分四根；恩培多克勒的宇宙循环比图中复杂得多，而且他把四根称为神（B6）。阿那克萨戈拉的"一切在一切之中"也是一种混合论，但没有画进这张图。',
  },
  {
    id: 'atoms',
    label: '原子',
    who: '留基伯与德谟克利特',
    reading: 'parts',
    text: '原子本身不生不灭、不可分、不变；虚空使它们能够运动。原子结合、分离、改变排列和方向，就有了生成、毁灭和性质的变化。同一性落在原子上，变化落在它们的排列上。',
    limit: '原子画成没有颜色的灰色轮廓，因为按德谟克利特的说法，颜色是"按约定"的（B9）。图中的形状是示意，不是古代原子论者描述过的具体形状；这也不是现代意义上的原子模型（见正文"古代原子论不是现代原子论"）。',
  },
];

const WHERE: [Where, string][] = [
  ['parts', '在不变的组成部分上'],
  ['pattern', '在持续的样式或过程上'],
  ['whole', '在唯一不变的整体上；变化不是实在的'],
];
const WHERE_NAME = Object.fromEntries(WHERE) as Record<Where, string>;

const W = 480;
const H = 220;

// Deterministic pseudo-random placement so the picture is the same on every visit.
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function River({ t }: { t: number }) {
  // Twenty-four drops flow left to right; each new lap counts as new water.
  const drops = Array.from({ length: 24 }, (_, i) => {
    const base = rnd(i, 1) * W;
    const x = (base + t * 9.6) % (W + 20);
    const y = 92 + rnd(i, 2) * 46 + Math.sin((x / W) * Math.PI * 2) * 6;
    const lap = Math.floor((base + t * 9.6) / (W + 20));
    return { x: x - 10, y, fresh: lap > 0 };
  });
  const replaced = Math.round((drops.filter((d) => d.fresh).length / drops.length) * 100);
  return (
    <>
      <path className="ce-bank" d={`M0 80 C120 66 240 94 ${W} 76`} />
      <path className="ce-bank" d={`M0 152 C120 140 240 166 ${W} 148`} />
      {drops.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={5} className={'ce-drop' + (d.fresh ? ' is-new' : '')} />
      ))}
      <text x={12} y={30} className="ce-lbl">
        河道（不变）
      </text>
      <text x={12} y={200} className="ce-lbl">
        已经换过的水：约 {replaced}%
      </text>
    </>
  );
}

function Being({ t, opinion }: { t: number; opinion: boolean }) {
  const shapes = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 + t * 0.05;
    const r = 92 + Math.sin(t * 0.12 + i) * 10;
    return { x: W / 2 + Math.cos(a) * r * 1.6, y: H / 2 + Math.sin(a) * r * 0.75, s: 6 + ((i + Math.floor(t / 12)) % 3) * 4, k: (i + Math.floor(t / 10)) % 3 };
  });
  return (
    <>
      {opinion &&
        shapes.map((s, i) =>
          s.k === 0 ? (
            <circle key={i} cx={s.x} cy={s.y} r={s.s} className="ce-op" />
          ) : s.k === 1 ? (
            <rect key={i} x={s.x - s.s} y={s.y - s.s} width={s.s * 2} height={s.s * 2} className="ce-op" />
          ) : (
            <path key={i} d={`M${s.x} ${s.y - s.s} L${s.x + s.s} ${s.y + s.s} L${s.x - s.s} ${s.y + s.s} Z`} className="ce-op" />
          ),
        )}
      <circle cx={W / 2} cy={H / 2} r={56} className="ce-being" />
      <text x={W / 2} y={H / 2 + 5} textAnchor="middle" className="ce-lbl ce-lbl--inv">
        存在者（不变）
      </text>
      {opinion && (
        <text x={12} y={24} className="ce-lbl">
          外层：凡人"意见"中的变化
        </text>
      )}
    </>
  );
}

const ROOT_NAMES = ['火', '气', '水', '土'];
function Roots({ t }: { t: number }) {
  // t = 0: separated under Strife; t = 100: mixed under Love.
  const k = t / 100;
  const parts = Array.from({ length: 32 }, (_, i) => {
    const root = i % 4;
    const cx = 70 + root * 113;
    const sx = cx + (rnd(i, 3) - 0.5) * 70;
    const sy = 110 + (rnd(i, 4) - 0.5) * 90;
    const a = rnd(i, 5) * Math.PI * 2;
    const r = Math.sqrt(rnd(i, 6)) * 78;
    const mx = W / 2 + Math.cos(a) * r;
    const my = 110 + Math.sin(a) * r * 0.9;
    return { x: lerp(sx, mx, k), y: lerp(sy, my, k), root };
  });
  return (
    <>
      {parts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={6} className={'ce-root ce-root--' + p.root} />
      ))}
      {k < 0.35 &&
        ROOT_NAMES.map((n, i) => (
          <text key={n} x={70 + i * 113} y={196} textAnchor="middle" className="ce-lbl">
            {n}
          </text>
        ))}
      <text x={12} y={24} className="ce-lbl">
        {k < 0.5 ? '恨占上风：四根分离' : '爱占上风：四根混合'}（四根本身不变）
      </text>
    </>
  );
}

// Three atom shapes arranged first as a row, then as a ring: same atoms, new arrangement.
const ATOMS = Array.from({ length: 12 }, (_, i) => i);
function Atoms({ t }: { t: number }) {
  const k = t / 100;
  return (
    <>
      {ATOMS.map((i) => {
        const ax = 50 + i * 35;
        const ay = 110;
        const a = (i / ATOMS.length) * Math.PI * 2;
        const bx = W / 2 + Math.cos(a) * 140;
        const by = 112 + Math.sin(a) * 72;
        const x = lerp(ax, bx, k);
        const y = lerp(ay, by, k);
        const rot = lerp(0, i % 2 ? 90 : 0, k);
        const shape = i % 3;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`} className="ce-atom">
            {shape === 0 && <path d="M-9 8 L0 -9 L9 8 Z" />}
            {shape === 1 && <rect x={-8} y={-8} width={16} height={16} />}
            {shape === 2 && <path d="M-9 -8 L9 -8 L9 0 L0 0 L0 8 L-9 8 Z" />}
          </g>
        );
      })}
      <text x={12} y={24} className="ce-lbl">
        同样的十二个原子，在虚空中重新排列和转向
      </text>
    </>
  );
}

const ID = 'change-explorer';
type Saved = { mode: Mode; picks: Partial<Record<Mode, Where>> };

export default function ChangeExplorer() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('GR1', ID, { mode: 'river', picks: {} }));
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [opinion, setOpinion] = useState(true);
  const reduced = isReduced();
  const raf = useRef(0);
  const mode = MODES.find((m) => m.id === st.mode) ?? MODES[0];
  const pick = st.picks[mode.id];

  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR1', ID, next);
  };

  useEffect(() => {
    if (!playing || reduced) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((x) => Math.min(100, x + dt * 12));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, reduced]);
  useEffect(() => {
    if (playing && t >= 100) setPlaying(false);
  }, [playing, t]);

  const goMode = (m: Mode) => {
    setPlaying(false);
    setT(0);
    save({ ...st, mode: m });
  };

  return (
    <section className="md ce2" aria-labelledby="ce2-title">
      <header className="md-head">
        <p className="md-tag">比较四种说法</p>
        <h3 id="ce2-title" className="md-title">
          变化之中，什么保持不变？
        </h3>
        <p className="md-lede">
          选一种说法，拖动时间看图怎样变化；然后判断：在这种说法里，一个东西的"同一"落在哪里？再对照本章的读法。图是本课画的示意，不是古代的图像，也不是物理模拟。不计分。
        </p>
      </header>

      <div className="md-seg" role="group" aria-label="选择一种说法">
        {MODES.map((m) => (
          <label key={m.id} className={'md-seg-opt' + (m.id === mode.id ? ' is-on' : '')}>
            <input type="radio" name="ce2-mode" checked={m.id === mode.id} onChange={() => goMode(m.id)} />
            <span>{m.label}</span>
          </label>
        ))}
      </div>
      <p className="ce2-who">{mode.who}</p>

      <figure className="ce2-fig">
        <svg viewBox={`0 0 ${W} ${H}`} className="ce2-svg" role="img" aria-label={`${mode.who}的示意图，时间 ${Math.round(t)}%`}>
          {mode.id === 'river' && <River t={t} />}
          {mode.id === 'parmenides' && <Being t={t} opinion={opinion} />}
          {mode.id === 'roots' && <Roots t={t} />}
          {mode.id === 'atoms' && <Atoms t={t} />}
        </svg>
        <figcaption className="ce2-ctl">
          <label className="ce2-slider">
            <span>时间</span>
            <input type="range" min={0} max={100} step={1} value={Math.round(t)} onChange={(e) => (setPlaying(false), setT(Number(e.target.value)))} />
          </label>
          {!reduced && (
            <button
              type="button"
              className="btn btn--small"
              onClick={() => {
                if (t >= 100) setT(0);
                setPlaying(!playing);
              }}
            >
              {playing ? '暂停' : '播放'}
            </button>
          )}
          {mode.id === 'parmenides' && (
            <button type="button" className="md-disclose" aria-pressed={opinion} onClick={() => setOpinion(!opinion)}>
              {opinion ? '隐藏"意见"层' : '显示"意见"层'}
            </button>
          )}
        </figcaption>
      </figure>

      <fieldset className="cs-group">
        <legend>在这种说法里，"同一"落在哪里？</legend>
        <div className="md-seg gr-col">
          {WHERE.map(([w, label]) => (
            <label key={w} className={'md-seg-opt' + (pick === w ? ' is-on' : '')}>
              <input type="radio" name={'ce2-w-' + mode.id} checked={pick === w} onChange={() => save({ ...st, picks: { ...st.picks, [mode.id]: w } })} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="md-feedback" aria-live="polite">
        {!pick ? (
          <p className="md-muted">作出判断以后，可以对照本章的读法。</p>
        ) : (
          <>
            <p className="md-fb-k">
              本章的读法：{WHERE_NAME[mode.reading]}
              {pick === mode.reading ? '（与你的判断一致）' : ''}
            </p>
            <p>{mode.text}</p>
            {pick !== mode.reading && (
              <p className="md-muted">
                你的判断是"{WHERE_NAME[pick]}"。这不一定是误解：例如原子的排列也可以看作一种"样式"。请想一想，在这种说法里，什么东西被说成是真正存在、不生不灭的。
              </p>
            )}
            <p className="md-note">
              <b>这张图的限度。</b>
              {mode.limit}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

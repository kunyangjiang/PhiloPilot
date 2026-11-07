import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import '../gr1/gr1.css';
import './gr2.css';

// 五 · after the chapter's account of the Divided Line (509d—511e) and the
// "equal middle segments" puzzle. The learner opens each of the four
// segments (its objects, its condition, how it works, what it is not), sees
// the image/original relations and the opposite directions of mathematics and
// dialectic, and places four examples. The line is drawn with an
// illustrative ratio (509d says only that the cuts are unequal); the two
// middle segments come out equal, as the chapter notes. Greek is the
// chapter's checked quotation; Chinese is the chapter's wording
// (content/GR2_SAMPLE_DRAFT.md, 五).

type Seg = 'noesis' | 'dianoia' | 'pistis' | 'eikasia';
const SEGS: { id: Seg; name: string; grc: string; obj: string; ref: string; how: string; not: string }[] = [
  {
    id: 'noesis',
    name: '理智',
    grc: 'νόησις',
    obj: '理型，最终是善（"无须假设的起点"）',
    ref: '510b、511b—c',
    how: '从假设出发，把假设当作"跳板"往上追问，直到无须假设的起点；然后再下来。只用理型本身、通过理型本身进行，不借助影像。这就是辩证法。',
    not: '不是"更高级的数学"，也不是神秘的直觉：它和数学的区别在于对待假设的方向。',
  },
  {
    id: 'dianoia',
    name: '思想',
    grc: 'διάνοια',
    obj: '数学对象（借助图形，从假设出发）',
    ref: '510b—511a',
    how: '几何学家使用画出来的图形，但思考的是"正方形本身"；他们从假设（奇数和偶数、各种图形、三种角）出发，不对假设作说明，一直往下推到结论。',
    not: '不是"对可见事物的更仔细的观察"：图形只是被当作影像来用，研究的对象是可思的。',
  },
  {
    id: 'pistis',
    name: '信念',
    grc: 'πίστις',
    obj: '可见的事物：动物、植物、人造物',
    ref: '510a',
    how: '对可见事物的通常信赖：把看到的树、马、器具当作它们本来的样子。',
    not: '不是现代知识论中泛指一切相信的"信念"（belief）。',
  },
  {
    id: 'eikasia',
    name: '想象',
    grc: 'εἰκασία',
    obj: '影像：影子、水中的倒影',
    ref: '509e—510a',
    how: '把影像当作事物来对待，没有意识到它是某个东西的影像。',
    not: '不是现代意义上自由的"想象力"。',
  },
];

// Illustrative ratio 3 : 2 at both cuts → 9 : 6 : 6 : 4 (out of 25).
const LEN: Record<Seg, number> = { noesis: 9, dianoia: 6, pistis: 6, eikasia: 4 };
const H = 360;
const UNIT = H / 25;

const PLACES: { id: string; t: string; ans: Seg; fb: string }[] = [
  { id: 'pool', t: '把水中一棵树的倒影当作树来看', ans: 'eikasia', fb: '影像是可见事物的影子或倒影（509e—510a）。' },
  { id: 'tree', t: '看着一棵树，相信它就是它看上去的样子', ans: 'pistis', fb: '可见的事物本身，是影像的原型（510a）。' },
  { id: 'geo', t: '看着纸上画的正方形，证明关于"正方形本身"的定理', ans: 'dianoia', fb: '图形被当作影像来用；从假设往下推到结论（510d—e）。' },
  { id: 'dial', t: '不满足于几何学的假设，追问它们本身是否成立，直到一个无须假设的起点', ans: 'noesis', fb: '辩证法把假设当作跳板，往上走（511b—c）。' },
];

const ID = 'divided-line';
type Saved = { seg: Seg; dir: boolean; places: Record<string, Seg> };

export default function DividedLine() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('GR2', ID, { seg: 'noesis', dir: false, places: {} }));
  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR2', ID, next);
  };
  const cur = SEGS.find((s) => s.id === st.seg) ?? SEGS[0];
  let y = 0;
  const rects = SEGS.map((s) => {
    const r = { ...s, y, h: LEN[s.id] * UNIT };
    y += r.h;
    return r;
  });

  return (
    <section className="md dl" aria-labelledby="dl-title">
      <header className="md-head">
        <p className="md-tag">看一看结构</p>
        <h3 id="dl-title" className="md-title">
          线段的比喻：四段对象，四种认识状态
        </h3>
        <p className="md-lede">
          逐段打开线段，看每一段的对象、认识状态和它的工作方式。注意四段之间的关系：下面一段是上面一段的"影像"；数学和辩证法都从假设出发，方向却相反。线段讲的是对象和认识状态的分类，不是一个人依次经过的心理阶段。
        </p>
      </header>

      <div className="dl-grid">
        <figure className="dl-fig" aria-hidden="true">
          <svg viewBox="0 0 220 380" className="dl-svg">
            {rects.map((r) => (
              <g key={r.id} className={'dl-seg' + (r.id === st.seg ? ' is-on' : '')} onClick={() => save({ ...st, seg: r.id })}>
                <rect x="40" y={r.y + 10} width="34" height={r.h} />
                <text x="84" y={r.y + 10 + r.h / 2 + 5}>
                  {r.name}
                </text>
                <text x="134" y={r.y + 10 + r.h / 2 + 5} className="dl-grc" lang="grc">
                  {r.grc}
                </text>
              </g>
            ))}
            {/* the main cut between the visible and the intelligible */}
            <line x1="20" x2="94" y1={10 + (LEN.noesis + LEN.dianoia) * UNIT} y2={10 + (LEN.noesis + LEN.dianoia) * UNIT} className="dl-cut" />
            <text x="12" y={10 + ((LEN.noesis + LEN.dianoia) * UNIT) / 2} className="dl-side" transform={`rotate(-90 12 ${10 + ((LEN.noesis + LEN.dianoia) * UNIT) / 2})`}>
              可思的
            </text>
            <text x="12" y={10 + (LEN.noesis + LEN.dianoia + (LEN.pistis + LEN.eikasia) / 2) * UNIT} className="dl-side" transform={`rotate(-90 12 ${10 + (LEN.noesis + LEN.dianoia + (LEN.pistis + LEN.eikasia) / 2) * UNIT})`}>
              可见的
            </text>
            {st.dir && (
              <g className="dl-dir">
                {/* dialectic: upward from hypotheses; mathematics: downward to conclusions */}
                <path d={`M 30 ${10 + LEN.noesis * UNIT - 10} L 30 ${10 + LEN.noesis * UNIT - 90}`} markerEnd="url(#dl-arr)" />
                <path d={`M 30 ${10 + LEN.noesis * UNIT + 10} L 30 ${10 + (LEN.noesis + LEN.dianoia) * UNIT - 12}`} markerEnd="url(#dl-arr)" />
              </g>
            )}
            <defs>
              <marker id="dl-arr" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" />
              </marker>
            </defs>
          </svg>
          <figcaption className="md-note">比例只是示意：509d 只说两次切分"不相等"并且比例相同。照此画出，中间两段等长。</figcaption>
        </figure>

        <div className="dl-panel">
          <div className="md-seg gr-col" role="radiogroup" aria-label="线段的四段">
            {SEGS.map((s) => (
              <label key={s.id} className={'md-seg-opt' + (s.id === st.seg ? ' is-on' : '')}>
                <input type="radio" name="dl-seg" checked={s.id === st.seg} onChange={() => save({ ...st, seg: s.id })} />
                <span>
                  {s.name}（<i lang="grc" className="dl-g">{s.grc}</i>）
                </span>
              </label>
            ))}
          </div>
          <div className="dl-card" aria-live="polite">
            <p className="md-fb-k">
              {cur.name} <span lang="grc">{cur.grc}</span> <span className="lw-ref-l">{cur.ref}</span>
            </p>
            <p>
              <b>对象：</b>
              {cur.obj}
            </p>
            <p>
              <b>怎样进行：</b>
              {cur.how}
            </p>
            <p className="md-muted">
              <b>不是：</b>
              {cur.not}
            </p>
          </div>
          <button type="button" className="btn btn--small" aria-pressed={st.dir} onClick={() => save({ ...st, dir: !st.dir })}>
            {st.dir ? '隐藏' : '显示'}数学与辩证法的方向
          </button>
          {st.dir && (
            <p className="dl-dirtext">
              两者都从假设出发。数学（思想）从假设<b>往下</b>推到结论，不追问假设本身；辩证法（理智）把假设当作跳板<b>往上</b>，直到无须假设的起点，再从那里下来（510b、511b—c）。
            </p>
          )}
        </div>
      </div>

      <div className="lw-grc dl-quote">
        <p className="pe-src">《理想国》511d—e</p>
        <p className="pe-orig" lang="grc">
          νόησιν μὲν ἐπὶ τῷ ἀνωτάτω, διάνοιαν δὲ ἐπὶ τῷ δευτέρῳ, τῷ τρίτῳ δὲ πίστιν ἀπόδος καὶ τῷ τελευταίῳ εἰκασίαν
        </p>
        <p className="pe-zh">本章试译：最高的一段，配给理智；第二段，配给思想；第三段，配给信念；最后一段，配给想象。</p>
      </div>

      <fieldset className="cs-group lw-cases">
        <legend>下面四种情形，各属于哪一段？</legend>
        {PLACES.map((p) => {
          const v = st.places[p.id];
          return (
            <div key={p.id} className="lw-case">
              <p className="lw-case-t">{p.t}</p>
              <div className="md-seg">
                {SEGS.map((s) => (
                  <label key={s.id} className={'md-seg-opt' + (v === s.id ? ' is-on' : '')}>
                    <input type="radio" name={'dl-' + p.id} checked={v === s.id} onChange={() => save({ ...st, places: { ...st.places, [p.id]: s.id } })} />
                    <span>{s.name}</span>
                  </label>
                ))}
              </div>
              {v && (
                <p className="lw-cover" aria-live="polite">
                  {v === p.ans ? `对，${SEGS.find((s) => s.id === p.ans)!.name}。` : `再想一想。按照本章的读法，它属于"${SEGS.find((s) => s.id === p.ans)!.name}"。`}
                  {p.fb}
                </p>
              )}
            </div>
          );
        })}
      </fieldset>

      <div className="md-feedback">
        <p className="md-fb-k">为什么说它不是"心理阶段的阶梯"？</p>
        <ul className="md-fb-list">
          <li>四段首先是四类<b>对象</b>及其相应的认识状态，靠"影像与原型"的关系联系起来，而不是一个人成长时依次经过的四个时期。几何学家并不需要先经过"想象"阶段。</li>
          <li>照 509d 的比例，"思想"和"信念"两段等长。柏拉图是否有意如此，没有公认的答案；比喻的细节不一定都承载意义。</li>
          <li>洞穴比喻讲的才是一个过程（解放、转向、上升、回返）。洞穴中的阶段是否与线段的四段一一对应，是一个长期有争议的问题。</li>
        </ul>
        <button type="button" className="md-reset" onClick={() => save({ seg: 'noesis', dir: false, places: {} })}>
          清除选择
        </button>
      </div>

      <p className="md-note">
        <b>限度。</b>四个希腊词的中文译名各家很不一致，这里用的是本课的译名。四个例子和"不是"的说明是本章为教学而作的，不是柏拉图的原话；"情形属于哪一段"的判断按本章的读法给出。
      </p>
    </section>
  );
}

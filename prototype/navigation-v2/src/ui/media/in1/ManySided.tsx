import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import './in1.css';

// 四 · after the seven predications (第三步). The learner picks the respect
// (material, place, time, state) in which the red pot is said to exist and
// not to exist, and sees each of the seven predications with its reason. A
// switch puts both sentences under the same respect, which turns them into a
// real contradiction: the point of the qualifier syāt. A second panel sets the
// Jaina answer beside relativism (a contrast the Jainas reject) and Sañjaya's
// refusal to answer (from the Sāmaññaphala Sutta, part 五).
// Sources: the red pot and the four respects follow SEP as reported in the
// manuscript; the concrete “other” examples (metal, elsewhere) are the
// chapter's. The seven predications are a later systematic doctrine.

type Dim = 'material' | 'place' | 'time' | 'state';
const DIMS: { id: Dim; name: string; own: string; other: string }[] = [
  { id: 'material', name: '材料', own: '它自己的材料（泥土）', other: '别的材料（例如金属）' },
  { id: 'place', name: '位置', own: '它所在的位置（这间屋子）', other: '别的位置（例如另一座城）' },
  { id: 'time', name: '时间', own: '它存在的时间（做成之后）', other: '别的时间（做成之前）' },
  { id: 'state', name: '状态', own: '它自己的状态（红色）', other: '别的状态（例如作为一个蓝色的罐子）' },
];

type Mode = 'syat' | 'rel' | 'sanjaya';
const MODES: { id: Mode; label: string; say: string; note: string }[] = [
  {
    id: 'syat',
    label: '耆那教：从某方面说',
    say: '“从某方面说（syāt），这个罐子存在。”',
    note: '这是一个断言。“某方面”指的是对象本身的某个方面，例如它的材料；在这个范围内，这句话确定为真，对谁说都一样。',
  },
  {
    id: 'rel',
    label: '相对主义（对照，不是耆那教的说法）',
    say: '“对你来说它存在，对我来说它不存在。”',
    note: '真假取决于说话的人。耆那教的思想家是实在论者，会拒绝这种说法：判断之所以可以从多方面说，是因为对象本身有多个方面，不是因为说话的人不同。',
  },
  {
    id: 'sanjaya',
    label: '散若夷（据《沙门果经》）',
    say: '“我不说是这样，不说是那样，不说是别样，不说不是，也不说不是不是。”',
    note: '不作任何断言。形式上，散若夷和七种谓述都列出了“有”“无”“既有又无”等几种可能；但散若夷对每一种都不置可否，耆那教则对每一种（在限定的意义上）都作出肯定的判断。',
  },
];

const ID = 'many-sided';
type Saved = { dim: Dim; same: boolean; mode: Mode; guess?: Mode };

export default function ManySided() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('IN1', ID, { dim: 'material', same: false, mode: 'syat' }));
  const save = (patch: Partial<Saved>) => {
    const next = { ...st, ...patch };
    setSt(next);
    setMedia('IN1', ID, next);
  };
  const d = DIMS.find((x) => x.id === st.dim) ?? DIMS[0];
  const neg = st.same ? d.own : d.other;
  const lines: { t: string; why: string; bad?: boolean }[] = [
    { t: '存在', why: `就${d.own}而言，这个罐子存在。` },
    st.same
      ? { t: '不存在', why: `就${d.own}而言，它不存在？这就和第 1 句在同一个方面相互否定了。`, bad: true }
      : { t: '不存在', why: `就${neg}而言，它不存在：它不是那样的罐子。` },
    { t: '存在又不存在', why: st.same ? '两句落在同一个方面，就不再是“依次来说”，而是真正的矛盾。' : `先就${d.own}说它存在，再就${neg}说它不存在，依次来说。`, bad: st.same },
    { t: '不可言说', why: '如果要求同时、在同一个方面既说它存在又说它不存在，就没有任何语言能做到。' },
    { t: '存在，且不可言说', why: '把第 1 句和第 4 句合起来。' },
    { t: '不存在，且不可言说', why: '把第 2 句和第 4 句合起来。' },
    { t: '存在又不存在，且不可言说', why: '把第 3 句和第 4 句合起来。' },
  ];
  const mode = MODES.find((m) => m.id === st.mode) ?? MODES[0];

  return (
    <section className="md ms" aria-labelledby="ms-title">
      <header className="md-head">
        <p className="md-tag">动手试一试</p>
        <h3 id="ms-title" className="md-title">
          一个红色的罐子，七种说法
        </h3>
        <p className="md-lede">
          选一个“方面”，看七种谓述怎样各自成立。再打开下面的开关，把“存在”和“不存在”放进<b>同一个</b>方面，看看会发生什么。
        </p>
      </header>

      <div className="ms-stage">
        <svg className="ms-svg" viewBox="0 0 220 180" role="img" aria-label={`一个红色的罐子。当前的方面：${d.name}。`}>
          <path className="ms-pot" d="M80 30 h60 v10 q-4 6 -2 14 q38 22 34 62 q-6 40 -62 40 q-56 0 -62 -40 q-4 -40 34 -62 q2 -8 -2 -14 z" />
          <g className="ms-tags">
            {DIMS.map((x, i) => (
              <text key={x.id} x={i % 2 ? 214 : 6} y={i < 2 ? 22 : 170} textAnchor={i % 2 ? 'end' : 'start'} className={x.id === d.id ? 'is-on' : ''}>
                {x.name}
              </text>
            ))}
          </g>
        </svg>
        <div>
          <fieldset className="cs-group">
            <legend>从哪一个方面说？</legend>
            <div className="md-seg">
              {DIMS.map((x) => (
                <label key={x.id} className={'md-seg-opt' + (x.id === d.id ? ' is-on' : '')}>
                  <input type="radio" name="ms-dim" checked={x.id === d.id} onChange={() => save({ dim: x.id })} />
                  <span>{x.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="ms-pair">
            <span>
              <b>“存在”一侧：</b>就{d.own}而言
            </span>
            <span className={st.same ? 'is-bad' : ''}>
              <b>“不存在”一侧：</b>就{neg}而言
            </span>
          </p>
          <label className="ms-switch">
            <input type="checkbox" checked={st.same} onChange={(e) => save({ same: e.target.checked })} />
            <span>把两句放进同一个方面</span>
          </label>
        </div>
      </div>

      <ol className="ms-lines" aria-live="polite">
        {lines.map((l, i) => (
          <li key={i} className={l.bad ? 'is-bad' : ''}>
            <span className="ms-l">从某方面说，它{l.t}</span>
            <span className="ms-why">{l.why}</span>
          </li>
        ))}
      </ol>
      {st.same && (
        <p className="ms-warn" role="status">
          同一个方面既说存在又说不存在，就成了真正的矛盾。syāt（“从某方面说”）的作用，正是标明每一句话的范围，让两句话不落在同一个方面。它不是削弱判断，而是限定判断。
        </p>
      )}

      <div className="md-feedback">
        <p className="md-fb-k">三种说法，放在一起比较</p>
        <div className="md-seg" role="group" aria-label="选择一种说法">
          {MODES.map((m) => (
            <label key={m.id} className={'md-seg-opt' + (m.id === mode.id ? ' is-on' : '')}>
              <input type="radio" name="ms-mode" checked={m.id === mode.id} onChange={() => save({ mode: m.id })} />
              <span>{m.label}</span>
            </label>
          ))}
        </div>
        <p className="ms-say">{mode.say}</p>
        <p>{mode.note}</p>

        <fieldset className="cs-group ms-q">
          <legend>在哪一种说法里，“这个罐子存在”在它的范围内确定为真，而且对任何说话的人都一样？</legend>
          <div className="md-seg">
            {MODES.map((m) => (
              <label key={m.id} className={'md-seg-opt' + (st.guess === m.id ? ' is-on' : '')}>
                <input type="radio" name="ms-guess" checked={st.guess === m.id} onChange={() => save({ guess: m.id })} />
                <span>{m.label.split('（')[0].split('：')[0]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div aria-live="polite">
          {st.guess === 'syat' && <p className="md-fb-k">对。这正是本章说多面性不是相对主义的第一、第二个理由：它关于对象，而且每一句在它的范围内是确定的。</p>}
          {st.guess === 'rel' && <p>再想一想：在相对主义的说法里，真假取决于说话的人，所以它恰恰不是“对任何说话的人都一样”。</p>}
          {st.guess === 'sanjaya' && <p>再想一想：散若夷不作任何断言，所以“这个罐子存在”在他那里既不被肯定，也不被否定。</p>}
        </div>
      </div>

      <p className="md-note">
        <b>这个练习的限度。</b>七种谓述是大雄之后很久，由萨曼塔跋陀罗等后来的耆那教逻辑学家系统化的学说，不是大雄的原话。红色罐子和“材料、位置、时间、状态”四个方面，依据 SEP 的介绍；“金属”“另一座城”等具体的例子是本章补充的。第 5 至 7 句只写成前几句的组合，这是本章为了说明所作的简化。耆那教关心的是实体与样态、存在与非存在这样的形而上学问题，一个罐子只是为了说明而选的例子。
      </p>
    </section>
  );
}

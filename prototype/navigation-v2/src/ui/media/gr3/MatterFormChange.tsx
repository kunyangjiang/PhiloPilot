import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import '../gr1/gr1.css';
import './gr3.css';

// 三 · after "潜能与现实", once matter/form, the kinds of change and the two
// kinds of potentiality have all been read. The learner picks a familiar
// thing and a change, first predicts what kind of change it is and what
// persists, then sees the analysis from three perspectives: the three
// elements of change (substrate, privation, form), matter and form, and
// potentiality and actuality. The figure draws what persists as one line
// through the change; it is a diagram of an analysis, not a picture of two
// layers. The examples are the chapter's (铜像、橡子、人学会音乐; table of
// kinds of change) or close variants of them (content/GR3_SAMPLE_DRAFT.md, 三).

type Kind = 'gen' | 'alt' | 'grow' | 'loc';
const KIND: Record<Kind, { zh: string; grc: string; cat: string }> = {
  gen: { zh: '生成或消灭', grc: 'γένεσις / φθορά', cat: '实体' },
  alt: { zh: '性质变化', grc: 'ἀλλοίωσις', cat: '性质' },
  grow: { zh: '增长或减少', grc: 'αὔξησις / φθίσις', cat: '数量' },
  loc: { zh: '位移', grc: 'φορά', cat: '地点' },
};

interface Change {
  id: string;
  t: string;
  kind: Kind;
  /** Candidate answers to "what persists?"; the first is right. */
  persists: [string, string, string];
  before: string;
  after: string;
  /** The privation the change starts from, and the form it ends in. */
  privation: string;
  form: string;
  why: string;
  pa: string;
}
interface Thing {
  id: string;
  zh: string;
  natural: boolean;
  matter: string;
  formIs: string;
  changes: Change[];
}

const THINGS: Thing[] = [
  {
    id: 'statue',
    zh: '一座铜像',
    natural: false,
    matter: '铜。铜本身也是复合物（有它自己的质料和形式），所以"质料"总是相对于某个东西而言的：铜是铜像的质料。',
    formIs: '使这块铜成为一座雕像、成为"这一个人像"的那种构造。不只是表面的轮廓：一座雕像的形式还包括它作为雕像所是的东西。',
    changes: [
      {
        id: 'cast',
        t: '工匠把一块铜铸成雕像',
        kind: 'gen',
        persists: ['铜（质料）', '雕像', '什么也没有，雕像是从无中产生的'],
        before: '一块铜',
        after: '一座铜像',
        privation: '没有雕像的形状和构造',
        form: '雕像的形式',
        why: '雕像这个复合物开始存在：这是一个东西的生成，不是一个已有的东西获得新的性质。持续存在的不是雕像（它之前还不存在），而是它的质料。亚里士多德用这个例子说明，生成不是从绝对的"无"开始的。',
        pa: '铸造之前，铜潜在地是雕像；铸成之后，现实地是雕像。这里的"潜能"指铜可以被做成雕像，就像木头里"有"一尊赫尔墨斯像（1048a32—35）。',
      },
      {
        id: 'melt',
        t: '铜像被熔成一块铜',
        kind: 'gen',
        persists: ['铜（质料）', '雕像', '雕像的形式'],
        before: '一座铜像',
        after: '一块铜',
        privation: '（反过来）失去雕像的形式',
        form: '只剩下铜的形式',
        why: '这是消灭：雕像不再存在，铜还在。亚里士多德的表格说，在生成和消灭中持续存在的是质料。注意形式并没有"跑到别处去"，它不是一个可以被取下来另放的部件。',
        pa: '熔化之后，铜又只是潜在的雕像（它可以被重新铸造），但那将是另一座雕像。',
      },
      {
        id: 'move',
        t: '铜像被搬到广场上',
        kind: 'loc',
        persists: ['这座铜像', '只有铜', '什么也没有'],
        before: '在作坊里',
        after: '在广场上',
        privation: '不在广场上',
        form: '在广场上',
        why: '位移：变化发生在"地点"这个范畴里，持续存在的是这座铜像本身。',
        pa: '搬运的过程中，铜像作为"可以被移动的东西"正在得到实现，这就是第三卷对运动的定义（201a10—15）。',
      },
    ],
  },
  {
    id: 'oak',
    zh: '一棵橡树',
    natural: true,
    matter: '构成橡树的木质、汁液等，以及（在生成时）橡子和它从土、水中吸收的养分。',
    formIs: '使这些材料成为一棵活的橡树的组织方式：它的生长、吸收养分、结出橡子的能力。第五部分会说，生物的形式就是它的灵魂（生命原则）。',
    changes: [
      {
        id: 'grow-up',
        t: '橡子长成一棵橡树',
        kind: 'gen',
        persists: ['质料（橡子及它吸收的东西）', '橡树', '什么也没有'],
        before: '一颗橡子',
        after: '一棵橡树',
        privation: '还不是橡树',
        form: '橡树的形式',
        why: '一个新的实体生成了。本章说：底层不是橡树（橡树还不存在），而是橡子和它吸收的土、水、养分（190b1—5：植物和动物从种子而来）。',
        pa: '橡子潜在地是橡树。和铜不同，橡子的变化的本原在它自身之中：没有工匠，它自己长成橡树。这正是第四部分要说的"自然"。',
      },
      {
        id: 'thicken',
        t: '树干一年年变粗',
        kind: 'grow',
        persists: ['这棵橡树', '只有木头', '什么也没有'],
        before: '较细的树干',
        after: '较粗的树干',
        privation: '较小',
        form: '较大',
        why: '增长：变化发生在"数量"这个范畴里，持续存在的是同一棵树（本章表格的例子）。',
        pa: '橡树潜在地是更粗的，生长就是这种潜能的实现。',
      },
      {
        id: 'yellow',
        t: '秋天，叶子由绿变黄',
        kind: 'alt',
        persists: ['这棵橡树', '绿色', '什么也没有'],
        before: '绿叶',
        after: '黄叶',
        privation: '不是黄的',
        form: '黄的',
        why: '性质变化：持续存在的是这棵树，变化的是它的一个性质。绿色本身不会"变成"黄色，是有颜色的东西从绿变黄（《范畴篇》：同一个实体可以先后接受相反的性质）。',
        pa: '叶子潜在地是黄的；变黄就是这种潜能的实现。',
      },
    ],
  },
  {
    id: 'person',
    zh: '一个人',
    natural: true,
    matter: '他的身体：骨、肉、血等。身体的物质在不断代谢更新。',
    formIs: '使这个身体成为一个活人的组织方式，也就是他的灵魂：营养、感知、运动、思考的能力（第五部分）。',
    changes: [
      {
        id: 'music',
        t: '一个不懂音乐的人学会了音乐',
        kind: 'alt',
        persists: ['这个人', '"不懂音乐"', '什么也没有'],
        before: '不懂音乐的人',
        after: '懂音乐的人',
        privation: '不懂音乐（缺乏）',
        form: '懂音乐',
        why: '这是《物理学》第一卷第 7 章的例子。"人"持续存在；"不懂音乐"并不持续，它被"懂音乐"取代。巴门尼德只看到"不是"和"是"两个要素；亚里士多德指出还有第三个：持续的底层。',
        pa: '这里有两种潜能。学会之前，他潜在地是音乐家（他能够学）；学会之后，即使他此刻没有在演奏，他也"现实地"是音乐家，同时又潜在地在演奏。第五部分会用这个区分来定义灵魂（"第一实现"）。',
      },
      {
        id: 'walk',
        t: '他从家里走到市场',
        kind: 'loc',
        persists: ['这个人', '他的家', '什么也没有'],
        before: '在家里',
        after: '在市场',
        privation: '不在市场',
        form: '在市场',
        why: '位移（本章表格的例子）：持续存在的是这个人。',
        pa: '走路的过程就是"可以移动的东西作为可以移动的东西得到实现"。走到之后，这个运动就结束了：运动是"不完全的"现实（下一节"运动与活动"会讲这一点）。',
      },
      {
        id: 'die',
        t: '他死了',
        kind: 'gen',
        persists: ['质料（经过变化的身体物质）', '这个人', '他的灵魂'],
        before: '一个活人',
        after: '一具尸体',
        privation: '（反过来）失去生命的形式',
        form: '—',
        why: '消灭：这个人不再存在，持续存在的只能是质料。本章说：一个人死了，苏格拉底这个实体不再存在，但构成他身体的质料（经过变化）还在。第五部分会说，一个睡着的人和一具尸体的区别，就在于前者仍有灵魂这个"第一实现"。',
        pa: '活着时，身体潜在地有生命，而灵魂是它的实现；死后，这个身体不再潜在地是一个活人。',
      },
    ],
  },
];

type View = 'change' | 'mf' | 'pa';
const VIEWS: [View, string][] = [
  ['change', '变化的三要素'],
  ['mf', '质料与形式'],
  ['pa', '潜能与现实'],
];

const ID = 'matter-form-change';
interface Saved {
  thing: string;
  change: string;
  kind: Kind | null;
  persist: number | null;
  shown: boolean;
  view: View;
}
const INIT: Saved = { thing: 'statue', change: 'cast', kind: null, persist: null, shown: false, view: 'change' };

/** A fixed rotation per change, so the right answer is not always first. */
const order = (id: string) => [0, 1, 2].map((i) => (i + id.length) % 3);

function Figure({ c, view }: { c: Change; view: View }) {
  const top = view === 'pa' ? ['潜在地', '现实地'] : ['之前', '之后'];
  return (
    <div className="mf-diagram" role="group" aria-label={`示意：${c.before}，经过${KIND[c.kind].zh}，成为${c.after}`}>
      <div className="mf-state">
        <span className="mf-cap">{top[0]}</span>
        <b>{c.before}</b>
        {view === 'change' && <small>缺乏：{c.privation}</small>}
        {view === 'pa' && <small>潜在地是：{c.after}</small>}
      </div>
      <div className="mf-arrow" aria-hidden="true">
        <span>{KIND[c.kind].zh}</span>
      </div>
      <div className="mf-state mf-state--after">
        <span className="mf-cap">{top[1]}</span>
        <b>{c.after}</b>
        {view === 'change' && <small>形式：{c.form}</small>}
        {view === 'pa' && <small>现实地是：{c.after}</small>}
      </div>
      <div className="mf-sub">
        {view === 'mf' ? (
          <>
            <b>同一个东西，从两个角度分析</b>
            <small>质料和形式见下方说明，它们不是两层材料</small>
          </>
        ) : (
          <>
            <b>持续存在的底层：{c.persists[0]}</b>
            <small>贯穿前后的这条线只表示"有某个东西持续存在"</small>
          </>
        )}
      </div>
    </div>
  );
}

export default function MatterFormChange() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('GR3', ID, INIT));
  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR3', ID, next);
  };
  const thing = THINGS.find((t) => t.id === st.thing) ?? THINGS[0];
  const c = thing.changes.find((x) => x.id === st.change) ?? thing.changes[0];
  const ord = order(c.id);
  const kindOk = st.kind === c.kind;
  const persistOk = st.persist === 0;
  const fresh = { kind: null, persist: null, shown: false } as const;

  return (
    <section className="md mf" aria-labelledby="mf-title">
      <header className="md-head">
        <p className="md-tag">分析一次变化</p>
        <h3 id="mf-title" className="md-title">
          质料、形式与变化
        </h3>
        <p className="md-lede">
          选一个东西和它的一次变化。先自己判断这是哪一种变化、什么东西持续存在，再从三个角度看分析：变化的三要素、质料与形式、潜能与现实。
        </p>
      </header>

      <fieldset className="cs-group">
        <legend>选一个东西</legend>
        <div className="md-seg">
          {THINGS.map((t) => (
            <label key={t.id} className={'md-seg-opt' + (st.thing === t.id ? ' is-on' : '')}>
              <input type="radio" name="mf-thing" checked={st.thing === t.id} onChange={() => save({ ...st, ...fresh, thing: t.id, change: t.changes[0].id })} />
              <span>
                {t.zh}
                <small className="mf-nat">{t.natural ? '自然物' : '人造物'}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="cs-group">
        <legend>选一次变化</legend>
        <div className="md-seg gr-col">
          {thing.changes.map((x) => (
            <label key={x.id} className={'md-seg-opt' + (c.id === x.id ? ' is-on' : '')}>
              <input type="radio" name="mf-change" checked={c.id === x.id} onChange={() => save({ ...st, ...fresh, change: x.id })} />
              <span>{x.t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mf-predict">
        <fieldset className="cs-group">
          <legend>你的判断（一）：这是哪一种变化？</legend>
          <div className="md-seg">
            {(Object.keys(KIND) as Kind[]).map((k) => (
              <label key={k} className={'md-seg-opt' + (st.kind === k ? ' is-on' : '')}>
                <input type="radio" name="mf-kind" checked={st.kind === k} onChange={() => save({ ...st, kind: k })} />
                <span>{KIND[k].zh}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="cs-group">
          <legend>你的判断（二）：什么东西持续存在？</legend>
          <div className="md-seg">
            {ord.map((i) => (
              <label key={i} className={'md-seg-opt' + (st.persist === i ? ' is-on' : '')}>
                <input type="radio" name="mf-persist" checked={st.persist === i} onChange={() => save({ ...st, persist: i })} />
                <span>{c.persists[i]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="lw-nav">
          <button type="button" className="btn btn--small" disabled={st.kind === null || st.persist === null} onClick={() => save({ ...st, shown: true })}>
            看分析
          </button>
          {(st.kind === null || st.persist === null) && <span className="md-muted">先作出两个判断。</span>}
        </div>
      </div>

      {st.shown && (
        <div className="md-feedback" aria-live="polite">
          <p className="md-fb-k">
            {kindOk && persistOk
              ? '两个判断都对。'
              : `${kindOk ? '变化的种类判断对了' : `这是${KIND[c.kind].zh}（${KIND[c.kind].cat}范畴）`}；${persistOk ? '持续存在的东西判断对了' : `持续存在的是：${c.persists[0]}`}。`}
          </p>
          <div className="md-seg mf-views" role="radiogroup" aria-label="分析的角度">
            {VIEWS.map(([v, t]) => (
              <label key={v} className={'md-seg-opt' + (st.view === v ? ' is-on' : '')}>
                <input type="radio" name="mf-view" checked={st.view === v} onChange={() => save({ ...st, view: v })} />
                <span>{t}</span>
              </label>
            ))}
          </div>
          <Figure c={c} view={st.view} />
          {st.view === 'change' && (
            <>
              <p>
                <b>
                  {KIND[c.kind].zh}（{KIND[c.kind].grc}，{KIND[c.kind].cat}范畴）。
                </b>
                {c.why}
              </p>
              <p className="md-muted">三要素：持续的底层（{c.persists[0]}）、变化开始时的缺乏（{c.privation}）、变化结束时获得的形式（{c.form}）。</p>
            </>
          )}
          {st.view === 'mf' && (
            <>
              <p>
                <b>质料：</b>
                {thing.matter}
              </p>
              <p>
                <b>形式：</b>
                {thing.formIs}
              </p>
              <p className="md-muted">
                质料和形式是分析同一个东西的两个角度。不能想象{thing.zh}里面有一层质料、外面套着一层形式："最切近的质料和形式是同一个东西，一个是潜在的，一个是现实的"（《形而上学》1045b17—19）。
              </p>
            </>
          )}
          {st.view === 'pa' && <p>{c.pa}</p>}
        </div>
      )}

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>
      <p className="md-note">
        <b>这张示意图在哪里不准确。</b>图中的方框和贯穿前后的线，只是为了把"之前、之后、持续的东西"分开来看；它们不是三个东西，更不是质料和形式两层材料。图示有三个限度：第一，形式不是一个可以被取下、另放的部件，也不只是外形；第二，人造物（铜像）的形式来自工匠，而自然物（橡树、人）的变化本原在它自身之中，图上看不出这个区别；第三，"质料"是相对的（铜是雕像的质料，铜自己又有质料），图中没有画出这一层层的关系，也不涉及后人所说的"原初质料"。例子取自本章或由本章的例子稍加改变，分析是本章的整理。
      </p>
    </section>
  );
}

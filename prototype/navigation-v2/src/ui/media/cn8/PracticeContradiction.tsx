import { Limits, Quote, Seg, Tag, useSavedIn, type Basis } from '../cn7/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';

// 四 · after 「论证、应用与政治」. Reasoning, not slogans:
// 1. The knowing cycle of 实践论, step by step (the chapter's four-step reconstruction),
//    with the pear example, a second example labelled as the course's own, and the
//    difficulty at step 3: who judges the result of practice?
// 2. Three theses of 矛盾论, each with its passage, an example, the philosophical
//    question it raises and the later use made of it.
// 3. A board: 哲学论证 / 实际应用 / 政治功能 (the chapter's three levels).
// 4. One claim in three settings: 1937, the 1960s, 1978 (from 五).
// Passages are those of 四 and 五 (marxists.org / Wikisource), with the chapter's 白话.

const ID = 'practice-contradiction';

// ── 1. knowing cycle ─────────────────────────────────────────────────
const NODES = [
  { id: 'p', label: '实践', x: 20, y: 95 },
  { id: 's', label: '感性认识', x: 215, y: 15 },
  { id: 'r', label: '理性认识', x: 410, y: 95 },
  { id: 't', label: '再实践', x: 215, y: 175 },
] as const;
const W = 130;
const H = 40;
const ARROWS = [
  { d: 'M 85 95 L 85 35 L 210 35', cap: '', cx: 0, cy: 0 },
  { d: 'M 345 35 L 475 35 L 475 90', cap: '飞跃', cx: 410, cy: 27 },
  { d: 'M 475 135 L 475 195 L 350 195', cap: '检验', cx: 410, cy: 213 },
  { d: 'M 210 195 L 85 195 L 85 140', cap: '再认识', cx: 100, cy: 213 },
];
interface Step {
  n: string;
  nodes: string[];
  arrow: number;
  text: string;
  quote?: { src: string; orig: string; zh?: string };
  inline?: string;
}
const STEPS: Step[] = [
  {
    n: '一',
    nodes: ['p', 's'],
    arrow: 0,
    text: '一切认识都起源于实践；间接的知识也是别人直接经验的结果。',
    inline: '"一切真知都是从直接经验发源的"',
    quote: {
      src: '毛泽东《实践论》',
      orig: '你要有知识，你就得参加变革现实的实践。你要知道梨子的滋味，你就得变革梨子，亲口吃一吃。',
      zh: '你要有知识，就必须参加改变现实的实践。你要知道梨子的滋味，就必须改变梨子，亲口吃一吃。',
    },
  },
  {
    n: '二',
    nodes: ['s', 'r'],
    arrow: 1,
    text: '认识从感性（事物的现象、片面和外部联系）上升到理性（事物的本质、全体和内部联系），是一个飞跃；但理性认识是否正确，在认识的过程内部无法完全判定。',
  },
  {
    n: '三',
    nodes: ['r', 't'],
    arrow: 2,
    text: '所以，理性认识必须"再回到改造世界的实践中去"，以实践的结果来检验。',
    quote: {
      src: '毛泽东《实践论》',
      orig: '判定认识或理论之是否真理，不是依主观上觉得如何而定，而是依客观上社会实践的结果如何而定。真理的标准只能是社会的实践。',
      zh: '判断一个认识或理论是不是真理，不是根据主观上觉得怎样来决定，而是根据客观上社会实践的结果怎样来决定。真理的标准只能是社会的实践。',
    },
  },
  {
    n: '四',
    nodes: ['p', 's', 'r', 't'],
    arrow: 3,
    text: '这个过程不断循环，认识不断深化，但永远不会终结：每一阶段的认识都只有"相对的真理性"，"无数相对的真理之总和，就是绝对的真理"。',
    quote: {
      src: '毛泽东《实践论》',
      orig: '实践、认识、再实践、再认识，这种形式，循环往复以至无穷，而实践和认识之每一循环的内容，都比较地进到了高一级的程度。',
      zh: '实践，认识，再实践，再认识，这种形式循环往复，以至无穷；而每一次实践和认识的循环，其内容都相对地进到了更高一级的程度。',
    },
  },
];

// The two worked examples, one per step.
const EX: { id: string; label: string; b: Basis; steps: string[] }[] = [
  {
    id: 'pear',
    label: '梨子（《实践论》的例子）',
    b: 'text',
    steps: [
      '要知道梨子的滋味，就得"变革梨子，亲口吃一吃"。认识不是被动地接受印象：吃梨子就是改变梨子。',
      '吃过许多梨子，从"这一只是甜的"上升到关于梨子的一般认识。（这一步和下面两步是本课顺着论证的推演，《实践论》只用梨子说明第一步。）',
      '这个一般认识要在下一次挑选、种植或储存梨子时接受检验。',
      '检验的结果修正原来的认识，新的认识又回到实践中去。',
    ],
  },
  {
    id: 'farm',
    label: '试种新品种（本课的例子）',
    b: 'course',
    steps: [
      '一个农民在自己的田里试种一个新品种，看到它的长势、产量、病虫害。',
      '比较几年的记录，形成一个判断：这个品种适合这种土壤和气候，原因可能是什么。',
      '第二年在另一块田里按这个判断去种，看结果是否符合预期。',
      '结果符合或不符合，都会修正原来的判断。这个例子之所以清楚，是因为条件可以比较、结果可以测量。',
    ],
  },
];

// The difficulty at step 3.
type Clear = 'clear' | 'unclear';
const JUDGE: { id: string; q: string; key: Clear; why: string }[] = [
  {
    id: 'lab',
    q: '在一个控制了条件的科学实验中，实践失败了：是理论错了，还是执行错了？',
    key: 'clear',
    why: '本课说，在科学实验中，这些问题可以通过控制条件来回答（至少原则上可以）：重复实验、改变一个条件、比较结果。',
  },
  {
    id: 'campaign',
    q: '在一场政治运动中，实践"失败"了：是理论错了，还是执行错了？',
    key: 'unclear',
    why: '本课说，在一场革命或政治运动中，这些问题往往没有清楚的答案；而当"实践"被理解为"革命的实践"时，判断实践是否成功的权力，就很容易落到掌握政治权力的人手中。这是论证第三步的困难，不是对论证的简单否定。',
  },
];

// ── 2. three theses ─────────────────────────────────────────────────
const THESES: {
  id: string;
  tab: string;
  quote: { src: string; orig: string; zh: string };
  arg: string;
  example: { b: Basis; t: string };
  phil: string;
  use: { b: Basis; t: string };
}[] = [
  {
    id: 'inner',
    tab: '内因和外因',
    quote: {
      src: '毛泽东《矛盾论》',
      orig: '事物发展的根本原因，不是在事物的外部而是在事物的内部，在于事物内部的矛盾性。',
      zh: '事物发展的根本原因，不在事物的外部，而在事物的内部，在于事物内部的矛盾性。',
    },
    arg: '他用这个论点反对"外因论"：许多国家地理和气候条件差不多，发展却很不相同，所以社会的发展"主要地不是由于外因而是由于内因"。',
    example: { b: 'text', t: '地理和气候条件差不多的国家，发展却很不相同（《矛盾论》自己的例子）。' },
    phil: '"根本原因"是什么意思？内因和外因能不能这样分开，分开以后怎样比较它们的分量？',
    use: { b: 'course', t: '本课把它和上一门课的"冲击—回应"讨论对照：如果事物发展的根本原因在内部，中国近代的变化也不能只用"西方的冲击"来解释。这是一个比较，不是《矛盾论》自己的应用。' },
  },
  {
    id: 'special',
    tab: '普遍寓于特殊',
    quote: {
      src: '毛泽东《矛盾论》',
      orig: '他们不了解矛盾的普遍性即寓于矛盾的特殊性之中。',
      zh: '他们不了解，矛盾的普遍性就存在于矛盾的特殊性之中。',
    },
    arg: '教条主义者的错误在于不了解这一点：普遍的原理只有通过对具体情况的"具体的分析"才能运用。',
    example: { b: 'text', t: '不能照搬苏联的经验，因为中国的矛盾有中国的特殊性。' },
    phil: '普遍的原理怎样"寓于"特殊之中？如果每一种情况都有特殊性，普遍原理还能告诉我们什么？',
    use: { b: 'text', t: '在1930年代的党内，这个论点是用来反对莫斯科训练出来的领导人的，后来被概括为"马克思主义的中国化"。它和朱熹"理一分殊"有形式上的相似，但这只是比较，没有证据表明受了朱熹的影响。' },
  },
  {
    id: 'antag',
    tab: '对抗不是唯一形式',
    quote: {
      src: '毛泽东《矛盾论》',
      orig: '对抗是矛盾斗争的一种形式，而不是矛盾斗争的一切形式。',
      zh: '对抗是矛盾斗争的一种形式，而不是矛盾斗争的所有形式。',
    },
    arg: '并不是所有的矛盾都要通过激烈的冲突来解决；有些矛盾可以通过非对抗的方式来解决。',
    example: { b: 'course', t: '两个合作者对计划有不同意见：这是一个矛盾，但可以通过讨论解决，不必成为冲突。（本课的例子。）' },
    phil: '这是对"矛盾"概念的一个重要限制：什么标准区分对抗性的矛盾和非对抗性的矛盾？',
    use: { b: 'text', t: '这个区分后来发展为1957年"两类不同性质的矛盾"（敌我矛盾和人民内部矛盾）的理论。政治上的问题是：谁来决定一个矛盾是"对抗性的"还是"非对抗性的"？' },
  },
];

// ── 3. three levels ─────────────────────────────────────────────────
type Lv = 'arg' | 'app' | 'pol';
const LV: [Lv, string][] = [
  ['arg', '哲学论证'],
  ['app', '实际应用'],
  ['pol', '政治功能'],
];
const CARDS: { id: string; t: string; ok: Lv[]; why: string }[] = [
  { id: 'c1', t: '"真理的标准只能是社会的实践"', ok: ['arg'], why: '本课的表把它列为哲学论证的例子。' },
  { id: 'c2', t: '"矛盾的普遍性即寓于矛盾的特殊性之中"', ok: ['arg'], why: '这是关于普遍和特殊的关系的一般论点，属于哲学论证。' },
  { id: 'c3', t: '用《实践论》批评党内的教条主义和经验主义', ok: ['app'], why: '《选集》本题注说这是写作的直接目的；本课把它列为实际应用。' },
  { id: 'c4', t: '分析半殖民地中国的"主要矛盾"在不同时期的转化', ok: ['app'], why: '本课的表把它列为实际应用的例子。' },
  { id: 'c5', t: '1949年以后成为国家意识形态的经典', ok: ['pol'], why: '本课的表把它列为政治功能。' },
  { id: 'c6', t: '1964年把"合二而一"定为反对"一分为二"', ok: ['pol'], why: '本课说，在这里哲学争论直接成为政治斗争，哲学的论证完全消失了。' },
  { id: 'c7', t: '用"普遍寓于特殊"反对照搬苏联经验的领导人', ok: ['app', 'pol'], why: '跨两个层次：它是对中国情况的具体分析（应用），也是党内的权力之争（政治）。本课说三个层次之间有联系。' },
  { id: 'c8', t: '1978年用"实践是检验真理的唯一标准"反对"两个凡是"', ok: ['app', 'pol'], why: '跨两个层次：它重申《实践论》的原则（应用），在当时有直接的政治针对性（政治）。' },
];

// ── 4. one claim, three settings ────────────────────────────────────
const TIMES: { id: string; tab: string; t: string; quote?: { src: string; orig: string; zh?: string } }[] = [
  { id: '1937', tab: '1937', t: '《实践论》被用来反对党内照搬马克思主义书本和苏联经验的"教条主义"，以及只相信自己片断经验的"经验主义"。' },
  {
    id: '1960s',
    tab: '1960年代',
    t: '"实践"的名义被用来为政治运动服务。1971年《红旗》上批判杨献珍的文章，把一个关于辩证法的问题直接等同于一个政治问题：',
    quote: {
      src: '中央党校革命大批判写作组《"合二而一论"是复辟资本主义的反动哲学》',
      orig: '斗争的实质，归根到底，就是坚持无产阶级专政、巩固社会主义制度，还是取消无产阶级专政、复辟资本主义制度的问题。',
      zh: '斗争的实质，归根到底，就是坚持无产阶级专政、巩固社会主义制度，还是取消无产阶级专政、复辟资本主义制度的问题。',
    },
  },
  { id: '1978', tab: '1978', t: '《实践是检验真理的唯一标准》用《实践论》的原则，来反对把毛泽东的言论当作检验真理的标准（"两个凡是"）。本课没有核对这篇文章的原文。' },
];

interface Saved {
  step: number;
  ex: string;
  judge: Record<string, Clear | undefined>;
  th: string;
  lv: Record<string, Lv | undefined>;
  checked: boolean;
  time: string;
}
const INIT: Saved = { step: 0, ex: 'pear', judge: {}, th: 'inner', lv: {}, checked: false, time: '1937' };

export default function PracticeContradiction() {
  const [st, save] = useSavedIn<Saved>('CN8', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const step = STEPS[st.step] ?? STEPS[0];
  const ex = EX.find((e) => e.id === st.ex) ?? EX[0];
  const th = THESES.find((t) => t.id === st.th) ?? THESES[0];
  const time = TIMES.find((t) => t.id === st.time) ?? TIMES[0];
  const allPlaced = CARDS.every((c) => st.lv[c.id]);

  return (
    <section className="md c3 c5" aria-labelledby="pc-title">
      <header className="md-head">
        <p className="md-tag">论证探究 · 实践论与矛盾论</p>
        <h3 id="pc-title" className="md-title">
          从吃梨子到"谁来判断"：把论证一步一步走一遍
        </h3>
        <p className="md-lede">不是背口号：先按本课的四步重构走一遍《实践论》的论证，看它在哪一步遇到困难；再看《矛盾论》的三个论点各自提出了什么哲学问题；最后把哲学论证、实际应用和政治功能分开。</p>
      </header>

      <p className="c3-layer-k">一 · 认识的循环（本课的四步重构）</p>
      <Seg name="pc-step" label="论证的第几步" value={st.step} opts={STEPS.map((s, i) => [i, `第${s.n}步`] as const)} onPick={(v) => set({ step: v })} />
      <svg className="c7-cycle" viewBox="0 0 560 235" role="img" aria-label={`认识的循环：实践、感性认识、理性认识、再实践，循环往复。当前是第${step.n}步。`}>
        <defs>
          <marker id="pc-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>
        {ARROWS.map((a, i) => (
          <g key={i} style={{ color: i === step.arrow ? 'var(--accent)' : 'var(--ink-3)' }}>
            <path className={'c7-arrow' + (i === step.arrow ? ' is-on' : '')} d={a.d} markerEnd="url(#pc-arr)" />
            {a.cap && (
              <text className="c7-cap" x={a.cx} y={a.cy} textAnchor="middle">
                {a.cap}
              </text>
            )}
          </g>
        ))}
        {NODES.map((n) => (
          <g key={n.id} className={'c7-node' + (step.nodes.includes(n.id) ? ' is-on' : '')}>
            <rect x={n.x} y={n.y} width={W} height={H} />
            <text x={n.x + W / 2} y={n.y + 26} textAnchor="middle">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div aria-live="polite">
        <p>
          <Tag b="course" who="四步重构" />
          <b>第{step.n}步：</b>
          {step.text}
          {step.inline && <> 原文：{step.inline}。</>}
        </p>
        {step.quote && <Quote src={step.quote.src} orig={step.quote.orig} zh={step.quote.zh} />}
        <Seg name="pc-ex" label="选择一个例子" value={ex.id} opts={EX.map((e) => [e.id, e.label] as const)} onPick={(v) => set({ ex: v })} />
        <p>
          <Tag b={ex.b} />
          {ex.steps[st.step] ?? ex.steps[0]}
        </p>
      </div>
      <p className="md-muted">"变革"这个词很重要：毛泽东说的不只是经验（看一看、尝一尝），而是在改变外物的过程中获得认识。这把他和丁文江、金岳霖区别开来：他们讨论的是感觉和外物的关系，毛泽东把行动放在了认识的起点上。</p>

      <p className="c3-layer-k">第三步的困难：实践的结果由谁来判断？</p>
      <div className="c5-rows">
        {JUDGE.map((j) => {
          const v = st.judge[j.id];
          return (
            <div key={j.id} className="c5-row">
              <p>{j.q}</p>
              <Seg
                name={`pc-judge-${j.id}`}
                label={j.q}
                value={v ?? null}
                opts={[
                  ['clear', '原则上可以分清'],
                  ['unclear', '往往分不清'],
                ]}
                onPick={(x) => set({ judge: { ...st.judge, [j.id]: x } })}
              />
              {v && (
                <p aria-live="polite">
                  <span className={'c5-verdict ' + (v === j.key ? 'c5-verdict--ok' : 'c5-verdict--no')}>{v === j.key ? '和本课的分析一致' : '本课的分析不同'}</span>
                  {j.why}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="c3-layer-k">二 · 《矛盾论》的三个论点</p>
      <Seg name="pc-th" label="选择一个论点" value={th.id} opts={THESES.map((t) => [t.id, t.tab] as const)} onPick={(v) => set({ th: v })} />
      <Quote src={th.quote.src} orig={th.quote.orig} zh={th.quote.zh} />
      <div className="c7-layers">
        <div className="c7-layer">
          <p className="c7-layer-h">论证</p>
          <p>
            <Tag b="text" />
            {th.arg}
          </p>
        </div>
        <div className="c7-layer">
          <p className="c7-layer-h">例子</p>
          <p>
            <Tag b={th.example.b} />
            {th.example.t}
          </p>
        </div>
        <div className="c7-layer">
          <p className="c7-layer-h">它提出的哲学问题</p>
          <p>
            <Tag b="course" />
            {th.phil}
          </p>
        </div>
        <div className="c7-layer is-limit">
          <p className="c7-layer-h">后来的应用</p>
          <p>
            <Tag b={th.use.b} />
            {th.use.t}
          </p>
        </div>
      </div>

      <p className="c3-layer-k">三 · 论证、应用还是政治？</p>
      <p className="md-muted">这是本课的分析框架；在实际文本中三个层次常常交织在一起，有的条目跨两个层次。</p>
      <div className="c5-rows">
        {CARDS.map((c) => {
          const v = st.lv[c.id];
          return (
            <div key={c.id} className="c5-row">
              <p>{c.t}</p>
              <Seg name={`pc-lv-${c.id}`} label={c.t} value={v ?? null} opts={LV} onPick={(x) => set({ lv: { ...st.lv, [c.id]: x }, checked: false })} />
              {st.checked && v && (
                <p aria-live="polite">
                  <span className={'c5-verdict ' + (c.ok.includes(v) ? 'c5-verdict--ok' : 'c5-verdict--no')}>
                    {c.ok.includes(v) ? (c.ok.length > 1 ? '可以这样放（它跨两个层次）' : '和本课的分法一致') : `本课放在${c.ok.map((k) => LV.find((l) => l[0] === k)![1]).join('和')}`}
                  </span>
                  {c.why}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <button type="button" className="md-disclose" disabled={!allPlaced} onClick={() => set({ checked: true })}>
        核对
      </button>
      {st.checked && <p className="md-feedback">三个层次之间有联系，但不能互相代替。一个读者可以认为"认识来源于实践"是有价值的哲学论点，同时批评它在政治上被用来压制不同的意见；也可以承认这些文本在历史上的巨大作用，同时认为它们的论证有严重的困难。</p>}

      <p className="c3-layer-k">四 · 同一个论点，三种处境</p>
      <Seg name="pc-time" label="选择一个时期" value={time.id} opts={TIMES.map((t) => [t.id, t.tab] as const)} onPick={(v) => set({ time: v })} />
      <div aria-live="polite">
        <p>{time.t}</p>
        {time.quote && <Quote src={time.quote.src} orig={time.quote.orig} />}
      </div>
      <p className="md-muted">本课的看法：一个哲学论点可以在不同的政治处境中发挥完全相反的作用。这正是要区分论证、应用和政治的理由。</p>

      <Limits>
        <p>引文出自《毛泽东选集》第一卷所载的文本（1950年代修订过，不是1937年讲课时的原貌）。"四步重构"是本课对论证的整理，不是原文的分段；两个补充的例子都标明了是本课的例子。</p>
        <p>这个工具不评判这些文本的政治地位，也不要求记住任何表述。它只帮助把一个论证的前提、困难和后来的用途分开来看。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

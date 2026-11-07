import { useState, type KeyboardEvent } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import '../gr1/gr1.css';
import './gr2.css';

// 五 · after the chapter's discussion of what the Cave is not. A flat SVG
// scene (no animation) is walked through stage by stage: prisoners and
// shadows, objects and firelight, the turning, the ascent, the outside, the
// return, and Socrates' own reading (education as turning, the Good, the
// command to go back down). A closing check asks which features of a
// "misinformation" reading fit the allegory. Stephanus references and Greek
// are those the chapter quotes and has checked (Perseus, Burnet); Chinese is
// the chapter's wording (content/GR2_SAMPLE_DRAFT.md, 五).

type Part = 'prisoners' | 'shadows' | 'carriers' | 'fire' | 'passage' | 'outside' | 'sun';
interface Grc {
  ref: string;
  text: string;
  zh: string;
}
interface Stage {
  k: string;
  ref: string;
  zh: string;
  hi: Part[];
  /** Where the freed prisoner stands. */
  at: 'chained' | 'turned' | 'climbing' | 'outside' | 'back';
  reading: string;
  grc?: Grc;
}

const STAGES: Stage[] = [
  {
    k: '囚徒与影子',
    ref: '514a—515a',
    zh: '有一些人从小住在地下的洞穴里，手脚和脖子都被锁住，只能看着前面的洞壁。格劳孔说，这些囚徒很奇怪。苏格拉底回答："他们和我们一样。"',
    hi: ['prisoners', 'shadows'],
    at: 'chained',
    reading: '比喻从"我们"开始：它首先说的是人的处境和天性，而不是某一群特别容易受骗的人。',
    grc: { ref: '514a', text: 'μετὰ ταῦτα δή, εἶπον, ἀπείκασον τοιούτῳ πάθει τὴν ἡμετέραν φύσιν παιδείας τε πέρι καὶ ἀπαιδευσίας.', zh: '接下来，我说，请你把我们的天性在受教育和不受教育方面的情形，比作下面这种情况。' },
  },
  {
    k: '器物与火光',
    ref: '514b—515a',
    zh: '囚徒身后上方燃着一堆火；火和囚徒之间有一道矮墙，墙后有人举着各种人造的器物走过，器物的影子投在洞壁上。举着器物的人，有的在说话，有的沉默。',
    hi: ['carriers', 'fire', 'shadows'],
    at: 'chained',
    reading: '柏拉图没有说墙后的人是有意骗人的。他们代表什么（诗人？政治家？智者？），学者有不同的猜测。比喻的重点在囚徒的处境。',
  },
  {
    k: '转身',
    ref: '515c—e',
    zh: '如果有一个囚徒被解开锁链，被迫转过身来看火光，他会感到刺眼和痛苦，会认为原来看到的影子比现在给他看的东西更真实。',
    hi: ['fire', 'carriers'],
    at: 'turned',
    reading: '转向是痛苦的，而且一开始会被抗拒。被解放的人并不是自己主动要求更多信息的。',
  },
  {
    k: '上升',
    ref: '515e—516b',
    zh: '再把他强行拉出洞口。到了阳光下，他一开始什么也看不见，要慢慢地先看影子和倒影，再看事物本身，再看夜空，最后才能看太阳本身。',
    hi: ['passage', 'outside'],
    at: 'climbing',
    reading: '上升是循序渐进的，需要时间和训练。第七卷接着讨论的课程（算术、几何、天文、和声，最后是辩证法）就是这个上升的教育内容。',
  },
  {
    k: '洞外与太阳',
    ref: '516b—c，517b',
    zh: '最后，他能看太阳本身，并推断太阳是季节和年岁的原因，统治着可见领域中的一切。苏格拉底的解释：向上的攀登是灵魂向可思领域的上升；最后看到的是善的理型。',
    hi: ['outside', 'sun'],
    at: 'outside',
    reading: '洞外的事物对应的是理型，太阳对应的是善。所以"走出洞穴"不是从虚拟世界回到物理世界，而是从可见的世界上升到可思的理型。',
    grc: {
      ref: '517b',
      text: 'τὴν μὲν διʼ ὄψεως φαινομένην ἕδραν τῇ τοῦ δεσμωτηρίου οἰκήσει ἀφομοιοῦντα, τὸ δὲ τοῦ πυρὸς ἐν αὐτῇ φῶς τῇ τοῦ ἡλίου δυνάμει· τὴν δὲ ἄνω ἀνάβασιν καὶ θέαν τῶν ἄνω τὴν εἰς τὸν νοητὸν τόπον τῆς ψυχῆς ἄνοδον τιθεὶς οὐχ ἁμαρτήσῃ τῆς γʼ ἐμῆς ἐλπίδος ... θεὸς δέ που οἶδεν εἰ ἀληθὴς οὖσα τυγχάνει.',
      zh: '把通过视觉显现的那个居所比作囚室，把其中的火光比作太阳的力量；把向上的攀登和对上面事物的观看，当作灵魂向可思领域的上升，那么你就不会误解我的期望……至于它是否真实，大概只有神知道。',
    },
  },
  {
    k: '回返',
    ref: '516e—517a，519c—520c',
    zh: '如果他回到洞里，眼睛一时不适应黑暗，在辨认影子的比赛中输给别人，别人会嘲笑他；如果他想带别人上去，他们甚至会杀死他。可是城邦的创立者不允许走出洞穴的人留在上面：他们要轮流下去。',
    hi: ['prisoners', 'shadows'],
    at: 'back',
    reading: '比喻的结尾是政治的：走出洞穴的少数人应当回来统治，"不是把它当作一件美好的事，而是当作一件必要的事"（540b）。这对哲学家是否公平，是《理想国》研究中的经典问题。',
    grc: { ref: '520c', text: 'καταβατέον οὖν ἐν μέρει ἑκάστῳ εἰς τὴν τῶν ἄλλων συνοίκησιν καὶ συνεθιστέον τὰ σκοτεινὰ θεάσασθαι', zh: '所以，你们每个人都要轮流下去，到其他人共同居住的地方去，并且要习惯于观看黑暗中的东西。' },
  },
  {
    k: '教育是转向',
    ref: '518b—d，521c',
    zh: '教育并不是把知识放进本来没有知识的灵魂，就像把视力放进瞎了的眼睛。每个人的灵魂里本来就有学习的能力，问题在于它朝着哪个方向。教育是"转向的技艺"。',
    hi: ['fire', 'passage'],
    at: 'turned',
    reading: '这就是比喻开头那句话的意思：它首先是一个关于教育（παιδεία）的比喻。它把教育、善和政治责任连在一起：转向需要长期的训练，最终看到善，然后回来承担治理的责任。',
    grc: { ref: '518b—c', text: 'τὴν παιδείαν οὐχ οἵαν τινὲς ἐπαγγελλόμενοί φασιν εἶναι τοιαύτην καὶ εἶναι. φασὶ δέ που οὐκ ἐνούσης ἐν τῇ ψυχῇ ἐπιστήμης σφεῖς ἐντιθέναι, οἷον τυφλοῖς ὀφθαλμοῖς ὄψιν ἐντιθέντες.', zh: '教育并不是某些自称教育家的人所宣称的那样。他们说，灵魂里本来没有知识，他们能把知识放进去，就好像把视力放进瞎了的眼睛里一样。' },
  },
];

const CHECKS: { id: string; t: string; fit: boolean; fb: string }[] = [
  { id: 'unaware', t: '囚徒不知道自己看到的是影子，被带离时一开始还会抗拒', fit: true, fb: '相合（515c—e）。这一点确实可以和今天的许多现象相比。' },
  { id: 'liars', t: '墙后举着器物的人，是有意制造假象的操纵者', fit: false, fb: '不相合。柏拉图只说他们"有的在说话，有的沉默"（515a），没有把他们写成阴谋的策划者。' },
  { id: 'info', t: '走出洞穴的办法，是得到更多、更准确的信息', fit: false, fb: '不相合。需要的不是更真的影子，而是转向：长期的数学和辩证法训练，最终转向善。' },
  { id: 'world', t: '洞外是真实的物质世界', fit: false, fb: '不相合。洞内的火和器物对应可见的世界，洞外的事物对应理型。' },
  { id: 'everyone', t: '比喻的结论是：每个人都应当独立思考，自己走出洞穴', fit: false, fb: '不相合。比喻的结论是：走出洞穴的少数人应当回来统治（520c）。这种现代用法是一种重新使用，与原来带有等级色彩的结论之间有张力。' },
];

const ID = 'cave-explorer';
type Saved = { stage: number; checks: Record<string, 'y' | 'n'> };

/** Simple standing / seated figure; no motion. */
function Person({ x, y, face = 'l', seated = false }: { x: number; y: number; face?: 'l' | 'r'; seated?: boolean }) {
  const d = face === 'l' ? -1 : 1;
  return (
    <g className="cv-person">
      <circle cx={x} cy={y - (seated ? 24 : 36)} r="6" />
      <path d={seated ? `M${x} ${y - 18} L${x} ${y - 4} L${x + 12 * d} ${y - 4}` : `M${x} ${y - 30} L${x} ${y - 10} M${x} ${y - 10} L${x - 5} ${y} M${x} ${y - 10} L${x + 5} ${y}`} />
    </g>
  );
}

export default function CaveExplorer() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('GR2', ID, { stage: 0, checks: {} }));
  const [showGrc, setShowGrc] = useState(false);
  const i = Math.max(0, Math.min(STAGES.length - 1, st.stage));
  const s = STAGES[i];
  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR2', ID, next);
  };
  const go = (n: number) => {
    save({ ...st, stage: Math.max(0, Math.min(STAGES.length - 1, n)) });
    setShowGrc(false);
  };
  const onKey = (e: KeyboardEvent<HTMLOListElement>) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const t = Math.max(0, Math.min(STAGES.length - 1, i + d));
    go(t);
    e.currentTarget.querySelectorAll('button')[t]?.focus();
  };
  const hi = (p: Part) => (s.hi.includes(p) ? ' is-hi' : '');
  const freed = { chained: [118, 250, 'l', true], turned: [150, 250, 'r', false], climbing: [430, 168, 'r', false], outside: [560, 104, 'r', false], back: [150, 250, 'l', false] } as const;
  const [fx, fy, ff, fs] = freed[s.at];

  return (
    <section className="md lw cv" aria-labelledby="cv-title">
      <header className="md-head">
        <p className="md-tag">看一看结构</p>
        <h3 id="cv-title" className="md-title">
          洞穴的比喻：转向、上升与回返
        </h3>
        <p className="md-lede">
          一步一步地看比喻的各个部分，以及苏格拉底自己怎样解释它们。图是一张静态示意，只标出每一步说到的部分。最后，检验一下把洞穴比喻用于"虚假信息"时，哪些地方相合，哪些地方不相合。
        </p>
      </header>

      <figure className="cv-fig">
        <svg viewBox="0 0 640 290" className="cv-svg" role="img" aria-label={`洞穴示意图，当前一步：${s.k}`}>
          {/* outside world */}
          <g className={'cv-part' + hi('outside')}>
            <path d="M470 110 L640 110" className="cv-ground" />
            <path d="M600 110 L600 84 M600 74 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0" className="cv-tree" />
            <path d="M500 118 q10 4 20 0" className="cv-water" />
          </g>
          <g className={'cv-part' + hi('sun')}>
            <circle cx="590" cy="34" r="16" className="cv-sun" />
          </g>
          {/* cave body and passage */}
          <path d="M10 280 L10 130 Q10 110 40 110 L330 110 L470 110 L470 120 L360 270 L360 280 Z" className="cv-cave" />
          <g className={'cv-part' + hi('passage')}>
            <path d="M330 270 L460 116" className="cv-pass" />
          </g>
          {/* back wall and shadows */}
          <g className={'cv-part' + hi('shadows')}>
            <path d="M22 140 L22 270" className="cv-wall" />
            <path d="M30 200 l10 -18 l10 18 z M58 196 h18 v12 h-18 z" className="cv-shadow" />
          </g>
          {/* prisoners */}
          <g className={'cv-part' + hi('prisoners')}>
            <Person x={90} y={250} seated />
            <Person x={150} y={250} seated />
            <path d="M80 254 L170 254" className="cv-chain" />
          </g>
          {/* low wall, carriers and objects */}
          <g className={'cv-part' + hi('carriers')}>
            <path d="M200 270 L200 226 L240 226 L240 270" className="cv-low" />
            <Person x={252} y={270} face="l" />
            <path d="M232 214 l8 -14 l8 14 z" className="cv-obj" />
          </g>
          {/* fire */}
          <g className={'cv-part' + hi('fire')}>
            <path d="M300 270 q-12 -20 0 -40 q12 20 0 40 z" className="cv-fire" />
          </g>
          {/* the freed prisoner */}
          <g className="cv-freed">
            <Person x={fx} y={fy} face={ff} seated={fs} />
          </g>
          <text x="40" y="132" className="cv-lbl">
            洞壁
          </text>
          <text x="196" y="218" className="cv-lbl">
            矮墙
          </text>
          <text x="288" y="224" className="cv-lbl">
            火
          </text>
          <text x="560" y="64" className="cv-lbl">
            太阳
          </text>
        </svg>
        <figcaption className="md-note">示意图，不按比例；被解放的那个人用强调色标出。</figcaption>
      </figure>

      <ol className="lw-steps" aria-label="比喻的步骤" onKeyDown={onKey}>
        {STAGES.map((x, n) => (
          <li key={n}>
            <button type="button" className={'lw-step' + (n === i ? ' is-cur' : '') + (n < i ? ' is-done' : '')} aria-current={n === i ? 'step' : undefined} onClick={() => go(n)}>
              <span className="lw-n">{n + 1}</span>
              <span className="lw-ref">{x.ref.split('，')[0]}</span>
              <span className="lw-kind">{x.k}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="lw-move" aria-live="polite">
        <p className="lw-who">
          <span className="lw-ref-l">《理想国》{s.ref}</span>
          {s.k}
        </p>
        <p className="lw-zh">{s.zh}</p>
        <p className="cv-reading">
          <b>怎样理解：</b>
          {s.reading}
        </p>
        {s.grc && (
          <>
            <button type="button" className="md-disclose" aria-expanded={showGrc} onClick={() => setShowGrc(!showGrc)}>
              {showGrc ? '收起希腊原文' : '看希腊原文'}
            </button>
            {showGrc && (
              <div className="lw-grc">
                <p className="pe-src">{s.grc.ref}</p>
                <p className="pe-orig" lang="grc">
                  {s.grc.text}
                </p>
                <p className="pe-zh">本章试译：{s.grc.zh}</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="lw-nav">
        <button type="button" className="btn btn--small" onClick={() => go(i - 1)} disabled={i === 0}>
          ← 上一步
        </button>
        <button type="button" className="btn btn--small" onClick={() => go(i + 1)} disabled={i === STAGES.length - 1}>
          下一步 →
        </button>
      </div>

      <fieldset className="cs-group lw-cases">
        <legend>有人用洞穴比喻来说明"网络上的虚假信息"。下面每一点，与柏拉图的比喻相合吗？</legend>
        {CHECKS.map((c) => {
          const v = st.checks[c.id];
          return (
            <div key={c.id} className="lw-case">
              <p className="lw-case-t">{c.t}</p>
              <div className="md-seg">
                {(
                  [
                    ['y', '相合'],
                    ['n', '不相合'],
                  ] as const
                ).map(([k, l]) => (
                  <label key={k} className={'md-seg-opt' + (v === k ? ' is-on' : '')}>
                    <input type="radio" name={'cv-' + c.id} checked={v === k} onChange={() => save({ ...st, checks: { ...st.checks, [c.id]: k } })} />
                    <span>{l}</span>
                  </label>
                ))}
              </div>
              {v && (
                <p className="lw-cover" aria-live="polite">
                  {(v === 'y') === c.fit ? '' : '再想一想：'}
                  {c.fb}
                </p>
              )}
            </div>
          );
        })}
      </fieldset>

      <div className="md-feedback">
        <p className="md-fb-k">所以，洞穴比喻不只是一个关于虚假信息的比喻。</p>
        <p>它说的是教育怎样使整个灵魂转向，转向的终点是善，而看到善的人要回来承担政治责任。把它用于新的问题是正当的，但要清楚哪些是柏拉图说的，哪些是我们借它来说的。</p>
        <button type="button" className="md-reset" onClick={() => save({ stage: 0, checks: {} })}>
          从头再来
        </button>
      </div>

      <p className="md-note">
        <b>限度。</b>图中各部分的位置和样子是本课的示意，不是对原文的精确再现。洞穴中的各个阶段是否与线段的四段一一对应，是一个长期有争议的问题，这里没有采用任何一种对应。
      </p>
    </section>
  );
}

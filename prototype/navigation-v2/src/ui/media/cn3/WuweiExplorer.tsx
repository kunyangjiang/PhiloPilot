import { Gu, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import './cn3.css';

// 二 · after "这三个例子共同说明". A modern teaching reconstruction, built on
// the chapter's own three examples (bicycle, garden, discussion) and its own
// counter-case (an epidemic). The learner picks how and when to intervene; the
// chart shows a range, not a forecast, and the three conditions the chapter
// names are checked for each example. Nothing here is a claim about what the
// Laozi says of bicycles or epidemics; the two passages shown are the
// chapter's checked quotations.

const ID = 'wuwei-explorer';
type Sc = 'bike' | 'garden' | 'forum' | 'epidemic';
type Mode = 'none' | 'light' | 'heavy';
type When = 'early' | 'late';
type Verdict = 'help' | 'block' | 'short' | 'mixed';
interface Saved {
  sc: Sc;
  mode: Mode;
  when: When;
  seen: Sc[];
}
const INIT: Saved = { sc: 'bike', mode: 'none', when: 'early', seen: ['bike'] };

type Combo = 'none' | 'light-early' | 'light-late' | 'heavy-early' | 'heavy-late';
interface Scenario {
  t: string;
  y: string;
  conds: [boolean, boolean, boolean];
  condNote: string;
  limit: string;
  runs: Record<Combo, { pts: number[]; v: Verdict; say: string }>;
}

const SC: Record<Sc, Scenario> = {
  bike: {
    t: '学骑自行车',
    y: '孩子自己保持平衡的能力',
    conds: [true, true, true],
    condNote: '孩子自己有学会的趋向；父母清楚什么时候该出手；场地安全。',
    limit: '父母和孩子的目标一致，父母也清楚地知道什么时候该出手。政治中的情形通常没有这么简单。',
    runs: {
      none: { pts: [10, 16, 26, 36, 44, 52], v: 'mixed', say: '可能自己学会，也可能摔怕了就放弃：结果很分散。' },
      'light-early': { pts: [10, 26, 46, 64, 78, 88], v: 'help', say: '开始扶一下，逐渐放手，只在快要摔倒时出手：能力在不被替代的情况下形成。' },
      'light-late': { pts: [10, 15, 24, 42, 58, 70], v: 'help', say: '仍然有帮助，但孩子已经摔过几次，要多花些时间重新建立信心。' },
      'heavy-early': { pts: [10, 30, 40, 44, 46, 48], v: 'block', say: '一直紧紧扶着：起初看起来很稳，但孩子学不会自己保持平衡。外力在某个阶段之后变成了阻碍。' },
      'heavy-late': { pts: [10, 16, 26, 34, 38, 40], v: 'block', say: '摔过以后改为处处扶着：孩子依赖外力，自己的能力停在原地。' },
    },
  },
  garden: {
    t: '照料一片植物',
    y: '植物的长势',
    conds: [true, true, true],
    condNote: '植物自己会生长；园丁了解它们的节律；水、土、光这些基本条件具备。',
    limit: '植物没有自己的意见。把人比作植物，容易让统治者把人民看成需要被照料的对象，而不是能为自己做判断的人。',
    runs: {
      none: { pts: [20, 30, 36, 40, 40, 38], v: 'mixed', say: '完全不管：杂草和干旱可能压过植物自己的生长。' },
      'light-early': { pts: [20, 34, 52, 68, 80, 86], v: 'help', say: '在植物自己生长的节律中做恰当的事：及时浇水、除草，然后让它长。' },
      'light-late': { pts: [20, 28, 34, 48, 60, 66], v: 'help', say: '晚一些开始照料，仍有帮助，但已经损失的长势补不回来。' },
      'heavy-early': { pts: [20, 38, 36, 30, 26, 24], v: 'block', say: '过多的施肥会"烧"死植物，频繁移栽让根系无法扎稳：看起来很勤快，结果相反（"為者敗之"）。' },
      'heavy-late': { pts: [20, 28, 33, 30, 26, 24], v: 'block', say: '发现长得不好，就大量施肥、反复移栽：问题被干预本身加重了。' },
    },
  },
  forum: {
    t: '主持一场讨论',
    y: '大家参与讨论的程度',
    conds: [true, true, true],
    condNote: '参与者愿意讨论；主持人能判断关键时刻；轮流发言、不人身攻击等基本规则已经具备。',
    limit: '主持人"做很少的事"，前提是会议已经有了基本规则；这些规则本身是"有为"的产物。《老子》的论证往往不谈这个前提。',
    runs: {
      none: { pts: [40, 46, 42, 38, 35, 34], v: 'mixed', say: '完全不管：讨论可能被少数人占据。' },
      'light-early': { pts: [40, 52, 62, 70, 75, 78], v: 'help', say: '只在关键时刻提一个问题、请一个还没发言的人说话：大家觉得是"我们自己讨论出来的"。' },
      'light-late': { pts: [40, 44, 40, 50, 58, 62], v: 'help', say: '少数人已经占据了讨论再出手，仍能改善，但要先扭转已经形成的局面。' },
      'heavy-early': { pts: [40, 38, 30, 24, 20, 18], v: 'block', say: '每一句都插话、纠正、总结：大家就不愿意说话了。' },
      'heavy-late': { pts: [40, 45, 40, 30, 24, 20], v: 'block', say: '中途接管讨论，逐句纠正：参与反而更少。' },
    },
  },
  epidemic: {
    t: '一场传染病的扩散',
    y: '疫情得到控制的程度',
    conds: [false, true, true],
    condNote: '事物自身的趋向是坏的：不加干预，传染会扩大。第一个条件不成立。',
    limit: '这是正文举出的反例：当事物自身的趋向是坏的，或者干预者无法判断时机，"无为"就未必是好建议。第六部分会看到，《淮南子》已经提出了类似的批评。',
    runs: {
      none: { pts: [90, 80, 62, 42, 26, 16], v: 'block', say: '不出手：传染按自己的趋向扩大。在这里，"少干预"不是好建议。' },
      'light-early': { pts: [90, 86, 78, 66, 54, 44], v: 'short', say: '早而少：比不出手好，但不足以扭转一个坏的趋向。' },
      'light-late': { pts: [90, 80, 64, 46, 32, 24], v: 'short', say: '晚而少：几乎没有改变过程。' },
      'heavy-early': { pts: [90, 88, 86, 85, 84, 84], v: 'help', say: '早而有力的干预：在趋势还小的时候改变了过程。这里需要的是"有为"。' },
      'heavy-late': { pts: [90, 80, 62, 50, 48, 50], v: 'short', say: '晚而有力：能止住一部分，但已经发生的扩散收不回来。' },
    },
  },
};

const V_T: Record<Verdict, string> = { help: '帮助了过程', block: '阻碍了过程', short: '改变了过程，但不够', mixed: '结果很难说' };
const CONDS = ['事物自身有良好的发展趋向', '干预者有足够的判断力', '基本的条件已经具备'];

// chart frame
const X0 = 64;
const X1 = 612;
const Y0 = 22;
const Y1 = 214;
const px = (i: number) => X0 + ((X1 - X0) * i) / 5;
const py = (v: number) => Y1 - ((Y1 - Y0) * v) / 100;
const band = (pts: number[], w: number) => {
  const up = pts.map((v, i) => `${px(i)},${py(Math.min(100, v + w))}`);
  const dn = pts.map((v, i) => `${px(i)},${py(Math.max(0, v - w))}`).reverse();
  return 'M' + up.join(' L') + ' L' + dn.join(' L') + ' Z';
};
const linePath = (pts: number[]) => 'M' + pts.map((v, i) => `${px(i)},${py(v)}`).join(' L');

export default function WuweiExplorer() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => {
    const next = { ...st, ...p };
    if (!next.seen.includes(next.sc)) next.seen = [...next.seen, next.sc];
    save(next);
  };
  const sc = SC[st.sc];
  const combo: Combo = st.mode === 'none' ? 'none' : (`${st.mode}-${st.when}` as Combo);
  const run = sc.runs[combo];
  const base = sc.runs.none.pts;
  const wide = st.mode === 'none' ? 14 : 9;
  const start = st.when === 'early' ? 0.5 : 2.5;
  const ticks = st.mode === 'none' ? [] : st.mode === 'light' ? [start, start + 1.2] : Array.from({ length: Math.round((5 - start) / 0.25) }, (_, i) => start + i * 0.25);
  const allConds = sc.conds.every(Boolean);

  return (
    <section className="md c3" aria-labelledby="ww-title">
      <header className="md-head">
        <p className="md-tag">现代教学重构</p>
        <h3 id="ww-title" className="md-title">
          无为与干预：什么时候少做是好建议？
        </h3>
        <p className="md-lede">
          选一个例子，再选干预的方式和时机，看过程可能怎样变化。例子和图都是本课为了教学构造的，不是《老子》的说法；图中的色带表示一个大致的范围，不是预测。
        </p>
      </header>

      <div className="c3-two">
        <Gu src="《老子》第六十四章（王弼本）" orig="其安易持，其未兆易謀。其脆易泮，其微易散。" zh="局面安定的时候容易维持，事情还没有征兆的时候容易谋划；脆弱的东西容易分解，细微的东西容易散去。" />
        <Gu src="《老子》第二十九章（王弼本，节选）" orig="天下神器，不可為也，為者敗之，執者失之。" zh="天下是一件神妙的器物，不能对它强行作为；强行作为的人会把它弄坏，抓住不放的人会失去它。" />
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">一、选一个例子（本课的例子）</p>
        <Seg name="ww-sc" label="例子" value={st.sc} opts={(Object.keys(SC) as Sc[]).map((k) => [k, SC[k].t] as const)} onPick={(v) => set({ sc: v })} />
        <div className="c2-ctl c3-ctl">
          <div>
            <p className="g4-k">干预的方式</p>
            <Seg
              name="ww-mode"
              label="干预的方式"
              col
              value={st.mode}
              opts={[
                ['none', '不出手'],
                ['light', '少而及时：只在关键时刻做很少的事'],
                ['heavy', '处处插手：持续而有力的干预'],
              ]}
              onPick={(v) => set({ mode: v })}
            />
          </div>
          <div>
            <p className="g4-k">时机</p>
            <Seg
              name="ww-when"
              label="干预的时机"
              col
              value={st.mode === 'none' ? null : st.when}
              opts={[
                ['early', '趋势还小的时候（"其未兆"）'],
                ['late', '问题已经显现以后'],
              ]}
              onPick={(v) => set({ when: v, mode: st.mode === 'none' ? 'light' : st.mode })}
            />
            {st.mode === 'none' && <p className="md-muted">不出手时，时机无从谈起；选一个时机会改为"少而及时"。</p>}
          </div>
        </div>
      </div>

      <figure className="c3-fig">
        <svg viewBox="0 0 640 262" className="c3-svg" role="img" aria-label={`${sc.t}：${sc.y}随时间的大致变化。${V_T[run.v]}。${run.say}`}>
          <line className="c3-axis" x1={X0} y1={Y1} x2={X1} y2={Y1} />
          <line className="c3-axis" x1={X0} y1={Y0} x2={X0} y2={Y1} />
          <text className="c2-lbl" x={X0 - 8} y={Y0 + 10} textAnchor="end">
            好
          </text>
          <text className="c2-lbl" x={X0 - 8} y={Y1} textAnchor="end">
            差
          </text>
          <text className="c2-lbl" x={X1} y={Y1 + 20} textAnchor="end">
            时间 →
          </text>
          <text className="c2-lbl" x={X0 + 6} y={Y1 + 20}>
            {sc.y}（示意）
          </text>
          {st.mode !== 'none' && <path className="c3-base" d={linePath(base)} />}
          <path className="c3-band c3-morph" d={band(run.pts, wide)} />
          <path className="c3-run c3-morph" d={linePath(run.pts)} />
          {ticks.map((t) => (
            <line key={t} className={'c3-tick' + (st.mode === 'heavy' ? ' c3-tick--heavy' : '')} x1={px(t)} y1={Y1 - 10} x2={px(t)} y2={Y1 + 4} />
          ))}
          <text className="c2-lbl c2-lbl--big c3-verdict" x={X1 - 4} y={Math.max(Y0 + 16, py(run.pts[5]) - 16)} textAnchor="end">
            {V_T[run.v]}
          </text>
        </svg>
        <figcaption className="c3-legend">
          <span>
            <i className="c3-key c3-key--run" /> 这样干预以后（色带是大致范围）
          </span>
          {st.mode !== 'none' && (
            <span>
              <i className="c3-key c3-key--base" /> 不出手时的趋势
            </span>
          )}
          {st.mode !== 'none' && (
            <span>
              <i className="c3-key c3-key--tick" /> 干预的时刻
            </span>
          )}
        </figcaption>
      </figure>

      <div className="md-feedback" aria-live="polite">
        <p className="md-fb-k">
          {sc.t} · {st.mode === 'none' ? '不出手' : `${st.mode === 'light' ? '少而及时' : '处处插手'}，${st.when === 'early' ? '趋势还小的时候' : '问题显现以后'}`}：{V_T[run.v]}
        </p>
        <p>{run.say}</p>
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">二、正文说的三个条件，在这个例子里成立吗？</p>
        <ul className="c3-conds">
          {CONDS.map((c, i) => (
            <li key={c} className={sc.conds[i] ? 'is-ok' : 'is-no'}>
              <span className="c3-cond-mark">{sc.conds[i] ? '成立' : '不成立'}</span> {c}
            </li>
          ))}
        </ul>
        <p>{sc.condNote}</p>
        <p>
          {allConds
            ? '三个条件都具备，"少而及时"在这里是好建议。注意它不是"什么都不做"：不出手和处处插手，结果都不如它。'
            : '有一个条件不成立，"少干预"就不再是好建议；这里需要的是及早而有力的行动。这也说明，"无为"不是一条在任何情况下都正确的规则。'}
        </p>
        <p className="c3-cost">
          <b>这个例子的限度：</b>
          {sc.limit}
        </p>
      </div>

      {st.seen.length >= 4 && (
        <div className="md-feedback">
          <p className="md-fb-k">四个例子都看过了</p>
          <p>
            正文的结论是："无为"作为一种行动的方式，在事物自身有良好的发展趋向、干预者有足够的判断力、基本的条件已经具备这三个条件下，是很好的建议。它反对的是强加的、违背事物趋向的作为，而不是一切行动；它要求很早就看到趋势，在趋势还很小的时候做很少的事。
          </p>
        </div>
      )}

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

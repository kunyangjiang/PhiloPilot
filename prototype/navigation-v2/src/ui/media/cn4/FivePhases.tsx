import { Gu, Limits, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import './cn4.css';

// 四 · after the correspondence table and its two remarks ("第二，它不是一套统一的系统").
// The two cycles drawn on one ring, the 時則訓 rows of the chapter's table for
// the chosen phase, the later medical organ mapping beside the 時則訓 organs,
// and two historical uses quoted in the chapter (Qin's 水德, the 時令). It
// presents a historical classification system, not chemistry or physiology.

const ID = 'five-phases';
type P = '木' | '火' | '土' | '金' | '水';
type Show = 'sheng' | 'sheng-ke' | 'ke';
type Ex = 'qin' | 'shiling';
interface Saved {
  phase: P;
  show: Show;
  organs: boolean;
  ex: Ex | null;
  q: P | null;
}
const INIT: Saved = { phase: '木', show: 'sheng-ke', organs: false, ex: null, q: null };

const SHENG: P[] = ['木', '火', '土', '金', '水']; // 木→火→土→金→水→木
const KE: [P, P][] = [
  ['木', '土'],
  ['土', '水'],
  ['水', '火'],
  ['火', '金'],
  ['金', '木'],
];

// Rows of the chapter's table (《淮南子·时则训》, first month of each season; 土 = 季夏).
const ROW: Record<P, { season: string; dir: string; gan: string; yin: string; num: string; wei: string; ji: string; organ: string; color: string; med: string }> = {
  木: { season: '春', dir: '东方', gan: '甲乙', yin: '角', num: '八', wei: '酸', ji: '户', organ: '脾', color: '青', med: '肝' },
  火: { season: '夏', dir: '南方', gan: '丙丁', yin: '徵', num: '七', wei: '苦', ji: '灶', organ: '肺', color: '赤', med: '心' },
  土: { season: '季夏', dir: '中央', gan: '戊己', yin: '宫', num: '五', wei: '甘', ji: '中霤', organ: '心', color: '黄', med: '脾' },
  金: { season: '秋', dir: '西方', gan: '庚辛', yin: '商', num: '九', wei: '辛', ji: '门', organ: '肝', color: '白', med: '肺' },
  水: { season: '冬', dir: '北方', gan: '壬癸', yin: '羽', num: '六', wei: '咸', ji: '井', organ: '肾', color: '黑', med: '肾' },
};

// Positions on the ring, in 相生 order clockwise from the top.
const R = 112;
const C = { x: 160, y: 150 };
const XY = Object.fromEntries(
  SHENG.map((p, i) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return [p, { x: C.x + R * Math.cos(a), y: C.y + R * Math.sin(a) }];
  }),
) as Record<P, { x: number; y: number }>;

/** A line from node a to node b, shortened so it starts and ends outside the node circles. */
function seg(a: P, b: P, pad = 30) {
  const A = XY[a];
  const B = XY[b];
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const d = Math.hypot(dx, dy);
  return { x1: A.x + (dx * pad) / d, y1: A.y + (dy * pad) / d, x2: B.x - (dx * pad) / d, y2: B.y - (dy * pad) / d };
}

const EX: Record<Ex, { t: string; src: string; orig: string; zh: string; hi: P[]; arrow?: [P, P]; note: string }> = {
  qin: {
    t: '秦朝的"水德"（五德终始，用的是相胜的次序）',
    src: '《史记·秦始皇本纪》（节引）',
    orig: '始皇推終始五德之傳，以為周得火德，秦代周德，從所不勝。方今水德之始……衣服旄旌節旗皆上黑。數以六為紀……事皆決於法，刻削毋仁恩和義，然後合五德之數。',
    zh: '秦始皇认为周朝得的是火德，秦取代周，应当取火所不能胜的德（水）。衣服旗帜崇尚黑色，数字以六为准则……一切依照法令裁决，这样才符合五德的定数。',
    hi: ['火', '水'],
    arrow: ['水', '火'],
    note: '看对应表"水"一行：颜色黑、数六。秦朝把一整套对应关系变成了制度：衣服的颜色、数字的单位，甚至严法本身，都被说成是水德的要求。这是用一个分类系统来说明政权的正当性，而不是对自然的观察。',
  },
  shiling: {
    t: '时令：春天施行夏天的政令会怎样（用的是季节的对应）',
    src: '《淮南子·时则训》',
    orig: '孟春行夏令，則風雨不時，草木旱落，國乃有恐。',
    zh: '春天的第一个月施行夏天的政令，就会风雨不合时节，草木过早凋落，国家就会有恐慌。',
    hi: ['木', '火'],
    note: '春属木，夏属火。按照时令，君主的政令要和季节（也就是和五行）相配；配错了，就会引起天气和收成的异常。正文把这种说法分成两层：顺应农时有实际道理，"政令引起天气异常"却从来没有被检验过。',
  },
};

export default function FivePhases() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const p = st.phase;
  const i = SHENG.indexOf(p);
  const gives = SHENG[(i + 1) % 5];
  const from = SHENG[(i + 4) % 5];
  const beats = KE.find(([a]) => a === p)![1];
  const beatenBy = KE.find(([, b]) => b === p)![0];
  const showSheng = st.show !== 'ke';
  const showKe = st.show !== 'sheng';
  const ex = st.ex ? EX[st.ex] : null;
  const hot = (q: P) => p === q || (ex?.hi.includes(q) ?? false);

  return (
    <section className="md c3 c4" aria-labelledby="fp-title">
      <header className="md-head">
        <p className="md-tag">结构演示 · 历史上的分类系统</p>
        <h3 id="fp-title" className="md-title">
          五行：两种次序和一张对应表
        </h3>
        <p className="md-lede">
          选一"行"，看它在相生和相胜两个次序里的位置，以及《时则训》把哪些东西归到它下面。再看两个历史上的用法。五行是汉代人整理世界的一套框架，不是化学元素，也不是经过实验确立的因果规律。
        </p>
      </header>

      <div className="g4-panel">
        <Seg
          name="fp-show"
          label="显示哪一种关系"
          value={st.show}
          opts={[
            ['sheng', '只看相生（外圈）'],
            ['sheng-ke', '两种都看'],
            ['ke', '只看相胜（内部的星形）'],
          ]}
          onPick={(v) => set({ show: v })}
        />
      </div>

      <div className="c3-two c3-two--fig">
        <figure className="c3-fig">
          <svg viewBox="0 0 320 300" className="c3-svg c4-fp" role="img" aria-label={`五行的相生与相胜。当前选择：${p}。${p}生${gives}，${from}生${p}；${p}胜${beats}，${beatenBy}胜${p}。`}>
            <defs>
              <marker id="fp-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" className="c4-ah" />
              </marker>
              <marker id="fp-ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" className="c4-ah2" />
              </marker>
            </defs>
            {showSheng &&
              SHENG.map((a, k) => {
                const b = SHENG[(k + 1) % 5];
                const s = seg(a, b);
                const on = a === p || b === p;
                return <line key={'s' + a} {...s} className={'c4-sheng' + (on ? ' is-on' : '')} markerEnd="url(#fp-ah)" />;
              })}
            {showKe &&
              KE.map(([a, b]) => {
                const s = seg(a, b);
                const on = a === p || b === p || (ex?.arrow?.[0] === a && ex.arrow[1] === b);
                return <line key={'k' + a} {...s} className={'c4-ke' + (on ? ' is-on' : '')} markerEnd="url(#fp-ah2)" />;
              })}
            {SHENG.map((q) => (
              <g key={q}>
                <circle cx={XY[q].x} cy={XY[q].y} r={24} className={'c4-node' + (hot(q) ? ' is-on' : '')} />
                <text x={XY[q].x} y={XY[q].y + 7} textAnchor="middle" className={'c4-node-t' + (hot(q) ? ' is-on' : '')}>
                  {q}
                </text>
              </g>
            ))}
          </svg>
          <figcaption className="md-muted">实线箭头：相生（木→火→土→金→水→木）。虚线箭头：相胜（木→土→水→火→金→木）。"比相生而间相胜"：相邻的相生，隔一个的相胜。</figcaption>
        </figure>

        <div>
          <div className="c4-vals c4-vals--wide" role="radiogroup" aria-label="选择一行">
            {SHENG.map((q) => (
              <label key={q} className={'c4-val' + (p === q ? ' is-on' : '')}>
                <input type="radio" name="fp-phase" checked={p === q} onChange={() => set({ phase: q })} />
                <span>{q}</span>
              </label>
            ))}
          </div>
          <div className="c2-card" aria-live="polite">
            <p className="g4-k">{p}在两个次序里</p>
            <p>
              相生：{from}生{p}，{p}生{gives}。相胜：{p}胜{beats}，{beatenBy}胜{p}。
            </p>
            <p className="g4-k">《时则训》归到"{p}"下面的东西</p>
            <dl className="c4-dl">
              <dt>季节</dt>
              <dd>{ROW[p].season}</dd>
              <dt>方位</dt>
              <dd>{ROW[p].dir}</dd>
              <dt>日（天干）</dt>
              <dd>{ROW[p].gan}</dd>
              <dt>音</dt>
              <dd>{ROW[p].yin}</dd>
              <dt>数</dt>
              <dd>{ROW[p].num}</dd>
              <dt>味</dt>
              <dd>{ROW[p].wei}</dd>
              <dt>祭祀之处</dt>
              <dd>{ROW[p].ji}</dd>
              <dt>天子衣色</dt>
              <dd>{ROW[p].color}</dd>
              <dt>先祭的脏器</dt>
              <dd>
                {ROW[p].organ}
                {st.organs && <span className={'c4-cmp' + (ROW[p].organ === ROW[p].med ? '' : ' is-diff')}>　后来的中医理论：{ROW[p].med}{ROW[p].organ === ROW[p].med ? '（相同）' : '（不同）'}</span>}
              </dd>
            </dl>
            <label className="c4-check">
              <input type="checkbox" checked={st.organs} onChange={(e) => set({ organs: e.target.checked })} />
              <span>对照后来中医理论里五脏和五行的对应</span>
            </label>
            {st.organs && (
              <p className="md-muted">
                五行里有四行对不上（只有水—肾相同）。同一个类别，不同的文本和传统可以有不同的对应：这些表是约定和整理，不是发现。（中医的对应是一般的知识，本课没有核对《黄帝内经》原文。）
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">历史上怎样用：两个例子</p>
        <Seg name="fp-ex" label="选择一个例子" col value={st.ex} opts={(Object.keys(EX) as Ex[]).map((k) => [k, EX[k].t] as const)} onPick={(v) => set({ ex: v })} />
        {ex && (
          <div aria-live="polite">
            <Gu src={ex.src} orig={ex.orig} zh={ex.zh} />
            <p>{ex.note}</p>
          </div>
        )}
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">检查一下</p>
        <p>按相胜的次序，哪一行"胜"火？（秦朝就是用这一步来说明自己代周的。）</p>
        <Seg name="fp-q" label="选择一行" value={st.q} opts={SHENG.map((q) => [q, q] as const)} onPick={(v) => set({ q: v })} />
        {st.q && (
          <div className="md-feedback" aria-live="polite">
            <p className="md-fb-k">{st.q === '水' ? '对。' : '再看一下内部的星形。'}</p>
            <p>
              {st.q === '水'
                ? '水胜火："秦代周德，從所不勝"。秦认为周是火德，就取火所不能胜的水德。'
                : `${st.q === '火' ? '火不胜自己。' : `按相胜，${st.q}胜${KE.find(([a]) => a === st.q)![1]}，不是胜火。`}指向火的那条虚线箭头从哪一行出发？`}
            </p>
          </div>
        )}
      </div>

      <Limits>
        <p>
          图和对应关系是本课根据正文所引的《淮南子》《春秋繁露》整理的；"通常的解释"（木燃生火、水灭火等）是后来常见的说明方式，不是原文。五行讲的是过程和分类，不是构成物质的元素；对应表在不同文本之间并不一致；"政令引起天气变化"一类的说法，从来没有被检验证实。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

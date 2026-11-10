import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx, Verdict } from '../in4/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';
import '../in4/in4.css';
import './in6.css';

// 六 · after the 总表 (the three schools side by side).
// Each school gets its own picture, drawn differently on purpose: one ground and
// no second reality (Advaita, with its two levels); a soul and its body
// (Rāmānuja, the three relations of Vedārthasaṃgraha 76); one independent being
// and many dependent ones (Madhva). They are not three colourings of one shared
// diagram. Rows come from the chapter's tables; quotations are the chapter's own
// (三、四、五, 后世批判与回应 三, notes 37, 50, 59, 62, 64).

const ID = 'brahman-self-world';

type School = 'advaita' | 'ramanuja' | 'madhva';
const NAME: Record<School, string> = { advaita: '商羯罗（不二论）', ramanuja: '罗摩奴阇（限定不二论）', madhva: '摩陀婆（二元论）' };

const ROWS: { q: string; v: Record<School, string>; note?: Partial<Record<School, string>> }[] = [
  { q: '梵', v: { advaita: '没有属性的纯粹意识', ramanuja: '具有无量美好属性的人格神（毗湿奴）', madhva: '具有一切美好属性的独立实在（毗湿奴）' } },
  { q: '个体与梵', v: { advaita: '同一；差别只属于日常层次', ramanuja: '不同，但不能分离而成立（身体与灵魂）', madhva: '根本不同；个体完全依赖于梵' } },
  { q: '世界', v: { advaita: '不是第二个实在；"不可决定"', ramanuja: '梵的真实身体', madhva: '真实，依赖于梵' } },
  { q: '差别', v: { advaita: '只属于日常层次', ramanuja: '真实；依赖者是真实的，但不能独立', madhva: '真实：神与灵魂、神与物质、灵魂与物质、灵魂与灵魂、物质与物质彼此有别' } },
  { q: '无明', v: { advaita: '附加；是束缚的根源', ramanuja: '不能遮蔽纯粹的光；束缚来自业', madhva: '梵不可能无知；束缚是真实的' } },
  { q: '解脱的道路', v: { advaita: '认识（行动只起辅助作用）', ramanuja: '以认识为前提的爱的冥想', madhva: '探究梵以取悦神；神的恩典' } },
  {
    q: '解脱后',
    v: { advaita: '认识到个体与梵从来没有差别', ramanuja: '个体以梵为自身而存在', madhva: '差别依然存在；只有神是独立的' },
    note: { ramanuja: '本章只读到概括' },
  },
];

type Model = 'clay' | 'body' | 'king';
const MODEL: [Model, string][] = [
  ['clay', '泥土与罐子（质料因）'],
  ['body', '身体与灵魂（属性与实体）'],
  ['king', '国王与臣民（主宰与被主宰）'],
];
const MODEL_OF: Record<School, Model> = { advaita: 'clay', ramanuja: 'body', madhva: 'king' };
const MODEL_FB: Record<School, string> = {
  advaita: '结果依赖于原因，离开原因就没有独立的实在，所以结果"不是另一个"（《梵经注》2.1.14 的泥土一例）。',
  ramanuja: '依赖是"不能分离而成立"的关系，就像身体之于灵魂；依赖者是真实的，但不能独立（《吠陀义摄》第 76 节）。',
  madhva: '依赖恰恰说明两者不同："从来没有看到一个东西成为另一个东西"（《随释》2.1.85）。比较想一想（五）：臣民依赖国王，却不因此成为国王。',
};

const QUOTES: Record<School, { src: string; orig: string; zh: string }[]> = {
  advaita: [
    {
      src: '商羯罗《梵经注》2.1.14',
      orig: 'sarvavyavahārāṇām eva prāg brahmātmatāvijñānāt satyatvopapatteḥ / svapnavyavahārasyeva prāk prabodhāt',
      zh: '因为一切日常的行为方式，在认识到"自身就是梵"之前，都是可以成立为真实的，就像梦中的行为方式在醒来之前［被当作真实］一样。',
    },
  ],
  ramanuja: [
    {
      src: '罗摩奴阇《吠陀义摄》第 76 节',
      orig: 'ayam eva cātmaśarīrabhāvaḥ pṛthaksiddhyanarhādhārādheyabhāvo niyantṛniyāmyabhāvaḥ śeṣaśeṣibhāvaś ca',
      zh: '灵魂与身体的关系，就是这样的关系：不能分离而成立的"支撑者与被支撑者"的关系，"控制者与被控制者"的关系，以及"所属者与主有者"的关系。',
    },
  ],
  madhva: [
    {
      src: '摩陀婆《随释》2.1.85',
      orig: 'nānyad anyatvam āpannaṃ kvacid dṛṣṭaṃ kathañcana / ato jīvasya na brahmabhāvaḥ syād dhi kadācana',
      zh: '从来没有在任何地方看到，一个东西变成了另一个东西。所以，个体灵魂永远不会成为梵。',
    },
    {
      src: '摩陀婆《随释》2.3.94',
      orig: 'muktāv api sa evaikaḥ svatantraḥ pūrṇasadguṇaḥ',
      zh: '即使在解脱中，也只有他一个是独立的，具足一切美好的属性。',
    },
  ],
};

type Rel = 'adhara' | 'niyantr' | 'sesa';
const REL: Record<Rel, { t: string; skt: string; body: string; soul: string; god: string }> = {
  adhara: { t: '支撑，不可分离', skt: 'ādhāra—ādheya', body: '被支撑，离开灵魂就不能成立', soul: '支撑者', god: '世界和个体离开神就不存在' },
  niyantr: { t: '控制', skt: 'niyantṛ—niyāmya', body: '被控制', soul: '从内部控制', god: '神是"内在的控制者"' },
  sesa: { t: '所属', skt: 'śeṣa—śeṣin', body: '为灵魂的目的而存在', soul: '主有者，一切为它而存在', god: '一切存在都以神为目的' },
};

type Diff = 'gs' | 'gm' | 'sm' | 'ss' | 'mm';
const DIFF: [Diff, string][] = [
  ['gs', '神与灵魂'],
  ['gm', '神与物质'],
  ['sm', '灵魂与物质'],
  ['ss', '灵魂与灵魂'],
  ['mm', '物质与物质'],
];

interface Saved {
  s: School;
  level: 'vy' | 'pa';
  rel: Rel | null;
  diff: Diff | null;
  models: Partial<Record<School, Model>>;
}
const INIT: Saved = { s: 'advaita', level: 'vy', rel: null, diff: null, models: {} };

function AdvaitaFig({ level }: { level: 'vy' | 'pa' }) {
  const vy = level === 'vy';
  return (
    <svg className="ix-line i6-fig" viewBox="0 0 560 210" role="img" aria-label={vy ? '不二论，日常层次：只有一个梵；个体和世界在它之中显现，用虚线表示，不是第二个实在' : '不二论，究竟层次：只有梵，没有第二个'}>
      <g className="ix-node">
        <rect x="10" y="10" width="540" height="190" rx="2" />
      </g>
      <text x="26" y="36" className="ix-big">
        梵：纯粹意识
      </text>
      <text x="26" y="56" className="ix-small">
        唯一的实在
      </text>
      {vy ? (
        <>
          <g className="ix-node is-dash">
            <rect x="40" y="80" width="210" height="80" />
          </g>
          <text x="54" y="108">
            个体（我、你……）
          </text>
          <text x="54" y="130" className="ix-small">
            "我胖"、"我在受苦"
          </text>
          <g className="ix-node is-dash">
            <rect x="300" y="80" width="210" height="80" />
          </g>
          <text x="314" y="108">
            世界（罐子、柱子……）
          </text>
          <text x="314" y="130" className="ix-small">
            被感知，在日常层次上真实
          </text>
          <text x="40" y="185" className="ix-small">
            虚线：不是梵之外的第二个实在，也不是"什么都没有"（"不可决定"）
          </text>
        </>
      ) : (
        <text x="26" y="120" className="ix-small">
          在认识到"自身就是梵"之后：没有第二个东西需要画出来。
        </text>
      )}
    </svg>
  );
}

function RamanujaFig({ rel }: { rel: Rel | null }) {
  return (
    <svg className="ix-line i6-fig" viewBox="0 0 560 230" role="img" aria-label="限定不二论：梵是内在的自身；个体灵魂和物质世界是梵的身体，真实，但不能离开梵而成立">
      <g className="ix-node is-dash">
        <rect x="10" y="10" width="540" height="210" rx="16" />
      </g>
      <text x="26" y="34" className="ix-small">
        梵的身体（样态）：真实，但不能分离而成立
      </text>
      <g className={'ix-node' + (rel ? ' is-on' : '')}>
        <rect x="190" y="50" width="180" height="56" />
      </g>
      <text x="204" y="74">
        梵：内在的自身
      </text>
      <text x="204" y="94" className="ix-small">
        内在的控制者（毗湿奴）
      </text>
      <g className="ix-node">
        <rect x="40" y="150" width="200" height="50" />
      </g>
      <text x="54" y="180">
        个体灵魂（众多）
      </text>
      <g className="ix-node">
        <rect x="320" y="150" width="200" height="50" />
      </g>
      <text x="334" y="180">
        物质世界
      </text>
      <path className="ix-link" d="M240 106 L150 150 M320 106 L420 150" />
      {rel && (
        <text x="280" y="134" textAnchor="middle" className="ix-small">
          {REL[rel].t}（{REL[rel].skt}）
        </text>
      )}
    </svg>
  );
}

const DIFF_PAIRS: Record<Diff, [string, string]> = { gs: ['g', 's1'], gm: ['g', 'm1'], sm: ['s2', 'm1'], ss: ['s1', 's2'], mm: ['m1', 'm2'] };
function MadhvaFig({ diff }: { diff: Diff | null }) {
  const on = (id: string) => !!diff && DIFF_PAIRS[diff].includes(id);
  const nodes: { id: string; x: number; y: number; w: number; t: string; s?: string }[] = [
    { id: 'g', x: 180, y: 12, w: 200, t: '梵（毗湿奴）', s: '独立（svatantra）' },
    { id: 's1', x: 10, y: 150, w: 120, t: '灵魂', s: '依赖（paratantra）' },
    { id: 's2', x: 150, y: 150, w: 120, t: '灵魂', s: '依赖' },
    { id: 'm1', x: 290, y: 150, w: 120, t: '物质', s: '依赖' },
    { id: 'm2', x: 430, y: 150, w: 120, t: '物质', s: '依赖' },
  ];
  return (
    <svg className="ix-line i6-fig" viewBox="0 0 560 232" role="img" aria-label="二元论吠檀多：一个独立的梵，与无数依赖它、又与它根本不同的灵魂和物质；它们彼此也各不相同">
      <defs>
        <marker id="i6-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
        </marker>
      </defs>
      {nodes.slice(1).map((n) => (
        <path key={n.id} className="ix-link i6-dep" d={`M${n.x + n.w / 2} 150 L280 68`} markerEnd="url(#i6-arr)" />
      ))}
      <text x="292" y="112" className="ix-small">
        依赖
      </text>
      {nodes.map((n) => (
        <g key={n.id}>
          <g className={'ix-node' + (on(n.id) ? ' is-on' : '')}>
            <rect x={n.x} y={n.y} width={n.w} height="52" />
          </g>
          <text x={n.x + 10} y={n.y + 22} className={on(n.id) ? 'i6-inv' : undefined}>
            {n.t}
          </text>
          <text x={n.x + 10} y={n.y + 42} className={'ix-small' + (on(n.id) ? ' i6-inv' : '')}>
            {n.s}
          </text>
        </g>
      ))}
      <text x="10" y="226" className="ix-small">
        每个方框都是另一个实在：依赖不使它们与梵同一
      </text>
    </svg>
  );
}

export default function BrahmanSelfWorld() {
  const [st, save] = useSavedIx<Saved>('IN6', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const s: School = NAME[st.s] ? st.s : 'advaita';
  const m = st.models?.[s];

  return (
    <section className="md c3 c5" aria-labelledby="bsw-title">
      <header className="md-head">
        <p className="md-tag">梵、自我与世界 · 比较</p>
        <h3 id="bsw-title" className="md-title">
          三派各自的图
        </h3>
        <p className="md-lede">三派对"有几种实在"的回答不同，所以这里不是一张图的三种上色，而是三张画法不同的图。每张图之后，是本章表格中这一派的各行，以及这一派自己的文字。</p>
      </header>

      <Seg name="bsw-s" label="选择一派" value={s} opts={(Object.keys(NAME) as School[]).map((k) => [k, NAME[k]] as const)} onPick={(v) => set({ s: v })} />

      <Band>一 · 这一派的图</Band>
      {s === 'advaita' && (
        <>
          <Seg
            name="bsw-level"
            label="选择层次"
            value={st.level}
            opts={[
              ['vy', '日常层次（vyāvahārika）'],
              ['pa', '究竟层次（pāramārthika）'],
            ]}
            onPick={(v) => set({ level: v })}
          />
          <AdvaitaFig level={st.level} />
          <p className="md-muted">
            两个层次不是两个世界，而是看同一个东西的两种方式，就像绳子和"蛇"不是两样东西。在日常层次上，罐子、柱子和别人都是真实的，经典的命令也有效。 <Tag b="scholar" who="SEP 所说的两层实在" />
          </p>
        </>
      )}
      {s === 'ramanuja' && (
        <>
          <RamanujaFig rel={st.rel} />
          <p className="md-fb-k">"身体"的三种关系（点一种，看它在神与世界之间是什么意思）：</p>
          <Seg name="bsw-rel" label="选择一种关系" value={st.rel} opts={(Object.keys(REL) as Rel[]).map((k) => [k, REL[k].t] as const)} onPick={(v) => set({ rel: v })} />
          {st.rel && REL[st.rel] && (
            <table className="ip-sort" aria-live="polite">
              <caption className="visually-hidden">{REL[st.rel].t}</caption>
              <tbody>
                <tr>
                  <th scope="row">身体一方</th>
                  <td>{REL[st.rel].body}</td>
                </tr>
                <tr>
                  <th scope="row">灵魂一方</th>
                  <td>{REL[st.rel].soul}</td>
                </tr>
                <tr>
                  <th scope="row">在神与世界之间</th>
                  <td>{REL[st.rel].god}</td>
                </tr>
              </tbody>
            </table>
          )}
        </>
      )}
      {s === 'madhva' && (
        <>
          <MadhvaFig diff={st.diff} />
          <p className="md-fb-k">"五种区别"（点一种，图中标出相应的两方）：</p>
          <Seg name="bsw-diff" label="选择一种区别" value={st.diff} opts={DIFF} onPick={(v) => set({ diff: v })} />
          <p className="md-muted">
            "五种区别"据《起源与早期论争》的介绍；摩陀婆的"二元"首先不是心与物，而是独立的实在与依赖的实在。 <Tag b="scholar" who="IEP" />
          </p>
        </>
      )}

      <Band>二 · 本章表格中的这一派</Band>
      <table className="ip-sort">
        <caption className="visually-hidden">{NAME[s]}</caption>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.q}>
              <th scope="row">{r.q}</th>
              <td>
                {r.v[s]}
                {r.note?.[s] && <span className="md-muted">（{r.note[s]}）</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="md-muted">
        各行据本章的总表、第四和第五部分的表，以及后世批判与回应第三节；每一格都只是概括。 <Tag b="course" />
      </p>
      {QUOTES[s].map((q) => (
        <Src key={q.src} src={q.src} lang="sa" orig={q.orig} zh={q.zh} />
      ))}
      {s === 'madhva' && <p className="md-muted">《随释》的引文据未经校对的电子本。</p>}

      <Band>三 · 这一派用的是哪一种"依赖"？</Band>
      <p>三派都承认世界依赖于梵，却得出了三种不同的结论。{NAME[s]}的依赖模型更接近哪一个？</p>
      <Seg name={'bsw-m-' + s} label="选择一个依赖模型" col value={m ?? null} opts={MODEL} onPick={(v) => set({ models: { ...st.models, [s]: v } })} />
      {m && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={m === MODEL_OF[s]} yes="与本章的评估一致" no="与本章的评估不同" />
          {MODEL_FB[s]}
        </p>
      )}
      <Claim b="course" who="后世批判与回应 三，评估">
        哪一个模型最适合用来理解梵与世界，奥义书本身没有说定。不二论的论证依赖于一个额外的前提，即"只有不变的东西才是完全真实的"（SEP 所说的"持续性"标准）；如果不接受这个前提，从依赖并不能直接得出同一。
      </Claim>

      <Limits>
        <p>三张图是本章的示意，不是三派自己画的图；它们只表示各派对"梵、个体、世界"关系的回答，不表示三派共有同一种本体论。不二论的虚线框不是"不存在"，而是"不是第二个实在"。</p>
        <p>罗摩奴阇关于解脱后状态的说法，本章只读到概括；他对《梵经》2.1.14 的注释在《圣注》中，本章没有读到。克什米尔湿婆派是另一种不二论，不在这三派之内。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

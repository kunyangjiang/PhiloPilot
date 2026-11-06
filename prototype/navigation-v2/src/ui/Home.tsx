import { COURSES, REGIONS, TOPICS, TRADITIONS, type RegionId } from '../data/catalog';
import { useStyle } from '../state/store';
import { readingStatus } from '../state/reading';
import { TopBar } from './Chrome';
import SwissHome from './SwissHome';
import { continueReading, goCourse, goRegion, goTopic, regionHash, REGION_NO } from './nav';

export default function Home() {
  const style = useStyle();
  return (
    <main id="main" tabIndex={-1} className="home">
      <TopBar />
      {style === 'swiss' && <SwissHome />}
      {style === 'transit' && <TransitHome />}
      {style === 'catalogue' && <CatalogueHome />}
    </main>
  );
}

/** Same reading state as the main style: “继续” only once reading has really started. */
function useReading() {
  const s = readingStatus();
  const pos = s.state === 'progress' ? s.pos ?? { section: 0, block: 0 } : null;
  return { pos, pct: s.pct, where: s.where };
}

// ── 2. Modernist transit diagram ─────────────────────────────────────────────
// Four lines, one per entrance. Positions are hand-set on a 45° grid, in the
// manner of mid-century diagrammatic maps; they carry no geographic meaning.

const QX = 480; // questions line (vertical)
const HY = 380; // history line (horizontal)
const qy = (i: number) => HY + (i - 5) * 56;
const HIST_X = [250, QX, 600, 720, 840, 960, 1080];
const HIST_BELOW = new Set<number>([4]); // CN1 is labelled below-left, so only 欧洲 goes below
const D_SHORT = ['比较方法', '自我与无我', '知识与论证', '德性与关怀', '政治秩序', '性别、种族与帝国', '技术与 AI', '生命伦理', '环境伦理', '传播与交流', '独立研究'];
const A_SHORT = ['问题、论证与阅读', '形式推理', '概念与思想实验', '诠释与写作'];

function TransitHome() {
  const { pos, pct, where } = useReading();
  const D = COURSES.filter((c) => c.domain === 'D');
  const A = COURSES.filter((c) => c.domain === 'A');
  const badge = (id: RegionId, x: number, y: number, w: number) => {
    const r = REGIONS.find((x) => x.id === id)!;
    return (
      <a href={regionHash(id)} className={'tr-badge tr-badge--' + id} aria-label={`${r.title}（${r.stat}）`}>
        <rect x={x - w / 2} y={y - 15} width={w} height={30} rx={15} />
        <text x={x} y={y + 5} textAnchor="middle">
          {r.title}
        </text>
      </a>
    );
  };
  return (
    <div className="tr-home">
      <svg className="tr-map" viewBox="0 0 1200 700" role="group" aria-label="PhiloPilot 课程线路图">
        {/* Title block */}
        <g className="tr-title">
          <text x="40" y="92" className="tr-h1">
            哲学课程线路图
          </text>
          <text x="40" y="124" className="tr-h2">
            PhiloPilot · 四条线路，一个换乘站可阅读
          </text>
          <text x="40" y="168" className="tr-p">
            每条线是一个入口：传统、问题、对话、方法。
          </text>
          <text x="40" y="192" className="tr-p">
            点线路名进入该区域；带白环的站点可以进入。
          </text>
        </g>

        {/* Lines */}
        <path className="tr-line tr-line--history" d={`M 150 ${HY} L 1140 ${HY}`} />
        <path className="tr-line tr-line--questions" d={`M ${QX} 72 L ${QX} 640`} />
        <path className="tr-line tr-line--dialogue" d="M 612 262 L 712 162 L 1150 162" />
        <path className="tr-line tr-line--methods" d="M 612 516 L 686 590 L 1140 590" />

        {/* History stations */}
        {TRADITIONS.map((t, i) => {
          if (i === 1) return null; // 中国 is drawn as the interchange
          const x = HIST_X[i];
          const below = HIST_BELOW.has(i);
          return (
            <g key={t.id} className="tr-st tr-st--history">
              <line x1={x} y1={HY} x2={x} y2={below ? HY + 11 : HY - 11} />
              <text x={x} y={below ? HY + 32 : HY - 20} textAnchor="middle">
                {t.name}
              </text>
            </g>
          );
        })}
        <text x={HIST_X[1] + 16} y={HY - 14} className="tr-st-label">
          中国
        </text>

        {/* Question stations */}
        {TOPICS.map((t, i) => {
          if (t.implemented) return null;
          return (
            <g key={t.id} className="tr-st tr-st--questions">
              <line x1={QX} y1={qy(i)} x2={QX - 11} y2={qy(i)} />
              <text x={QX - 18} y={qy(i) + 5} textAnchor="end">
                {t.title}
              </text>
            </g>
          );
        })}
        <a
          href="#/questions/human-nature"
          className="tr-open tr-open--topic"
          aria-label="人性与道德：一个人怎样才能变好？"
        >
          <rect x={QX - 128} y={HY - 40} width={112} height={28} rx={3} />
          <text x={QX - 72} y={HY - 21} textAnchor="middle">
            人性与道德
          </text>
        </a>

        {/* Interchange: CN1 = 中国 × 人性与道德 */}
        <a
          href="#/course/CN1"
          className="tr-open tr-open--cn1"
          onClick={(e) => {
            e.preventDefault();
            goCourse('CN1');
          }}
          aria-label="孔子、孟子与荀子：修养、礼与人性（可阅读）"
        >
          <circle cx={QX} cy={HY} r={13} className="tr-ix" />
          <circle cx={QX} cy={HY} r={6} className="tr-ix-in" />
          <text x={QX + 20} y={HY + 30} className="tr-ix-code">
            孔子、孟子与荀子
          </text>
          <text x={QX + 20} y={HY + 50} className="tr-ix-sub">
            换乘：中国 × 人性与道德 · 可阅读
          </text>
        </a>

        {/* Dialogue stations (rotated labels) */}
        {D.map((c, k) => {
          const x = 736 + k * 40;
          return (
            <g key={c.code} className="tr-st tr-st--dialogue">
              <line x1={x} y1={162} x2={x} y2={151} />
              <text x={x + 4} y={144} transform={`rotate(-45 ${x + 4} 144)`}>
                {D_SHORT[k]}
              </text>
            </g>
          );
        })}

        {/* Method stations */}
        {A.map((c, k) => {
          const x = 772 + k * 116;
          return (
            <g key={c.code} className="tr-st tr-st--methods">
              <line x1={x} y1={590} x2={x} y2={601} />
              <text x={x} y={622} textAnchor="middle">
                {A_SHORT[k]}
              </text>
            </g>
          );
        })}

        {/* Line badges (entrances) */}
        {badge('history', 96, HY, 116)}
        {badge('questions', QX, 52, 108)}
        {badge('dialogue', 612, 262, 116)}
        {badge('methods', 612, 516, 100)}

        {/* Legend */}
        <g className="tr-legend" transform="translate(40 500)">
          <text y="0" className="tr-leg-h">
            图例
          </text>
          <line x1="0" y1="24" x2="34" y2="24" className="tr-line tr-line--history" />
          <text x="46" y="29">
            历史与传统 · 7 个传统
          </text>
          <line x1="0" y1="50" x2="34" y2="50" className="tr-line tr-line--questions" />
          <text x="46" y="55">
            哲学问题 · 10 个问题
          </text>
          <line x1="0" y1="76" x2="34" y2="76" className="tr-line tr-line--dialogue" />
          <text x="46" y="81">
            跨传统对话 · 11 门课
          </text>
          <line x1="0" y1="102" x2="34" y2="102" className="tr-line tr-line--methods" />
          <text x="46" y="107">
            哲学方法 · 4 门课
          </text>
          <text y="140" className="tr-leg-note">
            站名为示意短名；白环换乘站与带框站名可进入。
          </text>
        </g>

        {/* Continue reading */}
        <a
          href={pos ? `#/course/CN1/read/${pos.section}?b=${pos.block}` : '#/questions/human-nature'}
          className="tr-continue"
          onClick={(e) => {
            e.preventDefault();
            if (pos) continueReading();
            else goTopic();
          }}
        >
          <rect x="40" y="250" width="290" height="62" rx="3" />
          <text x="56" y="274" className="tr-c-k">
            {pos ? `继续阅读 · 已读 ${pct}%` : '从一个问题开始 →'}
          </text>
          <text x="56" y="298" className="tr-c-t">
            {pos ? `孔孟荀 · ${clip(where, 15)}` : '人性与道德：一个人怎样才能变好？'}
          </text>
        </a>
      </svg>
    </div>
  );
}

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

// ── 3. Library card catalogue ────────────────────────────────────────────────
const DRAWER_RANGE: Record<RegionId, string> = {
  history: '希腊 — 拉美',
  questions: '知识 — 美',
  dialogue: '比较 — 独立研究',
  methods: '阅读 — 写作',
};

function CatalogueHome() {
  const { pos, pct, where } = useReading();
  return (
    <div className="ct-home">
      <section className="ct-guide">
        <article className="ct-card ct-card--guide">
          <p className="ct-card-no">PhiloPilot · 目录卡 No. 0</p>
          <h1>哲学课程目录</h1>
          <p>本目录分四屉。按传统查历史，按问题查课程，查传统之间的对话，或查方法。</p>
          <p>拉开一屉，看其中的卡片；带红色标签的卡片在本原型中可以打开。</p>
          <p className="ct-small">可阅读：《孔子、孟子与荀子》（样章草稿）。其余卡片只示意目录结构。</p>
        </article>
        {pos ? (
          <button className="ct-card ct-card--slip" onClick={continueReading}>
            <span className="ct-slip-k">借阅中 · 已读 {pct}%</span>
            <span className="ct-slip-t">孔子、孟子与荀子</span>
            <span className="ct-slip-w">{where}</span>
          </button>
        ) : (
          <button className="ct-card ct-card--slip" onClick={() => goTopic()}>
            <span className="ct-slip-k">从一个问题开始</span>
            <span className="ct-slip-t">人性与道德</span>
            <span className="ct-slip-w">一个人怎样才能变好？</span>
          </button>
        )}
      </section>
      <nav className="ct-cabinet" aria-label="四个目录屉">
        {REGIONS.map((r) => (
          <button key={r.id} className={'ct-drawer ct-drawer--' + r.id} onClick={() => goRegion(r.id)}>
            <span className="ct-holder">
              <span className="ct-label">
                <b>{r.title}</b>
                <small>{DRAWER_RANGE[r.id]}</small>
              </span>
            </span>
            <span className="ct-pull" aria-hidden="true" />
            <span className="ct-drawer-no" aria-hidden="true">
              {REGION_NO[r.id]}
            </span>
            <span className="ct-drawer-stat">{r.stat}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

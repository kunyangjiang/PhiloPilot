import { useEffect, useState } from 'react';
import { REGIONS, TOPICS, type RegionId } from '../data/catalog';
import { engine } from '../scene/engine';
import { navigate } from '../router';
import { getPosition, getProgress, setTrail } from '../state/store';
import { SECTIONS, TOTAL_CHARS } from '../content/cn1';
import { TopBar, HOME_CRUMB } from './Chrome';
import { useAnchor } from './anchor';

const REGION_ROUTE = (id: RegionId) => (id === 'questions' ? ({ name: 'questions' } as const) : ({ name: 'region', region: id } as const));

function RegionLabel({ id, hovered, setHovered }: { id: RegionId; hovered: RegionId | null; setHovered: (r: RegionId | null) => void }) {
  const r = REGIONS.find((x) => x.id === id)!;
  const ref = useAnchor('R:' + id);
  const on = () => {
    engine.hover = 'R:' + id;
    setHovered(id);
  };
  const off = () => {
    if (engine.hover === 'R:' + id) engine.hover = null;
    setHovered(null);
  };
  return (
    <div ref={ref} className={`anchor region-label rl--${id}` + (hovered === id ? ' is-hot' : hovered ? ' is-dim' : '')}>
      <button
        className="region-btn"
        style={{ ['--rc' as string]: r.color }}
        onPointerEnter={on}
        onPointerLeave={off}
        onFocus={on}
        onBlur={off}
        onClick={() => navigate(REGION_ROUTE(id))}
        aria-describedby={`rl-desc-${id}`}
      >
        <span className="region-glyph" aria-hidden="true" />
        <span className="region-en">{r.en}</span>
        <span className="region-title">{r.title}</span>
        <span className="region-stat">{r.stat}</span>
        <span className="region-line" id={`rl-desc-${id}`}>
          {r.line}
          <em>{id === 'questions' ? '进入问题之环 →' : '进入 →'}</em>
        </span>
      </button>
    </div>
  );
}

function TopicSpark({ id, title, show }: { id: string; title: string; show: boolean }) {
  const ref = useAnchor('T:' + id);
  return (
    <div ref={ref} className={'anchor topic-spark' + (show ? ' show' : '')} aria-hidden="true">
      <span className="spark-dot" />
      <span className="spark-label">{title}</span>
    </div>
  );
}

export default function HomeLayer() {
  const [hovered, setHovered] = useState<RegionId | null>(null);
  const pos = getPosition();
  const progress = getProgress();
  const pct = Math.round(
    (SECTIONS.reduce((s, sec) => s + (progress[sec.index] ?? 0) * sec.chars, 0) / Math.max(1, TOTAL_CHARS)) * 100,
  );

  useEffect(() => () => void (engine.hover = null), []);

  return (
    <main id="main" tabIndex={-1} className="home">
      <TopBar />
      <h1 className="sr-only">PhiloPilot：选择一个探索区域</h1>

      <div className="home-intro" aria-hidden={hovered ? true : undefined}>
        <p className="home-kicker">一片可以走进去的哲学空间</p>
        <p className="home-lede">
          四个区域彼此相连：
          <br />
          历史的长线、问题的环、对话的交织、方法的晶体。
        </p>
      </div>

      <div className="topic-sparks">
        {TOPICS.map((t) => (
          <TopicSpark key={t.id} id={t.id} title={t.title} show={hovered === 'questions'} />
        ))}
      </div>

      <nav aria-label="探索区域" className="regions">
        {/* DOM order = keyboard order: questions first (the primary route in V1). */}
        {(['questions', 'history', 'dialogue', 'methods'] as RegionId[]).map((id) => (
          <RegionLabel key={id} id={id} hovered={hovered} setHovered={setHovered} />
        ))}
      </nav>

      <section className="continue-card" aria-label="继续学习">
        {pos ? (
          <>
            <p className="cc-kicker">
              <span className="cc-pulse" aria-hidden="true" />
              继续阅读
            </p>
            <p className="cc-title">CN1 · {pos.sectionTitle}</p>
            <p className="cc-sub">
              {pos.heading ? `停在「${pos.heading}」` : '上次的位置'} · 全章已读 {pct}%
            </p>
            <button
              className="cc-btn"
              onClick={() => {
                setTrail([HOME_CRUMB]);
                navigate({ name: 'reader', code: 'CN1', section: pos.section, block: pos.block });
              }}
            >
              回到上次的段落 →
            </button>
          </>
        ) : (
          <>
            <p className="cc-kicker">第一次来？</p>
            <p className="cc-title">从一个问题开始</p>
            <p className="cc-sub">“一个人怎样才能变好？”—— 穿过孔子、孟子与荀子</p>
            <button
              className="cc-btn"
              onClick={() => {
                engine.setView('questions');
                navigate({ name: 'topic', topic: 'human-nature' });
              }}
            >
              进入「人性与道德」 →
            </button>
          </>
        )}
      </section>

      <p className="home-hint" aria-hidden="true">
        移动指针观察空间 · 悬停区域查看关系 · Tab 键依次浏览 · Enter 进入
      </p>
      <p className="proto-badge">原型 V1 · 只有「哲学问题 → 人性与道德 → CN1」路径接入真实内容</p>
    </main>
  );
}

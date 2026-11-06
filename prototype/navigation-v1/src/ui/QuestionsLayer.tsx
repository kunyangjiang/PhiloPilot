import { useEffect, useState } from 'react';
import { TOPICS, type Topic } from '../data/catalog';
import { engine } from '../scene/engine';
import { navigate } from '../router';
import { TopBar, HOME_CRUMB, QUESTIONS_CRUMB } from './Chrome';
import { useAnchor, useThread } from './anchor';

function TopicNode({ t, hot, setHot }: { t: Topic; hot: string | null; setHot: (s: string | null) => void }) {
  const ref = useAnchor('T:' + t.id);
  const on = () => {
    engine.hover = 'T:' + t.id;
    setHot(t.id);
  };
  const off = () => {
    if (engine.hover === 'T:' + t.id) engine.hover = null;
    setHot(null);
  };
  const cls = 'anchor topic-node' + (t.implemented ? ' is-open' : ' is-closed') + (hot === t.id ? ' is-hot' : hot ? ' is-dim' : '');
  const inner = (
    <>
      <span className="tn-dot" aria-hidden="true">
        <i />
      </span>
      <span className="tn-text">
        <span className="tn-title">{t.title}</span>
        <span className="tn-q">{t.question}</span>
        <span className="tn-meta">
          {t.implemented ? '已展开 · 进入 →' : `V1 未展开 · 对应系统课 ${t.courses.join('、')}`}
        </span>
      </span>
    </>
  );
  return (
    <div ref={ref} className={cls}>
      {t.implemented ? (
        <button className="tn-hit" onPointerEnter={on} onPointerLeave={off} onFocus={on} onBlur={off} onClick={() => navigate({ name: 'topic', topic: t.id })}>
          {inner}
        </button>
      ) : (
        <div className="tn-hit" onPointerEnter={on} onPointerLeave={off} aria-disabled="true">
          {inner}
        </div>
      )}
    </div>
  );
}

function RingThread({ a, b }: { a: string; b: string }) {
  const r = useThread('T:' + a, 'T:' + b, -0.12);
  return <path ref={r} className="thr thr-ring" />;
}

export default function QuestionsLayer() {
  const [hot, setHot] = useState<string | null>(null);
  useEffect(() => () => void (engine.hover = null), []);
  return (
    <main id="main" tabIndex={-1} className="questions">
      <TopBar crumbs={[HOME_CRUMB, QUESTIONS_CRUMB]} />
      <svg className="threads" aria-hidden="true">
        {TOPICS.map((t, i) => (
          <RingThread key={t.id} a={t.id} b={TOPICS[(i + 1) % TOPICS.length].id} />
        ))}
      </svg>
      <div className="view-title">
        <p className="vt-kicker">Philosophical Questions</p>
        <h1>哲学问题</h1>
        <p className="vt-lede">每个问题都是一条纬线，穿过不同的传统。先选一个你真正关心的问题。</p>
        <p className="vt-note">V1 已展开：<strong>人性与道德</strong>；其余问题只显示与之对应的系统课程。</p>
      </div>
      <nav aria-label="哲学问题" className="topic-ring">
        {TOPICS.map((t) => (
          <TopicNode key={t.id} t={t} hot={hot} setHot={setHot} />
        ))}
      </nav>
      <button className="back-pill" onClick={() => navigate({ name: 'home' })}>
        ← 回到总览
      </button>
    </main>
  );
}

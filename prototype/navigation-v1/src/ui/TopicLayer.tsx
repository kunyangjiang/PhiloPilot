import { useEffect, useMemo, useRef, useState } from 'react';
import { courseByCode, HUMAN_NATURE, TIER_LABEL, TOPICS } from '../data/catalog';
import { engine } from '../scene/engine';
import { navigate } from '../router';
import { getPosition, setTrail } from '../state/store';
import { TopBar, HOME_CRUMB, QUESTIONS_CRUMB, TOPIC_CRUMB } from './Chrome';
import { useAnchor, useThread } from './anchor';
import { setPending } from './transition';

const QS = HUMAN_NATURE.questions;

function Thread({ from, to, cls, bend }: { from: string; to: string; cls: string; bend?: number }) {
  const r = useThread(from, to, bend);
  return <path ref={r} className={'thr ' + cls} />;
}

function QuestionNode({
  q,
  index,
  state,
  onHover,
  onPick,
}: {
  q: (typeof QS)[number];
  index: number;
  state: 'hot' | 'dim' | 'picked' | '';
  onHover: (id: string | null) => void;
  onPick: (id: string) => void;
}) {
  const ref = useAnchor('Q:' + q.id);
  return (
    <div ref={ref} className={'anchor q-node ' + (state ? 'is-' + state : '')}>
      <button
        className="q-hit"
        aria-pressed={state === 'picked'}
        onPointerEnter={() => onHover(q.id)}
        onPointerLeave={() => onHover(null)}
        onFocus={() => onHover(q.id)}
        onBlur={() => onHover(null)}
        onClick={() => onPick(q.id)}
      >
        <span className="q-index" aria-hidden="true">
          {['一', '二', '三', '四'][index]}
        </span>
        <span className="q-text">{q.text}</span>
        <span className="q-count">{q.links.length} 门课</span>
      </button>
    </div>
  );
}

function CourseNode({ code, state, visited }: { code: string; state: 'hot' | 'dim' | ''; visited: boolean }) {
  const ref = useAnchor('C:' + code);
  const c = courseByCode(code)!;
  const where = QS.flatMap((q) => q.links.filter((l) => l.code === code).map((l) => l.where));
  const open = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = (e.currentTarget.querySelector('.cn-dot') as HTMLElement).getBoundingClientRect();
    setPending({ kind: 'iris-open', origin: { x: r.left + r.width / 2, y: r.top + r.height / 2, r: r.width / 2 } });
    setTrail([HOME_CRUMB, QUESTIONS_CRUMB, TOPIC_CRUMB]);
    navigate({ name: 'course', code });
  };
  const body = (
    <>
      <span className="cn-dot" aria-hidden="true">
        <i />
      </span>
      <span className="cn-text">
        <span className="cn-code">
          {code}
          <small>{TIER_LABEL[c.tier]}</small>
        </span>
        <span className="cn-title">{c.title}</span>
        <span className="cn-where">{where.join(' ｜ ')}</span>
        {c.implemented ? (
          <span className="cn-tag cn-tag--open">{visited ? '在读 · 打开课程 →' : '建议入口 · 打开课程 →'}</span>
        ) : (
          <span className="cn-tag">V1 未实现（示意节点）</span>
        )}
      </span>
    </>
  );
  return (
    <div ref={ref} className={'anchor c-node' + (c.implemented ? ' is-open' : ' is-mock') + (state ? ' is-' + state : '') + (visited ? ' is-visited' : '')}>
      {c.implemented ? (
        <button className="cn-hit" onClick={open} aria-label={`打开课程 ${code} ${c.title}`}>
          {body}
        </button>
      ) : (
        <div className="cn-hit" aria-disabled="true" tabIndex={-1}>
          {body}
        </div>
      )}
    </div>
  );
}

export default function TopicLayer({ topic }: { topic: string }) {
  const tp = TOPICS.find((t) => t.id === topic) ?? TOPICS[5];
  const [hoverQ, setHoverQ] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const centerRef = useAnchor('T:' + tp.id);
  const visited = !!getPosition();
  const panelRef = useRef<HTMLElement>(null);

  const activeQ = hoverQ ?? picked;
  const activeCourses = useMemo(() => new Set(activeQ ? QS.find((q) => q.id === activeQ)!.links.map((l) => l.code) : []), [activeQ]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('.palette')) {
        if (picked) setPicked(null);
        else navigate({ name: 'questions' });
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [picked]);

  if (!tp.implemented) {
    return (
      <main id="main" tabIndex={-1} className="topic">
        <TopBar crumbs={[HOME_CRUMB, QUESTIONS_CRUMB, { label: tp.title, hash: location.hash }]} />
        <div className="view-title">
          <h1>{tp.title}</h1>
          <p className="vt-lede">这个问题在 V1 中尚未展开。</p>
          <button className="cc-btn" onClick={() => navigate({ name: 'questions' })}>
            ← 回到哲学问题
          </button>
        </div>
      </main>
    );
  }

  const picked0 = picked ? QS.find((q) => q.id === picked)! : null;

  return (
    <main id="main" tabIndex={-1} className={'topic' + (activeQ ? ' has-active' : '') + (picked ? ' has-picked' : '')}>
      <TopBar crumbs={[HOME_CRUMB, QUESTIONS_CRUMB, TOPIC_CRUMB]} />
      <svg className="threads" aria-hidden="true">
        {QS.map((q) => (
          <Thread key={'tq' + q.id} from={'T:' + tp.id} to={'Q:' + q.id} cls={'thr-tq' + (activeQ === q.id ? ' on' : activeQ ? ' off' : '')} bend={0.08} />
        ))}
        {QS.flatMap((q) =>
          q.links.map((l) => (
            <Thread
              key={q.id + l.code}
              from={'Q:' + q.id}
              to={'C:' + l.code}
              cls={'thr-qc' + (l.code === 'CN1' ? ' cn1' : '') + (activeQ === q.id ? ' on' : activeQ ? ' off' : '')}
              bend={0.1}
            />
          )),
        )}
        {HUMAN_NATURE.documented
          .filter((d) => engine.get('C:' + d.from) && engine.get('C:' + d.to))
          .map((d) => (
            <Thread key={d.from + d.to} from={'C:' + d.from} to={'C:' + d.to} cls={'thr-doc' + (activeQ ? ' off' : '')} bend={-0.32} />
          ))}
      </svg>

      <div ref={centerRef} className="anchor topic-center" aria-hidden="true">
        <span className="tc-core" />
        <span className="tc-ring" />
        <span className="tc-ring tc-ring--2" />
      </div>

      <header className="topic-head">
        <p className="vt-kicker">哲学问题 · 已展开</p>
        <h1>{tp.title}</h1>
        <p className="th-q">{tp.question}</p>
        <blockquote className="th-core">
          <p>{HUMAN_NATURE.core}</p>
          <cite>—— {HUMAN_NATURE.coreSource}</cite>
        </blockquote>
      </header>

      <nav aria-label="具体问题" className="q-layer">
        {QS.map((q, i) => (
          <QuestionNode
            key={q.id}
            q={q}
            index={i}
            state={picked === q.id ? 'picked' : activeQ === q.id ? 'hot' : activeQ ? 'dim' : ''}
            onHover={(id) => {
              setHoverQ(id);
              engine.hover = id ? 'Q:' + id : null;
            }}
            onPick={(id) => {
              setPicked((p) => (p === id ? null : id));
              panelRef.current?.focus({ preventScroll: true });
            }}
          />
        ))}
      </nav>

      <nav aria-label="相关课程" className="c-layer">
        {engine.courseOrder.map((code) => (
          <CourseNode key={code} code={code} state={activeQ ? (activeCourses.has(code) ? 'hot' : 'dim') : ''} visited={code === 'CN1' && visited} />
        ))}
      </nav>

      <aside className="topic-panel" ref={panelRef} tabIndex={-1} aria-live="polite">
        {picked0 ? (
          <>
            <p className="tp-kicker">已选问题</p>
            <h2>{picked0.text}</h2>
            <ul>
              {picked0.links.map((l) => {
                const c = courseByCode(l.code)!;
                return (
                  <li key={l.code} className={c.implemented ? 'open' : ''}>
                    <b>{l.code}</b> {c.title}
                    <span>{l.where}</span>
                    {!c.implemented && <em>V1 未实现</em>}
                  </li>
                );
              })}
            </ul>
            <button className="tp-clear" onClick={() => setPicked(null)}>
              取消选择（Esc）
            </button>
          </>
        ) : (
          <>
            <p className="tp-kicker">怎样读这张图</p>
            <p>中心是问题；四个具体问题向外展开，再连到在课程大纲里处理它们的课程小节。</p>
            <dl className="legend">
              <dt>
                <i className="lg lg-q" />
              </dt>
              <dd>问题与课程小节（本原型的编辑示意分组）</dd>
              <dt>
                <i className="lg lg-doc" />
              </dt>
              <dd>课程大纲中已写明的课程联系</dd>
              <dt>
                <i className="lg lg-cn1" />
              </dt>
              <dd>可阅读的课程：CN1（样章草稿）</dd>
            </dl>
            <p className="tp-tip">悬停或选择一个问题，只看与它相关的课程。</p>
          </>
        )}
      </aside>

      <button className="back-pill" onClick={() => navigate({ name: 'questions' })}>
        ← 回到哲学问题
      </button>
    </main>
  );
}

import { courseByCode, decode, HUMAN_NATURE, nameOf, TOPICS } from '../data/catalog';
import { navigate } from '../router';
import { readingStatus } from '../state/reading';
import { TopBar, NotBuilt, useEscape } from './Chrome';
import Wayfinder from './Wayfinder';
import { goCourse } from './nav';

const QS = HUMAN_NATURE.questions;

// Question detail. Hierarchy: the question (h1) › four sub-questions (main
// structure) › one red recommendation card › every course reference under a
// sub-question as a plain secondary text link.
export default function Topic({ topic }: { topic: string }) {
  const tp = TOPICS.find((t) => t.id === topic) ?? TOPICS[5];
  const status = readingStatus('CN1');
  useEscape(() => navigate({ name: 'questions' }));

  if (!tp.implemented)
    return (
      <main id="main" tabIndex={-1} className="pg">
        <TopBar />
        <Wayfinder page="topic" topic={tp.id} />
        <div className="pg-body">
          <h1>{tp.title}</h1>
          <p className="lede">这个问题在原型中尚未展开。</p>
        </div>
      </main>
    );

  const open = (code: string) => goCourse(code);
  const viaCN1 = QS.filter((q) => q.links.some((l) => l.code === 'CN1')).length;

  return (
    <main id="main" tabIndex={-1} className="pg pg-topic">
      <TopBar />
      <Wayfinder page="topic" topic={tp.id} />
      <div className="pg-body topic-layout">
        <div className="topic-main">
          <header className="pg-head">
            <h1>{tp.title}</h1>
            <p className="lede lede--q">{tp.question}</p>
            <blockquote className="core-q">
              <p>{HUMAN_NATURE.core}</p>
              <cite>—— {decode(HUMAN_NATURE.coreSource).replace('「', '《').replace('」 ', '》').replace('」', '》')}</cite>
            </blockquote>
          </header>

          <section aria-labelledby="q-h">
            <h2 id="q-h" className="sec-h">
              这个问题可以拆成四个具体问题
            </h2>
            <ol className="q-rows">
              {QS.map((q, i) => (
                <li key={q.id} className="q-row">
                  <span className="qr-no">{i + 1}</span>
                  <div className="qr-body">
                    <h3>{q.text}</h3>
                    <ul className="qr-courses" aria-label="处理这个问题的课程">
                      {q.links.map((l) => {
                        const c = courseByCode(l.code)!;
                        return (
                          <li key={l.code} className={c.implemented ? 'is-open' : ''}>
                            {c.implemented ? (
                              <button className="qr-link" onClick={() => open(l.code)}>
                                {c.title}
                              </button>
                            ) : (
                              <span className="qr-off">{c.title}</span>
                            )}
                            <small>{l.where}</small>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
            <p className="note">问题与课程小节的分组是本原型的编辑示意。《孔子、孟子与荀子》和《康德》可以打开，其余课程在原型中未实现。</p>
          </section>
        </div>

        <aside className="start-card-wrap">
          <div className="start-card">
            <p className="sc-k">推荐课程 · 原型中可阅读</p>
            <h2>建议从这门课开始</h2>
            <p className="sc-title">{courseByCode('CN1')!.title}</p>
            <p className="sc-why">
              四个具体问题里有 {viaCN1} 个都连到这门课。原型中可以阅读的另一门课《康德》，连到第 3 个问题。
            </p>
            <button className="sc-go" onClick={() => open('CN1')}>
              打开这门课 →
            </button>
            {status.state !== 'new' && <p className="sc-state">{status.state === 'done' ? '你已读完这门课' : `你已读 ${status.pct}%`}</p>}
          </div>
          <details className="doc-details">
            <summary>大纲中写明的课程联系（{HUMAN_NATURE.documented.length}）</summary>
            <ul className="doc-links">
              {HUMAN_NATURE.documented.map((d) => (
                <li key={d.from + d.to}>
                  <span className="dl-path">
                    {nameOf(d.from)} → {nameOf(d.to)}
                  </span>
                  <span className="dl-note">{decode(d.note)}</span>
                </li>
              ))}
            </ul>
            <NotBuilt>除《孔子、孟子与荀子》外均未实现</NotBuilt>
          </details>
        </aside>
      </div>
    </main>
  );
}

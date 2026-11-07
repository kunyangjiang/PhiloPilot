import { HUMAN_NATURE, nameOf, TOPICS, topicCourseCodes } from '../data/catalog';
import { NAMES } from '../data/units';
import { PUBLISHED } from '../content/courses';
import { navigate } from '../router';
import { TopBar, NotBuilt, useEscape } from './Chrome';
import Wayfinder from './Wayfinder';
import { goTopic } from './nav';

// The 哲学问题 entrance.
// Featured-topic rule (deterministic, data-driven): the large block shows the
// topic(s) marked `implemented` in the catalogue, i.e. the only question that
// is fully built in this prototype. It says so on the block itself. The other
// topics keep the curriculum order. No ranking or personalisation.
export default function Questions() {
  useEscape(() => navigate({ name: 'home' }));
  const open = TOPICS.find((t) => t.implemented)!;
  const others = TOPICS.filter((t) => !t.implemented);
  return (
    <main id="main" tabIndex={-1} className="pg pg-questions">
      <TopBar />
      <Wayfinder page="questions" />
      <div className="pg-body">
        <header className="pg-head">
          <h1>哲学问题</h1>
          <p className="lede">从一个真实的问题出发，穿过各个传统。大纲共 {TOPICS.length} 个问题，原型中已展开 1 个。</p>
        </header>
        <div className="q-layout">
          <div className="q-feature-wrap">
            <button className="q-feature" onClick={() => goTopic(open.id)}>
              <span className="qf-k">原型中目前唯一已展开的问题</span>
              <span className="qf-title">{open.title}</span>
              <span className="qf-q">{open.question}</span>
              <span className="qf-meta">
                {HUMAN_NATURE.questions.length} 个具体问题 · 连到 {topicCourseCodes().length} 门课 · 可读到{topicCourseCodes().filter((c) => c in PUBLISHED).map((c) => `《${PUBLISHED[c].name}》`).join('')}
              </span>
              <span className="qf-go">进入这个问题 →</span>
            </button>
            <p className="note">放在这里只因为它是唯一完整实现的问题，并不表示它比其他问题更重要。</p>
          </div>
          <section className="q-others" aria-labelledby="q-others-h">
            <h2 id="q-others-h" className="q-others-h">
              其他 {others.length} 个问题（按大纲顺序） <NotBuilt>原型未展开</NotBuilt>
            </h2>
            <ul>
              {others.map((t) => (
                <li key={t.id}>
                  <span className="qo-title">{t.title}</span>
                  <span className="qo-q">{t.question}</span>
                  <span className="qo-c">{t.courses.map((c) => nameOf(c, NAMES)).join(' · ')}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

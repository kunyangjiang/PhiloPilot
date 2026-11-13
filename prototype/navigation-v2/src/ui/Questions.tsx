import { HUMAN_NATURE, nameOf, TOPICS } from '../data/catalog';
import { NAMES } from '../data/units';
import { PUBLISHED } from '../content/courses';
import { navigate } from '../router';
import { TopBar, useEscape } from './Chrome';
import Wayfinder from './Wayfinder';
import { goCourse, goTopic, QUESTIONS_CRUMB } from './nav';

// The 哲学问题 entrance: the ten questions in curriculum order, all with the
// same weight. Each lists the systematic courses that take it up; a question
// with its own page (人性与道德) also links to its sub-questions.
const SYSTEMATIC = new Set(TOPICS.flatMap((t) => t.courses)).size;

export default function Questions() {
  useEscape(() => navigate({ name: 'home' }));
  return (
    <main id="main" tabIndex={-1} className="pg pg-questions">
      <TopBar />
      <Wayfinder page="questions" />
      <div className="pg-body">
        <header className="pg-head">
          <h1>哲学问题</h1>
          <p className="lede">
            从一个真实的问题出发，穿过各个传统。{TOPICS.length} 个问题，{SYSTEMATIC} 门系统课。
          </p>
        </header>
        <ol className="qg">
          {TOPICS.map((t, i) => (
            <li key={t.id} className="qg-card">
              <span className="qg-no" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="qg-title">{t.title}</h2>
              <p className="qg-q">{t.question}</p>
              <ul className="qg-courses" aria-label={`「${t.title}」的课程`}>
                {t.courses.map((c) => (
                  <li key={c}>
                    {c in PUBLISHED ? (
                      <button className="qg-course" onClick={() => goCourse(c, [QUESTIONS_CRUMB])}>
                        {PUBLISHED[c].name} →
                      </button>
                    ) : (
                      nameOf(c, NAMES)
                    )}
                  </li>
                ))}
              </ul>
              {t.implemented && (
                <button className="qg-more" onClick={() => goTopic(t.id)}>
                  拆成 {HUMAN_NATURE.questions.length} 个具体问题，穿过各传统的课程 →
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}

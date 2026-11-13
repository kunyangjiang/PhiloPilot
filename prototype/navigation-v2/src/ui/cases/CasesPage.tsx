import { caseText } from '../../content/caseBooks';
import { CASES } from '../../content/cases';
import { navigate } from '../../router';
import { TopBar, useEscape } from '../Chrome';
import CaseCrumbs from './CaseCrumbs';
import { caseStatus } from './caseState';
import '../../styles/cases.css';

// 哲学案例 overview. The listed cases; only written ones open. The others
// are plain text with no link, and say they are not written yet.

export default function CasesPage() {
  useEscape(() => navigate({ name: 'home' }));
  const open = CASES.filter((c) => c.available);
  const numerals = ['零', '一', '两', '三', '四', '五', '六', '七', '八', '九', '十', '十一'];
  return (
    <main id="main" tabIndex={-1} className="pg pg-cases">
      <TopBar />
      <CaseCrumbs items={[{ label: '哲学案例', kind: '栏目' }]} />
      <div className="pg-body cases-body">
        <header className="cases-head">
          <p className="kicker">PhiloPilot Cases</p>
          <h1 className="cases-title">哲学案例</h1>
          <p className="cases-lede">
            以小说写成的哲学案例。每个案例是一个独立的故事，故事之后附有哲学分析、决策点和练习。
            <small>哲学案例不属于 72 门课程，不计入课程数，也不影响课程的阅读进度。</small>
          </p>
          <p className="cases-avail">
            目前可以阅读的{open.length === 1 ? '只有 ' : '有 '}
            {open
              .map((c) => `${c.no}《${c.title}》`)
              .join('、')
              .replace(/、(?=[^、]*$)/, '和 ')}。
            {CASES.length > open.length && `其余${numerals[CASES.length - open.length]}个案例已确定题目和方向，尚未写作。`}
          </p>
        </header>

        <ol className="cases-list" aria-label={`${numerals[CASES.length] ?? CASES.length}个哲学案例`}>
          {CASES.map((c) => {
            const text = c.available ? caseText(c.no) : undefined;
            const st = text ? caseStatus(text.book) : undefined;
            const body = (
              <>
                <span className="case-no" aria-hidden="true">
                  {c.no}
                </span>
                <span className="case-main">
                  <span className="case-t">
                    <span className="visually-hidden">案例 {c.no}：</span>《{c.title}》
                  </span>
                  {c.genre && <span className="case-genre">{c.genre}</span>}
                  <span className="case-premise">{c.premise}</span>
                  <span className="case-subj">
                    <span className="case-subj-k">涉及</span>
                    {c.subjects.join(' · ')}
                  </span>
                </span>
                <span className="case-status">
                  {st ? (
                    <>
                      <span className="case-st case-st--open">
                        {st.state === 'progress' ? `继续阅读 · 已读 ${st.pct}%` : st.state === 'done' ? '已读完' : '可以阅读'}
                      </span>
                      <span className="case-go" aria-hidden="true">
                        →
                      </span>
                    </>
                  ) : (
                    <span className="case-st">尚未写作</span>
                  )}
                </span>
              </>
            );
            return (
              <li key={c.no} className={'case-card' + (st ? ' is-open' : ' is-planned')}>
                {st ? (
                  <a
                    className="case-link"
                    href={`#/cases/${c.no}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate({ name: 'case', no: c.no });
                    }}
                  >
                    {body}
                  </a>
                ) : (
                  <div className="case-link">{body}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}

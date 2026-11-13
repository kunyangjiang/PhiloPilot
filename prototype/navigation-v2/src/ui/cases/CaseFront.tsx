import { caseText } from '../../content/caseBooks';
import { PUBLISHED } from '../../content/courses';
import { navigate } from '../../router';
import { TopBar, useEscape } from '../Chrome';
import { goCourse } from '../nav';
import CaseCrumbs from './CaseCrumbs';
import { caseResume, caseStatus } from './caseState';
import '../../styles/cases.css';

// Front page of a written case: what it is, the content note, where to start
// or resume, the chapters, and which courses it connects to (see caseBooks.ts).

export default function CaseFront({ no }: { no: string }) {
  useEscape(() => navigate({ name: 'cases' }));
  const { book, links: LINKS } = caseText(no)!;
  const { APPENDICES, CHAPTERS, CONTENT_NOTE, FICTION_NOTE, GENRE, NOVEL_CHARS, TITLE } = book;
  const st = caseStatus(book);
  const read = (part: number, block?: number) => navigate({ name: 'caseReader', no, part, block });
  const first = CHAPTERS[0].index;

  return (
    <main id="main" tabIndex={-1} className="pg pg-case">
      <TopBar />
      <CaseCrumbs
        items={[
          { label: '哲学案例', kind: '栏目', route: { name: 'cases' } },
          { label: TITLE, kind: '案例' },
        ]}
      />
      <div className="pg-body course-grid">
        <section className="course-main">
          <p className="kicker">
            <a
              href="#/cases"
              onClick={(e) => {
                e.preventDefault();
                navigate({ name: 'cases' });
              }}
            >
              哲学案例
            </a>{' '}
            · 案例 {no} · {GENRE}
          </p>
          <h1 className="course-title case-title">《{TITLE}》</h1>
          <p className="case-fiction">{FICTION_NOTE}</p>
          {CONTENT_NOTE && (
            <p className="case-content-note" role="note">
              <span className="ccn-k">阅读提示</span>
              {CONTENT_NOTE}
            </p>
          )}

          <div className={'read-card read-card--' + st.state}>
            {st.state === 'new' && (
              <button className="rc-go" onClick={() => read(first)}>
                <span className="rc-k">尚未开始 · 共 {CHAPTERS.length} 章</span>
                <span className="rc-t">开始阅读 →</span>
                <span className="rc-s">
                  从{/^[一二三四五六七八九十]+$/.test(CHAPTERS[0].no) ? '第一章' : CHAPTERS[0].no}「{CHAPTERS[0].name}」读起
                </span>
              </button>
            )}
            {st.state === 'progress' && (
              <button
                className="rc-go"
                onClick={() => {
                  const t = caseResume(book);
                  read(t.part, t.block);
                }}
              >
                <span className="rc-k">已读 {st.pct}%</span>
                <span className="rc-t">继续阅读 →</span>
                <span className="rc-s">{st.pos ? `回到：${st.where}` : '从第一个未读完的章节继续'}</span>
              </button>
            )}
            {st.state === 'done' && (
              <button className="rc-go" onClick={() => read(first)}>
                <span className="rc-k">已读完全部 {CHAPTERS.length} 章</span>
                <span className="rc-t">重新阅读 →</span>
                <span className="rc-s">从第一章再读一遍，或在目录中挑一章；附录在正文之后</span>
              </button>
            )}
          </div>

          <dl className="facts">
            <div>
              <dt>篇幅</dt>
              <dd>
                {CHAPTERS.length} 章 · 正文约 {(NOVEL_CHARS / 10000).toFixed(1)} 万字
                <small className="facts-note">另附哲学分析、决策点和练习</small>
              </dd>
            </div>
          </dl>

          <h2 className="sec-h">与课程的联系</h2>
          <ul className="next-list">
            {LINKS.filter((l) => PUBLISHED[l.code]).map((l) => (
              <li key={l.code}>
                <span className="nl-k">{l.why}</span>{' '}
                <button className="inline-link" onClick={() => goCourse(l.code, [])}>
                  {PUBLISHED[l.code].name}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="course-side" aria-label="目录">
          <h2 className="sec-h">目录 · 共 {CHAPTERS.length} 章</h2>
          <ol className="toc-list">
            {CHAPTERS.map((s) => {
              const p = st.progress[s.index] ?? 0;
              return (
                <li key={s.index} className={st.pos?.section === s.index ? 'is-here' : ''}>
                  <button className="toc-link" onClick={() => read(s.index)}>
                    <span className="tl-n">{s.no}</span>
                    <span className="tl-t">{s.name}</span>
                    <span className="tl-k">{(s.chars / 1000).toFixed(1)} 千字</span>
                    <span className="pbar" style={{ ['--p' as string]: p }}>
                      <span className="visually-hidden">已读 {Math.round(p * 100)}%</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="note">
            附录会提到小说的结局，建议读完再看：
            {APPENDICES.map((s, i) => (
              <span key={s.index}>
                {i > 0 && '、'}
                <button className="inline-link" onClick={() => read(s.index)}>
                  {s.name}
                </button>
              </span>
            ))}
          </p>
          <p className="note">
            <button className="inline-link" onClick={() => navigate({ name: 'cases' })}>
              ← 返回哲学案例
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}

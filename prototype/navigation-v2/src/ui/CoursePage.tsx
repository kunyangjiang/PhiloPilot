import { courseByCode, nameOf } from '../data/catalog';
import { NAMES } from '../data/units';
import { shortTitle } from '../content/course';
import { PUBLISHED, TRADITION_NAME, type Tradition } from '../content/courses';
import { currentCtx, navigate } from '../router';
import { getProgress } from '../state/store';
import { readingStatus, resumeTarget } from '../state/reading';
import { TopBar, useEscape } from './Chrome';
import Wayfinder from './Wayfinder';
import { canonicalOf } from './nav';

/** Label for a curriculum link to another course. */
/** Recommended background, without the curriculum's bookkeeping wording. */
const backgroundText = (s: string) =>
  s
    .replace(/（IN1—IN7 中任何一门；推荐背景，不是必需）/g, '')
    .replace(/（推荐背景，不是必需）/g, '')
    .replace(/（推荐背景，不是必需；/g, '（')
    .replace(/；推荐背景，不是必需）/g, '）')
    .replace(/（不是必需）/g, '')
    .replace(/（不是必需；/g, '（')
    .replace(/大纲建议先读/g, '建议先读')
    .replace(/大纲认为(拓展课程)?(.+?)会?有帮助/g, '读过$1$2会有帮助');

const linkKind = (code: string, tradition: Tradition) =>
  code.startsWith('S') ? '哲学问题' : code.startsWith('D') ? '跨传统对话' : code.toLowerCase().startsWith(tradition) ? `${TRADITION_NAME[tradition]} · 后续` : '后续';

// Course front page. One focal point: the red reading block, whose action
// follows the reading state (开始 / 继续 / 已读完). Parts, length and progress
// all use the instructional sections only (see content/course.ts).
export default function CoursePage({ code }: { code: string }) {
  const ctx = currentCtx();
  const fromTopic = ctx.some((c) => c.hash === '#/questions/human-nature');
  const course = PUBLISHED[code];

  useEscape(() => {
    const back = ctx[ctx.length - 1]?.hash ?? '#/';
    history.pushState(null, '', back);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

  if (!course)
    return (
      <main id="main" tabIndex={-1} className="pg">
        <TopBar />
        <Wayfinder page="course" code={code} />
        <div className="pg-body">
          <h1>{nameOf(code)}</h1>
          <p className="lede">没有找到这门课。</p>
        </div>
      </main>
    );

  const { TITLE, SUBTITLE, SECTIONS, READING, APPENDIX, TOTAL_CHARS, CORE_QUESTION, SUMMARY } = course.text;
  const status = readingStatus(code);
  const progress = getProgress(code);
  const read = (section: number, block?: number) => navigate({ name: 'reader', code, section, block });
  const first = READING[0].index;
  const canonical = canonicalOf(code);
  const linked = (c: string) => {
    const pub = PUBLISHED[c];
    const title = courseByCode(c)?.title ?? NAMES[c] ?? c;
    return pub ? (
      <button className="inline-link" onClick={() => navigate({ name: 'course', code: c })}>
        {title}
      </button>
    ) : (
      <>{title}</>
    );
  };

  return (
    <main id="main" tabIndex={-1} className="pg pg-course">
      <TopBar />
      <Wayfinder page="course" code={code} />
      <div className="pg-body course-grid">
        <section className="course-main">
          <p className="kicker">
            课程位置：
            {canonical.map((c, i) => (
              <span key={c.hash}>
                {i > 0 && ' › '}
                <a href={c.hash}>{c.label}</a>
              </span>
            ))}{' '}
            · 第 {course.position} 门 · {course.tier}课程
          </p>
          <h1 className="course-title">{TITLE}</h1>
          <p className="course-en">{SUBTITLE}</p>

          <div className={'read-card read-card--' + status.state}>
            {status.state === 'new' && (
              <button className="rc-go" onClick={() => read(first)}>
                <span className="rc-k">尚未开始 · 共 {READING.length} 部分</span>
                <span className="rc-t">开始阅读 →</span>
                <span className="rc-s">从第 1 部分「{shortTitle(READING[0].title)}」读起</span>
              </button>
            )}
            {status.state === 'progress' && (
              <button
                className="rc-go"
                onClick={() => {
                  const t = resumeTarget(code);
                  read(t.section, t.block);
                }}
              >
                <span className="rc-k">已读 {status.pct}%</span>
                <span className="rc-t">继续阅读 →</span>
                <span className="rc-s">{status.pos ? `回到：${status.where}` : '从第一个未读完的部分继续'}</span>
              </button>
            )}
            {status.state === 'done' && (
              <button className="rc-go" onClick={() => read(first)}>
                <span className="rc-k">已读完全部 {READING.length} 部分</span>
                <span className="rc-t">重新阅读 →</span>
                <span className="rc-s">从「{shortTitle(READING[0].title)}」再读一遍，或在右侧目录中挑一部分复习</span>
              </button>
            )}
            {status.state !== 'done' && fromTopic && course.topicSection != null && (
              <button className="rc-alt" onClick={() => read(course.topicSection!)}>
                直接读与「人性与道德」
                <br />
                最相关的「{shortTitle(SECTIONS[course.topicSection].title)}」
              </button>
            )}
          </div>

          <div className="core-q core-q--course">
            <span className="core-q-k">核心问题</span>
            <p>{CORE_QUESTION}</p>
          </div>
          <p className="course-summary">{SUMMARY}</p>
          <dl className="facts">
            <div>
              <dt>推荐背景</dt>
              <dd>{backgroundText(course.background)}</dd>
            </div>
            <div>
              <dt>方法重点</dt>
              <dd>{course.method}</dd>
            </div>
            <div>
              <dt>篇幅</dt>
              <dd>
                {READING.length} 部分 · 正文约 {(TOTAL_CHARS / 10000).toFixed(1)} 万字
              </dd>
            </div>
          </dl>
        </section>

        <section className="course-side" aria-label="阅读结构与位置">
          <h2 className="sec-h">目录 · 共 {READING.length} 部分</h2>
          <ol className="toc-list">
            {READING.map((s, i) => {
              const p = progress[s.index] ?? 0;
              return (
                <li key={s.index} className={status.pos?.section === s.index ? 'is-here' : ''}>
                  <button className="toc-link" onClick={() => read(s.index)}>
                    <span className="tl-n">{i + 1}</span>
                    <span className="tl-t">{s.title}</span>
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
            附录：
            {APPENDIX.map((s, i) => (
              <span key={s.index}>
                {i > 0 && '、'}
                <button className="inline-link" onClick={() => read(s.index)}>
                  {s.title}
                </button>
              </span>
            ))}
          </p>

          {course.recommendFrom.length + course.leadsTo.length > 0 && (
            <>
            <h2 className="sec-h">读完以后</h2>
            <ul className="next-list">
              {course.recommendFrom.map((c) => (
                <li key={'r' + c}>
                  {/* A course in another tradition (EA9 → AF3) is named by its own tradition. */}
                  <span className="nl-k">
                    {(PUBLISHED[c]?.tradition ?? course.tradition) === course.tradition
                      ? `${TRADITION_NAME[course.tradition]} · 下一门`
                      : `${TRADITION_NAME[PUBLISHED[c].tradition]} · 可接着读`}
                  </span>{' '}
                  {linked(c)}
                </li>
              ))}
              {course.leadsTo
                .filter((c) => !course.recommendFrom.includes(c))
                .map((c) => (
                  <li key={c}>
                    <span className="nl-k">{linkKind(c, course.tradition)}</span> {linked(c)}
                  </li>
                ))}
            </ul>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

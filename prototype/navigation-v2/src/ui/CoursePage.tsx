import { CN1_META, courseByCode, nameOf } from '../data/catalog';
import { APPENDIX, CORE_QUESTION, MENCIUS_SECTION, READING, SECTIONS, STATUS_HTML, SUBTITLE, SUMMARY, TITLE, TOTAL_CHARS, shortTitle } from '../content/cn1';
import { currentCtx, navigate } from '../router';
import { getProgress } from '../state/store';
import { readingStatus, resumeTarget } from '../state/reading';
import { TopBar, NotBuilt, useEscape } from './Chrome';
import Wayfinder from './Wayfinder';
import { CANONICAL } from './nav';

// Course front page. One focal point: the red reading block, whose action
// follows the reading state (开始 / 继续 / 已读完). Parts, length and progress
// all use the instructional sections only (see content/cn1.ts).
export default function CoursePage({ code }: { code: string }) {
  const ctx = currentCtx();
  const fromTopic = ctx.some((c) => c.hash === '#/questions/human-nature');
  const status = readingStatus();
  const progress = getProgress();

  useEscape(() => {
    const back = ctx[ctx.length - 1]?.hash ?? '#/';
    history.pushState(null, '', back);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

  if (code !== 'CN1' || !courseByCode(code)?.implemented)
    return (
      <main id="main" tabIndex={-1} className="pg">
        <TopBar />
        <Wayfinder page="course" />
        <div className="pg-body">
          <h1>{nameOf(code)}</h1>
          <p className="lede">这门课在原型中尚未实现。</p>
        </div>
      </main>
    );

  const read = (section: number, block?: number) => navigate({ name: 'reader', code, section, block });
  const first = READING[0].index;
  const canonical = CANONICAL.CN1;

  return (
    <main id="main" tabIndex={-1} className="pg pg-course">
      <TopBar />
      <Wayfinder page="course" />
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
            · 第 1 门 · {CN1_META.tier}课程 <span className="draft-tag">样章草稿</span>
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
              <button className="rc-go" onClick={() => { const t = resumeTarget(); read(t.section, t.block); }}>
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
            {status.state !== 'done' && fromTopic && MENCIUS_SECTION >= 0 && (
              <button className="rc-alt" onClick={() => read(MENCIUS_SECTION)}>
                直接读与「人性与道德」
                <br />
                最相关的「{shortTitle(SECTIONS[MENCIUS_SECTION].title)}」
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
              <dd>{CN1_META.background}</dd>
            </div>
            <div>
              <dt>方法重点</dt>
              <dd>{CN1_META.method}</dd>
            </div>
            <div>
              <dt>篇幅</dt>
              <dd>
                {READING.length} 部分 · 正文约 {(TOTAL_CHARS / 10000).toFixed(1)} 万字
                <small className="facts-note">按页面显示文字计，含引文与练习；不含图表、注释与来源附录</small>
              </dd>
            </div>
          </dl>
          <details className="draft-status">
            <summary>草稿状态</summary>
            <div dangerouslySetInnerHTML={{ __html: STATUS_HTML }} />
          </details>
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
            附录（不计入部分与进度）：
            {APPENDIX.map((s, i) => (
              <span key={s.index}>
                {i > 0 && '、'}
                <button className="inline-link" onClick={() => read(s.index)}>
                  {s.title}
                </button>
              </span>
            ))}
          </p>

          <h2 className="sec-h">读完以后</h2>
          <ul className="next-list">
            {CN1_META.recommendFromCN1.map((c) => (
              <li key={c}>
                <span className="nl-k">中国哲学 · 下一门</span> {courseByCode(c)!.title} <NotBuilt>原型未实现</NotBuilt>
              </li>
            ))}
            {CN1_META.leadsTo.map((c) => (
              <li key={c}>
                <span className="nl-k">{c.startsWith('CN') ? '中国哲学 · 后续' : c.startsWith('S') ? '哲学问题' : '跨传统对话'}</span> {courseByCode(c)!.title}{' '}
                <NotBuilt>原型未实现</NotBuilt>
              </li>
            ))}
          </ul>
          <p className="note">以上联系均来自课程大纲。</p>
        </section>
      </div>
    </main>
  );
}

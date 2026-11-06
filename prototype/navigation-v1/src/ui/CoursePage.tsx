import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { CN1_META, courseByCode, HUMAN_NATURE } from '../data/catalog';
import { CORE_QUESTION, MENCIUS_SECTION, SECTIONS, STATUS_HTML, SUBTITLE, SUMMARY, TITLE, TOTAL_CHARS, shortTitle } from '../content/cn1';
import { navigate } from '../router';
import { getPosition, getProgress, getTrail, isReduced } from '../state/store';
import { Breadcrumb, HOME_CRUMB, SearchIcon } from './Chrome';
import { openSearch } from './SearchPalette';
import { peekPending, setPending } from './transition';

const TEXTS = ['论语', '孟子', '荀子'];
const MAIN = SECTIONS.filter((s) => s.title !== '注释' && s.title !== '来源与权利说明');

export default function CoursePage({ code }: { code: string }) {
  const emblemRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLOListElement>(null);
  const trail = getTrail();
  const crumbs = [...(trail.length ? trail : [HOME_CRUMB]), { label: 'CN1 孔子、孟子与荀子', hash: '#/course/CN1' }];
  const fromTopic = trail.some((c) => c.hash === '#/questions/human-nature');
  const pos = getPosition();
  const progress = getProgress();
  const pct = Math.round((SECTIONS.reduce((s, x) => s + (progress[x.index] ?? 0) * x.chars, 0) / TOTAL_CHARS) * 100);

  // Which primary texts each section quotes (counted from the draft's citations).
  const weave = useMemo(
    () =>
      MAIN.map((s) =>
        TEXTS.map((t) => s.blocks.filter((b) => b.kind === 'source' && b.cite.includes(`《${t}`)).length),
      ),
    [],
  );

  // Shared-element entrance: the emblem grows out of the course node that was clicked.
  useLayoutEffect(() => {
    const p = peekPending();
    const el = emblemRef.current;
    if (!el || !p || p.kind !== 'iris-open' || !p.origin || isReduced()) return;
    const r = el.getBoundingClientRect();
    const dx = p.origin.x - (r.left + r.width / 2), dy = p.origin.y - (r.top + r.height / 2);
    const s = ((p.origin.r ?? 12) * 2) / r.width;
    el.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 1, filter: 'brightness(2)' },
        { transform: 'translate(0,0) scale(1)', opacity: 1, filter: 'brightness(1)' },
      ],
      { duration: 1050, easing: 'cubic-bezier(.2,.75,.15,1)', fill: 'backwards' },
    );
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('.palette')) {
        const back = crumbs[crumbs.length - 2];
        history.pushState(null, '', back.hash);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  const startReading = (section: number, block?: number) => {
    const rows = [...(rowsRef.current?.querySelectorAll('.sw-weave') ?? [])].map((r) => r.getBoundingClientRect());
    setPending({ kind: 'weave', rows });
    navigate({ name: 'reader', code, section, block });
  };

  const entry = fromTopic ? MENCIUS_SECTION : 0;
  const topicLinks = HUMAN_NATURE.questions.filter((q) => q.links.some((l) => l.code === 'CN1'));

  return (
    <main id="main" tabIndex={-1} className="course">
      <header className="course-bar">
        <button className="brand brand--small" onClick={() => navigate({ name: 'home' })} aria-label="PhiloPilot 首页">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
        <Breadcrumb crumbs={crumbs} />
        <button className="tool tool-search tool--compact" onClick={openSearch} aria-label="搜索">
          <SearchIcon />
        </button>
      </header>

      <div className="course-grid">
        <section className="course-hero">
          <div className="emblem" ref={emblemRef} aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <radialGradient id="emb-core">
                  <stop offset="0" stopColor="#fff4d6" />
                  <stop offset="0.35" stopColor="#e9c27a" />
                  <stop offset="1" stopColor="#e9c27a" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="62" fill="url(#emb-core)" opacity="0.55" />
              <circle className="emb-ring" cx="100" cy="100" r="58" />
              <circle className="emb-ring emb-ring--2" cx="100" cy="100" r="80" />
              {[0, 1, 2, 3].map((i) => (
                <path key={i} className="emb-sprout" d="M100 100 q 18 -30 0 -70" transform={`rotate(${i * 90 + 45} 100 100)`} style={{ ['--i' as string]: i }} />
              ))}
              <text x="100" y="108" textAnchor="middle" className="emb-code">
                CN1
              </text>
            </svg>
          </div>
          <p className="course-kicker">
            {CN1_META.tier}课程 · 中国哲学 · 第 1 门 <span className="draft-tag">样章草稿</span>
          </p>
          <h1 className="course-title">{TITLE}</h1>
          <p className="course-en">{SUBTITLE}</p>
          <div className="course-question">
            <span>核心问题</span>
            <p>{CORE_QUESTION}</p>
          </div>
          <p className="course-summary">{SUMMARY}</p>
          <dl className="course-facts">
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
                约 {(TOTAL_CHARS / 10000).toFixed(1)} 万字 · {MAIN.length} 部分
              </dd>
            </div>
          </dl>
          <div className="course-cta">
            {pos ? (
              <button className="cta-primary" onClick={() => startReading(pos.section, pos.block)}>
                <span>继续阅读</span>
                <small>
                  {shortTitle(pos.sectionTitle)}
                  {pos.heading ? ` · ${pos.heading}` : ''} · 已读 {pct}%
                </small>
              </button>
            ) : (
              <button className="cta-primary" onClick={() => startReading(entry)}>
                <span>开始阅读</span>
                <small>{fromTopic ? `从「${shortTitle(SECTIONS[entry].title)}」读起（与你选的问题最相关）` : '从本章导读读起'}</small>
              </button>
            )}
            <button className="cta-secondary" onClick={() => startReading(0)}>
              从头阅读
            </button>
          </div>
        </section>

        <section className="course-side" aria-label="阅读结构">
          <div className="swatch">
            <div className="sw-head">
              <h2>阅读结构</h2>
              <ul className="sw-texts" aria-label="引用的原典">
                {TEXTS.map((t) => (
                  <li key={t}>《{t}》</li>
                ))}
              </ul>
            </div>
            <ol className="sw-rows" ref={rowsRef}>
              {MAIN.map((s, i) => {
                const frac = progress[s.index] ?? 0;
                return (
                  <li key={s.index} style={{ ['--i' as string]: i, ['--p' as string]: frac }}>
                    <button className="sw-row" onClick={() => startReading(s.index)} aria-label={`阅读 ${s.title}`}>
                      <span className="sw-title">{s.title}</span>
                      <span className="sw-meta">
                        {s.headings.length ? `${s.headings.length} 小节 · ` : ''}约 {Math.round(s.chars / 100) / 10} 千字
                        {frac > 0.02 ? ` · 已读 ${Math.round(frac * 100)}%` : ''}
                      </span>
                      <span className="sw-weave" aria-hidden="true">
                        <span className="sw-fill" />
                        {weave[i].map((n, k) =>
                          n ? <i key={k} className="sw-knot" style={{ ['--k' as string]: k, ['--n' as string]: Math.min(n, 6) }} title={`${n}`} /> : null,
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="sw-foot">结点 = 该部分引用原典的位置（按草稿中的引文出处统计）· 金线 = 你的阅读进度 · 另附「注释」与「来源与权利说明」</p>
          </div>

          <div className="course-map">
            <h2>在中国哲学中的位置</h2>
            <div className="line-map" role="list">
              {CN1_META.chineseLine.map((c, i) => {
                const course = courseByCode(c)!;
                return (
                  <div key={c} role="listitem" className={'lm-node' + (c === 'CN1' ? ' is-here' : '') + (CN1_META.recommendFromCN1.includes(c) ? ' is-next' : '')} style={{ ['--i' as string]: i }} title={course.title + (course.implemented ? '' : '（V1 未实现）')}>
                    <span className="lm-dot" />
                    <span className="lm-code">{c}</span>
                  </div>
                );
              })}
            </div>
            <p className="map-note">CN2、CN3、CN4 在大纲中都以 CN1 为推荐背景；其后接魏晋玄学与佛学（CN5）、理学（CN6）。</p>
            <h2>与系统哲学和对话课的联系</h2>
            <ul className="link-list">
              {CN1_META.leadsTo.map((c) => (
                <li key={c}>
                  <b>{c}</b> {courseByCode(c)!.title} <em>大纲已列 · V1 未实现</em>
                </li>
              ))}
            </ul>
            <p className="map-note">
              在「人性与道德」中，CN1 连接 {topicLinks.length} 个具体问题：{topicLinks.map((q) => q.text).join(' ')}
            </p>
          </div>
        </section>
      </div>
      <details className="course-status">
        <summary>草稿状态</summary>
        <div dangerouslySetInnerHTML={{ __html: STATUS_HTML }} />
      </details>
    </main>
  );
}

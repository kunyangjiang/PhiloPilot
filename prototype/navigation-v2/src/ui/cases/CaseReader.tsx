import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  CHAPTERS,
  APPENDICES,
  DECISIONS_INDEX,
  PRACTICE_INDEX,
  SECTIONS,
  TITLE,
  decisionPoints,
  isAppendix,
  type CaseBlock,
  type CaseSection,
} from '../../content/case02';
import { CASE02_PRACTICE } from '../../content/practice-case02';
import { navigate, type Route } from '../../router';
import { bumpProgress, getProgress, isReduced, setPosition } from '../../state/store';
import { TopBar } from '../Chrome';
import Practice from '../Practice';
import CaseCrumbs from './CaseCrumbs';
import { CODE, casePct } from './caseState';
import '../../styles/cases.css';

// The CASE 02 reader. It follows the course reader (rail, compact bar and
// drawer on narrow screens, previous/next, saved place) but stands alone:
// a case has no footnote panel, teaching components or course breadcrumbs.
// Progress and the saved place use the case's own keys (see caseState.ts),
// and are saved only after the reader's own input, never on a programmatic
// jump (opening a chapter, resume, back/forward).

type CaseRoute = Extract<Route, { name: 'caseReader' }>;

const DP = decisionPoints();

const plain = (b: CaseBlock, i: number) =>
  b.id ? (
    <h2 key={i} id={b.id} data-block={i} className="blk art-h" dangerouslySetInnerHTML={{ __html: b.html }} />
  ) : (
    <div key={i} data-block={i} className="blk" dangerouslySetInnerHTML={{ __html: b.html }} />
  );

/** 附录二: each decision point opens on what was known at the time; the
 *  other four parts (including what was known only later) are opened by the reader. */
function Decisions({ s }: { s: CaseSection }) {
  return (
    <>
      {DP.lead.map((b) => plain(b, s.blocks.indexOf(b)))}
      {DP.points.map((p) => (
        <section key={p.id} className="blk dp" data-block={p.block} aria-labelledby={p.id}>
          <h2 id={p.id} className="art-h dp-h">
            {p.title}
          </h2>
          {p.parts.map((x, k) => (
            <details key={x.label} className={'dp-part' + (x.label === '当时还没有的信息' ? ' dp-part--later' : '')} open={k === 0}>
              <summary>
                <span className="dp-n">{k + 1}</span>
                {x.label}
                {x.label === '当时还没有的信息' && <small>（事后才知道）</small>}
              </summary>
              <div className="dp-body" dangerouslySetInnerHTML={{ __html: x.html }} />
            </details>
          ))}
        </section>
      ))}
    </>
  );
}

function Exercises() {
  return (
    <>
      <p className="blk case-px-note" data-block={0}>
        三组练习，分别对应附录二的三个决策点。有的题没有唯一正确答案，只列出每种立场的长处和代价。
      </p>
      {CASE02_PRACTICE.map((set, i) => (
        <div key={set.label} className="blk" data-block={i + 1}>
          <Practice code={CODE} exerciseId={`${CODE}-practice-${set.label}`} set={set} promptHtml="" hintHtml="" />
        </div>
      ))}
    </>
  );
}

const Article = memo(function Article({ part }: { part: number }) {
  const s = SECTIONS[part];
  const chapterNo = CHAPTERS.findIndex((c) => c.index === part) + 1;
  return (
    <article className={'article case-article' + (isAppendix(part) ? ' case-article--appendix' : ' case-novel')} aria-labelledby="sec-title">
      <p className="art-kicker">
        {isAppendix(part) ? `《${TITLE}》 · 附录（不计入阅读进度）` : `《${TITLE}》 · 第 ${chapterNo} 章 / 共 ${CHAPTERS.length} 章`}
      </p>
      <h1 id="sec-title" className="art-title">
        {s.title}
      </h1>
      {part === DECISIONS_INDEX ? <Decisions s={s} /> : part === PRACTICE_INDEX ? <Exercises /> : s.blocks.map(plain)}
    </article>
  );
});

export default function CaseReader({ route }: { route: CaseRoute }) {
  const part = Math.max(0, Math.min(SECTIONS.length - 1, route.part));
  const s = SECTIONS[part];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeH, setActiveH] = useState<string | null>(null);
  const [frac, setFrac] = useState(0);
  const [progress, setProg] = useState(() => getProgress(CODE));
  const [flash, setFlash] = useState<number | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [barsHidden, setBarsHidden] = useState(false);
  const userMoved = useRef(false);
  const lastTop = useRef(0);
  const tocBtn = useRef<HTMLButtonElement>(null);
  const railRef = useRef<HTMLElement>(null);

  // Each navigation jumps to its block, or the top. Programmatic: it never
  // counts as reading or moves the saved place.
  useLayoutEffect(() => {
    setDrawer(false);
    userMoved.current = false;
    const sc = scrollRef.current;
    if (!sc) return;
    sc.scrollTop = 0;
    if (route.block != null) {
      const el = sc.querySelector<HTMLElement>(`.article [data-block="${route.block}"]`);
      if (el) {
        sc.scrollTop = el.getBoundingClientRect().top - sc.getBoundingClientRect().top - 120;
        setFlash(route.block);
        const t = window.setTimeout(() => setFlash(null), 2400);
        return () => window.clearTimeout(t);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const onScroll = useCallback(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    const max = sc.scrollHeight - sc.clientHeight;
    const f = max > 0 ? sc.scrollTop / max : 1;
    setFrac(f);
    const dy = sc.scrollTop - lastTop.current;
    if (Math.abs(dy) > 6) {
      setBarsHidden(dy > 0 && sc.scrollTop > 120);
      lastTop.current = sc.scrollTop;
    }
    if (userMoved.current) bumpProgress(CODE, part, f > 0.97 ? 1 : f);
    const blocks = [...sc.querySelectorAll<HTMLElement>('.article [data-block]')];
    const y = sc.getBoundingClientRect().top + 140;
    let cur = blocks[0];
    for (const b of blocks) {
      if (b.getBoundingClientRect().top <= y) cur = b;
      else break;
    }
    let h: string | null = null;
    for (const hd of s.headings) {
      const el = document.getElementById(hd.id);
      if (el && el.getBoundingClientRect().top <= y) h = hd.id;
    }
    setActiveH(h);
    // Only the reader's own scrolling (including 回到顶部 after reading) moves the saved place.
    if (cur && userMoved.current) {
      setPosition(CODE, {
        section: part,
        block: Number(cur.dataset.block),
        sectionTitle: s.title,
        heading: h ? s.headings.find((x) => x.id === h)!.text : '',
        at: Date.now(),
      });
    }
  }, [part, s]);

  useEffect(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    let raf = 0;
    const h = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    sc.addEventListener('scroll', h, { passive: true });
    const mark = () => (userMoved.current = true);
    const evs = ['wheel', 'pointerdown', 'touchstart', 'keydown'] as const;
    evs.forEach((ev) => sc.addEventListener(ev, mark, { passive: true }));
    onScroll();
    const iv = window.setInterval(() => setProg(getProgress(CODE)), 1200);
    return () => {
      sc.removeEventListener('scroll', h);
      evs.forEach((ev) => sc.removeEventListener(ev, mark));
      cancelAnimationFrame(raf);
      window.clearInterval(iv);
    };
  }, [onScroll]);

  const closeDrawer = (refocus = true) => {
    setDrawer(false);
    if (refocus) tocBtn.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (drawer) railRef.current?.querySelector<HTMLElement>('.rail-close')?.focus({ preventScroll: true });
  }, [drawer]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || e.defaultPrevented || document.querySelector('.palette, .dg-overlay')) return;
      if (drawer) closeDrawer();
      else navigate({ name: 'case', no: '02' });
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  const goPart = (i: number) => navigate({ name: 'caseReader', no: '02', part: i });
  const toFront = () => navigate({ name: 'case', no: '02' });
  const pct = casePct(progress, userMoved.current ? { part, frac } : undefined);
  const label = (x: CaseSection) => (isAppendix(x.index) ? x.title : `第${x.no}章　${x.name}`);
  const chapterNo = CHAPTERS.findIndex((c) => c.index === part) + 1;

  const railItem = (x: CaseSection) => {
    const p = x.index === part && userMoved.current ? Math.max(frac, progress[x.index] ?? 0) : progress[x.index] ?? 0;
    const cls = (x.index === part ? 'is-current ' : '') + (isAppendix(x.index) ? 'is-appendix' : p > 0.97 ? 'is-done' : p > 0.02 ? 'is-started' : '');
    return (
      <li key={x.index} className={cls}>
        <button
          onClick={() => {
            if (x.index === part) closeDrawer(false);
            goPart(x.index);
          }}
          aria-current={x.index === part ? 'page' : undefined}
        >
          <span className="rail-mark" aria-hidden="true" />
          <span className="rail-text">{x.title}</span>
        </button>
        {x.index === part && x.headings.length > 0 && (
          <ol className="rail-sub">
            {x.headings.map((h) => (
              <li key={h.id} className={activeH === h.id ? 'is-active' : ''}>
                <a
                  href={'#' + h.id}
                  onClick={(e) => {
                    e.preventDefault();
                    if (drawer) closeDrawer(false);
                    const el = document.getElementById(h.id);
                    const sc = scrollRef.current;
                    if (el && sc)
                      sc.scrollTo({
                        top: sc.scrollTop + el.getBoundingClientRect().top - sc.getBoundingClientRect().top - 100,
                        behavior: isReduced() ? 'auto' : 'smooth',
                      });
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        )}
      </li>
    );
  };

  return (
    <div className={'reader case-reader' + (barsHidden ? ' bars-hidden' : '') + (drawer ? ' has-drawer' : '')}>
      <TopBar />
      <CaseCrumbs
        items={[
          { label: '哲学案例', kind: '栏目', route: { name: 'cases' } },
          { label: TITLE, kind: '案例', route: { name: 'case', no: '02' } },
          { label: isAppendix(part) ? s.name : s.title, kind: isAppendix(part) ? '附录' : '章节' },
        ]}
      />
      <div className="reader-bar">
        <button className="rb-back" onClick={toFront} aria-label="返回案例首页">
          <span aria-hidden="true">‹</span> 案例
        </button>
        <p className="rb-where">
          <span className="rb-pos">{isAppendix(part) ? '附录' : `第 ${chapterNo} / ${CHAPTERS.length} 章`}</span>
          <span className="rb-title">{s.name}</span>
        </p>
        <button ref={tocBtn} className="rb-toc" aria-expanded={drawer} aria-controls="case-rail" onClick={() => (drawer ? closeDrawer() : setDrawer(true))}>
          目录 <small>{pct}%</small>
        </button>
      </div>
      <div className="reader-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${frac})` }} />
      </div>
      {drawer && <div className="rail-backdrop" onClick={() => closeDrawer()} aria-hidden="true" />}
      <div className="reader-scroll" ref={scrollRef} id="main" tabIndex={-1}>
        <div className="reader-grid">
          <nav className={'rail' + (drawer ? ' is-open' : '')} id="case-rail" aria-label="案例目录" ref={railRef}>
            <div className="rail-drawer-head">
              <p className="rail-path" aria-label="来路">
                <a
                  href="#/cases"
                  onClick={(e) => {
                    e.preventDefault();
                    setDrawer(false);
                    navigate({ name: 'cases' });
                  }}
                >
                  哲学案例
                </a>
                <i aria-hidden="true"> › </i>
                <a
                  href="#/cases/02"
                  onClick={(e) => {
                    e.preventDefault();
                    setDrawer(false);
                    toFront();
                  }}
                >
                  《{TITLE}》
                </a>
              </p>
              <button className="rail-close" onClick={() => closeDrawer()}>
                关闭
              </button>
            </div>
            <p className="rail-title">
              目录 · {CHAPTERS.length} 章 <span className="rail-pct">已读 {pct}%</span>
            </p>
            <ol>{CHAPTERS.map(railItem)}</ol>
            <p className="rail-group">附录 · 不计入进度</p>
            <ol className="rail-appendix">{APPENDICES.map(railItem)}</ol>
            <div className="rail-back">
              <button onClick={toFront}>← 案例首页</button>
              <button onClick={() => navigate({ name: 'cases' })}>← 哲学案例总览</button>
            </div>
          </nav>

          <div className="reader-body" key={part}>
            <style>{flash != null ? `.article [data-block="${flash}"]{background: var(--flash)}` : ''}</style>
            <Article part={part} />
            <aside className="margin" aria-hidden="true" />
            <footer className="section-nav">
              {part > 0 ? (
                <button className="sn-prev" onClick={() => goPart(part - 1)}>
                  <small>{isAppendix(part) && !isAppendix(part - 1) ? '← 回到正文' : isAppendix(part) ? '← 上一个附录' : '← 上一章'}</small>
                  {label(SECTIONS[part - 1])}
                </button>
              ) : (
                <span />
              )}
              {part < SECTIONS.length - 1 ? (
                <button className="sn-next" onClick={() => goPart(part + 1)}>
                  <small>{isAppendix(part + 1) && !isAppendix(part) ? '正文已完 · 附录 →' : isAppendix(part) ? '下一个附录 →' : '下一章 →'}</small>
                  {label(SECTIONS[part + 1])}
                </button>
              ) : (
                <button className="sn-next" onClick={() => navigate({ name: 'cases' })}>
                  <small>附录已完 →</small>
                  返回哲学案例总览
                </button>
              )}
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

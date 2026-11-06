import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { APPENDIX, FOOTNOTES, READING, SECTIONS, isAppendix, partNo, shortTitle, type Block } from '../content/cn1';
import { navigate, type Route } from '../router';
import { bumpProgress, getProgress, isReduced, setPosition } from '../state/store';
import { readPct } from '../state/reading';
import { TopBar } from './Chrome';
import Diagram from './Diagram';
import Exercise from './Exercise';
import Wayfinder, { crumbsFor, go } from './Wayfinder';

// Narrow screens (see swiss.css “V5 · Mobile and tablet”): at ≤1200px the
// context panel is a bottom sheet; at ≤900px the rail is a drawer opened from
// the compact reader bar.
const SHEET_MQ = '(max-width: 1200px)';
const matches = (q: string) => window.matchMedia?.(q).matches ?? false;

type ReaderRoute = Extract<Route, { name: 'reader' }>;
type Section = (typeof SECTIONS)[number];

/** The section body. Memoised so note and rail state never re-render the text. */
const Article = memo(function Article({ section }: { section: number }) {
  const s = SECTIONS[section];
  let fig = 0;
  // Figure numbers continue across sections, as in the draft.
  for (let i = 0; i < section; i++) fig += SECTIONS[i].blocks.filter((b) => b.kind === 'diagram').length;
  return (
    <article className="article" aria-labelledby="sec-title">
      <p className="art-kicker">
        {isAppendix(section) ? '孔子、孟子与荀子 · 附录（不计入阅读进度）' : `孔子、孟子与荀子 · 第 ${partNo(section)} 部分 / 共 ${READING.length} 部分`}
      </p>
      <h1 id="sec-title" className="art-title">
        {s.title}
      </h1>
      {s.blocks.map((b, i) => renderBlock(b, i, section, b.kind === 'diagram' ? ++fig : 0))}
    </article>
  );
});

function renderBlock(b: Block, i: number, section: number, fig: number) {
  const id = `b-${section}-${i}`;
  switch (b.kind) {
    case 'heading':
      return <h2 key={id} id={b.id} data-block={i} className="blk art-h" dangerouslySetInnerHTML={{ __html: b.html }} />;
    case 'source':
      return (
        <figure key={id} data-block={i} className="blk source">
          <div className="source-text" dangerouslySetInnerHTML={{ __html: b.html }} />
          <figcaption>
            <button type="button" className="src-cite" data-cite={b.cite} aria-expanded="false" title="在右侧查看出处说明">
              {b.cite}
            </button>
            <span className="src-note">原文据中文维基文库，字形保留繁体</span>
          </figcaption>
        </figure>
      );
    case 'exercise':
      return (
        <div key={id} data-block={i} className="blk">
          <Exercise id={b.id} promptHtml={b.promptHtml} hintHtml={b.hintHtml} />
        </div>
      );
    case 'diagram':
      return (
        <div key={id} data-block={i} className="blk">
          <Diagram code={b.code} index={fig} />
        </div>
      );
    case 'callout':
      return <div key={id} data-block={i} className="blk callout" dangerouslySetInnerHTML={{ __html: b.html }} />;
    default:
      return <div key={id} data-block={i} className={'blk' + (b.tag === 'table' ? ' tbl-wrap' : '')} dangerouslySetInnerHTML={{ __html: b.html }} />;
  }
}

// Context panel in the right margin. It opens only when the learner asks for
// it (a footnote number or a source citation) and closes with its button or
// Esc; otherwise the margin stays empty.
interface Note {
  kind: 'fn' | 'src';
  n: string;
  top: number;
  btn: HTMLButtonElement;
}

export default function Reader({ route }: { route: ReaderRoute }) {
  const section = Math.max(0, Math.min(SECTIONS.length - 1, route.section));
  const s = SECTIONS[section];
  const scrollRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState<Note | null>(null);
  const [activeH, setActiveH] = useState<string | null>(null);
  const [frac, setFrac] = useState(0);
  const [progress, setProg] = useState(getProgress);
  const [flash, setFlash] = useState<number | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [barsHidden, setBarsHidden] = useState(false);
  const userMoved = useRef(false);
  const lastTop = useRef(0);
  const tocBtn = useRef<HTMLButtonElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  // Section change or restore: jump to the saved block, or the top.
  useLayoutEffect(() => {
    setNote(null);
    setDrawer(false);
    userMoved.current = false;
    const sc = scrollRef.current;
    if (!sc) return;
    sc.scrollTop = 0;
    if (route.block != null) {
      const el = sc.querySelector<HTMLElement>(`[data-block="${route.block}"]`);
      if (el) {
        sc.scrollTop = el.getBoundingClientRect().top - sc.getBoundingClientRect().top - 120;
        setFlash(route.block);
        const t = window.setTimeout(() => setFlash(null), 2400);
        return () => window.clearTimeout(t);
      }
    }
  }, [section, route.block]);

  // Scroll: progress, scroll-spy and the saved reading position.
  const onScroll = useCallback(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    const max = sc.scrollHeight - sc.clientHeight;
    const f = max > 0 ? sc.scrollTop / max : 1;
    setFrac(f);
    // Phones: the masthead slides away while reading down, returns on the way up.
    const dy = sc.scrollTop - lastTop.current;
    if (Math.abs(dy) > 6) {
      setBarsHidden(dy > 0 && sc.scrollTop > 120);
      lastTop.current = sc.scrollTop;
    }
    // Progress counts only the learner's own reading, never a programmatic jump
    // (resume, search result, back/forward).
    if (userMoved.current) bumpProgress(section, f > 0.97 ? 1 : f);
    const blocks = [...sc.querySelectorAll<HTMLElement>('.article [data-block]')];
    const y = sc.getBoundingClientRect().top + 140;
    let cur = blocks[0];
    for (const b of blocks) {
      if (b.getBoundingClientRect().top <= y) cur = b;
      else break;
    }
    let h: string | null = null;
    for (const hd of s.headings) {
      const el = sc.querySelector(`#${hd.id}`);
      if (el && el.getBoundingClientRect().top <= y) h = hd.id;
    }
    setActiveH(h);
    // Only the learner's own scrolling moves the saved position; programmatic
    // jumps (opening a section, back/forward) never overwrite it.
    if (cur && userMoved.current) {
      setPosition({
        section,
        block: Number(cur.dataset.block),
        sectionTitle: s.title,
        heading: h ? s.headings.find((x) => x.id === h)!.text : '',
        at: Date.now(),
      });
    }
  }, [section, s]);

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
    const iv = window.setInterval(() => setProg(getProgress()), 1200);
    return () => {
      sc.removeEventListener('scroll', h);
      evs.forEach((ev) => sc.removeEventListener(ev, mark));
      cancelAnimationFrame(raf);
      window.clearInterval(iv);
    };
  }, [onScroll]);

  // Context panel: delegation on the reading column.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const click = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.fn-ref, .src-cite');
      if (!btn) return;
      const kind = btn.classList.contains('fn-ref') ? 'fn' : 'src';
      const n = kind === 'fn' ? btn.dataset.fn! : btn.dataset.cite!;
      setNote((cur) => {
        cur?.btn.setAttribute('aria-expanded', 'false');
        if (cur?.n === n && cur.btn === btn) return null;
        btn.setAttribute('aria-expanded', 'true');
        const margin = body.querySelector('.margin') ?? body;
        return { kind, n, top: btn.getBoundingClientRect().top - margin.getBoundingClientRect().top - 6, btn };
      });
    };
    body.addEventListener('click', click);
    return () => body.removeEventListener('click', click);
  }, [section]);

  const closeNote = () => {
    if (!note) return;
    note.btn.setAttribute('aria-expanded', 'false');
    note.btn.focus({ preventScroll: true });
    setNote(null);
  };

  // Bottom sheet: the text gets matching bottom padding, and the marker that
  // opened the sheet is moved into the visible part above it, so the sheet
  // never hides the sentence being explained.
  useLayoutEffect(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    if (!note || !matches(SHEET_MQ) || !noteRef.current) {
      sc.style.paddingBottom = '';
      return;
    }
    const h = noteRef.current.getBoundingClientRect().height;
    sc.style.paddingBottom = h + 'px';
    const box = sc.getBoundingClientRect();
    const r = note.btn.getBoundingClientRect();
    const visibleBottom = window.innerHeight - h - 16;
    if (r.bottom > visibleBottom || r.top < box.top + 8) {
      const target = box.top + (visibleBottom - box.top) * 0.35;
      sc.scrollTop += r.top - target;
    }
  }, [note]);

  // Drawer: focus moves into it, and back to the 目录 button when it closes.
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
      else if (note) closeNote();
      else navigate({ name: 'course', code: 'CN1' });
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  // Wide tables scroll sideways on small screens; mark the ones that do so
  // the hint above them shows.
  useEffect(() => {
    const mark = () =>
      scrollRef.current?.querySelectorAll<HTMLElement>('.tbl-wrap').forEach((w) => {
        if (w.scrollWidth > w.clientWidth + 2) w.dataset.overflow = '';
        else delete w.dataset.overflow;
      });
    mark();
    window.addEventListener('resize', mark);
    return () => window.removeEventListener('resize', mark);
  }, [section]);

  const goSection = (i: number) => navigate({ name: 'reader', code: 'CN1', section: i });
  const back = crumbsFor({ page: 'reader', section: '' }).slice(0, -1);
  const pct = readPct(progress, userMoved.current ? { section, frac } : undefined);
  const sourcesIndex = APPENDIX.find((x) => x.title.startsWith('来源'))?.index;
  const label = (x: Section) => (isAppendix(x.index) ? `附录 · ${x.title}` : x.title);

  const railItem = (x: Section) => {
    const p = x.index === section && userMoved.current ? Math.max(frac, progress[x.index] ?? 0) : progress[x.index] ?? 0;
    const cls = (x.index === section ? 'is-current ' : '') + (isAppendix(x.index) ? 'is-appendix' : p > 0.97 ? 'is-done' : p > 0.02 ? 'is-started' : '');
    return (
      <li key={x.index} className={cls}>
        <button
          onClick={() => {
            if (x.index === section) closeDrawer(false);
            goSection(x.index);
          }}
          aria-current={x.index === section ? 'page' : undefined}
        >
          <span className="rail-mark" aria-hidden="true" />
          <span className="rail-text">{x.title}</span>
        </button>
        {x.index === section && x.headings.length > 0 && (
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
    <div className={'reader' + (barsHidden ? ' bars-hidden' : '') + (drawer ? ' has-drawer' : '')}>
      <TopBar />
      <Wayfinder page="reader" section={shortTitle(s.title)} appendix={isAppendix(section)} />
      {/* Narrow screens: one compact bar instead of the level bar. */}
      <div className="reader-bar">
        <button className="rb-back" onClick={() => navigate({ name: 'course', code: 'CN1' })} aria-label="返回课程扉页">
          <span aria-hidden="true">‹</span> 扉页
        </button>
        <p className="rb-where">
          <span className="rb-pos">{isAppendix(section) ? '附录' : `第 ${partNo(section)} / ${READING.length} 部分`}</span>
          <span className="rb-title">{shortTitle(s.title)}</span>
        </p>
        <button ref={tocBtn} className="rb-toc" aria-expanded={drawer} aria-controls="reader-rail" onClick={() => (drawer ? closeDrawer() : setDrawer(true))}>
          目录 <small>{pct}%</small>
        </button>
      </div>
      <div className="reader-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${frac})` }} />
      </div>
      {drawer && <div className="rail-backdrop" onClick={() => closeDrawer()} aria-hidden="true" />}
      <div className="reader-scroll" ref={scrollRef} id="main" tabIndex={-1}>
        <div className="reader-grid">
          {/* The rail is for this course only: parts, sub-headings, progress.
              Site-level ways back live in the breadcrumb above. On narrow
              screens it is a drawer and also shows the way the learner came. */}
          <nav className={'rail' + (drawer ? ' is-open' : '')} id="reader-rail" aria-label="本课目录" ref={railRef}>
            <div className="rail-drawer-head">
              <p className="rail-path" aria-label="来路">
                {back.map((c, i) => (
                  <span key={c.hash + i}>
                    {i > 0 && <i aria-hidden="true"> › </i>}
                    <a
                      href={c.hash}
                      onClick={(e) => {
                        e.preventDefault();
                        setDrawer(false);
                        go(c.hash);
                      }}
                    >
                      {c.label}
                    </a>
                  </span>
                ))}
              </p>
              <button className="rail-close" onClick={() => closeDrawer()}>
                关闭
              </button>
            </div>
            <p className="rail-title">
              目录 · {READING.length} 部分 <span className="rail-pct">已读 {pct}%</span>
            </p>
            <ol>{READING.map(railItem)}</ol>
            <p className="rail-group">附录 · 不计入进度</p>
            <ol className="rail-appendix">{APPENDIX.map(railItem)}</ol>
            <div className="rail-back">
              <button onClick={() => navigate({ name: 'course', code: 'CN1' })}>← 课程扉页</button>
            </div>
          </nav>

          <div className="reader-body" ref={bodyRef} key={section}>
            <style>{flash != null ? `.article [data-block="${flash}"]{background: var(--flash)}` : ''}</style>
            <Article section={section} />
            <aside className="margin" aria-label="注释与出处">
              {note && (
                <div ref={noteRef} className="margin-note" style={{ top: note.top }} role="note" aria-label={note.kind === 'fn' ? `注释 ${note.n}` : '原文出处'}>
                  {note.kind === 'fn' ? (
                    <>
                      <span className="mn-num">注 {note.n}</span>
                      <div className="mn-text" dangerouslySetInnerHTML={{ __html: FOOTNOTES[note.n] ?? '' }} />
                    </>
                  ) : (
                    <>
                      <span className="mn-num">原文出处</span>
                      <div className="mn-text">
                        <p>{note.n}</p>
                        <p className="mn-small">原文据中文维基文库，字形保留繁体。版本与授权见附录。</p>
                        {sourcesIndex != null && (
                          <button className="inline-link" onClick={() => goSection(sourcesIndex)}>
                            查看「来源与权利说明」→
                          </button>
                        )}
                      </div>
                    </>
                  )}
                  <button className="mn-close" onClick={closeNote}>
                    收起<span className="dg-esc">（Esc）</span>
                  </button>
                </div>
              )}
            </aside>
            <footer className="section-nav">
              {section > 0 ? (
                <button className="sn-prev" onClick={() => goSection(section - 1)}>
                  <small>← 上一部分</small>
                  {label(SECTIONS[section - 1])}
                </button>
              ) : (
                <span />
              )}
              {section < SECTIONS.length - 1 && (
                <button className="sn-next" onClick={() => goSection(section + 1)}>
                  <small>{isAppendix(section + 1) && !isAppendix(section) ? '正文已完 · 附录 →' : '下一部分 →'}</small>
                  {label(SECTIONS[section + 1])}
                </button>
              )}
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

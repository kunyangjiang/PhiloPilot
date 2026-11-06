import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FOOTNOTES, SECTIONS, TOTAL_CHARS, shortTitle, type Block } from '../content/cn1';
import { navigate, type Route } from '../router';
import { bumpProgress, getProgress, getTrail, isReduced, setPosition } from '../state/store';
import { Breadcrumb, HOME_CRUMB, SearchIcon } from './Chrome';
import { openSearch } from './SearchPalette';
import Diagram from './Diagram';
import Exercise from './Exercise';
import { takePending } from './transition';

type ReaderRoute = Extract<Route, { name: 'reader' }>;

/** The section body. Memoised so note/rail state changes never re-render the text. */
const Article = memo(function Article({ section }: { section: number }) {
  const s = SECTIONS[section];
  let fig = 0;
  // Figure numbers continue across sections, as in the draft.
  for (let i = 0; i < section; i++) fig += SECTIONS[i].blocks.filter((b) => b.kind === 'diagram').length;
  return (
    <article className="article" aria-labelledby="sec-title">
      <p className="art-kicker">CN1 · 第 {section + 1} 部分 / 共 {SECTIONS.length} 部分</p>
      <h2 id="sec-title" className="art-title">
        {s.title}
      </h2>
      {s.blocks.map((b, i) => renderBlock(b, i, section, b.kind === 'diagram' ? ++fig : 0))}
    </article>
  );
});

function renderBlock(b: Block, i: number, section: number, fig: number) {
  const id = `b-${section}-${i}`;
  switch (b.kind) {
    case 'heading':
      return (
        <h3 key={id} id={b.id} data-block={i} className="blk art-h3" dangerouslySetInnerHTML={{ __html: b.html }} />
      );
    case 'source':
      return (
        <figure key={id} data-block={i} className="blk source">
          <div className="source-text" dangerouslySetInnerHTML={{ __html: b.html }} />
          <figcaption>
            <span className="src-chip">{b.cite}</span>
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
      return (
        <div
          key={id}
          data-block={i}
          className={'blk ' + (b.tag === 'table' ? 'tbl-wrap' : '')}
          dangerouslySetInnerHTML={{ __html: b.html }}
        />
      );
  }
}

interface Note {
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
  const [pend] = useState(takePending);
  const [enter, setEnter] = useState<'weave' | 'section' | 'none'>(() => (pend?.kind === 'weave' && !isReduced() ? 'weave' : 'none'));
  const [line, setLine] = useState<string>('');
  const [flash, setFlash] = useState<number | null>(null);
  const trail = getTrail();
  const base = trail.length ? trail : [HOME_CRUMB];
  const crumbs = [...base, { label: 'CN1', hash: '#/course/CN1' }, { label: shortTitle(s.title), hash: location.hash }];
  const firstRender = useRef(true);
  const userMoved = useRef(false);

  // Section change: reset, animate the new section in, restore a saved block.
  useLayoutEffect(() => {
    setNote(null);
    userMoved.current = false;
    const sc = scrollRef.current;
    if (!sc) return;
    if (!firstRender.current && !isReduced()) setEnter('section');
    firstRender.current = false;
    if (route.block != null) {
      const el = sc.querySelector<HTMLElement>(`[data-block="${route.block}"]`);
      if (el) {
        sc.scrollTop = 0;
        sc.scrollTop = el.getBoundingClientRect().top - sc.getBoundingClientRect().top - 140;
        setFlash(route.block);
        const t = window.setTimeout(() => setFlash(null), 2600);
        return () => window.clearTimeout(t);
      }
    }
    sc.scrollTop = 0;
  }, [section, route.block]);

  useEffect(() => {
    if (enter === 'none') return;
    const t = window.setTimeout(() => setEnter('none'), enter === 'weave' ? 1500 : 700);
    return () => window.clearTimeout(t);
  }, [enter, section]);

  // Scroll: progress, scroll-spy and saved reading position.
  const onScroll = useCallback(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    const max = sc.scrollHeight - sc.clientHeight;
    const f = max > 0 ? sc.scrollTop / max : 1;
    setFrac(f);
    bumpProgress(section, f > 0.97 ? 1 : f);
    const blocks = [...sc.querySelectorAll<HTMLElement>('.article [data-block]')];
    const y = sc.getBoundingClientRect().top + 150;
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
    // jumps (opening a section, back/forward) must not overwrite it.
    if (cur && userMoved.current) {
      const block = Number(cur.dataset.block);
      setPosition({
        section,
        block,
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

  // Footnotes: event delegation on the article.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const click = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.fn-ref');
      if (!btn) return;
      const n = btn.dataset.fn!;
      setNote((cur) => {
        cur?.btn.setAttribute('aria-expanded', 'false');
        if (cur?.n === n && cur.btn === btn) return null;
        btn.setAttribute('aria-expanded', 'true');
        const margin = body.querySelector('.margin') ?? body;
        const top = btn.getBoundingClientRect().top - margin.getBoundingClientRect().top - 14;
        return { n, top, btn };
      });
    };
    body.addEventListener('click', click);
    return () => body.removeEventListener('click', click);
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || document.querySelector('.palette, .dg-overlay')) return;
      if (note) {
        note.btn.setAttribute('aria-expanded', 'false');
        note.btn.focus();
        setNote(null);
      } else navigate({ name: 'course', code: 'CN1' });
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [note]);

  // The thread from the note marker to the margin card.
  useLayoutEffect(() => {
    if (!note || !bodyRef.current) return setLine('');
    const body = bodyRef.current.getBoundingClientRect();
    const b = note.btn.getBoundingClientRect();
    const card = bodyRef.current.querySelector('.margin-note')?.getBoundingClientRect();
    if (!card || card.width === 0 || card.left < b.right) return setLine('');
    // Start at the edge of the text column so the thread never crosses the prose.
    const col = bodyRef.current.querySelector('.article')!.getBoundingClientRect();
    const x1 = col.right - body.left + 10, y1 = b.top + b.height / 2 - body.top;
    const x2 = card.left - body.left - 4, y2 = card.top + 22 - body.top;
    setLine(`M${x1},${y1} C${x1 + 24},${y1} ${x2 - 24},${y2} ${x2},${y2}`);
  }, [note]);

  const goSection = (i: number) => navigate({ name: 'reader', code: 'CN1', section: i });
  const doneChars = SECTIONS.reduce((sum, x) => sum + (x.index === section ? Math.max(progress[x.index] ?? 0, frac) : progress[x.index] ?? 0) * x.chars, 0);
  const pct = Math.round((doneChars / TOTAL_CHARS) * 100);
  const backToTopic = base.some((c) => c.hash === '#/questions/human-nature');

  return (
    <div className={'reader' + (enter !== 'none' ? ' enter-' + enter : '')}>
      {enter === 'weave' && <WeaveIn rows={pend?.rows ?? []} />}
      <header className="reader-bar">
        <button className="brand brand--small brand--paper" onClick={() => navigate({ name: 'home' })} aria-label="PhiloPilot 首页">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
        <Breadcrumb crumbs={crumbs} tone="paper" />
        <div className="rb-tools">
          <span className="rb-progress" aria-label={`全章已读 ${pct}%`}>
            全章 {pct}%
          </span>
          <button className="tool tool--paper tool--compact" onClick={openSearch} aria-label="搜索">
            <SearchIcon />
          </button>
          <button className="tool tool--paper" onClick={() => navigate({ name: 'course', code: 'CN1' })}>
            课程扉页
          </button>
        </div>
        <div className="rb-line" style={{ transform: `scaleX(${frac})` }} aria-hidden="true" />
      </header>

      <div className="reader-scroll" ref={scrollRef} id="main" tabIndex={-1}>
        <div className="reader-grid">
          <nav className="rail" aria-label="章节导航">
            <p className="rail-title">CN1 · 章节</p>
            <ol>
              {SECTIONS.map((x) => {
                const p = x.index === section ? Math.max(frac, progress[x.index] ?? 0) : progress[x.index] ?? 0;
                return (
                  <li key={x.index} className={(x.index === section ? 'is-current ' : '') + (p > 0.97 ? 'is-done' : p > 0.02 ? 'is-started' : '')} style={{ ['--p' as string]: p }}>
                    <button onClick={() => goSection(x.index)} aria-current={x.index === section ? 'page' : undefined}>
                      <span className="rail-knot" aria-hidden="true" />
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
                                const el = document.getElementById(h.id);
                                const sc = scrollRef.current;
                                if (el && sc)
                                  sc.scrollTo({
                                    top: sc.scrollTop + el.getBoundingClientRect().top - sc.getBoundingClientRect().top - 110,
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
              })}
            </ol>
            <div className="rail-back">
              {backToTopic && (
                <button onClick={() => navigate({ name: 'topic', topic: 'human-nature' })}>← 回到「人性与道德」</button>
              )}
              <button onClick={() => navigate({ name: 'home' })}>← 回到总览</button>
            </div>
          </nav>

          <div className="reader-body" ref={bodyRef} key={section}>
            <style>{flash != null ? `.article [data-block="${flash}"]{animation: blk-flash 2.4s ease-out}` : ''}</style>
            <Article section={section} />
            <aside className="margin" aria-label="注释">
              {note && (
                <div className="margin-note" style={{ top: note.top }} role="note" aria-label={`注释 ${note.n}`}>
                  <span className="mn-num">注 {note.n}</span>
                  <div className="mn-text" dangerouslySetInnerHTML={{ __html: FOOTNOTES[note.n] ?? '' }} />
                  <button
                    className="mn-close"
                    onClick={() => {
                      note.btn.setAttribute('aria-expanded', 'false');
                      note.btn.focus();
                      setNote(null);
                    }}
                  >
                    收起
                  </button>
                </div>
              )}
            </aside>
            {line && (
              <svg className="note-thread" aria-hidden="true">
                <path d={line} />
              </svg>
            )}
            <footer className="section-nav">
              {section > 0 && (
                <button className="sn-prev" onClick={() => goSection(section - 1)}>
                  <small>上一部分</small>
                  {SECTIONS[section - 1].title}
                </button>
              )}
              {section < SECTIONS.length - 1 && (
                <button className="sn-next" onClick={() => goSection(section + 1)}>
                  <small>下一部分</small>
                  {SECTIONS[section + 1].title}
                </button>
              )}
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Threads straighten into lines of text while the dark space brightens into paper. */
function WeaveIn({ rows }: { rows: DOMRect[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = [...el.querySelectorAll<HTMLElement>('.wv-line')];
    const colW = Math.min(720, window.innerWidth * 0.5);
    const left = window.innerWidth / 2 - colW / 2 + 40;
    lines.forEach((l, i) => {
      // Start on the woven rows of the course front page, if we came from there.
      const row = rows.length ? rows[i % rows.length] : null;
      const fromX = row ? row.left : window.innerWidth * 0.58;
      const fromY = row ? row.top + row.height / 2 + Math.floor(i / rows.length) * 3 : window.innerHeight * 0.3 + i * 26;
      const fromS = row ? row.width / colW : 0.4;
      const toY = 190 + i * 34;
      const w = i % 5 === 4 ? colW * 0.55 : colW;
      l.animate(
        [
          { transform: `translate(${fromX}px, ${fromY}px) scaleX(${fromS})`, opacity: 0.2, background: '#f1c87a' },
          { transform: `translate(${fromX}px, ${fromY}px) scaleX(${fromS})`, opacity: 1, background: '#f1c87a', offset: 0.22 },
          { transform: `translate(${left}px, ${toY}px) scaleX(1)`, opacity: 0.9, background: '#cfc4b0', offset: 0.8 },
          { transform: `translate(${left}px, ${toY}px) scaleX(1)`, opacity: 0, background: '#cfc4b0' },
        ],
        { duration: 1400, delay: i * 28, easing: 'cubic-bezier(.3,.6,.2,1)', fill: 'both' },
      );
      l.style.width = w + 'px';
    });
  }, []);
  return (
    <div className="weave-in" ref={ref} aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <span key={i} className="wv-line" />
      ))}
    </div>
  );
}

import { useRef, useState, type KeyboardEvent } from 'react';
import { REGIONS, type RegionId } from '../data/catalog';
import { UNITS, type Unit } from '../data/units';
import { lastReading } from '../state/reading';
import { PUBLISHED } from '../content/courses';
import { CASES } from '../content/cases';
import { continueReading, goCourse, goTopic, regionHash } from './nav';

// Modernist-mix homepage (Display Grid).
// Header: the large display word 哲学, the question the page answers, and the
// usual path stated once.
// Focal point: four flat entrance panels.
// Below: the 72-course strip. Hover or arrow keys show each course's name;
// a click or Enter opens it.

const ORDER: RegionId[] = ['history', 'questions', 'dialogue', 'methods'];
const CELLS = ORDER.flatMap((r) => UNITS.filter((u) => u.region === r));
const TIER = { core: '核心', elective: '核心选修', extended: '拓展' } as const;
const IMPLEMENTED = new Set(Object.keys(PUBLISHED));
const REGION_TITLE = Object.fromEntries(REGIONS.map((r) => [r.id, r.title])) as Record<RegionId, string>;

export default function SwissHome() {
  const [hot, setHot] = useState<RegionId | null>(null);
  const [unit, setUnit] = useState<Unit | null>(null);
  const [cursor, setCursor] = useState(CELLS.findIndex((u) => u.code === 'CN1'));
  // The course read most recently (null before any reading).
  const status = lastReading();
  const touch = useRef(false);
  const pick = CELLS[cursor];
  const move = (d: number) => setCursor((c) => Math.min(CELLS.length - 1, Math.max(0, c + d)));

  const openUnit = (u: Unit) => {
    if (IMPLEMENTED.has(u.code)) goCourse(u.code);
  };
  const onStripKey = (e: KeyboardEvent) => {
    const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = cursor;
    if (e.key in step) next = Math.min(CELLS.length - 1, Math.max(0, cursor + step[e.key]));
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = CELLS.length - 1;
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openUnit(CELLS[cursor]);
      return;
    } else return;
    e.preventDefault();
    setCursor(next);
    setUnit(CELLS[next]);
  };

  return (
    <div className={'sh' + (hot ? ' has-hot sh-hot--' + hot : '')}>
      <header className="sh-head">
        <div className="sh-mark">
          <span className="sh-disc" aria-hidden="true" />
          <h1 className="sh-display">哲学</h1>
        </div>
        <div className="sh-intro">
          <p className="sh-kicker">PhiloPilot · 哲学课程</p>
          <p className="sh-q">从哪里开始读？</p>
          <p className="sh-sub">
            四个入口，同一套 {CELLS.length} 门课程：从传统、问题、对话或方法读起都可以。
            <small>
              另有{' '}
              <a href="#/cases" className="sh-sub-link">
                {CASES.filter((c) => c.available).length} 个哲学案例
              </a>
              ，以小说写成。
            </small>
          </p>
        </div>
        {status?.state === 'progress' ? (
          <button className="sh-continue" onClick={() => continueReading(status.code)}>
            <span className="sh-c-k">继续阅读 · 已读 {status.pct}%</span>
            <span className="sh-c-t">
              {PUBLISHED[status.code].name}
              {status.where ? ` · ${status.where}` : ''}
            </span>
          </button>
        ) : status?.state === 'done' ? (
          <button className="sh-continue" onClick={() => goCourse(status.code, [])}>
            <span className="sh-c-k">已读完 · 可重读或复习</span>
            <span className="sh-c-t">{PUBLISHED[status.code].name}</span>
          </button>
        ) : (
          <button className="sh-continue" onClick={() => goTopic()}>
            <span className="sh-c-k">不知道从哪开始？</span>
            <span className="sh-c-t">人性与道德：一个人怎样才能变好？</span>
          </button>
        )}
      </header>

      <nav className="sh-tiles" aria-label="四个入口">
        {REGIONS.map((r) => (
          <a
            key={r.id}
            className={'sh-tile sh-tile--' + r.id}
            href={regionHash(r.id)}
            onMouseEnter={() => setHot(r.id)}
            onMouseLeave={() => setHot(null)}
            onFocus={() => setHot(r.id)}
            onBlur={() => setHot(null)}
          >
            <span className="sh-tile-top">
              <span className="sh-no">入口</span>
              <span className={'sw-shape sh-shape sw-shape--' + r.id} aria-hidden="true" />
            </span>
            <span className="sh-title">{r.title}</span>
            <span className="sh-en">{r.en}</span>
            <span className="sh-line">{r.line}。</span>
            <span className="sh-stat">{r.stat}</span>
            <span className="sh-foot">
              <span className="sh-go">进入「{r.title}」 →</span>
            </span>
          </a>
        ))}
      </nav>

      <figure className="sh-strip">
        <figcaption className="sh-strip-head">
          <span id="sh-strip-label">
            <b>全部 {CELLS.length} 门课程</b>
          </span>
          <span className="sh-readout" aria-live="polite">
            {unit ? (
              <>
                <b>{unit.name}</b>{' '}
                <small>
                  · {REGION_TITLE[unit.region]} · {unit.group} · {TIER[unit.tier]}
                </small>
              </>
            ) : (
              <small>指向一格查看课程</small>
            )}
          </span>
        </figcaption>
        <div
          className="sh-cells"
          role="listbox"
          aria-labelledby="sh-strip-label"
          aria-activedescendant={'cell-' + CELLS[cursor].code}
          tabIndex={0}
          onKeyDown={onStripKey}
          onFocus={() => setUnit(CELLS[cursor])}
          onBlur={() => setUnit(null)}
          onMouseLeave={() => setUnit(null)}
          onPointerDown={(e) => (touch.current = e.pointerType !== 'mouse')}
        >
          {CELLS.map((u, i) => {
            const first = i > 0 && CELLS[i - 1].region !== u.region;
            const open = IMPLEMENTED.has(u.code);
            const cls =
              'sh-cell sh-cell--' + u.region + (first ? ' is-first' : '') + (open ? ' is-open' : '') + (unit?.code === u.code ? ' is-on' : '') + (i === cursor ? ' is-cur' : '');
            return (
              <span
                key={u.code}
                id={'cell-' + u.code}
                role="option"
                aria-selected={i === cursor}
                aria-disabled={!open}
                aria-label={`${u.name}（${REGION_TITLE[u.region]}）`}
                className={cls}
                onMouseEnter={() => {
                  setUnit(u);
                  setCursor(i);
                }}
                onClick={() => {
                  // Touch: a tap selects (the cells are too small to aim at
                  // reliably); the course opens from the preview below.
                  if (touch.current) {
                    setCursor(i);
                    setUnit(u);
                  } else openUnit(u);
                }}
              />
            );
          })}
        </div>
        {/* Narrow screens: a readable preview of the selected course, with
            steps so the tiny cells are not the only way to choose one. */}
        <div className="sh-pick">
          <button className="sh-pick-step" onClick={() => move(-1)} disabled={cursor === 0} aria-label="上一门课程">
            ‹
          </button>
          <div className="sh-pick-body" aria-live="polite">
            <span className="sh-pick-k">
              <span className={'sw-shape sw-shape--' + pick.region} aria-hidden="true" /> {REGION_TITLE[pick.region]} · {pick.group} · {TIER[pick.tier]}
            </span>
            <span className="sh-pick-t">{pick.name}</span>
            <span className="sh-pick-s">
              第 {cursor + 1} / {CELLS.length} 门 ·{' '}
              {IMPLEMENTED.has(pick.code) ? (
                <button className="sh-pick-open" onClick={() => openUnit(pick)}>
                  打开课程 →
                </button>
              ) : null}
            </span>
          </div>
          <button className="sh-pick-step" onClick={() => move(1)} disabled={cursor === CELLS.length - 1} aria-label="下一门课程">
            ›
          </button>
        </div>
      </figure>
    </div>
  );
}

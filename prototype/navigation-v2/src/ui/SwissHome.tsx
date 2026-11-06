import { useRef, useState, type KeyboardEvent } from 'react';
import { REGIONS, type RegionId } from '../data/catalog';
import { UNITS, type Unit } from '../data/units';
import { lastReading } from '../state/reading';
import { PUBLISHED } from '../content/courses';
import { continueReading, goCourse, goTopic, regionHash } from './nav';

// Modernist-mix homepage (Display Grid).
// Header: the large display word 哲学, the question the page answers, and the
// usual path stated once.
// Focal point: four flat entrance panels, each saying which steps follow.
// Below: the 72-course strip. It is a preview control: hover or arrow keys
// show each course's name and status; only implemented courses open.

const ORDER: RegionId[] = ['history', 'questions', 'dialogue', 'methods'];
const COUNT = Object.fromEntries(ORDER.map((r) => [r, UNITS.filter((u) => u.region === r).length])) as Record<RegionId, number>;
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
          <p className="sh-kicker">
            PhiloPilot · 哲学课程总览<span className="nowrap">（原型）</span>
          </p>
          <p className="sh-q">从哪里开始读？</p>
          <p className="sh-sub">
            四个入口，同一套 72 门课程：从传统、问题、对话或方法读起都可以。
            <small>每个入口进入后的步骤写在下面的方块里；也可以用搜索或「继续阅读」直接回到课程。</small>
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
            <span className="sh-path" aria-label="进入后的步骤">
              <span className="sh-path-k">进入后</span>
              {(r.id === 'questions' ? ['选一个问题（10 个）', '选一门课', '阅读'] : [`选一门课（${COUNT[r.id]} 门）`, '阅读']).map((s, i) => (
                <span key={s} className="sh-path-step">
                  <i>{i + 1}</i>
                  {s}
                </span>
              ))}
            </span>
            <span className="sh-foot">
              <span className="sh-go">进入「{r.title}」 →</span>
            </span>
            {r.id === 'questions' && <span className="sh-badge">原型中可以一路读到正文</span>}
          </a>
        ))}
      </nav>

      <figure className="sh-strip">
        <figcaption className="sh-strip-head">
          <span id="sh-strip-label">
            <b>72 门课程</b> · 每格一门，颜色表示它属于哪个入口
          </span>
          <span className="sh-readout" aria-live="polite">
            {unit ? (
              <>
                <b>{unit.name}</b>{' '}
                <small>
                  · {REGION_TITLE[unit.region]} · {unit.group} · {TIER[unit.tier]}
                  {IMPLEMENTED.has(unit.code) ? ' · 可阅读，点击或按 Enter 打开' : ' · 原型未实现'}
                </small>
              </>
            ) : (
              <small>指向一格或用方向键查看课程名（示意译名）</small>
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
                aria-label={`${u.name}（${REGION_TITLE[u.region]}，${open ? '可阅读' : '原型未实现'}）`}
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
                  可阅读 · 打开课程 →
                </button>
              ) : (
                '原型未实现'
              )}
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

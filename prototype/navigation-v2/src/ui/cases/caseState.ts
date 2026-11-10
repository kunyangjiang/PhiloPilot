import { CHAPTERS, NOVEL_CHARS, SECTIONS, isAppendix } from '../../content/case02';
import { getPosition, getProgress, type ReadingPosition } from '../../state/store';

// Reading state of CASE 02, in its own keys (philopilot.v2.case02.position /
// .progress / .practice.<set>), never mixed with any course. The rules are
// the courses' rules: chapters count, appendices do not; a part counts as
// started at 5 % and read at 97 %.

export const CODE = 'CASE02';
const STARTED = 0.05;
const DONE = 0.97;

export function casePct(progress = getProgress(CODE), live?: { part: number; frac: number }) {
  const chars = CHAPTERS.reduce((sum, s) => {
    const p = Math.max(progress[s.index] ?? 0, live && live.part === s.index ? live.frac : 0);
    return sum + (p >= DONE ? 1 : p) * s.chars;
  }, 0);
  return Math.round((chars / NOVEL_CHARS) * 100);
}

export function caseStatus() {
  const progress = getProgress(CODE);
  const started = CHAPTERS.some((s) => (progress[s.index] ?? 0) >= STARTED);
  const done = CHAPTERS.every((s) => (progress[s.index] ?? 0) >= DONE);
  const raw = getPosition(CODE);
  const valid = raw && SECTIONS[raw.section] && Number.isInteger(raw.block) && raw.block >= 0;
  const pos: ReadingPosition | null = valid && (started || isAppendix(raw.section)) ? raw : null;
  const where = pos ? pos.sectionTitle + (pos.heading ? ` · ${pos.heading}` : '') : '';
  return { state: done ? 'done' : started || pos ? 'progress' : 'new', pct: casePct(progress), pos, where, progress } as const;
}

/** 继续阅读: the saved place, else the first unfinished chapter. */
export function caseResume(): { part: number; block?: number } {
  const { pos, progress } = caseStatus();
  if (pos) return { part: pos.section, block: pos.block };
  const next = CHAPTERS.find((s) => (progress[s.index] ?? 0) < DONE) ?? CHAPTERS[0];
  return { part: next.index };
}

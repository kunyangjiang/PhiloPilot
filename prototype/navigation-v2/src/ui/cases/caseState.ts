import type { CaseBook } from '../../content/caseBook';
import { caseCode } from '../../content/cases';
import { getPosition, getProgress, type ReadingPosition } from '../../state/store';

// Reading state of a case, in its own keys (philopilot.v2.caseNN.position /
// .progress / .practice.<set>), never mixed with any course or other case.
// The rules are the courses' rules: chapters count, appendices do not; a part
// counts as started at 5 % and read at 97 %.

const STARTED = 0.05;
const DONE = 0.97;

export function casePct(book: CaseBook, progress = getProgress(caseCode(book.no)), live?: { part: number; frac: number }) {
  const chars = book.CHAPTERS.reduce((sum, s) => {
    const p = Math.max(progress[s.index] ?? 0, live && live.part === s.index ? live.frac : 0);
    return sum + (p >= DONE ? 1 : p) * s.chars;
  }, 0);
  return Math.round((chars / book.NOVEL_CHARS) * 100);
}

export function caseStatus(book: CaseBook) {
  const code = caseCode(book.no);
  const progress = getProgress(code);
  const started = book.CHAPTERS.some((s) => (progress[s.index] ?? 0) >= STARTED);
  const done = book.CHAPTERS.every((s) => (progress[s.index] ?? 0) >= DONE);
  const raw = getPosition(code);
  const valid = raw && book.SECTIONS[raw.section] && Number.isInteger(raw.block) && raw.block >= 0;
  const pos: ReadingPosition | null = valid && (started || book.isAppendix(raw.section)) ? raw : null;
  const where = pos ? pos.sectionTitle + (pos.heading ? ` · ${pos.heading}` : '') : '';
  return { state: done ? 'done' : started || pos ? 'progress' : 'new', pct: casePct(book, progress), pos, where, progress } as const;
}

/** 继续阅读: the saved place, else the first unfinished chapter. */
export function caseResume(book: CaseBook): { part: number; block?: number } {
  const { pos, progress } = caseStatus(book);
  if (pos) return { part: pos.section, block: pos.block };
  const next = book.CHAPTERS.find((s) => (progress[s.index] ?? 0) < DONE) ?? book.CHAPTERS[0];
  return { part: next.index };
}

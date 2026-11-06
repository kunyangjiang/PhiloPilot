import { READING, TOTAL_CHARS, isAppendix, shortTitle } from '../content/cn1';
import { getPosition, getProgress, type ReadingPosition } from './store';

// One definition of reading state, used by the homepage, the course front
// page and the reader alike.
//   new       – no instructional section has been read beyond its opening
//   progress  – some reading done, not all
//   done      – every instructional section read to its end
// Appendices (注释, 来源) never count towards progress.

export type ReadingState = 'new' | 'progress' | 'done';
const STARTED = 0.05; // a section counts as started once 5 % of it has been scrolled
const DONE = 0.97;

export function readPct(progress = getProgress(), live?: { section: number; frac: number }): number {
  const chars = READING.reduce((sum, s) => {
    const p = Math.max(progress[s.index] ?? 0, live && live.section === s.index ? live.frac : 0);
    return sum + (p >= DONE ? 1 : p) * s.chars;
  }, 0);
  return Math.round((chars / TOTAL_CHARS) * 100);
}

export interface ReadingStatus {
  state: ReadingState;
  pct: number;
  /** Saved place to resume; only meaningful in the "progress" state. */
  pos: ReadingPosition | null;
  /** “孟子：人性善与扩充 · 牛山之喻” */
  where: string;
}

export function readingStatus(): ReadingStatus {
  const progress = getProgress();
  const pct = readPct(progress);
  const started = READING.some((s) => (progress[s.index] ?? 0) >= STARTED);
  const done = READING.every((s) => (progress[s.index] ?? 0) >= DONE);
  const raw = getPosition();
  // A position saved inside an appendix is still a valid place to return to.
  const pos = raw && (started || isAppendix(raw.section)) ? raw : null;
  const where = pos ? shortTitle(pos.sectionTitle) + (pos.heading ? ` · ${pos.heading}` : '') : '';
  return { state: done ? 'done' : started ? 'progress' : 'new', pct, pos, where };
}

/** Where 继续阅读 goes: the saved position, else the first unfinished part. */
export function resumeTarget(): { section: number; block?: number } {
  const { pos } = readingStatus();
  if (pos) return { section: pos.section, block: pos.block };
  const progress = getProgress();
  const next = READING.find((s) => (progress[s.index] ?? 0) < DONE) ?? READING[0];
  return { section: next.index };
}

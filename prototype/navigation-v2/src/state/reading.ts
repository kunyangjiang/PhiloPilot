import { shortTitle } from '../content/course';
import { PUBLISHED, PUBLISHED_CODES } from '../content/courses';
import { getPosition, getProgress, type ReadingPosition } from './store';

// One definition of reading state, used by the homepage, the course front
// page and the reader alike. Each course is tracked separately.
//   new       – no instructional section has been read beyond its opening
//   progress  – some reading done, not all
//   done      – every instructional section read to its end
// Appendices (注释, 来源) never count towards progress.

export type ReadingState = 'new' | 'progress' | 'done';
const STARTED = 0.05; // a section counts as started once 5 % of it has been scrolled
const DONE = 0.97;

const text = (code: string) => PUBLISHED[code].text;

export function readPct(code: string, progress = getProgress(code), live?: { section: number; frac: number }): number {
  const { READING, TOTAL_CHARS } = text(code);
  const chars = READING.reduce((sum, s) => {
    const p = Math.max(progress[s.index] ?? 0, live && live.section === s.index ? live.frac : 0);
    return sum + (p >= DONE ? 1 : p) * s.chars;
  }, 0);
  return Math.round((chars / TOTAL_CHARS) * 100);
}

export interface ReadingStatus {
  code: string;
  state: ReadingState;
  pct: number;
  /** Saved place to resume; only meaningful in the "progress" state. */
  pos: ReadingPosition | null;
  /** “孟子：人性善与扩充 · 牛山之喻” */
  where: string;
}

export function readingStatus(code: string): ReadingStatus {
  const { READING, isAppendix } = text(code);
  const progress = getProgress(code);
  const pct = readPct(code, progress);
  const started = READING.some((s) => (progress[s.index] ?? 0) >= STARTED);
  const done = READING.every((s) => (progress[s.index] ?? 0) >= DONE);
  const raw = getPosition(code);
  // A position saved inside an appendix is still a valid place to return to.
  const pos = raw && (started || isAppendix(raw.section)) ? raw : null;
  const where = pos ? shortTitle(pos.sectionTitle) + (pos.heading ? ` · ${pos.heading}` : '') : '';
  return { code, state: done ? 'done' : started ? 'progress' : 'new', pct, pos, where };
}

/** Where 继续阅读 goes: the saved position, else the first unfinished part. */
export function resumeTarget(code: string): { section: number; block?: number } {
  const { READING } = text(code);
  const { pos } = readingStatus(code);
  if (pos) return { section: pos.section, block: pos.block };
  const progress = getProgress(code);
  const next = READING.find((s) => (progress[s.index] ?? 0) < DONE) ?? READING[0];
  return { section: next.index };
}

/**
 * The course the learner was reading most recently (by the time of the last
 * saved position), or null if no course has been started. The homepage's
 * 继续阅读 uses it.
 */
export function lastReading(): ReadingStatus | null {
  const all = PUBLISHED_CODES.map(readingStatus).filter((s) => s.state !== 'new' || s.pos);
  if (!all.length) return null;
  const at = (s: ReadingStatus) => getPosition(s.code)?.at ?? 0;
  return all.sort((a, b) => at(b) - at(a))[0];
}

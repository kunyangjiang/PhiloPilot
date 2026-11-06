// Local, per-browser state only (no accounts, no sync). V2 keys are separate
// from V1 so the two prototypes never overwrite each other.

const KEY_POS = 'philopilot.v2.cn1.position';
const KEY_PROGRESS = 'philopilot.v2.cn1.progress';
const KEY_EX = 'philopilot.v2.cn1.exercise.';

export interface ReadingPosition {
  section: number;
  block: number;
  sectionTitle: string;
  heading: string;
  at: number;
}

const read = <T,>(k: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* storage unavailable: the prototype keeps working without persistence */
  }
};

export const getPosition = () => read<ReadingPosition | null>(KEY_POS, null);
export const setPosition = (p: ReadingPosition) => write(KEY_POS, p);

/** Highest fraction (0–1) of each section the reader has scrolled through. */
export const getProgress = () => read<Record<number, number>>(KEY_PROGRESS, {});
export const bumpProgress = (section: number, frac: number) => {
  const p = getProgress();
  if ((p[section] ?? 0) < frac) {
    p[section] = Math.min(1, frac);
    write(KEY_PROGRESS, p);
  }
};

export const getExercise = (id: string) => read<string>(KEY_EX + id, '');
export const setExercise = (id: string, v: string) => write(KEY_EX + id, v);

// How the learner reached a course is stored with each browser-history entry
// (see router.ts), not in a single session-wide trail.
export type { Crumb } from '../router';

// ── Fixed presentation ───────────────────────────────────────────────────────
// The Swiss style is the only visual style and subtle motion is the only
// motion setting. Neither is a learner preference any more: earlier builds
// stored a choice under these keys, so they are removed on start and never
// read, and a `?style=` URL parameter is ignored.
const LEGACY_KEYS = ['philopilot.v2.style', 'philopilot.v2.motion'];
const reduceQuery = () => window.matchMedia?.('(prefers-reduced-motion: reduce)');

/** “subtle” (short fades and quick colour changes), or “none” when the
 *  operating system asks for reduced motion. */
export type Motion = 'subtle' | 'none';
export const getMotion = (): Motion => (reduceQuery()?.matches ? 'none' : 'subtle');
export const isReduced = () => getMotion() === 'none';

/** Sets the fixed style and the OS-driven motion level on <html>, and keeps
 *  the motion level in step if the OS setting changes while the page is open. */
export function applyPresentation() {
  const root = document.documentElement;
  root.dataset.style = 'swiss';
  root.dataset.motion = getMotion();
  reduceQuery()?.addEventListener?.('change', () => (root.dataset.motion = getMotion()));
  try {
    LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* storage unavailable */
  }
}

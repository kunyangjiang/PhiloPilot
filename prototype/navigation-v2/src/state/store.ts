// Local, per-browser state only (no accounts, no sync). V2 keys are separate
// from V1 so the two prototypes never overwrite each other. Every course has
// its own keys (philopilot.v2.<code>.…); the CN1 keys are unchanged from
// earlier builds so saved reading survives.

const key = (code: string, what: string) => `philopilot.v2.${code.toLowerCase()}.${what}`;

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

export const getPosition = (code: string) => read<ReadingPosition | null>(key(code, 'position'), null);
export const setPosition = (code: string, p: ReadingPosition) => write(key(code, 'position'), p);

/** Highest fraction (0–1) of each section the reader has scrolled through. */
export const getProgress = (code: string) => read<Record<number, number>>(key(code, 'progress'), {});
export const bumpProgress = (code: string, section: number, frac: number) => {
  const p = getProgress(code);
  if ((p[section] ?? 0) < frac) {
    p[section] = Math.min(1, frac);
    write(key(code, 'progress'), p);
  }
};

/** Exercise ids already start with the course prefix (cn1-…, ea4-…). */
const exKey = (id: string) => key(id.split('-')[0], 'exercise.') + id;
export const getExercise = (id: string) => read<string>(exKey(id), '');
export const setExercise = (id: string, v: string) => write(exKey(id), v);

/** State of an interactive teaching component (choices only, never scored). */
export const getMedia = <T,>(code: string, id: string, fallback: T) => read<T>(key(code, 'media.') + id, fallback);
export const setMedia = (code: string, id: string, v: unknown) => write(key(code, 'media.') + id, v);

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

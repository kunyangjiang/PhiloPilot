import { useEffect, useState } from 'react';

// Local, per-browser state only (no accounts, no sync).

const KEY_POS = 'philopilot.v1.cn1.position';
const KEY_PROGRESS = 'philopilot.v1.cn1.progress';
const KEY_EX = 'philopilot.v1.cn1.exercise.';
const KEY_TRAIL = 'philopilot.v1.trail';
const KEY_MOTION = 'philopilot.v1.motion';

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
    /* storage unavailable: prototype keeps working without persistence */
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

// The breadcrumb trail records how the learner arrived at a course, so the
// reader can offer a faithful way back (e.g. 哲学问题 › 人性与道德).
export interface Crumb {
  label: string;
  hash: string;
}
export const getTrail = (): Crumb[] => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY_TRAIL) || '[]');
  } catch {
    return [];
  }
};
export const setTrail = (t: Crumb[]) => {
  try {
    sessionStorage.setItem(KEY_TRAIL, JSON.stringify(t));
  } catch {
    /* ignore */
  }
};

// Motion preference: follows the OS setting unless the learner overrides it.
export type MotionPref = 'full' | 'reduced';
const systemReduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

let motionListeners: ((m: MotionPref) => void)[] = [];
export const getMotion = (): MotionPref => {
  const saved = read<MotionPref | null>(KEY_MOTION, null);
  return saved ?? (systemReduced() ? 'reduced' : 'full');
};
export const setMotion = (m: MotionPref) => {
  write(KEY_MOTION, m);
  document.documentElement.dataset.motion = m;
  motionListeners.forEach((f) => f(m));
};
export function useMotion(): MotionPref {
  const [m, setM] = useState<MotionPref>(getMotion);
  useEffect(() => {
    motionListeners.push(setM);
    return () => {
      motionListeners = motionListeners.filter((f) => f !== setM);
    };
  }, []);
  return m;
}
export const isReduced = () => getMotion() === 'reduced';

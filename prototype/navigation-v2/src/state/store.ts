import { useEffect, useState } from 'react';

// Local, per-browser state only (no accounts, no sync). V2 keys are separate
// from V1 so the two prototypes never overwrite each other.

const KEY_POS = 'philopilot.v2.cn1.position';
const KEY_PROGRESS = 'philopilot.v2.cn1.progress';
const KEY_EX = 'philopilot.v2.cn1.exercise.';
const KEY_MOTION = 'philopilot.v2.motion';
const KEY_STYLE = 'philopilot.v2.style';

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

// ── Small observable preferences ─────────────────────────────────────────────
function pref<T extends string>(key: string, attr: 'motion' | 'style', initial: () => T) {
  let listeners: ((v: T) => void)[] = [];
  const get = (): T => read<T | null>(key, null) ?? initial();
  const set = (v: T) => {
    write(key, v);
    document.documentElement.dataset[attr] = v;
    listeners.forEach((f) => f(v));
  };
  const use = (): T => {
    const [v, setV] = useState<T>(get);
    useEffect(() => {
      listeners.push(setV);
      return () => {
        listeners = listeners.filter((f) => f !== setV);
      };
    }, []);
    return v;
  };
  return { get, set, use };
}

// Motion: “subtle” short fades only, or “none”. Follows the OS setting by default.
export type MotionPref = 'subtle' | 'none';
const systemReduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const motion = pref<MotionPref>(KEY_MOTION, 'motion', () => (systemReduced() ? 'none' : 'subtle'));
export const getMotion = motion.get;
export const setMotion = motion.set;
export const useMotion = motion.use;
export const isReduced = () => getMotion() === 'none';

// Visual direction: three 20th-century design idioms over the same content.
export type StyleId = 'swiss' | 'transit' | 'catalogue';
export const STYLES: { id: StyleId; label: string; note: string }[] = [
  { id: 'swiss', label: '现代主义混合', note: '瑞士网格为骨架，混合包豪斯几何、线路图与卡片目录元素' },
  { id: 'transit', label: '线路图', note: '现代主义交通线路图，1930–70 年代' },
  { id: 'catalogue', label: '卡片目录', note: '图书馆卡片目录与打字机，1900–70 年代' },
];
const style = pref<StyleId>(KEY_STYLE, 'style', () => 'swiss');
export const getStyle = (): StyleId => {
  const q = new URLSearchParams(location.search).get('style');
  if (q === 'swiss' || q === 'transit' || q === 'catalogue') return q;
  const v = style.get();
  return STYLES.some((s) => s.id === v) ? v : 'swiss';
};
export const setStyle = style.set;
export const useStyle = (): StyleId => {
  const v = style.use();
  return STYLES.some((s) => s.id === v) ? v : 'swiss';
};

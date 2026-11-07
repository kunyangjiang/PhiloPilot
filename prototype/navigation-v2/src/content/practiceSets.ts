import type { PracticeSet } from './practice';
import { CN1_PRACTICE } from './practice-cn1';
import { EA4_PRACTICE } from './practice-ea4';
import { IN1_PRACTICE } from './practice-in1';
import { GR1_PRACTICE } from './practice-gr1';
import { GR2_PRACTICE } from './practice-gr2';

// Question sets of each published course. A course without an entry here
// shows its manuscript prompts as before (read-only, no answer box).
const SETS: Record<string, PracticeSet[]> = {
  CN1: CN1_PRACTICE,
  EA4: EA4_PRACTICE,
  IN1: IN1_PRACTICE,
  GR1: GR1_PRACTICE,
  GR2: GR2_PRACTICE,
};

export const MAX_QUESTIONS = 3;
if (import.meta.env.DEV) {
  for (const [code, sets] of Object.entries(SETS))
    for (const s of sets)
      if (s.questions.length > MAX_QUESTIONS) console.warn(`${code} 想一想（${s.label}）has ${s.questions.length} questions; the limit is ${MAX_QUESTIONS}.`);
}

/** The set for a 想一想 block, found by the label in its title: 想一想（活动 A）… → "活动 A". */
export function practiceFor(code: string, blockText: string): PracticeSet | undefined {
  const m = blockText.match(/^想一想（([^）]+)）/);
  if (!m) return undefined;
  return SETS[code]?.find((s) => s.label === m[1].trim());
}

export const allPractice = SETS;

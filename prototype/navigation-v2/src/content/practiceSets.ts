import type { PracticeSet } from './practice';
import { CN1_PRACTICE } from './practice-cn1';
import { CN2_PRACTICE } from './practice-cn2';
import { CN3_PRACTICE } from './practice-cn3';
import { CN4_PRACTICE } from './practice-cn4';
import { CN5_PRACTICE } from './practice-cn5';
import { CN6_PRACTICE } from './practice-cn6';
import { CN7_PRACTICE } from './practice-cn7';
import { CN8_PRACTICE } from './practice-cn8';
import { EA4_PRACTICE } from './practice-ea4';
import { IN1_PRACTICE } from './practice-in1';
import { GR1_PRACTICE } from './practice-gr1';
import { GR2_PRACTICE } from './practice-gr2';
import { GR3_PRACTICE } from './practice-gr3';
import { GR4_PRACTICE } from './practice-gr4';

// Question sets of each published course. A course without an entry here
// shows its manuscript prompts as before (read-only, no answer box).
const SETS: Record<string, PracticeSet[]> = {
  CN1: CN1_PRACTICE,
  CN2: CN2_PRACTICE,
  CN3: CN3_PRACTICE,
  CN4: CN4_PRACTICE,
  CN5: CN5_PRACTICE,
  CN6: CN6_PRACTICE,
  CN7: CN7_PRACTICE,
  CN8: CN8_PRACTICE,
  EA4: EA4_PRACTICE,
  IN1: IN1_PRACTICE,
  GR1: GR1_PRACTICE,
  GR2: GR2_PRACTICE,
  GR3: GR3_PRACTICE,
  GR4: GR4_PRACTICE,
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

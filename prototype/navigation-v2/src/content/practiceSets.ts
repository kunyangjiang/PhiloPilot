import type { PracticeSet } from './practice';
import { CN1_PRACTICE } from './practice-cn1';
import { CN2_PRACTICE } from './practice-cn2';
import { CN3_PRACTICE } from './practice-cn3';
import { CN4_PRACTICE } from './practice-cn4';
import { CN5_PRACTICE } from './practice-cn5';
import { CN6_PRACTICE } from './practice-cn6';
import { CN7_PRACTICE } from './practice-cn7';
import { CN8_PRACTICE } from './practice-cn8';
import { EA1_PRACTICE } from './practice-ea1';
import { EA2_PRACTICE } from './practice-ea2';
import { EA3_PRACTICE } from './practice-ea3';
import { EA4_PRACTICE } from './practice-ea4';
import { EA5_PRACTICE } from './practice-ea5';
import { EA6_PRACTICE } from './practice-ea6';
import { EA7_PRACTICE } from './practice-ea7';
import { EA8_PRACTICE } from './practice-ea8';
import { EA9_PRACTICE } from './practice-ea9';
import { EA10_PRACTICE } from './practice-ea10';
import { EA11_PRACTICE } from './practice-ea11';
import { EA12_PRACTICE } from './practice-ea12';
import { AF1_PRACTICE } from './practice-af1';
import { AF2_PRACTICE } from './practice-af2';
import { AF3_PRACTICE } from './practice-af3';
import { JP1_PRACTICE } from './practice-jp1';
import { KR1_PRACTICE } from './practice-kr1';
import { LA1_PRACTICE } from './practice-la1';
import { IN1_PRACTICE } from './practice-in1';
import { IN2_PRACTICE } from './practice-in2';
import { IN3_PRACTICE } from './practice-in3';
import { IN4_PRACTICE } from './practice-in4';
import { IN5_PRACTICE } from './practice-in5';
import { IN6_PRACTICE } from './practice-in6';
import { IN7_PRACTICE } from './practice-in7';
import { IN8_PRACTICE } from './practice-in8';
import { IA1_PRACTICE } from './practice-ia1';
import { IA2_PRACTICE } from './practice-ia2';
import { IA3_PRACTICE } from './practice-ia3';
import { IA4_PRACTICE } from './practice-ia4';
import { IA5_PRACTICE } from './practice-ia5';
import { GR1_PRACTICE } from './practice-gr1';
import { GR2_PRACTICE } from './practice-gr2';
import { GR3_PRACTICE } from './practice-gr3';
import { GR4_PRACTICE } from './practice-gr4';
import { JW1_PRACTICE } from './practice-jw1';
import { A1_PRACTICE } from './practice-a1';
import { A2_PRACTICE } from './practice-a2';
import { A3_PRACTICE } from './practice-a3';
import { A4_PRACTICE } from './practice-a4';
import { S1_PRACTICE } from './practice-s1';
import { S2_PRACTICE } from './practice-s2';

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
  EA1: EA1_PRACTICE,
  EA2: EA2_PRACTICE,
  EA3: EA3_PRACTICE,
  EA4: EA4_PRACTICE,
  EA5: EA5_PRACTICE,
  EA6: EA6_PRACTICE,
  EA7: EA7_PRACTICE,
  EA8: EA8_PRACTICE,
  EA9: EA9_PRACTICE,
  EA10: EA10_PRACTICE,
  EA11: EA11_PRACTICE,
  EA12: EA12_PRACTICE,
  AF1: AF1_PRACTICE,
  AF2: AF2_PRACTICE,
  AF3: AF3_PRACTICE,
  JP1: JP1_PRACTICE,
  KR1: KR1_PRACTICE,
  LA1: LA1_PRACTICE,
  IN1: IN1_PRACTICE,
  IN2: IN2_PRACTICE,
  IN3: IN3_PRACTICE,
  IN4: IN4_PRACTICE,
  IN5: IN5_PRACTICE,
  IN6: IN6_PRACTICE,
  IN7: IN7_PRACTICE,
  IN8: IN8_PRACTICE,
  IA1: IA1_PRACTICE,
  IA2: IA2_PRACTICE,
  IA3: IA3_PRACTICE,
  IA4: IA4_PRACTICE,
  IA5: IA5_PRACTICE,
  GR1: GR1_PRACTICE,
  GR2: GR2_PRACTICE,
  GR3: GR3_PRACTICE,
  GR4: GR4_PRACTICE,
  JW1: JW1_PRACTICE,
  A1: A1_PRACTICE,
  A2: A2_PRACTICE,
  A3: A3_PRACTICE,
  A4: A4_PRACTICE,
  S1: S1_PRACTICE,
  S2: S2_PRACTICE,
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

// A small model for "想一想" practice questions, shared by every course.
//
// Each course keeps its questions in its own file (practice-cn1.ts, …) next to
// the course text. A set replaces one 想一想 block of the manuscript: the
// reader finds it by the label in the block's title, e.g. 想一想（活动 A） →
// label "活动 A". The manuscript itself is unchanged; its original written
// prompt and hint stay available under the questions.
//
// Four kinds of question:
//   single — one answer is right (radio buttons)
//   multi  — a set of answers is right (checkboxes)
//   tf     — a statement is true or false
//   view   — a contested question: the options are positions, none is marked
//            right, and every position's strengths and costs are shown after
//            the learner commits to one.
// Nothing is scored or totalled.

export interface Option {
  id: string;
  text: string;
  /** Why this option is right, or the misconception behind it; for a view, the position's strengths and costs. */
  note: string;
}

interface Base {
  id: string;
  stem: string;
  /** Shown once the question is settled (right answer reached, answer shown, or view chosen). */
  explain?: string;
}

export type Question =
  | (Base & { type: 'single'; options: Option[]; answer: string })
  | (Base & { type: 'multi'; options: Option[]; answer: string[] })
  | (Base & { type: 'tf'; answer: boolean; /** Shown when the learner picks the wrong value. */ wrong: string })
  | (Base & { type: 'view'; options: Option[] });

/** At most three questions per set, so a 想一想 stays short within the reading (enforced in practiceSets.ts during development). */
export interface PracticeSet {
  /** The label inside 想一想（…） in the manuscript. */
  label: string;
  /** Short framing shown in place of the written prompt. */
  lede: string;
  questions: Question[];
}

export const LETTERS = 'ABCDEFGH';

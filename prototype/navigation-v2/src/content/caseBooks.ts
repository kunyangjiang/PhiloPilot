import type { CaseBook } from './caseBook';
import { CASE02 } from './case02';
import { CASE03 } from './case03';
import type { PracticeSet } from './practice';
import { CASE02_PRACTICE } from './practice-case02';
import { CASE03_PRACTICE } from './practice-case03';

// The written cases, by case number: the manuscript, its practice sets, and
// the published courses it actually draws on (each with the place in the
// case). Only a case listed here can open (see cases.ts `available`).

export interface CaseText {
  book: CaseBook;
  practice: PracticeSet[];
  links: { code: string; why: string }[];
}

export const CASE_TEXTS: Record<string, CaseText> = {
  '02': {
    book: CASE02,
    practice: CASE02_PRACTICE,
    links: [
      { code: 'CN1', why: '第七章与附录一第 5 节：孟子“见牛未见羊”与推恩' },
      { code: 'CN2', why: '附录一第 5 节：《墨子·大取》“断指以存腕”' },
      { code: 'EA4', why: '附录一第 3 节：不把人仅仅当作手段' },
    ],
  },
  '03': {
    book: CASE03,
    practice: CASE03_PRACTICE,
    links: [
      { code: 'CN2', why: '第四章与附录一第 2、3 节：《白马论》，“是而然”与“是而不然”，荀子“名无固宜”' },
      { code: 'S6', why: '第四、七、十章与附录一第 4、5 节：涵义与指称，专名与因果—历史图景，连锁悖论' },
      { code: 'A3', why: '第五、九章与附录一第 5 节：模糊的概念，为了某个目的划一条线' },
      { code: 'A2', why: '附录一第 2 节：“属于”与“等于”的区分' },
    ],
  },
};

export const caseText = (no: string): CaseText | undefined => CASE_TEXTS[no];

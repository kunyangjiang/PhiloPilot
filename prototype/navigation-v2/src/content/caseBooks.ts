import type { CaseBook } from './caseBook';
import { CASE02 } from './case02';
import { CASE03 } from './case03';
import { CASE04 } from './case04';
import { CASE05 } from './case05';
import { CASE06 } from './case06';
import type { PracticeSet } from './practice';
import { CASE02_PRACTICE } from './practice-case02';
import { CASE03_PRACTICE } from './practice-case03';
import { CASE04_PRACTICE } from './practice-case04';
import { CASE05_PRACTICE } from './practice-case05';
import { CASE06_PRACTICE } from './practice-case06';

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
  '04': {
    book: CASE04,
    practice: CASE04_PRACTICE,
    links: [
      { code: 'GR1', why: '第十章与附录一第 5 节：《申辩》，“宁愿服从神”与三十僭主命令逮捕勒翁' },
      { code: 'GR2', why: '第四、八、十章与附录一第 5 节：《克里同》中法律的话，“要么说服，要么服从”' },
      { code: 'S9', why: '附录一第 2、5 节：权威与政治义务，法律的效力与道德的正当性，公民不服从' },
      { code: 'S4', why: '附录一第 7 节：负责需要的控制条件与认知条件' },
    ],
  },
  '05': {
    book: CASE05,
    practice: CASE05_PRACTICE,
    links: [
      { code: 'S5', why: '附录一第 3、4、6 节：功能主义与中文屋，现象意识，“从行为到经验”的推论的限度' },
      { code: 'D7', why: '附录一第 3、5、7 节：为什么不能从语言推出意识，也不能断然否认；道德地位' },
      { code: 'S4', why: '附录一第 5、9 节：人格性、道德地位与行动者的区分；复制与分裂' },
      { code: 'S1', why: '附录一第 2 节：濠梁之辩与“他心问题”' },
      { code: 'A3', why: '附录一第 6 节：思想实验与类比检验什么' },
    ],
  },
  '06': {
    book: CASE06,
    practice: CASE06_PRACTICE,
    links: [
      { code: 'IN3', why: '第四章与附录一第 2、3、4 节：《正理经》的四种量，陈那的现量与比量，法称' },
      { code: 'IN5', why: '附录一第 2、4 节：伐差耶那论可信者，正理派与弥曼差派在举证责任上的分歧' },
      { code: 'D3', why: '附录一第 4 节：陈那和法称把言语归入推理' },
      { code: 'D10', why: '第五章与附录一第 6、7 节：证据的标准与五个问题' },
      { code: 'S1', why: '附录一第 4、8 节：还原论与非还原论，小孩的问题，认知权威' },
      { code: 'A4', why: '附录一第 5 节：语境、时代错置与注释作为哲学' },
    ],
  },
};

export const caseText = (no: string): CaseText | undefined => CASE_TEXTS[no];

import raw from '@content/cases/CASE09_JIUXIANG_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《九相》 (PhiloPilot Cases · 09) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out. Its first and last sections are 序 and 终, not numbered
// chapters.

export const CASE09 = makeCaseBook('09', raw, { chapters: 11, appendices: 5 });

import raw from '@content/cases/CASE07_YIMING_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《译名之争》 (PhiloPilot Cases · 07) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out.

export const CASE07 = makeCaseBook('07', raw, { chapters: 11, appendices: 5 });

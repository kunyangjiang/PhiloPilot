import raw from '@content/cases/CASE11_FENZHI_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《分支》 (PhiloPilot Cases · 11) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out. Nine numbered chapters: two for each of the four days, then
// the transmission (九　绿灯).

export const CASE11 = makeCaseBook('11', raw, { chapters: 9, appendices: 5 });

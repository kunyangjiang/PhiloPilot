import raw from '@content/cases/CASE02_FENHONG_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《分洪》 (PhiloPilot Cases · 02) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out.

export const CASE02 = makeCaseBook('02', raw, { chapters: 13, appendices: 5 });

import raw from '@content/cases/CASE03_BAIMA_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《白马非马》 (PhiloPilot Cases · 03) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out.

export const CASE03 = makeCaseBook('03', raw, { chapters: 12, appendices: 5 });

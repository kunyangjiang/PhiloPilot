import raw from '@content/cases/CASE05_JINGZHONG_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《镜中之城》 (PhiloPilot Cases · 05) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out.

export const CASE05 = makeCaseBook('05', raw, { chapters: 10, appendices: 5 });

import raw from '@content/cases/CASE01_BUYUANZUO_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《不存在的原作》 (PhiloPilot Cases · 01) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out.

export const CASE01 = makeCaseBook('01', raw, { chapters: 9, appendices: 5 });

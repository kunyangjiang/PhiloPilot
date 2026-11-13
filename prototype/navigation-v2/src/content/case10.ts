import raw from '@content/cases/CASE10_QIQIAO_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《七窍》 (PhiloPilot Cases · 10) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out. The opening section 序　进山 (Day Zero) is followed by seven
// numbered chapters, one for each opening, then 尸检 and 下山.

export const CASE10 = makeCaseBook('10', raw, { chapters: 10, appendices: 5 });

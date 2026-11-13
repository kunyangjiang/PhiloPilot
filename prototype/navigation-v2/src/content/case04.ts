import raw from '@content/cases/CASE04_HEFA_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《合法的命令》 (PhiloPilot Cases · 04) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out.

export const CASE04 = makeCaseBook('04', raw, { chapters: 12, appendices: 5 });

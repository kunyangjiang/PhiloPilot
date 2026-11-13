import raw from '@content/cases/CASE06_DIJIUJUAN_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《失落的第九卷》 (PhiloPilot Cases · 06) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out.

export const CASE06 = makeCaseBook('06', raw, { chapters: 9, appendices: 5 });

import raw from '@content/cases/CASE08_LIBRARY_MANUSCRIPT.md?raw';
import { makeCaseBook } from './caseBook';

// 《最后一座图书馆》 (PhiloPilot Cases · 08) for the case reader. The manuscript in
// content/cases is read as it is; see caseBook.ts for what is split, tagged
// and left out.

export const CASE08 = makeCaseBook('08', raw, { chapters: 10, appendices: 5 });

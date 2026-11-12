// D3: the course manuscript, read-only, bundled as raw text.
import raw from '@content/D3_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('D3', raw, { exPrefix: 'd3', citeNoteRefs: true });
// The core question is introduced with a short lead-in ("这一章的核心问题是："),
// as in D1.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const D3 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

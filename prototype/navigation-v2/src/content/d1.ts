// D1: the course manuscript, read-only, bundled as raw text.
import raw from '@content/D1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('D1', raw, { exPrefix: 'd1', citeNoteRefs: true });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const D1 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

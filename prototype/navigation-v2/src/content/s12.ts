// S12: the course manuscript, read-only, bundled as raw text.
import raw from '@content/S12_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('S12', raw, { exPrefix: 's12', citeNoteRefs: true });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const S12 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

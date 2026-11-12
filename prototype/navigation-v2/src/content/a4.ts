// A4: the course manuscript, read-only, bundled as raw text.
import raw from '@content/A4_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('A4', raw, { exPrefix: 'a4' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const A4 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

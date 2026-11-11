// EA7　自由主义、功利主义与实用主义: the course manuscript, read-only, bundled as raw text.
import raw from '@content/EA7_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('EA7', raw, { exPrefix: 'ea7' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const EA7 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

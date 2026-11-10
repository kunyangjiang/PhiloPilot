// IN8　近代与殖民时期的印度哲学: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IN8_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('IN8', raw, { exPrefix: 'in8' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const IN8 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

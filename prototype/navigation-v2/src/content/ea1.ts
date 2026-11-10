// EA1　从古代晚期到经院哲学: the course manuscript, read-only, bundled as raw text.
import raw from '@content/EA1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('EA1', raw, { exPrefix: 'ea1' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const EA1 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

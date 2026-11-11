// EA9　现象学、存在主义与诠释学: the course manuscript, read-only, bundled as raw text.
import raw from '@content/EA9_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('EA9', raw, { exPrefix: 'ea9' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const EA9 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

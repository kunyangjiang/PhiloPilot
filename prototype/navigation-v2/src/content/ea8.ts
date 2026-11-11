// EA8　逻辑、语言与分析哲学的兴起: the course manuscript, read-only, bundled as raw text.
import raw from '@content/EA8_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('EA8', raw, { exPrefix: 'ea8' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const EA8 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

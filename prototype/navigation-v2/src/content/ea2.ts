// EA2　近代早期理性主义与新科学: the course manuscript, read-only, bundled as raw text.
import raw from '@content/EA2_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('EA2', raw, { exPrefix: 'ea2' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const EA2 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

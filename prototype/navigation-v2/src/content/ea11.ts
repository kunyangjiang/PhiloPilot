// EA11　1950 年后的道德与政治哲学：从安斯康姆到罗尔斯: the course manuscript, read-only, bundled as raw text.
import raw from '@content/EA11_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('EA11', raw, { exPrefix: 'ea11' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const EA11 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

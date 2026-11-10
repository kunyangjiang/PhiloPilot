// IA5　近现代伊斯兰与阿拉伯思想: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IA5_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('IA5', raw, { exPrefix: 'ia5' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const IA5 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

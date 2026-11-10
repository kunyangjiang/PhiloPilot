// IA3　安萨里、阿威罗伊与西方伊斯兰思想: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IA3_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('IA3', raw, { exPrefix: 'ia3' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const IA3 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

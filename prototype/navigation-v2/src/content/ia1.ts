// IA1　翻译运动、凯拉姆与哲学的兴起: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IA1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('IA1', raw, { exPrefix: 'ia1' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const IA1 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

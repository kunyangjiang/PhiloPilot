// 梵、自我与世界：吠檀多派: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IN6_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('IN6', raw, { exPrefix: 'in6' });

// The guide's first bold is the hook "是谁无明？", not the question; the core
// question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const IN6 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

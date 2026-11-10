// IA4　照明学派、苏非形而上学与后古典诸派: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IA4_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('IA4', raw, { exPrefix: 'ia4' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const IA4 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

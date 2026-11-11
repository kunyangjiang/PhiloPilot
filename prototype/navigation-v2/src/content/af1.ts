// AF1　非洲哲学思想：来源、争论与方法: the course manuscript, read-only, bundled as raw text.
import raw from '@content/AF1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('AF1', raw, { exPrefix: 'af1' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const AF1 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

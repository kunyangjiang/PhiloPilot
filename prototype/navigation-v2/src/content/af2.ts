// AF2　后殖民与当代非洲哲学: the course manuscript, read-only, bundled as raw text.
import raw from '@content/AF2_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('AF2', raw, { exPrefix: 'af2' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const AF2 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

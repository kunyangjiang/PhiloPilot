// JP1　日本哲学：佛教思想、江户儒学与京都学派: the course manuscript, read-only, bundled as raw text.
import raw from '@content/JP1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('JP1', raw, { exPrefix: 'jp1' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const JP1 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

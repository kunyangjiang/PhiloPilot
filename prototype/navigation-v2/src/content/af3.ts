// AF3　非洲裔与黑色大西洋哲学: the course manuscript, read-only, bundled as raw text.
import raw from '@content/AF3_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('AF3', raw, { exPrefix: 'af3' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const AF3 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

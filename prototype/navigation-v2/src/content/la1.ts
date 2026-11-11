// LA1　拉丁美洲哲学：征服、独立与解放: the course manuscript, read-only, bundled as raw text.
import raw from '@content/LA1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('LA1', raw, { exPrefix: 'la1' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const LA1 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

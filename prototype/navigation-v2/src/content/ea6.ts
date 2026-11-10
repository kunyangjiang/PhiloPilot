// EA6　黑格尔之后：马克思、克尔凯郭尔、叔本华与尼采: the course manuscript, read-only, bundled as raw text.
import raw from '@content/EA6_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('EA6', raw, { exPrefix: 'ea6' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const EA6 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

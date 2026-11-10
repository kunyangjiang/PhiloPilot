// JW1　犹太哲学：从萨阿迪亚到列维纳斯: the course manuscript, read-only, bundled as raw text.
import raw from '@content/JW1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

// The manuscript gives another course's internal code after its name; the
// interface shows course names only.
const names = (html: string) => html.replace(/（EA9）/g, '');

const parsed = parseCourse('JW1', raw, { exPrefix: 'jw1', displayText: names });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const JW1 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

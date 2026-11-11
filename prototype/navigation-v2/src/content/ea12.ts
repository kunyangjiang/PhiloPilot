// EA12　批判理论、结构主义、后结构主义与女性主义理论: the course manuscript, read-only, bundled as raw text.
import raw from '@content/EA12_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('EA12', raw, { exPrefix: 'ea12' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const EA12 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

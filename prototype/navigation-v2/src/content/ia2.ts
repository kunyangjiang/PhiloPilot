// IA2　法拉比与阿维森纳：存在与灵魂的系统哲学: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IA2_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('IA2', raw, { exPrefix: 'ia2' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const IA2 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

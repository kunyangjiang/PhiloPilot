// A2　形式推理：命题逻辑与谓词逻辑: the course manuscript, read-only, bundled as raw text.
import raw from '@content/A2_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('A2', raw, { exPrefix: 'a2' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const A2 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

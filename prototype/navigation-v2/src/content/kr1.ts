// KR1　韩国哲学：佛教、理学论争与现代: the course manuscript, read-only, bundled as raw text.
import raw from '@content/KR1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('KR1', raw, { exPrefix: 'kr1' });

// The core question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const KR1 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

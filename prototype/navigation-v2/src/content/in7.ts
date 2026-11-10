// 意识、物质与修行：数论与瑜伽派: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IN7_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('IN7', raw, { exPrefix: 'in7' });

// The guide's first bold ("认识到它们的区别") is not the question; the core
// question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const IN7 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

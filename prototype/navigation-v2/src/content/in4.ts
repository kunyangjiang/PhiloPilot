// 大乘哲学：中观与瑜伽行派: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IN4_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

// The two Chinese translations (Prabhākaramitra's 般若灯论, Xuanzang's 唯识二十论) are cited
// author-first with a note after the citation, as in 知识、推理与辩论:
// （清辨《般若灯论》，波罗颇蜜多罗译）[^42].
const parsed = parseCourse('IN4', raw, { exPrefix: 'in4', citedQuotesAreSources: true, authorCites: true, citeNoteRefs: true });

// The guide's first bold is the school name "中观派", not the question; the core
// question is the bold sentence after "这一章的核心问题是：", verbatim.
const coreM = raw.match(/这一章的核心问题是：\*\*(.+?)\*\*/);
export const IN4 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

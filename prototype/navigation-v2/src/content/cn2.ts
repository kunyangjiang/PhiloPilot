import raw from '@content/CN2_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

// Later Mohist canon lines are often too terse to carry 也/曰/「」, so every
// cited blockquote in this manuscript is a classical passage.
const parsed = parseCourse('CN2', raw, { exPrefix: 'cn2', summaryStart: '本课一句话', citedQuotesAreSources: true });

// The guide's first bold is a reading note, and its title asks why to read the course.
// The question the guide says the course follows ("顺着这个问题往下追") is the
// sentence after 墨家更常问"凭什么说这样做是对的"：, taken verbatim.
const coreM = raw.match(/墨家更常问"凭什么说这样做是对的"：([^？]*？)/);
export const CN2 = { ...parsed, CORE_QUESTION: coreM ? coreM[1] : parsed.CORE_QUESTION };

/** 一 · 墨家的伦理与政治 bears on the 人性与道德 question. */
export const ETHICS_SECTION = CN2.SECTIONS.findIndex((s) => s.title.startsWith('一、'));

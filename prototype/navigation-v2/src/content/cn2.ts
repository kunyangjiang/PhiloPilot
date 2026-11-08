import raw from '@content/CN2_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

// Later Mohist canon lines are often too terse to carry 也/曰/「」, so every
// cited blockquote in this manuscript is a classical passage.
export const CN2 = parseCourse('CN2', raw, { exPrefix: 'cn2', summaryStart: '本课一句话', citedQuotesAreSources: true });

/** 一 · 墨家的伦理与政治 bears on the 人性与道德 question. */
export const ETHICS_SECTION = CN2.SECTIONS.findIndex((s) => s.title.startsWith('一、'));

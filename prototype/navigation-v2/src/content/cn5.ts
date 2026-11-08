import raw from '@content/CN5_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const CN5 = parseCourse('CN5', raw, { exPrefix: 'cn5', summaryStart: '本课一句话', citedQuotesAreSources: true });
/** 六 · 禅: 顿与渐 bears on the 人性与道德 question (how one becomes good: sudden insight or long practice). */
export const AWAKENING_SECTION = CN5.SECTIONS.findIndex((s) => s.title.startsWith('六、'));

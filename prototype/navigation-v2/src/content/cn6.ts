import raw from '@content/CN6_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const CN6 = parseCourse('CN6', raw, { exPrefix: 'cn6', summaryStart: '本课一句话', citedQuotesAreSources: true });
/** 三 · 朱熹: 心、性、情 and 格物 bear on the 人性与道德 question. */
export const NATURE_SECTION = CN6.SECTIONS.findIndex((s) => s.title.startsWith('三、'));

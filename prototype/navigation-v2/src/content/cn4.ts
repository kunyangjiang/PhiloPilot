import raw from '@content/CN4_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const CN4 = parseCourse('CN4', raw, { exPrefix: 'cn4', summaryStart: '本课一句话', citedQuotesAreSources: true });
/** 二 · 韩非: human dispositions and incentives bear on the 人性与道德 question. */
export const INCENTIVE_SECTION = CN4.SECTIONS.findIndex((s) => s.title.startsWith('二、'));

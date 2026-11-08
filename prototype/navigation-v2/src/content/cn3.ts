import raw from '@content/CN3_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const CN3 = parseCourse('CN3', raw, { exPrefix: 'cn3', summaryStart: '本课一句话', citedQuotesAreSources: true });
export const SKILL_SECTION = CN3.SECTIONS.findIndex((s) => s.title.startsWith('五、'));

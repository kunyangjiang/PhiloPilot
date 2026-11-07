// GR2's text is parsed by the shared course parser from its manuscript.
import raw from '@content/GR2_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const GR2 = parseCourse('GR2', raw, { exPrefix: 'gr2', summaryStart: '本课一句话' });

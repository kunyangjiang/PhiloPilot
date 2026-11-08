// GR3's text is parsed by the shared course parser from its manuscript.
import raw from '@content/GR3_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const GR3 = parseCourse('GR3', raw, { exPrefix: 'gr3', summaryStart: '本课一句话' });

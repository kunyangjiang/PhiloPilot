// GR4's text is parsed by the shared course parser from its manuscript.
import raw from '@content/GR4_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const GR4 = parseCourse('GR4', raw, { exPrefix: 'gr4', summaryStart: '本课一句话' });

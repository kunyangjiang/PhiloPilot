// 古希腊哲学的起源：从自然到经省察的人生: the course manuscript, read-only, bundled as raw text.
import raw from '@content/GR1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const GR1 = parseCourse('GR1', raw, { exPrefix: 'gr1', summaryStart: '本课一句话' });

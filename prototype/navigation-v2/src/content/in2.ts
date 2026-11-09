// 早期佛教与阿毗达磨: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IN2_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const IN2 = parseCourse('IN2', raw, { exPrefix: 'in2' });

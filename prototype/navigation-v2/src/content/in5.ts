// 权威、语言与义务：弥曼差派: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IN5_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const IN5 = parseCourse('IN5', raw, { exPrefix: 'in5' });

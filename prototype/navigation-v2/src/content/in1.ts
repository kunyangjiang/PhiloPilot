// 印度哲学的起源与早期思想争论: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IN1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export const IN1 = parseCourse('IN1', raw, { exPrefix: 'in1', summaryStart: '这些问题后来成为' });

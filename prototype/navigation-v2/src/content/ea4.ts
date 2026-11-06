// 康德：批判、自主与判断: the course manuscript, read-only, bundled as raw text.
import raw from '@content/EA4_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

// The manuscript refers to the other course by its internal code; the
// interface always shows course names instead.
const names = (html: string) => html.replace(/\bCN1\b/g, '《孔子、孟子与荀子》');

export const EA4 = parseCourse('EA4', raw, { exPrefix: 'ea4', summaryStart: '请先记住一点', displayText: names });

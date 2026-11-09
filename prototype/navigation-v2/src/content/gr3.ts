// GR3's text is parsed by the shared course parser from its manuscript.
import raw from '@content/GR3_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

const parsed = parseCourse('GR3', raw, { exPrefix: 'gr3', summaryStart: '本课一句话' });
// The guide has no bolded core question (its first bold is a reading note); the
// question is the guide's own title, verbatim, as in CN7.
export const GR3 = { ...parsed, CORE_QUESTION: parsed.SECTIONS[0].title.replace(/^[^：]*：/, '') };

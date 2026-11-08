import raw from '@content/CN7_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

// Citations name the author first: （严复《论世变之亟》）.
const parsed = parseCourse('CN7', raw, { exPrefix: 'cn7', summaryStart: '本课一句话', citedQuotesAreSources: true, authorCites: true });

// The guide has no bolded core question (its first bold is the thread label
// "论证的"); the question is the guide's own title, verbatim.
export const CN7 = { ...parsed, CORE_QUESTION: parsed.SECTIONS[0].title.replace(/^[^：]*：/, '') };

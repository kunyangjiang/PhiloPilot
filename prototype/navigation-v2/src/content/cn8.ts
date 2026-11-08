import raw from '@content/CN8_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

// Citations name the author first: （毛泽东《实践论》）.
export const CN8 = parseCourse('CN8', raw, { exPrefix: 'cn8', summaryStart: '本课一句话', citedQuotesAreSources: true, authorCites: true });

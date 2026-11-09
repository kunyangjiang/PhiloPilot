// 知识、推理与辩论: the course manuscript, read-only, bundled as raw text.
import raw from '@content/IN3_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

// Xuanzang's Chinese is cited author-first, with a note after the citation:
// （商羯罗主《因明入正理论》，玄奘译）[^46].
export const IN3 = parseCourse('IN3', raw, { exPrefix: 'in3', citedQuotesAreSources: true, authorCites: true, citeNoteRefs: true });

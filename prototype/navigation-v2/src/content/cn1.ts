// 孔子、孟子与荀子: the real course draft, read-only, bundled as raw text.
import raw from '@content/CN1_SAMPLE_DRAFT.md?raw';
import { parseCourse } from './course';

export type { Block, Section } from './course';
export { shortTitle } from './course';

export const CN1 = parseCourse('CN1', raw, { exPrefix: 'cn1', summaryStart: '孔子、孟子和荀子是' });

export const { TITLE, SUBTITLE, STATUS_HTML, FOOTNOTES, SECTIONS, READING, APPENDIX, isAppendix, partNo, TOTAL_CHARS, CORE_QUESTION, SUMMARY } = CN1;

/** Section that opens when entering from the 人性与道德 topic (Mencius). */
export const MENCIUS_SECTION = SECTIONS.findIndex((s) => s.title.startsWith('三、孟子'));

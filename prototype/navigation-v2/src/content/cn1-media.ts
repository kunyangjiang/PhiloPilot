import { SECTIONS, type Block } from './cn1';

// Where the interactive teaching components sit in the course text.
// The draft itself is never edited: each component is attached to a block of
// the draft found by its text, so moving or editing nearby paragraphs does not
// silently shift it. If the anchor text disappears from the draft, the
// component is simply not shown (and a warning is logged during development).

export type MediaId = 'context-strip' | 'ox-mountain' | 'case-sorter';

interface Anchor {
  id: MediaId;
  /** Start of the section title, e.g. “三、孟子”. */
  section: string;
  /** The block the component follows. */
  match: (b: Block) => boolean;
}

const ANCHORS: Anchor[] = [
  { id: 'context-strip', section: '一、', match: (b) => b.kind === 'html' && b.text.startsWith('荀子活动于公元前三世纪') },
  // After the 6A8 quotation, its 大意 and the word glosses (濯濯、萌蘖、斧斤…).
  { id: 'ox-mountain', section: '三、孟子', match: (b) => b.kind === 'html' && b.text.includes('濯濯') && b.text.includes('萌蘖') && b.text.includes('良心') },
  { id: 'case-sorter', section: '五、', match: (b) => b.kind === 'exercise' && b.text.includes('活动 C，下') },
];

/** “section:block” → components placed right after that block. */
const PLACED = new Map<string, MediaId[]>();
for (const a of ANCHORS) {
  const s = SECTIONS.find((x) => x.title.startsWith(a.section));
  const i = s ? s.blocks.findIndex(a.match) : -1;
  if (!s || i < 0) {
    if (import.meta.env.DEV) console.warn(`[cn1-media] anchor for “${a.id}” not found in the draft; component hidden`);
    continue;
  }
  const k = `${s.index}:${i}`;
  PLACED.set(k, [...(PLACED.get(k) ?? []), a.id]);
}

export const mediaAfter = (section: number, block: number): MediaId[] => PLACED.get(`${section}:${block}`) ?? [];

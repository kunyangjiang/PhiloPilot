import type { Block } from './course';
import { PUBLISHED } from './courses';

// Where the interactive teaching components sit in each course text.
// The manuscripts are never edited: each component is attached to a block of
// the text found by its content, so moving or editing nearby paragraphs does
// not silently shift it. If the anchor text disappears, the component is
// simply not shown (and a warning is logged during development).

export type MediaId =
  // 孔子、孟子与荀子
  | 'context-strip'
  | 'ox-mountain'
  | 'case-sorter'
  // 康德
  | 'kant-context'
  | 'judgment-explorer'
  | 'cognition-explorer'
  | 'appearance-explorer'
  | 'ci-workshop'
  // 印度哲学的起源
  | 'dialogue-explorer'
  | 'mahavira-folio'
  | 'many-sided'
  | 'evidence-workshop'
  // 古希腊哲学的起源
  | 'parmenides-explorer'
  | 'change-explorer'
  | 'sokrates-gem'
  | 'laches-workshop';

interface Anchor {
  id: MediaId;
  code: string;
  /** Start of the section title, e.g. “三、孟子”. */
  section: string;
  /** The block the component follows. */
  match: (b: Block) => boolean;
}

const ANCHORS: Anchor[] = [
  { id: 'context-strip', code: 'CN1', section: '一、', match: (b) => b.kind === 'html' && b.text.startsWith('荀子活动于公元前三世纪') },
  // After the 6A8 quotation, its 大意 and the word glosses (濯濯、萌蘖、斧斤…).
  { id: 'ox-mountain', code: 'CN1', section: '三、孟子', match: (b) => b.kind === 'html' && b.text.includes('濯濯') && b.text.includes('萌蘖') && b.text.includes('良心') },
  { id: 'case-sorter', code: 'CN1', section: '五、', match: (b) => b.kind === 'exercise' && b.text.includes('活动 C，下') },

  // 一 · 背景: after the paragraph on Kant's life in Königsberg.
  { id: 'kant-context', code: 'EA4', section: '一、', match: (b) => b.kind === 'html' && b.text.startsWith('康德（Immanuel Kant，1724—1804）') },
  // 二 · 第二步: after the exercise (二) on analytic/synthetic, a priori/a posteriori.
  { id: 'judgment-explorer', code: 'EA4', section: '二、', match: (b) => b.kind === 'exercise' && b.text.includes('分析还是综合') },
  // 二 · 第四步: after the notes on the X-ray and the empty-thought examples.
  { id: 'cognition-explorer', code: 'EA4', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('两个例子都有限度') },
  // 三 · after the comparison of the two teaching metaphors.
  { id: 'appearance-explorer', code: 'EA4', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('两个比喻的共同毛病') },
  // 四 · 普遍法则公式: after the exercise (六) on universalising a maxim.
  { id: 'ci-workshop', code: 'EA4', section: '四、', match: (b) => b.kind === 'exercise' && b.text.includes('普遍化一条准则') },

  // 二 · after the four dialogues (the note comparing Yājñavalkya and Prajāpati on deep sleep).
  { id: 'dialogue-explorer', code: 'IN1', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('一个值得注意的对照') },
  // 四 · after the paragraph introducing Mahāvīra and the tīrthaṅkaras (museum object).
  { id: 'mahavira-folio', code: 'IN1', section: '四、', match: (b) => b.kind === 'html' && b.text.includes('tīrthaṅkara') && b.text.includes('大雄') },
  // 四 · 第三步: after the paragraph explaining syāt and the red pot.
  { id: 'many-sided', code: 'IN1', section: '四、', match: (b) => b.kind === 'html' && b.text.includes('syādvāda') && b.text.includes('不可言说') },
  // 五 · after the two readings of the Cārvāka and the boundary problem that follows them.
  { id: 'evidence-workshop', code: 'IN1', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('当然，即使接受温和的读法') },

  // 二 · after the step-by-step reconstruction of Parmenides' argument (end of fragment 8).
  { id: 'parmenides-explorer', code: 'GR1', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('在残篇 8 的后面部分') },
  // 三 · after the comparison table of the three answers and the open question on motion.
  { id: 'change-explorer', code: 'GR1', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('还有一个问题，这里只能提出') },
  // 五 · after the paragraph introducing Socrates (museum object).
  { id: 'sokrates-gem', code: 'GR1', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('苏格拉底（Socrates）生于') },
  // 五 · after the step-by-step reading of the Laches, where the dialogue ends.
  { id: 'laches-workshop', code: 'GR1', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('对话就在这里结束') },
];

/** “code:section:block” → components placed right after that block. */
const PLACED = new Map<string, MediaId[]>();
for (const a of ANCHORS) {
  const sections = PUBLISHED[a.code]?.text.SECTIONS ?? [];
  const s = sections.find((x) => x.title.startsWith(a.section));
  const i = s ? s.blocks.findIndex(a.match) : -1;
  if (!s || i < 0) {
    if (import.meta.env.DEV) console.warn(`[media] anchor for “${a.id}” not found in ${a.code}; component hidden`);
    continue;
  }
  const k = `${a.code}:${s.index}:${i}`;
  PLACED.set(k, [...(PLACED.get(k) ?? []), a.id]);
}

export const mediaAfter = (code: string, section: number, block: number): MediaId[] => PLACED.get(`${code}:${section}:${block}`) ?? [];

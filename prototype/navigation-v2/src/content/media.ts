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
  | 'laches-workshop'
  // 柏拉图
  | 'clarke-plato'
  | 'euthyphro-workshop'
  | 'divided-line'
  | 'cave-explorer'
  | 'third-man'
  | 'plato-head'
  // 亚里士多德
  | 'bekker-page'
  | 'aristotle-head'
  | 'syllogism-lab'
  | 'matter-form-change'
  | 'four-causes'
  | 'virtue-mean'
  // 希腊化与罗马哲学
  | 'epicurus-head'
  | 'desire-explorer'
  | 'zeno-head'
  | 'assent-workshop'
  | 'fate-explorer'
  | 'modes-lab';

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

  // 一 · after the paragraph on the dialogue's opening (manuscript page, fol. 1r).
  { id: 'clarke-plato', code: 'GR2', section: '一、', match: (b) => b.kind === 'html' && b.text.startsWith('《游叙弗伦》的开头交代了两场官司') },
  // 一 · after the reading of the Euthyphro, where the dialogue ends (before the Crito interlude).
  { id: 'euthyphro-workshop', code: 'GR2', section: '一、', match: (b) => b.kind === 'html' && b.text.startsWith('最后，对话还有一层戏剧上的反讽') },
  // 五 · after the Divided Line and its "equal middle segments" puzzle.
  { id: 'divided-line', code: 'GR2', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('线段的一个著名难题') },
  // 五 · after "what the Cave is not", once education, the Good and the return have been read.
  { id: 'cave-explorer', code: 'GR2', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('这些区别并不是说，现代的用法都是错的') },
  // 六 · after the three premises and the regress they generate.
  { id: 'third-man', code: 'GR2', section: '六、', match: (b) => b.kind === 'html' && b.text.startsWith('有了这三个前提，就可以推出无穷倒退') },
  // 七 · after the reminder that Plato never speaks in his own name (museum object).
  { id: 'plato-head', code: 'GR2', section: '七、', match: (b) => b.kind === 'html' && b.text.startsWith('本课一开始就提醒过：柏拉图从不在对话中以自己的名义说话') },

  // 导读 · after the paragraph explaining Bekker numbers (printed page, p. 1094).
  { id: 'bekker-page', code: 'GR3', section: '本章导读', match: (b) => b.kind === 'html' && b.text.includes('贝克尔页码。') && b.text.includes('1098a16') },
  // 一 · after the paragraph on the School of Athens impression (museum object).
  { id: 'aristotle-head', code: 'GR3', section: '一、', match: (b) => b.kind === 'html' && b.text.includes('柏拉图的反对者') && b.text.includes('雅典学园') },
  // 二 · after the three figures, at "本课不要求读者记住全部有效式" (before what syllogistic cannot do).
  { id: 'syllogism-lab', code: 'GR3', section: '二、', match: (b) => b.kind === 'html' && b.text.includes('本课不要求读者记住全部有效式') },
  // 三 · end of "潜能与现实": matter/form, the kinds of change and both senses of potentiality read.
  { id: 'matter-form-change', code: 'GR3', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('后来的研究者常把这两种情况称为') },
  // 四 · end of "目的不是意图": the four causes, the eclipse and the teleology debate read.
  { id: 'four-causes', code: 'GR3', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('亚里士多德特意说，燕子和蜘蛛') },
  // 六 · end of "没有中道的行为", after the table of virtues and vices.
  { id: 'virtue-mean', code: 'GR3', section: '六、', match: (b) => b.kind === 'html' && b.text.includes('把弯曲的木头扳直') },

  // 二 · after the plan of the Epicurean part (museum object).
  { id: 'epicurus-head', code: 'GR4', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('这一部分先讲伊壁鸠鲁派的伦理学') },
  // 二 · after "这是禁欲主义吗？": the three kinds of desire and the calculus read.
  { id: 'desire-explorer', code: 'GR4', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('这是禁欲主义吗') },
  // 三 · after the table of Stoic periods and how little we know of the early Stoa (museum object).
  { id: 'zeno-head', code: 'GR4', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('这张表说明了一个方法上的困难') },
  // 三 · after Gellius' storm story and the note on its layers: impression, first movement, assent read.
  { id: 'assent-workshop', code: 'GR4', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('需要注意这条材料的层次') },
  // 四 · end of the part on fate: lazy argument, cylinder, swerve and Carneades read.
  { id: 'fate-explorer', code: 'GR4', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('古代的讨论给我们留下的') },
  // 五 · after "标准的问题": ten modes, five modes and the trilemma read.
  { id: 'modes-lab', code: 'GR4', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('五论式的一个特别重要的应用') },
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

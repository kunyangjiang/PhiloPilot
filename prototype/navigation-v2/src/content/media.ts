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
  // 早期佛教与阿毗达磨
  | 'do-explorer'
  | 'chariot-explorer'
  | 'abhidharma-lab'
  | 'therigatha-voices'
  // 知识、推理与辩论
  | 'five-member'
  | 'trairupya-lab'
  | 'apoha-explorer'
  | 'navya-workshop'
  // 大乘哲学：中观与瑜伽行派
  | 'catuskoti-workshop'
  | 'yogacara-lab'
  | 'three-natures'
  // 权威、语言与义务：弥曼差派
  | 'injunction-workshop'
  | 'sentence-lab'
  | 'self-validity'
  // 梵、自我与世界：吠檀多派
  | 'upanisad-explorer'
  | 'adhyasa-workshop'
  | 'brahman-self-world'
  // 意识、物质与修行：数论与瑜伽派
  | 'tattva-explorer'
  | 'purusa-workshop'
  // 近代与殖民时期的印度哲学
  | 'gandhi-ambedkar-workshop'
  | 'reinterpretation-lab'
  // 翻译运动、凯拉姆与哲学的兴起
  | 'occasionalism-lab'
  | 'eternity-workshop'
  // 法拉比与阿维森纳
  | 'necessary-existent'
  | 'flying-man'
  // 安萨里、阿威罗伊与西方伊斯兰思想
  | 'fire-cotton'
  | 'cohesion-model'
  // 照明学派、苏非形而上学与后古典诸派
  | 'presence-explorer'
  | 'substantial-motion'
  // 近现代伊斯兰与阿拉伯思想
  | 'iqbal-method'
  | 'double-movement'
  // V21 images (approved 2026-11-09)
  | 'roy-miniature'
  | 'vivekananda-1893'
  | 'ramabai-1887'
  | 'tagore-school'
  | 'dioscorides-1224'
  | 'forget-p142'
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
  | 'modes-lab'
  // 墨家、名家与后期墨经
  | 'three-standards'
  | 'daozang-page'
  | 'classification-lab'
  | 'pinhole-demo'
  | 'white-horse'
  // 道家传统
  | 'wuwei-explorer'
  | 'perspective-lab'
  | 'butterfly-dream'
  | 'cook-ding'
  | 'zeshin-scroll'
  // 法家与汉代思想
  | 'xingming-workshop'
  | 'five-phases'
  | 'hexagram-explorer'
  | 'coincidence-sim'
  | 'qin-slips'
  // 魏晋玄学与中国佛学
  | 'emptiness-explorer'
  | 'threefold-truth'
  | 'huayan-explorer'
  | 'sudden-gradual'
  | 'concept-map-cn5'
  | 'p2179-colophon'
  | 'liangkai-bamboo'
  | 'liangkai-sutra'
  // 宋明理学至清代
  | 'taiji-tu'
  | 'zhuxi-letter'
  | 'shiguan-page'
  | 'concept-map-cn6'
  | 'liqi-explorer'
  | 'zhu-wang-workshop'
  | 'zhixing-explorer'
  | 'evidential-workshop'
  | 'women-evidence-board'
  | 'translation-lab'
  | 'debate-workshop'
  | 'new-confucian-comparison'
  | 'practice-contradiction'
  // 犹太哲学：从萨阿迪亚到列维纳斯
  | 'negative-theology'
  | 'creation-eternity'
  // 从古代晚期到经院哲学
  | 'anselm-lab'
  | 'universals-workshop'
  | 'five-ways'
  // 近代早期理性主义与新科学
  | 'doubt-cogito'
  | 'elisabeth-objection'
  // V24 · 经验论、启蒙与自由主义的起源 / 德国观念论与浪漫主义 / 黑格尔之后
  | 'hume-induction'
  | 'dialectic-stepper'
  | 'critique-sorter'
  // V25 · 自由主义、功利主义与实用主义 / 逻辑、语言与分析哲学的兴起 / 现象学、存在主义与诠释学
  | 'harm-principle'
  | 'russell-scope'
  | 'bad-faith-sorter'
  | 'rigidity-tester'
  | 'distribution-chooser'
  | 'writing-hierarchy'
  // 非洲哲学思想
  | 'source-weigh'
  // 后殖民与当代非洲哲学
  | 'decolonize-compare'
  // 非洲裔与黑色大西洋哲学
  | 'experience-argument'
  // 日本哲学 · 韩国哲学 · 拉丁美洲哲学
  | 'uji-readings'
  | 'four-seven-voices'
  | 'normative-premises'
  // 什么是哲学？问题、论证与阅读
  | 'argument-roles'
  // 形式推理：命题逻辑与谓词逻辑
  | 'validity-checker'
  // 概念、案例与思想实验
  | 'case-dials'
  // 诠释、翻译与哲学写作
  | 'translation-lens'
  // 知识与怀疑
  | 'case-analyser'
  // 形而上学：存在、实体、共相与模态
  | 'universals-test'
  // 因果、规律与时间
  | 'causation-cases'
  // 人格、自我与自由意志
  | 'identity-cases'
  // 心灵哲学与意识
  | 'thought-experiment-map'
  // 语言、意义与指称
  | 'reference-cases'
  // 伦理学：对与善、道德修养
  | 'framework-case'
  // 元伦理学与道德心理学
  | 'metaethics-map'
  | 'obligation-grounds'
  | 'anomaly-case'
  | 'liar-responses';

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

  // 二 · after the table of four readings and the paragraph weighing them.
  { id: 'do-explorer', code: 'IN2', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('四种读法不一定互相排斥') },
  // 三 · after the lamp and the milk (the paragraph on what the similes do not do).
  { id: 'chariot-explorer', code: 'IN2', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('它没有做到什么') },
  // 四 · after the two classifications of dharmas.
  { id: 'abhidharma-lab', code: 'IN2', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('本章不要求读者记住这些数目') },
  // 七 · after the table that keeps verse, inference and later accounts apart.
  { id: 'therigatha-voices', code: 'IN2', section: '七、', match: (b) => b.kind === 'html' && b.text.includes('苏摩') && b.text.includes('后来的说法') && b.text.includes('帕塔查拉') },

  // 三 · after the three five-membered arguments set side by side.
  { id: 'five-member', code: 'IN3', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('比较这三行') },
  // 四 · after the hetucakra table.
  { id: 'trairupya-lab', code: 'IN3', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('九种情况中，只有两种是好的理由') },
  // 五 · after Ratnakīrti's position on apoha.
  { id: 'apoha-explorer', code: 'IN3', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('也就是说，听到') },
  // 七 · after the table of definition one and definition two (the kitchen).
  { id: 'navya-workshop', code: 'IN3', section: '七、', match: (b) => b.kind === 'html' && b.text.includes('定义二') && b.text.includes('厨房是火之所在') },

  // 二 · after the paragraph on whether the four corners break the laws of logic.
  { id: 'catuskoti-workshop', code: 'IN4', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('四句违反逻辑吗') },
  // 四 · after the comparison with Berkeley and Kant (the paragraph on the practical aim).
  { id: 'yogacara-lab', code: 'IN4', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('还有一点比这张表更重要') },
  // 五 · after Śāntideva's reply on the lamp (end of 识的究竟地位).
  { id: 'three-natures', code: 'IN4', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('接着，寂天回答') },

  // 一 · after the śyena table (how Mīmāṃsā reads a command).
  { id: 'injunction-workshop', code: 'IN5', section: '一、', match: (b) => b.kind === 'html' && b.text.startsWith('这里可以看到弥曼差派思考命令的方式') },
  // 三 · after why the dispute matters (the Frege comparison closes the section).
  { id: 'sentence-lab', code: 'IN5', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('SEP 的作者把普拉巴卡拉派的理论和弗雷格') },
  // 四 · after the comparison with Nyāya and the Buddhists.
  { id: 'self-validity', code: 'IN5', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('对第三种立场，帕尔塔萨拉提的回答是') },

  // 一 · after "what the table shows" (four passages, three readings).
  { id: 'upanisad-explorer', code: 'IN6', section: '一、', match: (b) => b.kind === 'html' && b.text.includes('这个表说明了什么') },
  // 二 · after the two remarks on the rope and the snake (adhyāsa).
  { id: 'adhyasa-workshop', code: 'IN6', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('这个例子有两点值得注意') },
  // 六 · after the 总表 of the three schools.
  { id: 'brahman-self-world', code: 'IN6', section: '六、', match: (b) => b.kind === 'html' && b.text.includes('具有无量美好属性的人格神（毗湿奴）') },

  // 二 · where the chapter introduces the tattva structure (it replaces the former text diagram).
  { id: 'tattva-explorer', code: 'IN7', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('把这几颂合起来，可以整理成一张结构图') },
  // 三 · after the comparison with Descartes.
  { id: 'purusa-workshop', code: 'IN7', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章的整理。最重要的区别在第二行') },

  // 四 · after the Gandhi–Ambedkar table and the 1932 paragraph.
  { id: 'gandhi-ambedkar-workshop', code: 'IN8', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('这张表是本章的整理。两人的分歧在 1932 年达到顶点') },
  // 七 · after the four questions are applied to Ambedkar's Buddhism.
  { id: 'reinterpretation-lab', code: 'IN8', section: '七、', match: (b) => b.kind === 'html' && b.text.startsWith('用这四个问题检验一种重新解释') },
  // 三 · after the two-schools table.
  { id: 'occasionalism-lab', code: 'IA1', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章的整理。最后一行要特别注意') },
  // 四 · after the paired arguments on the eternity of the world.
  { id: 'eternity-workshop', code: 'IA1', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('这张表是本章的整理。前三行的论证和反驳') },
  // 四 · after the three-proofs table.
  { id: 'necessary-existent', code: 'IA2', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章的整理。现代宗教哲学中的') },
  // 五 · after "不要把飞人读成……" (before the comparison with Descartes).
  { id: 'flying-man', code: 'IA2', section: '五、', match: (b) => b.kind === 'html' && b.text.includes('不要把飞人读成') },
  // 三 · after 必然性与障碍 (Averroes' fourth point), before the Avicenna comparison.
  { id: 'fire-cotton', code: 'IA3', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('这样，安萨里第二种进路中关于奇迹的说法') },
  // 六 · after the three generations ("这是一个循环的理论").
  { id: 'cohesion-model', code: 'IA3', section: '六、', match: (b) => b.kind === 'html' && b.text.startsWith('这是一个循环的理论') },
  // 二 · after the four-kinds-of-knowledge table.
  { id: 'presence-explorer', code: 'IA4', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章的整理。') && b.text.includes('现代的反驳') },
  // 五 · after the Zayd table.
  { id: 'substantial-motion', code: 'IA4', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章的整理。最后一列很重要') },
  // 二 · in the five-step reconstruction, before its summary table.
  { id: 'iqbal-method', code: 'IA5', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('所以，一个合理的评价是') },
  // 三 · after the evaluation of the polygamy worked example.
  { id: 'double-movement', code: 'IA5', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('所以，这个例子说明的，不是') },
  // V21 images, approved 2026-11-09 (content/V21_*_IMAGE_APPROVAL_SHEET.md).
  { id: 'roy-miniature', code: 'IN8', section: '一、', match: (b) => b.kind === 'html' && b.text.startsWith('1813 年，英国议会') },
  { id: 'vivekananda-1893', code: 'IN8', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('辨喜是孟加拉的神秘主义者') },
  { id: 'ramabai-1887', code: 'IN8', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('1888 年，她在美国出版了《高种姓印度妇女》') },
  { id: 'tagore-school', code: 'IN8', section: '六、', match: (b) => b.kind === 'html' && b.text.startsWith('泰戈尔是诗人、作曲家、画家') },
  { id: 'dioscorides-1224', code: 'IA1', section: '一、', match: (b) => b.kind === 'html' && b.text.startsWith('从八世纪中叶到十世纪末') },
  { id: 'forget-p142', code: 'IA2', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('阿维森纳在几部著作中都证明了必然存在者的存在') },

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

  // 二 · end of "后果成功，能证明一句话是真的吗？": both Mozi cases and the well/firecracker example read.
  { id: 'three-standards', code: 'CN2', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('这个例子说明：三表作为一组提醒') },
  // 三 · after the paragraph on how the canons are cited (one page of the 1445 道藏 print).
  { id: 'daozang-page', code: 'CN2', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('引用时，本课以通行本') },
  // 三 · after 形貌/居运 and the children's-ticket example: 同异, 狂举 and the two kinds of name read.
  { id: 'classification-lab', code: 'CN2', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('这个区分可以帮助我们看清日常分类中的许多困惑') },
  // 五 · end of "小孔成倒像": text, reconstruction and what a modern demonstration shows.
  { id: 'pinhole-demo', code: 'CN2', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('现代演示能说明什么') },
  // 六 · after the table of readings of 白马非马.
  { id: 'white-horse', code: 'CN2', section: '六、', match: (b) => b.kind === 'html' && b.text.startsWith('这张表不是要读者选出') },

  // 二 · after the three modern examples and their limits ("这三个例子共同说明").
  { id: 'wuwei-explorer', code: 'CN3', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('这三个例子共同说明') },
  // 三 · end of the 王倪 section: the four-step structure and its contested fourth step read.
  { id: 'perspective-lab', code: 'CN3', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('但这段话的形式值得注意') },
  // 三 · after the table of the three readings of the butterfly dream and the chapter's verdict.
  { id: 'butterfly-dream', code: 'CN3', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('本课不在三种读法中作最终的选择') },
  // 三 · after the third reading of the butterfly dream (a later painting of the story).
  { id: 'zeshin-scroll', code: 'CN3', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('读法三') },
  // 五 · after the stages table, the 每至於族 caution and the effort/spontaneity paradox.
  { id: 'cook-ding', code: 'CN3', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('《庄子》并没有直接讨论这个悖论') },

  // 二 · after the 典冠 story, its two readings and the closing caution.
  { id: 'xingming-workshop', code: 'CN4', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('请注意：这个故事展示的是韩非的原则') },
  // 四 · after the correspondence table and its second remark (the table is not one unified system).
  { id: 'five-phases', code: 'CN4', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('第二，它不是一套统一的系统') },
  // 五 · end of the worked example 泰之临 (how changing lines are read).
  { id: 'hexagram-explorer', code: 'CN4', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('有了变爻，应当怎样解释') },
  // 六 · end of 批评六 (卜筮): coincidence, "適與相逢".
  { id: 'coincidence-sim', code: 'CN4', section: '六、', match: (b) => b.kind === 'html' && b.text.startsWith('但王充并没有完全否定占卜') },
  // 三 · end of the Shuihudi section: a museum display of the 秦律十八种 slips.
  { id: 'qin-slips', code: 'CN4', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('本课没有直接阅读睡虎地秦简的释文') },

  // 三 · after the 本无宗 / 僧肇 contrast: the word "空" through its layers, 僧肇's two-part argument.
  { id: 'emptiness-explorer', code: 'CN5', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('最后一行说明了问题的微妙') },
  // 四 · after the mirror metaphor and its limit: sequential vs simultaneous 空假中.
  { id: 'threefold-truth', code: 'CN5', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('镜子的比喻很有用，但它也可能误导') },
  // 五 · end of "比喻的限度": rafter argument, six marks, models and their limits.
  { id: 'huayan-explorer', code: 'CN5', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('本课的看法是：比喻是华严思想不可缺少的部分') },
  // 六 · after 竺道生: verse versions, documented positions on 顿/渐, timeline.
  { id: 'sudden-gradual', code: 'CN5', section: '六、', match: (b) => b.kind === 'html' && b.text.startsWith('请注意道生说的第一句话') },
  // 六 · end: the shared concept map (this course's configuration).
  { id: 'concept-map-cn5', code: 'CN5', section: '六、', match: (b) => b.kind === 'html' && b.text.startsWith('但请记住：宋明理学不是') },
  // 导读 · the shared concept map (this course's configuration).
  { id: 'concept-map-cn6', code: 'CN6', section: '本章导读', match: (b) => b.kind === 'html' && b.text.startsWith('本课与《魏晋玄学与中国佛学') },
  // 三 · after the triangle analogy: 理 and 气 from 周敦颐 to 戴震.
  { id: 'liqi-explorer', code: 'CN6', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('用一个现代的比喻') },
  // 四 · after the comparison table: 孝的理在哪里.
  { id: 'zhu-wang-workshop', code: 'CN6', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('请看第三行。双方都认为理是普遍的') },
  // 五 · after 反驳三: four readings of 知行合一 and five cases.
  { id: 'zhixing-explorer', code: 'CN6', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('王阳明的本意显然只是第一个方向') },
  // 六 · after "考据：一种新的学问方式": evidence layers and conclusions.
  { id: 'evidential-workshop', code: 'CN6', section: '六、', match: (b) => b.kind === 'html' && b.text.startsWith('考据学是不是') },
  // 七 · after the note on Ko and Mann: the four-column evidence board.
  { id: 'women-evidence-board', code: 'CN6', section: '七、', match: (b) => b.kind === 'html' && b.text.startsWith('但请注意：本课只查阅了这两部书') },
  // 二 · after "为什么这些区分对哲学重要？": seven concepts, translation as a philosophical act.
  { id: 'translation-lab', code: 'CN7', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('为什么这些区分对哲学重要') },
  // 五 · after the three levels of the debate: participants, boundary cases, levels.
  { id: 'debate-workshop', code: 'CN7', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('很多参与者在这三个层次之间来回跳跃') },
  // 三 · after 「分歧的地图」: 熊、唐、牟 compared, with the basis of every cell.
  { id: 'new-confucian-comparison', code: 'CN8', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('据 SEP 的条目，牟宗三和唐君毅在情感') },
  // 四 · after 「论证、应用与政治」: the knowing cycle, three theses, three levels.
  { id: 'practice-contradiction', code: 'CN8', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('三个层次之间有联系，但不能互相代替') },
  // Images approved 2026-11-08 (content/PHASE13B_IMAGE_APPROVAL_SHEET.md).
  // 二 · after the paragraph on which of 罗什's translations became standard.
  { id: 'p2179-colophon', code: 'CN5', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('罗什的译本后来成为中国佛教最通行的版本') },
  // 六 · after "所以，本部分要做的，不是讲述……" (how the 惠能 story was formed).
  { id: 'liangkai-bamboo', code: 'CN5', section: '六、', match: (b) => b.kind === 'html' && b.text.startsWith('所以，本部分要做的，不是讲述') },
  // 六 · 「不立文字？」, after the paradox paragraph.
  { id: 'liangkai-sutra', code: 'CN5', section: '六、', match: (b) => b.kind === 'html' && b.text.startsWith('但这里有一个明显的悖论：主张"不立文字"') },
  // 二 · after the paragraph on 自無極而為太極 / 無極而太極.
  { id: 'taiji-tu', code: 'CN6', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('请注意第一句。本课所据的维基文库本') },
  // 三 · after the note on what kind of text 《朱子语类》 is.
  { id: 'zhuxi-letter', code: 'CN6', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('读《朱子语类》时要记住') },
  // 七 · after the 袁枚 evidence paragraph.
  { id: 'shiguan-page', code: 'CN6', section: '七、', match: (b) => b.kind === 'html' && b.text.startsWith('这是一条关于实际活动的证据：十三位女性聚会') },
  // 二 · after the table on why negation and affirmation differ in standing.
  { id: 'negative-theology', code: 'JW1', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('表格的最后一行最重要。肯定的描述即使谨慎') },
  // 三 · after Gersonides on creation.
  { id: 'creation-eternity', code: 'JW1', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('这个立场在犹太传统中极少见') },
  // 三 · after the table of criticisms and the note under it.
  { id: 'anselm-lab', code: 'EA1', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('（本章的整理；阿奎那和康德的批评') },
  // 四 · after the table of four positions.
  { id: 'universals-workshop', code: 'EA1', section: '四、', match: (b) => b.kind === 'html' && b.text.includes('实质的实在论') && b.text.includes('唯名论') },
  // 五 · after "Aquinas rejected Anselm's argument".
  { id: 'five-ways', code: 'EA1', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('还要注意：阿奎那拒绝了安瑟伦的论证') },
  // 二 · after "the cogito's certainty reaches only the present thinking self".
  { id: 'doubt-cogito', code: 'EA2', section: '二、', match: (b) => b.kind === 'html' && b.text.includes('的确定性，只及于现在思想着的我') },
  // 三 · after the 'vapours' paragraph (before Elisabeth's own position).
  { id: 'elisabeth-objection', code: 'EA2', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('她还指出另一类事实') },
  // V24 · EA3 三 · after the method summary table and the note under it.
  { id: 'hume-induction', code: 'EA3', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('这张表可以用在其他的怀疑论证上') },
  // V24 · EA5 四 · after "用这张表时请注意两点" (how to follow a dialectical argument).
  { id: 'dialectic-stepper', code: 'EA5', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('用这张表时请注意两点') },
  // V24 · EA6 六 · after the table comparing the five forms of critique.
  { id: 'critique-sorter', code: 'EA6', section: '六、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('批评的形式') && b.text.includes('它没有做到什么') },
  // V25 · EA7 二 · after the table of reasons the harm principle admits or excludes.
  { id: 'harm-principle', code: 'EA7', section: '二、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('限制自由的理由') && b.text.includes('伤害原则允许吗') },
  // V25 · EA8 三 · after the table of the two scopes of negation.
  { id: 'russell-scope', code: 'EA8', section: '三、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('否定的辖域窄') && b.text.includes('否定的辖域宽') },
  // V25 · EA9 三 · after the table of bad-faith scenes.
  { id: 'bad-faith-sorter', code: 'EA9', section: '三、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('只肯定了哪一面') && b.text.includes('为什么是自欺') },
  // V26 · EA10 三 · after the table of the "______ 本来可能不是 ______" test.
  { id: 'rigidity-tester', code: 'EA10', section: '三、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('本来可能不是') && b.text.includes('太阳系的行星数目') },
  // V26 · EA11 四 · after the table of the four economies.
  { id: 'distribution-chooser', code: 'EA11', section: '四、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('经济 C') && b.text.includes('处境最差的群体') },
  // V26 · EA12 四 · after the step-by-step deconstructive reading of Saussure.
  { id: 'writing-hierarchy', code: 'EA12', section: '四、', match: (b) => b.kind === 'html' && b.text.includes('文本自己确立的等级') },
  // V27 · AF1 六 · after the table of what each kind of evidence can show about the Ḥatäta.
  { id: 'source-weigh', code: 'AF1', section: '六、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('流传的途径') && b.text.includes('学者的动机与语境') },
  // V27 · AF2 五 · after the table of six approaches and the paragraph under it.
  { id: 'decolonize-compare', code: 'AF2', section: '五、', match: (b) => b.kind === 'html' && b.text.startsWith('阿皮亚和后期的洪通基没有单独列出') },
  // V27 · AF3 三 · after the reading of Cooper p. 134 (two problems, one unacknowledged factor).
  { id: 'experience-argument', code: 'AF3', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('［本章的重建］请注意这句话的结构') },
  // V28 · JP1 二 · after step four of the five-step reading (the two English renderings of 有時).
  { id: 'uji-readings', code: 'JP1', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('四、译本。') },
  // V28 · KR1 四 · after the table comparing the five positions in the Four–Seven debate.
  { id: 'four-seven-voices', code: 'KR1', section: '四、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('郑之云（天命图）') && b.text.includes('栗谷（1572）') },
  // V28 · LA1 一 · after the table setting Sepúlveda's and Las Casas' arguments side by side.
  { id: 'normative-premises', code: 'LA1', section: '一、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('共同的框架') && b.text.includes('证据的类型') },
  // V29 · A1 五 · after the table of the four kinds of objection.
  { id: 'argument-roles', code: 'A1', section: '五、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('反驳的对象') && b.text.includes('相关性') },
  // V29 · A2 二 · after the table of six forms checked by truth table.
  { id: 'validity-checker', code: 'A2', section: '二、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('假言三段论') && b.text.includes('反例行（如果无效）') },
  // V29 · A3 五 · after the table of four cases and the two principles' predictions.
  { id: 'case-dials', code: 'A3', section: '五、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('做与允许的预测') && b.text.includes('双重效果的预测') },
  // V30 · A4 四 · after the table setting 道, dharma and logos side by side.
  { id: 'translation-lens', code: 'A4', section: '四、', match: (b) => b.kind === 'html' && b.tag === 'table' && b.text.includes('译法改变了什么') && b.text.includes('一个译名会遮蔽什么') },
  // V30 · S1 二 · after the paragraph that introduces the case analyser (under the table of four theories).
  { id: 'case-analyser', code: 'S1', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('下面的组件把第一、二部分的几个案例放在一起') },
  // V30 · S2 三 · after the table of accounts of universals and the note under it.
  { id: 'universals-test', code: 'S2', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章的整理。最后一行特别说明') },
  // V31 · S3 三 · after the table of six causal cases and the note under it.
  { id: 'causation-cases', code: 'S3', section: '三、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章的整理，') && b.text.includes('下面的组件把这些案例') },
  // V31 · S4 二 · after the table of six identity cases and three criteria, and the note under it.
  { id: 'identity-cases', code: 'S4', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章根据第二部分的介绍整理的') },
  // V31 · S5 四 · after the table setting the three thought experiments side by side.
  { id: 'thought-experiment-map', code: 'S5', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章的整理。下面的组件请你逐一检查') },
  // V32 · S6 一 · after the table of six cases and two theories of names, and the paragraph under it.
  { id: 'reference-cases', code: 'S6', section: '一、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章根据第一部分的介绍整理的') },
  // V32 · S7 七 · after the table setting the frameworks side by side on 阿梅的周六, and the paragraph under it.
  { id: 'framework-case', code: 'S7', section: '七、', match: (b) => b.kind === 'html' && b.text.startsWith('这张表格还说明了一件事') },
  // V32 · S8 四 · after the table of five positions and their costs, and the paragraph under it.
  { id: 'metaethics-map', code: 'S8', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章的整理，每一行都有许多变体') },
  // V33 · S9 一 · after the table of five grounds of political obligation and the paragraph under it.
  { id: 'obligation-grounds', code: 'S9', section: '一、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章的整理，它只列出每一种理由最常见的反驳') },
  // V33 · S10 四 · after the two planets and the paragraph that compares them.
  { id: 'anomaly-case', code: 'S10', section: '四、', match: (b) => b.kind === 'html' && b.text.startsWith('两个故事用的是同一个办法') },
  // V33 · S11 二 · after the table of responses to the liar and the paragraph under it.
  { id: 'liar-responses', code: 'S11', section: '二、', match: (b) => b.kind === 'html' && b.text.startsWith('表格是本章依据条目的整理。下面的组件请你选择一种回应') },
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

import { CN1, MENCIUS_SECTION } from './cn1';
import { CN2, ETHICS_SECTION } from './cn2';
import { CN3, SKILL_SECTION } from './cn3';
import { CN4, INCENTIVE_SECTION } from './cn4';
import { CN5, AWAKENING_SECTION } from './cn5';
import { CN6, NATURE_SECTION } from './cn6';
import { CN7 } from './cn7';
import { CN8 } from './cn8';
import { EA4 } from './ea4';
import { IN1 } from './in1';
import { IN2 } from './in2';
import { IN3 } from './in3';
import { IN4 } from './in4';
import { IN5 } from './in5';
import { IN6 } from './in6';
import { IN7 } from './in7';
import { IN8 } from './in8';
import { IA1 } from './ia1';
import { IA2 } from './ia2';
import { IA3 } from './ia3';
import { IA4 } from './ia4';
import { IA5 } from './ia5';
import { GR1 } from './gr1';
import { GR2 } from './gr2';
import { GR3 } from './gr3';
import { GR4 } from './gr4';
import type { CourseText } from './course';

// Published courses: their text and their front-page facts. Facts come from
// planning/CURRICULUM_REFERENCE_DRAFT.md (method focus, background, links);
// Chinese wording is a presentation translation.

/** Tradition sections of 历史与传统 that have a readable course. */
export type Tradition = 'cn' | 'ea' | 'in' | 'gr' | 'ia';
export const TRADITION_NAME: Record<Tradition, string> = { cn: '中国哲学', ea: '欧洲与北大西洋哲学', in: '印度哲学', gr: '希腊与罗马哲学', ia: '伊斯兰、阿拉伯与犹太' };

export interface PublishedCourse {
  code: string;
  text: CourseText;
  /** Short display name used in breadcrumbs and buttons. */
  name: string;
  tier: string;
  en: string;
  method: string;
  background: string;
  /** Tradition section of 历史与传统 this course belongs to, and its place there. */
  tradition: Tradition;
  position: number;
  /** Courses that list this one as recommended background. */
  recommendFrom: string[];
  /** Courses this one leads to (curriculum “→” links). */
  leadsTo: string[];
  /** Shown when a primary-source citation is opened. */
  sourceNote: string;
  /** Short note under each quoted source, decided per citation. Default: the classical-course wording. */
  srcNote?: (cite: string) => string;
  /** Language of the original-language passages (lang attribute), decided per passage. */
  origLang?: (origHtml: string) => string;
  /** Section most relevant to the 人性与道德 question, if any. */
  topicSection?: number;
}

export const PUBLISHED: Record<string, PublishedCourse> = {
  CN1: {
    code: 'CN1',
    text: CN1,
    name: '孔子、孟子与荀子',
    tier: '● 核心',
    en: 'Confucius, Mencius, Xunzi: Cultivation, Ritual and Human Nature',
    method: '跨译本分析“仁”“礼”等厚概念；比较对立的人性理论',
    background: '无前置要求，可以直接阅读',
    tradition: 'cn',
    position: 1,
    recommendFrom: ['CN2', 'CN3', 'CN4', 'CN6'],
    leadsTo: ['CN6', 'S7', 'D4'],
    sourceNote: '原文据中文维基文库，字形保留繁体。版本与授权见附录。',
    topicSection: MENCIUS_SECTION >= 0 ? MENCIUS_SECTION : undefined,
  },
  CN2: {
    code: 'CN2',
    text: CN2,
    name: '墨家、名家与后期墨经',
    tier: '● 核心',
    en: 'Mohism, Names and the Later Mohist Canons: Argument, Language and Science',
    method: '把简短的经文当作论证来读；检验定义',
    background: '大纲建议先读「孔子、孟子与荀子」（推荐背景，不是必需）',
    tradition: 'cn',
    position: 2,
    recommendFrom: ['D3'],
    leadsTo: ['D3', 'S6'],
    sourceNote: '原文据中文维基文库，字形保留繁体。版本与授权见附录。',
    topicSection: ETHICS_SECTION >= 0 ? ETHICS_SECTION : undefined,
  },
  CN3: {
    code: 'CN3',
    text: CN3,
    name: '老子、庄子与道家传统',
    tier: '● 核心',
    en: 'Daoist Traditions: Laozi, Zhuangzi and Their Readers',
    method: '解读一部多声部、层层形成的文本；把论证和文学形式分开',
    background: '大纲建议先读「孔子、孟子与荀子」（推荐背景，不是必需）',
    tradition: 'cn',
    position: 3,
    recommendFrom: ['CN5'],
    leadsTo: ['CN5', 'D3'],
    sourceNote: '原文据中文维基文库，字形保留繁体；出土写本的释文来源见注释。版本与授权见附录。',
    topicSection: SKILL_SECTION >= 0 ? SKILL_SECTION : undefined,
  },
  CN4: {
    code: 'CN4',
    text: CN4,
    name: '法家与汉代思想',
    tier: '● 核心',
    en: 'Legalism, the Han Synthesis and Correlative Cosmology',
    method: '比较相互竞争的统治理论；评估关联式的解释',
    background: '大纲建议先读「孔子、孟子与荀子」（推荐背景，不是必需）',
    tradition: 'cn',
    position: 4,
    recommendFrom: [],
    leadsTo: ['S9', 'D5'],
    sourceNote: '原文据中文维基文库，字形保留繁体；文库整理者的校改见正文和注释。版本与授权见附录。',
    topicSection: INCENTIVE_SECTION >= 0 ? INCENTIVE_SECTION : undefined,
  },
  CN5: {
    code: 'CN5',
    text: CN5,
    name: '魏晋玄学与中国佛学',
    tier: '● 核心',
    en: 'Wei-Jin Metaphysics and Chinese Buddhism: Emptiness, Nature and Sudden Awakening',
    method: '追踪一个概念从翻译到重新建构的过程',
    background: '大纲建议先读「道家传统」和「大乘哲学：中观与瑜伽行派」（推荐背景，不是必需）',
    tradition: 'cn',
    position: 5,
    // CN6 lists this course as recommended background; JP1 as helpful.
    recommendFrom: ['CN6', 'JP1'],
    leadsTo: ['CN6', 'D10'],
    sourceNote: '原文据中文维基文库，字形保留繁体；文库文本与通行本的出入见正文和注释。版本与授权见附录。',
    topicSection: AWAKENING_SECTION >= 0 ? AWAKENING_SECTION : undefined,
  },
  CN6: {
    code: 'CN6',
    text: CN6,
    name: '宋明理学至清代',
    tier: '● 核心',
    en: 'Neo-Confucianism to Qing: Principle, Mind and Practical Learning',
    method: '在同一个问题上比较两个体系；把注释当作哲学来读',
    background: '大纲建议先读「孔子、孟子与荀子」和「魏晋玄学与中国佛学」（推荐背景，不是必需）',
    tradition: 'cn',
    position: 6,
    // CN7 and KR1 list this course as background; CN8 and JP1 as helpful.
    recommendFrom: ['CN7', 'KR1', 'CN8', 'JP1'],
    leadsTo: ['CN7'],
    sourceNote: '原文据中文维基文库，字形保留繁体；文库文本的错字与异文见正文和注释。版本与授权见附录。',
    topicSection: NATURE_SECTION >= 0 ? NATURE_SECTION : undefined,
  },
  CN7: {
    code: 'CN7',
    text: CN7,
    name: '中国哲学与现代',
    tier: '● 核心',
    en: 'Chinese Philosophy and Modernity: Late Qing Reform to the New Culture Movement',
    method: '评估对传统的重新诠释；评估关于哲学史写法的论证',
    background: '大纲建议先读「宋明理学至清代」（推荐背景，不是必需）',
    tradition: 'cn',
    position: 7,
    // CN8 lists this course as recommended background.
    recommendFrom: ['CN8'],
    leadsTo: ['CN8', 'D1', 'D6'],
    sourceNote: '近代文献据中文维基文库录文，繁体字、简化字和异体字照录；文库录文的错字见正文和注释。版本与授权见附录。',
    srcNote: (cite) => (/转引/.test(cite) ? '转引的文字，本课没有见到原文；见正文' : '据中文维基文库录文，字形照录'),
  },
  CN8: {
    code: 'CN8',
    text: CN8,
    name: '体系、马克思主义与当代中国哲学',
    tier: '○ 拓展',
    en: 'Philosophical Systems, Marxism and Contemporary Chinese Philosophy',
    method: '对照古典来源和西方来源，评估建立哲学体系的论证',
    background: '大纲建议先读「中国哲学与现代」；「宋明理学至清代」也有帮助（推荐背景，不是必需）',
    tradition: 'cn',
    position: 8,
    recommendFrom: [],
    leadsTo: ['D1', 'D6'],
    sourceNote: '毛泽东著作据中文马克思主义文库所载《毛泽东选集》本（不是1937年的讲稿）；其他文本据中文维基文库；冯友兰、金岳霖的几句话是转引，出处见注释。版本与授权见附录。',
    srcNote: (cite) =>
      /转引/.test(cite) ? '转引的文字，出处见注释' : /^毛泽东/.test(cite) ? '据中文马克思主义文库所载《毛泽东选集》本' : '据中文维基文库录文，字形照录',
  },
  EA4: {
    code: 'EA4',
    text: EA4,
    name: '康德',
    tier: '● 核心',
    en: 'Kant: Critique, Autonomy and Judgment',
    method: '沿着一部艰深文本的主导问题来阅读；通过应用来检验一条原则',
    background: '大纲建议先读「经验论、启蒙与自由主义的起源」（推荐背景，不是必需）',
    tradition: 'ea',
    position: 4,
    recommendFrom: ['EA5'],
    leadsTo: ['EA5', 'S1', 'S7'],
    sourceNote: '德文原文据普鲁士科学院版《康德全集》（AA），保留十八世纪拼写；卷页见注释。中文是本章试译。',
    origLang: () => 'de',
    topicSection: (() => {
      const i = EA4.SECTIONS.findIndex((s) => s.title.startsWith('四、道德哲学'));
      return i >= 0 ? i : undefined;
    })(),
  },
  IN1: {
    code: 'IN1',
    text: IN1,
    name: '印度哲学的起源',
    tier: '● 核心',
    en: 'Origins and Early Debates: Vedic Thought, Upaniṣads and the Śramaṇa Schools',
    method: '公平地呈现对立的立场；从对话中重构论证',
    background: '无前置要求，可以直接阅读',
    tradition: 'in',
    position: 1,
    recommendFrom: ['IN2', 'IN5', 'IN6', 'IN7', 'IN8'],
    leadsTo: ['IN2', 'IN5', 'IN6', 'IN7'],
    sourceNote: '梵文据 GRETIL 所收电子本，巴利文据 SuttaCentral 所载摩诃僧祇本；版本与权利见附录。中文是本章试译。',
    // Pāli (SuttaCentral) is written with ṁ, the GRETIL Sanskrit with ṃ.
    origLang: (html) => (html.includes('ṁ') ? 'pi' : 'sa'),
    topicSection: (() => {
      const i = IN1.SECTIONS.findIndex((s) => s.title.startsWith('三、'));
      return i >= 0 ? i : undefined;
    })(),
  },
  IN2: {
    code: 'IN2',
    text: IN2,
    name: '早期佛教与阿毗达磨',
    tier: '● 核心',
    en: 'Early Buddhism and Abhidharma: Suffering, No-Self and Dependent Origination',
    method: '检验还原分析（把人分析为部分）及其所受的反驳',
    background: '大纲建议先读「印度哲学的起源」（推荐背景，不是必需）',
    tradition: 'in',
    position: 2,
    // IN4 lists this course as its background.
    recommendFrom: ['IN4', 'IN8'],
    leadsTo: ['IN3', 'IN4', 'S4', 'D2'],
    sourceNote: '巴利文据 SuttaCentral 所载摩诃僧祇本（bilara-data），梵文据 GRETIL 所收电子本；版本与权利见附录。中文是本章试译。',
    // Pāli (SuttaCentral) is written with ṁ, the GRETIL Sanskrit with ṃ.
    origLang: (html) => (html.includes('ṁ') ? 'pi' : 'sa'),
  },
  IN3: {
    code: 'IN3',
    text: IN3,
    name: '知识、推理与辩论',
    tier: '● 核心',
    en: 'Knowledge, Inference and Debate: Nyāya, Vaiśeṣika and the Buddhist Logicians',
    method: '把推理形式化，并运用似因（谬误）理论',
    background: '大纲建议先读「什么是哲学？」，「形式推理」也有帮助；印度哲学的推荐顺序是「印度哲学的起源」→「早期佛教与阿毗达磨」→ 本课（推荐背景，不是必需）',
    tradition: 'in',
    position: 3,
    // IN5 lists this course as helpful background.
    recommendFrom: ['IN5', 'IN8'],
    leadsTo: ['S1', 'S6', 'D3'],
    sourceNote: '梵文据 GRETIL 所收电子本（陈那《集量论》第一章据 Steinkellner 2005 的复原本），汉文据 CBETA《大正藏》电子本；版本与权利见附录。中文是本章试译。',
    srcNote: (cite) => (/玄奘译/.test(cite) ? '据 CBETA《大正藏》第 32 册第 1630 号，字形照录' : '原文见注释'),
    origLang: () => 'sa',
  },
  IN4: {
    code: 'IN4',
    text: IN4,
    name: '大乘哲学',
    tier: '● 核心',
    en: 'Mahāyāna Philosophy: Madhyamaka and Yogācāra',
    method: '把辩证的否定当作论证来读，并评估所受的反驳',
    background: '大纲建议先读「早期佛教与阿毗达磨」（推荐背景，不是必需）',
    tradition: 'in',
    position: 4,
    // IN6 lists this course as helpful background (CN5 lists it too; it is shown below as a link onward).
    recommendFrom: ['IN6', 'IN8'],
    leadsTo: ['CN5', 'D2', 'D3'],
    sourceNote: '梵文据 GRETIL 所收电子本，汉文据 CBETA《大正藏》电子本（只作为历史上的翻译引用）；版本与权利见附录。中文是本章试译。',
    srcNote: (cite) =>
      /玄奘译/.test(cite)
        ? '历史上的翻译：据 CBETA《大正藏》第 31 册第 1590 号，字形照录'
        : /波罗颇蜜多罗译/.test(cite)
          ? '历史上的翻译：据 CBETA《大正藏》第 30 册第 1566 号，字形照录'
          : '原文见注释',
    origLang: () => 'sa',
  },
  IN5: {
    code: 'IN5',
    text: IN5,
    name: '权威、语言与义务',
    tier: '● 核心',
    en: 'Authority, Language and Duty: Mīmāṃsā',
    method: '追踪一场注释传统中的争论，并重构关于权威的论证',
    background: '大纲建议先读「印度哲学的起源」，「知识、推理与辩论」也有帮助（推荐背景，不是必需）',
    tradition: 'in',
    position: 5,
    // IN6 lists this course as helpful background.
    recommendFrom: ['IN6', 'IN8'],
    leadsTo: ['IN6', 'S1', 'S6'],
    sourceNote: '梵文据 GRETIL 所收电子本；第三、四部分所引未经校对的电子本已对照印本，见注释与附录。中文是本章试译。',
    origLang: () => 'sa',
  },
  IN6: {
    code: 'IN6',
    text: IN6,
    name: '梵、自我与世界',
    tier: '● 核心',
    en: 'Brahman, Self and World: Vedānta',
    method: '比较对同一个问题的三种对立回答，并通过注释来阅读原典',
    background: '大纲建议先读「印度哲学的起源」，「权威、语言与义务」和「大乘哲学」也有帮助（推荐背景，不是必需）',
    tradition: 'in',
    position: 6,
    // IN8 lists any of IN1–IN7 as background.
    recommendFrom: ['IN8'],
    leadsTo: ['S4', 'S5', 'S12'],
    sourceNote: '梵文据 GRETIL 所收电子本；商羯罗序论的四句和《梵经注》3.2.22 已对照印本，见注释与附录。中文是本章试译。',
    origLang: () => 'sa',
  },
  IN7: {
    code: 'IN7',
    text: IN7,
    name: '意识、物质与修行',
    tier: '○ 拓展',
    en: 'Consciousness, Matter and Practice: Sāṃkhya and Yoga',
    method: '评估一个二元论论证，并与笛卡尔的二元论比较',
    background: '大纲建议先读「印度哲学的起源」（推荐背景，不是必需）',
    tradition: 'in',
    position: 7,
    // IN8 lists any of IN1–IN7 as background.
    recommendFrom: ['IN8'],
    leadsTo: ['S5'],
    sourceNote: '梵文据 GRETIL 所收电子本；《梵经》2.2.3 及商羯罗注已对照印本，见注释与附录。中文是本章试译。',
    origLang: () => 'sa',
  },
  IN8: {
    code: 'IN8',
    text: IN8,
    name: '近代与殖民时期的印度哲学',
    tier: '○ 拓展',
    en: 'Modern and Colonial-Era Indian Philosophy',
    method: '评估对古典思想的近代重新解释：它在哪里忠实，在哪里创新',
    background: '大纲建议先读印度哲学的任何一门课程（IN1—IN7 中任何一门；推荐背景，不是必需）',
    tradition: 'in',
    position: 8,
    recommendFrom: [],
    leadsTo: ['D6'],
    sourceNote: '英文原文据公有领域的印本或数字本（英文维基文库、archive.org 扫描本、mkgandhi.org、古腾堡计划等），逐句核对；版本与权利见附录。中文是本章试译。',
    srcNote: () => '英文原文据公有领域的印本或数字本，逐句核对；版本见注释与附录',
    origLang: () => 'en',
  },
  GR1: {
    code: 'GR1',
    text: GR1,
    name: '古希腊哲学的起源',
    tier: '● 核心',
    en: 'Origins of Greek Philosophy: From Nature to the Examined Life',
    method: '解读残篇式的史料；从残篇中重构巴门尼德的论证',
    background: '无前置要求，可以直接阅读',
    tradition: 'gr',
    position: 1,
    recommendFrom: ['GR2'],
    leadsTo: ['GR2', 'S7'],
    sourceNote: '希腊文据希腊文维基文库、维基语录和 Perseus 数字本（Burnet、Ross 牛津本）；版本与权利见附录。中文是本章试译。',
    origLang: () => 'grc',
    // 五 · 苏格拉底: “美德即知识？” bears on the 人性与道德 question.
    topicSection: (() => {
      const i = GR1.SECTIONS.findIndex((s) => s.title.startsWith('五、'));
      return i >= 0 ? i : undefined;
    })(),
  },
  GR2: {
    code: 'GR2',
    text: GR2,
    name: '柏拉图',
    tier: '● 核心',
    en: 'Plato: Knowledge, Soul and the Just City',
    method: '从对话形式中重构论证；区分说话者、人物与作者',
    background: '大纲建议先读「古希腊哲学的起源」（推荐背景，不是必需）',
    tradition: 'gr',
    position: 2,
    recommendFrom: ['GR3'],
    leadsTo: ['S1', 'S9', 'D3'],
    sourceNote: '希腊文据 Perseus 数字本（Burnet 牛津本《柏拉图全集》；第欧根尼·拉尔修据 Hicks 本）；版本与权利见附录。中文是本章试译。',
    origLang: () => 'grc',
    // 四 · 灵魂与城邦中的正义: the three parts of the soul bear on the 人性与道德 question.
    topicSection: (() => {
      const i = GR2.SECTIONS.findIndex((s) => s.title.startsWith('四、'));
      return i >= 0 ? i : undefined;
    })(),
  },
  GR3: {
    code: 'GR3',
    text: GR3,
    name: '亚里士多德',
    tier: '● 核心',
    en: 'Aristotle: Substance, Causes, Logic and the Good Life',
    method: '掌握一套专门术语（实体、原因）；运用三段论',
    background: '大纲建议先读「柏拉图」（推荐背景，不是必需）',
    tradition: 'gr',
    position: 3,
    recommendFrom: ['GR4', 'IA1', 'IA2', 'EA1'],
    // IA1 lists this course as helpful background, IA2 as recommended.
    leadsTo: ['IA2', 'EA1', 'S7'],
    sourceNote: '希腊文据 Perseus 与 First1KGreek 数字本（Bywater、Ross、Bekker、Langkavel 诸本）；版本与权利见附录。中文是本章试译。',
    origLang: () => 'grc',
    // 六 · 德性、实践智慧与人的繁荣 bears on the 人性与道德 question.
    topicSection: (() => {
      const i = GR3.SECTIONS.findIndex((s) => s.title.startsWith('六、'));
      return i >= 0 ? i : undefined;
    })(),
  },
  GR4: {
    code: 'GR4',
    text: GR4,
    name: '希腊化与罗马哲学',
    tier: '○ 拓展',
    en: 'Hellenistic and Roman Schools: Living Philosophy',
    method: '评估"哲学治疗"的主张；分析怀疑派论式的结构',
    background: '大纲建议先读「亚里士多德」（推荐背景，不是必需）',
    tradition: 'gr',
    position: 4,
    recommendFrom: [],
    leadsTo: ['EA1', 'S1', 'D3'],
    sourceNote: '希腊文据 First1KGreek 与 Perseus 数字本（von der Mühll、Hicks、Schenkl、Leopold、Mutschmann 诸本），拉丁文据 Perseus 数字本与 Munro 本《物性论》；版本与权利见附录。中文是本章试译。',
    // Greek and Latin passages alternate. A passage is Greek when most of its
    // letters are Greek (Latin passages may quote Greek words, e.g. Gellius 7.2).
    origLang: (html) => {
      const t = html.replace(/<[^>]+>/g, '');
      const greek = (t.match(/[Ͱ-Ͽἀ-῿]/g) ?? []).length;
      const latin = (t.match(/[A-Za-z]/g) ?? []).length;
      return greek > latin ? 'grc' : 'la';
    },
    // 六 · 哲学作为治疗与生活方式 bears on the 人性与道德 question.
    topicSection: (() => {
      const i = GR4.SECTIONS.findIndex((s) => s.title.startsWith('六、'));
      return i >= 0 ? i : undefined;
    })(),
  },
  IA1: {
    code: 'IA1',
    text: IA1,
    name: '翻译运动、凯拉姆与哲学的兴起',
    tier: '● 核心',
    en: 'Translation, Kalām and the Rise of Falsafa',
    method: '重构支持和反对同一个论题（世界是永恒的）的成对论证',
    background: '大纲认为「亚里士多德」有帮助（推荐背景，不是必需）',
    tradition: 'ia',
    position: 1,
    recommendFrom: ['IA2'],
    leadsTo: ['IA2'],
    sourceNote: '《古兰经》经文据 Tanzil 项目（tanzil.net）的简明本（quran-simple），逐字照录，按其 CC BY 3.0 条件注明来源、不作改动；其他阿拉伯文作者一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '经文据 Tanzil 项目（tanzil.net）简明本，逐字照录',
    origLang: () => 'ar',
  },
  IA2: {
    code: 'IA2',
    text: IA2,
    name: '法拉比与阿维森纳',
    tier: '● 核心',
    en: 'Al-Fārābī and Avicenna: The Systematic Philosophy of Being and Soul',
    method: '重构一个形而上学证明（必然存在者）和一个思想实验（飞人）',
    background: '大纲建议先读「翻译运动、凯拉姆与哲学的兴起」和「亚里士多德」（推荐背景，不是必需）',
    tradition: 'ia',
    position: 2,
    // IA3 depends on this course (intellectual dependency, not a lock); IA4 lists it
    // as its background. EA1 lists it only as helpful and belongs to another
    // tradition, so it is shown as a 后续 link.
    recommendFrom: ['IA3', 'IA4'],
    leadsTo: ['IA3', 'EA1'],
    sourceNote: '阿拉伯文据 Forget 1892 年校订本《指要与诠解》（公有领域）的扫描页面逐字录出；其他著作一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据 Forget 1892 年校订本扫描页面逐字录出',
    origLang: () => 'ar',
  },
  IA3: {
    code: 'IA3',
    text: IA3,
    name: '安萨里、阿威罗伊与西方伊斯兰思想',
    tier: '● 核心',
    en: 'Ghazālī, Averroes and Western Islamic Thought: Causation, Reason and Society',
    method: '评价围绕同一个例子（火与棉花）的双方交锋',
    background: '大纲建议先读「法拉比与阿维森纳」：安萨里批评的主要是阿维森纳的立场（推荐背景，不是必需）',
    tradition: 'ia',
    position: 3,
    // IA5 lists this course as recommended background.
    recommendFrom: ['IA5'],
    // The curriculum's → links, after the recommended chain (IA3 → IA4); this
    // course is also listed as helpful before JW1.
    leadsTo: ['IA4', 'EA1', 'S2', 'S3', 'D3', 'JW1'],
    sourceNote: '阿拉伯文据安萨里《哲学家的矛盾》开罗 1302 年本、阿威罗伊《矛盾的矛盾》Bouyges 1930 年本、《决断论》Müller 1859 年本和伊本·赫勒敦《历史绪论》Quatremère 1858 年本的扫描页面逐字录出，只引短句；其他著作一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据扫描页面逐字录出',
    origLang: () => 'ar',
  },
  IA4: {
    code: 'IA4',
    text: IA4,
    name: '照明学派、苏非形而上学与后古典诸派',
    tier: '○ 拓展',
    en: 'Illumination, Sufi Metaphysics and the Post-Classical Schools',
    method: '对认识的种类作概念分析（在场的知识）',
    background: '大纲建议先读「法拉比与阿维森纳」（推荐背景，不是必需）',
    tradition: 'ia',
    position: 4,
    recommendFrom: [],
    // The curriculum's → link, after the recommended chain (IA4 → IA5).
    leadsTo: ['IA5', 'D3'],
    sourceNote: '波斯文据 Nicholson 1925 年校订本《玛斯纳维》第一卷的扫描页面逐字录出（只录鲁米的原诗，不含 Nicholson 的译文和注释）；苏赫拉瓦迪、伊本·阿拉比、穆拉·萨德拉等人的著作一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据 Nicholson 1925 年本扫描页面逐字录出',
    // The only original-language passages are Rūmī's Persian verses.
    origLang: () => 'fa',
  },
  IA5: {
    code: 'IA5',
    text: IA5,
    name: '近现代伊斯兰与阿拉伯思想',
    tier: '○ 拓展',
    en: 'Modern Islamic and Arabic Thought',
    method: '评价以古典资源为基础的现代论证',
    background: '大纲建议先读「安萨里、阿威罗伊与西方伊斯兰思想」（推荐背景，不是必需）',
    tradition: 'ia',
    position: 5,
    recommendFrom: [],
    leadsTo: ['D6'],
    sourceNote: '阿拉伯文据阿布笃《认主独一论》开罗 1906 年本的扫描页面逐字录出；英文据伊克巴尔《伊斯兰宗教思想的重建》1934 年牛津版的扫描页面逐字录出，只引短句，依据是引用而不是公有领域；其他现代著作一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据扫描页面逐字录出',
    // ʿAbduh's Arabic and Iqbal's English alternate.
    origLang: (html) => (/[؀-ۿ]/.test(html) ? 'ar' : 'en'),
  },
};

export const isPublished = (code: string) => code in PUBLISHED;
export const published = (code: string): PublishedCourse | undefined => PUBLISHED[code];
export const PUBLISHED_CODES = Object.keys(PUBLISHED);

import { CN1, MENCIUS_SECTION } from './cn1';
import { CN2, ETHICS_SECTION } from './cn2';
import { CN3, SKILL_SECTION } from './cn3';
import { CN4, INCENTIVE_SECTION } from './cn4';
import { EA4 } from './ea4';
import { IN1 } from './in1';
import { GR1 } from './gr1';
import { GR2 } from './gr2';
import { GR3 } from './gr3';
import { GR4 } from './gr4';
import type { CourseText } from './course';

// Published courses: their text and their front-page facts. Facts come from
// planning/CURRICULUM_REFERENCE_DRAFT.md (method focus, background, links);
// Chinese wording is a presentation translation.

/** Tradition sections of 历史与传统 that have a readable course. */
export type Tradition = 'cn' | 'ea' | 'in' | 'gr';
export const TRADITION_NAME: Record<Tradition, string> = { cn: '中国哲学', ea: '欧洲与北大西洋哲学', in: '印度哲学', gr: '希腊与罗马哲学' };

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
    recommendFrom: ['CN2', 'CN3', 'CN4'],
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
    recommendFrom: ['IN2', 'IN5', 'IN6', 'IN7'],
    leadsTo: ['IN2', 'IN5', 'IN6', 'IN7'],
    sourceNote: '梵文据 GRETIL 所收电子本，巴利文据 SuttaCentral 所载摩诃僧祇本；版本与权利见附录。中文是本章试译。',
    // Pāli (SuttaCentral) is written with ṁ, the GRETIL Sanskrit with ṃ.
    origLang: (html) => (html.includes('ṁ') ? 'pi' : 'sa'),
    topicSection: (() => {
      const i = IN1.SECTIONS.findIndex((s) => s.title.startsWith('三、'));
      return i >= 0 ? i : undefined;
    })(),
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
    recommendFrom: ['GR4', 'IA2', 'EA1'],
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
};

export const isPublished = (code: string) => code in PUBLISHED;
export const published = (code: string): PublishedCourse | undefined => PUBLISHED[code];
export const PUBLISHED_CODES = Object.keys(PUBLISHED);

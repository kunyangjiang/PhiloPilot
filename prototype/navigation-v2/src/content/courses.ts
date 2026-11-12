import { CN1, MENCIUS_SECTION } from './cn1';
import { CN2, ETHICS_SECTION } from './cn2';
import { CN3, SKILL_SECTION } from './cn3';
import { CN4, INCENTIVE_SECTION } from './cn4';
import { CN5, AWAKENING_SECTION } from './cn5';
import { CN6, NATURE_SECTION } from './cn6';
import { CN7 } from './cn7';
import { CN8 } from './cn8';
import { EA1 } from './ea1';
import { EA2 } from './ea2';
import { EA3 } from './ea3';
import { EA4 } from './ea4';
import { EA5 } from './ea5';
import { EA6 } from './ea6';
import { EA7 } from './ea7';
import { EA8 } from './ea8';
import { EA9 } from './ea9';
import { EA10 } from './ea10';
import { EA11 } from './ea11';
import { EA12 } from './ea12';
import { AF1 } from './af1';
import { AF2 } from './af2';
import { AF3 } from './af3';
import { JP1 } from './jp1';
import { KR1 } from './kr1';
import { LA1 } from './la1';
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
import { JW1 } from './jw1';
import { A1 } from './a1';
import { A2 } from './a2';
import { A3 } from './a3';
import { A4 } from './a4';
import { S1 } from './s1';
import { S2 } from './s2';
import { S3 } from './s3';
import { S4 } from './s4';
import { S5 } from './s5';
import type { CourseText } from './course';

// Published courses: their text and their front-page facts. Facts come from
// planning/CURRICULUM_REFERENCE_DRAFT.md (method focus, background, links);
// Chinese wording is a presentation translation.

/** Tradition sections of 历史与传统 that have a readable course, plus 'fm':
 *  the Foundations and Methods courses (domain A), which belong to the 哲学方法
 *  region rather than to a tradition section, and 'sys': the systematic
 *  courses (domain C), which belong to the 哲学问题 entrance (see canonicalOf
 *  in ui/nav.ts). */
export type Tradition = 'cn' | 'ea' | 'in' | 'gr' | 'ia' | 'af' | 'jp' | 'kr' | 'la' | 'fm' | 'sys';
export const TRADITION_NAME: Record<Tradition, string> = { cn: '中国哲学', ea: '欧洲与北大西洋哲学', in: '印度哲学', gr: '希腊与罗马哲学', ia: '伊斯兰、阿拉伯与犹太', af: '非洲与非洲裔哲学', jp: '日本哲学', kr: '韩国哲学', la: '拉丁美洲哲学', fm: '哲学方法', sys: '哲学问题' };

export interface PublishedCourse {
  code: string;
  text: CourseText;
  /** Short display name used in breadcrumbs and buttons. */
  name: string;
  tier: string;
  en: string;
  method: string;
  background: string;
  /** Tradition section of 历史与传统 this course belongs to (or 'fm' for a methods course), and its place there. */
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
  EA1: {
    code: 'EA1',
    text: EA1,
    name: '从古代晚期到经院哲学',
    tier: '● 核心',
    en: 'From Late Antiquity to Scholasticism',
    method: '跟随一个神学—哲学的论证；区分一个词的不同意义（共相）',
    background: '大纲建议先读「亚里士多德」；「希腊化与罗马哲学」（斯多亚派与新柏拉图主义的背景）和「法拉比与阿维森纳」「安萨里、阿威罗伊与西方伊斯兰思想」（阿拉伯的来源）有帮助（推荐背景，不是必需）',
    tradition: 'ea',
    position: 1,
    // EA2 lists this course as recommended background.
    recommendFrom: ['EA2'],
    leadsTo: ['EA2'],
    sourceNote: '拉丁文据十九世纪公有领域印本的扫描本逐字核对（《忏悔录》von Raumer 1876 年本、《哲学的慰藉》Peiper 1871 年本、《宣讲》Migne《拉丁教父集》第 158 卷、《神学大全》1880 年巴黎本，以及《拉丁教父集》第 122、197、178 卷所收的爱留根纳、希尔德加德、爱洛依丝和 Denifle 编《巴黎大学文献集》第一卷），只引短段；其他著作一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域印本的扫描本逐字核对',
    origLang: () => 'la',
  },
  EA2: {
    code: 'EA2',
    text: EA2,
    name: '近代早期理性主义与新科学',
    tier: '● 核心',
    en: 'Early Modern Rationalism and the New Science',
    method: '逐步重建一篇沉思；评估对它的反驳',
    background: '大纲建议先读「从古代晚期到经院哲学」（推荐背景，不是必需）',
    tradition: 'ea',
    position: 2,
    // EA3 lists this course as recommended background.
    recommendFrom: ['EA3'],
    leadsTo: ['EA3'],
    sourceNote: '拉丁文和法文据 Adam 与 Tannery 编《笛卡尔全集》、van Vloten 与 Land 编《斯宾诺莎著作集》、Gerhardt 编《莱布尼茨哲学著作集》、Brunschvicg 编帕斯卡《思想录》的扫描本逐字核对，保留初版拼写，只引短段；卡文迪什和康韦一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域印本的扫描本逐字核对，保留原拼写',
    // Latin (Descartes, Spinoza) and French (Elisabeth, Leibniz) alternate.
    origLang: (html) => (/[éèêàùç]|\b(?:qu|n|l|d|c)['’]/i.test(html.replace(/<[^>]+>/g, '')) ? 'fr' : 'la'),
  },
  EA3: {
    code: 'EA3',
    text: EA3,
    name: '经验论、启蒙与自由主义的起源',
    tier: '● 核心',
    en: 'Empiricism, Enlightenment and the Origins of Liberalism',
    method: '分析一个怀疑论证的结构（归纳问题）',
    background: '大纲建议先读「近代早期理性主义与新科学」（推荐背景，不是必需）',
    tradition: 'ea',
    position: 3,
    // EA4 lists this course as recommended background; EA7, EA11 and LA1 do too.
    recommendFrom: ['EA4', 'EA7', 'EA11', 'LA1'],
    // Curriculum: EA3 → EA4 (course entry) and EA3 → EA7 (recommended path chains).
    leadsTo: ['EA4', 'EA7'],
    sourceNote:
      '英文、拉丁文和法文据公有领域印本的扫描本逐字核对（培根《新工具》Fowler 1878 年本、霍布斯《利维坦》1909 年重印本、洛克《人类理智论》1753 年本和《政府论》1764 年本、贝克莱《人类知识原理》Krauth 1874 年本、休谟 Selby-Bigge 1902 年本和 Green 与 Grose 本、孟德斯鸠 1849 年本、卢梭 1791 年本、阿斯特尔 1706 年本、夏特莱 1740 年本、沃斯通克拉夫特 1796 年本），保留原拼写，只引短段；伏尔泰一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域印本的扫描本逐字核对，保留原拼写',
    // English throughout, except Bacon (Latin) and Montesquieu, Rousseau, du Châtelet (French).
    origLang: (html) => {
      const t = html.replace(/<[^>]+>/g, '');
      if (/[éèêàùçô]|\b(?:qu|n|l|d|c|s)['’]/i.test(t)) return 'fr';
      if (/\b(?:et|est|quae|naturae|tantum|vero)\b/.test(t)) return 'la';
      return 'en';
    },
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
  EA5: {
    code: 'EA5',
    text: EA5,
    name: '德国观念论与浪漫主义',
    tier: '● 核心',
    en: 'German Idealism and Romanticism',
    method: '跟随一个辩证的论证；评估对一个体系的批评',
    background: '大纲建议先读「康德」（推荐背景，不是必需；观念论者回应的正是康德留下的问题）',
    tradition: 'ea',
    position: 5,
    // EA6 lists this course as recommended background.
    recommendFrom: ['EA6'],
    leadsTo: ['EA6', 'EA12'],
    sourceNote:
      '德文据公有领域印本的扫描本逐字核对（《费希特全集》1845 年本、《谢林全集》1857 年本、黑格尔《逻辑学》1812 年初版和 Lasson 编《精神现象学》《法哲学原理》《世界历史哲学讲演录》、施莱尔马赫《论宗教》1799 年初版），保留原拼写，只引短段；君特罗德据开放获取的研究论文转引，施莱格尔一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域印本的扫描本逐字核对，保留原拼写',
    origLang: () => 'de',
  },
  EA6: {
    code: 'EA6',
    text: EA6,
    name: '黑格尔之后：马克思、克尔凯郭尔、叔本华与尼采',
    tier: '● 核心',
    en: 'After Hegel: Marx, Kierkegaard, Schopenhauer and Nietzsche',
    method: '在谱系学和意识形态批判的论证中，区分"批评"与"驳倒"',
    background: '大纲建议先读「德国观念论与浪漫主义」（推荐背景，不是必需；马克思和克尔凯郭尔都从黑格尔出发）',
    tradition: 'ea',
    position: 6,
    // EA9 lists this course as recommended background; EA12 too.
    recommendFrom: ['EA9', 'EA12'],
    leadsTo: ['EA9', 'EA12'],
    sourceNote:
      '德文和丹麦文据公有领域印本的扫描本逐字核对（费尔巴哈《基督教的本质》1883 年本、恩格斯《路德维希·费尔巴哈》1888 年本所附《提纲》、《资本论》第一卷 1883 年第三版、克尔凯郭尔《全集》第一版、叔本华《作为意志和表象的世界》1844 年第二版、尼采《道德的谱系》1887 年初版），保留原拼写，只引短段；《1844 年手稿》、1859 年序言和《共产党宣言》一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域印本的扫描本逐字核对，保留原拼写',
    // German, except the Kierkegaard passages (Danish).
    origLang: (html) => (/[æøåÆØÅ]|\b(?:og|Aand|Ethiske|Inderligheds|Mennesket|Angest)\b/.test(html.replace(/<[^>]+>/g, '')) ? 'da' : 'de'),
  },
  EA7: {
    code: 'EA7',
    text: EA7,
    name: '自由主义、功利主义与实用主义',
    tier: '○ 拓展',
    en: 'Liberalism, Utilitarianism and Pragmatism',
    method: '把相互竞争的价值标准用到具体的案例上；检验一种意义理论',
    background: '大纲建议先读「经验论、启蒙与自由主义的起源」（推荐背景，不是必需；本章会回到休谟的“是与应当”、洛克的同意和沃斯通克拉夫特论教育）',
    tradition: 'ea',
    position: 7,
    // EA11 lists this course (with EA3) as recommended background.
    recommendFrom: ['EA11'],
    leadsTo: ['S7', 'S9'],
    sourceNote:
      '英文据公有领域印本的扫描本逐字核对（边沁《道德与立法原理导论》1879 年重印本、密尔《论自由》1859 年初版、《功利主义》1863 年初版和《妇女的屈从地位》1869 年初版、泰勒·密尔《妇女的选举权》1859 年本、西季威克《伦理学方法》第七版、皮尔士 1877—1878 年和 1905 年的期刊原刊、詹姆士《实用主义》1907 年本、杜威《我们怎样思维》1910 年初版和《民主主义与教育》1916 年初版、亚当斯《民主与社会伦理》1902 年初版、杜波依斯《黑人的灵魂》1903 年初版），保留原拼写，只引短段；杜威《逻辑：探究的理论》和《公众及其问题》一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域印本的扫描本逐字核对，保留原拼写',
    origLang: () => 'en',
  },
  EA8: {
    code: 'EA8',
    text: EA8,
    name: '逻辑、语言与分析哲学的兴起',
    tier: '● 核心',
    en: 'Logic, Language and the Rise of Analytic Philosophy',
    method: '对语言作逻辑分析；检验所提出的意义标准',
    background: '无前置要求，可以直接阅读；大纲认为拓展课程「形式推理：命题逻辑与谓词逻辑」会有帮助（不是必需；本章自己逐步引入所需的符号）',
    tradition: 'ea',
    position: 8,
    // EA10 lists this course as recommended background.
    recommendFrom: ['EA10'],
    leadsTo: ['EA10', 'S6'],
    sourceNote:
      '德文和英文据公有领域印本的扫描本逐字核对（弗雷格《算术基础》1884 年初版和《论涵义与指称》1892 年原刊、罗素《论指称》1905 年原刊、维特根斯坦《逻辑哲学论》1922 年德英对照本的德文），保留原正字法，只引短段；《哲学研究》、卡尔纳普、艾耶尔、赖尔、奥斯汀、斯特劳森和克里普克一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域印本的扫描本逐字核对，保留原正字法',
    // German (Frege, Tractatus), except the Russell passages (English).
    origLang: (html) => (/[äöüßÄÖÜ„]|\b(?:und|der|die|das|ist|nicht|wir|ein|eine|es)\b/.test(html.replace(/<[^>]+>/g, '')) ? 'de' : 'en'),
  },
  EA9: {
    code: 'EA9',
    text: EA9,
    name: '现象学、存在主义与诠释学',
    tier: '● 核心',
    en: 'Phenomenology, Existentialism and Hermeneutics',
    method: '现象学的描述；解释一部艰深的文本',
    background: '大纲建议先读「黑格尔之后：马克思、克尔凯郭尔、叔本华与尼采」（推荐背景，不是必需；海德格尔对焦虑和沉沦的说明借用了克尔凯郭尔）',
    tradition: 'ea',
    position: 9,
    // EA12 lists this course (with EA6) as recommended background; AF3 calls it helpful.
    recommendFrom: ['EA12', 'AF3'],
    leadsTo: ['S5', 'D6'],
    sourceNote:
      '德文据公有领域印本的扫描本逐字核对（胡塞尔《逻辑研究》第二卷 1901 年初版、《观念》第一卷 1913 年原刊），保留原正字法，只引短段；海德格尔、萨特、波伏瓦、梅洛-庞蒂、伽达默尔、阿伦特和法农的著作仍受版权保护，一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域印本的扫描本逐字核对，保留原正字法',
    origLang: () => 'de',
  },
  EA10: {
    code: 'EA10',
    text: EA10,
    name: '1950 年后的分析哲学：自然主义、意义与模态',
    tier: '● 核心',
    en: 'Analytic Philosophy After 1950: Naturalism, Meaning and Modality',
    method: '用平实的话重述技术性的论证；评估思想实验',
    background: '大纲建议先读「逻辑、语言与分析哲学的兴起」（推荐背景，不是必需；蒯因、克里普克和戴维森都从弗雷格、罗素和卡尔纳普留下的问题出发）',
    tradition: 'ea',
    position: 10,
    // No published course lists this one as recommended background (EA11: "EA10 not needed").
    recommendFrom: [],
    leadsTo: ['S2', 'S5', 'S6', 'S10'],
    sourceNote:
      '本章所读的哲学家的著作都仍受版权保护，一律依据《斯坦福哲学百科全书》的条目转述，不引原文段落；条目中引用的短语只作为条目的引用标出。出处见注释和附录。',
    srcNote: () => '依据《斯坦福哲学百科全书》的条目转述',
  },
  EA11: {
    code: 'EA11',
    text: EA11,
    name: '1950 年后的道德与政治哲学',
    tier: '○ 拓展',
    en: 'Moral and Political Philosophy After 1950: Anscombe to Rawls',
    method: '用反驳检验一种理论；把理论用到案例上',
    background: '大纲建议先读「经验论、启蒙与自由主义的起源」和「自由主义、功利主义与实用主义」（推荐背景，不是必需）；不需要先读「1950 年后的分析哲学」',
    tradition: 'ea',
    position: 11,
    recommendFrom: [],
    leadsTo: ['S7', 'S8', 'S9'],
    sourceNote:
      '本章所读的哲学家的著作都仍受版权保护，一律依据《斯坦福哲学百科全书》和《互联网哲学百科全书》的条目转述，不引原文段落；条目中引用的短语只作为条目的引用标出。出处见注释和附录。',
    srcNote: () => '依据哲学百科全书的条目转述',
  },
  EA12: {
    code: 'EA12',
    text: EA12,
    name: '批判理论、结构主义、后结构主义与女性主义理论',
    tier: '○ 拓展',
    en: 'Critical Theory, Structuralism, Post-structuralism and Feminist Theory',
    method: '评估对知识和权力的批判；比较相互竞争的读法',
    background: '大纲建议先读「黑格尔之后：马克思、克尔凯郭尔、叔本华与尼采」和「现象学、存在主义与诠释学」（推荐背景，不是必需）',
    tradition: 'ea',
    position: 12,
    recommendFrom: [],
    leadsTo: ['D6'],
    sourceNote:
      '法文据法语维基文库所录索绪尔《普通语言学教程》1971 年 Payot 本逐字核对，只引短段，页码依录入本的标注；霍克海默、阿多诺、马尔库塞、福柯、德里达、德勒兹、伊利格瑞、克里斯蒂娃、巴特勒、哈拉维和哈贝马斯的著作仍受版权保护，一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据法语维基文库所录 1971 年 Payot 本逐字核对',
    // Only Saussure is quoted in the original (French).
    origLang: () => 'fr',
  },
  AF1: {
    code: 'AF1',
    text: AF1,
    name: '非洲哲学思想：来源、争论与方法',
    tier: '● 核心',
    en: 'African Philosophical Thought: Sources, Debates and Methods',
    method: '来源批判：衡量口头的、书面的和有争议的来源',
    background: '无前置要求，可以直接阅读',
    tradition: 'af',
    position: 1,
    // AF2 lists this course as its background.
    recommendFrom: ['AF2'],
    leadsTo: ['AF2', 'S4', 'D2'],
    sourceNote:
      '本章所读的二十世纪和当代非洲哲学家的著作都仍受版权保护，一律依据《斯坦福哲学百科全书》和《互联网哲学百科全书》的条目转述；《寻找扎拉·雅各布》（CC BY 4.0）的文字注明出处。古埃及文献和《探究》的原文本章没有阅读，不引原文段落。出处见注释和附录。',
    srcNote: () => '依据哲学百科全书的条目转述',
  },
  AF2: {
    code: 'AF2',
    text: AF2,
    name: '后殖民与当代非洲哲学',
    tier: '○ 拓展',
    en: 'Postcolonial and Contemporary African Philosophy',
    method: '评估关于概念及其去殖民化的论证',
    background: '大纲建议先读「非洲哲学思想：来源、争论与方法」（推荐背景，不是必需）',
    tradition: 'af',
    position: 2,
    // No published course lists this one as recommended background.
    recommendFrom: [],
    leadsTo: ['D6'],
    sourceNote:
      '本章所读的哲学家的著作都仍受版权保护，一律依据《斯坦福哲学百科全书》和《互联网哲学百科全书》的条目转述，不引原文段落；条目中引用的短语只作为条目的引用标出。出处见注释和附录。',
    srcNote: () => '依据哲学百科全书的条目转述',
  },
  AF3: {
    code: 'AF3',
    text: AF3,
    name: '非洲裔与黑色大西洋哲学',
    tier: '◐ 核心选修',
    en: 'Africana and Black Atlantic Philosophy',
    method: '把关于生活经验的陈述当作哲学论证来读',
    background: '无前置要求；大纲认为「现象学、存在主义与诠释学」有帮助（推荐背景，不是必需）',
    tradition: 'af',
    position: 3,
    // No published course lists this one as recommended background.
    recommendFrom: [],
    leadsTo: ['D6'],
    sourceNote:
      '英文据公有领域的十九世纪印本逐字核对（道格拉斯《自述》1845 年波士顿本、库珀《来自南方的声音》1892 年本、杜波依斯《种族的保存》1897 年本和《黑人的灵魂》1903 年第二版），页码依原书；法农、戈登、戴维斯、洛德、胡克斯和克伦肖等人的著作仍受版权保护，一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域印本逐字核对，页码依原书',
    // Only the nineteenth-century English texts are quoted in the original.
    origLang: () => 'en',
  },
  JP1: {
    code: 'JP1',
    text: JP1,
    name: '日本哲学：佛教思想、江户儒学与京都学派',
    tier: '◐ 核心选修',
    en: 'Japanese Philosophy: Buddhist Thought, Neo-Confucian Edo and the Kyoto School',
    method: '解读翻译过来的术语；把一篇难读的禅宗文本当作论证来读',
    background: '大纲认为「魏晋玄学与中国佛学」和「宋明理学至清代」有帮助（推荐背景，不是必需）',
    tradition: 'jp',
    position: 1,
    // No published course lists this one as recommended background.
    recommendFrom: [],
    leadsTo: ['S7', 'D3'],
    sourceNote:
      '日文据公有领域的文本：《歎異抄》据真宗大谷派《真宗圣典》的文字，道元《正法眼藏·有时》据学术论文所引的文字，西田《善的研究》据青空文库本（底本为岩波文库 1950 年本）；二十世纪仍受版权保护的著作一律依据《斯坦福哲学百科全书》的条目转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域文本，来源见注释',
    // Japanese passages, except the classical Chinese verse Dōgen quotes.
    origLang: (html) => (/[぀-ヿ]/.test(html.replace(/<[^>]+>/g, '').replace(/（[^）]*）/g, '')) ? 'ja' : 'zh-Hant'),
  },
  KR1: {
    code: 'KR1',
    text: KR1,
    name: '韩国哲学：佛教、理学论争与现代',
    tier: '◐ 核心选修',
    en: 'Korean Philosophy: Buddhism, Neo-Confucian Debates and Modernity',
    method: '跟随一场精细的技术性论争（四端七情），比较各方立场',
    background: '大纲建议先读「宋明理学至清代」（推荐背景，不是必需）',
    tradition: 'kr',
    position: 1,
    // No published course lists this one as recommended background.
    recommendFrom: [],
    leadsTo: [],
    sourceNote:
      '汉文原文据中文维基文库的录文（元晓、义湘据《大正新修大藏经》本，退溪、栗谷据文集刊本），字形保留繁体，没有对照韩国古典翻译院的标点本核对；近现代著作一律依据《斯坦福哲学百科全书》的条目转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据中文维基文库录文，字形保留繁体',
    // All original passages are classical Chinese (hanmun).
    origLang: () => 'zh-Hant',
  },
  LA1: {
    code: 'LA1',
    text: LA1,
    name: '拉丁美洲哲学：征服、独立与解放',
    tier: '◐ 核心选修',
    en: 'Latin American Philosophy: Conquest, Independence and Liberation',
    method: '在历史语境中评价关于权利与解放的规范论证',
    background: '大纲建议先读「经验论、启蒙与自由主义的起源」（推荐背景，不是必需）',
    tradition: 'la',
    position: 1,
    // No published course lists this one as recommended background.
    recommendFrom: [],
    leadsTo: ['D6'],
    sourceNote:
      '西班牙文据西班牙文维基文库的录文（索尔·胡安娜、玻利瓦尔、马蒂、巴雷达、马里亚特吉），都是公有领域的文本，没有对照校勘本核对；拉丁文和葡萄牙文著作以及二十世纪仍受版权保护的著作，一律依据《斯坦福哲学百科全书》和《互联网哲学百科全书》的条目转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据西班牙文维基文库录文',
    // All original passages are Spanish (a Latin phrase inside one is part of the Spanish text).
    origLang: () => 'es',
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
  JW1: {
    code: 'JW1',
    text: JW1,
    name: '犹太哲学：从萨阿迪亚到列维纳斯',
    tier: '◐ 核心选修',
    en: 'Jewish Philosophy: Saadia to Levinas',
    method: '阅读否定神学；比较对同一个问题的不同回答',
    background: '大纲认为「安萨里、阿威罗伊与西方伊斯兰思想」和「从古代晚期到经院哲学」有帮助（推荐背景，不是必需）',
    tradition: 'ia',
    position: 6,
    recommendFrom: [],
    leadsTo: ['S12'],
    sourceNote: '犹太—阿拉伯文据 Munk 1856 年巴黎本《迷途指津》的页面图像逐字录出；拉丁文据 van Vloten 与 Land 1895 年本《神学政治论》、德文据 1783 年柏林初版《耶路撒冷》的扫描本逐字核对，只引短段；《创造之书》和《光辉之书》各一句据 Sefaria 的数字文本；其他著作一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: () => '据公有领域印本的扫描本逐字核对',
    // Maimonides' Judeo-Arabic (Hebrew script), Spinoza's Latin and Mendelssohn's German.
    origLang: (html) => {
      const t = html.replace(/<[^>]+>/g, '');
      if (/[\u0590-\u05FF]/.test(t)) return 'jrb';
      return /[äöüß]|\b(?:und|der|die|das|nicht|ist)\b/.test(t) ? 'de' : 'la';
    },
  },
  // ── Foundations and Methods (domain A): listed in the 哲学方法 region. ──
  A1: {
    code: 'A1',
    text: A1,
    name: '什么是哲学？问题、论证与阅读',
    tier: '● 核心',
    en: 'What Is Philosophy? Questions, Arguments and Reading',
    method: '找出文本所回答的问题，重建并评价论证',
    background: '无前置要求',
    tradition: 'fm',
    position: 1,
    // A2, A3, A4 and S1 name this course as recommended background, and so does IN3.
    recommendFrom: ['A2', 'A3', 'A4', 'S1', 'IN3'],
    leadsTo: ['A2', 'A3', 'A4'],
    sourceNote: '希腊文据 Perseus 数字图书馆所收 Burnet 校本（CC BY-SA 4.0），《孟子》《墨子》据中文维基文库录文，梵文据 GRETIL 电子本；只引短段，所引段落都与本网站相关课程所用的文本相同。版本与权利见附录。中文是本章试译。',
    srcNote: srcNoteA,
    origLang: origLangA,
  },
  A2: {
    code: 'A2',
    text: A2,
    name: '形式推理：命题逻辑与谓词逻辑',
    tier: '○ 拓展',
    en: 'Formal Reasoning: Propositional and Predicate Logic',
    method: '把论证译成符号，用真值表和自然演绎检验有效性',
    background: '大纲建议先读「什么是哲学？问题、论证与阅读」（推荐背景，不是必需）',
    tradition: 'fm',
    position: 2,
    // EA8 names this course as helpful background, and so does IN3.
    recommendFrom: ['EA8', 'IN3'],
    leadsTo: ['S11', 'S6'],
    sourceNote: '本章的原文只有《墨子·小取》的两小段，据中文维基文库录文。真值表、规则和证明都是本章编写并逐行核对的。版本与权利见附录。中文是本章试译。',
    srcNote: srcNoteA,
    origLang: origLangA,
  },
  A3: {
    code: 'A3',
    text: A3,
    name: '概念、案例与思想实验',
    tier: '● 核心',
    en: 'Concepts, Cases and Thought Experiments',
    method: '用反例和变换案例检验关于概念的主张，并反思直觉的可靠性',
    background: '大纲建议先读「什么是哲学？问题、论证与阅读」（推荐背景，不是必需）',
    tradition: 'fm',
    position: 3,
    // S2 names this course as recommended background.
    recommendFrom: ['S2'],
    // Curriculum: "Feeds S2, S4, S7". S2 is listed once, under recommendFrom.
    leadsTo: ['S2', 'S4', 'S7'],
    sourceNote: '希腊文据 Perseus 数字图书馆所收 Burnet 校本（CC BY-SA 4.0），《庄子》与《老子、庄子与道家传统》所用的录文相同，《哲学研究》§66 的两句德文据 wittgensteinproject.org 录文；当代案例一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: srcNoteA,
    origLang: origLangA,
  },
  A4: {
    code: 'A4',
    text: A4,
    name: '诠释、翻译与哲学写作',
    tier: '○ 拓展',
    en: 'Interpretation, Translation and Philosophical Writing',
    method: '比较同一段文字的几种译法和注释读法，并把一种理解写成结构完整的论证',
    background: '大纲建议先读「什么是哲学？问题、论证与阅读」（推荐背景，不是必需）',
    tradition: 'fm',
    position: 4,
    // No published course lists this one as recommended background yet (D1 and D11 will).
    recommendFrom: [],
    leadsTo: ['D1', 'D11'],
    sourceNote: '《老子》第一章（王弼本、帛书甲本、河上公章句、王弼注）和《庄子·秋水》与《老子、庄子与道家传统》所用的录文相同；赫拉克利特 B1 与《古希腊哲学的起源》相同；《弥曼差经》1.1.2 与《权威、语言与义务》相同；《约翰福音》1:1 据中文维基文库所收和合本。其余文本一律转述。版本与权利见附录。中文是本章试译。',
    srcNote: srcNoteA,
    origLang: origLangA,
  },
  // ── Systematic courses (domain C): listed under the 哲学问题 entrance. ──
  S1: {
    code: 'S1',
    text: S1,
    name: '知识与怀疑',
    tier: '● 核心',
    en: 'Knowledge and Skepticism',
    method: '评价怀疑论的论证和关于辩护的理论',
    background: '大纲建议先读「什么是哲学？问题、论证与阅读」（推荐背景，不是必需）',
    tradition: 'sys',
    position: 1,
    // No published course lists this one as recommended background.
    recommendFrom: [],
    leadsTo: [],
    sourceNote: '塞克斯都《皮浪学说纲要》与《希腊化与罗马哲学》所用的文本相同；《正理经》、陈那《集量论》复原本与《知识、推理与辩论》相同；《回诤论》与《大乘哲学》相同；《庄子·秋水》与《老子、庄子与道家传统》相同。笛卡尔、休谟、安萨里和当代著作一律转述。版本与权利见附录。中文是相应课程的试译。',
    srcNote: srcNoteA,
    origLang: origLangA,
  },
  S2: {
    code: 'S2',
    text: S2,
    name: '形而上学：存在、实体、共相与模态',
    tier: '● 核心',
    en: 'Metaphysics: Being, Substance, Universals and Modality',
    method: '用测试案例比较关于共相的对立理论',
    background: '大纲建议先读「概念、案例与思想实验」（推荐背景，不是必需）',
    tradition: 'sys',
    position: 2,
    // No published course lists this one as recommended background.
    recommendFrom: [],
    leadsTo: [],
    sourceNote: '亚里士多德《范畴篇》与《亚里士多德》所用的文本相同；《胜论经》与《知识、推理与辩论》相同；《朱子语类》与《宋明理学至清代》相同。阿维森纳、穆拉·萨德拉和当代著作一律转述。版本与权利见附录。中文是相应课程的试译。',
    srcNote: srcNoteA,
    origLang: origLangA,
  },
  S3: {
    code: 'S3',
    text: S3,
    name: '因果、规律与时间',
    tier: '○ 拓展',
    en: 'Causation, Laws and Time',
    method: '用反例检验关于因果的分析',
    background: '大纲建议先读「概念、案例与思想实验」（推荐背景，不是必需）',
    tradition: 'sys',
    position: 3,
    // No published course lists this one as recommended background.
    recommendFrom: [],
    leadsTo: [],
    sourceNote: '休谟《人类理智研究》与《经验论、启蒙与自由主义的起源》所用的文本相同；安萨里《哲学家的矛盾》和阿威罗伊《矛盾的矛盾》与《安萨里、阿威罗伊与西方伊斯兰思想》相同；《数论颂》与《意识、物质与修行》相同；《中论》与《大乘哲学》相同；《中部》与《早期佛教与阿毗达磨》相同；《忏悔录》与《从古代晚期到经院哲学》相同；《周易》与《法家与汉代思想》相同；道元《有时》一句与《日本哲学：佛教思想、江户儒学与京都学派》相同（该课没有对照校订本）。当代著作一律转述。版本与权利见附录。中文是相应课程的试译。',
    srcNote: srcNoteS,
    origLang: origLangS,
  },
  S4: {
    code: 'S4',
    text: S4,
    name: '人格、自我与自由意志',
    tier: '● 核心',
    en: 'Persons, Self and Free Will',
    method: '用疑难案例检验人格同一性的标准',
    background: '大纲建议先读「概念、案例与思想实验」（推荐背景，不是必需）',
    tradition: 'sys',
    position: 4,
    // No published course lists this one as recommended background.
    recommendFrom: [],
    leadsTo: [],
    sourceNote: '洛克《人类理智论》和休谟《人性论》与《经验论、启蒙与自由主义的起源》所用的文本相同；《弥兰王问经》与《早期佛教与阿毗达磨》相同；《论语》与《孔子、孟子与荀子》相同；西塞罗《论命运》与《希腊化与罗马哲学》相同；康德《实践理性批判》与《康德》相同。帕菲特和其他当代著作一律转述。版本与权利见附录。中文是相应课程的试译。',
    srcNote: srcNoteS,
    origLang: origLangS,
  },
  S5: {
    code: 'S5',
    text: S5,
    name: '心灵哲学与意识',
    tier: '● 核心',
    en: 'Philosophy of Mind and Consciousness',
    method: '分析关于意识的思想实验',
    background: '大纲建议先读「概念、案例与思想实验」（推荐背景，不是必需）',
    tradition: 'sys',
    position: 5,
    // No published course lists this one as recommended background.
    recommendFrom: [],
    leadsTo: [],
    sourceNote: '笛卡尔《第一哲学沉思集》和伊丽莎白致笛卡尔的信与《近代早期理性主义与新科学》所用的文本相同；《数论颂》与《意识、物质与修行》相同；世亲《唯识二十论》与《大乘哲学》相同；阿维森纳《指要与诠解》与《法拉比与阿维森纳》相同；《孟子》《荀子》与《孔子、孟子与荀子》相同。杰克逊、查尔默斯、内格尔、塞尔等当代著作一律转述。版本与权利见附录。中文是相应课程的试译。',
    srcNote: srcNoteS,
    origLang: origLangS,
  },
};

// Methods courses quote short passages from several traditions; the note and
// the language are decided per citation.
function srcNoteA(cite: string) {
  if (/柏拉图/.test(cite)) return '希腊文据 Perseus 所收 Burnet 校本（CC BY-SA 4.0）';
  if (/塞克斯都/.test(cite)) return '希腊文据 First1KGreek 所收 Mutschmann 校本（CC BY-SA），与《希腊化与罗马哲学》相同';
  if (/范畴篇/.test(cite)) return '希腊文据 First1KGreek 所收 Bekker 本（CC BY-SA），与《亚里士多德》相同';
  if (/赫拉克利特/.test(cite)) return '希腊文与《古希腊哲学的起源》所用的文本相同';
  if (/集量论/.test(cite)) return '据 Steinkellner 2005 年复原本，与《知识、推理与辩论》相同';
  if (/正理经|胜论经|弥曼差经|回诤论/.test(cite)) return '据 GRETIL 电子本';
  if (/朱子語類/.test(cite)) return '录文与《宋明理学至清代》相同';
  if (/哲学研究/.test(cite)) return '德文据 wittgensteinproject.org 录文';
  if (/庄子|老子/.test(cite)) return '录文与《老子、庄子与道家传统》相同';
  return '据中文维基文库录文';
}
function origLangA(html: string) {
  const t = html.replace(/<[^>]+>/g, '');
  if (/[Ͱ-Ͽἀ-῿]/.test(t)) return 'grc';
  if (/[äöüß»«]/.test(t)) return 'de';
  if (/[āīūṛṃṇśṣḥ]/.test(t)) return 'sa';
  return 'zh-Hant';
}

// S3–S5 quote short checked passages in many languages: the language is
// decided per passage, and the note for the Chinese source blocks per citation.
function srcNoteS(cite: string) {
  if (/周易/.test(cite)) return '录文据中文维基文库，与《法家与汉代思想》相同';
  if (/论语|孟子|荀子/.test(cite)) return '录文据中文维基文库，与《孔子、孟子与荀子》相同';
  return '据中文维基文库录文';
}
function origLangS(html: string) {
  const t = html.replace(/<[^>]+>/g, '');
  if (/[؀-ۿ]/.test(t)) return 'ar';
  if (/[Ͱ-Ͽἀ-῿]/.test(t)) return 'grc';
  if (/[぀-ヿ]/.test(t)) return 'ja';
  if (/ṁ/.test(t)) return 'pi';
  if (/[āīūṛṃṇśṣḥ]/.test(t)) return 'sa';
  if (/[äöüß]/.test(t)) return 'de';
  if (/[éèêàç]|\bvous\b/.test(t)) return 'fr';
  if (/\b(est|sed|quid|igitur|ergo|autem|inquit|enim)\b/i.test(t)) return 'la';
  if (/[A-Za-z]/.test(t)) return 'en';
  return 'zh-Hant';
}

export const isPublished = (code: string) => code in PUBLISHED;
export const published = (code: string): PublishedCourse | undefined => PUBLISHED[code];
export const PUBLISHED_CODES = Object.keys(PUBLISHED);

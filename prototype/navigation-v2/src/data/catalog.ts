// Navigation data for prototype V1.
//
// Source: planning/CURRICULUM_REFERENCE_DRAFT.md (course codes, tiers, sections,
// links). Chinese course titles other than CN1 are short presentation labels
// translated for this prototype only (示意译名); they are not curriculum text.
// Only the published courses (content/courses.ts) are implemented: every other
// course is marked `implemented: false` and is never presented as an openable
// control.

import { isPublished } from '../content/courses';
import { NAMES } from './units';

export type Tier = 'core' | 'elective' | 'extended';

export interface Course {
  code: string;
  title: string; // Chinese display label
  tier: Tier;
  domain: 'A' | 'B' | 'C' | 'D';
  tradition?: string;
  implemented: boolean;
}

export const TIER_LABEL: Record<Tier, string> = {
  core: '● 核心',
  elective: '◐ 核心选修',
  extended: '○ 拓展',
};

const c = (code: string, title: string, tier: Tier, domain: Course['domain'], tradition?: string): Course => ({
  code,
  title,
  tier,
  domain,
  tradition,
  implemented: isPublished(code),
});

export const COURSES: Course[] = [
  // Domain A
  c('A1', '什么是哲学？问题、论证与阅读', 'core', 'A'),
  c('A2', '形式推理：命题逻辑与谓词逻辑', 'extended', 'A'),
  c('A3', '概念、案例与思想实验', 'core', 'A'),
  c('A4', '诠释、翻译与哲学写作', 'extended', 'A'),
  // Domain B — Chinese
  c('CN1', '孔子、孟子与荀子：修养、礼与人性', 'core', 'B', 'cn'),
  c('CN2', '墨家、名辩与后期墨经', 'core', 'B', 'cn'),
  c('CN3', '道家传统：老子、庄子及其读者', 'core', 'B', 'cn'),
  c('CN4', '法家、汉代综合与阴阳五行', 'core', 'B', 'cn'),
  c('CN5', '魏晋玄学与中国佛学', 'core', 'B', 'cn'),
  c('CN6', '宋明理学至清代：理、心与实学', 'core', 'B', 'cn'),
  c('CN7', '中国哲学与现代：从晚清到新文化运动', 'core', 'B', 'cn'),
  c('CN8', '体系、马克思主义与当代中国哲学', 'extended', 'B', 'cn'),
  // Domain B — others used in the topic view
  c('GR3', '亚里士多德：实体、原因、逻辑与好生活', 'core', 'B', 'gr'),
  c('GR4', '希腊化与罗马学派：作为生活的哲学', 'extended', 'B', 'gr'),
  c('IN1', '印度哲学的起源与早期思想争论：自我、宇宙与解脱', 'core', 'B', 'in'),
  c('IN2', '早期佛教与阿毗达磨：苦、无我与缘起', 'core', 'B', 'in'),
  c('EA3', '经验论、启蒙与自由主义的起源', 'core', 'B', 'ea'),
  c('EA4', '康德：批判、自主与判断', 'core', 'B', 'ea'),
  c('EA11', '1950 年后的道德与政治哲学', 'extended', 'B', 'ea'),
  c('AF1', '非洲哲学思想：来源、争论与方法', 'core', 'B', 'af'),
  c('KR1', '韩国哲学：佛教、理学论争与现代', 'elective', 'B', 'ot'),
  // Domain C
  c('S4', '人格、自我与自由意志', 'core', 'C'),
  c('S7', '伦理学：对与善、道德修养', 'core', 'C'),
  c('S8', '元伦理学与道德心理学', 'extended', 'C'),
  // Domain D
  c('D1', '比较哲学：方法与陷阱', 'core', 'D'),
  c('D2', '自我、人格与无我', 'extended', 'D'),
  c('D3', '跨传统的知识、怀疑与论证规则', 'core', 'D'),
  c('D4', '德性、关怀与关系：跨传统伦理', 'extended', 'D'),
  c('D5', '跨传统的政治秩序与正当性', 'extended', 'D'),
  c('D6', '哲学中的性别、种族与帝国', 'core', 'D'),
  c('D7', '技术哲学与人工智能', 'extended', 'D'),
  c('D8', '生命伦理学', 'extended', 'D'),
  c('D9', '环境伦理学', 'extended', 'D'),
  c('D10', '传播与交流：我们实际知道什么', 'extended', 'D'),
  c('D11', '独立哲学研究（毕业项目）', 'core', 'D'),
];

export const courseByCode = (code: string) => COURSES.find((x) => x.code === code);

// Course codes (CN1, S7 …) are internal keys only; the interface always shows
// names. Short names are prototype labels (示意), not curriculum text.
const SHORT: Record<string, string> = {
  CN1: '孔子、孟子与荀子',
  CN2: '墨家与名辩',
  CN3: '道家传统',
  CN4: '法家与汉代',
  CN5: '玄学与佛学',
  CN6: '宋明理学',
  CN7: '近代中国哲学',
  CN8: '当代中国哲学',
  EA4: '康德',
  IN1: '印度哲学的起源',
};
/** Short readable name of a course, e.g. CN1 → 孔子、孟子与荀子. */
export function nameOf(code: string, names?: Record<string, string>): string {
  if (SHORT[code]) return SHORT[code];
  const t = courseByCode(code)?.title ?? names?.[code] ?? NAMES[code] ?? code;
  return t.split('：')[0];
}
/** Replace any course code inside a sentence with its 「name」. */
export const decode = (text: string, names?: Record<string, string>) =>
  text.replace(/\b(?:A|GR|CN|IN|IA|JW|EA|AF|JP|KR|LA|S|D)\d{1,2}\b/g, (c) => `「${nameOf(c, names)}」`);

// ── Four top-level exploration regions ───────────────────────────────────────

export type RegionId = 'history' | 'questions' | 'dialogue' | 'methods';

export interface Region {
  id: RegionId;
  title: string;
  en: string;
  line: string;
  stat: string;
  color: string;
}

export const REGIONS: Region[] = [
  {
    id: 'history',
    title: '历史与传统',
    en: 'History & Traditions',
    line: '七条传统的历史长线，自上而下流过两千多年',
    stat: '44 门历史课 · 7 个传统',
    color: '#e3b874',
  },
  {
    id: 'questions',
    title: '哲学问题',
    en: 'Philosophical Questions',
    line: '从一个真实的问题出发，穿过各个传统',
    stat: '10 个问题入口 · 13 门系统课',
    color: '#9cc0ff',
  },
  {
    id: 'dialogue',
    title: '跨传统对话',
    en: 'Cross-Tradition Dialogue',
    line: '不同传统在同一个问题上交织、碰撞',
    stat: '11 门比较、当代与独立研究课',
    color: '#e59bbd',
  },
  {
    id: 'methods',
    title: '哲学方法',
    en: 'Philosophical Methods',
    line: '重构论证、分析概念、诠释原典的工具',
    stat: '4 门方法课 · 每门课一个方法重点',
    color: '#93dcc4',
  },
];

// ── Region detail panels (real curriculum structure) ─────────────────────────

export const TRADITIONS = [
  { id: 'gr', name: '希腊与罗马', count: 4 },
  { id: 'cn', name: '中国', count: 8 },
  { id: 'in', name: '印度', count: 8 },
  { id: 'ia', name: '伊斯兰、阿拉伯与犹太', count: 6 },
  { id: 'ea', name: '欧洲与北大西洋', count: 12 },
  { id: 'af', name: '非洲与非洲裔', count: 3 },
  { id: 'ot', name: '日本、韩国与拉丁美洲', count: 3 },
];

export const METHOD_FOCI = ['论证重构', '概念分析', '原典诠释', '理论比较', '异议评估', '史料批判'];

// ── Philosophical questions (topics) ─────────────────────────────────────────
// Each topic maps to the Domain C course(s) that carry it in the curriculum.

export interface Topic {
  id: string;
  title: string;
  question: string;
  courses: string[];
  implemented: boolean;
}

export const TOPICS: Topic[] = [
  { id: 'knowledge', title: '知识与怀疑', question: '我们能知道什么？', courses: ['S1'], implemented: false },
  { id: 'being', title: '存在与实在', question: '世界最终由什么构成？', courses: ['S2', 'S3'], implemented: false },
  { id: 'self', title: '自我与自由', question: '我是谁？我自由吗？', courses: ['S4'], implemented: false },
  { id: 'mind', title: '心灵与意识', question: '心灵是什么？', courses: ['S5'], implemented: false },
  { id: 'language', title: '语言与意义', question: '语言怎样指向世界？', courses: ['S6'], implemented: false },
  { id: 'human-nature', title: '人性与道德', question: '一个人怎样才能变好？', courses: ['S7', 'S8'], implemented: true },
  { id: 'justice', title: '权力与正义', question: '什么样的权力是正当的？', courses: ['S9'], implemented: false },
  { id: 'science', title: '科学与逻辑', question: '科学和逻辑能告诉我们什么？', courses: ['S10', 'S11'], implemented: false },
  { id: 'meaning', title: '信仰、死亡与意义', question: '人生有什么意义？', courses: ['S12'], implemented: false },
  { id: 'beauty', title: '美与艺术', question: '美是客观的吗？', courses: ['S13'], implemented: false },
];

// ── Topic: 人性与道德 ─────────────────────────────────────────────────────────
// Course sections are curriculum section titles (translated labels). The four
// question groupings are an editorial illustration for this prototype.

export interface TopicQuestion {
  id: string;
  text: string;
  links: { code: string; where: string }[];
}

export const HUMAN_NATURE = {
  core: '一个人怎样才能在道德上变好？天性、礼、教育、反思和长期修养，各自起什么作用？',
  coreSource: 'CN1 本章导读',
  questions: [
    {
      id: 'q-nature',
      text: '人性本善、本恶，还是无所谓善恶？',
      links: [
        { code: 'CN1', where: '三、孟子：人性善与扩充 · 四、荀子：性恶、伪与礼义' },
        { code: 'CN6', where: '§2 理与气的宇宙论与本体论' },
        { code: 'KR1', where: '§4 四端七情之辩' },
      ],
    },
    {
      id: 'q-cultivate',
      text: '怎样变好：扩充萌芽、矫正本性，还是长期练习？',
      links: [
        { code: 'CN1', where: '三、孟子 · 四、荀子 · 六、三种修养观' },
        { code: 'S7', where: '§6 修养与实践' },
        { code: 'GR3', where: '§6 德性与幸福' },
        { code: 'GR4', where: '§6 作为治疗的哲学' },
        { code: 'IN1', where: '三、行动、再生与解脱 · 四、沙门的另一条路（不害与苦行）' },
      ],
    },
    {
      id: 'q-start',
      text: '伦理从品格、关系还是规则出发？',
      links: [
        { code: 'D4', where: '§1 品格 · §2 关系 · §3 关怀' },
        { code: 'EA4', where: '四、道德哲学：善良意志、定言命令与自主' },
        { code: 'EA11', where: '§2 德性伦理的回归 · §6 关怀伦理' },
        { code: 'AF1', where: '§5 伦理与 Ubuntu' },
      ],
    },
    {
      id: 'q-emotion',
      text: '情感与理性，在道德中各起什么作用？',
      links: [
        { code: 'S8', where: '§5 情感 · §6 意志软弱' },
        { code: 'EA3', where: '§4 休谟论道德与宗教' },
        { code: 'IN2', where: '§6 伦理与心' },
        { code: 'CN1', where: '三、孟子 · 心：会感受，也会思考' },
      ],
    },
  ] as TopicQuestion[],
  // Links stated in the curriculum file itself (Prereq/links lines).
  documented: [
    { from: 'CN1', to: 'CN6', note: '大纲：CN1 → CN6' },
    { from: 'CN1', to: 'S7', note: '大纲：CN1 → S7' },
    { from: 'CN1', to: 'D4', note: '大纲：CN1 → D4' },
    { from: 'CN1', to: 'D2', note: '大纲：D2 的背景要求含 “AF1 或 CN1”' },
    { from: 'CN6', to: 'KR1', note: '大纲：KR1 的前置为 CN6' },
    { from: 'S7', to: 'S8', note: '大纲：S8 推荐先读 S7' },
    { from: 'S7', to: 'D4', note: '大纲：D4 的背景要求含 S7' },
  ],
};

export const topicCourseCodes = (): string[] => {
  const set = new Set<string>();
  HUMAN_NATURE.questions.forEach((q) => q.links.forEach((l) => set.add(l.code)));
  return [...set];
};

// Front-page facts of the published courses live in content/courses.ts.

import { CN1, MENCIUS_SECTION } from './cn1';
import { EA4 } from './ea4';
import type { CourseText } from './course';

// Published courses: their text and their front-page facts. Facts come from
// planning/CURRICULUM_REFERENCE_DRAFT.md (method focus, background, links);
// Chinese wording is a presentation translation.

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
  tradition: 'cn' | 'ea';
  position: number;
  /** Courses that list this one as recommended background. */
  recommendFrom: string[];
  /** Courses this one leads to (curriculum “→” links). */
  leadsTo: string[];
  /** Shown when a primary-source citation is opened. */
  sourceNote: string;
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
    topicSection: (() => {
      const i = EA4.SECTIONS.findIndex((s) => s.title.startsWith('四、道德哲学'));
      return i >= 0 ? i : undefined;
    })(),
  },
};

export const isPublished = (code: string) => code in PUBLISHED;
export const published = (code: string): PublishedCourse | undefined => PUBLISHED[code];
export const PUBLISHED_CODES = Object.keys(PUBLISHED);

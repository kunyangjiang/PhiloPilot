// Shared navigation helpers so every style variant takes the same, real paths.
import { COURSES, REGIONS, TOPICS, TRADITIONS, type RegionId } from '../data/catalog';
import { navigate, setCtxResolver, type Crumb, type Route } from '../router';
import { resumeTarget } from '../state/reading';
import { READING } from '../content/cn1';

export const regionHash = (id: RegionId) => (id === 'questions' ? '#/questions' : `#/region/${id}`);
export const regionCrumb = (id: RegionId): Crumb => ({ label: REGIONS.find((r) => r.id === id)!.title, hash: regionHash(id), kind: '入口' });

export const QUESTIONS_CRUMB: Crumb = { label: '哲学问题', hash: '#/questions', kind: '入口' };
export const topicCrumb = (id: string): Crumb => ({ label: TOPICS.find((t) => t.id === id)?.title ?? id, hash: `#/questions/${id}`, kind: '问题' });
/** The 中国 tradition is a section of the 历史与传统 page (no separate route). */
export const TRADITION_CN_CRUMB: Crumb = { label: '中国哲学', hash: '#/region/history?t=cn', kind: '传统' };

/**
 * Where a course was opened from, named by the page the learner was on.
 * Home, search and resume have no exploration origin: the path is just
 * 首页 › course. Pages that are not an exploration context give none.
 */
export function originOf(from: Route): Crumb[] {
  switch (from.name) {
    case 'questions':
      return [QUESTIONS_CRUMB];
    case 'topic':
      return [QUESTIONS_CRUMB, topicCrumb(from.topic)];
    case 'region':
      return from.region === 'history' ? [regionCrumb('history'), TRADITION_CN_CRUMB] : [regionCrumb(from.region)];
    default:
      return [];
  }
}
setCtxResolver(originOf);

/** The canonical place of a course in the curriculum (independent of how it was reached). */
export const CANONICAL: Record<string, Crumb[]> = { CN1: [regionCrumb('history'), TRADITION_CN_CRUMB] };

export function goRegion(id: RegionId) {
  navigate(id === 'questions' ? { name: 'questions' } : { name: 'region', region: id });
}

export function goTopic(topic = 'human-nature') {
  navigate({ name: 'topic', topic });
}

/** Open a course front page; the origin is taken from the current page unless given. */
export function goCourse(code: string, ctx?: Crumb[]) {
  navigate({ name: 'course', code }, { ctx });
}

/** Resume is a direct jump: it carries no exploration origin. */
export function continueReading() {
  navigate({ name: 'reader', code: 'CN1', ...resumeTarget() }, { ctx: [] });
}

/** Open the first instructional section. */
export function startReading(ctx?: Crumb[]) {
  navigate({ name: 'reader', code: 'CN1', section: READING[0].index }, { ctx });
}

/** Contents of each region, taken from the curriculum structure. */
export const REGION_ITEMS: Record<RegionId, { key: string; label: string; open?: () => void }[]> = {
  history: TRADITIONS.map((t) => ({ key: t.id, label: `${t.name}（${t.count}）` })),
  questions: TOPICS.map((t) => ({
    key: t.id,
    label: t.title,
    open: t.implemented ? () => goTopic(t.id) : undefined,
  })),
  dialogue: COURSES.filter((c) => c.domain === 'D').map((c) => ({ key: c.code, label: c.title })),
  methods: COURSES.filter((c) => c.domain === 'A').map((c) => ({ key: c.code, label: c.title })),
};

export const REGION_NO: Record<RegionId, string> = { history: '01', questions: '02', dialogue: '03', methods: '04' };

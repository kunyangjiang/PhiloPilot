import { useEffect, useState } from 'react';
import type { RegionId } from './data/catalog';

// Hash routes keep the prototype runnable from any static server and make
// browser back/forward work without server configuration.
export type Route =
  | { name: 'home' }
  | { name: 'region'; region: Exclude<RegionId, 'questions'> }
  | { name: 'questions' }
  | { name: 'topic'; topic: string }
  | { name: 'course'; code: string }
  | { name: 'reader'; code: string; section: number; block?: number }
  // PhiloPilot Cases (哲学案例), outside the curriculum.
  | { name: 'cases' }
  | { name: 'case'; no: string }
  | { name: 'caseReader'; no: string; part: number; block?: number };

export function parseHash(hash: string): Route {
  const [path, query = ''] = hash.replace(/^#/, '').split('?');
  const parts = path.split('/').filter(Boolean);
  const params = new URLSearchParams(query);
  if (parts[0] === 'questions' && parts[1]) return { name: 'topic', topic: parts[1] };
  if (parts[0] === 'questions') return { name: 'questions' };
  if (parts[0] === 'region' && (parts[1] === 'history' || parts[1] === 'dialogue' || parts[1] === 'methods'))
    return { name: 'region', region: parts[1] };
  if (parts[0] === 'cases') {
    if (!parts[1]) return { name: 'cases' };
    if (parts[2] === 'read') {
      const b = params.get('b');
      return { name: 'caseReader', no: parts[1], part: Number(parts[3] ?? 0) || 0, block: b != null ? Number(b) : undefined };
    }
    return { name: 'case', no: parts[1] };
  }
  if (parts[0] === 'course' && parts[1]) {
    if (parts[2] === 'read') {
      const section = Number(parts[3] ?? 0) || 0;
      const b = params.get('b');
      return { name: 'reader', code: parts[1], section, block: b != null ? Number(b) : undefined };
    }
    return { name: 'course', code: parts[1] };
  }
  return { name: 'home' };
}

export function routeToHash(r: Route): string {
  switch (r.name) {
    case 'home':
      return '#/';
    case 'region':
      return `#/region/${r.region}`;
    case 'questions':
      return '#/questions';
    case 'topic':
      return `#/questions/${r.topic}`;
    case 'course':
      return `#/course/${r.code}`;
    case 'reader':
      return `#/course/${r.code}/read/${r.section}${r.block != null ? `?b=${r.block}` : ''}`;
    case 'cases':
      return '#/cases';
    case 'case':
      return `#/cases/${r.no}`;
    case 'caseReader':
      return `#/cases/${r.no}/read/${r.part}${r.block != null ? `?b=${r.block}` : ''}`;
  }
}

// ── Navigation context ───────────────────────────────────────────────────────
// A course can be reached in several ways (a question, a tradition, search,
// resume). The way the learner actually came is stored with the history
// entry itself, so Back/Forward restore it exactly and a direct URL visit has
// none (no invented ancestry).
export interface Crumb {
  label: string;
  hash: string;
  kind?: string;
}
type CtxResolver = (from: Route, to: Route) => Crumb[];
let resolveCtx: CtxResolver = () => [];
/** Registered by the UI layer: how each exploration page names itself as an origin. */
export const setCtxResolver = (f: CtxResolver) => (resolveCtx = f);

const inCourse = (r: Route) => r.name === 'course' || r.name === 'reader';
/** The origin path of the current history entry (course and reader pages only). */
export const currentCtx = (): Crumb[] => (history.state && Array.isArray(history.state.ctx) ? history.state.ctx : []);

export function navigate(r: Route, opts: { replace?: boolean; ctx?: Crumb[] } = {}) {
  const h = routeToHash(r);
  let ctx: Crumb[] | undefined;
  if (inCourse(r)) {
    const here = parseHash(location.hash);
    if (opts.ctx) ctx = opts.ctx;
    // Moving inside one course (front page ↔ sections) keeps the origin.
    else if (inCourse(here) && (here as { code: string }).code === (r as { code: string }).code) ctx = currentCtx();
    else ctx = resolveCtx(here, r);
  }
  const state = ctx ? { ctx } : null;
  if (opts.replace) history.replaceState(state, '', h);
  else history.pushState(state, '', h);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(location.hash));
  useEffect(() => {
    const on = () => setRoute(parseHash(location.hash));
    window.addEventListener('hashchange', on);
    window.addEventListener('popstate', on);
    return () => {
      window.removeEventListener('hashchange', on);
      window.removeEventListener('popstate', on);
    };
  }, []);
  return route;
}

export const sameRoute = (a: Route, b: Route) => routeToHash(a) === routeToHash(b);

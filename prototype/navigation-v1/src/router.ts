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
  | { name: 'reader'; code: string; section: number; block?: number };

export function parseHash(hash: string): Route {
  const [path, query = ''] = hash.replace(/^#/, '').split('?');
  const parts = path.split('/').filter(Boolean);
  const params = new URLSearchParams(query);
  if (parts[0] === 'questions' && parts[1]) return { name: 'topic', topic: parts[1] };
  if (parts[0] === 'questions') return { name: 'questions' };
  if (parts[0] === 'region' && (parts[1] === 'history' || parts[1] === 'dialogue' || parts[1] === 'methods'))
    return { name: 'region', region: parts[1] };
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
  }
}

export function navigate(r: Route, opts: { replace?: boolean } = {}) {
  const h = routeToHash(r);
  if (opts.replace) history.replaceState(null, '', h);
  else history.pushState(null, '', h);
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

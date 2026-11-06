import { useLayoutEffect, useRef } from 'react';
import { nameOf, type RegionId } from '../data/catalog';
import { PUBLISHED } from '../content/courses';
import { currentCtx, navigate, parseHash, type Crumb } from '../router';
import { QUESTIONS_CRUMB, regionCrumb, topicCrumb } from './nav';

// The segmented breadcrumb under the top bar. It shows the path the learner
// actually took, not a fixed sequence of stages:
//   question route   首页 › 哲学问题 › 人性与道德 › 孔子、孟子与荀子 › 当前章节
//   tradition route  首页 › 历史与传统 › 中国哲学 › 孔子、孟子与荀子 › 当前章节
//   resume / search / direct URL   首页 › 孔子、孟子与荀子 › 当前章节
// Each segment carries a small label saying what kind of place it is. The
// current place is the filled red segment.

type Page =
  | { page: 'region'; region: RegionId }
  | { page: 'questions' }
  | { page: 'topic'; topic: string }
  | { page: 'course'; code: string }
  | { page: 'reader'; code: string; section: string; appendix?: boolean };

const HOME: Crumb = { label: '首页', hash: '#/', kind: '首页' };
const courseCrumb = (code: string): Crumb => ({ label: PUBLISHED[code]?.name ?? nameOf(code), hash: `#/course/${code}`, kind: '课程' });

export function crumbsFor(p: Page): Crumb[] {
  switch (p.page) {
    case 'region':
      return [HOME, regionCrumb(p.region)];
    case 'questions':
      return [HOME, QUESTIONS_CRUMB];
    case 'topic':
      return [HOME, QUESTIONS_CRUMB, topicCrumb(p.topic)];
    case 'course':
      return [HOME, ...currentCtx(), courseCrumb(p.code)];
    case 'reader':
      return [HOME, ...currentCtx(), courseCrumb(p.code), { label: p.section, hash: location.hash, kind: p.appendix ? '附录' : '章节' }];
  }
}

export function go(hash: string) {
  const r = parseHash(hash);
  // Inside a course the origin travels with the move; elsewhere a plain push.
  if (r.name === 'course' || r.name === 'reader') navigate(r);
  else {
    history.pushState(null, '', hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

export default function Wayfinder(props: Page) {
  const crumbs = crumbsFor(props);
  const ref = useRef<HTMLOListElement>(null);
  // On narrow screens the bar scrolls sideways; keep the current place in view.
  useLayoutEffect(() => {
    const ol = ref.current;
    if (ol) ol.scrollLeft = ol.scrollWidth;
  });
  return (
    <nav className="wayfinder" aria-label="当前位置">
      <ol ref={ref}>
        {crumbs.map((c, i) => {
          const current = i === crumbs.length - 1;
          return (
            <li key={c.hash + i} className={'wf-step ' + (current ? 'is-current' : 'is-past') + (i === 0 ? ' wf-home' : '')} aria-current={current ? 'location' : undefined}>
              <span className="wf-level">{c.kind}</span>
              {current ? (
                <span className="wf-label">{c.label}</span>
              ) : (
                <a
                  href={c.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    go(c.hash);
                  }}
                >
                  {c.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

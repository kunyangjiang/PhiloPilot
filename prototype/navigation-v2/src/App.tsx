import { useEffect, useRef } from 'react';
import { routeToHash, useRoute, type Route } from './router';
import Home from './ui/Home';
import Questions from './ui/Questions';
import Topic from './ui/Topic';
import Region from './ui/Region';
import CoursePage from './ui/CoursePage';
import Reader from './ui/Reader';
import SearchPalette from './ui/SearchPalette';
import BackToTop from './ui/BackToTop';
import CasesPage from './ui/cases/CasesPage';
import CaseFront from './ui/cases/CaseFront';
import CaseReader from './ui/cases/CaseReader';
import { caseByNo } from './content/cases';
import { caseText } from './content/caseBooks';
import { isPublished } from './content/courses';
import { nameOf } from './data/catalog';

function Page({ route }: { route: Route }) {
  switch (route.name) {
    case 'home':
      return <Home />;
    case 'region':
      return <Region region={route.region} />;
    case 'questions':
      return <Questions />;
    case 'topic':
      return <Topic topic={route.topic} />;
    case 'course':
      return <CoursePage code={route.code} />;
    case 'reader':
      // Only published courses have a reader; anything else shows the
      // course page, which says the course is not available.
      return isPublished(route.code) ? <Reader route={route} /> : <CoursePage code={route.code} />;
    // Cases: only a written case opens; any other case number shows the overview.
    case 'cases':
      return <CasesPage />;
    case 'case':
      return caseByNo(route.no)?.available && caseText(route.no) ? <CaseFront no={route.no} /> : <CasesPage />;
    case 'caseReader':
      return caseByNo(route.no)?.available && caseText(route.no) ? <CaseReader route={route} /> : <CasesPage />;
  }
}

export default function App() {
  const route = useRoute();
  const first = useRef(true);

  useEffect(() => {
    document.title = titleFor(route);
    window.scrollTo(0, 0);
    // Move focus to the new page for keyboard and screen-reader users.
    if (!first.current && route.name !== 'reader' && route.name !== 'caseReader') document.getElementById('main')?.focus({ preventScroll: true });
    first.current = false;
  }, [route]);

  // The reader keeps its own key so section changes do not remount the page
  // (a different course does).
  const key = route.name === 'reader' ? 'reader-' + route.code : route.name === 'caseReader' ? 'case-reader-' + route.no : routeToHash(route);
  return (
    <div className={'app app--' + route.name}>
      <a className="skip-link" href="#main" onClick={(e) => (e.preventDefault(), document.getElementById('main')?.focus())}>
        跳到主要内容
      </a>
      <div className="page" key={key}>
        <Page route={route} />
      </div>
      <SearchPalette />
      <BackToTop />
    </div>
  );
}

function titleFor(r: Route) {
  const base = 'PhiloPilot';
  switch (r.name) {
    case 'home':
      return `${base} · 总览`;
    case 'region':
      return `${base} · ${{ history: '历史与传统', dialogue: '跨传统对话', methods: '哲学方法' }[r.region]}`;
    case 'questions':
      return `${base} · 哲学问题`;
    case 'topic':
      return `${base} · 人性与道德`;
    case 'course':
      return `${base} · ${nameOf(r.code)}`;
    case 'reader':
      return `${base} · 阅读：${nameOf(r.code)}`;
    case 'cases':
      return `${base} · 哲学案例`;
    case 'case':
    case 'caseReader': {
      const c = caseByNo(r.no);
      return c?.available ? `${base} · 哲学案例 ${c.no}《${c.title}》` : `${base} · 哲学案例`;
    }
  }
}

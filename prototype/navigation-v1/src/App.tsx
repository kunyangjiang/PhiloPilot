import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import SceneCanvas from './scene/SceneCanvas';
import { engine, type View } from './scene/engine';
import { routeToHash, useRoute, type Route } from './router';
import HomeLayer from './ui/HomeLayer';
import QuestionsLayer from './ui/QuestionsLayer';
import TopicLayer from './ui/TopicLayer';
import RegionLayer from './ui/RegionLayer';
import CoursePage from './ui/CoursePage';
import Reader from './ui/Reader';
import TransitionLayer from './ui/TransitionLayer';
import SearchPalette from './ui/SearchPalette';
import { useMotion } from './state/store';

const toView = (r: Route): View => {
  switch (r.name) {
    case 'home':
      return 'home';
    case 'region':
      return `region-${r.region}` as View;
    case 'questions':
      return 'questions';
    case 'topic':
      return 'topic';
    case 'course':
      return 'course';
    case 'reader':
      return 'reader';
  }
};

const layerKey = (r: Route) => (r.name === 'reader' ? 'reader' : routeToHash(r));

function renderLayer(r: Route): ReactNode {
  switch (r.name) {
    case 'home':
      return <HomeLayer />;
    case 'region':
      return <RegionLayer region={r.region} />;
    case 'questions':
      return <QuestionsLayer />;
    case 'topic':
      return <TopicLayer topic={r.topic} />;
    case 'course':
      return <CoursePage code={r.code} />;
    case 'reader':
      return <Reader route={r} />;
  }
}

export default function App() {
  const route = useRoute();
  const motion = useMotion();
  const prevRef = useRef<Route>(route);
  const [layers, setLayers] = useState<{ key: string; route: Route; leaving: boolean }[]>([
    { key: layerKey(route), route, leaving: false },
  ]);
  const [transition, setTransition] = useState<{ id: number; from: Route; to: Route } | null>(null);

  useEffect(() => {
    document.documentElement.dataset.motion = motion;
  }, [motion]);

  // Route → engine view (spatial targets) + layer presence + choreography.
  useLayoutEffect(() => {
    const from = prevRef.current;
    prevRef.current = route;
    engine.setView(toView(route), route.name === 'topic' ? route.topic : undefined);
    const key = layerKey(route);
    setLayers((ls) => {
      if (ls.some((l) => l.key === key && !l.leaving)) return ls.map((l) => (l.key === key ? { ...l, route } : l));
      return [...ls.map((l) => ({ ...l, leaving: true })), { key, route, leaving: false }];
    });
    if (layerKey(from) !== key) setTransition({ id: Date.now(), from, to: route });
    const t = window.setTimeout(() => setLayers((ls) => ls.filter((l) => !l.leaving)), motion === 'reduced' ? 160 : 650);
    document.title = titleFor(route);
    return () => window.clearTimeout(t);
  }, [route]); // eslint-disable-line react-hooks/exhaustive-deps

  const reading = route.name === 'reader';

  return (
    <div className={'app app--' + route.name}>
      <a className="skip-link" href="#main" onClick={(e) => (e.preventDefault(), document.getElementById('main')?.focus())}>
        跳到主要内容
      </a>
      <SceneCanvas hidden={reading && !layers.some((l) => l.leaving)} />
      {layers.map((l) => (
        <div key={l.key} className={'layer' + (l.leaving ? ' layer--leaving' : '')} aria-hidden={l.leaving || undefined} inert={l.leaving || undefined}>
          {renderLayer(l.route)}
        </div>
      ))}
      {transition && <TransitionLayer key={transition.id} from={transition.from} to={transition.to} />}
      <SearchPalette />
    </div>
  );
}

function titleFor(r: Route) {
  const base = 'PhiloPilot';
  switch (r.name) {
    case 'home':
      return `${base} · 哲学的经纬`;
    case 'region':
      return `${base} · ${{ history: '历史与传统', dialogue: '跨传统对话', methods: '哲学方法' }[r.region]}`;
    case 'questions':
      return `${base} · 哲学问题`;
    case 'topic':
      return `${base} · 人性与道德`;
    case 'course':
      return `${base} · CN1 孔子、孟子与荀子`;
    case 'reader':
      return `${base} · CN1 阅读`;
  }
}

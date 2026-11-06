import { useEffect } from 'react';
import { COURSES, METHOD_FOCI, REGIONS, TIER_LABEL, TRADITIONS } from '../data/catalog';
import { navigate } from '../router';
import { setTrail, type Crumb } from '../state/store';
import { TopBar, HOME_CRUMB } from './Chrome';

type R = 'history' | 'dialogue' | 'methods';

function CourseRow({ code, trail }: { code: string; trail: Crumb[] }) {
  const c = COURSES.find((x) => x.code === code)!;
  if (c.implemented)
    return (
      <li className="rp-course open">
        <button
          onClick={() => {
            setTrail(trail);
            navigate({ name: 'course', code });
          }}
        >
          <b>{c.code}</b>
          <span>{c.title}</span>
          <small>{TIER_LABEL[c.tier]} · 打开 →</small>
        </button>
      </li>
    );
  return (
    <li className="rp-course">
      <b>{c.code}</b>
      <span>{c.title}</span>
      <small>{TIER_LABEL[c.tier]} · V1 未实现</small>
    </li>
  );
}

export default function RegionLayer({ region }: { region: R }) {
  const r = REGIONS.find((x) => x.id === region)!;
  const crumb: Crumb = { label: r.title, hash: `#/region/${region}` };
  const trail = [HOME_CRUMB, crumb];
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && !document.querySelector('.palette') && navigate({ name: 'home' });
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  return (
    <main id="main" tabIndex={-1} className={'region-view rv--' + region} style={{ ['--rc' as string]: r.color }}>
      <TopBar crumbs={trail} />
      <aside className="region-panel">
        <p className="vt-kicker">{r.en}</p>
        <h1>{r.title}</h1>
        <p className="vt-lede">{r.line}。</p>
        {region === 'history' && (
          <>
            <ol className="trad-list">
              {TRADITIONS.map((t, i) => (
                <li key={t.id} style={{ ['--i' as string]: i }} className={t.id === 'cn' ? 'is-open' : ''}>
                  <span className="trad-thread" aria-hidden="true" />
                  <span className="trad-name">{t.name}</span>
                  <span className="trad-count">{t.count} 门</span>
                </li>
              ))}
            </ol>
            <h2 className="rp-h">中国 · 8 门课</h2>
            <ul className="rp-courses">
              {COURSES.filter((c) => c.tradition === 'cn').map((c) => (
                <CourseRow key={c.code} code={c.code} trail={trail} />
              ))}
            </ul>
          </>
        )}
        {region === 'dialogue' && (
          <ul className="rp-courses">
            {COURSES.filter((c) => c.domain === 'D').map((c) => (
              <CourseRow key={c.code} code={c.code} trail={trail} />
            ))}
          </ul>
        )}
        {region === 'methods' && (
          <>
            <ul className="rp-courses">
              {COURSES.filter((c) => c.domain === 'A').map((c) => (
                <CourseRow key={c.code} code={c.code} trail={trail} />
              ))}
            </ul>
            <h2 className="rp-h">每门课的方法重点（课程大纲 §2）</h2>
            <ul className="method-chips">
              {METHOD_FOCI.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p className="rp-note">例：CN1 的方法重点是“跨译本分析厚概念、比较对立的人性理论”。</p>
          </>
        )}
        <p className="rp-note">V1 中这一区域只展示课程结构；可阅读的内容目前只有 CN1。</p>
        <button className="back-pill back-pill--inline" onClick={() => navigate({ name: 'home' })}>
          ← 回到总览（Esc）
        </button>
      </aside>
    </main>
  );
}

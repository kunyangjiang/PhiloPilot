import { useEffect } from 'react';
import { COURSES, METHOD_FOCI, REGIONS, TIER_LABEL, TRADITIONS } from '../data/catalog';
import { UNITS } from '../data/units';
import { navigate } from '../router';
import { TopBar, NotBuilt, useEscape } from './Chrome';
import { goCourse, REGION_NO } from './nav';
import { PUBLISHED, TRADITION_NAME } from '../content/courses';
import Wayfinder from './Wayfinder';

type R = 'history' | 'dialogue' | 'methods';

function CourseTable({ codes }: { codes: string[] }) {
  return (
    <table className="course-table">
      <thead>
        <tr>
          <th scope="col">课程（示意译名）</th>
          <th scope="col">层级</th>
          <th scope="col">状态</th>
        </tr>
      </thead>
      <tbody>
        {codes.map((code) => {
          const u = UNITS.find((x) => x.code === code);
          const c = COURSES.find((x) => x.code === code) ?? { code, title: u?.name ?? code, tier: u?.tier ?? 'core', implemented: false };
          return (
            <tr key={code} className={c.implemented ? 'is-open' : ''}>
              <td>{c.title}</td>
              <td className="ct-tier">{TIER_LABEL[c.tier]}</td>
              <td>
                {c.implemented ? (
                  <button className="btn btn--small btn--accent" onClick={() => goCourse(code)}>
                    打开课程 →
                  </button>
                ) : (
                  <NotBuilt />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// Bottom edge of the sticky top bar and wayfinder.
const barsBottom = () => document.querySelector('.wayfinder')?.getBoundingClientRect().bottom ?? 124;

// Scroll a tradition's section heading to just below the sticky top bar and wayfinder, then focus it.
function scrollToTradition(id: string, smooth: boolean) {
  const h = document.getElementById('trad-' + id);
  if (!h) return;
  const bars = barsBottom();
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: h.getBoundingClientRect().top + window.scrollY - bars - 24, behavior: smooth && !reduce ? 'smooth' : 'auto' });
  h.focus({ preventScroll: true });
}

export default function Region({ region }: { region: R }) {
  const r = REGIONS.find((x) => x.id === region)!;
  useEscape(() => navigate({ name: 'home' }));
  // A tradition in the breadcrumb (?t=cn, ?t=ea, ?t=in, ?t=gr, ?t=ia) points at its section of this page.
  useEffect(() => {
    const m = location.hash.match(/t=(cn|ea|in|gr|ia)/);
    if (!m) return;
    const t = window.setTimeout(() => scrollToTradition(m[1], false), 0);
    return () => window.clearTimeout(t);
  }, []);
  // The pinned list of traditions sits at the same height as a heading scrolled into view.
  useEffect(() => {
    const fit = () => {
      const nav = document.querySelector<HTMLElement>('.trad-nav');
      if (nav) nav.style.setProperty('--trad-nav-top', barsBottom() + 24 + 'px');
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <main id="main" tabIndex={-1} className={'pg pg-region pg-region--' + region}>
      <TopBar />
      <Wayfinder page="region" region={region} />
      <div className="pg-body">
        <header className="pg-head">
          <p className="kicker">
            <span className="kicker-no">{REGION_NO[region]}</span> 入口 · {r.en}
          </p>
          <h1>{r.title}</h1>
          <p className="lede">
            {r.line}。<span className="lede-stat">{r.stat}</span>
          </p>
        </header>

        {region === 'history' && (
          <div className="region-cols">
            <section className="trad-nav">
              <h2 className="sec-h">七个传统</h2>
              <ol className="trad-list">
                {TRADITIONS.map((t, i) => {
                  const cells = (
                    <>
                      <span className="tl-no">{String(i + 1).padStart(2, '0')}</span>
                      <span className="tl-name">{t.name}</span>
                      <span className="tl-count">{t.count} 门</span>
                    </>
                  );
                  return t.id in TRADITION_NAME ? (
                    <li key={t.id} className="is-here">
                      <a
                        className="tl-link"
                        href={`#/region/history?t=${t.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          history.replaceState(history.state, '', `#/region/history?t=${t.id}`);
                          scrollToTradition(t.id, true);
                        }}
                      >
                        {cells}
                      </a>
                    </li>
                  ) : (
                    <li key={t.id}>{cells}</li>
                  );
                })}
              </ol>
              <p className="pg-note">原型展开「希腊与罗马」「中国」「印度」「伊斯兰、阿拉伯与犹太」和「欧洲与北大西洋」五个传统。</p>
            </section>
            <section>
              <h2 className="sec-h" id="trad-gr" tabIndex={-1}>希腊与罗马哲学 · 4 门课</h2>
              <CourseTable codes={UNITS.filter((u) => /^GR\d/.test(u.code)).map((u) => u.code)} />
              <h2 className="sec-h" id="trad-cn" tabIndex={-1}>中国哲学 · 8 门课</h2>
              <CourseTable codes={COURSES.filter((c) => c.tradition === 'cn').map((c) => c.code)} />
              <h2 className="sec-h" id="trad-in" tabIndex={-1}>印度哲学 · 8 门课</h2>
              <CourseTable codes={UNITS.filter((u) => /^IN\d/.test(u.code)).map((u) => u.code)} />
              <h2 className="sec-h" id="trad-ia" tabIndex={-1}>伊斯兰、阿拉伯与犹太哲学 · 6 门课</h2>
              <CourseTable codes={UNITS.filter((u) => /^(IA\d|JW1)$/.test(u.code)).map((u) => u.code)} />
              <h2 className="sec-h" id="trad-ea" tabIndex={-1}>欧洲与北大西洋哲学 · 12 门课</h2>
              <CourseTable codes={UNITS.filter((u) => /^EA\d/.test(u.code)).map((u) => u.code)} />
            </section>
          </div>
        )}
        {region === 'dialogue' && (
          <section>
            <h2 className="sec-h">比较、当代与独立研究课</h2>
            <CourseTable codes={COURSES.filter((c) => c.domain === 'D').map((c) => c.code)} />
          </section>
        )}
        {region === 'methods' && (
          <div className="region-cols">
            <section>
              <h2 className="sec-h">方法课</h2>
              <CourseTable codes={COURSES.filter((c) => c.domain === 'A').map((c) => c.code)} />
            </section>
            <section>
              <h2 className="sec-h">每门课的方法重点</h2>
              <ul className="method-list">
                {METHOD_FOCI.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p className="pg-note">例：《孔子、孟子与荀子》的方法重点是“跨译本分析厚概念，比较对立的人性理论”。</p>
            </section>
          </div>
        )}
        <p className="pg-note">本区域只展示课程结构；可阅读的内容目前有{Object.values(PUBLISHED).map((c) => `《${c.name}》`).join('')}。按 Esc 回到总览。</p>
      </div>
    </main>
  );
}

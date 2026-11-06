import { navigate, type Route } from '../router';
import { setMotion, useMotion, type Crumb } from '../state/store';
import { openSearch } from './SearchPalette';

/** Brand, search and motion controls shared by the exploration views. */
export function TopBar({ crumbs }: { crumbs?: Crumb[] }) {
  const motion = useMotion();
  return (
    <header className="topbar">
      <button className="brand" onClick={() => navigate({ name: 'home' })} aria-label="PhiloPilot 首页">
        <span className="brand-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="brand-name">PhiloPilot</span>
        <span className="brand-sub">哲学的经纬</span>
      </button>
      {crumbs && crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}
      <div className="topbar-tools">
        <button className="tool tool-search" onClick={openSearch} aria-keyshortcuts="Control+K">
          <SearchIcon />
          <span>搜索课程、问题与章节</span>
          <kbd>Ctrl K</kbd>
        </button>
        <button
          className="tool tool-motion"
          aria-pressed={motion === 'reduced'}
          onClick={() => setMotion(motion === 'full' ? 'reduced' : 'full')}
          title="切换动效强度（默认跟随系统的“减少动态效果”设置）"
        >
          <span className={'motion-dot' + (motion === 'full' ? ' on' : '')} aria-hidden="true" />
          动效：{motion === 'full' ? '完整' : '减弱'}
        </button>
      </div>
    </header>
  );
}

export function Breadcrumb({ crumbs, tone = 'dark' }: { crumbs: Crumb[]; tone?: 'dark' | 'paper' }) {
  return (
    <nav className={'crumbs crumbs--' + tone} aria-label="当前位置">
      <ol>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.hash + i} style={{ ['--i' as string]: i }}>
              {last ? (
                <span aria-current="location">{c.label}</span>
              ) : (
                <a
                  href={c.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    history.pushState(null, '', c.hash);
                    window.dispatchEvent(new HashChangeEvent('hashchange'));
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

export const HOME_CRUMB: Crumb = { label: '首页', hash: '#/' };
export const QUESTIONS_CRUMB: Crumb = { label: '哲学问题', hash: '#/questions' };
export const TOPIC_CRUMB: Crumb = { label: '人性与道德', hash: '#/questions/human-nature' };

export function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export const go = (r: Route) => navigate(r);

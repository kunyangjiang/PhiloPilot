import { useEffect } from 'react';
import { navigate } from '../router';
import { setMotion, setStyle, STYLES, useMotion, useStyle, type Crumb } from '../state/store';
import { openSearch } from './SearchPalette';

/** Masthead: brand, breadcrumb, search, style switcher and motion switch. */
export function TopBar({ crumbs }: { crumbs?: Crumb[] }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => navigate({ name: 'home' })} aria-label="PhiloPilot 首页">
        <span className="brand-mark" aria-hidden="true" />
        <span className="brand-name">PhiloPilot</span>
      </button>
      {crumbs && crumbs.length > 1 ? <Breadcrumb crumbs={crumbs} /> : <span className="topbar-fill" />}
      <div className="topbar-tools">
        <button className="tool tool-search" onClick={openSearch} aria-keyshortcuts="Control+K">
          <span>搜索</span>
          <kbd>Ctrl K</kbd>
        </button>
        <StyleSwitch />
        <MotionSwitch />
      </div>
    </header>
  );
}

export function StyleSwitch() {
  const style = useStyle();
  return (
    <div className="switch" role="radiogroup" aria-label="视觉风格">
      <span className="switch-label" aria-hidden="true">
        风格
      </span>
      {STYLES.map((s) => (
        <button
          key={s.id}
          role="radio"
          aria-checked={style === s.id}
          className={style === s.id ? 'on' : ''}
          title={s.note}
          onClick={() => setStyle(s.id)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

export function MotionSwitch() {
  const motion = useMotion();
  return (
    <div className="switch" role="radiogroup" aria-label="动效（默认跟随系统“减少动态效果”设置）">
      <span className="switch-label" aria-hidden="true">
        动效
      </span>
      <button role="radio" aria-checked={motion === 'subtle'} className={motion === 'subtle' ? 'on' : ''} onClick={() => setMotion('subtle')}>
        轻微
      </button>
      <button role="radio" aria-checked={motion === 'none'} className={motion === 'none' ? 'on' : ''} onClick={() => setMotion('none')}>
        关闭
      </button>
    </div>
  );
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="当前位置">
      <ol>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.hash + i}>
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


/** Escape goes one level up, unless the search palette or a dialog is open. */
export function useEscape(fn: () => void) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !e.defaultPrevented && !document.querySelector('.palette, .dg-overlay')) fn();
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });
}

/** Explicit, honest marker for anything that is not built in this prototype. */
export function NotBuilt({ children = '原型未实现' }: { children?: string }) {
  return <span className="not-built">{children}</span>;
}

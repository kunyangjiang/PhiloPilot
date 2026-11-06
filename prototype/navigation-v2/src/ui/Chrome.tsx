import { useEffect } from 'react';
import { navigate } from '../router';
import { openSearch } from './SearchPalette';

/** Masthead: the PhiloPilot identity and search. Where the learner is, and the
 *  way back, is shown by the level bar (Wayfinder) directly below it. */
export function TopBar() {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => navigate({ name: 'home' })} aria-label="PhiloPilot 首页">
        <span className="brand-mark" aria-hidden="true" />
        <span className="brand-name">PhiloPilot</span>
        <span className="brand-sub">哲学课程</span>
      </button>
      <button className="tool-search" onClick={openSearch} aria-keyshortcuts="Control+K /" aria-label="搜索课程与章节">
        <span className="ts-icon" aria-hidden="true" />
        <span className="ts-text">搜索课程与章节</span>
        <span className="ts-short" aria-hidden="true">
          搜索
        </span>
        <kbd>Ctrl K</kbd>
      </button>
    </header>
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

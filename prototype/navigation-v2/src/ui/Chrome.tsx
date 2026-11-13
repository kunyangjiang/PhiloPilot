import { useEffect } from 'react';
import { navigate } from '../router';
import { openSearch } from './SearchPalette';
import '../styles/cases.css';

/** Masthead: the PhiloPilot identity and search. Where the learner is, and the
 *  way back, is shown by the level bar (Wayfinder) directly below it. */
export function TopBar() {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => navigate({ name: 'home' })} aria-label="PhiloPilot 首页">
        {/* The four entrances of the home page in one mark: yellow square
            (历史与传统), red circle (哲学问题), blue triangle (跨传统对话),
            black bar (哲学方法). */}
        <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="0" y="0" width="11" height="11" fill="var(--c-history)" />
          <circle cx="18.5" cy="5.5" r="5.5" fill="var(--c-questions)" />
          <path d="M5.5 13 L11 24 L0 24 Z" fill="var(--c-dialogue)" />
          <rect x="13" y="16" width="11" height="4" fill="var(--c-methods)" />
        </svg>
        <span className="brand-name">PhiloPilot</span>
        <span className="brand-sub">哲学课程</span>
      </button>
      {/* PhiloPilot Cases: a separate section, not part of the curriculum. */}
      <a className="topbar-cases" href="#/cases" aria-current={location.hash.startsWith('#/cases') ? 'page' : undefined}>
        <span className="tc-t">哲学案例</span>
        {/* Four-colour rule in the entrance colours, as in the 四格 mark. */}
        <span className="tc-rule" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </a>
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

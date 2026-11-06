import { useEffect, useId, useRef, useState } from 'react';
import { isReduced } from '../state/store';

// Mermaid diagrams from the draft, rendered on demand with a paper theme.
// Mermaid is loaded lazily so it never weighs on the exploration views.

let mermaidPromise: Promise<typeof import('mermaid').default> | null = null;
function loadMermaid() {
  if (!mermaidPromise)
    mermaidPromise = import('mermaid').then((m) => {
      m.default.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        fontFamily: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", serif',
        themeVariables: {
          background: 'transparent',
          primaryColor: '#fbf7ee',
          primaryBorderColor: '#a8875a',
          primaryTextColor: '#2a2520',
          lineColor: '#8a7356',
          secondaryColor: '#f1e8d6',
          tertiaryColor: '#f6f0e3',
          clusterBkg: 'rgba(196,160,104,0.08)',
          clusterBorder: '#cdb58c',
          edgeLabelBackground: '#f7f2e8',
          fontSize: '15px',
        },
        flowchart: { curve: 'basis', padding: 14, nodeSpacing: 34, rankSpacing: 44, htmlLabels: true },
      });
      return m.default;
    });
  return mermaidPromise;
}

export default function Diagram({ code, index }: { code: string; index: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState<string>('');
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(false);
  const inlineRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let alive = true;
    loadMermaid()
      .then((m) => m.render(`mmd-${uid}`, code))
      .then((r) => alive && setSvg(r.svg))
      .catch(() => alive && setErr(true));
    return () => {
      alive = false;
    };
  }, [code, uid]);

  // Expansion: FLIP from the inline figure, then reveal nodes in reading order once.
  useEffect(() => {
    if (!open || !bigRef.current || !inlineRef.current) return;
    const big = bigRef.current;
    const from = inlineRef.current.getBoundingClientRect();
    const to = big.getBoundingClientRect();
    const closeBtn = big.parentElement?.querySelector<HTMLButtonElement>('.dg-close');
    closeBtn?.focus();
    if (!isReduced()) {
      big.animate(
        [
          {
            transform: `translate(${from.left + from.width / 2 - (to.left + to.width / 2)}px, ${from.top + from.height / 2 - (to.top + to.height / 2)}px) scale(${from.width / to.width})`,
            opacity: 0.6,
          },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' },
      );
      big.querySelectorAll('.node, .cluster').forEach((n, i) =>
        (n as HTMLElement).animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], {
          duration: 380,
          delay: 360 + i * 70,
          easing: 'ease-out',
          fill: 'backwards',
        }),
      );
      big.querySelectorAll('.edgePath path, .flowchart-link').forEach((p, i) => {
        const path = p as SVGPathElement;
        const len = path.getTotalLength?.() ?? 200;
        path.animate([{ strokeDasharray: `${len}`, strokeDashoffset: `${len}` }, { strokeDasharray: `${len}`, strokeDashoffset: '0' }], {
          duration: 520,
          delay: 480 + i * 60,
          easing: 'ease-in-out',
          fill: 'backwards',
        });
      });
    }
    const k = (e: KeyboardEvent) => e.key === 'Escape' && (e.stopPropagation(), setOpen(false));
    window.addEventListener('keydown', k, true);
    return () => window.removeEventListener('keydown', k, true);
  }, [open]);

  useEffect(() => {
    if (!open) btnRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <figure className="diagram">
      <div className="dg-frame" ref={inlineRef}>
        <span className="dg-label">图 {index} · 本章教学整理</span>
        {err ? (
          <pre className="dg-fallback">{code}</pre>
        ) : svg ? (
          <div className="dg-svg" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="dg-loading">正在绘制图示…</div>
        )}
        {svg && (
          <button ref={btnRef} className="dg-expand" onClick={() => setOpen(true)}>
            展开图示 ⤢
          </button>
        )}
      </div>
      {open && (
        <div className="dg-overlay" role="dialog" aria-modal="true" aria-label={`图 ${index}（展开）`} onClick={() => setOpen(false)}>
          <div className="dg-big" ref={bigRef} onClick={(e) => e.stopPropagation()}>
            <div className="dg-big-head">
              <span>图 {index} · 本章教学整理（按论证顺序逐步显示）</span>
              <button className="dg-close" onClick={() => setOpen(false)}>
                收起（Esc）
              </button>
            </div>
            <div className="dg-svg dg-svg--big" dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        </div>
      )}
    </figure>
  );
}

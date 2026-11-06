import { useEffect, useId, useRef, useState } from 'react';
import { useStyle, type StyleId } from '../state/store';

// Mermaid diagrams from the draft, drawn flat in the current style's ink and
// paper colours. Mermaid is loaded lazily, only when a diagram is on screen.

const THEMES: Record<StyleId, { font: string; vars: Record<string, string> }> = {
  swiss: {
    font: '"Noto Sans SC", Arial, sans-serif',
    vars: { primaryColor: '#ffffff', primaryBorderColor: '#111111', primaryTextColor: '#111111', lineColor: '#111111', secondaryColor: '#f2f2ee', tertiaryColor: '#f7f7f4', clusterBkg: '#f2f2ee', clusterBorder: '#111111', edgeLabelBackground: '#ffffff' },
  },
  transit: {
    font: '"Jost", "Noto Sans SC", sans-serif',
    vars: { primaryColor: '#ffffff', primaryBorderColor: '#1d2a44', primaryTextColor: '#1d2a44', lineColor: '#2f6fd6', secondaryColor: '#eef2f8', tertiaryColor: '#f4f6fa', clusterBkg: '#eef2f8', clusterBorder: '#1d2a44', edgeLabelBackground: '#ffffff' },
  },
  catalogue: {
    font: '"Courier Prime", "Noto Serif SC", monospace',
    vars: { primaryColor: '#fbf6e8', primaryBorderColor: '#3a3326', primaryTextColor: '#2b261c', lineColor: '#3a3326', secondaryColor: '#f1e8d2', tertiaryColor: '#f6efdc', clusterBkg: '#f1e8d2', clusterBorder: '#8a7a5a', edgeLabelBackground: '#fbf6e8' },
  },
};

type Mermaid = typeof import('mermaid').default;
let mermaidPromise: Promise<Mermaid> | null = null;
let queue: Promise<unknown> = Promise.resolve();
function render(id: string, code: string, style: StyleId): Promise<string> {
  if (!mermaidPromise) mermaidPromise = import('mermaid').then((m) => m.default);
  // Renders are serialised because each one re-initialises the theme.
  const job = queue.then(() =>
    mermaidPromise!.then((m) => {
      const t = THEMES[style];
      m.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        fontFamily: t.font,
        themeVariables: { background: 'transparent', fontSize: '15px', ...t.vars },
        flowchart: { curve: 'linear', padding: 14, nodeSpacing: 34, rankSpacing: 44, htmlLabels: true },
      });
      return m.render(id, code).then((r) => r.svg);
    }),
  );
  queue = job.catch(() => undefined);
  return job;
}

export default function Diagram({ code, index }: { code: string; index: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const style = useStyle();
  const [svg, setSvg] = useState('');
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let alive = true;
    render(`mmd-${uid}-${style}`, code, style)
      .then((s) => alive && setSvg(s))
      .catch(() => alive && setErr(true));
    return () => {
      alive = false;
    };
  }, [code, uid, style]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        btnRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', k, true);
    return () => window.removeEventListener('keydown', k, true);
  }, [open]);

  return (
    <figure className="diagram">
      <figcaption className="dg-label">
        <span>图 {index} · 本章教学整理</span>
        {svg && (
          <button ref={btnRef} className="dg-expand" onClick={() => setOpen(true)}>
            放大
          </button>
        )}
      </figcaption>
      {err ? <pre className="dg-fallback">{code}</pre> : svg ? <div className="dg-svg" dangerouslySetInnerHTML={{ __html: svg }} /> : <div className="dg-loading">正在绘制图示……</div>}
      {open && (
        <div
          className="dg-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`图 ${index}（放大）`}
          onClick={() => {
            setOpen(false);
            btnRef.current?.focus({ preventScroll: true });
          }}
        >
          <div className="dg-big" onClick={(e) => e.stopPropagation()}>
            <div className="dg-big-head">
              <span>图 {index} · 本章教学整理</span>
              <button
                ref={closeRef}
                className="dg-close"
                onClick={() => {
                  setOpen(false);
                  btnRef.current?.focus({ preventScroll: true });
                }}
              >
                关闭（Esc）
              </button>
            </div>
            <div className="dg-svg dg-svg--big" dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        </div>
      )}
    </figure>
  );
}

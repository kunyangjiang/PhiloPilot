import { useEffect, useId, useRef, useState } from 'react';
// Mermaid diagrams from the draft, drawn flat in the Swiss ink and paper
// colours. Mermaid is loaded lazily, only when a diagram is on screen.

const THEME = {
  font: '"Noto Sans SC", Arial, sans-serif',
  vars: { primaryColor: '#ffffff', primaryBorderColor: '#111111', primaryTextColor: '#111111', lineColor: '#111111', secondaryColor: '#f2f2ee', tertiaryColor: '#f7f7f4', clusterBkg: '#f2f2ee', clusterBorder: '#111111', edgeLabelBackground: '#ffffff' },
};

/** Overlay zoom steps; 0 = fit to the screen, otherwise a width multiple. */
const ZOOMS = [1, 1.5, 2, 3, 4];

type Mermaid =typeof import('mermaid').default;
let mermaidPromise: Promise<Mermaid> | null = null;
let queue: Promise<unknown> = Promise.resolve();
function render(id: string, code: string): Promise<string> {
  if (!mermaidPromise) mermaidPromise = import('mermaid').then((m) => m.default);
  // Renders are serialised: mermaid keeps global state while it renders.
  const job = queue.then(() =>
    mermaidPromise!.then((m) => {
      const t = THEME;
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
  const [svg, setSvg] = useState('');
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let alive = true;
    render(`mmd-${uid}`, code)
      .then((s) => alive && setSvg(s))
      .catch(() => alive && setErr(true));
    return () => {
      alive = false;
    };
  }, [code, uid]);

  useEffect(() => {
    if (!open) return;
    setZoom(0);
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
              <span className="dg-big-t">图 {index}</span>
              <span className="dg-zoom" role="group" aria-label="缩放">
                <button onClick={() => setZoom((z) => Math.max(0, z - 1))} disabled={zoom === 0} aria-label="缩小">
                  −
                </button>
                <span className="dg-zoom-v" aria-live="polite">
                  {zoom === 0 ? '适合屏幕' : `${ZOOMS[zoom] * 100}%`}
                </span>
                <button onClick={() => setZoom((z) => Math.min(ZOOMS.length - 1, z + 1))} disabled={zoom === ZOOMS.length - 1} aria-label="放大">
                  +
                </button>
              </span>
              <button
                ref={closeRef}
                className="dg-close"
                onClick={() => {
                  setOpen(false);
                  btnRef.current?.focus({ preventScroll: true });
                }}
              >
                关闭<span className="dg-esc">（Esc）</span>
              </button>
            </div>
            <div className="dg-pan">
              <div
                className={'dg-svg dg-svg--big' + (zoom > 0 ? ' is-zoomed' : '')}
                style={zoom > 0 ? { width: `${ZOOMS[zoom] * 100}%` } : undefined}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
            {zoom > 0 && <p className="dg-pan-hint">拖动或滑动查看图的其他部分</p>}
          </div>
        </div>
      )}
    </figure>
  );
}

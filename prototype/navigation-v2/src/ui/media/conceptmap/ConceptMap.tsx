import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import { KIND_EXPLAIN, KIND_LABEL, KIND_SHORT, type LinkKind, type MapConfig, type MapLink } from './types';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import './conceptmap.css';

// The shared concept map. The same component is placed in both courses with
// its own data (data-cn5.ts, data-cn6.ts) and its own saved state. Nodes are
// people, texts and schools; links are typed as documented influence or
// response, documented contact, or a comparison made for teaching. The kind is
// shown three ways: line style (solid / dashed / dotted), arrowheads (only a
// documented response has a direction), and the written label in the list.
// The drawing is a picture of the list below it: every node is chosen with an
// ordinary button, so the map works with keyboard, touch and screen readers.

const KINDS: LinkKind[] = ['response', 'contact', 'comparison'];
const W = 176; // column width
const NW = 152; // node width
const NH = 46; // node height
const RH = 62; // row height
const TOP = 34;

interface Saved {
  sel: string;
  show: Record<LinkKind, boolean>;
}

export default function ConceptMap({ cfg }: { cfg: MapConfig }) {
  const init: Saved = { sel: cfg.start, show: { response: true, contact: true, comparison: true } };
  const [st, setSt] = useState<Saved>(() => {
    const s = getMedia<Partial<Saved>>(cfg.code, cfg.id, init);
    const sel = cfg.nodes.some((n) => n.id === s.sel) ? (s.sel as string) : init.sel;
    return { sel, show: { ...init.show, ...(s.show ?? {}) } };
  });
  const save = (next: Saved) => {
    setSt(next);
    setMedia(cfg.code, cfg.id, next);
  };

  const byId = new Map(cfg.nodes.map((n) => [n.id, n]));
  const rows = Math.max(...cfg.nodes.map((n) => n.row)) + 1;
  const width = cfg.cols.length * W;
  const height = TOP + rows * RH;
  const pos = (id: string) => {
    const n = byId.get(id)!;
    return { x: n.col * W + (W - NW) / 2, y: TOP + n.row * RH };
  };
  const visible = cfg.links.filter((l) => st.show[l.kind]);
  const mine = (l: MapLink) => l.from === st.sel || l.to === st.sel;
  const selNode = byId.get(st.sel);
  const selLinks = visible.filter(mine);
  const hidden = cfg.links.filter((l) => mine(l) && !st.show[l.kind]).length;
  const counts = Object.fromEntries(KINDS.map((k) => [k, cfg.links.filter((l) => l.kind === k).length])) as Record<LinkKind, number>;

  // Edge geometry: from the right side of the earlier node to the left side of
  // the later one; within one column, a bow on the right.
  const path = (l: MapLink) => {
    const a = pos(l.from);
    const b = pos(l.to);
    const fa = byId.get(l.from)!;
    const fb = byId.get(l.to)!;
    if (fa.col === fb.col) {
      const x = a.x + NW;
      const y1 = a.y + NH / 2;
      const y2 = b.y + NH / 2;
      const bow = 20 + Math.abs(fb.row - fa.row) * 6;
      return { d: `M${x},${y1} C${x + bow},${y1} ${x + bow},${y2} ${x},${y2}`, mx: x + bow * 0.75, my: (y1 + y2) / 2 };
    }
    const [p, q] = fa.col < fb.col ? [a, b] : [b, a];
    const x1 = p.x + NW;
    const y1 = p.y + NH / 2;
    const x2 = q.x;
    const y2 = q.y + NH / 2;
    const cx = (x1 + x2) / 2;
    return { d: `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`, mx: cx, my: (y1 + y2) / 2 };
  };
  // A documented response points from the earlier to the later node.
  const arrowEnd = (l: MapLink) => l.kind === 'response' && byId.get(l.from)!.col <= byId.get(l.to)!.col;
  const arrowStart = (l: MapLink) => l.kind === 'response' && byId.get(l.from)!.col > byId.get(l.to)!.col;

  return (
    <section className="md cm" aria-labelledby={`${cfg.id}-title`}>
      <header className="md-head">
        <p className="md-tag">概念地图 · 两门课共用</p>
        <h3 id={`${cfg.id}-title`} className="md-title">
          {cfg.title}
        </h3>
        <p className="md-lede">{cfg.lede}</p>
      </header>

      <fieldset className="cm-kinds">
        <legend className="g4-k">三种联系（可以分别隐藏）</legend>
        {KINDS.map((k) => (
          <label key={k} className={`cm-kind cm-kind--${k}`}>
            <input type="checkbox" checked={st.show[k]} onChange={() => save({ ...st, show: { ...st.show, [k]: !st.show[k] } })} />
            <svg width="40" height="12" aria-hidden="true">
              <line x1="2" y1="6" x2="38" y2="6" className={`cm-line cm-line--${k}`} />
            </svg>
            <span>
              <strong>{KIND_LABEL[k]}</strong>（{counts[k]}）<br />
              <small>{KIND_EXPLAIN[k]}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="c2-scroll cm-scroll">
        <svg className="cm-svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">
          <defs>
            <marker id={`${cfg.id}-arr`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="cm-arrow" />
            </marker>
          </defs>
          {cfg.cols.map((c, i) => (
            <g key={c}>
              {i > 0 && <line x1={i * W} y1={0} x2={i * W} y2={height} className="cm-colrule" />}
              <text x={i * W + 8} y={16} className="cm-coltext">
                {c}
              </text>
            </g>
          ))}
          {visible.map((l, i) => {
            const g = path(l);
            const on = mine(l);
            return (
              <g key={i} className={'cm-edge' + (on ? ' is-on' : ' is-dim')}>
                <path
                  d={g.d}
                  className={`cm-line cm-line--${l.kind}`}
                  markerEnd={arrowEnd(l) ? `url(#${cfg.id}-arr)` : undefined}
                  markerStart={arrowStart(l) ? `url(#${cfg.id}-arr)` : undefined}
                />
              </g>
            );
          })}
          {cfg.nodes.map((n) => {
            const p = pos(n.id);
            const on = n.id === st.sel;
            const linked = !on && visible.some((l) => mine(l) && (l.from === n.id || l.to === n.id));
            return (
              <g key={n.id} className={'cm-node' + (on ? ' is-sel' : linked ? ' is-linked' : '')} onClick={() => save({ ...st, sel: n.id })}>
                <rect x={p.x} y={p.y} width={NW} height={NH} />
                <text x={p.x + 8} y={p.y + 18} className="cm-nlabel">
                  {n.label}
                </text>
                <text x={p.x + 8} y={p.y + 36} className="cm-nsub">
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="md-note">图可以左右滚动。点图中的方框，或者用下面的按钮选择一个人物或文本。</p>

      <div className="cm-pick" role="group" aria-label="选择人物或文本">
        {cfg.cols.map((c, ci) => (
          <div key={c} className="cm-pick-col">
            <p className="g4-k">{c}</p>
            {cfg.nodes
              .filter((n) => n.col === ci)
              .sort((a, b) => a.row - b.row)
              .map((n) => (
                <button key={n.id} type="button" className={'cm-pick-btn' + (n.id === st.sel ? ' is-on' : '')} aria-pressed={n.id === st.sel} onClick={() => save({ ...st, sel: n.id })}>
                  {n.label}
                </button>
              ))}
          </div>
        ))}
      </div>

      {selNode && (
        <div className="md-feedback" aria-live="polite">
          <p className="md-fb-k">
            {selNode.label}：{selNode.sub}
          </p>
          <p className="md-muted">本课读到它的地方：{selNode.where}</p>
          {selLinks.length === 0 ? (
            <p>{hidden ? `它的 ${hidden} 条联系属于目前隐藏的种类。` : '图中没有为它画出联系。'}</p>
          ) : (
            <ul className="cm-list">
              {selLinks.map((l, i) => {
                const other = byId.get(l.from === st.sel ? l.to : l.from)!;
                return (
                  <li key={i} className={`cm-li cm-li--${l.kind}`}>
                    <span className="cm-badge">{KIND_SHORT[l.kind]}</span>
                    <strong>
                      {l.kind === 'response' ? `${byId.get(l.from)!.label} → ${byId.get(l.to)!.label}` : `${selNode.label} ↔ ${other.label}`}
                    </strong>
                    <span className="cm-li-k">{KIND_LABEL[l.kind]}</span>
                    <span>{l.note}</span>
                  </li>
                );
              })}
            </ul>
          )}
          {hidden > 0 && selLinks.length > 0 && <p className="md-muted">另有 {hidden} 条联系属于目前隐藏的种类。</p>}
        </div>
      )}

      <div className="c4-limits">
        <p className="c3-layer-k">读这张图时请注意</p>
        <p>这不是一条传承的谱系。图中只画了本课正文讨论过的联系；没有画线，不等于两者没有关系，只是本课没有讨论或没有证据。</p>
        <p>"比较"一类的线是本课为了教学而作的并列，它说明两种说法在结构上可以对照，不说明谁来自谁。</p>
        <p>{cfg.caution}</p>
      </div>

      <button type="button" className="md-reset" onClick={() => save(init)}>
        重新开始
      </button>
    </section>
  );
}

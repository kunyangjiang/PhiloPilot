import MarkdownIt from 'markdown-it';
// The real course draft, read-only, bundled as raw text. Nothing is rewritten:
// the prototype only splits it into sections and blocks for presentation.
import raw from '@content/CN1_SAMPLE_DRAFT.md?raw';

const md = new MarkdownIt({ html: false, linkify: true, typographer: false });
type Token = ReturnType<typeof md.parse>[number];

export type Block =
  | { kind: 'html'; html: string; tag: string; text: string }
  | { kind: 'heading'; level: 3; id: string; text: string; html: string }
  | { kind: 'source'; html: string; cite: string; text: string }
  | { kind: 'exercise'; id: string; title: string; promptHtml: string; hintHtml: string; text: string }
  | { kind: 'diagram'; code: string; text: string }
  | { kind: 'callout'; html: string; text: string };

export interface Section {
  index: number;
  title: string;
  blocks: Block[];
  headings: { id: string; text: string; block: number }[];
  chars: number;
}

// ── Footnotes ────────────────────────────────────────────────────────────────
const lines = raw.replace(/\r\n/g, '\n').split('\n');
export const FOOTNOTES: Record<string, string> = {};
const body: string[] = [];
for (const l of lines) {
  const m = l.match(/^\[\^(\d+)\]:\s*(.*)$/);
  if (m) FOOTNOTES[m[1]] = md.renderInline(m[2]);
  else body.push(l);
}

const FN_TOKEN = (n: string) => `⁣FN${n}⁣`;
const withFnButtons = (html: string) =>
  html.replace(/⁣FN(\d+)⁣/g, (_, n) => `<button type="button" class="fn-ref" data-fn="${n}" aria-expanded="false" aria-label="注释 ${n}">${n}</button>`);

// ── Title, subtitle and status (front matter of the draft) ───────────────────
const firstH2 = body.findIndex((l) => l.startsWith('## '));
const front = body.slice(0, firstH2);
export const TITLE = (front.find((l) => l.startsWith('# ')) ?? '').replace(/^#\s+/, '').replace(/^CN1[\s　]+/, '');
export const SUBTITLE = (front.find((l) => /^\*[^*]/.test(l)) ?? '').replace(/^\*|\*$/g, '');
export const STATUS_HTML = md.render(front.filter((l) => l.startsWith('>')).join('\n'));

// ── Sections (split on "## ") ────────────────────────────────────────────────
const chunks: { title: string; lines: string[] }[] = [];
for (const l of body.slice(firstH2)) {
  if (l.startsWith('## ')) chunks.push({ title: l.slice(3).trim(), lines: [] });
  else if (chunks.length) chunks[chunks.length - 1].lines.push(l);
}

const plain = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function toBlocks(src: string, sIndex: number, headings: Section['headings']): Block[] {
  const tokens = md.parse(src.replace(/\[\^(\d+)\]/g, (_, n) => FN_TOKEN(n)), {});
  const groups: Token[][] = [];
  let cur: Token[] = [];
  let depth = 0;
  for (const t of tokens) {
    cur.push(t);
    depth += t.nesting;
    if (depth === 0) {
      groups.push(cur);
      cur = [];
    }
  }
  const out: Block[] = [];
  let ex = 0;
  for (const g of groups) {
    const first = g[0];
    const render = () => withFnButtons(md.renderer.render(g, md.options, {}));
    if (first.type === 'heading_open' && first.tag === 'h3') {
      const text = g[1].content.replace(/⁣FN\d+⁣/g, '');
      const id = `s${sIndex}-h${headings.length}`;
      headings.push({ id, text, block: out.length });
      out.push({ kind: 'heading', level: 3, id, text, html: withFnButtons(md.renderInline(g[1].content)) });
      continue;
    }
    if (first.type === 'fence' && first.info.trim() === 'mermaid') {
      out.push({ kind: 'diagram', code: first.content, text: '' });
      continue;
    }
    if (first.type === 'hr') continue;
    if (first.type === 'blockquote_open') {
      const html = render();
      const text = plain(html);
      if (text.startsWith('想一想')) {
        // Exercise: first paragraph(s) are the prompt, paragraphs that begin with
        // “提示” are the hint. Both are the draft's own text.
        const inner = g.slice(1, -1);
        const paras: Token[][] = [];
        let p: Token[] = [];
        let d = 0;
        for (const t of inner) {
          p.push(t);
          d += t.nesting;
          if (d === 0) {
            paras.push(p);
            p = [];
          }
        }
        const isHint = (pp: Token[]) => plain(md.renderer.render(pp, md.options, {})).startsWith('提示');
        const prompt = paras.filter((pp) => !isHint(pp));
        const hint = paras.filter(isHint);
        const promptHtml = withFnButtons(prompt.map((pp) => md.renderer.render(pp, md.options, {})).join(''));
        const titleMatch = text.match(/^(想一想[^。：:]*[：:]?[^。]*。)/);
        out.push({
          kind: 'exercise',
          id: `cn1-s${sIndex}-ex${ex++}`,
          title: titleMatch ? titleMatch[1] : '想一想',
          promptHtml,
          hintHtml: withFnButtons(hint.map((pp) => md.renderer.render(pp, md.options, {})).join('')),
          text,
        });
        continue;
      }
      const cite = text.match(/（(《[^（）]*》[^（）]*)）\s*$/);
      if (cite && /[「」]|曰|也/.test(text)) {
        out.push({ kind: 'source', html: html.replace(/（《[^（）]*》[^（）]*）\s*(<\/p>\s*<\/blockquote>\s*)$/, '$1'), cite: cite[1], text });
        continue;
      }
      out.push({ kind: 'callout', html, text });
      continue;
    }
    const html = render();
    out.push({ kind: 'html', html, tag: first.tag || first.type, text: plain(html) });
  }
  return out;
}

export const SECTIONS: Section[] = chunks.map((ch, i) => {
  const headings: Section['headings'] = [];
  let src = ch.lines.join('\n');
  if (ch.title === '注释') {
    // Show the note definitions in the notes section itself.
    src += '\n\n' + Object.keys(FOOTNOTES).map((n) => `${n}. FNDEF${n}`).join('\n');
  }
  let blocks = toBlocks(src, i, headings);
  if (ch.title === '注释') {
    blocks = blocks.map((b) =>
      b.kind === 'html' ? { ...b, html: b.html.replace(/FNDEF(\d+)/g, (_, n) => `<span id="fn-def-${n}">${FOOTNOTES[n]}</span>`) } : b,
    );
  }
  const chars = blocks.reduce((s, b) => s + (b.text?.length ?? 0) + (b.kind === 'diagram' ? 0 : 0), 0);
  return { index: i, title: ch.title, blocks, headings, chars };
});

export const TOTAL_CHARS = SECTIONS.reduce((s, x) => s + x.chars, 0);

/** Short title, e.g. “三、孟子：人性善与扩充” → “孟子：人性善与扩充”. */
export const shortTitle = (t: string) => t.replace(/^[一二三四五六七八九十]+、/, '');

/** Section that opens when entering from the 人性与道德 topic (Mencius). */
export const MENCIUS_SECTION = SECTIONS.findIndex((s) => s.title.startsWith('三、孟子'));

/** The core question and the course summary, taken verbatim from 本章导读. */
const intro = SECTIONS[0]?.blocks ?? [];
export const CORE_QUESTION = (() => {
  const b = intro.find((x) => x.kind === 'html' && x.html.includes('<strong>'));
  const m = b && b.kind === 'html' ? b.html.match(/<strong>(.*?)<\/strong>/) : null;
  return m ? m[1] : '';
})();
export const SUMMARY = (() => {
  const b = intro.find((x) => x.kind === 'html' && x.text.startsWith('孔子、孟子和荀子是'));
  return b ? b.text : '';
})();

import MarkdownIt from 'markdown-it';

// Turns one course manuscript (content/*.md, read-only) into sections and
// blocks for the reader. Nothing is rewritten: the text is only split and
// tagged. Shared by every published course.

const md = new MarkdownIt({ html: false, linkify: true, typographer: false });
type Token = ReturnType<typeof md.parse>[number];

export type Block =
  | { kind: 'html'; html: string; tag: string; text: string }
  | { kind: 'heading'; level: 3; id: string; text: string; html: string }
  /** Chinese classical quotation with its citation (CN1 style). */
  | { kind: 'source'; html: string; cite: string; text: string }
  /** A primary-source passage in the original language, followed by the course's own translation. */
  | { kind: 'primary'; origHtml: string; transHtml: string; text: string }
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

export interface CourseText {
  code: string;
  TITLE: string;
  SUBTITLE: string;
  STATUS_HTML: string;
  FOOTNOTES: Record<string, string>;
  SECTIONS: Section[];
  /** Instructional sections (counted for length and progress). */
  READING: Section[];
  /** Reference appendices (注释, 来源与权利说明): readable, never counted. */
  APPENDIX: Section[];
  isAppendix: (index: number) => boolean;
  /** Position among the instructional parts (1-based), or 0 for an appendix. */
  partNo: (index: number) => number;
  TOTAL_CHARS: number;
  /** The core question and the summary sentence, taken verbatim from the guide section. */
  CORE_QUESTION: string;
  SUMMARY: string;
}

const APPENDIX_TITLES = ['注释', '来源与权利说明'];
/** Text of an HTML fragment as displayed: tags removed, the entities markdown-it writes decoded. */
const htmlText = (s: string) =>
  s.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const plain = (s: string) => htmlText(s).replace(/\s+/g, ' ').trim();
// Footnote references are swapped for a token before markdown-it parses the text.
// The token is wrapped in brackets that Unicode classes as punctuation, so a
// closing ** right after CJK punctuation ("？**[^16]") still closes the bold.
const FN_TOKEN = (n: string) => `⟦FN${n}⟧`;
const withFnButtons = (html: string) =>
  html.replace(/⟦FN(\d+)⟧/g, (_, n) => `<button type="button" class="fn-ref" data-fn="${n}" aria-expanded="false" aria-label="注释 ${n}">${n}</button>`);

/** Short title, e.g. “三、孟子：人性善与扩充” → “孟子：人性善与扩充”. */
export const shortTitle = (t: string) => t.replace(/^[一二三四五六七八九十]+、/, '');

/** Split a blockquote token group into its top-level paragraph groups. */
function paragraphs(g: Token[]): Token[][] {
  const inner = g.slice(1, -1);
  const out: Token[][] = [];
  let p: Token[] = [];
  let d = 0;
  for (const t of inner) {
    p.push(t);
    d += t.nesting;
    if (d === 0) {
      out.push(p);
      p = [];
    }
  }
  return out;
}

export interface ParseOptions {
  /** Prefix of exercise ids (kept stable so saved answers survive). */
  exPrefix: string;
  /** How the summary paragraph of the guide section begins, if the course has one. */
  summaryStart?: string;
  /** Applied to rendered HTML, e.g. to show course names instead of internal codes. */
  displayText?: (html: string) => string;
  /** Treat every blockquote ending in a 《…》 citation as a classical source, even when it
   *  lacks 「」/曰/也 (terse canon lines such as the Later Mohist definitions). */
  citedQuotesAreSources?: boolean;
  /** Citations may name the author before the title: （严复《论世变之亟》）, as in the
   *  modern-period courses. Without this only （《书·篇》） is recognised. */
  authorCites?: boolean;
}

export function parseCourse(code: string, raw: string, opts: ParseOptions): CourseText {
  const show = opts.displayText ?? ((s: string) => s);
  const render = (tokens: Token[]) => show(withFnButtons(md.renderer.render(tokens, md.options, {})));

  // Footnote definitions are collected and removed from the body.
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const FOOTNOTES: Record<string, string> = {};
  const body: string[] = [];
  for (const l of lines) {
    const m = l.match(/^\[\^(\d+)\]:\s*(.*)$/);
    if (m) FOOTNOTES[m[1]] = show(md.renderInline(m[2]));
    else body.push(l);
  }

  // Title, subtitle and status (front matter).
  const firstH2 = body.findIndex((l) => l.startsWith('## '));
  const front = body.slice(0, firstH2);
  const TITLE = (front.find((l) => l.startsWith('# ')) ?? '').replace(/^#\s+/, '').replace(new RegExp(`^${code}[\\s　]+`), '');
  const SUBTITLE = (front.find((l) => /^\*[^*]/.test(l)) ?? '').replace(/^\*|\*$/g, '');
  const STATUS_HTML = show(md.render(front.filter((l) => l.startsWith('>')).join('\n')));

  // Sections (split on “## ”).
  const chunks: { title: string; lines: string[] }[] = [];
  for (const l of body.slice(firstH2)) {
    if (l.startsWith('## ')) chunks.push({ title: l.slice(3).trim(), lines: [] });
    else if (chunks.length) chunks[chunks.length - 1].lines.push(l);
  }

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
      if (first.type === 'heading_open' && first.tag === 'h3') {
        const text = g[1].content.replace(/⟦FN\d+⟧/g, '');
        const id = `s${sIndex}-h${headings.length}`;
        headings.push({ id, text, block: out.length });
        out.push({ kind: 'heading', level: 3, id, text, html: show(withFnButtons(md.renderInline(g[1].content))) });
        continue;
      }
      if (first.type === 'fence' && first.info.trim() === 'mermaid') {
        out.push({ kind: 'diagram', code: first.content, text: '' });
        continue;
      }
      if (first.type === 'hr') continue;
      if (first.type === 'blockquote_open') {
        const html = render(g);
        const text = plain(html);
        const paras = paragraphs(g);
        if (text.startsWith('想一想')) {
          // Exercise: paragraphs beginning with “提示” are the hint, the rest the prompt.
          const isHint = (pp: Token[]) => plain(md.renderer.render(pp, md.options, {})).startsWith('提示');
          const titleMatch = text.match(/^(想一想[^。：:]*[：:]?[^。]*。)/);
          out.push({
            kind: 'exercise',
            id: `${opts.exPrefix}-s${sIndex}-ex${ex++}`,
            title: titleMatch ? titleMatch[1] : '想一想',
            promptHtml: paras.filter((pp) => !isHint(pp)).map(render).join(''),
            hintHtml: paras.filter(isHint).map(render).join(''),
            text,
          });
          continue;
        }
        // Original-language passage + “本章试译：…” translation.
        const ti = paras.findIndex((pp) => plain(md.renderer.render(pp, md.options, {})).startsWith('本章试译'));
        if (ti > 0) {
          out.push({
            kind: 'primary',
            origHtml: paras.slice(0, ti).map(render).join(''),
            transHtml: paras
              .slice(ti)
              .map(render)
              .join('')
              .replace(/^<p>本章试译：/, '<p>'),
            text,
          });
          continue;
        }
        const cite = text.match(opts.authorCites ? /（([^（）《》]*《[^（）]*》[^（）]*)）\s*$/ : /（(《[^（）]*》[^（）]*)）\s*$/);
        if (cite && (opts.citedQuotesAreSources || /[「」]|曰|也/.test(text))) {
          const tail = opts.authorCites
            ? /（[^（）《》]*《[^（）]*》[^（）]*）\s*(<\/p>\s*<\/blockquote>\s*)$/
            : /（《[^（）]*》[^（）]*）\s*(<\/p>\s*<\/blockquote>\s*)$/;
          out.push({ kind: 'source', html: html.replace(tail, '$1'), cite: cite[1], text });
          continue;
        }
        out.push({ kind: 'callout', html, text });
        continue;
      }
      const html = render(g);
      out.push({ kind: 'html', html, tag: first.tag || first.type, text: plain(html) });
    }
    return out;
  }

  const SECTIONS: Section[] = chunks.map((ch, i) => {
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
    const chars = blocks.reduce((s, b) => s + (b.text?.length ?? 0), 0);
    return { index: i, title: ch.title, blocks, headings, chars };
  });

  const READING = SECTIONS.filter((s) => !APPENDIX_TITLES.includes(s.title));
  const APPENDIX = SECTIONS.filter((s) => APPENDIX_TITLES.includes(s.title));
  const intro = SECTIONS[0]?.blocks ?? [];
  const coreB = intro.find((x) => x.kind === 'html' && x.html.includes('<strong>'));
  const coreM = coreB && coreB.kind === 'html' ? coreB.html.match(/<strong>(.*?)<\/strong>/) : null;
  const sumB = opts.summaryStart ? intro.find((x) => x.kind === 'html' && x.text.startsWith(opts.summaryStart!)) : undefined;

  return {
    code,
    TITLE,
    SUBTITLE,
    STATUS_HTML,
    FOOTNOTES,
    SECTIONS,
    READING,
    APPENDIX,
    isAppendix: (index) => APPENDIX.some((s) => s.index === index),
    partNo: (index) => READING.findIndex((s) => s.index === index) + 1,
    // Course length: characters of displayed text in the instructional sections
    // (body text, quotations, exercises and tables; punctuation included;
    // diagrams, notes and the sources appendix excluded).
    TOTAL_CHARS: READING.reduce((s, x) => s + x.chars, 0),
    CORE_QUESTION: coreM ? htmlText(coreM[1]) : '',
    SUMMARY: sumB ? sumB.text : '',
  };
}

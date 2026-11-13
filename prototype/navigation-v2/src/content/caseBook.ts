import MarkdownIt from 'markdown-it';

// A case manuscript (content/cases/CASEnn_*_MANUSCRIPT.md) for the case
// reader. The manuscript is read as it is: the text is only split into
// chapters and appendices and tagged, never rewritten. Three things in a
// manuscript are production notes, not reading text, and are left out of the
// page:
//   • the draft-status sentence in the opening note;
//   • the intro note of 附录三 (练习) and its ```ts block — the same data is in
//     practice-caseNN.ts and is shown as interactive question sets instead.
// The manuscript format is the one set by CASE 02《分洪》: "# 标题", an opening
// blockquote ("**PhiloPilot Cases · NN**　类型", the fiction note, an optional
// "阅读提示："), chapters as "## 一　章名", appendices as "# 附录一　名称",
// with 附录二 决策点 and 附录三 练习.

const md = new MarkdownIt({ html: false, linkify: false, typographer: false, breaks: true });
// Source links open in a new tab and say so.
md.renderer.rules.link_open = (tokens, i, opts, _env, self) => {
  tokens[i].attrSet('target', '_blank');
  tokens[i].attrSet('rel', 'noopener noreferrer');
  return self.renderToken(tokens, i, opts);
};
type Token = ReturnType<typeof md.parse>[number];

export interface CaseBlock {
  html: string;
  text: string;
  tag: string;
  /** Set on the appendix sub-headings (## in the manuscript). */
  id?: string;
}
export interface CaseSection {
  index: number;
  kind: 'chapter' | 'appendix';
  /** 一 … 十三 for chapters, 附录一 … 附录五 for appendices. */
  no: string;
  /** 雨窗 / 哲学分析 */
  name: string;
  /** As in the manuscript heading: “一　雨窗”, “附录一　哲学分析”. */
  title: string;
  blocks: CaseBlock[];
  headings: { id: string; text: string; block: number }[];
  /** Characters of displayed text (chapters count towards reading progress). */
  chars: number;
}

export const DP_LABELS = ['当时可知的信息', '现实的选项', '相互竞争的理由', '当时还没有的信息', '哲学解读'] as const;
export interface DecisionPoint {
  block: number;
  id: string;
  title: string;
  parts: { label: string; html: string }[];
}

export interface CaseBook {
  /** Two-digit case number ('02'). */
  no: string;
  /** 分洪 */
  TITLE: string;
  /** 灾难惊悚 / 政治与道德哲学 / 职场文学 */
  GENRE: string;
  /** The fiction disclosure, verbatim from the opening note (its status sentence left out). */
  FICTION_NOTE: string;
  /** The content note after "阅读提示：", or '' if the manuscript has none. */
  CONTENT_NOTE: string;
  SECTIONS: CaseSection[];
  CHAPTERS: CaseSection[];
  APPENDICES: CaseSection[];
  NOVEL_CHARS: number;
  PRACTICE_INDEX: number;
  DECISIONS_INDEX: number;
  isAppendix: (i: number) => boolean;
  decisionPoints: () => { lead: CaseBlock[]; points: DecisionPoint[] };
}

const ENT: Record<string, string> = { '&quot;': '"', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&#39;': "'" };
const strip = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;|&amp;|&lt;|&gt;|&#39;/g, (m) => ENT[m])
    .trim();

/** One block per top-level element (paragraph, list, heading, quote, rule). */
function toBlocks(src: string, prefix: string, sIndex: number): { blocks: CaseBlock[]; headings: CaseSection['headings'] } {
  const tokens = md.parse(src, {});
  const blocks: CaseBlock[] = [];
  const headings: CaseSection['headings'] = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    let j = i;
    if (t.nesting === 1) {
      let depth = 0;
      for (; j < tokens.length; j++) {
        depth += tokens[j].nesting;
        if (depth === 0) break;
      }
    }
    const slice: Token[] = tokens.slice(i, j + 1);
    const html = md.renderer.render(slice, md.options, {});
    const tag = t.tag || t.type;
    if (t.type === 'heading_open') {
      const id = `${prefix}-s${sIndex}-h${headings.length}`;
      const text = strip(html);
      headings.push({ id, text, block: blocks.length });
      blocks.push({ html: md.renderInline(slice[1].content), text, tag, id });
    } else if (t.type !== 'hr') {
      blocks.push({ html, text: strip(html), tag });
    }
    i = j + 1;
  }
  return { blocks, headings };
}

/** Splits a case manuscript. `expect` is only a self-check (console error if it does not match). */
export function makeCaseBook(no: string, raw: string, expect: { chapters: number; appendices: number }): CaseBook {
  const label = 'CASE' + no;
  const prefix = 'c' + no;
  const SRC = raw.replace(/\r\n/g, '\n');
  const lines = SRC.split('\n');

  // ── Opening note ──────────────────────────────────────────────────────────
  const quote = lines.slice(1, lines.findIndex((l, k) => k > 0 && /^## /.test(l))).filter((l) => l.startsWith('>'));
  const pick = (re: RegExp, optional = false) => {
    const l = quote.find((x) => re.test(x));
    if (!l && !optional) console.error(label + ': opening note line not found', re);
    return l ? l.replace(/^>\s*/, '') : '';
  };
  const mark = `PhiloPilot Cases · ${no}`;
  const GENRE = pick(new RegExp(mark)).replace(new RegExp(`^\\*\\*${mark}\\*\\*\\s*`), '').trim();
  const FICTION_NOTE = (pick(/小说中的地名/).match(/小说中的地名[^]*$/) ?? [''])[0];
  const CONTENT_NOTE = pick(/^>\s*阅读提示/, true).replace(/^阅读提示：/, '');
  const TITLE = lines[0].replace(/^#\s*/, '');

  // ── Chapters and appendices ───────────────────────────────────────────────
  const starts: { line: number; title: string; kind: CaseSection['kind'] }[] = [];
  let inAppendix = false;
  lines.forEach((l, k) => {
    if (/^# 附录/.test(l)) {
      inAppendix = true;
      starts.push({ line: k, title: l.slice(2).trim(), kind: 'appendix' });
    } else if (!inAppendix && /^## /.test(l)) starts.push({ line: k, title: l.slice(3).trim(), kind: 'chapter' });
  });

  const SECTIONS: CaseSection[] = starts.map((s, index) => {
    const end = index + 1 < starts.length ? starts[index + 1].line : lines.length;
    let body = lines.slice(s.line + 1, end).join('\n');
    const [sno, name] = s.title.split('　');
    // 附录三: the exercises are rendered from practice-caseNN.ts (see the note above).
    if (name === '练习') body = '';
    const { blocks, headings } = toBlocks(body, prefix, index);
    const chars = blocks.reduce((n, b) => n + b.text.replace(/\s/g, '').length, 0);
    return { index, kind: s.kind, no: sno, name, title: s.title, blocks, headings, chars };
  });
  const CHAPTERS = SECTIONS.filter((s) => s.kind === 'chapter');
  const APPENDICES = SECTIONS.filter((s) => s.kind === 'appendix');
  const isAppendix = (i: number) => SECTIONS[i]?.kind === 'appendix';
  const NOVEL_CHARS = CHAPTERS.reduce((n, s) => n + s.chars, 0);
  const PRACTICE_INDEX = APPENDICES.find((s) => s.name === '练习')!.index;
  const DECISIONS_INDEX = APPENDICES.find((s) => s.name === '决策点')!.index;

  if (CHAPTERS.length !== expect.chapters || APPENDICES.length !== expect.appendices)
    console.error(`${label}: expected ${expect.chapters} chapters and ${expect.appendices} appendices`, CHAPTERS.length, APPENDICES.length);

  // ── 附录二 决策点: each decision point split into its five labelled parts ──
  function decisionPoints(): { lead: CaseBlock[]; points: DecisionPoint[] } {
    const s = SECTIONS[DECISIONS_INDEX];
    const lead: CaseBlock[] = [];
    const points: DecisionPoint[] = [];
    s.blocks.forEach((b, i) => {
      if (b.id) return void points.push({ block: i, id: b.id, title: b.text, parts: [] });
      const dp = points[points.length - 1];
      if (!dp) return void lead.push(b);
      const lbl = DP_LABELS.find((l) => b.text.startsWith(l + '。'));
      if (lbl) {
        // The label becomes the disclosure's summary; the paragraph keeps the rest.
        const html = b.html.replace(new RegExp(`^<p><strong>${lbl}。</strong>\\s*`), '<p>');
        dp.parts.push({ label: lbl, html: html === '<p></p>\n' ? '' : html });
      } else if (dp.parts.length) dp.parts[dp.parts.length - 1].html += b.html;
      else lead.push(b);
    });
    return { lead, points };
  }

  return {
    no,
    TITLE,
    GENRE,
    FICTION_NOTE,
    CONTENT_NOTE,
    SECTIONS,
    CHAPTERS,
    APPENDICES,
    NOVEL_CHARS,
    PRACTICE_INDEX,
    DECISIONS_INDEX,
    isAppendix,
    decisionPoints,
  };
}

import MarkdownIt from 'markdown-it';
import raw from '@content/cases/CASE02_FENHONG_MANUSCRIPT.md?raw';

// 《分洪》 (PhiloPilot Cases · 02) for the case reader. The manuscript in
// content/cases is read as it is: the text is only split into chapters and
// appendices and tagged, never rewritten. Three things in the manuscript are
// production notes, not reading text, and are left out of the page:
//   • the draft-status sentence in the opening note;
//   • the intro note of 附录三, which says the exercises are not yet on the
//     site, and its ```ts block — the same data is in practice-case02.ts and
//     is shown as interactive question sets instead.

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

const ENT: Record<string, string> = { '&quot;': '"', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&#39;': "'" };
const strip = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;|&amp;|&lt;|&gt;|&#39;/g, (m) => ENT[m])
    .trim();

/** One block per top-level element (paragraph, list, heading, quote, rule). */
function toBlocks(src: string, sIndex: number): { blocks: CaseBlock[]; headings: CaseSection['headings'] } {
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
      const id = `c02-s${sIndex}-h${headings.length}`;
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

const SRC = raw.replace(/\r\n/g, '\n');
const lines = SRC.split('\n');

// ── Opening note ────────────────────────────────────────────────────────────
const quote = lines.slice(1, lines.findIndex((l, k) => k > 0 && /^## /.test(l))).filter((l) => l.startsWith('>'));
const pick = (re: RegExp) => {
  const l = quote.find((x) => re.test(x));
  if (!l) console.error('CASE02: opening note line not found', re);
  return l ? l.replace(/^>\s*/, '') : '';
};
/** 灾难惊悚 / 政治与道德哲学 / 职场文学 */
export const GENRE = pick(/PhiloPilot Cases · 02/).replace(/^\*\*PhiloPilot Cases · 02\*\*\s*/, '').trim();
/** The fiction disclosure, verbatim from the opening note (its status sentence left out). */
export const FICTION_NOTE = (pick(/小说中的地名/).match(/小说中的地名[^]*$/) ?? [''])[0];
/** 小说中有一名人物在洪水中遇难。 */
export const CONTENT_NOTE = pick(/^>\s*阅读提示/).replace(/^阅读提示：/, '');
export const TITLE = lines[0].replace(/^#\s*/, '');

// ── Chapters and appendices ─────────────────────────────────────────────────
const starts: { line: number; title: string; kind: CaseSection['kind'] }[] = [];
let inAppendix = false;
lines.forEach((l, k) => {
  if (/^# 附录/.test(l)) {
    inAppendix = true;
    starts.push({ line: k, title: l.slice(2).trim(), kind: 'appendix' });
  } else if (!inAppendix && /^## /.test(l)) starts.push({ line: k, title: l.slice(3).trim(), kind: 'chapter' });
});

export const SECTIONS: CaseSection[] = starts.map((s, index) => {
  const end = index + 1 < starts.length ? starts[index + 1].line : lines.length;
  let body = lines.slice(s.line + 1, end).join('\n');
  const [no, name] = s.title.split('　');
  // 附录三: the exercises are rendered from practice-case02.ts (see the note above).
  if (name === '练习') body = '';
  const { blocks, headings } = toBlocks(body, index);
  const chars = blocks.reduce((n, b) => n + b.text.replace(/\s/g, '').length, 0);
  return { index, kind: s.kind, no, name, title: s.title, blocks, headings, chars };
});
export const CHAPTERS = SECTIONS.filter((s) => s.kind === 'chapter');
export const APPENDICES = SECTIONS.filter((s) => s.kind === 'appendix');
export const isAppendix = (i: number) => SECTIONS[i]?.kind === 'appendix';
export const NOVEL_CHARS = CHAPTERS.reduce((n, s) => n + s.chars, 0);
export const PRACTICE_INDEX = APPENDICES.find((s) => s.name === '练习')!.index;
export const DECISIONS_INDEX = APPENDICES.find((s) => s.name === '决策点')!.index;

if (CHAPTERS.length !== 13 || APPENDICES.length !== 5) console.error('CASE02: expected 13 chapters and 5 appendices', CHAPTERS.length, APPENDICES.length);

// ── 附录二 决策点: each decision point split into its five labelled parts ──
export const DP_LABELS = ['当时可知的信息', '现实的选项', '相互竞争的理由', '当时还没有的信息', '哲学解读'] as const;
export interface DecisionPoint {
  block: number;
  id: string;
  title: string;
  parts: { label: string; html: string }[];
}
export function decisionPoints(): { lead: CaseBlock[]; points: DecisionPoint[] } {
  const s = SECTIONS[DECISIONS_INDEX];
  const lead: CaseBlock[] = [];
  const points: DecisionPoint[] = [];
  s.blocks.forEach((b, i) => {
    if (b.id) return void points.push({ block: i, id: b.id, title: b.text, parts: [] });
    const dp = points[points.length - 1];
    if (!dp) return void lead.push(b);
    const label = DP_LABELS.find((l) => b.text.startsWith(l + '。'));
    if (label) {
      // The label becomes the disclosure's summary; the paragraph keeps the rest.
      const html = b.html.replace(new RegExp(`^<p><strong>${label}。</strong>\\s*`), '<p>');
      dp.parts.push({ label, html: html === '<p></p>\n' ? '' : html });
    } else if (dp.parts.length) dp.parts[dp.parts.length - 1].html += b.html;
    else lead.push(b);
  });
  return { lead, points };
}

# V35 integration report — D2, D3, D4

*Domain D (跨传统对话), positions 2–4. One integrated cycle: research, manuscripts, practice, components, integration, validation. Nothing committed, pushed, merged or deployed.*

## 1. Summary

| Course | Tier | Parts | Exercises | Questions | Notes / refs | Quoted passages | New primary text | Component (anchor) |
|---|---|---|---|---|---|---|---|---|
| D2 自我、人格与无我 | ○ 拓展 | 6 (+导读, 结语) | 6 | 18 | 28 / 32 | 9 original + 2 Chinese | none | SelfhoodCases (六) |
| D3 跨传统的知识、怀疑与论证规则 | ● 核心 | 6 (+导读, 结语) | 6 | 18 | 37 / 44 | 16 original + 9 Chinese | NS 1.2.1–3, 4.2.50; 齐物论 two passages | ArgumentStandards (六) |
| D4 德性、关怀与关系：跨传统伦理 | ○ 拓展 | 6 (+导读, 结语) | 6 | 18 | 23 / 30 | 6 original + 3 Chinese | none | EthicalCaseAnalyzer (六) |

54 practice questions in total: 25 single, 10 multi, 12 tf, 7 view. Per-course details are in `D2_PRODUCTION_REPORT.md`, `D3_PRODUCTION_REPORT.md` and `D4_PRODUCTION_REPORT.md`.

## 2. Files

**New (12):**
- `content/D2_SAMPLE_DRAFT.md`, `content/D3_SAMPLE_DRAFT.md`, `content/D4_SAMPLE_DRAFT.md`
- `prototype/navigation-v2/src/content/d2.ts`, `d3.ts`, `d4.ts`
- `prototype/navigation-v2/src/content/practice-d2.ts`, `practice-d3.ts`, `practice-d4.ts`
- `prototype/navigation-v2/src/ui/media/d2/SelfhoodCases.tsx`, `d3/ArgumentStandards.tsx`, `d4/EthicalCaseAnalyzer.tsx`

**Reports (4):** the three production reports and this file.

**Modified (5):**
- `src/content/courses.ts`: three imports; D2, D3, D4 entries; two new helpers, `srcNoteD2toD4` and `origLangD2toD4`. The second defers to V34's `origLangS12toD1` after recognising a Pāli verse without ṁ (SN 22.22). Earlier helpers are unchanged.
- `src/content/practiceSets.ts`: three imports and map entries.
- `src/content/media.ts`: three `MediaId`s and three anchors.
- `src/ui/media/Media.tsx`: three lazy imports.
- `src/ui/media/in4/shared.tsx`: `useSavedIx` code union gains `'D2' | 'D3' | 'D4'`.

`catalog.ts` and `units.ts` already held the D2–D4 rows and names and are unchanged. No new CSS, dependency or infrastructure.

## 3. Registry and links

Each entry has tradition `cmp`, its curriculum tier, `method` and `background` from the curriculum, and a `sourceNote`.

**Link semantics.** Following V31–V34, all three have `recommendFrom: []` and `leadsTo: []`. The curriculum lists no onward course for D2–D4. No onward links were inferred from incoming ones, and background-only mentions were not turned into links.

**Incoming links.** These became live without editing any other course, because these courses already list D2–D4 in their own `leadsTo`:

| Target | Linked from |
|---|---|
| D2 | AF1, IN2 |
| D3 | CN2, CN3, IN3, IA3, IA4 |
| D4 | CN1 |

The curriculum's links from IN1, GR3 and S7 are not in those courses' `leadsTo` and were left alone. Adding them would mean editing earlier courses, which this brief does not authorize. Section 9 lists this as a decision for the PO.

## 4. Sources

**New text verified this cycle:**
- *Nyāyasūtra* 1.2.1–1.2.3 and 4.2.50, from GRETIL `sa_gautama-nyAyasUtra` (Sansknet, 2020-07-31). GRETIL's typo "saṃrakṣṇārthaṃ" is kept as printed.
- 齐物论 "旣使我與若辯矣…" and "夫大道不稱…", from zh.wikisource revision 11117685.

**Reused passages.** Every other quoted passage is reused verbatim from a course that already checked it, and each note names that course.

**Modern authors** are paraphrased only. Works known only at second hand are marked 依据通行的介绍 in the text and listed in each appendix. No quotation, page number, textual variant or historical interaction was invented.

**Unchecked citations.** Where a citation could not be checked, it is mentioned and not quoted: Analects 2.7, "人皆可以为尧舜", Williams's example and Parfit's Appendix.

## 5. Images

None used, proposed or downloaded. None of the three courses needs an image: their material is arguments and cases, and a portrait or manuscript photograph would add nothing to the comparison.

## 6. Validation (16 checks + D3 logic accuracy)

Run on the production build (`npm run build`, preview server on port 5189). `tsc --noEmit` is clean.

| # | Check | Result |
|---|---|---|
| 1 | Sections render | Pass: 24 reader pages (8 × 3) render with their titles |
| 2 | Titles and order | Pass: every section title matches the manuscript, in order |
| 3 | Notes resolve | Pass: 106 / 106 note buttons open a non-empty note (32 + 44 + 30) |
| 4 | 54 valid questions | Pass: 54 rendered; all 47 graded questions accept their key ("回答正确"); all 7 view questions respond to "确定我的立场" |
| 5 | Components work | Pass: all three render at their anchors in 六 and respond. D2: 3 agreements, 1 difference and the "not its question" explanation shown. D3: 12 level analyses and the summary. D4: side-by-side view, a variant, and a "moved apart" summary |
| 6 | Keyboard and touch | Pass: ArgumentStandards driven by Space, Tab and Enter, with a visible 2 px solid outline; buttons are native, with `aria-pressed` and `aria-expanded` |
| 7 | No overflow at 375 px | Pass: `scrollWidth = 375` on all 24 reader pages and 3 front pages, with every component analysis expanded |
| 8 | Saved state survives reload | Pass: all three components restored after `location.reload()`; practice state persisted under `philopilot.v2.d2/d3/d4.practice.*` |
| 9 | Practice does not overwrite reading position | Pass: answering a D3 三 question left `d3.position` (section 3, heading "四种策略") byte-for-byte unchanged |
| 10 | Progress and resume | Pass: real wheel scrolling saved `d3.position` and `d3.progress`; the table of contents shows "已读 100%" for 三; the front page offers "继续阅读 →" |
| 11 | Domain D includes D2–D4 | Pass: #/region/dialogue shows D1–D4 with "打开课程 →" and their tiers; course pages read "跨传统对话 · 第 2 / 3 / 4 门" with ○ / ● / ○ |
| 12 | Catalogue and search | Pass: search finds 无我, 论证规则, 关怀, 周岚, 三相, 帕菲特 (course titles and section headings) |
| 13 | Links | Pass: the eight incoming links in §3 show the new courses; AF1 → D2 opens #/course/D2; the new courses' "读完以后" says the curriculum lists no onward course |
| 14 | Earlier courses still open | Pass: 16 earlier courses (CN1, IN2, IN3, IA3, GR3, AF1, EA3, S4, S7, S12, S13, D1, A2, JP1, LA1, KR1) open at the front page and at section 1 |
| 15 | CASE 02 unchanged | Pass: no file under Cases changed (`git status`); #/cases/02 opens 《分洪》 |
| 16 | No console errors | Pass on a fresh load through all three courses, the domain page and CASE 02 |
| D3 | Logic accuracy | Pass: ten logical claims re-checked against the chapter's definitions (table in `D3_PRODUCTION_REPORT.md` §2). One change: the component's judgment on argument 4's dialectical status |

**Fixes made during validation:**
- SN 22.22 was tagged `lang="sa"`; it is now `pi`, through the new helper.
- The 因明入正理论 block showed the generic Wikisource note; it now names CBETA T1630, as IN3 does.
- D2's front-page source note named the wrong course for SN 22.59; it now names 《起源与早期论争》, as the appendix does.
- D2 called D4 "下一门课"; it now reads "一课".

**Whitespace and line endings:**
- `git diff --check` is clean.
- New files were inspected separately: no trailing whitespace, no tabs, final newline present.
- The three manuscripts and four reports are CRLF. New and changed `.ts` / `.tsx` files are LF. `catalog.ts` remains CRLF and unchanged.
- Git prints its usual "LF will be replaced by CRLF" warning for the five modified LF files (autocrlf). It does not affect the working copies.

**Changed-file list.** It contains only V35 work: the 5 modified and 12 new files in §2, plus the 4 reports. Nothing under `planning/`, `Cases/` or the sealed manuscripts was touched.

## 7. Component principles

All three components follow the same rules:
- They use only material from their own chapter.
- Every claim carries a basis tag.
- Nothing is scored, and no framework or theory is declared correct.
- Where the component itself wrote the material, it says so: D3's arguments 3 and 4, and D4's variant analyses other than variant 1's care and Confucian analyses.
- They are built from the existing shared pieces (`Band`, `Claim`, `Limits`, `Pick`, `useSavedIx`, `v21-steps`, `v22-btns`).

## 8. What was not done

- No commit, push, merge or deploy.
- No Cloudflare settings changed.
- D5 or any later course not begun.
- Cases not modified.
- No sealed manuscript rewritten.
- No redesign.
- No curriculum expansion.
- No new dependency.
- No image downloaded.
- No unrelated refactoring.

## 9. Decisions for the Product Owner

1. **Curriculum links not present in the app.** IN1 → D2, GR3 → D3 and S7 → D4 appear in the curriculum or catalogue but are not in those courses' `leadsTo`. Adding them would mean editing earlier courses. Should they be added in a later cycle?
2. **D4 component variants.** Only variant 1 is analysed in the chapter itself. Keep variants 2 and 3, which are clearly labelled as written for the exercise, or restrict the component to variant 1?
3. **Git authorization.** All work is uncommitted, awaiting review.

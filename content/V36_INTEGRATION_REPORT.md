# V36 integration report — D5, D6, D7

*Domain D (跨传统对话), positions 5–7. One integrated cycle: research, manuscripts, practice, components, integration, validation. Nothing committed, pushed, merged or deployed.*

## 1. Summary

| Course | Tier | Parts | Exercises | Questions | Notes / refs | Quoted passages | New primary text | Component (anchor) |
|---|---|---|---|---|---|---|---|---|
| D5 跨传统的政治秩序与正当性 | ○ 拓展 | 6 (+导读, 结语) | 6 | 18 | 18 / 37 | 9 original + 7 Chinese | Mencius 1B7, 1B8, 5A5, 7B14; Analects 12.7; *Arthaśāstra* 1.4, 1.13, 1.19 passages; Ambedkar (two works) | LegitimacyComparison (六) |
| D6 哲学中的性别、种族与帝国 | ● 核心 | 6 (+导读, 结语) | 6 | 18 | 24 / 42 | 10 original | none | CanonCorrectionEvaluator (六) |
| D7 技术哲学与人工智能 | ○ 拓展 | 5 (+导读, 结语) | 5 | 15 | 17 / 33 | 1 Chinese (+2 inline sentences) | none | ResponsibilityAnalyzer (五) |

51 practice questions in total: 20 single, 14 multi, 11 tf, 6 view. Per-course details are in `D5_PRODUCTION_REPORT.md`, `D6_PRODUCTION_REPORT.md` and `D7_PRODUCTION_REPORT.md`.

## 2. Files (exact list)

**New (12):**
- `content/D5_SAMPLE_DRAFT.md`, `content/D6_SAMPLE_DRAFT.md`, `content/D7_SAMPLE_DRAFT.md`
- `prototype/navigation-v2/src/content/d5.ts`, `d6.ts`, `d7.ts`
- `prototype/navigation-v2/src/content/practice-d5.ts`, `practice-d6.ts`, `practice-d7.ts`
- `prototype/navigation-v2/src/ui/media/d5/LegitimacyComparison.tsx`, `d6/CanonCorrectionEvaluator.tsx`, `d7/ResponsibilityAnalyzer.tsx`

**Reports (4):** `content/D5_PRODUCTION_REPORT.md`, `content/D6_PRODUCTION_REPORT.md`, `content/D7_PRODUCTION_REPORT.md`, this file.

**Modified (5):**
- `src/content/courses.ts`: three imports; D5, D6, D7 entries; two new helpers, `srcNoteD5toD7` and `origLangD5toD7`. The language helper recognises Spanish (Sor Juana) and otherwise defers to V35's `origLangD2toD4`. Earlier helpers are unchanged.
- `src/content/practiceSets.ts`: three imports and map entries.
- `src/content/media.ts`: three `MediaId`s and three anchors.
- `src/ui/media/Media.tsx`: three lazy imports.
- `src/ui/media/in4/shared.tsx`: `useSavedIx` code union gains `'D5' | 'D6' | 'D7'`.

`git status` shows exactly these 5 modified files and the 12 new files (plus the 4 reports). `src/data/catalog.ts` and `src/data/units.ts` already held D5–D7 and are unchanged. No new CSS, dependency or infrastructure. Nothing under `planning/` (read only), `Cases/` or any sealed manuscript was touched.

## 3. Registry and links

Each entry has tradition `cmp`, its curriculum tier, `method` and `background` from the curriculum, and a `sourceNote`. All three have `recommendFrom: []` and `leadsTo: []`: the curriculum lists no onward course, and no link or prerequisite lock was invented.

**Incoming links.** These became live without editing other courses, because they already list the new codes in their own `leadsTo`:

| Target | Linked from |
|---|---|
| D5 | CN4 |
| D6 | CN7, CN8, EA9, EA12, AF2, AF3, LA1, IN8, IA5 |
| D7 | none |

## 4. Sources

- **New text verified this cycle (D5 only):** zh.wikisource revisions 2636980, 2637012, 2636998, 10602324; GRETIL *Arthaśāstra* (Kangle, CC BY-NC-SA 4.0); Ambedkar, *Writings and Speeches* vol. 1 (archive.org scan). Re-matched segment by segment during validation.
- **Reused passages** (all three courses) were compared by script with their source courses; every one matches verbatim.
- **Modern authors** are paraphrased only. Works known at second hand are marked 依据通行的介绍 and listed in each appendix.
- **Fabrication check:** no quotation, page number, date or historical influence was invented. Five paraphrases that went beyond their sources were found during validation and corrected (§6).

## 5. Images

None used, proposed or downloaded.

## 6. Validation (16 checks + extra checks)

Run on the production build (`npm run build`, preview server on port 5189). `tsc --noEmit` is clean.

| # | Check | Result |
|---|---|---|
| 1 | Sections render | Pass: 23 reader pages (8 + 8 + 7) render with their titles |
| 2 | Titles and order | Pass: every section title matches its manuscript, in order |
| 3 | Notes resolve | Pass: 112 / 112 note buttons open a non-empty note (37 + 42 + 33) |
| 4 | 51 valid questions | Pass: 51 rendered; all 45 graded questions accept their key ("回答正确"); all 6 view questions respond to "确定我的立场" |
| 5 | Components work | Pass: all three render at their anchors and respond. D5: housing decision, three answers, three analyses, "分开了" summary. D6: proposal 2 walked through seven steps, tally shown. D7: user + two perspectives, chapter row and two readings |
| 6 | Keyboard and focus | Pass: ResponsibilityAnalyzer driven by Space, Tab and Enter; focused button shows a 2 px solid outline; buttons are native with `aria-pressed` / `aria-expanded`. Reduced motion: the shared button CSS sets `transition: none`; the new components add no animation |
| 7 | No overflow at 375 px | Pass: `scrollWidth = 375` on all 23 reader pages, 3 front pages and the domain page, with components expanded |
| 8 | Saved state survives reload | Pass: all three components restored after `location.reload()`; practice state under `philopilot.v2.d5/d6/d7.practice.*` |
| 9 | Practice and components do not overwrite reading position | Pass: answering D5 三 left `d5.position` byte-for-byte unchanged; using the D7 component left `d7.position` unchanged |
| 10 | Progress and resume | Pass: real wheel scrolling saved position and progress; D7's front page shows "已读 26% 继续阅读 →" |
| 11 | Domain D includes D5–D7 | Pass: `#/region/dialogue` lists them with "打开课程 →" and ○ / ● / ○; course pages read "跨传统对话 · 第 5 / 6 / 7 门" |
| 12 | Catalogue and search | Pass: search finds 正当性, 澄港, 考底利耶, 尼雷尔, 正典, 麦考莱, 人工智能, 江北, COMPAS, 责任缺口 |
| 13 | Links | Pass: all 10 incoming links show the new course; CN4 → D5 opens `#/course/D5`; each new course's "读完以后" says the curriculum lists no onward course |
| 14 | Earlier courses still open | Pass: 18 courses (CN1, CN4, IN2, IN8, IA2, GR2, AF1, AF3, EA4, EA12, S5, S7, S9, LA1, D1–D4) open at the front page and section 1 |
| 15 | CASE 02 unchanged | Pass: no file under Cases changed; `#/cases/02` opens 《分洪》 |
| 16 | No console errors | Pass on a fresh load through all three courses, the domain page and CASE 02 |
| D5 | Political-historical claims | Pass after fixes: table in `D5_PRODUCTION_REPORT.md` §4 |
| D6 | Attribution and canon examples | Pass: table in `D6_PRODUCTION_REPORT.md` §4 |
| D7 | Current-capability and empirical claims | Pass after fixes: table in `D7_PRODUCTION_REPORT.md` §3 |

**Fixes made during validation:**
- Sanskrit `ñ` (*suvijñāta*, *pañca*) was tagged `lang="es"`; the Spanish rule now needs ¿ / ¡, or ñ without Sanskrit diacritics. All blocks re-checked: grc, sa, en, fr, es, pi, de as expected.
- D6: "四种做法" corrected to "五种做法" (heading and overview).
- D5: three Masabo paraphrases brought back to what the article says (media control; Nyerere's 1990s role; Masabo's conclusion). One practice option was adjusted to match.
- D5 note 15 now records that IN8 also quotes the p. 68 sentence.
- D7: Therac-25 dates removed; Leveson & Turner sentence softened; NTSB operator sentence aligned with the report; OECD note no longer implies the blog was read; an unsupported Mhlambi claim replaced (manuscript and component).

**Whitespace and line endings:**
- `git diff --check` is clean.
- New files were inspected separately: no trailing whitespace, no tabs, final newline present, no BOM.
- The three manuscripts and four reports are CRLF; new and changed `.ts` / `.tsx` files are LF. Git prints its usual "LF will be replaced by CRLF" warning for the five modified files (autocrlf); it does not affect the working copies.

## 7. Verified vs untested

**Verified in the browser:** everything in the §6 table.

**Verified by script or source comparison:** reused quotations; new D5 passages against their sources; Masabo claims; D6 statistics and planning quotations; cross-reference section numbers; arXiv, SEP and NTSB details for D7.

**Not tested:**
- Real touch input on a phone (only 375 px emulation with mouse and keyboard).
- Screen-reader output (structure and ARIA attributes inspected, no assistive technology run).
- Keyboard walk-through of the D5 and D6 components (same shared buttons as the tested D7 component; driven by click events only).
- Behaviour with `prefers-reduced-motion` actually enabled (inferred from CSS).
- Browsers other than the built-in Chromium pane.

## 8. Component principles

All three components use only material from their own chapter, tag every claim's basis, score nothing and declare no view correct. Where the component wrote the material (D5's four-way grouping, D6's proposals and analyses, most D7 readings), it says so. They reuse the shared pieces (`Band`, `Claim`, `Limits`, `Pick`, `useSavedIx`, `v21` / `v22` classes).

## 9. What was not done

- No commit, push, merge or deploy.
- No Cloudflare settings changed.
- D8–D11 not begun.
- Cases not modified.
- No sealed manuscript rewritten.
- No redesign, curriculum expansion, new dependency or unrelated refactoring.
- No image downloaded.

## 10. Decisions for the Product Owner

1. **Specialist review.** D5's *Arthaśāstra* passages and caste cautions, and D7's statements on current AI capabilities, would benefit from expert review before sealing.
2. **D6 audit.** D6 §六 states that it did not check whether every woman listed in the curriculum table actually appears in her course. Should that audit be scheduled?
3. **Component content.** D6's three proposals and D7's non-chapter readings are written for the exercises and labelled as such. Keep them, or restrict the components to chapter text?
4. **Git authorization.** All work is uncommitted, awaiting review.

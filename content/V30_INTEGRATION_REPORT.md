# V30 integration report — A4, S1, S2

*Three courses written and integrated in one cycle:*
- *A4 《诠释、翻译与哲学写作》, Extended ○, 6 sections (Foundations and Methods);*
- *S1 《知识与怀疑》, Core ●, 6 sections (the first systematic course);*
- *S2 《形而上学：存在、实体、共相与模态》, Core ●, 5 sections.*

*Baseline HEAD dadb14d (V29, SEALED). Nothing has been committed, pushed, merged or deployed. No Cloudflare setting was touched. No SEALED manuscript, Cases file or `planning/` file was changed. No image was downloaded. S3 was not begun. No dependency was added.*

## 1. Coverage

| Course | Sections | Exercises | Practice | Notes | Original passages | Six-question comparisons | Component |
|---|---|---|---|---|---|---|---|
| A4 | 6 (+导读, 结语) | 6 | 18 | 28 | 8 (classical Chinese, Sanskrit, Greek) | — (method course; documented relations kept apart from teaching comparisons) | TranslationLens (四) |
| S1 | 6 (+导读, 结语) | 6 | 18 | 22 | 6 (Greek, Sanskrit, classical Chinese) | 4 | CaseAnalyser (二) |
| S2 | 5 (+导读, 结语) | 5 | 15 | 16 | 6 (Greek, Sanskrit, classical Chinese) | 5 | UniversalsTest (三) |
| **Total** | **17** | **17** | **51** | 66 | 20 | 9 | 3 |

Practice types across the 51 questions: 32 single, 5 multi, 9 true/false, 5 view. Every option of every question has feedback. Every quoted original passage except John 1:1 (A4) was already checked by another course on the site and is used with that course's translation; John 1:1 (和合本, 1919, public domain) was checked on zh.wikisource. The details and the expert-review lists are in the three production reports.

## 2. Integration changes: exact list of files

**New files (12 + 4 reports):**

- `content/A4_SAMPLE_DRAFT.md`, `content/S1_SAMPLE_DRAFT.md`, `content/S2_SAMPLE_DRAFT.md` (CRLF)
- `prototype/navigation-v2/src/content/a4.ts`, `s1.ts`, `s2.ts`
- `prototype/navigation-v2/src/content/practice-a4.ts`, `practice-s1.ts`, `practice-s2.ts`
- `prototype/navigation-v2/src/ui/media/a4/TranslationLens.tsx`
- `prototype/navigation-v2/src/ui/media/s1/CaseAnalyser.tsx`
- `prototype/navigation-v2/src/ui/media/s2/UniversalsTest.tsx`
- `content/A4_PRODUCTION_REPORT.md`, `S1_PRODUCTION_REPORT.md`, `S2_PRODUCTION_REPORT.md`, `V30_INTEGRATION_REPORT.md` (CRLF)

**Modified files (9):**

| File | Change |
|---|---|
| `src/content/courses.ts` | imports A4, S1, S2; new tradition value `'sys'` (哲学问题) for the systematic courses; PUBLISHED entries A4 (`fm`, position 4), S1 and S2 (`sys`, positions 1–2); A1.recommendFrom gains A4 and S1; A3.recommendFrom gains S2; A3.leadsTo changed from S1, S5, S7 to the curriculum's S2, S4, S7 (final correction, §6); `srcNoteA` gains notes for 塞克斯都, 范畴篇, 赫拉克利特, 集量论, GRETIL texts (正理经, 胜论经, 弥曼差经, 回诤论), 朱子語類, and 老子 (with 庄子) |
| `src/content/practiceSets.ts` | registers A4_PRACTICE, S1_PRACTICE, S2_PRACTICE |
| `src/content/media.ts` | three MediaIds and three anchors (A4 四, S1 二, S2 三) |
| `src/ui/media/Media.tsx` | three lazy imports |
| `src/ui/media/in4/shared.tsx` | `useSavedIx` code union gains `'A4' \| 'S1' \| 'S2'` |
| `src/data/catalog.ts` | domain C gains S1 and S2 (A4 was already listed in domain A) |
| `src/ui/nav.ts` | `canonicalOf`: a `'sys'` course's place is 哲学问题 |
| `src/ui/Questions.tsx` | in the list of questions not yet expanded, a course that is published (S1, S2) is shown as a link that opens the course |
| `src/ui/CoursePage.tsx` | when a course has no onward links in the curriculum (S1, S2), the "读完以后" note says so instead of showing an empty list |

Diff of the modified files: 122 insertions, 16 deletions (after the final correction in §6). Each file keeps the line endings it had at HEAD.

## 3. Validation

### Verified (run or observed in this cycle)

1. **Type-check:** `tsc --noEmit` passes.
2. **Build:** `npm run build` passes (the existing chunk-size warning is unchanged).
3. **Course pages:** A4, S1 and S2 open; tier, position, core question, method focus, background and section list render. A4 shows "哲学方法 · 第 4 门 · ○ 拓展"; S1/S2 show "哲学问题 · 第 1/2 门 · ● 核心".
4. **Reader:** every section of all three courses renders (8 + 8 + 7 parts, plus notes and sources appendices). Footnotes resolve: A4 28/28, S1 22/22, S2 16/16, no unused definitions.
5. **Practice:** a set appears at every 想一想 (6 + 6 + 5). A script confirmed 18/18/15 questions, labels identical to the manuscripts, unique ids, valid answers, at most 3 per set. One question (s1-2-1) was answered in the browser: the verdict and the feedback on every option appeared.
6. **Original-language passages:** rendered as primary blocks with correct `lang` (`grc`, `sa`); Chinese source blocks show the corrected source note (e.g. A4's 《老子》 now reads 录文与《老子、庄子与道家传统》相同).
7. **Components placed:** TranslationLens in A4 四, CaseAnalyser in S1 二, UniversalsTest in S2 三, each once.
8. **Components work:** each was driven through all its steps in the browser (term and rendering switching; six verdicts and the criterion tally; two accounts tested and compared).
9. **Independent saved state:** keys `philopilot.v2.a4.media.translation-lens`, `philopilot.v2.s1.media.case-analyser`, `philopilot.v2.s2.media.universals-test`; selections survived a page reload; each has a 重新开始 button.
10. **Keyboard and focus:** all controls are native buttons in labelled groups with `aria-pressed`; a toggle took focus programmatically, and the existing `.v22-btn:focus-visible` style applies.
11. **375px:** at 375 × 812 the three components and their pages have no horizontal overflow (document width 375, component width 343).
12. **Reduced motion:** the three components contain no animation or transition.
13. **Catalogue and tiers:** catalogue entries A4 ○ (domain A), S1 ● and S2 ● (domain C); no locks anywhere.
14. **Domain A navigation:** the 哲学方法 region lists four openable courses (A1–A4).
15. **Domain C navigation:** on 哲学问题, the 知识与怀疑 and 存在与实在 rows link to S1 and S2; opening S1 from there gives the breadcrumb 首页 › 哲学问题 › 知识与怀疑. The topics themselves remain marked 原型未展开 (only the courses were built).
16. **Search and related links:** the search palette finds all three courses and their section headings (e.g. 葛梯尔 → S1 一, 共相 → S2). A1's "读完以后" lists A4 and S1; A3's lists S2 (after the final correction, see §6).
17. **CASE 02 and whitespace:** `#/cases` and `#/cases/02` open, and the 《分洪》 reader shows its 13 chapters and appendices; `git status` shows no change under `content/cases`, the case modules or `planning/`. `git diff --check` is clean; the 12 new files have no trailing whitespace and no tabs; the manuscripts and reports are CRLF, the source files LF like their neighbours. No console errors were logged during the checks.

### Assumed (not directly verified)

- Touch input: the controls are native buttons and should work by touch, but no real touch device was used.
- Screen-reader output was not tested with an actual screen reader.
- The preview was the production build served locally; the deployed site was not touched.

## 4. Questions for the Product Owner (answered; see §6)

1. **A3's onward links.** The site has A3 → S1, S5, S7; the curriculum says A3 "Feeds S2, S4, S7". Not changed in this cycle (outside the brief); A3 now lists S2 under "可接着读" through S2's recommended background. Should A3.leadsTo be aligned with the curriculum?
2. **S1/S2 onward links.** The curriculum names no course that follows S1 or S2, so their pages now say so. Should S2 point to S3 once S3 exists?
3. **The 哲学问题 topics.** S1 and S2 are reachable from the 知识与怀疑 and 存在与实在 rows, but those topics are still not expanded as topic pages. Is a topic page wanted when more S courses exist?
4. **A4 image candidate.** A plate of 马王堆帛书《老子》甲本 ch. 1 would be the most useful image for A4 四. Rights have not been checked and no approval sheet was produced. Should one be prepared?
5. **Overlap with EA1.** EA1 already covers Porphyry, Boethius and the universals debate. A4 三 and S2 三 now point to EA1 and treat the topic briefly (as a commentary example in A4, as a systematic question in S2). Is that division acceptable?

## 5. Git status

Uncommitted. HEAD is still dadb14d. The working tree has the 12 new files and 4 reports listed above as untracked, and the 9 modified files. Awaiting Product Owner review and explicit Git authorization.

## 6. Final correction after Product Owner review

The Product Owner accepted V30 in principle and answered the questions in §4:

- **Question 1 (A3's onward links):** correct to match the curriculum. Done, as described below.
- **Question 2:** no S2 → S3 link in this cycle.
- **Question 3:** no further topic pages.
- **Question 4:** the 马王堆帛书《老子》 image is not to be prepared or downloaded.
- **Question 5:** the division between EA1 and S2 stays as it is.
- The empty-onward-list note for S1 and S2 stays.

**The change.** One line in `src/content/courses.ts`, plus a comment. A3.leadsTo was `['S1', 'S5', 'S7']`. It is now `['S2', 'S4', 'S7']`, matching `planning/CURRICULUM_REFERENCE_DRAFT.md` ("A1 recommended. Feeds S2, S4, S7.").

- A3.recommendFrom is unchanged (`['S2']`, because S2 names A3 as recommended background).
- S2 is in both fields. `CoursePage` already leaves out of the leadsTo list any course that is in recommendFrom, so S2 is listed only once.
- No other relationship field was touched. S1 still lists A1 as background, and A1 still links onward to S1.
- A3's manuscript, practice set and component were not changed.

**Final verification:**

1. **Browser.** The local production build was rebuilt and opened at `#/course/A3`. Its "读完以后" list has three entries:
   - "哲学问题 · 可接着读 形而上学：存在、实体、共相与模态" is a working link. Clicking it opened `#/course/S2`.
   - "哲学问题 人格、自我与自由意志 原型未实现" (S4) shows the existing unavailable-course label, with no link.
   - "哲学问题 伦理学：对与善、道德修养 原型未实现" (S7) also shows the unavailable-course label, with no link.

   S2 appears exactly once. No console errors were logged.
2. **Type-check.** `tsc --noEmit` passes.
3. **Build.** `npm run build` passes. The existing chunk-size warning is unchanged.
4. **Whitespace.** `git diff --check` is clean.
5. **Scope.** `git status` shows only the 9 modified files and 16 untracked files listed in §2, all part of V30. Nothing changed under `content/cases`, the case modules or `planning/`. The full 51-question browser test was not repeated, as instructed.

Still uncommitted, with HEAD at dadb14d. Awaiting Product Owner approval and explicit Git authorization.

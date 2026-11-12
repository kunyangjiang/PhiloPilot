# V33 integration report — S9, S10, S11

*Three courses written and integrated in one cycle:*
- *S9 《政治哲学：权威、正义与权利》, Core ●, 6 sections (Philosophical Problems, position 9);*
- *S10 《科学哲学》, Core ●, 6 sections (position 10);*
- *S11 《逻辑与数学哲学》, Extended ○, 6 sections (position 11).*

*Baseline: HEAD 4b5e1cf (V32).*

*Not done in this cycle:*
- *Git: nothing has been committed, pushed, merged or deployed.*
- *No Cloudflare setting was touched.*
- *No SEALED manuscript was changed, nor any file in Cases or under `planning/`.*
- *No image was downloaded. Candidates are documented, unverified, in each production report (§11).*
- *S12 was not begun.*
- *No dependency was added.*
- *No unrelated refactoring was done.*

## 1. Coverage

| Course | Sections | Exercises | Practice | Notes | Original passages | Six-question comparisons | Component |
|---|---|---|---|---|---|---|---|
| S9 | 6 (+导读, 结语) | 6 | 18 | 35 | 10 primary + 5 Chinese source (grc, en, fr, zh) | 4 | ObligationGrounds (一) |
| S10 | 6 (+导读, 结语) | 6 | 18 | 18 | 1 primary + 3 Chinese source (en, zh) | 0 (4 historical cases) | AnomalyCase (四) |
| S11 | 6 (+导读, 结语) | 6 | 18 | 19 | 3 primary + 4 Chinese source (sa, zh) | 3 | LiarResponses (二) |
| **Total** | **18** | **18** | **54** | **72** | **26** | **7** | **3** |

**Practice types across the 54 questions:**

| Type | Count |
|---|---|
| single | 32 |
| multi | 8 |
| true/false | 7 (3 true, 4 false) |
| view | 7 |

- Every option of every question has feedback.
- Within each set, no single-answer key repeats. Across set boundaries there are two adjacent repeats: S10 五→六 (C, C) and S11 三→四 (B, B).
- Multi keys vary (BCD, ABD, ACD, ACD, BCD, ABD, BCD, ABC).

**Original passages:** all 26 were already checked by another course on the site (GR2, CN1, CN2, CN4, EA3, EA7, IN3, IN4, IN8). They are used with that course's text and translation, and the course is named in each note. A script confirmed that the opening of each original is an exact substring of its source course. V33 checked no new primary text.

**Main text:** about 21,200, 15,900 and 15,800 Han characters before the notes.

**Course boundaries kept:**

| Course | Boundary | How it is kept |
|---|---|---|
| S9 | No B narratives | Plato, Han Feizi, Confucius, Xunzi, Mozi, Hobbes, Locke, Rousseau, Mill, Gandhi and Ambedkar are used for arguments, and the history is referred to their courses |
| S9 | D5 covers legitimacy across traditions | D5 is named; the four comparisons are each limited to one question |
| S10 | Hume on induction (EA3); Kuhn and Quine (EA10) | Summarised and referred by name; Kuhn is read only for three cautions |
| S10 | Philosophical criticism is not rejection of evidence | The chapter's "most important reminder" (导读), repeated in 一, 三, 四 and 结语 |
| S11 | Formal technique (A2); historical narratives (CN2, IN3) | No proofs are taught; the Mohist and Nyāya texts are read only for the logical point |

The production reports (`S9_`, `S10_`, `S11_PRODUCTION_REPORT.md`) give coverage against the curriculum, argument sources, primary-text and bibliographic limits, comparisons, statistics, practice, components, checked vs assumed, unresolved issues and image candidates.

## 2. Integration changes: exact list of files

**New files (15, plus these 4 reports):**

- Manuscripts (CRLF): `content/S9_SAMPLE_DRAFT.md`, `content/S10_SAMPLE_DRAFT.md`, `content/S11_SAMPLE_DRAFT.md`
- Course modules (LF): `prototype/navigation-v2/src/content/s9.ts`, `s10.ts`, `s11.ts`
  - each is a copy of `s8.ts` with the code changed;
  - each parses with `citeNoteRefs: true` and takes the core question from the manuscript.
- Practice sets (LF): `prototype/navigation-v2/src/content/practice-s9.ts`, `practice-s10.ts`, `practice-s11.ts`
- Components (LF):
  - `prototype/navigation-v2/src/ui/media/s9/ObligationGrounds.tsx`
  - `prototype/navigation-v2/src/ui/media/s10/AnomalyCase.tsx`
  - `prototype/navigation-v2/src/ui/media/s11/LiarResponses.tsx`
- Reports (CRLF): `content/S9_PRODUCTION_REPORT.md`, `S10_PRODUCTION_REPORT.md`, `S11_PRODUCTION_REPORT.md`, `V33_INTEGRATION_REPORT.md`

(15 counts the three component files individually; `git status` shows them as three new directories.)

**Modified files (7). `git diff --numstat`: 102 insertions, 3 deletions:**

| File | +/− | Change |
|---|---|---|
| `src/content/courses.ts` | 78 / 0 | See the list below. Additions only; no existing entry changed |
| `src/content/media.ts` | 10 / 1 | Three MediaIds (`obligation-grounds`, `anomaly-case`, `liar-responses`), each anchored once to a paragraph that itself introduces the component (S9 一, S10 四, S11 二). The −1 is the old last union member losing its semicolon |
| `src/content/practiceSets.ts` | 6 / 0 | Registers the three practice sets |
| `src/data/catalog.ts` (CRLF kept) | 3 / 0 | Adds `c('S9', …, 'core', 'C')`, `c('S10', '科学哲学', 'core', 'C')`, `c('S11', '逻辑与数学哲学', 'extended', 'C')` after S8 |
| `src/data/units.ts` | 1 / 1 | S11's name corrected from 逻辑哲学与数学哲学 to 逻辑与数学哲学, the title in the V33 brief and the manuscript, so the catalogue, units and course page agree (§4) |
| `src/ui/media/Media.tsx` | 3 / 0 | Three lazy imports |
| `src/ui/media/in4/shared.tsx` | 1 / 1 | The `useSavedIx` course union gains `'S9' \| 'S10' \| 'S11'` |

**The `courses.ts` changes:**

- Imports S9, S10 and S11.
- Adds course entries for them:
  - tradition `sys`, positions 9–11, tiers ●/●/○, English names from the curriculum;
  - method focus from the curriculum:
    - S9: 评价关于政治义务和正当性的论证;
    - S10: 通过哲学的和历史的案例评价最佳说明推理;
    - S11: 分析悖论并比较各种回应.
  - backgrounds:
    - S9 and S10: "大纲建议先读「什么是哲学？问题、论证与阅读」（推荐背景，不是必需）" (A1 recommended);
    - S11: "大纲建议先读「形式推理：命题逻辑与谓词逻辑」（推荐背景，不是必需）" (A2 recommended; the curriculum calls it an intellectual dependency, but no course is locked).
- Every entry has `recommendFrom: []` and `leadsTo: []`, with a comment naming the courses that already link to it (§4), plus a `sourceNote` naming each source course.
- Adds two helpers for S9–S11 only:
  - `srcNoteS9to11` names the course whose transcription a Chinese source block reuses (CN4 for 韩非子 and 淮南子; CN1 for 论语 and 荀子; CN2 for 墨子);
  - `origLangS9to11` adds French detection, for Rousseau.

  V32's `srcNoteS6to8` and `origLangS6to8`, and V31's helpers, are untouched, so S3–S8 render exactly as before.

Saved-state types: the components use `useSavedIx` (union widened above), and practice uses the existing per-label keys. No new storage mechanism was added.

**Unchanged:**

- Cases (`git diff HEAD -- content/cases …/ui/cases` is empty);
- `planning/`;
- all SEALED manuscripts and their practice sets;
- every existing course entry;
- `package.json` and the lockfile;
- Cloudflare configuration;
- the shared `Practice.tsx`, `Reader.tsx`, `CoursePage.tsx` and `Questions.tsx`.

## 3. Validation

### Verified (run or observed in this cycle)

All browser checks were run on the production build (`npm run build`), served locally on port 5189 and loaded with a cache-busting query.

1. **All 18 sections render.** Each course has 8 readable parts (导读, 一–六, 结语) plus 注释 and 来源 as appendices; the course pages list "共 8 部分". Each numbered section has one exercise and one practice set of three. Each component appears once, in its intended section.
2. **Titles and order are correct.** The reader headings match the manuscripts' `##` headings in order. Course pages show 哲学问题 · 第 9 / 10 / 11 门, the right tier, English name, core question, background and method.
3. **Notes and cross-references.**
   - Footnote markers resolve 35/35, 18/18 and 19/19 (75, 54 and 44 markers). Every marker was clicked and opened the margin note with the right number.
   - Primary-block `lang` values: S9 grc ×3, en ×6, fr; S10 en; S11 sa ×3.
   - Every Chinese source block names the correct source course.
   - Course titles cited in the text were checked by script against the catalogue. During writing, several were corrected to their catalogue form (CN4 and GR2 in S9, and two short forms 《形式推理》 in S11).
4. **All 54 questions are valid.**
   - **Script:** labels match each 想一想, ids are unique, there are 3 per set, every answer is valid and every option has a note.
   - **Browser:** all 54 were answered with the key and every one was accepted:
     - 47 graded items were marked right;
     - the 7 view items showed a note for every option.
   - **Wrong path:** a wrong true/false pick (s10-1-3) showed the item's `wrong` text and 重做这一题.
5. **Components work.** Each component was driven through every branch:
   - **ObligationGrounds:** all three people to the result; the cross-person prompt appears once more than one person has been tested;
   - **AnomalyCase:** both planets through choice, prediction and history, and the closing claim;
   - **LiarResponses:** all four value assignments (the "all four tried" message appears) and all five responses with the right premises struck.

   重新开始 returns each saved JSON to `INIT`.
6. **Keyboard, mouse and touch.**
   - **Keyboard:** in all three components, Enter on a focused option selects it, and Tab then Space or Enter selects the next, giving `aria-pressed=true` and saving. The focused button matches `:focus-visible`.
   - **Mouse:** clicks drove all of item 5.
   - **Touch:** at 375px with mobile emulation, a tap selected a LiarResponses option.
   - **Motion:** no new animation.
7. **No overflow at 375px.** All 24 reader routes of S9–S11 were checked, and each component again after being fully expanded. On every route `scrollWidth` = `clientWidth`, and no element in a component extends past the viewport.
8. **Saved state persists.** After a reload, a LiarResponses state was still pressed, and the S11 practice set was still shown as answered.
9. **Practice does not alter the reading position.** After a real scroll saved `philopilot.v2.s10.position`, answering practice questions left it byte-for-byte unchanged. Answering all 54 questions wrote only `philopilot.v2.s{9,10,11}.practice.<label>` keys (18 sets), and no position or progress key.
10. **Progress and resume.** After scrolling in S10 三, the course page showed "已读 11% · 继续阅读 → 回到：确证与归纳 · 最简单的贝叶斯", and the home page's 继续阅读 showed the same place.
11. **Domain C lists the courses.** On 哲学问题, the 权力与正义 question lists S9 and the 科学与逻辑 question lists S10 and S11, each as a live link. Clicking 逻辑与数学哲学 opened `#/course/S11`.
12. **Search finds them.** Search matches course titles and section headings. Examples:
    - "政治哲学" → the S9 course;
    - "公民不服从" → S9 六; "克里同" → GR2 and S9 一; "哲学的无政府主义" → S9 一;
    - "科学哲学" → the S10 course and 导读; "拉卡托斯" → S10 四;
    - "逻辑与数学" → the S11 course; "说谎者" → S11 二, alongside another course's section; "哥德尔" → S11 四.

    Course codes ("S11", and likewise "S8") and words that occur only in body text (for example "罗尔斯" finds EA11's headings, not S9's) are not matched; this is existing behaviour.
13. **Related links are correct.** These pages now show live buttons to the new courses, each opening the right page:
    - to S9: CN4, EA7, EA11, GR2;
    - to S10: EA10;
    - to S11: A2.

    The links come from those courses' existing `leadsTo`; no existing course was edited. S9–S11 show "课程大纲没有为这门课列出后续课程".
14. **SEALED courses still work.** All 59 published courses were opened at their course page and their first reader part, and all rendered. Six apparent misses in the first fast sweep (CN1, CN5, CN6, CN7) were load timing; each rendered on a slower recheck.
15. **CASE 02 is unchanged.** `#/cases` lists the cases, and `#/cases/02` opens 《分洪》. `git diff HEAD` shows no change under Cases.
16. **No console errors.** After a fresh load, two sweeps logged no `error` events and no resource with status ≥ 400. The first covered every S9–S11 route, `#/cases/02` and 哲学问题; the second covered the course page and first part of all 56 other published courses. Nine "404" lines in the console buffer came from the page that was open before a rebuild, requesting the previous build's chunk names. They did not recur.

**Build and repository checks:**

- **TypeScript:** `npx tsc --noEmit` exits 0.
- **Build:** `npm run build` exits 0, with only the existing chunk-size warning.
- **`git diff --check`:** clean.
- **Whitespace and line endings (script over all new files):**
  - no trailing whitespace, no BOM, and every file ends with a newline;
  - manuscripts and reports are CRLF;
  - `catalog.ts` stays CRLF;
  - other source files are LF.

  The "LF will be replaced by CRLF" warnings are Git's `core.autocrlf=true` notice and existed before V33.

### Corrections made during validation

- **AnomalyCase** first included al-Fārābī's vial as a third case and used Lakatos's terms. The vial comes later in 四, the 导读 promises "两颗行星", and Lakatos is introduced only after the component. It now has the two planets only, uses the chapter's own words at the anchor, and points forward to Lakatos.
- **LiarResponses** first labelled the "not a statement" row with Ṭūsī and Dawānī, who appear only after the component; Ṭūsī in fact holds the no-truth-value view. The row is now unnamed, as in the table, and the costs use the table's own wording.
- **ObligationGrounds** first cited Locke's tacit consent and Hume's ship, which appear only in 二. The consent note now uses the *Crito* (read in 一) and points forward to 二.

### Assumed (not directly verified)

- **Touch:** only emulated touch was used, not a real touch device.
- **Screen readers:** output was not tested with an actual screen reader.
- **Deployment:** the preview was the production build served locally; the deployed site was not touched.
- **Reused texts:** the transcriptions and translations reused from other courses are assumed to be as accurate as those courses' reports say.
- **Sources:** SEP content beyond the parts read, and the history-of-science facts in S10 四, are assumed consistent with what the chapters say.

## 4. Metadata decisions

1. **`recommendFrom: []` and `leadsTo: []` for S9, S10 and S11.** This follows the V31/V32 precedent: courses named only as background are not added as onward links. The curriculum lists no onward course for any of them. Incoming links (§3, item 13) come from other courses' own existing `leadsTo`, so they became live without any edit.
2. **Catalogue.** S9–S11 were missing from `COURSES`, so they were added after S8. The 权力与正义 and 科学与逻辑 topics stay `implemented: false`, so no new topic page was created. Their course names become live links automatically because the courses are published.
3. **S11's name in `units.ts`.** `units.ts` had 逻辑哲学与数学哲学. The V33 brief, the manuscript and the new catalogue entry say 逻辑与数学哲学, so the one-word change brings the four into agreement.
4. **New helpers instead of edits.** `srcNoteS9to11` and `origLangS9to11` were added rather than widening earlier helpers, so S3–S8 output cannot change.

## 5. Open questions for the Product Owner

1. **S9 length.** S9 is about 21,200 Han characters, the longest systematic course. S6 was 19,500, which was already raised; S7, S8, S10 and S11 are 13,600–15,900. The curriculum's nine panels in six sections account for most of it. Is this acceptable, or should a later cycle shorten 三 or 五?
2. **S10 has no six-question comparison.** The curriculum asks for its non-Western panels to be "cases of explanation, not curiosities". S10 treats them as historical cases with three layers (source, course interpretation, reconstruction), not as comparisons. Should a six-question comparison be added, for example the Mohist 景到 against a covering-law explanation?
3. **S10 omits Indian medicine.** The curriculum names Indian and Chinese medicine. The site has no checked Āyurvedic source text, and no usable scholarly entry was read, so S10 says so and covers Chinese medicine briefly from SEP. Should a later cycle source an Āyurveda entry, or is the stated omission acceptable?
4. **Adjacent repeated keys across sets.** S10 五→六 and S11 三→四 each have the same single-answer letter twice in a row across a set boundary. Within sets there are no repeats. Rebalancing is a small edit if wanted.
5. **True/false feedback on a correct answer.** As raised in V32, a correct true/false answer shows only "回答正确。". This is the unchanged shared convention.

## 6. Git status

- **Uncommitted:** HEAD is still 4b5e1cf.
- **Untracked:**
  - the 3 manuscripts;
  - `s9.ts`, `s10.ts`, `s11.ts`;
  - `practice-s9.ts`, `practice-s10.ts`, `practice-s11.ts`;
  - `ui/media/s9/`, `s10/`, `s11/`;
  - the 4 reports.
- **Modified:** the 7 files listed in §2.
- **Next step:** awaiting Product Owner review and explicit Git authorization.

# V31 integration report — S3, S4, S5

*Three courses written and integrated in one cycle:*
- *S3 《因果、规律与时间》, Extended ○, 6 sections (Philosophical Problems, position 3);*
- *S4 《人格、自我与自由意志》, Core ●, 6 sections (position 4);*
- *S5 《心灵哲学与意识》, Core ●, 6 sections (position 5).*

*Baseline: HEAD 68e84c0 (V30, SEALED). After Product Owner review, two targeted corrections were made: the S2 source-block rendering and the A3 onward-course metadata. They are described in §6, and §2–§5 below are updated to match.*

*Not done in this cycle:*
- *Git: nothing has been committed, pushed, merged or deployed.*
- *No Cloudflare setting was touched.*
- *No SEALED manuscript was changed, nor any file in Cases or under `planning/`. The one change to an S2 file is the authorized one-line parser fix in `s2.ts` (§6).*
- *No image was downloaded.*
- *S6 was not begun.*
- *No dependency was added.*

## 1. Coverage

| Course | Sections | Exercises | Practice | Notes | Original passages | Six-question comparisons | Component |
|---|---|---|---|---|---|---|---|
| S3 | 6 (+导读, 结语) | 6 | 18 | 50 | 8 primary + 1 Chinese source (en, ar, sa, pi, la, ja, zh) | 4 | CausationCases (三) |
| S4 | 6 (+导读, 结语) | 6 | 18 | 43 | 5 primary + 2 Chinese source (en, pi, la, de, zh) | 2 | IdentityCases (二) |
| S5 | 6 (+导读, 结语) | 6 | 18 | 32 | 5 primary + 2 Chinese source (la, fr, sa, ar, zh) | 2 | ThoughtExperimentMap (四) |
| **Total** | **18** | **18** | **54** | **125** | **23** | **8** | **3** |

**Practice types across the 54 questions:**

| Type | Count |
|---|---|
| single | 35 |
| multi | 7 |
| true/false | 8 (3 true, 5 false) |
| view | 4 |

- Every option of every question has feedback.
- Single-answer keys are spread over A–D.

**Original passages:** all 23 were already checked by another course on the site. They are used with that course's text and translation, and the course is named in each note. V31 checked no new primary text.

**Main text:** about 15,700, 14,500 and 14,000 Han characters before the notes.

The production reports (`S3_`, `S4_`, `S5_PRODUCTION_REPORT.md`) give coverage against the curriculum, argument sources, primary-text and bibliographic limits, and the expert-review lists.

## 2. Integration changes: exact list of files

**New files (12, plus these 4 reports):**

- `content/S3_SAMPLE_DRAFT.md`, `content/S4_SAMPLE_DRAFT.md`, `content/S5_SAMPLE_DRAFT.md` (CRLF)
- `prototype/navigation-v2/src/content/s3.ts`, `s4.ts`, `s5.ts`
  - these parse with `citeNoteRefs: true`, so Chinese source quotations that end in a note marker render as source blocks;
  - they take the core question from the manuscript.
- `prototype/navigation-v2/src/content/practice-s3.ts`, `practice-s4.ts`, `practice-s5.ts`
- `prototype/navigation-v2/src/ui/media/s3/CausationCases.tsx`
- `prototype/navigation-v2/src/ui/media/s4/IdentityCases.tsx`
- `prototype/navigation-v2/src/ui/media/s5/ThoughtExperimentMap.tsx`
- Reports: `content/S3_PRODUCTION_REPORT.md`, `S4_PRODUCTION_REPORT.md`, `S5_PRODUCTION_REPORT.md`, `V31_INTEGRATION_REPORT.md` (CRLF)

**Modified files (7). `git diff --numstat`: 101 insertions, 3 deletions:**

| File | +/− | Change |
|---|---|---|
| `src/content/courses.ts` | 75 / 0 | See the list below. Additions only; the A3 entry is identical to HEAD |
| `src/content/media.ts` | 13 / 1 | Three MediaIds (`causation-cases`, `identity-cases`, `thought-experiment-map`), each anchored once to the paragraph that introduces it |
| `src/content/practiceSets.ts` | 6 / 0 | Registers the three practice sets |
| `src/content/s2.ts` | 1 / 1 | Adds `citeNoteRefs: true` to S2's `parseCourse` options (§6.1) |
| `src/data/catalog.ts` | 2 / 0 | Adds catalogue entries S3 (extended) and S5 (core) in domain C. S4 was already in the catalogue |
| `src/ui/media/Media.tsx` | 3 / 0 | Three lazy imports |
| `src/ui/media/in4/shared.tsx` | 1 / 1 | The saved-state helper's course union gains `'S3' \| 'S4' \| 'S5'` |

The `courses.ts` changes:

- Imports S3, S4 and S5.
- Adds course entries for them: tradition `sys`, positions 3–5, tiers ○/●/●, English name, method focus, and background "大纲建议先读「概念、案例与思想实验」（推荐背景，不是必需）".
- Each entry has empty `recommendFrom` and `leadsTo`, plus a source note.
- Adds two helpers: `srcNoteS`, which gives source notes for Chinese source blocks, and `origLangS`, which detects the `lang` of primary blocks.
- Leaves the A3 entry as approved in V30: `recommendFrom: ['S2']`, `leadsTo: ['S2', 'S4', 'S7']` (§6.2).

Unchanged: Cases, `planning/`, all SEALED manuscripts (including `content/S2_SAMPLE_DRAFT.md`), S2's practice set, `package.json` and the lockfile, Cloudflare configuration.

## 3. Validation

### Verified (run or observed in this cycle)

1. **Type-check:** `tsc --noEmit` passes.
2. **Build:** `npm run build` passes. The existing chunk-size warning is unchanged.
3. **Course pages:** S3, S4 and S5 open with position, tier, core question, background (A3 recommended, not required) and method focus. Each also shows "课程大纲没有为这门课列出后续课程。".
4. **Reader:** every section of all three courses renders: 8 parts each, plus the notes and sources appendices.
   - Footnotes resolve: S3 50/50, S4 43/43, S5 32/32, with no unused definitions.
   - Clicking a marker shows the note in the margin.
5. **Original-language passages:**
   - The primary blocks carry the correct `lang` values:
     - S3: en, ar, ar, sa, sa, pi, la, ja
     - S4: en, en, pi, la, de
     - S5: la, fr, sa, sa, ar
   - All five Chinese source blocks render as source blocks with the right note.
6. **Practice content:** a set appears at every 想一想 (6 + 6 + 6). A script confirmed:
   - 18/18/18 questions;
   - labels identical to the manuscripts;
   - unique ids;
   - valid answers;
   - 3 per set;
   - a note on every option.
7. **Practice in the browser:** all 54 questions were answered with their keyed answers. Each was accepted, and the feedback for every option appeared. Also checked:
   - a wrong multi answer followed by 直接看答案, using the real mouse;
   - a radio question answered by keyboard only (Space, arrows, Tab, Enter);
   - the true/false wrong-answer path;
   - a view question's output.
8. **Practice storage:** practice is saved under 18 separate keys (`philopilot.v2.s3.practice.<label>` and so on). Answering left the position and progress keys unchanged.
9. **Components placed:** CausationCases in S3 三, IdentityCases in S4 二 and ThoughtExperimentMap in S5 四, each once.
10. **Components work:** each was driven through every step, and its tallies and summaries were checked by hand against the entries.
11. **Component state:** the keys are `philopilot.v2.s3.media.causation-cases`, `philopilot.v2.s4.media.identity-cases` and `philopilot.v2.s5.media.thought-experiment-map`.
    - Selections survive a reload.
    - 重新开始 clears them.
    - Using a component causes no scroll jump and does not change the reading position key.
12. **Keyboard, focus, touch and reduced motion:**
    - All controls are native buttons in labelled groups, with `aria-pressed`.
    - The focus ring is a visible 2px outline.
    - An emulated touch tap worked (maxTouchPoints 5).
    - The components contain no animation or transition.
13. **375px:** at 375 × 812 the course pages, readers and components have no horizontal overflow. Document width is 375 and component width 343.
14. **Resume:** "继续阅读" returns to the saved block (checked in S3 二).
15. **Related links (no duplicates, no locks):**
    - A3's "读完以后" lists S2 and S4 as links and S7 as not yet built, as the curriculum says (corrected in §6.2).
    - The links that existing courses already had now open the new courses:
      - IA3 → S3
      - IN2 → S4
      - AF1 → S4
      - IN7 → S5
      - EA10 → S5
    - No course is locked.
16. **Domain C navigation and search:**
    - On 哲学问题, the S3, S4 and S5 rows open the courses. Opening S5 from there gives the breadcrumb 首页 › 哲学问题 › 心灵哲学与意识.
    - The search palette finds the three courses and their section headings (for example 因果, 反事实, 麦克塔格特, 人格, 意向性).
17. **Regressions, Cases and whitespace:**
    - S1, S2, A3, IA3, CN1 and the methods region still open.
    - `#/cases` and the CASE 02 《分洪》 reader still open.
    - No console or server errors were logged.
    - `git diff --check` is clean.
    - The new files have no trailing whitespace and no tabs.
    - Manuscripts and reports are CRLF; source files are LF, like their neighbours.
    - `git status` shows only the files listed in §2.
18. **Targeted corrections:** re-verified after the corrections; see §6.3.

### Assumed (not directly verified)

- **Touch:** only emulated touch was used, not a real touch device.
- **Screen readers:** output was not tested with an actual screen reader.
- **Deployment:** the preview was the production build served locally; the deployed site was not touched.
- **Reused texts:** the transcriptions and translations reused from other courses are assumed to be as accurate as those courses' reports say.

## 4. Questions for the Product Owner (answered)

The Product Owner's decisions:
- Question 1: fix (done, §6.1).
- Questions 2–8: no change in V31. SEALED A3, A4, S1 and S2 practice sets are not reordered. Search indexing is not expanded. The true/false feedback convention stays. No onward courses are invented for S3–S5, and no topic pages are created. The S4/D2 curriculum boundary stays. Unrelated comments and infrastructure are left alone.

The original questions:


1. **S2's 朱子語類 quotations (SEALED, not changed).** S2 was parsed without `citeNoteRefs`, so its Chinese source quotations that end in a note marker render as plain callouts, not source blocks. S3–S5 use the option. The fix in S2 is a one-line change to `s2.ts`. Should it be made?
2. **V30 practice predictability (not changed).** In A4, S1 and S2 (and the earlier A3) every single-answer key is option A, and 9 of their 11 true/false answers are "false" (checked in the practice files). V31 spreads answers over A–D and includes true items. Should V30's sets be reordered?
3. **Search scope.** Search indexes course names and `##`/`###` headings only, so terms in body text (中文屋, 僵尸) or in `####` headings are not found. Is wider indexing wanted?
4. **True/false feedback wording.** The existing practice UI prefixes "这句话是对的/错的" to the item's feedback, which sometimes repeats the item's own wording. V31 follows the convention. Should it change?
5. **Onward links.** The curriculum names no course after S3, S4 or S5, so their `leadsTo` is empty and the pages say so. Should any onward links be added, for example S5 → S7?
6. **Topic pages.** The S3–S5 rows on 哲学问题 open the courses, but the topics are still not expanded as topic pages, as in V30.
7. **S4 and D2 overlap.** The curriculum gives D2 the cross-tradition no-self debate "at greater length". S4 三 treats Hume and the Milindapañha in one section and compares them. When D2 is written, should S4 三 point to it, or should D2 avoid repeating S4?
8. **A stale code comment.** `CoursePage.tsx` has a comment that still mentions only S1 and S2. It was left alone as unrelated; the behaviour is correct for S3–S5.

## 5. Git status

- **Uncommitted:** HEAD is still 68e84c0.
- **Untracked:** the 12 new files and the 4 reports listed in §2.
- **Modified:** the 7 files listed in §2.
- **Next step:** awaiting Product Owner review and explicit Git authorization.

## 6. Final targeted corrections after Product Owner review

### 6.1 S2: 朱子語類 quotations restored as source blocks

- **Cause:** S2 was parsed without the parser's `citeNoteRefs` option. The two 《朱子語類·卷一》 quotations in S2 三 end in a citation followed by a note marker, `（《朱子語類·卷一》）[^11]`. Without that option the parser does not recognise them, so they fell through to ordinary quotation callouts.
- **Fix:** `prototype/navigation-v2/src/content/s2.ts`, one line: `parseCourse('S2', raw, { exPrefix: 's2', citeNoteRefs: true })`. This is the same option S3–S5, IN3 and IN4 use.
- **Not changed:** the S2 manuscript, its content, its footnote numbering and its practice questions. The source note text comes from the existing `srcNoteA` helper, which already had the 朱子語類 case.
- **Scope checked:**
  - The manuscript has six blockquotes that end in a citation.
  - The other four (胜论经 1.1.4 and 1.2.7, 范畴篇 1a20–25 and 2a11–14) are each followed by a 本章试译 paragraph. The parser handles them as primary blocks before this option is consulted, so they are unaffected.
- **Verified in the browser:**
  - Both quotations in S2 三 now render as source blocks (`.blk.source` / `.source-text`). Each shows the label 《朱子語類·卷一》, the note "录文与《宋明理学至清代》相同" and the note-11 marker.
  - Clicking the marker opens note 11 (《朱子语类·卷一》，录文与《宋明理学至清代》一课相同……) in the margin.
  - S2's primary blocks are unchanged: 一 sa, 二 grc and grc, 三 sa.

### 6.2 A3: onward-course metadata

- **Finding:** V31 had not changed `A3.leadsTo`; it was still `['S2', 'S4', 'S7']`. V31 had changed `A3.recommendFrom` from `['S2']` to `['S2', 'S3', 'S4', 'S5']`.
- **Why that mattered:** `CoursePage` lists `recommendFrom` under 读完以后, ahead of `leadsTo`. So S3 and S5 appeared on A3's page as follow-on courses, which the curriculum does not list for A3. That was an unintended change to A3's onward list.
- **Fix:** `A3.recommendFrom` and its comments are restored to the V30 text: `recommendFrom: ['S2']`, with "Curriculum: "Feeds S2, S4, S7". S2 is listed once, under recommendFrom." The A3 entry in `courses.ts` is now identical to HEAD. A3's manuscript, practice and component are untouched.
- **Kept as is:** S3, S4 and S5 still state A3 as recommended background on their own pages: "大纲建议先读「概念、案例与思想实验」（推荐背景，不是必需）". That is their `background` field; it does not alter A3's onward list.
- **Verified in the browser:**
  - A3's 读完以后 shows three entries, each once:
    - 形而上学 (S2), link;
    - 人格、自我与自由意志 (S4), link;
    - 伦理学 (S7), "原型未实现";
    - followed by "以上联系均来自课程大纲。".
  - Clicking S4 opens `#/course/S4`.
  - S3 and S5 no longer appear on A3's page.

### 6.3 Validation after the corrections

1. **S2:** source-block rendering and note attribution verified (§6.1).
2. **A3:** metadata and navigation verified (§6.2).
3. **Build:** `tsc --noEmit` passes, and `npm run build` passes with the same chunk-size warning.
4. **Diff:** `git diff --check` is clean.
5. **Whitespace:** the 16 untracked files (12 new files and 4 reports) have no trailing whitespace and no tabs.
6. **Scope:** `git status` shows only the 7 modified files in §2 and the untracked V31 files. Nothing changed in Cases, `planning/` or any manuscript.
7. **Routes:** after a clean reload, these routes all loaded with no failed requests:
   - S2 一, 二 and 三;
   - the A3, S3 and S4 course pages;
   - S5 四;
   - 哲学问题.

   Some 404s appeared in the console during the first check; they came from the page being navigated before it was reloaded onto the new build.

The complete 54-question practice test and the academic review were not repeated, as instructed.

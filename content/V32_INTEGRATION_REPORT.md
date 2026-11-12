# V32 integration report — S6, S7, S8

*Three courses written and integrated in one cycle:*
- *S6 《语言、意义与指称》, Core ●, 6 sections (Philosophical Problems, position 6);*
- *S7 《伦理学：对与善、道德修养》, Core ●, 7 sections (position 7);*
- *S8 《元伦理学与道德心理学》, Extended ○, 6 sections (position 8).*

*Baseline: HEAD fe2e802 (V31).*

*Not done in this cycle:*
- *Git: nothing has been committed, pushed, merged or deployed.*
- *No Cloudflare setting was touched.*
- *No SEALED manuscript was changed, nor any file in Cases or under `planning/`.*
- *No image was downloaded or proposed.*
- *S9 was not begun.*
- *No dependency was added.*
- *No unrelated refactoring was done.*

## 1. Coverage

| Course | Sections | Exercises | Practice | Notes | Original passages | Six-question comparisons | Component |
|---|---|---|---|---|---|---|---|
| S6 | 6 (+导读, 结语) | 6 | 18 | 47 | 11 primary + 6 source (en, de, sa, ar, zh) | 2 | ReferenceCases (一) |
| S7 | 7 (+导读, 结语) | 7 | 21 | 27 | 5 primary + 4 Chinese source (en, de, grc, pi, zh) | 2 | FrameworkCase (七) |
| S8 | 6 (+导读, 结语) | 6 | 18 | 29 | 3 primary + 3 Chinese source (en, grc, zh) | 1 | MetaethicsMap (四) |
| **Total** | **19** | **19** | **57** | **103** | **32** | **5** | **3** |

**Practice types across the 57 questions:**

| Type | Count |
|---|---|
| single | 38 |
| multi | 7 |
| true/false | 6 (3 true, 3 false) |
| view | 6 |

- Every option of every question has feedback.
- Single-answer keys use all four letters in every set, with no runs.
- Multi keys vary (BCD, ACD, ABD, BC, BCD, ABC, BCD).

**Original passages:** all 32 were already checked by another course on the site. They are used with that course's text and translation, and the course is named in each note. A script confirmed that each original is an exact substring of its source course; two Greek passages needed their documented cut points allowed for. V32 checked no new primary text.

**Main text:** about 19,500, 14,200 and 13,600 Han characters before the notes.

**Course boundaries kept:**

| Course | Boundary | How it is kept |
|---|---|---|
| S6 | No EA8 chronology | Frege, Russell and the *Tractatus* are used as positions, and the history is referred to EA8 |
| S6 | No detailed Kripke | Kripke is paraphrased from SEP, and EA10 is named for the detail |
| S7 | No metaethics | 一 lists metaethics among the things this chapter is not, and every metaethical question is sent to S8 |
| S7 | D4's virtue/care/relation comparison | Left to D4 by name |
| S8 | Psychological explanation is not justification | This is the chapter's "most important methodological reminder" (导读, 四, 五, 六, 结语) |

The production reports (`S6_`, `S7_`, `S8_PRODUCTION_REPORT.md`) give coverage against the curriculum, argument sources, primary-text and bibliographic limits, comparisons, statistics, practice, components, checked vs assumed, and unresolved issues.

## 2. Integration changes: exact list of files

**New files (15, plus these 4 reports):**

- Manuscripts (CRLF): `content/S6_SAMPLE_DRAFT.md`, `content/S7_SAMPLE_DRAFT.md`, `content/S8_SAMPLE_DRAFT.md`
- Course modules (LF): `prototype/navigation-v2/src/content/s6.ts`, `s7.ts`, `s8.ts`
  - each is a copy of `s5.ts` with the code changed;
  - each parses with `citeNoteRefs: true` and takes the core question from the manuscript.
- Practice sets (LF): `prototype/navigation-v2/src/content/practice-s6.ts`, `practice-s7.ts`, `practice-s8.ts`
- Components (LF):
  - `prototype/navigation-v2/src/ui/media/s6/ReferenceCases.tsx`
  - `prototype/navigation-v2/src/ui/media/s7/FrameworkCase.tsx`
  - `prototype/navigation-v2/src/ui/media/s8/MetaethicsMap.tsx`
- Reports (CRLF): `content/S6_PRODUCTION_REPORT.md`, `S7_PRODUCTION_REPORT.md`, `S8_PRODUCTION_REPORT.md`, `V32_INTEGRATION_REPORT.md`

(15 counts the three component files individually; `git status` shows them as three new directories.)

**Modified files (6). `git diff --numstat`: 104 insertions, 4 deletions:**

| File | +/− | Change |
|---|---|---|
| `src/content/courses.ts` | 78 / 0 | See the list below. Additions only; no existing entry changed |
| `src/content/media.ts` | 13 / 1 | Three MediaIds (`reference-cases`, `framework-case`, `metaethics-map`), each anchored once to the paragraph after its table (S6 一, S7 七, S8 四). The −1 is the old last union member losing its semicolon |
| `src/content/practiceSets.ts` | 6 / 0 | Registers the three practice sets |
| `src/data/catalog.ts` (CRLF kept) | 3 / 2 | Adds `c('S6', '语言、意义与指称', 'core', 'C')` after S5 (S7 and S8 were already in the catalogue). Two HUMAN_NATURE labels updated (§4) |
| `src/ui/media/Media.tsx` | 3 / 0 | Three lazy imports |
| `src/ui/media/in4/shared.tsx` | 1 / 1 | The `useSavedIx` course union gains `'S6' \| 'S7' \| 'S8'` |

**The `courses.ts` changes:**

- Imports S6, S7 and S8.
- Adds course entries for them:
  - tradition `sys`, positions 6–8, tiers ●/●/○, English names;
  - method focus from the curriculum;
  - backgrounds:
    - S6: "无前置要求；大纲认为「形式推理：命题逻辑与谓词逻辑」会有帮助（不是必需）" (A2 helpful);
    - S7: "大纲建议先读「什么是哲学？问题、论证与阅读」（推荐背景，不是必需）" (A1 recommended);
    - S8: "大纲建议先读「伦理学：对与善、道德修养」（推荐背景，不是必需）" (S7 recommended).
  - No course is locked.
- Every entry has `recommendFrom: []` and `leadsTo: []`, with a comment explaining why (§4), plus a `sourceNote`.
- Adds two helpers for S6–S8 only:
  - `srcNoteS6to8` names the course whose transcription a Chinese source block reuses (CN2 for 墨子, 荀子 and 滕文公; CN1 for 孟子; CN6 for 傳習錄);
  - `origLangS6to8` adds ar, grc, pi and German detection by function words, because two of S6's Frege sentences contain no umlaut.

  V31's `srcNoteS` and `origLangS` are untouched, so S3–S5 render exactly as before.

Saved-state types: the components use `useSavedIx` (union widened above), and practice uses the existing per-label keys. No new storage mechanism was added.

**Unchanged:**

- Cases;
- `planning/`;
- all SEALED manuscripts and their practice sets;
- every existing course entry, including A3's;
- `package.json` and the lockfile;
- Cloudflare configuration;
- the shared `Practice.tsx`, `Reader.tsx` and `CoursePage.tsx`.

## 3. Validation

### Verified (run or observed in this cycle)

All browser checks were run on the production build (`npm run build`), served locally on port 5189 and loaded with a cache-busting query.

1. **All 19 sections render.**
   - S6 has 10 parts: 导读, 一–六, 结语, 注释, 来源;
   - S7 has 11: 导读, 一–七, 结语, 注释, 来源;
   - S8 has 10.

   Each numbered section has one exercise and one practice set of three. Each component appears once, in its intended section.
2. **Notes and cross-references.**
   - Footnote markers resolve 47/47, 27/27 and 29/29, with no empty definition.
   - A marker click shows the margin note.
   - Primary-block `lang` values:
     - S6: en | de ×4 | sa ×3 | sa, sa, ar;
     - S7: en, de, grc, pi, grc;
     - S8: en, en, grc.
   - Every Chinese source block names the correct source course.
   - Course titles cited in the text were checked against the catalogue; several were corrected to their full catalogue form during writing (EA10 and IN5 in S6, AF1 in S7, KR1 in S8).
3. **All 57 questions are valid.**
   - **Script:** labels match each 想一想, ids are unique, there are 3 per set, every answer is valid and every option has a note.
   - **Browser:** all 57 were answered with the key and every one was accepted:
     - 51 graded items were marked right;
     - the 6 view items showed every position's cost;
     - every single and multi item showed a note for every option.
   - **Wrong paths:**
     - a wrong multi pick (s7-2-1) showed per-option feedback, "还有 2 个应选的选项没有选上", 再试一次 and 直接看答案;
     - 直接看答案 revealed A, B, D with notes;
     - a wrong true/false pick (s7-1-3) showed the item's `wrong` text.

   A correct true/false answer shows only "回答正确。"; this is the shared convention of `Practice.tsx`, which is unchanged.
4. **Components work.** Each component was driven through every branch:
   - **ReferenceCases:**
     - all six cases and the martini case;
     - the tally matched a hand computation (5 firm; descriptivism 2 agree / 2 further; causal 2 agree / 2 further).
   - **FrameworkCase:**
     - all three cases to the verdict;
     - 移植 and 转轨 show the "本章没有用德性伦理和关怀伦理分析" note;
     - verdicts without a supporting framework say so.
   - **MetaethicsMap:**
     - the five positions plus "open" through question 5 and every objection (3, 3, 2, 2, 2);
     - the summary claims appear.
5. **Keyboard, mouse and touch.**
   - **Keyboard:** Tab moves to the next choice and Enter selects it (`aria-pressed=true`, saved). The focused button matches `:focus-visible`, with a 2px solid outline.
   - **Mouse:** clicks drove all of item 4.
   - **Touch:** at 375px with mobile emulation (touch points), a tap on 移植 switched the S7 case.
   - **Motion:** no new animation, so reduced motion is unaffected.
6. **No overflow at 375px.** 34 routes were checked: the three course pages and every reader part of S6–S8, with components expanded. On every route, `scrollWidth` = `clientWidth` = 375 and no element extends past the viewport.
7. **State survives a reload.** A MetaethicsMap choice made by keyboard was still pressed after `location.reload()`, and the S8 practice sets were still shown as answered. 重新开始 clears each component (saved JSON returns to `INIT`).
8. **Practice does not overwrite the reading position.**
   - Snapshots of the non-practice, non-media S6–S8 keys before and after answering all 57 questions showed no change.
   - Practice keys are `philopilot.v2.s{6,7,8}.practice.<label>` (19 sets).
   - Component keys are `philopilot.v2.s{6,7,8}.media.<id>`.
9. **Progress and resume.** S8's course page showed "已读 7% · 继续阅读 → 回到：道德知识 · 四种立场与它们的代价", matching `philopilot.v2.s8.position`.
10. **Domain C lists the courses.** On 哲学问题 (Domain C):
    - S6 appears as a live link under the 语言与意义 topic and opens `#/course/S6`;
    - S7 and S8 appear in the 人性与道德 feature's "可读到" list;
    - on the topic page, the S7 and S8 labels match real headings in the manuscripts.
11. **Search finds titles and sections.** Examples: "语言、意义" → the S6 course and its sections; "四、遮诠与否定"; "弗雷格" → S6 二 and S8 二; "阿梅" → S7 导读, 二, 三; "弗雷格—吉奇"; "意志软弱" → S8 六 (alongside CN6).
12. **Related links are correct.** These pages now show live buttons to the new courses, each opening the right page:
    - to S6: A2, EA8, EA10, IN3, IN5, CN2;
    - to S7: A3, CN1, EA4, EA7, JP1, GR1, GR3;
    - to both S7 and S8: EA11.

    The links come from those courses' existing `leadsTo`.
13. **No duplicated or invented links.** Each related course appears once per page. No link was added to any existing course, and S6–S8 show "课程大纲没有为这门课列出后续课程".
14. **Earlier courses still work.** S1–S5, A3, CN1, CN6 and EA11 render with their practice sets and components. A3's 读完以后 is as approved in V31.
15. **CASE 02 is unchanged.** `#/cases` lists the cases, and `#/cases/02` opens 《分洪》. `git status` shows no change under Cases.
16. **No console errors.** After a fresh load, a sweep of every S6–S8 route plus 哲学问题, the topic page, `#/cases`, `#/cases/02` and the home page logged no `error` events and no resource with status ≥ 400. The console buffer still held nine "404" lines from earlier in the session; they could not be reproduced on the fresh load and have no URL attached (see §5, item 4).

**Build and repository checks:**

- **TypeScript:** `npx tsc --noEmit` exits 0.
- **Build:** `npm run build` exits 0, with only the existing chunk-size warning.
- **`git diff --check`:** clean.
- **Whitespace and line endings (script over all 18 new or changed files):**
  - no trailing whitespace, no tabs, every file ends with a newline;
  - manuscripts and reports are CRLF;
  - `catalog.ts` stays CRLF;
  - other source files are LF.

  The "LF will be replaced by CRLF" warnings are Git's `core.autocrlf=true` notice and existed before V32.

### Assumed (not directly verified)

- **Touch:** only emulated touch was used, not a real touch device.
- **Screen readers:** output was not tested with an actual screen reader.
- **Deployment:** the preview was the production build served locally; the deployed site was not touched.
- **Reused texts:** the transcriptions and translations reused from other courses are assumed to be as accurate as those courses' reports say.
- **Sources:** SEP and IEP content beyond the parts read is assumed consistent with what the chapters say.

## 4. Metadata decisions

1. **`recommendFrom: []` and `leadsTo: []` for S6, S7 and S8.**
   - This follows the V31 precedent for A3: courses named only as *background* are not added as onward links.
   - The curriculum lists no onward course for S6, S7 or S8.
   - Incoming links (item 12 in §3) come from the other courses' own existing `leadsTo`, so they became live without any edit.
2. **HUMAN_NATURE labels (`catalog.ts`).** The 人性与道德 topic listed S7 and S8 with placeholder section labels written before the courses existed. They now name the real sections:
   - S7: "§6 修养与实践" → "六、修养与实践 · 儒家：四端与扩充 · 斯多亚派：判断的练习";
   - S8: "§5 情感 · §6 意志软弱" → "五、情感与道德动机 · 情感是一种判断吗？ · 六、意志软弱与道德运气".

   These are metadata only; the topic page structure is unchanged.
3. **Catalogue.** S6 was the only one of the three missing from `COURSES`, so it was added. The 语言与意义 topic stays `implemented: false`, so no new topic page was created.
4. **New helpers instead of edits.** `srcNoteS6to8` and `origLangS6to8` were added rather than widening V31's helpers, so S3–S5 output cannot change.

## 5. Open questions for the Product Owner

1. **S7 → S8 and S7 → D4.** S8 and D4 both name S7 as recommended background, and the topic data already records "S7 → S8". S7's page says the curriculum lists no onward course. Following the A3 precedent, no link was added. Should S7's 读完以后 list S8 (and D4 once it exists)?
2. **S6 length.** S6 is about 19,500 Han characters, against 13,600–15,700 for S3–S5 and S7–S8. Section 五 covers three traditions, as the curriculum's scope asks. Is this acceptable, or should 五 be shortened in a later cycle?
3. **True/false feedback on a correct answer.** A correct true/false answer shows only "回答正确。", because the shared practice UI shows the `wrong` text only after a wrong pick. This is unchanged and consistent across the site. It is raised only because S8 s8-6-2 carries a point (Wang Yangming and Socrates disagree on *why*) that a reader who answers correctly never sees.
4. **Console 404s.** Nine "Failed to load resource: 404" lines were in the console buffer during the session. They did not recur on a fresh load and full sweep, and no failing resource could be identified. They are most likely from earlier builds' chunk hashes being requested after a rebuild. No action was taken.

## 6. Git status

- **Uncommitted:** HEAD is still fe2e802.
- **Untracked:**
  - the 3 manuscripts;
  - `s6.ts`, `s7.ts`, `s8.ts`;
  - `practice-s6.ts`, `practice-s7.ts`, `practice-s8.ts`;
  - `ui/media/s6/`, `s7/`, `s8/`;
  - the 4 reports.
- **Modified:** the 6 files listed in §2.
- **Next step:** awaiting Product Owner review and explicit Git authorization.

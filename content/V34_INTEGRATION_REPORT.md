# V34 integration report — S12, S13, D1

*Three courses written and integrated in one cycle:*
- *S12 《宗教哲学、死亡与人生意义》, Core ●, 6 sections (Philosophical Problems, position 12);*
- *S13 《美学与艺术哲学》, Extended ○, 5 sections (Philosophical Problems, position 13);*
- *D1 《比较哲学：方法与陷阱》, Core ●, 6 sections (Cross-Tradition Dialogue, position 1 — the first readable domain-D course).*

*Baseline: HEAD 0ebeb2c (V33).*

*Not done in this cycle:*
- *Git: nothing committed, pushed, merged or deployed.*
- *No Cloudflare setting touched.*
- *No SEALED manuscript changed except the PO-authorized source-label corrections in IN2 and IN1 (§9); no file in Cases or under `planning/` changed.*
- *No image downloaded or embedded; candidates for S13 are in `S13_IMAGE_APPROVAL_SHEET.md`.*
- *D2 and any further batch not begun. No curriculum expansion. No dependency added. No redesign or unrelated refactoring.*

## 1. Coverage

| Course | Parts | Exercises | Practice | Notes / refs | Quoted passages | Six-question comparisons | Component |
|---|---|---|---|---|---|---|---|
| S12 | 6 (+导读, 结语) | 6 | 18 | 29 / 60 | 13 primary + 5 Chinese | 3 | ArgumentAnalyzer (二) |
| S13 | 5 (+导读, 结语) | 5 | 15 | 19 / 40 | 10 primary + 4 Chinese | 1 | InterpretationEvidence (三) |
| D1 | 6 (+导读, 结语) | 6 | 18 | 16 / 37 | 2 primary + 11 Chinese | 1 (worked repair) | ComparisonRepair (六) |
| **Total** | **17** | **17** | **51** | **64 / 137** | **45** | **5** | **3** |

Reading text as displayed: S12 ≈ 25,000, S13 ≈ 20,000, D1 ≈ 15,000 characters.

Every manuscript has orientation, core question, guided readings, reconstructions, objections, tables, notes, a rights appendix, exercises and a conclusion. None has a "Critiques & Responses" section.

## 2. Arguments and sources

Details in the three production reports (§2–§4 each). In short:
- All reconstructions are labelled ［本章的重建］; all modern authors are paraphrased, never quoted.
- 45 quoted passages. 38 are reused verbatim from courses that already checked them and were re-verified by script. 7 are new and were checked this cycle: Hume ST 6, 7, 15, 23 (Hume Texts Online); 谢赫 preface and 提要 (zh.wikisource rev. 2062706); 王维《鹿柴》 (zh.wikisource).
- Unverified and marked as such: the *rasa-sūtra* wording; al-Ghazālī and the hadith on beauty (paraphrase only; sunnah.com was blocked and no workaround was attempted); the 2001 Derrida / 郑家栋 debate; several "common account" claims listed in each appendix.
- Brief boundaries met: no apologetics; Buddhism not called "atheism"; Daoism not one doctrine; defence ≠ explanation of actual suffering; mystical experience ≠ proof of the supernatural; Hume ≠ Kant; rasa ≠ "aesthetic emotion"; no modern copyrighted artwork; D1 does not repeat A4 or the Domain-B narratives.

## 3. Practice

| Course | single | multi | tf | view | Total |
|---|---|---|---|---|---|
| S12 | 8 | 3 | 4 | 3 | 18 |
| S13 | 7 | 2 | 3 | 3 | 15 |
| D1 | 7 | 4 | 4 | 3 | 18 |
| **Total** | **22** | **9** | **11** | **9** | **51** |

17 sets (S12 一–六, S13 一–五, D1 一–六), at most 3 questions each; ids `s12-n-m`, `s13-n-m`, `d1-n-m`. Practice state is stored under `philopilot.v2.<code>.practice.<label>`, separate from position and progress. View questions never have a correct answer; each option states what it must carry.

## 4. Components — interaction rationale

| Component | Course · anchor | What the reader does | Why this interaction |
|---|---|---|---|
| ArgumentAnalyzer | S12 · end of 二 | Picks one of three reconstructed arguments, then the premise they find most doubtful; sees objection, reply, and what survives if the premise fails | The method focus is evaluating arguments; locating the weakest premise is the core skill, and comparing three arguments shows that they fail (if they fail) in different places |
| InterpretationEvidence | S13 · end of 三 | Chooses a claim about 鹿柴; classifies seven pieces of evidence by kind and bearing; sees the chapter's analysis beside their own | The method focus is building and testing an interpretation; the same evidence weighs differently for two claims |
| ComparisonRepair | D1 · end of 六 | Marks which of the ten principles each clause of a new flawed comparison breaks; compares with the analysis; reads a six-question revision | The method focus is detecting hidden assumptions in a comparison |

All three:
- use only concepts introduced before their anchor;
- reuse existing classes and shared pieces (`md`, `v21-steps`, `v22-btns`, `Claim`, `Limits`, `Pick`, `useSavedIx`) with no new CSS and no new dependency;
- use native buttons with `aria-pressed`, labelled groups and `aria-live` results, so keyboard and touch work;
- have no animation of their own, so reduced motion is unaffected;
- save state per course (`philopilot.v2.<code>.media.<id>`) and have a reset;
- never declare a disputed position correct: no scoring, every claim tagged with its basis, the reader's differing answer "may also hold".

## 5. Integration points

| File | Change |
|---|---|
| `src/content/s12.ts`, `s13.ts`, `d1.ts` (new) | Course modules (S11 template, `citeNoteRefs`) |
| `src/content/practice-s12.ts`, `practice-s13.ts`, `practice-d1.ts` (new) | Practice sets |
| `src/content/practiceSets.ts` | 3 imports, 3 map entries |
| `src/content/courses.ts` | 3 imports; `Tradition` gains `'cmp'` (`TRADITION_NAME.cmp = '跨传统对话'`); S12, S13, D1 entries; new helpers `srcNoteS12toD1`, `origLangS12toD1` (earlier helpers untouched, so earlier courses render as before) |
| `src/ui/nav.ts` | `canonicalOf`: `cmp` → 跨传统对话 region |
| `src/content/media.ts` | 3 `MediaId` members, 3 anchors |
| `src/ui/media/Media.tsx` | 3 lazy imports |
| `src/ui/media/in4/shared.tsx` | `useSavedIx` code union gains `'S12' | 'S13' | 'D1'` |
| `src/ui/media/s12/ArgumentAnalyzer.tsx`, `s13/InterpretationEvidence.tsx`, `d1/ComparisonRepair.tsx` (new) | Components |
| `src/data/catalog.ts` (CRLF kept) | Rows for S12 and S13 added after S11. D1 already had a row. Topics 'meaning' and 'beauty' left `implemented: false` (V33 precedent) |
| `src/data/units.ts` | Unchanged: names already match the manuscript titles |

**Link semantics.** Following the V31–V33 precedent, `recommendFrom: []` and `leadsTo: []` for all three (the curriculum lists no onward course for them, and background-only mentions are not turned into links). The incoming curriculum links became live without editing any other course: IN6 → S12, JW1 → S12, CN7 → D1, CN8 → D1, A4 → D1.

## 6. Validation (17 checks)

Run on the production build (`npm run build`, preview server on port 5189). `tsc --noEmit` is clean.

| # | Check | Result |
|---|---|---|
| 1 | Sections render | Pass — 23 reader pages (8 + 7 + 8) render |
| 2 | Titles and order | Pass — every `h1` matches the manuscript, in order |
| 3 | Notes resolve | Pass — 137 / 137 footnote buttons open a non-empty margin note |
| 4 | 51 valid questions | Pass — 51 rendered; all 42 graded questions accept their key ("回答正确"); 9 view questions render with "确定我的立场" |
| 5 | Components work | Pass — all three render at their anchors and respond |
| 6 | Keyboard and touch | Pass — ComparisonRepair driven by Tab / Shift+Tab / Enter / Space with a visible 2 px outline; the other two driven by click/tap at 375 px |
| 7 | No overflow at 375 px | Pass — `scrollWidth = 375` on all 23 reader pages, and with every D1 analysis expanded and the S13 evidence list open |
| 8 | Saved state survives reload | Pass — S12 and S13 component state restored after `location.reload()`; practice state persisted |
| 9 | Practice does not overwrite reading position | Pass — answering a question in S13 三 left the saved section, block and heading unchanged (only the timestamp was refreshed by the scroll the click caused) |
| 10 | Progress and resume | Pass — real scrolling saved `s13.position` (section 3, heading "几种立场") and `s13.progress`; the table of contents shows "已读 n%" |
| 11 | Domain C includes S12 and S13 | Pass — #/questions lists both as openable; topics 信仰、死亡与意义 and 美与艺术 name them; course pages read "哲学问题 · 第 12 / 13 门" |
| 12 | Domain D includes D1 | Pass — #/region/dialogue shows D1 with "打开课程 →"; course page reads "跨传统对话 · 第 1 门" |
| 13 | Catalogue and search | Pass — search finds 宗教哲学, 美学 and 东方主义 (course titles and section headings) |
| 14 | Links | Pass — incoming links from IN6, JW1, CN7, CN8 and A4 open the new courses; the new courses' "读完以后" says the curriculum lists no onward course |
| 15 | Earlier courses still open | Pass — 23 earlier courses (CN, IN, IA, JW, EA, GR, A, S, AF, JP, LA, KR) open at the front page and at section 1 |
| 16 | CASE 02 unchanged | Pass — no file under Cases changed (`git status`); #/cases/02 opens |
| 17 | No console errors | Pass on a fresh load: no errors through all three courses, the regions and CASE 02. Earlier in the session nine 404s appeared; they all came before a fresh-load marker and were stale chunk requests from a tab that outlived a rebuild |

`git diff --check`: clean.

**Line endings.**
- The three manuscripts and the five reports are CRLF. The manuscripts were briefly LF; they were converted, and the conversion was re-checked after a later edit.
- New and changed `.ts` / `.tsx` files are LF. `catalog.ts` remains CRLF.
- Git prints its usual "LF will be replaced by CRLF" warning for the modified LF files; this is the repository's autocrlf setting and does not affect the working copies.

## 7. Exact file list

New:
- `content/S12_SAMPLE_DRAFT.md`, `content/S13_SAMPLE_DRAFT.md`, `content/D1_SAMPLE_DRAFT.md`
- `content/S12_PRODUCTION_REPORT.md`, `content/S13_PRODUCTION_REPORT.md`, `content/D1_PRODUCTION_REPORT.md`
- `content/S13_IMAGE_APPROVAL_SHEET.md`, `content/V34_INTEGRATION_REPORT.md`
- `prototype/navigation-v2/src/content/s12.ts`, `s13.ts`, `d1.ts`
- `prototype/navigation-v2/src/content/practice-s12.ts`, `practice-s13.ts`, `practice-d1.ts`
- `prototype/navigation-v2/src/ui/media/s12/ArgumentAnalyzer.tsx`
- `prototype/navigation-v2/src/ui/media/s13/InterpretationEvidence.tsx`
- `prototype/navigation-v2/src/ui/media/d1/ComparisonRepair.tsx`

Modified:
- `content/IN1_SAMPLE_DRAFT.md` (PO-authorized label correction only, §9)
- `content/IN2_SAMPLE_DRAFT.md` (PO-authorized label correction only, §9)
- `prototype/navigation-v2/src/content/courses.ts` (V34 entries; IN1 and IN2 `sourceNote` labels, §9)
- `prototype/navigation-v2/src/content/media.ts`
- `prototype/navigation-v2/src/content/practiceSets.ts`
- `prototype/navigation-v2/src/data/catalog.ts`
- `prototype/navigation-v2/src/ui/media/Media.tsx`
- `prototype/navigation-v2/src/ui/media/in4/shared.tsx`
- `prototype/navigation-v2/src/ui/nav.ts`

(`dist/` was rebuilt for the preview; it is not part of the change set.)

## 8. Open questions for the Product Owner

1. **IN1 and IN2 edition labels.** Both resolved in this cycle on PO authorization (§9).
2. **Background links.** S12 recommends A1 and D1 recommends A4, but A1's and A4's `recommendFrom` were not changed, following the V33 precedent. A4's own code comment says "D1 and D11 will" list it. Should `recommendFrom` now be filled in?
3. **Topic pages.** Should 信仰、死亡与意义 and 美与艺术 become `implemented: true`, now that their courses exist?
4. **S13 images.** Approve or reject the three candidates. Candidate 3 still needs its rights confirmed.
5. **Unverified sources.** Should the following be checked before the drafts are sealed: the *rasa-sūtra* in a critical edition; al-Ghazālī and the hadith; and the 2001 legitimacy debate?
6. **Older notes.** `courses.ts` has two pre-existing source notes that cite course names which no longer match the catalogue: 《法家与汉代思想》 and 《老子、庄子与道家传统》. They were left alone as out of scope.

## 9. Targeted corrections: IN2 and IN1 source-edition labels

**Brief.** "PhiloPilot V34 — Final Targeted Source-Label Correction". All other decisions are as approved: no change to A1/A4 metadata, topic pages, S13 images, or the older course-title notes.

**Verification.**
- SuttaCentral's edition registry (`suttacentral/sc-data`, `misc/root_edition.json`) defines the `ms` root edition as *"Mahasaṅgīti Tipiṭaka Buddhavasse 2500"*, "The Buddhist Era 2500 Great International Council Pāḷi Tipiṭaka", published by the Dhamma Society Fund (Bangkok, from 1999).
- IN2's own appendix names this source: bilara-data, `root/pli/ms`.
- "摩诃僧祇" is the standard Chinese name of the Mahāsāṃghika school (as in 《摩诃僧祇律》), not of this edition. The label was therefore wrong.

**Edit.** The wrong name is replaced by "Mahāsaṅgīti 本", the same form S12 uses. Nothing else in IN2 changed.

| Place | Before | After |
|---|---|---|
| `IN2_SAMPLE_DRAFT.md`, section 七 (《长老尼偈》 paragraph) | 所载的摩诃僧祇本 | 所载的 Mahāsaṅgīti 本 |
| Sources appendix, 巴利文 bullet | 所载的摩诃僧祇（Mahāsaṅgīti）本 | 所载的 Mahāsaṅgīti 本 |
| Sources table, 巴利三藏 row (two cells) | root/pli/ms（摩诃僧祇本） / 摩诃僧祇（Mahāsaṅgīti）本 | root/pli/ms（Mahāsaṅgīti 本） / Mahāsaṅgīti 本 |
| `courses.ts`, IN2 `sourceNote` | 所载摩诃僧祇本（bilara-data） | 所载 Mahāsaṅgīti 本（bilara-data） |

**Unchanged.** The argument, quoted passages, translations, footnote numbering (185 references before and after), practice questions and components. `git diff` for IN2 is 3 lines changed, and the file stays CRLF.

**Validation.**
- `tsc --noEmit`: clean.
- `npm run build`: passes.
- `git diff --check`: clean.
- IN2 reading display, checked in the browser:
  - all 10 reading parts render;
  - 94 / 94 footnote buttons in sections 一–七 and the Critiques part resolve;
  - section 七 and the sources appendix show "Mahāsaṅgīti 本";
  - no "摩诃僧祇" appears anywhere in IN2.
- The production bundle contains the corrected IN2 note and no longer contains the old one.
- The 51-question test was not repeated, as instructed.

**IN1 (brief "PhiloPilot V34 — Final IN1 Correction, Commit and Push").** The same correction was applied to IN1. All five occurrences refer to SuttaCentral's Pāli text:
- four name the `root/pli/ms` edition, or a SuttaCentral-hosted text read from it;
- the fifth (sources appendix, sn22.59 and mn22) was read through SuttaCentral's public API rather than from the bilara-data files, but it is the same Pāli root edition, so it was corrected too.

No occurrence referred to anything else.

| Place | Before | After |
|---|---|---|
| `IN1_SAMPLE_DRAFT.md`, note 41 | 所载的摩诃僧祇（Mahāsaṅgīti）本 | 所载的 Mahāsaṅgīti 本 |
| Note 69 | 所载摩诃僧祇本 | 所载 Mahāsaṅgīti 本 |
| Note 71 | 所载摩诃僧祇本 | 所载 Mahāsaṅgīti 本 |
| Sources appendix, 《沙门果经》 bullet | 所载摩诃僧祇（Mahāsaṅgīti）本 | 所载 Mahāsaṅgīti 本 |
| Sources appendix, 《相应部》22.59 / 《中部》22 bullet | 所载摩诃僧祇本 | 所载 Mahāsaṅgīti 本 |
| `courses.ts`, IN1 `sourceNote` | 所载摩诃僧祇本 | 所载 Mahāsaṅgīti 本 |

For IN1:
- `git diff` is 5 lines changed.
- Footnote references are unchanged (174 before and after).
- The file stays LF, as it was; the repository stores all text as LF under `core.autocrlf=true`.
- No other IN1 material changed.

"摩诃僧祇" no longer occurs in any manuscript or source file of the app.

**Scope.** The changes are the V34 files in §7 plus the IN2 and IN1 label corrections.

Awaiting Product Owner review and explicit Git authorization.

# V24 integration report — EA3, EA5, EA6

*Written 2026-11-10. EA3, EA5 and EA6 are integrated into `prototype/navigation-v2` and ready for Product Owner acceptance. Updated the same day after the "Final Targeted Academic Corrections" brief: that work is reported in §10, and the figures in §2 are the revised ones.*

**What did not happen in this cycle:**

- Nothing was committed, pushed or deployed.
- No image was downloaded or embedded.
- EA4 was not rebuilt, rewritten or registered again.
- CASE 02 and the Cases work were not touched.
- No EA7 or later course was started.
- No testing infrastructure was added.

## 1. Registration and tiers

| Code | Title | Tier | Tradition position | Recommended background | Leads to | Listed as background by |
|---|---|---|---|---|---|---|
| EA3 | 经验论、启蒙与自由主义的起源 | ● Core | ea · 3 | EA2 | EA4 | EA4, EA7, EA11, LA1 |
| EA5 | 德国观念论与浪漫主义 | ● Core | ea · 5 | EA4 (intellectual dependency) | EA6, EA12 | EA6 |
| EA6 | 黑格尔之后：马克思、克尔凯郭尔、叔本华与尼采 | ● Core | ea · 6 | EA5 (intellectual dependency) | EA9, EA12 | EA9, EA12 |

All values come from `planning/CURRICULUM_REFERENCE_DRAFT.md`.

- **EA4:** its entry (`leadsTo: ['EA5','S1','S7']`, `recommendFrom: ['EA5']`) was **not changed**. Its link to EA5 now leads to a readable course.
- **Unpublished targets:** EA7, EA9, EA11, EA12 and LA1 show as "原型未实现", as before.
- **EA2:** only a code comment in its entry changed ("EA3 is not yet published" was removed). Its content and values are unchanged.
- **Catalogue (`data/catalog.ts`):**
  - EA3 was already listed.
  - EA5 and EA6 were added after EA4, both `core`.
  - The 人性与道德 topic link for EA3 was corrected from "§4 休谟论道德与宗教" to the real section title, "四、休谟论道德与宗教 · 理性是激情的奴隶 · 道德出于情感", and now opens the course.
- **Original-language passages:**

  | Course | `lang` per passage |
  |---|---|
  | EA3 | Latin for Bacon, French for Montesquieu, Rousseau and du Châtelet, English for the rest |
  | EA5 | German |
  | EA6 | Danish for Kierkegaard, German for the rest |

  All were checked in the browser.

## 2. Content summary

| Course | Characters (all / before 注释) | Notes | Primary blocks | Tables | 想一想 | Reader parts |
|---|---|---|---|---|---|---|
| EA3 | 56,220 / 42,618 | 92 | 54 | 18 | 6 | 9 |
| EA5 | 42,581 / 31,616 | 61 | 24 | 17 | 6 | 9 |
| EA6 | 35,139 / 26,354 | 44 | 19 | 15 | 6 | 9 |

At first integration the figures were: EA3 51,022 / 38,819, 83 notes, 50 primary blocks, 16 tables; EA5 36,106 / 27,250, 51, 21, 15; EA6 33,926 / 25,928, 43, 18, 15.

For comparison, EA2 has 44,207 characters and 66 notes, and EA4 has 56,673 characters and 132 notes.

- **Length:** EA5 and EA6 are shorter than EA2. Nothing was padded. In each, a part of the curriculum could be checked only through SEP (Günderrode via Herrera; the 1844 Manuscripts), and those parts were kept brief rather than expanded on unchecked material. The final corrections added material only where primary texts could be checked (§10).
- **Sources:** primary and secondary sources are kept apart throughout. Every original passage was checked word by word against a public-domain scan (editions listed in each production report and in each manuscript's appendix). SEP and the one open-access article are paraphrased and cited in notes.
- **Citation fixes during authoring:** two fabricated citations and four wrong author names in early drafts were found and corrected before integration. All SEP authors were confirmed against the downloaded entries; see §6.

## 3. Practice

| Course | Sets | Questions | Single | Multi | T/F | View |
|---|---|---|---|---|---|---|
| EA3 | 6 | 18 | 6 | 4 | 5 | 3 |
| EA5 | 6 | 18 | 6 | 5 | 5 | 2 |
| EA6 | 6 | 18 | 6 | 4 | 5 | 3 |
| **Total** | **18** | **54** | 18 | 13 | 15 | 8 |

**Answer keys:**

| Course | Single | Multi | True/false |
|---|---|---|---|
| EA3 | c, a, d, b, c, b | [a,c,d], [a,b,c], [a,c,d], [a,c] | F, F, F, T, F |
| EA5 | d, a, b, c, b, d | [b,c,d], [a,c,d], [a,b,d], [a,c,d], [a,b,d] | F, F, T, T, F |
| EA6 | b, d, c, a, d, a | [b,c,d], [a,b,c], [a,c,d], [a,c,d] | F, T, F, F, F |

- **Answer positions:** after a first draft, five multi-answer questions had their options reordered so the wrong option does not always sit in the last position.
- **No typed answers.** View questions mark no position as right. Each option gives a strength and a cost, with an explanation that says where the chapter discusses the question.
- **Grounding:** every question is anchored to the text of its section. Facts not stated in the manuscript were removed during drafting; two EA5 items were rewritten for this reason.
- **Storage:** state is stored under `philopilot.v2.{ea3,ea5,ea6}.practice.<set>`, apart from reading progress (`…progress`, `…position`).

## 4. Components

| Course | Id | Anchor | What it does |
|---|---|---|---|
| EA3 | `hume-induction` | 三, after "这张表可以用在其他的怀疑论证上" | Inference and assumption → four possible grounds, each failing (the last closing the circle) → custom and the two readings, with no verdict |
| EA5 | `dialectic-stepper` | 四, after "用这张表时请注意两点" | Six-question checklist for two worked examples. The transition row is gated on "where does the opposite come from?". The final row ("is the step necessary?") is left open. |
| EA6 | `critique-sorter` | 六, after the five-forms-of-critique table | Ten statements sorted into "does / does not do"; then the five forms and the conclusion that none is a refutation |

**What all three share:**

- They are anchored to a block of the manuscript, and every quoted line is one of the chapter's checked passages.
- Each has a "这个演示是什么，不是什么" limits panel and a reset.
- They use native buttons, word feedback before any colour, `aria-live`, saved state through `useSavedIx`, and no animation (nothing to reduce).

**Candidates not built:** a social-contract comparison (EA3), a recognition walk-through (EA5) and a genealogy step-through (EA6). Each is already covered by a table and a practice set, and would add little. The reasons are given in each production report.

**Shared helpers changed (non-breaking):**

- `ui/media/jw1/shared.tsx`: `OrigSrc` accepts `en`, `de` and `da` in addition to `jrb`, `la` and `fr`.
- `ui/media/in4/shared.tsx`: the `useSavedIx` code union adds `EA3`, `EA5` and `EA6`.

## 5. Validation (performed 2026-11-10)

Run against the production build (`npm run build`, served by `vite preview` on port 5189).

| Check | Result |
|---|---|
| `tsc --noEmit` and `vite build` | Pass. Only the pre-existing chunk-size warning remains. |
| All 18 sections render with the right titles (EA3/EA5/EA6 §一–§六) | Pass |
| Footnotes | Pass. Every footnote marker in the 18 sections was opened. All resolve; the short ones are "同上。". Manuscript check: no undefined or unused notes. |
| 54 questions | Pass. Each of the 18 sets shows three questions; an answer was submitted to every question and feedback appeared (wrong, right, or the view explanation). |
| Components | Pass. Hume: all four cells, circle passage, step 3 appears after four tries, reading choice. Dialectic: gate holds on the wrong answer and opens on the right one; last row; example switch. Sorter: 10/10 summary; reset. |
| 375 px | Pass after one fix. The sorter's items first rendered one character per line, because they reused the numbered-step grid without its number column; the number column was added. All three components, plus EA3 §一 and EA6 §三, were then checked with no horizontal overflow. |
| Course front pages | Pass. Core question, background, method, nine parts, and "读完以后" links (EA5 → EA6 readable, EA12 "原型未实现"). |
| Catalogue | Pass. 欧洲与北大西洋哲学 lists EA1–EA6 as readable, in order. |
| Search | Pass. 叔本华, 休谟, 黑格尔之后, 君特罗德 and 视角主义 return the courses and sections. |
| Topic link | Pass. 人性与道德 → 情感与理性 → EA3 opens the course. |
| Progress and resume | Pass. Real wheel scrolling in EA6 §三 saved 32% and a position. The front page then showed "继续阅读 → 回到：克尔凯郭尔：存在的领域 · 恐惧是自由的眩晕", which reopened at block 12. Programmatic scrolling did not count, as designed. |
| Practice kept apart from progress | Pass. Separate keys. |
| Saved component state across reload | Pass |
| Regression: 29 existing courses | Pass. CN1–8, EA1, EA2, EA4, IN1–8, IA1–5, GR1–4 and JW1: the front page and §二 render; practice is present; components render where expected, including EA1, EA2 and JW1, which use the changed shared helpers. |
| EA4 unchanged | Pass. `git diff` shows no change to EA4's manuscript, module, practice or components, and none to its `courses.ts` entry. |
| CASE 02 | Pass. Front page and first chapter ("一　雨窗") open. |
| Console | No errors or warnings during the session. |

The test state was cleared afterwards (`localStorage.clear()`), and the preview server was stopped.

## 6. Process disclosure

- **Python heredoc hangs.** Twice a `python -` command hung waiting for input. Both were stopped. The second time, an edit chained after the stray command did not run; the edit was redone with the editor and verified.
- **EA4 entry restored.** During registration, one edit briefly removed the `EA4: {` line from `courses.ts`. The typecheck caught it, and the line was restored. `git diff` confirms that the EA4 entry is unchanged.
- **Citation errors in early drafts, corrected before integration:**
  - Two fabricated citations: EA3 note 14 and note 61.
  - Four wrong author first names: Hobbes, Montesquieu, Hume and Fichte entries.
  - Several claims that could not be verified were softened to "据通行的介绍" or replaced by verified quotations.

## 7. Curriculum discrepancies (for the Product Owner)

1. **EA3 — personal identity.** Resolved in the final corrections: a full subsection in §三 (§10.1). Reid and Butler still appear only through Olson's SEP entry.
2. **EA5 — the *Philosophy of Right*.** Resolved in the final corrections: a subsection reconstructing abstract right, morality and ethical life (§10.2).
3. **EA5 — Caroline Schlegel-Schelling and Dorothea Schlegel** are named but not reconstructed, for lack of checkable material. (Unchanged; outside the corrections brief.)
4. **EA6 — Marx.** The 1859 Preface is now checked (Kautsky's 1903 edition). The 1844 Manuscripts remain SEP-only. The *Manifesto* is named but not paraphrased.

## 8. Image candidates

Candidates only, with no downloads:

- `V24_EA3_IMAGE_APPROVAL_SHEET.md`: 4 page scans.
- `V24_EA5_IMAGE_APPROVAL_SHEET.md`: 3 page scans.
- `V24_EA6_IMAGE_APPROVAL_SHEET.md`: 4 page scans.

Every licence is "not recorded" and must be read on the item page before approval. Portraits are not proposed.

## 9. Files

**New:**

```
content/EA3_SAMPLE_DRAFT.md
content/EA5_SAMPLE_DRAFT.md
content/EA6_SAMPLE_DRAFT.md
content/EA3_PRODUCTION_REPORT.md
content/EA5_PRODUCTION_REPORT.md
content/EA6_PRODUCTION_REPORT.md
content/V24_INTEGRATION_REPORT.md
content/V24_EA3_IMAGE_APPROVAL_SHEET.md
content/V24_EA5_IMAGE_APPROVAL_SHEET.md
content/V24_EA6_IMAGE_APPROVAL_SHEET.md
prototype/navigation-v2/src/content/ea3.ts
prototype/navigation-v2/src/content/ea5.ts
prototype/navigation-v2/src/content/ea6.ts
prototype/navigation-v2/src/content/practice-ea3.ts
prototype/navigation-v2/src/content/practice-ea5.ts
prototype/navigation-v2/src/content/practice-ea6.ts
prototype/navigation-v2/src/ui/media/ea3/HumeInduction.tsx
prototype/navigation-v2/src/ui/media/ea5/DialecticStepper.tsx
prototype/navigation-v2/src/ui/media/ea6/CritiqueSorter.tsx
```

**Modified:**

```
prototype/navigation-v2/src/content/courses.ts        (imports; EA3, EA5, EA6 entries; EA2 comment)
prototype/navigation-v2/src/content/practiceSets.ts   (three imports, three entries)
prototype/navigation-v2/src/content/media.ts          (three MediaIds, three anchors)
prototype/navigation-v2/src/ui/media/Media.tsx        (three lazy imports)
prototype/navigation-v2/src/ui/media/jw1/shared.tsx   (OrigSrc languages; comment)
prototype/navigation-v2/src/ui/media/in4/shared.tsx   (useSavedIx union)
prototype/navigation-v2/src/data/catalog.ts           (EA5, EA6 in COURSES; EA3 topic link)
```

No other files were changed. `planning/` and the other Pilot projects were not touched.

## 10. Final targeted academic corrections (2026-11-10)

Scope as briefed: two content corrections, a set of source-location checks, report updates and a focused check. No new formal section, title or tier change; no new component; no practice question changed; no image downloaded; EA4, the 29 other courses, CASE 02 and Cases untouched; nothing committed, pushed or deployed.

### 10.1 EA3 — personal identity

- §三's short "一个附带的问题：自我" was replaced in place by "人格同一性：洛克的记忆，休谟的\"束\"" (+3,799 characters in §三; 10 notes in place of 1; 4 primary blocks; 2 tables).
- Content: Locke's consciousness criterion and "forensic" person (*Essay* II.xxvii.9, 26; 1753, pp. 324, 336); the transitivity and circularity objections and the usual repairs (via Olson, SEP); Hume's argument from the copy principle that there is no constant self-impression, the "bundle" and the theatre caveat (*Treatise* 1.4.6, Green & Grose vol. 1, pp. 533–535); imagination, resemblance, causation and memory ("discovers rather than produces"), with the 1715 example (pp. 540–543); the Appendix "labyrinth" and the two principles Hume cannot reconcile (p. 558); no consensus on the difficulty (Qu & Radcliffe), and three common interpretive directions labelled as coming from general overviews. The bundle theory is presented as unfinished, not as a solution.
- Cross-references only, without repeating arguments: EA2 第二部分 (Cartesian self), EA4 第二部分 ("I think"), and IN2 第三部分 for no-self. **The brief said IN3; the no-self and personal-identity discussion is in IN2 §三 (无我与人格同一性), so the link points there.**

### 10.2 EA5 — the *Philosophy of Right*

- New subsection "自由为什么需要制度：《法哲学原理》的论证" in §五, between the Fichte–Hegel comparison and "现实的东西与合理的东西" (+4,084 characters in §五; 9 notes; 2 primary blocks, §149 and §260; 2 tables).
- It separates three levels of recognition (*Phenomenology* ch. IV; abstract right and morality; ethical life as institutional freedom) and says the master–slave passage is not the whole theory.
- It reconstructs the argument in five steps rather than summarising chapters: right as the existence of the free will (§29); person and property (§§36, 41); contract and recognition (§71 Remark); wrong and the passage to morality (§§82ff., 104–105); the moral rights of knowledge, intention and subjective freedom (§§117, 120, 124 Remark); the emptiness of formal conscience (§§135–139); ethical life and duty as liberation (§§142, 149); family (§§158, 177); civil society and *Bildung* (§§187, 189); justice, police and corporation (§§209, 230, 252–253); poverty and the rabble (§§244–248); the state (§§257–258, 260).
- It states plainly that Hegel's state is not a liberal democracy: constitutional monarchy (§273); estates and corporate representation (§§305–308); §301 Remark on "the people" and on excluding children and women; §308 Remark rejecting participation of "all as individuals".
- All § numbers and German phrases were found in the Lasson 1911 scan (grundlinienderph00hege). Gans's *Zusätze* were not used. Interpretive judgements (poverty, the monarchy) follow Brooks (SEP); "social freedom" follows Iser (SEP).

### 10.3 Source locations

| Item | Before | After | How |
|---|---|---|---|
| Schopenhauer, "Der Wille als Ding an sich … grundlos" | §23 inferred | §23, p. 128 (2nd ed. 1844) | "§. 23" marker legible before it, §24 marker after it |
| Schopenhauer, pendulum sentence | §57 inferred | §57, p. 352 | Between legible §56 and §58 markers, after the §57 opening words; the §57 number itself is illegible (disclosed) |
| Schelling, "geheime Band" | "about p. 55" | p. 55, *Ideen* introduction | Sentence just after the p. 55 page break; before the "Erstes Buch" heading |
| Schelling, "blinden Gesetzmäßigkeit" | "about p. 527" | p. 527, *Weltseele* part 2 | Between the p. 527 and p. 528 markers, under "Ueber den Ursprung des allgemeinen Organismus" |
| Fichte, *Thathandlung* sentence | no page | SW I p. 134, *Grundlage* part II §4 | Between the p. 134 and p. 135 running heads; no section marker between §4 and the sentence |
| *Athenaeum* fragment 116 | not found (wrong volume) | German checked in vol. 1 part 2, Berlin: Vieweg 1798 (bub_gb_sx0VAAAAQAAJ) | Fragments are unnumbered in the original; identified by the opening sentence. Fraktur OCR is poor; quoted words read and corrected one by one; no page given |
| Marx, 1859 Preface | SEP only | Checked in *Zur Kritik*, ed. Kautsky, Stuttgart: Dietz 1903, pp. IX–XIII; one sentence quoted (p. XI) | Paraphrase compared point by point; not the 1859 first edition (disclosed) |
| Marx, 1844 Manuscripts | SEP only | Unchanged, now with a stated reason | The only 1932 printing found (Landshut & Mayer, Kröner) is a restricted lending copy; not used |
| Marx, *Manifesto* | "no usable text layer" | No verification needed | The chapter names it once and paraphrases none of its arguments |

Voltaire and Günderrode remain attributed paraphrases, as the brief allows.

### 10.4 Other changes

- Manuscript assembly script (scratchpad): note ranges such as "注 49—51" were not renumbered when notes shifted. This was fixed before reassembly, and every "注 N" cross-reference in the three appendices was checked against the note it names.
- Each manuscript's appendix (edition table, "not checked" list, "本章自己的整理", uncertainty list) was updated. EA5 gained uncertainty item 7 (the *Philosophy of Right* reconstruction).
- Production reports: sizes, counts, sources, unresolved issues renumbered to the new notes, and a new §10 in each.
- Image sheets: only the "not proposed" reasons for the *Athenaeum* (EA5) and Schopenhauer (EA6) were updated to match; no candidate was added.

### 10.5 Validation

| Check | Result |
|---|---|
| Notes | EA3 92, EA5 61, EA6 44 references and definitions; none missing or unused |
| "注 N" cross-references | All resolve to the intended notes (checked by script) |
| Typecheck and build | `npm run build` passes (only the existing chunk-size warning) |
| EA3 §三 in browser | New subsection renders; notes 34–43 in order and open; four English passages carry `lang="en"`; `hume-induction` still after "这张表可以用在其他的怀疑论证上"; 想一想（三） practice set attached |
| EA5 §五 in browser | New subsection renders; notes 39–47 in order; §149 and §260 carry `lang="de"`; practice set 五 attached; at 375 px no page overflow, tables wrap |
| EA5 §二, §三, §四, §六 | New locations shown; fragment 116 primary block in German; `dialectic-stepper` still in §四 |
| EA6 §二, §四, §六 | 1859 sentence shown with `lang="de"`; pp. 128 and 352 shown; `critique-sorter` still in §六 |
| Appendices | Render without raw Markdown; new edition rows present |
| Console | No errors |

The 29-course regression was not repeated, as briefed. Test state was cleared (`localStorage.clear()`) and the preview server stopped.

### 10.6 Files changed in this pass

```
content/EA3_SAMPLE_DRAFT.md
content/EA5_SAMPLE_DRAFT.md
content/EA6_SAMPLE_DRAFT.md
content/EA3_PRODUCTION_REPORT.md
content/EA5_PRODUCTION_REPORT.md
content/EA6_PRODUCTION_REPORT.md
content/V24_INTEGRATION_REPORT.md
content/V24_EA5_IMAGE_APPROVAL_SHEET.md   (one line)
content/V24_EA6_IMAGE_APPROVAL_SHEET.md   (one line)
```

No source code, practice file, component or other course was changed in this pass.

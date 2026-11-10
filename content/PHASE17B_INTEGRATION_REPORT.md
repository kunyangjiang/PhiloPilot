# Phase 17B — Integration report: 梵、自我与世界：吠檀多派 (IN6) and 意识、物质与修行：数论与瑜伽派 (IN7)

Date: 2026-11-09. Nothing is committed, pushed or deployed. No images were downloaded or embedded. IN8 was not started, and PhiloPilot Cases v3.1 was not touched. planning/, DataPilot, ArtPilot and MatScope were not modified. The only changes to released courses are the three Madhva/Mādhava lines listed in §3.

## 1. IN6 — 梵、自我与世界：吠檀多派

| | |
|---|---|
| English title | Brahman, Self and World: Vedānta |
| Classification | ● 核心, 印度哲学 · 第 6 门 |
| Manuscript | `content/IN6_SAMPLE_DRAFT.md` (CRLF): guide, Parts 一–六, 结语, 后世批判与回应 (9 parts, about 24,000 characters of reading text) |
| Notes / appendices | 79 notes, 79 definitions, no orphan; 注释 and 来源与权利说明 are appendices (not counted in parts or progress) |
| Tables | 11 = 10 in the reading parts + 1 in 来源与权利说明; all render |
| Original/translation pairs | 36 (`本章试译`) |
| 想一想 / practice | 6 / 6 sets, 18 questions |
| Components | 3 (A, B, C below) |

**Integration.**
- The full manuscript is integrated; nothing was shortened. `in6.ts` reads the core question from the sentence after "这一章的核心问题是：", because the guide's first bold phrase is the hook "是谁无明？" (the same override as IN4 and CN7).
- Registry: `PUBLISHED` (`courses.ts`), catalog (`catalog.ts`, short name 梵、自我与世界), practice (`practiceSets.ts`). The background field says the syllabus recommends 「印度哲学的起源」, with 「权威、语言与义务」 and 「大乘哲学」 helpful, and that none is required. Leads to S4, S5 and S12 (all unreleased, marked 原型未实现).
- The historical distinctions required by the spec are kept as written: the three schools are not presented as variants of Śaṅkara; Advaita is not glossed as "the world does not exist" (Part 三 and component C both say "不是第二个实在", not "不存在"); Kashmir Śaivism is presented as a neighbouring non-dualism, not as Advaita.

**Targeted source checks.** Three printed editions were reachable as archive.org scans. Each passage was read from the page image and compared with the OCR text. This is a targeted check, not a collation.

| Check | Edition and page | Result | Change |
|---|---|---|---|
| A. *Adhyāsa* preface: smṛtirūpaḥ paratra pūrvadṛṣṭāvabhāsaḥ (n. 22) | *Brahmasūtra-Śāṅkarabhāṣya* with *Bhāmatī*, *Kalpataru*, *Parimala*, Bombay: Nirṇaya Sāgara 1917, pp. 17–18 | Identical | Citation no longer says "据《明论》所引"; note 21 records the print |
| A. naisargiko 'yaṃ lokavyavahāraḥ (n. 26) | same, p. 17 | Identical | as above |
| A. tam etam evaṃlakṣaṇam adhyāsaṃ paṇḍitā avidyeti manyante (n. 25) | same, p. 40 | Identical | as above |
| A. adhyāso nāma atasmiṃs tadbuddhir ity avocāma (n. 23) | same, p. 44 | Identical | as above |
| BSBh 3.2.22 (n. 33) | *Brahmasūtra-Śāṅkarabhāṣya* with *Ratnaprabhā*, Part II, Varanasi: Chowkhamba 1932 (Kashi Sanskrit Series 71), p. 738 | Print reads **ālambyāparamārthaḥ**; the e-text's ālambyārthaḥ drops a syllable | Quotation and translation corrected ("才否定不真实的东西"); note 33 records both readings |
| Sūtra numbering of tadananyatvam | 1917 edition, sūtra list | Numbered 2.1.14, as in the chapter | None |
| B. Rāmānuja | — | No sentence attributes a reading to the *Śrībhāṣya* as if it had been checked. Notes 44 and 63 and the "七种不成立" sentence already say the chapter did not read it | No change needed |
| C. Unproofread Sansknet files | — | Still relying on e-texts only: BS sūtras; BSBh 1.1.1, 1.1.5, 2.1.14, 2.2.7, 2.2.28; the *Bhāmatī* and *Ratnaprabhā* glosses; every *Anuvyākhyāna* verse | Listed in the new appendix paragraph 印本对照（Phase 17B） |

- The preface check does **not** mean the whole preface was read; note 21 and appendix item 1 say so. The readings are not thereby critically established.
- Manuscript edits (via an exact-match replacement script, CRLF preserved): status line; note 21; the four preface citations; BSBh 3.2.22 quotation, translation and note 33; appendix item 1; "引文核对"; the new 印本对照 paragraph; uncertainties 2 and 3; "本稿的性质"; the Madhva/Mādhava sentence in 译文决定 (§3).

**Components** (each anchored after a specific block, state saved per course under `in6.media.*`, with a reset, basis tags on every claim and a "这个演示是什么，不是什么" panel):

- **A. Upaniṣadic Passage Interpretation Explorer** (一, after 「这个表说明了什么？」, as proposed in 17A). Choose one of the four passages (BĀU 1.4.10, 3.7.22, 2.3.6; ŚvU 4.10). The passage and its 本章试译 come first. The reader then predicts which schools the literal wording troubles (checked against the chapter's table), and only then opens three reading cards. A card states a school's reading only where the chapter does; otherwise it says "本章没有给出这一派的读法" and names the gap (e.g. no Madhva comment on 3.7.22 was read; the alternative reading of *neti neti* is the chapter's question, not Rāmānuja's comment). The 3.7.22 recension difference and the note 9 ambiguity are shown. No translation outside the chapter is introduced.
- **B. Adhyāsa and Error Workshop** (二, after 「这个例子有两点值得注意」).
  - The two print-checked definitions.
  - Two cases, rope–snake and "我胖", in which the reader assigns five items to the five components (ground, previously seen thing, appearance, condition, correction); every answer is explained.
  - Mutual superimposition (SEP).
  - "Who corrects the second error?" (想一想（二）), with BSBh 1.1.1 on knowledge rather than action.
  - The seven-step reconstruction, labelled as such, with step 3 marked as the one Rāmānuja and Madhva reject.
  - Objections: Rāmānuja VS 40, then the *tu quoque* of VS 41, then his reply in VS 43; Madhva MAnuv 1.1.40–41; the Advaita reply and evaluation from C&R 一.
  - The limits panel states that a perceptual illusion is **not evidence for Advaita**: the example shows the structure of error only.
- **C. Brahman–Self–World Relationship Explorer** (六, after the 总表). Three differently drawn pictures, not one diagram recoloured:
  - Advaita: one ground; self and world as dashed boxes, labelled "不是第二个实在，也不是'什么都没有'". A two-levels switch removes them at the ultimate level.
  - Rāmānuja: soul and body, with the three relations of VS 76 selectable.
  - Madhva: one independent being and many dependent ones, with the five differences highlightable.

  Each school's rows come from the chapter's tables (the 解脱后 row for Rāmānuja is marked 本章只读到概括). The relevant texts are BSBh 2.1.14, VS 76, and MAnuv 2.1.85 and 2.3.94. A "which model of dependence?" question (clay–pot / body–soul / king–subject) closes on the C&R 三 evaluation.
  - **Anchor change from the 17A plan:** 17A proposed Part 四 (身体与灵魂). The component compares all three schools, and Madhva is only introduced in Part 五, so it now follows the Part 六 总表.

## 2. IN7 — 意识、物质与修行：数论与瑜伽派

| | |
|---|---|
| English title | Consciousness, Matter and Practice: Sāṃkhya and Yoga |
| Classification | ○ 拓展, 印度哲学 · 第 7 门 |
| Manuscript | `content/IN7_SAMPLE_DRAFT.md` (CRLF): guide, Parts 一–五, 结语, 后世批判与回应 (8 parts) |
| Notes / appendices | 85 notes, 85 definitions, no orphan |
| Tables | 15 = 14 in the reading parts + 1 in 来源与权利说明; all render |
| Original/translation pairs | 50 |
| 想一想 / practice | 6 / 6 sets, 18 questions (Part 三 holds two sets) |
| Components | 2 (A, B below) |

**Integration.**
- The full manuscript is integrated. It was **not** shortened for being Extended. `in7.ts` takes the core question after "这一章的核心问题是：" (the guide's first bold is 「认识到它们的区别」).
- Registry as for IN6. Background: 「印度哲学的起源」 recommended, not required. Leads to S5 (unreleased).
- Chronology and interpretive uncertainty are kept as written: the two IEP datings of SK and YS; Ruzsa's view on *puruṣa*'s immutability as a disputed reading; the cosmological vs. personal reading of the tattva sequence; the tanmātra–bhūta mapping left open.

**Source check.**

| Check | Edition and page | Result | Change |
|---|---|---|---|
| BS 2.2.3 and two BSBh sentences (n. 76, 77) | *Brahmasūtra-Śāṅkarabhāṣya* with several commentaries, Bombay: Nirṇaya Sāgara 1904, p. 420 | Numbered 2.2.3; sūtra reads payombuvac cet tatrāpi (no avagraha); both BSBh sentences identical | Note 76 records the print; "引文核对" and "本稿的性质" updated |

Other IN7 quotations were not checked against print, and the manuscript says so.

**Components:**

- **A. Twenty-Five Tattvas Explorer** (二, where the chapter introduces the tattva structure: it replaces the former text diagram (V20 correction), just before the 25-row table).
  - **The hierarchy.** The whole hierarchy is visible from the start as nested lists, with tree lines drawn as CSS borders. There is no monospace art, so CJK text aligns at any width.
  - ***Puruṣa*.** It sits in a separate panel marked "不由原质生出，也不生出任何东西；与左边的树之间没有连线". It is never drawn as a product of *prakṛti*.
  - **Ahaṃkāra.** The three states are dashed and labelled "我慢的状态，不是另一谛".
  - **What each choice shows.** Choosing an item opens its SK 3 class, its verse references, a verse (SK 16, 19, 22, 24, 25) with the chapter's translation, and the chapter's qualifications. These are: the three senses of *prakṛti*; that the tanmātra and bhūta names come from the commentators; elements vs. sense-qualities; the unmapped tanmātra → bhūta correspondence (drawn as a single line); and the dispute about *puruṣa*'s immutability.
  - **Two further views.** One re-reads the same tree through SK 3 (four classes, 1 + 7 + 16 + 1). The other uses SK 40/42: the subtle body is 18 items, the bhūtas are excluded, and nothing on the *puruṣa* side is marked as transmigrating.
  - **Reading question.** "Cosmos or person?" is answered with the IEP view and no verdict.
  - **Limits panel.** It says the sequence is not biological evolution.
  - At 375 px the two panels stack; every item is a native button.
- **B. Puruṣa and Mental Faculties Workshop** (三, after the Descartes comparison; 17A had proposed a two-step placement starting at 「神我不是"自我"」, combined here into one anchor after both tables).
  - **Sorting.** Nine everyday items are sorted into 大（觉） / 我慢 / 意 / 知根或作根 / 神我. Each answer is explained with its verse (SK 19, 20, 23, 24, 26, 27, 62, 64–66).
  - **Contested placements.** "怀疑" accepts any of the three mental tattvas, because the chapter does not assign it to one, and the feedback says so. "受苦、轮回" is wrong only in the *puruṣa* bin.
  - **Comparison.** "我在思考" is taken apart with SK 20, followed by the Descartes/Sāṃkhya rows.
  - **Objections.** Each has a Sāṃkhya reply that can be opened: Śaṅkara on the milk (BSBh 2.2.3, print-checked); Śāntarakṣita's dilemma (paraphrased, as in the chapter); and whether *puruṣa* is unchanging (IEP/Ruzsa).
  - **Not an empirical account.** The heading and the limits panel say the sorting is the school's claim, not an empirical account of consciousness. Nothing treats a modern finding (neuroscience, meditation research) as evidence for or against *puruṣa*. The wording follows the chapter's own 常见误解 paragraph.

## 3. Shared

**Madhva / Mādhava.** Each occurrence of 摩陀婆 in IN1, IN5 and IN6 was inspected; there was no global replacement. No standard Chinese form for Mādhava could be confirmed, so 摩陀婆 is kept for **Madhva** (Dvaita), and **Mādhava** (the 14th-century author associated with the *Sarvadarśanasaṅgraha* and the *Jaiminīyanyāyamālāvistara*) is written in romanization only, each time with a "不是同一人" note.

| Course (released?) | Line | Before | After |
|---|---|---|---|
| IN1 (released) | 631 | （通常归于摩陀婆 Mādhava） | （通常归于 Mādhava；他与本章"后世批判与回应"中的二元论吠檀多哲学家摩陀婆 Madhva 不是同一人） |
| IN1 (released) | 958 | 以及关于摩陀婆的二手介绍。 | 以及关于摩陀婆（Madhva，二元论吠檀多的创立者）的二手介绍。 |
| IN5 (released) | 1104 | 摩陀婆《阇弥尼正理花鬘详释》 | Mādhava《阇弥尼正理花鬘详释》（这位 Mādhava 与《梵、自我与世界》中的二元论吠檀多哲学家摩陀婆 Madhva 不是同一人） |
| IN6 (new) | 译文决定 | pointed to the production report | states the distinction in the text itself |

- `git diff` shows exactly these three lines changed in IN1 and IN5. IN1 keeps its LF line endings; IN5, IN6 and IN7 remain CRLF.
- The other ten occurrences of 摩陀婆 in IN1 refer to Madhva and were left as they are.

**Code reuse; no new architecture.**
- Parser, registry, footnotes, reader state, practice, media anchoring, styles and accessibility infrastructure are reused unchanged.
- `useSavedIx` in `ui/media/in4/shared.tsx` now also accepts `'IN6' | 'IN7'`; that is its only change.
- New CSS (`in6/in6.css`, `in7/in7.css`) only adds what the shared classes lack.
- No dependency was added.

**Files changed:**
- `courses.ts`, `catalog.ts`, `practiceSets.ts`, `media.ts`, `Media.tsx`, `in4/shared.tsx`;
- new `in6.ts`, `in7.ts`, `practice-in6.ts`, `practice-in7.ts`, `ui/media/in6/*`, `ui/media/in7/*`;
- content: `IN1_SAMPLE_DRAFT.md`, `IN5_SAMPLE_DRAFT.md`, `IN6_SAMPLE_DRAFT.md`, `IN7_SAMPLE_DRAFT.md`, and the three Phase 17B documents.

**Practice** (V7 `PracticeSet`, one set per 想一想, stored per course under `in6.practice.*` / `in7.practice.*`; nothing needs typing):

| | Sets / questions | single / multi / tf / view | Single-choice keys | True/false | Multi keys |
|---|---|---|---|---|---|
| IN6 | 6 / 18 | 7 / 4 / 5 / 2 | A2 B2 C2 D1 | 2T / 3F | ACD, BC, ACD, ABC |
| IN7 | 6 / 18 | 7 / 4 / 5 / 2 | A1 B2 C2 D2 | 2T / 3F | BCD, AC, ACD, CD |

## 4. Rights and Images

**Rights.** No claim is made that any third-party permission is legally cleared.
- **GRETIL.** The files carry CC BY-NC-SA 4.0 (2020 header). The NC/SA question is shared with IN2–IN5 and remains a PO decision.
- **SK e-text.** Ruzsa's 1998 notice (free scholarly copying; a separate agreement for sale or for-profit collections) belongs to **that file only**. It is not generalized to any other file. The course quotes the verses, which are ancient and public domain, not the e-text's arrangement or apparatus.
- **KaU 3.11.** The e-text is based on Olivelle 1998, a copyrighted modern edition. Only one verse of the ancient text is quoted.
- **Transcriptions vs. texts.** Throughout, the rights in modern transcriptions and editions (GRETIL, Sansknet, Ruzsa, Olivelle, the printed editions) are kept distinct from the ancient texts themselves. The 1904 and 1932 scans are marked CC0 on archive.org; the 1917 scan's licence was not recorded in this phase. All three were used only to check readings; nothing from them is reproduced beyond the quoted words of the ancient text.

**Images.** See `PHASE17B_IN6_IMAGE_APPROVAL_SHEET.md` and `PHASE17B_IN7_IMAGE_APPROVAL_SHEET.md`. Metadata was re-read on 2026-11-09 (Commons API; Wellcome catalogue API) and matches 17A. Nothing was downloaded or embedded, and there are no placeholders.
- **IN6.** The Rāmānuja bronze (ACM, per Commons only) is **on hold**, as instructed. The Ravi Varma Śaṅkara print is optional, conditional on identifying the holding institution. No Madhva image is proposed.
- **IN7.** The two Wellcome gouaches (Public Domain Mark at source) **stay on the shortlist**, but **no download is authorized**. The BM Kapila is **on hold**, as instructed.

## 5. Validation

| Check | Result |
|---|---|
| `tsc --noEmit`, `npm run build` | Pass. The chunk-size warning existed before this phase. |
| Course pages | Both render: title, English title, tier, position, core question, background, method, contents (9 / 8 parts), appendix line, syllabus links. |
| Footnotes | Every reader section was visited: IN6 references 1–79 and IN7 references 1–85 all render as note buttons, with none missing. Manuscript: 79 ↔ 79 and 85 ↔ 85 definitions, with no orphans. |
| Tables, source blocks | Every manuscript table renders (11 / 15). There are no leftover markdown markers (`[^`, `**`, `](`). Sanskrit passages carry `lang="sa"`. |
| Component quotations | All 56 `orig`/`zh` strings in the five components (IN6 36, IN7 20) match the manuscripts verbatim (script check). |
| Quote checker | Re-run against the GRETIL/Sansknet corpus used in 17A. The only real differences are the two expected ones: BSBh 3.2.22 (now follows the print) and KaU 3.11 (e-text typo *puruśān*, already flagged in 17A). The other flags were checked by hand and are markup or sandhi-spacing artefacts of the checker. |
| Components | All five mount in their intended sections. A script exercised every control three times (384 activations) with no runtime error; reset works; state persists across reload. |
| Practice | 36 questions render (IN6 six sets; IN7 six sets). Answering writes only `in6.practice.*` and leaves `in6.progress` unchanged. |
| Progress and resume | Reading IN6 Part 一 wrote `in6.progress` and `in6.position`. The course page showed 继续阅读 → 「奥义书…· 乔荼波陀：商羯罗之前的不二论」, and IN7's progress stayed independent. |
| Search | Finds the IN6 course (吠檀多) and sections (附加, 摩陀婆, 二十五谛, 神我). |
| Region and links | 印度哲学 lists IN1–IN7 as 打开课程; IN8 stays 原型未实现. The links IN1 → IN6/IN7 and IN4/IN5 → IN6 open; none is a gate. |
| Mobile (375 px) | No horizontal overflow on any component section. The tattva panels and the school cards stack. |
| Keyboard | Every control is a native button or input, with an accessible name and focusable. Enter activates the tattva nodes and argument steps, and focus stays on the control. |
| Reduced motion | Under `data-motion='none'` no element in the five components has a transition or animation. |
| Regression (18 existing courses) | Every reader section of all 20 published courses was visited, with console warnings and errors captured: none, and no `[media]` missing-anchor warning. |
| Line endings | IN5, IN6 and IN7 are CRLF throughout; IN1 is LF throughout (unchanged convention). |

**Fixes made during validation:**
1. The Madhva SVG caption overlapped the boxes. The viewBox is now 232 high and the caption sits below the nodes.
2. The Tattva Explorer lost keyboard focus after Enter, because its node was a component re-created on every render. It is now a plain render function, so focus stays on the chosen node.

The browser test data (`philopilot.v2.in6.*`, `philopilot.v2.in7.*`) was removed afterwards, and the viewport was reset. Midway through validation the browser pane's storage was found empty after a pane restart. The app does not clear course data: it only removes two legacy style keys. Persistence across a reload was re-confirmed afterwards.

## 6. Release Readiness

**Genuine blockers:** none found for a draft-status release inside the prototype.

For the Product Owner:
1. **Licence.** The GRETIL NC/SA question (shared with IN2–IN5) and the Ruzsa notice on the SK file need a decision if the site has any commercial aspect.
2. **Images.** Decide each candidate on the two sheets. The Rāmānuja bronze and the BM Kapila stay on hold. The Wellcome items need a separate download authorization.
3. **Still on e-text only.** Most BS/BSBh passages, the *Bhāmatī*/*Ratnaprabhā* glosses, the *Anuvyākhyāna* verses and most IN7 quotations still rely on e-texts only; the manuscripts list them. A further print check would be a separate task.
4. **Expert review.** Neither manuscript has had review by a specialist in Indian philosophy; both still say so in their status lines.
5. **The IN7 text tree (resolved in the V20 correction).** The manuscript's ```` ```text ```` tree diagram has been removed. The sentence introducing it now reads "把这几颂合起来，可以整理成一张结构图（网站中以互动图示呈现）。". "这张示意图" and "二十五谛示意图" now say "结构图". The Tattva Explorer is anchored at that sentence instead of after the 25-row table. The 25-row table, note 27 and the surrounding explanation are unchanged.

Stopping here for Product Owner acceptance.

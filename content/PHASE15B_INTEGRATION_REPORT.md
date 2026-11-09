# Phase 15B — Integration report: 早期佛教与阿毗达磨 (IN2) and 知识、推理与辩论 (IN3)

Date: 2026-11-09. Nothing is committed, pushed or deployed. Existing courses are not rewritten. No images were downloaded.

## 1. What is integrated

| | IN2 早期佛教与阿毗达磨 | IN3 知识、推理与辩论 |
|---|---|---|
| Manuscript | `content/IN2_SAMPLE_DRAFT.md`: guide, Parts 一–七, 结语, 后世批判与回应 (10 parts) | `content/IN3_SAMPLE_DRAFT.md`: guide, Parts 一–七, 结语 (9 parts; Part 六 serves as the critiques section) |
| Notes / appendix | 94 notes; 来源与权利说明 | 108 notes; 来源与权利说明 |
| Components | 4 | 4 |
| Practice | 7 sets, 21 questions | 7 sets, 21 questions |

- **Registry and navigation.** Both courses are in `PUBLISHED` (`courses.ts`) and the catalog. Both open from 历史与传统 › 印度哲学; IN4 onwards still shows 原型未实现.
- **Links.** IN1 → IN2 is shown as 下一门. IN2 → IN3 is shown as 印度哲学 · 后续. Both follow the syllabus.
- **Question discovery.** IN2 is linked from 人性与道德 › 情感与理性 (Part 六). IN3 has no link because none of its parts fits the only question page the prototype expands (人性与道德); no new question page was built.
- **Parser change (one minimal option).** IN3 needed one parser option, `citeNoteRefs`, in `course.ts`. It turns Xuanzang quotes cited `（作者《书》，译者）[^n]` into source blocks carrying the CBETA label. Only IN3 enables it, so the other courses parse exactly as before.
- **Other files changed:** `media.ts`, `Media.tsx`, `practiceSets.ts`, `catalog.ts`, and the new `in2.ts`, `in3.ts`, `practice-in2.ts`, `practice-in3.ts`, `ui/media/in2/*`, `ui/media/in3/*`.

## 2. Source closeout (Phase 15B edits to the manuscripts)

- **IN2: attribution, not autobiography.** The Therīgāthā poems are worded as transmitted attributions (署名 / 传统把这首诗归于…). The commentarial life stories are named but not retold.
- **IN2: chariot argument.** The text keeps 车喻论证没有证明"人不存在".
- **IN2: no Madhyamaka conflation.** The Abhidharma two-truths table keeps Madhyamaka separate.
- **IN2: unverified claim removed.** An edition claim ("Pradhan 1967") could not be verified and was removed.
- **IN3, Part 二.** Vātsyāyana's two readings of NS 1.1.5 were verified and added.
- **IN3, Part 三.** The Praśastapāda five-member example was verified and its wording corrected (the e-text has `dravyam`).
- **IN3, Part 六.**
  - Debate 2 now paraphrases Tattvasaṃgraha 943–944 (anyonyasaṃśraya). The e-text is a word-split analysis, so the course paraphrases and does not quote it.
  - Debate 4 now quotes Ślokavārttika, abhāva v.1 (new note 86).
- **IN3, Part 七.**
  - The Gaṅgeśa material stays based on SEP. His anumāna chapter is not on GRETIL.
  - AnTs 53 is quoted for the term "sādhāraṇa".
- **Kumārila's apoha chapter is not available.** The GRETIL ŚV commentary file covers only 5.4–5.9, and the report says so.
- **Note count is 202, not the planned 201.** The difference is the added Ślokavārttika note (IN3 note 86). IN3 notes were renumbered in order of first appearance; all 94 + 108 note references and definitions match in the browser.
- **Additions verified only for the components:** Abhidharmakośa 1.5, 2.34 and 2.35, checked in the same GRETIL file. They appear only in the Abhidharma Classification Lab and are not added to the manuscript.

## 3. Rights and provenance

The per-file record is in each manuscript's 来源与权利说明:
- IN2: a table for SuttaCentral, AK, AKBh, NS and the NS commentary.
- IN3: 13 GRETIL rows plus a CBETA paragraph.

| Source | Terms read | Status |
|---|---|---|
| SuttaCentral bilara-data (Pali root texts) | Root texts public domain (licensing page); translations CC0 (not used) | Usable with citation |
| GRETIL plaintext files (all files used) | Each file header: CC BY-NC-SA 4.0, provided "in good faith", removed if a claim is made; older HTML files say "reference purposes only"; no site-wide terms page found | **Not cleared.** Short quotations with edition and attribution only; whether NC/SA fits PhiloPilot's licence is a PO decision |
| CBETA T1630 (Taishō vol. 32) | CBETA copyright page (read 2026-11-09): CC BY-NC-SA 4.0, non-profit; Taishō vols 1–85 in category A | **Not cleared** for commercial use. Characters kept, version cited |
| SEP / IEP | Copyrighted | Paraphrase with attribution; formulas reproduced for structure only |

## 4. Terminology

- **Knowledge sources.** 现量/比量 for pratyakṣa/anumāna, explained at first use (with 譬喻量/圣言量) and used in the Part 二/三 headings.
- **Gaṅgeśa.** Gaṅgeśa is 伽涅舍 throughout IN3; a search for 甘吉沙 finds nothing. The Phase 15A reports still use 甘吉沙 and are left as historical documents.
- **tarka and upādhi.** 思择 for tarka and 附加条件 for upādhi are recorded as course choices and explained in context: in Part 七 and in the Navya-Nyāya component.
- **Nun names.** Kept as in the draft (大爱道, 法施, 讖摩, 莲花色, and the course's transliterations 瓦吉拉, 慕达, 帕塔查拉), each with its Pāli name. The appendix explains why the names were not standardised to one Chinese canon.
- No stylistic rewrite.

## 5. Components

Each component is anchored to a block of the manuscript. State is saved per course (`in2.media.*`, `in3.media.*`). Every claim carries a basis tag: 本课核对过的原文 / 论书或注释传统的整理 / 学者的解释 / 通常的概述 / 后来的传统 / 本课的重构. Each component ends with a "这个演示是什么，不是什么" panel.

**IN2 components**

- **A. Five Aggregates & Chariot Explorer (三).** Inspects the aggregates and the parts of the chariot and of Nāgasena. Walks the six-step reconstruction in two columns (the reconstruction and the textual basis), with a stop at step 5 that rejects "那先不存在". The lamp, milk and mango similes are included, with their limits.
- **B. Dependent Origination Explorer (二).** Lays SN 12.1, DN 15, SN 12.65 and AK 3.20 side by side, including the reeds simile. Asks the reader to check which links DN 15 leaves out. Shows the four readings, which are labelled as the course's own grouping. The arrows mean only "conditioned by"; there is no simulation or prediction.
- **C. Abhidharma Classification Lab (四).** Applies the Theravāda four, the Sarvāstivāda five and the AK 6.4 test one scheme at a time. A side-by-side view states that it is not a merged ontology. Items the chapter does not discuss are marked "not discussed".
- **D. Therīgāthā Voices & Evidence Explorer (七).** Six voices in four layers: verse, attribution, later accounts, modern reading. A sorting exercise that includes "cannot establish". A shared-verse table.

**IN3 components**

- **A. Five-Member Inference Workshop (三).** Slot-filling for Vātsyāyana's sound example and the AnTs mountain example. Distractors: a reversed rule, a reason that is too wide, and an analogy with no rule; the 异喻 is accepted as a variant. Also covers the direction of vyāpti and the AnTs terms.
- **B. Dignāga's Three Characteristics Lab (四).** Checks the T1630 examples against the three marks; marks the chapter does not settle are left unjudged. Shows the hetucakra grid from SEP with no per-cell examples. Doctrine and modern readings (Hayes, Oetke, the SEP author) are kept separate.
- **C. Apoha & Universals Explorer (五).** Shows why apoha is not plain negation. Four positions (Nyāya–Vaiśeṣika, Dignāga, Dharmakīrti, Ratnakīrti) are applied to four cases, with gaps marked. The circularity objection is laid out with its replies and the TS paraphrase.
- **D. Navya-Nyāya Precision Workshop (七).** The monkey-and-tree delimitor in an SVG. A test of definitions 1 and 2 on three fixed sites, the kevalānvayin problem, and the upādhi and tarka. No logic engine, and no Sanskrit beyond what the chapter quotes.

## 6. Practice

Checker output (`ts/check2.ts`):

| | Sets / questions | single / multi / tf / view | Single-choice key positions | True/false | Multi keys |
|---|---|---|---|---|---|
| IN2 | 7 / 21 | 9 / 3 / 5 / 4 | A2 B3 C3 D1 | 3T / 2F | ACD, BCD, ABD |
| IN3 | 7 / 21 | 11 / 3 / 4 / 3 | A3 B4 C3 D1 | 2T / 2F (rebalanced; in3-6-3 rewritten as true) | BD, ABD, ABC |

- Four questions had their options reordered; option ids stayed stable.
- Answers are stored per course and do not change reading progress (checked in the browser).

## 7. Validation

| Check | Result |
|---|---|
| `tsc --noEmit`, `npm run build` | Pass. The chunk-size warning was already there before this phase. |
| Rendering | All sections render. Notes: 94 / 108, matching the 94 / 108 references. Primary-text blocks and tables render. The Xuanzang quotes show the CBETA label. |
| Components | All 8 appear in the intended sections. An automated pass through every control raised no errors; reset works. |
| Search | Course, section and term searches work (遮诠, 车喻, 大爱道, 伽涅舍, 现量 …). |
| Breadcrumbs | Breadcrumbs and the region page are correct. |
| Progress and resume | Progress and resume are recorded per course: IN2 showed 继续阅读; IN3 stayed 尚未开始. |
| Mobile (375 px) | No overflow after one CSS fix (long basis tags now wrap). The two-column panels stack. |
| Keyboard | The hetucakra cells take focus and respond to Enter and Space. All other controls are native buttons, radios and selects. |
| Reduced motion | Transitions are off under `prefers-reduced-motion` and `data-motion='none'`. No component uses JS animation. |
| Regression (14 existing courses) | All sections render. No console errors and no missing-anchor warnings. The parser option is off for every other course. |

The test data created in the browser's localStorage was removed afterwards.

## 8. Images

See `PHASE15B_IN2_IMAGE_APPROVAL_SHEET.md` (5 candidates) and `PHASE15B_IN3_IMAGE_APPROVAL_SHEET.md` (3 candidates). Nothing was downloaded and there are no placeholders. Open checks before approval:
- the PD-Mark release for the Cullavagga photograph;
- the Met's Open Access status for 1980.527.4 (the site refused requests);
- the NDL edition and date for 因明入正理論.

## 9. Open items for the Product Owner

1. Decide whether GRETIL and CBETA material under CC BY-NC-SA 4.0 is acceptable for PhiloPilot, or whether quotations must be rechecked against public-domain print editions.
2. Decide on each image.
3. IN3 has no question-page entry until another question region is expanded. That is outside this phase.

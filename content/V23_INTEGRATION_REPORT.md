# V23 integration report — JW1, EA1, EA2

*2026-11-10. Full production and integration of three courses in the prototype at `prototype/navigation-v2`:*

- *《犹太哲学：从萨阿迪亚到列维纳斯》 (JW1, Core-elective ◐)*
- *《从古代晚期到经院哲学》 (EA1, Core ●)*
- *《近代早期理性主义与新科学》 (EA2, Core ●)*

*Formal philosophy courses only: no Cases work, CASE 02 untouched, EA3 and later courses not started. Nothing has been committed, pushed or deployed, and no image has been downloaded.*

## 1. Registration and tiers

| Course | Module | Tier | Region · position | Recommended background (no lock) | Links on | `origLang` |
|---|---|---|---|---|---|---|
| JW1 | `content/jw1.ts`, `PUBLISHED.JW1` | ◐ 核心选修 | 伊斯兰、阿拉伯与犹太 · 6 | IA3 and EA1 "helpful" | S12 | `jrb` (Hebrew script), `la`, `de`, per passage |
| EA1 | `content/ea1.ts`, `PUBLISHED.EA1` | ● 核心 | 欧洲与北大西洋 · 1 | GR3 recommended; GR4, IA2, IA3 helpful | EA2 | `la` |
| EA2 | `content/ea2.ts`, `PUBLISHED.EA2` | ● 核心 | 欧洲与北大西洋 · 2 | EA1 | EA3 (unpublished: shown as "原型未实现") | `la` / `fr`, per passage |

- **Source of the registry facts:** they come from `planning/CURRICULUM_REFERENCE_DRAFT.md`, which was read only, not changed. This covers the method focus, background and → links. `recommendFrom` follows the registry's meaning ("courses that list this one as recommended background"): `EA1.recommendFrom = ['EA2']` and `EA2.recommendFrom = ['EA3']`.
- **Existing links already in place:** GR3, GR4, IA2 and IA3 already linked to EA1 and/or JW1. These links now open the courses. No existing course entry was edited.
- **`data/catalog.ts`:**
  - Entries added: JW1 (`elective`, `ia`), EA1 and EA2 (`core`, `ea`).
  - Placement: after IA5, before EA3.
  - Titles: the official short titles from `data/units.ts`.
- **`content/jw1.ts`:** hides the manuscript's two internal references "（EA9）" through `displayText`, as EA4 already does. The manuscript itself is unchanged.
- **EA3 and later courses:** they remain unavailable. `#/course/EA3` shows "这门课在原型中尚未实现。"

## 2. Practice

| Course | File | Sets | Questions | Single | Multiple | True/false | View |
|---|---|---|---|---|---|---|---|
| JW1 | `content/practice-jw1.ts` | 6 | 18 | 6 | 4 | 4 | 4 |
| EA1 | `content/practice-ea1.ts` | 7 | 21 | 8 | 6 | 4 | 3 |
| EA2 | `content/practice-ea2.ts` | 6 | 18 | 6 | 6 | 3 | 3 |
| **Total** | | **19** | **57** | 20 | 16 | 11 | 10 |

- **Registration:** all sets are registered in `content/practiceSets.ts`. Each set is matched to its 想一想 by its label (一 … 七).
- **Answer positions:**
  - Single-answer keys use all four letters.
  - Multiple-answer keys have two or three correct options, with the wrong option in varying positions.
  - True/false: 4 of 11 are true.
- **Answer-position fix:** answer positions were rebalanced during validation. The first version had every true/false item false, and every multi-select key had three options always including A.
- **No typed answers:** none of the 57 questions asks for one.
- **Storage:** practice state is stored under `philopilot.v2.{jw1,ea1,ea2}.practice.*`, separate from progress.

## 3. Components

| Course | Id | Anchor |
|---|---|---|
| JW1 | `negative-theology` | 二, after "表格的最后一行最重要。肯定的描述即使谨慎" |
| JW1 | `creation-eternity` | 三, after "这个立场在犹太传统中极少见" |
| EA1 | `anselm-lab` | 三, after "（本章的整理；阿奎那和康德的批评" |
| EA1 | `universals-workshop` | 四, after the four-positions table |
| EA1 | `five-ways` | 五, after "还要注意：阿奎那拒绝了安瑟伦的论证" |
| EA2 | `doubt-cogito` | 二, after ""我思"的确定性，只及于现在思想着的我" |
| EA2 | `elisabeth-objection` | 三, after "她还指出另一类事实" |

- **Shared code:**
  - `ui/media/jw1/shared.tsx` re-exports the V21 and V22 pieces. It adds `OrigSrc` for Judeo-Arabic, Latin and French, and a `Pick` toggle-button row (native buttons with `aria-pressed`).
  - `ui/media/jw1/v23.css` adds the Hebrew-script line, a label/value list and the belief list. It has no animation; one inherited transition is disabled under `prefers-reduced-motion`.
- **Registration:** component ids are in `content/media.ts`, lazy imports in `ui/media/Media.tsx`, and `useSavedIx` in `ui/media/in4/shared.tsx` now accepts JW1, EA1 and EA2.
- **Content:** every quoted line in a component is one of the chapters' checked passages, with the chapter's own translation. Every non-verified claim carries its basis tag (SEP paraphrase, general overview, or the course's reconstruction). Every component has a "这个演示是什么，不是什么" panel and a reset.
- **Selection:** the reasons for choosing these seven, and for not building the other brief candidates, are in each production report (§7).

## 4. Validation (performed 2026-11-10)

| Check | Result |
|---|---|
| `npm run typecheck` | Pass (also re-run after the answer-key rebalance) |
| `npm run build` | Pass. The ">1600 kB chunk" warning predates V23 |
| 19 official sections | All render in the production preview (port 5189): JW1 6, EA1 7, EA2 6, plus 导读, 结语 and 后世批判与回应 in each (28 reader parts) and the two appendices |
| Quotations / original-language display | `lang="jrb"` with Hebrew fonts, RTL and `unicode-bidi: plaintext` (JW1 §二); `la` (JW1 §四; EA1 §§一, 二, 三, 五; EA2 §§一, 二, 四); `de` (JW1 §五); `fr` (EA2 §§三, 五). The new `:lang(jrb)` / `:lang(he)` rule pair in `styles/base.css` affects only JW1 |
| Notes resolve | Every reference has a definition and every definition is referenced: JW1 49/49, EA1 52/52, EA2 57/57. No raw `[^n]`, `FNDEF` or `**` left in any section |
| 57 questions | All render, 3 per 想一想. Answered with their keys in the browser after the rebalance: 47 graded → "回答正确", 10 views → explanation shown |
| Practice vs progress | Answering questions wrote only `…practice.*` keys; no `progress` or `position` key was created or changed. Also checked with existing progress present: `{"1":1}` and the saved position were unchanged after answering in another section |
| Components | All seven render at their anchors. Every radio, toggle and checkbox was exercised, with feedback in words. State saved under `…media.*` and survives navigation |
| Keyboard / touch | Native `input[type=radio\|checkbox]` and `button` only, so they are focusable and operable by keyboard and touch by construction. No custom key handling. Not tested on a physical touch device or with a screen reader |
| 375 px | No horizontal overflow in any of the 28 reader parts (document width = 375 at the mobile preset); `negative-theology` screenshot checked (RTL Judeo-Arabic wraps correctly) |
| Reduced motion | The components have no animation; the one inherited transition (`.v22-bar i`) is off under `prefers-reduced-motion`. The pane cannot emulate the media query, so this was checked in the CSS only |
| Registration / tiers | Course pages show ◐ 核心选修 or ● 核心 and the region position. The background text is phrased "推荐背景，不是必需" |
| Region navigation | 历史与传统 → 伊斯兰、阿拉伯与犹太哲学 lists JW1 with "打开课程 →"; 欧洲与北大西洋哲学 lists EA1 and EA2 with "打开课程 →" and EA3 as "原型未实现" |
| Related links | GR3 → EA1, IA3 → EA1 and JW1, EA1 → EA2 open the new courses; JW1 → S12 and EA2 → EA3 show "原型未实现" |
| Search | "迈蒙尼德" (JW1 sections, after IA3's), "伊丽莎白", "单子", "列维纳斯", "近代早期", "犹太", "经院哲学" return the new courses and sections |
| Progress and resume | After reading EA2 §一 by user scrolling (wheel events), the course page shows 已读 9%, "继续阅读 →" and the section at 100%, and the home page shows "近代早期理性主义与新科学 · 怀疑与方法 · 恶灵" |
| Back to Top | Present in the reader |
| Console | No errors in the production preview. The dev server (port 5179, already running) showed no "[media] anchor … not found" and no practice-limit warning |
| Regression: 26 earlier courses | Every reader part of CN1–8, EA4, IN1–8, IA1–5 and GR1–4 loaded. Each course's components and 想一想 rendered, for example CN2 7 components / 13 exercises, EA4 8 / 13, IN8 6 / 7, IA1 3 / 6, GR4 6 / 6. Every 想一想 had 3 questions. No console errors |
| CASE 02 | `#/cases/02` loads 《分洪》 (13 chapters); no file under Cases or `practice-case02.ts` changed |

After testing, all browser state the tests created (keys `philopilot.v2.jw1.*`, `ea1.*`, `ea2.*`) was removed so the courses start fresh. The preview server was stopped.

**Not verified:**

- A physical touch device.
- Screen-reader output.
- Real `prefers-reduced-motion` emulation.
- Visual review of every component in dark mode.

## 5. Curriculum discrepancies (for the Product Owner)

Items 3 and 4 were resolved by the coverage corrections in §8; the others are unchanged.

1. **Spinoza in JW1 vs EA2.** The brief asks JW1 to cover "Spinoza's break", while the curriculum puts Spinoza in EA2. JW1 treats the break and the *TTP*; EA2 §四 treats the metaphysics. They cross-refer.
2. **Arendt.** The curriculum puts her in EA9. JW1 §六 uses her only as a contrast to Levinas.
3. **EA1 scope. Resolved (§8).** Eriugena is now a subsection of §一, and the medieval universities a subsection of §五. EA1 still has seven sections.
4. **EA2 debates. Resolved (§8), except Malebranche.** Innate ideas and Pascal are now subsections of §二. Malebranche still appears only through occasionalism.
5. **Levinas' birth year:** 1906, with 1905 noted (SEP says 1905).

## 6. Process disclosure

- **Drafting:** the manuscripts were drafted in parts in the session's temporary folder, assembled with footnotes renumbered by first appearance, and then corrected directly in `content/`.
- **Corrections from the check against SEP text:**
  - Gersonides' attributes are "common in essence, divergent in quantity" (not "same in essence, different in degree").
  - Gersonides on knowing particulars "insofar as ordered".
  - The *geshem* / *homer* distinction.
  - Arendt's course placement.
  - Elisabeth's biography is hedged as 通行介绍.
- **Citation fixes:** the ship example is in I.60, and "silence is praise" in I.59.
- **Verified vs paraphrased:** each production report (§3) separates the primary text verified on scans in this cycle from SEP paraphrase and from general overviews. Nothing is described as verified unless it was read.
- **Image candidates:** the rights fields were not read, and every image sheet says so.

## 7. Files

**New:**

- Manuscripts: `content/JW1_SAMPLE_DRAFT.md`, `content/EA1_SAMPLE_DRAFT.md`, `content/EA2_SAMPLE_DRAFT.md` (CRLF).
- Production reports: `content/JW1_PRODUCTION_REPORT.md`, `content/EA1_PRODUCTION_REPORT.md`, `content/EA2_PRODUCTION_REPORT.md`.
- Image approval sheets: `content/V23_JW1_IMAGE_APPROVAL_SHEET.md`, `content/V23_EA1_IMAGE_APPROVAL_SHEET.md`, `content/V23_EA2_IMAGE_APPROVAL_SHEET.md`.
- This report: `content/V23_INTEGRATION_REPORT.md`.
- Course modules: `prototype/navigation-v2/src/content/jw1.ts`, `ea1.ts`, `ea2.ts`.
- Practice: `prototype/navigation-v2/src/content/practice-jw1.ts`, `practice-ea1.ts`, `practice-ea2.ts`.
- Components: `prototype/navigation-v2/src/ui/media/jw1/` (`shared.tsx`, `v23.css`, `NegativeTheology.tsx`, `CreationEternity.tsx`), `ui/media/ea1/` (`AnselmLab.tsx`, `UniversalsWorkshop.tsx`, `FiveWays.tsx`) and `ui/media/ea2/` (`DoubtCogito.tsx`, `ElisabethObjection.tsx`).

**Modified (additions only):**

- `prototype/navigation-v2/src/content/courses.ts`: three imports and three `PUBLISHED` entries.
- `content/practiceSets.ts`: three imports and three entries.
- `content/media.ts`: seven ids and seven anchors.
- `data/catalog.ts`: three entries.
- `styles/base.css`: the `:lang(jrb)` / `:lang(he)` rule pair.
- `ui/media/Media.tsx`: seven lazy imports.
- `ui/media/in4/shared.tsx`: the `useSavedIx` code union.

**Not touched:**

- `planning/`.
- CASE 02 and all Cases files.
- Every earlier manuscript.
- The homepage layout.
- DataPilot, ArtPilot, MatScope and PsychoPilot.

`git status` shows no change outside the files listed above.

## 8. Final curriculum coverage corrections (2026-11-10)

*JW1, EA1 and EA2 were accepted. This pass made only the targeted coverage corrections in the "V23 — Final Curriculum Coverage Corrections" brief. It did not restart course development. Nothing has been committed, pushed or deployed. No image has been downloaded or embedded, and all image candidates stay in their approval sheets, none approved. EA3 has not been started. Cases and CASE 02 were not touched.*

### 8.1 Changes to the manuscripts

The section counts are unchanged: JW1 6, EA1 7, EA2 6. New material was added as `###` subsections inside existing sections. No 想一想 block was added or moved out of its section.

| Course | Where | Change |
|---|---|---|
| EA1 | §一, new subsection 爱留根纳：自然的四重划分 (before 想一想（一）) | Neoplatonic background (Pseudo-Dionysius, the Greek Fathers); "nature" as what is and what is not; the four divisions (table); negative theology (*superessentialis*, "nothing" by excellence, divine ignorance of *what* God is); theophany and primordial causes; *ex nihilo* as the divine nothing; *vera ratio* and authority; a Plotinus–Augustine–Eriugena table; reception (the 1210/1225 condemnations, Eckhart, Cusanus) and his place between late antiquity and scholasticism. Latin: *Periphyseon* I, opening (PL 122). |
| EA1 | §五, new subsection 大学：讲读、论辩与评注 (before 生平与著作) | How institutions shaped philosophical practice, not a university history. The 1215 Courçon statute and 1255 arts statute (Latin, *Chartularium* I); the Aristotle curriculum including the *Liber de causis*; lectio → commentary, disputatio → *quaestio*/*Summa* article, quodlibet, Sentences commentaries; "the institutionalisation of conflict" and the constraints of form (Sweeney); 1277 (Thijssen); a practice→genre→effect table. |
| EA1 | §七, Hildegard rewritten | Cosmos and creation, nature and humanity, divine knowledge, vision and interpretation. Her own texts (*Scivias* Protestificatio; *Liber divinorum operum* I.1) are separated from the later *Vita*; Rabassó on "human science", the letter to Odo, Reims 1148, Calcidius' *Timaeus*, the critical edition's parallels, macrocosm and microcosm; three things a reader can check. Latin: PL 197. |
| EA1 | §七, Héloïse rewritten | Ethics, authority, marriage and religious life, personal judgment, institutional rules vs moral responsibility. Epp. II (intention; *meretrix*/*imperatrix*; fortune vs virtue), IV (outward chastity vs the mind; obedience to Abelard rather than God), VI (*indifferentia*, reconstructed in three steps); the *Problemata*; the authorship question and the Dronke/Mews/Marenbon/Doyle debate. Latin: PL 178. New summary table; the women's exclusion from universities. The old Héloïse note based only on an overview was deleted. |
| EA1 | people table, 结语, 来源与权利说明 | Eriugena row; updated Hildegard and Héloïse rows; Eriugena in the metaphysics and language bullets; new "机构与论证" bullet; "not covered" now names only Pseudo-Dionysius' own works; sources, copyright, terms and uncertainty items updated. The first draft's statement that the SEP Eriugena entry was unavailable is corrected. |
| EA2 | §二, new subsection 天赋观念：三类观念从哪里来 (between 从"我"到神 and 笛卡尔循环) | The three classes (AT VII 37–38) as a provisional division; the idea of God as innate by elimination (AT VII 51), reconstructed in four steps with its weak points; *nota artificis*; mathematical true and immutable natures and *reminisci* (AT VII 64); innate ideas and clear and distinct perception (Samet); the gout/disposition reading; Locke's challenge as a five-step dilemma, cross-referenced to 《经验论、启蒙与自由主义的起源》; Leibniz's marble; a comparison table. |
| EA2 | §二, new subsection 帕斯卡：理性的界限与"赌注" (before 想一想（二）) | Reason and its limits (fr. 267); the heart and first principles (fr. 282) vs the heart that feels God (fr. 278); finitude and the thinking reed (fr. 347); the Wager's structure (fr. 233): prudential, not evidential, a decision table, Hájek's three arguments, "abêtira", the objections; two readings (Hájek; Clarke & Wood); a philosophy-vs-religion table and four tensions. It ends by saying explicitly that Pascal is not an irrationalist and the Wager is not an accepted proof. French: Brunschvicg 1904. |
| EA2 | people table, §五 bridge sentence, 结语, 来源与权利说明 | Pascal row; Descartes row updated; a Locke bridge sentence; 结语 extended, and Pascal removed from "not covered" (only his physics and mathematics remain); sources, copyright, terms and uncertainty items 7–8. |
| JW1 | §一, 卡拉派 rewritten | Scriptural authority and scripture vs tradition; Qirqisānī's four sources of knowledge against Saadia's (table), with "true report" limited to Scripture; legal-reasoning terms and why rejecting the oral law requires more reasoning; rational theology and the Muʿtazilite contrast; diversity (al-Qūmisī, Qirqisānī, the Tustarīs, the Jerusalem exegetes, al-Baṣīr); Rabbanites not homogeneous. |
| JW1 | §三, 卡巴拉 rewritten | Scope and three layers (pre-Kabbalistic text, medieval Kabbalistic texts, later interpretations); "no single system" (Weiss); *Sefer Yetzirah* 1:2 (Hebrew); Provence/Catalonia (Isaac the Blind, Azriel, Isaac of Acre); *Zohar* I:15a (Aramaic); Gikatilla's *Shaʿarei Orah*; attributes, unity and multiplicity, creation, and knowledge and interpretation compared with Maimonides (table); the Kabbalah–philosophy question (Weiss/Wolfson, Idel via a review, Crescas); later interpretations (Pico, Conway, Ibn Gabirol) kept apart. |
| JW1 | people table, 结语, 来源与权利说明 | Karaite row; 结语 wording; notes revised; sources, copyright, terms and uncertainty items updated. |

**Footnotes** were renumbered by first appearance. Cross-references written as "注 N" inside the manuscripts were remapped, including EA1's reference to JW1's note, now "注 20".

### 8.2 New sources

**Primary passages, checked against the scans' text layers:**

- Eriugena, *Periphyseon* I, PL 122.
- The 1215 and 1255 statutes, Denifle, *Chartularium Universitatis Parisiensis* I (1889), nos. 20 and 246.
- Hildegard, *Scivias* Protestificatio, *Vita* I.1 and *Liber divinorum operum* I.1, PL 197.
- Héloïse, Epp. II, IV and VI, PL 178.
- Descartes, AT VII 37–38, 51 and 64.
- Pascal, *Pensées* frr. 233, 267, 277, 278, 282 and 347, Brunschvicg 1904.

**Digital texts, not scans:** *Sefer Yetzirah* 1:2 and *Zohar* I:15a from Sefaria, labelled as such. Gikatilla is paraphrased from Sefaria's table of contents and introduction.

Column numbers that were inferred are said to be inferred. Hildegard's letter to Odo is quoted only via Rabassó.

**Scholarship, read in full:**

- SEP entries: Moran & Guiu, *Eriugena*; Sweeney, *Literary Forms of Medieval Philosophy*; Thijssen, *Condemnation of 1277*; Samet, *Innateness*; Clarke & Wood, *Pascal*; Hájek, *Pascal's Wager*.
- Rabassó 2016 on Hildegard.
- Doyle 2017 (MA thesis) on Héloïse.
- Mohamed 2018 on al-Qirqisānī.
- Weiss 2024 on spherical sefirot.

**Cited only secondhand, and labelled so:** Bazán (via Sweeney); Idel (via a book review); Wolfson (via Weiss).

**Language:** no claim of direct verification rests on secondary scholarship. Points known only from overviews are marked "依据通行的介绍".

### 8.3 Changes outside the manuscripts

- `practice-ea1.ts`: the `ea1-7-3` explanation no longer says the Hildegard section rests on the SEP overview.
- `practice-jw1.ts`: the note on `jw1-3-1` option D now says the chapter mentions that Crescas studied Kabbalah. The old note said "与本章无关", which the revised §三 contradicted.
- No stem, option, key or count changed. The total is still 57 questions.
- `courses.ts` (found at the pre-commit review): the three course `sourceNote` strings now name the editions added in this pass: PL 122/197/178 and the *Chartularium* for EA1, Brunschvicg's *Pensées* for EA2, and the two Sefaria sentences for JW1. JW1's note had said every other work was paraphrased. Text only.
- No component, registration, navigation, storage or media anchor changed. The seven anchors still match.
- The three production reports were updated: scope, size, arguments, sources, terms and unresolved items, with the note numbers remapped.

**Sizes:**

| Course | Characters | Notes | Primary blocks | Tables | 想一想 |
|---|---|---|---|---|---|
| JW1 | 40,317 → 47,118 | 49 → 56 | 4 → 6 | 10 → 12 | 6 |
| EA1 | 31,013 → 50,466 | 52 → 70 | 4 → 13 | 9 → 12 | 7 |
| EA2 | 30,790 → 44,207 | 57 → 66 | 10 → 18 | 8 → 12 | 6 |

### 8.4 Validation

| Check | Result |
|---|---|
| Footnotes | JW1 56/56, EA1 70/70, EA2 66/66. Every reference is defined, and every definition is referenced. No unresolved placeholder labels or "注 X" cross-references remain. The renumbering script, re-run, finds nothing to change |
| Line endings | All three manuscripts and the four reports are CRLF |
| `npm run typecheck` | Pass |
| `npm run build` | Pass. Only the existing chunk-size warning |
| Rendering (production preview, port 5189) | EA1 §§一, 五, 七; EA2 §二; JW1 §§一, 三. The new subsections render, with no raw `[^`, `**`, `|---` or placeholder text. Tables are inside horizontal-scroll wrappers. Latin and French passages carry `lang`. The Hebrew and Aramaic passages carry `lang="jrb"` with the Hebrew font and `unicode-bidi: plaintext`, as the existing Munk passage does |
| Footnote popups | Every unique note in those six sections was opened (88 in all), and every one showed its text |
| 375 px | No horizontal overflow in the six sections (document width 375) |
| Components | All seven still render immediately after their anchor text (JW1 §§二, 三; EA1 §§三, 四, 五; EA2 §§二, 三) |
| Practice | Each changed section still has its 3-question set, on that section's topic. The edited `jw1-3-1` D note and `ea1-7-3` explanation display. Answering wrote only `…practice.*` keys |
| Console | No errors |
| Cleanup | Test localStorage keys were removed, the viewport was reset, and the preview was stopped |

**Not repeated** (per the brief): the 26-course regression sweep. **Not checked:** screen readers, a physical touch device, and dark mode.

### 8.5 Files changed in this pass

**Manuscripts:**

- `content/JW1_SAMPLE_DRAFT.md`
- `content/EA1_SAMPLE_DRAFT.md`
- `content/EA2_SAMPLE_DRAFT.md`

**Reports:**

- `content/JW1_PRODUCTION_REPORT.md`
- `content/EA1_PRODUCTION_REPORT.md`
- `content/EA2_PRODUCTION_REPORT.md`
- this report

**Practice:**

- `prototype/navigation-v2/src/content/practice-ea1.ts` (one explanation)
- `prototype/navigation-v2/src/content/practice-jw1.ts` (one option note)

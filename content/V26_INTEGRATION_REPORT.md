# V26 integration report — EA10, EA11, EA12

*Baseline: commit `e3f3cfb07750cd29d3e619845fa9c67e29abfa24` (V25 sealed). Everything below is uncommitted working-tree change. Nothing was committed, pushed, merged or deployed; Cloudflare was not touched; Cases, EA1–EA9 manuscripts and `planning/` were not modified; no image was downloaded; no dependency was added.*

Per-course detail is in `content/EA10_PRODUCTION_REPORT.md`, `content/EA11_PRODUCTION_REPORT.md` and `content/EA12_PRODUCTION_REPORT.md`.

## 1. Coverage

| Course | Tier | Sections (curriculum order) | Reading parts | Notes | 想一想 | Tables | Body chars* |
|---|---|---|---|---|---|---|---|
| EA10 1950 年后的分析哲学：自然主义、意义与模态 | ● | Quine's holism · Naturalism (Sellars) · Kripke · Possible worlds (Lewis) · Davidson and Putnam · Realism and Kuhn | 9 | 102 | 6 | 16 | ≈ 29,900 |
| EA11 1950 年后的道德与政治哲学 | ○ | Anscombe · Foot, Murdoch, Midgley · Williams, integrity, moral luck · Rawls · Nozick and the communitarians · Care ethics | 9 | 89 | 6 | 9 | ≈ 28,300 |
| EA12 批判理论、结构主义、后结构主义与女性主义理论 | ○ | Critical theory · Structuralism · Foucault · Derrida (Deleuze kept separate) · Irigaray, Kristeva, Butler, Haraway · Habermas | 9 | 118 | 6 | 20 | ≈ 32,400 |

\* Non-whitespace characters before 注释, counted from the files after the correction pass (§11); the site's own figure for EA10 is 正文约 2.8 万字 (displayed text, excluding tables).

Each course has: reading orientation (导读 + 读这一章的几点提醒), a verbatim core question, six sections, guided reading, step-by-step reconstructions, objections and rival readings, examples, tables, notes, an appendix of sources and rights, six reflection exercises, 结语 and five 后世批判与回应 topics. The philosopher's argument, scholarly interpretation and the course's reconstruction are separated throughout by the markers ［本章的重建］, ［本章的整理］, 据 SEP 条目 and 依据通行的介绍.

EA12's 结语 ends with the required question: **是什么使一种对权力的批判在理性上站得住？它需要什么样的证据，什么样的辩护？**

## 2. Arguments (summary)

- **EA10:** Quine's circle of analyticity, synonymy and necessity; naturalized epistemology and Kim's normativity objection; the Myth of the Given; rigid designation, the three arguments against descriptivism, the necessary a posteriori; possible-worlds semantics and modal realism; radical interpretation and charity; Twin Earth; Kuhn, incommensurability, Davidson against conceptual schemes, internal realism.
- **EA11:** Anscombe's three theses; three distinct returns to virtue; Williams' integrity argument and utilitarian replies; four kinds of moral luck; Rawls' original position, the two principles, what the difference principle is not, reflective equilibrium; Nozick's side constraints and Wilt Chamberlain; communitarian critiques; care ethics and its relation to justice.
- **EA12:** traditional vs critical theory; the dialectic of enlightenment; Saussure's distinctions from the French text; Foucault's archaeology and genealogy and what he did not claim; the two phases of deconstruction on Saussure's own text; Deleuze's difference in itself; Irigaray, Kristeva, Butler (performativity is not voluntary performance), Haraway; Habermas' validity claims, colonization of the lifeworld, discourse ethics, and his critique of other critiques.

## 3. Sources and citation limits

| Course | Primary text quoted | Secondary sources read in full |
|---|---|---|
| EA10 | none (all authors under copyright) | 21 SEP entries |
| EA11 | none (all authors under copyright) | 16 SEP + 2 IEP entries; for Midgley, Robson's open-access PhD thesis (2023) and her open-access article in *BJHP* (2024/2025) |
| EA12 | Saussure, *Cours de linguistique générale*, fr.wikisource transcription of the Payot 1971 edition: seven short passages; every cited page checked against the scan images | 18 SEP + 4 IEP entries; Altamirano's open-access review of Daylight (2012). Bennington (2004) and Daylight (2011): publicly available opening pages and extracts only |

- No quotation or page number was invented. Copyrighted authors are paraphrased via SEP/IEP; short phrases SEP itself quotes are marked as such.
- Everything taken from general introductions rather than the encyclopedias is marked 依据通行的介绍 (EA10 38, EA11 23, EA12 17 occurrences before §11; the correction pass replaced two EA12 marks with named sources and added none).
- Known source gaps: no usable SEP entry for Putnam; Midgley rests on one researcher (Robson's thesis and article); the Derrida–Saussure scholarship (Bennington, Daylight) is paywalled and was read only in part; SEP/IEP entries for Kristeva, Haraway, Saussure, IEP structuralism and SEP Lévi-Strauss were unavailable (404), and the IEP "Butler" page is Joseph Butler.

## 4. Practice

| Course | Sets | Questions | single | multi | tf | view | Single keys a/b/c/d | tf keys T/F |
|---|---|---|---|---|---|---|---|---|
| EA10 | 6 | 18 | 6 | 4 | 5 | 3 | 1/2/1/2 | 2/3 |
| EA11 | 6 | 18 | 6 | 5 | 4 | 3 | 1/1/2/2 | 2/2 |
| EA12 | 6 | 18 | 6 | 5 | 4 | 3 | 1/2/2/1 | 2/2 |
| **Total** | **18** | **54** | 18 | 14 | 13 | 9 | | |

Multi-select keys vary in size (2 or 3) and position. Every option has its own feedback note; view questions have no right answer and give each position's strength and cost. Practice is stored under `philopilot.v2.<code>.practice.<section>`, separate from reading position and progress.

## 5. Components and rationale

| ID | Course · place | Difficult point it addresses | Interaction |
|---|---|---|---|
| `rigidity-tester` | EA10 三, after the "______ 本来可能不是 ______" table | rigid vs non-rigid; necessity vs a priori | judge six expressions; see referents in three constructed worlds; then classify 长庚星是启明星 as necessary and a posteriori |
| `distribution-chooser` | EA11 四, after the four-economies table | the difference principle misread as equality or as maximizing the average | choose behind the veil (no right answer); match three principles to the economies they select; row highlight |
| `writing-hierarchy` | EA12 四, after the six-step deconstructive reading | "deconstruction is wordplay" | sort four checked Saussure passages (French + chapter translation); pick the conclusion (reinscription); weigh two rival readings (no right answer) |

All three: buttons with `aria-pressed`, verdicts in words (not colour alone), `aria-live` feedback, visible focus, no animation (nothing for reduced motion to suppress), a reset button, a Limits panel separating the course's construction from the philosopher's claim, state under `philopilot.v2.<code>.media.<id>`.

## 6. Integration changes

**New files**

- `content/EA10_SAMPLE_DRAFT.md`, `content/EA11_SAMPLE_DRAFT.md`, `content/EA12_SAMPLE_DRAFT.md` (CRLF throughout: 954 / 854 / 1026 lines after §11)
- `content/EA10_PRODUCTION_REPORT.md`, `content/EA11_PRODUCTION_REPORT.md`, `content/EA12_PRODUCTION_REPORT.md`, this report
- `prototype/navigation-v2/src/content/ea10.ts`, `ea11.ts`, `ea12.ts` (course modules, same pattern as `ea9.ts`)
- `prototype/navigation-v2/src/content/practice-ea10.ts`, `practice-ea11.ts`, `practice-ea12.ts`
- `prototype/navigation-v2/src/ui/media/ea10/RigidityTester.tsx`, `ea11/DistributionChooser.tsx`, `ea12/WritingHierarchy.tsx`

**Modified files** (76 insertions, 2 deletions)

- `src/content/courses.ts`: imports and three `PUBLISHED` entries (positions 10–12). `leadsTo` from the curriculum: EA10 → S2, S5, S6, S10; EA11 → S7, S8, S9; EA12 → D6. `recommendFrom` is empty for all three (no course lists them as background; the curriculum says "EA10 not needed" for EA11). EA12 `origLang` is `'fr'`; EA10/EA11 have no original-language passages and leave it unset.
- `src/data/catalog.ts`: rows for EA10 (core) and EA12 (extended); EA11's row already existed.
- `src/content/practiceSets.ts`: three imports and `SETS` entries.
- `src/content/media.ts`: three `MediaId` members and three anchors.
- `src/ui/media/Media.tsx`: three lazy imports.
- `src/ui/media/in4/shared.tsx`: `useSavedIx` code union extended with `'EA10' | 'EA11' | 'EA12'`.

**Links.** The required reverse links already existed in V25 metadata and needed no edit: EA8 `recommendFrom: ['EA10']`; EA7 and EA3 list EA11; EA6 and EA9 list EA12 (EA5 also leads to EA12 per the curriculum). They now render as live links because the target courses are published. No prerequisite was invented and no link is duplicated (the course page filters `leadsTo` against `recommendFrom`).

## 7. Validation

Performed 2026-11-10 on the production build (`npm run build` → `tsc --noEmit && vite build`), preview `philopilot-nav-v2-build`, port 5189.

**Verified**

| Check | Result |
|---|---|
| Type check and build | pass (only the expected chunk-size warning) |
| `git diff --check` | clean |
| 18 sections render | 6 per course, plus 导读, 结语, 后世批判与回应 (9 parts each) |
| Notes | note references per course in the reader: 102 / 89 / 118, matching the manuscripts |
| Practice | 3 questions in each of the 18 sections = 54; answering one (mouse and keyboard) shows feedback and saves under the practice key |
| Components | each renders once, in the intended section; full run-through gives correct verdicts and closing claims |
| Component state across reload | EA12 state (6 choices) restored after reload; keys are separate from progress |
| Keyboard | Tab moves between options with a visible focus ring; Enter/Space select; practice answered by keyboard |
| Touch / 375 px | at 375 × 812 with touch emulation: no horizontal page overflow on component and table sections (document width 375); EA11's table scrolls within its region; a tap selects an economy and highlights the row |
| Catalogue | EA10 ● and EA11/EA12 ○ appear under 欧洲与北大西洋哲学 with "打开课程 →" |
| Search | 克里普克, 严格指示词, 罗尔斯, 无知之幕, 德里达, 批判理论, 分析哲学 return the new courses and sections (course codes are not searchable for any course; unchanged behaviour) |
| Related links | EA3, EA7 → EA11; EA8 → EA10; EA5, EA6, EA9 → EA12 shown as links; new courses' S/D links shown as "原型未实现" |
| Progress resume | after wheel-scrolling EA11 三, the course page shows "继续阅读 → 回到：完整性与道德运气 · 道德运气" |
| Practice vs reading position | submitting a practice answer left the saved position byte-for-byte unchanged |
| Older courses and CASE 02 | EA1, EA4, EA8, EA9, CN1, IN4 reader pages and `#/cases/02` (《分洪》) load |
| Console | no errors |
| Cleanup | localStorage cleared, viewport reset, preview stopped |

**Not tested**

- Real touch hardware and real screen readers (emulation and accessibility-tree checks only).
- Every one of the 54 questions answered in the browser (one per course was answered in the browser; all 54 were checked by a script against the data: every answer key exists among the options, multi keys are proper subsets of 2+ options, every option carries feedback, every tf question has its correction text; no problems found).
- Reduced-motion mode separately (the components have no motion).
- Browsers other than the app's built-in Chromium pane.
- Deployed site (nothing deployed).

## 8. Image candidates

None for any of the three courses. The philosophers are mostly twentieth-century figures whose photographs are under copyright, and no legal image was found that would help with an argument. No approval sheet was prepared and nothing was downloaded.

## 9. Unresolved issues for the Product Owner

1. No specialist review yet for any of the three manuscripts.
2. All claims about copyrighted originals rest on SEP/IEP; each 依据通行的介绍 should be checked against the books.
3. Weakest sourcing: Putnam (EA10, no SEP entry; accepted by the Product Owner without rewriting); Midgley (EA11, now a thesis and a journal article by the same researcher; several points rest on the thesis alone); Derrida's reading of Saussure (EA12, Bennington and Daylight read only in part; see §11).
4. EA11 gives Rawls' principles in the 2001 wording; the 1971 wording was not checked.
5. EA12's Saussure page numbers are now checked against the scan of the Payot 1971 printing (§11). Whether they match the 1916 first edition was not checked, and the *Cours*' copyright status in every jurisdiction was not verified.
6. EA12's recommended-background wording (EA6, EA9 as recommended background): accepted by the Product Owner; unchanged.
7. Course codes are not matched by the search palette (all courses; pre-existing).

## 10. Final Git status

Branch state at the end of V26 (HEAD `e3f3cfb07750cd29d3e619845fa9c67e29abfa24`, nothing staged or committed):

```
 M prototype/navigation-v2/src/content/courses.ts
 M prototype/navigation-v2/src/content/media.ts
 M prototype/navigation-v2/src/content/practiceSets.ts
 M prototype/navigation-v2/src/data/catalog.ts
 M prototype/navigation-v2/src/ui/media/Media.tsx
 M prototype/navigation-v2/src/ui/media/in4/shared.tsx
?? content/EA10_PRODUCTION_REPORT.md
?? content/EA10_SAMPLE_DRAFT.md
?? content/EA11_PRODUCTION_REPORT.md
?? content/EA11_SAMPLE_DRAFT.md
?? content/EA12_PRODUCTION_REPORT.md
?? content/EA12_SAMPLE_DRAFT.md
?? content/V26_INTEGRATION_REPORT.md
?? prototype/navigation-v2/src/content/ea10.ts
?? prototype/navigation-v2/src/content/ea11.ts
?? prototype/navigation-v2/src/content/ea12.ts
?? prototype/navigation-v2/src/content/practice-ea10.ts
?? prototype/navigation-v2/src/content/practice-ea11.ts
?? prototype/navigation-v2/src/content/practice-ea12.ts
?? prototype/navigation-v2/src/ui/media/ea10/
?? prototype/navigation-v2/src/ui/media/ea11/
?? prototype/navigation-v2/src/ui/media/ea12/
```

## 11. Final targeted scholarly corrections

Done on 2026-11-10, after the Product Owner accepted V26 in principle. The pass covered only three things: EA11's discussion of Midgley, EA12's account of Derrida on Saussure, and EA12's Saussure page numbers. No section was rewritten, no note was renumbered, no new course or component was added, and neither the UI nor the architecture changed. EA10 and the sealed courses were not touched. No image was downloaded.

### 11.1 EA11: Mary Midgley

**Source accessed.** Ellie Robson, "Mary Midgley's meta-ethics and Neo-Aristotelian naturalism", *British Journal for the History of Philosophy* 33, no. 5 (2025): 1207–1232, published online 16 September 2024, doi:10.1080/09608788.2024.2389863.
- The article is open access under CC BY-NC-ND.
- I read the full text in the publisher's HTML version. That version has no journal page numbers, so the notes cite section numbers.
- The publisher's PDF link returned 403, and no PDF was saved.

**What the article supports**
- **Midgley's ethics.** She rejects the fact–value gap ("universally contingent" goodness) and ties the good to the needs and wants of living beings (§§2.1–2.2).
- **Her place in neo-Aristotelian naturalism, as a qualified claim.** Robson mainly argues the weaker claim, that this tradition is the most plausible one to associate Midgley with. She thinks the stronger claim, that Midgley fully belongs to it, may also be true (§1).
- **Supporting points for that claim.**
  - Midgley called herself a "pluralist" and resisted every "ism" (§1).
  - Commentators in the 1980s, for example Cottingham in 1983, already grouped her with the new naturalism alongside Foot (§3.2).
  - She meets five of the seven criteria listed by Hacker-Wright, Hähnel and Lott (§3.3).
- **How she differs from Foot, Hursthouse and McDowell.** Robson frames the difference as Midgley rejecting the "transformative" role of rationality. For Midgley, rationality is cleverness plus integration, and integration is shared with other animals (§4.2).

**What I changed.** I found no substantial discrepancy. The manuscript's "应当被看作" ("should be seen as") was slightly stronger than the article's main claim, so I added the weaker/stronger distinction and Midgley's rejection of labels. I also added the article's account of rationality next to the thesis-based "理性的狼" ("rational wolf") passage. The changes:
- two passages in 二 extended;
- notes 23 and 27 extended, with no new note numbers;
- in the appendix: the status line, works table, rights note, sources paragraph and unresolved issue 2;
- one feedback note in practice question `ea11-2-3` (option c), which now says "Robson 的两篇论文" ("Robson's two papers") instead of "一篇博士论文" ("one doctoral thesis").

**Still resting on the thesis alone:**
- the sociobiology background (Wilson);
- open and closed instincts;
- the rational-wolf objection;
- McPherson's summary of *Wickedness*.

The article does not discuss these points; it mentions Dawkins only in its footnote 23. The note text says so.

### 11.2 EA12: Derrida and Saussure

**Sources accessed**

| Source | Access | Used for |
|---|---|---|
| Geoffrey Bennington, "Saussure and Derrida", *Cambridge Companion to Saussure* (2004), pp. 186–202, doi:10.1017/CCOL052180051X.013 | Paywalled. I read only the chapter summary on Cambridge Core (its opening paragraph). | Derrida's explicit discussion is the chapter "Linguistics and grammatology" of *De la grammatologie*. He starts from the chapter of the *Cours* on writing and draws general claims from it. The reading derives différance, trace and arche-writing. It is "not that of a professional linguist, nor that of a Saussure scholar". Saussure is a "privileged example". |
| Russell Daylight, *What if Derrida was wrong about Saussure?* (Edinburgh UP, 2011) | Paywalled. I read the table of contents and the opening extracts of the Introduction, chapters 2 and 4, and the Conclusion on Cambridge Core. | The book's scope, and its claim that a coherent resistance to Derrida's reading is possible. |
| Marco Altamirano, review of Daylight, *Journal of French and Francophone Philosophy* 20, no. 1 (2012): 147–152, doi:10.5195/jffp.2012.545 | Open access (CC BY-NC-ND 3.0); full text read. | See the list below. |
| *Times Higher Education* review of Daylight, 14 April 2011 (no author named on the page) | Full text read. | Daylight's aim: to show Derrida's interpretation "is by no means the only possible one". |

From Altamirano's review I took:
- Daylight's three criticisms:
  - Derrida treats Saussure's phonocentrism (the privilege of speech over writing) as logocentrism (the belief in thought without language) too quickly;
  - he says Saussure keeps a "transcendental signified" when the *Cours* repeatedly says there is no signified without a signifier;
  - he neglects Saussure's theory of value.
- "Saussurean speech is not the phenomenological voice" (Daylight, p. 84, as quoted in the review).
- The reviewer's counter-argument, and the passage the review quotes from the English translation of *Of Grammatology* (p. 43).

A 2021 article by Tyler James Bennett in *Linguistic Frontiers* that discusses Daylight turned up in search, but its download link returned 404. It was not used.

**What I changed**
- **The opening of the 四 example.** It now rests on Bennington's summary instead of "按照通行的介绍" ("following the common account"). It says that Derrida's reading itself is contested.
- **New subsection "这种读法的争议" ("The dispute over this reading").** A table keeps four layers apart:
  - Saussure's position;
  - Derrida's interpretation and critique;
  - later scholarship on that interpretation;
  - the course's reconstruction.
- **Content of the new subsection.** It gives Daylight's three criticisms as Altamirano reports them, the reviewer's counter-argument, and the THE remark.
- **A note on the course's six steps.** Steps 2–3 use the theory of value, which Daylight says Derrida neglected. So the six steps should not be read as a paraphrase of Derrida's own argument.
- **Two passages that now mention Daylight:**
  - the Derrida/Deleuze comparison table, in its "主要的批评" ("main criticisms") row;
  - the response under 后世批判与回应 三 ("Later critiques and responses", topic three).
- **Note 52.** Rewritten with full bibliography and the exact access level of each source.
- **The appendix** now lists this literature.
- **The `writing-hierarchy` component's Limits panel.** Its text now says the page numbers were checked against the scan, the reading is the course's reconstruction, and Derrida's reading is contested. Only the text changed, not the layout.

**Not verified independently**
- Nothing was checked in *De la grammatologie* itself.
- I read nothing of Bennington beyond his opening summary, so his own assessment of Derrida's reading is unknown to me.
- Daylight's arguments are known only from the extracts and the two reviews.
- The *Of Grammatology* p. 43 passage is known only from Altamirano's review.

### 11.3 EA12: Saussure page numbers

**Edition identified.** The Wikisource index page gives the scan's source as HathiTrust record 001898611 (University of Michigan copy). The scan's title page reads "Études et documents Payot … Payot, Paris … 1971".

**How I checked the pages**
- For every cited page, I matched the quoted French text in the Wikisource transcription to the page it was cited from.
- I then read the printed page number in the running head of the scan image:
  - Pages 30, 33, 45, 51, 52, 53, 98, 100, 117, 165 and 166 match.
  - Page 170 opens chapter V of part two and has no printed number. Its number follows from the sequence, since the next scan page prints 171.
- The book's own cross-references agree:
  - p. 30 says "p. 170 sv." (p. 170 and following);
  - p. 172 says "les exemples de la page 170" (the examples on page 170) and "voir p. 30" (see p. 30).
- "Travestissement" is hyphenated across pp. 51–52, as note 55 says.

**Result.** No page number needed changing.
- Note 15 and the appendix now say the page numbers refer only to the Payot 1971 printing and were checked against its scan.
- Notes 54–56 now also give the chapter.
- The claim "页码与通行的法文本一致" ("pagination matches the standard French edition") was removed, because I had not checked it.

**Not checked.** Whether this pagination matches the 1916 first edition or other printings.

### 11.4 Validation after the corrections

- **Notes:** EA11 has 89 and EA12 has 118. They are numbered consecutively, each is referenced, the order of first appearance is unchanged, and every "注 N" cross-reference resolves.
- **Build:** `npm run build` (`tsc --noEmit && vite build`) passes, with only the usual chunk-size warning.
- **`git diff --check`:** clean.
- **Line endings:** both manuscripts still use CRLF; EA11 has 854 lines and EA12 has 1,026.
- **File list:** identical to §10; there are no unrelated changes.
- **Browser check,** limited to the changed passages as requested (the full validation was not repeated):
  - EA12 四: the new heading appears, along with the 5-row table and three references to note 52. Note 52 opens with the new text, and the component's Limits text appears.
  - EA11 二: the new passages appear, with references to notes 23 and 27.
  - There were no console errors; localStorage was cleared and the preview stopped.

### 11.5 Files touched in this pass

`content/EA11_SAMPLE_DRAFT.md`, `content/EA12_SAMPLE_DRAFT.md`, `prototype/navigation-v2/src/content/practice-ea11.ts` (one feedback string), `prototype/navigation-v2/src/ui/media/ea12/WritingHierarchy.tsx` (Limits text), `content/EA11_PRODUCTION_REPORT.md`, `content/EA12_PRODUCTION_REPORT.md`, and this report. All of these files are new in V26, so the Git status in §10 is unchanged.

V26 stops here for Product Owner review.

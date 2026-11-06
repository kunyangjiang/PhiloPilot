# PhiloPilot — Project Direction

**Document status:** §1 records what the Product Owner has approved. Everything else in this file is **DRAFT — NOT APPROVED**, pending the Product Owner's final acceptance of the detailed curriculum.
Last revised: 2026-11-05 (Phase 1: final consolidation; §1 amended in Phase 2 to record the Owner-approved writing standard, and again to record the final teaching standards A–C)

## 1. Owner-approved educational principles (APPROVED)

Approved direction: **fewer courses, substantially greater depth per course, continuous philosophical narratives, guided primary-text reading, and active reasoning.** PhiloPilot should resemble a comprehensive, interactive philosophy textbook, not an encyclopedia of short lessons.

A course is a substantial, coherent chapter organized around an important philosophical problem, intellectual development, or philosophical system.

1. Depth takes priority over course count.
2. Maintain intellectual and historical continuity.
3. Teach philosophical arguments, not merely philosopher biographies.
4. Integrate primary texts, interpretation, objections and responses.
5. Use educational interactions only where they materially improve understanding.
6. Allow course length to vary according to academic needs.
7. Preserve structured progression and free exploration.

Illustrative reference only (not a requirement or limit): a substantial course may hold roughly 6,000–10,000 Chinese characters of instructional prose.

**Also approved by the Product Owner:**
- **Four-domain architecture:** A Foundations and Methods; B Global History; C Systematic Philosophy; D Advanced Comparative and Applied Philosophy.
- **72-course planning baseline** (44 Core, 5 Core-elective, 23 Extended). It is a baseline, not a cap; changes need a concrete academic reason.
- **Chinese as the primary instructional language,** retaining original philosophical terms and necessary English.
- **Critiques & Responses (后世批判与回应)** as an optional instructional pattern:
  - PhiloPilot explains not only what philosophers argued but how their ideas were criticized, defended, revised and reinterpreted.
  - *Debates essential to intellectual development* (for example Marx's critique and transformation of Hegel, or documented debates within Chinese and Indian traditions) belong in the **main narrative**.
  - *Later criticism and reinterpretation* may appear in an optional, concise section titled `后世批判与回应 (Critiques & Responses)`: the later critic and the precise position criticized; the critic's central argument and evidence; a documented response or a clearly identified alternative interpretation, when available; and an unresolved question for the learner. About 400–800 Chinese characters is typical, not required.
  - Constraints: not required in every course; no new curriculum domain; no courses added for it; do not repeat critiques already covered in the main narrative; distinguish documented historical responses from retrospective comparisons; present criticism fairly without implying equal scholarly support for every objection; never invent responses or debates.
  - Examples for future consideration, such as contemporary critiques of Confucian ethics associated with Deng Xiaomang, are **unverified** until the original scholarship has been checked at authoring.
- **Global instructional writing standard.** This applies to all 72 baseline courses and any future course, in every tradition.
  - *Reader and voice.* Write for an intellectually curious beginner, not a researcher. The voice is an excellent philosophy teacher explaining difficult ideas clearly, not an academic paper. Be rigorous but accessible, natural, direct and engaging.
  - *Language.* Use direct, natural, everyday Chinese. Explain ideas progressively, with concrete examples, carefully chosen analogies and questions that help the reader follow an argument.
  - *Avoid* unnecessary jargon, stiff sentences, overly abstract explanation, excessive headings, formulaic labels and repetitive academic phrasing. Write coherent, flowing prose, not fragmented encyclopedia entries.
  - *Never trade away accuracy.* Do not sacrifice philosophical accuracy or necessary complexity. Do not use slang, artificial humor, exaggerated storytelling or misleading simplification.
  - *Primary texts and terms.* Keep appropriate original passages and essential original-language terms, and explain them in accessible modern Chinese.
    - Define specialized terms at first use; re-explain only when genuinely needed.
    - Explain historical or linguistic differences that affect interpretation.
    - Where a term has no exact Chinese equivalent, explain the limits of the translation instead of forcing an equivalence.
  - *Keep sources distinct.* Always distinguish the author's own position, later scholarly interpretation and the course's teaching reconstruction. Prose may mark these distinctions; fixed labels are not required.
  - *Teaching progression.* Typically move from the original passage, to a plain-language explanation, to its philosophical significance and possible objections. This is a pedagogical pattern, not a mandatory template.
- **Final teaching standards (Owner-approved in Phase 2, applied to the CN1 and EA4 samples).** These apply to all courses together with the writing standard above.
  - *A. Example-rich teaching.* Support difficult concepts, arguments, distinctions and disagreements with concrete examples, using several when one is not enough. Examples may be ancient or modern, Chinese, Western, from other cultures, or hypothetical; prefer examples that show different aspects of the same idea.
    - Say what each example shows, and state its limits wherever an analogy could distort the theory.
    - Distinguish documented historical examples from invented scenarios. Never invent historical events, influences or responses.
    - Integrate examples into the narrative where they help, not mechanically after every paragraph.
  - *B. Visualization-integrated philosophy.* Use visual structures where they improve understanding: argument maps, concept diagrams, system structures, comparison tables, timelines, conditional-reasoning diagrams and thought-experiment branches.
    - Use Markdown tables and Mermaid diagrams that remain readable in the source file.
    - Give every important diagram a short explanation of what it shows and where it simplifies.
    - Distinguish the original argument from a modern teaching reconstruction.
    - There is no fixed number of diagrams per course.
  - *C. Reader-friendly citations.* Citation apparatus must not interrupt ordinary prose.
    - Name the primary text naturally where a quotation is introduced. Put edition references, page numbers (for example A/B and Akademie pagination) and scholarly citations (for example SEP) in numbered footnotes or endnotes, and explain abbreviations there.
    - Short chapter references for ancient Chinese texts (for example 《论语》12.1, 《孟子》6A8) may stay inline.
    - Preserve exact references. Keep original claims, interpretations and reconstructions distinct.
    - Do not remove citations or hide material uncertainties. Do not rewrite primary-source quotations merely to make them sound modern.
  - *Critiques & Responses length.* The Owner explicitly accepts the depth and length of CN1's Critiques & Responses section. The 400–800 character figure above is typical, not a limit; do not compress a substantial, well-sourced section to fit any length target.

Approved scope boundary: planning only. No sample lessons, UI design, application architecture or development without Product Owner authorization.

## 2. Product goal (one sentence)

PhiloPilot teaches students to *do* philosophy across traditions: read primary texts, reconstruct and evaluate arguments, follow how problems developed historically, compare positions fairly, and form their own reasoned judgments.

## 3. What was inspected (read-only)

- ArtPilot: `E:\ArtPilot\docs\ART_DIRECTION.md` (read). Narrative-plus-interaction lesson rhythm; facts vs. interpretation separated visually; optional quizzes that never block completion.
- DataPilot and MatScope: only file names listed; not read in depth. No sibling files modified.
- Lesson for PhiloPilot: sibling projects are organized around *objects of study* (datasets, materials, artworks). Philosophy's core object is the **argument and the text**. This is the basis for PhiloPilot's own identity.

## 4. Recommended direction — PROPOSAL (not approved)

**Continuous historical narratives as the main spine, with problem-centred courses and comparative studies built on them, and philosophical method taught inside every course.**

Reasoning, given the approved principles:
- "Continuous narrative" and "intellectual continuity" are best served by tradition-internal historical courses that follow real debates (e.g. Nyāya–Buddhist argument over inference; Ghazālī–Averroes on causation). These form the largest part of the curriculum.
- "Teach arguments, not biographies" is served by organizing every course around a problem or debate, and naming figures only as participants.
- Systematic courses then take one problem at a time and examine it with material from several traditions. Comparative courses go deeper into specific cross-tradition debates, and only after the relevant traditions have been studied on their own terms.
- Methods (argument reconstruction, conceptual analysis, interpretation, objection/reply) are practised in context in every course, with a short set of foundations courses for those who need explicit grounding.

Four domains (details in `CURRICULUM_REFERENCE_DRAFT.md`): A. Foundations and Methods; B. Global History of Philosophy; C. Systematic Philosophy; D. Advanced Comparative and Applied Philosophy. Free exploration is supported by tagging each course by tradition, problem and method, so the same material can be entered by history, by problem, or by method. No course is technically locked. Notes distinguish *recommended* background, *helpful* supplementary reading and a few explicit *intellectual dependencies* (still not locks). Domain D is not uniformly comparative: it holds comparative courses, contemporary and applied courses, and the capstone, which supports either a single-tradition or a comparative investigation, and comparison is not forced where the question does not justify it. Every course names one concise method focus.

Current proposal size (final targeted corrections, pending Product Owner acceptance): **72 courses** (A 4, B 44, C 13, D 11), plus an uncounted series of original-text study modules. Recommended foundational path: **44 core**, **5 core-electives** (the path suggests at least two that belong to meaningfully different traditions among Jewish, Africana, Japanese, Korean and Latin American thought; a guidance, not a completion gate), and **23 extended**. "Core" marks a recommended foundational sequence, not the importance of a tradition. Counts are outcomes of the consolidation, not targets.

### Strengths
1. Matches the approved principles directly: depth, continuity, argument focus.
2. Every tradition is first studied in its own terms, which resists flattening.
3. Fewer, richer courses reduce redundancy across historical, systematic and comparative layers.
4. New traditions can be added as additional historical courses without restructuring.

### Weaknesses and risks
1. **Authoring cost is high per course.** Deep courses need real expertise in several textual traditions and languages; single-author content will contain errors. Expert review is an open decision.
2. **Uneven depth.** Secondary literature and public-domain translations are far richer for Greek and European philosophy than for some others. Parity is not required, but visible thin spots must be stated openly.
3. **Category distortion.** Fitting any tradition's concerns into Western subfield names (e.g. "Chinese epistemology") can distort them. Tradition courses should state where the category fits poorly.
4. **Translation dependence and rights** (see §8).
5. **Long courses carry a pacing risk.** A course of many thousand characters needs internal structure, checkpoints and re-entry points; otherwise "textbook" becomes "wall of text".
6. **Comparative lessons can oversimplify** even in depth form; editorial rules in §6 apply.

## 5. Alternatives considered

| Alternative | Gain | Why not the spine |
|---|---|---|
| A. Pure chronological history by region | Familiar; strong development | Risks biography/encyclopedia; weak on skills. *Retained as the main spine, but each course is organized around problems and debates, not lives* |
| B. Systematic fields only (logic, epistemology, ethics, ...) | Matches most departments | Imports Western categories as default. *Retained as Domain C, built on the history courses* |
| C. Tradition-by-tradition survey | Integrity of each tradition | Siloed; no practice at comparison. *Addressed by Domain D* |
| D. Great-books / text-first only | Excellent for interpretation | Narrow on method and problems; heavy translation-rights burden. *Text-reading is built into every course instead* |
| E. Skills-only critical thinking | Cheap, useful | Not a philosophy curriculum. *Reduced to Domain A* |

## 6. Handling of traditions (editorial rules, proposed)

1. Do not present "Eastern" and "Western" philosophy as uniform blocks; name actual traditions and schools.
2. Teach a tradition's internal debates before comparing it with another.
3. A comparison must name (a) the shared problem, (b) what each side means by its key terms, (c) what does not translate, (d) a real disagreement or complementarity, not a surface similarity.
4. Keep original terms visible (dao, li, ren, dharma, pramāṇa, ḥaqq, ubuntu).
5. Mark unproven influence claims as hypotheses.
6. Show traditions through arguments, not as "mindsets" or sayings.
7. No numerical parity across traditions is required; depth follows the academic substance and the quality of available sources.
8. **Contested scholarship is marked, not settled.** Where authorship, dating or interpretation is disputed (for example the Ethiopian *Ḥatäta*, or the meanings of the Buddhist two-truths distinction across schools), lessons teach the dispute itself. Any claim that one philosopher directly answered another must be tagged documented, reconstruction or school-level before use. See `CURRICULUM_REFERENCE_DRAFT.md` §8; these items are flagged for later source checking and are not resolved.

## 7. Tradition coverage — summary (PROPOSAL)

Coverage is now substantive rather than symbolic. See the curriculum file for the course-level structure.

| Tradition | Treatment proposed |
|---|---|
| Greek and Roman | Four courses |
| Chinese | Eight courses, including Chinese Buddhism and Neo-Confucianism to Qing, and two courses on modern and contemporary Chinese philosophy |
| Indian | Eight courses: origins and heterodox schools, early Buddhism, knowledge and logic, Mahāyāna, Mīmāṃsā, Vedānta, Sāṃkhya–Yoga, modern thought |
| Islamic, Arabic and Jewish | Six courses tracing internal development (including modern thought); Jewish philosophy is a core-elective |
| European and North Atlantic (renamed from "European" because it includes American pragmatism and Anglo-American analytic philosophy) | Twelve courses, with 19th and 20th centuries given real space |
| African and Africana | Three courses (sources and debates; postcolonial; Black Atlantic), not a single "diversity" module |
| Japanese, Korean, Latin American | One course each, as core-electives; Tibetan and Indigenous philosophies reserved pending source decisions |
| Women and feminist philosophy | Integrated across periods plus a dedicated advanced course |

Critical note on African and Indigenous traditions: include them because they are recognized academic fields with their own methodological debates, but do not imply a written canon equivalent to the others. The debate over what counts as philosophy in these fields is part of the content.

## 8. Instructional methods — candidates (NOT approved)

Per principle 5, interactions are admitted only where they materially improve understanding.

| Method | Fit | Note |
|---|---|---|
| Guided primary-text reading with glosses and questions | **Strong; central** | Needs public-domain or licensed translations; keep original terms visible |
| Argument reconstruction and mapping | **Strong** | Risk: makes every text look like a syllogism; present as one reading |
| Objection / reply / rejoinder ladders | **Strong** | Separates philosophy from summary |
| Thought-experiment variation | Good if students must say what the case tests | Risk: gut-vote reduction |
| Position journals and short written responses | Strong but costly | Open: how feedback is given (D6) |
| Structured debate with a "state the opponent's best case first" requirement | Good | Avoid win/lose framing |
| Concept/knowledge graph (as index and relation viewer) | Useful for free exploration | Every edge needs a source and a relation type |
| Timelines | Orientation only | Risk of implied linear progress |
| Cross-tradition comparison tables | Risky | Only in the §6 rule-3 form |
| **Critiques & Responses** section (approved optional pattern, not a software feature) | Good where a later critique is well documented | Risks: artificial debates, unequal objections presented as equal; follow the §1 constraints |
| Auto-graded "who said what" quizzes | Poor | Rewards trivia |
| Points / badges | Weak | Trivializes; at most tied to completed reasoning tasks |

Interactions should concern **reasoning moves** (find the premise, supply an objection, spot an equivocation, translate a term, locate the disagreement), not manipulation of visual objects as in the sibling projects.

## 9. Sources and verification limits

**Verified in an earlier session (page opened and content read):**
- Stanford Encyclopedia of Philosophy table of contents — <https://plato.stanford.edu/contents.html>. Shows entry families for Chinese, Indian, Arabic and Islamic, and African philosophy (only the first 100,000 of ~216,000 characters were read).
- Internet Encyclopedia of Philosophy home page — <https://iep.utm.edu/> (top-level categories only).

**URL resolves (HTTP 200) but entry text not read:** SEP entries *chinese-metaphysics, chinese-epistemology, ethics-chinese, chinese-logic-language, chinese-social-political, mohist-canons, chinese-legalism, chinese-change, chinese-phil-science, logic-india, epistemology-india, madhyamaka, dharmakiirti, ethics-indian-buddhism, mind-indian-buddhism, arabic-islamic-metaphysics, arabic-islamic-greek, ibn-sina, african-ethics, african-sage, akan-person, africana, japanese-philosophy, kyoto-school, latin-american-philosophy, critical-thinking, fallacies* (all under `https://plato.stanford.edu/entries/<slug>/`); IEP <https://iep.utm.edu/african-philosophy/>; text repositories <https://ctext.org/>, <https://www.gutenberg.org/>, <https://www.perseus.tufts.edu/>. In this phase, the SEP slugs for *chinese-legalism, chinese-change, chinese-phil-science, madhyamaka, dharmakiirti* etc. come from the earlier TOC/slug lookup; they were not re-checked.

**Web-search summaries in the final-corrections phase (pages not opened; secondary summaries only):** results for the disputed authorship of the Ethiopian *Ḥatäta* (including a Cambridge repository item and a De Gruyter volume) and for the SEP entry "The Theory of Two Truths in India" (<https://plato.stanford.edu/entries/twotruths-india/>). They support recording these as contested; they are not verification of any specific claim. Details in the curriculum file §8.

**Search snippets only (pages not opened):** Duke <https://philosophy.duke.edu/undergraduate/major-minor>, Hawaii <https://hawaii.edu/phil/?p=139>, Yale via QS <https://www.topuniversities.com/universities/yale-university/undergrad/ba-philosophy>.

**Unverified suggestions:** every named book, author, figure, date, text title and translation availability in the curriculum file that is not listed above comes from general knowledge and has **not** been checked in this project. No new source verification was performed in Phase 1. Whether few university majors require non-Western philosophy is unverified.

## 10. Copyright policy (proposed)

- Ideas and arguments are explained in the project's own words.
- Do not copy modern translations, SEP/IEP text, or textbook passages. Quote at most short excerpts with attribution, after rights are checked.
- Prefer public-domain or commissioned short translations; many older translations are public domain in the US but may carry dated language or bias. Flag this in lessons.
- Keep a simple per-passage ledger: text, translator, edition, rights status.
- For non-public-domain texts link out instead of reproducing.
- Indigenous and community knowledge may need consent beyond copyright.

## 11. Key unresolved decisions

See `CURRICULUM_REFERENCE_DRAFT.md` §9. The language of instruction is settled (Chinese primary, original terms and necessary English retained). Still open, highest priority first: first-release scope, expert review of each tradition, translation/rights strategy for primary sources (including edition-specific public-domain status), and assessment of open-ended writing. Course length has not been tested against the 6,000–10,000-character reference.

## 12. Workflow notes (Workflow v6)

- Classification: planning/research, Level A. No implementation, dependencies, Git or scaffold.
- Subtraction: course count fell from 99 (itemized in the first draft) to 66, then rose to 72 after targeted splits of demonstrably over-broad courses (see curriculum file §1); the three overlapping layers (history, systematic, comparative) have distinct purposes.
- Stop: awaiting Product Owner review.

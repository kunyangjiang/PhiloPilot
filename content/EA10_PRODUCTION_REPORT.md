# EA10 制作报告（V26）

*Supporting report for `content/EA10_SAMPLE_DRAFT.md` (《1950 年后的分析哲学：自然主义、意义与模态》 / Analytic Philosophy After 1950: Naturalism, Meaning and Modality). Written in V26 with EA11 and EA12 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (EA10) and the V26 brief.

- **Tier:** Core ●.
- **Sections:** six, as in the curriculum: Quine's holism; naturalism (with Sellars); Kripke on names and necessity; possible worlds (Lewis); mind and meaning (Davidson, Putnam); realism and anti-realism (Kuhn).
- **Method focus:** "restating technical arguments in plain terms; evaluating thought experiments" (site: 用平实的话重述技术性的论证；评估思想实验).
- **Outcomes:** reconstruct Quine's attack on analyticity; explain rigid designation.
- **Links:** EA8 recommended; → S2, S5, S6, S10.

**Core question (verbatim):** 在语言转向之后，知识、意义、指称和必然性应当怎样解释？当哲学变得与经验研究相连续时，哲学本身又会发生什么变化？

| Element | Where |
|---|---|
| Reading orientation | 本章导读 + 读这一章的几点提醒 |
| Guided reading | 一, 原文导读：《两个教条》的结构 (structure of the paper section by section, paraphrased via SEP) |
| Step-by-step reconstructions | 一, the "circularity" argument against analyticity; 三, the three-step argument for the necessary a posteriori; 五, the Twin Earth argument |
| Objections and rival readings | each section ends with objections (Grice–Strawson, Kim's normativity objection, the modal/epistemic/semantic arguments against descriptivism and their replies, incredulous stare against Lewis, limits of externalism, Davidson against conceptual schemes) |
| Examples | animals with hearts/kidneys, Gödel–Schmidt, Hesperus/Phosphorus, water/H₂O, Humphrey, elm/beech, the 9/planets contrast |
| Tables | 16 (e.g. the "______ 本来可能不是 ______" test; three distinctions a priori/necessary/analytic; three dimensions of scientific realism) |
| Exercises | six 想一想 blocks, one per section, each with a hint |
| Synthesis | 结语 and 后世批判与回应 (five topics: analytic/synthetic after Quine; normativity in naturalized epistemology; modal epistemology; externalism and self-knowledge; whether realism needs truth) |
| Notes | 102 |

**Length.** Body (before 注释) about 29,900 Chinese characters without whitespace; the site reports 正文约 2.8 万字 (displayed text, excluding tables and notes). Nine reading parts: orientation, six sections, 结语, 后世批判与回应.

## 2. Important arguments

1. **Quine, "Two Dogmas" (一).** Analyticity of the second kind needs synonymy; synonymy cannot be explained by definition (which reports or presupposes it), by truth-preserving interchangeability (which works only in a language with "necessarily", already understood through analyticity), or by Carnap's semantic rules for an artificial language; every route returns to the circle of "analytic", "synonymous", "necessary". Reconstructed in five steps. The second dogma (reductionism) leads to the web of belief and revisability "even of logic".
2. **Naturalized epistemology (二).** Quine's "chapter of psychology", Kim's objection that normativity disappears, Papineau's distinction between ontological and methodological naturalism; Sellars' Myth of the Given and the manifest/scientific images.
3. **Kripke (三).** Rigid designation, the three anti-descriptivist arguments (modal, epistemic, semantic), the causal-historical picture, and the necessary a posteriori. The chapter keeps metaphysical, epistemic and semantic distinctions apart and notes direct-reference theorists' disagreement.
4. **Possible worlds (四).** □ and ◇ as quantification over worlds; instrument or metaphysics; Lewis' modal realism and counterparts; the incredulous stare and the Humphrey objection.
5. **Davidson and Putnam (五).** Truth-conditional meaning theory, radical interpretation and charity; Twin Earth and "meanings ain't in the head"; limits of externalism.
6. **Realism (六).** Kuhn's paradigms and incommensurability, Davidson's rejection of conceptual schemes, three dimensions of scientific realism, Putnam's internal realism. The section ends by denying that the field splits into two camps.

## 3. Sources actually consulted

21 SEP entries downloaded and read in November 2026 (listed in the appendix with authors and revision dates), from "Willard Van Orman Quine" and "The Analytic/Synthetic Distinction" to "Thomas Kuhn", "Scientific Realism" and "The Correspondence Theory of Truth" (background only). Putnam has no usable SEP entry; his views are given via "Externalism About the Mind", "Scientific Realism" and the common account.

**Citation limits.** All seven philosophers are under copyright. The chapter quotes no original passages and checks no page numbers in the books. Short phrases that SEP itself quotes are marked as SEP's quotation. Every claim taken from general introductions rather than SEP is marked 依据通行的介绍 (38 occurrences in notes and text). No quotation or pagination was invented; where SEP gives a citation the chapter could not resolve (Quine "1951, 43": journal or collection pagination), the note says so.

## 4. Terminology

Rigid designator 严格指示词; a priori/a posteriori 先天/后天; necessary/contingent 必然/偶然; analytic/synthetic 分析/综合; web of belief 信念之网; principle of charity 宽容原则; radical interpretation 彻底的解释; incommensurability 不可通约; the Myth of the Given 所与的神话; manifest/scientific image 显现的形象/科学的形象; counterpart 对应体. EA8's renderings (涵义/指称, 描述论) are kept.

## 5. Critiques and responses

Five topics, each giving a critique, a response and what is still open; none is presented as settled.

## 6. Practice

`src/content/practice-ea10.ts`: six sets × 3 = 18 questions. Types: single 6, multi 4, tf 5, view 3. Single-choice keys spread over a/b/c/d (1/2/1/2); multi keys vary in size and position; tf keys 3 false / 2 true. Every option carries its own feedback note; view questions have no right answer and explain each position's cost. Wording was checked against the manuscript (e.g. "怀疑的瞪视", "从 w₁ 看来").

## 7. Component

**`rigidity-tester`** (`src/ui/media/ea10/RigidityTester.tsx`), placed in 三 after the table of the "______ 本来可能不是 ______" test.

- **Why here.** Rigid designation is the concept learners most often misstate (as "refers to the same thing in every world *where it exists*", or confused with a priori). Seeing what each expression picks out in three small worlds makes the definition concrete, and the second part separates necessity from how we know.
- **What the reader does.** Judges six expressions (four from the chapter's table, two from 想一想（三）) rigid or not; after each choice sees the referent in w₁–w₃; then answers whether 长庚星是启明星 is necessary and whether it is a posteriori.
- **Basis tags.** The closing claim is marked as the course's reconstruction; the Limits panel says the worlds are constructed and notes the direct-reference objection.
- **Accessibility.** Buttons with `aria-pressed`, verdicts in words (对/再想想), `aria-live` feedback, visible focus; no animation. State saved under `philopilot.v2.ea10.media.rigidity-tester`, separate from reading progress and practice.

## 8. Image candidates

None. The philosophers are twentieth-century figures whose photographs are almost all under copyright, and portraits would not help with the arguments. No approval sheet was prepared and nothing was downloaded.

## 9. Unresolved issues

1. All claims about the original works rest on SEP and the common account; each 依据通行的介绍 should be checked against the books.
2. Quine's "no statement is immune to revision" is cited by SEP as "1951, 43"; journal or collection pagination is unresolved (注 9).
3. Gödel–Schmidt, Humphrey, elm/beech and the tie-shop example follow the common account only (注 13, 26, 60, 73).
4. Water = H₂O as a necessary a posteriori truth is contested in philosophy of chemistry; the chapter uses it only to show the argument's form.
5. Putnam has no usable SEP entry; the account of internal realism is thin (注 95, 96).

# EA11 制作报告（V26）

*Supporting report for `content/EA11_SAMPLE_DRAFT.md` (《1950 年后的道德与政治哲学：从安斯康姆到罗尔斯》 / Moral and Political Philosophy After 1950: Anscombe to Rawls). Written in V26 with EA10 and EA12 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (EA11) and the V26 brief.

- **Tier:** Extended ○.
- **Sections:** six, as in the curriculum: Anscombe's "Modern Moral Philosophy"; the return of virtue ethics (Foot, Murdoch, Midgley); integrity and moral luck (Williams, with Hare as background); Rawls; libertarian and communitarian replies (Nozick; Sandel, MacIntyre, Taylor, Walzer); care ethics (Gilligan, Noddings).
- **Method focus:** "testing a theory against objections and applying it to cases" (site: 用反驳检验一种理论；把理论用到案例上).
- **Outcomes:** reconstruct the original-position argument; explain Williams' integrity objection.
- **Links:** EA3, EA7 recommended; EA10 not needed (stated on the course page); → S7, S8, S9.

**Core question (verbatim):** 当规则、德性、个人的完整性、自由和分配正义提出相互冲突的要求时，我们应当怎样为道德判断和政治制度辩护？

| Element | Where |
|---|---|
| Reading orientation | 本章导读 + 读这一章的几点提醒 |
| Guided reading | 一, Anscombe's three theses and a step-by-step reading of the second |
| Step-by-step reconstructions | 一, the second thesis; 三, the integrity argument in five steps (negative responsibility, ground projects, the utilitarian demand, alienation, conclusion); 五, Wilt Chamberlain in five steps |
| Objections and rival readings | utilitarian replies to Williams; the four kinds of moral luck and three responses; objections to Rawls; criticisms of Nozick; the communitarians as several distinct critics; criticisms of care ethics; care and justice as rivals, complements, or at different levels |
| Examples | George and Jim; the two drivers; M and D (Murdoch); the Heinz dilemma; Wilt Chamberlain; the four economies |
| Tables | 9 (e.g. the four kinds of moral luck; the four economies) |
| Exercises | six 想一想 blocks, one per section, each with a hint |
| Synthesis | 结语 and 后世批判与回应 (five topics: can virtue ethics guide action; is integrity self-indulgence; is the veil too thick; does care ethics entrench inequality; can naturalist ethics avoid deriving ought from is) |
| Notes | 89 |

**Length.** Body (before 注释) about 28,300 Chinese characters (after the correction pass in §10) without whitespace. Nine reading parts.

## 2. Important arguments

1. **Anscombe (一).** The three theses; why "moral obligation" is said to survive only from a law conception of ethics without a lawgiver; "consequentialism" as her coinage; what she meant by needing a philosophy of psychology first. The chapter separates her argument from later readings that made the paper a founding text of virtue ethics.
2. **Three returns to virtue (二).** Foot (from "moral beliefs" to natural goodness), Murdoch (attention as moral activity; M and D), Midgley (humans as animals). The section's last subsection insists these are three different philosophies, not one school.
3. **Williams (三).** Against the background of Hare's prescriptivism: negative responsibility, ground projects, alienation; utilitarian replies; Williams and Nagel on moral luck with the four-way typology and the sceptical / accepting responses.
4. **Rawls (四).** Morally arbitrary facts, the original position and the veil, the two principles (2001 wording), what the difference principle is *not* (neither equality of outcome nor maximizing the average), why the parties choose it (maximin under stated conditions, with Harsanyi's average-utility alternative), reflective equilibrium, objections.
5. **Nozick and the communitarians (五).** Rights as side constraints, the historical entitlement theory, Wilt Chamberlain, criticisms; the communitarians as several different critics; practical vs retrospective criticisms.
6. **Care ethics (六).** Gilligan's "different voice" (Heinz), Noddings' caring relation, a contrast with Murdoch, three of the six criticisms listed by IEP, discussed in detail ("slave morality", empirical shortcomings of Gilligan's studies, parochialism), and three ways of relating care to justice.

## 3. Sources actually consulted

16 SEP entries and 2 IEP entries downloaded and read in November 2026 (listed in the appendix), from "Elizabeth Anscombe" and "Philippa Foot" to "John Rawls", "Original Position", "Robert Nozick's Political Philosophy", "Communitarianism", "Feminist Ethics" and IEP "Care Ethics"; "Distributive Justice" and "Libertarianism" for background only. Midgley has no SEP entry; the chapter uses two open-access works by Ellie Robson: her PhD thesis (Birkbeck, 2023) and her article "Mary Midgley's meta-ethics and Neo-Aristotelian naturalism", *British Journal for the History of Philosophy* 33, no. 5 (2025): 1207–1232, doi:10.1080/09608788.2024.2389863 (read in full in the publisher's HTML, cited by section; added in §10).

**Citation limits.** All the philosophers read are under copyright. No original passages are quoted and no book pages were checked. Claims from general introductions are marked 依据通行的介绍. The four economies and their numbers are the chapter's construction and are labelled so (注 53).

## 4. Terminology

Consequentialism 后果主义; virtue ethics 德性伦理学; ground project 根本的计划; negative responsibility 消极责任; moral luck 道德运气 (resultant 结果的, circumstantial 境况的, constitutive 构成的, causal 原因的); original position 原初状态; veil of ignorance 无知之幕; difference principle 差别原则; reflective equilibrium 反思的平衡; side constraints 边界约束; entitlement 持有的正义; care 关怀. EA7's renderings of utilitarian terms are kept.

## 5. Critiques and responses

Five topics, each giving a critique, a response and what is still open.

## 6. Practice

`src/content/practice-ea11.ts`: six sets × 3 = 18 questions. Types: single 6, multi 5, tf 4, view 3. Single-choice keys spread 1/1/2/2 over a–d; multi keys vary (two or three options, different positions); tf keys 2 true / 2 false. Every option has its own feedback; view questions explain each position's cost without a right answer.

## 7. Component

**`distribution-chooser`** (`src/ui/media/ea11/DistributionChooser.tsx`), placed in 四 after the table of the four economies.

- **Why here.** The difference principle is the most commonly misread part of Rawls (read as equality, or as maximizing welfare). Choosing behind the veil first, then matching three principles to the economies they select, makes the contrast visible with the chapter's own numbers.
- **What the reader does.** Picks an economy behind the veil (no right answer; feedback explains what that choice favours, including Harsanyi's average); then says which economy strict equality, average maximization and the difference principle each select. The chosen row is highlighted (`is-on`, `aria-current`).
- **Basis tags.** One claim marked as the course's, one as the SEP Original Position entry's (Rawls' maximin argument mainly supports the two principles as a whole against utilitarianism). The Limits panel notes the basic structure, the priority of liberty and fair equality of opportunity, and that the exercise judges no real policy.
- **Accessibility.** Buttons with `aria-pressed`, verdicts in words, `aria-live` feedback, a keyboard-focusable horizontally scrolling table region at 375 px. State saved under `philopilot.v2.ea11.media.distribution-chooser`.

## 8. Image candidates

None. The philosophers' photographs are almost all under copyright and portraits would not help with the arguments. No approval sheet; nothing downloaded.

## 9. Unresolved issues

1. All claims about the original works rest on SEP, IEP and Robson's two works; each 依据通行的介绍 should be checked against the books.
2. Midgley rests on one researcher's work. The 2024 article confirms the classification and the meta-ethics, but the sociobiology background, open and closed instincts, the rational-wolf objection and the summary of *Wickedness* still rest on the thesis alone. This remains the chapter's weakest sourcing (注 23–28).
3. Rawls' principles use the 2001 wording; the 1971 wording differs and was not checked (注 51).
4. The four economies are the chapter's construction (注 53).
5. Details of George and Jim, Jack and Emi follow the common account (注 34, 77).

## 10. Final scholarly correction pass (Midgley)

Done on 2026-11-10 at the Product Owner's request.

- **Source.** I consulted Robson's 2024 article in *BJHP* (33.5, 2025, pp. 1207–1232; doi:10.1080/09608788.2024.2389863; open access under CC BY-NC-ND) and read the full text in the publisher's HTML. That version shows no page numbers, so the notes cite sections.
- **Finding.** There was no substantial discrepancy with the manuscript. The article supports two things:
  - the reading of Midgley's meta-ethics as a rejection of the fact–value gap, grounded in species nature;
  - her association with neo-Aristotelian naturalism.
- **Changes.**
  - The classification is now stated as Robson's qualified claim: a weaker claim she mainly argues, and a stronger one she thinks may also hold. Midgley's own rejection of labels is noted.
  - The contrast with Foot now also gives the article's version: Midgley rejects "transformative" rationality, and treats rationality as cleverness plus integration.
  - Notes 23 and 27 are extended; no note numbers changed.
  - The appendix and one practice feedback string (`ea11-2-3` c) are updated.
- **Still unverified.** The article does not cover these points, which rest on the thesis alone:
  - the sociobiology background;
  - open and closed instincts;
  - the rational-wolf objection;
  - the summary of *Wickedness*.

# A1 制作报告（V29）

*Supporting report for `content/A1_SAMPLE_DRAFT.md` (《什么是哲学？问题、论证与阅读》 / What Is Philosophy? Questions, Arguments and Reading). Written in V29 with A2 and A3 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (A1) and the V29 brief.

- **Tier:** Core ●. First course of the 哲学方法 region (domain A, position 1).
- **Sections:** six, plus 导读 and 结语:
  - 一 仍然开放的问题
  - 二 论证及其部分
  - 三 好的推理与坏的推理
  - 四 读出一个文本所回答的问题
  - 五 反驳与回应
  - 六 形成并辩护一个观点
- **Method focus (site):** 找出文本所回答的问题，重建并评价论证.
- **Links:** recommended background for A2, A3 and IN3 (shown on their pages as 可接着读); leads to A2, A3 and A4 (A4 shown as not built). No prerequisite locks.

**Core question (verbatim):** 什么使一个问题成为哲学的问题？什么使一个论证成为好的论证？我们应该怎样阅读和批判地评价哲学文本？

| Element | Count / where |
|---|---|
| Running example | "我们不该吃肉，因为动物也会感到痛苦", reconstructed in 二 and objected to in 五 |
| Tables | 12 |
| Original passages | 10 short passages, all already used elsewhere on the site or re-checked: Plato *Euthyphro* 9e–10a (Greek, `grc`), 《孟子·告子上》 6A2–6A3 and 《墨子·小取》 (`zh-Hant`), *Nyāyasūtra* 1.1.32 and Vātsyāyana on 1.1.39 (`sa`) |
| Exercises | 6 想一想 blocks with 提示 |
| Notes | 27, all resolving |

The Euthyphro and Nyāya translations reuse the wording of 《柏拉图》 and 《知识、推理与辩论》, so the same sentence is not translated two ways on the site. The Mencius and 小取 translations are new.

## 2. Brief rules and where they are applied

| Rule | Where |
|---|---|
| Philosophy shown as several traditions' practice, not one canon | 一 and 四 draw on Greek, Chinese and Indian texts; the comparisons are marked as the chapter's own |
| Charitable reconstruction before criticism | 二: two rules for supplying hidden premises, with an explicit straw-man warning |
| Validity, soundness and strength kept distinct | 三, with defeasible and abductive reasoning (SEP Koons, Douven) |
| Fallacies not treated as a checklist | 三: "并不是一切诉诸权威都是谬误" and the dialectical approach (SEP Hansen) |
| Reading for the question a text answers | 四: Euthyphro's dilemma, Mencius on 人性 and water, 小取 terms |
| Objection types named and distinguished | 五 table: 推理 / 前提 / 推论（归谬） / 相关性 |
| Forming and defending one's own view | 六: thesis, strongest objection, reply, statement of limits |

## 3. Sources actually consulted

- **SEP:** Hansen (Fallacies); Dutilh Novaes (Argument and Argumentation); Hitchcock (Critical Thinking); Koons (Defeasible Reasoning); Douven (Abduction); Fraser (Mohist Canons); Phillips & Vaidya (Epistemology in Classical Indian Philosophy); Murphy (Theological Voluntarism); Van Norden (Mencius).
- **Primary texts:** Perseus (Burnet, CC BY-SA 4.0); zh.wikisource for 《孟子》 and 《墨子》; GRETIL for the Nyāya passages.

Known only through secondary literature (and so stated in the manuscript): Hamblin, Walton, van Eemeren, Singer 1972.

## 4. Practice

`practice-a1.ts`: 18 questions in 6 sets (9 single, 5 multi, 3 true/false, 1 view, a1-6-3). Every question has feedback. Each lede is "原题问你：" plus the exercise prompt, verbatim. Ids are unique.

## 5. Component

`ui/media/a1/ArgumentRoles.tsx` (`argument-roles`) is placed in 五, after the table of four kinds of objection.

- **Step 1:** sort five sentences from the running example into 结论 / 说出的前提 / 要补上的隐含前提 / 过强的补充 (the straw-man risk from 二).
- **Step 2:** say what each of the chapter's four sample objections targets (推理 / 前提 / 推论（归谬） / 相关性).
- Each pick shows the chapter's reason; picks can be changed. A count is shown once each step is complete.
- The 不是什么 panel says that "过强的补充" is the chapter's teaching label rather than a standard logical term, and that one objection (无痛屠宰) could also be described as aimed at a premise.

**Justification:** the chapter's two central skills (reconstruction and locating an objection) are classification tasks that benefit from immediate, per-item feedback.

## 6. Images

None used, none downloaded, none proposed.

## 7. Unresolved issues (flagged in the manuscript for expert review)

1. The "three kinds of work" and "three kinds of progress" in 一 are a teaching arrangement, not a metaphilosophical theory.
2. The comparison in 三 between the dialectical approach to fallacies and Nyāya's pseudo-reasons (似因) is a pointer, not a claim about their relation.
3. The evaluation of Mencius 6A2–6A3 and the mapping of 小取 terms onto modern logical terms in 四 are the chapter's judgements.
4. The origin of the "shallow pond" example in 六 rests on the common account only.

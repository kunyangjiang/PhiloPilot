# A3 制作报告（V29）

*Supporting report for `content/A3_SAMPLE_DRAFT.md` (《概念、案例与思想实验》 / Concepts, Cases and Thought Experiments). Written in V29 with A1 and A2 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (A3) and the V29 brief.

- **Tier:** Core ●. Position 3 in 哲学方法.
- **Sections:** six, plus 导读 and 结语:
  - 一 定义及其失败
  - 二 反例方法
  - 三 家族相似与模糊的概念
  - 四 思想实验检验什么
  - 五 变换一个案例
  - 六 对直觉的怀疑
- **Method focus (site):** 用反例和变换案例检验关于概念的主张，并反思直觉的可靠性.
- **Links:** A1 shown as recommended background (not required); leads to S1, S5 and S7 (shown as not built). No prerequisite locks.

**Core question (verbatim):** 定义一个概念是什么意思？反例和思想实验怎样检验关于概念的主张？我们对案例的直觉判断，在多大程度上值得信任？

| Section | Main material |
|---|---|
| 一 | Cephalus on justice (*Republic* 331c–d); Gettier cases (Ford / Barcelona); fake-barn county; Carnap's explication |
| 二 | the structure of a counterexample; what a counterexample does and does not refute |
| 三 | *Philosophical Investigations* §66–67; prototypes (Rosch, via SEP); vagueness; the sorites |
| 四 | Gyges (*Republic* 360b–c), 庄周梦蝶, Mary's room (with replies: Lewis/Nemirow ability, Conee acquaintance, Dennett and Churchland denying premise 2), Foot's judge and driver |
| 五 | Thomson's bystander and footbridge; the features table (杀死/允许, 手段/副作用); Thomson 2008 changing her verdict on the bystander |
| 六 | experimental philosophy (Weinberg, Nichols & Stich 2001; Machery et al. 2004, 56.5% / 31.5%; Nichols & Knobe 2007); the expertise defence; Cummins's calibration objection (the regress argument); Williamson, Cappelen and Deutsch |

| Element | Count |
|---|---|
| Tables | 5 |
| Original passages | 6: *Republic* 331c, 331d, 360b, 360c (`grc`); *PI* §66, two sentences (`de`); 庄周梦蝶 (`zh-Hant`). *PI* §67 is paraphrased |
| Exercises | 6 想一想 blocks with 提示 |
| Notes | 36, all resolving |

Contemporary cases are paraphrased from SEP's paraphrases; no contemporary text is quoted.

## 2. Brief rules and where they are applied

| Rule | Where |
|---|---|
| A counterexample refutes a definition only under stated conditions | 二, and the Carnap explication in 一 as an alternative aim |
| Not every concept has necessary and sufficient conditions | 三 (family resemblance, prototypes, vagueness) |
| Thought experiments distinguished by what they test | 四, a comparison table (the classification is the chapter's own) |
| Varying a case one feature at a time | 五, and the component |
| Intuitions treated as evidence open to challenge | 六: x-phi results stated with their sources and limits; replies given their strongest form |

## 3. Sources actually consulted

SEP entries: Margolis & Laurence (Concepts); Ichikawa & Steup (Analysis of Knowledge); Beaney & Raysmith (Analysis); Sorensen (Vagueness); Raffman & Hyde (Sorites); Brown & Fehige (Thought Experiments); Hansen (Zhuangzi); Nida-Rümelin & O Conaill (Knowledge Argument); Woollard, Howard-Snyder & Unruh (Doing vs. Allowing Harm, rev. 2025-07-08); McIntyre (Double Effect); Pust (Intuition); Sytsma, Reuter & Willemsen (Experimental Philosophy); Biletzki & Matar (Wittgenstein). Primary texts: Perseus (Burnet vol. 4, CC BY-SA 4.0); the 《庄子》 transcription used in CN3; wittgensteinproject.org for *PI*.

Corrections made during checking: Foot's judge case reworded to follow the SEP summary; the Mary replies rewritten (Dennett and Churchland deny premise 2, not the conclusion); the Cummins objection restated as the regress argument.

## 4. Practice

`practice-a3.ts`: 18 questions in 6 sets (10 single, 5 multi, 2 true/false, 1 view, a3-6-3). Every question has feedback. Ledes are verbatim; ids are unique.

## 5. Component

`ui/media/a3/CaseDials.tsx` (`case-dials`) is placed in 五, after the table of four cases and two principles.

- **Step 1:** the reader's own verdict (可以 / 错 / 拿不准) on 法官, 电车司机, 旁观者扳道岔 and 天桥推人. After each, the case's two features and the judgement SEP reports "many" hold are shown.
- **Step 2:** how many of the reader's firm verdicts each principle (做与允许; 双重效果) fits, followed by the chapter's three cautions (fit is not truth).
- **Step 3:** pick a pair of cases and see every difference between them, showing why only a one-feature change isolates a feature.
- Not scored: the verdicts have no right answer.

**Justification:** the section's method (turn one dial, see whether the judgement changes) is about the reader's own judgements; recording them and counting fit makes the method concrete without grading opinions.

## 6. Images

None used, none downloaded. The manuscript notes that if a trolley diagram is wanted later, a simple one should be drawn rather than downloaded.

## 7. Unresolved issues

1. ***Philosophical Investigations* rights:** handled in the final pass (§8). The US position has not been confirmed by legal advice.
2. The classification in 四 of what each thought experiment tests, and its comparison table, are the chapter's own.
3. The "many people judge" column in 五 follows SEP's "many believe", not experimental data; the confounds named for the footbridge case (physical contact, certainty) are the chapter's examples.
4. The "methodological lessons" in 六 are the chapter's recommendations.

## 8. Wittgenstein quotations: final verification (V29)

- **Wording.** Checked on 2026-11-11 against the wittgensteinproject.org transcription of *Philosophische Untersuchungen* (ed. Anscombe, Rhees and von Wright; base text Suhrkamp *Werkausgabe* vol. 1, Frankfurt am Main 1999, pp. 231–485). The §66 quotation matches word for word: two sentences, with one sentence between them elided (marked …). The source italicises *muß* and *schau*; note 10 now says the emphasis is not reproduced.
- **Necessity.** §66 is kept, because the commentary discusses its exact demand ("不要想，要看"). The §67 sentence only supplied the term, so it is **replaced by an attributed paraphrase** that keeps the German word Familienähnlichkeiten. Note 11 marks §67 as paraphrase. Nothing was expanded.
- **Rights appendix** (来源与权利说明: table row and item 4) now distinguishes:
  - **UK (and Germany):** Wittgenstein died in 1951, so the work is public domain under life+70 from 1 January 2022. The transcription site's own notice covers only the country of origin and life+70 states.
  - **United States:** *PI* was first published in the UK in 1953. US terms for foreign works of that period generally run from publication and may have been restored under the Uruguay Round Agreements Act, so the work is probably still protected there. The appendix does not call it public domain in the US and says this reading has not been confirmed by legal advice.
  - **Use:** a limited quotation (two sentences of §66, with the chapter's own translation) for educational commentary and analysis. The appendix says this is neither a claim of permission nor a guarantee of fair use in any jurisdiction.
- **Dependent text.** The status note now says "一小段"; the course `sourceNote` in `courses.ts` says "§66 的两句德文". The 导读 table row (§66—67) is unchanged because it names the topic, not a quotation. No practice question or component quoted §67.

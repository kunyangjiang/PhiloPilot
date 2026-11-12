# D2 production report — 《自我、人格与无我》

*Extended ○, Cross-Tradition Dialogue (domain D), position 2. Manuscript: `content/D2_SAMPLE_DRAFT.md` (CRLF). V35 cycle. Nothing committed.*

## 1. Coverage against the curriculum

Curriculum entry (`planning/CURRICULUM_REFERENCE_DRAFT.md`, D2): six sections (the question · no-self arguments · bundle views · relational persons · ethics of selflessness · evaluation). Method focus: comparing competing theories of the self on shared cases. Outcomes: state three theories of the self and the strongest objection to each. Background: IN2 or EA3, plus AF1 or CN1; S4 helpful.

| Section | Content | Requirement met |
|---|---|---|
| 导读 | Four shared cases (渐忘, 复制, 旧罪, "不是人"), each tied to a different question; core question; three reminders | Shared cases as the method of comparison |
| 一、"自我"问的是哪一个问题 | Six related but different questions (table); attā, Hume's "self", Parfit's "person", onipa and 己 answer different questions | Preliminary disambiguation before comparison |
| 二、无我的论证 | SN 22.59 (five-step reconstruction; weakest step is the exhaustiveness premise); SN 5.10 (reduction, not elimination); four Buddhist positions (Abhidharma, Pudgalavāda with SN 22.22, Madhyamaka, Yogācāra); SN 12.17 and the Milinda mango simile on responsibility; SN 44.10 | No-self arguments; Buddhism not treated as one theory |
| 三、束论 | Hume T 1.4.6 and the Appendix labyrinth; why Abhidharma does not face Hume's specific difficulty; Parfit (reductionism, fission, "empty question", ethical consequences via SEP); four-claims table; Parfit's Appendix as a documented comparison; "Hume is the Buddha" as a misleading comparison (Gopnik 2009 as a historical hypothesis only) | Bundle views; influence vs comparison separated |
| 四、关系中的人格 | Akan two-tier view (Wiredu, Gyekye; Menkiti via AF1); four theses of relational personhood; Analects 12.1; 克己 vs 无我 as a misleading comparison; Akan–Confucian comparison table; case four | Relational persons; rights not denied by relational views |
| 五、无我的伦理 | BCA 8.101–102; five-step reconstruction showing the ethical premise; grasping vs care; reasons for concern table; Analects 6.28; relations do not resolve conflicts automatically | **No-self does not automatically yield altruism** |
| 六、评价 | Five positions × four cases table (with "not its question"); three theories with strengths, strongest objection and reply; distorting-categories table; what the traditions can learn | Outcome: three theories and the strongest objection to each |
| 结语 | Returns to the question "who is asking 'who am I'?" | Open conclusion |

Not repeated: S4's survey (Locke, animalism, compatibilism), IN2's narrative of the aggregates and the *Kathāvatthu*, AF1's okra/sunsum translation debate, CN1's 亲亲互隐. The chapter cites these courses for their conclusions.

## 2. Comparative method (D1 applied)

D1's principles are applied as working practice, not as a checklist: every comparison names its shared question and marks itself ［本章的比较］; documented comparison (Parfit's own Appendix) is distinguished from influence; the Hume–Buddhism influence claim is treated as a historical hypothesis that needs letters or records, not likeness. Original terms are kept (attā, sammuti, upādāna, onipa, okra, 己). Two comparisons are taken apart where they mislead ("Hume is the Buddha"; 克己 = 无我), and a final table names seven categories (self, reductionism, bundle theory, relational self, communitarianism, altruism, personal identity) and what each distorts.

## 3. Argument accuracy

Reconstructions are marked ［本章的重建］: the SN 22.59 control argument (5 steps), the Milinda responsibility argument (4 steps), Hume's labyrinth, Śāntideva's ownerless-suffering argument (5 steps, with step 3 identified as the ethical premise). Parfit, Korsgaard, Schechtman, Wiredu, Gyekye, Menkiti, Ames and Rosemont are paraphrased via SEP or via the course that read them; nothing is quoted from them.

## 4. Primary-text verification

11 quoted passages: 9 original-language blocks (Pāli 5, including SN 22.22 and the Milinda question; English 2; Sanskrit 2) and 2 Chinese source blocks. All are reused verbatim from courses that already checked them: IN1 (SN 22.59), IN2 (SN 5.10, 22.22, 12.17, Milinda), EA3 (Hume T 1.4.6 and Appendix), IN4 (BCA 8.101–102), CN1 (Analects 12.1, 6.28). Translations reuse the source course's 试译 / 白话. No new primary text was needed.

Corrections made during production: IN1's title (now 《起源与早期论争》) and the part of IN4 that treats Śāntideva (第六部分).

## 5. Bibliographic and copyright limits

All quoted texts are public domain; digital-edition licences follow the source courses' appendices. Read this cycle by retrieval tool (possibly not in full): SEP "Personal Identity and Ethics" (Dufner 2025), SEP "Akan Philosophy of the Person" (Wingo, rev. 2024), SEP "Ethics in Indian Buddhism" (Goodman & Schultz, rev. 2024). Known only at second hand and listed in the appendix: Parfit's *Reasons and Persons* and its Appendix, Korsgaard, Schechtman, the primary works of Wiredu, Gyekye and Menkiti, Ames and Rosemont, Candrakīrti's sevenfold analysis, Gopnik 2009.

## 6. Statistics

8 parts; reading text ≈ 21,900 characters (1.5 / 1.8 / 4.8 / 4.0 / 3.4 / 2.8 / 3.1 / 0.5 千字). 28 notes, 32 note references, all resolving in the browser. 10 tables. 6 exercises.

## 7. Practice (`practice-d2.ts`)

6 sets × 3 = 18 questions: 8 single, 3 multi, 5 tf (3 false, 2 true), 2 view. Keys vary (single: d, c, a, b, d, b, c, b). Every graded key accepted in the browser. The view questions (4-3: does the daughter's obligation weaken? 6-3: which theory answers the four cases best?) name what each position must carry; none is marked right.

## 8. Component (`ui/media/d2/SelfhoodCases.tsx`)

Anchored in 六, at the paragraph introducing the exercise ("下面的练习把四个案例交给你"). The reader chooses one of the five positions and predicts its answer to each of the four cases, including "不是它的问题"; the component then shows that position's cell from the chapter's table and, where the cell is "not its question", why forcing an answer distorts the theory. A closing line names where the position competes. Every claim carries the "本课的重构或举例" basis tag; nothing is scored. State saved under `philopilot.v2.d2.media.selfhood-cases`; survives reload (verified).

## 9. Checked vs assumed

Checked: all quotations against the source courses' manuscripts; titles of cited courses against `units.ts`; footnote resolution in the browser. Assumed (common account, flagged in the text): the Pudgalavāda's "fifth category", Candrakīrti's sevenfold chariot analysis as a critique of reductionism, Parfit's citation of the Milinda and Buddhaghosa, Gopnik's hypothesis.

## 10. Unresolved issues

1. Parfit's Appendix is described from common accounts; the text itself was not read.
2. The "simple view" row in the cases table is the chapter's reconstruction of a non-reductionist reply, not any named author's.

## 11. Images

None used, none downloaded. The course does not need images.

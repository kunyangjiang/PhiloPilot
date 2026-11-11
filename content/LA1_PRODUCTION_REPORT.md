# LA1 制作报告（V28）

*Supporting report for `content/LA1_SAMPLE_DRAFT.md` (《拉丁美洲哲学：征服、独立与解放》 / Latin American Philosophy: Conquest, Independence and Liberation). Written in V28 with JP1 and KR1 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (LA1) and the V28 brief.

- **Tier:** Core-elective ◐.
- **Sections:** six, as in the curriculum, plus 导读 and 结语:
  - 一 巴利亚多利德：征服的合法性
  - 二 索尔·胡安娜：为求知的权利辩护
  - 三 独立与"我们是谁"
  - 四 实证主义与它的批评者
  - 五 解放哲学：从"有没有"到"为了谁"
  - 六 去殖民思想与边界：谁的知识？
- **Method focus (site):** 在历史语境中评价关于权利与解放的规范论证.
- **Links:** EA3 is shown as recommended background; leads to D6 (shown as not built).

**Core question (verbatim):** 从征服到解放，拉丁美洲的思想家怎样论证政治的合法性和认识的权威？他们的论证可以怎样被重建和评价？

| Element | Count / where |
|---|---|
| Method tool | five questions for evaluating a normative argument (结论 / 前提 / 语境 / 反驳 / 今天), as a table in 导读 |
| Tables | 10 |
| Original passages | 8 Spanish passages from public-domain texts (Sor Juana 1691, Bolívar 1815, Barreda 1867, Martí 1891, Mariátegui 1928), each with the chapter's own translation, rendered `lang="es"` |
| Exercises | 6 想一想 blocks with 提示 |
| Notes | 74, all resolving, numbered 1–74 |

## 2. Brief rules and where they are applied

| Rule | Where |
|---|---|
| Valladolid is not an anachronistic human-rights court | 导读 misreadings list; 一 shows both sides inside Catholic and scholastic theology |
| No invented winner | 一 "结果：没有胜负" (IEP: no formal winner; SEP: inconclusive) |
| No invented Indigenous participation | 一 "谁没有在场". Guamán Poma is presented as a later Indigenous author, explicitly not as an "answer" to the debate |
| Sor Juana read through her own text | 二 quotes the *Respuesta* (1691) in Spanish, including the passage beginning "……pero, señora". It warns against the label "modern feminist" |
| Independence movements not identical | 导读 and 三 (Haiti, Spanish America and Brazil distinguished; a comparison table flagged for review) |
| Mariátegui adapted rather than copied | 四 quotes the 1928 essay and discusses the "calco y copia" phrase (its source flagged) |
| Freire reconstructed in detail; Zea, Dussel and Freire not identical | 五: Freire's argument as testable steps with an evaluation; a separate subsection, "不是同一个立场" |
| Standpoint objections | 导读 misreading "受压迫者的观点总是对的", answered in 六 |
| Spanish, Portuguese and Latin distinguished | 导读 第二 (language) and 来源与权利说明. Latin works are paraphrased; Freire (Portuguese, in copyright) is paraphrased |
| EA3, AF2 and AF3 cross-referenced without implying a uniform movement | 导读 第六 states that these are "不是同一个运动"; the comparisons in 六 are flagged as the chapter's own |

## 3. Sources actually consulted

- **SEP:** Gracia & Vargas; Izbicki & Kaufmann; Kohn & Reddy; Vargas (Latinx); Rivera Berruz; Heyes.
- **IEP:** Stehn, "Latin American Philosophy"; Díaz, "Paulo Freire".
- **Public-domain texts:** es.wikisource.org transcriptions.

Every quotation was checked against the downloaded text, and every encyclopedia claim against the saved entry text. All twentieth-century authors are paraphrased only.

## 4. Practice

`practice-la1.ts`:

- 18 questions in 6 sets (10 single, 4 multi, 2 true/false, 2 view).
- Ledes are identical to the exercise prompts (script-checked).
- Ids are unique.

## 5. Component

`ui/media/la1/NormativePremises.tsx` (`normative-premises`) is placed in 一, after the side-by-side table of Sepúlveda and Las Casas.

- **Step 1:** sort seven claims restated from the table as shared, normative or factual (the second of the five questions). After each pick it reveals which side held the claim and which table row it comes from.
- **Step 2:** a view, with no right answer, on the fifth question: what is still testable once the period's framework is set aside?
- The 不是什么 panel says:
  - the table is the chapter's reconstruction;
  - two rows (关于惩罚, 关于手段) are classed here as normative by type, although the table does not label them so;
  - the component does not speak for Indigenous people.

## 6. Image candidates (approval notes only)

None verified and none downloaded. Possible candidates for a later cycle, all unverified:

- Guamán Poma's drawings (original in the Royal Danish Library, Copenhagen);
- portraits of Sor Juana;
- images connected with Valladolid.

Each needs source and rights verification and Product Owner approval.

## 7. Unresolved issues

These are flagged in the manuscript for expert review:

1. The common "four reasons" summary of Sepúlveda (his original was not read).
2. Las Casas's early proposal to import African slaves and his later repentance.
3. The independence comparison table.
4. Whom Bolívar meant by "这个国家的人".
5. The source of Mariátegui's "calco y copia".
6. The summaries of Dussel, Quijano and Anzaldúa.
7. The comparisons with AF2 and AF3, which are the chapter's proposal, not a claim of influence.

The manuscript also flags its own critical paragraph on the Inca state and the ayllu, which no consulted entry supports (note 46).

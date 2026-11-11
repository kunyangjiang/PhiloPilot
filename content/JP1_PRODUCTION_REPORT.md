# JP1 制作报告（V28）

*Supporting report for `content/JP1_SAMPLE_DRAFT.md` (《日本哲学：佛教思想、江户儒学与京都学派》 / Japanese Philosophy: Buddhist Thought, Neo-Confucian Edo and the Kyoto School). Written in V28 with KR1 and LA1 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (JP1) and the V28 brief.

- **Tier:** Core-elective ◐.
- **Sections:** seven, plus 导读 and 结语:
  - 一 佛教在日本：空海与亲鸾
  - 二 道元：修证一等与"有时"
  - 三 江户思想：仁斋、徂徕与国学
  - 四 明治的翻译与现代性：给欧洲概念造词
  - 五 西田几多郎：从纯粹经验到场所
  - 六 和辻哲郎：间柄与伦理学
  - 七 京都学派与政治：田边元、西谷启治
- **Method focus (site):** 解读翻译过来的术语；把一篇难读的禅宗文本当作论证来读.
- **Links:** CN5 and CN6 shown as helpful background; leads to S7 and D3 (both shown as not built).

**Core question:** the bolded 核心问题 in 导读, shown on the course page.

| Element | Count / where |
|---|---|
| Tables | 9 |
| Original passages | 9 with the chapter's own translation: 8 Japanese (《歎異抄》, 《正法眼藏·有时》, 《善の研究》), 1 kanbun verse quoted by Dōgen |
| Exercises | 7 想一想 blocks with 提示 |
| Notes | 71, all resolving, numbered 1–71 |

**Brief rules honoured.**

- **Not derivative, and no invented independence:** each section starts from the imported concept and shows what argument it was made to carry in Japan.
- **Similarity is not influence:** for example, Dōgen and Heidegger are compared, and the chapter says there is no historical link between them.
- **Text layers kept distinct:** original text, translation, commentary and modern reconstruction are kept apart. Twentieth-century sources are paraphrased from SEP, and quotations from English entries are marked as translations of translations.

## 2. Sources actually consulted

Listed in the manuscript's 来源与权利说明:

- nine SEP entries (Kasulis & Bouso; Krummel; Hirota; Nagatomo; Tucker; Parkes & Loughnane; Maraldo; Carter & McCarthy; Davis);
- 村上恭一 (2007) on 《有時》;
- the Matheson Trust comparison of two English renderings;
- 青空文库 《善の研究》;
- the 《歎異抄》 text as transcribed in a Shinran Center lecture handout. Only the public-domain classical text was used, not the lecturer's commentary.

## 3. Practice

`practice-jp1.ts`:

- 21 questions in 7 sets (11 single, 5 multi, 4 true/false, 1 view).
- Ledes are identical to the 7 exercise prompts (script-checked).
- Ids `jp1-N-M` are unique.

## 4. Component

`ui/media/jp1/UjiReadings.tsx` (`uji-readings`) is placed in 二, after the paragraph "四、译本。"

- It shows いわゆる有時は、時すでに有なり、有はみな時なり with the chapter's translation (`lang="ja"`).
- **Step 1:** sort six restated chapter statements into three readings of 有時 (甲 everyday adverb / 乙 being-time / 丙 for the time being).
- **Step 2:** a view, with no right answer, among the chapter's three interpretive approaches (形而上学 / 现象学 / 修行).
- It ends with a 不是什么 panel.

**Rationale:** the method focus is reading translated terms, and the component practises exactly that on the chapter's central sentence.

## 5. Image candidates (approval notes only)

None verified and none downloaded. Possible candidates for a later cycle, all unverified:

- an early manuscript of 《正法眼藏》;
- Nishida's calligraphy.

Each needs a holding institution, a date, rights verification and Product Owner approval.

## 6. Unresolved issues

These are flagged in the manuscript for expert review:

1. The orthography of the three 《有時》 passages (時すでに有なり / 時すでにこれ有なり). No critical edition was consulted.
2. The attribution of 修证一等 to 《辨道话》, and the biographical source of Dōgen's early doubt.
3. Meiji neologisms (e.g. 哲学 attributed to Nishi Amane).
4. The five-step reconstruction of Kūkai's 法身说法.
5. The evaluation of the Kyoto School's wartime statements, which rests mostly on one sympathetic SEP entry.
6. Whether the three-readings scheme for 有時 omits important positions.

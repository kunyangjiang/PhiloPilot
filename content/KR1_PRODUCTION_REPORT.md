# KR1 制作报告（V28）

*Supporting report for `content/KR1_SAMPLE_DRAFT.md` (《韩国哲学：佛教、理学论争与现代》 / Korean Philosophy: Buddhism, Neo-Confucian Debates and Modernity). Written in V28 with JP1 and LA1 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (KR1) and the V28 brief.

- **Tier:** Core-elective ◐.
- **Sections:** six, plus 导读 and 结语:
  - 一 佛教的综合：元晓与义湘
  - 二 知讷：顿悟与渐修
  - 三 朝鲜的性理学：理、气、性、情
  - 四 四端七情之辩
  - 五 实学：改革的提议与它们的命运
  - 六 东学与现代：谁的"韩国哲学"？
- **Method focus (site):** 跟随一场精细的技术性论争（四端七情），比较各方立场.
- **Links:** the 宋明理学至清代 course is shown as recommended background. No "leads to" link is given; this follows the curriculum.

| Element | Count / where |
|---|---|
| Tables | 6, including the five-position comparison table in 四 (郑之云 / 退溪 1559 / 退溪 第二书 / 高峰 / 栗谷) |
| Original passages | 17 classical-Chinese (汉文) passages from 中文维基文库 transcriptions, each with the chapter's own translation, rendered `lang="zh-Hant"` |
| Exercises | 6 想一想 blocks with 提示 |
| Notes | 54, all resolving, numbered 1–54 |

**Brief rules honoured.**

- **Not derivative:** the debate is taught as a Korean development of Zhu Xi's framework, with positions that changed in the course of the letters.
- **Labels questioned:** the 主理派 / 主气派 labels are explicitly called too simple.
- **"实学" treated with care:** it is presented as a twentieth-century classification, not a self-named school, and proposals are distinguished from implementation.
- **Uncertain speakers marked:** in the third letter, where the transcription does not mark who is speaking, the chapter labels its attributions as inferences.

## 2. Sources actually consulted

Listed in the manuscript's 来源与权利说明:

- SEP: Halla Kim, "Korean Philosophy"; Jee, "Korean Buddhism"; Cawley, "Korean Confucianism".
- 中文维基文库 transcriptions of 元晓, 义湘, 知讷, 《退溪先生文集》 卷十六–十七 and 《栗谷先生全书》 卷十.
- The ITKC punctuated editions were not consulted. The manuscript states this as its main limitation.

## 3. Practice

`practice-kr1.ts`:

- 18 questions in 6 sets (11 single, 4 multi, 2 true/false, 1 view).
- Ledes are identical to the exercise prompts (script-checked).
- Ids are unique.

## 4. Component

`ui/media/kr1/FourSevenVoices.tsx` (`four-seven-voices`) is placed in 四, after the comparison table.

- **Step 1:** attribute six sentences the chapter quotes to their speaker. One of them is Toegye's marginal note 雖發於氣，而理乘之為主.
- **Step 2:** answer the table's key row, 理能否发, for each of the five positions.
- **Step 3:** a view, with no right answer, on the chapter's three evaluation angles.

Two things are deliberately left out:
- The sentence whose attribution the chapter only infers (以氣順理而發…).
- Any verdict on who won.

**Rationale:** the method is to follow a technical debate and compare positions, and the component makes the reader do that with the actual sentences.

## 5. Image candidates (approval notes only)

None verified and none downloaded. Possible candidates for a later cycle, all unverified:

- Ŭisang's 法界图印;
- a woodblock edition of Toegye's 《圣学十图》.

Each needs a holding institution, a date, rights verification and Product Owner approval.

## 6. Unresolved issues

These are flagged in the manuscript for expert review:

1. The division between Gobong's letter and Toegye's marginal notes in the third letter.
2. The revised versus original text of the second letter.
3. Jeong Ji-un's 《天命图》 and the date of Toegye's revision.
4. The dates of Yulgok's letters to 成浑.
5. Jinul's relation to Zongmi.
6. The historiography of 实学, and Dasan's relation to Catholicism.
7. Tonghak, which rests on general introductions only.

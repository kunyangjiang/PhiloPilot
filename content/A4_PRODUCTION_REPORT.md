# A4 制作报告（V30）

*Supporting report for `content/A4_SAMPLE_DRAFT.md` (《诠释、翻译与哲学写作》 / Interpretation, Translation and Philosophical Writing). Written in V30 with S1 and S2 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (A4) and the V30 brief.

- **Tier:** Extended ○. Position 4 in 哲学方法.
- **Sections:** six, plus 导读 and 结语:
  - 一 文本、作者、读者
  - 二 语境与时代错置
  - 三 注释作为哲学
  - 四 翻译做了什么
  - 五 把论证写出来
  - 六 批评与修改
- **Method focus (site):** 比较同一段文字的几种译法和注释读法，并把一种理解写成结构完整的论证.
- **Links:** A1 shown as recommended background (not required); leads to D1 and D11 (shown as not built). No prerequisite locks.

**Core question (verbatim):** 怎样才能负责任地理解一个跨越语言、文化和时代的哲学文本，又怎样把一种理解写成一个站得住的论证？

| Section | Main material |
|---|---|
| 一 | "你做得真好" (the chapter's example); Schleiermacher and Gadamer (SEP "Hermeneutics"); Hirsch, Wimsatt & Beardsley, Fish (secondary summaries only); 《老子》 ch. 1 read by 河上公 and 王弼; a table of three positions; the rule "state the three kinds of claim separately" |
| 二 | four kinds of context; Skinner 1969 (secondary summaries only); anachronism checked on four claims from other courses (墨家 as consequentialists, 正理派 as reliabilists, 朱熹's 理 as a Platonic form, 庄子 as a sceptic); historical attribution vs reconstruction vs contemporary use; the danger of over-contextualising |
| 三 | documented commentary relations: 河上公 and 王弼 on 《老子》 ch. 1 (with 断句); 伐差耶那's two readings of NS 1.1.5; 月称 and 清辨; 拉齐 and 图西 on the *Ishārāt*; Porphyry and Boethius; a table of four things commentators do; documented relation vs teaching comparison |
| 四 | 道安's 五失本三不易 (pointer to CN5); five questions per term for 道 (帛书 甲本, three readings incl. Hansen), dharma (MS 1.1.2, four renderings) and logos (B1, the 和合本 John 1:1, *Politics* 1253a); a comparison table; five principles for translating and quoting |
| 五 | three kinds of work (interpretation, reconstruction, evaluation); seven parts of an essay; a complete worked essay ("MS 1.1.2's dharma should not be rendered 法律") and a step-by-step review of it |
| 六 | four objects of criticism; charity, humility and attribution; a flawed paragraph on 濠梁 (misattributed quotation, overgeneralisation, anachronism, vagueness) revised twice; five steps for answering criticism |

| Element | Count |
|---|---|
| Tables | 10 |
| Original passages | 8: 《老子》 ch. 1 王弼本, 帛书甲本, 河上公章句, 王弼注 (`zh-Hant`); 惠子's line from 秋水 (`zh-Hant`); MS 1.1.2 (`sa`); Heraclitus B1 (`grc`); John 1:1 和合本 (`zh-Hant`) |
| Exercises | 6 想一想 blocks with 提示 |
| Notes | 28, all resolving |

Every quoted passage except John 1:1 is one the site has already checked in another course (CN3, IN5, GR1). John 1:1 was checked on zh.wikisource (《聖經 (和合本)》); the 和合本 (1919) is in the public domain. The *Politics* line is paraphrased, not quoted.

## 2. Brief rules and where they are applied

| Rule | Where |
|---|---|
| Not a repeat of A1, A2 or A3 | 导读 states that reconstruction (A1), validity (A2) and counterexamples (A3) are assumed; A4 adds interpretation before reconstruction, and writing |
| Translation section substantial, five questions per term | 四: each of 道, dharma, logos goes through context, range of meaning, renderings, how the argument changes, gains and losses; then a table |
| A complete worked example | 五: the full seven-part essay, followed by a review of each part |
| A flawed paragraph revised | 六: initial draft, first revision, second revision, each with what changed and what remained |
| Documented history kept apart from teaching comparison | 三 ends with a section on the difference; 二 gives three kinds of claim with the support each needs |
| No invented debates | every commentary relation in 三 is documented in the course it comes from; their juxtaposition is labelled as the chapter's arrangement |

## 3. Sources actually consulted

SEP entries: George (Hermeneutics, rev. 2025); Hansen (Daoism); Graham (Heraclitus); Klima (The Medieval Problem of Universals); Phillips & Vaidya (Epistemology in Classical Indian Philosophy); Thompson (Zhu Xi). Primary texts: the transcriptions already used in CN3 (《老子》, 《庄子》), GR1 (B1) and IN5 (MS 1.1.2); zh.wikisource for John 1:1. The site's own CN2, CN3, CN5, GR3, IA4, IN3, IN4, IN5 and EA1 for the cross-references (each checked against the section it names).

Secondary only (stated in the manuscript): Skinner 1969 (*History and Theory* 8); Hirsch 1967; Wimsatt & Beardsley 1946 (*Sewanee Review* 54); Fish 1980. A PDF of Skinner's article could not be read, so the chapter relies on summaries and says so.

Corrections made during checking: a stray line about SEP metaphysics entries was removed; the 濠梁 cross-reference was corrected to CN3 第三部分; the 恆/常 sentence was rewritten so as not to claim a difference of meaning the sources do not support; a pointer to EA1 was added in 三 (EA1 already covers Boethius and the universals debate); "Boethius" is now 波埃修 throughout, matching EA1.

## 4. Practice

`practice-a4.ts`: 18 questions in 6 sets (11 single, 3 multi, 3 true/false, 1 view, a4-1-3). Every question has feedback on every option. Set labels match the manuscript's 想一想 labels; ids are unique; no set has more than three questions.

## 5. Component

`ui/media/a4/TranslationLens.tsx` (`translation-lens`) is placed in 四, after the table setting 道, dharma and logos side by side.

- **Step 1:** pick a term (道 / dharma / logos); the checked passage is shown.
- **Step 2:** the reader says which rendering reads most naturally to them (no right answer).
- **Step 3:** switch through each rendering: the translated sentence, what it then claims, what an argument would have to support, what it gains and what it hides. If the reader looks at a rendering other than their own, the component asks where their sense of "natural" comes from.
- Not scored. Every rendering, claim, gain and loss restates section 四. The logos-as-道 rendering of B1 is labelled as the component's own illustration of the 和合本 practice.

**Justification:** the section's thesis is that a rendering decides which argument a sentence makes. Putting one passage under several renderings side by side makes that visible in a way a static table only lists.

## 6. Images

None used, none downloaded. The manuscript names one candidate for later: a plate of 马王堆帛书《老子》甲本 ch. 1. Its source and rights have not been checked, so no approval sheet was produced in this cycle; it needs Product Owner approval before anything is downloaded.

## 7. Unresolved issues (also listed in the manuscript)

1. The three hermeneutic positions in 一 and their table are the chapter's summary; Hirsch, Wimsatt & Beardsley and Fish rest on secondary summaries.
2. Skinner rests on secondary summaries; the four anachronism examples are the chapter's choice, and "庄子 as a sceptic" is a contested judgement.
3. The 拉齐/图西 commentary relation depends on IA4, which itself flags thin evidence.
4. Reading 甲 of "道可道" is not attributed to a named scholar; it stands for a common understanding. The gains and losses of English renderings and of the 和合本 are the chapter's commentary.
5. The worked essay in 五 has not been read by a Mīmāṃsā specialist; the essay's own "局限" says so.
6. The two readings of "我知之濠上也" in 六 are a summary of common views; specific commentators were not checked.

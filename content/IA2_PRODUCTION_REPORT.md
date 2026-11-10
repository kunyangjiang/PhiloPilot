# IA2 制作报告（V21）

*Supporting report for `content/IA2_SAMPLE_DRAFT.md` (《法拉比与阿维森纳：存在与灵魂的系统哲学》 / Al-Fārābī and Avicenna: The Systematic Philosophy of Being and Soul). Written in V21 with IN8 and IA1 and integrated in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** Title, tier (Core ●), six sections, method focus ("reconstructing a metaphysical proof and a thought experiment (flying man)") and outcomes follow `planning/CURRICULUM_REFERENCE_DRAFT.md` §B4. The registry's short display name is 法拉比与阿维森纳; the full official title is used on the course page and in the catalogue.

| Part | Core problem | Original passages |
|---|---|---|
| 导读 | Avicenna read the *Metaphysics* forty times; core question: how are essence, existence and necessary being related, and what is the soul? | — |
| 一 巴格达的逻辑学 | The Baghdad school; al-Fārābī's answer to al-Sīrāfī; logic as the road to happiness; second intelligibles | Paraphrase |
| 二 法拉比的宇宙与城邦 | Emanation from the First; the virtuous city; philosopher and prophet; non-virtuous cities; an interpretive dispute | Paraphrase |
| 三 阿维森纳论存在 | Subject of metaphysics; essence and existence; necessary and possible; is existence an "accident" of essence? | Paraphrase |
| 四 必然存在者的证明 | Two passages from *Ishārāt* IV; ten-step reconstruction; what the proof does **not** depend on; three-proofs table; what it does not yet prove | *Ishārāt*, Forget p. 142 (two passages) |
| 五 飞人与灵魂 | The flying man; what each detail of the setup excludes; three levels of conclusion; Descartes comparison; the morning-star objection; not an empirical experiment | *Ishārāt*, Forget pp. 119, 120 |
| 六 知识与理智 | Internal senses; stages of intellect; abstraction or emanation; intuition and prophecy; Bahmanyār; preview of Ghazālī | Paraphrase |
| 结语 / 后世批判与回应 | Five items (§5) | — |

- **Size:** 25,010 characters (excluding CR); the site counts about 1.6 万字 over 9 reader parts: the six official sections of `planning/CURRICULUM_REFERENCE_DRAFT.md` plus 本章导读, 结语 and 后世批判与回应 (Critiques & Responses). The two appendices (注释, 来源与权利说明) are not counted. Only the six sections are the official curriculum; the other three are the house frame every course has (as in IN7: 5 + 3 = 8). 40 notes, 4 primary blocks, 10 tables, 6 想一想 blocks.

## 2. Arguments

- **Proof of the Necessary Existent:** ten steps, from "something exists" and the necessary/possible division to the claim that every chain, "finite or infinite", ends in what is necessary in itself. Highlights that the proof needs neither a beginning of the world nor a denial of infinite regress, unlike al-Kindī and kalām (IA1) and Aristotle's prime mover.
- **Attributes derived afterwards:** uniqueness, simplicity, essence = existence; each needs its own argument.
- **Flying man:** the setup removes memory, sight and touch of the body, and touch of the outside world; three levels of conclusion are separated; Avicenna himself calls it a *tanbīh* ("reminder"), not a demonstration.
- **Al-Fārābī:** emanation; the virtuous city; religion as an imitation (*muḥākāt*) of philosophy.

## 3. Verified primary sources

Four Arabic passages from Avicenna, *al-Ishārāt wa-l-tanbīhāt*, ed. J. Forget (Leiden: Brill, 1892), archive.org scan `kitbalishrtwaalt00avic`. The OCR layer was unusable, so pp. 119, 120 and 142 were read from the page images on 2026-11-09 and transcribed by eye. Two manuscripts read مترتّبة at p. 142 (note 23). In V21 the appendix wording was corrected from "three passages" to "four passages (pp. 119 and 120 one each, p. 142 two)", and the subheading "这个证明**不**依赖什么？" lost its bold markup (it leaked into the resume label). Al-Fārābī, the *Shifāʾ*, the *Najāt*, the autobiography and Bahmanyār are paraphrased with their SEP sources.

## 4. Translation and terminology

Translations from Arabic are the chapter's own. Key terms: *al-Ishārāt wa-l-tanbīhāt* 《指要与诠解》 (*tanbīh* rendered 提醒 when discussing the flying man); māhiyya 本质; wujūd 存在; wājib al-wujūd bi-dhātihi 本身必然的存在者; mumkin 本身可能的; jumla 整体; silsila 系列; ṭaraf 一端; anniyya "是" (note 29); al-ʿaql al-faʿʿāl 主动理智; fayḍ 流溢; al-madīna al-fāḍila 美德城邦; ḥads 直觉; wahm 估计力.

## 5. Critiques and responses

1. Does al-Fārābī's "religion imitates philosophy" demean revelation?
2. Is Avicenna's proof valid?
3. Does the essence–existence distinction hold?
4. Can the flying man show that "I" am not the body?
5. Is the Necessary Existent the God of religion?

## 6. Practice

`src/content/practice-ia2.ts`: 6 sets × 3 = **18 questions** (10 single, 2 multi, 3 tf, 3 view). Single keys a 3 / b 2 / c 2 / d 3. View questions ia2-2-3, 4-3, 5-3 ungraded. Storage: `philopilot.v2.ia2.exercise.*`.

## 7. Components

| Id | File | Anchor | Objective | Actions |
|---|---|---|---|---|
| `necessary-existent` | `ui/media/ia2/NecessaryExistent.tsx` | 四, after "表格是本章的整理。现代宗教哲学中的" | Outcome: reconstruct the proof | The p. 142 passage; step through the ten steps; switch the chain between finite and infinite and see that no step fails; three objections, each pinned by the learner to the step it attacks, with a reply; list of what the proof does not yet give |
| `flying-man` | `ui/media/ia2/FlyingMan.tsx` | 五, after "所以，不要把飞人读成" | Outcome: assess the flying man | Add the six conditions one by one and watch the channels of bodily awareness disappear; the p. 120 conclusion appears when the setup is complete; choose a level of conclusion (feedback per level); the morning-star objection and reply (ungraded) |

Native inputs, no animation, Arabic `lang="ar" dir="rtl"`, no horizontal overflow at 375 px (checked).

## 8. Images

Candidates in `V21_IA2_IMAGE_APPROVAL_SHEET.md`; both approved and embedded on 2026-11-09. After the final review (§12), one remains: Forget's 1892 edition, p. 142 (四), the page the two quoted passages were transcribed from. The Avicenna cardiac-drugs manuscript page was removed. Records: `prototype/navigation-v2/public/media/ia2/SOURCES.md`.

## 9. Rights and uncertainties

Forget 1892 is in the public domain; Avicenna's text is public domain. SEP entries are paraphrased. Open items: the rendering of *anniyya* (note 29); the location and wording of "reminder" in the *Shifāʾ* (note 32); al-Fārābī's intellects and spheres (notes 7, 13); abstraction vs emanation; autobiography details (note 1); the p. 142 manuscript variant (note 23); whether existence is an accident of essence (note 21); authorship of some SEP entries.

## 10. Cross-course boundaries

- **Backward:** IA1 (al-Kindī and kalām on a beginning of the world; al-Kindī's four intellects) and GR3 (Aristotle's prime mover, *De anima*) are referred to, not retaught.
- **Forward:** IA3 (Ghazālī's critique of the derived attributes, God's knowledge of particulars) and EA1/EA2 (Descartes's *cogito*, compared only in a table) are previewed, not taught.

## 11. Integration readiness

Integrated in V21: registry `IA2` (tradition `ia`, position 2, `origLang` ar). IA3 appears as the next course (not built, shown as 原型未实现, no lock) and EA1 as a 后续 link. Typecheck and build pass.

## 12. Final targeted review (2026-11-09)

- **Curriculum count.** Six official sections, unchanged. "9 parts" is the reader's count; §1 now says so.
- **Depth.** Reviewed against the six required topics (al-Fārābī's system; essence and existence; necessary and contingent; the proof of the Necessary Existent; the flying man and the serious objections to it; knowledge and intellect). Each is argued step by step with its objections; no expansion was made.
- **Images.** The *al-Adwiya al-qalbiyya* page removed: it is a medical treatise, undated and unlocalised, and the chapter does not teach Avicenna's medicine. Rights were sound (CC BY 4.0); the reason is relevance only. Not replaced.

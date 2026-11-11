# AF3 制作报告（V27）

*Supporting report for `content/AF3_SAMPLE_DRAFT.md` (《非洲裔与黑色大西洋哲学》 / Africana and Black Atlantic Philosophy). Written in V27 with AF1 and AF2 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (AF3) and the V27 brief.

- **Tier:** Core-elective ◐.
- **Sections:** six, as in the curriculum:
  - 一 Slavery and freedom: Douglass — the 1846 definition of slavery as ownership; the argument from the master's ban on literacy; the Covey fight and "slave in form / slave in fact"; Boxill's reading; the 1845 vs 1855 retellings; limits (providentialism, the Constitution, the 1869 answer on Black women).
  - 二 Du Bois — *The Conservation of Races* (1897) on race; Appiah's three criticisms and four responses; the 1897 "Am I an American or am I a Negro?" passage; the neglected parallel in *Souls* ch. X; five interpretations of double consciousness; a five-point explanation of double consciousness. EA7's passages (Forethought, ch. 1 p. 3, ch. 5, "second-sight") are not repeated.
  - 三 Cooper and Black feminism — the "mute and voiceless note"; the "when and where I enter" argument reconstructed; "a woman question and a race problem" (not "double oppression"); the reply to Anna Shaw; the elitism / True Womanhood dispute (with May's counter-reading); "proto-intersectional".
  - 四 Fanon on lived experience — starts from EA9's cross-reference; the chapter title and its translations; the body as "image in the third person" compared with Merleau-Ponty in a table; two documented criticisms of Sartre; Négritude; the zone of non-being; the closing invocation; limits (creole, gender, scope).
  - 五 Black existentialism — Gordon's distinction between Existentialism and existential philosophy; bad faith and antiblack racism; Gordon vs Zack on the same tool; social construction does not mean unreal (a five-step argument and a table of constructivisms).
  - 六 Intersectionality — the term (Crenshaw 1989/1991) separated from the idea; a genealogy (Truth with a text-version caveat, Cooper, Combahee, Davis, hooks, Lorde, Collins); the single-axis argument; "not additive" table; criticisms (Collins' macro level, Nash, Scott on experience).
- **Method focus:** treating lived-experience claims as philosophical arguments (site: 把关于生活经验的陈述当作哲学论证来读).
- **Outcome:** explain double consciousness — met by the five-point explanation in 二, practice set 二 and the closing table.
- **Links:** EA9 helpful (EA9's page now lists AF3); → D6.

**Core question (verbatim):** 被奴役、被种族化、被同时排斥在两种解放运动之外的生活经验，能够支持什么样的哲学论证？我们又该怎样检验这些论证，而不把经验当作不可质疑的权威，也不把它贬低为单纯的材料？

| Element | Where |
|---|---|
| Method tool | a five-question table in 导读 (谁的经验 / 报告了什么 / 揭示了什么结构 / 支持什么一般主张 / 能支持多远), applied in every section and in the component |
| Not an appendix to European existentialism | stated in 导读; argued through Gordon's distinction (五); Fanon presented as testing Sartre and Merleau-Ponty, not applying them (四) |
| Brief rules honoured | Du Bois not repeated from EA7; Fanon here on lived experience only (anticolonial politics in AF2); social construction vs real consequences (五); Crenshaw credited for the term, Davis, Lorde and hooks included (六) |
| Tags | ［有文献的直接批评］／［本章的重建］／［学派层面的整理］ |
| Tables | 8 |
| Original passages | 13 English passages from four public-domain texts, each with version, page and the chapter's own translation (Douglass ×4, Du Bois ×4, Cooper ×5) |
| Exercises | six 想一想 blocks with 提示 |
| Notes | 73, all resolving |

## 2. Important arguments

Douglass's "guilty knowledge" argument (the laws against slave education presuppose the humanity they deny); "slave in form / in fact"; Appiah against *Conservation* and the replies; double consciousness as imposed, socially produced, politically consequential and epistemically double-edged; Cooper's measure of a race by its least represented members; "unacknowledged factor in both" vs "double oppression"; Fanon's third-person body image as revealing a presupposition of Merleau-Ponty's account; Gordon's bad-faith analysis (Blackness treated as a problem to avoid Black problems); social construction with real consequences; Crenshaw's single-axis critique.

## 3. Sources actually consulted

**Original texts (public domain, page-checked):** Douglass, *Narrative* (Boston 1845; DocSouth); Cooper, *A Voice from the South* (Xenia 1892; DocSouth); Du Bois, *The Conservation of Races* (1897; Project Gutenberg #31254); Du Bois, *The Souls of Black Folk* (Chicago, 2nd ed. 1903; DocSouth).

**Encyclopedia entries (read November 2026):** SEP: Frederick Douglass (Sundstrom), W.E.B. Du Bois (Gooding-Williams), Double Consciousness (Pittman), Anna Julia Cooper (Belle), Frantz Fanon (Drabinski), Race (James & Burgos), Critical Philosophy of Race (Alcoff), Feminist Perspectives on Power (Allen), Continental Feminism, Identity Politics (Heyes), Contemporary Africana Philosophy (Taylor); IEP: Feminism and Race in the United States.

Section numbers in the notes were checked against the downloaded entries. Every twentieth-century work is paraphrased only; quotations those entries contain are given in Chinese with the entry's page reference.

## 4. Terminology

In the manuscript's 翻译说明 (非洲裔哲学, 黑色大西洋, 双重意识, 二重性, 生活经验, 身体图式, 非存在的地带, 自欺, 取消主义, 社会建构, 交叉性, 单轴框架, 互相关联的压迫体系, 真正的女性气质).

## 5. Critiques and responses

后世批判与回应: five items — whether experience arguments only persuade those who share the experience; eliminating the concept of race (Appiah, Zack) vs constructivists; Reed on double consciousness; the male-centred limits of Fanon's analysis; whether intersectional categories subdivide without end (Collins' macro/micro answer).

## 6. Practice

`practice-af3.ts`: 18 questions (7 single, 4 multi, 4 true/false, 3 view), full feedback, ledes identical to the exercise prompts.

## 7. Component

`ui/media/af3/ExperienceArgument.tsx` (`experience-argument`), placed in 三 after the reading of Cooper p. 134. Two of the chapter's own checked passages (Douglass p. 33, Cooper p. 134) are shown in English with the chapter's translation; for each, the reader assigns five shuffled statements to the five method questions; the Cooper step opens after Douglass is done; a final view question asks which question to put first. Justification: the course's method is reading experience as argument, and the component practises the five questions on real passages. Native buttons, `aria-pressed`, `aria-live`, saved state, reset, a 不是什么 panel; checked at 375px.

## 8. Image candidates

None verified and none downloaded. Likely public-domain candidates for a later cycle (not yet verified): nineteenth-century portrait photographs of Douglass, Cooper and Du Bois; the title pages of the 1845 *Narrative* and the 1892 *Voice from the South* (DocSouth hosts page images). Each needs source and rights verification and Product Owner approval.

## 9. Unresolved issues

Points the manuscript itself flags for expert review: the 1967 English title of Fanon ch. 5; "historico-racial schema" and "racial epidermal schema"; feminist criticism of Fanon (no specific citation found in the SEP entry); the two versions of Truth's 1851 speech; the reading of Lorde's "no hierarchy of oppressions"; the details of the employment case in Crenshaw 1989; the original record of Douglass's 1869 exchange.

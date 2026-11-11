# AF1 制作报告（V27）

*Supporting report for `content/AF1_SAMPLE_DRAFT.md` (《非洲哲学思想：来源、争论与方法》 / African Philosophical Thought: Sources, Debates and Methods). Written in V27 with AF2 and AF3 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (AF1) and the V27 brief.

- **Tier:** Core ●.
- **Sections:** six, as in the curriculum: 一 the question of the canon (ethnophilosophy: Tempels, Kagame, Mbiti; Hountondji's critique; Wiredu's category-mistake point; the critics of the critics); 二 oral sources (proverbs, Vansina's source criticism of oral tradition, Griaule's ethnography and its re-examination); 三 sage philosophy (Oruka's project, folk vs philosophic sages, the authorship problem); 四 person and community (Akan *okra*/*sunsum*, Yoruba and Igbo notions; Menkiti vs Gyekye on the communal self); 五 ethics and Ubuntu (uses of the concept and its objections); 六 written traditions (Maʿat handled as a set of separate questions; the *Ḥatäta* authorship dispute taught as a dispute).
- **Method focus:** source criticism — weighing oral, written and contested sources (site: 来源批判：衡量口头的、书面的和有争议的来源).
- **Outcome:** explain the ethnophilosophy debate.
- **Links:** none required; → AF2, S4, D2.

**Core question (verbatim):** 当一种思想没有留下署名的书面论证，或者它的文本、作者和年代本身有争议时，我们凭什么把它当作哲学来读，又怎样衡量证据？

| Element | Where |
|---|---|
| Reading orientation | 本章导读, with a five-kind table of material (written argument / oral tradition / ethnographic record / modern reconstruction / contested attribution) kept apart throughout |
| Brief rules honoured | Not one homogeneous tradition (导读, 一, 结语); defenders and critics of ethnophilosophy both given (一); no invented continuity between thinkers (each link tagged); Maʿat split into separate questions (六); the *Ḥatäta* dispute taught, not settled, and the "African Descartes" label explicitly rejected with three reasons (六) |
| Tags | ［有文献的直接批评］／［本章的重建］／［学派层面的整理］ used throughout |
| Tables | 12 |
| Exercises | six 想一想 blocks, one per section, each with a 提示 |
| Notes | 93, numbered by first appearance, all resolving |

## 2. Important arguments

Hountondji's critique of ethnophilosophy as anonymous and unanimist; Wiredu's point that the usual comparison sets African folk belief against Western professional philosophy; the defence that ethnophilosophy's critics overstate their case; Vansina's rules for oral evidence; the limits of what a proverb directly shows; Oruka's sage project and the question whose philosophy a recorded conversation is; Menkiti's processual personhood against Gyekye's moderate communitarianism; Metz's Ubuntu principle and Ramose's objection to it; the evidence table for the *Ḥatäta* (transmission, testimony, textual parallels, genre, language, copyist errors, scholars' motives) with each row's limit.

## 3. Sources actually consulted

SEP and IEP entries listed in the manuscript's 来源与权利说明 (downloaded and read in November 2026), plus the open-access (CC BY 4.0) volume *Searching for Zär'a Yaʿǝqob* (De Gruyter, 2024): introduction, chapter 1 abstract and chapter 2 read in full. Copyrighted twentieth-century works are only paraphrased via those entries. No Egyptian text and no edition or translation of the *Ḥatäta* was read; the chapter says so.

## 4. Terminology

Listed in the manuscript's 翻译说明 (民族哲学, 全体一致论, 圣人哲学, 口头传统, 人格, 温和的共同体主义, 内生知识, 孤本, 《探究》 for *Ḥatäta*).

## 5. Critiques and responses

后世批判与回应 gives five groups, each with the historical criticism and a possible response: whether the critique of ethnophilosophy imposes Western standards; whose philosophy sage philosophy is; whether processual personhood can justify inequality (Gyekye against Menkiti); whether Ubuntu can be a universal ethical theory (Matolino and Kwindingwi, Ramose, Metz); how much authorship matters for philosophical reading (Wion; the question Egid raises in 六).

## 6. Practice

`prototype/navigation-v2/src/content/practice-af1.ts`: 6 sets × 3 = 18 questions (6 single, 4 multi, 4 true/false, 4 view). Every option has feedback; every view question has an explanation and marks no position right. Each set's lede copies its exercise prompt exactly (checked by script).

## 7. Component

`ui/media/af1/SourceWeigh.tsx` (`source-weigh`), placed in 六 after the table 各类证据能证明什么. Step 1: sort six items from the chapter into the five kinds of material. Step 2: for six pieces of *Ḥatäta* evidence, say which authorship position each supports and read its limit. Step 3: a view question (which new evidence would most change the picture). Justification: the course's method is source criticism, and the component practises exactly the five-way distinction and the evidence table. Native buttons with `aria-pressed`, `aria-live` feedback, saved per course, reset button, a 不是什么 panel.

## 8. Image candidates

None verified and none downloaded. Possible candidates for a later cycle (not checked for rights): a public-domain photograph of a Ge'ez manuscript page held by a national library; a public-domain photograph of an Akan *adinkra* cloth. Each would need source verification and Product Owner approval first.

## 9. Unresolved issues

- Expert review needed for: the Kagame and Mbiti summaries; the Igbo and Yoruba personhood summaries; the Maʿat section (no Egyptological source read directly); all statements about the *Ḥatäta* scholarship after 2024.
- The manuscript's own list of unchecked points is in its 来源与权利说明.

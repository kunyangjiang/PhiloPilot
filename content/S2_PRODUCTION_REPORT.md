# S2 制作报告（V30）

*Supporting report for `content/S2_SAMPLE_DRAFT.md` (《形而上学：存在、实体、共相与模态》 / Metaphysics: Being, Substance, Universals and Modality). Written in V30 with A4 and S1 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (S2) and the V30 brief.

- **Tier:** Core ●. Second systematic course (domain C, 哲学问题).
- **Sections:** five, plus 导读 and 结语:
  - 一 有什么
  - 二 实体与属性
  - 三 共相
  - 四 本质与存在
  - 五 模态与可能世界
- **Method focus (site):** 用测试案例比较关于共相的对立理论.
- **Links:** A3 shown as recommended background (not required). The curriculum names no course that follows S2, and the course page says so. The 结语 mentions S3 (《因果、规律与时间》) as the course that takes up causation, laws and time; S3 was not begun.

**Core question (verbatim):** 世界上有什么？个别的事物、它们共有的性质、它们的本质和存在、它们"可能"和"必然"的样子，各自是什么，彼此又是什么关系？

| Section | Main material |
|---|---|
| 一 | list question vs method question; "Plato's beard" reconstructed; Quine's paraphrase and criterion; truthmaker and Fine's "Real" as alternatives; Vaiśeṣika VS 1.1.4 and the padārtha list; a six-question comparison |
| 二 | *Categories* 1a20–25 and 2a11–14; five roles of substance (SEP); substratum (Locke, Armstrong's thin particular) and bundle theory (identity of indiscernibles, change); universals vs tropes; Vaiśeṣika dravya/guṇa/karma and samavāya; a six-question comparison (Aristotle / Vaiśeṣika); the Buddhist momentariness critique as an incomplete comparison with bundle theory |
| 三 | Porphyry's three questions and Boethius (pointer to EA1); immanent and transcendent realism; six kinds of nominalism; the resemblance regress; VS 1.2.7; the Buddhist critique (efficacy, apoha, the fever-plant example) via IN3; 朱熹's 理 and 气 (two passages from 《朱子语类》 卷一), Feng Youlan's Platonic reading and SEP's rejection of it; a six-question comparison (理 / universals); a summary table and the component |
| 四 | modal vs definitional essence; Quine's mathematician-cyclist; Fine's Socrates / singleton; Avicenna's essence–existence distinction, "equinitas…tantum" and necessary/possible (pointer to IA2); Suhrawardī and Mullā Ṣadrā (aṣālat al-wujūd, tashkīk, substantial motion; pointer to IA4); a six-question comparison showing the false friend Ṣadrā / Sartre |
| 五 | what is not repeated from EA10 stated first; semantics vs metaphysics; five answers to what makes "this table could have been in another room" true (concrete worlds, ersatz worlds, Armstrong's combinatorialism, essence-based modality, primitivism) with a table; a six-question comparison (Avicenna / Fine) |

| Element | Count |
|---|---|
| Tables | 13 |
| Original passages | 6: *Categories* 1a20–25, 2a11–14 (`grc`); VS 1.1.4, 1.2.7 (`sa`); 《朱子语类》 卷一, two passages (`zh-Hant`) |
| Exercises | 5 想一想 blocks with 提示 |
| Notes | 16, all resolving |
| Six-question comparisons | 5 |

All six quoted passages are ones the site has already checked (GR3, IN3, CN6), with those courses' translations. Avicenna, Ṣadrā, Quine, Lewis, Armstrong and Fine are paraphrased; Locke's "a supposed, I know not what" and the Latin "equinitas…tantum" are a few words quoted from SEP and labelled as such.

## 2. Brief rules and where they are applied

| Rule | Where |
|---|---|
| Do not rewrite GR3, IA2, IN3, EA10 | 导读 names each course and section; 二 quotes the two *Categories* passages only to pose the systematic question; 四 summarises IA2 and IA4 in a few lines; 五 opens by listing what EA10 already covers and takes a different question (what grounds modal truths) |
| Causation, laws and time reserved for S3 | stated in the status note and 结语; the Avicenna/Fine comparison notes that causal necessity belongs to the next course |
| Cross-tradition standard (six questions) | five comparisons, each answering all six |
| Translation false friends flagged | 二 (实体 for both οὐσία and dravya); 四 (Ṣadrā / Sartre as a worked false friend); 结语 |
| Universals compared against test cases (curriculum method) | 三 summary table and the component |

## 3. Sources actually consulted

SEP entries: Bricker (Ontological Commitment, 2014); Robinson & Weir (Substance, rev. 2024); Cowling & Giberman (Nominalism in Metaphysics, rev. 2025); Klima (Medieval Problem of Universals, rev. 2022); Thompson (Zhu Xi, rev. 2025); Atkins, Correia & Robertson Ishii (Essential vs. Accidental Properties, rev. 2026); Lizzini (Ibn Sina's Metaphysics, rev. 2026); Rizvi (Mulla Sadra, rev. 2019); Menzel (Possible Worlds, rev. 2016). Primary texts: the GR3, IN3 and CN6 transcriptions.

Checks made during writing: cross-references were checked against GR3 二/三, IN3 一/五/六, CN6 三, IA2 三/四, IA4 二/四, EA10 三/四 and EA1 二/四. A pointer to EA1 was added in 三 after search showed EA1 covers Boethius and the universals debate; "Boethius" is now 波埃修 throughout, matching EA1. A stray clause in note 12 was removed, and the author order of the essential-properties entry was corrected.

## 4. Practice

`practice-s2.ts`: 15 questions in 5 sets (9 single, 1 multi, 3 true/false, 2 view: s2-3-3, s2-5-3). Every question has feedback on every option. Set labels match the manuscript; ids are unique; no set has more than three questions.

## 5. Component

`ui/media/s2/UniversalsTest.tsx` (`universals-test`) is placed in 三, after the summary table of accounts and the note under it.

- **Step 1:** pick one of five accounts to test: immanent realism, Nyāya–Vaiśeṣika, Buddhist apoha, resemblance nominalism, trope theory.
- **Step 2:** four test cases from the chapter (two red things; one thing wholly in many places; is resemblance itself shared?; can 牛性 do anything?). For each, the account's answer is shown and the reader says whether it is acceptable, a cost, or unsure.
- **Step 3:** a count of the reader's own judgements, the main cost the chapter records for that account, and, once several accounts have been tried, a side-by-side count. A closing note says every account pays somewhere, and that the choice constrains section 五 (combinatorialism presupposes realism).
- Not scored, and it does not name a winner. Transcendent realism and 朱熹's 理 are left out on purpose; the Limits panel explains why (理 was not proposed to answer the problem of predication). The trope answer on efficacy is the component's own conjecture and is marked as such.

**Justification:** the curriculum's method focus for S2 is exactly "comparing rival theories of universals against test cases". The component makes the reader apply each account to the same cases and register where the cost falls.

## 6. Images

None used, none downloaded, no candidate proposed.

## 7. Unresolved issues (also listed in the manuscript)

1. The Quine / Vaiśeṣika comparison in 一, especially the reading of padārtha.
2. The comparison of Buddhist momentariness with bundle theory in 二 is incomplete and labelled so.
3. The 理 / universals comparison in 三; the resemblance regress is attributed to Russell without checking the original.
4. The Avicenna / Suhrawardī / Ṣadrā table in 四 rests on two SEP entries; the Sartre side of the Ṣadrā comparison rests on the standard account only.
5. The Avicenna / Fine comparison and the phrase "essence-based modality" in 五 are the chapter's extension and need specialist review.
6. SEP author attributions follow the copyright lines read during research.

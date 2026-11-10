# IN6 制作报告（Phase 17A）

*Supporting report for `content/IN6_SAMPLE_DRAFT.md` (《梵、自我与世界：吠檀多派》 / Brahman, Self and World: Vedānta). Written in Phase 17A, in parallel with IN7, as a proposal for Product Owner review. Nothing in this report has been built, integrated, committed or deployed.*

## 1. Course structure and scope

**Authority.** The official curriculum (`planning/CURRICULUM_REFERENCE_DRAFT.md` and the course registry in `units.ts`) was followed for title, scope, tier, structure and relationships. Where it differs from the Phase 17A working outline, the official version was used; the differences are listed at the end of this section.

| Part | Core problem | Key passages read in the original |
|---|---|---|
| 导读 | Rāmānuja's summary of Advaita ("the highest Brahman is itself ignorant…") as the hook: *who* is ignorant? Dates table; five material types; "Vedānta ≠ Advaita ≠ Śaṅkara"; how direct criticism is tagged; what IN1, IN5 and IN4 already covered | Rāmānuja VS §2 |
| 一 奥义书：一个交给解释者的难题 | Why interpreters are needed; BS 1.1.1–2; four passages pulled in different directions (table); Gauḍapāda as pre-Śaṅkara non-dualism | BS 1.1.1, 1.1.2; BĀU 1.4.10, 3.7.22, 2.3.6; ŚvU 4.10 (and 1.10 in note); GK 2.31, 2.32, 3.48 (paraphrase), 4.19 (note) |
| 二 不二论：自我与无明 | Śaṅkara starts from "I"; the list of rival views of the self; *adhyāsa* (definition, rope–snake table, 7-step reconstruction); *adhyāsa* = *avidyā*; knowledge vs action (link to IN5); where ignorance resides (later debate, secondary only) | BSBh 1.1.1 (three passages); adhyāsa preface via Bhāmatī pratīkas (four sentences); Bhāmatī on *naisargika* |
| 三 摩耶与世界 | Advaita is not "nothing exists"; three passages placing the world between real and non-existent; two levels and *anirvacanīya*; the cinema example; *māyā* at four levels (table); Brahman as material cause; *līlā* | BSBh 3.2.22, 2.2.28, 2.1.14; Bhāmatī (*anirvacanīya*); GK 3.19; BS 1.4.23, 2.1.33 |
| 四 限定不二论：罗摩奴阇 | Background; the *tirodhāna* argument (6-step reconstruction), the tu quoque and the reply (contraction and expansion of attributive consciousness); the body–soul model (three relations, table); *sāmānādhikaraṇya*; knowledge and love | VS §§40, 41, 43, 4, 76, 26, 20 (note), 3 |
| 五 二元论吠檀多：摩陀婆 | "Dvaita" is not Cartesian dualism (table); Madhva on BS 1.1.1 (real bondage, grace); dependence ≠ identity; BS 2.1.14 read two ways (table); difference persists in liberation; Madhva vs Rāmānuja (table) | MAnuv 1.1.40–41, 2.1.85, 2.1.88, 2.3.94 |
| 六 吠檀多与它的论敌 | Mīmāṃsā (four prerequisites); Sāṃkhya (BS 1.1.5, 2.2.1, 2.2.7 lame–blind and magnet, 2.1.3); Buddhists, both ways (Śāntarakṣita TS 328–335 paraphrased, with an Advaita reply tagged as reconstruction); Kashmir Śaivism as a neighbouring non-dualism; summary table | BS 1.1.5, 2.2.1, 2.1.3; BSBh 1.1.5, 2.2.7; TS 328–335 (paraphrase only); IPK 1.5.11 |
| 结语 | Return to "who is ignorant?"; what each school pays for its answer | — |
| 后世批判与回应 | Five items: can Advaita explain ignorance? Is the world real? Does dependence entail identity? Where do many persons come from? Knowledge or devotion? | — |
| 注释 / 来源与权利说明 | 79 notes; per-file GRETIL table (13 files); 10 open questions | — |

- **Size** (Python count on the LF version): 39,422 characters, of which 21,290 are CJK. Body (title to 结语) about 23,800; C&R about 2,160; notes about 7,460; sources appendix about 5,530.
- **Composition:** 6 想一想 blocks (labels 一 to 六), 11 tables, 36 primary-text blocks (original + 本章试译), 79 notes.
- **Spec coverage:**
  - **Upaniṣads do not form a unified Advaita:** Part 一 (four-passage table and its conclusion; 想一想（一）).
  - **Brahmasūtra and its commentaries:** BS 1.1.1–2 opens Part 一; the "one sūtra, three commentaries" principle is stated there and applied in Part 五 (BS 2.1.14, Śaṅkara vs Madhva) and Part 六 (BS 1.1.5, 2.2.1–7).
  - **Śaṅkara on *avidyā*, *māyā* and *adhyāsa*:** Parts 二 and 三.
  - **Advaita is not "nothing exists":** Part 三, first section (BSBh 3.2.22 rejects *śūnyavāda*; 2.2.28 defends perceived external objects).
  - **Later Advaita is not Śaṅkara:** reading guide item 第三; the *māyā* table; the locus-of-ignorance section (secondary only, labelled).
  - **Rāmānuja:** Part 四. **Madhva, not Cartesian and not Rāmānuja:** Part 五, with a table for each contrast.
  - **No manufactured consensus:** the 结语 and the C&R make no "harmonising" claim; every comparison table is labelled as the course's own summary.
  - **Links to IN1, IN5, IN7:** reading guide item 第五 and the relevant sections; see §10.
  - **Required critiques:** the five C&R items correspond exactly to the five required critiques.

**Discrepancies between the official curriculum and the working outline (reported, official version followed):**

1. **Title.** The working outline used 吠檀多哲学; the official title in `units.ts` is 《梵、自我与世界：吠檀多派》. The manuscript uses the official title.
2. **Structure.** The official structure has six sections: the Upaniṣadic texts as a problem for interpreters; Advaita: self and ignorance; *māyā* and the world; qualified non-dualism; dualist Vedānta; Vedānta against its rivals. The working outline had a separate Brahmasūtra part and no "rivals" part. The manuscript follows the official six. The Brahmasūtra material is placed in Part 一 and in the commentary readings of Parts 二–六, and the rivals material forms Part 六.
3. **Scope additions in the official text.** Gauḍapāda, later Advaita, and Kashmir Śaivism as a neighbouring non-dualism. All three are included. Kashmir Śaivism is kept to one verse and one comparison, and the manuscript says that it is not Vedānta.
4. **Lineage note.** The official text asks that direct engagement among Vedānta figures be checked. The texts read do not name their opponents. The manuscript therefore says "Rāmānuja criticises Advaita", never "Rāmānuja criticises Śaṅkara" (reading guide item 第四; open question 7).
5. **Prerequisites and links.** IN1 is recommended, IN5 and IN4 helpful; forward links to S4, S5 and S12. The manuscript points back to IN1, IN5 and IN4 (reading guide item 第五). S4, S5 and S12 are not named in the text, because their course texts do not exist yet; this is left for integration.

## 2. Primary arguments

| Part | Argument presented | How it is framed |
|---|---|---|
| 一 | The same four passages favour different schools; the Upaniṣads do not choose | Table [本章的整理]; the conclusion repeats IN1's "text + system" point rather than asserting a reading |
| 二 | Everyone knows "I am", but what "I" is gets misidentified; the misidentification is structural (*adhyāsa*), beginningless, and removable only by knowledge | Śaṅkara via Bhāmatī pratīkas; 7-step reconstruction with step 3 flagged as the contested premise |
| 二 | Liberation by knowledge, not action, because Brahman is *bhūta*, not *bhavya* | BSBh 1.1.1 quoted; the IN5 Mīmāṃsā distinction is reused and its reversal explained |
| 三 | Negation needs a real ground; outer objects are perceived; everyday dealings are valid until the knowledge of identity arises | Three BSBh passages; two levels via SEP; *anirvacanīya* via Vācaspati; the cinema example labelled as the course's own, with its limit stated |
| 四 | Ignorance cannot "conceal" a Brahman whose nature is light without destroying it | VS §40; 6-step reconstruction; the opponent's tu quoque (§41) and Rāmānuja's reply (§43) are both quoted, and the cost of the reply is stated |
| 四 | Body–soul: inseparable support, control and subservience; co-reference without bare identity | VS §76 and §26; three-relation table; the blue-cloth example labelled as the course's own |
| 五 | Brahman cannot be ignorant, so difference and bondage are real; only grace releases | MAnuv 1.1.40–41; the king-and-fetters comparison is paraphrased in a note |
| 五 | Nothing is ever seen to become something else; the individual never becomes Brahman | MAnuv 2.1.85; IEP's account of Madhva's realist epistemology |
| 六 | An unconscious cause cannot produce order; an indifferent *puruṣa* cannot move *prakṛti* | BS 2.2.1; BSBh 2.2.7, [有文献的直接批评]. The fairness question is forwarded to IN7 |
| 六 | One eternal consciousness cannot account for successive cognitions, the difference between bondage and liberation, or the point of practice | TS 328–335, paraphrased; the Advaita reply is tagged [本章的重建] |
| C&R | Five items, each with criticism, response and assessment | Each response carries a source tag |

## 3. Source verification

- **Sanskrit.** 13 GRETIL plaintext files were read on 2026-11-09 and quoted; they are listed per file in the manuscript appendix. Four more were read for background only: KaU, Upadeśasāhasrī, SK and its commentaries, and YS.
  - All quotations (blockquotes, inline, notes) were compared by script (`vq.py`) against the files, ignoring only spaces, punctuation, hyphens, digits and case.
  - Re-run on the final file: 66 checked, 0 real mismatches. The one flag is the IEP article title "Advaita Vedānta", which is not a quotation.
  - Fixed during drafting to match the e-text: *kṣaṇikijñānavādo*, *dehārthavādaś cārvākāṇāṃ*, *bhoktety apare*, *yasya vijñānaṃ śarīraṃ*. "anādir ayaṃ vyavahāraḥ" was dropped because the e-text reads *naisargiko*.
- **Readings recorded, not silently corrected** (all in notes): the GRETIL BĀU duplication at 2.4.14; ŚvU 4.10 *sarvaṃ idaṃ*; BSBh 3.2.22 *ālambyārthaḥ* (possible omission); the Madhva verse *niṣiddhayate* [sic].
- **Structural limitations, stated in the appendix:**
  - **Adhyāsa preface.** The GRETIL BSBh e-text has no *adhyāsabhāṣya*. Its sentences are quoted as Vācaspati's *pratīka*s in the Bhāmatī and cross-checked against the Ratnaprabhā file. The full preface has not been read and should be checked against a printed edition in Phase 17B.
  - **Brahmasūtra numbering.** The bare sūtra file numbers differently from the BSBh file (*tadananyatvam* is 2.1.15 there and 2.1.14 in BSBh). The manuscript uses the BSBh numbering throughout and says so (note 4).
  - **Śrībhāṣya.** The GRETIL file returned 404 in both txt and htm, so Rāmānuja is read only through the Vedārthasaṃgraha. The "seven untenabilities" are named as secondary-only, and the BS 2.1.14 comparison omits Rāmānuja rather than guessing.
  - **Tattvasaṃgraha.** The e-text is word-analytic, so TS 328–335 is paraphrased, never quoted. The verse numbers are the e-text's own.
  - **Ratnaprabhā authorship.** The file header names Govindānanda; the opening colophon reads *rāmānandayatipraṇītā*. Recorded in note 21 and as open question 9.
  - **School identifications in BSBh 1.1.1.** These come from an editor's footnote in the e-text, not from Śaṅkara or the Ratnaprabhā (note 20).
- **Material types kept distinct** (reading guide table): primary text (Upaniṣads, BS); commentary (Śaṅkara, Rāmānuja, Madhva, Vācaspati); opponents' reports (Rāmānuja on Advaita, Śāntarakṣita); modern interpretation (SEP Dalal; IEP Ranganathan, Stoker); course reconstruction (tagged).
- **Dates.** Every date in the figures table is sourced in note 2. Śaṅkara has three dates in parallel (old view 788–820; Nakamura 700–750; Potter late 7th–early 8th century, all via SEP). Rāmānuja has two (traditional 1017–1137; Carman 1077–1157, via IEP). Madhva is given as 1238–1317, the date IEP gives.
- **No modern copyrighted translation** was consulted or reproduced.

## 4. Translation and terminology choices

| Term | Course rendering | Note |
|---|---|---|
| brahman / ātman | 梵 / 自身 | 自身 as in IN1 |
| jīva | 个体灵魂 | |
| avidyā / adhyāsa | 无明 / 附加 | 附加 also glossed 增益、附托 at first use |
| māyā / māyāvādin | 摩耶 / 摩耶论者 | Transliterated; senses separated by level |
| anirvacanīya | 不可决定 | |
| vyāvahārika / pāramārthika | 日常层次 / 究竟层次 | |
| upādhi | 限定条件 | |
| antaryāmin / sāmānādhikaraṇya | 内在的控制者 / 同位关系 | As in IN1 |
| prakāra; śeṣa–śeṣin | 样态；所属者—主有者 | |
| svatantra / paratantra; prasāda | 独立 / 依赖；恩典 | |
| tirodhāna; vimarśa | 遮蔽；反省 | |
| puruṣa (Sāṃkhya) | 神我 | **Changed during Phase 17A** from IN6's earlier "意识主体" so that IN6 and IN7 use one term; IN6 glosses it once as "数论所说的意识主体" |
| prakṛti / pradhāna | 原质 / 根本因 | Shared with IN7 |
| Schools | 不二论 / 限定不二论 / 二元论 / 实在论 (tattvavāda) | |
| Persons | 商羯罗、罗摩奴阇、摩陀婆、跋达罗衍那、乌达拉迦、耶若婆佉、婆者斯钵底、寂护 as in earlier courses; 乔荼波陀、耶牟那、戈文达南达、乌特帕拉提婆 are the course's transliterations | |

**Name clash to flag.** IN1 and IN5 use 摩陀婆 for **Mādhava** (14th century), while IN6 uses 摩陀婆 for **Madhva** (13th century). The IN6 appendix warns the reader. **PO decision needed:** keep the clash, flagged; or render Madhva as 摩陀瓦 / 摩陀婆（Madhva） consistently; or re-render Mādhava in IN1 and IN5. Changing IN1 or IN5 would touch released courses, which is not authorised in Phase 17A, so nothing was changed.

## 5. Critiques & Responses assessment

**Included (about 2,160 characters), five items, as required:**

| C&R item | Required critique | Sources of the criticism | Response basis |
|---|---|---|---|
| 一 | Ignorance | Rāmānuja VS §40 [直接]; Śāntarakṣita TS [直接] | [本章的重建], using the levels distinction and the rope–snake model |
| 二 | Whether the world is real | Madhva MAnuv 1.1.40 [直接]; IEP's report of Madhva [学派] | [本章的重建], using BSBh 2.2.28 and the dream analogy |
| 三 | Whether dependence entails identity | Three-school comparison [学派] | Assessment isolates the extra premise ("only the unchanging is fully real", via SEP) |
| 四 | Personal difference | [本章的重建], with the Sāṃkhya SK 18 argument forwarded to IN7 | SEP on *upādhi* and reflection [学派] |
| 五 | Knowledge vs devotion | Three-school comparison [学派] | Reframed as discovery / relationship / gift |

Each item ends with a short assessment that names the remaining disagreement instead of declaring a winner. The C&R does not repeat Part 六's documented exchanges; it refers to them.

## 6. Interactive proposals (proposals only; nothing built)

**Shared rules** (as in IN4 and IN5):
- use only passages already verified in the manuscript;
- show a basis tag on every card: 原典 / 注释 / 论敌原文 / 二手转述 / 本章重建, mapped to the existing `text | school | scholar | common | later | course` basis keys;
- include a "这个演示是什么，不是什么" limits panel;
- save state per course;
- use the manuscript's existing table as the no-JavaScript fallback;
- reuse existing Swiss UI tokens; no new infrastructure.

**Anchor convention:** the existing `{id, code, section, match}` form, matching a block whose text starts with the heading or table header quoted below. Every anchor below was confirmed to occur exactly once in `content/IN6_SAMPLE_DRAFT.md`.

**Recommended set: A, B and D.**
- **A** addresses the course's first thesis, that the Upaniṣads do not decide between the schools.
- **B** addresses the hardest single idea, *adhyāsa*.
- **D** makes the three schools' disagreement manipulable: one relation (dependence), three models.
- **C** is optional: it overlaps D and the static 总表 already does most of its job.
- **E** is not recommended. Turning knowledge vs devotion into a scored argument map risks the very simplification the manuscript argues against.

### A. 奥义书经文解释探索器 (Upaniṣadic Passage Interpretation Explorer) — recommended

- **Placement:** Part 一, "### 同一组经文，可以被拉向不同的方向", replacing the visual weight of the table "| 经文 | 字面上最容易支持 | 给谁带来麻烦 |". The table stays as the fallback.
- **Objective:** see that each passage can be read by each school, and at what cost.
- **Content:** the four passages (BĀU 1.4.10, 3.7.22, 2.3.6; ŚvU 4.10), each with its Sanskrit and 本章试译 exactly as in the manuscript. For each passage there are three reading cards (不二论 / 罗摩奴阇 / 摩陀婆). Each card holds one sentence from the manuscript and a "要付出的解释代价" line.
  - **Gaps are shown, not filled.** Madhva's readings of BĀU 1.4.10 and 2.3.6 were not read in the original. Those cards say "本章没有读到摩陀婆对这段经文的原文" and point to IN1 (*atat* reading) or to the general principle only.
- **Visual:** passage selector on the left; three cards on the right, each with a cost bar drawn as a label, not a number.
- **Learner actions:**
  1. Choose a passage.
  2. Predict which school it "favours" before revealing.
  3. Reveal all three cards.
- **Feedback:** after all four passages, a closing card restates the manuscript's conclusion ("不是'奥义书自相矛盾'，也不是'其中一派才是奥义书的原意'"). No score.
- **Historical limitations:** recension differences (BĀU 3.7.22 *vijñāna* / *ātman*) are flagged on the card. ŚvU 4.10's *māyā* is shown as "神的创造力量", not "illusion".
- **Implementation:** static data `{passage, sa, zh, readings: {advaita, ramanuja, madhva: {text, basis, read: boolean}}}`; React state for the selection; no library.
- **Mobile:** passages become a horizontal chip row, and cards stack.
- **Keyboard:** chips are a `radiogroup` (arrow keys); Reveal is a `button`; focus moves to the first revealed card; `aria-live="polite"` announces it.

### B. 不二论错觉与附加工作坊 (Advaita Error and Superimposition Workshop) — recommended

- **Placement:** Part 二, "### 附加：一种结构性的错认" (table "| 定义中的成分 | 在绳—蛇一例中 | 在"我"的错认中 |"), continuing into Part 三, "### 两个层次，以及"不可决定"".
- **Objective:**
  - map the five components of Śaṅkara's definition onto the rope–snake case and then onto "I am this body";
  - see that the error needs a real ground and runs both ways;
  - see why the "corrector" problem (想一想（二）) arises.
- **Content:** the two definitions (*smṛtirūpaḥ…*; *atasmiṃs tadbuddhiḥ*) with 本章试译; the table's five rows; SEP's "mutual superimposition" (labelled 二手转述).
- **Visual:** two parallel strips, rope–snake and self–body, each with five slots. A dimmer for "光线" (rope–snake) and "无明" (self–body) changes only the *label* of what appears, not a physical simulation.
- **Learner actions:**
  1. Drag or tap-assign the five component cards into the slots of each strip.
  2. Then toggle "纠正" to see what disappears (the snake / the "I am fat" attribution) and what remains (the rope / consciousness).
- **Feedback:**
  - wrong placements explain the role confusion (e.g. ignorance is the *condition*, not the *ground*);
  - the final card asks who corrects the second error, and links to the Upaniṣadic sentence as the corrector, as in step 7 of the reconstruction.
- **Historical limitations:**
  - the preface text is shown "据婆者斯钵底《明论》所引" (the GRETIL BSBh lacks the preface);
  - the later debate on the locus of ignorance is marked 二手转述 and is not modelled;
  - the cinema example is not included, to keep one model per component.
- **Implementation:** a slot/card state machine; CSS opacity transitions; no drag library (tap-to-assign on all devices, with drag as an enhancement).
- **Mobile:** the strips stack vertically.
- **Keyboard:** each card is a button. Select a card, then press Enter on a slot. Esc cancels the selection. Each slot has an `aria-label` naming its component.

### C. 三派吠檀多比较实验室 (Three Vedānta Schools Comparison Lab) — optional

- **Placement:** Part 五, "### 同一条经文的三种读法：《梵经》2.1.14" and "### 摩陀婆与罗摩奴阇"; Part 六, "### 总表".
- **Objective:** compare the three schools row by row (Brahman, individual and Brahman, world, ignorance, path, key texts).
- **Content:** only the 总表 rows and the two comparison tables, with each cell's basis.
  - **Rāmānuja on BS 2.1.14 stays empty.** The Śrībhāṣya was not read, so this cell shows "未读原文" and no reading is invented.
- **Visual:** a 3-column grid with row toggles; a "只看差异" filter hides rows where two schools agree (for example, "梵具有属性" for Rāmānuja and Madhva).
- **Learner actions:**
  1. Hide a column.
  2. Predict its cells from the other two.
  3. Reveal.
- **Feedback:** each cell links to its manuscript anchor.
- **Limitations:** every cell is a summary, as the manuscript says ("每一格都只是概括"). This is why the component is optional: it adds less than D does.
- **Implementation:** a static table with React state for hidden columns.
- **Mobile:** one school per tab.
- **Keyboard:** `tablist` / `tab` / `tabpanel`; cells are focusable with `aria-describedby` pointing to their basis.

### D. 梵—自我—世界关系探索器 (Brahman–Self–World Relationship Explorer) — recommended

- **Placement:** Part 四, "### 身体与灵魂：罗摩奴阇的核心模型", with a forward link to C&R "### 三、依赖是否意味着同一？".
- **Objective:** see that all three schools accept "the world depends on Brahman" but use three different models of dependence, and that the conclusion follows from the model:
  - clay → pot (material cause): Śaṅkara;
  - soul → body (support, control, subservience): Rāmānuja;
  - king → subject (independent → dependent): Madhva.
- **Content:**
  - three model cards with the manuscript's primary text: BSBh 2.1.14; VS §76; MAnuv 2.1.85 and 2.1.88;
  - the three relations from VS §76;
  - the C&R assessment sentence on the extra premise ("只有不变的东西才是完全真实的", via SEP).
- **Visual:** three nodes (梵 / 个体 / 世界). A model switch redraws the two edges, each with a typed label, and shows "由此得出" beneath (同一 / 不能分离而成立 / 根本不同).
- **Learner actions:**
  1. Choose a model.
  2. Answer "在这个模型中，个体解脱后还与梵有区别吗？" for each model before seeing the school's answer.
- **Feedback:** each school's answer comes with its source line; the final card is the C&R assessment.
- **Historical limitations:**
  - the king image for Madhva is the course's illustration of IEP's account, labelled 本章重建;
  - the Rāmānuja liberation state is labelled "本章只读到概括".
- **Implementation:** an SVG with three fixed nodes; edge labels from data; no physics.
- **Mobile:** nodes in a vertical line; the model switch is a segmented control.
- **Keyboard:** a `radiogroup` for models; the SVG has `role="img"` with a generated `aria-label` describing the current edges.

### E. 知识、虔信与解脱论证图 (Knowledge, Devotion and Liberation Argument Map) — not recommended

- **Placement, if built:** C&R "### 五、知识，还是虔信？" and Part 四 "### 知识与爱".
- **Why not:** the manuscript's point is that the knowledge/devotion dichotomy is too simple. An argument map with "knowledge" and "devotion" as opposing poles would re-introduce that dichotomy visually.
  - The relevant evidence is three short passages (SEP on Śaṅkara §4.1; VS §3; MAnuv 1.1.40–41), which the manuscript's bullet list already presents clearly.
  - If the PO wants it anyway, it should be a three-column "what liberation is" card (discovery / relationship / gift), not a map.

## 7. Full practice data

- **Count:** 6 sets × 3 = 18 questions, labelled 一 to 六 to match 想一想（一）…（六）.
- **Placement:**

| Set | Placement |
|---|---|
| 一 | End of Part 一 |
| 二 | End of Part 二 |
| 三 | End of Part 三 |
| 四 | End of Part 四 |
| 五 | End of Part 五 |
| 六 | After the 总表 in Part 六. This block was added in Phase 17A so that the six-set rule is met. |

- **Types:** 7 single, 4 multi, 5 tf, 2 view.
- **Single-answer positions:** A 2, B 2, C 2, D 1.
- **tf answers:** 2 true, 3 false.
- **Multi answers:** A-C-D (in6-2-2), B-C (in6-3-3), A-C-D (in6-4-1), A-B-C (in6-6-2).
- **Contested positions** are given as `view` questions, with no option marked right:
  - in6-1-3: Gauḍapāda and Buddhism;
  - in6-5-2: the readings of BS 2.1.14.
- **IDs:** `in6-{set}-{question}`.
- **Compatibility:**
  - typechecked with `tsc --strict` against a byte-identical copy of `src/content/practice.ts` in the scratchpad: 0 errors;
  - the check script confirms at most 3 per set, unique IDs, valid answers, and a note on every option.
- **Not wired in.** Full data in Appendix A.

## 8. Historical image shortlist (metadata only; nothing downloaded)

Metadata was read from the Wikimedia Commons API on 2026-11-09. Museum pages were also checked where they allowed automated access. No file was downloaded. Rights are given as stated by the source. Anything that could not be confirmed at the holding institution is marked **unverified**.

| # | Identity | Dating | Institution | URL | Rights (as stated) | Attribution | Placement | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Bronze figure of Rāmānuja, Vijayanagar period, southern India (Tamil Nadu) | 15th century (per Commons) | Asian Civilisations Museum, Singapore; accession 1994-00519 (per Commons). **Unverified at the museum**: no ACM online record was found | [File:ACM-Ramanuja-03724.jpg](https://commons.wikimedia.org/wiki/File:ACM-Ramanuja-03724.jpg) | Photograph: CC0 (photographer "Wuselig"). The object itself is centuries old | Not required by CC0; suggested "Photo: Wuselig, CC0; Asian Civilisations Museum" | Part 四, "### 背景" | **Best IN6 candidate.** A devotional image made long after Rāmānuja's lifetime, not a portrait; the caption must say so. Two CC BY-SA 4.0 photos of a Rāmānuja bronze in the same museum (by Bjoertvedt) exist as alternatives |
| 2 | "Srimad Guru Adi Shankaracharya" (Śaṅkara with disciples), oleograph after Raja Ravi Varma | ca. 1904 (per Commons) | Holding institution **not named** in the metadata read (source given as Google Arts & Culture; "Registered No 137") | [File:Raja Ravi Varma - Sankaracharya.jpg](https://commons.wikimedia.org/wiki/File:Raja_Ravi_Varma_-_Sankaracharya.jpg) | Public domain (PD-Art; artist d. 1906), per Commons | Raja Ravi Varma (Ravi Varma Press), ca. 1904 | 导读 or Part 二 | A modern devotional print about 1,100 years after Śaṅkara. The caption must say it is a 20th-century image, not historical evidence. Verify the Google Arts & Culture partner before use |
| 3 | Madhva | — | — | — | — | — | — | **No historical image shortlisted.** The images found were modern photographs of temple images (CC BY 2.0, 2008; CC0, 2023). They are not historical objects, and they show active worship images. Recommend no Madhva image |

- **Not shortlisted:**
  - a BnF manuscript titled "Rugviniścaya, par Mādhava" (a medical text by a different Mādhava, which shows the name problem rather than solving it);
  - a recent CC BY-SA painting of Śaṅkara with disciples (2022; no historical value).
- **Recommendation:**
  - use 1 with a careful caption once the ACM record is confirmed;
  - use 2 only if a 导读 image is wanted, with the "modern print" caption;
  - record any image used in SOURCES.md, with an on-page credit.

## 9. Rights and textual uncertainties

The full list of ten items is in the manuscript appendix. The most important for review:

1. **GRETIL licence.** All 13 quoted files carry CC BY-NC-SA 4.0 in the 2020 mass-conversion header, with a good-faith notice. The NC/SA question is shared with IN2–IN5 and is still open.
2. **Unproofread Sansknet files.** BS, BSBh, Bhāmatī, Ratnaprabhā and Anuvyākhyāna are marked "not proof-read" or name no printed edition. The quotations match the files but need a printed-edition check.
3. **Adhyāsa preface.** It is quoted only through Bhāmatī pratīkas. A printed-edition check is needed.
4. **BĀU 3.7.22 recension.** Rāmānuja's *ya ātmani tiṣṭhan…* reading, possibly from the Mādhyandina recension, was not checked.
5. **Whether Rāmānuja and Madhva address Śaṅkara by name or text.** Not established; the manuscript says only "the Advaita doctrine".
6. **Locus of ignorance** (Vācaspati vs Pañcapādikā lines). Given as the usual summary only.
7. **TS 328–335.** The target and the verse-number concordance are not checked against Kamalaśīla or a printed edition.
8. **Ratnaprabhā authorship.** The header and the colophon disagree.
9. **GK 4.19 *buddhaiḥ*.** "Awakened ones" or "Buddhas": left open.
10. **Dates.** Śaṅkara: three views in parallel. Madhva's dates rest on one source (IEP).

## 10. Cross-course boundaries

| Course | Boundary kept |
|---|---|
| IN1 (early thought) | Not re-taught: *tat tvam asi* (three readings, Brereton), *neti neti* as dialogue, Uddālaka's clay, the five differences, BSBh 2.1.14 and 2.2.33 summaries. IN6 quotes BSBh 2.1.14 in the original (IN1 had only Thibaut's English) and refers back for the rest |
| IN4 (Madhyamaka, Yogācāra) | Not re-taught. IN6 reads only Vedānta's criticism of them (BSBh 2.2.28, 3.2.22) and Gauḍapāda's shared vocabulary |
| IN5 (Mīmāṃsā) | Not re-taught. IN6 uses only the *bhavya* / *bhūta* distinction and the BS–MS 1.1.1 parallel |
| IN7 (Sāṃkhya–Yoga) | IN6 reads only Vedānta's criticism of Sāṃkhya (BS 1.1.5, 2.2.1, 2.2.7, 2.1.3). The fairness question and the Sāṃkhya side are forwarded to IN7, which picks them up with BS 2.2.3 and SK 57. The two courses now share the terms 神我 / 原质 / 根本因 |
| CN5 (Chinese Buddhism) | Not touched |
| S4 / S5 / S12 | Official forward links; not named in the text yet (see §1) |
| EA2 (Descartes) | Only Madhva's "Dvaita ≠ Cartesian dualism" table; Descartes is not taught |

## 11. Integration readiness

- **Ready for PO reading and expert review.** The manuscript is complete; the quotations are script-verified; notes and appendix are complete; the practice data compiles.
- **Not ready for publication.** Still needed:
  - expert review (especially Parts 二, 四 and 五);
  - a printed-edition check of the adhyāsa preface and the Sansknet files;
  - the GRETIL NC/SA decision;
  - the 摩陀婆 naming decision;
  - image verification.
- **If Phase 17B is approved:**
  - add `practice-in6.ts` from Appendix A;
  - build only the components the PO selects;
  - record images in SOURCES.md.

  Work stopped after the four Phase 17A files, as instructed.
- **Format checks done:**
  - **Line endings:** CRLF only: 876 CRLF, 0 bare LF.
  - **Footnotes:** 79 references, each with exactly one definition, in order of first appearance. All in-note cross-references ("同注 N", "注 N") resolve.
  - **Practice anchors:** 6 想一想 blocks, matching set labels 一 to 六.
  - **Markdown render:** parsed with the project's own `marked` into 11 h2, 32 h3, 11 tables and 43 blockquotes, with no raw-pipe paragraphs.
  - **Tables:** the column lint found 0 mismatched rows.
  - **Media anchors:** all five components' anchors occur exactly once.

## Appendix A. Practice data (draft `practice-in6.ts`)

Typechecked with `tsc --strict` against a byte-identical copy of `src/content/practice.ts`; not added to the repository.

```ts
import type { PracticeSet } from './practice';

// 《梵、自我与世界：吠檀多派》· 想一想 as selection questions.
// Each set follows its exercise in content/IN6_SAMPLE_DRAFT.md (labels 一 to 六).
// Phase 17A proposal: kept in scratch, not integrated into the site.
export const IN6_PRACTICE: PracticeSet[] = [
  {
    label: '一',
    lede: '原题问你：奥义书本身是不二论吗？请先区分"有支持同一的经文"和"整体上教导某一种体系"。',
    questions: [
      {
        id: 'in6-1-1', type: 'single',
        stem: '本章读了四段被三派反复引用的经文。下面哪一种说法最符合本章的结论？',
        options: [
          { id: 'a', text: '这四段经文合起来，清楚地教导了不二论；另外两派只是误读。', note: '"内在的控制者"一段说认识是他的"身体"，更容易支持罗摩奴阇；不二论也要花力气解释它。' },
          { id: 'b', text: '每一段都容易支持某一派，又给另外两派带来麻烦；奥义书本身没有替任何一派作出选择。', note: '对。每一派都要选一组经文作为基本的，再把其余经文解释为与之相容。' },
          { id: 'c', text: '这些经文自相矛盾，所以吠檀多的争论没有意义。', note: '本章明确说，结论不是"奥义书自相矛盾"：经文出自不同的文本和时代，本来就没有统一的体系。' },
          { id: 'd', text: '只有"不是这样，不是这样"是真正的奥义书，其余都是后人的添加。', note: '本章没有这样区分；四段都出自早期或较晚的奥义书本身。' },
        ],
        answer: 'b',
      },
      {
        id: 'in6-1-2', type: 'tf',
        stem: '《白骡奥义书》4.10 说"要知道，摩耶就是原质"，这里的"摩耶"已经是商羯罗之后不二论所说的"不可决定的显现"。',
        answer: false,
        wrong: '不是。在这一颂中，摩耶被等同于生出世界的原质，掌握它的是人格的"大自在者"，更像神的创造力量。把它读成"不可决定的显现"，是后来不二论的解释（见第三部分"摩耶：三个层次"）。',
      },
      {
        id: 'in6-1-3', type: 'view',
        stem: '乔荼波陀的用语（"没有灭也没有生"、梦、幻术、海市蜃楼）与大乘佛教非常接近。你怎样理解这种接近？',
        options: [
          { id: 'a', text: '乔荼波陀吸收了佛教的思想和语言。', note: '优点：能解释词汇上的高度相似，包括第四章的 buddhaiḥ。代价：他明确以奥义书为依据，这一读法容易忽视他与佛教的根本分歧（他保留了一个不生的自身）。' },
          { id: 'b', text: '他是在与佛教争夺同一套语言，用佛教的工具为奥义书辩护。', note: '优点：既承认相似，又解释了他为什么仍属吠檀多。代价：这是对动机的推测，文本本身没有说明。' },
          { id: 'c', text: '两者有共同的思想背景，相似不必出于直接的借用。', note: '优点：最谨慎。代价：如果不进一步说明这个"共同背景"是什么，这个说法解释力有限。本章对三种看法都不作结论。' },
        ],
      },
    ],
  },
  {
    label: '二',
    lede: '原题问你：附加和普通的错觉有什么不同？"我是这个身体"的错觉，由谁来纠正？',
    questions: [
      {
        id: 'in6-2-1', type: 'single',
        stem: '在商羯罗的"附加"定义中，绳—蛇一例里的"在别处"（所依），在"我"的错认中对应的是什么？',
        options: [
          { id: 'a', text: '纯粹的意识，即自身。', note: '对。就像没有绳子就不会看成蛇，没有意识这个真实的所依，也就不会有"我"的错认。' },
          { id: 'b', text: '身体、感官和心。', note: '这些对应的是"先前所见之物"，也就是被错误地加上去的东西。' },
          { id: 'c', text: '无始的无明。', note: '无明对应的是"使错认发生的条件"，就像黄昏的光线，而不是所依。' },
          { id: 'd', text: '奥义书的经文。', note: '经文对应的是"纠正"，即认识到自身就是梵。' },
        ],
        answer: 'a',
      },
      {
        id: 'in6-2-2', type: 'multi',
        stem: '为什么商羯罗认为，解脱只能来自认识，而不能来自行动？（可多选）',
        options: [
          { id: 'a', text: '日常的一切行动，包括祭祀，都预设了附加；用预设附加的东西不能消除附加。', note: '对。这是分步重建的第 5、6 步。' },
          { id: 'b', text: '商羯罗认为一切行动都是有害的，应当完全放弃。', note: '不对。他承认行动和德性可以净化心，使人有资格去探究，只是不能直接带来解脱。' },
          { id: 'c', text: '法是"将要成就的"，依赖人的作为；梵是"已经存在的"，不依赖人的作为。', note: '对。这是他从弥曼差派那里接过、又反过来使用的区分。' },
          { id: 'd', text: '错认只能被正确的认识纠正，就像蛇的显现只能由看清绳子来消除。', note: '对。错误属于认识，纠正也要在认识上发生。' },
        ],
        answer: ['a', 'c', 'd'],
      },
      {
        id: 'in6-2-3', type: 'tf',
        stem: '据本章，商羯罗本人没有把"无明属于谁"作为一个专题来处理；这个问题是在他之后的不二论内部展开争论的。',
        answer: true,
        wrong: '这句话是对的。SEP 列出的无明所依、遮蔽与投射等问题，主要是后来不二论内部的争论；本章只转述了婆者斯钵底一系和《五足释》一系的通常概括。',
      },
    ],
  },
  {
    label: '三',
    lede: '原题问你：不二论者会说"桌子不存在"吗？请分别从日常层次和究竟层次回答。',
    questions: [
      {
        id: 'in6-3-1', type: 'single',
        stem: '商羯罗注释"不是这样，不是这样"时，为什么拒绝"把梵的形相和梵本身都否定"？',
        options: [
          { id: 'a', text: '因为经典禁止否定任何东西。', note: '商羯罗本人就在否定一切可说的规定；问题不在于能不能否定。' },
          { id: 'b', text: '因为梵的形相是真实的，不能否定。', note: '他否定的正是附加在梵上的形相；不能否定的是梵本身。' },
          { id: 'c', text: '因为那会陷入"空论"；否定总要依据某个真实的东西，就像否定蛇是为了显出绳子。', note: '对。《梵经注》3.2.22 明确拒绝了"一切都不存在"的立场。' },
          { id: 'd', text: '因为他接受佛教中观派的立场。', note: '正好相反：他把"两者都否定"称为空论，并加以拒绝。' },
        ],
        answer: 'c',
      },
      {
        id: 'in6-3-2', type: 'tf',
        stem: '商羯罗是一个唯心论者：他认为外物在任何层次上都不独立于个人的认识而存在。',
        answer: false,
        wrong: '不是。在批评瑜伽行派时（《梵经注》2.2.28），他坚持外物在每一个认识中都被感知到；在日常层次上，他承认外物独立于个人的认识而存在。他否定的是世界离开梵的独立实在。',
      },
      {
        id: 'in6-3-3', type: 'multi',
        stem: '下面哪些说法符合本章对"摩耶"一词的分层？（可多选）',
        options: [
          { id: 'a', text: '在所有文本中，"摩耶"的意思都是"幻觉"。', note: '本章的表格正是为了说明这个词在不同层次上意思不同。' },
          { id: 'b', text: '在乔荼波陀那里，世界的差别"只是由于摩耶而有"，这比商羯罗的说法更接近"世界是幻"。', note: '对。见《圣典论》3.19。' },
          { id: 'c', text: '商羯罗本人很少用这个词，更常说"无明"、"名与色"、"限定条件"。', note: '对。SEP 也这样指出，并提醒"摩耶论者"一名歪曲了他的意图。' },
          { id: 'd', text: '"摩耶是世界的质料因"是商羯罗本人反复论证的核心学说。', note: '据 SEP，这一类理论主要是商羯罗之后的不二论者发展的，能否读进商羯罗本人，学界和传统内部都有争论。' },
        ],
        answer: ['b', 'c'],
      },
    ],
  },
  {
    label: '四',
    lede: '原题问你：罗摩奴阇的"身体"是什么意思？哪些说法符合《吠陀义摄》第 76 节的定义？',
    questions: [
      {
        id: 'in6-4-1', type: 'multi',
        stem: '按照第 76 节的定义，灵魂与身体之间是哪些关系？（可多选）',
        options: [
          { id: 'a', text: '不能分离而成立的"支撑者与被支撑者"的关系。', note: '对。身体离开灵魂就不能成立。' },
          { id: 'b', text: '由血肉构成的物质与非物质的关系。', note: '定义没有用"物质"来界定身体；在罗摩奴阇那里，个体的自身也可以是神的"身体"。' },
          { id: 'c', text: '"控制者与被控制者"的关系。', note: '对。神是"内在的控制者"。' },
          { id: 'd', text: '"所属者与主有者"的关系。', note: '对。身体为灵魂的目的而存在。' },
        ],
        answer: ['a', 'c', 'd'],
      },
      {
        id: 'in6-4-2', type: 'single',
        stem: '对方反驳罗摩奴阇："你的自身也会误认为自己是天神，你也要承认它的光被遮蔽了。"罗摩奴阇怎样回答？',
        options: [
          { id: 'a', text: '他承认这一点，并放弃了对不二论的批评。', note: '他没有放弃；他认为自己有一个不二论没有的区分。' },
          { id: 'b', text: '他说个体的自身根本没有意识。', note: '他明确说意识是自身"本来就有的"属性。' },
          { id: 'c', text: '他说只有神的恩典才能解释错误。', note: '这更接近摩陀婆的思路；罗摩奴阇在这里诉诸的是业和属性的区分。' },
          { id: 'd', text: '意识是自身的属性，它因为业而真实地收缩和扩展；收缩的是属性，自身并没有被毁灭。', note: '对。关键在于区分"自身"与自身所具有的"意识"，就像灯与灯光。' },
        ],
        answer: 'd',
      },
      {
        id: 'in6-4-3', type: 'tf',
        stem: '在罗摩奴阇看来，"这件衣服是蓝的"一类的同位关系说明：两个意思不同的词，可以指同一个东西，而不必意味着两者毫无差别。',
        answer: true,
        wrong: '这句话是对的。他用同位关系说明"那就是你"："那"和"你"各有其义，却指同一个梵；这不等于毫无差别的同一。',
      },
    ],
  },
  {
    label: '五',
    lede: '原题问你：为什么摩陀婆认为"依赖"恰恰证明了"不同"？请比较罐子依赖泥土与臣民依赖国王。',
    questions: [
      {
        id: 'in6-5-1', type: 'single',
        stem: '摩陀婆为什么说"差别是虚假的"一说被驳倒了（《随释》1.1.40）？',
        options: [
          { id: 'a', text: '因为这一说以"梵会无知"为前提，而全知的梵不可能无知。', note: '对。所以差别和束缚都是真实的，只能由神的恩典解除。' },
          { id: 'b', text: '因为感官告诉我们世界是虚假的。', note: '摩陀婆的立场正好相反：感知本来是有效的，它告诉我们的是真实的区别。' },
          { id: 'c', text: '因为罗摩奴阇已经证明了世界是梵的身体。', note: '这两颂没有诉诸罗摩奴阇；摩陀婆与罗摩奴阇在个体与梵的关系上也不同。' },
          { id: 'd', text: '因为奥义书从来没有说过同一。', note: '摩陀婆承认有这样的经文，但对它们作不同的解释（例如"那就是你"）。' },
        ],
        answer: 'a',
      },
      {
        id: 'in6-5-2', type: 'view',
        stem: '对《梵经》2.1.14 的"不是另一个"，商羯罗读作"结果离开原因没有独立的实在"，摩陀婆读作"梵之外没有另一个独立的原因"。你认为哪一种读法更有说服力？',
        options: [
          { id: 'a', text: '商羯罗的读法：经文明确引用了"变化只是言语的把握"，泥土一例支持结果只是名称。', note: '优点：与《歌者奥义书》6.1.4 的字面最接近。代价：要接受"只有不变的才完全真实"这一额外前提。' },
          { id: 'b', text: '摩陀婆的读法：它保留了日常经验中真实的区别，又说明了一切依赖于梵。', note: '优点：与实在论的知识论一致。代价：本章没有读到他对泥土一例的具体处理，"不是另一个"读作"没有另一个独立原因"也需要更多的论证。' },
          { id: 'c', text: '两种读法都在用经文支持事先选定的体系，经文本身不足以决定。', note: '优点：与第一部分的结论一致。代价：如果停在这里，就放弃了评价两派论证的工作。' },
        ],
      },
      {
        id: 'in6-5-3', type: 'tf',
        stem: '摩陀婆的"二元论"与笛卡尔的心物二元论是同一种立场。',
        answer: false,
        wrong: '不是。摩陀婆的基本划分是"独立的实在"（神）与"依赖的实在"（灵魂与物质），而不是心与物；他承认的是无数个彼此有别的实在，而不是两类实体。',
      },
    ],
  },
  {
    label: '六',
    lede: '原题问你：吠檀多与它的论敌分歧在哪里？请分别想一想数论、佛教和克什米尔湿婆派。',
    questions: [
      {
        id: 'in6-6-1', type: 'single',
        stem: '《梵经》2.1.3 说"由此，瑜伽也被驳倒了"。按本章的读法，被驳倒的是什么？',
        options: [
          { id: 'a', text: '一切冥想和修习。', note: '商羯罗本人承认修习、冥想等有次要的重要性。' },
          { id: 'b', text: '瑜伽派与数论共有的形而上学：原质是独立的原因。', note: '对。被驳倒的是理论，而不是修习本身。' },
          { id: 'c', text: '瑜伽派对自在者的信仰。', note: '这一条经文针对的是与数论共有的原质学说，而不是自在者。' },
          { id: 'd', text: '佛教的瑜伽行派。', note: '瑜伽行派是佛教学派；《梵经》对它的批评在 2.2.28 以下。' },
        ],
        answer: 'b',
      },
      {
        id: 'in6-6-2', type: 'multi',
        stem: '据本章的转述，寂护对"一切都是一个恒常意识的变现"这一立场提出了哪些批评？（可多选）',
        options: [
          { id: 'a', text: '颜色、声音等就应当在同一时刻被认识。', note: '对。我们的认识显然是一个接一个、彼此不同的。' },
          { id: 'b', text: '在唯一的认识中，颠倒和不颠倒没有区别，束缚与解脱也无从区分。', note: '对。' },
          { id: 'c', text: '修行的一切努力都没有果报。', note: '对。颠倒若属于恒常的认识，就无法去除；真理的认识也无法产生。' },
          { id: 'd', text: '外物不被感知，所以不存在。', note: '这不是寂护在这里的论证；它也与本章所读的这几颂无关。' },
        ],
        answer: ['a', 'b', 'c'],
      },
      {
        id: 'in6-6-3', type: 'single',
        stem: '乌特帕拉提婆说，意识如果没有对自己的"反省"，就"像水晶一样"。本章由此整理出两种不二论的什么差别？',
        options: [
          { id: 'a', text: '一种以奥义书为依据，一种完全不承认任何经典。', note: '克什米尔湿婆派依据湿婆派的经典，并不是不承认经典。' },
          { id: 'b', text: '一种认为世界是真实的，一种认为世界完全不存在。', note: '两者都不认为世界"完全不存在"；本章的对照不在这里。' },
          { id: 'c', text: '一种认为终极意识是静止的见证，一种认为终极意识本身是能动的、自我觉知的。', note: '对。这个对照是本章的整理，乌特帕拉提婆的这一颂本身没有点名。' },
          { id: 'd', text: '一种主张多个自身，一种主张一个自身。', note: '两者都是不二论；差别在于对唯一意识的理解。' },
        ],
        answer: 'c',
      },
    ],
  },
];
```

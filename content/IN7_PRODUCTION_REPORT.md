# IN7 制作报告（Phase 17A）

*Supporting report for `content/IN7_SAMPLE_DRAFT.md` (《意识、物质与修行：数论与瑜伽派》 / Consciousness, Matter and Practice: Sāṃkhya and Yoga). Written in Phase 17A, in parallel with IN6, as a proposal for Product Owner review. Nothing in this report has been built, integrated, committed or deployed.*

## 1. Course structure and scope

**Authority.** The official curriculum (`planning/CURRICULUM_REFERENCE_DRAFT.md` and the course registry in `units.ts`) was followed for title, scope, tier (Extended ○), structure and relationships. Differences from the Phase 17A working outline are listed at the end of this section.

| Part | Core problem | Key passages read in the original |
|---|---|---|
| 导读 | "We already have medicine: why philosophy?" Core question: are consciousness and matter two realities, and how does knowing this end suffering? Six reminders: dates table; five material types; Sāṃkhya ≠ Yoga, and the "system" framing may not fit (SK 72, "one-book school"); response tags; what IN1, IN3, IN4 and IN6 already covered | SK 1–2 |
| 一 两个原理 | Manifest, unmanifest, knower; the three *guṇa*s, with the caveat that this is not physics | SK 3, 6, 10–11, 12–13 |
| 二 演化与因果 | *satkāryavāda* (5-step reconstruction); evolution order; the 25 *tattva*s (tree diagram and table); cosmogonic vs microcosmic reading (Ruzsa); subtle body; "this is not biological evolution" | SK 9 (+ Gauḍapāda: sand/oil, curd), 16, 22, 24, 25, 42 |
| 三 意识与见证的自身 | Five arguments for *puruṣa* (reconstruction); plurality; the witness; "神我 is not 'self'" (table: puruṣa / ahaṃkāra / buddhi); the debate on whether puruṣa changes (Ruzsa); lame and blind; the dancer and the audience; comparison with the *Anattalakkhaṇa Sutta* (table); potter's wheel; comparison with Descartes (table) | SK 17 (+ Gauḍapāda), 18, 19, 20, 21, 59, 62, 64, 67 |
| 四 瑜伽：注意力与控制 | YS text history; definition of yoga; *citta* levels (bhāṣya); five *vṛtti*s (table); practice and dispassion; Īśvara; *kleśa*s; the fourfold structure (bhāṣya 2.15, table); eight limbs (table; 16 sūtras on *yama/niyama* against 3 on *āsana*); *āsana* is not modern posture; powers: attainment or obstacle?; YS 4.15–16 against Vasubandhu; liberation; Sāṃkhya-vs-Yoga table | YS 1.2–1.4, 1.6, 1.12, 1.16, 1.23–1.27, 2.3, 2.5, 2.6, 2.18, 2.20, 2.29, 2.46, 3.37, 4.15–4.16, 4.34; bhāṣya on 1.1, 2.15, 2.46 |
| 五 批评与借用 | SK 57 (milk) against BS 2.2.3 and Śaṅkara (documented direct criticism); reconstructed Sāṃkhya reply; Śāntarakṣita (paraphrase, three groups); the interaction problem with Elisabeth's 1643 letter as a parallel; reflection theory (Vācaspati, Vijñānabhikṣu) as borrowing from Advaita (via Ruzsa); Upaniṣadic precedents; medicine and dharmaśāstra (background); Paramārtha's 《金七十论》 (background only); misconceptions table | SK 57; BS 2.2.3; BSBh 2.2.3; KaU 3.11; ŚvU 5.2, 6.13; TS 17–25, 41–44, 285–295 (paraphrase only) |
| 结语 | Return to the core question | — |
| 后世批判与回应 | Five items (see §5) | — |
| 注释 / 来源与权利说明 | 85 notes; per-file GRETIL table (12 files); 11 open questions | — |

- **Size** (Python count on the LF version): 43,688 characters, of which 23,686 are CJK. Body (title to 结语) about 29,800; C&R about 2,200; notes about 5,800; sources appendix about 5,400.
- **Composition:** 6 想一想 blocks (labels 一 to 六), 15 tables, 50 primary-text blocks (original + 本章试译), 85 notes, 1 `text` code block (the 25-tattva tree).
- **Spec coverage:**
  - **25-tattva diagram:** Part 二. An indented tree in a `text` code block (so that CJK alignment does not depend on monospace width), followed by the 25-row table. Component A (§6) is proposed as the interactive version.
  - **Sāṃkhya and Yoga not interchangeable:** reading-guide item 第三, and the comparison table at the end of Part 四 (Īśvara; method; the role of *citta*; the scope of liberation).
  - **Systematic framing caveat:** SK 72, the lost *Ṣaṣṭitantra*, the IEP "one-book school" remark, and the late emergence of "Yoga" as a school name.
  - **Commentary not read into the root text:** Gauḍapāda's examples (sand and oil, curd, lamp, salt water, *taijasa*, animal sacrifice) are attributed to him, not to Īśvarakṛṣṇa (notes 28–30).
  - **Descartes:** an official IN7 outcome, done as a comparison table with a forward link to EA2; Descartes is not taught.
  - **Yoga practice:** treated philosophically; *āsana* is given as a seated posture, with an explicit warning against reading modern postural yoga back into YS 2.46.

**Discrepancies between the official curriculum and the working outline (reported, official version followed):**

1. **Title.** The working outline used 数论与瑜伽; the official title in `units.ts` is 《意识、物质与修行：数论与瑜伽派》. The manuscript uses the official title.
2. **Structure.** The official structure has five sections: two principles; evolution and causation; consciousness and the witnessing self; yoga as attention and control; criticism and borrowing. The working outline had six, with a separate part on Īśvara and liberation. The manuscript follows the official five. Īśvara is in Part 四 and liberation is split between Parts 三 (Sāṃkhya) and 四 (Yoga).
3. **Tier.** Official: Extended ○. The manuscript length is closer to a core course. If the PO wants Extended courses shorter, the first cuts would be Part 五's background sections (medicine, dharmaśāstra, 《金七十论》) and the Descartes table. The cut would remove about 2,500 characters, and the official outcomes would still be met.
4. **Descartes comparison.** The working outline had none; the official outcomes require one. It is done as above.
5. **Prerequisites and links.** IN1 is recommended; IN6 is helpful. The manuscript refers back to IN1 (Upaniṣadic "knower of knowing", Uddālaka's clay, the *Anattalakkhaṇa Sutta*), IN3/IN4 (Buddhist positions, Vasubandhu) and IN6 (Vedānta's criticism). Forward links to EA2 (Descartes and Elisabeth) and to S-courses on mind are named only as "将在……中读到", without course codes.

## 2. Primary arguments

| Part | Argument presented | How it is framed |
|---|---|---|
| 导读 | Ordinary remedies remove suffering neither completely nor permanently, so a different kind of knowledge is needed | SK 1–2 in the original |
| 一 | The manifest world is caused, many, active, made of parts, dependent; its source is the reverse; *puruṣa* is neither | SK 10–11 table; the table says which features are shared |
| 一 | The three *guṇa*s as types of constituent (illumination, activity, restraint), inseparable and in varying proportion | SK 12–13; Gauḍapāda's lamp example attributed to him; "这不是物理学" caveat |
| 二 | *satkāryavāda*: the effect pre-exists in the cause | SK 9, five reasons; 5-step reconstruction; Gauḍapāda's sand/oil and curd examples |
| 二 | There must be one unmanifest source | SK 15–16 |
| 三 | *puruṣa* exists: compounds serve another; there must be a controller, an experiencer, a subject of liberation | SK 17; reconstruction, with the weakest step (assembly → "for another") marked |
| 三 | *puruṣa* is many: separate birth, death and faculties | SK 18; the reconstruction notes the cost (puruṣa-level difference without puruṣa-level properties) |
| 三 | Liberation without action: *puruṣa* was never bound; *prakṛti* stops once seen | SK 59, 62, 64; dancer and audience; potter's wheel (SK 67) |
| 四 | Yoga is the cessation of mental activity; then the seer rests in itself | YS 1.2–1.3; bhāṣya 1.1 on five levels of mind |
| 四 | Suffering has a cause (ignorance → *kleśa*s) and a remedy (discriminating knowledge), in a fourfold structure | YS 2.3–2.6, 2.15–2.20; bhāṣya 2.15 |
| 四 | Consciousness of an object cannot be reduced to the object | YS 4.15–4.16; the target (Vasubandhu-type idealism) marked as bhāṣya's identification |
| 五 | Unconscious *prakṛti* cannot act for a purpose: milk, too, flows for the calf only because a conscious cow is there | SK 57 vs BS 2.2.3 + BSBh, [有文献的直接批评]; the Sāṃkhya reply tagged [本章的重建] |
| 五 | Two utterly different principles cannot interact | Interaction problem, [学派层面的整理]; Elisabeth 1643 as a structural parallel only |

## 3. Source verification

- **Sanskrit.** 12 GRETIL plaintext files were read on 2026-11-09; they are listed per file in the manuscript appendix. 9 are quoted or used for numbering; 3 (Māṭharavṛtti, Jayamaṅgalā, Yuktidīpikā) were read but not quoted.
  - All quotations were compared by script (`vq.py`) against the files, ignoring only spaces, punctuation, hyphens, digits and case.
  - Re-run on the final file: 66 checked, 3 flags, none a real mismatch:
    - **SK 24** *abhimāno 'haṃkāras*: the e-text writes avagraha as ".a". Note 1 explains the notation.
    - **KaU 3.11** *puruṣān*: the e-text has the typo *puruśān*. Note 81 records it.
    - The IEP article title "Yoga (Patañjali)", which is not a quotation.
- **E-text forms kept and explained.**
  - *tailotpattis* (sandhi as in the e-text; note 20).
  - *karteva*: the `^` mark and the G variant *'pi* are noted in note 37.
- **Commentary vs root text.** Several glosses that an earlier draft had placed in the *kārikā*s are now attributed to Gauḍapāda, with notes 28–30: the lamp, *salilavat*, *taijasa* and animal sacrifice.
- **Removed or softened during drafting because they could not be verified:**
  - Maas's dating of the Yoga-śāstra. His unitary-work claim is mentioned as reported, but his book was not read and no date is given.
  - "Most scholars reject identifying Patañjali with the grammarian": replaced by what Bryant's IEP article actually says.
  - "4.16 is commentary in some editions": replaced by a general note on sūtra division (notes 69, 72).
  - "二十多条" on *yama/niyama*: counted, now 16 sūtras (2.30–2.45).
  - "南朝陈代" for Paramārtha: now "6th century".
  - The claim that 神我 / 自性 came from 《金七十论》: removed.
  - A claim about the "decline" of Sāṃkhya: removed.
- **Paraphrase only.** Śāntarakṣita's TS (the e-text is word-analytic). The verse numbers are the e-text's own.
- **Not available.** *Tattvasamāsa* and *Sāṃkhyasūtra* (no GRETIL file found); Vācaspati's *Tattvakaumudī* and Vijñānabhikṣu (known only through IEP).
- **Material types kept distinct** (reading-guide table): primary text; commentary; opponents' records (Śaṅkara, Śāntarakṣita); modern interpretation (IEP Ruzsa, IEP Bryant); course reconstruction (tagged).
- **Dates.** Every date in the figures table is sourced. Where IEP's two articles differ (SK about 350 vs 4th–5th century), both are given.
- **No modern copyrighted translation** was consulted or reproduced.

## 4. Translation and terminology choices

| Term | Course rendering | Note |
|---|---|---|
| puruṣa | 神我 | Traditional Chinese rendering; glossed at first use as the conscious principle, and the table "神我不是'自我'" prevents reading it as ego. IN6 was changed in Phase 17A to use the same term |
| prakṛti / mūlaprakṛti / pradhāna | 原质 / 根本原质 / 根本因 | Shared with IN6 |
| vyakta / avyakta / jña | 显现者 / 未显现者 / 知者 | |
| tattva; guṇa | 谛；德 | |
| sattva / rajas / tamas | 萨埵 / 罗阇 / 多摩 | Transliterated, not translated as "goodness / passion / darkness", to avoid moral reading |
| mahat / buddhi; ahaṃkāra; manas | 大 / 觉；我慢；意 | |
| tanmātra; bhūta; indriya; liṅga | 唯；五大；根；细身 | |
| satkāryavāda; pariṇāma; saṃyoga; kaivalya | "果在因中"说；转变；结合；独存 | |
| citta; vṛtti; nirodha; samādhi | 心；活动；止息；三摩地 | |
| kleśa; avidyā; asmitā | 烦恼；无明；我执 | |
| Īśvara | 自在者 | Not 自在天, which suggests the Śaiva deity |
| aṣṭāṅga | 八支：禁制、劝制、坐法、调息、制感、执持、静虑、三摩地 | |
| saṃyama; vivekakhyāti | 总制；分辨的认识 | |
| Persons | 自在黑、帕坦伽利、毗耶娑、迦毗罗、阿修利、般遮尸诃、乔荼波陀、识比丘、婆者斯钵底、博阇王、真谛 | |
| Books | 《数论颂》《数论颂注》《六十科论》《道理灯论》《瑜伽经》《瑜伽经注》《帕坦伽利瑜伽论》《数论真理月光》《金七十论》 | |

**Consistency notes.**
- **Shared with IN6:** 神我, 原质 and 根本因 are now used identically. 自身 (ātman) and 无明 are used as in IN1 and IN6. 乔荼波陀 is used for both Gauḍapādas (the commentator and the author of the *Āgamaśāstra*). The manuscript cites IEP for the usual view that they are different people, and IN6 says the same.
- **avidyā:** rendered 无明 in both IN6 and IN7, although the two schools give it different content. Both manuscripts say so where it matters.

## 5. Critiques & Responses assessment

**Included (about 2,200 characters), five items:**

| C&R item | Critique | Source of criticism | Response basis |
|---|---|---|---|
| 一 | How do *puruṣa* and *prakṛti* interact? | Śaṅkara, BSBh 2.2.3 and 2.2.7 [直接]; Śāntarakṣita, TS 285–295 (paraphrase) [直接] | Reflection theory via IEP [学派]; *saṃyoga* as presence rather than causation [重建]. Assessment: the problem is relocated to the mind, and any non-reductive theory of consciousness faces a similar one |
| 二 | Why are there many *puruṣa*s? | Advaita (one self; differences from limiting conditions) [学派]; the internal problem of propertyless plurality, also noted by IEP [重建] | SK 18 with Gauḍapāda's gloss [学派]. Assessment: many minds might explain privacy without many *puruṣa*s; Larson's epistemic reading (via IEP) moves away from the letter of the text |
| 三 | Are the *guṇa*s an explanation or a classification? | [重建] | [重建], using SK 16. Assessment: a descriptive framework, which science can neither confirm nor refute |
| 四 | If *puruṣa* was never bound, what is practice for? | SK 62 [重建]; Śāntarakṣita, TS 23–25 (paraphrase) [直接] | SK 62: what is bound and freed is *prakṛti* (mind and subtle body) [学派]; YS book 2. Assessment: links to IN6's "who is ignorant?" |
| 五 | Which is stronger, the Buddhist or the Vedānta criticism? | Comparison [学派] | Two pressure points (unconscious cause of order; unchanging experiencer); reflection theory as a choice between them; left to the reader |

Each item ends with an assessment that names what remains open. No contested position is presented as refuted. The C&R does not repeat Part 五's documented exchanges in full; it refers to them.

## 6. Interactive proposals (proposals only; nothing built)

The **shared rules** are the same as in the IN6 report §6 (verified passages only; basis tag on every card; limits panel; table fallback; existing UI tokens; no new infrastructure). Every anchor below was confirmed to occur exactly once in `content/IN7_SAMPLE_DRAFT.md`.

**Recommended set: A and C.**
- **A** turns the required 25-tattva diagram into something learners can trace.
- **C** addresses the most common misunderstanding: that *puruṣa* is the thinking "I".
- **D** is optional, and only with the *āsana* caveat built in.
- **B** is not recommended in slider form.
- **E** is optional at most.

### A. 二十五谛探索器 (Twenty-Five Tattvas Explorer) — recommended

- **Placement:** Part 二, "### 二十五谛的生成次序" (the `text` tree and the table "| 编号 | 名称 | 梵文 | …"). The static tree and table remain as the no-JavaScript fallback.
- **Objective:**
  - see the order of emergence;
  - see which items are "evolvent" vs "evolute" (SK 3);
  - see that *puruṣa* is outside the series.
- **Content:** the 25 rows of the manuscript table. For each node: name, Sanskrit, SK verse, and one line from the manuscript. The three branches from *ahaṃkāra* carry the SK 25 labels (*vaikṛta*, *taijasa*, *bhūtādi*). The *taijasa* role is labelled "据乔荼波陀注".
- **Visual:** a top-down tree. *mūlaprakṛti* is at the root and the 24 evolutes descend from it. *puruṣa* is drawn as a separate, unconnected node at the side, styled differently. A "SK 3 视图" colours each node by one of four categories (source only / both / evolute only / neither).
- **Learner actions:**
  1. Click a node to see its card.
  2. Switch to the SK 3 view.
  3. In "predict" mode, place the 16 "evolute-only" items before revealing them.
- **Feedback:** wrong placements cite SK 3 or SK 22–25 in the original, with 本章试译.
- **Historical limitations:** a fixed panel says:
  - cosmogonic vs microcosmic readings (Ruzsa): the tree does not decide between them;
  - the *tanmātra*–*bhūta* correspondence is uncertain (open question 4);
  - "this is not biological evolution".
- **Implementation:** an SVG tree from static data with fixed coordinates; no graph library.
- **Mobile:** collapsible outline (an indented list with expand/collapse) instead of the SVG; same data.
- **Keyboard:** `role="tree"` / `treeitem`, with arrow-key navigation and Enter to open a card. The *puruṣa* node is reachable as the last item.

### B. 三德实验室 (Three Guṇas Laboratory) — not recommended as sliders

- **Placement, if built:** Part 一, "### 三德".
- **Why not as proposed:** a three-slider mixer implies measurable quantities and a chemistry. The manuscript explicitly warns against both ("这不是物理学").
- **Acceptable minimal version:** a card set. Each of SK 12–13's functions (*prakāśa*, *pravṛtti*, *niyama*) is shown with Gauḍapāda's lamp example, labelled as his, with no numeric controls. It is low value over the existing table.

### C. 神我—原质区分工作坊 (Puruṣa–Prakṛti Distinction Workshop) — recommended

- **Placement:** Part 三, "### 神我不是"自我"" (table "| | 神我（puruṣa） | 我慢 …"), with a later step at "### 一个比较：数论与笛卡尔". It also links back to "### 显现者、未显现者、知者" and "### 见证者：神我不做什么".
- **Objective:**
  - see that deciding, the sense of "I" and "mine", and emotion all belong to *prakṛti* (*buddhi*, *ahaṃkāra*);
  - see that *puruṣa* only "sees";
  - then see why this differs from Descartes' thinking substance.
- **Content:**
  - about 10 statements ("我在思考" / "我觉得这是我的" / "我决定" / "我感到沮丧" / "有一个看着这一切的意识" …), each assignable to *puruṣa*, *ahaṃkāra* or *buddhi*, the three columns of the manuscript's table;
  - the correct assignment in each case comes from SK 19–20, 23 or 24 as quoted in the manuscript, and the table rows;
  - a final step shows the Descartes table.
- **Visual:** three bins with statement cards.
- **Learner actions:**
  1. Assign the cards.
  2. Reveal.
  3. Open the Descartes step.
- **Feedback:**
  - Every wrong placement in the *puruṣa* bin shows SK 19–20 ("the witness… not an agent") and explains that it is the commonest confusion.
  - The Descartes step states the contrast: for Descartes, thinking is the mind's essence; for Sāṃkhya, thinking is material.
- **Historical limitations:**
  - SK 20 ("as if an agent") is shown in full;
  - the Ruzsa note that *puruṣa*'s immutability may be a later understanding is labelled 学者解释;
  - Descartes is labelled "将在《近代早期理性主义与新科学》中读到".
- **Implementation:** a tap-to-assign state machine shared with IN6-B if both are built.
- **Mobile:** the bins are a segmented control above a single card.
- **Keyboard:** select a card, then press 1–3 or Enter on a bin; results are announced via `aria-live`.

### D. 八支瑜伽学习图 (Eight-Limbed Yoga Learning Map) — optional

- **Placement:** Part 四, "### 八支" (table "| 支 | 梵文 | …"), with "### "坐法"不是现代体式" as a mandatory panel.
- **Objective:**
  - see the eight limbs as outer (1–5) and inner (6–8);
  - see that *saṃyama* is the last three together;
  - see the textual weight (16 sūtras on *yama/niyama* against 3 on *āsana*).
- **Visual:** eight segments along a path, with the width of each segment proportional to the number of sūtras devoted to it. This is a factual count, labelled as such.
- **Learner actions:**
  1. Open each limb (sūtra and 本章试译).
  2. Answer one predict question: which limb gets the most text?
- **Feedback:** reveals the count and the bhāṣya's list of seated postures (2.46).
- **Limitations:** the map must not suggest a linear "level-up" progression; the manuscript's caveat on this is shown. This is why the component is only optional: the table already conveys most of it.
- **Implementation:** CSS flex segments with static data.
- **Mobile:** vertical list.
- **Keyboard:** each segment is a button with `aria-expanded`.

### E. 束缚与解脱论证探索器 (Bondage and Liberation Argument Explorer) — optional at most

- **Placement, if built:** Part 三, "### 舞女与观众：解脱是怎样发生的？", and C&R "### 四、如果神我从未被束缚，修习还有什么意义？".
- **Assessment:** the puzzle ("who is bound, who is freed?") is real, but it rests on three verses (SK 62, 64, 66) and one C&R item, which the prose handles well.
- **Minimal approach:** a three-step reveal (SK 62 → SK 64 → SK 66) with the objection card. Build it only if the PO wants a second component in Part 三.

## 7. Full practice data

- **Count:** 6 sets × 3 = 18 questions, labelled 一 to 六 to match the six 想一想 blocks.
- **Placement:**

| Set | Placement |
|---|---|
| 一 | End of Part 一 |
| 二 | End of Part 二 |
| 三 | Part 三, after the "神我不是自我" debate |
| 四 | End of Part 三 (Descartes) |
| 五 | End of Part 四 |
| 六 | End of Part 五 |

- **Types:** 7 single, 4 multi, 5 tf, 2 view.
- **Single-answer positions:** A 1, B 2, C 2, D 2.
- **tf answers:** 2 true, 3 false.
- **Multi answers:** B-C-D (in7-1-2), A-C (in7-3-2), A-C-D (in7-5-2), C-D (in7-6-2).
- **Contested positions** are given as `view` questions, with no option marked right:
  - in7-2-3: cosmogonic or microcosmic reading of the evolution;
  - in7-4-1: whether the Descartes comparison clarifies or distorts.
- **IDs:** `in7-{set}-{question}`.
- **Compatibility:**
  - typechecked with `tsc --strict` against a byte-identical copy of `src/content/practice.ts`: 0 errors;
  - the check script confirms at most 3 per set, unique IDs, valid answers, and a note on every option.
- **Not wired in.** Full data in Appendix A.

## 8. Historical image shortlist (metadata only; nothing downloaded)

Metadata was read from the Wellcome Collection catalogue API and the Wikimedia Commons API on 2026-11-09. No file was downloaded. Rights are given as stated by the source; anything not confirmed at the holding institution is marked **unverified**.

| # | Identity | Dating | Institution | URL | Rights (as stated) | Attribution | Placement | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | "A maharishi (Patañjali?) … with the tail of a serpent or fish", gouache | [between 1800 and 1899?] (catalogue's own uncertainty) | Wellcome Collection, London; 581804i | [wellcomecollection.org/works/g6bec8hq](https://wellcomecollection.org/works/g6bec8hq) (also Commons File:Patanjali Painting.jpg) | Public Domain Mark (Wellcome record, verified) | "Wellcome Collection. Public Domain Mark" | Part 四, "### 《瑜伽经》与它的注释" | **Best IN7 candidate.** Shows the later half-serpent iconography associated with Patañjali; the catalogue itself is unsure of the identification. The caption must keep the catalogue's question mark and say that this is later iconography, not a portrait |
| 2 | "Two yogis, one meditating, the other performing a fire ritual", gouache | ca. 1840; attributed to a painter from Tanjore (Thanjavur) | Wellcome Collection; 28663i | [wellcomecollection.org/works/ggyemfjm](https://wellcomecollection.org/works/ggyemfjm) | Public Domain Mark (Wellcome record, verified) | "Wellcome Collection. Public Domain Mark" | Part 四, "### "坐法"不是现代体式" | Shows a 19th-century seated meditation posture next to ritual practice. The caption must not present it as illustrating Patañjali's text |
| 3 | Kapila, Company School watercolour | early 19th century (per Commons) | British Museum, 1880,0.2068 (per Commons). **Unverified at the museum**: the BM page returned 403 to automated access | [File:Kapila.jpg](https://commons.wikimedia.org/wiki/File:Kapila.jpg) | Commons: PD-Art. BM reproduction terms **unverified** | Pending the BM record | 导读, reading-guide table (legendary lineage) | Use only after checking the BM record by hand. The caption must say that Kapila is a legendary founder |

- **Not shortlisted:**
  - manuscript photographs of *Yogasūtra*-with-*bhāṣya* pages on Commons (CC BY-SA 4.0, photographer "Ms Sarah Welch"): the holding institution and shelfmark are not given, so the object cannot be identified;
  - modern yoga photographs (wrong period, and they reinforce the *āsana* misreading);
  - The Met: no relevant open-access object found.
- **Recommendation:** use 1, and optionally 2, from Wellcome, whose rights are verified at the source. Hold 3 until the BM record is checked. Record any image used in SOURCES.md, with an on-page credit.

## 9. Rights and textual uncertainties

The full list of eleven items is in the manuscript appendix. The most important for review:

1. **GRETIL licence.** All 12 files carry CC BY-NC-SA 4.0 in the 2020 header. The NC/SA question is shared with IN2–IN6 and is still open.
2. **SK e-text: Ruzsa's 1998 notice.** It allows free copying for scholarly purposes but requires a separate agreement for any sale or for-profit collection. It sits alongside the GRETIL CC licence. **PO or legal decision needed** if the site has any commercial aspect. The manuscript quotes only the verses (public domain), not the e-text's arrangement.
3. **KaU e-text.** It is based on Olivelle 1998, a copyrighted edition. Only one verse of the ancient text is quoted.
4. **Unproofread Sansknet files** (BS, BSBh): a printed-edition check is needed for the BS 2.2.3 quotations.
5. **Dates** of SK and YS: the two IEP articles differ, and both are given.
6. **Maas's unitary-work thesis** (YS and bhāṣya by one author): reported, not read.
7. **Is *puruṣa* absolutely immutable?** Ruzsa suggests this may be a later, Vedānta-influenced understanding. The manuscript uses the usual reading and notes the debate.
8. **Tanmātra–bhūta correspondence**, and whether *tanmātra*s are elements or sense-qualities.
9. **TS verse numbering and targets** (as in IN6).
10. **KaU and ŚvU Sāṃkhya terms**, and the referent of *kapila* in ŚvU 5.2.
11. **SK 64 and the *Anattalakkhaṇa Sutta*:** formal similarity; borrowing is not claimed.

## 10. Cross-course boundaries

| Course | Boundary kept |
|---|---|
| IN1 (early thought) | Not re-taught: the Upaniṣadic "knower", Uddālaka's clay, the *Anattalakkhaṇa Sutta*. IN7 refers back and adds only the KaU and ŚvU Sāṃkhya passages |
| IN3 / IN4 (Buddhism) | Not re-taught. IN7 reads YS 4.15–4.16 against a Vasubandhu-type position (bhāṣya's identification) and paraphrases Śāntarakṣita |
| IN6 (Vedānta) | IN6 gave Vedānta's criticism of Sāṃkhya (BS 1.1.5, 2.2.1, 2.2.7, 2.1.3). IN7 gives the Sāṃkhya side and adds BS 2.2.3 with SK 57, so the milk argument is read only here. The shared terms (神我 / 原质 / 根本因) are aligned |
| EA2 (Descartes) | Comparison table and Elisabeth 1643 only, labelled "将在……中读到"; Descartes' texts are not quoted |
| Medicine / dharmaśāstra | Background paragraph only, no sources quoted |
| Modern postural yoga | Explicitly out of scope; the *āsana* section exists to prevent the conflation |

## 11. Integration readiness

- **Ready for PO reading and expert review.** The manuscript is complete; the quotations are script-verified; notes and appendix are complete; the practice data compiles.
- **Not ready for publication.** Still needed:
  - expert review (especially Parts 三 and 四);
  - the Ruzsa 1998 notice and GRETIL NC/SA decisions;
  - a printed-edition check of the Sansknet BS quotations;
  - a renderer check of the `text` code block (the tattva tree) in the course page, since it is the only code block in any course manuscript so far;
  - image verification (BM item);
  - a decision on whether an Extended course should be shortened (§1, discrepancy 3).
- **If Phase 17B is approved:**
  - add `practice-in7.ts` from Appendix A;
  - build component A (tree with table fallback) and C if selected;
  - record images in SOURCES.md.

  Work stopped after the four Phase 17A files, as instructed.
- **Format checks done:**
  - **Line endings:** CRLF only: 1,036 CRLF, 0 bare LF.
  - **Footnotes:** 85 references, each with exactly one definition, in order of first appearance. All in-note cross-references resolve.
  - **Practice anchors:** 6 想一想 blocks.
  - **Markdown render:** parsed with the project's own `marked` into 10 h2, 41 h3, 15 tables, 57 blockquotes and 1 code block, with no raw-pipe paragraphs.
  - **Tables:** the column lint found 0 mismatched rows.
  - **Media anchors:** all anchors named in §6 occur exactly once.

## Appendix A. Practice data (draft `practice-in7.ts`)

Typechecked with `tsc --strict` against a byte-identical copy of `src/content/practice.ts`; not added to the repository.

```ts
import type { PracticeSet } from './practice';

// 《意识、物质与修行：数论与瑜伽派》· 想一想 as selection questions.
// Each set follows its exercise in content/IN7_SAMPLE_DRAFT.md (labels 一 to 六).
// Phase 17A proposal: kept in scratch, not integrated into the site.
export const IN7_PRACTICE: PracticeSet[] = [
  {
    label: '一',
    lede: '原题问你：在数论的分类里，"我觉得很沮丧"这件事属于哪一边？',
    questions: [
      {
        id: 'in7-1-1', type: 'single',
        stem: '按照《数论颂》第 3 颂，"大"（觉）、我慢和五唯属于哪一类？',
        options: [
          { id: 'a', text: '只是原质：能生出别的东西，自己不是被生出来的。', note: '这一类只有根本原质一个。' },
          { id: 'b', text: '只是变异：是被生出来的，自己不能生出别的东西。', note: '这一类是十六个：意、十根和五大。' },
          { id: 'c', text: '既是原质又是变异：自己是被生出来的，又能生出别的东西。', note: '对。它们是"以“大”为首的七个"。' },
          { id: 'd', text: '既不是原质也不是变异。', note: '这一类只有神我。' },
        ],
        answer: 'c',
      },
      {
        id: 'in7-1-2', type: 'multi',
        stem: '按照第 10、11 颂，下面哪些性质是"显现者"与"根本原质"共有的？（可多选）',
        options: [
          { id: 'a', text: '有原因。', note: '显现者有原因，根本原质没有原因；这是两者"相反"的地方。' },
          { id: 'b', text: '由三德构成。', note: '对。第 11 颂说，显现者如此，根本因也如此。' },
          { id: 'c', text: '没有意识。', note: '对。只有神我有意识。' },
          { id: 'd', text: '能生出别的东西。', note: '对。神我在这一点上与两者都相反。' },
        ],
        answer: ['b', 'c', 'd'],
      },
      {
        id: 'in7-1-3', type: 'tf',
        stem: '在数论看来，判断、"我"的感觉和情绪，本身都是没有意识的原质的活动。',
        answer: true,
        wrong: '这句话是对的。"大"、我慢和意都属于原质；它们只是因为与神我结合，才"好像有意识"（第 20 颂）。',
      },
    ],
  },
  {
    label: '二',
    lede: '原题问你：数论为什么让"大"（觉）先于五大出现？请回到"果在因中"说。',
    questions: [
      {
        id: 'in7-2-1', type: 'single',
        stem: '乔荼波陀为第 9 颂的第一条理由（不存在的东西不能被造出）举了什么例子？',
        options: [
          { id: 'a', text: '陶工只能造罐子，不能造首饰。', note: '这个例子说明的是第四条理由（有能力的原因只造出它能造出的东西），而且出自 IEP 的概括。' },
          { id: 'b', text: '从沙子里榨不出油来。', note: '对。在这个世界上，没有造出不存在的东西这回事。' },
          { id: 'c', text: '想要酸奶的人取牛奶，不取水。', note: '这是他为第二条理由（人们要选取质料）举的例子。' },
          { id: 'd', text: '同样的水，在山顶是冰，在溪里是流水。', note: '这是 IEP 为第 16 颂举的例子，说明三德因所依而不同。' },
        ],
        answer: 'b',
      },
      {
        id: 'in7-2-2', type: 'tf',
        stem: '数论的二十五谛生成次序，是古代印度对生物进化论的一种预见。',
        answer: false,
        wrong: '不是。数论的次序从心智（"大"）到物质元素，与从物质到心智的现代图景相反；它由神我的目的推动，由推理和传承得到，不是由观察得到的。两者只是都可以用"演化"一词来翻译。',
      },
      {
        id: 'in7-2-3', type: 'view',
        stem: '"果在因中"说常被反驳：如果罐子已经在泥土里，为什么我们看不见它？你认为数论怎样回答最好？',
        options: [
          { id: 'a', text: '罐子在泥土中是"未显现的"，制陶只是使它"显现"。', note: '优点：这是注释家们的一般说法。代价：寂护会追问，这个"显现"在产生之前存在不存在？无论怎样回答，都会遇到困难。' },
          { id: 'b', text: '这个理论说的不是"罐子已经在那里"，而是"结果中没有任何东西是绝对新的，一切都已由原因决定"。', note: '优点：避免了字面理解的荒谬，这是 IEP 条目提出的理解。代价：它离开了注释家的字面说法，而且"决定"一词本身还需要说明。' },
          { id: 'c', text: '数论无法回答，应当接受正理派的"结果在产生之前不存在"。', note: '优点：直接。代价：正理派也要回答第 9 颂的问题：为什么油只能从芝麻里榨出，而不能从沙子里榨出？' },
        ],
      },
    ],
  },
  {
    label: '三',
    lede: '原题问你：数论为什么认为"我在思考"这个说法，严格地说是错的？',
    questions: [
      {
        id: 'in7-3-1', type: 'single',
        stem: '在数论中，与日常所说的"我"的感觉、占有感最接近的是哪一项？',
        options: [
          { id: 'a', text: '神我。', note: '神我什么也不做，只是"看"；把它理解为心理上的"我"，正是本章要纠正的误解。' },
          { id: 'b', text: '根本原质。', note: '根本原质是未显现的根源，不是"我"的感觉。' },
          { id: 'c', text: '五唯。', note: '五唯是声、触、色、味、香这样的对象，与"我"的感觉无关。' },
          { id: 'd', text: '我慢：它就是"认作是我的"。', note: '对。我慢属于原质，本身没有意识（第 24 颂）。' },
        ],
        answer: 'd',
      },
      {
        id: 'in7-3-2', type: 'multi',
        stem: '下面哪些说法符合《数论颂》第 19、20 颂？（可多选）',
        options: [
          { id: 'a', text: '神我是见证者、观看者，不是行为者。', note: '对。这是第 19 颂列出的特征。' },
          { id: 'b', text: '神我推动心智去思考，就像车夫驾驭马车。', note: '车夫的例子出自乔荼波陀对第 17 颂"主管者"的注释；第 19 颂明确说神我不是行为者。' },
          { id: 'c', text: '没有意识的细身，因为与神我结合而好像有意识。', note: '对。这是第 20 颂的前半。' },
          { id: 'd', text: '行为者是三德，神我只是好像在思考，但实际上也在一起思考。', note: '第 20 颂说，神我"好像是行为者"；"好像"正是要否认它真的在行动。' },
        ],
        answer: ['a', 'c'],
      },
      {
        id: 'in7-3-3', type: 'tf',
        stem: '据 IEP 的数论条目，"神我绝对不变"这一理解本身有争议：条目作者认为，这可能是后来在吠檀多的影响下形成的，而《数论颂》的神我似乎会"看见"、会"受苦"。',
        answer: true,
        wrong: '这句话是对的。条目作者也指出，许多现代学者把神我理解为严格不变的；本章正文采用通行的理解，同时提醒读者这一理解有争议。',
      },
    ],
  },
  {
    label: '四',
    lede: '原题问你：笛卡尔的"我思"能不能被数论接受？请想一想数论会怎样分析"我在怀疑"。',
    questions: [
      {
        id: 'in7-4-1', type: 'view',
        stem: '笛卡尔把一切思维放在心灵一边；数论把思维放在原质一边，只把纯粹的"看"留给神我。你认为哪一种划界更合理？',
        options: [
          { id: 'a', text: '笛卡尔的划界：思考、怀疑和意愿显然是有意识的，把它们放在物质一边说不通。', note: '优点：符合我们对自己思维的直接体验。代价：要回答一个不占空间的心灵怎样推动物体（伊丽莎白公主的问题）。' },
          { id: 'b', text: '数论的划界：思维内容可以被"看见"、会变化，看见它们的意识却不同于它们。', note: '优点：避免了心灵推动身体的问题，因为推动身体的心智与身体同属原质。代价：要回答一个什么也不做的意识怎样"看见"，没有意识的心智怎样"好像有意识"。' },
          { id: 'c', text: '两种划界都有问题；困难只是从一个地方移到了另一个地方。', note: '优点：看到了两者共同的结构：只要认为意识不能还原为物质，就会遇到某种交互问题。代价：如果停在这里，还需要说明有没有第三种划界。' },
        ],
      },
      {
        id: 'in7-4-2', type: 'single',
        stem: '《数论颂》第 64 颂与《无我相经》在形式上很相似。两者最重要的差别是什么？',
        options: [
          { id: 'a', text: '佛教把"识"也放进被否定的五蕴；数论保留神我，被否定的是心智的活动。', note: '对。所以佛教可以说数论的否定"不够彻底"，数论也可以说佛教混淆了意识与它的内容。' },
          { id: 'b', text: '佛教否定身体，数论肯定身体是"我的"。', note: '数论的修习结果正是认识到"没有什么是我的"，身体也不例外（乔荼波陀的注释）。' },
          { id: 'c', text: '两者完全相同，只是用语不同。', note: '否定之后剩下什么，两者的回答截然不同。' },
          { id: 'd', text: '数论的说法是从佛教借来的。', note: '形式相似是否出于借用、借用方向如何，本章不作判断。' },
        ],
        answer: 'a',
      },
      {
        id: 'in7-4-3', type: 'tf',
        stem: '在《数论颂》中，在轮回中从一个身体转到另一个身体的，是神我。',
        answer: false,
        wrong: '不是。轮回的是"细身"，即从"大"到五唯的十八个（第 40—42 颂），它像演员换衣服一样出现在不同的身体中。神我从不轮回，它只是"看"；第 62 颂甚至说，没有谁在轮回，在轮回的是原质。',
      },
    ],
  },
  {
    label: '五',
    lede: '原题问你：如果神我从来没有被束缚过，瑜伽的修习还有什么意义？',
    questions: [
      {
        id: 'in7-5-1', type: 'single',
        stem: '《瑜伽经》1.2 怎样定义瑜伽？',
        options: [
          { id: 'a', text: '一系列使身体柔软健康的姿势。', note: '坐法只是八支之一，而且指稳定舒适的坐姿；这不是瑜伽的定义。' },
          { id: 'b', text: '与梵合一。', note: '《瑜伽经》的目标是神我的独存，不是与梵合一；那是吠檀多的说法。' },
          { id: 'c', text: '心的活动的止息。', note: '对。止息时，观看者安住于自己的本性（1.3）。' },
          { id: 'd', text: '用正确的想法代替错误的想法。', note: '"正确的认识"本身也是要止息的五种活动之一（1.6）。' },
        ],
        answer: 'c',
      },
      {
        id: 'in7-5-2', type: 'multi',
        stem: '下面哪些说法符合本章对《瑜伽经》与《数论颂》的比较？（可多选）',
        options: [
          { id: 'a', text: '《瑜伽经》提到自在者，《数论颂》全文没有提到。', note: '对。' },
          { id: 'b', text: '《瑜伽经》的自在者是创造世界的第二十六谛。', note: '经文说自在者是"一种特殊的神我"，没有说它创造了世界。' },
          { id: 'c', text: '两者都以分辨的认识为解脱的直接原因，但《瑜伽经》强调要通过修习使心止息，这种认识才能稳定地生起。', note: '对。见第 64 颂与《瑜伽经》2.26。' },
          { id: 'd', text: '两者都认为神我是众多的。', note: '对。见第 18 颂与《瑜伽经》2.22。' },
        ],
        answer: ['a', 'c', 'd'],
      },
      {
        id: 'in7-5-3', type: 'tf',
        stem: '《瑜伽经注》在解释"坐法"时，列举了站立、倒立和伸展等各种身体姿势。',
        answer: false,
        wrong: '不是。注释列举的莲花坐、吉祥坐、杖坐等都是坐姿，最后一项是"随意坐"；经文本身只说"坐法是稳定而舒适的"（2.46）。IEP 的瑜伽条目也指出，把瑜伽主要理解为身体姿势是现代的现象。',
      },
    ],
  },
  {
    label: '六',
    lede: '原题问你：对寂护的两难（"如果不变，就不能享受；如果能享受，就不是恒常的"），数论者可以怎样回答？',
    questions: [
      {
        id: 'in7-6-1', type: 'single',
        stem: '数论用"乳汁为了小牛而流出"说明没有意识的原质也能有目的地活动。商羯罗怎样反驳这个例子？',
        options: [
          { id: 'a', text: '乳汁其实是有意识的。', note: '商羯罗没有这样说；他指出的是例子中另有有意识的东西。' },
          { id: 'b', text: '是有意识的母牛出于爱使乳汁流出，乳汁也是被小牛的吮吸吸引出来的。', note: '对（《梵经注》2.2.3）。所以这个例子不能证明没有意识的东西能自己有目的地活动。' },
          { id: 'c', text: '小牛并不需要乳汁。', note: '这与他的反驳无关。' },
          { id: 'd', text: '经典中没有这个例子。', note: '这个例子出自《数论颂》第 57 颂，《梵经》2.2.3 本身就提到了"乳汁或水"。' },
        ],
        answer: 'b',
      },
      {
        id: 'in7-6-2', type: 'multi',
        stem: '本章怎样看待"冥想的体验证明了神我的存在"这一说法？（可多选）',
        options: [
          { id: 'a', text: '它证明了数论是唯一正确的学派。', note: '本章的看法正好相反。' },
          { id: 'b', text: '冥想体验是《数论颂》论证神我存在的主要依据。', note: '不对。《数论颂》用推理论证神我（第 17 颂的五条理由）；直接认识神我与心智的区别，是《瑜伽经》之内的主张（3.35）。' },
          { id: 'c', text: '同样的专注体验，被佛教解释为"无我"，被不二论解释为唯一意识的显现。', note: '对。体验本身不能决定应当怎样解释。' },
          { id: 'd', text: '这一说法混淆了"体验是否发生"和"体验应当怎样解释"两个问题。', note: '对。现代冥想研究可以研究注意力和情绪的变化，却不能直接回答有没有一个不变的神我。' },
        ],
        answer: ['c', 'd'],
      },
      {
        id: 'in7-6-3', type: 'single',
        stem: '据 IEP 的数论条目，后来的婆者斯钵底和识比丘用什么理论回答"交互问题"？',
        options: [
          { id: 'a', text: '神我创造了原质。', note: '数论始终认为原质与神我都没有原因；神我什么也不生出。' },
          { id: 'b', text: '原质其实也有意识。', note: '这会取消数论的二元论；映像说正是为了保留"原质没有意识"。' },
          { id: 'c', text: '世界只是一场梦。', note: '这不是数论的回答。' },
          { id: 'd', text: '映像说：不变的神我"映"在心智中，心智对映像作出反应，就像镜中的像不改变被照的东西。', note: '对。条目作者认为，这样的数论已经相当接近不二论的"附加"说。' },
        ],
        answer: 'd',
      },
    ],
  },
];
```

# Phase 16B — Integration report: 大乘哲学：中观与瑜伽行派 (IN4) and 权威、语言与义务：弥曼差派 (IN5)

Date: 2026-11-09. Nothing is committed, pushed or deployed. No images were downloaded. IN6 was not started. Existing courses are not rewritten; the only change to another course is the IN2 title reference the spec asked for (§1).

## 1. What is integrated

| | IN4 大乘哲学：中观与瑜伽行派 | IN5 权威、语言与义务：弥曼差派 |
|---|---|---|
| English title | Mahāyāna Philosophy: Madhyamaka and Yogācāra | Authority, Language and Duty: Mīmāṃsā |
| Classification | ● 核心, 印度哲学 · 第 4 门 | ● 核心, 印度哲学 · 第 5 门 |
| Manuscript | `content/IN4_SAMPLE_DRAFT.md`: guide, Parts 一–六, 结语, 后世批判与回应 (9 parts) | `content/IN5_SAMPLE_DRAFT.md`: guide, Parts 一–六, 结语, 后世批判与回应 (9 parts) |
| Notes / appendices | 119 notes; 注释 and 来源与权利说明 (not counted in parts or progress) | 94 notes; 注释 and 来源与权利说明 |
| Tables (rendered) | 25 = 23 in the reading parts + 2 in 来源与权利说明 | 26 = 25 in the reading parts + 1 in 来源与权利说明 |
| 想一想 | 6 | 6 |
| Components | 3 (B, C, D) | 3 (A, C, D) |
| Practice | 6 sets, 18 questions | 6 sets, 18 questions |

- **Complete content.** Neither manuscript was shortened, and no table was dropped. Every markdown table in each file renders: 25 in IN4 and 26 in IN5, matching a count of the manuscripts. The 16A figure of "23 tables" for IN4 counted the reading parts only.
- **Manuscript edits.**
  - IN4: only the status line and the "本稿的性质" paragraph (it now says Phase 16B connected it to the site without changing the text).
  - IN5: the status line, "本稿的性质", and the source closeout in §2.
- **Registry and navigation.**
  - Both courses are in `PUBLISHED` (`courses.ts`) and the catalog (`catalog.ts`), with short names 大乘哲学 / 权威、语言与义务.
  - Both open from 历史与传统 › 印度哲学, and the region page lists them as 打开课程. IN6 onwards still shows 原型未实现.
  - The region's "可阅读的内容" sentence now names 18 courses.
- **Links (from the syllabus; all non-blocking).**
  - IN2 → IN4 and IN3 → IN5 show as 下一门.
  - IN4 and IN5 each show IN6 as 下一门; IN6 is marked 原型未实现 and does not open.
  - IN4 also links to 魏晋玄学与中国佛学 (CN5) as 后续; its cross-tradition links are unreleased and marked so.
  - The "推荐背景" fields say plainly that the background is recommended, not required.
- **IN2 title fix.** The spec mentions "the" IN2 reference, but IN2 had **four** occurrences of 《中观与瑜伽行》 (lines 32, 535, 649, 904). All four now read 《大乘哲学：中观与瑜伽行派》; nothing else in IN2 changed (`git diff` shows exactly those four lines).
- **Core question.** IN4's guide bolds the school name 中观派 before its core question, so the shared parser picked up "中观派". `in4.ts` now takes the bold sentence after "这一章的核心问题是：" verbatim, following CN7's existing override. The parser itself is unchanged. IN5 needed no override.
- **No parser change.** IN4 uses the existing `citedQuotesAreSources`, `authorCites` and `citeNoteRefs` options (as IN3 does), so its three CBETA passages render as source blocks with the label 历史上的翻译：据 CBETA《大正藏》…，字形照录. IN5 uses the default options.
- **Files changed:**
  - `courses.ts`, `catalog.ts`, `media.ts`, `Media.tsx`, `practiceSets.ts`;
  - new `in4.ts`, `in5.ts`, `practice-in4.ts`, `practice-in5.ts`, `ui/media/in4/*` (three components, `shared.tsx`, `in4.css`), `ui/media/in5/*` (three components);
  - content: `IN2_SAMPLE_DRAFT.md` (the title fix), `IN4_SAMPLE_DRAFT.md`, `IN5_SAMPLE_DRAFT.md`, and the two image sheets.
  - No dependency was added; nothing outside these files changed.

## 2. Source closeout (IN5 Parts 三–四 only)

The spec asked for a targeted check of the IN5 quotations from unproofread Sansknet transcriptions. Two printed editions were reachable as archive.org scans. Their OCR text was read by hand alongside the page images where needed:

- **PP:** Śālikanātha, *Prakaraṇapañcikā* with Nārāyaṇa's *Nyāyasiddhi*, ed. A. Subrahmanya Sastri, Banaras Hindu University Darśana Series 4, Varanasi 1961.
- **ŚD:** Pārthasārathi, *Śāstradīpikā* with Rāmakṛṣṇa's *Siddhāntacandrikā* and Somanātha's *Mayūkhamālikā*, ed. Dharmadatta (Bacca Jhā), Bombay: Tukārām Jāvajī (Nirṇaya Sāgara) 1915.

| Passage (IN5 note) | Result | Change |
|---|---|---|
| *Vākyārthamātṛkā* v.6 (40) | Print reads **āvāpoddhāra**; the e-text's "āvāpe-ddhāra" is a typing error | Quotation follows print |
| v.6 autocommentary, the eight sentences (42) | Identical to print, including the second "ḍimbha ?" | Note says so |
| Eye analogy (43) | Identical to print | Note says so |
| *Pramāṇapārāyaṇa* half-verse (54) | Print gives "anubhūtiḥ pramāṇaṃ sā smṛteranyā" at the chapter's opening and "pramāṇamanubhūtiḥ sā smṛteranyā" where it is quoted; the e-text inserts an editor's note | Quotes the second form without the e-text's "…"; the note records both |
| Yellow conch, *vyavahāradaśāyāṃ* (55, 56) | Identical to print (print also writes *visamvāda*) | Notes say so |
| "nayavīthyāṃ nipuṇataram upapāditam" (57) | Confirmed | — |
| ŚD 1.1.2 regress (50) | Print reads **svaviṣaya**; e-text "sivaviṣaya" is a typing error | Quotation follows print |
| ŚD two defeaters (51) | Identical to print | — |
| ŚD dream reply (58) | Print reads *udakāharaṇe 'rtha* | Note records the e-text error and the print reading |
| ŚD human speech (59) | Print confirms *-ābhāvād-* and has *-saṃsparśa-*; whether it reads *śabde 'nāpta-* or *śabdenāpta-* could not be decided from the scan | Both elisions kept; the note says why |
| MS 1.3.33 (35) | Confirmed in the Pohlus Śabara file | — |

- The new appendix paragraph **印本对照（Phase 16B）** names both editions and their scans. It says the check was made against OCR read by hand and that **this does not make the readings critically established.** The per-file GRETIL/CBETA records and the separation of direct evidence from what is known only through Sucarita or SEP are unchanged. Kumārila's *codanā* verse is still not quoted.
- **Not checked against print,** because they fall outside Parts 三–四: the Part 一 *kārya* sentence (note 15), the Nyāyasūtra sūtras and the Ślokavārttika verses. The manuscript says so.
- **Quote checker after the closeout.** The GRETIL-corpus check now flags three readings in IN5: āvāpoddhāra, svaviṣaya and the half-verse. This is expected, because these readings follow the print and no longer match the e-text. Every other flag in IN4 or IN5 is an English title or term, not a quotation.
- No broad licensing investigation was made, and no expert review was requested.

## 3. Components

Each component is anchored after a specific paragraph, saves its state per course (`in4.media.*`, `in5.media.*`), and has a reset. Every claim carries the same basis tags as IN2/IN3 (本课核对过的原文 / 论书或注释传统的整理 / 学者的解释 / 后来的传统 / 本课的重构或举例). Each ends with a "这个演示是什么，不是什么" panel.

A script compared every original-language line (`orig`) and translation (`zh`) in the six components with the manuscripts: **88 of 91 are verbatim.** The other three are deliberate:
- `somena yajeta`, without Śabara's quotative *iti*;
- the ŚD dream sentence and its translation, which give the print reading recorded in note 58.

**IN4**

- **B. Catuṣkoṭi Argument Workshop (二, after 「四句违反逻辑吗？」).**
  - **Three verses.** MMK 1.1, 18.8 and 22.11, each with its four corners. A corner opens to show its claim, its status (who held it, tagged as later attribution), and what follows from it.
  - **Text and reconstruction kept apart.** Only the self-arising corner has a documented reason: Buddhapālita, quoted via the *Prasannapadā*. The other three say that the chapter read no commentator's reasons and give the course's own explanation from MMK 15.
  - **Questions.** "What do the four corners share?" and "Does it follow that nothing arises?" The second is answered from 24.14, 24.18 and the chapter's table of what is and is not denied.
  - **Objections and readings.** The nihilism and self-reference objections, with 24.14 and VV 29. The three modern readings are tagged as general introductions (note 23).
  - It is not a four-option quiz, and emptiness is never glossed as nothing.
- **C. Yogācāra Perception Laboratory (四, after 「还有一点比这张表更重要」).**
  - **Objections and counterexamples.** The four objections of Viṃś v.2 with the counterexamples (dream, pretas, wet dream, hell guards). For each, the reader judges whether it shows "does not require an external object" or "the object does not exist"; only the first is accepted.
  - **What the four answers prove.** The reader is asked what they establish together.
  - **Further arguments.** Parsimony (v.7, SEP's three readings), atoms (v.11–12), perception and time (v.16), waking (v.17) and other streams (v.18), each with "确立了 / 留下了".
  - **The Nyāya realist objection.** NS 4.2.34 and Vātsyāyana, with the C&R's five steps, Vasubandhu's two replies and the "which waking?" evaluation. Labelled as a school-level juxtaposition, not a recorded debate.
  - **Berkeley and Kant.** Comparison rows (no God, no substantial soul). It does not equate Yogācāra with Berkeley or call it solipsism.
- **D. Three Natures and Storehouse Consciousness Explorer (五, after 「接着，寂天回答」).** Three tabs:
  - **藏识.** Seeds, the stream and arhatship in a small diagram (Triṃś 2, 4, 5). A predict-then-compare table against the Upaniṣadic ātman.
    - The "作用" row is marked **问题仍然开放**.
    - The closing claim states that the ālaya is not an eternal soul, while keeping the critic's functional question open.
  - **三自性.** Triṃś 20–21. The conjured elephant (TSN 27–28, authorship flagged as contested). The metaphor's limit and the three non-natures.
  - **识的究竟地位.** The five positions (SEP). MAV 1.2 and BCA 9.17–18 placed in the table. The question is left without a verdict.

**IN5**

- **A. Vedic Injunction Workshop (一, after the śyena table).**
  - **One injunction.** "agnihotraṃ juhuyāt svargakāmaḥ", labelled as Śabara's example whose Vedic source the chapter did not check, split into qualified agent / act / optative.
  - **Questions.** "What does it command?"; Śabara 1.4.1's kinds of sentence, with his two examples; the three śyena questions (Śabara on 1.1.2).
  - **Duty and consequences.** With the Śālikanātha *kārya* sentence.
  - **History and modern labels kept apart.** "Hypothetical imperative", consequentialism and deontology sit behind a separate "现代的对照" control and are tagged as modern labels.
- **C. Sentence Meaning Lab (三, after the Frege paragraph).**
  - **One example, two schools.** *gām ānaya* read step by step by the Bhāṭṭa and the Prābhākara. Śabara 1.1.25 is shown as claimed by both. *lakṣaṇā* appears only as SEP reports it.
  - **Learning words.** The *āvāpa–uddhāra* learning rows (the 把马带来 row is marked as the course's own addition).
  - **The count.** The eight-sentence / seven-word count laid out as a grid, with the print-checked quotation.
  - **Objection and the three conditions.** The infinite-powers objection with the eye analogy. The three conditions, tested on three defective sentences (*agninā siñcati* from SEP).
- **D. Self-Validity Workshop (四, after 「对第三种立场，帕尔塔萨拉提的回答是」).**
  - **The regress.** It can be extended step by step; then the Kāśikā and ŚD texts and the reconstruction, with step 5 → 6 marked as contested.
  - **Two cases.** Shell and silver, and the double moon (the course's own examples), with the two kinds of defeater. Then four statements to judge, including "自身有效的认识不会错" (no) and "有效就是真" (no).
  - **The Prābhākara view.** The yellow conch (PP quotes).
  - **Nyāya and Buddhist views.** Nyāya accepts step 5 but not 6. The Buddhist *arthakriyā* test, with Pārthasārathi's dream reply.
  - **Kumārila's verse.** It is described only through Sucarita and SEP.

## 4. Practice

The questions come from the V7 `PracticeSet` model, one set per 想一想, and are stored per course (`in4.practice.*`, `in5.practice.*`). None needs typing.

| | Sets / questions | single / multi / tf / view | Single-choice keys | True/false | Multi keys |
|---|---|---|---|---|---|
| IN4 | 6 / 18 | 7 / 3 / 5 / 3 | A2 B2 C2 D1 | 2T / 3F | ABD, BCD, ACD |
| IN5 | 6 / 18 | 7 / 4 / 5 / 2 | A2 B2 C2 D1 | 3T / 2F | ACD, ABC, BCD, AB |

In the browser:
- all 36 questions render;
- feedback, 再试一次 and 直接看答案 work;
- view questions are ungraded;
- answers are stored under the course's own key and do not affect reading progress.

## 5. Validation

| Check | Result |
|---|---|
| `tsc --noEmit`, `npm run build` | Pass. The chunk-size warning was already there before this phase. |
| Course pages | Both render: title, English title, classification, core question, background, method, contents, appendix line, links. |
| Notes and cross-references | IN4 119 references ↔ 119 definitions; IN5 94 ↔ 94; no reference without a definition and no orphan. 同注 N / 据注 N targets were checked in 16A after renumbering; no renumbering since. |
| Tables | IN4 25, IN5 26: every manuscript table renders (§1). |
| Source blocks | IN4: 62 original/translation pairs, plus 3 CBETA blocks with the historical-translation label. IN5: 52 pairs. |
| Components | All six appear in their intended sections. Every control was exercised by script; wrong answers name the expected one; state persists across reload; reset works. |
| Search | Course and section searches work (中观, 藏识, 弥曼差, 自身有效). |
| Region and links | Region page lists IN4 and IN5 as openable; IN6 stays unreleased; the IN2 → IN4 and IN3 → IN5 links work. |
| Progress and resume | After reading in IN4 and then IN5, each course page showed its own 继续阅读 position (IN4 5 %, IN5 1 %). IN3 stayed 尚未开始. |
| Mobile (375 px) | No horizontal overflow on any component section; the corner grid becomes one column. One fix: the storehouse diagram's captions moved out of the SVG so they stay legible. |
| Keyboard | Arrow keys move within the radio groups; Tab reaches the corner and word buttons; Enter and Space activate them; the focus outline is visible. |
| Reduced motion | The one transition (corner highlight) is off under `prefers-reduced-motion` and `data-motion='none'`; no JS animation. |
| Regression (16 existing courses) | Every reader section of all 18 courses was visited: no console errors and no `[media]` missing-anchor warnings. Each course renders exactly as many components as it has anchors (CN1 3 … GR4 6). |

The browser test data (`philopilot.v2.in4.*`, `philopilot.v2.in5.*`) was removed afterwards. The reader's existing progress in other courses was left untouched.

## 6. Images

See `PHASE16B_IN4_IMAGE_APPROVAL_SHEET.md` and `PHASE16B_IN5_IMAGE_APPROVAL_SHEET.md`. Nothing was downloaded or embedded, and there are no placeholders. Direct URLs were read from the Commons API (metadata only).

- **IN4.**
  - **Recommended:** A1 (Asia Society *Aṣṭasāhasrikā* leaves) or A2 (Cleveland leaf), and A3 (Tibetan Nāgārjuna, Sichuan Museum).
  - **Optional:** A4 (Nālandā).
  - **Held:** H1, Unkei's Seshin, because the PD basis of the 1952 photograph is unclear; H2, the Singhasari Prajñāpāramitā, because its current holding place is unverified.
  - **Excluded:** the 成唯识论 print (CN5 boundary) and three others.
- **IN5.**
  - **Recommended, conditionally:** B1 (Ṛgveda MS 2097), once its dead source link is confirmed against the Schøyen record.
  - **Held:** H1–H3, the Śabara leaf, the Telugu bhāṣya and the EFEO Aṣṭādhyāyī, for unresolved dating, holding institution or reproduction terms.
  - **Excluded:** the fire-offering photo and two others.

## 7. Release blockers and open items

**Genuine blockers:** none found for a draft-status release inside the prototype.

For the Product Owner:
1. **Licence.** GRETIL and CBETA material is under CC BY-NC-SA 4.0. Whether that fits PhiloPilot's licence is still a PO decision, as in Phase 15B. The IN5 print check does not change it, because the quotations still come from the e-texts.
2. **Images.** A decision is needed on each candidate.
3. **Outdated titles outside IN2 (not changed: the spec limited the fix to IN2).**
   - IN3_SAMPLE_DRAFT.md has 《中观与瑜伽行》 at lines 68, 243, 477, 558 (a heading, which search shows), 560 and 810.
   - The same title appears in `ui/media/in3/ApohaExplorer.tsx:186`, `ui/media/in2/AbhidharmaLab.tsx:295` and `content/practice-in2.ts:139`.
   - These are one-line replacements if the PO wants them.
4. **Core-question display (existing, not caused by this phase).** The parser takes the first bold phrase in the guide, so CN2, CN6, GR3 and GR4 show a phrase rather than their question on the course page. IN4 has a per-course override; the others were left alone as unrelated.
5. **Question discovery.** As with IN3, IN4 and IN5 have no entry from a question page, because the prototype expands only 人性与道德. Building another one is outside this phase.

Stopping here for Product Owner acceptance.

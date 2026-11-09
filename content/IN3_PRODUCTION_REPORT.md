# IN3 制作报告（Phase 15A）

*Supporting report for `content/IN3_SAMPLE_DRAFT.md` (《知识、推理与辩论：正理、胜论与佛教因明》). Written in Phase 15A as a proposal for Product Owner review. Nothing in this report has been built, integrated, committed or deployed.*

## 1. Structure and length

| Part | Core problem | Key passages read in the original |
|---|---|---|
| 导读 | Smoke on the mountain; school and date tables; five material types; reading cautions | — |
| 一 量论 | What counts as knowledge; how many *pramāṇa*s each school accepts; Vaiśeṣika categories | NS 1.1.1–3, 1.1.6–7, 1.1.9–10; VS 1.1.4, 1.2.7; PS 1.2; NB 1.1–3; AnTs 58 |
| 二 知觉 | Perception before concepts or within them; *pramāṇa* = *phala* | NS 1.1.4; PS 1.3, 1.6–1.8; NB 1.4–6, 1.18–21; T1630 "於二量中，即智名果" |
| 三 推理与遍充 | The five members; *vyāpti*; for oneself / for others; five *hetvābhāsa*s | NS 1.1.5, 1.1.32–39, 1.2.4–9; Vātsyāyana on 1.1.35, 1.1.39; AnTs 44–46, 52–57 |
| 四 陈那 | The three marks; the three-member argument; the hetucakra; deduction or induction? | PS 1.2 context; T1630 (三相, 宗因喻, 似因 examples); Haribhadra's *Nyāyapraveśavṛtti* |
| 五 法称 | Two objects, two *pramāṇa*s; three kinds of sign; momentariness; *apoha* | PV 3.1, 3.3; PV 1.40–41; NB 1.12–17, 2.3–22, 3.9; *Apohasiddhi*; PVSV |
| 六 正理派的反驳 | Six debates, each tagged documented / school-level / secondary | (the debates draw on Parts 一 to 五, SEP and IEP, as tagged) |
| 七 新正理派 | Gaṅgeśa; defining *vyāpti*; delimitors; three worked examples; *upādhi*; *tarka* | AnTs 47, 56; definitions via SEP (Ganeri §8.3–8.4; Phillips §5) |
| 结语 | Comparison table; links back to the IN2 course and forward to 《中观与瑜伽行》 and cross-cultural logic | — |
| 注释 / 来源与权利说明 | 107 notes; sources, rights, uncertainties | — |

- **Size:** 48,972 characters in total (26,198 CJK characters), counted with Python on the final file. The body (导读 to 结语) is about 31,500 characters; notes about 11,450; sources appendix about 5,700.
- **Composition:** 7 practice blocks, 23 tables, 34 primary-text blocks, 107 notes.
- **Spec coverage:** all seven required parts are present.
  - Part 三 covers the five members and the *hetvābhāsa*s.
  - Part 七 names Gaṅgeśa, explains delimitors (*avacchedaka*), and has three worked examples (the monkey and the tree; "everything nameable"; the Īśvara argument with a Buddhist *upādhi*).
  - The 结语 looks ahead to later Indian philosophy and to cross-cultural logic, and it states that this material is not Madhyamaka.
- **Length.** The body is about 31,500 characters, comparable to IN1 (about 29,400) and shorter than IN2. The notes are longer than the other courses' because Parts 六 and 七 rely on secondary sources, and each such claim is attributed in a note.

## 2. Main arguments

| Part | Argument presented | How it is framed |
|---|---|---|
| 一 | *Pramāṇa* is about the sources of knowledge, and schools differ on how many there are | NS 1.1.3's four; Dignāga's and Dharmakīrti's two; a comparison table with each row sourced |
| 二 | Nyāya perception can include conceptual content; Dignāga's and Dharmakīrti's perception excludes it | NS 1.1.4 term by term; PS 1.3 *kalpanāpoḍha*; NB 1.4 adds *abhrānta*; the course explains why |
| 三 | The five members form a public demonstration whose force rests on *vyāpti* | Vātsyāyana's sound example in full; a member-by-member "function" column (course's own) |
| 四 | Dignāga turns the "reason" into three checkable conditions | T1630 and Haribhadra for the three marks; hetucakra 3 × 3 table; Gillon's deduction-vs-induction discussion, attributed |
| 五 | Dharmakīrti grounds the marks in real relations (identity, causality) and explains words by exclusion | PV 3.1–3; NB 2.19–22; Tillemans on the two arguments for momentariness and on *apoha* (the fever plants) |
| 六 | Nyāya objections and Buddhist replies, without declaring a winner | Six debates, each labelled with its evidential status and followed by "本章的评价" |
| 七 | Navya-Nyāya makes definitions precise by naming what limits each term | Definition V1 *sādhyābhāvavad-avṛttitvam* and its failure on *kevalānvayin* cases; the monkey/branch delimitor; *upādhi* on the Īśvara argument |

## 3. Primary texts and verification

- **Sanskrit.** Sanskrit comes from GRETIL plaintext files. The exception is PS 1, which comes from Steinkellner's 2005 reconstruction.
  - Every file used is listed with its edition in the manuscript's sources appendix.
  - The licence wording, the same in every file, is noted in §8 below.
- **Chinese.** Chinese comes from T1630 (玄奘 trans.) via CBETA.
- **Script check.** Every Latin-script quote was compared with the downloaded texts, after normalising spacing, punctuation and case.
  - 88 strings were checked; 76 match.
  - The remaining 12 are not textual quotations: English SEP/IEP titles, single technical terms (*avacchedaka*, *upādhi* and similar), and the two definitions that come from SEP, both marked in the notes (注 91, 98).
- **Chinese check.** A separate check compared every T1630 quote with the CBETA text: 20 of 20 match.
  - The check found simplified-character drift in an earlier draft, which was corrected back to the traditional characters of the source.
- **Corrections made during checking:**
  - pausal forms were restored to the sandhi forms of the e-text: *śabdatvād*, *prameyatvād*, *dravyatvād*;
  - "本章举例" labels were added wherever an example is the course's own and not from a text.
- **Not read in the original,** and marked as such in the notes and the uncertainties list:
  - Gaṅgeśa's *anumāna* chapter (only the occurrence of *avacchedaka* in the *śabda* chapter was checked);
  - Uddyotakara, Kumārila, Vācaspati, Udayana;
  - Praśastapāda's five members;
  - Dignāga's works other than PS 1.

## 4. Terminology

The full list is in the manuscript's sources appendix (译文决定). The main choices:

| Term | Course rendering | Traditional Chinese term, where one exists |
|---|---|---|
| *pramāṇa* | 量 / 知识来源 | 量 |
| *pratyakṣa* | 知觉 | 现量 |
| *anumāna* | 推理 | 比量 |
| *kalpanā* | 概念构造 | 分别 |
| *svalakṣaṇa* / *sāmānyalakṣaṇa* | 自相 / 共相 | 自相 / 共相 |
| *pakṣa* | 宗 / 对象 | 宗 |
| *sapakṣa* / *vipakṣa* | 同品 / 异品 | 同品 / 异品 |
| *vyāpti* | 遍充 | — |
| *hetvābhāsa* | 似因 | 似因 |
| *apoha* | 遮诠 | 遮诠 |
| *avacchedaka* | 限定者 | — |
| *upādhi* | 附加条件 | — |
| *tarka* | 思择 | — |

- **Rendering policy.** Modern course Chinese is used for understanding. The traditional 因明 term is given alongside wherever T1630 is quoted, so that readers of 玄奘's vocabulary are not lost.
- **PO decision.** *Tarka* = 思择 and *upādhi* = 附加条件 are the course's choices, not standard renderings; 尋思 and 限制條件 are possible alternatives. Names such as 乌底耶塔迦罗, 甘吉沙 and 《思择要集》 also need a house style.

## 5. Critiques & Responses decision

**Decision: no separate section.**

- **Why.** IN3's subject is itself a centuries-long debate between Nyāya and Buddhist epistemologists. Part 六 is, in content, a Critiques & Responses section:
  - it has six debates;
  - each is tagged 【有文献的直接批评】, 【学派之间的分歧】 or 【本章依据二手文献】;
  - each ends with the course's evaluation.
  
  Part 七's Īśvara example adds a complete critique, response and counter-response cycle. A further appendix would repeat these. The alternative would be a critique from outside the tradition, such as a modern logician on *vyāpti* as material implication. That would be anachronistic in a course whose scope ends with Navya-Nyāya, and it would anticipate the cross-cultural logic material that the 结语 only points to.
- **Where this is stated.** The decision and its reason are stated in Part 六's opening and in the sources appendix.
- **Link to IN2.** Debate 5 (momentariness and recognition) refers back to IN2's Critiques & Responses (Vātsyāyana on memory, AKBh 9) and does not repeat it.

## 6. Media plans (proposals, not built)

These are shared safeguards, as for IN1 and IN2:
- They use only passages already verified in the manuscript.
- They show the source tier.
- They make no new claims.
- They follow the Swiss UI tokens.
- The manuscript's tables remain as the no-JS fallback.

### 6.1 五支与三支论式构造器 (Five-member vs three-member argument builder)

- **Location:** Part 四, after "三支论式". The five-member table in Part 三 is linked back.
- **Objective:** see that Dignāga's three members keep the logical work of the five (thesis, reason, an example that states the pervasion) and drop the application and conclusion as restatements.
- **Visual form:** two columns. On the left are the five member cards from Vātsyāyana's sound example (NS 1.1.32–39 with the commentary). On the right are the three member cards from T1630 (声是无常 / 所作性故 / 同喻异喻). Connector lines show which member corresponds to which.
- **Learner actions:** drag, or on mobile tap-to-assign, each five-member card onto the three-member slot it maps to, or onto "dropped (restates)". Then a check button.
- **Feedback:** each card has a fixed explanation from the manuscript. The application (*upanaya*) and conclusion (*nigamana*) cards explain why they are restatements in Dignāga's view. The course labels this as its own explanation, and notes that Nyāya did not accept the reduction.
- **Limitations:** the mapping is the course's teaching reconstruction. The tool must not suggest that Dignāga wrote such a table.
- **Mobile / desktop:** on desktop, drag and drop with keyboard alternatives. On mobile, a select menu on each card.
- **Minimal approach:**

```tsx
type Member = { id: string; skt: string; zh: string; ref: string; target: 'pratijna' | 'hetu' | 'drstanta' | 'restates' };
export function MemberMapper({ five, three }: { five: Member[]; three: { id: string; zh: string; ref: string }[] }) {
  const [assign, setAssign] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  return (<figure className="member-map">
    <ol>{five.map(m => <li key={m.id}><span lang="sa">{m.skt}</span> {m.zh}
      <select value={assign[m.id] ?? ''} onChange={e => setAssign(a => ({ ...a, [m.id]: e.target.value }))}>
        <option value="" disabled>对应……</option>
        {three.map(t => <option key={t.id} value={t.id}>{t.zh}</option>)}
        <option value="restates">只是重述</option></select>
      {checked && <p className={assign[m.id] === m.target ? 'ok' : 'miss'}>{/* fixed note from manuscript */}</p>}</li>)}</ol>
    <button onClick={() => setChecked(true)}>核对</button>
  </figure>);
}
```

### 6.2 九句因与三相检查器 (Hetucakra grid with a three-mark checker)

- **Location:** Part 四, replacing the static 九句因 table, which stays as the fallback.
- **Objective:** see why only cells 2 and 8 give a valid reason, and how each failure maps onto the second or third mark.
- **Visual form:** an SVG 3 × 3 grid. The rows show presence in *sapakṣa* (all / none / some); the columns show presence in *vipakṣa* (all / none / some). Beside the grid are three status lights for the three marks, plus the result: 正因, 相违 or 不定.
- **Learner actions:** click a cell, or use the arrow keys, to select it. In "predict" mode, the learner says valid, contradictory or inconclusive before the reveal.
- **Feedback:** the mark lights update. The cell's verdict appears with the course's explanation. Where the manuscript gives one, an example appears with its tag: T1630-derived examples are marked 原典; examples the course made are marked 本章举例. The note "九句因的具体例子本章没有核对原典" appears permanently under the grid.
- **Limitations:** the first mark (*pakṣadharmatva*) is assumed satisfied throughout, and the tool says so. Whether *sapakṣa* includes the *pakṣa* (uncertainty 2) is not modelled.
- **Mobile / desktop:** the grid scales by `viewBox`; the lights stack under the grid on narrow screens.
- **Minimal approach:** a 9-cell `<svg>` with `<rect role="gridcell" tabIndex={0}>`, and state `{cell, mode, guess}`. The verdict is a pure function `verdict(sap, vip)`, unit-tested against the manuscript table.

### 6.3 遍充与限定者图示 (Pervasion, *upādhi* and delimitor diagram)

- **Location:** Part 七, at 例题一 (猴子和树) and 附加条件.
- **Objective:** see pervasion as region containment (smoke-loci ⊂ fire-loci, and not the reverse). See an *upādhi* as a condition that pervades the property to be proved but not the reason (wet fuel). See a delimitor as the specification that saves "the tree has no monkey" in the branch/root case.
- **Visual form:** three tabs, each an SVG Euler diagram:
  - *Vyāpti*: nested regions for smoke and fire, with dots for the kitchen and the lake.
  - *Upādhi*: a wet-fuel region inside the fire region; smoke ⊂ wet fuel; the sophisticated reasoner's "fire, therefore smoke" fails at the red-hot iron ball, a 本章举例 tag.
  - *Avacchedaka*: a tree split into branch and root zones, with a monkey icon and a toggle reading "限定于：树枝 / 树根 / 不限定".
- **Learner actions:** drag a test locus into a region and see whether the pervasion holds; flip the delimitor toggle and watch the sentence "树上有猴子 / 树上没有猴子" become true or false.
- **Feedback:** a one-line verdict quoting the manuscript's wording. The Sanskrit definitions shown are tagged "据 SEP", per notes 91 and 98.
- **Limitations:** Euler regions simplify Navya-Nyāya's relational analysis, and the panel says so. The diagram does not represent Gaṅgeśa's own refinements, which the course did not read in the original.
- **Mobile / desktop:** on mobile the tabs become a segmented control, and dragging is replaced by tapping a locus and then tapping a region.
- **Minimal approach:** static SVG paths for the regions. Locus membership is precomputed data, with no geometry tests. State is `{tab, locus, delimitor}`.

### 6.4 Not proposed

- An *apoha* animation (fever plants) was considered and rejected for now. It would add an explanatory metaphor beyond what the source (via Tillemans) supports.

## 7. Practice data

- **Count:** 7 sets × 3 questions = 21, labelled 一 to 七 to match 想一想（一）…（七）.
- **Types:** 11 single, 3 multi, 4 tf, 3 view.
- **Single-answer positions:** a 3, b 3, c 3, d 2.
- **tf answers:** 1 true, 3 false. If the PO prefers 2/2, flip in3-6-3 by rewording its statement.
- **Multi answers:** each multi has two or three correct options out of four, in varied positions.
- **IDs:** `in3-{set}-{question}`.
- **Compatibility:** compiled with `tsc --strict` together with a copy of the current `src/content/practice.ts`, then run through the Phase 14 checker. 0 errors.
- **Not wired in:** the data is in Appendix A of this report, ready to be saved as `src/content/practice-in3.ts` in Phase 15B, if approved.

## 8. Images and rights (shortlist only; nothing downloaded)

Metadata was read from the Wikimedia Commons API on 2026-11-08. No file was downloaded.

| # | Candidate | Where | License (per Commons) | Author / credit | Use and caveats |
|---|---|---|---|---|---|
| 1 | *NDL816249 因明入正理論.pdf* (National Diet Library scan) | Part 四 | Public domain (per Commons) | National Diet Library; text by 商羯罗主, trans. 玄奘 | Good fit: it is the text the course quotes. **Verify** the print's date and the NDL reuse statement; pick one page. It is a later Japanese woodblock edition, not a manuscript of the period, and the caption must say so. |
| 2 | *Ancient Nyayasutras first ten sutras in Sanskrit.jpg* | Part 一 | CC BY-SA 4.0 (photo) | Ms Sarah Welch, own work (2016) | The photo shows an 1896 printed edition, not a manuscript. The uploader's description calls the text "pre-2nd century CE", which the course must **not** repeat; the course gives the dates as disputed. Small (502 × 375). Usable with a careful caption. |
| 3 | *Nalanda Ruins (6).jpg* | 导读 or Part 五 | CC BY-SA 4.0 | Sumitsurai, own work (2023) | Nālandā is associated with later Buddhist scholasticism. The caption must not claim that Dignāga or Dharmakīrti taught there; the course did not verify this. Optional. |
| 4 | *218 Dignaga Teaching Buddhist Logic.jpg* | — | CC BY-SA 4.0 | Anandajoti (Photo Dharma), 2024 | **Not recommended.** It is a modern relief (Buddhavanam), an imagined portrait that would read as historical. |

- **Recommendation:** use 1 (after verification). Use 2 with the caption caveat. Prefer the course-made diagrams (§6) to decorative images. No reliable period image of Gaṅgeśa, Dignāga or Dharmakīrti was found.
- **Credit and records:** any image used needs a SOURCES.md entry and an on-page credit.

**Text-licence record (both courses):**

| Source | Terms observed | Course practice | Action before publication |
|---|---|---|---|
| GRETIL plaintext files (all files used in IN2 and IN3) | Each header says CC BY-NC-SA 4.0, and that the file was provided "in good faith" and will be removed if copyright is claimed | Short quotations for commentary, with edition and attribution; no redistribution | Confirm that NC/SA is compatible with PhiloPilot's licence and use, or re-check the passages against public-domain print editions |
| Steinkellner 2005, PS 1 reconstruction | A copyrighted modern work, freely available as a PDF online | A few verses and two lines of commentary, cited | Fair quotation; confirm |
| CBETA T1630 | Terms not verified in this phase | Short quotations, cited | Check the CBETA terms of use |
| SuttaCentral bilara-data (IN2) | Pali root texts treated as public domain; translations CC0 (not used) | Short quotations, cited | Confirm the root-text licence line in the repository |
| SEP / IEP | Copyrighted | Paraphrase only, with attribution; formulas reproduced only for structure | None |

## 9. Uncertainties

There are nine items, listed in full in the manuscript's sources appendix. In order of importance for review:

1. **Part 七 relies on SEP** for Gaṅgeśa's definitions and the Īśvara argument. The *anumāna* chapter of the *Tattvacintāmaṇi* was not read.
2. **Part 六's Nyāya and Mīmāṃsā objections** rely mainly on SEP and IEP. Before publication, at least Kumārila's *apoha* chapter (available on GRETIL) should be checked.
3. **PS 1** is a modern reconstruction, and the Tibetan was not consulted.
4. **The hetucakra examples,** and Dignāga's position on whether *sapakṣa* includes the *pakṣa*, were not checked against the original.
5. **Dates** (Vācaspati, Udayana, Dharmakīrti) are disputed. The manuscript gives both views where its sources differ.
6. **NS 1.1.5's three inference types** are given in one common reading only; Vātsyāyana on this sūtra was not checked.
7. **Licensing:** see the table in §8.
8. **Chinese names** have no standard forms, and a house style is needed.
9. **Expert review** by a specialist in Indian logic is needed, especially for Parts 四, 五 and 七.

## 10. IN2–IN3 boundaries

- **No anachronism toward IN2.** IN3 builds on IN2 only through explicit back-references (前一门课程……读到):
  - AK 6.4's conventional/ultimate, contrasted in Part 五 with Dharmakīrti's *arthakriyā* criterion, with a note that the standards differ;
  - AKBh 4.2–3 on momentariness, as background to Dharmakīrti's argument from destruction;
  - the memory debate, in Part 六 debate 5.
  
  It does not re-teach these topics, and IN2 does not anticipate IN3's epistemology.
- **No conflation with Madhyamaka.**
  - Part 五 has a subsection, "本部分与《中观与瑜伽行》的界限", which states two things:
    - Dharmakīrti's possible Yogācāra stance (per Tillemans) is mentioned but not taught;
    - the conventional/ultimate pair here is not the Madhyamaka two truths.
  - The 结语 repeats this boundary.
  - Nāgārjuna's critique of *pramāṇa* is not discussed. It is mentioned only in general terms, as SEP's "exception" (导读, note 4) and as next-course material (结语). No Madhyamaka work is cited.
- **Internal chronology.** The school and date table in the 导读 orders the material Nyāya-sūtra → Vātsyāyana → Dignāga → Uddyotakara / Kumārila → Dharmakīrti → … → Gaṅgeśa. The debates in Part 六 cite only critics who postdate their targets.
- **Shared terms.** 自相/共相 and 刹那 are introduced in IN2 for Abhidharma use. In IN3, Part 五 notes the shift of standard each time.

## 11. Readiness

- **Ready for PO reading and expert review.** All four required elements are in place:
  - the manuscript is complete;
  - quotations are verified (Sanskrit and Chinese), with two SEP-only definitions flagged;
  - notes and sources are complete;
  - practice data compiles.
- **Not ready for publication.** It still needs:
  - expert review (§9, item 9);
  - the Kumārila and Gaṅgeśa source checks (§9, items 1–2);
  - the licence decisions (§8).
- **Phase 15B, if approved:** add `practice-in3.ts` from Appendix A; build the chosen media components; record any images in SOURCES.md. The work was stopped here as instructed and does not proceed to 15B.
- **Format checks done:** CRLF line endings; 107 footnote references, each with exactly one definition; notes renumbered by first appearance; 7 想一想 blocks matching set labels 一 to 七.

## Appendix A. Practice data (draft `practice-in3.ts`)

```ts
import type { PracticeSet } from './practice';

// 《知识、推理与辩论：正理、胜论与佛教因明》· 想一想 as selection questions.
// Each set follows its exercise in content/IN3_SAMPLE_DRAFT.md (labels 一 to 七).
// Phase 15A draft data: not yet wired into the site; the manuscript is not edited.
export const IN3_PRACTICE: PracticeSet[] = [
  {
    label: '一',
    lede: '原题请你想一想：如果只承认知觉和推理两种知识来源，你还能从一本历史书中学到历史事实吗？',
    questions: [
      {
        id: 'in3-1-1', type: 'single',
        stem: '《正理经》1.1.3 列出的知识来源（量）是哪几种？',
        options: [
          { id: 'a', text: '知觉和推理。', note: '这是陈那和法称承认的两种。' },
          { id: 'b', text: '知觉、推理、比较和言语。', note: '对。比较（upamāna）和言语（śabda）也被正理派承认为独立的知识来源。' },
          { id: 'c', text: '知觉、推理、言语、推定和非认识。', note: '"推定"和"非认识"是弥曼差派讨论的知识来源，不在《正理经》的列表中。' },
        ],
        answer: 'b',
      },
      {
        id: 'in3-1-2', type: 'single',
        stem: '陈那为什么认为知识来源只有两种？',
        options: [
          { id: 'a', text: '因为知识的对象只有两种：自相和共相；知觉把握自相，推理把握共相。', note: '对。陈那说："知觉和推理是两种量……因为所量有两种特征。"' },
          { id: 'b', text: '因为言语总是不可靠的。', note: '佛教并不认为言语总是不可靠；它把可靠的言语归入推理。' },
          { id: 'c', text: '因为比较和言语都可以归入知觉。', note: '佛教把它们归入推理，因为它们都要通过一般的概念起作用，而知觉是离开概念的。' },
        ],
        answer: 'a',
      },
      {
        id: 'in3-1-3', type: 'view',
        stem: '你读到一本可靠的历史书说"秦始皇统一了六国"。这个知识最好被理解为哪一种？',
        options: [
          { id: 'a', text: '言语（证言）是一种独立的知识来源：可信者的话本身就给我知识。', note: '优点：符合我们实际获得大部分知识的方式，也是正理派的立场。代价：要说明"可信者"的标准，并解释为什么可信者的话有时也错。' },
          { id: 'b', text: '这是推理：我从"这位作者可靠，他这样写"推出事实。', note: '优点：只需要两种知识来源，与陈那、法称一致。代价：正理派会说，这把言语的知识变得过于间接；我们很少真的做这样的推理。' },
          { id: 'c', text: '这根本不是知识，只是有理由的信念。', note: '优点：对知识的标准要求很高。代价：几乎所有关于过去和远方的知识都会因此失去资格，这是印度各派都不愿接受的后果。' },
        ],
      },
    ],
  },
  {
    label: '二',
    lede: '原题请你判断哪些认识按照陈那的定义是知觉，并想一想对自己心理状态的觉知为什么可以没有概念。',
    questions: [
      {
        id: 'in3-2-1', type: 'multi',
        stem: '按照陈那的定义（知觉是离开概念构造的认识），下面哪些是知觉？（多选）',
        options: [
          { id: 'a', text: '看见一块红色，还没有想到"红"这个词。', note: '对。这是感官的知觉。' },
          { id: 'b', text: '认出"这是我的杯子"。', note: '不对。"杯子"和"我的"都是把名称、种类等联结到对象上，属于概念构造。' },
          { id: 'c', text: '在梦中看见一只老虎。', note: '不对。陈那把错觉列为"似知觉"。' },
          { id: 'd', text: '感觉到自己在生气。', note: '对。陈那承认对欲望等心理状态的自我觉知是知觉。' },
        ],
        answer: ['a', 'd'],
      },
      {
        id: 'in3-2-2', type: 'single',
        stem: '法称在陈那的知觉定义之外加了哪一个条件？',
        options: [
          { id: 'a', text: '由感官与对象的接触产生。', note: '这是《正理经》定义的条件。' },
          { id: 'b', text: '具有确定性。', note: '这也是《正理经》定义的条件，而且与陈那的立场相反。' },
          { id: 'c', text: '不错乱（abhrānta）。', note: '对。《正理一滴》说知觉是"离开概念构造的、不错乱的"认识，并列举了眼病、快速旋转、乘船等错乱的原因。' },
        ],
        answer: 'c',
      },
      {
        id: 'in3-2-3', type: 'tf',
        stem: '按照正理派后来的主流读法，"这是一头牛"这样有概念的认识，仍然可以是知觉。',
        answer: true,
        wrong: '正理派区分无分别和有分别的知觉，认为有分别的知觉仍然是知觉；这正是它与陈那的分歧所在。',
      },
    ],
  },
  {
    label: '三',
    lede: '原题请你用五种似因中的一种来描述一个推理的毛病，并想一想怎样修改它。',
    questions: [
      {
        id: 'in3-3-1', type: 'single',
        stem: '在"山上有火，因为有烟"的推理中，"宗法性"（pakṣadharmatā）指的是什么？',
        options: [
          { id: 'a', text: '凡是有烟的地方都有火。', note: '这是遍充（vyāpti）。' },
          { id: 'b', text: '山上有火。', note: '这是推理的结论。' },
          { id: 'c', text: '"这座山有被火所遍充的烟"这个认识。', note: '这是"考察"（parāmarśa），它把遍充和宗法性结合起来。' },
          { id: 'd', text: '烟在山上。', note: '对。《思择要集》说：被遍充者（烟）存在于山等对象之中，是宗法性。' },
        ],
        answer: 'd',
      },
      {
        id: 'in3-3-2', type: 'single',
        stem: '"山上有火，因为它是可以被认识的"属于哪一种似因？',
        options: [
          { id: 'a', text: '不定：理由也出现在没有火的地方。', note: '对。《思择要集》的解释是：湖也是可以被认识的，湖上却没有火。' },
          { id: 'b', text: '不成：理由在山上不存在。', note: '山是可以被认识的，所以理由在对象上是成立的。' },
          { id: 'c', text: '被否定：山上没有火已经被知觉确定。', note: '这个推理的问题不在于结论已经被知觉否定，而在于理由与所立之间没有遍充。' },
        ],
        answer: 'a',
      },
      {
        id: 'in3-3-3', type: 'tf',
        stem: '在伐差耶那的五支论式中，"喻"支只举一个具体的东西（锅），不包含任何一般的说法。',
        answer: false,
        wrong: '伐差耶那的喻支是"有生起性质的锅等实体是无常的"：它既有具体的例子，也有一个可以读成一般规律的说法。正文说，后来的发展正是把这条规律明确地分离出来。',
      },
    ],
  },
  {
    label: '四',
    lede: '原题请你用三相检查"窗子里亮着灯，所以房子里有人"这个推理，并想一想三相中最难确定的是哪一相。',
    questions: [
      {
        id: 'in3-4-1', type: 'single',
        stem: '主人出门时忘了关灯：房子里没有人，窗子里却亮着灯。这个反例违反了三相中的哪一相？',
        options: [
          { id: 'a', text: '第一相（遍是宗法性）。', note: '第一相问的是理由是否出现在推理的对象中，即那座房子的窗子是否亮着灯。' },
          { id: 'b', text: '第二相（同品定有性）。', note: '第二相只要求理由出现在某些有人的房子中，这一点没有问题。' },
          { id: 'c', text: '第三相（异品遍无性）。', note: '对。这座没有人的房子是一个异品，理由（亮着灯）却出现在其中。' },
        ],
        answer: 'c',
        explain: '第三相实际上说的是"没有反例"。它最难确定，因为我们无法检查所有没有人的房子。',
      },
      {
        id: 'in3-4-2', type: 'multi',
        stem: '关于陈那的"九句因"，下面哪些说法是对的？（多选）',
        options: [
          { id: 'a', text: '九种情况中只有两种是好的理由。', note: '对。' },
          { id: 'b', text: '好的理由必须在异品中全部没有。', note: '对。这对应第三相。' },
          { id: 'c', text: '好的理由必须在同品中全部有。', note: '不对。理由在同品中"部分有"也可以是好的理由，只要它在异品中全部没有。' },
          { id: 'd', text: '九句因所在的陈那著作只有藏译本保存。', note: '对。本章依据 SEP 的介绍，没有核对藏译。' },
        ],
        answer: ['a', 'b', 'd'],
      },
      {
        id: 'in3-4-3', type: 'single',
        stem: '《因明入正理论》把"聲常，所聞性故"列为哪一种错误？',
        options: [
          { id: 'a', text: '共不定：常住和无常的东西都可以被听见。', note: '共不定的例子是"聲常，所量性故"：常住和无常的东西都是可以被认识的。' },
          { id: 'b', text: '不共不定：只有声音是可听的，没有同品支持它，也没有异品反驳它。', note: '对。论中说"常無常品皆離此因"。' },
          { id: 'c', text: '两俱不成：声音不是可听的。', note: '声音当然是可听的，理由在对象上是成立的。' },
        ],
        answer: 'b',
      },
    ],
  },
  {
    label: '五',
    lede: '原题请你为法称"真实的东西就是能起作用的东西"想一个反例，并想一想法称会怎样回答。',
    questions: [
      {
        id: 'in3-5-1', type: 'single',
        stem: '在法称的三种标记中，"这里有火，因为有烟"属于哪一种？它的根据是什么？',
        options: [
          { id: 'a', text: '自性标记，根据是同一性。', note: '自性标记的例子是"这是一棵树，因为它是一棵申恕波树"。' },
          { id: 'b', text: '非认识标记，根据是"本应被看见的没有被看见"。', note: '非认识标记用于证明不存在，例如"这里没有罐子"。' },
          { id: 'c', text: '没有根据，只是多次观察的结果。', note: '法称恰恰认为，多次观察不足以保证遍充，必须有本质的联系。' },
          { id: 'd', text: '结果标记，根据是因果关系：烟是火的结果。', note: '对。法称说，遍充的根据是同一性和因果关系这两种本质联系。' },
        ],
        answer: 'd',
      },
      {
        id: 'in3-5-2', type: 'tf',
        stem: '按照陈那的遮诠论，"牛"这个词的意思是一个真实存在的正面共相"牛性"。',
        answer: false,
        wrong: '遮诠论恰恰要避免承认真实的共相："牛"的意思是"不是非牛"，即对其他东西的排除；排除只是否定，不是真实的东西。',
      },
      {
        id: 'in3-5-3', type: 'view',
        stem: '一个虚构的人物能让读者哭。按照"能起作用的才是真实的"，他是真实的吗？',
        options: [
          { id: 'a', text: '他不是真实的；让读者哭的，是书页上的文字和读者心中的形象，它们才是真实的个别的东西。', note: '优点：符合法称的标准，也能解释虚构的效果。代价：要说明为什么我们自然地说"这个人物让我哭"，这种说法是否只是一种世俗有。' },
          { id: 'b', text: '他在某种意义上是真实的，因为他确实起了作用；法称的标准太宽了。', note: '优点：认真对待效果。代价：这样一来，许多我们认为不存在的东西都要被算作真实的。' },
          { id: 'c', text: '"能起作用"这个标准本身需要修改：起作用的方式应当是直接的、因果的。', note: '优点：保留了法称的直觉。代价：要给"直接的"一个不循环的定义。' },
        ],
      },
    ],
  },
  {
    label: '六',
    lede: '原题请你在第六部分的争论中各选一个你认为佛教一方和正理派一方回答得最好的，并想一想你的选择是否受到你对共相的看法的影响。',
    questions: [
      {
        id: 'in3-6-1', type: 'single',
        stem: '鸠摩利罗和乌底耶塔迦罗对遮诠论的通常批评是什么？',
        options: [
          { id: 'a', text: '循环：理解"非非蓝"要先理解"蓝"，于是理解"蓝"要以理解"蓝"为前提。', note: '对。本章据 SEP 介绍了这一批评，没有读两人的原文。' },
          { id: 'b', text: '遮诠论会导致无穷后退的创世者。', note: '这是另一场关于神的争论中出现的思路。' },
          { id: 'c', text: '遮诠论违反了三相中的第一相。', note: '这个批评与三相无关。' },
        ],
        answer: 'a',
        explain: '法称的回答基本上是"你也一样"：任何一个词都既有它所适用的东西，也有它所排除的东西。',
      },
      {
        id: 'in3-6-2', type: 'multi',
        stem: '关于"我们怎样知道桌上没有眼镜"，下面哪些对应是正确的？（多选）',
        options: [
          { id: 'a', text: '法称：这是推理（"非认识"是三种标记之一）。', note: '对。' },
          { id: 'b', text: '正理派：有时这是知觉，我直接看见了眼镜的不在。', note: '对。本章据 SEP 介绍了乌底耶塔迦罗和后来传统的这一立场。' },
          { id: 'c', text: '弥曼差派（鸠摩利罗一系）：这是一种特殊的知识来源"非认识"。', note: '对。' },
          { id: 'd', text: '三派都认为这只是记忆。', note: '不对。三派的回答各不相同。' },
        ],
        answer: ['a', 'b', 'c'],
      },
      {
        id: 'in3-6-3', type: 'tf',
        stem: '本章把第六部分的六个争论都标为"有文献的直接批评"，并且核对了所有相关的原文。',
        answer: false,
        wrong: '本章把争论一、四、六标为"学派之间的分歧"，争论五部分有文献；争论二、三虽然标为有文献的批评，但本章依据的是 SEP 的介绍，没有读乌底耶塔迦罗和鸠摩利罗的原文。',
      },
    ],
  },
  {
    label: '七',
    lede: '原题请你找出一个推理中的附加条件，并想一想附加条件证明了什么、没有证明什么。',
    questions: [
      {
        id: 'in3-7-1', type: 'single',
        stem: '"这个人会得肺病，因为他住在这个城市；我认识的住在这个城市的人都得了肺病，例如老王、老李。"假设老王和老李都是吸烟者。下面哪一个最可能是附加条件？',
        options: [
          { id: 'a', text: '住在这个城市。', note: '这是理由本身，不是附加条件。' },
          { id: 'b', text: '吸烟（或另一种致病的暴露）。', note: '对。它应当遍充所立（得肺病的人都有它），却不遍充理由（住在这个城市的人不一定都有它）。' },
          { id: 'c', text: '得肺病。', note: '这是所立本身。' },
        ],
        answer: 'b',
        explain: '附加条件只证明这个推理不能确定"他会得肺病"，它并不证明"他不会得肺病"。（本题是练习用的假设，附加条件"遍充所立"的要求在真实的医学中未必严格成立。）',
      },
      {
        id: 'in3-7-2', type: 'single',
        stem: '新正理派说"这棵树与猴子接触"和"这棵树不与猴子接触"可以同时为真。它是怎样避免矛盾的？',
        options: [
          { id: 'a', text: '说两句话中有一句是假的。', note: '新正理派承认两句话都可以是真的。' },
          { id: 'b', text: '说"接触"不是真实的关系。', note: '正理—胜论恰恰承认接触是真实的关系。' },
          { id: 'c', text: '引入限定者：前一句以树枝为限定，后一句以树根为限定。', note: '对。限定者（avacchedaka）不同，两句话就不矛盾。' },
        ],
        answer: 'c',
      },
      {
        id: 'in3-7-3', type: 'view',
        stem: '正理派论证神的存在，佛教以"有可以被知觉的身体"为附加条件反驳，甘吉沙则主张一个没有身体的创造者更简单。你认为哪一方更有说服力？',
        options: [
          { id: 'a', text: '佛教一方：我们知道的一切作者都有身体，没有理由设想一个没有身体的作者。', note: '优点：紧扣经验中的遍充。代价：正理派可以说，这正是在用对象中有争议的例子来反驳。' },
          { id: 'b', text: '甘吉沙：有身体的创造者会导致无穷后退，没有身体的创造者更简单。', note: '优点：用"简单性"的思择回应附加条件。代价：要说明为什么"简单"可以决定一个关于存在的问题，以及"没有身体的知识"是否可以理解。' },
          { id: 'c', text: '双方都没有决定性的论证：争论已经从形式规则转到了关于简单性的判断。', note: '优点：与正文的评价一致。代价：如果停在这里，就要说明关于简单性的判断应当怎样进行。' },
        ],
      },
    ],
  },
];
```

Checker output (`tsc --strict` + `node out/check.js`, 2026-11-08):

```text
IN3 sets 7 questions 21 {"single":11,"view":3,"multi":3,"tf":4} single answers {"b":3,"a":3,"c":3,"d":2} labels 一二三四五六七
```

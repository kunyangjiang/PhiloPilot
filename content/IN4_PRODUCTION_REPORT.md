# IN4 制作报告（Phase 16A）

*Supporting report for `content/IN4_SAMPLE_DRAFT.md` (《大乘哲学：中观与瑜伽行派》 / Mahāyāna Philosophy: Madhyamaka and Yogācāra). Written in Phase 16A as a proposal for Product Owner review. Nothing in this report has been built, integrated, committed or deployed.*

## 1. Structure and length

| Part | Core problem | Key passages read in the original |
|---|---|---|
| 导读 | Subhūti cannot find a "bodhisattva"; seven reminders; dates table; five material types; no single "two truths" doctrine; Svātantrika/Prāsaṅgika flagged as a later Tibetan label | Aṣṭa ch. 1 |
| 一 般若经 | What "empty" means (no *svabhāva*, not non-existence); paradoxical speech; three readings with costs | Heart (one line, with the Nattier caveat); Vajracchedikā ("nāsti sa kaściddharmo…", the *tārakā* verse); Aṣṭa *prabhāsvarā* |
| 二 龙树 | *Svabhāva*; a five-step basic argument; MMK 1.1; three uses of the catuṣkoṭi; motion and identity/change (two worked examples, with what is *not* negated); emptiness = dependent origination; "no thesis"; reply to the nihilism charge | MMK 15.1–2, 1.1, 1.10 (note), 18.8, 22.11, 2.1, 10.1, 13.8, 24.8/10/14/18/19; VV 1, 23, 29 |
| 三 中观内部的争论 | Reductio vs. independent inference; Svātantrika/Prāsaṅgika presented as a later Tibetan taxonomy laid over a real Indian debate | Āryadeva and Buddhapālita via PsP; Bhāviveka in PsP Sanskrit and T1566 Chinese (0052c01–02, 0052c12–14); Candrakīrti in PsP (āśrayāsiddha; "loko mayā sārdhaṃ vivadati") |
| 四 唯识二十论 | Vijñaptimātra; four objections and replies; parsimony; atomism; not solipsism; a comparison table with Berkeley and Kant, with an explicit "no simple equation" | Viṃś prose opening, vv. 1, 2, 3, 6, 7, 11, 12, 16, 17, 18a; Xuanzang's T1590 verse as a *historical translation* |
| 五 藏识与三自性 | Asaṅga and Vasubandhu (traditional attribution, with the doubts); the eight consciousnesses; ālaya compared with ātman (not an eternal soul); three natures; the illusory-elephant simile; three non-natures; an unresolved dispute over the ultimate status of consciousness (five positions; the *Yogācārabhūmi* caveat; Śāntideva's Madhyamaka critique) | Triṃś 2, 4, 5, 20, 21, 23–25; Sthiramati's quotation of *ādānavijñāna*; TSN 27, 28, 30 (authorship contested); MAV 1.2; BCA 9.17–18a |
| 六 寂天 | Bodhicitta (aspiration and engagement) and why devotion and rites are set apart from the arguments; four metaphysics-to-ethics arguments (after Lele); anger; "ownerless suffering"; does it succeed?; emptiness and compassion | BCA 1.15 (1.16 in a note); 6.25, 31, 32; 8.90, 94, 95, 101, 102, 103; 9.2, 9.76, 9.77 |
| 结语 | A two-truths comparison table; links to CN5, Tibet, IN5, IN6, D2, D3, S4 | — |
| 后世批判与回应 | Nyāya: the dream argument presupposes waking; Vasubandhu's reply; Kumārila's chapter titles | NS 4.2.31, 32, 34; Vātsyāyana on 4.2.33–34; Viṃś 16–17; Kāśikā colophons |
| 注释 / 来源与权利说明 | 119 notes; per-file GRETIL table (15 files); CBETA three-layer statement (4 files); 10 open questions | — |

- **Size:** 56,637 characters (29,404 CJK), counted with Python on the final file (line endings normalised). Body (title to 结语): about 35,100; Critiques & Responses: about 2,560; notes: about 11,200; sources appendix: about 7,800.
- **Composition:** 6 想一想 blocks (labels 一 to 六) plus one unnumbered "再想一想" after the consciousness-status table; 23 tables; 62 Sanskrit primary-text blocks with a 本章试译 (the Chinese historical-translation blocks are counted separately in §3); 119 notes.
- **Spec coverage:** all six required parts are present.
  - Svātantrika/Prāsaṅgika is introduced as a later Tibetan taxonomy in 导读 (reminder 4) and again in Part 三's "分歧在哪里" table, last row.
  - Part 四 compares Vasubandhu with Berkeley and Kant across six rows. It says explicitly that Yogācāra is not simply Western idealism: no God, no substantial soul, and soteriological aims.
  - Part 二 now includes the spec's motion and identity/change topics (MMK 2.1 and 10.1), each with a table of what is negated and what is not.
  - Part 五 presents ālaya in a side-by-side table against the Upaniṣadic ātman (momentary, abandoned at liberation). It also has a section on the disagreement about the ultimate status of consciousness: sākāra/nirākāra, three-nature readings, the Śāntarakṣita synthesis (all via SEP) and Śāntideva's critique (BCA 9.17–18a, original). Asaṅga is treated as the traditional systematiser, with SEP's caveat that most of the *Yogācārabhūmi* is not mind-only.
  - Part 六 opens with bodhicitta (BCA 1.15) and states explicitly that the devotional material is part of the book but is not the argument under examination, and that the ethics is presented as derived from, not added to, the metaphysics.
  - The conclusion links to CN5, IN6 and the systematic courses (D2, D3, S4).
- **Length:** body length is close to IN2/IN3. No cuts were made. If the PO wants a shorter version, the candidates are the "知觉与记忆" subsection in Part 四 and the Śāntarakṣita paragraph in Part 三.

## 2. Main arguments

| Part | Argument presented | How it is framed |
|---|---|---|
| 一 | "Empty" means "lacking *svabhāva*", not "non-existent" | Heart line plus the Aṣṭa/Vajracchedikā passages; three readings (contradiction / two-level / therapeutic), each with a cost |
| 二 | From dependence to lack of *svabhāva* (five steps); MMK 1.1's four options share one presupposition | Course reconstruction, tagged. SEP's caveat is included: the inference from "caused" to "empty" needs an extra principle (Siderits vs. Westerhoff) |
| 二 | The catuṣkoṭi has more than one use | Negate all four (1.1), affirm all four as graded teaching (18.8), "speak without clinging" (22.11); three modern interpretations are attributed |
| 二 | Motion (MMK 2.1) and fire/fuel identity (MMK 10.1): each dilemma negates a *svabhāva* analysis, not walking or burning | Two reconstructions, tagged. The Zeno parallel is attributed to SEP (Siderits and O'Brien); a table lists what is *not* negated |
| 三 | Is an independent inference legitimate for a Mādhyamika? | Buddhapālita (reductio) → Bhāviveka (syllogism with "in the ultimate sense") → Candrakīrti (āśrayāsiddha; accept worldly convention). Documented exchanges are kept apart from the later Tibetan labels |
| 四 | Only-representation; dreams, pretas, wet dreams, hell guardians; parsimony; atoms | Four-objection table; comparison with Berkeley and Kant; SEP's epistemic vs. ontological readings attributed |
| 五 | Ālaya is not an ātman; the three natures as three ways of seeing one thing | Comparison table; elephant simile (TSN 27–30, authorship flagged) |
| 五 | Is consciousness itself ultimately real? | Five positions, school-level via SEP; Śāntideva's "cittaṃ cittaṃ na paśyati" quoted as the documented Madhyamaka critique; the question is left open, with a 再想一想 |
| 六 | Ownerless suffering → impartial removal of suffering | Step table for BCA 8.94–103; Williams-type objection given as the course's own summary of SEP; the Parfit parallel attributed to SEP |
| C&R | Does the dream argument presuppose waking? | NS 4.2.31–34 with Vātsyāyana [documented]; Vasubandhu's Viṃś 16–17 [documented]; their relation [school-level] |

## 3. Primary texts and verification

- **Sanskrit:** 15 GRETIL plaintext files were read on 2026-11-09 (listed per file in the manuscript appendix).
  - Every Sanskrit blockquote and inline quotation was compared by script (`vq.py`) against the files. Spaces, punctuation and case are ignored; nothing else is.
  - Result (re-run on the final file): 107 quotations checked, 0 real mismatches. The 8 flags are not quotations (English titles, technical terms, the CBETA header string).
  - Earlier mismatches were fixed by quoting the file's own sandhi or spelling (e.g. *etasyety*, *niḥsvabhāvo*, *paramārthaś*; "māhāyāne" in the Viṃś opening; "ṇupalambhāt" in Vātsyāyana). Corrections are given in notes, never silently in the quotation.
- **Chinese:** CBETA TEI P5 files T224, T1564, T1566, T1590 (file date 2026-06-15). The three Chinese blockquotes were checked by `cjk.py` (punctuation-insensitive, against the XML-derived text): 3/3 OK.
- **Verified via secondary sources only:** Buddhapālita and Āryadeva are read only as quoted in Candrakīrti's PsP. Bhāviveka's own Sanskrit is lost, so he is read in the PsP report and the T1566 Chinese. Śāntarakṣita and Kamalaśīla are covered only through SEP.
- **Distinctions kept:**
  - verified primary text: Sanskrit, with the 本章试译 translation;
  - historical translation: Kumārajīva, Prabhākaramitra, Xuanzang, quoted as Chinese;
  - commentary: Candrakīrti, Sthiramati, Prajñākaramati, labelled as commentary;
  - academic interpretation: SEP authors, each named;
  - course reconstruction: tagged ［本章的重建］ or ［学派层面的整理］.
- **No modern copyrighted translation** was consulted or reproduced. SEP English renderings are paraphrased, never transcribed.

## 4. Terminology

| Term | Course rendering | Note |
|---|---|---|
| svabhāva | 自性 | Glossed as "an independent essence that does not depend on anything else" |
| śūnya / śūnyatā | 空 / 空性 | Always glossed as "lacking *svabhāva*", never as "nothing" |
| pratītyasamutpāda | 缘起 | As in IN2 |
| catuṣkoṭi | 四句 | |
| saṃvṛti / paramārtha | 世俗 / 胜义 | Each use attributed to a specific author (reminder 3; 结语 table) |
| prasaṅga / svatantra anumāna | 归谬 / 自立的推理 | 自续派 / 应成派 kept only for the Tibetan labels |
| vijñapti(-mātra) | 表象（唯识） | "唯识" kept as the traditional name |
| ālayavijñāna / manas | 藏识（阿赖耶识）/ 末那识 | |
| parikalpita / paratantra / pariniṣpanna | 遍计所执 / 依他起 / 圆成实 | |
| Persons | 龙树、提婆、佛护、清辨、月称、无著、世亲、安慧、寂天、寂护、莲花戒 | Standard names. 智作慧 (Prajñākaramati) is the course's own rendering; 伐差耶那 (Vātsyāyana) follows IN3 |

## 5. Critiques & Responses decision

**Included.** The section is short (about 2,600 characters) and covers one documented exchange. Nyāya objects that the dream argument presupposes waking cognition (NS 4.2.31–34, with Vātsyāyana's *pratisandhāna* and *pradhānāśraya*). Vasubandhu's answer comes from Viṃś 16–17: the waking state too is not known to be different until awakening.

Two things are tagged ［学派层面的整理］: the claim that the two texts address each other, and the course's evaluation. Kumārila's chapters 无所缘论 and 空论 are mentioned by colophon only, with a pointer to IN5.

## 6. Interactive teaching proposals (not built)

All five candidates share these safeguards:
- Only passages already verified in the manuscript are used.
- Every panel shows its source tier: 原典 / 历史译本 / 注释 / 二手转述 / 本章重建.
- No new claims are introduced.
- Swiss UI tokens only.
- The manuscript's existing table stays as the no-JavaScript fallback.
- No physical metaphor is animated as though it were the doctrine: the illusory elephant is the text's own simile and is labelled as one, and nothing depicts consciousness as a container or the ālaya as an object.

**Recommended set: B, C and D.** Each covers a different part (二, 四, 五) and each targets one of the spec's core safeguards: the catuṣkoṭi, the status of mind-only arguments, and the claim that ālaya is not a soul. A and E are good optional additions. A can be folded into B if only one Part 二 component is wanted.

### A. 空与缘起探索器 (Emptiness and Dependent Origination Explorer) — optional

- **Location:** Part 二, "### 运动与同一：两个例子". Anchor: the five-column table "例子 | 被检查的概念 | … | 没有否定的是什么" (MMK 1.1, 2.1, 10.1). It links back to "### 空、缘起与中道" (MMK 24.18).
- **Objective:** see, case by case, that what Nāgārjuna negates is *svabhāva*, not the everyday phenomenon. Then see why that makes emptiness and dependent origination two descriptions of one thing (24.18), not nihilism.
- **Visual form:** three cards (arising, motion, fire and fuel). Each card has two layers:
  - an upper "如果它有自性……" layer, showing the dilemma branches as an SVG fork that ends in red "不成立" marks;
  - a lower "依赖条件的……" layer, showing the everyday phenomenon as a small dependency graph (fire ← fuel; walking ← walker and path; sprout ← seed, water, soil).

  A final panel overlays the two layers and quotes 24.18.
- **Learner action:** for each card, first mark which layer the negation applies to, then open the fork step by step. The final panel asks: "如果拿掉下层的依赖关系，上层的否定还剩下什么？"
- **Philosophical feedback:**
  - wrong placements (for example, marking the negation on the lower layer) receive the manuscript's sentence "它没有说人不能走路" or "结论不是因果不可能";
  - the final panel cites SEP's caveat that the step from "caused" to "empty" needs an extra principle, which scholars dispute.
- **Historical qualifications:**
  - the Zeno parallel is attributed to SEP (Siderits and O'Brien);
  - the person-and-aggregates application of MMK 10 is labelled "传统注释中的用法".
- **Desktop / mobile:** on desktop, three cards in a row with the overlay panel below. On mobile, a card carousel; the fork becomes a vertical list.
- **Minimal approach:** a `cases` array of `{ref, skt, zh, branches: string[], everyday: [from, to][]}`. SVG `<path>` for fork lines; `<details>` for the Sanskrit.

### B. 四句论证工作坊 (Catuṣkoṭi Argument Workshop) — recommended

- **Location:** Part 二, "### "四句"：肯定与否定的四个角". Anchor: the table "用法 | 例子 | 四句的地位" (1.1 / 18.8 / 22.11).
- **Objective:** learn that the catuṣkoṭi is not a four-option quiz. It is a schema used in at least three different ways, and in MMK 1.1 its four negations share one presupposition.
- **Visual form:** a 2×2 SVG square with corners 是 / 非 / 亦是亦非 / 非是非非, plus a mode switch (《中论》1.1 / 18.8 / 22.11).
  - In 1.1 mode the corners are struck through and the centre is blank until it is revealed.
  - In 18.8 mode the corners light up in sequence, each tagged "对某一类听众".
  - In 22.11 mode the corners are hollow outlines.
- **Learner action:** this is deliberately **not** "pick the right corner". In 1.1 mode the learner has to:
  1. read each corner's verse line;
  2. write or choose, from three candidate presuppositions, the one all four corners share;
  3. say whether rejecting all four implies "nothing arises".

  In the other modes the learner explains in one tap-choice what the schema is *for*: refutation, graded teaching, or speaking without clinging.
- **Philosophical feedback:**
  - the centre reveal is the manuscript's own sentence, "预设：有自性的东西生起";
  - choosing "nothing arises" triggers the manuscript's correction;
  - the three modern logical interpretations listed in the manuscript (including paraconsistent readings) are shown as scholars' proposals, not as Nāgārjuna's own classification.
- **Historical qualifications:** the modes are labelled with verse numbers, never with school names. A footer notes that the four-option pattern also appears outside Madhyamaka.
- **Desktop / mobile:** on desktop, the square sits beside the verse panel. On mobile, the square is on top and the verse opens in a bottom sheet; the mode switch is a segmented control.
- **Minimal approach:**

```tsx
type Mode = '1.1' | '18.8' | '22.11';
const CORNERS = ['是', '非', '亦是亦非', '非是非非'] as const;
export function Catuskoti({ verses, presupposition }: { verses: Record<Mode, { skt: string; zh: string }[]>; presupposition: string }) {
  const [mode, setMode] = useState<Mode>('1.1'); const [open, setOpen] = useState<number | null>(null); const [revealed, setRevealed] = useState(false);
  return (<figure className="ck">
    <div role="radiogroup">{(['1.1', '18.8', '22.11'] as Mode[]).map(m =>
      <button key={m} role="radio" aria-checked={mode === m} onClick={() => { setMode(m); setRevealed(false); }}>《中论》{m}</button>)}</div>
    <svg viewBox="0 0 200 200">{CORNERS.map((c, i) =>
      <g key={c} transform={`translate(${(i % 2) * 100},${Math.floor(i / 2) * 100})`} onClick={() => setOpen(i)} role="button" aria-label={c}>
        <rect width="96" height="96" className={`ck-cell ck-${mode.replace('.', '_')}`} /><text x="8" y="52">{c}</text></g>)}
      {mode === '1.1' && revealed && <text x="100" y="104" textAnchor="middle" className="ck-centre">{presupposition}</text>}</svg>
    {open !== null && <blockquote lang="sa">{verses[mode][open]?.skt}<p>{verses[mode][open]?.zh}</p></blockquote>}
    {mode === '1.1' && <button onClick={() => setRevealed(true)}>四句共同预设了什么？</button>}
  </figure>);
}
```

### C. 瑜伽行派知觉实验室 (Yogācāra Perception Laboratory) — recommended

- **Location:** Part 四, "### 四个反驳和四个回答" (the four-row table), with a second panel at "### 知觉与记忆" (Viṃś 16–17).
- **Objective:**
  - test the realist's four criteria (place and time, intersubjectivity, causal efficacy, all together) against Vasubandhu's counter-examples;
  - see the structure of the time-lag argument;
  - see what the counter-examples establish (the criteria do not *require* external objects) and what they do not (that there are no external objects).
- **Visual form:** a 4 × 2 grid. The rows are the realist's criteria. The columns are "醒时经验" and Vasubandhu's counter-example (梦 / 饿鬼的脓河 / 梦遗 / 地狱狱卒).
  - Each cell is a text card with the verse reference, not an animated scene.
  - The second panel is a simple timeline with three ticks: object moment, sense contact, the judgement "我看见了它". It shows that by the time of the judgement the object moment is past.
- **Learner action:**
  1. For each criterion, decide whether the counter-example satisfies it without external objects.
  2. At the end, answer whether the grid proves "没有外物" or only "这些标准不能证明有外物".
  3. In the timeline, move the judgement tick and see that it never coincides with the object tick.
- **Philosophical feedback:**
  - the grid's final answer reproduces the manuscript's point that the four replies show the criteria are not sufficient, and that Vasubandhu's positive case rests on parsimony and the atomism argument;
  - SEP's interpretive options (inference to the best explanation, modus tollens, the argument from ignorance) are listed with their proponents.
- **Historical qualifications:**
  - the panel states that "perception laboratory" is a teaching metaphor and no experiment is simulated;
  - the Nyāya objection that dreams presuppose waking (the C&R) is linked as the strongest documented reply;
  - the Berkeley and Kant comparison is reached only through the separate comparison table, not merged into this grid.
- **Desktop / mobile:** on desktop, the grid is a table. On mobile, one criterion per card, swiped in sequence, and the timeline is vertical.
- **Minimal approach:** a `criteria` array of `{realist, counter, ref, satisfied: boolean}`; a `useState` record of answers; a timeline `<svg>` with three `<line>` ticks and an `<input type="range">` for the judgement tick.

### D. 三自性与藏识探索器 (Three Natures and Storehouse Consciousness Explorer) — recommended

- **Location:** Part 五, "### 藏识是不是灵魂？" (the ātman / ālaya comparison table), "### 三自性：同一个东西的三种看法" (the elephant table), and "### 识的究竟地位：一个没有定论的争论" (the five-row positions table).
- **Objective:**
  - distinguish the storehouse consciousness as an explanatory model of continuity (seeds, momentary, abandoned at liberation) from a permanent self;
  - see the three natures as three ways of seeing one thing;
  - see that later thinkers disagree about the ultimate status of consciousness.
- **Visual form:** three tabs.
  1. **藏识与自我:** two columns (ātman / ālaya). The row labels (常住?, 有自性?, 解脱时, 作用) reveal their cells one at a time. The ālaya column shows a flowing-stream line (Triṃś 4's simile) in place of any object-like icon.
  2. **三自性:** the text's own simile, the magician's elephant, as three labelled layers. A slider runs from "被骗的观众" to "明白的观众".
  3. **识的地位:** the five positions as a horizontal spectrum, from "依他起是空的所在" to "连心识也是空的". Each position carries a source chip: 原典 (MAV, BCA 9.17–18) or SEP.
- **Learner action:**
  - Tab 1: predict each ālaya cell before it is revealed.
  - Tab 2: move the slider, then answer which layer "exists".
  - Tab 3: place two quoted lines (MAV 1.2 "abhūtaparikalpo 'sti"; BCA 9.17 "cittaṃ cittaṃ na paśyati") on the spectrum.
- **Philosophical feedback:**
  - Tab 1: a wrong prediction (for example "常住") returns the manuscript's row text with Triṃś 4–5.
  - Tab 2: the manuscript's "认识到它就是解脱".
  - Tab 3: a closing note that Śāntarakṣita's synthesis is one proposal for reconciliation, and that the manuscript leaves its fairness as an open question.
- **Historical qualifications:**
  - fixed tags: "《三自性论》作者归属有争议"; "有相／无相之分据 SEP"; "《瑜伽师地论》大部分不含唯识说（SEP）";
  - the Chinese *Cheng weishi lun* is not used, because of the CN5 boundary.
- **Desktop / mobile:** tabs on desktop, an accordion on mobile. The slider and the spectrum are horizontal on both.
- **Minimal approach:**

```tsx
export function ThreeNatures() {
  const [t, setT] = useState(0); // 0 = deceived viewer, 100 = understanding viewer
  const op = (a: number, b: number) => Math.max(0, Math.min(1, (t - a) / (b - a)));
  return (<figure>
    <svg viewBox="0 0 320 200" aria-label="幻术之象的三层（《三自性论》的比喻）">
      <g opacity={1 - op(30, 60)}><path className="tn-elephant" d="M60 140 C60 60 220 60 220 140" /><text x="20" y="20">遍计所执</text></g>
      <g opacity={1 - op(70, 100) * 0.5}><path className="tn-appearance" d="M70 140 C70 80 210 80 210 140" /><text x="120" y="20">依他起</text></g>
      <g opacity={op(60, 100)}><rect className="tn-frame" x="50" y="50" width="180" height="100" /><text x="70" y="180">形相中没有象（圆成实）</text></g>
    </svg>
    <input type="range" min={0} max={100} value={t} onChange={e => setT(+e.target.value)} aria-label="观众的理解" />
  </figure>);
}
```

### E. 智慧与慈悲工作坊 (Wisdom and Compassion Workshop) — optional

- **Location:** Part 六, "### 寂天和《入菩萨行论》" (the bodhicitta passage, BCA 1.15–16, and the four-argument table), "### 自他平等：无主的苦" (the 8.94–8.103 table) and "### 空与慈悲".
- **Objective:**
  - follow how Śāntideva argues from metaphysics to ethics;
  - locate the extra premise the argument needs ("苦本身是坏的");
  - keep the argument separate from the devotional practice the book also contains.
- **Visual form:** a vertical stepper of objection and reply pairs, 8.97 → 8.103. The 8.103 dilemma is drawn as a two-branch fork: 要消除 → 一切苦; 不要消除 → 自己的苦也不消除.
  - A side rail shows the four Lele arguments (anger, body, no-self, emptiness) and highlights the one in play.
  - An opening card states the bodhicitta distinction (aspiration / engagement) and the manuscript's note that rites and devotion are part of the book but are not the arguments being examined.
- **Learner action:**
  1. For each objection, choose the reply they expect, then reveal Śāntideva's.
  2. At the fork, choose a branch.
  3. Finally, rate the argument on the three views from practice question in4-6-3.
- **Philosophical feedback:**
  - the manuscript's row text for each step;
  - at the end, the in4-6-3 notes, each with its strength and its cost;
  - the Williams-type objection is labelled as the course's summary of SEP;
  - the Parfit comparison is labelled as SEP's.
- **Historical qualifications:**
  - BCA numbering varies between editions (GRETIL and SEP *Madhyamaka* 9.35; SEP *Śāntideva* IX.34);
  - the hagiographic Nālandā story is mentioned only as legend.
- **Desktop / mobile:** a vertical stepper on both; the side rail becomes a top chip row on mobile.
- **Minimal approach:** `<ol>` of `<details>`, a small inline SVG for the fork, and `useState` for choices. No animation.

**Not proposed:** a 归谬与立论对照器 for Part 三 (an earlier draft idea). The "分歧在哪里" table already does this work, and a stepper there risks dramatising a reconstructed "dialogue" beyond what the sources document.

## 7. Practice data

- **Count:** 6 sets × 3 = 18 questions, labelled 一 to 六 to match 想一想（一）…（六）.
- **Types:** 7 single, 3 multi, 5 tf, 3 view.
- **Single-answer positions:** A 2, B 2, C 2, D 1.
- **tf answers:** 2 true, 3 false.
- **Multi answers:** A-B-D, B-C-D, A-C-D.
- **IDs:** `in4-{set}-{question}`.
- **Compatibility:**
  - checked against the current `src/content/practice.ts` types, using a byte-identical copy compiled in the scratchpad with `tsc --strict`: 0 errors;
  - the check script confirms at most 3 questions per set, unique IDs, valid answers, and a note on every option.
- **Not wired in.** The full data is in Appendix A, ready to be saved as `src/content/practice-in4.ts` if approved.

## 8. Images and rights (shortlist only; nothing downloaded)

The metadata below was read from the Wikimedia Commons API (`imageinfo` / `extmetadata`) on 2026-11-09. No file was downloaded. Rights are as stated by Commons and have not been checked against the holding institution unless noted.

| # | Object | Period | Institution | Commons file / URL | Rights (per Commons) | Attribution | Placement | Value and caveats |
|---|---|---|---|---|---|---|---|---|
| 1 | Four leaves from an Aṣṭasāhasrikā Prajñāpāramitā manuscript (Mañjuśrī, Prajñāpāramitā, Tārā, a Dharmapāla) | c. 1151–1200, Bihar or Bengal | Asia Society, New York | [File:Four Leaves from an Ashtasahasrika Prajnaparamita Manuscript.jpg](https://commons.wikimedia.org/wiki/File:Four_Leaves_from_an_Ashtasahasrika_Prajnaparamita_Manuscript.jpg) | Public domain | Unknown artist; image via Google Arts & Culture | Part 一 | **High value:** a real manuscript of the text quoted in 导读 and Part 一. The caption must say the manuscript is about a thousand years later than the sūtra's earliest Chinese translation. Check the Asia Society's own image terms. |
| 2 | Aṣṭasāhasrikā, decorated leaf (1938.301.5) | 1119 (per Commons) | Cleveland Museum of Art | [File:…Decorated Leaf - 1938.301.5 - Cleveland Museum of Art.tiff](https://commons.wikimedia.org/wiki/File:Anonymous_-_Perfection_of_Wisdom_in_Eight_Thousand_Lines,_Ashtasahasrika_Prajnaparamita,_Decorated_Leaf_-_1938.301.5_-_Cleveland_Museum_of_Art.tiff) | Public domain | Anonymous; Cleveland Museum of Art | Part 一 (alternative to 1) | Very wide format (6049×922). **Prefer the CMA Open Access record** (clevelandart.org/art/1938.301.5) as the source of record. The same caveat about the later date applies. |
| 3 | Nāgārjuna, Tibetan image | 1644–1911 | Sichuan Provincial Museum, Chengdu | [File:Nagarjuna, Tibet, 1644-1911 AD - Sichuan Provincial Museum - Chengdu, China - DSC04486.jpg](https://commons.wikimedia.org/wiki/File:Nagarjuna,_Tibet,_1644-1911_AD_-_Sichuan_Provincial_Museum_-_Chengdu,_China_-_DSC04486.jpg) | Public domain (photographer's release) | Photo: Daderot | Part 二 | Late Tibetan iconography of a legendary figure. The caption must say it reflects later Tibetan reception, not a portrait. It suits the Part 三 point about Tibetan classification. |
| 4 | Seshin (Vasubandhu), wood, 186 cm, by Unkei | c. 1208 | Kōfukuji, Northern Octagonal Hall, Nara | [File:Seshin Vasubandhu Kofukuji.jpg](https://commons.wikimedia.org/wiki/File:Seshin_Vasubandhu_Kofukuji.jpg) | Public domain (per Commons) | Sculptor Unkei; photo Fujimoto Shihachi, published 1952 | Part 四 | Striking, and widely reproduced. **Rights risk:** the photograph (1952, Fujimoto Shihachi, d. 2006) is tagged PD; verify the basis before use. **Boundary risk:** this is Japanese reception, so the caption must say so and must not suggest it depicts the Indian author. |
| 5 | Prajñāpāramitā statue, Singhasari | 13th century, East Java | (statue location not verified; the Commons description gives the find-spot near Singhasari temple) | [File:Prajnaparamita Java Front.JPG](https://commons.wikimedia.org/wiki/File:Prajnaparamita_Java_Front.JPG) | CC BY-SA 3.0 | Gunawan Kartapranata | Part 一 (optional) | Shows the later personification of "wisdom" as a goddess. Javanese, not Indian; the caption must say so. Share-alike applies to the image. |
| 6 | Nālandā ruins | photo 2023 | Nālandā archaeological site, Bihar | [File:Nalanda Ruins (13).jpg](https://commons.wikimedia.org/wiki/File:Nalanda_Ruins_(13).jpg) | CC BY-SA 4.0 | Sumitsurai | 导读 or Part 三 (optional) | A setting image only. Do not claim that particular Mādhyamikas worked in the visible structures; the associations are traditional. |

- **Yogācāra textual artifacts (spec category).** A second, metadata-only Commons search was run on 2026-11-09. The queries were Yogācārabhūmi, Triṃśikā/Viṃśatikā, Madhyāntavibhāga, "Vasubandhu manuscript" and related terms. No Sanskrit manuscript image of a Yogācāra treatise was found. The two nearest results are recorded here but **not recommended for IN4**:
  - *The Completion of Mere Ideation* (Jōyuishikiron = *Cheng weishi lun*). Kasuga edition, Kōfukuji, Nara; 1300–1399 per Commons; via the World Digital Library; Public domain per Commons. URL: <https://commons.wikimedia.org/wiki/File:The_Completion_of_Mere_Ideation_WDL11843.jpg>.
    - It is a real Yogācāra textual artifact, but it is Chinese-to-Japanese reception of a text that follows Dharmapāla.
    - Using it in IN4 would risk attributing the *Cheng weishi lun* to Vasubandhu, which is exactly the CN5 boundary.
    - Better offered to CN5.
  - Yaśomitra's *Abhidharmakośa-vyākhyā*, BnF Sanscrit 5; a 19th-century copy per Commons; Public domain. URL: <https://commons.wikimedia.org/wiki/File:Abhidharmako%C5%9Ba-vy%C4%81khy%C4%81._Abhidharmako%C5%9Ba-vy%C4%81khy%C4%81._-_btv1b100829293_(032_of_170).jpg>.
    - This is Abhidharma, not Yogācāra, so it belongs to IN2.

  If the PO wants an image for Part 四/五, the Seshin statue (4) remains the only candidate, and it carries its reception caveat. A Sanskrit Yogācāra manuscript image would need a direct institutional source, for example a Nepalese or Tibetan collection. This was not searched further, as the spec asked for no broad licensing investigation.
- **Not shortlisted:** the modern Śāntideva relief at Buddhavanam, Telangana (CC BY-SA 4.0, Anandajoti, 2024). It is a 21st-century work and would add nothing historical. Dunhuang Diamond Sūtra images were also left out, because they belong to CN5's Chinese-reception territory.
- **Recommendation:** 1 (or 2), 3 and, if the photo's PD basis is confirmed, 4, all with the captions noted. 5 and 6 only if a part needs an image.
- **Records:** every image used needs a SOURCES.md entry and an on-page credit, following the standing image rule. This phase downloaded nothing.

## 9. Rights and uncertainties

The full list of ten items is in the manuscript appendix ("仍不确定的事项"). The most important for review:

1. **GRETIL licence.** All 15 quoted files carry CC BY-NC-SA 4.0 in the 2020 mass-conversion header, with a good-faith notice. Whether short quotation is affected by the NC/SA terms needs a PO or legal decision. The same open question was raised for IN2 and IN3.
2. **CBETA.** The default is CC BY-NC-SA 4.0 for non-profit use, with category-B exceptions. Taishō vols. 8, 30 and 31 are category A. The file headers add "Available for non-commercial use when distributed with this header intact". The copyright page was read in Phase 15B and not re-read in this phase.
3. **Heart Sūtra.** The Nattier back-translation hypothesis is reported only through a general caveat; the original study was not read.
4. **Bhāviveka.** The interpretation of the *caitanya* example is the course's own.
5. **Trisvabhāvanirdeśa authorship.** Contested (SEP, citing Kapstein 2018).
6. **BCA numbering.** Different editions number some chapter 9 verses differently (GRETIL and SEP *Madhyamaka*: 9.35; SEP *Śāntideva*: IX.34). The bodhicitta passage is quoted as 1.15 from the GRETIL file.
7. **Williams/Siderits.** Known only through SEP. The objection in Part 六 is worded as the course's own summary.
8. **Ultimate status of consciousness.** The five-position table (sākāra/nirākāra, three-nature readings, the Śāntarakṣita synthesis) is entirely via SEP. Only the Śāntideva row (BCA 9.17–18a) and MAV 1.2 are quoted from the original.

## 10. Cross-course boundaries

- **IN2 (early Buddhism and Abhidharma).**
  - IN4 does not re-teach the five aggregates, the chariot, momentariness or AK 6.4. It refers back to them: the 导读 reminder, the Part 一 opening, and the 结语 table row "阿毗达磨（前一门课程）".
  - IN2's forward references use the old title 《中观与瑜伽行》. IN2 was not edited; the PO may want to align the title at integration.
- **IN3 (Nyāya and Buddhist logic).** Dignāga and Dharmakīrti are not re-taught.
  - Part 三 mentions only that Bhāviveka borrowed the Dignāga-style syllogism form.
  - IN4's C&R uses NS 4.2.31–34, a different passage from IN3's Nyāya material.
- **CN5 (Chinese Buddhism).**
  - Chinese texts are quoted only as historical translations: T224 translator line; T1564 for comparison only; T1566 for Bhāviveka; T1590 for Xuanzang's Viṃś verse.
  - No Chinese interpretation (Sengzhao, Tiantai, Huayan, Faxiang/Cheng weishi lun) is attributed to an Indian author. SEP's note that Xuanzang's *Cheng weishi lun* follows Dharmapāla is left to CN5.
  - The Kōfukuji image (§8, 4) carries a reception caveat.
- **IN5 / IN6.** IN4 mentions Kumārila's anti-Yogācāra and anti-Madhyamaka chapters by title only and points to IN5. The unsupported "pracchanna-bauddha" claim about Śaṅkara was removed during drafting, and IN6 is not anticipated.
- **D2 / D3 / S4.** These are named in the 结语 as places where no-self, cross-traditional argument rules and personal identity are taken up systematically. Nothing from them is presupposed.

## 11. Readiness

- **Ready for PO reading and expert review.** The manuscript is complete. Quotations are verified (Sanskrit by script; Chinese by script). Notes and the sources appendix are complete, and the practice data compiles.
- **Not ready for publication.** It still needs:
  - expert review, especially of Parts 三 and 五;
  - a decision on GRETIL and CBETA NC/SA compatibility;
  - image decisions.
- **If a Phase 16B is approved:** add `practice-in4.ts` from Appendix A, build at most the components the PO selects, and record any images in SOURCES.md. Work stopped here as instructed and has not started Phase 16B.
- **Format checks done:**
  - CRLF line endings: 1,248 CRLF and 0 bare LF;
  - 119 footnote references, each with exactly one definition, renumbered by first appearance;
  - every in-note cross-reference ("同注 N", "注 N、M") was re-mapped after renumbering, and each was checked to point at the intended note;
  - 6 想一想 blocks matching set labels 一 to 六;
  - Markdown render: parsed with the project's own `marked` into 11 h2, 43 h3, 23 tables and 73 blockquotes, with no raw table pipes left in the output; a table-column lint found 0 rows with a mismatched cell count.

## Appendix A. Practice data (draft `practice-in4.ts`)

Typechecked with `tsc --strict` against a byte-identical copy of `src/content/practice.ts`; not added to the repository.

```ts
import type { PracticeSet } from './practice';

// 《大乘哲学：中观与瑜伽行派》· 想一想 as selection questions.
// Each set follows its exercise in content/IN4_SAMPLE_DRAFT.md (labels 一 to 六).
// Phase 16A proposal only: not wired into the site.
export const IN4_PRACTICE: PracticeSet[] = [
  {
    label: '一',
    lede: '原题请你判断哪些说法符合般若经中"空"的意思，并想一想"没有一个法是如来所说的"应当怎样读。',
    questions: [
      {
        id: 'in4-1-1', type: 'single',
        stem: '《心经》说"空不离色，色不离空"。按照本章的读法，这句话的要点是什么？',
        options: [
          { id: 'a', text: '空是色背后的另一个真实世界，色只是它的表象。', note: '经文说的正好相反：空不在色之外。把空当作色背后的实在，是本章特别提醒要避免的读法。' },
          { id: 'b', text: '说色是空的，就是说色本身没有自性；空不是色之外的另一个东西。', note: '对。"空"在般若经中的意思是"没有自性"，而不是"什么都没有"。' },
          { id: 'c', text: '色根本不存在，所以说它是空。', note: '这是把"空"读成"不存在"。般若经接下来仍然具体地讲修行和布施，说明它并不否认色的显现。' },
        ],
        answer: 'b',
      },
      {
        id: 'in4-1-2', type: 'tf',
        stem: '现存的《心经》梵文本早于汉译，这一点在学术界没有争议。',
        answer: false,
        wrong: '有争议。有一种影响很大的看法认为，现存的梵文本可能是从汉文回译的。本章因此只用《心经》说明一种典型说法，主要依靠更早、更可靠的《八千颂般若经》。',
      },
      {
        id: 'in4-1-3', type: 'view',
        stem: '《金刚经》说"没有一个法是如来所说的"，可是经文本身就是如来所说的。你认为哪一种读法最好？',
        options: [
          { id: 'a', text: '矛盾说：经文故意说矛盾的话，以超越逻辑。', note: '优点：解释了经文的语气。代价：如果真是矛盾，就什么都可以说，经文也就没有教导什么。' },
          { id: 'b', text: '两层说：在世俗中有如来所说的法，在胜义中没有。', note: '优点：消除了矛盾，符合后来"二谛"的框架。代价：经文本身没有明说这两个层次，这是用后来的框架去读它。' },
          { id: 'c', text: '治疗说：否定的不是事物，而是对事物的执着。', note: '优点：符合经文对修行的关心。代价：容易把哲学主张变成单纯的劝告，回避"事物到底有没有自性"的问题。' },
        ],
      },
    ],
  },
  {
    label: '二',
    lede: '原题请你判断《中论》1.1 否定的是什么，并想一想"凡是缘起，就是空性"能不能回答"虚无主义"的指控。',
    questions: [
      {
        id: 'in4-2-1', type: 'single',
        stem: '《中论》1.1 否定了"从自己、从他物、从两者、无因"四种生起。按照本章的分析，这四句共同预设了什么？',
        options: [
          { id: 'a', text: '因果关系根本不存在。', note: '龙树的结论不是因果不可能，而是原因和结果都没有自性。SEP 的介绍也强调这一点。' },
          { id: 'b', text: '语言不能描述任何东西。', note: '这是对中观派的一种常见误解；1.1 讨论的是生起，不是语言的限度。' },
          { id: 'c', text: '有一个有自性的东西在生起。', note: '对。四句都预设了"有自性的东西生起"，所以被一并否定。' },
        ],
        answer: 'c',
      },
      {
        id: 'in4-2-2', type: 'multi',
        stem: '面对"一切都空，就什么都不能成立"的指控，下列哪些是本章读到的、有文献依据的中观派回应？（可多选）',
        options: [
          { id: 'a', text: '有自性的东西才不能变化；正因为空，一切才能成立。', note: '对。这是《中论》24.14 一带的回应。' },
          { id: 'b', text: '凡是缘起的，就是空性。', note: '对。这是《中论》24.18 的说法：空性与缘起是同一件事的两面。' },
          { id: 'c', text: '空性就是什么都不存在，所以指控者说得对，只是这不要紧。', note: '这正是中观派要拒绝的读法：空不等于不存在。' },
          { id: 'd', text: '我没有（关于自性的）主张；幻人可以阻止幻人。', note: '对。这是《回诤论》第 23、29 颂的回应。' },
        ],
        answer: ['a', 'b', 'd'],
      },
      {
        id: 'in4-2-3', type: 'tf',
        stem: '四句在龙树那里只有一种用法：把四种可能全部否定。',
        answer: false,
        wrong: '不止一种。1.1 是全部否定；18.8 把四句都当作佛陀对不同听众的循序教法；22.11 则说"空"等语词只是为了施设而说，不应执为定论。',
      },
    ],
  },
  {
    label: '三',
    lede: '原题请你判断佛护、清辨、月称各自的方法，并想一想"自续派"和"应成派"的分类能不能直接用来描述印度的这场争论。',
    questions: [
      {
        id: 'in4-3-1', type: 'single',
        stem: '清辨在批评佛护时，自己提出的推理有什么特点？',
        options: [
          { id: 'a', text: '提出宗、因、喻完整的推理，并在宗上加"在胜义中"的限定。', note: '对。月称《明句论》转述了这个推理，汉译《般若灯论》也保存了它（"以有故"）。' },
          { id: 'b', text: '只推出对方立场的荒谬结果，自己不立任何命题。', note: '这是佛护的方法，也是月称为之辩护的方法。' },
          { id: 'c', text: '完全放弃推理，只引用经典。', note: '清辨恰恰重视推理，借用了陈那一系的论式。' },
          { id: 'd', text: '先接受数论派的全部前提，再在世俗层次上反驳。', note: '实例"例如心识"可能是为了让数论派也承认，但清辨并不接受数论派的全部前提；本章对这一实例的解释也只是一种常见说法。' },
        ],
        answer: 'a',
      },
      {
        id: 'in4-3-2', type: 'single',
        stem: '月称为什么认为中观派不应当提出自立的推理？',
        options: [
          { id: 'a', text: '因为推理总是错误的。', note: '月称并不一般地否定推理；他讨论的是中观派能否提出双方共同承认前提的推理。' },
          { id: 'b', text: '因为清辨的推理在形式上违反了陈那的规则。', note: '月称的批评不是形式上的，而是关于主词是否被双方共同承认。' },
          { id: 'c', text: '因为世俗的说法都应当被否定。', note: '月称恰恰主张接受世间的说法，"世间与我争论，我不与世间争论"。' },
          { id: 'd', text: '因为中观派和对方对"眼等感官"是否真实这一点没有共同的认识，推理的主词不能成立（"所依不成"）。', note: '对。月称说颠倒与不颠倒是不同的，双方没有共同承认的主词。' },
        ],
        answer: 'd',
      },
      {
        id: 'in4-3-3', type: 'tf',
        stem: '"自续派"和"应成派"这两个名称，是许多世纪以后西藏学者为整理印度中观思想而建立的分类，印度的中观论师自己并不使用。',
        answer: true,
        wrong: '这是本章依据 SEP 的说法。分类所依据的争论（佛护、清辨、月称之间）是真实的，但分类本身是后来的。',
      },
    ],
  },
  {
    label: '四',
    lede: '原题请你判断世亲对四个反驳的回答，并想一想把世亲称为"唯心论者"最容易在哪一点上产生误导。',
    questions: [
      {
        id: 'in4-4-1', type: 'multi',
        stem: '下列"反驳—世亲的例子"的配对，哪些符合《唯识二十论》第 3—4 颂？（可多选）',
        options: [
          { id: 'a', text: '对象的作用 —— 地狱的狱卒。', note: '对象的作用对应的是梦遗（第 4 颂）。地狱的例子用来同时回答全部反驳。' },
          { id: 'b', text: '地点和时间的确定 —— 梦。', note: '对。梦中的经验也有确定的地点和时间（第 3 颂）。' },
          { id: 'c', text: '不同心识之流的共同经验 —— 饿鬼共同看见充满脓血的河。', note: '对（第 3 颂）。' },
          { id: 'd', text: '以上全部 —— 地狱众生共同看见并被狱卒折磨。', note: '对（第 4 颂）。' },
        ],
        answer: ['b', 'c', 'd'],
      },
      {
        id: 'in4-4-2', type: 'single',
        stem: '在本章的比较表中，世亲和贝克莱最明显的差别在哪里？',
        options: [
          { id: 'a', text: '是否否认心外的物质对象。', note: '在这一点上两人相似：都否认心外的物质对象。' },
          { id: 'b', text: '是否有神：贝克莱的神是保证经验秩序的关键，世亲没有创造或维持世界的神。', note: '对。世亲用业的习气和众生的相互影响来解释经验的秩序。' },
          { id: 'c', text: '是否使用论证。', note: '两人都大量使用论证：世亲反驳外物论者和原子论，贝克莱反驳物质实体的概念。' },
        ],
        answer: 'b',
      },
      {
        id: 'in4-4-3', type: 'view',
        stem: '把世亲称为"唯心论者"，你认为最容易在哪一点上产生误导？',
        options: [
          { id: 'a', text: '它暗示有一个实体性的心灵或灵魂，而世亲只承认刹那生灭的心识之流。', note: '优点：抓住了与贝克莱的重要差别。代价：一般意义的"唯心论"不一定要求灵魂实体。' },
          { id: 'b', text: '它暗示有一个保证秩序的神，而世亲没有。', note: '优点：指出了与贝克莱最明显的差别。代价：对康德式的读法不适用，因为康德也不靠神来保证经验的秩序。' },
          { id: 'c', text: '它把一个可能只是认识论的主张，读成了关于"什么存在"的本体论主张。', note: '优点：对应 SEP 介绍的认识论读法与本体论读法之争。代价：许多学者认为《唯识二十论》的确在作本体论的论证（例如反驳原子论）。' },
        ],
      },
    ],
  },
  {
    label: '五',
    lede: '原题请你判断哪些说法符合《唯识三十颂》对藏识的说明，并用"幻术变出的象"判断三自性各指什么。',
    questions: [
      {
        id: 'in4-5-1', type: 'multi',
        stem: '下列哪些说法符合《唯识三十颂》对藏识的说明？（可多选）',
        options: [
          { id: 'a', text: '它像激流一样流动，刹那生灭。', note: '对（第 4 颂）。' },
          { id: 'b', text: '它是常住不变的真正自我，解脱时被认识、被实现。', note: '这是奥义书中自我（ātman）的特征，正是本章比较表要区分的。' },
          { id: 'c', text: '到阿罗汉位时被舍弃。', note: '对（第 5 颂）。' },
          { id: 'd', text: '末那识以它为对象，把它误认为"我"。', note: '对（第 5—7 颂）。' },
        ],
        answer: ['a', 'c', 'd'],
      },
      {
        id: 'in4-5-2', type: 'single',
        stem: '幻术师用咒语和木头变出一头象。观众明白"那个形相中没有象"。这对应三自性中的哪一个？',
        options: [
          { id: 'a', text: '遍计所执性。', note: '遍计所执对应的是"一头真的象站在那里"：被执着的对象，完全不存在。' },
          { id: 'b', text: '依他起性。', note: '依他起对应的是"一个象的形相在那里显现"：依赖咒语和木头而生起的显现。' },
          { id: 'c', text: '圆成实性。', note: '对。显现中没有被执着的对象，认识到这一点就是解脱。' },
        ],
        answer: 'c',
      },
      {
        id: 'in4-5-3', type: 'tf',
        stem: '《三自性论》出自世亲之手，这一点在学术界没有争议。',
        answer: false,
        wrong: '有争议。SEP 的瑜伽行派条目说这部书的作者归属是有争论的（引用 Kapstein 2018）。本章称它为"归于世亲的《三自性论》"。',
      },
    ],
  },
  {
    label: '六',
    lede: '原题请你判断寂天在 8.97—8.103 中对各个反驳的回答，并想一想"一切苦都是没有主人的"能不能支持"应当消除一切苦"。',
    questions: [
      {
        id: 'in4-6-1', type: 'single',
        stem: '寂天在 8.99 用"手保护脚"作比喻，回应的是哪一个反驳？',
        options: [
          { id: 'a', text: '谁的苦就由谁来保护。', note: '对。脚的苦不是手的苦，手却去保护脚；可见"苦属于谁"并不决定是否应当保护。' },
          { id: 'b', text: '他人的苦不伤害我。', note: '这是 8.97 的反驳，寂天用"未来身体的苦现在也不伤害你"来回答。' },
          { id: 'c', text: '那时也还是我。', note: '这是 8.98 的反驳，寂天回答：死去的是一个，出生的是另一个。' },
          { id: 'd', text: '那为什么要消除苦？', note: '这是 8.103 的两难所回应的问题。' },
        ],
        answer: 'a',
      },
      {
        id: 'in4-6-2', type: 'tf',
        stem: '8.103 的两难是：如果要消除苦，就要消除一切苦；如果不要消除，那么自己的苦也不要消除。',
        answer: true,
        wrong: '这正是 8.103 的结构：对方不能只关心自己的苦，又不承认关心他人之苦的理由。',
      },
      {
        id: 'in4-6-3', type: 'view',
        stem: '"一切苦都是没有主人的"这一前提，能不能支持"应当消除一切苦"的结论？',
        options: [
          { id: 'a', text: '能：消除苦的理由在于苦本身是坏的，与它属于谁无关；没有主人，正好去掉了偏爱自己的理由。', note: '优点：与 8.94—8.96 的思路一致，也与 Parfit 关于人格同一性的讨论相呼应。代价：需要"苦本身是坏的"这一独立的前提。' },
          { id: 'b', text: '不能：如果苦没有主人，也可以推出苦不重要，没有理由消除任何苦。', note: '优点：指出了论证的对称性：去掉主人，也可能去掉关心的理由。代价：寂天会说，苦被经验为苦，这一点不因没有主人而改变。本章把这类反驳归在 Williams 名下时，只是依据 SEP 的概括。' },
          { id: 'c', text: '只能部分地支持：它能削弱"只关心自己"的理由，但不能单独建立"关心一切"的义务。', note: '优点：区分了论证的消极作用和积极作用。代价：寂天的文本本身是要建立积极的结论的，这种读法比寂天的论证弱。' },
        ],
      },
    ],
  },
];
```

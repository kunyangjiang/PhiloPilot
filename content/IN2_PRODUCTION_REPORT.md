# IN2 制作报告（Phase 15A）

*Supporting report for `content/IN2_SAMPLE_DRAFT.md` (《早期佛教与阿毗达磨：苦、无我与缘起》). Written in Phase 15A as a proposal for Product Owner review. Nothing in this report has been built, integrated, committed or deployed.*

## 1. Structure and length

| Part | Core problem | Key passages read in the original |
|---|---|---|
| 导读 | Nāgasena's name, Vajirā's chariot, a nun's voice; five material types; Abhidharma 世俗/胜义 ≠ Madhyamaka two truths | — |
| 一 四圣谛 | What *dukkha* is; the four tasks; the medical analogy and its limits | SN 38.14; SN 56.11 (2.3–10.1) |
| 二 缘起 | Conditionality, not a single chain; nine-link and "turning back" versions; four readings | MN 38; MN 28; SN 12.1, 12.15, 12.17, 12.20, 12.65, 12.67; DN 15; SN 44.10; AK 3.20 |
| 三 无我与人格同一性 | What the chariot does and does not prove; responsibility, memory, who speaks; Pudgalavāda | MN 44; SN 22.22; SN 5.10; Milinda (mil3.1.1, 3.2.1, 3.2.6); Kv 1.1; AKBh ch. 9 (461–463) |
| 四 阿毗达磨 | From Dharma to dharmas; classification; conventional/ultimate in AK 6.4 | Dhs mātikā; AK 6.4 + AKBh 334 |
| 五 刹那与因果 | Momentariness; "does everything exist?"; Vasubandhu's critique; karma and continuity | AN 3.47; AK 4.2 + AKBh 193; AK 5.25–27 + AKBh 295–301; Kv 1.6; AK 4.1; AKBh ch. 9 (477) |
| 六 伦理、心与道 | Intention as karma; the path's three groups; what kind of ethics | AN 6.63; Dhp 1–2; MN 44 |
| 七 早期女性的声音（mandatory） | The ordination story and its tensions; "foremost" nuns; Somā, Khemā, Mahāpajāpatī, Muttā, Paṭācārā; shared verses | kd20 (Cullavagga X); AN 1.235–247; Thig 1.11, 3.8, 5.10, 6.3, 6.6, 11.1; SN 5.2 |
| 结语 | Links to IN3 and to 《中观与瑜伽行》 | — |
| 后世批判与回应 | Nyāya's "who remembers?" vs AKBh 9 | NS 3.1.1–3, 3.1.13–14; Vātsyāyana on 1.1.30, 3.1.14, 3.2.39; AKBh 472–477 |
| 注释 / 来源与权利说明 | 94 notes; sources, rights, uncertainties | — |

- **Size:** 58,215 characters in total (31,849 CJK characters), counted with Python on the final file. The body (导读 to 结语) is about 40,000 characters; Critiques & Responses about 4,500; notes about 8,600; sources appendix about 4,600.
- **Composition:** 7 practice blocks, 18 tables, 56 primary-text blocks (original + course translation), 94 notes.
- **Spec coverage:** all seven required parts are present. The chariot is explicitly presented as *not* proving that persons do not exist (Part 三, "what it doesn't prove"). Part 七 is substantive (about 6,500 characters), with named women and their own verses. Part 五 offers no Madhyamaka or Yogācāra solutions; it only notes where those courses take the problem up.
- **Length.** About 40,000 characters of body text is longer than IN1's body (about 29,400). The spec sets no limit, so I made no cuts. If the PO wants a shorter version, the candidates are the four-readings table in Part 二 and the four objections in Part 三.

## 2. Main arguments

| Part | Argument presented | How it is framed |
|---|---|---|
| 一 | *Dukkha* is a diagnosis within a four-part structure, not a mood | SN 56.11's tasks: comprehend / abandon / realise / develop |
| 二 | Conditionality is a family of sequences, not one fixed chain | Twelve-link (SN 12.1), nine-link (DN 15), mutual dependence (SN 12.65, 12.67); AK 3.20's three-lives reading is marked as a later systematisation |
| 三 | The chariot argument in six steps; what it establishes and what it does not | Six-step reconstruction (course's own); four objections; Pudgalavāda via its opponents only |
| 四 | Abhidharma conventional/ultimate as an analysis that ends in dharmas | AK 6.4 criterion; "they speak truly, not falsely"; explicit table contrasting with Madhyamaka |
| 五 | Three positions on time and their costs | Sarvāstivāda's four reasons and four masters; Vibhajyavāda; Vasubandhu's Sautrāntika critique from the AKBh he actually wrote |
| 六 | Intention is the locus of karma; the ethics is hard to classify | AN 6.63; SEP's consequentialist and virtue readings, attributed |
| 七 | Women's voices are present, but the sources need careful reading | Textual tensions in kd20 are pointed out; no claims are made about the story's date; shared verses are discussed |
| C&R | Unity of experience vs causal continuity | Vātsyāyana's anti-"mere series" passage (documented); Vasubandhu's replies (documented); their relation (school-level) |

## 3. Primary texts and verification

- **Pali.** All Pali comes from the SuttaCentral bilara-data root texts (Mahāsaṅgīti). I read 108 files and quote 30 of them. For the list of files, see the manuscript's sources appendix.
- **Sanskrit.** All Sanskrit comes from GRETIL plaintext files:
  - Abhidharmakośa;
  - Abhidharmakośabhāṣya (Pradhan page|line references);
  - Nyāyasūtra;
  - Nyāyasūtra with Vātsyāyana's commentary.
- **Script check.** A script compares every primary-text blockquote, and every quoted romanised string in the text and notes, against the downloaded sources, after normalising spacing, punctuation and case.
  - 106 strings were checked; 100 match.
  - The remaining 6 are not quotations: 4 are English titles of SEP entries, 1 is the technical term *brahmavihāra*, and 1 is the Dhs mātikā line, whose three phrases are separated in the source by paragraph numbers.
  - The checker found and fixed several mismatches: *upalabbhatī* (long ī), *sabbamatthī*, *mṛṣetyetat*, *tatpūrvakātsaṃtānaviśeṣād*, *nopapadyata*, *vimucyata*, *tīrthakārāstepāmeva* and *buddhiprabandhamātre*. The last one had been mis-remembered as *buddhisantatimātre*; it was corrected in both the text and the note.
- **GRETIL typos** are kept as they appear, with the correct reading given in a note:
  - *kasyevaṃ* for *kasyeyaṃ*;
  - *brūbantaḥ*, *vanāśaś*, *vīja*;
  - *tīrthakārāstepāmeva*.
- **Quotations not verified in the original** are marked as such in the notes:
  - Vibh 100–101 and Mp I 94–97 (via SEP);
  - the Pali parallel to AKBh's *sarvam asti … dvādaśāyatanāni*;
  - Buddhaghosa's three-lives reading.

## 4. Terminology

The main choices are listed in the sources appendix (译文决定):

| Term | Rendering |
|---|---|
| *dukkha* | 苦 (its limits are discussed) |
| *anattā* | 无我 |
| *paṭiccasamuppāda* | 缘起 |
| *khandha* | 蕴 |
| *dhamma* | 法 or 诸法 |
| *sammuti* / *paramattha* | 约定 or 世俗 / 最高意义 or 胜义 |
| *puggala* | 人; the school is 补特伽罗论 |
| *santati* | 相续 |
| *cetanā* | 意图 (traditional rendering 思) |

- **Names.** Traditional Chinese Buddhist forms are used where they exist: 舍利弗, 大爱道, 法施, 讖摩, 莲花色, 世友, 法救, 妙音, 觉天. Course transliterations are used otherwise: 瓦吉拉, 慕达, 帕塔查拉.
  - **PO decision:** confirm a house style for nun names. 帕塔查拉 could instead be the traditional 波吒左罗.
- **The key boundary term.** 世俗有/胜义有 is introduced in the 导读 and again in Part 四 with the explicit warning that it is not the Madhyamaka 二谛. A contrast table supports the warning.

## 5. Critiques & Responses decision

**Decision: included.** The section is about 4,500 characters.

- **Why.** The main text contains only Buddhist-internal disputes: Nāgasena vs the king (inside a Buddhist text), Theravāda vs Pudgalavāda, and Vasubandhu vs Sarvāstivāda. A documented external critique adds something the main text lacks: an opponent who does not share Buddhist premises. The memory and recognition objection is the natural candidate, because Part 三 defers it explicitly ("留到后世批判与回应").
- **Content.**
  - NS 3.1.1 (synchronic synthesis): the sūtra and the argument direction are documented; the step table is the course's reconstruction.
  - Vātsyāyana on NS 3.1.14: memory's content is "I knew that object"; *saṃskārasantatimātre … nāsty eko 'pi saṃskāro yas trikālaviśiṣṭaṃ jñānaṃ smṛtiṃ cānubhavet*. This is documented. That it targets a Buddhist-style view is flagged as the course's judgement, since the text names no school.
  - Vātsyāyana on NS 3.2.39 (*buddhiprabandhamātre … nirātmake*): documented.
  - Vasubandhu, AKBh 472–477: memory from a special mind in the continuum; the genitive "whose?" analysed as cause (with his sarcastic *aho sūktāni sukhaidhitānām*); "Devadatta walks"; the agent and enjoyer; seed and fruit. All documented.
  - The two authors' relation is tagged **school-level**: there is no evidence that Vasubandhu read Vātsyāyana.
- **Evaluation.** A short section that the course marks as its own view.
- **Hand-off.** Points forward to IN3 Part 六.
- **Placement.** It follows IN1's format, coming after 结语 and before 注释.

## 6. Media plans (proposals, not built)

These are shared safeguards, as for IN1:
- They use only passages already verified in the manuscript.
- They show the source tier: 原典 / 注释 / 二手转述 / 本章重建.
- They add no new claims.
- They follow the Swiss UI tokens, with no new colours.
- They work without JavaScript, keeping the manuscript's existing table as a fallback.

### 6.1 缘起序列对照器 (Dependent-origination sequence comparer)

- **Location:** Part 二, replacing the static "four readings" table. The table stays as the fallback.
- **Objective:** see that "dependent origination" covers several sequences, and that the three-lives grouping is a later systematisation.
- **Visual form:** four horizontal lanes of link-chips:
  - SN 12.1 (twelve);
  - DN 15:3.1 (nine, starting at nāmarūpa ⇄ viññāṇa);
  - SN 12.65 (with a loop arrow at viññāṇa ⇄ nāmarūpa);
  - AK 3.20 (twelve, with brackets for past, present and future).
  
  Missing links are shown as dashed empty slots, never simply left out.
- **Learner actions:** toggle lanes on and off; hover or tap a link to see its Pali or Sanskrit term, the course translation and the reference; a "compare" mode highlights links present in one lane but absent in another.
- **Feedback:** a one-line note per lane, taken from the manuscript (for example "DN 15 本段不含无明和行"). The AK lane carries a fixed tag "后来的系统化（世亲）".
- **Limitations:** the lanes show only sequences the course verified. They make no claim about historical development or chronology between the suttas.
- **Mobile / desktop:** on desktop, the lanes are stacked horizontally with one shared horizontal scroll. On mobile, each lane becomes a vertical list, with one lane at a time chosen by a segmented control.
- **Minimal approach:**

```tsx
type Link = { pli?: string; skt?: string; zh: string; ref: string };
type Lane = { id: string; label: string; tier: '原典' | '后来的系统化'; links: (Link | null)[]; loopAt?: [number, number]; brackets?: [number, number, string][] };
export function DOLanes({ lanes }: { lanes: Lane[] }) {
  const [on, setOn] = useState(lanes.map(l => l.id));
  return (<figure className="do-lanes">
    <fieldset>{lanes.map(l => <label key={l.id}><input type="checkbox" checked={on.includes(l.id)}
      onChange={() => setOn(t => t.includes(l.id) ? t.filter(x => x !== l.id) : [...t, l.id])} />{l.label}</label>)}</fieldset>
    {lanes.filter(l => on.includes(l.id)).map(l => (
      <svg key={l.id} viewBox={`0 0 ${l.links.length * 72} 56`} role="list" aria-label={l.label}>
        {l.links.map((k, i) => <g key={i} role="listitem" transform={`translate(${i * 72},8)`}>
          <rect width="64" height="32" className={k ? 'chip' : 'chip chip--empty'} />
          {k && <text x="6" y="21">{k.zh}</text>}</g>)}
      </svg>))}
  </figure>);
}
```

### 6.2 车喻论证分步器 (Chariot argument stepper)

- **Location:** Part 三, after the six-step reconstruction table.
- **Objective:** separate what the Milinda text says from the course's reconstruction, and show where "no person in the ultimate sense" stops short of "no person".
- **Visual form:** a vertical stepper with six steps. Each step has two columns: on the left, the Pali line with its reference (mil3.1.1:3.6–3.59, 4.4–4.28, 6.2, 7.2); on the right, the course's step wording. Below the stepper sits a fixed "proves / does not prove" panel.
- **Learner actions:** move step by step. At step 5 the learner answers a prediction question ("Does this step conclude that Nāgasena does not exist?"), and the answer is revealed only after they commit.
- **Feedback:** the reveal quotes 7.2 (*paramatthato panettha puggalo nūpalabbhati*) beside the designation sentence, and explains the 5 → 6 move in the manuscript's words.
- **Limitations:** only the reconstruction's steps are interactive. The text's own order (the king questions first) is preserved and stated.
- **Mobile / desktop:** on mobile, the two columns become stacked cards.
- **Minimal approach:** a data array of six `{ref, pli, zh, course}` steps, a `useState` index, and `<details>` for the Pali. No SVG is needed.

### 6.3 三世立场与代价图 (Positions on the three times)

- **Location:** Part 五, replacing the "costs" table, which stays as the fallback.
- **Objective:** compare the Sarvāstivāda (and its four masters), the Vibhajyavāda and Vasubandhu's Sautrāntika position. For each one, show what it explains (memory, karma, the object of cognition) and what it pays.
- **Visual form:** a 3 × 3 matrix. The rows are the positions; the columns are memory of the past, the fruit of past karma, and cognition having an existing object. Each cell holds a short answer and a cost. A side drawer holds the four masters' similes: the gold vessel, the man and the women, the counting-token, the mother and daughter. Vasubandhu's verdicts are tagged with their AKBh line references (297|04–09).
- **Learner actions:** pick the column you care about most. The matrix re-sorts and shows each position's cost for that column. The learner then answers the 想一想（五） view question.
- **Feedback:** none is right or wrong. Each position's note comes from the practice data (in2-5-3).
- **Limitations:** Saṅghabhadra's replies were not read and are not represented, and the drawer says so.
- **Minimal approach:** a static grid of CSS `<table>` cells, with a sort key in state. No SVG is needed.

### 6.4 Not proposed

- A Therīgāthā verse-sharing graph was considered and rejected for now. Only three shared-verse cases were verified, and a graph would overstate the evidence.

## 7. Practice data

- **Count:** 7 sets × 3 questions = 21, labelled 一 to 七 to match 想一想（一）…（七）.
- **Types:** 9 single, 3 multi, 5 tf, 4 view.
- **Single-answer positions:** a 2, b 3, c 2, d 2. The two 4-option singles have the answer at d.
- **tf answers:** 3 true, 2 false.
- **Multi answers:** each multi has three correct options out of four, in varied positions (a-c-d, a-b-d, a-b-d).
- **IDs:** `in2-{set}-{question}`, following the Phase 14 convention checked by `check.ts`.
- **Compatibility:** checked against the current `src/content/practice.ts` types by compiling a copy in the scratchpad, with `tsc --strict`, using the Phase 14 check script.
  - 0 errors.
  - The checker confirms at most 3 questions per set, unique IDs, valid answers, and a note on every option.
- **Not wired in:** the file was not added to the repository. The full data is in Appendix A of this report, ready to be saved as `src/content/practice-in2.ts` in Phase 15B, if approved.

## 8. Images and rights (shortlist only; nothing downloaded)

The metadata below was read from the Wikimedia Commons API on 2026-11-08. No file was downloaded.

| # | Candidate | Where | License (per Commons) | Author / credit | Use and caveats |
|---|---|---|---|---|---|
| 1 | *Coin of Menander (155-130 BCE), Ashmolean Museum, Oxford.jpg* | Part 三 (Milinda's status) | CC BY-SA 4.0 | SpeakingArch, own work (photo 2026-04-04) | Good fit. Caption must say the Milinda–Menander identification is a scholarly identification (SEP), not a fact stated by the coin. Share-alike applies to the image only. |
| 2 | *Buddha first sermon Gandhara BM.jpg* | Part 一 | CC BY-SA 4.0 | Zunkir, own work (2020) | Swat valley, about AD 100–300, British Museum; description gives "979.0130", so verify the BM registration number before use. A later image of the event, not evidence about the sermon. |
| 2b | *Buddha's first sermon at Sarnath. Gandhara.Met.jpg* | Part 一 (alternative) | CC BY-SA 4.0 | Ismoon, own work (2015) | Met Museum object, 2nd century. **Prefer checking the Met's own Open Access (CC0) image** of this object before using a CC BY-SA photo. |
| 3 | *The Cullavagga manuscript of the Colombo National Museum.jpg* | Part 七 (the Vinaya source) | Public domain (per Commons) | Bhikkhu Nyanatusita, 2004; source a SuttaCentral forum post | Described as the oldest known Sinhalese Pali manuscript held by the museum (13th century). **Verify the PD release** and note that the leaf shown is not necessarily Cullavagga X. |
| 4 | *034 Mahapajapati Gotami (detail) (9166564054).jpg* | Part 七 | CC BY 2.0 | Photo Dharma (Flickr), 2012 | Mural at Wat Pho, Bangkok; the mural's own date was not verified. A late Thai depiction; caption must say so. |
| 5 | *Yama holding the Bhavacakra or Wheel of life. Gouache. Wellcome L0069380.jpg* | Part 二 (optional) | CC BY 4.0 | Wellcome Collection | Later Tibetan iconography of the twelve links. **Risk of anachronism:** use only with a caption saying it is a much later visual tradition. Otherwise omit; the course's own lane diagram (6.1) is preferable. |

- **Recommendation:** use 1, 3 (once the PD release is verified) and 4. Use 2 or 2b only if Part 一 needs an image. Use 5 only with the caveat, or not at all.
- **Credit and records:** every image used needs a SOURCES.md entry and an on-page credit, following the standing image rule.

## 9. Uncertainties

The full list of nine items is in the manuscript's sources appendix. The most important for review:

1. **Milinda's date and layers, and the Chinese 那先比丘经.** Not checked. The "in the Buddha's presence" discrepancy for Vajirā's verse is unexplained.
2. **The ordination story (kd20).** No study of its date was read. The course points only to tensions inside the text.
3. **Pudgalavāda.** Known only from opponents and SEP.
4. **Vasubandhu's own stance and Saṅghabhadra's replies.** Vasubandhu's own stance is taken only from explicit markers in the AKBh; Saṅghabhadra's replies were not read.
5. **Vātsyāyana's target.** That he targets a Buddhist-style view is the course's judgement; Uddyotakara's subcommentary was not read.
6. **Rights terms.** GRETIL files carry CC BY-NC-SA 4.0 together with a "good faith" notice (see §10 of the IN3 report, which lists every file). Confirm before publication that short quotation with attribution is acceptable under the NC/SA terms, or re-check the passages against public-domain print editions.
7. **The Therīgāthā count.** 73 poems in 16 nipātas is the course's own count from bilara-data files. Other editions may count differently.

## 10. IN2–IN3 boundaries

- **No anachronism.** IN2's body never uses Dignāga, Dharmakīrti or Navya-Nyāya material as part of early Buddhist or Abhidharma thought.
  - Later figures appear only in forward references: the 结语, and the end of C&R ("后来的正理派……法称及其后学"), which are clearly marked as the next course's content.
  - The 结语 states explicitly that early texts contain no Dignāga-style epistemology.
- **Shared material is divided, not duplicated.**
  - **Nyāya on the self:** IN2's C&R uses NS 3.1.1 and Vātsyāyana. IN3 Part 六 (争论五) refers back to it and adds Phillips' account of the two NS arguments.
  - **Momentariness:** IN2 Part 五 uses AKBh 4.2–3 (*ākasmiko hi bhāvānāṃ vināśaḥ*). IN3 Part 五 cites it as the source of Dharmakīrti's first argument.
  - **Conventional/ultimate:** IN2 Part 四 uses AK 6.4. IN3 Part 五 contrasts it with PV III.3 (*arthakriyā*), and both keep Madhyamaka out.
- **Madhyamaka and Yogācāra** appear in IN2 only as pointers to 《中观与瑜伽行》 (导读, Parts 三, 四 and 五, 结语). No doctrine is taught.

## 11. Readiness

- **Ready for PO reading and expert review.** All four required elements are in place:
  - the manuscript is complete;
  - quotations are verified;
  - notes and sources are complete;
  - practice data compiles.
- **Not ready for publication.** It still needs:
  - expert review, especially of Parts 二, 四 and 五;
  - a decision on GRETIL CC BY-NC-SA compatibility;
  - image decisions.
- **Phase 15B, if approved:** add `practice-in2.ts` from Appendix A; build at most the proposed components chosen by the PO; record any images in SOURCES.md. The work was stopped here as instructed and does not proceed to 15B.
- **Format checks done:** CRLF line endings; 94 footnote references, each with exactly one definition; notes renumbered by first appearance; 7 想一想 blocks matching set labels 一 to 七.

## Appendix A. Practice data (draft `practice-in2.ts`)

```ts
import type { PracticeSet } from './practice';

// 《早期佛教与阿毗达磨：苦、无我与缘起》· 想一想 as selection questions.
// Each set follows its exercise in content/IN2_SAMPLE_DRAFT.md (labels 一 to 七).
// Phase 15A draft data: not yet wired into the site; the manuscript is not edited.
export const IN2_PRACTICE: PracticeSet[] = [
  {
    label: '一',
    lede: '原题请你判断《转法轮经》中四圣谛各自对应的"任务"，并想一想"一切皆苦"是不是悲观主义。',
    questions: [
      {
        id: 'in2-1-1', type: 'single',
        stem: '按照《相应部》56.11（《转法轮经》）的"三转"，对于苦圣谛，应当做的是什么？',
        options: [
          { id: 'a', text: '彻底了知它。', note: '对。经中说苦"应当彻底了知"（pariññeyya）；应当断除的是集，应当证得的是灭，应当修习的是道。' },
          { id: 'b', text: '断除它。', note: '应当断除的是苦的生起（集），也就是渴爱，不是苦本身。把"苦"当作要断除的对象，会混淆诊断和病因。' },
          { id: 'c', text: '修习它。', note: '"修习"对应的是第四谛，即道。' },
        ],
        answer: 'a',
        explain: '四个动词分别是：了知、断除、证得、修习。"三转十二行相"就是对每一谛说三遍：这是什么、应当做什么、已经做了。',
      },
      {
        id: 'in2-1-2', type: 'single',
        stem: '《相应部》38.14 列出三种苦性。其中哪一种最能说明，为什么连快乐的经验也被归入"苦"？',
        options: [
          { id: 'a', text: '苦苦：身心直接感到的痛苦。', note: '苦苦指的是直接的痛苦，它不能解释快乐的经验为什么也是苦。' },
          { id: 'b', text: '行苦和坏苦：一切有为的东西都在条件中生灭，快乐的经验也会变坏、消失。', note: '对。正文说明，这正是"一切皆苦"不等于"一切都是痛苦的感受"的理由。' },
          { id: 'c', text: '没有一种；经中说快乐的经验不是苦。', note: '经中恰恰用"坏苦"和"行苦"把快乐的、平常的经验也包括进来。' },
        ],
        answer: 'b',
      },
      {
        id: 'in2-1-3', type: 'view',
        stem: '"一切皆苦"是不是一种悲观主义？你最接近哪一种看法？',
        options: [
          { id: 'a', text: '是悲观主义：它把人生的基调定为苦。', note: '优点：认真对待"苦"这个词的分量。代价：忽略了四圣谛的结构，第三谛说苦可以止息，第四谛给出了道路；只有第一谛的诊断，才是悲观的。' },
          { id: 'b', text: '不是悲观主义，而是一个诊断：先承认病，再说病可以治。', note: '优点：符合四圣谛的完整结构和正文所说的医生比方。代价：正文也提醒，医生比方有限度，它可能让人以为四圣谛只是一套技术，而忽略了其中的世界观。' },
          { id: 'c', text: '不能用"悲观"或"乐观"来衡量，因为 dukkha 不等于中文的"痛苦"。', note: '优点：注意到了译名的问题。代价：如果完全回避评价，就很难解释为什么这个教导要求人改变生活。' },
        ],
        explain: '正文的立场是：四圣谛是一个完整的框架，第一谛的"苦"要和后三谛一起读。读者可以不同意这个立场。',
      },
    ],
  },
  {
    label: '二',
    lede: '原题请你判断哪些说法符合早期经典中的缘起，并想一想"识与名色互为条件"是不是循环论证。',
    questions: [
      {
        id: 'in2-2-1', type: 'multi',
        stem: '根据本章所读的经文，下面哪些说法是对的？（多选）',
        options: [
          { id: 'a', text: '《长部》15 所列的序列不含无明和行。', note: '对。这一序列中没有无明和行，名色与识互为条件。' },
          { id: 'b', text: '早期经典中，缘起总是以完整的十二支出现。', note: '不对。本章读到了九支（《长部》15）以及在识和名色之间"转回"的序列（《相应部》12.65）。' },
          { id: 'c', text: '《相应部》12.67 用两捆互相支撑的芦苇来比喻识和名色。', note: '对。拉开其中一捆，另一捆就会倒。' },
          { id: 'd', text: '《相应部》12.20 说，缘起这一规律不管如来出世与否都是如此。', note: '对。这是缘起作为"法住"的说法。' },
        ],
        answer: ['a', 'c', 'd'],
      },
      {
        id: 'in2-2-2', type: 'tf',
        stem: '比丘嗏帝认为"是同一个识在轮回中流转"；佛陀在《中部》38 中认可了这个说法。',
        answer: false,
        wrong: '佛陀批评了嗏帝的说法，并说识是"缘起的"，有条件才生起，没有条件就不生起。',
      },
      {
        id: 'in2-2-3', type: 'single',
        stem: '"以识为条件有名色，以名色为条件有识"，这为什么不一定是循环论证？',
        options: [
          { id: 'a', text: '因为经中其实只说了一个方向。', note: '经中两个方向都说了。' },
          { id: 'b', text: '因为它根本不是论证，只是比喻。', note: '它确实不是一个论证，但这个回答回避了问题：互相依赖本身是否成立？' },
          { id: 'c', text: '因为它说的是两样东西互为条件（互相依赖），不是用结论来证明结论。', note: '对。正文区分了"循环论证"和"互相依赖"：两捆芦苇互相支撑，并不是逻辑上的错误。' },
        ],
        answer: 'c',
      },
    ],
  },
  {
    label: '三',
    lede: '原题请你判断那先的车喻论证证明了什么、没有证明什么，并想一想补特伽罗论者是不是在回避问题。',
    questions: [
      {
        id: 'in2-3-1', type: 'single',
        stem: '那先的车喻论证，最多可以证明下面哪一点？',
        options: [
          { id: 'a', text: '人根本不存在，"那先"这个名字什么也不指。', note: '这是对车喻最常见的误读。那先自己说，"那先"这个名称"依靠"头发等和五蕴而成立，它是一个约定的名称，可以正当地使用。' },
          { id: 'b', text: '在最高意义上，找不到一个在诸部分之外、或者就是诸部分之一的"人"；"那先"是依靠诸部分的约定名称。', note: '对。论证否认的是作为独立实体的人，不是约定意义上的人。' },
          { id: 'c', text: '人是一个永恒的灵魂，只是暂时住在五蕴之中。', note: '这正是无我说要否认的立场。' },
        ],
        answer: 'b',
        explain: '正文提醒：车喻论证没有证明"人不存在"，它证明的是"人"不是在约定之外另有的实体。',
      },
      {
        id: 'in2-3-2', type: 'tf',
        stem: '在《弥兰王问经》中，那先回答"再生的人与死去的人是否同一个"时说："既不是那一个，也不是另一个。"',
        answer: true,
        wrong: '这句话见于《弥兰王问经》的灯和牛奶的比喻之前：就像一盏灯，初夜的火焰与中夜的火焰既不是同一个，也不是另一个。',
      },
      {
        id: 'in2-3-3', type: 'view',
        stem: '补特伽罗论者说，人"既不同于五蕴，也不异于五蕴"，是"不可说的"。你怎样评价这个立场？',
        options: [
          { id: 'a', text: '这是回避问题：不能说清楚的东西，就不应该被说成存在。', note: '优点：与世亲的两难一致，要么是实体（dravya），要么是施设（prajñapti）。代价：可能低估了补特伽罗论者想解决的问题，即业、记忆和解脱需要一个"谁"。' },
          { id: 'b', text: '这是一个认真的尝试：它像火依靠柴而施设，但不等于柴。', note: '优点：火与柴的比喻确实有吸引力。代价：世亲指出，"不可说"会变成第五种所知，这在说一切有部的分类中没有位置；而且现存材料大多来自论敌。' },
          { id: 'c', text: '材料不足，难以评价：我们读到的大多是论敌的转述。', note: '优点：正文强调，补特伽罗论的直接材料很少，汉译论书本章没有读。代价：如果只停留在这里，就无法讨论这个立场本身的哲学价值。' },
        ],
      },
    ],
  },
  {
    label: '四',
    lede: '原题请你判断《俱舍论》6.4 的标准会把哪些东西归为世俗有，并想一想"世俗有"是不是"不存在"的意思。',
    questions: [
      {
        id: 'in2-4-1', type: 'multi',
        stem: '按照《俱舍论》6.4 及其自注的标准，下面哪些是世俗有？（多选）',
        options: [
          { id: 'a', text: '瓶子：打碎之后，就不再有"瓶子"的认识。', note: '对。这是第一种情况：被物理地分开。' },
          { id: 'b', text: '水：在心中把色等其他的法排除掉，就不再有"水"的认识。', note: '对。这是第二种情况：被心智地分析。' },
          { id: 'c', text: '色：即使被分析到极微，或在心中排除味等，"色"的认识仍然存在。', note: '不对。世亲以色为胜义有的例子。' },
          { id: 'd', text: '"人"：在心中把五蕴一一排除，就不再有"人"的认识。', note: '对。按这个标准，"人"应当归为世俗有；世亲在第九品中也说"人"是依五蕴施设的。这与第三部分的车喻论证一致。' },
        ],
        answer: ['a', 'b', 'd'],
      },
      {
        id: 'in2-4-2', type: 'single',
        stem: '世亲说，按照世俗的约定说"瓶子存在"的人，说的是什么？',
        options: [
          { id: 'a', text: '假话，因为瓶子不是胜义有。', note: '世亲恰恰相反：他说这些人说的是真话，不是假话。' },
          { id: 'b', text: '既不是真话，也不是假话。', note: '这不是世亲的说法。' },
          { id: 'c', text: '没有意义的话，因为"瓶子"不指称任何东西。', note: '世俗有不等于不存在，也不等于无意义。' },
          { id: 'd', text: '真话，这就是世俗谛。', note: '对。世俗有不等于虚假：说"这里有一个瓶子"是对的，只是"瓶子"不是分析的终点。' },
        ],
        answer: 'd',
      },
      {
        id: 'in2-4-3', type: 'tf',
        stem: '《俱舍论》的"世俗有／胜义有"，与中观派所说的"二谛"是同一个区分。',
        answer: false,
        wrong: '正文强调：阿毗达磨的区分是在承认诸法为胜义有的前提下作出的；中观派的二谛则否认任何东西有自性，包括诸法。后者属于课程《中观与瑜伽行》。',
      },
    ],
  },
  {
    label: '五',
    lede: '原题请你判断《俱舍论》5.25 的四条理由哪些依据经文、哪些依据推理，并想一想哪一种对过去和未来的看法代价最小。',
    questions: [
      {
        id: 'in2-5-1', type: 'single',
        stem: '在世亲的自注中，说一切有部论证"过去和未来存在"的四条理由，哪两条被归为"依据推理"？',
        options: [
          { id: 'a', text: '识必定有存在的对象；过去的业能产生果。', note: '对。自注在前两条之后说："这样，依据经教，过去和未来存在；依据推理也存在。"然后给出这两条。' },
          { id: 'b', text: '经中说过；识依靠两样东西生起。', note: '这两条都引经文，属于"依据经教"。' },
          { id: 'c', text: '经中说过；过去的业能产生果。', note: '第一条依据经文，第二条依据推理，两者不在同一类。' },
        ],
        answer: 'a',
      },
      {
        id: 'in2-5-2', type: 'single',
        stem: '说一切有部的四位论师中，世亲认为哪一位的说法"是好的"？',
        options: [
          { id: 'a', text: '法救：类的变化，就像金器被改铸。', note: '世亲认为这种说法接近数论派的转变说。' },
          { id: 'b', text: '妙音：相的变化，就像一个男人爱一个女人时并非不爱其他女人。', note: '世亲认为这会导致三世相混。' },
          { id: 'c', text: '世友：位的变化，就像同一个筹码放在不同的位置上，叫作一、十、百。', note: '对。世亲说"第三种是好的"，虽然他随后仍然批评了整个说一切有部的立场。' },
        ],
        answer: 'c',
      },
      {
        id: 'in2-5-3', type: 'view',
        stem: '关于过去和未来，你认为哪一种立场的代价最小？',
        options: [
          { id: 'a', text: '说一切有部：过去、现在、未来的法都存在，区别只在"作用"。', note: '优点：能直接解释记忆、过去的业怎样产生果。代价：世亲问，如果过去的法存在，它为什么不在现在起作用？"作用"本身又是什么时候存在的？' },
          { id: 'b', text: '经量部（世亲在这里的立场）：只有现在存在，果来自相续的特殊转变。', note: '优点：本体论上最节省。代价：要解释已经灭去的业，怎样通过相续影响很久以后的果，"种子"的比喻是否足够。' },
          { id: 'c', text: '分别说部：现在存在，过去的业中尚未产生果的部分也存在。', note: '优点：处于两者之间。代价：要说明为什么只有"尚未产生果的部分"存在，标准是否是临时设定的。' },
        ],
      },
    ],
  },
  {
    label: '六',
    lede: '原题请你判断"意图就是业"意味着什么，并想一想把早期佛教伦理称为后果主义或德性伦理各自抓住了什么。',
    questions: [
      {
        id: 'in2-6-1', type: 'tf',
        stem: '《增支部》6.63 说："比丘们，我说意图就是业。"',
        answer: true,
        wrong: '这是本章引用的原文（cetanāhaṁ, bhikkhave, kammaṁ vadāmi），后文接着说：有了意图，人就通过身、语、意造作业。',
      },
      {
        id: 'in2-6-2', type: 'single',
        stem: '法施比丘尼在《中部》44 中把八支圣道分为三组。"正念"和"正定"属于哪一组？',
        options: [
          { id: 'a', text: '戒。', note: '戒包括正语、正业、正命。' },
          { id: 'b', text: '定。', note: '对。定包括正精进、正念、正定。' },
          { id: 'c', text: '慧。', note: '慧包括正见、正思惟。' },
        ],
        answer: 'b',
      },
      {
        id: 'in2-6-3', type: 'multi',
        stem: '下面哪些说法符合本章对"早期佛教伦理属于哪一类"的介绍？（多选）',
        options: [
          { id: 'a', text: '有学者把它读成后果主义，例如以寂天为参照。', note: '对。本章据 SEP 介绍了这种读法。' },
          { id: 'b', text: '基翁（Keown 1992）首先提出了德性伦理的读法。', note: '对。本章据 SEP 介绍了这一点，没有核对原书。' },
          { id: 'c', text: '早期经典明确宣布自己是一种德性伦理。', note: '不对。SEP 的条目说，大多数佛教作者没有对自己规范性主张的整体结构说得足够多。' },
          { id: 'd', text: '任何解释都必须为意图的关键地位留出位置。', note: '对。这是本章据 SEP 概括的一个共同要求。' },
        ],
        answer: ['a', 'b', 'd'],
      },
    ],
  },
  {
    label: '七',
    lede: '原题请你判断苏摩的回答是怎样的一个论证，并想一想"共享的偈句"是否削弱了《长老尼偈》作为女性声音的价值。',
    questions: [
      {
        id: 'in2-7-1', type: 'single',
        stem: '魔罗对苏摩说，"只有两指智慧"的女人不能达到圣者的境地。苏摩的回答最核心的一步是什么？',
        options: [
          { id: 'a', text: '女人的智慧其实比男人高。', note: '苏摩没有比较男女的智慧高低。' },
          { id: 'b', text: '她已经出家很久，所以有资格。', note: '诗中没有这样的论证。' },
          { id: 'c', text: '她承认女人的智慧不足，但说精进修行可以弥补。', note: '诗中没有这样的让步。苏摩不接受魔罗的前提，而是指出这个前提本身的问题。' },
          { id: 'd', text: '心专注、智慧现前时，女人的身份有什么妨碍？会这样想"我是女人"或"我是男人"的人，魔罗才该对他说话。', note: '对。这一步把魔罗的前提本身识破为一种我执。' },
        ],
        answer: 'd',
      },
      {
        id: 'in2-7-2', type: 'tf',
        stem: '本章所读的律藏《小品》第十章中，大爱道走到毗舍离时，双脚肿胀、满身尘土。',
        answer: true,
        wrong: '律藏原文说她"双脚肿胀"（sūnehi pādehi），满身尘土，哭着站在门外。',
      },
      {
        id: 'in2-7-3', type: 'view',
        stem: '讖摩诗中的两偈也出现在莲花色的诗中。这是否削弱了《长老尼偈》作为女性声音的价值？',
        options: [
          { id: 'a', text: '会削弱：如果偈句可以互相借用，我们就不知道哪一句真的出自哪一位比丘尼。', note: '优点：对"作者"保持严格。代价：古代口传文学普遍有共享的程式，用今天的"作者"概念来衡量，可能不公平。' },
          { id: 'b', text: '不会削弱：共享的偈句说明这些语言在比丘尼的群体中流传，本身就是一个群体的声音。', note: '优点：区分了一首诗的"作者"和它的"声音"。代价：要小心，"群体的声音"也可能被后来的编者塑造。' },
          { id: 'c', text: '要看具体的偈句：有些显然是共同的程式，有些更像个人的经历。', note: '优点：最贴近文本。代价：需要逐首比较，本章只能举出少数例子。' },
        ],
      },
    ],
  },
];
```

Checker output (`tsc --strict` + `node out/check.js`, 2026-11-08):

```text
IN2 sets 7 questions 21 {"single":9,"view":4,"multi":3,"tf":5} single answers {"a":2,"b":3,"c":2,"d":2} labels 一二三四五六七
```

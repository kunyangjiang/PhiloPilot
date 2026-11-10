# IN8 制作报告（V21）

*Supporting report for `content/IN8_SAMPLE_DRAFT.md` (《近代与殖民时期的印度哲学》 / Modern and Colonial-Era Indian Philosophy). Written in V21, in one cycle with IA1 and IA2, and integrated into the prototype in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** Title, tier (Extended ○), seven-section structure, method focus and links follow `planning/CURRICULUM_REFERENCE_DRAFT.md` §B3 and `data/units.ts`. No official title or structure was changed.

| Part | Core problem | Primary passages read in the original (English) |
|---|---|---|
| 导读 | How did "Indian philosophy" restart under colonial rule? Core question: what changed in contact with colonial education, science and politics; when is a new interpretation faithful, when innovative? Reading reminders | — |
| 一 殖民相遇 | The 1823–1835 school debate; Macaulay's minute; how the name "Indian philosophy" arose; Indian thinkers were not only responding | Roy, *Letter on English Education* (1823); Macaulay, *Minute* (1835) |
| 二 印度教与伊斯兰教的改革 | Roy and the Brahmo Samaj; Vivekananda's "acceptance"; Aligarh to Iqbal (*ijtihād*); Ramabai's critique of scripture; comparison table of reform methods | Vivekananda, Chicago address (1893); Ramabai, *The High-Caste Hindu Woman* (1888); Iqbal, *Reconstruction* (1934) |
| 三 甘地：手段与目的 | *Hind Swaraj*; step reconstruction of the means–ends argument; *satyāgraha*; Gandhi did not reject all violence; critiques | *Hind Swaraj* ch. 16–17; "The Doctrine of the Sword" (1920, abridged selection) |
| 四 安贝德卡尔 | *Annihilation of Caste*; liberty, equality, fraternity; the varṇa debate with Gandhi (table); "grammar of anarchy"; Periyar; Ambedkar's Buddhism | *Annihilation of Caste* (1936) and Gandhi's reply; Constituent Assembly speech (25 Nov 1949) |
| 五 奥罗宾多与拉达克里希南 | Spiritual evolution; intuition and tolerance; critique of "universalism" | Paraphrase only (copyright) |
| 六 泰戈尔与教育 | School under the trees; critique of nationalism; Tagore and Gandhi; harmony and personality | Tagore, "My School" (1917); *Nationalism* (1917) |
| 七 当代分析研究 | K. C. Bhattacharyya's *Swaraj in Ideas*; "Indian philosophy is spiritual"; Matilal and Mohanty; early-modern Navya-Nyāya vs contemporary reinterpretation; four questions for assessing a reinterpretation | Paraphrase only |
| 结语 / 后世批判与回应 | Five Critiques & Responses items (§5) | — |

- **Size:** 38,680 characters (excluding CR); the site counts the body at about 2.5 万字 over 10 reader parts: the seven official sections of `planning/CURRICULUM_REFERENCE_DRAFT.md` plus 本章导读, 结语 and 后世批判与回应 (Critiques & Responses). The two appendices (注释, 来源与权利说明) are not counted. Only the seven sections are the official curriculum; the other three are the house frame every course has (as in IN7: 5 + 3 = 8). 71 notes, 25 primary-text blocks (English + 本章试译), 7 tables, 7 想一想 blocks (一 to 七).
- **Tier note.** IN8 is Extended ○ but is the longest of the three. If the PO wants it shorter, the first cuts are the Periyar subsection and the Tagore–Gandhi subsection (both paraphrase-only).

## 2. Arguments

- **Means and ends (Gandhi).** Reconstructed in five steps from *Hind Swaraj* ch. 16 ("The means may be likened to a seed, the end to a tree"): means and ends are inseparable; so unjust means produce an unjust end. Ch. 17 grounds *satyāgraha* as "securing rights by personal suffering".
- **Caste (Ambedkar).** Caste is a division of labourers, not of labour; caste is a notion, so reform must reach the belief in the sanctity of the śāstras; democracy is "a mode of associated living". Gandhi's reply (caste vs varṇa; duties not rights) and Ambedkar's rejoinder are set side by side.
- **Constitutional method.** The 1949 speech: civil disobedience as "the grammar of anarchy" where constitutional means exist; *bhakti* in politics as a road to dictatorship.
- **Reform methods compared.** Roy (scripture against custom), Vivekananda (acceptance of all religions), Iqbal (*ijtihād* as "the principle of movement"), Ramabai (a woman's critique of scripture).
- **Assessing a reinterpretation (method focus).** Four questions: text, concept, function, stance. Applied to Ambedkar's Buddhism: "not faithful, but honest". This is the chapter's own reconstruction and is marked so.

## 3. Verified primary sources

All 25 English primary blocks were compared sentence by sentence with the electronic texts listed in the appendix (Wikisource, archive.org scans, mkgandhi.org, constitutionofindia.net, Project Gutenberg 40766), ignoring only whitespace, line breaks and hyphenation. Read 2026-11-09. One OCR difference is disclosed in note 14 (Iqbal: the scan reads "Tjtihad*"; the chapter prints "Ijtihad"). Gandhi's "Doctrine of the Sword" is quoted from an abridged selection; this is stated (note 27). Aurobindo, Radhakrishnan, K. C. Bhattacharyya, Periyar and contemporary scholars are paraphrased only.

## 4. Translation and terminology

All Chinese translations are the chapter's own from English; no modern Chinese translation was consulted or copied. Key choices: swaraj 自治; satyāgraha 坚持真理 (not 非暴力抵抗, since Gandhi distinguished them); ahiṃsā 不伤害 (as in IN1); varṇa 瓦尔纳, jāti/caste 种姓; untouchability 不可接触制; depressed classes 受压迫阶级; ijtihād 伊智提哈德; saccidānanda 有—识—喜; Navya-Nyāya 新正理派. The full list is in the appendix.

## 5. Critiques and responses

1. Is "Indian philosophy" a colonial product?
2. Does Gandhi's non-violence apply in every case?
3. Gandhi and Ambedkar: whose judgement on caste was more accurate?
4. Spiritual universalism: tolerance or assimilation?
5. How to tell a faithful interpretation from an innovation? (includes the objection that for a living tradition, continuous reinterpretation may itself be fidelity)

Each item states the critique, a response, and what remains open; reconstructed responses are marked 本章的重建.

## 6. Practice

`src/content/practice-in8.ts`: 7 sets × 3 = **21 questions** (11 single, 3 multi, 3 true/false, 4 view). Single-answer keys spread a 2 / b 3 / c 3 / d 3. View questions (in8-2-3, 3-3, 4-3, 6-3) are ungraded and show strengths and costs for each position. Storage: `philopilot.v2.in8.exercise.*`.

## 7. Components

| Id | File | Anchor | Objective | Actions |
|---|---|---|---|---|
| `gandhi-ambedkar-workshop` | `ui/media/in8/DebateWorkshop.tsx` | 四, after "这张表是本章的整理。两人的分歧在 1932 年达到顶点" | Keep two positions distinct and attribute them correctly | Attribute six verified sentences; compare five issues side by side with basis tags; three readings of the 1932 fast (ungraded) |
| `reinterpretation-lab` | `ui/media/in8/ReinterpretationLab.tsx` | 七, after "用这四个问题检验一种重新解释" | Apply the method focus | Pick one of five reinterpretations; answer the four questions; compare with the chapter's reading and a competing reading |

Both use native radio inputs (keyboard accessible), no animation, a one-column layout at 375 px (checked), a 局限 panel and a reset button. Every English line in them is one of the chapter's verified passages.

## 8. Images

Candidates in `V21_IN8_IMAGE_APPROVAL_SHEET.md`; all five approved and embedded on 2026-11-09. After the final review (§12), four remain: Roy (一), Vivekananda (二), Ramabai (二), Tagore's school (六). The Ambedkar 1950 photograph was removed. Records: `prototype/navigation-v2/public/media/in8/SOURCES.md`.

## 9. Rights and uncertainties

Rights by source are in the manuscript appendix. Open items (from the appendix): the date and text of *Swaraj in Ideas* (note 67); Daya Krishna's "three myths" (note 68); whether "Navayāna" is Ambedkar's own word (note 51); the original printing of "The Doctrine of the Sword" (note 27); Gandhi's 1938 article and Buber's reply (paraphrase, note 28); details of the Tagore–Gandhi debate (note 65); the US copyright status of the 1934 Oxford *Reconstruction* (not claimed to be public domain; quoted briefly, see §12); the origin of the title "Mahatma"; Part 一's disciplinary history (note 7). The Poona Pact narrative was checked in the final review (§12).

## 10. Cross-course boundaries

- **Backward:** IN1 (ahiṃsā, Upaniṣads), IN2 (the Buddha's teaching, used against Ambedkar's reinterpretation), IN3 (Navya-Nyāya background), IN5 (Vedic authority), IN6 (Advaita: Radhakrishnan and Aurobindo), IN7 (yoga). IN8 refers back but does not reteach them.
- **Forward:** D6 (gender, race and empire) for colonial and gender critique; not taught here.
- **Not repeated:** Iqbal appears only in his Indian context; the Islamic philosophical tradition itself belongs to IA1–IA5.

## 11. Integration readiness

Integrated in V21 (see `PHASE18_V21_INTEGRATION_REPORT.md`). Registry entry `IN8` (tradition `in`, position 8, `origLang` en); IN1–IN5 now list IN8 as a next course (IN6 and IN7 already did). Typecheck and build pass.

## 12. Final targeted review (2026-11-09)

- **Curriculum count.** Seven official sections, unchanged. The "10 parts" figure is the reader's count (seven sections plus 导读, 结语 and Critiques & Responses); §1 now says so.
- **Poona Pact (四, 「甘地与安贝德卡尔：瓦尔纳的争论」).** Checked against Ambedkar, *What Congress and Gandhi Have Done to the Untouchables* (Bombay: Thacker, 1945), chapter III and appendix IV, which reproduce the Prime Minister's decision, Gandhi's letter, Ambedkar's statement of 19 September 1932 and the text of the Pact (archive.org, `Ambedkar_CompleteWorks`, vol. 9). Corrections:
  - The Communal Award (announced 17 August 1932) gave the Depressed Classes separate-electorate seats **and** a vote in the general constituencies ("double vote"). The old text said only "separate electorates".
  - Gandhi's fast began on 20 September 1932 at Yerwada; the Pact was signed on 24 September (one reproduction dates it the 25th, the day of ratification in Bombay; stated in note 42).
  - The Pact's terms are now given: 148 reserved provincial seats in joint electorates; a primary election of a panel of four by Depressed-Class voters; the primary system to end after ten years.
  - The old text said Ambedkar "later repeatedly" called the fast coercion. In fact he called it "coercion" in his statement the day before the fast began; his 1945 assessment is now given separately (the extra seats did not make up for the lost double vote; the panel of four let caste-Hindu voters choose dependent candidates).
  - Both men's reasons are now stated in their own terms: Gandhi's, from his letter (for him "pure religion"; separate electorates would divide the Depressed Classes from Hindu society and would not help them); Ambedkar's, from his statement (political safeguards so as not to depend on caste Hindus' goodwill; Gandhi did not oppose separate electorates for other minorities). A new sentence frames the dispute as two judgements about how to protect the Depressed Classes, not as concern against indifference.
  - The comparison table row and the `gandhi-ambedkar-workshop` component were corrected to match (Gandhi's reasons; Ambedkar's demand; the basis labels, which had said the history was unchecked; "later" removed from the coercion reading). One practice explanation (the 1932 fast question) had the same "later" error and was corrected; no question, option or answer changed.
  - Notes: old note 40 replaced by new notes 40–43; later notes renumbered (+3, now 71). The appendix's references were renumbered to match.
- **Iqbal.** The appendix now gives the reuse basis: brief, attributed quotation for commentary (three passages of about 26, 23 and 7 words), not public domain. Iqbal died in 1938, so the work is public domain in India and Pakistan; the chapter makes no public-domain claim for the 1934 Oxford edition elsewhere and gives a fallback (paraphrase) if the quotations are judged unsuitable.
- **Images.** Ambedkar 1950 removed (provenance: a news website only; date and status not independently established; the same standard as the IA1 Ḥunayn diagram). Roy caption made more exact (painter and exact date unknown; not known to be from life). The others are unchanged.

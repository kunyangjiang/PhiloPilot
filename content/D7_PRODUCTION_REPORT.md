# D7 production report — 《技术哲学与人工智能》

*Extended ○, Cross-Tradition Dialogue (domain D), position 7. Manuscript: `content/D7_SAMPLE_DRAFT.md` (CRLF). V36 cycle. Nothing committed.*

## 1. Coverage against the brief

Curriculum entry (D7): method focus "applying ethical principles to cases without precedent"; assumed background S5 or S7.

| Section | Content | Requirement met |
|---|---|---|
| 导读 | One sustained, invented case (江北医院: a vendor's deterioration-alert model with a buried calibration warning, a raised threshold, an overloaded nurse, a family's warning, a lenient regulator, permanent harm); core question; five claim labels | Sustained AI case; claim types labelled |
| 一、机器的心灵 | Builds on S5's five questions without repeating them: moral status; why language is weak evidence (three steps); why "it only predicts the next word" is not a denial; Butlin et al. 2023 (both halves of the conclusion); Long, Sebo et al. 2024 | Behaviour, function, understanding, phenomenal consciousness and moral status separated; no inference from language; no categorical denial |
| 二、责任 | Five senses (causal, legal, moral, accountability, agency); SEP (Noorman): three conditions, many hands, Therac-25, Matthias's responsibility gap, Floridi & Sanders vs Johnson, Nissenbaum's liability vs accountability; NTSB Tempe report as a harm with no single human cause, read in four steps | Responsibility concepts; distributed vs direct; real case without a single cause |
| 三、偏差与正义 | Four sources of bias; ProPublica's COMPAS figures; Kleinberg et al. 2016 and Chouldechova 2017 (incompatibility); four-step reconstruction ("choosing a criterion chooses who bears the errors"); help vs punishment | No single fairness metric treated as correct; accurate figures |
| 四、工作与意义 | 47% (Frey & Osborne) vs 9% (Arntz et al.) explained by method; three kinds of claim; goods of work beyond income; automation complacency in the case | No speculative economic certainty |
| 五、跨传统的视角 | Historical position vs later application vs the chapter's application; Analects 2.3 and Mencius 2A6 (reused) with Wong 2012/2021; Ubuntu via D4/AF1 (Metz) with Mhlambi 2020; comparison table; distribution of responsibility among designers, deployers, institution, users and public authorities, with the system itself explicitly left out and why | Confucian and Ubuntu; one case under two approaches; history separated from application; distribution concluded |
| 结语 | "Who is in the loop?" | Open conclusion |

Not repeated: S5's five-question table and inference limits (cited and extended), S7's frameworks, D4's Ubuntu / Confucian comparison (cited).

## 2. Claim labelling

Five labels are defined in the 导读 table and used in the text: ［经验研究］, ［哲学论证］, ［当前能力］, ［推测］, ［本章的应用］. Statements about current capabilities are few, general and dated (the chapter says it was written in 2026); the appendix says they are not the chapter's own tests and may date quickly. No product is evaluated.

## 3. Current-capability and empirical claims (extra check)

| Claim | Source | Status |
|---|---|---|
| Butlin et al.: 19 authors; indicator properties; no current system conscious; no obvious technical barriers | arXiv 2308.08708 abstract; v1 17 Aug 2023, v3 22 Aug 2023 | Re-checked during validation |
| Computational functionalism as working hypothesis | Common account | Flagged |
| Long, Sebo et al.: 10 authors; realistic near-future possibility; three steps; not claiming current systems are conscious | arXiv 2411.00986, 4 Nov 2024 | Re-checked |
| SEP Noorman: dates; three conditions; Therac-25 (six patients overdosed, three died); Matthias §1; Floridi & Sanders, Johnson §2.3; Nissenbaum §3.2 | SEP, rev. 2023-02-02 | Re-checked. **Corrected**: the "1985–1987" dates were removed (not in the entry), and the Leveson & Turner sentence now says the entry uses their investigation |
| SEP "Ethics of AI and Robotics": bias §2.4.2; responsibility gap §2.7.4 (open question); moral status §2.7.1; employment §2.9.4 (radiologists) | SEP, rev. 2026-03-27 | Re-checked |
| NTSB HAR-19/03: date, time, 5.6 s detection, probable cause, contributing factors, operator's gaze returned ~1 s before impact | NTSB summary page HWY18MH010 | Re-checked. **Corrected**: the operator sentence now follows the NTSB wording |
| ProPublica COMPAS figures (7,214; 44.85 / 23.45; 27.99 / 47.72; 0.63 / 0.59; 61%) | ProPublica methodology, 2016-05-23 | Read this cycle |
| Kleinberg et al.; Chouldechova (FATML 2016) | arXiv 1609.05807, 1610.07524 | Re-checked |
| Arntz et al. 9%, 6–12%, task-based | Search-retrieved records and summary; World Bank blog by the same authors (title and summary only) | **Corrected**: note 11 no longer implies the blog was read; "at risk ≠ will disappear" is now marked as the common summary |
| Frey & Osborne 47% | Common account | Flagged |
| Wong 2012 / 2021 | Abstracts (re-checked) | Paraphrase matches |
| Mhlambi 2020: relationality vs rationality; social harmony | Berkman Klein page; MAIEI summary (18 July 2020) | **Corrected**: a sentence saying machine "rationality" masks the imitation of discriminatory patterns was not supported by either page and was replaced with the Berkman Klein summary (AI harms violate relational personhood). The component's matching line was changed too |

## 4. Primary-text verification

1 Chinese source block (Analects 2.3, reused verbatim from S9 / CN1, confirmed by script) and two inline sentences of Mencius 2A6 (reused from CN1; the ellipsis is the chapter's, note 16). No new primary text.

## 5. Bibliographic and copyright limits

Read this cycle by retrieval tool (possibly not in full): the two SEP entries, the NTSB summary page, the ProPublica methodology, four arXiv abstract pages. Known only at second hand: Frey & Osborne, the OECD paper's full text, Gheaus & Herzog 2016, Wong's full texts, Mhlambi's full paper, Matthias, Nissenbaum, Johnson, Floridi & Sanders, Leveson & Turner, the COMPAS vendor's response, automation-bias research.

## 6. Statistics

7 parts; reading text ≈ 15,900 characters (1.9 / 2.6 / 2.7 / 2.3 / 1.8 / 4.1 / 0.5 千字). 17 notes, 33 note references, all resolving. 9 tables. 5 exercises.

## 7. Practice (`practice-d7.ts`)

5 sets × 3 = 15 questions: 6 single, 4 multi, 3 tf (all false), 2 view. Single-answer keys vary (c, d, a, c, b, c). Every graded key accepted in the browser; both view questions respond (2-3 how to answer the responsibility gap; 5-3 which question to ask first).

## 8. Component (`ui/media/d7/ResponsibilityAnalyzer.tsx`)

Anchored in 五 at "下面的练习让你把几种视角分别用到江北医院的几个参与者上". The reader picks a participant (or the system itself) and two of four perspectives (liability, Nissenbaum's accountability, Confucian role ethics, Ubuntu), states a share, then sees the chapter's table row and each perspective's reading. Each reading says whether it is the chapter's own or written for the exercise; Confucian and Ubuntu readings are marked as the chapter's application, not the traditions' historical positions. State under `philopilot.v2.d7.media.responsibility-analyzer`.

## 9. Unresolved issues

1. Claims about current AI capabilities will date. They should be reviewed whenever the course is revised.
2. Mhlambi and Wong are known through summaries only; reading the full texts would allow closer paraphrase.
3. The NTSB account rests on the summary page, not the full report.

## 10. Images

None used, none downloaded.

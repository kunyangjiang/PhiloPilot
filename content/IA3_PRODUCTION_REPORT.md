# IA3 制作报告（V22）

*Supporting report for `content/IA3_SAMPLE_DRAFT.md` (《安萨里、阿威罗伊与西方伊斯兰思想》 / Ghazālī, Averroes and Western Islamic Thought: Causation, Reason and Society). Written in V22 with IA4 and IA5 and integrated in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** Title, tier (Core ●), six sections, central problem ("Can philosophy establish truths about God and nature, and what is causation?"), method focus ("evaluating a two-sided exchange on one example (causation)") and outcome ("reconstruct the fire–cotton example from both sides") follow `planning/CURRICULUM_REFERENCE_DRAFT.md` (IA3) and the V22 spec, which agree. Core question in the text: 哲学能否确立关于神和自然的真理？因果是什么？

| Part | Core problem | Original passages |
|---|---|---|
| 导读：火与棉花 | The example; how to read the chapter's kinds of material (source, autobiography, literary work, scholarship, the chapter's own reconstruction) | — |
| 一 安萨里的批判 | The professor who left his chair; the *Deliverance* as an arranged autobiography; the sciences table; the *Incoherence*'s internal method; 3 "unbelief" vs 17 "innovation" theses | *Tahāfut* 17th discussion, opening (p. 66) |
| 二 因果：偶因论与必然性 | Ashʿarite and Avicennian backgrounds; Ghazālī's logical point; *ʿindahu / bihi*; four claims to keep apart; "the book becomes a horse"; the second approach; four modern readings (occasionalist, Marmura, Frank, Griffel/Moad); structural comparison with Hume; step reconstruction | *Tahāfut* p. 67 (three passages) |
| 三 阿威罗伊的回答 | The commentator; the *Tahāfut al-tahāfut*'s method; denial of causes as sophistry; "who removes causes removes intellect"; nature, definition and name; necessity and impediments; Averroes vs Avicenna; step reconstruction | Bouyges 1930 pp. 519, 522 |
| 四 理性与律法 | A legal question; the law commands reflection; "truth does not oppose truth"; *taʾwīl*; three classes of people and arguments; critique of Ghazālī; not a modern liberal; Maimonides (background only) | *Faṣl al-maqāl*, Müller 1859 pp. 1 (two), 7 (two) |
| 五 伊本·图斐勒的自学者 | Ibn Bājja's solitary; the *Ḥayy* story in nine steps; the story as a thought experiment; stages vs kinds of knowledge; story and argument | Paraphrase (Ockley/Fulton 1929 for the plot) |
| 六 伊本·赫勒敦的社会之学 | Criticism of reports; man is political by nature; *ʿaṣabiyya*; *riʾāsa* vs *mulk*; dynasties' natural lifespans (three generations); "inventor of sociology?" comparison table | *Muqaddima*, Quatremère 1858 vol. 1 pp. 68, 69, 252, 305 (heading) |
| 结语 / 后世批判与回应 | Four items (§5) | — |

- **Size:** 37,831 characters including notes and appendix (CR excluded); 28,595 before 注释. Nine reader parts: the six official sections plus 本章导读, 结语 and 后世批判与回应. 61 notes, 14 primary blocks, 12 tables, 6 想一想 blocks. File is UTF-8 with CRLF.

## 2. Arguments

- **Ghazālī on causation:** what he denies is the *necessity* of the connection between created things (claim 2), not observed concomitance (1) or the reliability of natural knowledge (4); claim 3 depends on which of his two approaches is read. The chapter does not decide whether he is an occasionalist and lays out four readings with their authors.
- **Averroes' reply:** four points (sophistry; intellect = knowing through causes; nature and definition; impediments), the second reconstructed in four steps against its *Posterior Analytics* background; his retreat from Avicenna to Aristotle.
- **Faṣl al-maqāl:** a legal question; demonstration cannot contradict scripture; interpretation defined and restricted; three classes; not a liberal argument for free speech.
- **Ḥayy:** read as a thought experiment whose steps are arranged by a theory of knowledge.
- **Ibn Khaldūn:** his framework distinguished from modern social science; the circularity risk of *ʿaṣabiyya*.

## 3. Verified primary sources

Fourteen Arabic passages, all read from page images on 2026-11-09 and transcribed by eye (OCR layers unusable): *Tahāfut al-falāsifa*, Cairo 1302 AH, pp. 66–67 (archive.org `AAlexandrina-128200`); *Tahāfut al-tahāfut*, ed. Bouyges 1930, pp. 519, 522 (`AAlexandrina-118679`); *Faṣl al-maqāl*, ed. Müller 1859, pp. 1, 7 (`philosophieundt00vollgoog`); *Muqaddima*, ed. Quatremère 1858, vol. 1, pp. 68, 69, 252, 305 (`prolgomnesde01abda`). Orthography is normalised (final ى/ي, hamza) and the notes say so; the ambiguous print of سفسطائي is noted with Bouyges's variants. Several *Faṣl* pages (6, 8–9, 11, 17, 21) and the three-generations passage were read only in OCR and are therefore paraphrased, as the notes state. The Qurʾān (16:125) is given in the chapter's own Chinese only.

## 4. Translation and terminology

All Chinese translations are the chapter's own. Key decisions: *Tahāfut al-falāsifa* 《哲学家的矛盾》, *Tahāfut al-tahāfut* 《矛盾的矛盾》, *Faṣl al-maqāl* 《决断论》, *al-Muqaddima* 《历史绪论》; iqtirān 伴随; ʿāda 习惯; jawāz 可能; ʿinda / bi- 在……的时候 / 由于; kufr 不信; bidʿa 标新立异; taʾwīl 解释; burhān 证明; ʿaṣabiyya 群体感; mulk 王权; riʾāsa 首领地位. The full list is in the manuscript's appendix.

## 5. Critiques and responses

1. Does al-Ghazālī deny causation or only necessary causal connection?
2. Can philosophical demonstration establish theological truth?
3. How should philosophy and religious law relate?
4. Does social cohesion sufficiently explain historical change?

These are the four the spec requires, in the same order.

## 6. Practice

`src/content/practice-ia3.ts`: 6 sets × 3 = **18 questions** (6 single, 4 multi, 4 tf, 4 view). Single keys a 2 / b 1 / c 2 / d 1; tf answers false, false, true, true. View questions ia3-2-3 (is Ghazālī an occasionalist?), 3-3 (definition and name), 5-3 (can a story argue?), 6-3 (does *ʿaṣabiyya* explain history?) are ungraded: the contested readings are never forced into graded items. In the browser, all 18 were answered with their keys and resolved as expected (graded → "right", view → "shown"). Storage: `philopilot.v2.ia3.practice.*`.

## 7. Components

| Id | File | Anchor | Objective | Actions |
|---|---|---|---|---|
| `fire-cotton` | `ui/media/ia3/FireCotton.tsx` | 三, after "这样，安萨里第二种进路中关于奇迹的说法" | Outcome: reconstruct the fire–cotton example from both sides | Sort the four claims (accept / deny / depends on the approach) with feedback; the p. 67 *ʿindahu / bihi* passage and a choice of what observation shows; Averroes' four replies, each with the claim it presses, his point (with the p. 519 or p. 522 Arabic where the chapter has it), a possible reply for Ghazālī's side (marked as the chapter's reconstruction) and the question left open. No verdict |
| `cohesion-model` | `ui/media/ia3/CohesionModel.tsx` | 六, after "这是一个循环的理论" | Assess whether *ʿaṣabiyya* is a law | The p. 252 passage; step through the three generations with group feeling shown in words (and a decorative bar); two outcomes, both "explained", to expose the circularity risk; three views on testability (ungraded) |

Spec candidates not built as separate components: the Ghazālī–Averroes comparison (inside `fire-cotton`) and the Ibn Ṭufayl knowledge path (the chapter's stage table already does this; a component would add little). Both components use native radios and buttons (keyboard and touch), show verdicts in words, keep state per learner, have no horizontal overflow at 375 px (checked), and the only transition is disabled under `prefers-reduced-motion`.

## 8. Images

Candidates in `content/V22_IA3_IMAGE_APPROVAL_SHEET.md`: three edition pages the chapter transcribed (Cairo 1302 p. 67, Müller 1859 p. 1, Quatremère 1858 p. 252) and one held (Bouyges 1930 p. 522). **No decision yet; nothing downloaded or embedded.**

## 9. Rights and uncertainties

Medieval texts are public domain; the three nineteenth-century printings are quoted in short lines only, and Müller 1859 is marked NOT_IN_COPYRIGHT on archive.org. The status of Bouyges 1930 (a modern critical edition) was not established; only two short passages are quoted and only the two variants bearing on them are mentioned. Ockley/Fulton is used for the plot only. Open items: the second approach and the "book becomes a horse" passage are known through SEP, not read in the original; Ibn Khaldūn's three generations are paraphrased from OCR and common accounts; the SEP Ibn Khaldūn entry and IEP Ibn Ṭufayl / Ibn Khaldūn entries returned "not found" when read, so those sections rest on common accounts beyond the quoted Arabic; authors of two SEP entries could not be named.

## 10. Cross-course boundaries

- **Backward:** IA1 (Ashʿarite atomism and occasionalism) and IA2 (Avicenna's necessity, emanation, the soul) are referred to, not retaught.
- **Forward:** IA4 (post-Avicennan critique), IA5 (Iqbal's re-reading of Ashʿarite atomism and of Ghazālī), EA1 (Latin Averroism) and JW1 (Maimonides, mentioned only as background) are previewed, not taught.

## 11. Integration readiness

Integrated in V22: registry `IA3` (tradition `ia`, position 3, `origLang` ar, tier ● 核心). Background: 「法拉比与阿维森纳」 (recommended, intellectual dependency, no lock). Links on: IA4, EA1, S2, S3, D3, JW1 (unbuilt courses shown as 原型未实现). Typecheck and build pass.

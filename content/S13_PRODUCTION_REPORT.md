# S13 production report — 《美学与艺术哲学》

*Extended ○, Philosophical Problems (domain C), position 13. No prerequisite. Manuscript: `content/S13_SAMPLE_DRAFT.md` (CRLF). V34 cycle. Nothing committed.*

## 1. Coverage against the curriculum

Curriculum entry (S13): five sections — beauty and taste · art and expression · interpretation · cross-cultural aesthetics · art and politics. Method focus: building and testing an interpretive argument about a work. Outcome: defend an interpretation and answer an objection.

| Section | Content | Brief requirement met |
|---|---|---|
| 导读 | Two friends argue about a poem; the paradox of taste | Orientation, core question |
| 一、美与趣味 | Hume, "Of the Standard of Taste" (ST 6, 7, 15, 23): Sancho's kinsmen, the five conditions, joint verdict, the circularity objection; Kant (AA V 219, 236, 240): judgement without a concept yet universal; comparison table | **Hume and Kant are presented as two different answers** (empirical standard vs normative claim to universal assent), explicitly "not equivalent" |
| 二、艺术与表现 | Definitions of art tested by counterexample (imitation, expression, formal, institutional, historical, cluster, sceptical); *Fountain*; Collingwood's expression vs arousal; Kristeller's "modern system of the arts" | Art and expression |
| 三、诠释 | Actual / moderate / hypothetical intentionalism; Levinson's categorial intention; **full worked interpretation of 王维《鹿柴》** (claim, six-row evidence table with limits, Buddhist-reading objection, three-point response) | Worked interpretation plus objection. Links 《诠释、翻译与哲学写作》 for the general theory without repeating it |
| 四、跨文化的美学 | "Aesthetics" as a framework with a history; 谢赫《古画品录》 six laws and the punctuation dispute; Japanese *mono no aware* as Motoori's anti-Confucian argument; *rasa*: the sūtra, its terms (vibhāva, anubhāva, vyabhicāribhāva, sthāyibhāva), four commentators' table; Islamic art (al-Ghazālī, paraphrase only); Hume's critic vs sahṛdaya (six-question comparison) | Original vocabulary kept; **rasa is not equated with "aesthetic emotion"** — the chapter explains why (常情 vs 味, generalised emotion savoured, not suffered) |
| 五、艺术与政治 | Plato *Republic* 607b; Confucius 《论语》8.8; Kant AA V 353 (beauty as symbol of the morally good); moralism, autonomism, moderate moralism (Carroll), ethicism (Gaut); censorship as a separate question | Art and politics |
| 结语 | Between feeling and reasons | Conclusion |

## 2. Argument accuracy

Reconstructions are labelled ［本章的重建］: the paradox of taste, the circularity objection, the definitions table, the moderate-moralist argument. Positions of Weitz, Dickie, Levinson, Gaut, Collingwood, Beardsley, Carroll, Stecker, Livingston, Davies and Tolhurst are paraphrased via SEP/IEP, never quoted.

## 3. Primary-text verification

14 quoted passages: 10 original-language (Hume ×4, Kant ×4, Bharata's *rasa-sūtra*, *Republic* 607b) and 4 Chinese (鹿柴, 古画品录 ×2, 论语 8.8).

- New in this course, checked this cycle: Hume ST 6, 7 (with marked ellipsis), 15, 23 against Hume Texts Online (davidhume.org); 谢赫 preface and the 提要 sentence against zh.wikisource "古畫品錄" (revision 2062706); 王维《鹿柴》 against zh.wikisource (全唐詩 卷128).
- Reused and re-verified by script: Kant (EA4), *Republic* 607b (GR2), 《论语》8.8 (CN1).
- **Not verified:** the *rasa-sūtra* is given in its commonly cited form only (note 13); al-Ghazālī and the hadith "God is beautiful and loves beauty" are paraphrased only and marked unverified (sunnah.com could not be read; no workaround attempted).

## 4. Bibliographic and copyright limits

All quoted texts are public domain. Wikisource text is CC BY-SA 4.0 and attributed. Hume Texts Online's transcription and paragraph numbering are credited; only public-domain wording is quoted. No modern translation (Hume, Kant, Nāṭyaśāstra) is reproduced. **No modern copyrighted artwork is reproduced or described in detail**: *Fountain* is discussed as a case, not shown.

## 5. Comparisons

One six-question comparison (Hume's true critic and the sahṛdaya), labelled problem-level with no historical connection. Further problem-level comparisons in prose: Hume–Kant, Plato–Confucius, Hume–Carroll. Original vocabulary is kept throughout (rasa, sthāyibhāva, mono no aware, 气韵生动).

## 6. Statistics

7 parts (导读, 5 sections, 结语); ≈ 20,000 characters (1.7 / 5.0 / 2.2 / 2.7 / 4.8 / 2.6 / 0.6 千字). 19 notes, 40 references, all resolving. 10 tables. 5 exercises.

## 7. Practice (`practice-s13.ts`)

5 sets × 3 = 15 questions: 7 single, 2 multi, 3 tf, 3 view. View questions: definition of art (2-3), the Buddhist reading of 鹿柴 (3-3), moral defects and artistic value (5-3). Keys verified in the browser.

## 8. Component (`ui/media/s13/InterpretationEvidence.tsx`)

Anchored at the end of section 三 (after the response to the objection and the paragraph that introduces the exercise). The reader chooses one of two claims about 鹿柴 (the chapter's interpretation, or the objection's Buddhist reading) and, for seven pieces of evidence, judges its kind (internal / context / biography) and its bearing (supports / weakens / unrelated or merely compatible). After both judgements the component sets the chapter's analysis beside the reader's and states what the evidence can at most show. It never marks the reader wrong ("your reasons may also hold"). Two of the 14 analyses are the component's own and say so. The closing statement is labelled as the chapter's weighing, "not the only possible conclusion". State saved (`philopilot.v2.s13.media.interpretation-evidence`), verified across reload at 375 px.

## 9. Checked vs assumed

Checked: the new quotations above; note resolution; catalogue titles. Assumed (flagged): Baumgarten and the word "aesthetics"; Wang Wei as 诗佛 and the reading of 返景; sahṛdaya's role in Abhinavagupta's tradition; the summary of figural painting in Islamic art; the modern punctuation dispute over 气韵生动.

## 10. Unresolved issues

1. The *rasa-sūtra* wording should be checked against a critical edition of the Nāṭyaśāstra.
2. al-Ghazālī's account of beauty and the hadith need a readable source.
3. Hume quotations are checked only against Hume Texts Online, not the 1757/1777 printings.

## 11. Images

None used, none downloaded. The course reads completely without images. Candidates are listed in `content/S13_IMAGE_APPROVAL_SHEET.md` for PO decision.

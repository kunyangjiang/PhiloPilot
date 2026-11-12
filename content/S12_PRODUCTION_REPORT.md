# S12 production report — 《宗教哲学、死亡与人生意义》

*Core ●, Philosophical Problems (domain C), position 12. Manuscript: `content/S12_SAMPLE_DRAFT.md` (CRLF). V34 cycle. Nothing committed.*

## 1. Coverage against the curriculum

Curriculum entry (`planning/CURRICULUM_REFERENCE_DRAFT.md`, S12): six sections — arguments for God · evil · divine attributes · religious experience · non-theistic views · death and meaning. Prereq: A1 recommended. Not repeated: IA1 and EA1 narratives.

| Section | Content | Brief requirement met |
|---|---|---|
| 导读 | Three questions a dying person asks; five reminders; five layers of claims | Orientation, core question |
| 一、关于神存在的论证 | What "God" means; Anselm (ontological, reductio reconstruction); Aquinas and Avicenna (cosmological; Avicenna's argument does not depend on denying infinite regress); kalām; Cleanthes' analogy, Philo's objections; Nyāya–Buddhist debate on the author of the world (comparison, not influence); Paley, Darwin, Sober, fine-tuning; Pascal's wager | Arguments; "from first cause to God" stressed |
| 二、恶的问题 | Logical problem (Mackie) and Plantinga's free-will defence; Rowe's fawn; skeptical theism; Draper; Hick's soul-making and Tooley's objections; natural evil; van Inwagen; table ranking responses by commitment | **A defence is not an explanation of actual suffering** stated explicitly (exercise 二 and component) |
| 三、神的属性 | Stone paradox; foreknowledge argument (8 steps); Boethius's eternity; Euthyphro dilemma; via negativa — Maimonides and *neti neti* (six-question comparison) | Divine attributes |
| 四、宗教经验 | Hildegard, Schleiermacher; argument from perceptual analogy; three groups of objections; occurrence vs interpretation | **Mystical experience does not demonstrate the supernatural**: the argument is reconstructed as giving at most defeasible reasons |
| 五、非有神论的视角 | Why "atheism" is the wrong label for Buddhism; SN 56.11; Buddhist critique of a permanent creator; Daoism "not one doctrine" (Laozi 5 with Wang Bi; Zhuangzi); Buddhism–Zhuangzi six-question comparison | **Buddhism is not called "atheism"; Daoism is not one doctrine** |
| 六、死亡与人生的意义 | Epicurus (reconstruction), deprivation account, timing problem; Williams on immortality; Zhuangzi on his wife's death and 县解; Epicurus–Zhuangzi comparison; theories of meaning (supernaturalist, subjectivist, objectivist, hybrid) | Death and meaning |
| 结语 | What makes a finite life meaningful? | Ends on the required question |

No apologetics or polemic: every argument appears with its strongest objection and the defenders' reply; the chapter never states that God exists or does not exist.

## 2. Argument accuracy

All reconstructions are marked ［本章的重建］ and attributed to the SEP entry they follow: ontological (reductio form), Avicenna's cosmological argument (three premises), Cleanthes' analogy (six lines), Mackie's inconsistent triad with two auxiliary premises, Rowe (two premises), the foreknowledge argument (eight steps, following SEP "Foreknowledge and Free Will"), the Euthyphro dilemma, the perceptual-analogy argument for religious experience, and Epicurus. Positions of Plantinga, Rowe, Draper, Hick, van Inwagen, Tooley, Williams and Nagel are paraphrased from SEP, not quoted.

## 3. Primary-text verification

18 quoted passages: 13 original-language (`primary`) blocks and 5 Chinese source blocks. Every one is reused verbatim from a course that already checked it, and was re-verified by script against that course's manuscript (scratchpad `vq.py`, `vt.py`): EA1 (Anselm, Aquinas, Boethius, Hildegard), IA2 (Avicenna), EA3 (Hume, *Dialogues* II), EA2 (Pascal 233), EA5 (Schleiermacher), A1 (Euthyphro 10a), IN6 (BAU 2.3.6), IN2 (SN 56.11), CN3 (Laozi 5 with Wang Bi; Zhuangzi 至乐, 大宗师, 知北游), GR4 (Epicurus *Ep. Men.* 125, KD 2). Translations reuse the source course's 试译 / 白话.

Corrections made during production: the Upaniṣad line (to "athāta ādeśo"); the Wang Bi truncation (now marked "……" and explained in note 25); the SuttaCentral edition label (see §10).

## 4. Bibliographic and copyright limits

All quoted texts are public domain; digital-edition licences are as recorded in the source courses' appendices. No modern translation is quoted. Contemporary philosophers are paraphrased via SEP. SEP entries were read by question through a retrieval tool and may not have been read in full (notably the ends of "Problem of Evil" and "Meaning of Life"); unsigned readings are left without an author name.

## 5. Comparisons

Three six-question comparisons, each labelled ［本章的比较］ with "no historical connection": Maimonides and *neti neti*; Buddhism and Zhuangzi on impermanence and death; Epicurus and Zhuangzi on fear of death. One further problem-level comparison (Nyāya's author-of-the-world argument and Cleanthes) is stated in prose with an explicit "not influence" label. No East/West blocks; original terms (dukkha, anicca, anattā, upādāna; 化, 气, 命; *neti neti*) are kept.

## 6. Statistics

8 parts (导读, 6 sections, 结语); reading text ≈ 25,000 characters as displayed (2.2 / 6.5 / 3.1 / 2.8 / 2.6 / 2.6 / 4.4 / 0.8 千字). 29 notes, 60 note references, all resolving. 7 tables. 6 exercises.

## 7. Practice (`practice-s12.ts`)

6 sets (一–六) × 3 = 18 questions: 8 single, 3 multi, 4 tf, 3 view. Answer keys checked in the browser (every graded question accepts its key). The view questions (2-3 evil, 4-3 religious experience, 6-3 meaning) have no correct answer; each option names what it must carry. Markdown was removed from one stem (s12-4-3) because stems render as plain text.

## 8. Component (`ui/media/s12/ArgumentAnalyzer.tsx`)

Anchored at the end of section 二, before exercise 二. The reader picks one of three reconstructed arguments (Avicenna, Cleanthes, Rowe), then the premise they find most doubtful; the component shows the objection, the defenders' reply and what is left if the premise fails. Premises without a discussed objection say so instead of inventing one. It uses only material from sections 一–二. Every claim carries a basis tag (scholar via SEP / common account / course). No argument is declared to succeed or fail; the closing line asks whether the reader's choice matches where the chapter's objections concentrate. State is saved (`philopilot.v2.s12.media.argument-analyzer`) and survives reload (verified).

## 9. Checked vs assumed

Checked: all quotations and translations against source courses; note resolution in the browser; titles of cited courses against the catalogue. Assumed (common account, flagged in the appendix): Russell's "just there", Hick–Irenaeus, skeptical theism, "goodness is God's nature", devas in early Buddhist cosmology.

## 10. Unresolved issues

1. **SuttaCentral edition label.** IN2 (sealed) calls the SuttaCentral Pāli text "摩诃僧祇本"; that name refers to the Mahāsāṃghika school, while the edition is the Mahāsaṅgīti. S12 copied the label; it is corrected in S12 to "Mahāsaṅgīti 本". IN2 was afterwards corrected on PO authorization (see `V34_INTEGRATION_REPORT.md` §9).
2. The fine-tuning premise is left as an empirical question; the chapter takes no position on physics.
3. Skeptical theism is summarised from a common account; primary literature not read.

## 11. Images

None used, none downloaded. The course does not need images.

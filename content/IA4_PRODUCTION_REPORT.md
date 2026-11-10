# IA4 制作报告（V22）

*Supporting report for `content/IA4_SAMPLE_DRAFT.md` (《照明学派、苏非形而上学与后古典诸派》 / Illumination, Sufi Metaphysics and the Post-Classical Schools). Written in V22 with IA3 and IA5 and integrated in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** Title, tier (Extended ○), six sections, method focus ("conceptual analysis of epistemic categories (knowledge by presence)") and outcomes ("explain primacy of existence; compare with Avicenna") follow `planning/CURRICULUM_REFERENCE_DRAFT.md` (IA4). **Discrepancy:** the curriculum's problem is "how knowledge by presence and unity of being modify the philosophy of being"; the V22 spec words it "How do knowledge by presence and unity of being transform earlier accounts of knowledge and existence?". The chapter follows the curriculum (在场的知识与存在的单一，怎样改变了关于存在的哲学？) but treats knowledge as well as being, so it covers both wordings. The spec's title drops "the" before "Post-Classical Schools"; the registry keeps the curriculum's title.

| Part | Core problem | Original passages |
|---|---|---|
| 导读：回到你自己 | The question; why these traditions are not one "tradition" | — |
| 一 阿维森纳之后的批评 | One book, a hundred commentaries; Rāzī's sceptical commentary; Ṭūsī's defence; the fusion of kalām and philosophy; why the "decline" story is wrong | Paraphrase |
| 二 苏赫拉瓦迪的照明 | Critique of definition; knowledge by presence; regress reconstruction; four kinds of knowledge table; metaphysics of light; illumination is not physical light; existence as a mental consideration; transmission | Paraphrase (SEP) |
| 三 伊本·阿拉比与存在的单一 | Realisation; self-disclosure; fixed entities; "He / not He"; the history of the label *waḥdat al-wujūd* (table); a possible argument; Rūmī as philosophical poet; poem and proof; Rābiʿa: history and legend | *Mathnawī* I.1–2, I.4 (Nicholson 1925, p. 3) |
| 四 穆拉·萨德拉与存在的首要性 | Which is real, essence or existence; why it is not terminology (table); Ṣadrā's arguments; reply to Suhrawardī's regress; gradation (table); "simple reality is all things"; comparison with Avicenna | Paraphrase (SEP) |
| 五 心灵与实体运动 | Substance itself moves; why; Zayd three ways (table); two objections; soul corporeal in origin, spiritual in survival (table); knowing as a mode of being; personal identity | Paraphrase (SEP) |
| 六 波斯学派及其后 | Mīr Dāmād's *ḥudūth dahrī* (table); the "Isfahan school" label; after Ṣadrā (Sabzawārī, India); post-classical Sunni scholasticism; exchanges | Paraphrase |
| 结语 / 后世批判与回应 | Four items (§5) | — |

- **Size:** 31,584 characters including notes and appendix (CR excluded); 24,707 before 注释. Nine reader parts. 50 notes, 2 primary blocks, 12 tables (including the terminology table in the appendix), 6 想一想 blocks. UTF-8, CRLF.

## 2. Source and terminology decisions

- **One original passage only.** Rūmī's Persian (couplets 1, 2 and 4 of Book I) was read from the page image of Nicholson's 1925 edition and transcribed by eye. Suhrawardī, Ibn ʿArabī, Rāzī, Ṭūsī, Mīr Dāmād and Ṣadrā are **not quoted**: the chapter found no edition that could be both checked and rights-cleared (modern critical editions of uncertain status; nineteenth-century lithographs too hard to read reliably in the time available; scans without bibliographic data). They are paraphrased from SEP and named scholarship, and the status line at the top of the manuscript says so.
- **Rābiʿa** is presented through Cornell 2019's account of the evidence (late dates, Aṭṭār's thirteenth-century stories, early ninth-century mentions by al-Muḥāsibī and al-Jāḥiẓ; see §11), not as a documented life.
- **Terminology** (full table in the appendix): al-ʿilm al-ḥuḍūrī 在场的知识 (not 亲知, to avoid confusion with Russell); al-ʿilm al-ḥuṣūlī 通过表象的知识; waḥdat al-wujūd 存在的单一, presented as a later label; aṣālat al-wujūd 存在的首要性; tashkīk al-wujūd 存在的程度; al-ḥaraka al-jawhariyya 实体运动; ḥudūth dahrī 超时间的生成.

## 3. Critiques and responses

1. Is knowledge by presence a distinct mode of knowledge?
2. What does unity of being mean?
3. Is the primacy of existence defensible?
4. Can substantial motion explain the continuity of personal identity?

The spec's four, in order.

## 4. Practice

`src/content/practice-ia4.ts`: 6 sets × 3 = **18 questions** (6 single, 4 multi, 4 tf, 4 view). Single keys a 2 / b 1 / c 1 / d 2; tf false, false, true, false. View questions ia4-2-3 (is presence knowledge?), 4-3 (the regress exchange), 5-3 (personal identity), 6-3 (*ḥudūth dahrī*; one option is "the chapter's sources are too thin to judge") are ungraded. All 18 resolved as expected in the browser. Storage: `philopilot.v2.ia4.practice.*`.

## 5. Components

| Id | File | Anchor | Objective | Actions |
|---|---|---|---|---|
| `presence-explorer` | `ui/media/ia4/PresenceExplorer.tsx` | 二, after the four-kinds-of-knowledge table | Method: conceptual analysis of knowledge by presence | Sort five cases (remembering a tree, pain, awareness of "I", recognising oneself in a photo, saying "I am in pain") into representation / presence with feedback from the chapter's table; build the regress by adding representations R, R′, R″… until it is stopped by direct presence, with the seven-step reconstruction highlighted alongside; three modern objections with possible replies (ungraded) |
| `substantial-motion` | `ui/media/ia4/SubstantialMotion.tsx` | 五, after the Zayd table | Distinguish metaphysical substantial motion from measured change | Four changes in Zayd's life read three ways (Aristotle–Avicenna, Ṣadrā, biology); which description can be measured (feedback); the two SEP objections with Ṣadrā's reply |

Spec candidates not built: the Suhrawardī hierarchy (the light table suffices and a diagram risks suggesting physical light), the Ibn ʿArabī lab (the label-history table carries the point; a component risked overstating a contested reading), the Ṣadrā primacy workshop (its core, the regress reply, is a practice view question). No Persian or Arabic is quoted in the components because the chapter verified none for these authors. Native controls; 375 px checked; reduced motion respected.

The Persian passage renders right to left at the Arabic size (`:lang(fa)` rule added to `styles/base.css`, beside the existing Arabic rule); the reference line under the couplets is set small.

## 6. Images

`content/V22_IA4_IMAGE_APPROVAL_SHEET.md`: one candidate (Nicholson 1925, p. 3), recommended **hold** until its item page's rights field is read. **No decision yet; nothing downloaded or embedded.**

## 7. Rights and uncertainties

Rūmī's poem is public domain; only the Persian verses are quoted, not Nicholson's translation or notes. The appendix's reasoning on the 1925 edition (US publication date; Nicholson d. 1945) supports the short quotation; it is not a per-file reproduction record. Weakest areas, flagged in the notes: Rāzī's critiques and Ṭūsī's replies (no SEP entry found at the expected addresses; general accounts only); Mīr Dāmād (no SEP entry; general accounts only); the "Isfahan school" label; the anecdote about Ṭūsī's "jarḥ" quip (hedged); Rābiʿa; the authorship of two SEP entries. Iranica and some review pages returned 403 and were not used.

## 8. Cross-course boundaries

- **Backward:** IA2 (Avicenna's essence/existence, the flying man) is the recommended background and is compared, not retaught; IA3 (Ghazālī) is mentioned for the "decline" story.
- **Forward:** IA5 (Iqbal on Ṣadrā is not taught; the Safavid period is mentioned in IA5's Shariati section), D3 (knowledge across traditions).

## 9. Integration readiness

Integrated in V22: registry `IA4` (tradition `ia`, position 4, `origLang` fa, tier ○ 拓展). Background: 「法拉比与阿维森纳」 (recommended, no lock). Links on: IA5, D3. Typecheck and build pass.

## 10. Curriculum note: possible merge

The curriculum lists IA4/IA5 as a possible merge ("possible over-splitting, reversible"). Writing both confirmed that they share little material: IA4 is metaphysics and epistemology from the twelfth to the seventeenth century, IA5 is modern hermeneutics and politics. A merge would cut one of them to an introduction. Not acted on; for the Product Owner.

## 11. Focused verification (V22 final review, 2026-11-09)

The SEP entries were re-read in full text: "Suhrawardi" (rev. 2019), "Ibn Arabi" (Chittick, © 2025) and "Mulla Sadra". Then Atif Khalil's review of Cornell 2019 was read, a scan with a handwritten mark "JIMS 8, no. 1 (2023): 82–88", from pp. 82–86. Each point below says whether the evidence is direct historical evidence, later tradition, or scholarly interpretation. No Arabic or Persian was added.

| Point | Finding | Kind of evidence | Change |
|---|---|---|---|
| Suhrawardī, knowledge by presence | Confirmed. SEP §3.2: in *Intimations* he "criticizes and then rejects" Avicenna's representational epistemology; the dream-Aristotle's "return to your self" (Suh. 1993a, 70); intellection as "the presence (ḥuḍūr) of a thing for a self", a "function of luminosity"; pain as the paradigm of unmediated, non-conceptual, non-propositional awareness. SEP names *ʿilm ḥuḍūrī* as Suhrawardī's own concept (PI §§114–7) | SEP summarising his texts (scholarly interpretation of primary texts) | 导读: "后来被称为'在场的知识'" → "被称为": nothing found supports "later" |
| Ibn ʿArabī, unity and multiplicity | Confirmed. Each thing is "He/not He" (huwa/lā huwa); the Real is incomparable (tanzīh) yet self-discloses in all things (tashbīh); "nondelimited" existence | SEP (Chittick) citing *Futūḥāt* | None |
| waḥdat al-wujūd as a later label | Confirmed point by point. Ibn ʿArabī "never uses the expression"; his students used it rarely and non-technically, the exception being Farghānī (Qūnawī's student); Ibn Taymiyya "seems to have been" the first to ascribe it to him and called it "worse than unbelief"; Jāmī (d. 1492) was "the first of Ibn ʿArabī's defenders to embrace the expression"; "at least seven different meanings" later | SEP (Chittick), scholarly history of the term | None. The manuscript already hedges "似乎" for Ibn Taymiyya |
| Ṣadrā, primacy and gradation of existence | Confirmed. "a single, simple reality… degrees by perfection and deficiency" (Mulla Sadra 1964: 68–9 as quoted); intensification and debilitation (ishtidād wa taḍāʿuf); One and many "settled in favour of both" | SEP quoting Ṣadrā | None |
| Ṣadrā, substantial motion | Mostly confirmed: the two objections and the replies (existence is its own subject; essences do not limit existence); young and old Zayd "literally not the same existent"; renewal at each instant answering creation in time. **Corrected:** SEP says the doctrine "follows from his position on existence and his rejection of Aristotle's category theory". The step-by-step weak-to-strong argument the manuscript gave "according to SEP" is the chapter's own elaboration | SEP; chapter's reconstruction | §五: the attribution is split. SEP's statement stays as SEP's; the elaboration is now marked "本章的说明" |
| Rābiʿa | Refined. Khalil (pp. 83, 86) reports Cornell's evidence. The earliest account is al-Muḥāsibī (d. 857, early years in Basra), who already ascribes love language to her (Cornell p. 39). Al-Jāḥiẓ (d. 868, a Basran) presents her as an eloquent, wise guide. Cornell finds love mysticism among her peers and predecessors, so "the first" is itself part of the tradition. Cornell counts the teacher, ascetic and Sufi images (and partly the lover) as close to the historical figure; others she treats as literary constructions | Direct early mentions (9th c.) as reported by Cornell; later tradition (ʿAṭṭār); scholarly interpretation (Cornell via Khalil) | §三 "### 拉比雅：历史与传说": the "two early Baṣran authors" are now named, and the love-mysticism point is added. Note 32 records the review read and what still rests on summaries |

**Still unverified for Rābiʿa.** Two points rest only on other reviews and search summaries: that the 717–801 dates have an unclear source, and that the Ḥasan al-Baṣrī stories first appear in ʿAṭṭār. Pages 87–88 of the review were not read, and Cornell's book was not read.

**Size.** Text before 注释: 24,707 → 24,927 characters; 50 notes; CRLF.

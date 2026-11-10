# IA5 制作报告（V22）

*Supporting report for `content/IA5_SAMPLE_DRAFT.md` (《近现代伊斯兰与阿拉伯思想》 / Modern Islamic and Arabic Thought). Written in V22 with IA3 and IA4 and integrated in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** Title, tier (Extended ○), six sections, method focus ("evaluating modern arguments built on classical sources") and outcome ("assess a modern argument that builds on classical sources") follow `planning/CURRICULUM_REFERENCE_DRAFT.md` (IA5). **Discrepancies:** (1) the curriculum's problem is "how Islamic philosophy answered modernity, science and political change"; the spec says "How did Islamic philosophical traditions respond…". The chapter follows the curriculum (伊斯兰哲学怎样回应现代性、科学与政治的变化？). (2) The curriculum names section 6 "Contemporary"; the spec "Contemporary Developments". The chapter's heading is 六、当代的发展, a Chinese rendering that fits both; no curriculum change was made.

| Part | Core problem | Original passages |
|---|---|---|
| 导读 | A question about *taqlīd* | — |
| 一 复兴与改革 | Nahda; Ṭahṭāwī; al-Afghānī and Renan; ʿAbduh on reason and imitation (reconstruction); reason and revelation compared with Averroes (table); scope of reform | ʿAbduh, *Risālat al-tawḥīd*, pp. 17–18, 18 |
| 二 伊克巴尔的重建 | The self as directive energy; God as an ego; Iqbal on Ghazālī and Averroes; five-step reconstruction of his re-reading of Ashʿarite atomism (table); religious experience and knowledge | Iqbal, *Reconstruction* (1934), pp. 4, 58, 66, 97 |
| 三 法律与伦理 | Fazlur Rahman; double movement; worked example: polygamy (Q 4:3, 4:129, the chapter's paraphrase), with the contested steps marked; interpretation and modern institutions | Paraphrase |
| 四 政治 | ʿAbd al-Rāziq (1925); *wilāyat al-faqīh*; Shariati, "return to self", red and black Shiism; concept / argument / propaganda (table); an echo of Ibn Khaldūn | Paraphrase |
| 五 性别与诠释 | Mernissi on the Abū Bakra hadith (isnād and history); Wadud's holistic Qurʾānic method; comparison (table); interpretation and authority, four criteria | Paraphrase |
| 六 当代的发展 | Taha Abderrahmane (spirit vs Western realisation of modernity); Soroush (contraction and expansion of religious knowledge), an objection and reply; comparison (table); back to the opening question | Paraphrase |
| 结语 / 后世批判与回应 | Four items (§4) | — |

- **Size:** 27,735 characters including notes and appendix (CR excluded); 22,006 before 注释 (after the final source review: 32,091 and 23,739; see §11). Nine reader parts. 31 notes, 6 primary blocks, 8 tables, 6 想一想 blocks. UTF-8, CRLF (converted from LF during validation).

## 2. Modern texts and source-rights qualifications

- **ʿAbduh**, *Risālat al-tawḥīd* (Cairo 1906; University of Toronto copy, archive.org `risalataltawhid00muamuoft`, marked NOT_IN_COPYRIGHT): two passages read from page images (the scan's leaves run in reverse).
- **Iqbal**, *The Reconstruction of Religious Thought in Islam* (OUP 1934; DLI scan `in.ernet.dli.2015.463850`): four short English sentences (about 17, 8, 5 and 19 words) read from page images. The rights basis is **quotation, not public domain**: Iqbal d. 1938, so the work is public domain in India and Pakistan, but its US status was not established. The quotations do not overlap IN8's three. If quotation is judged unsuitable for publication, the four can become paraphrase without changing the argument.
- **Everyone else** (al-Afghānī, ʿAbd al-Rāziq, Rahman, Khomeini, Shariati, Mernissi, Wadud, Taha, Soroush) is paraphrased. Their works are in copyright and none of their texts or translations is quoted. *Superseded by §11 for 三–六:* at first, most of these sections rested on research abstracts and common accounts, not full texts: SEP Iqbal and IEP al-Afghānī / ʿAbduh entries returned "not found"; some publisher pages returned 403. This is the curriculum's own "weakest area" warning confirmed (see §8).
- The polygamy example is labelled as the chapter's demonstration of the method, not Rahman's text and not the general position of Islamic law (note 19). Qurʾān verses are the chapter's paraphrase.

## 3. Arguments

- ʿAbduh grounds reason in scripture against *taqlīd* and differs from Averroes in audience (everyone vs the few).
- Iqbal's selective inheritance: accepts "nothing has a stable nature", rejects "the soul is an accident"; changes the doctrine's purpose; the quantum analogy is identified as the weakest link (the chapter's evaluation).
- Double movement: each step is an interpretive judgement; the method does not fix the conclusion.
- Politics: concept, argument and rhetoric distinguished; no orientation is presented as the answer.
- Gender: Mernissi (isnād criticism) and Wadud (holistic, Qurʾān-first) kept distinct, as independent thinkers.
- Soroush's religion / religious knowledge distinction and the self-reference objection; Taha's spirit / realisation distinction.

## 4. Critiques and responses

1. How can a modern interpretation remain faithful to an earlier tradition?
2. Can ethical reform be grounded in historical religious texts?
3. What is the relationship between religious knowledge and change?
4. How should contested interpretations of gender and authority be assessed?

The spec's four, in order.

## 5. Practice

`src/content/practice-ia5.ts`: 6 sets × 3 = **18 questions** (6 single, 5 multi, 3 tf, 4 view). Single keys a 1 / b 2 / c 1 / d 2; tf false, true, false. View questions ia5-2-3 (faithful development?), 3-3 (reform from historical texts), 5-3 (assessing gendered interpretations), 6-3 (Soroush) are ungraded; political and gender questions are never graded on a position. All 18 resolved as expected in the browser. Storage: `philopilot.v2.ia5.practice.*`.

## 6. Components

| Id | File | Anchor | Objective | Actions |
|---|---|---|---|---|
| `iqbal-method` | `ui/media/ia5/IqbalMethod.tsx` | 二, before the five-step summary table ("所以，一个合理的评价是") | Outcome: assess a modern argument built on classical sources | The five steps tracked as the learner works; the p. 66 sentence; which of the two propositions Iqbal accepts (feedback from his text); classical vs Iqbal's purpose side by side, with the chapter's objection; which supporting argument is weakest, answered with the chapter's evaluation, marked as such |
| `double-movement` | `ui/media/ia5/DoubleMovement.tsx` | 三, after "所以，这个例子说明的，不是" | Show that the method makes each judgement explicit | Walk the five steps; at the three contested steps choose the reform or the classical-jurisprudence reading; the conclusion follows from the choices (reform readings throughout → monogamy as the better realisation; any classical reading → the permission stands) |

Spec candidates not built: the Nahda timeline (dates are thin and would add little argument), the Iqbal selfhood explorer (folded into `iqbal-method`), the feminist hermeneutics comparison (the chapter's table already separates the two methods; a component risked flattening them), the religious-knowledge argument map (the view question covers the Soroush objection). Native controls; 375 px checked; reduced motion respected.

## 7. Images

`content/V22_IA5_IMAGE_APPROVAL_SHEET.md`: one candidate (ʿAbduh 1906, p. 17, recommended approve); Iqbal 1934 not proposed; portraits not researched (no broad rights investigation). **No decision yet; nothing downloaded or embedded.**

## 8. Curriculum notes for the Product Owner

- **Weak-source area.** The curriculum lists IA5 among the weakest areas ("visible, not solved"). Confirmed at first: sections 三–六 rested on research abstracts and common accounts. The final source review (§11) replaced this with full-text scholarship, primary hadith text and Shariati in translation, but still no original-language works. Specialist review of 三–六 before publication is still recommended.
- **Possible IA4/IA5 merge.** See the IA4 report §10: the two courses share little; not acted on.

## 9. Cross-course boundaries

- **Backward:** IA3 (Ghazālī, Averroes, Ibn Khaldūn, Ashʿarite causation) is the recommended background; IA1 (atomism) and IN8 (Iqbal's Indian context, *ijtihād*) are referred to, not retaught.
- **Forward:** D6 《哲学中的性别、种族与帝国》, named in the 结语.

## 10. Integration readiness

Integrated in V22: registry `IA5` (tradition `ia`, position 5, tier ○ 拓展; `origLang` chooses `ar` or `en` per passage). Background: 「安萨里、阿威罗伊与西方伊斯兰思想」 (recommended, no lock). Link on: D6. Typecheck and build pass.

## 11. Final source strengthening (V22 review, 2026-11-09)

Scope: sections 三–六 only, per the Product Owner's final-review brief. Targeted corrections, no rewrite: titles, headings, the six 想一想 blocks, the component anchor sentence ("所以，这个例子说明的，不是…") and the 54 questions are unchanged except for one word in one explanation (below). Line endings remain CRLF.

### 11.1 Sources actually read in full

"Read" means the full text (or the full relevant chapter) was read. Where only part of a source was read, the pages are given.

| Thinker | Source | Access and status | What was read |
|---|---|---|---|
| Rahman, Taha | Ramon Harvey, "Qurʾanic Values and Modernity in Contemporary Islamic Ethics: Taha Abderrahmane and Fazlur Rahman in Conversation", in M. Hashas & M. al-Khatib (eds.), *Islamic Ethics and the Trusteeship Paradigm* (Leiden: Brill, 2020), pp. 150–169 | Brill open access, CC BY-NC 4.0 (PDF of the whole volume, kept in the session's temporary folder) | Whole chapter |
| Taha | Mohammed Hashas, "The Trusteeship Paradigm: The Formation and Reception of a Philosophy", same volume, pp. 37–51, plus the bibliographical sketch, pp. 32–33 | Same | Whole chapter |
| Rahman (his own wording, quoted), Wadud | Irma Riyani, "Muslim Feminist Hermeneutical Method to the Qur'an (Analytical Study to the Method of Amina Wadud)", *Ulumuna* 21/2 (2017): 298–314 | Open access, CC BY-SA | Whole article |
| Mernissi | Umi Sumbulah & Siti Fatimatuz Zahroh, "Fatima Mernissi's Historical-Critical Methodology Toward Misogynistic Hadiths…", *Humanisma* 10/1 (2026) | Open access, CC BY-SA | The method and application sections and the critique section (pp. 105–108, 111–112); the rest skimmed |
| Mernissi | Musdalipa, "Hermeneutika Hadits Fatima Mernissi…", *Akhlak* 2/4 (2025): 156–169 (Indonesian) | Open access | Pp. 166–167 (Mernissi's four steps, the Camel context, the Mālik criterion, the al-Mughīra case); abstract |
| Mernissi (primary hadith) | Ṣaḥīḥ al-Bukhārī 4425 and 7099, Arabic text and English translation | sunnah.com, read via curl (WebFetch returned 403) | Both reports in full |
| Shariati (primary, in translation) | *Religion vs. Religion*, trans. Laleh Bakhtiar (Albuquerque: ABJAD, 1988; copyright statement: all rights reserved). Lectures of 12–13 Aug 1970 | Unofficial scan on archive.org (identifier `religion-vs-religion-by-dr.-ali-shariati`, collection "opensource"). Read for research only, not quoted, not linked from the course | Foreword, introduction, pp. 30–34 (revolutionary vs legitimating religion) and pp. 56–58 (the intellectuals' error) |
| Shariati (primary, in translation) | "Red Shi'ism vs. Black Shi'ism", Iran Chamber Society web page (no translator or source text named) | Public web page | Full text. Read with a fetch tool that returns a model-processed rendering, so the course quotes only two short phrases that the page itself states |
| Soroush | Hossein Dabbagh, "Epistemology of Religion and Phenomenology of Revelation in Post-Revolutionary Iran: The Case of Abdolkarim Soroush", *Philosophy and Social Criticism* 49/10 (2023): 1244–1261 | Author's version in a university repository (nul.repository.guildhe.ac.uk) | Pp. 1244–1257 in full (theory, Kantian and Quinean readings, epistemology, revelation, error recognition, practical contraction); notes checked for the publication history |

**Consulted but not used as full sources.** Abstracts and search summaries of Indonesian articles on Wadud and Mernissi; the AJIS review of Soroush (abstract only); Publishers Weekly and catalogue pages. **Not read**, though earlier notes or searches mentioned them: Rahman's *Islam and Modernity* and *Major Themes*; Hallaq's *Reforming Modernity*; Mernissi's *The Veil and the Male Elite* (archive.org copy is lending-only); Wadud's *Qur'an and Woman* and *Inside the Gender Jihad*; Soroush's *Qabz va bast*; Shariati's "Return to Self" texts; the McGill and Boğaziçi theses on Rahman (redirects not followed). A full-text PDF of Mernissi's book turned up on an unidentified server and was **not** opened, because its rights status could not be established. No SEP or IEP entry on these six thinkers was used: none turned up in this cycle's searches, and the encyclopaedias were not checked exhaustively.

### 11.2 Changes to sections 三–六

For each claim the manuscript now marks who says it: the thinker (explicit), a named scholar (interpretation), or the chapter (reconstruction).

**三 Rahman**
- The double movement is now given in Rahman's own formulation ("twofold movement": from the Qurʾān's concrete case treatments, with that time's social conditions, to the general principles on which the teaching converges; then back to specific legislation, with present conditions). It is quoted in Riyani from *Islam and Modernity*, p. 20, and paraphrased in Chinese, not translated word for word. The five-step division is labelled as the chapter's own.
- Added (scholar's account, Harvey pp. 155–156): Rahman's claim that moral values have an "extrahistorical" being, and his distinction between a ruling (ḥukm) and its ratio legis.
- 评估 gains one bullet: the Betti/Gadamer objection (Körner, as reported by Harvey pp. 156–157).
- Note 19: Harvey p. 158 lists family law among Rahman's brief thematic forays. The polygamy example stays the chapter's own and is not attributed to Rahman. Note 17 adds Harvey's corroboration of the biography (pp. 151, 162–163).

**四 Shariati**
- Red/black Shiism is now reported from the translated lecture text itself. It also records that this text gives no sources for its history, which supports the chapter's existing "history needs historians" point.
- New paragraph, explicit claim: in *Religion vs. Religion* (1970) Shariati puts the dividing line *within* religion. On one side is the religion of tawḥīd, which criticises the status quo; on the other the religion of shirk, which legitimates it, often "under the mask" of monotheism. He does not oppose religion to non-religion. In the analysis table, the row "religion can liberate or legitimate" is now marked as stated in that text.
- "Return to self" is unchanged and still marked as a common account; no readable text was found (note 23).

**五 Mernissi and Wadud**
- The hadith was checked against Bukhārī 4425 and 7099. The narrator himself dates his benefit from the saying to "the days of the Camel", so the timing Mernissi exploits is part of the report's own wording. At the Companion level both reports go back to Abū Bakra; "sole narrator" is now attributed to Mernissi.
- The flogging is specified: under ʿUmar, false-accusation (qadhf) punishment in the al-Mughīra case. So is Mernissi's appeal to Mālik's criterion (people who lie in their dealings are not accepted as transmitters).
- Added to the reply (scholar's account, Sumbulah & Zahroh, pp. 108, 112): in classical rijāl criticism a ḥadd for qadhf followed by repentance does not void ʿadāla, and most hadith scholars count Abū Bakra reliable.
- Wadud, corrected. In *Qur'an and Woman*, "hermeneutics of tawḥīd" first means the **unity of the Qurʾān** (p. xii, quoted in Riyani), with three aspects: context, grammatical composition, world-view (p. 3). The theological extension of tawḥīd as the basis of non-discrimination comes later, in 2006 and in "Engaging Tawhid" (2008). The earlier text implied the theological sense alone.
- Wadud, added: her later refusal of the literal reading of 4:34 ("beat them"; *Inside the Gender Jihad*, pp. 202–203, quoted in Riyani). This shows that Wadud and Rahman are not forced into one theory of reform. A one-sentence comment, marked as the chapter's, notes that whether this is still "interpretation" is disputed.

**六 Taha and Soroush**
- The intro no longer calls this part "the weakest" without qualification. It now states what was read, and that no original-language works were read.
- Taha, corrected: the distinction is between the **spirit** (rūḥ) and the **reality/fact** (wāqiʿ) of modernity, not "spirit vs realisation". The source is *Rūḥ al-ḥadātha* (2006), per Hashas p. 46 and Harvey pp. 158–159. Hallaq 2019, previously the cited source (from a publisher's blurb), is now named only as not read; the sentence attributing to Hallaq a disagreement on "spirit vs realisation" was removed, as it rested on the blurb alone.
- Taha, added (all from Hashas and Harvey):
  - ethics, not reason, distinguishes humans (Taha 2000, 13–14)
  - three levels of reason: mujarrad, musaddad, muʾayyad
  - dahrāniyya as the separation of ethics from religion
  - trusteeship as entrustment versus possession
  - his critique of both secularists and political Islamists
  - Harvey's assessment that the theory stays at meta-ethics and individual virtue
- Soroush, corrected: the theory first appeared as articles in *Keyhan-e Farhangi*, 1988–1990, then as a book; it was not "a book of the early 1990s". The critics list is now Dabbagh's: Makarem Shirazi, Sobhani, Larijani, Javadi Amoli, and the non-clerical Malekian.
- Soroush, added after the chapter's reply:
  - Soroush himself called the theory "interpretive-epistemological", which supports the reply's move to epistemology
  - Dabbagh's two readings (the "Kantian" reading with a silent religion-in-itself, and a reading that blurs the line), which give the objection a scholarly counterpart
- Comparison table and "回到导读的问题": 具体实现 → 具体现实.

**Practice.** `practice-ia5.ts` ia5-6-2: in the explanation of the "false" answer, 具体实现 → 具体"现实", matching the corrected distinction. The answer key is unchanged. All other IA5 questions were checked against the corrected text and remain correct: ia5-3-2 ("not attributed to Rahman"), ia5-4-2 (Shariati d. 1977), ia5-5-1 and ia5-5-2 (methods), the Soroush-premise question in set 六.

**Size.** Text before 注释: 22,006 → 23,739 characters (+1,733, about 8%). Whole file: 27,735 → 32,091 (most of the growth is in notes 17–31, which now give exact sources and pages). There are still 31 notes; footnote references and definitions match.

### 11.3 Remaining limitations

- **No original-language text** of any of the six was read. Shariati was read in two English translations; the rest come through full-text scholarship. Rahman's double movement is in his own words only as quoted by Riyani.
- **Mernissi.** Her book was not read. The two articles used are recent, from Indonesian journals, and cite her by paragraph rather than page. The early sources she relied on (al-Mughīra case, chronology) were not checked.
- **"Return to self"** remains a common account.
- **Taha.** Both full sources are in the volume that Hashas co-edited, so a second, independent scholarly voice on Taha is still lacking.
- **Soroush.** One full scholarly article.
- **Specialist review** of 三–六 is still recommended before publication.

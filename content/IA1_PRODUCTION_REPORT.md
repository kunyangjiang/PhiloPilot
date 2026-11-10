# IA1 制作报告（V21）

*Supporting report for `content/IA1_SAMPLE_DRAFT.md` (《翻译运动、凯拉姆与哲学的兴起》 / Translation, Kalām and the Rise of Falsafa). Written in V21 with IN8 and IA2 and integrated in the same cycle. Nothing has been committed, pushed or deployed. No external specialist has reviewed the manuscript.*

## 1. Content and scope

**Authority.** Title, tier (Core ●), six-section structure, method focus ("reconstructing paired arguments for and against a thesis (eternity of the world)") and links follow `planning/CURRICULUM_REFERENCE_DRAFT.md` §B4. The official section title "Al-Rāzī's critic of prophecy" is rendered 拉齐与对先知的批评.

| Part | Core problem | Original passages |
|---|---|---|
| 导读 | Al-Maʾmūn's dream of Aristotle; core question: how were rational inquiry and revelation related in the first Islamic centuries? | — |
| 一 翻译运动 | Two centuries of translation; was the *Bayt al-Ḥikma* a translation bureau?; why translate | Paraphrase (SEP, Gutas's thesis) |
| 二 穆尔太齐赖派 | *Tawḥīd* and *ʿadl*; attributes; the created Qur'an; the *miḥna*; justice and free will | Qur'an 42:11 (part), 43:3, 7:54 (part), 36:82, 18:29 (part) |
| 三 艾什尔里派的偶因论 | The "three brothers"; *bi-lā kayf*; atoms and accidents; occasionalism (five-step reconstruction); *kasb*; two-schools table; "confirmed by physics?" | Qur'an 20:5, 37:96 |
| 四 肯迪 | Defence of Greek wisdom; no actual infinite body; time is not infinite; **paired-arguments table on the eternity of the world** (six rows); the True One; intellect | Paraphrase (SEP: Adamson) |
| 五 拉齐 | Physician and philosopher; five eternal principles; the critique of prophecy: who said it? | Paraphrase (SEP: Adamson) |
| 六 语言与逻辑 | Scriptural language (*muḥkam/mutashābih*); origin of language (*tawqīf/iṣṭilāḥ*); logic vs grammar, the 932 debate | Qur'an 3:7 (part), 2:31 (part) |
| 结语 / 后世批判与回应 | Five items (§5) | — |

- **Size:** 27,041 characters (excluding CR); the site counts about 1.7 万字 over 9 reader parts: the six official sections of `planning/CURRICULUM_REFERENCE_DRAFT.md` plus 本章导读, 结语 and 后世批判与回应 (Critiques & Responses). The two appendices (注释, 来源与权利说明) are not counted. Only the six sections are the official curriculum; the other three are the house frame every course has (as in IN7: 5 + 3 = 8). 54 notes, 9 primary blocks (all Qur'an), 7 tables, 6 想一想 blocks (一 to 六).

## 2. Arguments

- **Muʿtazilite unity:** if attributes are distinct eternal things, there are many eternals; so attributes are not other than the essence. Reconstruction of the "created Qur'an" argument.
- **Occasionalism:** God sole creator → accidents do not last two moments → creatures have no creative power → fire does not create burning → "causation" is God's habit. *Kasb* as the answer on responsibility, and its critics. The Ashʿarite account of good and evil (added in the final review, §12): good and bad are what God commands and forbids, known only from revelation; nothing is obligatory on God; al-Ghazālī's explanation of why reason seems to know moral value (it confuses value with benefit); the resulting dilemma for each school.
- **Al-Kindī:** no actual infinite body (seven steps); time is not actually infinite (four steps); the True One.
- **Paired arguments (method focus):** six rows (infinity, motion, time, divine will, the *ḥudūth* argument, the meaning of "creation"), each with the premise the dispute turns on. Rows 4 and 6 (eternalist side) are flagged as later arguments, previewed only.

## 3. Verified primary sources

Only Qur'an verses are quoted in Arabic. Text from Tanzil *quran-simple* via the alquran.cloud API, read 2026-11-09 and compared with *quran-uthmani*. All nine passages are exact substrings of quran-simple (script check). Partial verses are marked in the notes. Al-Kindī, al-Rāzī, kalām authors, Mattā and al-Sīrāfī are **paraphrased** with their scholarly source (no checkable Arabic text was available; Abū Rīda 1950 and Rashed–Jolivet 1998 were not read). No modern English translation is quoted as if original.

## 4. Translation and terminology

Translations from Arabic are the chapter's own, following the common understanding of the verses; no modern Chinese translation was copied. Key terms: kalām 凯拉姆; falsafa 哲学; Muʿtazila 穆尔太齐赖派; Ashʿariyya 艾什尔里派; tawḥīd 独一; ʿadl 公正; miḥna 米哈纳; jawhar 原子; ʿaraḍ 偶性; ʿāda 习惯; kasb 获得; tawallud 生成; bi-lā kayf 不问如何; ḥudūth 新生. Three different "al-Rāzī"s are distinguished explicitly.

## 5. Critiques and responses

1. Does "the attributes are the essence" hold?
2. Can occasionalism account for scientific knowledge?
3. Did al-Kindī's finitude argument succeed?
4. Can al-Rāzī's real position be reconstructed?
5. Reason and revelation: conflict or cooperation?

## 6. Practice

`src/content/practice-ia1.ts`: 6 sets × 3 = **18 questions** (9 single, 3 multi, 3 tf, 3 view). Single keys a 2 / b 2 / c 3 / d 2. View questions ia1-3-3, 4-3, 6-3 are ungraded. Storage: `philopilot.v2.ia1.exercise.*`.

## 7. Components

| Id | File | Anchor | Objective | Actions |
|---|---|---|---|---|
| `occasionalism-lab` | `ui/media/ia1/OccasionalismLab.tsx` | 三, after "表格是本章的整理。最后一行要特别注意" | See what occasionalism claims and what rejecting it costs | Fire and cotton under three views (late Ashʿarite, early *tawallud*, Aristotelian); choose which premise of the five-step argument to drop; Qur'an 37:96 with the chapter's translation and an ungraded *kasb* judgement |
| `eternity-workshop` | `ui/media/ia1/EternityWorkshop.tsx` | 四, after "这张表是本章的整理。前三行的论证和反驳" | The method focus: paired arguments | For each of six pairs, read both sides (with basis tags) and identify the premise in dispute; feedback explains the diagnosis, which is marked as the chapter's |

Native inputs, no animation, one column at ≤600 px, Arabic set with `lang="ar" dir="rtl"`.

## 8. Images

Candidates in `V21_IA1_IMAGE_APPROVAL_SHEET.md`; all three approved and embedded on 2026-11-09. After the final review (§12), one remains: the 1224 Arabic Dioscorides page (一). The Ḥunayn eye diagram and the Latin *De radiis* page were removed. Records: `prototype/navigation-v2/public/media/ia1/SOURCES.md`.

## 9. Rights and uncertainties

The Qur'an text is not under copyright. Tanzil's terms were read on 2026-11-09 (<https://tanzil.net/docs/text_license>): CC BY 3.0; verbatim copying only, no changes; clear credit to the Tanzil Project with a link to tanzil.net; the copyright notice kept with verbatim copies. The appendix now states these terms and gives the credit, link and notice; the reader's course note, the per-passage source label and the occasionalism component's verse label now name tanzil.net. Open items: al-Kindī's "truth from wherever it comes" passage (note 33, paraphrase); the exact order of al-Kindī's infinity argument; where "accidents do not last two moments" holds (note 25); the attribute formula's origin (note 22); the end date of the *miḥna* (note 17); the 932 debate (notes 53–54); al-Rāzī on prophecy and the attribution of the "Tricks of the Prophets" (notes 42–47); the nature of the *Bayt al-Ḥikma*.

## 10. Cross-course boundaries

- **Backward:** GR3 (Aristotle on eternity, potential vs actual infinite) is referred to, not retaught.
- **Forward:** IA2 (Avicenna's eternalist reply, the Necessary Existent, the four intellects developed by al-Fārābī and Avicenna) is previewed only. Ghazālī's *Tahāfut* is left to IA3.

## 11. Integration readiness

Integrated in V21: registry `IA1` (tradition `ia`, position 1, `origLang` ar); GR3 now lists IA1 as a next course. Typecheck and build pass.

## 12. Final targeted review (2026-11-09)

- **Curriculum count.** Six official sections, unchanged (五 renders the official title as noted in §1). "9 parts" is the reader's count; §1 now says so.
- **Depth.** Reviewed against the six required topics. Five were already argued step by step (Muʿtazilite unity and the created Qur'an; justice and free will; occasionalism and *kasb*; al-Kindī's finitude arguments and the True One; al-Rāzī through hostile reports, with the limits of indirect testimony stated; the paired eternity arguments). One gap: 二 promised that 三 would answer the Muʿtazilite claim that reason knows good and evil, but 三 gave only the three-brothers story and a table row. Added a short subsection 「善与恶：理性能知道吗？」 in 三 (four-step reconstruction, marked 本章的重建; al-Ghazālī's explanation; the dilemma each side faces), about 700 characters, with new note 29 citing SEP "al-Ghazali" (Griffel), §5, and saying which steps are the common summary rather than a checked source. Later notes renumbered (+1, now 54); appendix references, the IA1 report and two component comments updated. Quotations, components and practice unchanged.
- **Tanzil.** Terms read and recorded (§9). The uncertain-items list no longer includes them (eight items).
- **Images.** Ḥunayn eye diagram removed (required: the only source is a social-media post; holding institution, shelfmark and date not established). *De radiis* removed (not the metaphysics the chapter teaches; a 17th-century Latin copy does not support the learning objectives). Not replaced.

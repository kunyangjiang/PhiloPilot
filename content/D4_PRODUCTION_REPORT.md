# D4 production report — 《德性、关怀与关系：跨传统伦理》

*Extended ○, Cross-Tradition Dialogue (domain D), position 4. Manuscript: `content/D4_SAMPLE_DRAFT.md` (CRLF). V35 cycle. Nothing committed.*

## 1. Coverage against the curriculum

Curriculum entry (D4): six sections (character · relation · care · compassion · critique · application). Scope: Aristotle, Confucian ethics, Ubuntu, care ethics, Buddhist compassion. Debates: character vs relation vs rule as the starting point; the role of partiality. Method focus: applying competing frameworks to the same practical case. Outcomes: apply two frameworks to one case and judge where they diverge. Background: S7 and two B courses.

| Section | Content | Requirement met |
|---|---|---|
| 导读 | One sustained, invented case (周岚: nurse, mother with Alzheimer's, absent brother, short-staffed ward) with five pulls (character, relation, care, compassion, impartial rules); core question | One sustained conflict case |
| 一、品格 | NE 1103a15–18 (habituation) and 1106b36–1107a2 (the mean); four theses; Mencius 2A6 (extension) and Xunzi (correction); comparison table; real similarities and differences; why "both teach moderation" says nothing | Character |
| 二、关系 | 巫马子 (耕柱), 夷之 (3A5), Mencius on graded love; Ubuntu via Metz and Ramose (from AF1); constitutive vs strong thesis; Makwanyane; strangers and outsiders; hierarchy and gender | Relation; partiality; personhood vs rights |
| 三、关怀 | Care as a framework (Noddings, Tronto, Held, Kittay via IEP); four basic claims; Slote vs Held; the care / 仁 debate (Li, Lai vs Star, Herr, Yuan); four objections | Care, deepened beyond EA11 and S7 |
| 四、慈悲 | Karuṇā and the four brahmavihāras (SEP); BCA 8.90, 8.94 (equality of self and other), 6.25, 6.31 (anger and dependent origination); three grounds (suffering, no-self, dependent origination); Keown vs Goodman left open; comparison table with care, Mencius and Aristotle | Compassion with its own premises |
| 五、批判 | Five critiques: action guidance; partiality; care burdens; compassion and institutional injustice; rule ethics' neglect of relationships ("one thought too many"); four ways of integrating | Critique of every framework, including rule ethics |
| 六、应用 | Full analyses: care ethics and Confucian relational ethics (premises, standards, leaning, unresolved); comparison showing agreement in conclusions and difference in reasons; shorter analyses: virtue, karuṇā, impartial rules; five-framework table; five points a defensible judgment should consider | Two frameworks in full; no verdict declared |
| 结语 | "Which question do you ask first?" | Open conclusion |

Not repeated: S7's introductions to the frameworks, EA11's history of care ethics, CN1's 亲亲互隐 debate (cited, not retold), AF1's history of Ubuntu.

## 2. Comparative method and the case

The comparison never starts from "East and West": the five frameworks are treated as different starting points for the same questions, with the real disagreements (partial vs impartial, anger at wrongdoing, whether special relations are reasons in themselves) shown to run within traditions too. "Both teach moderation" is taken apart as an empty comparison. Each comparison table is labelled ［本章的比较］ with "no historical connection" where relevant.

The case is invented and involves no real person. Two frameworks are applied in full detail; the chapter shows that they agree in conclusion and differ in reasons, then changes one condition (no brother, a patient likely to die) to show the reasons separating into different conclusions. The chapter ends with considerations for a defensible judgment, explicitly open to disagreement; no framework is declared correct.

## 3. Primary-text verification

9 quoted passages: 6 original-language blocks (Greek 2, Sanskrit 4) and 3 Chinese source blocks (Mencius 2A6, Mozi 耕柱, Mencius 3A5). All are reused verbatim from checked courses: GR3 and S7 (NE 1103a, 1106b), CN1 and S7 (2A6), CN2 and S7 (耕柱, 3A5), IN4 (BCA 6.25, 6.31, 8.90, 8.94). Translations reuse the source course's 试译 / 白话. No new primary text was needed. Analects 2.7 (孝 as more than 能养) and "人皆可以为尧舜" are mentioned as common citations and not quoted, because they were not checked.

## 4. Bibliographic and copyright limits

All quoted texts are public domain. Read this cycle by retrieval tool (possibly not in full): IEP "Care Ethics" (Sander-Staudt); SEP "Virtue Ethics" (Hursthouse & Pettigrove, rev. 2026); SEP "Ethics in Indian Buddhism" (Goodman & Schultz, rev. 2024). Metz and Ramose come via AF1. Known only at second hand: Gilligan, Noddings, Tronto, Fisher, Held, Kittay, Slote; Li, Lai, Rosemont, Herr, Yuan, Star, Harding; Keown, Goodman, Siderits; Yu 2007; Williams's "one thought too many"; the *Ratnāvalī*.

## 5. Statistics

8 parts; reading text ≈ 18,700 characters (1.6 / 2.4 / 2.4 / 2.4 / 2.8 / 2.5 / 4.1 / 0.5 千字). 23 notes, 30 note references, all resolving. 9 tables. 6 exercises.

## 6. Practice (`practice-d4.ts`)

6 sets × 3 = 18 questions: 8 single, 4 multi, 3 tf (2 false, 1 true), 3 view. Every graded key accepted in the browser. The view questions (3-3 the most serious objection to care ethics; 5-3 how to integrate; 6-3 which question to ask first) mark none right; each option names what it must carry.

## 7. Component (`ui/media/d4/EthicalCaseAnalyzer.tsx`)

Anchored in 六 at "下面的练习让你把几种框架应用到同一个情况上". The reader picks two of the five frameworks and sees them side by side (premises, standard, leaning, unresolved, from the chapter's table). Then one condition is changed (three variants); the reader predicts for each framework whether its leaning changes, and the component shows an analysis. Only variant 1's care and Confucian analyses are the chapter's own; the rest are written for the exercise from the frameworks as the chapter presents them, and each analysis says which it is. A closing line says whether the two frameworks moved together or apart. No framework is declared correct; nothing is scored. State saved under `philopilot.v2.d4.media.ethical-case-analyzer`; survives reload; no overflow at 375 px.

## 8. Checked vs assumed

Checked: all quotations against source courses; titles of cited courses. Assumed (common account, flagged): Analects 2.7 on 能养; "人皆可以为尧舜"; Williams's example; Aristotle on pity.

## 9. Unresolved issues

1. Whether Buddhist ethics has a systematic theory of institutional justice: the chapter states that its sources (SEP) do not settle this and leaves the objection partly unanswered.
2. The analyses written for the component's variants 2 and 3 are the chapter's style of reasoning, not the chapter's text; the PO may prefer to restrict the component to variant 1.

## 10. Images

None used, none downloaded.

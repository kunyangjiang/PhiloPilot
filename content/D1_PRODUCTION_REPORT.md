# D1 production report — 《比较哲学：方法与陷阱》

*Core ●, Cross-Tradition Dialogue (domain D), position 1. Manuscript: `content/D1_SAMPLE_DRAFT.md` (CRLF). V34 cycle. Nothing committed.*

## 1. Coverage against the curriculum

Curriculum entry (D1): six sections — why compare · translation and incommensurability · orientalism and self-orientalism · models of comparison · a case study · rules. Method focus: detecting hidden assumptions in a proposed comparison. Assumed background: two B courses from different traditions; A4 helpful.

| Section | Content | Brief requirement met |
|---|---|---|
| 导读 | A plausible-sounding paragraph ("仁 = love; East intuitive, West logical") with five problems | Orientation, core question |
| 一、为什么比较 | Comparison already in our vocabulary ("哲学" via Japanese); three purposes and their evidence; three common errors (oversimplification, overly sharp contrast, illicit assimilation) | Why compare |
| 二、翻译与不可通约 | Examples **from existing manuscripts**: 格义 (CN5, with the caution that the 20th-century story about it is itself an oversimplification); 道安's 五失本 point 2 (CN5); dharma in Mīmāṃsā 1.1.2 and "太初有道" (A4); "atheism" (S12) and "aesthetic emotion" (S13). Three kinds of translation difficulty; three incommensurability theses; charity; reconstruction showing radical incommensurability cannot be *warranted* (not that it is false); bridge concepts | Translation and incommensurability |
| 三、东方主义与自我东方主义 | Said (via SEP); Hegel on "the Orientals" (documented); Radhakrishnan as reversed orientalism (IN8 via IEP); 梁漱溟 and 胡适 as a **contested** case with reasons on both sides; 严复's warning against "it all came from the East"; four distortions table | Documented examples only |
| 四、比较的几种模式 | Historical, problem-centred, conceptual, dialogical, constructive — question, evidence, site examples, risk; Jenco on dialogue; 冯友兰's 理 as constructive | Models of comparison |
| 五、案例 | 蔡元培's preface (依傍; 截斷衆流); 梁启超; the 2001 legitimacy debate (marked unverified); India and darśana; the argument "China has no philosophy" reconstructed; three answers table | Case study |
| 六、负责任的比较的规则 | Ten principles with the error each prevents and where the chapter shows it; worked repair of a flawed 齐物 / 空 comparison, clause-by-clause diagnosis, revision by the six questions | 10 rules applied; a flawed comparison revised |
| 结语 | What remains after comparison? | Conclusion |

D1 does not repeat A4's general theory of interpretation (it cites A4's conclusions) or any Domain B narrative (it cites the courses and uses only their checked passages as examples).

## 2. Argument accuracy

Reconstructions labelled ［本章的重建］: radical incommensurability; "China (or India) has no philosophy". Classifications labelled as the chapter's own: three purposes, three translation difficulties, four distortions, five models, ten principles. The SEP entry "Comparative Philosophy: Chinese and Western" supplies the three errors, the incommensurability positions (Rorty, Shweder; Fleischacker; MacIntyre), Davidson's charity, Shun's thick/thin concepts, Stalnaker's bridge concepts, Vermander and Jenco, and "reversed orientalism"; all paraphrased.

## 3. Primary-text verification

13 quoted passages: 2 original-language (Mīmāṃsā 1.1.2; Hegel) and 11 Chinese (高僧传; 道安; 和合本 John 1:1; 梁漱溟 ×3 via 胡适; 胡适; 严复; 梁启超; 蔡元培 ×2). All are reused verbatim from CN5, A4, EA5 and CN7 and re-verified by script; translations and 白话 reuse those courses' wording.

## 4. Bibliographic and copyright limits

All quoted texts are public domain (和合本 1919; 严复, 梁启超, 蔡元培, 胡适, 梁漱溟 texts as recorded in CN7's appendix). Said, Davidson, MacIntyre and other modern authors are paraphrased only. Names checked: 魏明德 (Benoît Vermander), 詹科 (Leigh Jenco).

## 5. Comparison quality

D1 is itself about comparison. It follows PROJECT_DIRECTION §6: no uniform East/West blocks; shared problem, terms, what does not translate and the real disagreement are named; original terms kept; influence marked as hypothesis; every comparative claim tagged documented / school-level / reconstruction. The worked repair shows that the revised comparison is weaker but more interesting.

## 6. Statistics

8 parts (导读, 6 sections, 结语); ≈ 15,000 characters (1.6 / 1.1 / 2.7 / 3.0 / 1.7 / 2.5 / 2.3 / 0.5 千字). 16 notes, 37 references, all resolving. 9 tables. 6 exercises.

## 7. Practice (`practice-d1.ts`)

6 sets × 3 = 18 questions: 7 single, 4 multi, 4 tf, 3 view. View questions: incommensurability (2-3), 梁漱溟 (3-3), "is there Chinese/Indian philosophy?" (5-3). Keys verified in the browser.

## 8. Component (`ui/media/d1/ComparisonRepair.tsx`)

Anchored at the end of section 六. A second flawed comparison, written for the exercise and labelled as such (logos = 道 via "太初有道"; "shared wisdom of East and West"; "perhaps it came from the East"; "only Easterners can understand 道"). For each clause the reader toggles the principles they think it breaks (multi-select, keyboard-operable `aria-pressed` buttons); "看分析" sets the analysis beside the reader's choice ("both chose / the analysis also lists / you also chose — consider whether it holds") with no score. After all four analyses, or on request, a revision organised by the six questions appears. Uses only material from sections 一–六. State saved (`philopilot.v2.d1.media.comparison-repair`); verified by keyboard (Tab, Enter, Space; 2 px focus outline) and by click at 375 px with no overflow.

## 9. Checked vs assumed

Checked: quotations and translations; note resolution; catalogue titles. Assumed (flagged): Nishi Amane and "哲学"; the 2001 Derrida remark and 郑家栋's article (only the start of the debate is reported).

## 10. Unresolved issues

1. The 2001 legitimacy debate needs a primary source (Derrida's remark; 郑家栋's article).
2. The SEP comparative-philosophy entry was not read to its end.
3. Calling 梁漱溟's tripartition "contested self-orientalism" is the chapter's own analysis.

## 11. Images

None used, none needed, none downloaded.

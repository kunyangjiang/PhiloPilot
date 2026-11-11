# A2 制作报告（V29）

*Supporting report for `content/A2_SAMPLE_DRAFT.md` (《形式推理：命题逻辑与谓词逻辑》 / Formal Reasoning: Propositional and Predicate Logic). Written in V29 with A1 and A3 and integrated into the site in the same cycle. Nothing has been committed, pushed or deployed. No logician has reviewed the manuscript; the rules were checked against *forall x: Calgary* in a targeted verification pass (§8).*

## 1. Content and scope

**Authority.** `planning/CURRICULUM_REFERENCE_DRAFT.md` (A2) and the V29 brief.

- **Tier:** Extended ○. Position 2 in 哲学方法.
- **Sections:** six, plus 导读 and 结语:
  - 一 命题与联结词
  - 二 真值表
  - 三 演绎
  - 四 量词
  - 五 翻译及其限度
  - 六 逻辑不能决定什么
- **Method focus (site):** 把论证译成符号，用真值表和自然演绎检验有效性.
- **Links:** A1 shown as recommended background (not required); EA8 and IN3 list A2 as helpful background; leads to S11 and S6 (shown as not built). No prerequisite locks.

**Core question (verbatim):** 什么是逻辑形式？怎样用符号精确地判断一个推理是否有效？形式逻辑能告诉我们什么，又不能告诉我们什么？

| Element | Count / where |
|---|---|
| Notation | ¬ ∧ ∨ → ↔ ⊥, ⊨ and ⊢, ∀ ∃ (one convention table in 一) |
| Truth tables | five connectives; six forms checked row by row in 二 (MP, MT, DS, HS valid; AC, DA invalid at P 假 Q 真) |
| Rules (三, 四) | 13 propositional rules (∧I ∧E ∨I ∨E →I →E ↔I ↔E ¬I ¬E IP X R) and 4 quantifier rules, each with its restrictions |
| Proofs (三, 四) | Fitch-style: MT, HS, DS (uses X), ¬¬P ⊢ P (IP), the Socrates syllogism, ∀-transitivity, ∃-transitivity. Every line names its rule and the lines it uses |
| Countermodels (四) | ∀x∃y vs ∃y∀x; ∃xFx, ∃xGx ⊭ ∃x(Fx ∧ Gx) |
| Tables | 22 |
| Original passages | 2 from 《墨子·小取》 (效 and 或／假), `zh-Hant` |
| Exercises | 6 想一想 blocks with 提示 |
| Notes | 24, all resolving |

## 2. Brief rules and where they are applied

| Rule | Where |
|---|---|
| Every proof and every invalidity claim checkable | proofs fully annotated; each "invalid" verdict has a concrete counterexample row or model |
| Soundness and completeness stated, not overstated | 三: "找不到证明，并不证明推理无效" (SEP Classical Logic) |
| Translation shown as interpretation | 五: material conditional vs indicative conditionals, scope ambiguity, definite descriptions (Russell and Strawson via SEP) |
| Limits of formal logic | 六: what logic does not decide (premise truth), a table of non-classical logics (intuitionistic, many-valued, paraconsistent, relevance), logical pluralism, "one person's modus ponens…" |
| Non-Western material without forced equivalence | 一 and 四: 小取 on 法 and on 或／假, with notes on how commentators differ |

## 3. Sources actually consulted

SEP entries: Pelletier & Hazen (Natural Deduction Systems); Shapiro & Kouri Kissel (Classical Logic); Franks (Propositional Logic); Uzquiano (Quantifiers); Pietroski (Logical Form); Sennet (Ambiguity); Edgington (Indicative Conditionals); Ludlow (Descriptions); Moschovakis (Intuitionistic Logic); Marcos, Přenosil & Égré (Many-Valued Logic); Priest, Tanaka & Weber (Paraconsistent Logic); Priest, Berto & Weber (Dialetheism); Mares (Relevance Logic); Russell & Blake-Turner (Logical Pluralism); Fraser (Mohist Canons). Primary text: zh.wikisource 《墨子·小取》.

Corrections made during checking: Łukasiewicz's dates (his 1910 work concerns the law of non-contradiction); section numbers that could not be verified were removed from the notes; the 小取 quotation was corrected to "無也故焉".

## 4. Practice

`practice-a2.ts`: 18 questions in 6 sets (9 single, 5 multi, 2 true/false, 2 view: a2-5-3, a2-6-3). Every question has feedback; the proof and truth-table questions were checked by hand against the chapter. Ledes are verbatim; ids are unique.

## 5. Component

`ui/media/a2/ValidityChecker.tsx` (`validity-checker`) is placed in 二, after the table of six forms.

- Pick one of the chapter's six forms (default: 肯定后件). Every row of the truth table is listed with each premise's and the conclusion's value, computed from the chapter's connective tables (no formula parser).
- The reader marks each row 反例行 / 不是反例行, with feedback, then judges the form 有效 / 无效. The answer names the first counterexample row.
- Results agree with the chapter: tested for all six forms.
- The 不是什么 panel says the component computes the columns for the reader, so it practises only the definition of validity; truth tables apply to propositional logic only.

**Justification:** the definition of validity ("no row with all premises true and the conclusion false") is the chapter's central idea, and readers commonly confuse it with "the conclusion is true on every row". Row-by-row marking targets exactly that confusion.

## 6. Images

None used, none downloaded, none proposed.

## 7. Unresolved issues (flagged in the manuscript for expert review)

1. Rule statements: resolved in the verification pass (§8).
2. The reading of "或也者，不盡也" and its comparison with ∃.
3. The remarks on Chinese generic sentences in 五 are a teaching simplification, not a summary of linguistic literature.
4. "First-order logic is undecidable" (六) rests on the standard account; it was not checked in an entry read for this course.
5. The origin of "one person's modus ponens is another's modus tollens" was not traced.

## 8. Targeted logic verification (V29 final pass)

**Baseline.** P. D. Magnus, Tim Button, Robert Trueman and Richard Zach, *forall x: Calgary*, remixed and revised by Aaron Thomas-Bolduc and Richard Zach (Fall 2025 version, CC BY 4.0, forallx.openlogicproject.org): ch. 17 (basic rules for TFL), ch. 19 (additional rules), ch. 36 (basic rules for FOL), appendix C (quick reference).

| Item | Finding | Action |
|---|---|---|
| ∧I ∧E ∨I ∨E →I →E ¬I ¬E IP X R | Match ch. 17, including the citation forms (∨E m, i–j, k–l; ¬I and IP close a subproof ending in ⊥) | Unchanged |
| ↔I, ↔E | Basic rules in ch. 17. The chapter introduces ↔ and says every connective has an introduction and an elimination rule, but the table omitted them | **Added** two rows. No proof or exercise uses them |
| ∀E | Correct, but "replace every occurrence" and "∀ must be the main operator" were not stated | **Clarified** |
| ∃I | The restriction column said 无. forall x allows replacing some or all occurrences of the name, provided the variable is not already bound there | **Corrected** |
| ∀I | The premise / undischarged-assumption restriction was right. The requirement to replace *every* occurrence of c (so that c does not remain in ∀x A(x)) was missing | **Corrected**; variable restriction added |
| ∃E | The fresh-name restriction matches ch. 36 (not in an undischarged assumption, in ∃x A(x), or in B) | **Clarified**: the subproof and its discharge are now explicit |
| Unrestricted generalization | The manuscript nowhere presents it as valid | Added two short **invalid** applications (from Hs to ∀x Hx; from ∀x Lxx via Laa to ∀x Lxa) and one valid partial ∃I (Laa to ∃x Lxa), to show the difference between a proof and a misapplied rule |
| Worked proofs (MT, HS, DS, ¬¬P ⊢ P, Socrates, ∀-transitivity, ∃-transitivity) | Each line re-checked. Every rule is applied as stated and every subproof is discharged by the rule cited. In ∀-transitivity, *a* is in no premise and the assumption is closed before ∀I. In ∃-transitivity, *a* is new and is not in ∃x Fx, ∃x Gx or premise 1 | Unchanged |
| Derived rules | forall x lists DS and MT as additional rules (ch. 19) and shows them derivable (ch. 21). A2 proves them from the basic rules instead | Stated in note 6 |
| Practice | a2-3-1 (MT proof lines), a2-3-2 (subproofs; ¬¬P ⊢ P needs IP) and the 六 question on intuitionistic logic (drop IP, keep ¬I and X) agree with the rules. No question tests the quantifier rules, so no feedback depended on the corrected rows | Unchanged |
| Notation | Rule schemata now use A(x) / A(c) consistently | Corrected in the quantifier table |

Note 6 now cites the baseline and its chapters. The expert-review item on rule statements is marked resolved. In `practice-a2.ts` only the header comment changed (↔I ↔E added to the list of rules).

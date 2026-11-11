# V29 integration report — A1, A2, A3

*Three Foundations and Methods courses written and integrated in one cycle:*
- *A1 《什么是哲学？问题、论证与阅读》, Core ●, 6 sections;*
- *A2 《形式推理：命题逻辑与谓词逻辑》, Extended ○, 6 sections;*
- *A3 《概念、案例与思想实验》, Core ●, 6 sections.*

*Baseline HEAD 9a4fc2b (V28). Nothing has been committed, pushed, merged or deployed. No Cloudflare setting was touched. No SEALED manuscript, Cases file or `planning/` file was changed. No image was downloaded. A4 was not begun.*

## 1. Coverage

| Course | Sections | Exercises | Practice | Notes | Original passages | Component |
|---|---|---|---|---|---|---|
| A1 | 6 (+导读, 结语) | 6 | 18 | 27 | 10 (Greek, classical Chinese, Sanskrit) | ArgumentRoles (五) |
| A2 | 6 (+导读, 结语) | 6 | 18 | 24 | 2 (classical Chinese) | ValidityChecker (二) |
| A3 | 6 (+导读, 结语) | 6 | 18 | 36 | 6 (Greek, German, classical Chinese) | CaseDials (五) |
| **Total** | **18** | **18** | **54** | 87 | 18 | 3 |

Practice types across the 54 questions: 28 single, 15 multi, 7 true/false, 4 view. All have feedback. The details and the expert-review lists are in the three production reports.

## 2. Integration changes: exact list of files

**New files (12 + 4 reports):**

- `content/A1_SAMPLE_DRAFT.md`, `content/A2_SAMPLE_DRAFT.md`, `content/A3_SAMPLE_DRAFT.md` (CRLF)
- `prototype/navigation-v2/src/content/a1.ts`, `a2.ts`, `a3.ts`
- `prototype/navigation-v2/src/content/practice-a1.ts`, `practice-a2.ts`, `practice-a3.ts`
- `prototype/navigation-v2/src/ui/media/a1/ArgumentRoles.tsx`
- `prototype/navigation-v2/src/ui/media/a2/ValidityChecker.tsx`
- `prototype/navigation-v2/src/ui/media/a3/CaseDials.tsx`
- `content/A1_PRODUCTION_REPORT.md`, `content/A2_PRODUCTION_REPORT.md`, `content/A3_PRODUCTION_REPORT.md`, `content/V29_INTEGRATION_REPORT.md`

**Modified files (6):**

| File | Change |
|---|---|
| `src/content/courses.ts` | import A1–A3; `Tradition` gains `'fm'` (哲学方法); three `PUBLISHED` entries with positions 1–3, recommended background and leads-to from the curriculum; two helpers: `srcNoteA` (source note per citation) and `origLangA` (`grc` / `de` / `sa` / `zh-Hant` by script) |
| `src/ui/nav.ts` | `canonicalOf`: a course with tradition `'fm'` gets the breadcrumb 哲学方法 instead of 历史与传统 › tradition |
| `src/content/practiceSets.ts` | register the three practice sets |
| `src/content/media.ts` | three `MediaId`s and anchors (A1 五 objection table; A2 二 six-forms table; A3 五 cases table) |
| `src/ui/media/Media.tsx` | three lazy imports |
| `src/ui/media/in4/shared.tsx` | `useSavedIx` code union gains `'A1' \| 'A2' \| 'A3'` |

- `src/data/catalog.ts` and the 哲学方法 region needed no change: they already listed A1–A4, and A1–A3 now show as openable.
- No dependency was added. No CSS was added; the components reuse the existing classes.
- Line endings of every modified file were preserved (the diff is 104 insertions, 7 deletions).

## 3. Validation

### Verified (run or observed in this cycle)

- **Build:** `npm run build` (`tsc --noEmit && vite build`) passes. Only the existing chunk-size warning remains.
- **Whitespace:** `git diff --check` is clean.
- **Manuscripts:** CRLF; every note reference resolves; core question present in each 导读.
- **Region:** 哲学方法 lists A1, A2, A3 as 打开课程 and A4 as 原型未实现.
- **Course pages:** kicker reads e.g. 「哲学方法 · 第 1 门 · ● 核心」; related links follow the entries; arriving from the region gives the breadcrumb "入口 › 哲学方法 › 课程 › …". No prerequisite lock.
- **Reader:** every part opens (`#/course/A1|A2|A3/read/0…8`). Each of sections 一–六 has one practice set whose lede matches the exercise prompt. No unparsed markup. `lang` on source blocks: A1 `grc`, `zh-Hant`, `sa`; A2 `zh-Hant`; A3 `grc`, `de`, `zh-Hant`.
- **Components:**
  - each mounts at its anchor and saves under its own key (`philopilot.v2.a1.media.argument-roles` etc.), separate from reading position;
  - state survives a reload (A2 checked: selected form and row marks restored);
  - keyboard focus stays on the activated button, `aria-pressed` reflects the choice (the focus style is the shared one used by earlier components and was not re-measured);
  - ValidityChecker gives the chapter's result for all six forms; CaseDials fit counts and pair comparison checked;
  - no transitions or animations of their own, so reduced motion needs nothing extra;
  - at 375px (mobile preset with touch emulation) there is no page-level horizontal overflow on any A-course page; components fit in 343px; wide tables scroll inside the existing `tbl-wrap`.
- **Search (Ctrl K):** finds the courses by title (什么是哲学, 形式推理, 谓词逻辑, 思想实验) and by headings (电车).
- **Regression:** LA1 (course page and reader), JW1 reader, 历史与传统 and the home page open normally; history-tradition courses keep their old breadcrumb. No console errors.

### Assumed (not directly verified)

- Finger-touch on a physical device; screen-reader announcements of the `aria-live` regions.
- Reload persistence for A1 and A3 is inferred from their stored state and the shared `useSavedIx` code that the A2 test exercised.
- Scholarly and logical accuracy beyond the named sources: no specialist has reviewed the manuscripts.

## 4. Questions for the Product Owner

The three questions from the first report are settled:
- *Philosophical Investigations* rights: handled as directed (§6).
- A2 rule statements: verified against *forall x: Calgary* (§6).
- The 哲学方法 breadcrumb: approved and kept.

One point remains open:

1. **Search.** Body-text terms that are not in headings (e.g. 葛梯尔) do not find the course. This is the existing behaviour for all courses and was not changed.

## 5. Git status

Working tree only. The new and modified files are listed in §2. No commit, push, merge or deploy has been made. Waiting for Product Owner review and explicit Git authorization.

## 6. Final targeted verification (logic and copyright)

Scope as directed: one correction and verification pass, without rewriting the courses or repeating the full browser validation. A1 was not changed.

### A2: formal logic

- **Baseline:** *forall x: Calgary* (Magnus, Button, Trueman, Zach; revised by Thomas-Bolduc and Zach; Fall 2025, CC BY 4.0), ch. 17, 19, 21, 36 and appendix C.
- **Unchanged:** the 11 propositional rules already in the table and all seven worked proofs. Every line was re-checked; the citations and discharges are correct.
- **Corrected or clarified:**
  - ∃I: partial replacement allowed; variable must not already be bound. The table had said "no restriction".
  - ∀I: every occurrence of the name must be replaced; variable restriction added.
  - ∀E: every occurrence replaced; ∀ must be the main operator.
  - ∃E: the subproof and its discharge made explicit.
  - ↔I and ↔E added. They are basic rules in forall x, and the chapter's own claim that every connective has two rules required them.
- **New example:** two invalid applications of ∀I (including the unrestricted generalization from Hs to ∀x Hx) and one valid partial ∃I. Nothing in the manuscript had presented unrestricted generalization as valid.
- **Notes:** note 6 cites the baseline by chapter. The expert-review item on the rules is marked resolved.
- **Practice:** the proof and subproof answers agree with the rules. No practice answer or feedback depended on the corrected rows, so none changed.

### A3: Wittgenstein copyright

- **Wording:** the §66 quotation matches the wittgensteinproject.org transcription (base text Suhrkamp *Werkausgabe* vol. 1, 1999). Note 10 gives the full attribution, the elision and the dropped italics.
- **§67:** the quotation was not needed for the argument. It is replaced by an attributed paraphrase that keeps the term Familienähnlichkeiten (note 11).
- **Rights appendix:** it now separates three things:
  - UK and Germany: public domain under life+70 since 2022.
  - United States: probably still protected (first published 1953; publication-based term, possible URAA restoration). Not called public domain, and not confirmed by legal advice.
  - The quotation: limited, for educational criticism and analysis. Neither a claim of permission nor a guarantee of fair use.
- **Dependent text updated:** the status note and the course `sourceNote` in `courses.ts`.

### Files changed in this pass

| File | Change |
|---|---|
| `content/A2_SAMPLE_DRAFT.md` | rule table (↔I, ↔E rows; quantifier rows), one sentence on the baseline, the invalid-application example, note 6, review item 1 |
| `content/A3_SAMPLE_DRAFT.md` | §67 quotation replaced by a paraphrase; status note; notes 10 and 11; rights table row; review item 4 |
| `prototype/navigation-v2/src/content/courses.ts` | A3 `sourceNote`: "《哲学研究》§66 的两句德文" |
| `prototype/navigation-v2/src/content/practice-a2.ts` | header comment only (↔I ↔E in the rule list) |
| `content/A2_PRODUCTION_REPORT.md`, `content/A3_PRODUCTION_REPORT.md` | new §8 each; affected rows and review items updated |
| `content/V29_INTEGRATION_REPORT.md` | this section; coverage counts; §4 |

The full V29 file list in §2 is otherwise unchanged. The working tree holds 6 modified tracked files (104 insertions, 7 deletions against HEAD) and 16 new files.

### Validation of this pass

- **Typecheck:** `tsc --noEmit` passes.
- **Build:** `npm run build` passes; only the existing chunk-size warning remains.
- **Whitespace:** `git diff --check` is clean. A scan of all new V29 files finds no trailing whitespace or tabs, and every file ends with a newline.
- **Line endings:** the A2 and A3 manuscripts and all four reports are CRLF throughout.
- **Notes:** every reference resolves (A2: 24/24; A3: 36/36).
- **Browser:** targeted checks only, no console errors.
  - A2 三 shows the ↔I and ↔E rows.
  - A2 四 renders the new quantifier table and the example list with no raw markup.
  - A3 三 now has one `lang="de"` block (§66) and the paraphrased term.
  - The A3 notes and 来源与权利说明 pages render the new text.

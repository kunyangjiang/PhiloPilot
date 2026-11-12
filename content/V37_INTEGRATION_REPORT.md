# V37 integration report — D8, D9, D10, D11

*Domain D (跨传统对话), positions 8–11: the final scheduled course batch. One integrated cycle covered research, manuscripts, practice, components, integration, validation and the 72-course audit. Nothing committed, pushed, merged or deployed.*

## 1. Summary

| Course | Tier | Parts | Exercises | Questions | Notes / refs | Quoted passages | New primary text checked this cycle | Component (anchor) |
|---|---|---|---|---|---|---|---|---|
| D8 生命伦理学 | ○ 拓展 | 6 (+导读, 结语) | 6 | 18 | 26 / 56 | 3 Chinese + 1 English | Analects 2.6–2.8; one Belmont Report sentence | CaseApproaches (六) |
| D9 环境伦理学 | ○ 拓展 | 6 (+导读, 结语) | 6 | 18 | 15 / 42 | 6 Chinese + 4 Pāli verses | Mencius 1A7, 7A45; Zhuangzi 秋水, 马蹄; Metta Sutta | StandingTester (三) |
| D10 传播与交流：我们实际知道什么 | ○ 拓展 | 5 (+导读, 结语) | 5 | 15 | 20 / 30 | 1 Latin + 1 Greek (reused) | Aquinas, *De causis* prooemium | EvidenceRater (四) |
| D11 独立哲学研究（毕业项目） | ● 核心 | 5 (+导读, 结语) | 5 | 15 | 8 / 17 | 6 Greek + 1 Chinese (reused) | NE 1177b26–31, 1178a5–10; *Euthyphro* 4b–4e | ProjectPlanner (五) |

- 22 formal teaching sections in all.
- 66 practice questions: 23 single, 19 multi, 17 tf (6 true, 11 false), 7 view.
- Multi-answer key patterns vary (abd ×6, bcd ×5, acd ×4, ab ×3, ac ×1).
- Per-course details are in `D8_PRODUCTION_REPORT.md` to `D11_PRODUCTION_REPORT.md`.

## 2. Files (exact list)

**New (16):**
- `content/D8_SAMPLE_DRAFT.md`, `D9_SAMPLE_DRAFT.md`, `D10_SAMPLE_DRAFT.md`, `D11_SAMPLE_DRAFT.md`
- `prototype/navigation-v2/src/content/d8.ts`, `d9.ts`, `d10.ts`, `d11.ts`
- `prototype/navigation-v2/src/content/practice-d8.ts`, `practice-d9.ts`, `practice-d10.ts`, `practice-d11.ts`
- `prototype/navigation-v2/src/ui/media/d8/CaseApproaches.tsx`, `d9/StandingTester.tsx`, `d10/EvidenceRater.tsx`, `d11/ProjectPlanner.tsx`

**Reports (5):** `content/D8_PRODUCTION_REPORT.md`, `D9_PRODUCTION_REPORT.md`, `D10_PRODUCTION_REPORT.md`, `D11_PRODUCTION_REPORT.md`, and this file.

**Modified (5):**
- `src/content/courses.ts`:
  - Four imports and the D8–D11 entries.
  - Two new helpers. `srcNoteD8toD11` labels Analects 13.18 as identical to CN1, and the other Chinese passages as newly checked. `origLangD8toD11` recognises Pāli, then defers to V36's `origLangD5toD7`.
  - Earlier helpers are unchanged.
- `src/content/practiceSets.ts`: four imports and map entries.
- `src/content/media.ts`: four `MediaId`s and four anchors.
- `src/ui/media/Media.tsx`: four lazy imports.
- `src/ui/media/in4/shared.tsx`: the `useSavedIx` code union gains `'D8' | 'D9' | 'D10' | 'D11'`.

`git status` shows exactly these 5 modified files and 16 new files, plus the 5 reports. `src/data/catalog.ts` and `src/data/units.ts` already held D8–D11 and are unchanged. No new CSS, dependency, test framework or infrastructure was added. Nothing was touched under `planning/` (read only), `Cases/`, or any sealed manuscript.

## 3. Registry and links

- **Entries.** Each entry has tradition `cmp`, its curriculum tier, `method` and `background` from the curriculum, and a `sourceNote`.
- **No onward links.** All four have `recommendFrom: []` and `leadsTo: []`. The curriculum lists no onward course, and no link or prerequisite lock was invented.
- **Incoming links.** These became live without editing other courses, because those courses already list the new codes in their own `leadsTo`:

| Target | Linked from |
|---|---|
| D8 | none |
| D9 | none |
| D10 | CN5 |
| D11 | A4 |

## 4. Sources

- **New primary text verified this cycle:**
  - zh.wikisource revisions 11118094 (Analects 2), 2642991 and 2637007 (Mencius), 11117703 and 11117692 (Zhuangzi).
  - SuttaCentral root text (Snp 1.8).
  - Corpus Thomisticum (Saffrey 1954).
  - Perseus: NE (Bywater) and *Euthyphro* (Burnet).
  - Belmont Report full text.
- **Reused passages,** compared by script with their source courses, all identical:
  - DL 9.61 (D10 ← GR4);
  - Analects 13.18 (D11 ← CN1);
  - NE 1178a9–10 (D11 ← GR3).
- **Paraphrase only.** Modern authors and Aśoka's edict (Hultzsch) are paraphrased. Works known at second hand are marked and listed in each appendix.
- **Indigenous material.** None used in D9. No documented community permission was available, and the limitation is stated in the chapter.
- **Fabrication check.** No quotation, page number, date or historical influence was invented. Paraphrases and details that went beyond their sources were found during validation and corrected (§6).

## 5. Images

None used, proposed or downloaded. Each course is complete without images. Two worthwhile candidates for D10 are named in its report (§12): the Kandahar bilingual inscription, and Leibniz's annotated hexagram diagram. No approval sheet was prepared, because no source with verified rights was identified.

## 6. Validation (17 checks + extra checks)

Run on the production build (`npm run build`, preview server on port 5189). `tsc --noEmit` is clean.

| # | Check | Result |
|---|---|---|
| 1 | 22 new sections render | Pass: all 30 reader pages (8 + 8 + 7 + 7) render with their titles; one exercise per formal section; each component appears at its anchor |
| 2 | Titles, order, tiers | Pass: section titles match the manuscripts in order; tiers ○ ○ ○ ● on the domain page and course pages |
| 3 | Notes and references | Pass: 145 / 145 note buttons open a non-empty note (56 + 42 + 30 + 17). Language tags: D8 `en`, D9 `pi`, D10 `la` and `grc`, D11 `grc`. Source labels read "本周期新核对" or "与《孔子、孟子与荀子》相同" as intended |
| 4 | 66 valid questions with feedback | Pass: 66 rendered; all 59 graded questions accept their key ("回答正确") and show per-option explanations; all 7 view questions respond |
| 5 | Educational interactions | Pass. D8: decision, prediction, chapter's cells, seven-step fields. D9: theory × case, verdict, reading with its basis. D10: claim, five answers, label, matrix row, Leibniz rewrites. D11: track, eight fields, examples toggle, self-check |
| 6 | Keyboard, mouse, emulated touch | Pass for keyboard and mouse. StandingTester was driven entirely by Space, Tab and Enter; the focused button shows a 2 px solid outline (`:focus-visible`); buttons are native, with `aria-pressed` / `aria-expanded`. Touch: only emulated at 375 px (see §7) |
| 7 | No overflow at 375 px | Pass: `scrollWidth = 375` on 43 pages, including all 30 reader pages and the 4 front pages |
| 8 | Saved component state | Pass: all four components restored after `location.reload()`; practice state saved under `philopilot.v2.<code>.practice.*` |
| 9 | Practice does not overwrite reading position | Pass: using the D10 component and re-answering D10 practice left `d10.position` unchanged |
| 10 | Progress and resume | Pass: real wheel scrolling saved the position; D10's front page shows "已读 3% 继续阅读 →" |
| 11 | Domain D lists all 11 in order | Pass: `#/region/dialogue` lists D1–D11 in order with "打开课程 →"; course pages read "跨传统对话 · 第 8–11 门" |
| 12 | Search | Pass: finds all four courses by title (each listed as "课程 … 可阅读") with their section headings, and heading terms (知情同意, 宋秀琴, 呼吸机, 非同一性, 大地伦理, 青溪, 阿育王, 原因之书, 毕业项目, 研究稿). Body-only terms are not indexed, by existing design |
| 13 | Incoming links | Pass: CN5 → D10 and A4 → D11 open the new courses |
| 14 | No invented onward links | Pass: each new course's "读完以后" says the curriculum lists no onward course; no dangling link in the 72-course audit |
| 15 | Earlier sealed courses open | Pass: CN1, CN5, A4, GR2, GR3 and D1–D7 open; the navigation audit (§8) also opened all 72 |
| 16 | CASE 02 unchanged | Pass: no file under `Cases/` changed; `#/cases/02` opens 《分洪》 |
| 17 | No new console errors | Pass: no errors or warnings on a fresh load through D8–D11, their component sections and CASE 02. The only console lines were two markers logged by earlier test scripts; they are not in the source |
| D8 | Bioethical distinctions | Pass after fixes: `D8_PRODUCTION_REPORT.md` §3 |
| D9 | Ecological and environmental evidence | Pass: `D9_PRODUCTION_REPORT.md` §3 (IPCC checked against retrieved SPM text, not the PDF) |
| D10 | Transmission and influence claims | Pass after fixes: `D10_PRODUCTION_REPORT.md` §3 |
| D11 | Equal tracks; substantive worked examples | Pass: `D11_PRODUCTION_REPORT.md` §2–3 |
| — | 72-course registration and navigation | Pass: §8 |

**Fixes made during validation:**
- **D8.** Unverified SEP section numbers and dates were removed or softened. The Rachels date was removed. The Perrett location now reads "网上转载的全文". The involuntary-euthanasia row was aligned with Young's definition.
- **D9 note 14.** The note had attributed "weak or strong" to Sujato. It now gives his "frail or firm", his remark on the Jain idiom, and his reading of *sambhavesī*.
- **D10.** Note 15 now cites GR4 part 五 instead of 二. The typo "Thomasticum" was fixed.
- **Practice keys were too predictable.** The odd option was moved in 12 multi questions, and 4 tf items were rewritten as true statements.
- **`practice-d11.ts`.** Nested quotation marks broke `tsc`; they were changed to 「」.

**Whitespace and line endings:**
- `git diff --check` is clean.
- New files have no trailing whitespace, no tabs, a final newline and no BOM.
- The four manuscripts are CRLF on every line (623 / 528 / 389 / 394 lines), and the five reports are CRLF.
- Every new and changed `.ts` / `.tsx` working file is uniformly CRLF, with no mixed endings. The repository stores LF, and `core.autocrlf=true` converts on checkout. Git prints its usual "LF will be replaced by CRLF" warning for the five modified files.

## 7. Verified vs untested

**Verified in the browser:** everything in the §6 table and the §8 navigation audit.

**Verified by script or source comparison:**
- reused quotations;
- new primary text against Perseus, wikisource, SuttaCentral and Corpus Thomisticum;
- note numbering and resolution;
- answer-key distribution;
- the 72-course registry audit;
- cross-course title references in all four manuscripts.

**Not tested:**
- Real touch input. Only 375 px emulation was used, and clicks arrive as mouse events.
- Screen-reader output. Structure and ARIA attributes were inspected, but no assistive technology was run.
- Keyboard walk-through of the D8, D10 and D11 components. They use the same shared buttons as the tested D9 component, plus native textareas, but were driven by clicks only.
- Behaviour with `prefers-reduced-motion` actually enabled. The shared CSS contains a reduced-motion rule, and the four new components contain no `animation` or `transition`.
- Browsers other than the built-in Chromium pane.

## 8. 72-course registration and reachability audit

This is a registration and reachability audit, not an academic re-review. No sealed manuscript was reopened.

| # | Requirement | Result |
|---|---|---|
| 1 | Exactly 72 formal course codes in the approved baseline | **72** codes in `data/catalog.ts` |
| 2 | All 72 have valid published registrations | **72 / 72** registered as published in `courses.ts`; every one opened in the running app (item 5) |
| 3 | Tiers match the curriculum | **Match**: core 44, extended 23, elective 5; `courses.ts`, `catalog.ts` and `units.ts` agree for every code |
| 4 | Domain counts | **A 4, B 44, C 13, D 11** |
| 5 | Every course reachable from its intended navigation area | **72 / 72**, by clicking every course button in the running app: 历史与传统 44 (domain B); 哲学问题 13 (domain C: 11 direct, plus S7 and S8 through the expanded question 人性与道德); 哲学方法 4 (domain A); 跨传统对话 11 (domain D). Every destination rendered a course title |
| 6 | No duplicate codes | **None**: 72 unique codes; each navigation area lists each of its courses once |
| 7 | No earlier course removed or made inaccessible | **None**: all 68 earlier courses open (item 5); none of their files changed |
| 8 | D11 is the concluding Core capstone | **Yes**: D11 is ● (Core), position 11, and last in domain D |

Links: no `leadsTo` or `recommendFrom` points to a missing code. Domain D positions run 1–11 without gaps.

## 9. Final curriculum-completion section

| Item | Status |
|---|---|
| Total published courses | **72** |
| Domain counts | A 4 · B 44 · C 13 · D 11 |
| Course tiers | Verified against the curriculum: 44 core, 23 extended, 5 elective |
| Missing or duplicate registrations | None |
| Navigation reachability | 72 / 72 reachable from their intended area (§8) |
| Outstanding defects | No functional defects found. Known content limitations needing specialist review are listed below and in each production report |
| Implemented and verified | Course modules, manuscripts, 66 practice questions, 4 components, registry entries, navigation, search, links, saved state, progress, layout at 375 px, build and typecheck |
| Not verified | Real touch devices, screen readers, other browsers, reduced-motion behaviour in practice. Secondary sources marked as second hand in the appendices are unchecked |

**Is the 72-course curriculum technically complete?** Yes, technically. Every one of the 72 approved courses is registered, published, correctly tiered, reachable from its navigation area and openable. The validation above confirms this. It is a statement about registration and delivery. It does not say that every course has had specialist academic review: several have not, and the limits are documented course by course.

## 10. Component principles

- All four components use material from their own chapter, tag the basis of each reading (the chapter's own, or written for the exercise), score nothing and declare no view correct.
- They reuse the shared pieces (`Band`, `Claim`, `Limits`, `Pick`, `useSavedIx`, `v22` classes) with no new CSS.
- D11's planner is optional, local and ungraded. Nothing is submitted.

## 11. What was not done

- No commit, push, merge or deploy.
- No Cloudflare settings changed.
- No new formal course begun; the 72-course curriculum was not expanded.
- Cases not developed or modified.
- No sealed manuscript rewritten.
- No redesign, new dependency, approval workflow, completion dashboard, certificate or gamification.
- No mandatory submission or grading.
- No image downloaded.

## 12. Decisions for the Product Owner

1. **Specialist review.** The most valuable reviews before sealing would cover:
   - D8's Buddhist and Ubuntu end-of-life material;
   - D9's Metta Sutta reading and Daoist application;
   - D10's Samye debate and the dates in notes 8 and 20;
   - D11's grammatical note on NE 1178a9.
2. **Indigenous environmental philosophy (D9).** The course omits it by rule. Is documented community permission worth pursuing?
3. **D10 images.** Should approval sheets be prepared for the Kandahar inscription and Leibniz's hexagram diagram?
4. **Component content.** 12 of the D9 component's 20 readings are written for the exercise, from the chapter's account of each theory, and are labelled as such. Keep them, or restrict the component to the 8 readings the chapter itself gives?
5. **Git authorization.** All V37 work is uncommitted, awaiting review.

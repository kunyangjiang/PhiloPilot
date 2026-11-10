# PhiloPilot — V21 integration report (IN8 + IA1 + IA2)

*Prepared 2026-11-09. One cycle: research, manuscripts, verification, practice, components, integration, validation. **Nothing has been committed, pushed, merged or deployed.** Cases development was suspended: CASE 02《分洪》 and the Cases site are unchanged. IA3 was not started.*

## 1. Per course

| | IN8 近代与殖民时期的印度哲学 | IA1 翻译运动、凯拉姆与哲学的兴起 | IA2 法拉比与阿维森纳：存在与灵魂的系统哲学 |
|---|---|---|---|
| Tier | ○ 拓展 | ● 核心 | ● 核心 |
| Region / position | 印度哲学, 8 of 8 | 伊斯兰、阿拉伯与犹太, 1 of 6 | 伊斯兰、阿拉伯与犹太, 2 of 6 |
| Official sections | 7 (unchanged) | 6 (unchanged) | 6 (unchanged) |
| Reader parts (site) | 10 = 7 + 导读, 结语, Critiques · 正文约 2.5 万字 | 9 = 6 + 3 · 约 1.7 万字 | 9 = 6 + 3 · 约 1.6 万字 |
| Manuscript | 37,292 chars, 68 notes | 25,919 chars, 53 notes | 25,014 chars, 40 notes |
| Primary blocks | 25 English, sentence-checked | 9 Qur'an, exact quran-simple substrings | 4 Arabic, Forget 1892 pp. 119, 120, 142 (×2), transcribed from page images |
| Practice | 7 sets / 21 questions | 6 / 18 | 6 / 18 |
| Components | `gandhi-ambedkar-workshop`, `reinterpretation-lab` | `occasionalism-lab`, `eternity-workshop` | `necessary-existent`, `flying-man` |
| Production report | `IN8_PRODUCTION_REPORT.md` | `IA1_PRODUCTION_REPORT.md` | `IA2_PRODUCTION_REPORT.md` |
| Image sheet | `V21_IN8_IMAGE_APPROVAL_SHEET.md` (5 candidates) | `V21_IA1_IMAGE_APPROVAL_SHEET.md` (3) | `V21_IA2_IMAGE_APPROVAL_SHEET.md` (2) |

Total practice: **57 questions** in 19 sets, three per set (`MAX_QUESTIONS = 3`, checked in the browser for every set). Formats: single 30, multi 8, true/false 9, view 10. Single-answer keys are spread over A–D in each course; view questions are ungraded.

## 2. Files

**New (content/):** `IN8_SAMPLE_DRAFT.md`, `IA1_SAMPLE_DRAFT.md`, `IA2_SAMPLE_DRAFT.md`, the three production reports, the three image sheets, this report. All CRLF.

**New (prototype/navigation-v2/src/):**
- `content/in8.ts`, `ia1.ts`, `ia2.ts` (course modules, same pattern as `in7.ts`)
- `content/practice-in8.ts`, `practice-ia1.ts`, `practice-ia2.ts`
- `ui/media/in8/DebateWorkshop.tsx`, `ReinterpretationLab.tsx`
- `ui/media/ia1/shared.tsx` (re-exports the IN4 pieces; adds `OrigSrc` for English/Arabic passages and `Step`), `v21.css`, `OccasionalismLab.tsx`, `EternityWorkshop.tsx`
- `ui/media/ia2/NecessaryExistent.tsx`, `FlyingMan.tsx`

**Modified:**
- `content/courses.ts`: imports; `Tradition` gains `'ia'` (伊斯兰、阿拉伯与犹太); entries IN8, IA1, IA2 (`origLang` en / ar, `srcNote`, `sourceNote`). Link lists: IN1–IN5 gain `IN8` in `recommendFrom` (IN6 and IN7 already had it; the curriculum says IN8 follows any of IN1–IN7); GR3 gains `IA1`.
- `content/media.ts`: six `MediaId`s and six anchors.
- `content/practiceSets.ts`: IN8, IA1, IA2 registered.
- `data/catalog.ts`: catalogue entries IN8, IA1, IA2 (makes them openable in region tables).
- `ui/Region.tsx`: new section 伊斯兰、阿拉伯与犹太哲学 · 6 门课 (IA1–IA5, JW1); `?t=ia` breadcrumb target; the note now says five traditions are expanded.
- `ui/media/Media.tsx`: six lazy imports.
- `ui/media/in4/shared.tsx`: `useSavedIx` accepts IN8, IA1, IA2.
- `styles/base.css`: Arabic rule for primary blocks (`:lang(ar)`: Arabic font stack, `unicode-bidi: plaintext`, `text-align: start`; the Chinese reference line under the Arabic is set small, left to right).
- `content/IA2_SAMPLE_DRAFT.md`: appendix wording ("four passages", not "three"; corrected after the count check), and the subheading 这个证明**不**依赖什么？ without bold markup, because the resume label and search show subheadings as plain text and displayed the asterisks.

`Reader.tsx` was not changed: per-paragraph direction comes from CSS, so no `dir` attribute was needed.

**Not touched:** `planning/`, CASE files (`content/case02*`, `ui/cases/*`), other completed courses' manuscripts and components, the homepage. No Git operation was performed.

## 3. Navigation, search, links

- **Region page** (`#/region/history`): the Indian table shows all eight IN courses openable; the new Islamic/Arabic/Jewish table shows IA1 and IA2 openable and IA3–IA5, JW1 as 原型未实现 (no lock, no link). The tradition list marks 04 伊斯兰、阿拉伯与犹太 as expanded. `?t=ia` scrolls to and focuses the new section (checked).
- **Course pages:** breadcrumb shows 伊斯兰、阿拉伯与犹太 · 第 1 门 / 第 2 门; background lines are worded as recommended background, not requirements.
- **Related links (读完以后):** IN8 → D6 (跨传统对话, not built); IA1 → IA2; IA2 → IA3 (not built) and EA1 (后续, not built); GR3 → IA1, IA2. IN1–IN7 → IN8.
- **Search (Ctrl K):** finds the courses by title (凯拉姆, 近代与殖民) and sections and subheadings by content (飞人, 安贝德卡尔). Searching by course code returns nothing, as for all existing courses.

## 4. Storage

Per-course keys only: `philopilot.v2.in8.*`, `philopilot.v2.ia1.*`, `philopilot.v2.ia2.*` (progress, position, exercises, `media.<id>`). Checked in the browser: the flying-man state saved under `philopilot.v2.ia2.media.flying-man`. Progress and resume use the shared `reading.ts` logic over `PUBLISHED_CODES`. Checked with real wheel scrolling in IA2 §4: position and progress were saved, and the homepage showed 继续阅读 · 法拉比与阿维森纳 · 必然存在者的证明 with the current subheading. The test state was removed afterwards.

## 5. Mobile and accessibility

- At 375 px: `scrollWidth = 375` on every section with a component; no element inside a component or primary block extends past the viewport (scripted check, IN8 §4 §7, IA1 §3 §4, IA2 §4 §5).
- Arabic renders right to left with right alignment; the Chinese reference line under it stays left to right (screenshot checked).
- Components use native radio buttons, checkboxes and buttons (keyboard and screen-reader operable), feedback in words (对 / 不是这一个) never colour alone, `aria-live` on feedback, 44 px check rows, no animation (nothing for reduced motion to disable).
- Back to Top and the reader chrome are shared code and unchanged.

## 6. Validation

- `npm run typecheck`: pass. `npm run build`: pass (existing chunk-size warning only).
- Browser (dev server, localhost:5179): all 28 reader parts of the three courses (19 official sections plus 导读, 结语 and Critiques in each) render; all six components appear at their anchors; no `[media] anchor … not found` warning and no console errors after a full reload.
- **Regression:** all sections of the 20 earlier courses (CN1–CN8, EA4, IN1–IN7, GR1–GR4) render. A fast sweep flagged ten sections; each was re-opened with a longer wait and renders normally (the flags were timing, not faults). **CASE 02:** every reader part renders (chapters 一 to 十三 and appendices 一 to 五), and the practice appendix shows its 9 questions.

## 7. Remaining blockers and open items

- **No blockers to reading or practice.** The three courses are usable end to end in the prototype.
- **Scholarly open items** are listed in each production report §9 (IN8: 9 items; IA1: 9; IA2: 8). None affects a quoted passage; all are in paraphrased or historical material.
- **No specialist review** (not in V21 scope).
- **Attributions:** every English and Arabic passage carries its source in the reader (`srcNote`) and in notes; Tanzil's terms (CC BY 3.0, verbatim, credit and link) were read in the final review and are stated in the IA1 appendix.
- **Images (addendum, 2026-11-09):** after this report the Product Owner approved all ten candidates. They were downloaded, inspected and embedded as captioned figures (`ui/media/ia1/Fig.tsx`; `in8/`, `ia1/`, `ia2/Figures.tsx`; records in `public/media/in8|ia1|ia2/SOURCES.md`; entries in `ui/media/assets.ts`; ten anchors in `content/media.ts`). Three records were thin and the pages were identified from the images themselves: the Wellcome page is the opening of Avicenna's treatise on cardiac drugs (medical); the Trinity page is a 17th-century Latin copy of *De radiis*; the Ḥunayn eye diagram has only a social-media source, so its holding institution and date remain unverified. Captions state these limits.
- **Rights:** Iqbal's *Reconstruction* (1934 Oxford edition): public domain in India and Pakistan; no public-domain claim elsewhere; three brief attributed quotations for commentary, with paraphrase as the fallback. All other quoted texts are public domain as stated in the appendices.

## 8. Final targeted review (2026-11-09)

Summary; details in §12 of each production report.

- **Counts:** official sections 7 / 6 / 6, unchanged. Reader parts 10 / 9 / 9 add 导读, 结语 and Critiques & Responses.
- **IA1:** one subsection added (the Ashʿarite account of good and evil), with one new note. **IA2:** no change to the text.
- **IN8:** Poona Pact account corrected against Ambedkar's 1945 book and the documents it reprints; the Gandhi–Ambedkar table row, the debate component's 1932 row and basis labels, and one practice explanation corrected to match.
- **Rights:** Tanzil terms read and stated; Iqbal reuse basis stated.
- **Images:** 10 embedded → 6. Kept: Roy, Vivekananda, Ramabai, Tagore's school (IN8); Dioscorides 1224 (IA1); Forget p. 142 (IA2). Removed: Ḥunayn eye diagram (provenance), *De radiis* (relevance), Avicenna cardiac drugs (relevance), Ambedkar 1950 (provenance). Removed files deleted; records kept under "Removed" in each `SOURCES.md`.

# Phase C1B — Integration report: CASE 02《分洪》

Date: 2026-11-09. Nothing is committed, pushed or deployed. Cloudflare Pages settings were not touched. No images were downloaded or generated. CASE 03 was not started and no other case manuscript was created. The manuscript and production report in `content/cases/` were read only. planning/, DataPilot, ArtPilot and MatScope were not modified.

**CASE 02 changes vs. the accepted V20 changes.** The working tree also holds the V20 changes (IN6 + IN7 integration, the IN7 diagram correction, and the IN1/IN5/courses/media/practiceSets/catalog/Media/in4-shared edits). This phase did not touch any of those files. The CASE 02 changes are listed below; nothing else in the working tree belongs to this phase.

| File | Status | Change |
|---|---|---|
| `src/router.ts` | modified | 3 routes: `#/cases`, `#/cases/02`, `#/cases/02/read/<part>?b=<block>` |
| `src/App.tsx` | modified | Pages and titles for the 3 routes; the case reader is keyed by case, so chapter changes do not remount it |
| `src/ui/Chrome.tsx` | modified | One 「哲学案例」 section tab in the top bar, just left of search; imports `cases.css` |
| `src/ui/Practice.tsx` | modified | The 「本章原题与提示」 toggle is shown only when the set has an original exercise (`promptHtml` not empty). Courses always pass one, so they are unchanged |
| `src/content/cases.ts` | new | Registry of the eight sealed cases |
| `src/content/case02.ts` | new | Reads the manuscript (`?raw`) and splits it into 13 chapters and 5 appendices |
| `src/content/practice-case02.ts` | new | The manuscript's ```ts block, copied byte for byte |
| `src/ui/cases/` | new | `CasesPage`, `CaseFront`, `CaseReader`, `CaseCrumbs`, `caseState` |
| `src/styles/cases.css` | new | Minimal case styles. Everything else reuses the course pages' classes and tokens |

**Brand mark (requested during review, not part of the case itself).** The red-square PhiloPilot mark was ArtPilot's, so it is replaced by 四格: the home page's four entrance shapes in a 2×2 grid. It is drawn as an inline SVG in `src/ui/Chrome.tsx`, using the region colours (`--c-history`, `--c-questions`, `--c-dialogue`, `--c-methods`), and sized by `.brand-mark` in `src/styles/base.css` (22 × 22px).

All paths are under `prototype/navigation-v2/`. No new dependencies were added (markdown-it was already in use).

## 1. Cases overview and navigation

- **Entry point.** A 「哲学案例」 section tab sits in the global top bar on every page (home, course pages, readers and the cases pages), left of search: the name in bold over a 4px rule in the home page's four entrance colours (yellow, red, blue, black; the same family as the 四格 PhiloPilot mark). On hover the name turns red; while you are in Cases (`aria-current`) the rule is thicker. At ≤420px the brand's 「哲学课程」 sub-label is hidden so brand, 哲学案例 and 搜索 fit on one line at 375px. The homepage itself was not redesigned.
- **Overview (`#/cases`).** It has a level bar (首页 › 哲学案例) and a heading, and it says that cases are separate from the 72 courses, are not counted in the course count and do not affect course progress.
  - It shows eight cards in a two-column Swiss grid (one column at ≤900px).
  - Each card shows the number, title, a one-sentence premise, the subjects and a status. CASE 02 also shows its genre, taken from the manuscript.
  - The premises and subjects of 01 and 03–08 are limited to the sealed lineup directions. They show no genre, no characters and no plot.
- **Only CASE 02 opens.** Its card is a link whose status reads 可以阅读, or 继续阅读 · 已读 N% once reading has started.
  - The other seven are plain text with the status 尚未写作. They have no link, no button and no hover state.
  - A sentence above the list says that only 02 can be read and that the other seven are not written yet.
  - `#/cases/03` and every other unwritten or unknown number show the overview, so no URL leads to a missing page.
- **CASE 02 front page (`#/cases/02`).** It has the case number and genre, the title, and the fiction disclosure and content note quoted verbatim from the manuscript's opening note. It also has a start / continue / reread card, the length (13 章 · 正文约 2.2 万字), and a table of contents with per-chapter progress bars.
  - The appendix links carry a spoiler note (「会提到小说的结局，建议读完再看」).
  - 「与课程的联系」 has three real, published courses, each with the place in the case that connects to it:
    - CN1 孔子、孟子与荀子: 第七章 and 附录一 §5.
    - CN2 墨家、名家与后期墨经: 附录一 §5.
    - EA4 康德: 附录一 §3.
  - A note says that cases are not part of the curriculum.
- **Ways back.**
  - The reader's level bar runs 首页 › 哲学案例 › 分洪 › chapter.
  - The rail has 「← 案例首页」 and 「← 哲学案例总览」.
  - Esc goes up one level: reader → front page → overview → home.
  - After the last appendix, 「返回哲学案例总览」 takes you back to the overview.

## 2. Full-content integration

- **Chapters.** All 13 chapters are shown in manuscript order: 雨窗, 会商, 柳林, 下泄, 预命令, 转移, 账, 闸前, 凌晨, 开闸, 回看, 复盘, 闸后.
  - Each chapter is one reader page. The heading is the manuscript's (「一　雨窗」).
- **Verbatim check.** In the running app, every chapter's rendered text was compared with the manuscript's text, minus blank lines and the single `---` before the appendices. All 13 chapters are identical: 32 / 38 / 50 / 45 / 28 / 36 / 41 / 24 / 33 / 16 / 23 / 25 / 38 blocks.
  - The DOM text of 第一章 also matches.
  - The three places where the manuscript uses consecutive lines (the template lines in 第一章) keep their line breaks (`breaks: true`).
- **Appendices.** All five follow the novel, in order: 附录一 哲学分析 (7 sections), 附录二 决策点, 附录三 练习, 附录四 虚构与证据说明 (3 sections), 附录五 来源 (3 groups, 15 numbered sources).
- **Left out of the page.** These are production notes, not reading text:
  - The draft-status sentence in the opening note (「状态：Phase C1A 完整稿（DRAFT）…」).
  - 附录三's intro note, which says the exercises 「尚未接入网站」.
  - The raw ```ts block. Its data is shown as interactive practice instead (§6).
  - 附录三 has one short line of site text in their place: 「三组练习，分别对应附录二的三个决策点。有的题没有唯一正确答案，只列出每种立场的长处和代价。」
- **No raw code.** There is no `pre` or `code.language-ts` element anywhere in the case pages.

## 3. Reader UX and responsive behaviour

- **Shared layout.** The case reader uses the course reader's layout and classes: a rail with 13 chapters plus a separate appendix group (「附录 · 不计入进度」), sub-headings for the current appendix, previous/next at the foot of each page, a progress line, and the compact reader bar with a 目录 drawer at ≤900px.
- **Not shared.** It has its own component (`CaseReader.tsx`), so course breadcrumbs, the footnote panel and teaching components are not involved.
- **Column and type.** The reading column is the course column (max 680px). The novel uses 18px / line-height 2 (17px / 1.95 at ≤600px) for a calm literary page. Appendices use the normal article size.
- **Previous/next labels.** 上一章 / 下一章 inside the novel; 「正文已完 · 附录 →」 at the end of 第十三章; 上一个附录 / 下一个附录 in the appendices.
- **Mobile, 375 × 812.** No horizontal overflow on home, the overview, the front page, chapters, 哲学分析, 决策点, 练习 or 来源 (the document width equals the viewport on each).
  - In the top bar, brand, 「哲学案例」 and 搜索 fit without overlap.
  - On narrow screens the fiction disclosure and content note stay above the start button. The course CSS moves that button up, so a case-only order rule was needed.
  - The drawer opens with focus on 关闭. Esc closes it and returns focus to 目录.
- **Keyboard.** Every control is a native `button`, `a` or `details/summary`. Focus is shown by the site's existing `:focus-visible` rule.
- **Reduced motion.** The only new animation is the arrow on the CASE 02 card. It has no transition under `prefers-reduced-motion` or `[data-motion='none']` (computed `0s`). Rail sub-heading scrolling uses `auto` when motion is reduced, as in the course reader.

## 4. Progress and resume

- **Keys.** `philopilot.v2.case02.position` and `philopilot.v2.case02.progress`, written by the existing store functions with the code `CASE02`.
- **Counting.** Only chapters count towards the percentage, weighted by characters. Appendices never count. As for courses, a part counts as started at 5 % and read at 97 %.
- **No unreliable saves.** The first render and every programmatic jump save nothing: opening a chapter, resume, back/forward. Saving starts only after your own input in the reader (wheel, pointer, touch or key).
  - Verified: opening 第三章 saved nothing.
  - After a wheel and a scroll, the position was saved as 第三章 block 31, with 67 % progress for that chapter.
  - Opening 第四章 afterwards left the saved position unchanged.
- **Resume.** The front page showed 「已读 8% · 继续阅读 → · 回到：三　柳林」.
  - Pressing it opened `#/cases/02/read/2?b=31` with block 31 placed 120px below the top of the reading area and highlighted, as in the course reader.
  - With no saved place, resume opens the first unfinished chapter.
- **Back to Top.** It stores the beginning as the bookmark, as the courses do. After reading down to block 46, pressing 回到顶部 scrolled to 0, moved focus to `#main`, and saved block 0 of the same chapter.
- No cloud sync.

## 5. Decision points

- **Placement.** 附录二 renders the manuscript's intro note and then the three decision points. Each decision point is split into its five labelled parts, in the manuscript's order: 当时可知的信息, 现实的选项, 相互竞争的理由, 当时还没有的信息, 哲学解读.
- **Restrained interactivity.** Each part is a native `details` element. Only 「当时可知的信息」 is open at first, so you can weigh the situation before opening the options, the reasons, and what was known only later.
  - 「当时还没有的信息」 is marked 「（事后才知道）」 and has a dashed number.
  - There is no simulation, scoring or branching.
- **Text.** The label moves into the disclosure's summary; the paragraph keeps the rest of its text unchanged. The numbered list of options in 决策点一 stays under 现实的选项.
- **Spoilers.** The decision points come after the novel, as does everything else that reveals later events. The front page warns that the appendices mention the ending.

## 6. Practice

- **Data.** `practice-case02.ts` is the manuscript's ```ts block copied byte for byte: 3 sets labelled 一, 二, 三 and 9 questions (c02-1-1 … c02-3-3).
  - Types: 3 single, 1 multi, 2 tf and 3 view. The keys and feedback are unchanged.
  - The questions were not edited.
- **Rendering.** Each set uses the existing V7 `Practice` component: tag 「想一想 · 一」, lede, the questions, retry 「再试一次」, 「直接看答案」, and the view questions' per-position notes.
  - There are no typed answers.
  - The sets have no original exercise, so the 原题 toggle is hidden (the one-line change in `Practice.tsx`).
  - Verified in the browser: 3 sets and 9 questions render. Choosing B in c02-1-1 gave 「还不对」, the note for B, and 再试一次 / 直接看答案. A view-question choice was stored.
- **Storage.** Answers are stored under `philopilot.v2.case02.practice.<set>` (for example `…case02.practice.一`). That is separate from every course's `…<code>.practice.*` and from the case's own reading keys.
  - Answering wrote no position or progress.
  - Progress is saved only by scrolling.

## 7. State isolation

- **CASE 02 keys.** CASE 02 writes only `philopilot.v2.case02.*`.
- **Course storage.** A snapshot of all non-case localStorage keys and values was identical before and after a full CASE 02 session of reading, resume, Back to Top and answering.
- **Home page.** Its 「继续阅读」 card considers published courses only, so reading the case does not change it (verified).
- **Other cases.** No other case has keys; each future case would get its own `philopilot.v2.caseNN.*` through `caseCode()`.
- **Clean-up.** The test keys created during validation were removed afterwards.

## 8. Source and fiction disclosure

- **Front page.**
  - The fiction disclosure is quoted verbatim from the manuscript: 「小说中的地名、机构、人物和洪水都是虚构的；现实中的法律、制度和科学概念，见附录四和附录五。」
  - The content note 「小说中有一名人物在洪水中遇难。」 is shown above the start button, labelled 阅读提示.
- **Appendices.** 附录四 (虚构的部分 / 有依据的部分 / 简化与假设) and 附录五 (法律、法规与制度 / 水文与预报 / 哲学原典与研究) are rendered in full.
  - The 15 sources are numbered as in the manuscript.
  - All links open in a new tab with `rel="noopener noreferrer"`.
  - Long URLs wrap at 375px.
- **No additions.** No philosophical claim, source or image was added. The only site-written text is navigation and status text, the practice line in §2, and the course-connection notes, which point to places in the manuscript.

## 9. Technical validation

- **Typecheck.** `npm run typecheck` passes.
- **Build.** `npm run build` passes. The main chunk is now about 4.1 MB, with the same chunk-size warning as before this phase. The case adds the manuscript (about 100 KB raw) to the bundle; code-splitting was left for a later phase.
- **Console.** No console errors or warnings while going through the overview, the front page, all reader parts, the practice, and the 20-course regression. The `case02.ts` self-checks (13 chapters, 5 appendices, opening-note lines) did not report.
- **Not verified with a real screen reader or a real touch device.** Narrow screens were checked with viewport emulation. Scroll and progress were checked with synthetic wheel and scroll events, because the hidden browser pane pauses `requestAnimationFrame`.

## 10. Focused course regression

- **Courses.** All 20 published courses: each front page and part 2 render. The top bar shows the Cases link everywhere.
- **IN6 / IN7 (V20).** The three IN6 components and the two IN7 components still mount at their anchors, with no missing-anchor warnings. IN6/IN7 content was not changed in this phase.
- **Course practice.** IN6's six practice sets still show the 「本章原题与提示」 toggle, so the `Practice.tsx` change does not affect courses.
- **Course storage.** Unchanged after the regression pass.

## 11. Remaining release blockers

1. **Product-owner acceptance of the manuscript.** The manuscript's own status line still reads 「Phase C1A 完整稿（DRAFT），尚待产品负责人审读」, and the Workstream B revision is awaiting acceptance. The site does not show the status line.
2. **Acceptance of this integration**, together with V20 (IN6 + IN7). The plan is to commit and push them together after acceptance. Nothing is committed yet.
3. **The 附录三 intro note.** If the manuscript should match the site, the PO may want to update the sentence 「本练习只为课程制作准备数据，尚未接入网站」. The site already leaves it out.
4. **The premises of the seven unwritten cases.** They are paraphrased from the sealed lineup. The PO may wish to approve the exact wording before release.
5. **Optional, not blocking.** Code-split the case content (and the courses) to reduce the main chunk; check with a real screen reader and a real phone.

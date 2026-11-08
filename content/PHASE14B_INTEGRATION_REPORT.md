# PhiloPilot V17 — Phase 14B integration report (中国哲学与现代 + 体系、马克思主义与当代中国哲学)

Prepared 2026-11-08. **Nothing committed, pushed or deployed.** Both courses are integrated and ready for Product Owner acceptance. No images were downloaded or embedded.

## 1. CN7 中国哲学与现代：从晚清到新文化运动 (● 核心)

- **Manuscript.** Six parts plus 导读 and 批评与回应 kept in full. All 96 quoted passages re-verified against the cached Wikisource texts (96/96). Only the status line changed ("课程稿（已接入网站，待产品负责人验收）").
- **Title.** Synchronised in `catalog.ts` (canonical), `units.ts`, the course registry, the CN6 manuscript's two forward references and search. English subtitle as specified.
- **Course page.** The guide has no bolded core question; the parser took the thread label "论证的". Fixed in `cn7.ts` only: the core question is now the guide's own title, "一个文明怎样重新理解自己的思想？".
- **Components (Part 二 and Part 五).**
  - *翻译实验室* (after 「三种新名词」). Seven concepts: 天演, 物竞天择, 自繇, 群, 公德, 经济, 内籀. Each card gives the original concept (or says there is none: 公德), the historical translation and translator, later usage, the translator's own explanation (checked passage + the chapter's 白话), the change in meaning and the limit of the comparison. The question is either ungraded ("which word would you choose?", each option showing what it brings in) or a question the chapter answers, with explanatory feedback. A check against the chapter's three-kind table follows.
  - *论战工作坊* (after the three levels of the debate). Five participants (张, 丁, 梁, 胡, 陈) with claim, premises, evidence, objections, replies and limits. Every line carries a basis tag. Unread replies are named but not summarised. Then four boundary cases (婚姻, 爱, 财产, 统一人生观): the learner decides, then sees each participant's line, with inferences labelled "本课的重构". Then a sort into the chapter's three levels. No vote, no "science vs superstition".
- **Practice.** 6 sets, 18 questions (8 single, 3 multi, 4 true/false, 3 ungraded view). Items 1-3 and 6-2 rewritten as true statements; true/false is now 2 true, 2 false. Displayed single answers A2 B2 C2 D2. Multi keys: AB, ABC, ACD.

## 2. CN8 体系、马克思主义与当代中国哲学 (○ 拓展)

- **Manuscript.** Six parts kept; targeted source strengthening only (30 replacements, no chapter rewritten). 16/16 quoted passages verified.
  - 冯友兰: one 转引 sentence from 《三松堂全集》 vol. 4 via 段德智 (2014); "不著实际" is marked as a common summary.
  - 金岳霖: two 转引 passages from 《论道》 via 陈霞 (2025), plus one inline sentence.
  - 熊十力: catalogue records for the 1942 and 1947 editions and Makeham's 2015 translation, each marked as not read.
  - 唐君毅 and the 1958 宣言: Fröhlich (2017, open access), pp. 27 n. 6, 38, 57 n. 35, 112 n. 24.
  - 牟宗三: the IEP entry (Clower).
  - The four kinds of support (direct evidence, scholarly interpretation, historical reconstruction, the course's own reconstruction) are now set out in the 导读. No work is claimed as read that was not. Quotations from copyrighted works are one or two sentences, for commentary.
- **Components (Part 四 and Part 三).**
  - *实践与矛盾探究* (after 「论证、应用与政治」). An SVG knowing cycle stepped through the chapter's four-step reconstruction, with the 梨子 example and a second example labelled as the course's own. Then "who judges the result of practice?" (controlled experiment vs political campaign). Then three theses of 矛盾论, each with passage, argument, example, philosophical question and later use. Then an eight-card board (哲学论证 / 实际应用 / 政治功能), two cards straddling layers. Then one claim in 1937, the 1960s (with the 1971 passage) and 1978.
  - *新儒家比较* (after 「分歧的地图」). Grid of 熊, 唐, 牟 (徐复观 as an optional column) across seven questions. Every cell is tagged SEP, IEP, 弗勒利希, common summary or the course's own summary, and an option dims the last two. Then eight statements (3 true, 5 false) with feedback. No quotation from the three philosophers' own works.
- **Practice.** 6 sets, 18 questions (7 single, 3 multi, 4 true/false, 4 view). The three A+B+C multi-selects were reordered with stable option IDs; displayed keys are now BCD, ACD, ABD. Singles A2 B2 C2 D1.

## 3. Shared work (minimal)

| File | Change |
|---|---|
| `course.ts` | Opt-in `authorCites` so author-first citations （严复《…》） become source blocks. Other courses unaffected. |
| `courses.ts` | CN7, CN8 entries. Optional `srcNote` so the label under each quotation is correct for these courses (Wikisource transcription / marxists.org 选集本 / 转引). Every other course keeps its old label. |
| `Reader.tsx` | Uses `srcNote` when present (one line). |
| `media.ts`, `Media.tsx` | Four component IDs and anchors. |
| `practiceSets.ts`, `catalog.ts`, `units.ts` | Registration, short names, full names. |
| `ui/media/cn7/shared.tsx`, `cn7.css` | Small shared pieces for the four components: quote block, basis tag, saved state; reuses existing `Seg`, `Limits` and md/c2/c3/c5 classes. |

- **Links.** CN6→CN7, CN7→CN8/D1/D6 and CN8→D1/D6 are in place; no new links. Unreleased courses stay unavailable.
- **Not touched.** CN1–CN6 code, the reader and CMS structure, the homepage, `planning/`. No new dependencies and no concept map.

## 4. Images

Two approval sheets, nothing downloaded:
- `PHASE14B_CN7_IMAGE_APPROVAL_SHEET.md`: six recommended items, publications first (1915 《青年杂志》 cover; 1923 《科学与人生观》 and 1919 《中国哲学史大纲》 title pages from CADAL scans; a 《天演论》 photo, CC BY-SA; the 1906 《訄书》 frontispiece; 1901 《东华新报》 梁启超). Three optional photographs follow, and four files are rejected with reasons.
- `PHASE14B_CN8_IMAGE_APPROVAL_SHEET.md`: two recommended (冯友兰 in *Who's Who in China* 1925; 金岳霖 at Columbia), three conditional on a rights check (唐, 熊, 牟), five rejected. No usable scan of 新唯识论, 论道, the 1958 民主评论 or 实践论 was found; Part 四 should stay without an image.

## 5. Validation

| Check | Result |
|---|---|
| `npm run typecheck`, `npm run build` | Pass (the existing >1600 kB chunk warning only) |
| Quotations | CN7 96/96, CN8 16/16; all 48 passages and 白话 used in the components match the manuscripts verbatim |
| Markdown scan (notes, tables, emphasis) | 0 issues |
| Component anchors (dev-mode check, all 14 courses) | All 70 resolve; no warnings |
| Four components in the production build | Render, interact, give feedback, save and reset |
| Practice | 18 + 18 questions, ≤3 per set; position distribution as above; feedback and retry work; answers stored under `…practice.<set>` only, reading progress untouched |
| Search | Both courses and their sections found by title, person and topic |
| Titles, breadcrumbs, course pages | Correct for both; all 14 course pages render with their titles |
| Progress and resume | Per course; "继续阅读" on the course page and home page returns to the saved section |
| Source labels | Correct per citation type in both courses |
| Mobile (375 px) | Comparison table scrolls horizontally; card grids stack |
| Keyboard | Native radios, checkboxes and buttons; arrow keys move between options; focus outline visible |
| Reduced motion | `data-motion="none"` removes the only transition (cycle nodes) |

**Not verified.** Scroll-driven progress could not be exercised in the hidden browser pane (animation frames are paused there). The code is the shared reader path used by all courses, unchanged. Resume was verified by writing a position through the app's own store.

## 6. Defects found and fixed during validation

1. The CN7 core question showed "论证的" (described in §1).
2. Every quotation in both courses was labelled "字形保留繁体", which is wrong for marxists.org texts, simplified-character transcriptions and 转引 quotes. Fixed with `srcNote`.
3. In the Translation Lab, "对。/不对。" was repeated after the verdict label. In the Debate Workshop, 丁文江's "存疑的唯心论" was tagged as checked original text; it is now tagged as 胡适's account.

## 7. Open items for the Product Owner

- Image decisions on the two sheets.
- `CN7_PRODUCTION_REPORT.md` and `CN8_PRODUCTION_REPORT.md` (Phase 14A) still describe the state before 14B (title discrepancy, practice patterns); this report supersedes them on those points.
- CN8 true/false is 3 false and 1 true; the brief asked only for the CN7 change, so it was left as is.
- The dev server already running on port 5179 (not started in this phase) was serving stale modules; restart it to see V17 there.

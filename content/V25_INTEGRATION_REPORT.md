# V25 integration report — EA7, EA8, EA9

*Prepared 2026-11-10. Baseline: commit `a987f3d` (V24). All three courses were researched, written, given practice and components, registered and validated in one cycle, as the brief asked. **Nothing has been committed, pushed, merged or deployed.** No external specialist has reviewed any of the three manuscripts.*

Deliverables:

- `content/EA7_SAMPLE_DRAFT.md`, `content/EA8_SAMPLE_DRAFT.md`, `content/EA9_SAMPLE_DRAFT.md`
- `content/EA7_PRODUCTION_REPORT.md`, `content/EA8_PRODUCTION_REPORT.md`, `content/EA9_PRODUCTION_REPORT.md`
- `content/V25_EA7_IMAGE_APPROVAL_SHEET.md`
- this report

## 1. Registration and tiers

| Course | Tier | Tradition / position | Recommended background (shown) | 读完以后 (shown) |
|---|---|---|---|---|
| EA7 自由主义、功利主义与实用主义 | ○ 拓展 | 欧洲与北大西洋哲学 · 第 7 门 | EA3 (not required) | EA11 (下一门); S7, S9 (哲学问题) |
| EA8 逻辑、语言与分析哲学的兴起 | ● 核心 | 第 8 门 | none; A2 helpful | EA10 (下一门); S6 |
| EA9 现象学、存在主义与诠释学 | ● 核心 | 第 9 门 | EA6 (not required) | EA12 (下一门); S5, D6 |

Tiers, sections, method focus and links follow `planning/CURRICULUM_REFERENCE_DRAFT.md`. The "下一门" entries come from `recommendFrom` (courses that list this one as background: EA11 lists EA3 and EA7; EA10 lists EA8; EA12 lists EA6 and EA9).

**Forward links into the new courses.** The course page renders `recommendFrom` and `leadsTo` of the course being shown. EA3's entry already had `recommendFrom: ['EA4','EA7','EA11','LA1']`, and EA6's had `['EA9','EA12']`, so both links became live as soon as EA7 and EA9 were registered. Verified in the browser: EA3 now shows 《自由主义、功利主义与实用主义》 as an open link, EA6 shows 《现象学、存在主义与诠释学》. In the final corrections (§11) EA3's `leadsTo` metadata was made consistent (`['EA4', 'EA7']`), and JW1's mention of EA9 became a link; EA6 was not modified.

## 2. Content summary

| | EA7 | EA8 | EA9 |
|---|---|---|---|
| Main sections | 6 | 7 | 7 |
| Reader parts (导读 + sections + 结语 + 后世批判与回应) | 9 | 10 | 10 |
| CJK characters before 注释 | 20,656 | 19,746 | 18,672 |
| Notes (defined = referenced) | 80 | 92 | 93 |
| Cited primary blocks | 31 | 20 | 7 |
| Tables | 10 | 10 | 8 |
| 想一想 | 6 | 7 | 7 |
| Labels of the chapter's own reconstruction / arrangement | 23 | 23 | 25 |
| Line endings | CRLF | CRLF | CRLF |

How each brief requirement is met is set out per course in the production reports (§1 of each). In short:

- **EA7:** act vs rule (table); qualitative pleasures (reconstruction of the cost); harm principle (table, caveats, three difficulties); Peirce's maxim kept apart from "whatever works" (two tables, 1878 vs 1905); Dewey on inquiry, democracy and education; Addams read as a philosopher; Taylor Mill and Du Bois read for their own arguments, with the co-authorship question left open; EA3 connections in 导读, 一 and 二.
- **EA8:** notation introduced symbol by symbol; the *Tractatus* is explicitly "not verificationism" (4.024 vs the 1929–30 conversations); logical empiricists kept apart (versions table, Neurath, Carnap's tolerance); Ayer's criterion and its failure in five steps, Church, the self-undercutting objection and Carnap's reply; Kripke and a table of responses, private language with SEP's caveats, two readings of 6.54; Ryle, Austin (misfire/abuse), Grice as the limit.
- **EA9:** the reduction as method, not psychology (Husserl's own retraction); Dasein vs psychology (table); Heidegger's politics in one bounded subsection with SEP's judgment; bad faith with a four-scene table and the waiter; Beauvoir from *Pyrrhus et Cinéas* to *La Vieillesse*; the lived body (table, phantom limb, Schneider); Gadamer with a 《论语》 example and two kinds of objection; Arendt's labor/work/action and plurality; Fanon as a one-paragraph cross-reference to AF3 and D6; EA6 continuity in 导读, 二 and 七.

**Rights approach.** Only public-domain texts are quoted (Bentham to Du Bois; Frege; Russell briefly; the German *Tractatus*; Husserl). Russell (protected until 2040 in life+70 jurisdictions), Du Bois (until 2033) and Moore (until 2028) are quoted only in a few short sentences, for commentary. Every protected twentieth-century author is paraphrased via SEP and never quoted. Each appendix gives editions, archive.org identifiers, pages, and what was not checked in the original.

## 3. Practice

| Course | Sets | Questions | single | multi | tf | view | single keys | tf keys |
|---|---|---|---|---|---|---|---|---|
| EA7 | 6 | 18 | 6 | 5 | 5 | 2 | c a b a d b | F T F F T |
| EA8 | 7 | 21 | 7 | 5 | 6 | 3 | b d a c a c b | F T F T F T |
| EA9 | 7 | 21 | 7 | 5 | 6 | 3 | c b d a d b c | F T F T F F |
| **Total** | **20** | **60** | 20 | 15 | 17 | 8 | | |

- Each set follows one 想一想; its lede restates the original question ("原题问你：…").
- Every option has its own note; true/false items explain the answer either way; view items have no key and give each position's strength and cost.
- Feedback was checked against the drafts (EA7: three wording fixes; EA8: one option note narrowed to what the draft says; EA9: written from a full reading of the draft).
- Practice state is stored per set under `philopilot.v2.<code>.practice.<label>`, separate from reading progress and position (verified, §5).
- Literal `**` markers were removed from six strings: the practice UI renders plain text, and no earlier course uses bold there.

## 4. Components

| Course | Component | Placement | What the reader does | Why it helps |
|---|---|---|---|---|
| EA7 | `ea7/HarmPrinciple.tsx` (`harm-principle`) | 二, after the table of reasons | Names the kind of reason behind six constructed restrictions; sees the harm principle's verdict; a closing panel contrasts an act-utilitarian criterion | The method focus is "applying competing criteria to cases"; the table alone states the criteria but does not make the reader apply them |
| EA8 | `ea8/RussellScope.tsx` (`russell-scope`) | 三, after the scope table | Picks one of four small worlds and predicts the truth of the sentence and both negations; then sees which of existence / uniqueness / predication holds | Scope is the step readers most often lose; varying the world shows why the two negations come apart |
| EA9 | `ea9/BadFaithSorter.tsx` (`bad-faith-sorter`) | 三, after the bad-faith table | Sorts eight sayings into "only facticity", "only transcendence", or "not bad faith" (Beauvoir) | Makes situated freedom an operation: the same person can err in both directions, and coercion is not bad faith |

Considered and not built: a Frege sense/reference component (the chapter's table and 想一想 already do the work) and a step-through of the cup exercise (it would only re-display a numbered list).

Shared conventions: the existing `md`/`v21`/`v22` classes, `Pick`, `Verdict`, `Claim`, `Limits` and `useSavedIx`; native buttons with `aria-pressed` (keyboard and touch); a "这个演示是什么，不是什么" limits box; a reset button; no animation (nothing for reduced motion to switch off). State keys: `philopilot.v2.ea7.media.harm-principle`, `philopilot.v2.ea8.media.russell-scope`, `philopilot.v2.ea9.media.bad-faith-sorter`. Components never write reading progress or position.

## 5. Validation (performed 2026-11-10)

**Build.** `npm run build` (`tsc --noEmit && vite build`) passes. Only the pre-existing chunk-size warning remains. The first build failed on one ASCII apostrophe in `practice-ea8.ts`; fixed and rebuilt.

**Browser** (preview `philopilot-nav-v2-build`, port 5189, production build; scripted checks through the page plus real key, scroll and tap input):

| Check | Result |
|---|---|
| All 20 main sections open (plus 导读, 结语, 后世批判与回应 for each course) | Pass |
| Note references per course | EA7: 101 reference buttons (80 notes, some cited twice); EA8 92; EA9 93 — matching the drafts |
| 60 questions: answer each and read the feedback | Pass: every question returned feedback (wrong, right, or the view summary) |
| Components render in the intended sections | Pass: EA7 二, EA8 三, EA9 三 |
| Components completed end to end | Pass: EA7 6/6, EA9 8/8, EA8 three worlds; final panels and explanations shown |
| Keyboard | Pass: Tab moves between buttons, Enter selects, a visible focus ring is shown |
| Touch | Pass: tap under 375 × 812 mobile emulation (touch points on) saved the choice |
| 375 px | Pass: no horizontal overflow in the page or the reader scroller; formulas wrap |
| Component state across reload | Pass: the EA8 component restored world and predictions after a full reload |
| Reading progress saved by real scrolling, and resume | Pass: EA9 五 saved; the course page offers "继续阅读 → 回到：梅洛-庞蒂论身体 · 一处交叉提示：法农" |
| Answering practice does not move the reading position | Pass: the position record was byte-identical before and after answering a question in the same section |
| Catalogue | Pass: 欧洲与北大西洋哲学 lists EA7 ○, EA8 ●, EA9 ● as openable; EA10–EA12 remain "原型未实现" |
| Search | Pass: "悬搁" → EA9 一; "摹状词" → EA8 三 (7 hits); "伤害原则" → EA7 二 and its critique |
| EA3 → EA7 and EA6 → EA9 links | Pass |
| Older courses | Pass: EA3, EA4, EA5, EA6, CN1, JW1, IN1, GR2 open with their components and practice |
| CASE 02 《分洪》 | Pass: the cases page and the case front page open; nothing changed |
| Runtime errors | None in the console |

localStorage was cleared after testing and the preview server was stopped.

**Not tested:** screen readers; real phones (only emulation); browsers other than the app's Chromium pane; reduced-motion emulation (the new components have no motion); every older course's every section (spot checks only).

## 6. Process disclosure

- Primary texts were checked against archive.org scans and, for Frege's 1892 article, page images on Wikimedia Commons, read in place; nothing was downloaded into the project. SEP entries were downloaded to the session scratchpad for reading only.
- Errors found and corrected during writing are listed in each production report (most notably Russell's third puzzle and his reasons for rejecting Frege in EA8).
- Statements resting on common accounts, not on a checked source, are marked as such in the text.

## 7. Integration changes

New files:

- `src/content/ea7.ts`, `ea8.ts`, `ea9.ts` (course modules, same pattern as `ea6.ts`)
- `src/content/practice-ea7.ts`, `practice-ea8.ts`, `practice-ea9.ts`
- `src/ui/media/ea7/HarmPrinciple.tsx`, `ea8/RussellScope.tsx`, `ea9/BadFaithSorter.tsx`

Changed files (additions only, apart from one widened type):

- `src/content/courses.ts` — imports and three `PUBLISHED` entries
- `src/content/practiceSets.ts` — three imports and three entries
- `src/data/catalog.ts` — three catalogue rows (EA7 extended, EA8 and EA9 core)
- `src/content/media.ts` — three ids and three anchors (each matches a table by two phrases)
- `src/ui/media/Media.tsx` — three lazy imports
- `src/ui/media/in4/shared.tsx` — `useSavedIx` accepts `'EA7' | 'EA8' | 'EA9'`
- `src/content/jw1.ts` — final correction (§11): the EA9 mention becomes a link
- `src/content/courses.ts`, EA3 entry — final correction (§11): `leadsTo` gains EA7 (metadata only)

Not touched: EA3's manuscript, practice and components; EA4, EA5, EA6 (texts, entries, practice, components); JW1's manuscript, practice and components; CASE 02; `planning/`; the other projects. No new dependency, no redesign, no test framework.

## 8. Image candidates

- **EA7:** `V25_EA7_IMAGE_APPROVAL_SHEET.md` — three printed-page candidates (the *On Liberty* dedication, the *Pragmatism* dedication to Mill, the page of Peirce's maxim). No downloads.
- **EA8:** none prepared. The subject is the analysis of logic and language; portraits would not help the arguments, and most twentieth-century photographs need item-by-item rights checks. Page images of Frege's or Russell's articles would only repeat the quoted text.
- **EA9:** none prepared. The photographs that would be relevant (Husserl, Heidegger, Sartre, Beauvoir, Merleau-Ponty, Gadamer, Arendt) are mostly still protected or of unclear status, and they would not help the description exercises. The only public-domain primary texts (Husserl 1901, 1913) are already quoted.

## 9. Unresolved issues for the Product Owner

1. **Specialist review** of all three manuscripts has not taken place.
2. **EA7 image sheet:** decisions on V1–V3; no download is authorized.
3. **JW1 and EA9:** resolved in the final corrections (§11).
4. **EA3 fields:** resolved in the final corrections (§11).
5. **AF3:** EA9 refers Fanon to AF3, which is not yet produced; the reference is plain text.
6. **Terminology:** EA8 explains Grice's distinction without a fixed Chinese term for "implicature".
7. **Unchecked items:** each appendix lists what rests only on SEP or common accounts (e.g. Sartre's date example, the *Tractatus* "traffic accident" story, Mill's "barbarians" context).

## 10. Files

Final changed-file list (all uncommitted; `git status --short` after the final corrections):

```
 M prototype/navigation-v2/src/content/courses.ts
 M prototype/navigation-v2/src/content/jw1.ts
 M prototype/navigation-v2/src/content/media.ts
 M prototype/navigation-v2/src/content/practiceSets.ts
 M prototype/navigation-v2/src/data/catalog.ts
 M prototype/navigation-v2/src/ui/media/Media.tsx
 M prototype/navigation-v2/src/ui/media/in4/shared.tsx
?? content/EA7_PRODUCTION_REPORT.md
?? content/EA7_SAMPLE_DRAFT.md
?? content/EA8_PRODUCTION_REPORT.md
?? content/EA8_SAMPLE_DRAFT.md
?? content/EA9_PRODUCTION_REPORT.md
?? content/EA9_SAMPLE_DRAFT.md
?? content/V25_EA7_IMAGE_APPROVAL_SHEET.md
?? content/V25_INTEGRATION_REPORT.md
?? prototype/navigation-v2/src/content/ea7.ts
?? prototype/navigation-v2/src/content/ea8.ts
?? prototype/navigation-v2/src/content/ea9.ts
?? prototype/navigation-v2/src/content/practice-ea7.ts
?? prototype/navigation-v2/src/content/practice-ea8.ts
?? prototype/navigation-v2/src/content/practice-ea9.ts
?? prototype/navigation-v2/src/ui/media/ea7/   (HarmPrinciple.tsx)
?? prototype/navigation-v2/src/ui/media/ea8/   (RussellScope.tsx)
?? prototype/navigation-v2/src/ui/media/ea9/   (BadFaithSorter.tsx)
```

Tracked changes: 7 files, 88 insertions, 5 deletions. Every file belongs to V25: the three courses, their practice and components, their registration, and the two final corrections. Nothing has been committed, pushed or deployed. Git authorization is awaited.

## 11. Final targeted integration corrections (2026-11-10)

### 11.1 JW1 → EA9

- **Before:** `src/content/jw1.ts` passed a `displayText` hook to the parser that deleted "（EA9）" after the course name, because EA9 did not exist. JW1's manuscript names 《现象学、存在主义与诠释学》（EA9） twice (导读; 六、大屠杀之后的伦理).
- **Change:** the same hook now replaces "《现象学、存在主义与诠释学》（EA9）" with an in-text link to `#/course/EA9` (class `inline-link`, the app's existing link style; navigation through the existing hash router). Any other stray "（EA9）" is still removed. JW1's manuscript is unchanged.
- **Why this form:** the reader has no separate cross-reference component; course-to-course navigation uses hash routes, and article links are already styled (`.article a`). Adding EA9 to JW1's `leadsTo` was not done, because the curriculum gives JW1 no "→ EA9" link (it only says Arendt is taught in EA9).

### 11.2 EA3 → EA7 metadata

- **Before:** EA3 had `recommendFrom: ['EA4', 'EA7', 'EA11', 'LA1']` but `leadsTo: ['EA4']`.
- **Curriculum:** EA3's own entry says "→ EA4"; the recommended-path chains say "EA3 → EA7", and EA7's entry lists EA3 as background. The other `ea` entries use `leadsTo` for the curriculum's arrows (e.g. EA4 `['EA5','S1','S7']`, EA6 `['EA9','EA12']`).
- **Change:** EA3 `leadsTo: ['EA4', 'EA7']`, with a comment giving both sources. EA11 and LA1 were not added: the curriculum says only that EA11 "may also follow" EA3, and LA1 lists EA3 as background without an arrow from EA3. EA3's manuscript, practice and component are unchanged.
- **Effect on the page:** none visible. The course page already shows EA7 under 读完以后 (from `recommendFrom`) and filters `leadsTo` entries already shown, so EA7 still appears exactly once.

### 11.3 Validation

| Check | Result |
|---|---|
| `npm run typecheck` equivalent (`tsc --noEmit`) | Pass |
| `npm run build` | Pass; only the existing chunk-size warning |
| `git diff --check` (tracked files) | Pass, no output |
| Trailing whitespace in the untracked V25 files (checked separately, since `git diff --check` ignores untracked files) | None |
| JW1 → EA9 | Both mentions (导读, 六) render as links, no "（EA9）" remains; clicking opens `#/course/EA9` |
| Reading progress and position | After a real scroll in JW1 六, clicking the link left JW1's saved position and progress byte-identical and wrote nothing for EA9. (In a first attempt the click tool scrolled the link into view before clicking, and that scroll moved the saved position like any user scroll; a click without that scroll changed nothing.) |
| EA3 → EA7 | EA7 appears once under 读完以后 and opens `#/course/EA7` |
| Existing routes | `#/`, JW1 front page and reader, EA3 reader, EA9 reader, `#/cases/02`, the 欧洲与北大西洋哲学 region page all open; no console errors |
| Practice system | Not affected by these corrections; the 60-question test was not repeated |

localStorage was cleared after testing and the preview server was stopped.

# V27 integration report — AF1, AF2, AF3

*Three new courses written and integrated in one cycle: AF1 《非洲哲学思想：来源、争论与方法》 (Core ●), AF2 《后殖民与当代非洲哲学》 (Extended ○), AF3 《非洲裔与黑色大西洋哲学》 (Core-elective ◐). Baseline HEAD 2b4e205. Nothing has been committed, pushed, merged or deployed; no Cloudflare setting was touched. The V26 courses (EA10–EA12) and all earlier SEALED courses are unchanged, apart from one added link entry on EA9 (see §6). CASE 02 and the Cases area were not touched.*

## 1. Coverage

| Course | Tier | Sections | Exercises | Practice | Notes | Original passages | Component |
|---|---|---|---|---|---|---|---|
| AF1 | ● 核心 | 6 (+导读, 结语, 后世批判) | 6 | 18 | 93 | 0 | SourceWeigh (六) |
| AF2 | ○ 拓展 | 6 (+导读, 结语, 后世批判) | 6 | 18 | 82 | 0 | DecolonizeCompare (五) |
| AF3 | ◐ 核心选修 | 6 (+导读, 结语, 后世批判) | 6 | 18 | 73 | 13 (public domain) | ExperienceArgument (三) |
| **Total** | | **18** | **18** | **54** | 248 | 13 | 3 |

Each course's sections, method focus and outcome follow `planning/CURRICULUM_REFERENCE_DRAFT.md` (see the three production reports).

## 2. Scholarly rules from the brief and how they were applied

- **Not one homogeneous tradition:** AF1 导读 and 结语; the 结语 of AF3 says the link between the three courses is a set of shared questions, not a common "African essence".
- **Five kinds of material kept apart** (written argument, oral tradition, ethnography, modern reconstruction, contested attribution): AF1 导读 table, used throughout and practised in SourceWeigh.
- **Ethnophilosophy:** critics (Hountondji, Wiredu) and defenders ("批评的批评") both given (AF1 一; 后世批判 一).
- **No invented continuity:** every claimed relation carries one of three tags; AF3 六 says explicitly that the intersectionality genealogy is a comparison, not a line of influence.
- **Ḥatäta:** the dispute is taught (evidence table with limits; the component); the "African Descartes" label is rejected with three reasons (AF1 六).
- **Maʿat:** handled as separate questions (AF1 六).
- **Boundaries:** Fanon's anticolonial politics in AF2 五, his lived-experience analysis in AF3 四; Wiredu's method in AF1, his decolonization programme in AF2 三; Du Bois in AF3 does not repeat EA7's passages; AF3 四 builds on EA9's body-schema discussion.
- **AF3 is not an appendix to European existentialism:** stated in 导读 and argued in 四–五 (Fanon testing Sartre and Merleau-Ponty; Gordon's distinction).

## 3. Sources and citation limits

- Twentieth-century and living authors are paraphrased only, through SEP and IEP entries read in November 2026; quotations inside those entries are given in Chinese with the entry's page reference.
- AF3 quotes 13 short English passages from four public-domain nineteenth-century texts, each page-checked against the digitized original (DocSouth; Project Gutenberg #31254).
- AF1 uses the CC BY 4.0 volume *Searching for Zär'a Yaʿǝqob* (De Gruyter, 2024) with attribution.
- Every point resting only on a general introduction is flagged in the text (通行介绍) and listed in the manuscript's 来源与权利说明 for expert review.

## 4. Practice

54 questions in 18 sets (AF1 6/4/4/4, AF2 8/4/3/3, AF3 7/4/4/3 as single/multi/true-false/view). Every option of every single, multi and view question has feedback; every true/false item has an explanation; every view question has an explanation and marks no position right.

## 5. Components and rationale

Each course has one component, placed where its method is taught, and each practises that method on the chapter's own material:

- **SourceWeigh** (AF1 六): source kinds and *Ḥatäta* evidence.
- **DecolonizeCompare** (AF2 五): six approaches; evidence types in two cases.
- **ExperienceArgument** (AF3 三): the five questions applied to Douglass p. 33 and Cooper p. 134.

All three share the same design:

- native `<button>`s with `aria-pressed` in labelled groups;
- `aria-live` feedback;
- state saved per course (`philopilot.v2.afN.media.*`) and a reset button;
- a 不是什么 panel stating what is the chapter's reading;
- no new dependencies.

## 6. Integration changes — exact list of files

**New files (11 files + 3 reports + this report):**

- `content/AF1_SAMPLE_DRAFT.md`, `content/AF2_SAMPLE_DRAFT.md`, `content/AF3_SAMPLE_DRAFT.md` (CRLF)
- `prototype/navigation-v2/src/content/af1.ts`, `af2.ts`, `af3.ts`
- `prototype/navigation-v2/src/content/practice-af1.ts`, `practice-af2.ts`, `practice-af3.ts`
- `prototype/navigation-v2/src/ui/media/af1/SourceWeigh.tsx`
- `prototype/navigation-v2/src/ui/media/af2/DecolonizeCompare.tsx`
- `prototype/navigation-v2/src/ui/media/af3/ExperienceArgument.tsx`
- `content/AF1_PRODUCTION_REPORT.md`, `content/AF2_PRODUCTION_REPORT.md`, `content/AF3_PRODUCTION_REPORT.md`, `content/V27_INTEGRATION_REPORT.md`

**Modified files (8):**

| File | Change |
|---|---|
| `src/content/courses.ts` | import AF1–AF3; `Tradition` gains `'af'`, `TRADITION_NAME.af = '非洲与非洲裔哲学'`; three `PUBLISHED` entries (AF3 with `origLang: 'en'`); EA9 `recommendFrom` gains `'AF3'` (EA9 helpful for AF3) |
| `src/data/catalog.ts` | AF2 (`extended`) and AF3 (`elective`) rows after the existing AF1 row |
| `src/content/practiceSets.ts` | register AF1–AF3 practice |
| `src/content/media.ts` | three `MediaId`s and three anchors (AF1 六 table; AF2 五 paragraph; AF3 三 paragraph) |
| `src/ui/media/Media.tsx` | three lazy imports |
| `src/ui/media/in4/shared.tsx` | `useSavedIx` code union gains `'AF1' \| 'AF2' \| 'AF3'` |
| `src/ui/Region.tsx` | `?t=af` accepted; a 非洲与非洲裔哲学 heading and course table; the note now says six traditions |
| `src/ui/CoursePage.tsx` | the 读完以后 label for a course in another tradition now names that tradition ("非洲与非洲裔哲学 · 可接着读") instead of wrongly using the current course's tradition with "下一门". Needed because EA9 → AF3 is the first cross-tradition `recommendFrom` link; same-tradition links render exactly as before |

`src/data/units.ts` already had the AF1–AF3 names and tiers and was not changed. No dependency, test infrastructure, Cases or planning file was changed.

## 7. Validation

### Verified (run or observed in this cycle)

- `npm run build` (`tsc --noEmit && vite build`): passes, after the final change.
- **Sections:** each course page lists 9 parts (导读, 6 sections, 结语, 后世批判); the 18 numbered sections open at `#/course/AFn/read/1…6`.
- **Notes:** script check of all three manuscripts — every reference has a definition and vice versa; numbering contiguous (93 / 82 / 73); files are CRLF throughout. In the reader, a note button opens its note (AF3 三, note 30 → the Belle/SEP entry, as intended).
- **Practice:** in the reader, every section 1–6 of each course shows one 想一想 set with 3 questions — 54 in total. A script check confirms each set's lede equals its exercise prompt, question ids are unique, and every question has feedback. One answer submitted live returned its feedback.
- **ExperienceArgument:**
  - Mouse: real clicks.
  - Keyboard: Tab, then Enter.
  - Touch emulation at 375px (mobile preset, 5 touch points).
  - In each case the button state, verdict feedback and the step unlock worked.
- **Saved state:** survives a reload (AF3 component checked after reload; AF1 and AF2 component state written to storage on click).
- **Reading position:** clicking component buttons leaves the reader's scroll position and the component's on-screen position unchanged (measured before and after). The saved position (`af3.position`) and "继续阅读" return to the component's block (`?b=18`).
- **375px:** no element wider than the viewport on AF1 六, AF2 五, AF3 一, 三 and 六; screenshot checked for AF3 三.
- **Catalogue and navigation:** 历史与传统 shows a 非洲与非洲裔哲学 section with three openable courses and correct tiers; `?t=af` scrolls to and focuses that heading; the pinned list links to it; the note says six traditions.
- **Breadcrumbs:** "历史与传统 › 非洲与非洲裔哲学 · 第 n 门".
- **Search:** finds AF1–AF3 by title (黑色大西洋, 后殖民, 非洲哲学思想) and by content (库珀, 去殖民化, 民族哲学).
- **Links:**
  - AF1 → AF2 (next in tradition), S4 and D2 (shown as not built).
  - AF2 → D6; AF3 → D6.
  - EA9 → AF3 ("非洲与非洲裔哲学 · 可接着读"; clicking opens AF3).
  - AF2 shows AF1 as recommended background.
- **Regression:** these open without error:
  - courses CN1, EA7, EA9, EA12, IN4, GR1, JW1, IA2;
  - the home page;
  - the Cases list, CASE 02 and its reader.

  No console errors during the session.

### Assumed (not directly verified)

- Real finger-touch input on a physical device: only Chromium's touch emulation with mouse-dispatched clicks was used. The components use plain native buttons, so touch should behave like a click.
- Screen-reader announcements of the `aria-live` regions were not heard with an actual screen reader.
- Persistence for AF1 and AF2 components across a full reload was inferred from their storage writes and from the shared `useSavedIx` code that the AF3 reload test exercised.
- Other older courses not listed above were not opened individually. They share unchanged code paths; the only shared-UI edit (CoursePage) leaves same-tradition labels unchanged.
- Scholarly accuracy beyond the sources named: no specialist has reviewed any of the three manuscripts.

## 8. Image candidates

None downloaded and none verified. No approval sheets were prepared, because no candidate's source and rights were checked in this cycle. Possible candidates are listed (as unverified) in each production report.

## 9. Unresolved issues for the Product Owner

1. Expert review of all three manuscripts. Each 来源与权利说明 lists the points resting on general introductions.
2. **Wording of the cross-tradition link label** ("可接着读") in `CoursePage.tsx`. The alternative is to show AF3 on EA9 without a tradition label.
3. Whether AF3's 13 English passages should also get original-page images (would need image approval).
4. **Search by course code:** "AF2" does not find the course. This matches existing behaviour for all codes.

## 10. Git status

Working tree only. The modified and new files are listed in §6. No commit, push, merge or deploy has been made. Waiting for Product Owner review and explicit Git authorization.

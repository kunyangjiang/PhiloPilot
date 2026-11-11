# V28 integration report — JP1, KR1, LA1

*Three Core-elective (◐) courses written and integrated in one cycle:*
- *JP1 《日本哲学：佛教思想、江户儒学与京都学派》, 7 sections;*
- *KR1 《韩国哲学：佛教、理学论争与现代》, 6 sections;*
- *LA1 《拉丁美洲哲学：征服、独立与解放》, 6 sections.*

*Baseline HEAD fb38b1a. Nothing has been committed, pushed, merged or deployed. No Cloudflare setting was touched. No SEALED manuscript, Cases file or `planning/` file was changed, and no image was downloaded.*

## 1. Coverage

| Course | Sections | Exercises | Practice | Notes | Original passages | Component |
|---|---|---|---|---|---|---|
| JP1 | 7 (+导读, 结语) | 7 | 21 | 71 | 9 (8 Japanese, 1 kanbun) | UjiReadings (二) |
| KR1 | 6 (+导读, 结语) | 6 | 18 | 54 | 17 (classical Chinese) | FourSevenVoices (四) |
| LA1 | 6 (+导读, 结语) | 6 | 18 | 74 | 8 (Spanish) | NormativePremises (一) |
| **Total** | **19** | **19** | **57** | 199 | 34 | 3 |

The details, the brief-rule mapping and the expert-review lists are in the three production reports.

## 2. Integration changes: exact list of files

**New files (12 + 4 reports):**

- `content/JP1_SAMPLE_DRAFT.md`, `content/KR1_SAMPLE_DRAFT.md`, `content/LA1_SAMPLE_DRAFT.md` (CRLF)
- `prototype/navigation-v2/src/content/jp1.ts`, `kr1.ts`, `la1.ts`
- `prototype/navigation-v2/src/content/practice-jp1.ts`, `practice-kr1.ts`, `practice-la1.ts`
- `prototype/navigation-v2/src/ui/media/jp1/UjiReadings.tsx`
- `prototype/navigation-v2/src/ui/media/kr1/FourSevenVoices.tsx`
- `prototype/navigation-v2/src/ui/media/la1/NormativePremises.tsx`
- `content/JP1_PRODUCTION_REPORT.md`, `content/KR1_PRODUCTION_REPORT.md`, `content/LA1_PRODUCTION_REPORT.md`, `content/V28_INTEGRATION_REPORT.md`

**Modified files (9):**

| File | Change |
|---|---|
| `src/content/courses.ts` | import JP1, KR1, LA1; `Tradition` gains `'jp' \| 'kr' \| 'la'` with names 日本哲学 / 韩国哲学 / 拉丁美洲哲学; three `PUBLISHED` entries with `origLang` (JP1: `ja` when kana occur outside （）, otherwise `zh-Hant`; KR1: `zh-Hant`; LA1: `es`) |
| `src/data/catalog.ts` | JP1 and LA1 rows added next to the existing KR1 row (all `elective`, group `ot`); the KR1 topic link's `where` updated to the real section title "四、四端七情之辩" |
| `src/ui/Region.tsx` | `?t=jp\|kr\|la` accepted (`ot` maps to jp); three headings, each with a one-course table; the pinned list maps the curriculum's single "日本、韩国与拉丁美洲" group to `trad-jp`; the note explains that the group is shown as three sections |
| `src/content/practiceSets.ts` | register the three practice sets |
| `src/content/media.ts` | three `MediaId`s and anchors (JP1 二 paragraph "四、译本。"; KR1 四 comparison table; LA1 一 comparison table) |
| `src/ui/media/Media.tsx` | three lazy imports |
| `src/ui/media/in4/shared.tsx` | `useSavedIx` code union gains `'JP1' \| 'KR1' \| 'LA1'` |
| `src/ui/media/jw1/shared.tsx` | `Lang` gains `'ja' \| 'zh-Hant' \| 'es'` |
| `src/styles/base.css` | 15 lines: `.source-orig:is(:lang(ja), :lang(zh-Hant))` uses the serif face at 18px / 1.9, with a smaller citation line (CJK primary text was previously styled for Latin script) |

- No dependency was added.
- `units.ts` was not changed; it already had the three names.
- Line endings of every modified file were preserved.

## 3. Validation

### Verified (run or observed in this cycle)

- **Build:** `npm run build` (`tsc --noEmit && vite build`) passes after the final change.
- **Whitespace:** `git diff --check` is clean.
- **Line endings:** the three manuscripts are CRLF throughout (0 bare LF).
- **Notes:** a script check confirms that every reference has a definition and vice versa, with contiguous numbering (71 / 54 / 74). One leftover internal key in LA1's 来源与权利说明 (`[quijano]`, `[anz-own]`) was found and replaced with 注 66 and 注 71.
- **Sections:** the course pages list 9, 8 and 8 parts. Every part opens in the reader (`#/course/CODE/read/0…n`).
- **Primary-text language:** the `lang` attribute on the source blocks is:
  - JP1: `ja` (5 blocks in 一 and 五); 二 has 4 blocks, mixing `zh-Hant` (kanbun) and `ja`;
  - KR1: `zh-Hant` (17 blocks in 一, 二 and 四);
  - LA1: `es` (8 blocks in 二, 三 and 四).
- **Practice:** in the reader, 19 想一想 sets with 3 questions each (JP1 21, KR1 18, LA1 18 — 57 in total). A script check confirms that each lede equals its exercise prompt and that ids are unique.
- **Components:**
  - each mounts in its intended section;
  - LA1 was tested with real mouse clicks, keyboard (Tab, then Enter) and the mobile preset at 375px with touch emulation;
  - all three were driven through every step, including wrong answers (the verdict and the correct attribution are shown) and the final view step;
  - saved state survives a reload (JP1 checked);
  - no horizontal overflow at 375px; screenshot checked for JP1.
- **Region:** 历史与传统 shows three new headings ("日本哲学 · 1 门课" etc.) with openable courses. `?t=jp`, `?t=kr`, `?t=la` and `?t=ot` scroll to the right heading, as `?t=af` does.
- **Course pages:**
  - breadcrumbs read "历史与传统 › 日本哲学 · 第 1 门" (and the equivalents for KR1 and LA1);
  - recommended background and links follow the curriculum;
  - JP1 shows S7 and D3 as not built; LA1 shows D6 as not built.
- **Search:** finds the new courses by Chinese title and by content (四端, 道元, 有时, 弗莱雷, 拉丁美洲, 解放哲学).
- **Regression:** AF3's course page and reader open. CASE 02 opens unchanged, and git shows no change under Cases or `planning/`. No console errors.
- **Cleanup:** test state for JP1, KR1 and LA1 was removed from the preview browser's storage after testing.

### Assumed (not directly verified)

- Finger-touch on a physical device: only Chromium touch emulation was used.
- Screen-reader announcements of the `aria-live` regions were not heard.
- Persistence after reload for the KR1 and LA1 components is inferred from their storage writes and the shared `useSavedIx` code that the JP1 reload test exercised.
- Older courses other than AF3 were not reopened individually. The shared edits are additive: new `Lang` values, a CSS rule scoped to `:lang(ja)` / `:lang(zh-Hant)`, and new tradition ids.
- Scholarly accuracy beyond the named sources: no specialist has reviewed the manuscripts.

## 4. Image candidates

None downloaded and none verified, so no approval sheets were prepared. The unverified candidates are listed in each production report (§5 or §6).

## 5. Questions for the Product Owner

1. **Expert review.** All three manuscripts need it. The primary texts come from un-collated transcriptions: 维基文库 for KR1 and LA1; a cited article and the Matheson Trust material for 《有時》.
2. **Region layout.** The curriculum groups Japan, Korea and Latin America as one set ("ot"). The site now shows three separate traditions with one course each. Keep this, or show one combined heading?
3. **LA1 component.** It classes two table rows (关于惩罚, 关于手段) as "normative claims" by type. Acceptable, or limit the sort to rows the chapter itself labels?
4. **Critiques section.** The V27 courses had a 后世批判与回应 part; these three do not (objections are handled inside the sections, e.g. LA1 六 on standpoint). Is a separate part wanted?
5. **Search.** Latin-script names (e.g. "Sor Juana", "Dōgen") do not find the courses, because search matches Chinese titles and headings. This is the existing behaviour for all courses.

## 6. Git status

Working tree only. The new and modified files are listed in §2. No commit, push, merge or deploy has been made. Waiting for Product Owner review and explicit Git authorization.

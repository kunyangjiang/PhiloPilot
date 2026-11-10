# V22 integration report — IA3, IA4, IA5

*2026-11-09. Full production and integration of 《安萨里、阿威罗伊与西方伊斯兰思想》 (IA3, Core ●), 《照明学派、苏非形而上学与后古典诸派》 (IA4, Extended ○) and 《近现代伊斯兰与阿拉伯思想》 (IA5, Extended ○) in the prototype at `prototype/navigation-v2`. Nothing has been committed, pushed or deployed. JW1, EA1, Cases and the homepage were not touched.*

## 1. Registration

| Course | Registry entry | Tier | Position | Background (recommended, no lock) | Links on | `origLang` |
|---|---|---|---|---|---|---|
| IA3 | `content/ia3.ts`, `PUBLISHED.IA3` | ● 核心 | 3 | IA2 (intellectual dependency) | IA4, EA1, S2, S3, D3, JW1 | ar |
| IA4 | `content/ia4.ts`, `PUBLISHED.IA4` | ○ 拓展 | 4 | IA2 | IA5, D3 | fa |
| IA5 | `content/ia5.ts`, `PUBLISHED.IA5` | ○ 拓展 | 5 | IA3 | D6 | ar / en per passage |

- `IA2.recommendFrom` is now `['IA3', 'IA4']` (IA4 lists IA2 as its background). `IA3.recommendFrom` is `['IA5']`.
- `data/catalog.ts`: IA3 (core), IA4 and IA5 (extended) added after IA2 under tradition `ia`. Titles are the official short titles from `data/units.ts`.
- `content/practiceSets.ts`: IA3–IA5 sets added.
- `content/media.ts` / `ui/media/Media.tsx`: six component ids, anchors and lazy imports.
- `ui/media/in4/shared.tsx`: `useSavedIx` accepts IA3–IA5.
- `styles/base.css`: one new rule pair for Persian (`:lang(fa)`), beside the existing Arabic rule; it affects only IA4's Rūmī passages.

## 2. Components

| Course | Id | Anchor (section) |
|---|---|---|
| IA3 | `fire-cotton` | 三, after "这样，安萨里第二种进路中关于奇迹的说法" |
| IA3 | `cohesion-model` | 六, after "这是一个循环的理论" |
| IA4 | `presence-explorer` | 二, after the four-kinds-of-knowledge table |
| IA4 | `substantial-motion` | 五, after the Zayd table |
| IA5 | `iqbal-method` | 二, before the five-step summary table |
| IA5 | `double-movement` | 三, after the polygamy evaluation |

Shared pieces: `ui/media/ia3/shared.tsx` (re-exports the V21 pieces from `ia1/shared.tsx` and adds a `Level` row) and `ui/media/ia3/v22.css` (levels, rows, chain, buttons; one transition, disabled under `prefers-reduced-motion`). Every quoted line is one of the chapters' checked passages with the chapter's translation; every claim carries its basis tag (text / scholar / common / the chapter's reconstruction).

## 3. Validation (performed 2026-11-09)

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run build` | Pass. The ">1600 kB chunk" warning predates V22 |
| 18 official sections | Present: 6 per course, plus 导读, 结语 and 后世批判与回应 (9 reader parts each) |
| Footnotes | Every reference has a definition and vice versa: IA3 61, IA4 50, IA5 31 |
| Arabic / Persian / English passages | Arabic `lang="ar"` (IA3, IA5 §一); Persian `lang="fa"`, 21 px, `unicode-bidi: plaintext`, reference line 13.5 px (IA4); Iqbal's English `lang="en"` (IA5 §二) |
| 54 questions | All render (3 per 想一想); answered in the browser with their keys: 42 graded → "right", 12 view → "shown" (ungraded) |
| Components | All six render at their anchors; interactions exercised (four-claims sort, *ʿindahu / bihi*, Averroes' replies; regress chain to its limit; double-movement path with a classical reading); state survives navigation |
| Region | 历史与传统 → 伊斯兰、阿拉伯与犹太哲学 lists IA1–IA5 with "打开课程", JW1 as "原型未实现" |
| Course pages | Recommended background shown as "推荐背景，不是必需"; no locks |
| Search | "群体感", "实体运动", "双重运动", "苏赫拉瓦迪", "阿威罗伊" return the new courses' sections |
| 375 px | No horizontal overflow on any of the six component pages (document width = 375); screenshot of `cohesion-model` checked |
| Console | No errors and no "[media] anchor … not found" warnings after a full sweep |
| Regression | All 272 reader sections of all 26 published courses (the 23 earlier ones plus IA3–IA5) loaded with text |
| CASE 02 | `#/cases/02` loads; no file under Cases changed |

After testing, the practice and component state the tests had stored in the browser pane (keys `philopilot.v2.ia3.*`, `ia4.*`, `ia5.*` only) was removed so the courses start fresh.

**Not verified (at first; the resume position and the production build were verified later, see §8.6):** touch input on a real device (native inputs only, so expected to work); screen-reader output; the separate "resume reading" position (only that saved state persists across navigation was checked); the production `dist` in a browser (the dev server was used).

**Fixes made during validation:** the double-movement conclusion text referred to "the conclusion above" when it was not shown; the chosen generation button in `cohesion-model` had no visual state; `IA5_SAMPLE_DRAFT.md` had LF line endings and was converted to CRLF. The dev server's file watcher missed one edit of `media.ts`; touching the file fixed it (no code change).

## 4. Curriculum discrepancies (not changed; for the Product Owner)

1. **IA4 problem wording.** Curriculum: "how knowledge by presence and unity of being modify the philosophy of being". Spec: "…transform earlier accounts of knowledge and existence". The chapter follows the curriculum and covers both.
2. **IA5 section 6.** Curriculum "Contemporary"; spec "Contemporary Developments". Chinese heading 六、当代的发展.
3. **IA5 problem wording.** Curriculum "how Islamic philosophy answered…"; spec "how did Islamic philosophical traditions respond…". The chapter follows the curriculum.
4. **IA4/IA5 possible merge** (curriculum, "possible over-splitting"). Writing both suggests they share little; not acted on.
5. **IA5 as a weak-source area** (curriculum). Confirmed at first: sections 三–六 rested on research abstracts and common accounts. Strengthened in the final review (§8); still no original-language works.

## 5. Images

Approval sheets: `content/V22_IA3_IMAGE_APPROVAL_SHEET.md` (4 candidates: 3 recommended approve on condition, 1 hold), `V22_IA4_IMAGE_APPROVAL_SHEET.md` (1, hold), `V22_IA5_IMAGE_APPROVAL_SHEET.md` (1, approve; Iqbal not proposed). All are pages of editions the chapters transcribed. **Nothing downloaded or embedded; no placeholders.**

## 6. Process disclosure

Earlier in this cycle, while preparing page-image tools, `pillow` and `pypdf` were installed by mistake into another project's Python interpreter (`E:\QuantPilot\.python`). Both were uninstalled from it at once and a separate virtual environment was created in the session's temporary folder. No other change was made to that project. Page scans used for verification stayed in the temporary folder and are not in the project.

## 7. Files

**Created**

- `content/IA3_SAMPLE_DRAFT.md`, `content/IA4_SAMPLE_DRAFT.md`, `content/IA5_SAMPLE_DRAFT.md`
- `content/IA3_PRODUCTION_REPORT.md`, `content/IA4_PRODUCTION_REPORT.md`, `content/IA5_PRODUCTION_REPORT.md`
- `content/V22_INTEGRATION_REPORT.md`
- `content/V22_IA3_IMAGE_APPROVAL_SHEET.md`, `content/V22_IA4_IMAGE_APPROVAL_SHEET.md`, `content/V22_IA5_IMAGE_APPROVAL_SHEET.md`
- `prototype/navigation-v2/src/content/ia3.ts`, `ia4.ts`, `ia5.ts`
- `prototype/navigation-v2/src/content/practice-ia3.ts`, `practice-ia4.ts`, `practice-ia5.ts`
- `prototype/navigation-v2/src/ui/media/ia3/shared.tsx`, `ia3/v22.css`, `ia3/FireCotton.tsx`, `ia3/CohesionModel.tsx`
- `prototype/navigation-v2/src/ui/media/ia4/PresenceExplorer.tsx`, `ia4/SubstantialMotion.tsx`
- `prototype/navigation-v2/src/ui/media/ia5/IqbalMethod.tsx`, `ia5/DoubleMovement.tsx`

**Modified**

- `prototype/navigation-v2/src/content/courses.ts` (imports; IA2 `recommendFrom`; IA3–IA5 entries)
- `prototype/navigation-v2/src/content/media.ts` (ids and anchors)
- `prototype/navigation-v2/src/content/practiceSets.ts`
- `prototype/navigation-v2/src/data/catalog.ts`
- `prototype/navigation-v2/src/ui/media/Media.tsx`
- `prototype/navigation-v2/src/ui/media/in4/shared.tsx` (`useSavedIx` union)
- `prototype/navigation-v2/src/styles/base.css` (Persian rule)

Not modified: `planning/`, Cases and CASE 02, the homepage, other courses' manuscripts and components.

## 8. Final academic source strengthening and validation (2026-11-09)

This follows the Product Owner's final-review brief. It covered targeted source work on IA5 §§三–六, focused verification of five IA4 points, and no broad revision of IA3. It also ran the production preview checks that §3 had listed as not verified.

### 8.1 IA5 sources read in full

The full table, with pages, is in `IA5_PRODUCTION_REPORT.md` §11.1. In brief:
- Harvey 2020 (Rahman and Taha; Brill, open access)
- Hashas 2020 (Taha; same volume)
- Riyani 2017 (Wadud, and Rahman's double movement quoted in his own words)
- Sumbulah & Zahroh 2026 and Musdalipa 2025 (Mernissi; relevant sections)
- Bukhārī 4425 and 7099 (Arabic and English)
- Shariati, *Religion vs. Religion* (1970 lectures, Bakhtiar's translation; relevant chapters) and the "Red Shi'ism vs. Black Shi'ism" English text
- Dabbagh 2023 (Soroush)

Sources consulted only as abstracts, or not read, are listed there separately.

### 8.2 IA5 changes

Detailed in `IA5_PRODUCTION_REPORT.md` §11.2. Factual corrections:
1. Taha's distinction is the spirit vs the **reality** (wāqiʿ) of modernity, not "realisation". It is now sourced to Hashas and Harvey instead of a publisher's blurb for Hallaq.
2. Wadud's "hermeneutics of tawḥīd" first means the unity of the Qurʾān (1992/1999). The theological sense is a later extension (2006, 2008).
3. Soroush's theory first appeared as articles in 1988–1990, not as a book of the early 1990s.
4. The Abū Bakra report's own wording dates the recollection to the Battle of the Camel. "Sole narrator" is now attributed to Mernissi.

Additions, each marked as the thinker's, a scholar's or the chapter's:
- Rahman's own formulation and the Betti/Gadamer objection
- Shariati's religion-of-revolution vs religion-of-legitimation thesis
- the classical reply on qadhf and ʿadāla
- Wadud on 4:34
- Taha's ethics, the three levels of reason, trusteeship and its limits
- Soroush's self-description of the theory as "interpretive-epistemological", and Dabbagh's two readings

Size: text before 注释 grew from 22,006 to 23,739 characters. In `practice-ia5.ts`, one word was changed in the explanation of ia5-6-2. The anchor sentences and all 想一想 blocks are unchanged.

### 8.3 IA4 findings

Detailed in `IA4_PRODUCTION_REPORT.md` §11. Confirmed against the SEP text:
- Suhrawardī's knowledge by presence
- Ibn ʿArabī's "He/not He"
- the history of the label waḥdat al-wujūd (never used by him; Ibn Taymiyya first ascribed it; Jāmī first adopted it among his defenders; seven later meanings)
- Ṣadrā's gradation, and the objections to substantial motion with their replies

Corrected:
- "后来被称为" for *ʿilm ḥuḍūrī* is now "被称为" (SEP treats the term as Suhrawardī's).
- A step-by-step argument for substantial motion that had been ascribed to SEP is now marked as the chapter's elaboration.

Refined: Rābiʿa, using a full review of Cornell (Khalil). The earliest mentions are al-Muḥāsibī (d. 857) and al-Jāḥiẓ (d. 868), and love mysticism predates her.

### 8.4 IA3

No demonstrated error was found; the review was focused and no broad revision was attempted. **IA3 unchanged.**

### 8.5 Remaining limitations

- No original-language text of the six IA5 thinkers was read.
- Mernissi's and Wadud's own books were not read.
- "Return to self" is still a common account.
- Taha's two full sources come from one edited volume.
- Soroush rests on one full article.
- For Rābiʿa, the ʿAṭṭār point and the source of the 717–801 dates rest on summaries.
- Specialist review of IA5 §§三–六 is still recommended.

### 8.6 Production preview and resume

The repository's own procedure was used: `.claude/launch.json` → `philopilot-nav-v2-build`, which is `vite preview` of `dist` on port 5189, after `npm run build`. The test keys were cleared before and after. Input was real (wheel scrolling and mouse clicks in the browser pane), not synthetic `scrollTop`, except for one programmatic `scrollIntoView` used to locate a question.

| Check | Result |
|---|---|
| IA3–IA5 render in the production build | Yes. IA5 §三 shows the new text, and the double-movement component sits at its anchor. Course pages for IA3, IA4 and IA5 open |
| Reading progress from real scrolling | Wheel scrolling in IA5 §三 wrote `philopilot.v2.ia5.progress` {"3": 0.61 → 0.91} and a position (section 3, block 22 → 26, with heading) |
| Resume | The course page showed "已读 11% · 继续阅读 → 回到：法律与伦理 · 解释与现代的制度". Clicking it opened `#/course/IA5/read/3?b=26` with block 26 at the reading line. The jump did not overwrite the saved position (same timestamp) |
| Practice answers vs progress | Answering two questions (one single-choice and one multi-select, picking options and submitting) left `progress` unchanged; answers were stored under `…ia5.practice.三`. **Observation:** submitting reveals the feedback panel, and the browser's scroll anchoring then shifts the scroll container by about 3 px. That fires one scroll event, which re-saves the position at the block already on screen. In one of two submissions this crossed a block boundary (25 → 26). Progress never changed. Not fixed: it is the shared reader's behaviour, and the brief rules out refactoring shared architecture |
| Separate course storage | IA4 reading wrote only `philopilot.v2.ia4.*`; the IA5 keys were unchanged and survived a page reload |
| 375 px | The IA3, IA4 and IA5 course pages, and IA5 §§四–六, all have document width 375 with no element overflowing |
| Footnotes and practice in IA5 §§三–六 | References 17–31 resolve, with no raw `[^…]`; practice inputs render in all four sections |
| Console | No errors |

Not repeated: the 26-course regression sweep, device testing and screen-reader testing (outside the brief). The dev server on port 5179 was left as it was; the preview server on port 5189 was stopped afterwards.

### 8.7 Files changed in this review

- `content/IA5_SAMPLE_DRAFT.md`: §§三–六 and notes 17–19 and 23–31 (CRLF)
- `content/IA4_SAMPLE_DRAFT.md`: 导读 (one word), §五 (one attribution), the Rābiʿa subsection and note 32 (CRLF)
- `prototype/navigation-v2/src/content/practice-ia5.ts`: one word in the ia5-6-2 explanation
- `content/IA5_PRODUCTION_REPORT.md` (§11 added; §1, §2 and §8 pointers), `content/IA4_PRODUCTION_REPORT.md` (§11 added), `content/V22_INTEGRATION_REPORT.md` (this section; §3 and §4 pointers)

Not changed: IA3, components, `media.ts`, the other practice files, image approval sheets, Cases and CASE 02, `planning/`, the homepage. Nothing committed, pushed or deployed. JW1 and EA1 were not started.

### 8.8 Final typecheck and build

Both were run after all edits. `npm run typecheck`: pass, no errors. `npm run build`: pass, built in 1.73 s. The only message is the ">1600 kB chunk" warning, which predates V22.

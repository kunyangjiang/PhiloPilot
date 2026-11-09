# Phase 15B: IN2/IN3 source closeout (V18)

Date: 2026-11-09. Nothing is committed, pushed or deployed. No images were downloaded. No other course was touched.

## Adjustments

**IN2 (`content/IN2_SAMPLE_DRAFT.md`, 来源与权利说明)**
1. Fixed the Pradhan edition date. The appendix still said that the AKBh page and line numbers follow "Patna 1967"; the file header gives the revised 2nd edition, K.P. Jayaswal Research Center, 1975. The appendix now also records the header's statement that the e-text is a "best reading", not a critical edition.
2. The GRETIL table now gives the licence for each file instead of "同上". Each row records the file version (2020-07-31), what its header says (CC BY-NC-SA 4.0 plus the "good faith" takedown clause), and edition details: the DSBC permission note and "not proof-read".
3. Added a sentence explaining where the GRETIL licence comes from, and stating that it is not applied to other GRETIL files. The licence appears only in the header GRETIL generated in its 2020 mass conversion; the original contributors' notes kept in each file do not mention it. Whether the contributors and edition rights-holders agreed to it is recorded as unverified.
4. Added a new section, **互动图示使用的补充引文**: a table for AK 1.5, 2.34 and 2.35 giving the exact wording, its location in the kārikā file and in the AKBh (Pradhan page and line), how the Abhidharma lab uses each verse, and how the lab's claim relates to it. It notes that the translations are the course's own and that the e-text has a typo in 2.34b. Their reuse conditions are the same as the kārikā file's. The main text was not expanded.

**IN2 component (`src/ui/media/in2/AbhidharmaLab.tsx`, one string)**

5. The AK 2.34 explanation used to say "心法只有一种" under a "checked original text" tag, but the verse only says that citta, manas and vijñāna are synonyms. It now separates the two: the verse says they are synonyms, and "so citta counts as one category among the five" is labelled as the course's inference.

All three verses match the GRETIL kārikā file (`vakk_1.5`, `vakk_2.34`, `vakk_2.35`) letter for letter. The AKBh confirms that the "two cessations" are pratisaṃkhyā- and apratisaṃkhyānirodha (Pradhan 3.19), and that the 2.35 list continues with "nāmakāyādayaś ca" (Pradhan 62.13), which is why the lab's translation ends in an ellipsis.

**IN3 (`content/IN3_SAMPLE_DRAFT.md`, 来源与权利说明)**
1. The GRETIL table now has a "licence stated in the file header" column for all 13 files, plus each file's version date. Edition details were corrected against the headers:
   - Calcutta Sanskrit Series 18 & 19
   - Malvania, Patna (2nd ed.) 1971
   - Miyasaka, *Acta Indologica* 2, without the svārthānumāna chapter
   - Gnoli, Rome 1960
   - Shastri, Asiatic Society 1989
   - Dhruva, Srisatguru 1987
   - Dvivedin, 1895 edition, Delhi reprint
   - Praśastapāda contributors: Tokunaga and Muroya
   - "not proof-read" where the header says so
2. Added the same note on where the licence comes from and that it is not generalised to other files.
3. The CBETA record is now in three layers.
   - **Default framework:** CC BY-NC-SA 4.0, non-profit use only.
   - **Documented exceptions:** category B (four modern collections). Taishō vols 1–85 are category A, so T1630 (vol. 32) is not an exception.
   - **The file's own header:** "Available for non-commercial use when distributed with this header intact".

   The record also gives the source URL (cbeta-org/xml-p5 on GitHub), the file date (2026-06-15) and the text providers. It notes as unverified that the copyright page marks the Taishō "大藏出版株式會社 ©" without explaining how this relates to CBETA's CC release.
4. Fixed a contradiction. The "known only from secondary literature" list still included Praśastapāda's five-member argument, which Phase 15B had checked. That item is removed, and the Kumārila item is narrowed to his apoha critique.
5. Uncertainty item 7 now states that these are the e-texts' own declarations, not a legal conclusion, and names the two relationships that are unverified.

Both manuscripts keep CRLF line endings. No note was added or renumbered.

## Validation

| Check | Result |
|---|---|
| `tsc --noEmit` | Pass |
| `npm run build` | Pass. The chunk-size warning was already there before this pass. |
| Footnotes | IN2: 94 definitions = 94 references. IN3: 108 = 108. Numbered in order, no duplicates. |
| Appendices render | IN2: both tables (6 and 4 rows); no stray `\|` and no "1967". IN3: the 14-row, 5-column GRETIL table and all four CBETA layers render; the contradicting sentence is gone. |
| Components | All 8 load (IN2 sections 2/3/4/7, IN3 sections 3/4/5/7). The revised AK 2.34 text appears after "核对". |
| Console | No errors. The test state in localStorage was removed. |

## Genuine release blockers

1. **Licence fit (PO decision; not a legal clearance).** Every GRETIL file used, and CBETA T1630, are released for non-commercial use only, with share-alike. If PhiloPilot is commercial, or cannot be released share-alike, the quotations must be cleared some other way or rechecked against other editions. The relationship of each licence to the underlying rights is unverified: the GRETIL contributors and print editions, and Daizō Shuppan for the Taishō.
2. **Images** remain pending under the two approval sheets. Nothing is downloaded.

Nothing else blocks release from the source side. Expert review of both courses remains an open recommendation in each appendix, and is not a new finding.

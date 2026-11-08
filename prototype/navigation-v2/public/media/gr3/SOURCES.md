# 亚里士多德（GR3）· 图像来源与权利

An image may be added only after (1) its reuse rights are verified and its
identity checked against the holding institution's own record wherever that
record could be reached, and (2) the Product Owner approves the download
(filename, source, size). Where the institution's record could not be
reached, this file says so.

**Status (2026-11-07):** both images below were downloaded with Product
Owner approval on 2026-11-07 and are enabled (`available: true` in
`src/ui/media/assets.ts`).

## Embedded

### bekker-1831-p1094.jpg

- **Object:** *Aristotelis opera*, edidit Academia Regia Borussica, ed.
  I. Bekker, vol. 2 (Berolini: apud G. Reimerum, 1831), **p. 1094**: the
  first page of the *Nicomachean Ethics* (heading ΗΘΙΚΩΝ ΝΙΚΟΜΑΧΕΙΩΝ Α,
  text beginning Πᾶσα τέχνη), with the two columns (a, b), the line numbers
  between the columns and the critical apparatus at the foot.
- **Why this page:** the reading guide explains Bekker numbers ("1098a16")
  in words; this is the page and column that "1094a1" refers to.
- **Identification:** checked 2026-11-07 by viewing the leaf in the Internet
  Archive page-image service: the printed page number 1094 and the heading
  are legible; the item's full-text index places the string "1094" on that
  leaf.
- **Holder / scan:** Internet Archive item `aristotelisopera02arisrich`
  (metadata read 2026-11-07: title *Aristotelis opera*, volume 2, publisher
  "Berolini, apud G. Reimerum", contributor Eisenhower Library, Johns Hopkins
  University, sponsor Sloan Foundation, possible-copyright-status
  NOT_IN_COPYRIGHT). The item date field reads "1831-1870" (the set); the
  volume itself is 1831.
- **Rights:** **public domain.** Published 1831; editor Immanuel Bekker died
  1871. A faithful scan of a public-domain printed page adds no new rights in
  the United States, and the scan is in any case marked not in copyright by
  the Internet Archive.
- **File:** downloaded 2026-11-07 with Product Owner approval from
  `https://archive.org/download/aristotelisopera02arisrich/page/n309_w1000.jpg`
  (redirects to the BookReader image service). Response headers read
  2026-11-07: `image/jpeg`, Content-Length **655,851 bytes**. The service
  returns the full leaf, **1482 × 1953 px** (checked in the browser), not a
  1000 px resize. Saved file: 655,851 bytes, 1482 × 1953 px JPEG, matching
  the headers. Not altered (no crop, resize or colour change).
- **Used in:** `src/ui/media/gr3/BekkerPage.tsx` (reading guide, after the
  paragraph on Bekker numbers), via `BEKKER_1094` in `src/ui/media/assets.ts`.

### aristotle-altemps-8575.jpg

- **Object:** marble portrait bust of Aristotle; Roman copy after a Greek
  original (the Commons description: a bronze by Lysippos, ca. 330 BCE); the
  alabaster mantle is a modern addition. **Museo Nazionale Romano, Palazzo
  Altemps, Rome, inv. 8575**; formerly Ludovisi collection.
- **Date and what it shows:** a Roman copy made long after Aristotle's death
  (322 BCE); not a lifetime portrait, and the mantle is modern. The caption
  says this. The date of the copy itself is not given in the Commons record
  (other web captions say "Hadrianic" or "2nd century CE"; these were not
  verified and are not used).
- **Holder and identification:** the museum's own object record was **not
  found** (a web search on 2026-11-07 returned only Commons mirrors and
  secondary sites). Identity, inventory number, collection and the note on
  the modern mantle are taken from the Wikimedia Commons file record:
  <https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg>
  (wikitext and API `extmetadata` read 2026-11-07: accession number
  "Inv. 8575", credit line "Ludovisi Collection", gallery Palazzo Altemps;
  Valued Image). See Open questions.
- **Rights:** the sculpture is in the public domain. The **photograph** is
  by Jastrow (2006), released into the public domain by the photographer
  (`{{PD-self}}`, with `{{PD-art-70-3d}}` and `{{PD-old-auto}}` for the
  object); Commons API: LicenseShortName "Public domain", Copyrighted
  "False". No attribution is required; the caption credits the photographer
  anyway.
- **File:** downloaded 2026-11-07 with Product Owner approval from
  `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/960px-Aristotle_Altemps_Inv8575.jpg`
  (a Wikimedia-generated 960 px thumbnail of the 1700 × 2275 original).
  Response headers read 2026-11-07: `image/jpeg`, Content-Length
  **245,154 bytes**; **960 × 1285 px** (checked in the browser). Saved file:
  245,154 bytes, 960 × 1285 px JPEG, matching the headers. Not altered by
  the course (the thumbnail is Wikimedia's own resize).
- **Used in:** `src/ui/media/gr3/AristotleHead.tsx` (section 一, after the
  paragraph on Raphael's *School of Athens*), via `ARISTOTLE_HEAD` in
  `src/ui/media/assets.ts`.

## Considered and not used

- Raphael, *School of Athens* (Vatican). Not used: the chapter already
  discusses it in words as a Renaissance impression; a reproduction would be
  decorative and would repeat the impression the text warns against.
- Other photographs of the Altemps bust on Commons (e.g. by Giovanni
  Dall'Orto). Not needed; the Jastrow photograph is public domain and has the
  fullest object record.
- Bekker 1831, p. 645 (*Parts of Animals*, the passage corrected in note
  29). Viewed for verification only; one Bekker page is enough to explain the
  numbering.

## Open questions

- **Inv. 8575:** the holder's own collection record was not found. The
  Product Owner may accept the Commons record as sufficient (as for GR2's
  MC 1377, the caption reports the attribution rather than asserting it), or
  ask for the museum's record before release.
- **Lysippos attribution:** reported from the Commons description only.

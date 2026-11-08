# 墨家、名家与后期墨经（CN2）· 图像来源与权利

An image may be added only after (1) its reuse rights are verified and its
identity checked against the holding institution's own record wherever that
record could be reached, and (2) its licence is public domain or
attribution-only. Phase 10B authorised relevant historical manuscript imagery
on these terms; material whose reuse status remained materially unclear was
not downloaded.

**Status (2026-11-07):** one image, downloaded 2026-11-07 and enabled
(`available: true` in `src/ui/media/assets.ts`).

## Embedded

### daozang-jingshang-1445.jpg

- **Object:** 《正統道藏》太清部，沛字號第九冊，《墨子》卷之十，first page
  (卷首, 「經上第四十」). Woodblock print, 明正統十年（1445）內府刊本.
  **National Library of China (中國國家圖書館)**, 善本書號 **02607**
  (the whole 道藏), volume 第3667冊.
- **Holder record:** 中華古籍資源庫 · 數字古籍,
  <http://read.nlc.cn/allSearch/searchDetail?searchType=10024&showType=1&indexName=data_892&fid=411999005947>,
  fetched 2026-11-07: 題名「道藏」, 出版發行項「內府 明正統10年[1445]」,
  版本項「刻本」, 善本書號 02607, 現有藏本 NLC. The record lists the
  volumes; 第3667冊 links to object bid 9410, which matches the Commons file
  of the NLC's own scan of the same volume
  (`File:NLC892-411999005947-9410 道藏 第3667冊.pdf`). The record does not
  list volume contents. That this volume is 墨子卷之十 was confirmed from the
  page image itself (heading 「墨子卷之十」, 「經上第四十」, margin mark
  「沛九」).
- **Scan used:** Wikimedia Commons,
  <https://commons.wikimedia.org/wiki/File:正統道藏.24-054.太清部.沛九.墨子卷之十.明正統十年內府刊本.pdf>
  (37 pages, 6,796,800 bytes, SHA-256
  `880bf7e0d99474532d4db37fe21a43f92eeaacc0aecdd41545b8ab48fd6f1495`).
  The Commons description says it was split, without recompression, from the
  grey-scale microfilm scan of the NLC copy published by 書格 (shuge.org).
  Licence on Commons: **public domain** (`PD-scan`, `PD-old-100-expired`);
  no attribution required. The work is a 1445 print; a faithful scan of it
  adds no new copyright.
- **Reuse terms of the NLC site:** no licence or reuse statement for the
  中華古籍資源庫 images was found (a web search on 2026-11-07 found only
  reports that the images are free to read online without registration).
  The image was taken from the public-domain Commons copy, not from the NLC
  site. See Open questions.
- **File:** page 2 of the Commons PDF, rendered with poppler `pdftoppm`
  (as bundled with Calibre) to JPEG, quality 82, 900 px wide. Saved file:
  **236,605 bytes, 900 × 1276 px**, SHA-256
  `8cf4ecc30dbed7addf95fd605f92603cf69daeb1d0b85a9b0ed98171b722c6cd`.
  **Modifications:** resized and converted from JPEG 2000 to JPEG; no
  cropping, no retouching.
- **Used in:** `src/ui/media/cn2/DaozangPage.tsx` (section 三, after the
  paragraph on how the course cites the canons), via `DAOZANG_JINGSHANG`.

## Considered and not used

- `File:ZHSY100073 墨子 明嘉靖三十一年芝城銅活字藍印本.pdf` (Commons; the 1552
  bronze-movable-type edition, the year SEP gives for the first complete
  reprinting). Not used: the scan is of the modern facsimile series
  《中華再造善本》 (National Library of China Publishing House), and the
  Commons record names neither the library holding the original copy nor
  the facsimile volume; the publisher's rights in the modern facsimile were
  not checked. Its identity and reuse status therefore remained unclear.
- Scans of 孫詒讓《墨子閒詁》 and of 《公孫龍子》 on Commons. Not checked
  in detail; one image of the received canon text was judged enough.

## Open questions

- The NLC publishes no reuse statement for its digitised rare books that
  could be found. The image is a public-domain work and was taken from a
  public-domain copy, but the Product Owner may wish to confirm the NLC's
  position before release.

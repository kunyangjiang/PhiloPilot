# Phase 13B — integration report: 魏晋玄学与中国佛学 and 宋明理学至清代 (V16)

> Status: **both courses integrated in `prototype/navigation-v2`, awaiting Product Owner acceptance.** Nothing committed, pushed or deployed. No images downloaded. CN7 not started.
> Date: 2026-11-08.

## 1. 魏晋玄学与中国佛学 (CN5)

**Files**
- `content/CN5_SAMPLE_DRAFT.md`: manuscript in full (6 parts, guide, 3 critiques, 21 notes, appendix, 6 practice sets). Only two lines changed: the English subtitle and the status line.
- `src/content/cn5.ts`: parser entry. `src/content/practice-cn5.ts`: practice.
- `src/ui/media/cn5/`: `EmptinessExplorer`, `ThreefoldTruth`, `HuayanExplorer`, `SuddenGradual`, `shared.tsx` and `cn5.css`. The CSS is also used by the CN6 components.
- Registry title (official): 魏晋玄学与中国佛学：空、自然与顿悟. The spec gave the subtitle as 空性、自然与顿悟; the registry title was kept, as instructed.

**Components** (each anchored after the paragraph that sets it up)

| Part | Component | What it does |
|---|---|---|
| 三 | 空不是虚无 (`emptiness-explorer`) | Follows one 中论 verse through seven stops: 龙树 → 罗什 (無) → 青目 (空) → a 玄学 reader → 本无宗 → 僧肇 → 智顗. Each stop is labelled as Indian source, translation, Chinese reconstruction or the course's own inference. 僧肇's two-part argument has premise switches, so the reasoning visibly fails when a premise is turned off. A short task classifies four claims (心无 / 即色 / 本无 / 僧肇). Emptiness is never shown as nothingness. |
| 四 | 空、假、中 (`threefold-truth`) | Two drawings side by side. 次第三观 shows three boxes in a sequence, which 《摩诃止观》 calls "非今所用". 即空即假即中 shows one object seen through three facets at once. Each facet opens its step of 智顗's argument. The mirror metaphor has a "limits" panel (不合不散). Ends with a 3-item check. |
| 五 | 椽子就是房子？ (`huayan-explorer`) | 法藏's rafter argument on a drawn house. You can remove a rafter and switch between the strong and everyday definitions of "house"; steps 2, 3 and 5 fail under the everyday one. The six marks (六相) are highlighted on the same house, and 异相 and 坏相 keep the parts named. Six models, each with where it fails: gold lion, house, Indra's net, network graph, container / sum of parts, "melting into one". |
| 六 | 顿与渐 (`sudden-gradual`) | Verse versions side by side with differing lines marked (神秀 and 惠能 ×2 from the 敦煌本; 宗宝本). Six documented texts (道生, 神会, 敦煌本 ×2, 宗密, 宗宝跋) are sorted into five claims rather than a binary; two texts fit two claims. A timeline shows how late the "南顿北渐" layer is. |

**Practice:** 6 sets, 18 questions, 3 per set.
- 7 single-choice questions, answers c a d b b c d (A 1, B 2, C 2, D 2).
- 3 multiple-choice and 3 true/false; the rest are open questions in the V7 format.

**Source validation**
- 74/74 blockquotes match the Wikisource texts.
- 2 inline flags remain, both expected and documented in the 13A report: 先舊格義 and 中論 (佛教).
- A script checked every original-language string quoted in the four components against the manuscript: 0 missing.

## 2. 宋明理学至清代 (CN6)

**Files**
- `content/CN6_SAMPLE_DRAFT.md`: manuscript in full (7 parts, guide, 3 critiques, 32 notes, appendix, 7 sets).
- `src/content/cn6.ts`, `src/content/practice-cn6.ts`.
- `src/ui/media/cn6/`: `LiQiExplorer`, `ZhuWangWorkshop`, `ZhixingExplorer`, `EvidentialWorkshop`, `WomenEvidenceBoard`, `shared.tsx`.

**Components**

| Part | Component | What it does |
|---|---|---|
| 三 | 理和气 (`liqi-explorer`) | One panel for each of seven thinkers. 周敦颐: a toggle between 自無極而為太極 and 無極而太極 that changes the drawing. 张载: gather/disperse dots with a constant count, plus his three-way dilemma (生 / 见 / 即). 程颢 (识仁). 程颐 (性即理, clouding 气). 朱熹: a toggle between temporal and grounding priority. 王夫之 (器 and 道). 戴震 (分理, 欲其物理其则). A fixed banner says 理 and 气 are not two substances, and 理 is always drawn dashed. |
| 四 | 孝的理在哪里？ (`zhu-wang-workshop`) | Four cases: 父在, 亲没之后, 竹子空心, 名物度数. You guess where each side puts 理, then see both answers side by side, each with its strength and the other side's worry; replies on 朱熹's behalf that he never gave are labelled as the course's inference. The comparison table opens on row 3. Three diagnoses are included; one is "neither: a misunderstanding" (格竹子). |
| 五 | 知行合一 (`zhixing-explorer`) | Opens with a check that 知行合一 ≠ 言行一致. Five elements (知, 好恶, 意, 行, 明觉精察) are drawn under four readings: commonsense, strong, cultivation, weak. Five cases read under each: 徐爱, 好好色, 知食乃食, 一念不善, "我心里已想孝顺". |
| 六 | 考据 (`evidential-workshop`) | Five cases the chapter itself had to decide: 太极图说 variant; 思問錄 曰/日; the 日知錄 quote boundary between 黄震 and 顾炎武; 戴东原集 埋→理; "传授心法" word origin. Evidence is added layer by layer (variant, philology, historical record, commentary, interpretive claim, parallel text), and the conclusion and its firmness update each time. |
| 七 | **Evidence board** (`women-evidence-board`) | Four columns (see below). 14 cards, placed by clicking. Each card says what it **can** and **cannot** establish. Dual placements are accepted with an explanation. A final panel, "作为思想主体的女性", lists only what the sources show: 班昭, 陆氏, 孙碧梧, 徐裕馨 and the 13 women, 王贞仪. |

**The evidence board's four columns**
1. Norms and arguments, mostly by male authors.
2. Women's own words.
3. Evidence of activity.
4. Modern historians' reconstructions.

**Part VII source work** (targeted; the rest of the manuscript was not reopened)
- 《后汉书·列女传》班昭传 read and quoted from Wikisource (verified 2026-11-08): 续成《汉书》八表及天文志, 马融 "伏於閣下，從昭受讀", her memorial to 邓太后.
- 王贞仪 (1768–1797):
  - Wikisource author page read; her works list is cited with titles only.
  - Her astronomy and mathematics texts were not read, so no claims are made about her views.
  - Four ci titles show her exchanging verses with named women.
- Ko 1994 and Mann 1997: only catalogue and publisher descriptions were consulted. Mann's thesis comes from Charlotte Furth's review (China Perspectives 2008/4). Both are marked as secondary and second-hand.
- A fourth evidence category, 现代史学者的重建, was added to the text and summary table. Notes 26 and 32 and the appendix were updated. Peterson was **not** read and is not cited as read.
- Re-verification: 103/103 blockquotes OK; 86 inline quotes OK; notes 1–32 in order.

**Practice:** 7 sets, 21 questions, 3 per set.
- 8 single-choice questions, answers b d a c d b c a (A 2, B 2, C 2, D 2).
- 4 multiple-choice and 5 true/false; the rest are open questions.
- Component quotations: 0 missing (same script).

## 3. Shared work

**Concept map**
- `src/ui/media/conceptmap/`: one data-driven component (`ConceptMap.tsx` + `types.ts`) with two configurations:
  - `data-cn5.ts`: 18 nodes, 21 links. Anchored at the end of CN5 Part 六.
  - `data-cn6.ts`: 19 nodes, 24 links. Anchored in the CN6 guide.
- Three link types, each with its own label, line style and legend:
  - 有文献记载的影响或回应: solid line with an arrow.
  - 有文献记载的接触: dashed line.
  - 为教学而作的结构比较: dotted line.
- Each type can be filtered on and off. A keyboard button list mirrors the SVG.
- Neither map draws a single lineage.
- The caution line spells out the counts:
  - CN5: the next-course column has only 2 contacts.
  - CN6: the Buddhist column has 3 contacts, 3 responses (explicit criticisms) and 6 comparisons, and "no link shows Neo-Confucian doctrine derived from Buddhism".

**Registration** (existing registry, parser, reader, media anchoring, practice renderer and storage reused; no new dependencies)
- `courses.ts`: both entries added, Core, positions 5 and 6.
  - CN5: recommendFrom CN6, JP1; leadsTo CN6, D10.
  - CN6: recommendFrom CN7, KR1, CN8, JP1; leadsTo CN7.
  - CN1 gains CN6 as a next course.
  - Background (CN3 and IN4 for CN5; CN1 and CN5 for CN6) is shown as recommended-background text, as for the other courses.
  - Unreleased courses show "原型未实现".
- `catalog.ts`:
  - 人性与道德 question links: CN6 → 1, 2 and 4; CN5 → 2.
  - Documented links: CN3 → CN5 and CN5 → CN6.
- `practiceSets.ts`, `media.ts` (11 IDs + anchors), `Media.tsx` (lazy imports).
- Storage keys are course-specific: `philopilot.v2.cn5.*` and `philopilot.v2.cn6.*` for `progress`, `position`, `practice.<set>` and `media.<id>`.

## 4. Images awaiting approval (nothing downloaded)

> **Superseded (2026-11-08):** see `PHASE13B_IMAGE_APPROVAL_SHEET.md`. 王守仁致父书卷 is excluded by PO decision, the P.2179 date is verified (514), and 诗观 now uses volume 40. The evidence board now has the four PO-specified columns (see §6.1).

Metadata was re-read from the Commons API on 2026-11-08. A downloaded image goes in `public/media/cn5|cn6/` and gets a `SOURCES.md` entry.

**魏晋玄学与中国佛学**

| # | File | Direct URL | Institution / object / date | Original? | Licence / attribution | Placement / purpose |
|---|---|---|---|---|---|---|
| 1 ✔ | `The_Sixth_Patriarch_Cutting_the_Bamboo.jpg` | https://upload.wikimedia.org/wikipedia/commons/0/04/The_Sixth_Patriarch_Cutting_the_Bamboo.jpg | Tokyo National Museum (Commons credit); 六祖斫竹图, attributed to 梁楷; "Song Dynasty" | Photo of the original painting | CC BY-SA 4.0. "传梁楷《六祖斫竹图》，东京国立博物馆藏 / Wikimedia Commons，CC BY-SA 4.0" | 六, opening. How 禅 later pictured its founder; captioned as a later painting, not evidence about 惠能 |
| 2 ✔ | `The_Sixth_Patriarch_Tearing_a_Sutra.jpg` | https://upload.wikimedia.org/wikipedia/commons/3/38/The_Sixth_Patriarch_Tearing_a_Sutra.jpg | Mitsui Memorial Museum (Commons misspells it "Mitsu"); 六祖破经图, attributed to 梁楷; Song | Photo of the original | CC BY-SA 4.0, same format | 六, 「不立文字？」. The image of rejecting texts, set beside the chapter's paradox |
| 3 ✔ | `Cheng_shi_lun_成_實_論_(traduction_de_Kumārajīva)._-_btv1b8302845s_(15_of_15).jpg` | https://upload.wikimedia.org/wikipedia/commons/4/46/Cheng_shi_lun_%E6%88%90_%E5%AF%A6_%E8%AB%96_%28traduction_de_Kum%C4%81raj%C4%ABva%29._-_btv1b8302845s_%2815_of_15%29.jpg | BnF, Pelliot chinois 2179 (ark:/12148/btv1b8302845s); 成实论 in 罗什's translation; names 敦煌镇 and scribe 令狐崇哲. **Date not in metadata** | Original Dunhuang manuscript (BnF scan) | Public domain. "法国国家图书馆藏 P.2179" | 二, 鸠摩罗什. How translations circulated in hand copies. Take the date from the BnF record before captioning (Gallica refused automated access) |
| 4 (backup) | `Fragments._(Jin_gang_bo_re_bo_luo_mi_jing_trad._de_Kumārajīva)._-_btv1b8300499b.jpg` | https://upload.wikimedia.org/wikipedia/commons/6/69/Fragments._%28Jin_gang_bo_re_bo_luo_mi_jing_trad._de_Kum%C4%81raj%C4%ABva%29._-_btv1b8300499b.jpg | BnF, Pelliot chinois 5029 L 29; 金刚经 fragment (罗什), beginning and end missing | Original fragment | Public domain | Backup for #3 |
| hold | `GZDD035201001_壇經一卷.pdf` | https://upload.wikimedia.org/wikipedia/commons/0/07/GZDD035201001_%E5%A3%87%E7%B6%93%E4%B8%80%E5%8D%B7.pdf | 广州大典 reproduction "據國家圖書館藏本" of a 唐敦煌写本 | Printed facsimile of a manuscript | PD (tagged) | Hold: which Dunhuang copy it is must be confirmed, and a page extracted |

**宋明理学至清代**

| # | File | Direct URL | Institution / object / date | Original? | Licence / attribution | Placement / purpose |
|---|---|---|---|---|---|---|
| 1 ✔ | `Letter_on_Government_Affairs_-_Zhu_Xi.jpg` | https://upload.wikimedia.org/wikipedia/commons/8/89/Letter_on_Government_Affairs_-_Zhu_Xi.jpg | National Palace Museum, Taipei; 朱熹 letter (致會之知郡尺牘); 8th month of 绍熙五年, **1194** | Original autograph (museum image) | Public domain. "朱熹尺牘，台北故宫博物院藏" | 三, opening. A dated hand of the philosopher; the letter is about government business, a reminder that 朱熹 was an official |
| 2 ✔ | `Imperial_Encyclopaedia_-_Celestial_Signs_-_pic083_-_宋周子太極圖.png` | https://upload.wikimedia.org/wikipedia/commons/6/6d/Imperial_Encyclopaedia_-_Celestial_Signs_-_pic083_-_%E5%AE%8B%E5%91%A8%E5%AD%90%E5%A4%AA%E6%A5%B5%E5%9C%96.png | 古今图书集成 (陈梦雷), 1700–1725 | **Later work**, vectorised redrawing on Commons | Public domain. "《古今图书集成》所载宋周子太极图（Commons 重绘）" | 二, 太极图说. Shows the diagram the text explains; captioned as an 18th-century version, not 周敦颐's own drawing |
| 3 ✔ | `王守仁致父书卷.png` | https://upload.wikimedia.org/wikipedia/commons/d/d3/%E7%8E%8B%E5%AE%88%E4%BB%81%E8%87%B4%E7%88%B6%E4%B9%A6%E5%8D%B7.png | Palace Museum, Beijing, 文物号 新00151968, 法书, 明 (record read 2026-11-08; no exact date) | Original handscroll (scan); a crop is needed (8982×2160) | Commons: PD. **The museum page states "© 故宫博物院 版权所有 / 影像授权"** (see §6) | 四, 王阳明. A letter to his father, beside the 孝 workshop |
| 4 ✔ | `NLC892-412000006559-138525_詩觀初集_詩觀二集_詩觀二集閨秀別卷_第1冊.pdf` | https://upload.wikimedia.org/wikipedia/commons/f/fa/NLC892-412000006559-138525_%E8%A9%A9%E8%A7%80%E5%88%9D%E9%9B%86_%E8%A9%A9%E8%A7%80%E4%BA%8C%E9%9B%86_%E8%A9%A9%E8%A7%80%E4%BA%8C%E9%9B%86%E9%96%A8%E7%A7%80%E5%88%A5%E5%8D%B7_%E7%AC%AC1%E5%86%8A.pdf | National Library of China; 诗观, 清 邓汉仪 辑, with 闺秀别卷 | Original printed book (scan) | Public domain | 七, evidence of activity: women's poetry in print. Volume 1 starts with 初集; the volume and page holding the 闺秀别卷 must be found before use |
| 5 (backup) | `WUL-i17_00138_周子太極圖.pdf` | https://upload.wikimedia.org/wikipedia/commons/6/69/WUL-i17_00138_%E5%91%A8%E5%AD%90%E5%A4%AA%E6%A5%B5%E5%9C%96.pdf | Waseda University Library; publisher and date unknown | Japanese printed edition with 朱熹's notes | Public domain | Backup for #2 |
| optional | `White_Deer_Grotto_Academy.jpg` | https://upload.wikimedia.org/wikipedia/commons/4/43/White_Deer_Grotto_Academy.jpg | Flickr 武铁辆玻, 2010-09-07; 白鹿洞书院 gate | Modern photograph | CC BY-SA 2.0. "图：武铁辆玻 / Wikimedia Commons，CC BY-SA 2.0" | 三, optional; the manuscript does not discuss the academy |
| hold | `随园湖楼请业图2.jpg` | https://upload.wikimedia.org/wikipedia/commons/d/d4/%E9%9A%8F%E5%9B%AD%E6%B9%96%E6%A5%BC%E8%AF%B7%E4%B8%9A%E5%9B%BE2.jpg | Source "Internet"; artist given as 袁枚 (unreliable) | Detail of a painting, provenance unknown | PD (tagged) | Hold: an exact match for the 1790 gathering, but a holding institution is needed |

Rejected (unchanged from 13A): later imaginary portraits of all the philosophers in both courses; the Kizil statue of 鸠摩罗什; the redrawn 太极图 files with no source.

## 5. Validation

| # | Check | Result |
|---|---|---|
| 1 | `tsc --noEmit` and `npm run build` | **Pass.** Vite repeats its existing warning that the main chunk exceeds 1600 kB; the 11 new components are lazy chunks |
| 2 | Full rendering | All 8 + 9 parts and both appendices render. Blockquotes: 74 (CN5) and 103 (CN6), matching the manuscripts |
| 3 | Notes | References 1–21 and 1–32 appear in order in the text (53). The notes pages have `fn-def-1…32`. The footnote panel opens (note 26 tested) |
| 4 | Original-language blocks | All blockquotes present; the component quote script found 0 missing of 59 pieces |
| 5 | Tables and appendices | Tables render on every part that has them; 注释 and 来源与权利说明 are reachable as appendices outside progress |
| 6 | Nine components | All render at their anchors. An automated pass made ≈400 clicks across every control: 0 runtime errors, 0 console warnings, no anchor-not-found warnings |
| 7 | Concept map | Renders in CN5 六 and in the CN6 guide; filters and node selection work |
| 8 | Practice | 6 × 3 = 18 and 7 × 3 = 21 questions rendered; submit tested |
| 9 | Separate storage | Keys `cn5.*` and `cn6.*` are distinct. Answering a CN6 question left `cn6.progress` unchanged |
| 10 | Search | Course titles, part titles and section headings of both courses are found (知行合一, 僧肇, 女诫, 华严, 魏晋玄学, 宋明理学). English titles are not searchable, as for every existing course |
| 11 | Relationships and navigation | The course pages show next courses and cross-tradition links from the registry; unreleased ones are marked 原型未实现. The 人性与道德 question page lists both courses |
| 12 | Progress and resume | Real scrolling writes progress and position; the course page shows 已读 1% and 继续阅读, which returns to 一、… · 一个学生的经历 (block 8) |
| 13 | Desktop and mobile | No horizontal overflow in any component at 375 px. SVG labels scale down to about 7–9 px on phones (same approach as the earlier courses); every figure has a text equivalent |
| 14 | Keyboard and reduced motion | Radios work with arrow keys, SVG facets with Tab and Enter, the evidence board with buttons only. `data-motion='none'` and `prefers-reduced-motion` remove the only transition (张载 dots) |
| 15 | Regression on the 10 existing courses | **Pass.** CN1, CN2, CN3, CN4, EA4, IN1 and GR1–GR4: every part renders with a heading. Practice counts are 15/21/24/18/33/18/18/21/21/18 and footnote references 81/46/63/73/132/88/67/51/59/76. Existing components render, including CN4's 5 (rechecked with longer load time). 0 runtime errors. Course files for CN1–CN4 were not edited except CN1's next-course list |

## 6. Genuine blockers and PO decisions

1. **Evidence-board category 1.** The spec says "prescriptive statements by male authors", but two of the strongest prescriptive texts are by women (班昭《女诫》, 陆氏 on literacy). The column is therefore labelled 规范与议论 and subtitled 大多出自男性作者, and those cards explain the exception. The manuscript's fifth row (关于女性的争论: 李贽, 章学诚) is merged into this column. Keep this, or split it into five columns?
2. **王守仁致父书卷.** Commons tags it public domain, but the Palace Museum page asserts image rights. Decide whether to use the Commons file under PD-Art or to ask the museum.
3. **BnF P.2179 date.** The date must be read manually from the BnF record before captioning.
4. **CC BY-SA photographs of 梁楷 paintings.** The paintings are public domain, but the uploader licensed the photos CC BY-SA 4.0. The recommendation is to comply anyway (attribution and share-alike on the image file).
5. **Image downloads** (CN5 #1–#3; CN6 #1–#4) await authorisation.
6. No other blockers. Not done, by instruction: commit, push, deploy, CN7.

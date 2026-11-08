# CN5 制作报告：魏晋玄学与中国佛学：空、自然与顿悟

> Phase 13A deliverable. Companion to `content/CN5_SAMPLE_DRAFT.md`.
> Status: **manuscript complete, awaiting Product Owner acceptance.** Not integrated into the website. Nothing committed, pushed or deployed. No images downloaded. Phase 13B has not been started.

---

## 1. Structure and length

| Item | Value |
|---|---|
| File | `content/CN5_SAMPLE_DRAFT.md` |
| Size | 153,193 bytes, 1,219 lines |
| Chinese characters (CJK) | about 41,600 (including quoted classical text and notes) |
| Main parts | Guide + six parts + 批评与回应 + 注释 + 来源与权利说明 |
| Primary-text blockquotes | 74, each ending with `（《书·篇》）` as the parser requires |
| Tables | 9 |
| 想一想 placements | 6, one at the end of each part, each with 提示 |
| Notes | 21 (`[^1]`–`[^21]`) |

**Title and tier.** The spec calls the course 魏晋玄学与中国佛教：空性、自然与顿悟 and puts it in the "Extended" tier. The registry (`src/data/units.ts`) has 魏晋玄学与中国佛学：空、自然与顿悟 and marks it ● core. The manuscript uses the **registry title**, because learner-facing text must match the site, and it is written to core depth. **Product Owner decision needed:** confirm the title and the tier. If the tier is changed to Extended, nothing in the manuscript needs to change except the depth expectation.

**Part map** (H2 → main H3 sections; share is of total characters):

| Section | Main content | Share |
|---|---|---|
| 本章导读 | Eight guiding questions; one-sentence summary; seven reminders: 玄学 is not one school; Chinese Buddhism is neither "misunderstood Indian Buddhism" nor "Chinese thought in Buddhist dress"; a word-tracking table for 空 / 有 / 無 / 自然 / 心 / 性; a six-kind text-type table; quoting conventions; no practice guidance; how to use 想一想. Route table. | 7% |
| 一、玄学：王弼、郭象与"无" | The Wei-Jin setting; 王弼 and the two versions of the 裴徽 dialogue (三国志注 vs 世说新语); 以无为本 (Laozi 40, 11, 1); 体与用 (Laozi 38); 崇本息末 as political philosophy; 自然; 言、象、意 (周易略例·明象); "物无妄然，必由其理"; whether the sage has emotions; 郭象 and the 向秀 question; "無既無矣，則不能生有"; a comparison table of 王弼 and 郭象; 性分 and 逍遥; 名教与自然; 支遁's critique | 16% |
| 二、翻译与格义 | How Buddhism arrived; 格义 as a teaching method (竺法雅传); 道安 五失本、三不易; 僧叡 looking back; 鸠摩罗什; one word's journey from śūnyatā to 無 / 空 (the 中论 24.18 chain); 本无; is translation philosophy? | 12% |
| 三、僧肇：空不是虚无 | Life; 肇论 as a compiled book (宗本义 doubted); 不真空论 against three schools (table); the core 不有不无 argument; 幻化人; 名与实; 触事而真; 物不迁论 (梵志 story, 因果) and its three problems; 僧肇 vs Indian Madhyamaka (table); is emptiness nihilism? | 14% |
| 四、天台：空、假、中 | 智顗 and his works (灌顶's role); the 中论 verse as quoted in 摩诃止观; a doubter's question; are the three truths stages? (得别失圆); the mirror image and its limits; 一念三千 (neither 纵 nor 横); 一色一香无非中道; 教 and 观, 五时八教 (hedged); 天台 vs Indian Madhyamaka | 13% |
| 五、华严：整体与部分 | 法藏 and the retrospective "school"; 金师子章 (净源's 云间类解 text); 一即一切; 十玄; the rafter–house argument reconstructed in five steps and evaluated; 六相 (相即 does not erase difference); 四法界 as 澄观's later summary; what is specific to 华严; the limits of the metaphors | 11% |
| 六、禅：顿与渐、文字与见性 | How Chan history was written; the two verses (敦煌本 "佛性常清淨" vs 宗宝本 "本來無一物"); the mirror and wiping; what 坛经 itself says about 顿渐 ("法無頓漸，人有利鈍"); 竺道生's earlier 顿悟 in 王弼's language; 定慧一体 (lamp and light); 无念; 不立文字 and 坛经 as proof of lineage; 心、性 and the hand-off to CN6 | 12% |
| 批评与回应 | Three critiques with responses and open questions | 3% |
| 注释 / 来源与权利说明 | 21 notes; texts used; consulted and unread scholarship; uncertainties | 11% |

---

## 2. Primary texts and verification

**Method.** Every classical passage was fetched from Chinese Wikisource through its public API into a session-only cache (75 + 5 pages for CN5). None of it was saved to the repository. No ctext.org text was used. A script then checked each blockquote and each inline quotation containing traditional characters against the cached texts, after normalising to CJK characters only. Blockquotes split by "……" were checked segment by segment.

**Result (actual run on the file now in `content/`):**

| Check | Result |
|---|---|
| Blockquotes | **74 / 74 found verbatim** in the cited source |
| Inline traditional-character quotations | 63 found; **2 flagged, both expected**: "先舊格義，於理多違" is quoted *in order to say* it is missing from the Wikisource 高僧传 (note 6); "中論 (佛教)" is a Wikisource page title, not a quotation |
| Footnotes | refs 1–21 in order, all defined, none unused |

**Texts used** (all from Wikisource; editions mostly unlabelled there): 王弼《老子注》(華亭張氏原本) and 《周易略例》; 《三国志》卷二十八 with 裴注引何劭《王弼传》; 郭象注 from 《南华真经注疏》(郭象注、成玄英疏) 卷一–四; 《世说新语》with 刘孝标注; 《晋书》卷五十; 《出三藏记集》; 梁《高僧传》; 鸠摩罗什译《中论》with 青目释; 《肇论》 (all pages); 《摩诃止观》卷一、三、五; 《华严金师子章》(净源 云间类解, simplified); 《华严一乘教义分齐章》(simplified); 《华严经义海百门》; 《华严法界玄镜》; 宗宝本 and 敦煌本《坛经》; 《禅源诸诠集都序》.

**Text-critical points stated in the manuscript:**
1. **中论 24.18.** The Wikisource verse reads "我說即是無"; 青目's prose reads "我說即是空". 智顗 quotes "我說即是空". The course uses this difference as evidence about translation, and says the Taishō text was not checked directly (note 8).
2. **僧光传.** The commonly quoted "先舊格義，於理多違" is absent from the Wikisource 高僧传 text, so it is not quoted (note 6).
3. **物不迁论** has "梵誌" in Wikisource (通行本 "梵志"); quoted as fetched.
4. **金师子章** is quoted from 净源's 1080 commentary edition. "……" marks where the commentary was skipped.
5. **坛经.** "本來無一物" appears only in 宗宝本 (1291 跋); the 敦煌本 verse has "佛性常清淨".
6. **宗本义** authorship is doubted (note 10).
7. **Two rejected source pages.** The 南華真經注疏 page first fetched was 程以甯's edition, and the first 老子 page was 憨山's. Both were replaced with the correct 郭象 and 王弼 texts before any quotation was made.

**Not verified.** No Sanskrit, Pali or Tibetan text was checked. The Taishō edition and modern critical editions (楼宇烈, 郭庆藩, 余嘉锡, 汤用彤, 杨曾文, 郭朋) were not consulted; the sources note lists them for a final pass.

---

## 3. Arguments

The manuscript reconstructs these arguments explicitly, with objections:

| Part | Argument | Treatment |
|---|---|---|
| 一 | 王弼: 無 is not a thing but the condition of use (Laozi 11) | Reconstructed. The "something that generates" reading is rejected, with the reason. |
| 一 | 郭象: "無既無矣，則不能生有" — a dilemma against a creator | Reconstructed; asks whether the dilemma misses options |
| 一 | 郭象 性分 / 逍遥一也 | Strength (pluralism) vs danger (acquiescence); 支遁's counter-reading |
| 二 | 道安 五失本 / 三不易 | Sorted by level (style, structure, audience) |
| 二 | Translation as philosophy | Open question; the 無 / 空 verse as the test case |
| 三 | 不真空: "物從因緣故不有，緣起故不無" | Two halves, each with its premise |
| 三 | 幻化人 | What the metaphor shows (appearance without reality) and does not (no magician) |
| 三 | 物不迁 and causation ("因不昔滅…因不來今") | Evaluated as partial |
| 四 | 三谛 as simultaneous aspects, not stages ("得別失圓") | Text-based |
| 四 | 一念三千 is neither 纵 (mind generates) nor 横 (mind contains) | Text-based |
| 五 | 椽即是舍 | Reconstructed in five steps; the two weak points named (the "intact house" definition; generalisation to the cosmos) |
| 五 | 六相: 相即 does not erase difference | Text-based |
| 六 | 法無頓漸，人有利鈍 | Used against the 南顿北渐 narrative |
| 六 | 定慧一体 (lamp / light) | Prepares the CN6 comparison with 知行合一 |

---

## 4. Terminology decisions

- **空 / 無 / 有 / 自然 / 心 / 性** are tracked in a table in the 导读 and revisited in Part 六 (心、性与下一门课). The key point is that 性 is *negated* in Madhyamaka (自性) but *affirmed* in 佛性 / 见性.
- **"玄学"** is introduced as a later umbrella term, not a school. "Neo-Daoism" is mentioned only with a caution.
- **"格义"** is defined narrowly from the 竺法雅传 text, with the scholarly debate in note 6.
- **"中国化"** is avoided as an explanation. The manuscript says "建构" and "选择" and argues that 天台 / 华严 / 禅 thinkers chose among Indian sources.
- **"宗"** for 天台宗 / 华严宗 / 禅宗 is used with a note that the lineages (五祖 etc.) are retrospective.
- **Names:** 智顗 (not 智𫖮); 惠能 in both versions; 鸠摩罗什 / 罗什.
- **Course cross-references** use registry course names, never codes.

---

## 5. Critiques & Responses decision

**Included**, with three critiques. Each crosses several parts and would otherwise be scattered:
1. "Chinese Buddhism misunderstood Indian Buddhism" (本觉 and 佛性 vs 无我 / 空).
2. "玄学 and Buddhism were 空谈 detached from reality" (清谈亡国). This one deliberately leads into CN6.
3. "圆融 abolishes the distinction between good and evil."

Each has a 回应 and a 仍然存在的问题 paragraph. Disputes that belong inside one part (王弼 vs 郭象, the 三谛 readings, the 顿渐 texts) stay inside that part.

---

## 6. Media proposals

Four components are proposed, in priority order **A > B > D > C**. None is implemented.

**Shared constraints:** no network calls or external libraries; respect `prefers-reduced-motion`; convey everything in text as well as colour; keyboard-operable; each degrades to the manuscript's static table or quotation.

### A. 概念旅行图 (Concept journey map) — shared with CN6

- **Location.** 导读 (after the word-tracking table) and again in Part 六 "心、性与下一门课". CN6 reuses the same component with its own data (§11).
- **Objective.** Show how one character carries different, sometimes opposite, meanings across texts. The concrete case is 性: 郭象 性分 → negated 自性 → affirmed 佛性 / 见性 → 性即理 (CN6).
- **Visual form.** An SVG timeline with rows for 空 / 無 / 自然 / 心 / 性 and columns for texts in date order. Each cell is a short gloss plus a polarity tag (肯定 / 否定 / 中性) in text, not only colour.
- **Interaction.** Tap a row to expand its cells. Tap a cell to see the exact quotation and its citation. A "只看'性'" filter.
- **Feedback.** The cell's quotation, plus one line on whether the link to the next cell is **documented influence** or **later comparison**. This is the key safeguard against implying derivation.
- **Safeguards.** Only quotations already in the manuscript; no invented glosses. Every inter-cell arrow is labelled 影响（有文献证据） or 比较（本课的解释）.
- **Mobile / desktop.** Mobile: one row at a time, with cells as a vertical list. Desktop: the full grid with horizontal scroll.
- **Minimal implementation.**
  - Static data: `{term, cells: [{text, date, gloss, polarity, quote, cite, linkToNext: 'influence'|'comparison'|null}]}[]`.
  - One React component; an SVG grid with computed positions.
  - About 180 lines of code.

### B. 一首偈的四个版本 (One verse, four versions)

- **Location.** Part 二 "一个词的旅行", with a back-link from Part 四 "从一首偈开始".
- **Objective.** Make the 中论 24.18 chain concrete: 罗什 verse (無) → 青目 commentary (空) → 智顗 quotation (空, plus 假名 / 中道) → 僧肇's paraphrase ("物從因緣故不有，緣起故不無").
- **Visual form.** Four stacked text cards, with the varying character highlighted (underline plus label). A margin note on each says which layer it is (translation / commentary / later quotation / paraphrase).
- **Interaction.** A "highlight differences" toggle. Tap a highlighted character to see the note on what a reader trained in 王弼 might hear in 無.
- **Feedback.** Static notes only; no grading.
- **Safeguards.** States that the Sanskrit and Taishō text were not checked (note 8). No Sanskrit is displayed.
- **Mobile / desktop.** Cards stack on both; desktop shows the notes in a right margin.
- **Minimal implementation.** Static array of four `{layer, text, cite, highlights[]}`; about 90 lines of code.

### C. 椽与舍 (Rafter and house)

- **Location.** Part 五, after 「椽和房子：一个论证」.
- **Objective.** Let learners test 法藏's argument: remove a rafter and decide whether what remains is "the house"; see the 六相 labels.
- **Visual form.** A simple SVG house front with eight numbered rafters, tiles and pillars.
- **Interaction.** Tap a rafter to remove or restore it. A two-way toggle: "破舍也是舍" / "只有好舍才是舍".
- **Feedback.**
  - Under "只有好舍才是舍", removing one rafter shows "不再是这座房子" and highlights steps 2–3 of the reconstruction.
  - Under the other toggle, the display shows that step 3 fails.
  - The 六相 panel labels the selected part (别相, 异相…).
- **Safeguards.** Says plainly that this tests the argument's premise, and that 法藏's purpose was contemplative. No claim that the cosmos is like a house.
- **Mobile / desktop.** Mobile: house on top, explanation below. Desktop: side by side.
- **Minimal implementation.** About 140 lines; React state `removed:Set<number>`, `definition:'strict'|'loose'`.

### D. 两首偈的比较 (Comparing the verses)

- **Location.** Part 六, after 「两首偈：敦煌本和宗宝本」.
- **Objective.** Show that the famous line is version-dependent. Compare 神秀 / 惠能 (敦煌本) / 惠能 (宗宝本), with the mirror image.
- **Visual form.** Three columns of verse text, with 佛性常清淨 vs 本來無一物 aligned on one row. A small mirror icon row shows 拂拭 / 本净 / 无物.
- **Interaction.** Toggle the 宗宝本 column on or off; tap the aligned row for the note.
- **Feedback.** The note explains the different positions (affirming an originally pure nature vs not affirming even that) and the 1291 date of 宗宝本.
- **Safeguards.** No ranking of the verses; no "correct" one.
- **Mobile / desktop.** Mobile: tabbed columns. Desktop: three columns.
- **Minimal implementation.** Static data; about 80 lines.

**Not recommended:** a map of Buddhism's transmission routes. Route details would need sources the course did not read, and a map tends to imply more certainty than the evidence allows.

---

## 7. Practice data and counts

**Model.** V7 `PracticeSet` from `src/content/practice.ts`. Six sets, one per 想一想, labelled 一 to 六; three questions each; **18 questions**. No typed answers. Contested questions are `view` and never graded. The data is independent of every other course.

**Typecheck.** `tsc --noEmit --strict --target es2020 --module esnext --moduleResolution bundler` against a copy of `practice.ts`: **passes** (actual run). The file is held in the scratchpad (`tc/practice-cn5.ts`) and has **not** been added to `src/`.

| Type | Count | Answer distribution |
|---|---|---|
| `single` | 7 | A 1 · B 2 · C 2 · D 2; order c, a, d, b, b, c, d (no fixed pattern) |
| `multi` | 3 | [b,d] · [a,b,d] · [a,c]: different sizes and positions |
| `tf` | 3 | false, true, false |
| `view` | 5 | ungraded |

| Set | Questions |
|---|---|
| 一 | cn5-1-1 single **c** (王弼's 無 as condition) · cn5-1-2 single **a** (郭象 against a generating 无) · cn5-1-3 **view** (逍遥一也) |
| 二 | cn5-2-1 multi **[b,d]** (scope of 格义) · cn5-2-2 tf **false** (無 / 空 in 中论) · cn5-2-3 **view** (translation as philosophy) |
| 三 | cn5-3-1 single **d** (不有不无) · cn5-3-2 tf **true** (宗本义 doubted) · cn5-3-3 single **b** (幻化人) |
| 四 | cn5-4-1 single **b** (三谛 not stages) · cn5-4-2 multi **[a,b,d]** (一念三千) · cn5-4-3 **view** (无道可修 vs ten fascicles) |
| 五 | cn5-5-1 single **c** (六相) · cn5-5-2 tf **false** (四法界 is 澄观's) · cn5-5-3 **view** (limits of metaphors) |
| 六 | cn5-6-1 single **d** (two versions of the verse) · cn5-6-2 multi **[a,c]** (法无顿渐) · cn5-6-3 **view** (不立文字 vs lineage proof) |

Every answer and note was checked against the manuscript text; two draft explanations that went beyond the manuscript were rewritten before the typecheck.

Full data:

```ts
import type { PracticeSet } from './practice';

// 魏晋玄学与中国佛学：空、自然与顿悟 — one set per 想一想 block (一 … 六).
// Contested questions are 'view' and are never marked right or wrong.

export const CN5_PRACTICE: PracticeSet[] = [
  {
    label: '一',
    lede: '三道题：王弼的"无"是不是一种东西，郭象反对什么，以及"逍遥一也"的力量和危险。',
    questions: [
      {
        id: 'cn5-1-1',
        type: 'single',
        stem: '王弼注《老子》第十一章，用车毂中间的空处、器皿里面的空间、房间里的空地来说明"無"。这里的"無"最好理解为什么？',
        options: [
          { id: 'a', text: '一种看不见的、比万物更早存在的特殊物质', note: '这正是王弼要避免的理解：如果"无"是一种东西，它就成了另一种"有"。' },
          { id: 'b', text: '什么都没有，所以车、器、房其实都不存在', note: '王弼没有否认车、器、房的存在；他说的是它们靠什么起作用。' },
          { id: 'c', text: '使事物能够起作用的条件，它本身不是一样东西', note: '对。没有空处，车轮转不起来，碗盛不了水；"无"是"有"能"以為用"的条件，不是又一件东西。' },
          { id: 'd', text: '道家用来反对儒家礼教的口号', note: '王弼把孔子看作最高的圣人；"以无为本"是关于根本的哲学主张，不是反儒的口号。' },
        ],
        answer: 'c',
        explain: '王弼说"有之所以為利，皆賴無以為用"。"无"始终在"有"之中起作用，而不是先出现、再退场的东西。',
      },
      {
        id: 'cn5-1-2',
        type: 'single',
        stem: '郭象说"無既無矣，則不能生有"。他反对的是哪一种想法？',
        options: [
          { id: 'a', text: '有一个"无"或"造物者"在万物之前，把万物产生出来', note: '对。郭象认为，"无"既然是无，就不能产生任何东西；而"有"也不能产生所有的"有"。所以万物是"自生"的。' },
          { id: 'b', text: '万物各有自己的"性分"', note: '这是郭象自己的主张，不是他反对的。' },
          { id: 'c', text: '圣人可以身在庙堂而心在山林', note: '这也是郭象自己的说法（"廟堂之上"一段）。' },
          { id: 'd', text: '语言不能完全表达意义', note: '这是王弼"言、象、意"讨论的问题，和这句话无关。' },
        ],
        answer: 'a',
        explain: '这句话针对的是把"无"理解为能生出万物的东西的读法，常被看作对"以无为本"的一种通俗理解的批评。王弼本人的"无"不是这种东西，所以两人的分歧比表面上更微妙。',
      },
      {
        id: 'cn5-1-3',
        type: 'view',
        stem: '郭象说，大鹏和小鸟只要各自满足于自己的"性分"，"小大雖殊，逍遙一也"。你怎样评价这个说法？',
        options: [
          { id: 'a', text: '主要是一种解放：每一种存在都有自己的价值，不必和别人比较', note: '优点：它反对用一个统一的标准衡量所有的人和物，给"小"的存在以尊严。代价：它没有说明，当一个人的处境是别人强加的时候，"满足于性分"是不是还是一种自由。' },
          { id: 'b', text: '主要是一种危险：它可能被用来让人安于不公正的地位', note: '优点：它看到了"各安其分"在等级社会中的政治用途。代价：它可能忽视郭象把"性分"理解为天生的分限，而不是社会地位；把两者等同需要额外的论证。' },
          { id: 'c', text: '两者都有：关键在于把"各有价值"和"不应改变"分开', note: '优点：它既保留了郭象对多样性的肯定，又指出了从中推出"不应改变"是一个额外的、需要论证的步骤。代价：它要求读者自己划出界线，郭象的文本本身并没有替我们划。' },
        ],
        explain: '这是一个开放的问题。僧人支遁当时就批评说，只是"有欲当其所足"，就像饿了吃饱、渴了喝足，并不是真正的逍遥。',
      },
    ],
  },
  {
    label: '二',
    lede: '三道题："格义"的范围，《中论》一首偈的"无"和"空"，以及翻译能不能算哲学。',
    questions: [
      {
        id: 'cn5-2-1',
        type: 'multi',
        stem: '关于"格义"，本课的讨论支持下面哪些说法？（选出所有正确的）',
        options: [
          { id: 'a', text: '早期中国的佛经翻译都采用了格义的方法', note: '不对。《高僧传》的记载只涉及少数几位教师的讲解方法；"所有早期翻译都是格义"是二十世纪的推广。' },
          { id: 'b', text: '据《高僧传》，格义是竺法雅等人讲解佛经时，把佛经的名目和中国书中的概念相配的方法', note: '对。这是我们关于格义最直接的记载，它说的是一种讲解和教学的方法。' },
          { id: 'c', text: '鸠摩罗什以后，中文佛经就不再使用"无""自然"等原有的中文词了', note: '不对。罗什的译本仍然使用大量原有的中文词；他的《中论》偈颂就作"我說即是無"。' },
          { id: 'd', text: '关于格义的范围和重要性，现代学者之间有争论', note: '对。有学者认为它被过度夸大了，只是少数教师短暂使用的方法。' },
        ],
        answer: ['b', 'd'],
        explain: '"格义—纠正"的叙事有一点道理（道安、僧叡确实批评过旧的讲解方式），但它把一种教学方法扩大成了整个早期翻译的性质。',
      },
      {
        id: 'cn5-2-2',
        type: 'tf',
        stem: '判断：在维基文库所载鸠摩罗什译《中论》第二十四品中，偈颂和青目的注释（长行）都作"我說即是空"。',
        answer: false,
        wrong: '不对。文库本的偈颂作"我說即是無"，青目释作"我說即是空"。后来中国学者（包括智顗）多引作"我說即是空"。对熟悉玄学的读者来说，"無"字很容易被读成王弼的"无"。',
        explain: '同一首偈在同一部书中用了两个不同的字，这正好说明翻译用字怎样可能把读者引向不同的哲学背景。',
      },
      {
        id: 'cn5-2-3',
        type: 'view',
        stem: '翻译是不是一种哲学活动？',
        options: [
          { id: 'a', text: '是：选择用"无"还是"空"翻译一个概念，本身就是一个哲学判断', note: '优点：它看到了翻译者必须理解原意、并在目标语言的概念网中作出选择。代价：如果一切翻译都是哲学，"哲学"这个词就可能失去区分力。' },
          { id: 'b', text: '不是：翻译的目标是忠实，哲学的目标是论证，两者不同', note: '优点：它保留了忠实这个标准，提醒我们译者不应把自己的思想加进去。代价：它很难解释道安所说的"五失本"：有些"失本"是无法避免的，译者必须作出判断。' },
          { id: 'c', text: '有时是：当原文的概念在目标语言中没有对应时，翻译就成了哲学', note: '优点：它区分了日常的翻译和需要创造概念的翻译。代价：哪些情况算"没有对应"，本身又是一个需要判断的问题。' },
        ],
        explain: '本课认为，至少在佛教来华的情况下，翻译和哲学创造很难分开；但这不是唯一合理的看法。',
      },
    ],
  },
  {
    label: '三',
    lede: '三道题：僧肇的"不有不无"，《肇论》的文本问题，以及幻化人的比喻。',
    questions: [
      {
        id: 'cn5-3-1',
        type: 'single',
        stem: '僧肇说"物從因緣故不有，緣起故不無"。这句话的意思最接近哪一项？',
        options: [
          { id: 'a', text: '万物既不存在，也不不存在，所以无法讨论', note: '僧肇并没有说万物无法讨论；两半各有清楚的理由。' },
          { id: 'b', text: '万物有时存在，有时不存在', note: '这是时间上的交替，不是僧肇的意思；两半说的是同一事物的两个方面。' },
          { id: 'c', text: '万物的根本是"无"，所以它们不是真有', note: '这接近僧肇批评的"本无"派"好無"的立场。' },
          { id: 'd', text: '万物依赖因缘，所以不是真有（没有自性）；万物又确实因缘而起，所以也不是虚无', note: '对。"不有"和"不无"的理由都是"因缘"：同一个事实同时排除了"真有"和"真无"。' },
        ],
        answer: 'd',
        explain: '这就是"不真空"：万物"不真"，所以说"空"；但"空"不等于什么都没有。',
      },
      {
        id: 'cn5-3-2',
        type: 'tf',
        stem: '判断：《肇论》是后人编成的书，其中《宗本义》等篇是否出自僧肇之手，学者有怀疑。',
        answer: true,
        wrong: '这个说法是对的。维基文库的《肇论》分为慧达序、宗本义、物不迁论、不真空论、般若无知论、奏秦王表、涅槃无名论等页面；《宗本义》《涅槃无名论》的作者问题，学者讨论过。',
        explain: '读《肇论》时，最好把《不真空论》《物不迁论》《般若无知论》看作最可靠的部分。',
      },
      {
        id: 'cn5-3-3',
        type: 'single',
        stem: '僧肇引《放光般若经》"非無幻化人，幻化人非真人也"。这个比喻最能说明什么？',
        options: [
          { id: 'a', text: '世界是某个魔术师有意制造的假象', note: '比喻的这一面僧肇没有用到；没有一个"制造者"。这是比喻的限度，不是它的要点。' },
          { id: 'b', text: '一样东西可以确实显现、被看见，却不是"真"的（没有自性）', note: '对。说幻化人"不存在"不对，说它是"真人"也不对；这正是"不真"和"不存在"的区别。' },
          { id: 'c', text: '人的感官总是欺骗我们，所以我们什么都不能知道', note: '僧肇并不主张怀疑论；他讨论的是事物的存在方式，不是认识的可靠性。' },
          { id: 'd', text: '幻化人和真人没有任何区别', note: '恰恰相反：比喻的关键在于幻化人"非真人"。' },
        ],
        answer: 'b',
        explain: '一个好的比喻只用来说明一点。这个比喻说明的是"显现而不真实"，而不是"谁在制造假象"。',
      },
    ],
  },
  {
    label: '四',
    lede: '三道题：三谛是不是三个阶段，"一念三千"的两种误读，以及天台的判教。',
    questions: [
      {
        id: 'cn5-4-1',
        type: 'single',
        stem: '《摩诃止观》批评把"即空即假即中"理解为"三種邐迤各各有異"，说这种理解"得別失圓"。智顗要强调的是什么？',
        options: [
          { id: 'a', text: '空、假、中是修行的三个阶段，必须依次完成', note: '这正是"邐迤"（一个接一个）的理解，智顗认为它只得到了"别教"的理解。' },
          { id: 'b', text: '空、假、中是同一事物同时成立的三个方面，彼此相即', note: '对。在"圆"的理解中，三谛不是三个先后的阶段，而是在同一念、同一法上同时成立。' },
          { id: 'c', text: '只有"空"是真的，"假"和"中"都是方便说法', note: '天台恰恰反对只取"空"一面；"假"和"中"不是可有可无的。' },
          { id: 'd', text: '三谛之说和《中论》毫无关系', note: '智顗正是从《中论》第二十四品的偈子出发的，尽管他的解释超出了印度中观学。' },
        ],
        answer: 'b',
        explain: '"别"和"圆"是天台判教中的两种教法；同一组词，可以有"别"的理解和"圆"的理解。',
      },
      {
        id: 'cn5-4-2',
        type: 'multi',
        stem: '关于"一念三千"，下面哪些说法符合《摩诃止观》卷五的文字？（选出所有正确的）',
        options: [
          { id: 'a', text: '智顗否认"從一心生一切法"（"纵"）', note: '对。心在前、万物在后的生成关系被明确排除了。' },
          { id: 'b', text: '智顗否认"心一時含一切法"（"横"）', note: '对。心像一个容器装着一切法，这种理解也被排除了。' },
          { id: 'c', text: '"一念三千"说明心是万物的原因', note: '不对。这正是被否定的"纵"的理解。' },
          { id: 'd', text: '智顗说"秖心是一切法。一切法是心"', note: '对。心和一切法的关系是"即"，既非纵也非横。' },
        ],
        answer: ['a', 'b', 'd'],
        explain: '所以"一念三千"不是一种唯心论的宇宙生成论。它说的是心和一切法相即的关系。',
      },
      {
        id: 'cn5-4-3',
        type: 'view',
        stem: '天台说"無苦可捨""無道可修"，却又用十卷讲修行方法。你怎样看这个张力？',
        options: [
          { id: 'a', text: '不矛盾："無道可修"是圆满的观照中的说法，对尚未觉悟的人，修行仍然必要', note: '优点：它符合天台区分不同层次的说法方式。代价：它需要解释，"层次"的区分本身是不是又引入了一种先后，和"圆"的立场有紧张。' },
          { id: 'b', text: '有真正的张力：如果一切本来圆满，修行的理由就变得不清楚', note: '优点：它认真对待了文字的字面意思，也连接到"圆融是否取消善恶"的问题。代价：它可能忽视宗教文本常常用悖论来引导修行者。' },
          { id: 'c', text: '这是一种修辞策略：用否定修行来破除对修行的执着', note: '优点：它解释了为什么同一部书既讲修行又否定修行。代价：如果一切都可以读成"破执"的修辞，就很难说文本在主张什么。' },
        ],
        explain: '这也是下一门课的问题之一：理学家批评佛教时，常常指向这一类"圆融"的说法。',
      },
    ],
  },
  {
    label: '五',
    lede: '三道题：金狮子与"不真空"，"四法界"的来历，以及比喻的限度。',
    questions: [
      {
        id: 'cn5-5-1',
        type: 'single',
        stem: '法藏用"六相"（总、别、同、异、成、坏）说明一座房子和它的椽子。"六相"中的"异相""坏相"最主要是为了说明什么？',
        options: [
          { id: 'a', text: '房子迟早会坏，所以一切都是无常的', note: '"坏相"在这里不是指房子坍塌，而是指每个部分各住自己的位置、不变成别的部分。' },
          { id: 'b', text: '椽子和瓦其实是同一样东西', note: '这恰恰是"异相"要否定的：椽子是椽子，瓦是瓦。' },
          { id: 'c', text: '部分和整体相即，但各个部分的差别并不因此消失', note: '对。"一即一切"不是把一切变成一团；每个部分仍然"各住自位"。' },
          { id: 'd', text: '整体只是部分的简单加总', note: '法藏正是反对这种"加总"的理解（"非少力并全成"）。' },
        ],
        answer: 'c',
        explain: '这是理解华严思想最重要的一点：相即并不取消差别。',
      },
      {
        id: 'cn5-5-2',
        type: 'tf',
        stem: '判断："事法界、理法界、理事无碍法界、事事无碍法界"这"四法界"之说，是法藏在《金师子章》中提出的。',
        answer: false,
        wrong: '不对。"四法界"之说出自比法藏晚的澄观（见《华严法界玄镜》）。用它来概括法藏的思想，是一种后来的总结。',
        explain: '区分"原始文本"和"后来的总结"，是本课反复强调的方法。',
      },
      {
        id: 'cn5-5-3',
        type: 'view',
        stem: '金狮子、椽和房子这些比喻，能在多大程度上说明"一即一切"？',
        options: [
          { id: 'a', text: '很好地说明了：它们展示了部分和整体互相规定身份的关系', note: '优点：椽子离开房子只是木头，这确实揭示了一种常被忽略的依赖关系。代价：从一座房子推广到整个宇宙，需要额外的论证。' },
          { id: 'b', text: '只说明了一部分：它们依赖"完好的这座房子"这个很强的定义', note: '优点：它指出了论证的关键步骤（破房子还算不算房子）。代价：它可能低估了法藏的目的：比喻本来就是为修行者"指月"，不是证明。' },
          { id: 'c', text: '比喻在这里不是论证，而是引导观照的方法', note: '优点：它符合《金师子章》作为讲解文本的性质。代价：如果比喻不承担论证的责任，我们就很难评价华严的主张是否成立。' },
        ],
        explain: '本课把比喻当作哲学论证来分析，同时承认它们原本有修行上的用途。',
      },
    ],
  },
  {
    label: '六',
    lede: '三道题：两个版本的惠能偈，"法无顿渐"，以及"不立文字"的文本。',
    questions: [
      {
        id: 'cn5-6-1',
        type: 'single',
        stem: '关于惠能那首有名的偈子，下面哪一项说法是准确的？',
        options: [
          { id: 'a', text: '"本來無一物"在所有版本的《坛经》中都有', note: '不对。敦煌本中没有这一句。' },
          { id: 'b', text: '敦煌本和宗宝本的偈子完全相同，只是字体不同', note: '不对。两个版本在关键的一句上不同，意思也不同。' },
          { id: 'c', text: '"本來無一物"是神秀的偈子', note: '不对。神秀的偈子是"時時勤拂拭"那一首。' },
          { id: 'd', text: '敦煌本的对应位置作"佛性常清淨"，"本來無一物"见于后来的宗宝本', note: '对。一句肯定有一个本来清净的佛性，一句连这个也不肯定，两者的思路不同。' },
        ],
        answer: 'd',
        explain: '最有名的禅宗名句，并不见于较早的版本。这提醒我们：禅宗的历史在很大程度上是由后来的文本写成的。',
      },
      {
        id: 'cn5-6-2',
        type: 'multi',
        stem: '敦煌本《坛经》说"法無頓漸，人有利鈍"。这句话对"南顿北渐"的说法有什么影响？（选出所有正确的）',
        options: [
          { id: 'a', text: '它说顿渐的区别在于人，而不在于法', note: '对。法本身没有顿渐，顿渐取决于听法者的根器。' },
          { id: 'b', text: '它证明了神秀一派主张渐修，惠能一派主张顿悟', note: '不对。这句话恰恰削弱了把两派截然对立起来的说法。' },
          { id: 'c', text: '它说明"南顿北渐"这样两个阵营对立的叙事过于简单', note: '对。《坛经》本身并不把顿和渐看作两种对立的法。' },
          { id: 'd', text: '它说明敦煌本《坛经》不是禅宗的文献', note: '没有根据。敦煌本正是现存最早的《坛经》版本之一。' },
        ],
        answer: ['a', 'c'],
        explain: '"南顿北渐"的说法，很大程度上来自神会等人后来的论争。',
      },
      {
        id: 'cn5-6-3',
        type: 'view',
        stem: '《坛经》一派讲"不立文字"（宗宝本跋说"此經非文字也"），这部书却又被当作传法的凭证。你怎样理解这个情况？',
        options: [
          { id: 'a', text: '这是矛盾：一部讲"不立文字"的书，自己成了权威的文字', note: '优点：它直接指出了宗派文献的一个真实张力。代价：它可能把"不立文字"读得太字面，忽视了它反对的是执着文字，而不是使用文字。' },
          { id: 'b', text: '不矛盾："不立文字"指觉悟不依赖文字，但传承和组织仍然需要文本', note: '优点：它区分了觉悟的内容和宗派的制度。代价：它承认了一部书在宗派中的作用远不只是传达思想，这正是需要解释的地方。' },
          { id: 'c', text: '这说明了一部书除了传达思想，还有凭证、认同和权威的功能', note: '优点：它把问题从"是否矛盾"转到"书在宗教共同体中做什么"。代价：它不再讨论"不立文字"本身是否站得住。' },
        ],
        explain: '这个问题和第一部分王弼的"得意忘象"、"得意忘言"有关：语言和形象是到达意义的工具，又可能成为障碍。',
      },
    ],
  },
];
```

---

## 8. Image candidates and rights

**Nothing has been downloaded.** Metadata was read from the Wikimedia Commons API (`imageinfo` / `extmetadata`) on 2026-11-08. Recheck the file page at download time and record each image in `public/media/cn5/SOURCES.md`.

| # | Candidate | Commons file | Licence (as stated) | Identity / date / provenance | Placement | Verdict |
|---|---|---|---|---|---|---|
| 1 | 六祖斫竹图 (Sixth Patriarch Cutting Bamboo), attributed to 梁楷 | `File:The Sixth Patriarch Cutting the Bamboo.jpg` (636×1392) | **CC BY-SA 4.0**, attribution required | Artist "Liang Kai"; date "Song Dynasty"; credit "Tokyo National Museum, Japan" | Part 六, opening | **Recommended.** Caption "传梁楷" and the museum name. The photo of a 13th-century painting carries the uploader's CC licence; comply with it anyway. |
| 2 | 六祖破经图 (Sixth Patriarch Tearing a Sutra), attributed to 梁楷 | `File:The Sixth Patriarch Tearing a Sutra.jpg` (648×1492) | **CC BY-SA 4.0** | Artist "Liang Kai"; "Song Dynasty"; credit "Mitsui Memorial Museum, Japan" | Part 六, 「不立文字？」 | **Recommended.** It illustrates the image of 不立文字; the caption must say it is a later painting, not evidence about 惠能. |
| 3 | Dunhuang manuscript of 成实论 in 鸠摩罗什's translation | `File:Cheng shi lun 成 實 論 (traduction de Kumārajīva). - btv1b8302845s (15 of 15).jpg` (3496×2100) | **Public domain** | BnF, Pelliot chinois 2179 (ARK given). The description names 敦煌镇 and the scribe 令狐崇哲. | Part 二, 鸠摩罗什 | **Recommended.** It shows how 罗什's translations circulated in hand copies. The exact date must be taken from the BnF record before captioning. |
| 4 | Dunhuang fragment of the 金刚经 (罗什 translation) | `File:Fragments. (Jin gang bo re bo luo mi jing trad. de Kumārajīva). - btv1b8300499b.jpg` | **Public domain** | BnF, Pelliot chinois 5029 L 29; beginning and end missing | Part 二 (backup) | Backup for #3 |
| 5 | 坛经一卷, Tang Dunhuang manuscript (reproduction) | `File:GZDD035201001 壇經一卷.pdf` | **Public domain** (tagged) | From the 广州大典 database; described as a 唐敦煌写本 reproduced "據國家圖書館藏本". | Part 六, two-versions section | **Hold.** The manuscript discusses the two Dunhuang copies named in its sources. Which copy this is (and whether it is complete) must be confirmed before use. Extracting one page would also be a derived file. |
| 6 | 唐写本世说新书 | `File:SSID-13369739 唐寫本世說新書.pdf` | Public domain (tagged) | No date or credit in the metadata; it is a scan of a reproduction | Part 一 | **Not recommended** until a holding-institution source is found |

**Rejected:**
- Portraits of 王弼, 郭象, 僧肇, 智顗 or 法藏: none is contemporary, and identities are conventional.
- The modern statue of 鸠摩罗什 at Kizil (`File:Kumarajiva at Kizil Caves, Kuqa.jpg`). It is a modern work, so freedom-of-panorama and copyright status would need checking, and it adds nothing to the argument.
- Images of 慧远 (later imaginative portraits and modern statues).

**Searched, nothing suitable found:** a Tang manuscript of the 华严经; a 金师子章 manuscript. Component C (§6) draws its own SVG, so Part 五 needs no image.

**Attribution format** for CC BY-SA files: "图：作者 / 收藏机构 / Wikimedia Commons，CC BY-SA 4.0".

---

## 9. Academic uncertainties

1. **王弼–裴徽 dialogue.** It survives in two versions (三国志注 vs 世说新语), and which is earlier cannot be decided (note 2).
2. **郭象 and 向秀.** The plagiarism charge comes from 世说新语; 晋书 卷四十九 was not checked (note 4).
3. **格义.** Its scope follows the Wikipedia *Geyi* summary of Chen Yinke, Tang Yongtong, Zürcher, Mair and Sharf. None of them was read (note 6).
4. **The 僧光传 sentence** is missing in the Wikisource text. A critical edition is needed.
5. **肇论.** The authorship of 宗本义 and 涅槃无名论 is open, and so is whether 性住 departs from Madhyamaka.
6. **天台.** The boundary between 智顗 and 灌顶's editing is unclear. 五时八教 is described only in general terms (note 14).
7. **华严.** The 金师子章's connection with 武则天 is traditional (note 16). 四法界 is 澄观's later scheme.
8. **坛经.** The dates and editors of the versions, and the year of 神会's 滑台 debate, follow the Wikipedia *Platform Sutra* summary.
9. **道生's 顿悟 and Chan 顿悟.** Their relation is stated as an open question.
10. **Modern scholarship.** It is cited only through SEP (*Neo-Daoism*, *Tiantai*, *Huayan*, *Chan*) and Wikipedia, read with a summarising tool, and marked "本课没有阅读" wherever a book is named.
11. **Length.** The manuscript is about 41,600 CJK characters, about 20% shorter than CN4. Parts 一 and 三 are the longest; no cuts are proposed.

---

## 10. Readiness

| Deliverable | Status |
|---|---|
| Complete manuscript (guide, six parts, texts with explanations, arguments and objections, tables, 想一想 placements, notes, sources and rights, critiques) | **Done**: `content/CN5_SAMPLE_DRAFT.md` |
| Primary texts verified | **Done**: 74 / 74 blockquotes verbatim; 2 expected inline flags; edition gaps stated |
| Practice data (V7 model, 18 questions, typechecked) | **Done**: §7. Not added to `src/`. |
| Media proposals | **Done**: A–D specified, not implemented |
| Image shortlist with rights | **Done**: 4 usable candidates, 1 on hold, 1 not recommended. Nothing downloaded. |
| Title and tier discrepancy | **Open**: Product Owner decision (§1) |
| Website integration, commit, push, deployment | **Not done, by instruction** |
| Phase 13B / CN7 | **Not started, by instruction** |

**Before integration (13B) the following are needed:**
- a decision on the title and tier;
- a choice of media components;
- authorisation to download images #1–#3;
- confirmation of which Dunhuang 坛经 copy candidate #5 shows.

---

## 11. CN5 / CN6 boundary and cross-reference note

**Boundary.** CN5 ends with Chan's 识心见性 and the handoff paragraph 「心、性与下一门课」. That paragraph states that 理学 is **not** a Buddhist derivative, and that CN6 will separate documented links from later comparison. CN5 does not discuss any 理学 text. CN6 begins with the Confucian *response*. It does not re-teach 空, 三谛, 一即一切 or the 坛经 verses; it points back to CN5 parts instead.

**Deferred items, now closed in CN6:**
- CN5 note 3 deferred 程颢's 定性书. CN6 Part 一 quotes it from 近思录 卷二 and treats the link with 王弼 as comparison (CN6 note 5).
- CN5's "批评二" ends by sending the 空谈 question to CN6. CN6's own Critiques & Responses picks it up for 理学 itself.

**No repetition check.** The two manuscripts share no blockquote. The only passages that appear in both are short inline mentions (the 神秀 verse line; 定慧体用), and in CN6 they are explicitly labelled as back-references.

### Shared CN5 → CN6 concept map

This map is the same in both reports. **Relation** separates three kinds of link:
- **documented response**: a later text explicitly names or answers the earlier position;
- **documented contact**: biography shows the later thinker studied the earlier tradition, but no specific borrowing is shown;
- **comparison**: the course's own juxtaposition, with no evidence of derivation.

| Concept | CN5 (where) | CN6 (where) | Relation |
|---|---|---|---|
| 有 / 無 | 王弼 以无为本; 郭象 無不能生有 (一) | 张载 "知太虛即氣，則無無", rejecting 老氏 "有生於無" (二); 太极图说 "無極" variant (二) | **Documented response** (张载 names 老氏; target is a general reading, not 王弼 by name) |
| 空 / 幻 | 僧肇 不真空, 幻化人 (三) | 张载 against "以山河大地為見病", 釋氏 "幻妄" (一, 二); 朱熹 "釋氏以性為空" (一) | **Documented response** to Buddhism in general; whether it fits 僧肇 is discussed as doubtful |
| 理 | 王弼 "物無妄然，必由其理" (一); 华严 理 / 事 (五) | 程朱 理 (二, 三); 戴震 分理 / 条理 (六) | **Comparison** (王弼); SEP's suggestion of Huayan influence on 朱熹 is reported as a scholarly view (三) |
| 体 / 用 | 王弼 (一); 坛经 定慧 灯光 (六) | 张载 "體用殊絕" (二); 程颐 "忠為體，恕為用" (not quoted); 王阳明 知行 (五) | **Comparison**: a shared framework, not a borrowing |
| 一 / 多 | 华严 一即一切, 六相 (五); 天台 一念三千 (四) | 朱熹 理一分殊, 海水 (三) | **Comparison**, with the two differences stated (分殊 duties; 理 = 仁义礼智, not 空) |
| 心 | 天台 一念 (四); 坛经 识自本心 (六) | 程颐 "釋氏本心" (一); 陆王 心即理 (四) | **Documented response** (程颐, 张载); 陆王 accused of 禅 by opponents (documented accusation, not shown derivation) |
| 性 | 郭象 性分 (一); 自性 negated (二, 三); 佛性 / 见性 affirmed (六) | 程颐 性即理 and "佛說性" Q&A (一, 二); 朱熹 实 / 空 (一); 王夫之 性日生 (六) | **Documented response** (程颐 answers "佛說性如何") |
| 镜 | 神秀 拂拭; 宗密 息妄修心 (六); 天台 mirror (四) | 程颢 "反鑒而索照" (一); 朱熹 磨镜 (三); 庄子 "用心若鏡" as common source | **Comparison**: the image is older than Buddhism in China (庄子) |
| 顿 / 渐 | 竺道生; 坛经 "法無頓漸，人有利鈍" (六) | 朱熹 "豁然貫通" (三); 顾东桥 accuses 阳明 of "頓悟之機" (五) | **Documented accusation** (顾东桥); 贯通 vs 顿悟 is a **comparison** |
| 定 / 慧 vs 知 / 行 | 定慧一体 (六) | 程颢 定性 (一); 知行合一 (五) | **Comparison** only; 王阳明 explicitly denies 顿悟 |
| 应物而无累 | 王弼 圣人有情 (一) | 程颢 "情順萬事而無情" (一) | **Comparison** (CN5 note 3 deferred this to CN6; CN6 note 5 closes it) |
| 清谈 | 玄学 清谈 (一) | 二程 "清談盛而晉室衰" (一) | **Documented response** |
| Study of Buddhism | — | 程颢 "出入於老、釋者幾十年"; 朱熹 答汪尚书 via 戴震; 王阳明 (SEP) | **Documented contact** |

No other repository files were modified.

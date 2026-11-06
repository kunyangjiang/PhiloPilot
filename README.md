# PhiloPilot

An independent educational website for learning philosophy across Eastern, Western and broader global traditions. It covers concepts, arguments, primary texts, historical development, comparison and independent judgment. It is free to read: no accounts, no backend, no paid services.

**Production:** https://philopilot.pages.dev

## What the website is

A Chinese-language reading and navigation web app in a Swiss International Typographic Style: a flat grid, a grotesque typeface, and four entrance colours (yellow 历史与传统, red 哲学问题, blue 跨传统对话, black 哲学方法). It works on desktop, tablet and phone.

A learner can reach a course in three ways:

- by tradition (首页 › 历史与传统 › 中国哲学 › course)
- by question (首页 › 哲学问题 › 人性与道德 › course)
- through search or 继续阅读 (continue reading)

The bar under the header shows the path actually taken.

The reader includes:

- a chapter list and section progress
- footnotes and source notes, opened on demand
- Mermaid diagrams that can be enlarged and zoomed
- wide tables that scroll sideways on small screens
- "想一想" exercises whose answers are saved in the browser

Reading position, progress and exercise answers are stored only in the browser's `localStorage`; they are not synced between devices.

## What is implemented

| Area | State |
| --- | --- |
| Homepage, four entrances, 72-course overview strip | Implemented |
| 哲学问题: question overview; 人性与道德 expanded | Implemented (1 of 10 questions expanded) |
| Courses | **One course is readable:** 《孔子、孟子与荀子》 (CN1), a sample chapter draft, 7 instructional parts plus 2 appendices |
| All other courses | Listed by name and position only, marked 原型未实现. They have no course pages. |
| Search | Courses, questions, entrances and CN1 headings |

The curriculum is planned as **72 courses**. That number is the current planning baseline, not a cap. Only CN1 has content in the app.

## Not yet built or still planned

- Every course except CN1, and every question except 人性与道德
- `content/EA4_SAMPLE_DRAFT.md`, which exists as a draft but is not shown in the app
- Accounts, sync between devices, and any server-side features (none are planned for the current phase)
- Editorial review: the CN1 text is a draft and has not been reviewed by subject experts

## Repository layout

```
planning/                  Project direction and curriculum reference (drafts)
content/                   Course chapter drafts in Markdown (CN1, EA4)
prototype/navigation-v2/   The web app (Vite + React + TypeScript)
  src/content/cn1.ts         Parses content/CN1_SAMPLE_DRAFT.md at build time (read-only)
  src/data/                  Curriculum catalogue (courses, regions, questions)
  src/ui/                    Pages: home, regions, questions, course, reader, search
  src/styles/                base.css (structure) and swiss.css (style, mobile layout)
```

The app reads the chapter text directly from `content/`. It does not keep a copy.

## Local development

Requires a current Node.js LTS release.

```bash
cd prototype/navigation-v2
npm install
npm run dev        # http://localhost:5179
npm run typecheck  # tsc --noEmit
npm run build      # type-check, then production build to dist/
npm run preview    # serve the production build locally
```

## Deployment

The site is deployed with **Cloudflare Pages**, connected to this GitHub repository. Cloudflare builds the app in `prototype/navigation-v2` (`npm run build` → `dist/`) and publishes it to https://philopilot.pages.dev. The site is static, so nothing needs to run on a server.

Git operations (commit, push) and deployments are done by the Product Owner.

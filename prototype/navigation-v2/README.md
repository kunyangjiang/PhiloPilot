# PhiloPilot navigation prototype V2

Local-only prototype. It has three 20th-century design directions over the same content and routes. The **风格** switcher in the top bar changes between them.

| Style | Idiom | Homepage |
|---|---|---|
| 现代主义混合 (swiss) — preferred | Swiss grid as the skeleton, mixed with Bauhaus primaries and shapes (one per entrance), transit-line sequences, library-card metadata and a red Chinese seal | Display word, a unit chart of all 72 courses (real codes and tiers from the curriculum; CN1 is clickable), and four entrances that invert on hover and light up their row |
| 线路图 (transit) | Modernist transit diagram, 1930s–70s | Line map: four lines; CN1 is the interchange of 中国 × 人性与道德 |
| 卡片目录 (catalogue) | Library card catalogue and typewriter | A guide card plus a four-drawer cabinet |

The **动效** switch has two settings: 轻微 (a 180 ms page fade and quick hover changes) and 关闭 (no motion). By default it follows the OS "reduce motion" setting.

You can also pick a style with a URL parameter: `http://localhost:5179/?style=transit#/`.

## Run (Windows PowerShell 5.1)

```powershell
cd E:\PhiloPilot\prototype\navigation-v2
npm install
npm run dev
```

Then open http://localhost:5179.

- Production build: `npm run build`
- Serve the build: `npm run preview`

## Notes

- Course text is read-only, from `E:\PhiloPilot\content\CN1_SAMPLE_DRAFT.md`. Nothing in `content/` or `planning/` is modified.
- Only CN1 is readable. Every other course or topic is marked 原型未实现 / 原型未展开 and is not clickable.
- State is kept in localStorage under `philopilot.v2.*`, separate from V1.
- Fonts: Noto Sans SC, Noto Serif SC, Jost and Courier Prime. All are under the SIL Open Font License, via @fontsource.
- No WebGL or canvas is used, so no fallback is needed.

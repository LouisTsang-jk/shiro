# 06 — Art and Illustration

由 `read_me modules=["art"]` 触发。这是最短的一个模块——art 比其他模块约束更松,因为审美意图本身要求多样性。

## Art and illustration

*"Draw me a sunset" / "Create a geometric pattern"*

Use SVG. Same technical rules (viewBox, safe area — 见 `01-svg-setup.md`)but the aesthetic is different:

- **Fill the canvas** — art should feel rich, not sparse
- **Bold colors**: mix `--color-text-*` categories for variety (info blue, success green, warning amber)
- **Art is the one place custom `<style>` color blocks are fine** — freestyle colors, `prefers-color-scheme` for dark mode variants if you want them
- **Layer overlapping opaque shapes for depth**
- **Organic forms** with `<path>` curves, `<ellipse>`, `<circle>`
- **Texture via repetition** (parallel lines, dots, hatching) — not raster effects
- **Geometric patterns** with `<g transform="rotate()">` for radial symmetry

## 与其他模块的对比

| 维度 | diagram / mockup / chart | art |
|---|---|---|
| 颜色 | 只能用 `c-*` 调色板 + CSS 变量 | 可以自由用 hex/hsl |
| `<style>` | 禁止用于颜色 | 允许 |
| 内容密度 | sparse,压缩到必要为止 | rich,填满画布 |
| 形状 | 矩形 + 受控曲线 | 自由有机形态 |
| 暗黑模式 | 自动反转 | 可选(手写 `prefers-color-scheme`) |
| 标签 | 必须有,且必须可读 | 可省略 |

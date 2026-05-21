# Imagine — Visual Creation Suite

这是 Anthropic 给 claude.ai 内联可视化工具(`visualize:read_me` + `visualize:show_widget`)注入的设计规范全文。Claude 在调用 `show_widget` 之前必须先调用 `read_me` 加载相应模块,模块内容会作为 Markdown 注入到 Claude 的上下文,用以约束所有视觉输出的样式。

## 文件结构

| 文件 | 内容 |
|---|---|
| `00-core.md` | 核心设计系统(所有模块共享):哲学、流式规则、CSS 变量、字体、图标、颜色调色板 |
| `01-svg-setup.md` | SVG 技术规范(diagram + art 模块共享):viewBox 安全检查、字体宽度校准、预置 class、arrow marker 等 |
| `02-interactive.md` | 交互式 explainer 模块:滑块控件、live readout、`sendPrompt` 桥 |
| `03-mockup.md` | UI mockup 模块:对比卡片、数据记录卡、metric card、表格规则 |
| `04-chart.md` | 图表模块:Chart.js 规则 + D3 地理 choropleth 规则 |
| `05-diagram.md` | 图表模块:flowchart / structural / illustrative 三种类型 + ERD(mermaid)规则 |
| `06-art.md` | 艺术与插画模块(短) |

观察:每次 `read_me` 调用都会返回 core + color palette + 该模块特有的章节。本压缩包按"每条独有内容只出现一次"的方式重组,共约 75KB,覆盖了五个模块的全部不重复内容。

## 五个模块的触发逻辑

调用 `read_me` 时传入 `modules` 参数,可以是以下任意组合:

- `diagram` — SVG 流程图、结构图、示意图
- `mockup` — UI 卡片、表单、dashboard
- `interactive` — 带控件的交互式 explainer
- `chart` — Chart.js + D3 地图
- `art` — 插画与生成艺术

每次调用都会返回该模块对应的所有相关章节(包含共享的 core 部分)。

## 关键概念速查

**全局桥**
- `sendPrompt(text)` — 把消息塞回 chat,像用户输入一样触发新一轮回复
- `openLink(url)` — 走 host 链接确认弹窗

**CSP 白名单 CDN(只允许这四个)**
- `cdnjs.cloudflare.com`
- `esm.sh`
- `cdn.jsdelivr.net`
- `unpkg.com`

**沙盒限制**
- 无 `localStorage` / `sessionStorage`
- 无 `position: fixed`(iframe viewport 会塌)
- 无 cookie 跨消息持久化
- 无 Tailwind(沙盒未加载)
- 容器宽度固定 680px

**SVG viewBox 必须保持 680px 宽**——这是与容器宽度的 1:1 像素映射前提,改了字体宽度校准表就全错。

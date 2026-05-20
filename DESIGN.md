# Design System

A quiet design system for a personal blog. Every choice is governed by **restraint**: hierarchy is built through scale and space, never through weight or saturation.

This document is the source of truth. When in doubt, **subtract**.

---

## 1. Principles

Four principles. They are constraints, not suggestions.

1. **The page is several whites.** Paper, snow, bone — never a single flat fill.
2. **Negative space is the subject.** Empty area is not what is left over; it is the primary compositional element. Design the empty parts first.
3. **Reading is rhythm.** Vertical rhythm, letter-spacing, and measure are tuned to a single ideal: a long, calm exhale. Do not break the rhythm for novelty.
4. **Hierarchy through scale and space.** Never use weight, colour, underline, or boxes to establish hierarchy. Use type size and the space around it.

---

## 2. Colour

The palette is a gradation of warm off-whites with sumi-black text. **There is no accent colour.** All tokens live in `:root` in `app/globals.css` and are mirrored in the Tailwind `@theme inline` block.

| Token   | Hex       | CSS var     | Role                                                |
| ------- | --------- | ----------- | --------------------------------------------------- |
| paper   | `#f6f4ee` | `--paper`   | The page itself. Warm rice-paper white.             |
| paper-2 | `#efece2` | `--paper-2` | Slightly aged paper. For layered surfaces.          |
| snow    | `#fbfaf6` | `--snow`    | A lifted card / hover state. Almost imperceptible.  |
| bone    | `#e8e3d3` | `--bone`    | All hairline rules and dividers.                    |
| ink     | `#1a1814` | `--ink`     | Primary text. **Sumi (墨)** — never pure black.     |
| ink-2   | `#4a463d` | `--ink-2`   | Secondary text. Subtitles, softened body.           |
| ink-3   | `#8a8475` | `--ink-3`   | Tertiary text. Metadata, labels, excerpts.          |
| ink-4   | `#b8b1a1` | `--ink-4`   | Hairlines on darker contexts, inactive arrows.      |

### 2.1 Paper grain

The page background is not flat. A double radial-gradient micro-dot pattern (3px + 7px) sits over `--paper` at `mix-blend-mode: multiply` and `opacity: 0.55`. It must never read as texture — only as the faintest variation when one stares at empty space. The grain is applied to `.page::before`.

### 2.2 No accent

The blog has no chromatic accent. Black on bone is the entire palette. Hover states use a near-imperceptible lift (`rgba(255, 253, 247, 0.55)`) and a colour shift from `--ink-4` to `--ink` on the trailing arrow. **Do not** reintroduce a coloured mark for buttons, links, focus rings, borders, or icons. If you reach for a colour, the design is wrong.

---

## 3. Typography

The type system is **paired**: a display face for the headline, a body face for reading. Both come from the same family of historical serifs so they cohabit without seam.

### 3.1 Faces

**Display** — *Cormorant Garamond*, weight 300, italic.
Tall, narrow, deeply italic. Used at very large sizes for the hero ring, year markers, and article titles. Set tracking near zero; let the curves do the work.

**Body** — *EB Garamond*, weight 400, italic + roman.
A workhorse Garamond cut for reading. Used for the article body, excerpts, and any 14–20px text.

**Label / Meta** — *Inter*, weight 300, uppercase, `letter-spacing: 0.18em`.
Used **only** for tiny structural labels. Never for content.

**Numeric** — *JetBrains Mono*, weight 400.
Dates and numerals only. `font-variant-numeric: tabular-nums`.

The quartet (Garamond × Garamond × Inter × JetBrains Mono) is intentionally narrow. Do not introduce a fifth face.

### 3.2 Scale

Sizes snap to specific values; do not pick arbitrary intermediates. Every size below is paired with its line-height and letter-spacing.

| Use                       | Size  | Line-height | Letter-spacing | Notes                                  |
| ------------------------- | ----- | ----------- | -------------- | -------------------------------------- |
| Hero ring text            | 48px  | n/a         | n/a            | Cormorant italic 300 on a textPath.    |
| Page title (archive/notes)| 64px  | 1.00        | 0.005em        | Italic display.                        |
| Archive year marker       | 96px  | 1.00        | −0.01em        | Italic Cormorant. Centre column rule.  |
| Article title (read view) | 52px  | 1.18        | 0.005em        | Italic. Always centred.                |
| Notes section month       | 36px  | 1.00        | 0.005em        | Italic. Left-aligned, three-col head.  |
| Note day number           | 32px  | 1.00        | −0.005em       | Italic display, day only.              |
| Index entry title         | 28px  | 1.20        | 0.005em        | Sentence case.                         |
| Masthead                  | 26px  | 1.00        | 0.02em         | Author name — italic 300.              |
| Note body (detail)        | 24px  | 1.70        | 0.005em        | Body face. Left-aligned.               |
| Archive entry title       | 22px  | 1.25        | 0.005em        | Display roman.                         |
| Pagination snippet (essay)| 18px  | 1.30        | 0.005em        | Italic display.                        |
| Body paragraph            | 18px  | 1.75        | 0.005em        | Garamond roman.                        |
| Note body (index)         | 17px  | 1.65        | 0.005em        | Reads in place; no detail view needed. |
| Pagination snippet (note) | 14px  | 1.45        | 0.005em        | Italic body, secondary ink.            |
| Excerpt / index meta      | 14px  | 1.60        | 0.005em        | Italic, `--ink-3`.                     |
| Date / numeric            | 11px  | 1.40        | 0.02em         | JetBrains Mono.                        |
| Label                     | 10.5px| 1.40        | 0.18em UPPER   | Inter 300.                             |

The full implementation lives in `app/globals.css` under `.t-*` classes (`.t-label`, `.t-meta`, `.t-num`, `.t-en`). **Always reach for a class first**; only inline a font stack if the situation truly requires deviation.

### 3.3 Justification & hanging punctuation

Article body paragraphs use `hanging-punctuation: first allow-end`. Justification is reserved for languages where it is unambiguous; in English the body is set ragged-right with a strict measure (see §4.2).

### 3.4 The lead-in (optional)

The first paragraph of an essay may begin with its opening 1–3 words set in `font-variant-caps: all-small-caps` with `letter-spacing: 0.08em`. This replaces a drop-cap, which would be too loud. The lead-in is the only place small caps appear in the design.

In MDX, mark it explicitly: `<Lead>The opening</Lead> sentence continues.` The `Lead` component is provided in `components/mdx.tsx`.

---

## 4. Layout

### 4.1 Frame

The page is bounded by a `.page` container with extreme margins:

- Default (`<Frame>`): `80px` top/bottom, `112px` left/right.
- Dense (`<Frame dense>`): `48px` top/bottom, `64px` left/right.

The content column is `max-width: 1280px`, centred. **Never** exceed this without explicit reason.

### 4.2 Measure

Article body text is constrained to `max-width: 680px` (`--measure`). Reading is the blog's primary function; the measure must not exceed what the eye can carry in a single sweep. Excerpts and metadata may run to `max-width: 360px`.

### 4.3 Vertical rhythm

The baseline grid is `8px` (`--bl`). All vertical spacing snaps to multiples (8, 16, 24, 32, 48, 64, 80, 96, 112, 160). When in doubt, the next size up is almost always correct.

Section spacing in the Index view:
- Header → IndexList: implicit (Header carries its own 80px bottom margin)
- Index row vertical padding: 32px (top + bottom)
- IndexList → Hero: implicit (the hero carries its own 16px top padding)
- Hero → Footer: implicit (the hero carries its own 56px bottom padding)
- Footer top border padding: 32px

Article (essay) view:
- Header kicker → title: 48px
- Header block → seal: 64px
- Seal → first paragraph: 48px
- Paragraph spacing: 28px
- Body → end mark: 64px
- Body → prev/next nav: 96px

Note detail view:
- Top padding to kicker: 64px
- Kicker → body: 80px
- Body → seal: 80px
- Seal → pagination: 160px

### 4.4 Hairlines

Every divider in the system is a **0.5px** line (renders crisp on retina). Heavy borders do not exist in this design. Use `var(--bone)` on light surfaces, `var(--ink-4)` for the article header's flanking lines around metadata.

### 4.5 Grids

The homepage Index row is a five-column grid (`.index-row`):

```
72px  2fr  1.4fr  120px  64px
№     title  excerpt  date  arrow
```

The Archive row is denser (`.archive-row`):

```
72px  1fr  100px  40px
№     title  date  arrow
```

The Notes row is four columns:

```
100px  1fr  120px  40px
day    text  №      arrow
```

The header uses a three-column grid (left spacer · centred masthead · right nav), `align-items: baseline`. The footer mirrors this with three equal columns (name · email · GitHub).

Year and month section headers use a three-column grid with the **centre column filled with a 0.5px bone hairline** baseline-aligned to the type.

### 4.6 Responsive

Below `960px` the layout collapses:

- Frame padding → `56px 32px`
- Hero ring shrinks from 520 → 320
- Index / archive rows hide the date and excerpt columns
- Footer collapses to a single column
- Header masthead hides; the nav remains

These rules live at the bottom of `app/globals.css`. The site has not been adapted for narrower mobile (≤ 480) by design — readers on small phones are presumed to be in a reading-app context (Reeder, Reader View) where the type renders independent of layout.

---

## 5. Components

Reference patterns, ranked by frequency of use. All live in `components/`.

### 5.0 Content kinds

The blog carries two kinds of writing. Treat them as different objects, not different lengths.

| Kind        | Length         | Has title? | Detail view?       | Index grouping |
| ----------- | -------------- | ---------- | ------------------ | -------------- |
| **Essay**   | Long form       | Yes        | Yes — reading view | By year        |
| **Note**    | A few sentences | **No**     | Yes — expanded     | By month       |

A note has no title because its text is short enough to *be* the title. If a piece of writing needs a title to make sense, it has already crossed into being an essay. There is no third kind; do not introduce one.

### 5.1 `<Frame>` — `components/frame.tsx`

The page container — paper background, grain, padding, max width. Every route's body begins with one. Props: `dense?: boolean`.

### 5.2 `<Header>` — `components/header.tsx`

Three-column grid: spacer (left) — masthead (centre) — nav (right). 56px padding-bottom + 0.5px bone rule + 80px margin-bottom. Takes `pathname` to mark the active nav item. Masthead is the author name in display italic.

### 5.3 `<Hero>` — `components/hero.tsx` (Index only)

A 420×420 SVG. A single circular path (`r = 160`, centred) carries an italic textPath of `Loop · ` repeated 10 times. `textLength` is locked to the path's circumference (`2π × 160 ≈ 1005.31`) with `lengthAdjust="spacing"`, so the ring closes exactly. The entire SVG rotates a full turn every 60 seconds via the `.hero__loop` CSS animation. `prefers-reduced-motion: reduce` disables the rotation. Placed **after** the IndexList on the homepage — the list is the page's purpose; the ring is a closing signature, not an opening title.

The ring is the only meaningful motion in the design (besides row hover). Do not add to it.

### 5.4 `<IndexList>` — `components/index-list.tsx`

A five-column tabular row with 0.5px bone rules above each entry. On hover the row gains a near-imperceptible `rgba(255,253,247,0.55)` lift; the trailing arrow shifts 4px right and changes from `--ink-4` to `--ink`. **No other element of the design moves on hover.** The `.row` class in `globals.css` provides this behaviour.

### 5.5 Reading view — `app/essays/[slug]/page.tsx`

A 680px column. Header is centred with a numeric kicker (`№ 001 — date — read-time`) flanked by 32px hairlines. Title is large italic, centred. A small ink seal closes the header. Body is left-aligned 18px Garamond with hanging punctuation. The essay closes with a `●  ●  ●` end mark (8px, letter-spacing 1em). Prev / Index / Next sit in a three-column grid above a bone rule.

The essay body is MDX, rendered by `<MDXContent>`. Prose styling lives in the `.prose` block in `globals.css`.

### 5.6 `<Footer>` — `components/footer.tsx`

Three equal columns: name (left), email link (centre), GitHub link (right). Each uses the `.t-label` class. Spaced 160px from the end of content.

### 5.7 `<ArchiveView>` — `components/archive-view.tsx`

The complete listing of essays. The page opens with a 64px italic display setting of `Essays` — no descriptive copy. Entries are grouped by year. Each year is introduced by a 96px italic display setting of the year (e.g. *2026*) on a three-column header row (`auto 1fr auto`) with a 0.5px bone hairline filling the middle column and a small mono count on the right. Rows are denser than the homepage IndexList (four columns: `72px 1fr 100px 40px`, vertical padding 20px) and contain no excerpt — the archive trades poetry for completeness.

### 5.8 `<NotesIndex>` — `components/notes-index.tsx`

A reverse-chronological list of notes grouped by month. Page header is a single 64px italic display setting of `Notes`. Each month header is a three-column row (`180px 1fr auto`): a 36px italic display setting of `Month · Year`, a 0.5px bone hairline filling the centre, and a small count on the right.

**NoteRow** is a four-column grid (`100px 1fr 120px 40px`, column-gap 40px, padding 28px top/bottom):
1. A 32px italic display setting of the **day** only (the month is implied by the section header) above a tiny uppercase Inter kind label (Observation / Fragment / Found / Marginalia).
2. The note text itself, set in 17px Garamond roman — read directly from the index, not behind a click.
3. The reference number (№), right-aligned, in monospace.
4. The hover-only reveal arrow.

The note text **is** the title. There is no excerpt, no headline, no summary.

### 5.9 Note detail view — `app/notes/[slug]/page.tsx`

A single note expanded with extreme air. The page is mostly empty by design.

- Article width: 680px.
- Top padding: 64px before the kicker; 80px between kicker and note.
- Kicker: `№ — date — kind`, flanked by 32px hairlines, identical pattern to the essay reading view.
- The note itself: 24px Garamond roman, line-height 1.7, **left-aligned with a generous measure** (do not centre body copy). Hanging punctuation.
- 80px of air, then a 5×5 ink seal (smaller than the essay's 6×6 — the note is quieter).
- 160px before the prev/next pagination strip.
- Pagination snippets show the **first sentence** of the adjacent note (its de-facto title), italic 14px.

### 5.10 `<Seal>` — `components/seal.tsx`

A small filled circle in `--ink`. **The only ornament in the system.** It appears once per detail page: 6×6px on essays (between header and body), 5×5px on notes (smaller for the lighter form).

### 5.11 `<EndMark>` — `components/end-mark.tsx`

Three small black-disc characters separated by `1em` letter-spacing, 8px size, centred. Marks the close of an essay. Notes have no end mark — they end where they end.

### 5.12 `<ArticlePagination>` — `components/article-pagination.tsx`

A three-column nav (prev · home · next) above a bone rule. The label uses display italic on essays (`fontSize: 18`), body italic on notes (`fontSize: 14`).

---

## 6. Interaction

The design is deliberately quiet. Animation budgets are tiny.

- **Hover transitions**: 250–350ms `ease`. Targets: background (rows), border-colour (`.quiet-link`), arrow translate + colour.
- **Hero rotation**: a single 60-second linear rotation on the SVG ring. Suspended under `prefers-reduced-motion: reduce`.
- **No focus rings.** `outline: none` on `button` and `a`. *(Accessibility note: focus styling is a deferred concern for the prototype. Before any production handoff, add a 0.5px ink outline on `:focus-visible` only.)*
- **Route transitions** (route navigation via `experimental.viewTransition` in `next.config.ts`):
  - **Root crossfade**: 240ms `cubic-bezier(0.2, 0, 0, 1)`. The page is *almost* simply there — the crossfade is short enough to register as continuity, not theatre.
  - **Three named morphs**, in order of importance:
    1. The reference number (`№`) carries `view-transition-name: essay-n-${slug}` (or `note-n-${slug}`) from its tabular position in the index/archive into the centred header of the detail view. Same face (`.t-num`), same size, only the position changes — so this reads as the number simply walking across the page.
    2. The entry title carries `view-transition-name: essay-title-${slug}`. From 28px (homepage) or 22px (archive) into the 52px italic reading title — a perceptible scale.
    3. The seal (`.seal-dot`) carries `view-transition-name: seal`. Between two essay or two note detail pages the seal morphs in place; between a list and a detail it resolves with a short fade.
  - Notes morph only `№` (their text is the title and changes dramatically in size; morphing it looked frantic).
  - **No other element may carry a `view-transition-name`.** If a new element seems to ask for one, restate the requirement in type — the existing three are sufficient.
  - All morph durations: 380ms `cubic-bezier(0.2, 0, 0, 1)`. Entirely disabled under `prefers-reduced-motion`.
- **Cursor**: default behaviour. `pointer` is set only on `.row` (which wraps an anchor).

### 6.1 The `.quiet-link` pattern

All link-like elements share a single style: inherit colour, no underline, a 0.5px bone bottom-border, 1px padding-bottom. On hover the border goes to `--ink` and the colour to `--ink`. Used for any inline reference to another page or essay.

---

## 7. Iconography

The system has **no icons**. The only graphic elements are:

- Hairlines (0.5px solid)
- The seal (6×6 circle on essays, 5×5 on notes)
- The end mark (`● ● ●`) on essays only
- The reveal arrow (`→`, character only — not an SVG)
- The hero ring (SVG textPath, hero only)

If a new element appears to require an icon, the design is incorrect; restate the requirement in type.

---

## 8. File layout

```
app/                          ← Next.js App Router (routes, metadata, SEO)
components/                   ← presentational components (no data fetching)
lib/                          ← content loader, formatters, SEO helpers, site config
content/essays/*.mdx          ← long-form pieces (frontmatter + body)
content/notes/*.mdx           ← short observations (frontmatter + body)
public/                       ← static assets
```

### 8.1 Frontmatter schemas

**Essay** (`content/essays/<slug>.mdx`):

```yaml
n: "001"                 # blog-wide reference, zero-padded to 3 digits
title: "Title"           # sentence case
date: "YYYY.MM.DD"       # publication date
excerpt: "One sentence." # 80–140 chars
read: "12 min"           # optional, computed if omitted
draft: false             # optional
tags: ["topic"]          # optional
ogImage: "/og/001.png"   # optional
```

**Note** (`content/notes/<slug>.mdx`):

```yaml
n: "047"
date: "YYYY.MM.DD"
tag: "Observation"   # Observation | Fragment | Found | Marginalia
draft: false         # optional
```

Numbers are never reused. `n` is unique across both essays and notes (i.e. blog-wide).

---

## 9. Doing new work

When adding a new view, page, or component, follow this order:

1. **Decide what is being subtracted.** The new element must remove something elsewhere, or the page is getting busier without reason.
2. **Sketch the negative space first.** Block out the margins and gaps before placing anything.
3. **Pick a class, not a font.** Reach for `.t-*` first; if no class fits, ask whether the type need is genuine.
4. **Snap to the baseline.** 8px multiples for vertical, 16px multiples for horizontal padding.
5. **Stay monochrome.** If you reach for a colour, the design is wrong — find another way.
6. **Re-read §1.** If the new element doesn't satisfy all four principles, redo it.

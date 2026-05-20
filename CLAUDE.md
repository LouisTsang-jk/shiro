# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal blog by **Louis Tsang**, English-only. The blog carries two kinds of writing:

- **Essays** — long form. Have a title, a reading view, and grouping by year in the archive.
- **Notes** — short observations. Have *no* title; the text *is* the title. Grouped by month.

There is no third kind. Do not introduce one.

## IMPORTANT — communication style

- Do not use empathy/comfort language ("I hear you", "let's do this together", "no worries, take your time", "I've got you", etc.).
- No emoji. No exclamation marks for emphasis. No preamble.
- Answer the question. Conclusion first, reason after.
- If you make a mistake, say so. Do not apologize, do not over-explain.
- If you are unsure, say so. Do not invent.
- Mirror the user's language. If they write in Chinese, respond in Chinese.

## IMPORTANT — DESIGN.md is law

When **any** code change touches styling, layout, type, spacing, or motion, **read `DESIGN.md` first**. The rule of thumb when in doubt is **subtract**.

Triggers:

- Editing a `className`, inline `style`, CSS variable, or any file under `app/globals.css`.
- Adding a new component, page, or view.
- Touching anything inside `components/` or the `prose` styles.
- Adding a new type size, colour, or motion.

## IMPORTANT — no accent colour

The blog is purely black on bone paper. There is **no chromatic intervention** anywhere — no coloured links, buttons, hover states, focus rings, icons, or backgrounds. If you reach for a colour, the design is wrong.

## IMPORTANT — typography

Four faces only. Do not introduce a fifth.

| Use            | Family               | Weight / style |
| -------------- | -------------------- | -------------- |
| Display        | Cormorant Garamond   | 300 italic     |
| Body           | EB Garamond          | 400 italic + roman |
| Label / meta   | Inter                | 300 uppercase, `letter-spacing: 0.18em` |
| Numeric        | JetBrains Mono       | 400, tabular-nums |

**Always reach for a `.t-*` class first** (`.t-label`, `.t-meta`, `.t-num`, `.t-en`). Only inline a font stack if the situation truly requires deviation — and if it does, restate why in a comment.

## IMPORTANT — spacing

Every vertical value snaps to multiples of **8px** (`--bl`). Allowed values: 8, 16, 24, 32, 48, 64, 80, 96, 112, 160. When in doubt, the **next size up** is almost always correct. Pulling values out of thin air is forbidden — pick from the scale.

Page margins:
- Default: 80px top/bottom, 112px left/right
- Dense: 48px top/bottom, 64px left/right (toggle via `Frame dense` prop)

Reading measure: `max-width: 680px` on the article column. Never exceed.

## IMPORTANT — the hero

The homepage hero is a single SVG: the word `Loop · ` repeated around a circular textPath that slowly rotates. It is the only motion on the site beyond the row hover. Do not add to it.

## Adding new content

Content lives as MDX under `content/`. There is **no CMS** by design — every essay and note is a versioned file.

### Add an essay

1. Create `content/essays/<slug>.mdx`.
2. Frontmatter (all fields required unless marked):

   ```yaml
   ---
   n: "001"                  # blog-wide reference, zero-padded to 3 digits, never reused
   title: "Title"            # sentence case, no terminal period
   date: "YYYY.MM.DD"        # publication date
   excerpt: "One sentence."  # ~80–140 chars, used in the index and as <meta description>
   read: "10 min"            # optional — computed from word count if omitted
   draft: false              # optional — hides in production when true
   tags: ["topic"]           # optional
   ogImage: "/og/001.png"    # optional
   ---
   ```

3. Body: standard Markdown + MDX. Use `<Lead>...</Lead>` to open the first paragraph if desired (renders as small caps). Use `#`, `##`, `###` for structure, rarely — most pieces do not need headings.

4. Reference numbers (`n`) are **blog-wide and never reused.** Check the highest existing `n` across essays and notes before assigning.

### Add a note

1. Create `content/notes/<NNN>-<short-slug>.mdx` (the leading number matches `n` for tidiness, but is not required).
2. Frontmatter:

   ```yaml
   ---
   n: "001"
   date: "YYYY.MM.DD"
   tag: "Observation"       # Observation | Fragment | Found | Marginalia
   draft: false             # optional
   ---
   ```

3. Body: a few sentences. **No title, no headings, no Lead.** The text is the note.

## File layout

```
.
├── app/                          Next.js App Router routes
│   ├── layout.tsx                root layout + global metadata + JSON-LD
│   ├── page.tsx                  homepage (Hero + IndexList)
│   ├── archive/page.tsx          essay archive grouped by year
│   ├── essays/[slug]/page.tsx    essay reading view
│   ├── notes/page.tsx            notes index grouped by month
│   ├── notes/[slug]/page.tsx     single-note detail view
│   ├── not-found.tsx             404
│   ├── sitemap.ts                /sitemap.xml
│   ├── robots.ts                 /robots.txt
│   ├── feed.xml/route.ts         RSS feed
│   └── globals.css               design tokens + .t-* + .row + .prose
├── components/                   pure presentational components
│   ├── frame.tsx                 page container with paper grain
│   ├── header.tsx                masthead + nav
│   ├── footer.tsx                name · email · GitHub
│   ├── hero.tsx                  Loop ring SVG
│   ├── index-list.tsx            essay index rows (homepage)
│   ├── archive-view.tsx          archive view
│   ├── notes-index.tsx           notes index by month
│   ├── article-pagination.tsx    prev / index / next
│   ├── first-paragraph.tsx       small-caps lead-in
│   ├── seal.tsx                  black dot
│   ├── end-mark.tsx              ●  ●  ●
│   ├── mdx.tsx                   MDXRemote wrapper + components map
│   ├── nav-label.tsx             header nav item
│   └── quiet-link.tsx            the one link pattern
├── lib/
│   ├── content.ts                MDX content loader (cache + grouping)
│   ├── format.ts                 date / number formatters
│   ├── seo.ts                    metadata + JSON-LD helpers
│   └── site.ts                   site config (name, url, author)
├── content/                      THE SOURCE OF TRUTH for writing
│   ├── essays/*.mdx
│   └── notes/*.mdx
├── public/
├── CLAUDE.md                     this file
├── DESIGN.md                     design system spec
└── README.md
```

## SEO conventions

All conventions live in `lib/seo.ts`.

- **Title separator**: ` — ` (space + em-dash + space). Never `|`, `-`, or `–`. Brand suffix: `... — Louis Tsang`.
- Every page exports `generateMetadata()` or static `metadata` via `buildMetadata()`.
- Every article/note page emits **JSON-LD** (`Article` / `ShortStory`). Inline via `<script type="application/ld+json">` after `<Footer>`.
- `app/sitemap.ts` enumerates static routes + all essays + all notes.
- `app/robots.ts` references the sitemap.
- `app/feed.xml/route.ts` produces an RSS 2.0 feed merging essays and notes by date.
- Canonical URLs: every page sets `alternates.canonical` to its absolute URL.
- Static generation: `generateStaticParams()` on both `[slug]` routes — every essay/note is prerendered.

## Routing

| Route             | Purpose                       |
| ----------------- | ----------------------------- |
| `/`               | Hero + IndexList              |
| `/archive`        | Every essay, grouped by year  |
| `/essays/[slug]`  | Single essay reading view     |
| `/notes`          | Notes index, grouped by month |
| `/notes/[slug]`   | Single note detail view       |
| `/feed.xml`       | RSS feed (essays + notes)     |
| `/sitemap.xml`    | Sitemap                       |
| `/robots.txt`     | Robots                        |

## Commands

```bash
pnpm install             # install
pnpm dev                 # turbopack dev server (default :3000)
pnpm build               # production build (SSG)
pnpm start               # serve production build
pnpm check               # tsc --noEmit && next lint
pnpm typecheck           # tsc --noEmit alone
```

There is no database, no auth, no CMS, no API surface. The build is fully static.

## Tech stack

- **Next.js 16** with App Router (RSC).
- **React 19**.
- **TypeScript** in strict mode.
- **Tailwind CSS v4** with `@theme inline` for design tokens.
- **MDX** via `next-mdx-remote/rsc` — content compiled at build time.
- **No CMS**. No external content store. All writing is in `content/`.

## Definition of done for a content commit

1. The MDX file lives in the right directory and has all required frontmatter.
2. `n` is unique across both essays and notes (blog-wide).
3. `pnpm check` passes.
4. `pnpm build` succeeds.
5. The new piece appears on the correct index page and detail page after a local `pnpm build && pnpm start`.

## Definition of done for a visual change

1. The change observes every rule it touches in DESIGN.md.
2. No new colours, fonts, or spacing values were introduced outside `globals.css`.
3. The page remains purely black on bone — no accent colour added.
4. `pnpm build` passes.

## Anti-patterns

Do not:

- Introduce a CSS framework / icon library / animation library / image lightbox.
- Add a comment system, view counter, share buttons, related-posts widget, or any reader-interaction surface.
- Use weight, colour, underline, or boxes to establish hierarchy. Hierarchy is built through **scale and space**.
- Re-introduce an accent colour.
- Centre body copy. Reading view paragraphs are left-aligned at 680px.
- Animate page entry. The page is simply there.
- Use `dangerouslySetInnerHTML` outside JSON-LD blocks.
- Add `console.log` to committed code.

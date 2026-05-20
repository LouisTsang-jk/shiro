# Louis Tsang

A static personal blog. Essays and notes.

```
pnpm install
pnpm dev
```

→ http://localhost:3000

## Project conventions

- `CLAUDE.md` — instructions for coding agents working in this repo.
- `DESIGN.md` — the design system. Source of truth for type, spacing, and components.
- `content/essays/` — long-form pieces (MDX).
- `content/notes/` — short observations (MDX).

The site is fully static — `pnpm build` outputs a prerendered SSG bundle. There is no database, no CMS, and no API.

## Adding a piece

```bash
# Essay
$EDITOR content/essays/my-new-essay.mdx

# Note
$EDITOR content/notes/048-the-new-note.mdx
```

Frontmatter is documented in `CLAUDE.md`. Reference numbers (`n`) are blog-wide and never reused.

## Tech

- Next.js 16 (App Router, React Server Components, SSG)
- React 19
- TypeScript (strict)
- Tailwind CSS v4 (design tokens via `@theme inline`)
- MDX via `next-mdx-remote/rsc`

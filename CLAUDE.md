# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Adarsh Krishnan's personal website, built with **SvelteKit** (static, prerendered) and deployed to GitHub Pages at `https://adarshkrishnan.com/`.
All content (site settings, about page, blog posts, photo albums) lives in a **Sanity** project and is fetched at build time. The Sanity Studio lives in `studio-personal-website/`.

Design: light-first with an equal dark mode, Figtree type, white and soft grey bands, large photography. See `PRODUCT.md` and `DESIGN.md`.

## Development Environment

- Package manager: `npm`
- Framework: SvelteKit (TypeScript), Tailwind v4 utilities plus hand-written CSS in `src/app.css`
- Content: Sanity (project `xsttrmdn`, dataset `production`), queried with GROQ via `@sanity/client` on the server only
- Rich text: Portable Text rendered with `@portabletext/svelte`

## Key Commands

```bash
npm install
cp .env.example .env        # PUBLIC_SANITY_SAMPLE=1 builds with bundled sample content
npm run dev -- --open
npm run check
npm run build && npm run preview
```

Studio:

```bash
cd studio-personal-website && npm install && npm run dev   # http://localhost:3333
npm run deploy                                             # hosts Studio at <SANITY_STUDIO_HOST>.sanity.studio
```

One-time content seed (needs an Editor token in `SANITY_WRITE_TOKEN`):

```bash
node scripts/seed-sanity.mjs --dry-run
node scripts/seed-sanity.mjs
```

## Project Structure

- `src/routes/` - `/`, `/blog`, `/blog/[slug]`, `/photography`, `/photography/[slug]`, `/about`; `/projects` and `/experiences` redirect
- `src/lib/server/sanity.ts` - Sanity client (server only)
- `src/lib/server/content.ts` - loaders used by every route; falls back to `src/lib/sanity/sample.ts` when `PUBLIC_SANITY_SAMPLE=1` or no project id
- `src/lib/sanity/queries.ts` - GROQ; `types.ts` - content types; `image.ts` - image URL and srcset helpers
- `src/lib/components/` - `Picture`, `Reveal`, `RichText` (+ `pt/` block renderers), `Lightbox`, `ThemeToggle`, `Icon`
- `src/app.css` - tokens (`:root` and `[data-theme='dark']`), layout, type, components
- `src/app.html` - inline theme script (reads `localStorage.theme`, falls back to system)
- `studio-personal-website/schemaTypes/` - `siteSettings`, `aboutPage`, `post`, `album`, `photo`, `blockContent`
- `scripts/seed-sanity.mjs` - migrates `content/blog/*.md` plus settings and about copy into Sanity
- `.github/workflows/gh-pages.yml` - builds on push to `main` and on `repository_dispatch` type `sanity-publish`

## Conventions

- Never import `@sanity/client` from client-side code; keep it under `src/lib/server/`.
- Image URLs go through `srcFor`/`srcsetFor` so sample URLs and Sanity assets both work.
- Keep the direction: no borders where a band change will do, no card grids as page structure, one type family.

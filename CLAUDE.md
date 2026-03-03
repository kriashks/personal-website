# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Adarsh Krishnan's personal website, rewritten with **SvelteKit** and **Skeleton UI** using the **Terminus** theme.
It is deployed to GitHub Pages at `https://adarshkrishnan.com/`.

## Development Environment

- Package manager: `npm`
- Framework: `SvelteKit` (TypeScript)
- UI: `@skeletonlabs/skeleton` + `@skeletonlabs/skeleton-svelte`
- Blog source: markdown in `content/blog/*.md`

## Key Commands

### Install dependencies
```bash
npm install
```

### Local development
```bash
npm run dev -- --open
```

### Typecheck
```bash
npm run check
```

### Production build
```bash
npm run build
npm run preview
```

### Scaffold a new blog post
```bash
npm run blog:new -- --title "Your Post Title"
```

## Project Structure

- `src/routes/` - Site routes (`/`, `/about`, `/projects`, `/blog`, `/experiences`)
- `src/lib/server/blog.ts` - markdown loader + parser for blog posts
- `src/app.css` - global styles, Tailwind, and Skeleton theme imports
- `templates/blog-post.md` - template used to scaffold new posts
- `scripts/new-blog.mjs` - blog scaffold CLI
- `static/favicon.svg` - favicon
- `content/blog/` - blog markdown files
- `.github/workflows/gh-pages.yml` - deployment workflow
- `CNAME` - custom domain mapping

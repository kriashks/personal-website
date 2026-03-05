# Adarsh Krishnan - Personal Website

Personal site built with **SvelteKit 2 + Svelte 5** and a custom terminal-inspired design system.

- Framework: SvelteKit (static prerender)
- Styling: Tailwind CSS v4 + custom CSS tokens/components
- Content source for blog posts: `content/blog/*.md`
- Deployed to GitHub Pages via `.github/workflows/gh-pages.yml`

## Local development

```bash
npm install
npm run dev -- --open
```

## Build

```bash
npm run build
npm run preview
```

Static output is generated in `build/`.

## Blog authoring

Blog posts are markdown files in:

- `content/blog/*.md`

Create a new post from template:

```bash
npm run blog:new -- --title "Your Post Title"
```

Optional args:

- `--summary "One line summary"`
- `--slug "custom-slug"`
- `--date YYYY-MM-DD`

Template used by the scaffold command:

- `templates/blog-post.md`

## Site structure

- `src/routes/` - all pages and route handlers
- `src/lib/server/blog.ts` - markdown loader/parser for blog posts
- `src/lib/data/` - reusable data models for nav/about/photography content
- `src/app.css` - global styles and terminal design tokens
- `src/routes/sitemap.xml/+server.ts` - sitemap generation

## Deployment

GitHub Actions workflow builds the site and publishes static output to GitHub Pages on push to `main`.

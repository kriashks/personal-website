# Adarsh Krishnan - Personal Website

Personal site rewritten with **SvelteKit + Skeleton UI** using the **Terminus** theme.

- Framework: SvelteKit (static prerender)
- UI system: Skeleton (`@skeletonlabs/skeleton` + `@skeletonlabs/skeleton-svelte`)
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
- `src/app.css` - global styles and Skeleton/Tailwind imports
- `src/routes/sitemap.xml/+server.ts` - sitemap generation

## Theme

Theme is set globally in `src/app.html`:

- `<html data-theme="terminus">`

## Deployment

GitHub Actions workflow builds the site and publishes static output to GitHub Pages on push to `main`.

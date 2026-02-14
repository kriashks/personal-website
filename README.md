# Adarsh Krishnan - Personal Website

Static multi-page personal website styled with [oat](https://oat.ink/), deployed via GitHub Actions to GitHub Pages and mapped to:

- https://adarshkrishnan.com/

## Local preview

Run any static file server from the repo root, for example:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Blog from Markdown

Blog posts can be authored as structured Markdown files in:

- `content/blog/*.md`

Each file should follow:

```md
---
title: Your Post Title
date: 2026-02-14
slug: your-post-slug
summary: One-line summary for blog list and meta description.
---

Intro paragraph.

## Section heading

- Bullet point
1. Numbered point
```

Generate blog pages from markdown:

```bash
python3 scripts/build_blog_from_md.py
```

This updates:

- `blog/index.html`
- `blog/<slug>/index.html`
- `sitemap.xml`

## Deployment

Deployment is handled by:

- `.github/workflows/gh-pages.yml`

On push to `main`, the workflow builds/publishes static output, auto-runs `scripts/build_blog_from_md.py`, and enforces `CNAME=adarshkrishnan.com`.

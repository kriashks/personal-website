# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static multi-page personal website for Adarsh Krishnan, styled with [oat](https://oat.ink/) and deployed to GitHub Pages at `https://adarshkrishnan.com/`.

## Development Environment

- Primary machine: Windows 11
- Site source is plain HTML/CSS/JS at repo root (`index.html`, `about/`, `projects/`, `blog/`, etc.)

## Key Commands

### Local preview
```bash
python3 -m http.server 8000
```

### GitHub Pages deploy
Deployment is automated on push to `main` via:
- `.github/workflows/gh-pages.yml`

The workflow copies static files into `public/` and enforces `CNAME=adarshkrishnan.com`.

## Project Structure

- `index.html` - Homepage
- `about/index.html` - About page
- `projects/index.html` - Projects page
- `blog/index.html` - Blog listing
- `blog/*/index.html` - Post pages
- `experiences/index.html` - Resume page
- `assets/site.css` - Site styling
- `assets/site.js` - Small client-side enhancements
- `404.html` - Not found page
- `sitemap.xml` - Sitemap
- `CNAME` - Custom domain

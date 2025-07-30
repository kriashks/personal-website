# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Hugo static site generator and the PaperMod theme. The site is deployed to GitHub Pages and available at adarshkrishnan.com.

### Development Environment
- This project will be worked on a windows 11 machine.

## Key Commands

### Development
```bash
# Start local development server with drafts
hugo server -D

# Build site for production
hugo --minify

# Create new content
hugo new blog/post-name.md          # New blog post
hugo new projects/project-name.md    # New project
hugo new experiences/experience.md   # New experience entry
```

### Git Submodules
```bash
# Initialize theme (PaperMod is a git submodule)
git submodule update --init --recursive
```

## Architecture

### Content Organization
- `/content/about/` - About page content
- `/content/post/` - Blog posts (note: URL is /blog/ but content is in /post/)
- `/content/project/` - Project showcases
- `/content/event/` - Event entries
- `/content/authors/` - Author profiles

### Configuration
- `config.yml` - Main Hugo configuration
  - Theme settings (PaperMod)
  - Navigation menu structure
  - Social links configuration
  - Homepage content parameters

### Customization
- `/assets/css/extended/custom.css` - Custom CSS overrides
- `/archetypes/` - Content templates for `hugo new` command
- `/static/` - Static assets (images, CNAME for custom domain)

### Theme
- PaperMod theme located in `/themes/PaperMod/` as git submodule
- Theme provides responsive design, dark mode, and SEO features
- Custom partials can override theme templates in `/layouts/`

## Content Structure

### Front Matter Requirements
Blog posts and content pages use YAML front matter:
```yaml
---
title: "Page Title"
date: 2024-01-01
draft: false
ShowReadingTime: true  # Optional, defaults from config
ShowShareButtons: true # Optional, defaults from config
---
```

### URL Structure
- Blog posts: `/blog/post-slug/`
- Projects: `/projects/project-slug/`
- Experiences: `/experiences/experience-slug/`
- About: `/about/`

## Deployment
Site automatically deploys to GitHub Pages when pushing to main branch. The `public/` directory contains built static files and includes a CNAME file for custom domain.
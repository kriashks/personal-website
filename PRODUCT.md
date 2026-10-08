# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary: readers who arrive at a blog post from a search result or a shared link, on phone or laptop, wanting to read a practical article on data, analytics or software without friction. (inferred from existing content and site description; unconfirmed)
- Secondary: people checking who Adarsh is (recruiters, collaborators, friends) who skim About and browse photography. (inferred; unconfirmed)
- Tertiary: viewers of the photography archive, mostly on phones, looking at travel, street and wildlife images full-bleed. (inferred; unconfirmed)
- The owner, Adarsh Krishnan, who publishes posts, albums, and page copy through Sanity Studio with no code changes. (confirmed)

## Product Purpose

Adarsh Krishnan's personal website at https://adarshkrishnan.com. It publishes practical writing on analytics, experimentation and data systems, and archives photography from travel. Success is a reader finishing a post comfortably and a viewer looking at photos at full size without the interface getting in the way. (confirmed by user: "text focused on the blog section and image focused on the photography section")

## Positioning

A single quiet site holding two different reading modes: long-form text and large photographs. The owner's specific mix of data work and photography is the thing a template cannot copy. (inferred)

## Operating Context

- Static site built with SvelteKit and adapter-static, deployed to GitHub Pages with a custom domain. (confirmed, repo)
- All content (blog posts, photo albums and photos, about page, experience, site settings) will live in a private Sanity project and be fetched at build time; a Sanity publish webhook triggers the GitHub Actions rebuild. (confirmed by user)
- Sanity Studio lives in the repo under `studio/` and is deployed separately with `sanity deploy`. (decided this session)
- Existing blog posts are markdown in `content/blog/` and get migrated into Sanity. (confirmed, repo)

## Capabilities and Constraints

- Routes: home, blog index, blog post, photography index, album, about. Legacy `/projects` and `/experiences` redirect to photography and about. (repo)
- Blog posts carry title, date, summary, tags, estimated read time, body with headings, lists and code blocks. (repo)
- Albums carry title, description, cover, photos; photos carry title, caption, camera, lens, aperture, shutter, ISO. (repo)
- About carries intro, focus areas, skills, experience and education. (repo)
- Light mode is the default; dark mode must be equally usable, with a manual toggle and system preference respected. (confirmed by user)
- Must prerender fully; no server runtime. Image delivery through the Sanity image CDN. (constraint)
- Undecided: whether real photographs exist yet to seed albums. Current albums are Unsplash placeholders and must not be presented as the owner's work. (open)

## Brand Commitments

- Name: Adarsh Krishnan. Voice: plain, practical, first person. (repo)
- Binding visual constraint from the user: "simple white with a very nice and easy to read font for light mode and an equally usable dark mode". No terminal or hacker aesthetic going forward. (confirmed)
- Standing direction preference (confirmed 2026-10-08): an apple.com kind of feel, inspired not copied, with different fonts. Generous white space, large confident headlines, product-style full-bleed imagery, alternating white and soft grey bands, restrained motion. The category standard played straight at that craft level.
- Social: GitHub kriashks, LinkedIn kriash, email adarshkrish@proton.me. (repo)

## Evidence on Hand

- Two real blog posts in `content/blog/`.
- About, skills and experience copy in `src/lib/data/about.ts` and `src/lib/data/resume.ts`.
- No real photographs in the repo; album data in `src/lib/data/photography.ts` is Unsplash placeholder material. Future work must not claim these as the owner's photos.
- Favicon at `static/favicon.svg` (terminal-themed; will be replaced).

## Product Principles

1. The text is the interface on blog pages; nothing competes with the reading column.
2. The photograph is the interface on photography pages; chrome recedes.
3. Content is edited in Sanity, never in code.
4. Light and dark are both first-class, not a tinted afterthought.
5. Everything prerenders; the site stays fast and free to host.

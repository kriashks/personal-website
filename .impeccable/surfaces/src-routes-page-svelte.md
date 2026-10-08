---
version: 1
slug: "src-routes-page-svelte"
primary_target: "src/routes/+page.svelte"
related_targets: ["src/routes/blog/+page.svelte","src/routes/photography/+page.svelte","src/routes/about/+page.svelte"]
---

# Surface brief: whole site redesign (home, blog, blog post, photography, album, about)

Scope: full replacement of the visual world. Modes: home = Experience, blog = Read, photography/album = Experience, about = Read.
Audience: readers arriving at posts from search or links; friends, recruiters and collaborators browsing about and photos; the owner editing in Sanity.
Constraints: static prerender on GitHub Pages; all content from Sanity at build time; light default with equal dark mode and manual toggle.
Chosen direction: apple.com-inspired canon, played straight, different type.

## Direction contract

THESIS: Quiet confidence. Big type, lots of air, the photograph or the paragraph is the only thing in the frame. Refuses the dark hacker terminal and refuses card grids as page structure.
OWN-WORLD: Pure white ground (#fff) with soft grey bands (#f5f5f7-ish) alternating per section; near-black ink; one accent blue used only for links and focus. Dark mode: true black ground with #1d1d1f-style bands, ink #f5f5f7. Type: Figtree for everything, tight tracking at display sizes, 17–19px body on a 65–70ch measure. Rounded 18px corners on image frames, 980px rounded pill buttons. No borders where a band change can do the job. Hairline dividers only inside lists.
STORY: Visitor lands on the name and a one-line claim over a large photograph, understands this is one person who writes and photographs, scrolls into the latest post and a featured album, and chooses to read or look.
FIRST VIEWPORT: Centered headline (name) ~5rem at desktop, one-line subtitle, then a full-width photograph in an 18px-rounded frame filling the rest of the viewport. Nav is a slim translucent bar with the name left and four links right, blurred background on scroll. Primary action: the headline's two links "Read" and "Look", pill buttons under the subtitle.
FORM: Canon (category standard, apple.com as the named competitor). Seed key 3a492b25, user took the standing exit.
Signature interaction: images scale from 0.98 to 1 and fade in as they enter the viewport; album open is a fade-to-black lightbox with keyboard arrows; theme toggle crossfades color via a 300ms transition on root tokens.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

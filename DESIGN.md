---
name: Adarsh Krishnan
description: Quiet confidence. Big type, lots of air, one photograph or one paragraph in the frame.
colors:
  ink: "#1d1d1f"
  ink-2: "#515154"
  ink-3: "#6e6e73"
  paper: "#ffffff"
  paper-band: "#f5f5f7"
  hairline: "rgba(0, 0, 0, 0.09)"
  accent: "#0b63ce"
  accent-ink: "#ffffff"
  nav-glass: "rgba(255, 255, 255, 0.72)"
  code-ground: "#f5f5f7"
  dark-ink: "#f5f5f7"
  dark-ink-2: "#c7c7cc"
  dark-ink-3: "#98989d"
  dark-ground: "#000000"
  dark-band: "#121214"
  dark-hairline: "rgba(255, 255, 255, 0.14)"
  dark-accent: "#3f96ff"
  dark-accent-ink: "#000000"
  dark-nav-glass: "rgba(0, 0, 0, 0.7)"
  dark-code-ground: "#161618"
typography:
  display:
    fontFamily: "Figtree, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  title-1:
    fontFamily: "Figtree, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title-2:
    fontFamily: "Figtree, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title-3:
    fontFamily: "Figtree, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.25rem, 2.2vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  lede:
    fontFamily: "Figtree, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Figtree, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
    fontFeature: "'ss01', 'cv05'"
  prose:
    fontFamily: "Figtree, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.0625rem, 1.1vw + 0.8rem, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  meta:
    fontFamily: "Figtree, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "normal"
  code:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  frame: "1.125rem"
  frame-sm: "0.75rem"
  pill: "999px"
  inline-code: "0.35em"
  focus: "4px"
spacing:
  gutter: "1.25rem"
  gutter-md: "2rem"
  section: "clamp(4rem, 9vw, 7.5rem)"
  section-tight: "clamp(3rem, 6vw, 5rem)"
  page-head-top: "clamp(6.5rem, 14vw, 10rem)"
  page-head-bottom: "clamp(2.5rem, 5vw, 4rem)"
  w-prose: "42rem"
  w-content: "61rem"
  w-wide: "90rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.25rem"
  button-secondary:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.25rem"
  tag:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.65rem"
  nav:
    backgroundColor: "{colors.nav-glass}"
    textColor: "{colors.ink-2}"
    height: "3rem"
  footer:
    backgroundColor: "{colors.paper-band}"
    textColor: "{colors.ink-3}"
    padding: "2.5rem 0"
  frame:
    backgroundColor: "{colors.paper-band}"
    rounded: "{rounded.frame}"
  code-block:
    backgroundColor: "{colors.code-ground}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.frame-sm}"
    padding: "1rem 1.1rem"
---

# Design System: Adarsh Krishnan

## Overview

**Creative North Star: "The Quiet Gallery"**

A personal site holding two reading modes, long-form text and large photographs, on a ground that never competes with either. The category standard (apple.com) played straight with a different face: one sans family, headlines set very large and tightly tracked, air measured in viewport units, and structure carried by alternating white and soft grey bands rather than by boxes, borders or shadows.

Density is low on purpose. A page is a centered headline, a one-line lede, then one thing: a photograph in a rounded frame or a 42rem reading column. Colour is withheld; the only chroma on a page is the accent blue on links and the focus ring, and the photographs themselves. Dark mode is a true black ground with the same bands and the same rules, not a tint.

Motion is restrained and has one grammar: elements fade and settle into place as they enter the viewport, images breathe by 3% on hover, the theme crossfades over 300ms. Every transition is disabled under reduced motion.

**Key Characteristics:**
- One type family (Figtree) at every size, from 0.75rem tags to a 5.5rem display; JetBrains Mono only inside code
- Section structure by band alternation (white, grey, white), never by card or border
- Hairline dividers only inside lists (post rows, timeline rows, code filename bar)
- One accent colour, reserved for links and focus
- 18px rounded frames around every image; pill buttons and pill tags
- Flat: no box shadows anywhere in the shipped UI
- Reveal-on-enter motion, 3% hover zoom, 300ms theme crossfade, all gated by prefers-reduced-motion

## Colors

Monochrome ink on paper with one cool blue held in reserve; dark mode inverts the ground to pure black and keeps the roles.

### Primary
- **Accent Blue** (`accent`, dark `dark-accent`): links (`.link`, `.prose a`), post-title hover, the focus ring, and the 22% text selection tint. Nowhere else.
- **Accent Ink** (`accent-ink`): the on-accent contrast colour. Declared for completeness; no shipped surface currently paints on accent.

### Neutral
- **Ink** (`ink`, dark `dark-ink`): headings, body copy, primary button fill. Also the source of every tonal fill: secondary buttons, tags, social and toggle hovers are `color-mix(ink 7% / 8% / 12%, transparent)`.
- **Ink 2** (`ink-2`, dark `dark-ink-2`): ledes, summaries, nav links at rest, footer links, blockquotes, captions under photo tiles.
- **Ink 3** (`ink-3`, dark `dark-ink-3`): metadata (dates, read time, timeline periods), list markers, figcaptions, footer copyright, code filename bars.
- **Paper** (`paper`, dark `dark-ground`): the page ground.
- **Paper Band** (`paper-band`, dark `dark-band`): alternating section ground, the footer, and the placeholder fill behind every image frame while it loads.
- **Hairline** (`hairline`, dark `dark-hairline`): the only border colour. Appears between post rows and timeline rows, under the code filename bar, and under the nav once scrolled.
- **Nav Glass** (`nav-glass`, dark `dark-nav-glass`): the fixed nav's translucent ground, combined with `saturate(180%) blur(20px)`.
- **Code Ground** (`code-ground`, dark `dark-code-ground`): inline code and code block fill.

### Named Rules
**The One Accent Rule.** Accent blue is spent only on links and the focus ring. Buttons are ink, not blue. If a surface needs emphasis, use weight, size or a band change, never a second colour.

**The Ink Mix Rule.** Every subtle fill is ink at a low opacity over transparent (7% at rest, 12% on hover, 8% for the theme toggle hover), so one token produces the right tint in both themes.

**The Both Themes Rule.** Light and dark are equal citizens. Every token has a dark pair under `:root[data-theme='dark']`; the theme is chosen before paint by the bootstrap script in app.html (stored preference, then system), and a toggle crossfades `background-color`, `color` and `border-color` over 300ms.

## Typography

**Display Font:** Figtree (with system-ui, -apple-system, Segoe UI, sans-serif)
**Body Font:** Figtree (same family, same stack)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo, monospace), code only

**Character:** One geometric humanist sans doing every job. Headlines go heavy (700 to 800) and tightly tracked (-0.015em to -0.035em) with `text-wrap: balance`; body stays regular at 17px with `ss01` and `cv05` enabled for the single-storey a and open forms. Both faces are self-hosted variable WOFF2 files with Latin unicode-range subsetting; Figtree regular is preloaded.

### Hierarchy
- **Display** (800, clamp(2.75rem, 7vw, 5.5rem), 1, -0.035em): the home page name only.
- **Title 1** (700, clamp(2.25rem, 5vw, 3.5rem), 1.08, -0.03em): page and post titles in a page head.
- **Title 2** (700, clamp(1.75rem, 3.6vw, 2.5rem), 1.08, -0.025em): section headings ("Latest writing", "Photography").
- **Title 3** (600, clamp(1.25rem, 2.2vw, 1.5rem), 1.08, -0.015em): sub-section headings.
- **Lede** (400, clamp(1.125rem, 2vw, 1.375rem), 1.55, Ink 2): the one-line claim under a page-head title; balanced, max 38rem, centered.
- **Body** (400, 1.0625rem, 1.55): default UI text, summaries, album captions.
- **Prose** (400, clamp(1.0625rem, 1.1vw + 0.8rem, 1.1875rem), 1.65): article body inside the 42rem column (about 65 to 70ch). Headings scale off the body em (h2 1.75em, h3 1.3em, h4 1.05em); paragraphs are spaced 1.4em; links underline in accent with 1px thickness and 0.18em offset.
- **Meta** (500, 0.875rem, Ink 3): dates and read times, set with tabular numerals via `.numeric`.
- **Nav / footer** (500, 0.8125rem): nav links and footer links; brand is 700 at 0.95rem.
- **Tag** (600, 0.75rem, Ink 2): pill tags and skill chips.
- **Code** (JetBrains Mono, 0.85rem in blocks, 0.88em inline, 0.75rem for the filename bar).

### Named Rules
**The One Family Rule.** Figtree is the display face and the body face. No serif, no second sans, no system display face. JetBrains Mono appears only inside `code`, `pre` and `kbd`.

**The No Eyebrow Rule.** Headings stand alone. There are no kicker or eyebrow labels, no small-caps category lines above titles, and no uppercase tracked labels anywhere in the system. Metadata sits below the lede in Meta style.

## Layout

Three centered containers, each with a 1.25rem gutter that widens to 2rem at 48rem: prose (42rem) for reading columns and page-head text on article pages, content (61rem) for the nav inner, post cover images and the footer, and wide (90rem) for hero photographs and album grids. Pages are built as stacked full-width sections; the section itself is `clamp(4rem, 9vw, 7.5rem)` tall in padding (tight variant `clamp(3rem, 6vw, 5rem)`), and a page head pads `clamp(6.5rem, 14vw, 10rem)` on top to clear the fixed 3rem nav and give the title air.

Sections alternate ground: white, grey band, white. The band carries the section boundary; nothing else does. The footer sits on a band with no border above it.

Lists are the only place a grid appears inside a column. Post rows are a single column on mobile and a 9rem date column plus content at 48rem; timeline rows use an 11rem period column. Album and photo grids are one column until 40rem, then two columns (album gap 1.5rem, photo gap 2rem by 1.25rem). Nothing goes beyond two columns except the about-page three-column focus grid at 48rem.

Responsive breakpoints actually used: 30rem (nav link size and gap shrink), 40rem (grids go to two columns), 48rem (gutters widen, list rows gain their side column, lightbox stage gains 4rem side padding).

## Elevation & Depth

Flat. No box shadow is painted on any shipped surface; a `--shadow` token exists in the stylesheet but nothing references it, and it is not part of the system. Depth is conveyed by three devices only: ground change (white to band), tonal fills (ink at 7% to 12%), and the translucent blurred nav sitting over scrolling content. The lightbox is a separate world on pure black with its controls as white at 10% to 20%.

### Named Rules
**The Band Not Border Rule.** Where a region needs to read as distinct, change its ground to the band colour. Borders are not a sectioning device; hairlines are reserved for separating items inside one list.

**The No Card Rule.** Content is never boxed. An album "card" is a frame, a heading and a line of text with no background, border or shadow; a post row is a hairline-separated grid row.

## Shapes

Two corner languages. Images sit in frames with a generous 1.125rem radius (0.75rem for photo tiles inside an album, 6px for the lightbox stage image, 0.35em for inline code, 0.75rem for code blocks). Interactive chrome is fully round: buttons, tags, the theme toggle, social buttons, lightbox controls and even the scrollbar thumb use a 999px pill radius. The focus ring takes a 4px radius with a 3px offset. Nothing is square except the page itself.

Frames clip their image with `overflow: hidden`, carry the band colour as a loading placeholder, and set `object-fit: cover` on the image at a declared aspect ratio (16:9 hero, 2:1 post cover, 4:3 album cover).

## Components

### Buttons
Character: ink pills, confident but plain.
- **Shape:** full pill (999px), inline-flex with 0.4rem icon gap, 0.7rem by 1.25rem padding, 1rem at weight 600, line-height 1.
- **Primary:** ink fill with paper text (inverts in dark mode); hover drops opacity to 0.86 and lifts 1px; active returns to baseline and scales to 0.98.
- **Secondary:** ink at 7% over transparent with ink text; hover deepens to 12% and lifts 1px.
- **Transitions:** transform, background-color, color and opacity at 220ms on the house ease; all disabled under reduced motion.
- **Use:** two hero pills on the home page ("Read the blog", "See the photographs"). The rest of the site navigates with links.

### Links and arrows
- **Text link:** accent colour at weight 500, no underline at rest, underline on hover with 0.2em offset. Inside prose, links are always underlined (1px, 0.18em offset).
- **Arrow link:** a text link followed by a drawn SVG chevron (0.95em square, 1.75 stroke, currentColor, from the Icon component) with 0.2em gap; the chevron slides 3px right on hover (200ms). The back variant leads with an arrow-left glyph and slides 3px left.
- **Rule:** arrows are SVG paths, never Unicode characters.

### Tags
- **Style:** pill, 0.75rem at weight 600, Ink 2 on ink-7% fill, 0.3rem by 0.65rem padding, 0.5rem gap in a wrapping row. Static; no hover or selected state. Used for post tags and about-page skills.

### Media frames
- **Frame:** 1.125rem radius, band-colour placeholder, clipped, `object-fit: cover`, aspect ratio set inline per use. Photo tiles use the 0.75rem variant.
- **Hover variant:** image scales to 1.03 over 900ms on the house ease; used on album covers.
- **Captions:** 0.875rem Ink 2 beneath photo tiles, title left and detail right in a flex row.

### Reveal
The one motion signature. A wrapper starts at opacity 0, translated 14px down and scaled to 0.985; when 8% of it enters the viewport (with an 8% bottom margin) it transitions to rest over 700ms opacity and 900ms transform on `cubic-bezier(0.2, 0.8, 0.2, 1)`. Siblings stagger with an inline delay of 60 to 80ms per item. Under `prefers-reduced-motion: reduce` the element is visible at rest with no transition, and smooth scrolling is turned off.

### Navigation
- **Bar:** fixed, 3rem tall, translucent nav-glass ground with `saturate(180%) blur(20px)`, content width 61rem. A transparent bottom border becomes a hairline once the page has scrolled 8px (300ms).
- **Brand:** site name, 700 at 0.95rem, Ink, tracking -0.02em, left.
- **Links:** 0.8125rem at weight 500 in Ink 2, 1.5rem gap; hover and `aria-current="page"` turn Ink. No underline, no pill, no indicator.
- **Theme toggle:** 2rem round button, transparent, Ink 2 sun or moon SVG; hover gets ink-8% fill.
- **Mobile:** same row, gap tightens to 0.9rem and links drop to 0.78rem below 30rem. No hamburger.

### Footer
Band ground, 2.5rem vertical padding, 0.8125rem Ink 3 copy. Copyright left, social links right (SVG icon plus label, Ink 2, hover Ink). No border above; the band change is the edge. A centered sample-content notice may follow at 0.8125rem Ink 3.

### Post list
Hairline-separated rows (top border on each row after the first), 2rem to 2.5rem vertical padding, date in Meta style on the left column, title at 600 weight clamp(1.375rem, 2.4vw, 1.75rem) that turns accent on hover, summary in Ink 2 at 60ch, read time in Meta below.

### Code block
0.75rem radius on the code ground, optional filename bar in mono 0.75rem Ink 3 with a hairline beneath, 1rem by 1.1rem padded `pre` at 0.85rem, line-height 1.6, horizontal scroll. Inline code is 0.88em on the same ground with 0.15em by 0.4em padding.

### Lightbox
Fixed full-screen dialog on pure black (#000) with #f5f5f7 text, fading in over 260ms; the image fades and scales from 0.985 over 320ms, max-fit with a 6px radius. Three-row grid: a bar with the "n of N" counter and a round close button, the stage with round prev/next buttons (2.75rem, white at 10%, 20% on hover) at the edges, and an info block (title 1.125rem at 600, caption at 0.95rem in #a1a1a6, EXIF list at 0.8125rem with tabular numerals, keys in #98989d and values in #d1d1d6). Escape closes, arrow keys navigate, touch swipe navigates. The lightbox palette is fixed and does not follow the theme tokens.

## Do's and Don'ts

### Do:
- **Do** structure a page as stacked sections and alternate the ground (white, band, white); let the band change be the only boundary.
- **Do** put every image in a frame (1.125rem radius, band placeholder, declared aspect ratio) and wrap sections in Reveal so they settle in on entry.
- **Do** set reading text in the 42rem prose container at the Prose size; keep ledes at 38rem, balanced and centered under a page-head title.
- **Do** spend accent blue only on links and the focus ring; emphasise with weight, size or ground instead.
- **Do** keep hairlines (`hairline` at 9% black / 14% white) to separating rows inside one list and the scrolled nav edge.
- **Do** draw arrows and icons as inline SVG from the Icon component (24 viewBox, 1.75 stroke, currentColor).
- **Do** give every token a dark pair and build fills with `color-mix(ink N%, transparent)` so both themes come for free.
- **Do** honour `prefers-reduced-motion`: no reveal, no hover zoom, no button lift, no smooth scroll.

### Don't:
- **Don't** use cards, boxes or bordered panels as page structure; no backgrounds, borders or shadows around content groups.
- **Don't** add eyebrow, kicker or category labels above headings, and no uppercase tracked labels anywhere.
- **Don't** introduce a second type family; Figtree does every role and JetBrains Mono stays inside code.
- **Don't** paint box shadows; the system is flat and `--shadow` is unused.
- **Don't** fill buttons with accent blue; buttons are ink (primary) or ink-7% (secondary).
- **Don't** use Unicode glyphs (→, ›, ←) as arrows or icons.
- **Don't** go beyond two columns for content grids below 61rem, or stack a third ground tone; there is paper, band and nothing else.
- **Don't** draw a border above the footer or beneath section headings.

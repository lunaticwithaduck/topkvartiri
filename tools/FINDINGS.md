# Reference research — findings

What was extracted from [topkvartiri.com](https://www.topkvartiri.com/) (client's current site, brand source) and [boutiqueholiday-pirin.com](https://boutiqueholiday-pirin.com/) (design reference the client wants cloned). All artifacts under `tools/output/`.

## TL;DR

- **Client palette**: navy `#0e1e3f` + warm gold `#bb9b69` + cream `#fffcf6`, with `#303030` body text. Classic Bulgarian real-estate look.
- **Reference site** is WordPress + Hello Elementor + Elementor 4.0.4 + WPML. No reusable "template" we can download — page layouts live in Elementor (WP DB), not in theme files.
- **Reference palette is similar**: warm cream bg, dark grey text, warm copper accent — same family as the client's, just shifted toward earth tones. A reskin from copper → gold/navy will land cleanly.
- **Reference typography** is single-font: **Jost** (geometric sans-serif), with `-apple-system` as fallback. Size ladder: 15/16/17/20 (body) and 22/26/30/36/40 (headings).
- **9 routes fully mirrored** at [output/reference/mirror/](output/reference/mirror/) — serve with `pnpm ref:serve` → http://localhost:4173/_index.html for a real, browseable local copy. This is the primary design reference. Screenshots are the archive.

## Client brand palette (topkvartiri.com)

Hybrid extraction (CSS computed-style frequencies + pixel k-means in Lab). Full data in [output/palette/palette.json](output/palette/palette.json); visual swatch sheet in [output/palette/palette.html](output/palette/palette.html).

| # | hex | role | source signal |
|---|-----|------|---------------|
| 1 | `#0e1e3f` | **brand primary** (navy) | 1868 CSS uses (text/borders/bg) + visible pixels |
| 2 | `#fffcf6` | background (cream) | 68% of pixel area + 403 CSS uses |
| 3 | `#303030` | body text (dark grey) | 2004 CSS uses, weighted on text content |
| 4 | `#000000` (α=0.6) | overlay | declared with 60% alpha — modal scrims |
| 5 | `#e2ecff` | surface highlight (pale lavender) | small but distinct usage |
| 6 | `#bb9b69` | **brand accent** (warm gold) | 433 CSS uses, fills + backgrounds |
| 7 | `#76644a` | (imagery) | pixel-only — comes from property photos, **not** a brand token |
| 8 | `#6e6e6e` | text-muted (mid grey) | secondary text + borders |

For tokens, **use #1, #2, #3, #5, #6, #8** as the design system. Skip #7 (imagery) and treat #4 as `overlay-alpha-60` rather than a base color.

## Reference site (boutiqueholiday-pirin.com)

### Tech stack
- WordPress
- Theme: **Hello Elementor** (free, blank-canvas starter from Elementor team — no design lives in theme files)
- Page builder: **Elementor 4.0.4** with "additional_custom_breakpoints" feature on
- Multilingual: **WPML 4.9.2.1** (Bulgarian primary, English + Russian alternates)
- Lightbox: Elementor's built-in (`data-elementor-open-lightbox="yes"`, `data-elementor-lightbox-slideshow="..."`)
- Mobile menu trigger: `.elementor-menu-toggle` (a `<div role="button">`, NOT a `<button>` — caught us out during automated interaction tests)

### Typography (aggregated across 9 pages)
- **Single font**: Jost — 322 element appearances. Everything else is `-apple-system` fallback (29).
- **Size ladder** (px, by usage): 17 (body, dominant) → 16, 15 (smaller body) → 20 (lead) → 26, 22 (sub-headings) → 30, 36, 40 (headings)
- Pure sans-serif, no serif at all. Modernist/clean.

### Reference site colors (NOT for client tokens — for understanding their visual language)

| rgb | hex | role | weighted usage |
|-----|-----|------|----------------|
| `rgb(51,51,51)` | `#333333` | primary text | 173,066 |
| `rgb(242,237,231)` | `#F2EDE7` | primary background (warm cream) | 29,719 |
| `rgb(66,64,64)` | `#424040` | secondary text | 20,220 |
| `rgb(228,224,220)` | `#E4E0DC` | secondary surface | 11,167 |
| `rgb(255,255,255)` | `#FFFFFF` | white | 7,746 |
| `rgb(0,0,0)` | `#000000` | dark accent | 6,568 |
| `rgb(62,63,63)` | `#3E3F3F` | very dark surface | 5,936 |
| `rgb(175,121,75)` | `#AF794B` | **brand accent (warm copper)** | 2,857 |

**Reskin observation**: their accent `#AF794B` (copper) and our accent `#BB9B69` (gold) are sibling earth-tones. Their `#F2EDE7` cream and our `#FFFCF6` cream differ by ~5% lightness. The reskin direction is: swap their copper → our gold, lift their cream slightly, and add our navy `#0E1E3F` as a secondary brand color they don't have. Everything else (text greys, whites, blacks) carries over.

### Spacing
- Most common paddings: 10px (349 uses), 14px (146), 13px (144), 5px (121), 15px (89). Elementor defaults.
- Notable outlier: 181.656px (51 uses) — likely a calculated container offset, not a token. Ignore.
- Border-radius: 3px (32, common buttons/cards), 10% (20, circular elements), 50% (19, avatars).

### Per-page summary

| route | page height | sections | states captured | notes |
|-------|------------:|---------:|-----------------|-------|
| `/` | 5,698px | 10 | desktop, mobile | landing |
| `/accommodation/` | 7,721px | 13 | desktop, mobile | listing — longest page |
| `/services/` | 4,211px | 7 | desktop, mobile | services |
| `/activities/` | 2,560px | 4 | desktop, mobile | activities |
| `/prices/` | 1,923px | 7 | desktop, mobile | pricing |
| `/gallery/` | 5,029px | 6 | desktop, mobile, **desktop-gallery** | image grid, lightbox fires |
| `/contacts/` | 1,657px | 5 | desktop, mobile | shortest page |
| `/house/` | 3,224px | 7 | desktop, mobile, **desktop-gallery** | property type page, lightbox fires |
| `/ap-105/` | 4,606px | 6 | desktop, mobile, **desktop-gallery** | single property detail |

65 section crops total in [output/reference/pages/*/sections/](output/reference/pages/).

**Mobile nav state**: 0/9 captured. The Elementor menu toggle is `.elementor-menu-toggle` (a `<div role="button">`), and even though that selector is now first in `MOBILE_MENU_SELECTORS`, it doesn't visibly fire in our headless capture — possibly hidden by a CSS media query that needs the mobile context's user-agent string, possibly a timing issue with Elementor's JS init. Not blocking — you can inspect the mobile nav directly in the local mirror at a 390px viewport in DevTools.

## Component patterns observed

From `digest.components` across pages and the section crops:
- Heavy `<img>` usage on detail pages (gallery has 50+ images per page).
- Forms exist on `/contacts/` (one) and likely on listing/detail booking flows.
- `<button>` count is low; most interactive elements are `<a>` styled as buttons or `<div role="button">` (Elementor convention).
- Each visual "band" of a page is a top-level `<section>` directly under `<main>` — Elementor's structural pattern. Headers and footers are separate `<header>` / `<footer>` siblings.
- Navigation: top-level horizontal menu inside `<header>`. Sub-menus expand on hover (desktop) or click (mobile, via the toggle).

## How to use these artifacts

For scaffolding the new app, the recommended workflow:

1. **Start the local mirror** — `pnpm -C tools ref:serve`, open http://localhost:4173/_index.html. Click between pages, inspect real CSS, resize for responsive.
2. **For specific section references**, look at `output/reference/pages/<slug>/sections/NN-tag.png` — each is normal-sized and shows one visual band.
3. **For the brand palette**, source from [output/palette/palette.json](output/palette/palette.json). The 7 useful tokens are listed above.
4. **For typography**, use Jost (Google Fonts) as the primary font to match the reference. Size ladder 15/16/17/20/22/26/30/36/40 maps cleanly to common Tailwind scales.
5. **For computed-style details** (full color table per page, all paddings, full section tree), read [output/reference/design-data.json](output/reference/design-data.json) or [output/reference/design-notes.md](output/reference/design-notes.md).
6. **The page.html dumps** at `output/reference/pages/<slug>/page.html` are useful for grep'ing for specific patterns (class names, ARIA roles, data attributes).

## Re-running the extractors

If the client site changes or you want to regenerate any artifact:

```sh
cd tools

pnpm palette                  # re-derive brand palette from topkvartiri.com
pnpm palette --url=...         # point at a different URL
pnpm palette --headed          # show the browser

pnpm ref:crawl                 # re-discover routes on the reference site
pnpm ref:capture               # re-screenshot + re-digest + re-crop sections
pnpm ref:mirror                # re-mirror the full site locally
pnpm ref:serve                 # serve the mirror at http://localhost:4173
```

All output is gitignored — re-running overwrites. See [README.md](README.md) for flag details.

## Caveats / known gaps

- **Mobile-nav state not captured** — see notes above. Workaround: inspect the mirror at mobile viewport in DevTools.
- **No lightbox on listing/landing pages** — the Elementor lightbox markers are only on detail/gallery pages, so `desktop-gallery.png` exists only for `/gallery/`, `/house/`, `/ap-105/`. Expected; not a miss.
- **Cross-origin assets aren't mirrored** — Google Fonts, analytics, etc. stay external. The mirror works fully online; offline it'll be missing fonts (text will fall back to sans-serif).
- **WPML translations not mirrored** — we curated to the BG version only. EN and RU exist on the live site; re-add to `routes.json` and re-run mirror/capture if you need them.

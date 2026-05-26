# topkvartiri

A new PoC for a Bulgarian real-estate client. The brief: clone the design of [boutiqueholiday-pirin.com](https://boutiqueholiday-pirin.com/) and reskin it with the client's brand (sourced from their current site [topkvartiri.com](https://www.topkvartiri.com/)).

**Status as of 2026-05-26**: Pre-scaffold tooling complete. App stack not yet picked.

## Read this before starting work

[`tools/FINDINGS.md`](tools/FINDINGS.md) is the authoritative summary of:
- The 8-color brand palette extracted from topkvartiri.com (use #1, #2, #3, #5, #6, #8 as tokens; skip #7).
- The reference site's tech stack (WordPress + Hello Elementor + Elementor 4.0.4 + WPML).
- The reference typography (single font: **Jost**) and size ladder (15/16/17/20/22/26/30/36/40).
- Per-page heights, section counts, and which interactive states were captured.
- Reskin notes (their copper → our gold; their cream → our cream, slightly lighter).

## Artifacts

Everything is under [`tools/output/`](tools/output/) (gitignored). To regenerate, see [`tools/README.md`](tools/README.md).

| What | Where |
|---|---|
| Brand palette JSON | `tools/output/palette/palette.json` |
| Brand palette swatch sheet | `tools/output/palette/palette.html` (open in browser) |
| **Local mirror of reference site** | `tools/output/reference/mirror/` — **start here for design work** |
| Per-route design brief | `tools/output/reference/design-notes.md` |
| Structured digest (typography/colors/spacing) | `tools/output/reference/design-data.json` |
| Per-route HTML + screenshots + section crops | `tools/output/reference/pages/<slug>/` |

## Browsing the reference

```sh
cd tools
pnpm ref:serve     # → http://localhost:4173/_index.html
```

A real working local copy of the reference site. Click between pages, inspect element on real CSS, resize for responsive. This is the primary design reference; screenshots are the archive.

## Stack guidance

The stack is unpicked. When choosing, factor in:
- **Bulgarian primary** with likely Russian + English support → i18n is non-optional.
- **Real-estate vertical** → image-heavy galleries, listing/detail patterns, contact/booking forms.
- **Reference uses Jost** (Google Font) — bring it in via your framework's font loader.
- The sibling project [`../majstorbg/`](../majstorbg/) is a Next.js 16 + React 19 + Tailwind 4 + Radix monorepo with pnpm — useful as a structural reference, not a constraint.

## Conventions

- Tooling lives in `tools/` (self-contained, no relation to the eventual app stack). Re-runnable; outputs to `tools/output/`.
- Don't commit `tools/output/` (gitignored). Don't commit `tools/node_modules/`.
- When working on UI, default to mirroring boutiqueholiday-pirin's structure (header → main with stacked `<section>` bands → footer), reskinned with the client palette.

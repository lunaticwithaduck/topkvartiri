# site-research-tooling

Reusable Node/Playwright tooling for two jobs:

- derive a brand palette from a live site
- crawl, mirror, and capture a design-reference site

This directory is now self-contained enough to split into its own repository unchanged. The only project-specific values live in [`tooling.config.json`](./tooling.config.json).

## Reusing it in another project

1. Copy this directory into a new repo.
2. Run `corepack pnpm install`.
3. Edit `tooling.config.json` with your own URLs, output paths, and names.
4. Run the scripts below from the tooling repo root.

## Config

`tooling.config.json` is resolved relative to its own location, so you can move the repo anywhere without changing the scripts.

```json
{
  "projectName": "your-project",
  "palette": {
    "url": "https://example.com/",
    "outputDir": "output/palette",
    "screenshotName": "home.png",
    "htmlTitle": "example palette"
  },
  "reference": {
    "url": "https://reference-site.com/",
    "outputDir": "output/reference",
    "routesFile": "output/reference/routes.json",
    "mirrorDir": "output/reference/mirror"
  },
  "quendoo": {
    "url": "https://booking.example.com/",
    "outputDir": "output/quendoo"
  }
}
```

Every script also accepts `--config=/absolute/or/relative/path/to/tooling.config.json`, and the network-facing scripts still accept direct overrides like `--url=...` or `--routes=...`.

## Commands

```sh
pnpm palette
pnpm ref:crawl
pnpm ref:capture
pnpm ref:mirror
pnpm ref:serve
pnpm quendoo:capture
```

## Notes

- Output stays under `output/` by default and is gitignored.
- `ref:serve` now reads the mirror location from `tooling.config.json`; use `--root=...` to override it.
- `postinstall` installs Playwright Chromium automatically.

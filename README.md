# Modern-design-system
Modern is a bold design system featuring warm paper, uppercase typography, colour blocks, 2px ink rules and soft-cornered icons. Includes a 21-topic design spec, design tokens, icon gallery, interactive labs, shared UI components and an applied portfolio example.


## Live preview

**https://indchin.github.io/Modern-design-system/**

The whole system is browsable: colour with measured contrast, type, layout, the 45-icon set, illustration, motion, page transitions, and the portfolio and case-study components — every one of them live and interactive.

### Enabling it (one-time)

GitHub Pages serves the committed `docs/` folder, so there is no build step on GitHub's side:

1. Repository **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` · **Folder:** `/docs` → **Save**

The site is live within a minute or two.

## What's here

| Path | What it is |
| --- | --- |
| [`MODERN-DESIGN-SYSTEM.md`](MODERN-DESIGN-SYSTEM.md) | The specification — 21 topics, the source of truth |
| `src/design-system/` | The executable copy: tokens, icons, illustrations, labs and components |
| `src/content/portfolio.ts` | Generic sample content for the demos — replace it to preview with your own |
| `docs/` | The static build GitHub Pages serves |

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
```

## Update the published preview

`docs/` is a build artefact — it does not rebuild itself. After changing any source file:

```bash
npm run build:pages  # builds the static export into docs/
git add -A && git commit -m "Update preview" && git push
```

## Notes

- Everything is scoped under `.ms`, so it cannot leak into a host application's styles.
- The reference fonts (Manuka, Financier Display, Basis Grotesque Pro) are licensed and not bundled; Inter and Cormorant Garamond stand in.
- Demo content is placeholder text. Nothing in the preview describes a real project.

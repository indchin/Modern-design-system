# Modern — Design System

Design system for the portfolio of Chinmay Sharma, Lead Product Designer.

**Version** 1.7 · **Status** specified and previewed in code · **Live preview** https://indchin.github.io/Modern-design-system/ · **Source** `src/design-system/`

Modern keeps the 21-topic structure of the earlier *Paper & Ink* system and rebuilds the visual language from thebranchmedia.org: loud uppercase type on warm paper, colour delivered as whole blocks, 2px ink rules — and a soft-cornered icon set drawn specifically for it.

---

## How to read this document

| Convention | Meaning |
| --- | --- |
| ◆ | Value read from thebranchmedia.org's theme stylesheet. Everything unmarked is designed here. |
| **MUST / SHOULD / MAY** | RFC 2119 sense. Every MUST is testable by a person or a linter. |
| `code` | A token, class or property name used verbatim in the implementation. |
| Ratio `n:1` | Contrast computed with the WCAG 2.x relative-luminance formula. |

**Source of truth.** This file is the specification. `src/app/design-system-modern/` is the executable copy: tokens in `modern.css`, icons in `icons.tsx`, live demonstrations in `page.tsx`, `icon-gallery.tsx`, `layout-lab.tsx` and `motion-lab.tsx`. When the two disagree, this file wins and the code is a bug.

**Extraction note.** From the reference stylesheet: `#F2F2EA`, `#333333`, `#ECECE3`, `#101820`, `#FEBE1E`, `#00BE5A`, `#FFA9F0`, `#FF640A`, `#A2A2A2`; families Basis Grotesque Pro, Financier Display, Manuka; pill radii 110px and 40px; 300ms ease transitions; breakpoints 1024 / 768 / 600 / 425. Everything else — scales, rules, components, icons, motion, governance — is designed for this portfolio.

### Contents

§ [Principles](#1-principles) · 2. [Colour](#2-colour) · 3. [Typography](#3-typography) · 4. [Layout, grid and spacing](#4-layout-grid-and-spacing) · 5. [Shape](#5-shape)
§ [Iconography](#6-iconography) · 7. [Imagery and illustration](#7-imagery-and-illustration) · 8. [Motion](#8-motion) · 9. [Animation patterns](#9-animation-patterns) · 10. [Components](#10-components) · [10b Portfolio](#10b-portfolio-components) · [10c Case study](#10c-case-study-components)
§ [Case-study blocks](#11-case-study-blocks) · 12. [Page patterns](#12-page-patterns) · 13. [Responsive](#13-responsive) · 14. [Accessibility](#14-accessibility) · 15. [Voice](#15-voice-and-content)
§ [Data and charts](#16-data-and-charts) · 17. [Tokens](#17-tokens) · 18. [Governance](#18-governance) · 19. [Performance and SEO](#19-performance-seo-and-sharing) · 20. [Implementation](#20-implementation-notes) · 21. [Changelog](#21-changelog)

---

## 1. Principles

1. **Say it loud.** One statement per screen, set in heavy uppercase. A headline that needs a second clause becomes a second headline.
2. **Paper first, colour as event.** Paper is the canvas. Colour arrives as whole blocks — a band, a hover fill, a CTA — never as sprinkles.
3. **Hard edges, soft ends.** 2px ink rules and bordered blocks give the structure; buttons, tags and every icon terminal are round. Nothing in this system has a sharp corner.
4. **Evidence in plain language.** Declarative first person. Every claim traces to portfolio content.
5. **Motion explains, never decorates.** Each animation answers one question: *where did that come from*, *what can I press*, or *what just changed*.
6. **Contrast is a rule, not a taste.** Measured before it ships. §2 is binding.

**The decision test.** When two options conflict, choose the one that (a) keeps text readable, (b) works with motion and hover both switched off, (c) uses fewer colours. In that order.

**Voice of the system:** direct, confident, a little wry. Short sentences.

---

## 2. Colour

### 2.1 Core palette

| Token | Hex | Role | Never |
| --- | --- | --- | --- |
| `--paper` ◆ | `#F2F2EA` | Page background | — |
| `--sand` ◆ | `#ECECE3` | Inset surface: tables, code, lab frames, quiet blocks | As a button fill |
| `--ink` ◆ | `#333333` | Body text, 2px rules, borders | Headlines |
| `--deep` ◆ | `#101820` | Headlines, dark bands, primary button, text on any accent | Long body copy on dark |
| `--muted` | `#6B6B63` | Secondary text, captions, helper text | Anything load-bearing |
| `--yellow` ◆ | `#FEBE1E` | Primary accent: hover fill, CTA block, focus ring on dark | Text or sole border on paper |
| `--orange` ◆ | `#FF640A` | Alt accent: error marker, emphasis word on deep | Text on paper; any text colour on it other than `deep` |
| `--green` ◆ | `#00BE5A` | Positive state fill, "do" marker | Text on paper |
| `--pink` ◆ | `#FFA9F0` | Highlight tag fill, illustration, placeholder media | Text or sole border on paper |
| `--stone` ◆ | `#A2A2A2` | Disabled fill, secondary text on dark | Informational text on paper |
| `--white` | `#FFFFFF` | Input fill on focus only | Page background |

### 2.2 Semantic mapping

| Semantic | Token | Paired glyph (never colour alone) |
| --- | --- | --- |
| Default surface | `--paper` | — |
| Raised / inset | `--sand` | — |
| Primary action | `--deep` fill → `--yellow` on hover | optional `arrow-right` |
| Emphasis / selected | `--yellow` | — |
| Error | `--orange` chip + bar | `alert` |
| Success | `--green` | `check-circle` |
| Information | `--deep` | `info` |
| Disabled | `--stone` | — |

### 2.3 Measured contrast — binding

Text needs 4.5:1, large text (≥ 24px, or ≥ 19px bold) needs 3:1, non-text boundaries need 3:1.

#### Allowed

| Foreground / background | Ratio | Use |
| --- | --- | --- |
| deep / paper | 15.90 | Headlines |
| deep / sand | 15.06 | Headlines on inset |
| ink / paper | 11.23 | Body |
| ink / sand | 10.63 | Body on inset |
| deep / yellow | 10.74 | Text on primary accent |
| deep / pink | 10.38 | Text on highlight |
| deep / green | 7.25 | Text on success |
| deep / orange | 6.03 | Text on error chip, any size |
| deep / stone | 7.01 | Disabled label |
| muted / paper | 4.78 | Secondary text |
| muted / sand | 4.52 | Secondary text on inset — do not lighten further |
| muted / white | 5.37 | Helper text in a focused input |
| paper / deep | 15.90 | Body on dark band |
| yellow / deep | 10.74 | Focus ring and emphasis on dark |
| pink / deep | 10.38 | Emphasis on dark |
| stone / deep | 7.01 | Secondary text on dark |
| orange / deep | 6.03 | Emphasis word on dark, any size |

#### Banned — do not rediscover these

| Foreground / background | Ratio | Why |
| --- | --- | --- |
| ink / orange | 4.26 | Fails for small text; use `deep` |
| orange / paper | 2.64 | Fails everywhere |
| paper / orange | 2.64 | Fails everywhere |
| green / paper | 2.19 | Fails everywhere |
| muted / yellow | 3.22 | Fails. Secondary text on an accent is `deep` |
| muted / pink | 3.12 | Fails |
| muted / green | 2.18 | Fails |
| pink / paper | 1.53 | Effectively invisible |
| yellow / paper | 1.48 | Effectively invisible |

### 2.4 Non-text contrast

`yellow` on `paper` is 1.48:1 — invisible as a boundary. Accent fills are legible only because their edge is a 2px `ink` border at 11.23:1.

> **Rule.** An accent colour MUST NOT be the only thing defining an edge, a focus state, or a chart boundary. Give it an `ink` or `deep` border.

### 2.5 Rules

1. Text on any accent fill MUST be `deep` — **including `muted` labels and captions**, and including a surface that only
   becomes an accent fill on hover. A card that turns yellow on hover must switch its secondary text to `deep` in the
   same state. (`muted` on yellow is 3.22:1.)
2. `yellow`, `pink`, `orange` and `green` MUST NOT be used as text or as a sole boundary on `paper`.
3. One accent per section. Two only in a legend, a chart, or this document's colour page.
4. State MUST pair colour with a glyph or words. Error = `alert` chip plus a message; success = `check-circle` plus a message.
5. A new colour requires a measured row in §2.3 before it is used anywhere.

### 2.6 Dark mode

Out of scope for v1.0. If added: swap `paper ↔ deep` and `ink ↔ paper`; accents stay as they are, since all four already clear 6:1 on `deep`; re-measure `muted`, which will need to lighten to about `#9A968C`.

---

## 3. Typography

### 3.1 Families

| Role | Reference ◆ | Repo substitute | Used for |
| --- | --- | --- | --- |
| Display | Manuka (condensed caps) | Inter 800, uppercase | h1–h3, stat numbers |
| Serif accent | Financier Display | Cormorant Garamond italic — `--font-display` | One emphasis word per headline |
| Text | Basis Grotesque Pro | Inter — `--font-sans` | Body, UI, buttons |
| Label | — | JetBrains Mono — `--font-mono` | Categories, years, captions, nav, code |

The three reference families are licensed and are **not** bundled. After any font swap, re-check Display XL line breaks at 320, 768 and 1440px; the scale below MUST NOT change.

### 3.2 Scale

| Style | Size | Weight | Tracking | Leading | Case | Max measure |
| --- | --- | --- | --- | --- | --- | --- |
| Display XL | `clamp(52px, 12.5vw, 190px)` | 800 | −0.03em | 0.92 | UPPER | 3 lines |
| Display L | `clamp(36px, 6.5vw, 96px)` | 800 | −0.03em | 0.92 | UPPER | 3 lines |
| Heading | `clamp(26px, 3.2vw, 46px)` | 800 | −0.03em | 1.0 | UPPER | 2 lines |
| Subheading | 20px | 800 | −0.02em | 1.2 | UPPER | 1 line |
| Lead | `clamp(18px, 1.7vw, 24px)` | 400 | 0 | 1.45 | Sentence | 34em |
| Body | 16–18px | 400 | 0 | 1.5–1.55 | Sentence | 34–44em |
| Small | 14px | 400 | 0 | 1.5 | Sentence | 40em |
| Label | 12px | 400 | +0.08em | 1.2 | UPPER | 1 line |

### 3.3 Rules

- Display styles are uppercase **via CSS** (`text-transform`). The source stays sentence case so screen readers do not spell it out.
- Serif accent words set `text-transform: none` and `font-style: italic`. One per headline, maximum.
- Body copy MUST NOT be centred. Centre only a single short display line.
- At most three type sizes per viewport on desktop.
- Stat numbers use `font-variant-numeric: tabular-nums`.
- Text MUST reflow at 200% zoom with no horizontal scroll.
- Never letter-space lowercase body text.

```css
.display-xl { font-size: clamp(52px,12.5vw,190px); font-weight: 800;
              letter-spacing: -.03em; line-height: .92; text-transform: uppercase; }
.display-xl em { font-family: var(--font-display); font-style: italic;
                 font-weight: 500; text-transform: none; letter-spacing: -.01em; }
```

### 3.4 Type colour

Type carries colour three ways: the text colour itself, a fill behind it, or a serif accent that changes **style**
rather than hue. Accent colours are never text on paper — §2.3 measures why.

| Role | On paper / sand | On deep | On an accent fill |
| --- | --- | --- | --- |
| Display | `deep` | `paper` | `deep` |
| Body | `ink` | `paper` | `deep` |
| Secondary | `muted` | `stone` | `deep` |
| Emphasis word | A fill behind it — never coloured text | `orange` or `yellow` | Weight or italic, not colour |
| Link | `ink` + underline | `paper` + underline | `deep` + underline |
| Error text | `deep` beside an orange chip | `paper` beside an orange chip | — |
| Disabled | `muted` | `stone` | `deep` on stone |

#### Colour rules

1. **Two text colours per block, three per page.** A fourth is a hierarchy problem wearing a colour costume.
2. **Highlight with a fill, not a hue.** `yellow` text on paper is 1.48:1; a yellow fill with `deep` text is 10.74:1
   and louder. This is the single most common mistake when adapting the reference's palette.
3. **The serif accent differs by style, not colour.** It is italic, not orange. Colouring it as well is two signals
   for one idea.
4. **Dark bands are the only place an accent becomes text** — `orange` at 6.03:1 or `yellow` at 10.74:1, one word.
5. **Never colour-only.** If colour marks a difference, weight, a glyph or a fill marks it too.
6. **Banned:** gradient text, image-clipped text, text over a photograph (use a band), coloured text as the only
   difference between two headings, and any accent as body colour.

### 3.5 Type in motion

Type animates at one of three levels — line, word or letter. The level is chosen by **how much there is to read**, never by how it looks. Full specification in [§9.8](#98-type-animation); the short version:

| Level | Stagger | Allowed on | Banned on |
| --- | --- | --- | --- |
| Line | 80ms | Any headline, lead or pull quote — the default | — |
| Word | 40ms | Leads of one or two sentences | Body copy, lists, tables |
| Letter | 25ms | Display of ≤ 3 words, hover on display links | Anything read rather than glanced at |

The one rule that overrides the rest: **a person must never wait for type to finish assembling before they can read it.**

---

## 4. Layout, grid and spacing

### 4.1 Container

| Token | Value | Note |
| --- | --- | --- |
| `--container` | 1240px | Hard maximum; margins absorb the rest |
| `--gutter` | `clamp(20px, 4vw, 48px)` | Page side margin |
| `--columns` | 12 | Conceptual grid for all patterns |
| `--col-gap` | 24px | Between columns at every breakpoint |

```css
.w { max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); }
.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--col-gap); }
```

### 4.2 Column spans per pattern

Layouts are decided once here and reused. A pattern that invents its own span is a defect.

| Pattern | ≥ 820px | 600–819px | < 600px |
| --- | --- | --- | --- |
| Hero statement | 1–12 | 1–12 | 1–12 |
| Hero intro (two-up) | 1–6 / 7–12 | stack | stack |
| Statement band | 1–12, text 1–8 | 1–12 | 1–12 |
| Work row | 1 / 2–6 / 7–12 | index + text, image below | stack, image first |
| Values grid | 2 × 2 | 2 × 2 | 1 × 4 |
| Timeline row | 1–3 / 4–12 | 1–3 / 4–12 | stack |
| Stat tiles | 3-up | 3-up | 1-up |
| Swatch grid | 5-up | 3-up | 2-up |
| CTA | 1–12 | 1–12 | 1–12, buttons full-width |
| Footer | space-between | space-between | stack |

### 4.3 Spacing scale

Ten values. An in-between value is a defect, not a judgement call.

| px | Token | Used for |
| --- | --- | --- |
| 4 | `--space-1` | Icon ↔ label at 16px, tag padding |
| 8 | `--space-2` | Icon ↔ label at 20–24px, chip gap |
| 12 | `--space-3` | Button row gap |
| 16 | `--space-4` | Paragraphs, card gap, subheading → content |
| 24 | `--space-5` | Compact card interior, column gap |
| 32 | `--space-6` | Subsection separation |
| 48 | `--space-7` | Roomy card interior |
| 64 | `--space-8` | Heading → content, desktop |
| 96 | `--space-9` | Section, tablet |
| 120 | `--space-10` | Section, desktop maximum |

### 4.4 Component padding

| Element | Padding | Notes |
| --- | --- | --- |
| Button | 14 × 26 | Minimum height 44px |
| Icon-only button | — | Fixed 44 × 44 |
| Tag / chip | 4 × 12 | — |
| Input / textarea | 14 × 16 | — |
| Value block | `clamp(22px, 3vw, 40px)` | — |
| Card / box | 20 | — |
| Dark band, CTA | `clamp(28px, 5vw, 64px)` | — |
| Lab frame | 20 | — |

### 4.5 Vertical rhythm

| Between | Space |
| --- | --- |
| Sections | `clamp(56px, 8vw, 120px)`, separated by a 2px ink rule |
| Section heading → content | `clamp(28px, 4vw, 56px)` |
| Subheading → content | 16 |
| Paragraphs | 16 |
| Related controls | 12 |
| Icon → label | 8 (4 at 16px) |

### 4.6 Page rhythm

```text
Paper   hero
Deep    statement band
Paper   work index
Paper   values
Paper   path / timeline
Yellow  CTA
Paper   footer
```

> **Rule.** Two coloured blocks MUST NOT sit next to each other. Paper always separates them.

### 4.7 Alignment and layering

- Everything snaps to the container edge. The only permitted offset is the staggered work grid, capped at 140px.
- Optical alignment beats mathematical alignment for display type: hang the first letter's side bearing.
- Whitespace is a feature. Do not fill empty paper with decoration.

**Z-index scale** — only these values:

| Layer | `z-index` | Example |
| --- | --- | --- |
| Base | 0 | Page content |
| Raised | 5 | Sticky header |
| Pointer | 10 | Custom cursor, skip link |
| Overlay | 40 | Menu overlay |
| Blocking | 50 | Loader |

---

## 5. Shape

| Token | Value | Use |
| --- | --- | --- |
| `--r-pill` | 999px | Buttons, tags, chips, icon buttons |
| `--r-card` | 16px (18px on the values grid outer edge) | Cards, bands, CTA, frames |
| `--r-img` | 14px | Images, inputs |
| `--rule` | `2px solid var(--ink)` | Borders, dividers, section separators |

### Shape rules

- Radius MUST be at least ⅓ of the shorter side on small shapes; a 4px radius on a 200px card reads as a mistake.
- Nest radii: inner radius = outer radius − padding. A 16px card with 20px padding holds a 14px image cleanly.
- Elevation: **none**. No shadows, no blurs, no glows. Depth comes from border, colour block and overlap order only.

---

## 6. Iconography

Modern ships its own set — **45 icons**, drawn for this system. Implementation: `src/app/design-system-modern/icons.tsx`. Live sheet with construction grid, sizes and motion: `/design-system-modern#icons`.

### 6.1 Geometry — no sharp edges, no sharp corners

| Rule | Value |
| --- | --- |
| Canvas | 24 × 24 viewBox |
| Live area | 20 × 20, 2px padding on every side |
| Key circle | ø 20 |
| Key square | 18 × 18 |
| Stroke | 2 units at 24px, optically scaled (§6.2) |
| Caps | `round` — every terminal is a half-circle |
| Joins | `round` — every corner is an arc |
| Corner radius | ≥ ⅓ of the shorter side, minimum 2 units |
| Tightest angle | 60°. Points — stars, play triangles, chevron tips — are arcs or curves, never cusps |
| Terminals | End on a whole or half unit |
| Fill | None. Stroke only |
| Colour | `currentColor` only, so icons inherit text and state colour |

```tsx
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
     strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
  <rect x="2.5" y="5" width="19" height="14" rx="4.5" />
  <path d="M4.5 8.5l6.4 4.6a2 2 0 002.2 0l6.4-4.6" />
</svg>
```

Rounded geometry in practice — the sparkle has no points, the play head has no cusps:

```text
sparkle  M12 3.5c.8 4.1 2.4 5.7 6.5 6.5-4.1.8-5.7 2.4-6.5 6.5
         -.8-4.1-2.4-5.7-6.5-6.5 4.1-.8 5.7-2.4 6.5-6.5z
play     M9.5 7.6a1.6 1.6 0 012.4-1.4l6.3 4.4a1.6 1.6 0 010 2.8
         l-6.3 4.4a1.6 1.6 0 01-2.4-1.4z
```

### 6.2 Optical sizing

Stroke width is expressed in viewBox units and set per rendered size, so optical weight stays near 2px instead of thinning as the icon grows.

| Rendered size | `strokeWidth` (viewBox) | Rendered stroke | Use |
| --- | --- | --- | --- |
| 16px | 2.6 | 1.73px | Inline with 14–16px text |
| 20px | 2.2 | 1.83px | Inside buttons |
| 24px | 2.0 | 2.00px | Default, navigation |
| 32px | 1.6 | 2.13px | Feature blocks |
| 48px | 1.1 | 2.20px | Illustrative, empty states |

Sizes are a closed set: **16, 20, 24, 32, 48**. No other size ships.

### 6.3 The library

| Category | Icons |
| --- | --- |
| **Direction** (10) | `arrow-right` · `arrow-left` · `arrow-up-right` · `arrow-down` · `chevron-right` · `chevron-down` · `chevron-up-down` · `menu` · `close` · `corner-down-right` |
| **Action** (13) | `plus` · `minus` · `search` · `filter` · `copy` · `check` · `download` · `upload` · `mail` · `link` · `share` · `play` · `pause` |
| **Feedback** (5) | `alert` · `info` · `check-circle` · `loader` · `help` |
| **Content** (8) | `document` · `image` · `grid` · `list` · `calendar` · `clock` · `bookmark` · `chart` |
| **Domain** (9) | `pulse` · `sparkle` · `users` · `lightbulb` · `layers` · `target` · `shield` · `book` · `accessibility` |

Brand marks (LinkedIn, GitHub) are **exempt** from these rules and ship as supplied by the brand. They are not part of this set.

### 6.4 Icon motion

Each icon declares one motion, triggered by the **containing control's** hover *and* `:focus-visible` — never by the icon alone, which would make it unreachable by keyboard.

| Motion | Transform | Icons |
| --- | --- | --- |
| `nudge-x` | `translateX(4px)` | arrow-right, chevron-right, corner-down-right |
| `nudge-x-back` | `translateX(-4px)` | arrow-left |
| `nudge-ne` | `translate(3px, -3px)` | arrow-up-right |
| `bob` / `bob-up` | `translateY(±3px)` | arrow-down, download, bookmark / upload |
| `rotate-45` | `rotate(45deg)` — plus becomes × | plus |
| `rotate-180` | `rotate(180deg)` | chevron-down |
| `spin-90` | `rotate(90deg)` | close |
| `burger` | Outer lines part by 1.5px | menu |
| `pop` | `scale(1) → 1.22 → 1`, `--ease-spring` | copy, mail, share, play, info, help, document, image, users, shield, book, accessibility |
| `draw` | `stroke-dashoffset` 34 → 0, `--dur-slow` | check, check-circle, pulse |
| `spin` | `rotate(360deg)`, 800ms linear loop | loader |
| `sweep` | `rotate(-12deg) scale(1.06)` | search |
| `stack` | First child up 1.5px, third down 1.5px | filter, grid, list, layers |
| `grow` | Bars `scaleY` 1.14 / 1.09 / 1.05 from bottom | chart |
| `stretch-x` / `stretch-y` | `scaleX/Y(1.18)` | minus, pause / chevron-up-down |
| `tick` | `rotate(0 → 14° → 0)`, 600ms | clock |
| `twinkle` | `scale(1.15) rotate(12°)` and back, 700ms | sparkle, lightbulb |
| `zoom` | `scale(1.12)` | target |
| `shake` | `translateX(±4px)` × 2, 200ms | alert |
| `join` | `scale(1.08) rotate(-8deg)` | link |

Defaults: `--dur-fast` (250ms) with `--ease-out`, `transform-box: fill-box`, `transform-origin: center` (bottom for `grow`).

```css
.btn .ms-ico[data-anim="nudge-x"] { transition: transform var(--dur-fast) var(--ease-out); }
.btn:hover .ms-ico[data-anim="nudge-x"],
.btn:focus-visible .ms-ico[data-anim="nudge-x"] { transform: translateX(4px); }

@media (prefers-reduced-motion: reduce) {
  .ms-ico, .ms-ico * { transition: none !important; animation: none !important; transform: none !important; }
}
```

Under reduced motion the `loader` spinner is replaced by the static word "Loading…", and every other icon motion is removed.

### 6.5 Usage rules

1. Every icon MUST have adjacent text or an `aria-label`. Decorative icons are `aria-hidden="true"` and `focusable="false"`.
2. Hit area MUST be ≥ 44 × 44px however small the glyph.
3. Gap to its label: 8px (4px at 16px). Align to the text's cap height, not its box.
4. One icon per control. Never both a leading and a trailing icon.
5. Icons MUST NOT carry meaning alone in a table, chart or status — pair them with a word.
6. Never mix a filled icon set into this stroked one.
7. Never restyle a brand mark to these rules.

### 6.6 Contributing an icon

Checklist — all seven, or it does not merge:

1. Drawn on the 24px grid inside the 20px live area.
2. Round caps and joins; no angle under 60°; every rectangle meets the radius rule.
3. Legible at 16px with no detail collapsing.
4. Named in `kebab-case`, after the **object or action**, never the metaphor (`document`, not `page-thing`).
5. Assigned a category and exactly one motion from §6.4.
6. Added to the construction sheet in `/design-system-modern#icons`.
7. Listed in §6.3 and counted in the header.

---

## 7. Imagery and illustration

Photography gets one frame treatment. Illustration is drawn in the icon set's grammar scaled up — the same round
geometry, the same `deep` outline, the same flat accent fills — so a 24px icon and a full-width scene read as one
family. Implementation: `illustrations.tsx`; live sheet at `/design-system-modern#illustration`.

### 7.1 Photography

| Property | Value |
| --- | --- |
| Ratio | 16:10 (work rows, covers); 4:3 permitted in the staggered grid |
| Border | 2px `ink` |
| Radius | 14px, with `overflow: hidden` on the container |
| Fit | `object-fit: cover` |
| Overlay | None |
| Filter | None — no grayscale, no duotone |
| Hover | `scale(1.05)` over `--dur-slow` |

Rules: meaningful images get real alt text and decorative ones get `alt=""`; explicit dimensions or `fill` with
`sizes`, so nothing shifts; hero ≤ 200KB and thumbnails ≤ 80KB in AVIF or WebP; placeholder media is a flat `pink`
fill inside the standard frame, never a grey box.

### 7.2 Illustration — three tiers

Tier is chosen by how much the illustration has to say. It caps the element count **and** the number of accents,
which is what stops illustration drifting away from the rest of the system.

| Tier | Size | Elements | Accents | Used for |
| --- | --- | --- | --- | --- |
| **Spot** | 48–96px | 1 idea | 1 | Value blocks, list markers, inline support |
| **Feature** | 160–320px | 2–4 | 2 | Empty states, feature blocks, section openers |
| **Scene** | Full width | ≤ 5 | 3 | Process and journey diagrams. **Once per page** |

### 7.3 Style

| Property | Rule | Why |
| --- | --- | --- |
| Line | Round caps and joins; no corner under 60° | Shared grammar with the icon set (§6.1) |
| Stroke weight | Spot 3 · Feature 3 · Scene 3, connectors 4. Minimum 2 at any render size | Optically constant against the 2px rules |
| Outline colour | Always `deep`. Never an accent, never a tint | A single outline colour is what holds the family together |
| Fill | Flat accent only. No gradients, tints or opacity fills | Every fill must map to a token |
| Fill coverage | ≤ 40% of the bounding box | Paper has to breathe or it stops reading as illustration |
| Accents per piece | Spot 1 · Feature 2 · Scene 3 | Keeps illustration inside the one-accent-per-section rule (§2.5) |
| Depth | Overlap plus a 4px paper contour gap | Same no-elevation rule as §5 |
| Border | Bare on paper, or inside the standard media frame | An illustration is not a photograph |
| Corner radius | ≥ ⅓ of the shorter side | No sharp corners anywhere in the system |
| Grid | 8px alignment on a 96 / 240 / 450 canvas | Keeps pieces composable |
| People | Abstract. No faces, no skin tones | Avoids the stock-illustration look and representation problems |

#### Filled or outline — the rule people get wrong

> **Fill the subject. Outline the context.** Fill carries mass and meaning; outline carries structure.

| Use outline-only | Use filled |
| --- | --- |
| Small sizes and dense layouts | Empty states and feature blocks |
| Inside prose, beside body copy | Where the illustration is the focal point |
| When an accent is already spent in that section | When the illustration is the section's one accent |

Never mix filled and outline pieces in the same view, never fill everything (it becomes a blob with no hierarchy),
and never use fill to indicate state — that is the component's job.

#### The contour gap

Where one shape crosses another, the upper shape carries a thick `paper` stroke underneath its outline, knocking a
4px gap out of what it overlaps. This is how the system gets depth without shadows.

```tsx
{/* paper stroke first, then fill, then outline */}
<circle cx="62" cy="58" r="19" stroke="var(--paper)" strokeWidth="11" />
<circle cx="62" cy="58" r="19" fill="var(--pink)" />
<circle cx="62" cy="58" r="19" stroke="var(--deep)" strokeWidth="3" fill="none" />
```

#### Banned treatments

Gradients · drop shadows · coloured outlines · sharp corners · textures · perspective and 3D · hand-drawn wobble ·
faces and skin tones · blob people · stroke under 2px · more than three accents. The preview draws each banned
treatment rather than describing it, so there is nothing to argue about.

### 7.4 Illustration motion

#### The five styles

One per illustration, chosen by what the drawing has to explain. Switch between them at
`/design-system-modern#illustration`.

| Style | Motion | Says | Use for |
| --- | --- | --- | --- |
| **Draw-on** | Outline draws by `stroke-dashoffset`, fills follow at 400ms | "This is being made" | The default. Any tier |
| **Travelling line** | One continuous guide line crosses the composition; the form appears in its wake, then the line erases itself | "This is being drawn, in this order" | Hero and feature pieces where the build order is the explanation |
| **Assemble** | Parts arrive from their own side and settle, 70ms stagger | "This is made of parts" | Diagrams whose components matter more than their order |
| **Fill sweep** | Outline holds from the first frame; fills wipe in with `clip-path` | "This is filling up" | Progress, coverage, completeness |
| **Trace** | A short dash segment runs continuously around the outline | "This is live" | One ambient element only — never beside body copy |

#### Line takes form

The travelling line is the signature illustration motion. A guide path — `orange`, 2.5px — is drawn across the
composition, the illustration's own outline draws **behind and slightly after** it, and the guide then erases
itself from its start point, leaving only the form. One keyframe set does draw and erase:

```css
.guide { stroke-dasharray: 1; animation: guide 2.2s var(--ease-out) forwards; }
@keyframes guide {
  0%   { stroke-dashoffset:  1; }   /* unseen */
  55%  { stroke-dashoffset:  0; }   /* fully drawn */
  100% { stroke-dashoffset: -1; }   /* erased from the start */
}
/* the form lands in the line's wake, not with it */
[data-anim="line"] [data-draw] { animation-delay: calc(260ms + var(--i) * 150ms); }
```

The guide MUST lead the form, never trail it, or the line reads as an underline rather than a pen. In a scene the
connector line **is** the guide — it draws left to right and each node lands as it is reached, so the motion and
the content say the same thing.

#### Line unfolds into form

A flat baseline interpolates into the finished shape. Both `d` values must carry **identical command counts and
types**, or the interpolation collapses:

```svg
<path d="M20 60C20 60 60 60 100 60C140 60 180 60 180 60...Z">
  <animate attributeName="d" values="<flat>;<form>" dur="0.9s" fill="freeze"
           calcMode="spline" keySplines="0.2 0.7 0.2 1" />
</path>
```

Reserve it for a single hero shape. Morphing several shapes at once reads as a glitch, and authoring matched
command counts by hand stops being worth it past one path.

#### Stages and timing

| Stage | Motion | Timing |
| --- | --- | --- |
| 1 · Outline draws | `stroke-dashoffset` 1 → 0 | `--dur-slow` `--ease-out`, 80ms stagger |
| 2 · Fills arrive | Opacity 0 → 1, `scale(.94 → 1)` | `--dur`, delayed 400ms |
| 3 · Ambient loop | One element only, amplitude ≤ 4px or `scaleY` ≥ .7 | ≤ 3s |
| Hover | Whole piece `scale(1.02)`, **or** one element reacts — never both | `--dur` |
| Reduced motion | Final state. No draw, no loop, no hover scale | — |

#### Normalise the draw

Every drawn path carries `pathLength="1"`, so `stroke-dasharray: 1` makes a long path and a short one draw at the
same rate. Without it, a 400-unit outline crawls while a 20-unit tick snaps, and the sequence falls apart.

```css
[data-draw] {
  stroke-dasharray: 1; stroke-dashoffset: 1;
  animation: draw var(--dur-slow) var(--ease-out) forwards;
  animation-delay: calc(var(--i) * 80ms);
}
[data-fill] {
  opacity: 0; transform: scale(.94); transform-box: fill-box; transform-origin: center;
  animation: fill var(--dur) var(--ease-out) forwards;
  animation-delay: calc(400ms + var(--i) * 80ms);
}
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes fill { to { opacity: 1; transform: scale(1); } }
```

#### Motion rules

1. Draw in reading order: structure, then subject, then accent. The order is the explanation.
2. Draw **once per page load**, not on every scroll into view.
3. One style per illustration, and one style per page. Mixing draw-on and assemble in one view reads as two systems.
4. At most **one** looping element per illustration, and never beside text someone is reading. An ambient loop in an
   empty state is calm; the same loop next to a paragraph is a distraction.
5. Cap at roughly **12 animated elements**.
6. Never morph one illustration into another — it reads as a glitch, not a transition.
7. Decorative illustration is `aria-hidden="true"`; meaningful illustration gets `role="img"` and a label that says
   what it shows, not that it is an illustration.
8. An illustration MUST make sense as a still. The animation is a bonus, never the message.

Illustration counts against the signature-moment budget in §9.9 when it is a scene or a hero piece. A spot
illustration drawing itself in is not a signature moment; a full-width scene is.

## 8. Motion

### 8.1 Principles

1. **Purpose.** Reveal origin, signal interactivity, or confirm change. Otherwise remove it.
2. **Quick.** UI feedback ≤ 300ms; entrances ≤ 600ms; nothing blocks input.
3. **Consistent.** One easing family, five durations.
4. **Optional.** Content and function are identical with motion off.
5. **Cheap.** Animate `transform` and `opacity` only — plus `background-color`, and `clip-path` on small elements. Never animate layout properties.

### 8.2 Tokens

```css
:root {
  --dur-instant: 100ms;  /* press feedback */
  --dur-fast:    250ms;  /* icon motion, small shifts */
  --dur:         300ms;  /* ◆ colour swaps, underline draw */
  --dur-slow:    600ms;  /* image zoom, scroll reveal */
  --dur-page:    700ms;  /* overlay menu, loader exit */

  --ease:        ease;                          /* ◆ colour only */
  --ease-out:    cubic-bezier(.2,.7,.2,1);      /* entrances, hover movement */
  --ease-in-out: cubic-bezier(.76,0,.24,1);     /* overlays, wipes */
  --ease-spring: cubic-bezier(.34,1.56,.64,1);  /* icon pop only, ≤ 250ms */
  --stagger:     60ms;                          /* between siblings, max 6 */
  --stagger-line:   80ms;                       /* type: line split */
  --stagger-word:   40ms;                       /* type: word split */
  --stagger-letter: 25ms;                       /* type: letter split */
  --dur-vt:         450ms;                      /* shared-element view transition */
  --dur-t-quick:    200ms;                      /* route: cross-fade */
  --dur-t-standard: 320ms;                      /* route: full-page fade, dialogs */
  --dur-t-expressive: 520ms;                    /* route: cover, overlays */
  --dur-t-max:      700ms;                      /* route ceiling */
}
```

| Use | Duration | Easing |
| --- | --- | --- |
| Press feedback | `--dur-instant` | `--ease` |
| Icon nudge, rotate, stretch | `--dur-fast` | `--ease-out` |
| Icon pop | `--dur-fast` | `--ease-spring` |
| Button and card colour swap | `--dur` | `--ease` |
| Link underline draw | `--dur` | `--ease-out` |
| Image zoom | `--dur-slow` | `--ease-out` |
| Scroll reveal | `--dur-slow` | `--ease-out` |
| Overlay menu, loader | `--dur-page` | `--ease-in-out` |

### 8.3 Choreography

- Order: container → heading → body → media → controls. Siblings offset by `--stagger`, capped at six; later items share the last delay.
- Entering elements rise 24px. Overlays wipe down and exit up.
- Exits run about 30% faster than entrances.
- One hero motion per viewport at a time; secondary motion waits.

### 8.4 Reduced motion — binding

Under `@media (prefers-reduced-motion: reduce)`:

| Removed | Kept |
| --- | --- |
| Transforms, parallax, marquee, loader, custom cursor, magnetic buttons, stagger, counters | Colour changes ≤ 150ms, underline state, focus changes, content state changes |

Auto-playing motion over 5s MUST be pausable. Nothing flashes more than three times per second (WCAG 2.3.1).

### 8.5 Performance

- Budget: 16ms frame; at most ten elements animating at once.
- `will-change` only while an animation is running; remove it afterwards.
- Pointer effects run in `requestAnimationFrame` with no layout reads in the handler.
- Test on 4× throttled CPU. Drop the effect before dropping the frame rate.

---

## 9. Animation patterns

### 9.1 Hover, focus and press

| Element | Rest | Hover | Focus-visible | Active | Disabled |
| --- | --- | --- | --- | --- | --- |
| Primary button | deep fill, paper text | yellow fill, deep text | 3px deep outline, 2px offset | `scale(.98)` | stone fill, deep text |
| Ghost button | transparent, deep text, ink border | deep fill, paper text | same | `scale(.98)` | stone border, muted text |
| On-dark button | paper fill, deep text | yellow fill | 3px **yellow** outline | `scale(.98)` | stone fill |
| Icon button | transparent, ink border | deep fill, paper icon | same | `scale(.98)` | stone border |
| Value block | paper | yellow fill, text → deep | same | — | — |
| Work row | — | title underline, image `scale(1.05)`, arrow nudge | same | — | — |
| Nav link | no underline | 2px ink underline | same | — | — |
| Tag (interactive) | outline | deep fill, paper text | same | — | — |

### 9.2 Image motion

```css
.im { overflow: hidden; border-radius: var(--r-img); }
.im img { transition: transform var(--dur-slow) var(--ease-out); }
.row:hover .im img { transform: scale(1.05); }
```

No grayscale toggles, no filters.

### 9.3 Icon and illustration motion

Icon motion is specified per icon in §6.4; illustration motion in §7.4.

### 9.4 Pointer animation

Pointer effects are **progressive enhancement**. They mount only when
`(hover: hover) and (pointer: fine)` matches *and* reduced motion is off. Touch and keyboard users get the static states in §9.1, which carry the same information.

```ts
export function usePointerEffects() {
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const calm = useMedia("(prefers-reduced-motion: reduce)");
  return fine && !calm;   // false during SSR
}
```

| # | Effect | Specification |
| --- | --- | --- |
| 1 | **Custom cursor** | 12px `deep` dot, lerp 0.15. Native cursor stays visible. Over an interactive element it grows to 56–72px, fills `yellow` and shows a label in label style, `deep` text. No `mix-blend-mode`. Hidden over text inputs. |
| 2 | **Cursor label** | Work rows swap the label to "View case study →"; media to "Play"; external links to "Open ↗". |
| 3 | **Magnetic button** | Primary CTA only. Within 80px the button translates toward the pointer by ≤ 8px (0.25 of offset), easing back over `--dur` with `--ease-out`. Never on nav or form buttons. |
| 4 | **Image follow** | In the index list, a 16:10 preview trails the pointer at lerp 0.12 while a row is hovered. One preview at a time. |
| 5 | **Underline draw** | 2px underline scales X from 0 → 1 from the left on hover, 1 → 0 to the right on leave, `--dur` `--ease-out`. |
| 6 | **Press** | `:active` scales controls to .98 over `--dur-instant`. |
| 7 | **Excluded** | Tilt, parallax, spotlight and cursor glow are not part of Modern. The existing `cursor-glow` component is retired. |

Accessibility: the custom cursor never replaces focus indication, and its label duplicates — never replaces — the element's accessible name.

### 9.5 Scroll

| Pattern | Specification |
| --- | --- |
| Reveal | opacity 0 → 1, `translateY(24px → 0)`, `--dur-slow` `--ease-out`, once. `IntersectionObserver`, threshold 0.12, root margin `0px 0px -10%` |
| Stagger | `--stagger` between siblings, capped at six |
| Counters | Stat numbers count up over 1s on first view. The final value is in the DOM from the start, so assistive tech reads the real number |
| Marquee | 40s linear loop, pauses on hover and `focus-within`, duplicate content `aria-hidden`, off under reduced motion |
| Sticky header | Hairline fades in after 8px of scroll. No hide-on-scroll |
| Smooth scroll | Lenis MAY stay, must respect reduced motion, easing ≤ 1.2s. No scroll-jacking |

### 9.6 Page and view transitions

Navigation is the one place a portfolio can afford a signature moment, because it happens rarely and the visitor is
already waiting. Everything in this section is built on the **View Transitions API**, with a plain fallback.

#### The style catalogue

Five ways a view can arrive. Pick by what the navigation **means**, not by what looks richest.

| Style | Motion | Duration | Use when | Never when |
| --- | --- | --- | --- | --- |
| **Cross-fade** | Opacity | 200–320ms | The default for any route change | — |
| **Shared element** | Cover morphs into hero | 450ms | A cover exists in both views | No common element — it becomes a flicker |
| **Circle reveal** | `clip-path: circle()` growing from the click point | 620ms | There is one clear origin: a card, a toggle, a floating action | Activated by keyboard — there are no coordinates, so fall back to fade |
| **Cover** | New view slides up over the old | 520ms | Going deeper: index → detail | Going back; it implies forward |
| **Push** | Directional slide, both views move | 480ms | Sibling to sibling: next / previous case study | Unrelated destinations |
| **Page turn** | `rotateY` with perspective | 700ms | Genuinely paginated content | Everywhere else — see the caveat |

#### Circle reveal

The origin is the information: the view opens out of the thing that was clicked. With the View Transitions API the
circle is animated on the incoming pseudo-element, not on a DOM node:

```ts
const t = document.startViewTransition(() => flushSync(update));
await t.ready;
document.documentElement.animate(
  { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
  { duration: 620, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" }
);
```

`radius` is the distance from the origin to the furthest corner — anything less leaves an unfilled corner. A
keyboard or screen-reader activation has no pointer coordinates: **fall back to the cross-fade** rather than
guessing the centre, because a circle from the middle says something untrue about where you came from.

#### The page-turn caveat

It is documented so the argument happens once. A 3D turn is skeuomorphic — it claims the content is paper — and at
700ms it is the slowest transition here. It is allowed only where the metaphor is true: a slide deck, a multi-page
reader. **It is banned on routes.** If a route change needs weight, use Cover.

#### Transition speed

Speed is part of the design, not a setting applied afterwards. The same motion is expressive at 450ms and an
obstacle at 900ms. Live at `/design-system-modern#transitions` — drag the duration, replay, and use the calculator,
which runs the exact function below.

##### Perception bands

Thresholds follow the long-standing 0.1s / 1s limits for how people perceive response, narrowed for route changes.

| Band | Duration | What it reads as | Route use |
| --- | --- | --- | --- |
| Instant | ≤ 100ms | No transition at all | Presses only. Too fast to show a relationship between two views |
| Responsive | 100–300ms | Immediate | **The default band** |
| Expressive | 300–700ms | Deliberate | Earns its time only when the motion carries meaning |
| Too slow | 700–1000ms | Lag | Over the ceiling — people start waiting for it |
| Blocking | > 1000ms | A wait | Needs a progress indicator, not an animation |

##### Tiers and tokens

| Tier | Token | Duration | Use for |
| --- | --- | --- | --- |
| Instant | `--dur-instant` | 100ms | Press feedback |
| Quick | `--dur-t-quick` | 200ms | Cross-fade, small changes, anything with no distance to travel |
| Standard | `--dur-t-standard` | 320ms | Full-page cross-fade, dialogs |
| Shared element | `--dur-vt` | 450ms | Cover morphs to hero. Sits between Standard and Expressive deliberately |
| Expressive | `--dur-t-expressive` | 520ms | Cover, overlay wipes, large moves |
| Ceiling | `--dur-t-max` | 700ms | Nothing on a route exceeds this; only the page turn reaches it |

##### Speed per style

| Style | Default | Range | Scales with |
| --- | --- | --- | --- |
| Cross-fade | 200ms | 150–320ms | Nothing — no distance. Longer only for a full-page swap |
| Shared element | 450ms | 350–620ms | Distance the element travels |
| Circle reveal | 620ms | 450–700ms | The radius, from the origin to the furthest corner |
| Cover | 520ms | 400–600ms | Viewport height |
| Push | 480ms | 360–560ms | Viewport width. The outgoing page runs at 70% of this |
| Page turn | 700ms | — | Fixed at the ceiling |

##### The duration formula

For transitions that **move** something, duration follows how far it moves:

```ts
export function transitionMs({ distance, diagonal, width, repeat }: Args) {
  let ms = 280 + 340 * Math.min(1, Math.max(0, distance / diagonal)); // 280–620
  ms = Math.min(700, Math.max(350, ms));                              // clamp
  if (width < 600) ms *= 0.85;   // shorter distance, shorter time
  if (repeat)      ms *= 0.75;   // a familiar transition can be quicker
  return Math.round(ms);
}
```

| Distance (% of diagonal) | Desktop | Phone | Repeat visit | Phone + repeat |
| --- | --- | --- | --- | --- |
| ≤ 20% | 350 | 298 | 263 | 223 |
| 45% (a typical shared element) | 433 | 368 | 325 | 276 |
| 60% | 484 | 411 | 363 | 309 |
| 100% (full-diagonal circle) | 620 | 527 | 465 | 395 |

Two honest limits, both measured rather than assumed. **The reachable range is 223–620ms**; there is no separate
floor because the formula cannot go below 223. And **below roughly 25% distance the 350ms clamp dominates**, so every
small move comes out identical — a small change should not use this formula at all. Use the 200ms cross-fade.

##### Rules

1. **Speed follows distance and area, never importance.** An important page does not get a slower transition.
2. **Exits run about 30% faster than entrances**, with an ease-in curve so the old view accelerates out of the way.
   Entrances use ease-out.
3. **Repeat visits run × .75; phones run × .85.** First impressions can afford the full duration; the tenth cannot.
   Remember the first navigation in `sessionStorage`, inside a `try`/`catch`, and fall back to full speed.
4. **A new navigation interrupts the one in flight**, from where it currently is (`skipTransition()`), never by
   queueing behind it.
5. **Never wait on the network.** If the destination is not ready within 100ms, cross-fade at 200ms and let the
   content arrive. Over 1s, show progress.
6. **700ms is the ceiling** for any route. Over 1s anywhere, without a progress indicator, is a defect.
7. **Reduced motion:** movement drops to 0ms; colour and opacity changes stay at ≤ 150ms.
8. **Test by repetition.** Navigate ten times in a row on a 4× throttled CPU. The moment you catch yourself waiting for
   it to finish, it is too slow — whatever the number says.
9. **Never slow a transition to feel premium.** People read added duration as lag, not polish.

#### The ledger

| Transition | Motion | Duration | Rule |
| --- | --- | --- | --- |
| Route — default | Opacity cross-fade | 200ms | Never moves content; the page must be readable immediately |
| Route — work → case study | Shared-element morph | `--dur-vt` 450ms | Only where a cover exists in both views |
| Back / forward | The reverse of the forward motion | Same | Scroll position restored **before** the transition paints |
| Overlay menu | `clip-path` wipe down, links stagger in | `--dur-page` 700ms | Focus moves in, is trapped, returns to the toggle on close |
| Loader | Panel slides up | `--dur-page` | First visit only, ≤ 1.2s, skipped when cached, click to skip |
| Modal / dialog | Fade and 12px rise | `--dur-fast` | `@starting-style` with `allow-discrete`; never a bounce |
| Scroll reveal | Fade and 24px rise | `--dur-slow` | Once. Never on re-entry |

#### Shared-element transitions

The strongest transition in the system: a work-row cover becomes the case-study hero. The same element carries a
`view-transition-name` in both views, so the browser animates **one object moving** rather than two screens swapping.
It is wayfinding, not decoration — it answers "where did this come from".

```css
/* same name in both views; it must be unique on the page at any moment */
.work-cover, .case-hero { view-transition-name: cover-one; }

@view-transition { navigation: auto; }   /* cross-document, same-origin */

::view-transition-old(root),
::view-transition-new(root) { animation-duration: var(--dur-vt); }
```

```ts
function withViewTransition(update: () => void, enabled: boolean) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
  if (!enabled || typeof doc.startViewTransition !== "function") return update();
  doc.startViewTransition(() => flushSync(update));   // React must commit synchronously
}
```

Rules:

1. A `view-transition-name` MUST be unique at any given moment. Two cards holding the same name cancels the transition.
2. Assign the name only to the element taking part, and remove it afterwards — a permanently named element is promoted to its own layer for the life of the page.
3. React updates MUST be wrapped in `flushSync`, or the browser snapshots the old DOM twice.
4. The morph MUST be skipped under reduced motion: the cover jumps, the content does not.
5. **Feature-detect at call time, not render time.** The handler checks `startViewTransition` when it runs, so the behaviour is correct on the very first click with no React state involved.

#### Never render a capability you cannot know on the server

Anything branching on `@supports`, `prefers-reduced-motion`, pointer type or viewport is **unknown during SSR**. A component that renders one branch on the server and corrects itself on hydration shows the visitor something false first — briefly, but visibly.

| Branch is… | Resolve it with |
| --- | --- |
| Presentational — a label, a style, a variant | **CSS**: `@supports`, `@media`. Correct on first paint, no JavaScript |
| Behavioural — whether to call an API | **A runtime check inside the handler**. Nothing renders, nothing can be wrong |
| Genuinely stateful — must drive a render | `useSyncExternalStore` with an honest server snapshot, and a neutral first render that asserts nothing |

```css
/* ship every branch; let CSS choose before hydration */
.cap .cap-novt { display: inline; }
.cap .cap-vt   { display: none; }
@supports (view-transition-name: none) {
  .cap .cap-vt   { display: inline; }
  .cap .cap-novt { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .cap .cap-vt, .cap .cap-novt { display: none; }
  .cap .cap-calm { display: inline; }
}
```

The rule generalises: **the enhancement is gated in JavaScript, the description of it is gated in CSS.**

#### Choreography of a navigation

```text
0ms     click            pointer feedback, scale .98
0ms     old view captured
0–450ms cover morphs to hero position and size
120ms   incoming text begins its line reveal (§9.8), staggered 80ms
450ms   transition ends; focus moves to the new h1
```

Incoming content starts **before** the morph finishes. Waiting for a clean hand-off makes a 450ms transition feel
like 900ms.

#### Speed is part of the design

- Prerender likely destinations with speculation rules, so the transition covers a page that is already built:

```html
<script type="speculationrules">
{"prerender":[{"where":{"href_matches":"/work/*"},"eagerness":"moderate"}]}
</script>
```

- A transition MUST NOT wait on a network request. If the destination is not ready, cross-fade instead and let the
  content arrive.
- Transitions are capped at 450ms. Anything slower reads as lag, not polish.

#### Non-negotiables

- Focus moves to the new view's `h1` after every route change, and the route change is announced to assistive tech.
- Scroll position is restored before paint — never animate the scroll.
- The back button reverses the forward motion. A back navigation that animates forward is disorienting.
- Everything degrades: no View Transitions API means a cross-fade; reduced motion means an instant swap.

### 9.7 Feedback and states

| State | Motion | Accessibility |
| --- | --- | --- |
| Submit pending | Label → "Sending…", `loader` spins | `aria-busy="true"` |
| Success | `check-circle` draws, message fades in | Focus moves to the message; `role="status"` |
| Error | `alert` chip shakes twice, message slides down 8px | Focus moves to the first invalid field; `aria-describedby` |
| Skeleton | Static `sand` blocks, no shimmer | Reduced-motion safe by default |

### 9.8 Type animation

Kinetic type is the loudest tool in this system and the easiest to misuse. It is allowed only on the first paint of a
section, never on re-entry, and never on text someone is actively reading.

#### Split levels

| Level | Token | Value | Use | Never |
| --- | --- | --- | --- | --- |
| Line | `--stagger-line` | 80ms | The default. Every headline over three words, leads, pull quotes | — |
| Word | `--stagger-word` | 40ms | Leads of one or two sentences | Body copy, lists, tables, labels |
| Letter | `--stagger-letter` | 25ms | Display of ≤ 3 words; hover on display links | Anything read rather than glanced at |

Choosing a level is arithmetic, not taste. At 25ms a ten-letter word costs 250ms before the last letter lands; a
forty-word paragraph costs ten seconds. **Total run MUST NOT exceed 600ms**, however many fragments — past that,
reduce the stagger or move up a level.

#### The two motions

| Motion | Transform | Applies to |
| --- | --- | --- |
| **Mask rise** | Fragment `translateY(100% → 0)` inside a clipping line box, `--dur-slow` `--ease-out` | Line splits — the default for all display type |
| **Soft rise** | Fragment `translateY(60% → 0)` plus opacity 0 → 1 | Word and letter splits, where a hard mask reads as jitter |

```css
.line { display: block; overflow: hidden; padding-bottom: .08em; }  /* descenders */
.frag {
  display: inline-block;
  animation: rise var(--dur-slow) var(--ease-out) backwards;
  animation-delay: calc(var(--i) * var(--stagger-line));
}
@keyframes rise { from { transform: translateY(100%); } to { transform: translateY(0); } }
```

`backwards` fill matters: without it the text flashes at its final position for one frame before the delay starts.
The `.08em` bottom padding stops the mask clipping descenders on `g`, `y` and `p`.

#### Accessibility — the part that is usually got wrong

Splitting text into spans destroys it for screen readers, which announce each fragment separately: *"E — v — i — d"*.

> **Rule.** The container MUST carry the complete string in `aria-label`, and every fragment MUST be
> `aria-hidden="true"`. Nothing is split under reduced motion — the text renders whole.

```tsx
<span aria-label="Evidence over assumption.">
  {fragments.map((f, i) => <span aria-hidden="true" key={i} style={{ "--i": i }}>{f}</span>)}
</span>
```

Also binding:

- Copy MUST be readable with animations disabled; the final state is the real layout.
- Letter splits MUST NOT be used for links, buttons or form labels — the accessible name has to survive.
- Never use a typewriter effect for content someone needs now. It is a delay dressed as a flourish.
- Text that reveals on scroll MUST already be in the DOM, not inserted by the observer.

#### Font loading

Split **after** `document.fonts.ready`. Splitting against a fallback face measures the wrong line breaks, so the
headline re-flows mid-animation. Pair this with `display: swap` and the `clamp` sizes in §3.2, which keep the
pre-swap and post-swap layouts the same height.

#### Hover — per-letter styles

Six styles, all staggered 20ms, all **display type only**. None may carry information, and each must trigger on
`:focus-visible` as well as hover, or it is unreachable by keyboard.

| Style | Motion | Reads as | Use for |
| --- | --- | --- | --- |
| **Jump** | `translateY(-4px)` | Responsive, quiet | The default. Nav, overlay menu |
| **Wave** | Looping `translateY(-6px)` while hovered, 60ms offset | Playful, alive | One playful surface — never two on a page |
| **Swirl** | `rotate(-12deg) scale(1.12)` | Loose, hand-made | A single signature word, such as a logotype |
| **Flip** | `rotateX(360deg)` | Mechanical, deliberate | A CTA that should feel like a switch |
| **Weight** | `font-variation-settings: "wght" 800 → 400` | Precise, typographic | Index lists; the most restrained of the six |
| **Stretch** | `scaleY(1.35)` from the baseline | Elastic, loud | A hero word, at most once per page |

```css
.link span { display: inline-block; transition: transform var(--dur-fast) var(--ease-out);
             transition-delay: calc(var(--i) * 20ms); }
.link:hover span, .link:focus-visible span { transform: translateY(-4px); }
```

Rules:

1. **One style per site.** Six exist so the choice is deliberate, not so that six get used.
2. Never on body links, buttons, form labels or anything under 18px.
3. **Weight** is the only style that must not shift layout — animate the variation axis, never `font-weight`
   between discrete faces, which reflows the line.
4. **Flip** rotates on one axis only. Two axes make letters unreadable mid-turn.
5. **Wave** is the only looping style. It stops when the pointer leaves, and never runs on load.
6. Under reduced motion every style resolves to no transform; `weight` holds its rest axis value.

#### Numbers

Stat counters animate from the number's own final value — which is in the DOM from first render, so assistive tech
and search engines read the real figure. Duration 1s, tabular figures, once per page view. Under reduced motion the
final value renders immediately with no count.

#### Performance

- Cap at roughly **60 animated fragments** on screen at once. A letter-split Display XL headline of three words is
  about 20 — fine. A letter-split paragraph is hundreds — never.
- Fragments animate `transform` and `opacity` only.
- Set `will-change: transform` on fragments while the run is active; drop it when it ends.
- Re-split on resize only when the line count actually changed, debounced to 150ms.

### 9.9 Special animation — signature moments

A **signature moment** is an animation a visitor will remember. They work because they are rare, and they stop
working the moment they are everywhere.

> **The budget: three signature moments per page, one per navigation.** A fourth does not make the site feel richer.
> It makes the first three feel cheap.

#### The ledger — what the budget is spent on

| Moment | Earns its place by | Repeats |
| --- | --- | --- |
| Loader | Setting the tone before anything is readable | First visit per session only |
| Hero line reveal | Delivering the statement (§9.8) | Once per page load |
| Shared-element open | Showing where the case study came from | Every navigation — it is wayfinding |
| Cursor label | Naming what a row will do before the click | Continuous, fine pointers only |
| Magnetic CTA | Marking the single primary action | Continuous, fine pointers only |
| Stat counters | Drawing the eye to evidence | Once, on first view |
| Marquee | Showing range without a list | Continuous, pauses on hover |

Seven exist. A page uses at most three. To add an eighth, retire one.

#### How a special animation earns its place

All five, or it does not ship:

1. **It carries information.** Where you came from, what you opened, what changed. "It looks nice" is not a reason.
2. **It is interruptible.** A click during the loader skips it. A scroll during a reveal lands at the final state.
3. **It is rare.** Never attached to an action someone performs often. Delight on repeat is friction.
4. **It survives removal.** Build the page working with all of them off, then add them back.
5. **It costs nothing to the people who cannot use it.** Reduced motion, touch and keyboard all get the full content.

#### Kill criteria

Retire a signature moment when any of these is true: it fires more than once per session for no new reason; it
delays content by more than 300ms; it only works with a fine pointer and carries information available nowhere
else; it needs an explanation; or you stopped noticing it — if the author has gone blind to it, it is decoration.

#### Restraint

This system has no tilt, parallax, spotlight, glow, confetti, animated gradient, blob or scroll-jacked section.
Each was considered and rejected: none carries information, and each costs frames. Modern is loud in type and
colour so it does not have to be loud in motion.

### 9.10 Anti-patterns

Looping decorative motion · animation tied to every scroll step · bounce easing on large elements · motion that delays reading · hover-only information · cursor effects on touch · animated gradients · animating `width`, `height`, `top` or `left`.

---

## 10. Components

Every interactive component defines **rest, hover, focus-visible, active, disabled**. A missing state means the component is not done.

### Button

- **Anatomy:** label (14px / 700 / uppercase / +0.04em), optional icon at 20px with an 8px gap, 2px border, pill radius, 14 × 26 padding, ≥ 44px high.
- **Variants:** Primary · Ghost · On-dark · Icon-only (44 × 44, `aria-label` required).
- **States:** §9.1. Loading shows the `loader` icon and `aria-busy`.
- **Rules:** one primary per section; never two icons; label is a verb phrase.

### Link

- **Inline:** underlined by default, 2px, 3px offset. Hover draws the underline (§9.4.5). Visited does not change colour.
- **Standalone:** label style with a trailing `arrow-right` that nudges.
- **External:** `arrow-up-right` plus `rel="noopener"`; the accessible name says it opens in a new tab.

### Form field

- **Anatomy:** visible label above (label style) · input (2px ink border, 14px radius, 14 × 16) · helper text below (14px, muted) · error line.
- **States:** focus → `white` fill plus 3px outline; error → 5px inset `orange` bottom bar, `alert` chip and message in `deep`; disabled → `sand` fill, muted text.
- **Rules:** labels are always visible — placeholders are examples, not labels. Wire `aria-invalid` and `aria-describedby`. Error copy says what happened and what to do.

### Card / Value block

2px border, 16–18px radius. Grid cells share borders with no gaps, so the grid reads as one object. Hover fills `yellow` and text becomes `deep`; no movement. Contents: index label, Heading, muted body.

### Tag / Chip

Pill, 1.5px border, label style, 4 × 12. Variants: outline · `pink` fill (highlight) · `yellow` fill (status) · with a 16px leading icon. Interactive tags follow Button states.

### Work row

Grid `60px 1.1fr 1fr`: index · (category, Heading, excerpt, ≤ 3 tags, "Discover →") · image frame. 2px rules top and bottom. The whole row is one link with one accessible name.

### Timeline row

Grid `170px 1fr`: year (label) · company (h4), role (label), description (muted body). Current role carries a `yellow` "Now" pill.

### Stat tile

Display L number over a label, tabular figures, counts up once. Maximum three per row.

### Dark band

`deep` fill, `paper` text, 16px radius, one Display L headline with one `orange` emphasis word, one paragraph ≤ 34em, optional stats above a 1px `#444` rule.

### CTA block

`yellow` fill, 2px ink border, Display L question, one primary and one ghost button. One per page, at the end.

### Navigation

Sticky top bar: logo left, links centre (14px / 600), primary button right, 2px bottom rule. Link hover and current page show a 2px ink underline. Below 768px the links collapse into a "Menu / Close" toggle and the overlay in §9.6.

### Tooltip

`deep` fill, `paper` label text, 8px radius. Appears after 400ms hover or immediately on focus, fades over `--dur-fast`. MUST NOT contain essential information.

---

## 10b. Portfolio components

The pieces a portfolio page is built from. Live at `/design-system-modern#portfolio`; source in `cs-static.tsx` and
`cs-client.tsx`. Every component below inherits the state rules of §10 and the motion rules of §9.

### Case card

| | |
| --- | --- |
| **Anatomy** | 16:10 cover in the standard frame · index + category + year (label) · title (Heading, uppercase) · ≤ 2 tags · "Discover →" |
| **Variants** | **Standard** — stacked, title and tags only. **Featured** — two-column, adds the excerpt, ≤ 3 tags, Display-sized title |
| **States** | Hover: card fills `yellow`, image `scale(1.05)`, arrow nudges, **`muted` text switches to `deep`**. Focus: 3px outline. No active state — the card is a link |
| **Responsive** | Featured collapses to stacked at 820px; standard grid 3 → 2 → 1 |
| **A11y** | The whole card is one link with one accessible name (the title). Cover is `alt=""` because the title already names it |
| **Rules** | One featured card per index. Never two featured side by side |

### About block

Portrait (4:5, standard frame, `yellow` placeholder until a photograph exists) beside a label, a Lead-style statement
and a four-item fact list (role, experience, focus, location) above a 2px rule. Stacks below 820px with the portrait
first. The portrait gets a real alt text naming the person. Facts are a `dl`, not a table.

### Skill meters

| | |
| --- | --- |
| **Anatomy** | Name (bold) + group (label) · pill track with a `deep` fill · the number |
| **Motion** | Fill grows from zero with `scaleX` over `--dur-slow`, once, on first view. Final state under reduced motion |
| **A11y** | `role="meter"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and a label that reads "Name, 94 out of 100". **The number is always shown** — the bar is decoration |
| **Rules** | A meter is a claim. Say what the number measures or do not show it. Never use accent colours for the fill — `deep` on paper is 15.9:1 |

### Tool chips

Chips grouped under a label per group (Design, Research, AI…). Outline tags, not links — they are not interactive,
so they take **no hover state**. Never rate tools; the list is the claim.

### Awards list

Row = icon · title (bold) · issuer (label) · year (label, right-aligned) between 2px rules. Hover: `sand` fill and
12px indent over `--dur`. Below 820px the issuer is hidden — the title and year carry the meaning.

### Testimonial

A `pink` block, 2px border. Quote (Lead-scale, bold) in a `blockquote` inside a `figure`; name and role in a
`figcaption`. All text `deep`. **A testimonial without a name and role is not shown.** One sentence about the outcome,
not praise for the person.

### Contact form

| State | Behaviour |
| --- | --- |
| Idle | Visible labels above fields; placeholders are examples. Name, email, message; one primary button |
| Error | Per-field: 5px inset `orange` bar, `alert` chip, message in `deep`. `aria-invalid="true"` and `aria-describedby` wired. **Focus moves to the first invalid field** |
| Sending | Button label becomes "Sending…", `loader` spins, `aria-busy`, button disabled |
| Success | The form is replaced by a `green` block. `role="status"`; **focus moves to the confirmation**. Offers "Send another" |

Validation runs on submit, never on blur — an error shown while someone is still typing is an accusation, not help.
Error copy says what to do ("Enter an address like `name@company.com`"), never what went wrong ("Invalid input").

### Site footer

`deep` block, 16px radius. Footer-scale mail link (Display XL, `paper`) with an `arrow-up-right` that turns `yellow`
on hover, then a 1px rule and a label-style row: copyright, résumé, socials. Focus rings are `yellow`. **One
footer-scale email link per page.**

---

## 10c. Case-study components

Twenty components that assemble a case study, in two groups. Live at `/design-system-modern#casestudy`.

### Page order

```text
Breadcrumb → Hero (title, summary, meta strip, cover)
  → sticky rail + reading progress
  → Context → Research → Decisions → Outcome → Reflection
  → Next case study
```

The order is the argument: what was wrong, what was learned, what was decided, what changed, what would change next.
A case study that opens with outcomes has no tension; one that ends without reflection has no honesty.

### Structure

| Component | Anatomy | Key rules |
| --- | --- | --- |
| **Breadcrumb** | `nav aria-label="Breadcrumb"` · `ol` · `chevron-right` separators · last item `aria-current="page"`, bold, not a link | Three levels maximum |
| **Meta strip** | `dl` of four pairs — Role, Client, Year, Duration — between two 2px rules | Always all four. A missing value is written as "—", not omitted |
| **Case hero** | Breadcrumb · category label · Display title · Lead summary · meta strip · 21:9 cover | The summary states the problem and the outcome in two sentences |
| **Section header** | `number · eyebrow` label · Display-L title · optional Lead intro | The title states the finding ("What we learned"), not the topic ("Research") when it can |
| **Sticky rail** | "On this page" label · numbered buttons · active item has a 4px `yellow` bar **plus** a `deep` inset line · `aria-current="true"` | Scroll-spy via `IntersectionObserver`; clicking scrolls smoothly, or instantly under reduced motion. Collapses above the content below 820px |
| **Reading progress** | 6px bar, `deep` fill scaling on X · `role="progressbar"` | Updates on scroll with a passive listener; never animated independently |
| **Tabs** | WAI-ARIA tabs · roving `tabindex` · active tab has a 4px `yellow` underline **plus** a `deep` rule | See below |
| **Next study** | `yellow` block · label · Display title · description · "Read it →" | Always the last element. Hover turns `pink` |

#### Tabs — the keyboard contract

| Key | Result |
| --- | --- |
| `→` / `←` | Next / previous tab, wrapping; focus moves with selection |
| `Home` / `End` | First / last tab |
| `Tab` | Leaves the tablist for the panel — **one tab stop**, not one per tab |

Panels stay in the DOM and use `hidden`, so find-in-page and deep links work. Tabs are for **parallel** content
(overview, research, decisions, outcomes); never for steps that must be read in order, and never for the argument
itself — a reader who skips a tab skips a part of the case.

### Content

| Component | Anatomy | Key rules |
| --- | --- | --- |
| **Pull quote** | Display-L `blockquote` between two 2px rules · attribution label | One per case study, maximum two. A quote carries its source |
| **Figure** | Standard media frame · mono caption beneath | Caption says what the image shows **and why it is here** |
| **Callout** | `insight` (`yellow`) · `note` (`sand`) · `risk` (`pink`) · icon + word + text in `deep` | Kind is carried by **icon and word**, not colour. Max one per screen |
| **Persona card** | Avatar circle (accent fill, `users` icon) · name · role · Goal / Pain `dl` | Abstract, no faces (§7.3). Always a goal **and** a pain |
| **Finding list** | Large number · bold statement · body · evidence line with `users` icon | Every finding states its evidence ("7 of 9 participants"). No evidence, no finding |
| **Decision card** | Index + status pill · decision as an action · **Why** · **Trade-off** | A decision with no trade-off is not a decision. Status pill is glyph + word |
| **Before / after** | Two panels, `range` input revealing with `clip-path` | The slider is a real `input[type=range]` with `aria-valuetext`; arrow keys work. Use only when the two states are visually comparable |
| **Process steps** | 4-up cells · icon circle · phase label · title · one line | 4 → 2 → 1 columns at 820 / 520. Hover `yellow`, `muted` → `deep` |
| **Impact metrics** | Display-scale number · label · detail · optional delta chip | Three maximum. Each number has a unit and a source. Tabular figures |
| **Roadmap table** | Item · Why · Horizon · Status pill | Scrolls inside a focusable, labelled region on narrow screens |
| **Accordion** | `h5 > button[aria-expanded]` · panel in `role="region"` | See below |
| **Reflection** | Two cells: "What held up" / "What I would change" | The second cell is on `sand` — it is the honest one, so it is not decorated |

#### Status pills

| Status | Fill | Glyph | Meaning |
| --- | --- | --- | --- |
| Completed | `green` | `check` | Shipped or finished |
| In progress | `yellow` | `clock` | Being worked on |
| Planned | `sand` | `calendar` | Committed, not started |
| Foundational | `pink` | `layers` | Enables other work |

Every pill is **fill + glyph + word**, `deep` text, 1.5px `deep` border. Colour alone never distinguishes them, which
is also why `sand` is a valid status fill — the glyph and word do the work.

#### Accordion

Closed panels are `inert` (out of the tab order and the accessibility tree); open panels are not. Height animates
through `grid-template-rows: 0fr → 1fr`, which animates the **result** of a height change without animating
`height` itself (§8.1.5). The plus icon rotates 45° into a ×. One panel open at a time; the first starts open.
**Use for FAQs and appendices, never for the argument** — content in a collapsed panel is content most readers
never see.

#### Evidence rule

> Every claim-bearing block — finding, decision, metric, quote — **carries its evidence in the block**.

A finding without "n of N" is an opinion. A metric without a unit and source is decoration. A decision without a
trade-off is a preference. This rule is why the blocks have the fields they have.

### Sample copy

Component demos use `portfolio.ts` content where it exists. Everywhere else the preview says **"sample copy"** and
uses plainly generic text. Sample text never states a fact about a real project.

---

## 11. Case-study blocks

The existing block library is kept and restyled. The new components in §10b and §10c are the Modern replacements for most of it:

| Block | Treatment |
| --- | --- |
| Section heading | Display L, 2px rule above |
| Pull quote | Display L with one serif accent word, no quotation marks |
| Callout | Value block, `yellow` on hover disabled inside prose |
| Media | Standard frame (§7) with a mono caption beneath |
| Metrics | Stat tiles, three per row |
| Persona / artifact grid | Card grid, shared borders |
| Index rail | Mono label list; the active section is underlined |

Each block reveals once per §9.5.

---

## 12. Page patterns

1. **Hero** — Display XL statement over a two-column intro (who / statement).
2. **Statement band** — dark, one emphasis word, optional stats.
3. **Work index** — work rows, with optional cursor label and image follow.
4. **Values grid** — 2 × 2 value blocks.
5. **Path** — timeline rows, then recognition cards.
6. **CTA** — yellow block.
7. **Footer** — label-style links, copyright, 2px top rule.

Order may change. The rhythm rule in §4.6 may not.

---

## 13. Responsive

Modern is designed at 1440 and verified at 320. The live frame at `/design-system-modern#responsive` reflows by **container width** using CSS container queries, so a pattern can be checked at any width without resizing the browser.

### 13.1 Breakpoints

| Range | Container | What changes |
| --- | --- | --- |
| 320–424 | gutter 20 | Display XL floors at 52px; buttons full-width; stats 1-up; work-row image moves above the text; swatches 2-up |
| 425–599 ◆ | gutter 20 | Buttons return inline; tags wrap to two rows |
| 600–767 ◆ | gutter 24 | Stats 3-up; intro still stacked; card interiors grow to 24 |
| 768–819 ◆ | gutter 32 | Nav links replace the Menu toggle; swatches 3-up |
| 820–1023 | fluid | Multi-column patterns return: intro 2-up, work row 3-column, values 2 × 2, timeline 2-column |
| 1024–1439 ◆ | fluid | Full layouts; pointer effects eligible |
| ≥ 1440 | 1240 fixed | Container locks, margins grow, type stops scaling |

**820px is the structural breakpoint.** Every multi-column pattern collapses there. The reference's 1024 / 768 / 600 / 425 ◆ handle detail only.

### 13.2 Behaviour by component

| Component | ≥ 820 | 600–819 | < 600 |
| --- | --- | --- | --- |
| Navigation | Inline links | Inline links (≥ 768) | Menu overlay |
| Hero intro | 2 columns | Stacked | Stacked |
| Work row | index / text / image | text, image below | image first, then text |
| Values grid | 2 × 2, shared borders | 2 × 2 | 1 column, borders restored between cells |
| Timeline | year beside content | year beside content | year above content |
| Stat tiles | 3-up | 3-up | 1-up |
| Buttons | Inline, auto width | Inline | Full-width, stacked 8px apart |
| CTA | 64 padding | 40 | 18 |
| Icon gallery | auto-fill 132px | auto-fill 132px | 2-up |
| Tables | Full | Full | Horizontal scroll inside a bordered frame |

### 13.3 Fluid type

| Style | 320px | 768px | 1440px |
| --- | --- | --- | --- |
| Display XL | 52 | 96 | 180 |
| Display L | 36 | 50 | 94 |
| Heading | 26 | 26 | 46 |
| Lead | 18 | 18 | 24 |
| Body | 16 | 17 | 18 |

### 13.4 Rules

- Touch targets ≥ 44px at every width.
- No hover-only content — §9.4 is enhancement only.
- No horizontal page scroll at 320px; a wide table scrolls inside its own frame.
- Container queries are preferred over media queries for components that appear at more than one width.
- Test matrix: 320 · 375 · 768 · 1024 · 1440, plus 200% zoom at 1280.

---

## 14. Accessibility

Target: **WCAG 2.2 AA**, exceeded in two places — 44px targets (2.5.8 asks 24px) and measured non-text contrast.

| Area | Requirement |
| --- | --- |
| Contrast | §2.3 is binding: text 4.5:1, large 3:1, non-text 3:1 |
| Focus | 3px `deep` outline, 2px offset; `yellow` on dark. Never removed, never clipped by `overflow` |
| Keyboard | Every function reachable; logical order; the overlay traps focus and returns it on close; Esc closes |
| Targets | ≥ 44 × 44px, including icon-only buttons |
| Structure | One `h1`, headings in order, landmarks (`header`, `nav`, `main`, `footer`), skip link first in the DOM |
| Names | Icon-only controls have `aria-label`; links make sense out of context; no "click here" |
| State | Never colour alone — pair with a glyph or words |
| Motion | §8.4; anything over 5s is pausable |
| Forms | Visible labels, programmatic errors, focus moves to the first invalid field |
| Zoom | 200% with no horizontal scroll at 320px; `lang` set |
| Media | Real alt text for meaningful images, `alt=""` for decorative |

**Verification pass** — run all five before calling a template done:

1. axe clean.
2. Keyboard-only walk of every flow, including the menu overlay.
3. VoiceOver pass on hero, work index and contact form.
4. Reduced motion on and off.
5. 200% zoom and 320px width.

---

## 15. Voice and content

- First person, declarative, under 20 words per sentence, active verbs.
- Headlines take a position — "Evidence over assumption." Questions are reserved for the CTA.
- Numbers come from portfolio content only, with their unit and what they count.
- Buttons are verb phrases: "Say hello", "Download résumé". Never "Learn more".
- Errors: what happened, then what to do. Success: what happened.
- Name things: "nine discovery interviews", not "various stakeholders".
- Banned: *passionate, leverage, synergy, delightful, crafting experiences, seamless, robust*.
- Casing: display copy is uppercased in CSS; the source stays sentence case.

---

## 16. Data and charts

- Flat fills from the accent set, 2px `deep` border, maximum four series.
- Label directly on the mark; avoid legends.
- All chart text in label style; gridlines 1px `ink` at 20% opacity.
- Bars grow from zero with `scaleX/Y` over `--dur-slow` on first view; reduced motion renders the final state immediately.
- Never encode meaning in colour alone — every series carries a label.
- Always ship the underlying data table or a one-sentence text summary.

---

## 17. Tokens

```css
:root {
  /* colour */
  --paper:#F2F2EA; --sand:#ECECE3; --ink:#333333; --deep:#101820; --muted:#6B6B63;
  --yellow:#FEBE1E; --orange:#FF640A; --green:#00BE5A; --pink:#FFA9F0; --stone:#A2A2A2;
  --white:#FFFFFF;

  /* shape */
  --rule:2px solid var(--ink);
  --r-pill:999px; --r-card:16px; --r-img:14px;

  /* motion */
  --dur-instant:100ms; --dur-fast:250ms; --dur:300ms; --dur-slow:600ms; --dur-page:700ms;
  --ease:ease;
  --ease-out:cubic-bezier(.2,.7,.2,1);
  --ease-in-out:cubic-bezier(.76,0,.24,1);
  --ease-spring:cubic-bezier(.34,1.56,.64,1);
  --stagger:60ms; --stagger-line:80ms; --stagger-word:40ms; --stagger-letter:25ms;
  --dur-vt:450ms; --dur-t-quick:200ms; --dur-t-standard:320ms; --dur-t-expressive:520ms; --dur-t-max:700ms;

  /* layout */
  --container:1240px; --gutter:clamp(20px,4vw,48px); --columns:12; --col-gap:24px;
  --space-1:4px;  --space-2:8px;   --space-3:12px; --space-4:16px;  --space-5:24px;
  --space-6:32px; --space-7:48px;  --space-8:64px; --space-9:96px;  --space-10:120px;

  /* layering */
  --z-base:0; --z-raised:5; --z-pointer:10; --z-overlay:40; --z-blocking:50;

  /* icons */
  --icon-grid:24; --icon-stroke:2; --icon-cap:round; --icon-join:round;
}
```

**Naming:** `--category-name`. No raw hex, millisecond or pixel value belongs in a component — if a value is missing, add a token.

---

## 18. Governance

- **Owner:** the portfolio owner. Every change gets a changelog entry in §21.
- **A new colour** requires a measured contrast row in §2.3.
- **A new motion** requires a stated purpose (one of the three questions in §1.5), the tokens used, its reduced-motion behaviour, and a performance note.
- **A new icon** requires the seven-point checklist in §6.6.
- **A new component** requires its full state table.
- **Deviations** are documented in the component, never coded silently.
- **Review cadence:** at each new case study or new section.

### Definition of done

A component ships when it: matches its state table · uses tokens only · passes the §14 verification pass · is tested with reduced motion on and off · is verified at 320, 768 and 1440 · and is documented in this file.

---

## 19. Performance, SEO and sharing

- Fonts via `next/font` with `display: swap`. No layout shift from display type — set `line-height` and use `clamp`.
- CSS handles hover and press; JavaScript is reserved for pointer effects, counters and observers. Animation JS on the home page: ≤ 15KB gzipped beyond the framework.
- Icons are inline SVG from `icons.tsx` — no sprite request, no icon font, and they inherit `currentColor`.
- Images: AVIF or WebP, explicit dimensions, lazy below the fold.
- Preview routes are `noindex`.
- Share image: paper background, Display XL name, one yellow accent block.

---

## 20. Implementation notes

### Repository layout

```text
MODERN-DESIGN-SYSTEM.md        this specification (the source of truth)
src/
  app/                         Next.js shell: layout, fonts, page entry
  content/portfolio.ts         generic sample content for the demos
  design-system/
    page.tsx                   all 21 topics, live
    modern.css                 tokens + every class, scoped under .ms
    icons.tsx                  45 icons, Icon component, optical sizing map
    icon-gallery.tsx           searchable set, construction sheet, icons in use
    illustrations.tsx          three illustrations (spot, feature, scene) drawn to the §7 spec
    illustration-lab.tsx       five animation styles, line-to-form unfold, banned treatments
    layout-lab.tsx             12-column overlay, spacing scale, responsive frame
    motion-lab.tsx             icon, pointer and feedback motion
    type-lab.tsx               split-level type animation, hover letters, counters
    transition-lab.tsx         shared-element transition, overlay, loader, styles, speed lab
    cs-static.tsx              24 presentational portfolio and case-study components
    cs-client.tsx              tabs, accordion, before/after, scroll-spy rail, contact form
    use-media.ts               media-query hook powering pointer-effect gating
public/                        flat placeholder images used by the demos
docs/                          static build served by GitHub Pages
```

### Running and publishing

| Task | Command |
| --- | --- |
| Develop | `npm install` then `npm run dev`, open http://localhost:3000 |
| Typecheck | `npm run typecheck` |
| Rebuild the published preview | `npm run build:pages`, then commit `docs/` |

GitHub Pages serves `docs/` from `main`. After changing any source file, run `npm run build:pages` and commit the
refreshed `docs/` — the published site is a build artefact and does not rebuild itself.

### Notes

- Everything is scoped under `.ms`, so the preview cannot leak into a host application's styles.
- The page relies on Tailwind's preflight reset (copied to `src/app/preflight.css`) for element defaults.
- **To adopt in an application:** move §17 into your global stylesheet, map the tokens in your Tailwind or CSS
  configuration, copy `src/design-system/` for reference implementations, then run the §14 verification pass.
- Demo content is generic sample text. Replace `src/content/portfolio.ts` to preview with your own.

### Known gaps

| Gap | Status |
| --- | --- |
| Manuka, Financier Display, Basis Grotesque Pro | Licensed, not bundled. Inter and Cormorant stand in |
| Dark mode | Out of scope (§2.6) |
| Icon set | 45 icons; no file-type, media-control or map icons yet |
| Published preview | A build artefact in `docs/`; rebuild after source changes |

---

## 21. Changelog

- **1.7** — Added transition speed under page transitions (§9.6): five perception bands, a six-tier token ladder, a default, range and scaling rule for every style, a duration formula with its measured output table, and nine speed rules including exits at 70%, repeat-visit and phone scaling, interruption, and a repetition test. Four new route tokens. The formula's limits are stated from measurement: the reachable range is 223–620ms, and below about 25% distance the 350ms clamp makes every small move identical, so those should use the 200ms cross-fade. A live speed lab and calculator in the preview run the same function.

- **1.6** — Added 24 components for portfolios and case studies (§10b, §10c), mapped from the roughly 55 block components the real case studies use. Portfolio: case card, about block, skill meters, tool chips, awards, testimonial, contact form with four states, footer. Case study: breadcrumb, meta strip, hero, section header, scroll-spy rail with reading progress, tabs with the full keyboard contract, pull quote, figure, callout, persona, finding list, decision card, before/after, process steps, impact metrics, roadmap, accordion, reflection, next-study footer. Introduced the evidence rule and status pills (fill + glyph + word). **Fixed a contrast bug from earlier versions:** `muted` text on an accent fill is 3.22:1 on yellow, 3.12:1 on pink and 2.18:1 on green, all failing, and the value block's hover state left its index label muted on yellow. §2.5 now states that no `muted` text sits on an accent fill, including on hover, and the fix is applied to every surface.

- **1.5** — Four additions. Illustration motion gained five named styles and the line-takes-form technique, where a guide line leads and the drawing lands in its wake, plus line-to-form path interpolation and the matched-command-count rule (§7.4). Type colour is now specified per role and background, with the highlight-by-fill rule that stops accent-coloured text appearing on paper (§3.4). Page transitions gained a five-style catalogue — circle reveal from the click point with its keyboard fallback, cover, push and the page-turn caveat (§9.6). Letter hover gained six styles with a one-per-site rule (§9.8). All four are live in the preview.

- **1.4** — Illustration became a system rather than three bullet points (§7): three tiers that cap element count and accents, a full style table covering line, stroke, outline colour, fill, coverage, depth, border, radius and the no-faces rule, the fill-the-subject-outline-the-context rule with a use-when table, and the contour-gap technique that gives depth without shadows. Added illustration motion (§7.4) — the draw-then-fill sequence, `pathLength` normalisation, the one-loop limit and the still-first rule. Three illustrations drawn to the spec, plus the banned treatments rendered rather than described.

- **1.3** — Fixed a flash of false content in the transition lab: the support and reduced-motion labels were rendered from JavaScript, so the server asserted the wrong one until hydration corrected it. Added the rule in §9.6 — the enhancement is gated in JavaScript, the description of it is gated in CSS — with a table for presentational, behavioural and stateful branches. The three capability labels are now `@supports` and `@media` driven and correct on first paint.

- **1.2** — Rewrote page transitions on the View Transitions API (§9.6): a seven-row ledger, shared-element morphs with the uniqueness and `flushSync` rules, navigation choreography, speculation-rules prerendering, the 450ms cap and the focus, scroll and back-button non-negotiables. Added special animation (§9.9) — the three-per-page signature budget, a ledger of the seven moments, the five tests an animation must pass, kill criteria, and the list of effects deliberately rejected. New `--dur-vt` token; live demonstrations of all four transitions in the preview.

- **1.1** — Added type animation (§9.8, renumbered from §9.9 in 1.2) with three split levels and their staggers, the mask-rise and soft-rise motions, the 600ms total-run cap, the `aria-label` plus `aria-hidden` rule that keeps split text readable to screen readers, font-loading order, per-letter hover for display links, counter behaviour and a fragment budget. Summarised in §3.4; three new stagger tokens in §17; live demonstration in the preview's Typography section.

- **1.0** — Icon library drawn and shipped: 45 icons, round caps and joins, no sharp corners, optical sizing across five sizes, one declared motion each, a construction sheet and a contribution checklist (§6). Layout expanded with a 12-column spec, per-pattern column spans, component padding and a z-index scale (§4). Responsive expanded with seven breakpoint rows, per-component behaviour, a fluid-type table and container-query guidance, plus a live resizable frame (§13). Added semantic colour mapping (§2.2), imagery (§7), component state tables (§10), case-study block treatments (§11), icon rules in performance (§19) and a file map with known gaps (§20). Preview rebuilt to cover all 21 topics.
- **0.2** — Measured 15 further contrast pairs; added the non-text contrast rule; rewrote motion and animation patterns with tokens, easing, choreography, icon motion, pointer animation, scroll, overlay and state patterns; added usage rules and a definition of done.
- **0.1** — Initial proposal: palette, type, layout, shape and tokens extracted from the reference.

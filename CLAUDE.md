# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server at localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the dist/ build locally
```

Dev server background mode (preferred when working in parallel):
```bash
astro dev --background
astro dev stop | status | logs
```

Node.js ≥ 22.12.0 required (Astro 5 constraint).

## Architecture

Single-page landing site. One route: `src/pages/index.astro` assembles all sections in order.

**Rendering split:**
- `.astro` files (Navbar, Pricing, Footer) — static HTML, zero JS hydration
- `.tsx` files — React islands with explicit hydration directives:
  - `client:load` → Hero (above fold, immediate)
  - `client:visible` → all mid-page sections (lazy hydrate on scroll)
  - `client:idle` → BookingCTA (last section, deferred)

**Section order** (matches page top → bottom):
Hero → QuickBook → RoomTypes → WhySoundBox → Facilities → SongCatalog → Pricing → PromoPackages → Gallery → Testimonial → FAQ → BookingCTA

## Key Patterns

**WhatsApp booking** — no backend. All booking forms encode a pre-filled message and open `https://wa.me/628112233445?text=...`. The WA number is defined as `const WA = '628112233445'` at the top of each booking component.

**Framer Motion animations** — shared variants live in `src/components/ui/animations.ts`:
- `stageFade` — single element fade-up (most common)
- `beatReveal` — container with stagger children (Hero)
- `staggerContainer(delay)` — wraps lists of stageFade children

Pattern: wrap section content in `<motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={{ once: true }}>`, children use `variants={stageFade}`.

**Icons** — Solar Icons (`@solar-icons/react`) exclusively. Always pass `size`, `weight`, and `color` props. Weights used: `Bold` (UI actions), `BoldDuotone` (feature/USP cards), `Broken` (decorative floating). Never use emoji in UI — check Solar icon names against the ESM export before using:
```bash
node -e "import('./node_modules/@solar-icons/react/dist/esm/index.mjs').then(m => console.log(Object.keys(m).filter(n => n.toLowerCase().includes('KEYWORD')).join('\n')))"
```

**Static `.astro` interactivity** — Pricing tab switching uses vanilla JS. Because Astro bundles `<script>` as ES modules (scoped), functions cannot be called via `onclick=""` attributes. Use `addEventListener` instead.

## Design System

Tokens defined in `src/styles/global.css` via Tailwind v4 `@theme` block — use as Tailwind classes (`bg-bg`, `text-pink`, `border-border`, etc.).

| Token | Value | Usage |
|---|---|---|
| `bg` | `#0d0d0d` | page background |
| `surface` / `surface-2` / `surface-3` | `#181818` / `#252525` / `#1a1a2e` | card layers |
| `pink` | `#e91e8c` | primary accent, CTAs |
| `purple` | `#7c3aed` | secondary accent |
| `gold` | `#f59e0b` | VIP / premium highlights |
| `muted` | `#9ca3af` | body text |

Utility classes: `.gradient-text` (pink→purple), `.card-dark` (surface + border + radius), `.section-padding` (96px top/bottom), `.glow-pink/purple/gold`.

Fonts: **Plus Jakarta Sans** (`font-display`) for headings with negative letter-spacing; **Inter** (`font-body`) for body. Loaded via Google Fonts in `src/layouts/Layout.astro`.

## Deployment

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).

- `base` path is `/soundbox-karaoke` **only on GitHub Actions** (`process.env.GITHUB_ACTIONS`), so localhost runs at `/` without change.
- Push to `master` triggers auto-deploy.
- Live URL: https://rimba-maker.github.io/soundbox-karaoke

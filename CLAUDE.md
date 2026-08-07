# Branding

This project follows the Fenton Pride Collective (FPC) Document & Report
Branding Guidelines (`~/Downloads/FPC Document & Report Branding
Guidelines.pdf`). Apply it both to generated documents/reports and to the
app's own UI (SCSS in `src/sass/`).

## Color

CSS custom properties live in `src/sass/variables.scss`.

| Token | Hex | Variable | Use |
|---|---|---|---|
| Indigo | `#2C3290` | `--primary-color` | Primary/dominant — titles, H1, table headers, header/footer bars |
| Cobalt | `#2B55A5` | `--secondary-color` | Secondary accent — H2, H4, subtitles |
| Vivid Pink | `#F25FBA` | `--accent-pink` | Celebratory highlight only (milestones) — not routine content |
| Coral | `#F46F4E` | `--accent-coral` | Action/CTA, the Heading 1 rule |
| Cream | `#F6F7F9` | `--color-cream` | Light background / table row banding — never the main body background |
| Ink | `#252D31` | `--color-ink` | Body text — never pure black (`#000000`) |
| Muted | `#656A72` | `--color-muted` | Captions, footnotes, footer text |
| Border | `#D7DDE4` | `--color-border` | Table borders, hairline dividers — never plain black |

Don't introduce colors outside this palette. Functional game-state colors
(bingo ball/card colors in `colors.scss`, play/pause button green/red) are
exempt — they're semantic, not brand chrome.

## Typography

- Serif (`--heading-font`: Caladea/Cambria) is reserved for **Title and
  Heading 1 only**. Everything else uses sans (`--body-font`:
  Carlito/Calibri).
- Hierarchy below H1 comes from weight/family/color, not size.
- H1: Indigo, with a thin Coral rule beneath it (the one sanctioned accent
  line in this system — don't add other decorative stripes/gradients).
- H2 & H4: Cobalt. H3: Ink. Body: Ink.

## Do / Don't

- Do keep body text in Ink, never pure black.
- Do reserve serif type for Title/H1 only.
- Don't add gradients or extra accent stripes — solid fields only, except the
  Coral H1 rule.
- Don't use pure black borders/gridlines — use `--color-border` and
  `--color-cream` instead.

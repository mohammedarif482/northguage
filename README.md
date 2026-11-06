# Northgauge | Creative-Led Growth Agency

A single-page website built strictly in accordance with the **Northgauge Single-Page Website Plan** and **Northgauge Brand Book**.

> **"A hook for curious minds."**  
> We build brands people notice, ads that pay back, and customers who come back. One team, three moves: **Hook. Reel. Keep.**

---

## 🎨 Brand Identity & Specifications

| Element | Specification | Hex / Value |
| :--- | :--- | :--- |
| **Northgauge Orange** | Accent, buttons, numbers, final CTA block | `#FF4B00` (Pantone 1655 C) |
| **Cream** | Core background & card fills | `#FCF5CD` (Pantone 7499 C) |
| **Charcoal** | Typography & high-contrast elements | `#1F1F1F` (Pantone Black 7 C) |
| **Stone** | Borders, neutral badges, labels | `#B7B2A7` (Pantone Warm Gray 4 C) |
| **Off White** | Crisp background tints | `#FFFDF2` (Pantone 663 C) |
| **Soft Peach** | Badge discs, icons, soft highlights | `#FADCC4` |
| **Typography** | Headlines & body | Plus Jakarta Sans (Geometric Sans) |

---

## 🧭 Page Architecture (11 Sections)

1. **Sticky Header (`#top`)**: Adaptive header that shrinks upon scroll; includes wordmark SVG, desktop navigation, mobile drawer, and sticky "Book a call" CTA.
2. **Hero (`#top`)**: Full-screen cream layout with eyebrow (`CREATIVE-LED GROWTH AGENCY`), primary headline, dual action buttons, and large swaying Northgauge hook graphic with floating curiosity cards.
3. **Logo Strip**: Seamless infinite marquee ticker of client brands across the UK, US, UAE, and Australia.
4. **Proof Numbers**: Four counters (`45+ Brands Grown`, `4.8x Average ROAS`, `$18M+ Managed Ad Spend`, `62% Repeat Revenue`) that dynamically count up when scrolled into view.
5. **The Problem**: Centered editorial manifesto addressing agency fragmentation, culminating in the brand punchline: *"Northgauge puts all three on one line."*
6. **Hook. Reel. Keep. Spine (`#services`)**: Three structural service columns joined by a continuous orange fishing line ending in the hook icon, linking to deep-dive panels.
7. **Service Panels (`#hook`, `#reel`, `#keep`)**:
   - `01 HOOK`: Creative-led brand building (Be the brand they can't scroll past)
   - `02 REEL`: Performance marketing (Ads that pay their own way)
   - `03 KEEP`: Retention marketing (Keep them hooked)
   - Each with *Signs you need this*, *What we do*, and direct audit CTAs.
8. **Featured Work (`#work`)**: Case study cards with filter tags (`Kinto Wellness`, `Sól Apparel`, `Aura Botanicals`) opening interactive before/after breakdown modals.
9. **Why Northgauge (`#why-us`)**: 2×2 grid of brand pillars with custom icons (*Curiosity first*, *Creative that's measured*, *One team full funnel*, *Senior people on your account*).
10. **Testimonials**: Interactive founder slider with verified client quotes and tangible outcome metrics.
11. **FAQ (`#faq`)**: Accordion resolving client qualification, scoping, pricing, time zones, and turnaround times.
12. **Book an Audit + Footer (`#audit`)**: High-impact full-width Northgauge Orange block with 3 clear steps, dual-mode intake form / live calendar scheduler, UK/EU GDPR cookie consent banner, and footer.
13. **Delight & Polish**: Scroll-progress hook gliding along the right viewport edge, animated counters, swaying hook physics, and responsive design.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript 5
- **Icons**: Lucide React
- **Typography**: Google Fonts (`Plus_Jakarta_Sans`)
- **Assets**: Extracted vector SVGs (`/public/northgauge-wordmark.svg`, `/public/northgauge-hook.svg`)
- **Package Manager**: pnpm

---

## 🚀 Getting Started

```bash
# Navigate to the project directory
cd /Users/mohammedarif/dev/northgauge

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

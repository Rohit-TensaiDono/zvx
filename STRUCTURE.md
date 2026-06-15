# ZenVoraX — Codebase Structure

## Rule: Where to find / change anything

| What you want to change         | File to edit                              |
|---------------------------------|-------------------------------------------|
| Brand colors / theme tokens     | `src/constants/theme.js`                 |
| Framer Motion animation curves  | `src/constants/animations.js`            |
| All route paths                 | `src/constants/routes.js`                |
| Product data (specs, images)    | `src/data/products.js`                   |
| Agency service descriptions     | `src/data/services.js`                   |
| Nav links / dropdown items      | `src/data/navigation.js`                 |
| Navbar or Footer                | `src/components/layout/`                 |
| Three.js neural mesh + scroll   | `src/components/three/ScrollMesh.jsx`    |
| Fire sparkles particles         | `src/components/AnimatedParticles.jsx`   |
| Reusable button styles          | `src/components/ui/Button.jsx`           |
| Section scroll reveal animation | `src/components/ui/RevealSection.jsx`    |
| Homepage sections               | `src/components/sections/`              |
| Homepage page file              | `src/app/page.jsx`                       |
| Agency page                     | `src/app/agency/page.jsx`               |
| BESS calculator page            | `src/app/products/bess/page.jsx`        |
| R-VAK product page              | `src/app/products/rvak/page.jsx`        |

## Adding a new product
1. Add entry to `src/data/products.js` → `verticals` array
2. (Optional) Create `src/app/products/[slug]/page.jsx`
3. Add to nav in `src/data/navigation.js`
That's it. No component edits needed.

## Adding a new agency service
1. Add entry to `src/data/services.js` → `services` array
2. Done. AgencyPage reads from that array.

## Adding a new page
1. Create `src/app/[route]/page.jsx`
2. Navbar, Footer, and ScrollMesh are provided automatically by `src/app/layout.jsx`
3. Import sections from `src/components/sections/` as needed

## Scroll narrative stages (ScrollMesh.jsx)
- 0–15%  → idle neural mesh
- 15–40% → mesh expands (products section appearing)
- 40–65% → mesh spreads + fades to background
- 65–100%→ mesh dissolves for clean About/Contact

## Performance note
ScrollMesh reads window.scrollY inside requestAnimationFrame.
There is NO scroll event listener. This is intentional — it eliminates
jank completely. The lerp factor (0.04) controls smoothness.

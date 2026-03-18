# Savanna Grill — Restaurant Website

A fully responsive restaurant website for **Savanna Grill**, a premium East African fictional dining experience in Westlands, Nairobi.

Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools. Push to GitHub, deploy to Vercel in minutes.

---

## Features

- Responsive layout — mobile, tablet, desktop
- Hero image slider with auto-advance and keyboard/mouse pause
- Scroll-triggered reveal animations with staggered card delays
- Parallax effect on the About section (bug-fixed from original)
- Active navigation link highlighting on scroll
- Reservation form with validation and mailto fallback
- Newsletter form with email validation
- Preloader animation
- Back-to-top button
- Semantic HTML5, proper ARIA labels, correct `alt` text throughout

---

## Project Structure

```
savanna-grill/
├── index.html
├── favicon.svg
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
        ├── hero-slider-1.jpg
        ├── hero-slider-2.jpg
        ├── hero-slider-3.jpg
        ├── about-banner.jpg
        ├── about-abs-image.jpg
        ├── special-dish-banner.jpg
        ├── logo.svg
        ├── badge-1.png
        ├── badge-2.png
        ├── testi-avatar.jpg
        ├── testimonial-bg.jpg
        ├── footer-bg.jpg
        ├── form-pattern.png
        ├── hero-icon.png
        ├── separator.svg
        ├── menu-1.png … menu-6.png
        ├── service-1.jpg … service-3.jpg
        ├── event-1.jpg … event-3.jpg
        ├── features-icon-1.png … features-icon-4.png
        └── shape-1.png … shape-9.png
```

---

## Local Development

No build step needed.

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/savanna-grill.git
cd savanna-grill

# Open in browser — any static file server works
npx serve .
# or just open index.html directly in your browser
```

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your site is live in under 60 seconds.

### Option B — GitHub + Vercel Dashboard

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Framework preset: **Other** (it's a static site)
5. Build command: *(leave blank)*
6. Output directory: *(leave blank or `.`)*
7. Click **Deploy**

Vercel will auto-deploy every time you push to `main`.

---

## Code Improvements vs Original Template

| Issue | Fix |
|---|---|
| `body { height: 300vh }` — leftover dev hack | Removed |
| `hover:shine` class — colon in class name is non-standard | Renamed to `hover-shine` |
| Parallax bug — `x` was multiplied inside loop, compounding on each item | Fixed: each item now independently calculates offset from base values |
| Placeholder email (Cloudflare-obfuscated) | Replaced with real email |
| All Lorem Ipsum content | Replaced with real Savanna Grill / Nairobi content |
| No ARIA labels on nav buttons | Added throughout |
| Vague `alt=""` on hero images | Descriptive alt text added |
| No scroll reveal on cards | Added `IntersectionObserver` with staggered CSS delays |
| No active nav link tracking | Added `IntersectionObserver` for section-based nav highlighting |
| No form validation | Reservation and newsletter forms now validate and provide user feedback |
| No parallax pause on mobile | Touch/pointer detection can be added — currently only runs on `mousemove` |

---

## Contact

Brian Otieno Obonyo  
brianprofocus@gmail.com  
[brianobonyo.dev](https://brianobonyo.dev)  
+254 741 522 175
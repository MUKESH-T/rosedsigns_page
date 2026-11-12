# RoseDsigns: Landing Page

A luxury, modern, fully responsive landing page for **RoseDsigns**, a creative design and digital marketing agency (*Creative · Branding · Advertising*). Built as a practical assessment for the Web Design & Development Specialist role.

> Assessment submission by Mukesh. Built for evaluation only, not for commercial use.

---

## Features

- **Splash loader:** animated logo and rose bloom, with a progress counter and a curtain reveal
- **Hero:** word-by-word headline reveal, floating petals, parallax and a marquee strip
- **Scroll-driven rose animation:** the rose blooms in the hero, follows the scroll to the About section, then morphs into the RoseDsigns logo
- **About:** brand story, "Discover · Create · Connect" process and animated counters
- **Services:** 8 services on the home page, plus a `/services` page with a rotating arc carousel (auto-loop, click to select, swipe and keyboard support)
- **Projects:** filterable grid (Web / Social / Video) with detail pages at `/projects/:id`
- **Contact:** validated form with success state, plus WhatsApp, email and Instagram links
- **Extras:** smooth scrolling, custom cursor (desktop), scroll progress bar, page transitions, reduced-motion support

---

## Tech Stack

- React (Vite)
- React Router DOM
- Framer Motion
- Lenis (smooth scroll)
- Lucide React (icons)
- Plain CSS with CSS variables

---

## Brand System

| Token | Color |
|---|---|
| Rose Black | `#171514` |
| Ivory | `#F7F3EC` |
| Antique Rose | `#A76570` |
| Dusty Blush | `#D9B1AE` |
| Burgundy | `#672D39` |
| Antique Gold | `#B08A57` |

**Fonts:** Cormorant Garamond / Playfair Display (headings), Inter (body)

---

## Getting Started

**Requirements:** Node.js 18+

```bash
# 1. Clone the repo
git clone <your-github-repo-url>
cd <project-folder>

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build
npm run preview
```

---

## Project Structure

```
src/
├── assets/          # logo, project images
├── components/      # Navbar, Hero, About, Services, Projects, Contact, Footer,
│                    # Loader, RoseScrollAnimation, ServicesArc
├── data/            # services.js, projects.js
├── pages/           # Home, ServicesPage, ProjectDetail, ContactPage, NotFound
├── styles/          # global CSS and variables
├── App.jsx
└── main.jsx
public/
└── _redirects       # SPA routing fix for Netlify
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Landing page |
| `/services` | All services (arc carousel) |
| `/projects/:id` | Project detail |
| `/contact` | Contact page |
| `*` | 404 page |

---


## Responsive Testing

Checked at **375px** (mobile), **768px** (tablet) and **1280px** (desktop). Animations respect `prefers-reduced-motion`.

---

## Credits

- Brand identity, logo and project references: [RoseDsigns](https://rosedsigns.com/)
- Icons: [Lucide](https://lucide.dev/)
- Fonts: Google Fonts

---

## Author

**Mukesh**, Full Stack Developer
Email: <mukesh.thangarj@gmail.com> 
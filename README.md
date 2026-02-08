# BrainDock Website

Marketing and download landing page for **BrainDock** — an AI-powered focus and productivity desktop app for macOS and Windows.

## Features

- Responsive landing page with hero, features, how it works, testimonials, pricing, FAQ, and download CTA
- Privacy Policy and Terms of Service pages
- Dedicated download page with OS detection (buttons are display-only)
- Smooth scroll, navbar scroll effect, mobile hamburger menu
- FAQ accordion, video modal, system requirements modal
- Monthly/Yearly pricing toggle
- Accessibility: skip link, ARIA attributes, focus states, reduced motion support
- SEO: meta tags, Open Graph, Twitter Card, JSON-LD schema, sitemap, robots.txt

## Tech Stack

- HTML5, CSS3, vanilla JavaScript
- No build step required
- Inter font (Google Fonts)

## File Structure

```
├── index.html          # Main landing page
├── style.css           # All styles
├── script.js           # All JavaScript
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── downloads/
│   └── download.html   # Download page (display-only buttons)
├── assets/
│   ├── images/         # placeholder.svg used for all image placeholders
│   └── icons/          # logo-dark.svg, logo-light.svg, favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Setup (Local)

1. Clone or download the project.
2. Serve the root folder with any static server, e.g.:
   - **Python 3:** `python -m http.server 8000`
   - **Node:** `npx serve .` or `npx http-server`
   - **VS Code:** Live Server extension
3. Open `http://localhost:8000` (or the port shown).

## Customization

- **Copy:** Edit `index.html`, `privacy.html`, and `terms.html` for text changes.
- **Colors/fonts:** Update CSS variables in `:root` in `style.css`.
- **Images:** Replace `assets/images/placeholder.svg` with real assets (hero-dashboard, feature screenshots, testimonials, og-image.png) and update `src` attributes in the HTML.
- **Favicons:** Add `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, and `icon-512.png` in `assets/icons/` for full support; `favicon.svg` is already provided.

## Download Buttons

Per project requirements, all download buttons are **display-only**: they do not trigger downloads or navigation. Wire them to real installer URLs or a checkout flow when ready.

## Deployment

1. Build/optimize assets if needed (e.g. image compression).
2. Upload the project root to your host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3+CloudFront, etc.).
3. Set the document root to the project root so `index.html` is served at `/`.
4. Configure custom domain and SSL.
5. Update `sitemap.xml` and any meta `og:url`/canonical URLs to your production domain.

## Browser Support

- Chrome, Edge, Firefox, Safari (last 2 versions)
- Mobile Safari (iOS 12+), Chrome Android

## License

Proprietary — BrainDock, Inc.

## Contact

- Website: https://braindock.app
- Email: hello@braindock.app

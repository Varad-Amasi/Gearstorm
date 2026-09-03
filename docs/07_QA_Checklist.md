# Phase 7 QA checklist (manual)

Use this after `npm run test`, `npm run test:e2e`, and `npm run build`.

## Accessibility
- [ ] Keyboard-only: Tab through Home → Register → Contact; Escape closes modal/menu
- [ ] Skip link appears on first Tab and moves focus to `#main-content`
- [ ] Form errors announced (`role="alert"`) on Contact + Register
- [ ] Colour contrast spot-check on primary button vs dark background
- [ ] Gallery lightbox closes with Escape and restores focus

## Cross-browser / device
- [ ] Chrome latest — Home, 3D robot (or fallback), forms
- [ ] Firefox latest — navigation + gallery / register forms
- [ ] Edge latest — same as Chrome
- [ ] Safari (macOS/iOS) — Home sticky/auto robot, Register
- [ ] Mobile width 375px — hamburger menu, Register fields stack

## Performance
- [ ] `npm run build` — initial JS (index + Home) under ~200KB gzip without Three
- [ ] Open `dist/stats.html` after build (rollup visualizer)
- [ ] Lighthouse (Chrome DevTools) on `/` and `/register` — aim Accessibility ≥90, Performance ≥85

## SEO
- [ ] View-source `/` shows description + Open Graph tags
- [ ] `/robots.txt` and `/sitemap.xml` resolve in preview
- [ ] Update `VITE_SITE_URL` (and rebuild) so sitemap / OG / robots use the real host
- [ ] Confirm `og:image` resolves to `/og-image.png` (raster, not SVG)

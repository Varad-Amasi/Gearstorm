# GearStorm Website - Development Memory

## Purpose
This file tracks progress, decisions, and context across development sessions. Updated regularly to keep AI-assisted development in sync without losing context.

---

## Project Metadata
- **Project Name:** GearStorm Website
- **Event:** IEEE RAS Robotics Competition (Inter-college)
- **Organization:** IEEE Robotics & Automation Society (RAS), KLS GIT Belagavi
- **Created:** 2026-08-23
- **Status:** Phase 6 - Leaderboard, Backend & Integration (**Complete**)
- **App path:** `gearstorm-website/`
- **Docs path:** `docs/`
- **Expected Launch:** Week 12

---

## Phase Progress

### Phase 1: Project Setup & Foundation (Week 1-2)
**Status:** ✅ Complete

**Completed:**
- [x] Vite project initialized (`gearstorm-website/`)
- [x] TypeScript configured (strict mode + `noUncheckedIndexedAccess`)
- [x] Tailwind CSS setup + CSS variables / design tokens
- [x] Project structure created (per Architecture.md)
- [x] ESLint & Prettier configured
- [x] Husky + lint-staged pre-commit hooks (repo root `.husky/`)
- [x] GitHub Actions CI/CD (`.github/workflows/ci.yml`)
- [x] Firebase config module + `.env.example` (keys optional until Phase 6)
- [x] Reusable Button, Card, Input, Badge components
- [x] Global styles & animations CSS
- [x] README.md + CONTRIBUTING.md

**Verified:**
- [x] `npm run type-check` passes
- [x] `npm run lint` passes
- [x] `npm run format:check` passes
- [x] `npm run build` succeeds (~47KB JS gzip)

**Key Decisions Made:**
- App lives in `gearstorm-website/` subdirectory; docs stay at repo root ✅
- Using Vite 5 (not Create React App) ✅
- React 18 + TypeScript strict mode ✅
- Tailwind CSS for styling ✅
- Firebase initializes only when env vars are present (dev-friendly) ✅
- Dark mode by default ✅

**Issues Encountered:**
- `create-vite` interactive CLI failed in non-interactive shell → scaffolded Vite/React/TS manually

---

### Phase 2: Layout & Navigation (Week 2-3)
**Status:** ✅ Complete

**Completed:**
- [x] React Router v6 configured with lazy-loaded routes
- [x] `MainLayout` wrapper (sticky header, flex-grow main, footer pinned)
- [x] `Header` with logo, desktop nav, Register CTA, mobile hamburger
- [x] `Navigation` shared by desktop header and mobile menu (active highlighting)
- [x] `MobileMenu` — closes on route change, Escape key, and link click
- [x] `Footer` with explore links, contact details, IEEE RAS branding
- [x] Page shells: Home, Rules, BotSpecs, Leaderboard, Register, Gallery, Contact
- [x] 404 `NotFound` page on catch-all route
- [x] `ScrollToTop` resets scroll on route change
- [x] Skip-to-content link for keyboard users
- [x] Per-page document titles via `useDocumentTitle`

**Verified (browser):**
- [x] All 7 routes reachable, active link highlights correctly
- [x] Unknown route renders 404
- [x] Mobile hamburger opens/closes, nav stacks vertically at 390px
- [x] Footer sticks to bottom on short pages
- [x] `lint`, `type-check`, `format:check`, `build` all pass

**Key Decisions (Phase 2):**
- Routes/nav links centralised in `src/config/routes.ts` ✅
- Page titles handled by a small `useDocumentTitle` hook instead of adding
  `react-helmet` — keeps the bundle lean ✅
- Page transitions use the existing CSS `animate-fade-in`; Framer Motion is
  deferred to Phase 4 where the scroll animation actually needs it ✅
- `getButtonClasses` extracted to `buttonStyles.ts` so router links can share
  button styling without breaking react-refresh ✅

---

### Phase 3: Design System & Components (Week 3-4)
**Status:** ✅ Complete

**Completed:**
- [x] Form components: `Select`, `Checkbox`, `Textarea`; `Input` refactored onto
      the shared `FormField` wrapper + `fieldStyles` helpers
- [x] `Table` — generic, horizontal scroll on mobile, striped rows, optional
      column sorting and pagination, optional row click
- [x] `Modal` — portal, centered, focus trap, Escape / backdrop / X to close,
      body scroll lock
- [x] Toast system — `toastStore` (Zustand), `useToast` hook, `ToastViewport`
      mounted in `MainLayout`; auto-dismiss, stacking, 4 variants
- [x] `Alert` — inline contextual messages (info/success/warning/error)
- [x] `Skeleton` + `SkeletonGroup` loading placeholders
- [x] `Tag` — removable pill; `Card` gained `gradient` variant + `interactive`
- [x] Section components: `HeroSection`, `FeatureCard`, `StatsSection`,
      `CTASection`; Home page refactored to use them
- [x] `useFocusTrap` hook shared by `Modal` and `MobileMenu`
- [x] Named z-index scale in Tailwind (dropdown/header/modal/toast/skiplink)
- [x] Barrel exports for `components/common` and `components/sections`
- [x] Dev-only `/styleguide` route rendering the whole library

**Verified (browser + build):**
- [x] All components render with no console errors or React warnings
- [x] Modal closes via Escape, backdrop click, and X; focus is trapped
- [x] Toasts stack and auto-dismiss after ~4s
- [x] Table sorting reorders rows; pagination updates rows and "Page X of Y"
- [x] Home page responsive at 375px with no horizontal overflow
- [x] `lint`, `type-check`, `build` all pass — 182KB JS / **59.8KB gzip**
- [x] Styleguide chunk absent from production build (92 → 78 modules)

**Key Decisions (Phase 3):**
- Zustand pulled forward from Phase 6 for toast state — Rules.md forbids
  ad-hoc global state, and the store is ~1KB ✅
- Native `<select>` over a custom dropdown: free keyboard + screen-reader
  support, and mobile gets the OS picker ✅
- `/styleguide` gated with a `import.meta.env.DEV` ternary around the `lazy()`
  call so the bundler drops it from production entirely ✅
- Focus-trap logic extracted to `useFocusTrap` rather than duplicated between
  `Modal` and `MobileMenu`; the hook also restores focus on close, so `Header`
  no longer tracks the hamburger button ✅
- Featured card/stat text switched from `text-primary` (#6B3A8C) to
  `text-primary-500` (#D946EF) for readable contrast on the dark background ✅

**Issues Encountered:**
- A JSX comment placed inside a `.map()` callback broke the implicit return
  (two root expressions) → moved above the `map`
- `order-2` on a stat cell was dead CSS (parent was not a flex container) →
  cell is now `flex flex-col` so the value renders above its label

---

### Phase 4: Home Page & 3D Robot Animation (Week 4-6)
**Status:** ✅ Complete

**Completed:**
- [x] Three.js + React Three Fiber installed; robot is procedural (Option B —
      no external GLB, no model download needed)
- [x] Robot parts: `Chassis`, `Wheel` ×4, `SensorMast`, `Gripper`,
      `Electronics` (`src/components/robot/RobotParts/`)
- [x] `RobotModel` — scroll-staged assembly (chassis 0-20, wheels 20-40,
      sensors 40-60, gripper 60-80, electronics 80-95, boot-up 95-100) with
      damped progress, emissive light-up, wheel spin, hover bob, slow yaw
- [x] `Robot3D` canvas — lazy-loaded, DPR clamped [1, 1.75], WebGL detection
      with static `RobotFallback` SVG
- [x] `AssemblyProgress` caption + gradient progress bar under the canvas
- [x] Scrollytelling hero: 240vh track, hero pinned (`sticky`) while scroll
      drives assembly; parallax gradient orbs at two speeds
- [x] `useScrollTrigger` (framer-motion useScroll → 0-100) and
      `usePrefersReducedMotion` hooks; `isWebGLAvailable` util
- [x] `Reveal` whileInView wrapper; `MotionConfig reducedMotion="user"` in App
- [x] New Home sections: Rules at a Glance, `TimelineSection` (5 steps),
      `FAQSection` (native `<details>` accordion), plus existing stats/CTA

**Verified (browser + build):**
- [x] Robot assembles stage-by-stage on scroll; caption tracks stages and
      flips to "Systems online" at 100%
- [x] ~144 FPS measured during boot-up animation; no console/WebGL errors
- [x] Reduced motion: no pinned track, robot fully assembled statically,
      no assembling caption
- [x] Chassis visible at first paint (progress floored at 10)
- [x] FAQ accordion expands; all sections in order
- [x] `lint`, `type-check`, `build` pass

**Bundle after Phase 4:**
- Initial load: index 60KB + Home 49KB ≈ **109KB gzip** (under 200KB target)
- Lazy 3D, split into two chunks so Three.js caches independently of our code:
  `three` 190KB gzip + `Robot3D` 46KB gzip, both loaded after first paint

**Post-Phase-4 Bug Fixes (review pass):**
- [x] **WebGL ran off-screen** — `useInView` (IntersectionObserver, 200px
      margin) gates `Canvas frameloop`: `always` in view, `never` off-screen,
      `demand` for reduced motion. Verified via patched `drawElements`:
      **0 draw calls off-screen vs 453/1.2s in view**
- [x] **Mobile hero clipped** — pinning now requires `min-width: 1024px`
      (`useMediaQuery`). Below that the hero flows normally and the robot
      auto-assembles once (`RobotMode = 'scroll' | 'auto' | 'static'`,
      ~2.2s ramp) instead of needing a 240vh track that didn't fit in 667px
- [x] **Progress bar disagreed with robot at scroll 0** — the floor moved out
      of `RobotModel` into `useScrollTrigger` as the exported `ASSEMBLY_START`
      (10), so bar, caption, and robot all read one value. Bar now starts 10%
      filled matching the visible chassis
- [x] **`GroundShadow` texture never disposed** — `useEffect` cleanup calls
      `texture.dispose()`; verified 0 leaked canvases over 4 navigation cycles
- [x] "Scroll ↓" hint now hidden once the robot reads "Systems online"
- [x] `FeatureCard`'s `h-full` works — `Reveal` wrapper also gets `h-full`
      (grid children measured equal at 150px)
- [x] Canvas is `aria-hidden`, so an `sr-only` paragraph now describes the
      robot for screen readers
- Not changed: part meshes still register spin/light refs via callback Sets
  that ignore `null`. Parts never unmount independently of `RobotModel`, so
  no stale refs are reachable; rewriting it would add risk for no gain.

**Key Decisions (Phase 4):**
- Procedural robot from primitives instead of a GLB — no asset sourcing,
  trivially small, and every part is animatable for the assembly sequence ✅
- Dropped `@react-three/drei` (only used ContactShadows, worth ~1KB saved);
  replaced with a radial-gradient canvas-texture shadow plane ✅
- Robot progress floored at 10 (`ASSEMBLY_START`) so the hero never shows an
  empty canvas; the floor lives in `useScrollTrigger` so every consumer of the
  progress value agrees ✅
- Scrollytelling is desktop-only. Narrow viewports can't fit a pinned hero, so
  they get a self-playing assembly rather than a shrunken/clipped one ✅
- Part meshes register spin/light refs via callbacks; all per-frame animation
  mutates refs in `useFrame` — zero React re-renders during scroll ✅
- Timeline uses step labels, not dates — event dates are still an open
  question in the docs; footnote says dates will be announced ✅

### Phase 5: Content Pages (Week 6-8)
**Status:** ✅ Complete

**Completed:**
- [x] Bot Specs page — overview, physical/electrical/component tables, design
      tips, static 3D `BotPreview`, FAQ
- [x] Rules page — general rules, obstacles, scoring table, Round 1 vs 2, DQ,
      safety, submission process, FAQ, print stylesheet + Print button
- [x] Gallery — responsive grid, category/year filters, lazy images, Modal
      lightbox; local SVG placeholders in `public/gallery/`
- [x] Contact — Zod + RHF form, organiser card, social links, Google Maps embed
- [x] Register — Zod + RHF form with dynamic 3–5 members (exactly one Lead);
      wired to API in Phase 6

**Verified:**
- [x] `npm run type-check`, `lint`, and `build` pass

**Key Decisions (Phase 5):**
- Installed `react-hook-form`, `zod`, `@hookform/resolvers` as required by
  Rules.md for form pages ✅
- Specs/scoring marked provisional via shared `COMPETITION` constants so Home
  and content pages stay consistent until organisers lock numbers ✅
- Forms submit to the Express API (Phase 6) ✅
- Gallery uses branded SVG placeholders rather than external image CDNs ✅

### Phase 6: Leaderboard, Backend & Integration (Week 8-10)
**Status:** ✅ Complete

**Completed:**
- [x] Express API in `backend/` — health, leaderboard, teams, contact, gallery
- [x] JSON file store (`data/store.json`) with seed leaderboard/gallery (no
      Firebase project required for local demo)
- [x] Leaderboard page — round select, search, college filter, sortable table,
      row detail modal, 30s polling, “New” badges
- [x] Registration + Contact forms POST to API with toast feedback
- [x] Gallery fetches API images (falls back to local SVGs); organiser upload
      form with `x-admin-key` + multer (5 MB images)
- [x] Frontend: axios, TanStack Query, Vite `/api` proxy

**Verified:**
- [x] Backend `type-check` passes; API smoke tests OK (health, leaderboard,
      contact, teams, gallery)
- [x] Frontend `type-check`, `lint`, `build` pass

**Key Decisions (Phase 6):**
- Persistence is local JSON until Firebase credentials exist — same route
  shapes, swap the store module later ✅
- Ranking uses ascending adjusted time (`time + penaltySeconds * 1000`) ✅
- Real-time = 30s polling (plan risk mitigation vs. Firestore listeners) ✅
- Email confirmation is stubbed to console (`emailQueued: true`) ✅

---

## Architecture Decisions

### Technology Stack Locked
```
Frontend: React 18 + TypeScript 5 + Vite 5
Build: Vite
Styling: Tailwind CSS 3 + CSS variables
3D: Three.js + React Three Fiber (procedural; drei removed)
Forms: React Hook Form + Zod (Phase 5 ✅)
State: Zustand (toasts + leaderboard UI store)
HTTP: Axios + TanStack Query (Phase 6 ✅)
Backend: Node.js + Express (Phase 6 ✅, JSON store)
Database: JSON file now; Firebase Firestore when project is created
Deployment: Vercel (frontend) + Firebase/hosting TBD (backend)
```

### Color Palette Approved
- Primary Purple: #6B3A8C (IEEE official)
- Accent Magenta: #D91E63 (energy)
- Dark Background: #0F0F1E
- Text Light: #E0E0E0

### Responsive Breakpoints
- Mobile: 320px (default)
- Tablet: 768px (md)
- Desktop: 1024px (lg)
- Large: 1280px (xl)

---

## Component Architecture

### Created Components (Phase 1)
- `Button` — variants: primary, secondary, ghost; sizes sm/md/lg; loading
- `Card` — standard + featured (purple glow)
- `Input` — labeled, error + helper text, a11y wired
- `Badge` — primary, accent, success, warning, error, info

### Created Components (Phase 2)
- `Header`, `Navigation`, `MobileMenu`, `Logo`, `Footer`
- `MainLayout`, `PageContainer`, `ScrollToTop`
- Hook: `useDocumentTitle`

### Created Components (Phase 3)
- Forms: `FormField`, `Select`, `Checkbox`, `Textarea` (+ `fieldStyles`)
- Data: `Table` (sortable, paginated), `Skeleton`, `SkeletonGroup`
- Overlays: `Modal`, `ToastViewport`, `Alert`, `Tag`
- Sections: `HeroSection`, `FeatureCard`, `StatsSection`, `CTASection`
- Hooks: `useFocusTrap`, `useToast`; store: `toastStore`

### Created Components (Phase 4)
- Robot: `Robot3D`, `RobotModel`, `RobotFallback`, `AssemblyProgress`,
  parts (`Chassis`, `Wheel`, `SensorMast`, `Gripper`, `Electronics`)
- Sections: `Reveal`, `TimelineSection`, `FAQSection`
- Hooks: `useScrollTrigger`, `usePrefersReducedMotion`; util: `isWebGLAvailable`

### Planned
- Content pages (Phase 5)
- Forms & backend (Phase 6)

---

## Database Schema

### Firestore Collections (planned — Phase 6)
- `teams`, `leaderboard`, `gallery` (constants in `src/config/firebase.ts`)

---

## Important Environment Variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=GearStorm
VITE_APP_VERSION=1.0.0
```

**Never commit `.env` / `.env.local`.**

---

## Recent Changes Log

| Date | Phase | Change | Impact |
|------|-------|--------|--------|
| 2026-08-23 | 1 | Scaffold Vite/React/TS app + tooling | Foundation ready |
| 2026-08-23 | 1 | Base UI components + design tokens | Smoke screen demo |
| 2026-08-23 | 1 | CI workflow + husky + docs | Contributor-ready |
| 2026-08-23 | 1 | Moved project docs into `docs/` | Cleaner repo root |
| 2026-08-23 | 2 | Router, layout, header/footer, page shells | All 7 pages routable |
| 2026-08-23 | 2 | Post-review fixes (a11y, CI, error boundary) | Phase 1–2 hardened |
| 2026-08-23 | 3 | Form, Table, Modal, Toast, Skeleton, Alert, Tag | Component library complete |
| 2026-08-23 | 3 | Section components + Home refactor | Home uses shared sections |
| 2026-08-23 | 3 | Dev-only `/styleguide` route | Visual reference, excluded from prod |
| 2026-08-24 | 4 | 3D robot + scroll assembly hero | Signature "wow" feature live |
| 2026-08-24 | 4 | Rules glance, timeline, FAQ sections | Home page content complete |
| 2026-08-24 | 5 | Bot Specs, Rules, Gallery, Contact, Register | Content pages complete |
| 2026-08-24 | 5 | RHF + Zod forms (contact + registration) | Client validation ready for Phase 6 |
| 2026-08-24 | 6 | Express API + JSON store + seed data | Backend runnable without Firebase |
| 2026-08-24 | 6 | Leaderboard UI + form/API integration | End-to-end registration & contact |
| 2026-08-24 | 6 | Post-review hardening (PII, upload, admin key) | Safer local API + form UX |

---

## Next Session Checklist

1. ✅ Read docs (PRD, Architecture, Rules, Phases, Design)
2. ✅ Phase 1 complete
3. ✅ Phase 2 complete
4. ✅ Phase 1–2 review findings fixed
5. ✅ Phase 3 complete: component library + section components
6. ✅ Phase 4 complete: 3D robot scroll assembly + full Home page
7. ✅ Phase 5 complete: Bot Specs, Rules, Gallery, Contact, Register
8. ✅ Phase 6 complete: Leaderboard + Express API + form wiring
9. ⬜ Start Phase 7: testing, optimization, accessibility polish
10. ⬜ Optional: create Firebase project and swap JSON store for Firestore
11. ⬜ Update this Memory when Phase 7 completes

---

## Blockers & Issues

### Current Blockers
None

### Notes
- GitHub remote: `https://github.com/Varad-Amasi/Gearstorm.git` (master)
- Firebase project not created yet — API uses `backend/data/store.json`
- Gallery photos and exact scoring numbers remain provisional placeholders
- SMTP not configured — registration confirmation is logged as queued

---

## Development Workflow

```bash
cd gearstorm-website
cp .env.example .env.local   # optional for Phase 1
npm install
npm run dev

# Before push
npm run lint
npm run format
npm run type-check
npm run build
```

---

**Last Updated:** 2026-08-24  
**By:** Cursor Agent  
**Status:** Phase 6 Complete → Ready for Phase 7

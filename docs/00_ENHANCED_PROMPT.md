# GearStorm Website - Enhanced Project Prompt

## 🎯 Project Overview

You are building **GearStorm**, a modern, interactive 3D website for an inter-college robotics competition organized by **IEEE Robotics & Automation Society (RAS) at KLS GIT, Belagavi**.

### What is GearStorm?
GearStorm is a robotics competition where teams design and build custom robots to complete obstacle courses as quickly as possible. The competition has **2 rounds**:
- **Round 1 (Qualifiers):** Teams compete with basic obstacles
- **Round 2 (Finals):** Top teams face harder obstacles

**Scoring:** Time-based with penalties for skipped obstacles or touching the robot.

---

## 🎨 Design Vision

### Aesthetic & Tone
The website should feel **modern, energetic, and tech-forward**—like a cutting-edge event built for college engineering students. Think:
- **Stripe.com** (premium, polished)
- **Vercel.com** (minimal, tech-forward)
- **Linear.app** (smooth interactions, dark theme)

**NOT:** Boring, corporate, or outdated college websites.

### Color Scheme (IEEE RAS Official)
- **Primary Purple:** `#6B3A8C` - Powerful, official IEEE color
- **Accent Magenta:** `#D91E63` - Energetic, attention-grabbing
- **Dark Background:** `#0F0F1E` - Deep space-like, modern
- **Text Light:** `#E0E0E0` - Easy to read on dark

**Dark mode by default** - no light mode needed.

---

## 📱 Key Features

### 1. **Interactive 3D Robot Animation** (Home Page Hero)
The star feature. As users scroll down the home page:
- Robot **assembles itself** in stages
- **0-20%:** Chassis appears
- **20-40%:** Wheels rotate into place
- **40-60%:** Sensors mount
- **60-80%:** Gripper attachment
- **80-95%:** Electronics light up
- **95-100%:** Robot "boots up" and moves

**Requirements:**
- Smooth 60fps animation
- Three.js + React Three Fiber (not Babylon.js or others)
- Mobile-optimized (fallback static image if WebGL unavailable)
- Parallax effects on scroll
- Must feel premium & polished

---

### 2. **Seven Key Pages**

#### Home Page (`/`)
- Hero section with 3D robot + scroll-triggered animation
- Event highlights (statistics: teams, obstacles, rounds)
- Quick overview of what GearStorm is
- Call-to-action buttons: "Register Now", "Learn More"
- Parallax scroll effects
- Smooth fade-in animations

#### Bot Specifications (`/bot-specs`)
- Detailed bot requirements (dimensions, weight, components)
- Physical specs (max L × W × H, max weight, materials)
- Electrical specs (power options, microcontrollers)
- Allowed components & sensors
- Design tips & constraints
- Downloadable PDF (optional)
- Visual diagrams or 3D model viewer

#### Rules & Regulations (`/rules`)
- Competition rules clearly laid out
- Obstacle descriptions & diagrams
- **Scoring system explained:**
  - Time-based scoring formula
  - Penalty point system
  - Bonus points (if applicable)
- Round 1 vs Round 2 differences
- Disqualification criteria
- Safety rules
- FAQs

#### Leaderboard (`/leaderboard`)
- Live/updated scores for both rounds
- Sortable table: Rank, Team Name, Time, Obstacles Cleared, Penalties, Score
- Filter by round, college, or search by team name
- Individual team details (click to expand)
- Real-time badge showing "new" entries
- Pagination (50 per page)
- Responsive table (horizontal scroll on mobile)

#### Registration (`/register`)
- Team registration form:
  - Team name, college, member details
  - Dynamic member addition (add/remove team members)
  - Contact email/phone
- Form validation (client-side + server-side)
- Error messages & success confirmation
- Confirmation email sent to team lead
- Payment status tracking (if applicable)

#### Gallery (`/gallery`)
- Image grid from past events (3-4 columns desktop, 1-2 mobile)
- Lightbox on image click
- Lazy loading for performance
- Filter by year/category (optional)
- Smooth animations

#### Contact (`/contact`)
- Contact form (name, email, message)
- Organizer details (email, phone)
- Address: KLS GIT, Belagavi
- Google Maps embed
- Social media links
- Email confirmations

---

## 🛠️ Technical Stack (Locked)

### Frontend
- **React 18** + **TypeScript** (strict mode - NO ANY)
- **Vite 5** (NOT Create React App)
- **Tailwind CSS 3** (primary styling)
- **React Three Fiber + Three.js** (3D graphics)
- **Framer Motion** (scroll animations)
- **Zustand** (state management - simple, no Redux)
- **React Hook Form + Zod** (forms & validation)
- **React Router v6** (navigation)

### Backend
- **Node.js + Express** (simple API)
- **Firebase Firestore** (database - no-ops scaling)
- **Firebase Storage** (image uploads)
- **Firebase Auth** (authentication)

### Deployment
- **Vercel** (frontend - automatic deploys)
- **Firebase** (backend & database)
- **Cloudflare** (CDN - free tier)

### Development
- **ESLint + Prettier** (code quality)
- **Vitest** (unit testing)
- **GitHub Actions** (CI/CD)

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Score | >85 |
| Page Load Time | <3 seconds |
| First Contentful Paint | <1.5s |
| Largest Contentful Paint | <2.5s |
| 3D Model Load Time | <2s |
| Animation Frame Rate | 60fps constant |
| Bundle Size (gzipped) | <200KB |

---

## ♿ Accessibility Requirements

- **WCAG 2.1 AA** compliance (minimum)
- **Color contrast:** 4.5:1 for text
- **Semantic HTML:** Use `<button>`, `<nav>`, `<main>`, etc.
- **Keyboard navigation:** All interactive elements accessible via Tab/Enter
- **ARIA labels:** For screen readers
- **Focus indicators:** Visible on all interactive elements
- **Alt text:** All images must have descriptive alt text

**Test with:** Axe DevTools, WAVE, Lighthouse, keyboard-only navigation

---

## 📐 Responsive Design

### Mobile-First Approach
- **Default:** Mobile (320px+)
- **Tablet:** `md:` breakpoint (768px+)
- **Desktop:** `lg:` breakpoint (1024px+)
- **Large screens:** `xl:` breakpoint (1280px+)

**Touch targets:** Minimum 44×44px (mobile-friendly)

---

## 🎬 Interactive Elements to Include

1. **Scroll-Triggered Animations**
   - 3D robot assembly on home page
   - Text fade-in/slide-in on sections
   - Parallax background movement

2. **Hover Effects**
   - Button scale-up on hover
   - Card shadow enhancement
   - Color transitions (300ms)

3. **Form Interactions**
   - Real-time validation feedback
   - Focus states on inputs
   - Success/error toast notifications

4. **Navigation**
   - Smooth page transitions
   - Active link highlighting
   - Mobile hamburger menu with smooth animations

5. **Leaderboard**
   - Animated rank changes
   - Highlight new top entries
   - Smooth sorting transitions

---

## 🎨 Design System Highlights

### Typography
- **Headings:** Poppins (bold, 800/700/600 weight)
- **Body:** Inter (regular, 400/500/600 weight)
- **Responsive sizes:** 12px → 48px (scales on mobile)

### Spacing
- **Base unit:** 8px (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, etc.)
- Consistent padding/margin/gap throughout
- Generous whitespace (premium feel)

### Shadows
- Subtle shadows on cards
- Purple glow effect on featured elements
- Enhanced shadows on hover

### Components
- **Button variants:** primary (purple), secondary (magenta), ghost
- **Cards:** standard, featured (with glow), hover effects
- **Badges:** for team status, ranking
- **Tables:** striped rows, sortable columns, responsive scroll

---

## 📋 Content Requirements

### Home Page Copy
- What is GearStorm? (2-3 sentences)
- Event highlights (number of teams, obstacles, rounds)
- Quick rules overview
- Call-to-action copy (register, learn more)

### Bot Specs
- Exact dimensions limits (must know from organizers)
- Weight limits
- Allowed materials
- Prohibited components

### Rules
- Obstacle descriptions (need from organizers)
- Exact scoring formula
- Penalty details
- Safety requirements

### Contact
- Organizer names & emails
- Phone numbers
- KLS GIT address
- Social media handles (if any)

---

## ✅ Success Criteria (Launch)

### Must-Have
- ✅ All 7 pages built, styled, responsive
- ✅ 3D robot animation smooth & impressive
- ✅ Forms validate & submit
- ✅ Leaderboard displays scores correctly
- ✅ Mobile-first responsive design
- ✅ Dark mode consistent throughout
- ✅ Accessibility audit passed (WCAG 2.1 AA)
- ✅ Lighthouse score >85
- ✅ Zero console errors
- ✅ All links working

### Should-Have
- ⬜ Real-time leaderboard updates
- ⬜ Email confirmations on registration
- ⬜ Printable PDF for rules
- ⬜ Social media meta tags (OG images)

### Nice-to-Have
- ⬜ Mobile app (can build after web launch)
- ⬜ Live event streaming integration
- ⬜ Multi-language support
- ⬜ Advanced analytics dashboard

---

## 🔒 Important Rules & Constraints

### DO
✅ Use Vite, not Create React App  
✅ Use TypeScript strict mode (no `any`)  
✅ Use Tailwind CSS for styling  
✅ Use React hooks (functional components)  
✅ Use Zustand for state (simple & minimal)  
✅ Test locally before committing  
✅ Follow Git commit conventions  
✅ Document your code with JSDoc  
✅ Optimize images (WebP format, lazy loading)  
✅ Check bundle size regularly  

### DON'T
❌ Use jQuery, Bootstrap, or Material-UI  
❌ Use Redux (Zustand is simpler)  
❌ Use inline styles (use Tailwind)  
❌ Hardcode API keys or secrets  
❌ Commit `node_modules`, `.env` files  
❌ Create files >300 lines  
❌ Use `any` type in TypeScript  
❌ Ignore accessibility requirements  
❌ Skip performance optimization  
❌ Deploy without testing  

---

## 📂 Project Structure

```
gearstorm-website/
├── src/
│   ├── components/
│   │   ├── common/        (Header, Footer, Button, Card, etc.)
│   │   ├── sections/      (Hero, EventHighlights, CTA, etc.)
│   │   ├── robot/         (Robot3D, RobotAssembly, RobotParts)
│   │   ├── forms/         (RegistrationForm, ContactForm)
│   │   └── layout/        (MainLayout, Navigation)
│   ├── pages/             (Home, Rules, BotSpecs, Leaderboard, etc.)
│   ├── hooks/             (useScrollTrigger, useLeaderboard, etc.)
│   ├── services/          (API calls, Firebase integration)
│   ├── store/             (Zustand stores)
│   ├── types/             (TypeScript interfaces)
│   ├── styles/            (Global CSS, variables, animations)
│   ├── models/            (3D GLB files)
│   └── config/            (Firebase, API endpoints, SEO)
├── public/                (Static assets, favicon, sitemap)
├── tests/                 (Unit & component tests)
├── .github/workflows/     (CI/CD pipelines)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

---

## 🚀 Development Workflow

### Getting Started
```bash
npm create vite@latest gearstorm-website -- --template react-ts
cd gearstorm-website
npm install
npm run dev  # Start dev server
```

### Before Committing
```bash
npm run lint              # ESLint check
npm run format            # Prettier format
npm run build             # Production build test
npm run type-check        # TypeScript check
npm run test              # Unit tests (Phase 7+)
```

### Deployment
```bash
# Automatic via GitHub Actions
git push origin main      # Triggers CI/CD → deploys to Vercel
```

---

## 🎯 Phase Summary

| Phase | Duration | Focus | Deliverable |
|-------|----------|-------|-------------|
| 1 | Weeks 1-2 | Setup, components base | Project foundation ready |
| 2 | Weeks 2-3 | Layout, navigation | All pages routable |
| 3 | Weeks 3-4 | Design system | Reusable components |
| 4 | Weeks 4-6 | Home page, 3D animation | Interactive hero |
| 5 | Weeks 6-8 | Content pages | All pages styled |
| 6 | Weeks 8-10 | Backend, integration | Forms, leaderboard live |
| 7 | Weeks 10-12 | Testing, optimization | Launch-ready |
| 8 | Week 12 | Deployment | **Live website 🚀** |

**See `04_Phases.md` for detailed task breakdown**

---

## 📚 Documentation Files

1. **01_PRD.md** - Project requirements, scope, features
2. **02_Architecture.md** - Tech stack, folder structure, API design
3. **03_Rules.md** - Coding standards, libraries, error handling
4. **04_Phases.md** - Implementation roadmap with detailed tasks
5. **05_Design.md** - Colors, typography, components, animations
6. **06_Memory.md** - Progress tracking (update regularly)

**Read all files before starting development.**

---

## ❓ Questions for Organizers

Before final development starts, clarify:

1. **Bot Design:** Do you have CAD models for the robot? Or should we create a simplified generic bot?
2. **Exact Specs:** What are precise dimensions, weight limits, component requirements?
3. **Obstacle Details:** What obstacles exist in Round 1 vs Round 2?
4. **Scoring:** What's the exact scoring formula? Penalty structure?
5. **Teams:** How many teams expected? College distribution?
6. **Event Date:** When's the actual event? (Impacts timeline)
7. **Sponsors:** Any sponsor logos to display?
8. **Payment:** Is payment processing required for registration?
9. **Results:** Will scores be updated live during event?
10. **Analytics:** Do you want visitor tracking/analytics?

---

## 🎨 Modern Website Inspiration

**Examples of modern event websites to draw inspiration from:**
- Vercel.com (clean, dark, premium)
- Linear.app (smooth interactions, polished)
- Stripe.com (professional, trust-building)
- Figma.com (dark theme, creative)
- Codeforces.com (competitive, data-heavy leaderboards)

---

## 💡 Interactive Touches to Make Website Stand Out

1. **Hover Effects on Cards** - Lift up, shadow enhance, slight scale
2. **Loading Animations** - Smooth spinners, skeleton loaders
3. **Form Validation** - Real-time feedback, green checkmarks for valid fields
4. **Toast Notifications** - Slide in from corner, auto-dismiss
5. **Page Transitions** - Smooth fade between routes
6. **Scroll Reveal Animations** - Content slides in as you scroll
7. **Button Ripple Effects** - On click, ripple expands (optional premium touch)
8. **3D Robot Parallax** - Parts move independently on scroll
9. **Live Leaderboard Updates** - Scores update with subtle animations, new entries highlighted
10. **Ambient Animations** - Subtle background effects (optional, don't overdo)

---

## 🔍 Quality Checklist Before Launch

- [ ] All 7 pages complete & styled
- [ ] 3D robot animation working & smooth
- [ ] Registration form fully functional
- [ ] Leaderboard displaying & filterable
- [ ] Mobile responsive (tested on real devices)
- [ ] Accessibility audit passed (Axe DevTools)
- [ ] Performance: Lighthouse >85
- [ ] No console errors/warnings
- [ ] All links working (no 404s)
- [ ] Forms submit data successfully
- [ ] Email confirmations sent (if setup)
- [ ] Dark mode looks polished
- [ ] Animations smooth 60fps
- [ ] Load time <3 seconds
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] SEO meta tags in place
- [ ] Analytics configured
- [ ] Error monitoring active (Sentry)
- [ ] Backups automated
- [ ] Domain + DNS configured
- [ ] SSL certificate active

---

## 📞 Support & Questions

During development, if stuck:
1. Check the 5 documentation files (PRD, Architecture, Rules, Phases, Design)
2. Check the Memory file for context
3. Search GitHub issues for similar problems
4. Post in team chat/discussion
5. Consult Tailwind, React, Three.js official docs

---

## 🎓 Learning Resources

- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org/docs
- **Three.js:** https://threejs.org/docs
- **React Three Fiber:** https://docs.pmnd.rs/react-three-fiber
- **Tailwind:** https://tailwindcss.com/docs
- **Zustand:** https://github.com/pmndrs/zustand
- **Framer Motion:** https://www.framer.com/motion

---

## 🎉 Final Notes

This is not just another college event website. **GearStorm should feel premium, modern, and exciting**—like an event worth attending. The 3D robot animation on the home page should be the "wow" moment that makes visitors bookmark the site and tell friends.

Think big, build polished, launch confidently. 🚀

---

**Created:** 2026-08-23  
**Version:** 1.0 (Enhanced)  
**Status:** Ready for Development  
**Questions?** Review the 5 documentation files or ask organizers.

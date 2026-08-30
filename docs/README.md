# GearStorm Website - Project Documentation

## 📚 Document Overview

This folder contains complete project documentation for the **GearStorm Website** (IEEE RAS Robotics Competition).

### Quick Navigation

| File | Purpose | Read First? |
|------|---------|-----------|
| **00_ENHANCED_PROMPT.md** | Complete project vision & requirements | ✅ START HERE |
| **01_PRD.md** | Project requirements & scope | ✅ SECOND |
| **02_Architecture.md** | Technical stack, folder structure, API design | ✅ THIRD |
| **03_Rules.md** | Coding standards, libraries, error handling | ⚠️ Before coding |
| **04_Phases.md** | Implementation roadmap (8 phases, 12 weeks) | ⚠️ Planning |
| **05_Design.md** | Color palette, typography, components | ⚠️ During design |
| **06_Memory.md** | Progress tracking, decisions, context | 📝 Update regularly |
| **07_QA_Checklist.md** | Manual a11y / browser / Lighthouse checks | Phase 7+ |
| **08_Launch.md** | Vercel + API deploy, backups, monitoring | Phase 8 |
| **09_ANIME_TYPOGRAPHY_CURSOR.md** | Anime.js robot, typography, custom cursor | Visual polish |
| **10_QUICK_REFERENCE.md** | Short implementation guide for #09 | Quick start |

---

## 🚀 Getting Started

### Step 1: Read Documentation (30 mins)
Read in this order:
1. **00_ENHANCED_PROMPT.md** - Understand the big picture
2. **01_PRD.md** - Know what you're building
3. **02_Architecture.md** - Understand technical approach

### Step 2: Setup Project (15 mins)
```bash
cd gearstorm-website
cp .env.example .env.local   # optional until Firebase is configured
npm install
npm run dev
```

Phase 1 foundation lives in **`gearstorm-website/`**. See that folder’s README for scripts and structure.

### Step 3: Check Rules & Phases (15 mins)
- Review **03_Rules.md** - coding standards
- Skim **04_Phases.md** - understand timeline
- Bookmark **05_Design.md** - reference during coding

### Step 4: Start Phase 1 (See 04_Phases.md)
- Initialize TypeScript, Tailwind, Firebase
- Create base components
- Set up CI/CD

**Total onboarding time:** ~1 hour

---

## 📋 Document Descriptions

### 00_ENHANCED_PROMPT.md (THE MASTERPIECE)
**Your north star.** Complete project brief in one file.

Contains:
- Project overview (what is GearStorm?)
- Design vision (modern, energetic, premium)
- Color scheme & typography
- All 7 page descriptions with content needs
- Technical stack (locked)
- Performance targets
- Accessibility requirements
- Interactive features to include
- Success criteria
- Important rules & constraints
- Development workflow
- Quality checklist

**When to use:** Whenever you're unsure about requirements.

---

### 01_PRD.md (Project Requirements Document)
**Formal project definition.**

Contains:
- Project overview (event, timeline, scope)
- Target users & personas (participants, spectators, coordinators)
- Core features & requirements (7 pages, all sections)
- Interactive features (3D robot, scroll triggers, leaderboard)
- Visual design requirements (colors, typography, layout)
- Technical requirements (performance, accessibility, SEO)
- Success metrics (engagement, technical, business)
- Project timeline (10 weeks)
- Constraints & assumptions
- Out of scope items (Phase 2+)
- Risk mitigation strategies
- Stakeholder questions

**When to use:** Reference for feature completeness, stakeholder alignment.

---

### 02_Architecture.md (Technical Design)
**How the system is built.**

Contains:
- Technology stack (React 18, Vite, Three.js, Tailwind, Zustand, Firebase)
- Folder structure (detailed file organization)
- Data models & schemas (TypeScript interfaces)
- System architecture diagram
- Technical flows (page load, 3D animation, registration, leaderboard)
- API endpoints (all 13 endpoints documented)
- 3D rendering pipeline (Three.js setup, model parts, optimization)
- State management pattern (Zustand examples)
- Environment variables
- Browser support matrix
- Performance targets

**When to use:** During development for code organization, API design, database schema.

---

### 03_Rules.md (Development Standards)
**Code quality & consistency rules.**

Contains:
- TypeScript strictness (no `any`, explicit types)
- Component structure patterns (correct vs wrong examples)
- File naming conventions (PascalCase, camelCase, etc.)
- Folder organization (max 2-level depth)
- Required libraries table (pinned versions)
- Strictly forbidden libraries (jQuery, Bootstrap, etc.)
- Naming conventions (components, constants, types)
- Error handling standards (API, components, forms)
- Performance rules (memoization, code splitting, images)
- Accessibility standards (semantic HTML, ARIA, contrast)
- Testing requirements (unit, component, E2E)
- API integration patterns
- Styling rules (Tailwind only, CSS variables)
- Git & version control standards
- Environment variable security
- Documentation standards
- Performance monitoring checklist
- Deployment rules
- Prohibited patterns (with examples)

**When to use:** BEFORE writing any code. Reference during code review.

---

### 04_Phases.md (Implementation Roadmap)
**Week-by-week breakdown of all 8 phases.**

Contains:
- Overview (12 weeks total, parallelizable to 8-10)
- **Phase 1:** Project setup (Vite, TypeScript, Tailwind, Firebase, CI/CD)
- **Phase 2:** Layout & navigation (routing, header, footer, page shells)
- **Phase 3:** Design system (all components, UI library)
- **Phase 4:** Home page & 3D animation (robot assembly, scroll triggers)
- **Phase 5:** Content pages (rules, specs, gallery, contact, register form)
- **Phase 6:** Leaderboard, backend & integration (API, database, forms)
- **Phase 7:** Testing, optimization & polish (tests, Lighthouse, accessibility)
- **Phase 8:** Deployment & launch (production, monitoring, domain)

Each phase contains:
- Objectives & deliverables
- Detailed task breakdown (with code examples)
- Acceptance criteria (must-have checklist)
- Success metrics
- Risks & mitigation
- Dependencies
- Resources needed

**When to use:** Follow sequentially. Use as task list during development.

---

### 05_Design.md (Design System)
**Visual identity, components, tokens.**

Contains:
- Color palette (official IEEE colors + semantics)
- Tailwind color configuration
- Typography scale (Poppins, Inter, sizes, weights)
- Font imports & stack
- Spacing system (8px base unit)
- Border radius & shadows
- Component styles (Button, Card, Input, Badge)
- Animations & transitions (Framer Motion examples)
- Dark mode rationale
- Responsive design breakpoints
- Layout & container patterns
- Visual hierarchy
- Accessibility (contrast ratios verified)
- Design tokens in CSS & TypeScript
- Design inspiration links
- Figma setup recommendations
- Brand guidelines (Do's & Don'ts)

**When to use:** During component development. Reference for colors, typography, spacing.

---

### 06_Memory.md (Progress Tracking)
**Session memory for AI-assisted development.**

Contains:
- Project metadata
- Phase progress tracker
- Architecture decisions made
- Component architecture (created & planned)
- Database schema
- API endpoints (planned)
- Known limitations & constraints
- Environment variables list
- Testing strategy
- Page structure
- Design system implementation status
- Recent changes log
- Next session checklist
- Blockers & issues
- Team notes & workflow
- Resource links
- Success criteria checklist
- Timeline

**When to use:** Update after each phase. Read at start of new session.

---

## ✅ Checklist Before Starting

- [ ] Read 00_ENHANCED_PROMPT.md (complete overview)
- [ ] Read 01_PRD.md (understand scope)
- [ ] Read 02_Architecture.md (understand tech stack)
- [ ] Bookmark 03_Rules.md (reference during coding)
- [ ] Skim 04_Phases.md (understand timeline)
- [ ] Bookmark 05_Design.md (reference for colors/typography)
- [ ] Review 06_Memory.md (current project state)
- [ ] Node.js & npm installed (`npm --version`)
- [ ] GitHub account & Git configured
- [ ] Text editor ready (VS Code recommended)
- [ ] Firebase account created (free tier)
- [ ] Vercel account created (free tier)

---

## 🎯 How to Use These Documents

### For Feature Development
1. Check **01_PRD.md** for feature requirements
2. Check **04_Phases.md** for current phase tasks
3. Check **02_Architecture.md** for data models & API endpoints
4. Check **03_Rules.md** for coding standards
5. Check **05_Design.md** for component styling

### For Code Review
1. Check **03_Rules.md** against code
2. Check for TypeScript strict compliance
3. Check for Tailwind usage (not inline styles)
4. Check for accessibility (ARIA labels, contrast)
5. Check file naming & folder organization

### For Debugging
1. Check **06_Memory.md** for known issues
2. Check **02_Architecture.md** for data flow
3. Check **03_Rules.md** for error handling patterns
4. Check React/Three.js/Tailwind official docs

### At End of Each Phase
1. Update **06_Memory.md** with progress
2. Review checklist in **04_Phases.md**
3. Test against success criteria in current phase
4. Prepare for next phase

---

## 📊 Project Statistics

- **Total Pages:** 7 (Home, Rules, BotSpecs, Leaderboard, Register, Gallery, Contact)
- **3D Components:** 1 main (modular robot assembly)
- **Interactive Features:** 10+ (animations, hover effects, form validation, etc.)
- **Components to Build:** 20+ (buttons, cards, forms, tables, etc.)
- **API Endpoints:** 13 (leaderboard, teams, contact, etc.)
- **Database Collections:** 3 (teams, leaderboard, gallery)
- **Development Timeline:** 12 weeks (parallelizable to 8-10 weeks)
- **Target Lighthouse Score:** >85
- **Target Load Time:** <3 seconds
- **Accessibility Standard:** WCAG 2.1 AA
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## 🎨 Design at a Glance

**Color Palette:**
```
Primary Purple:    #6B3A8C  (IEEE official)
Accent Magenta:    #D91E63  (energy, attention)
Dark Background:   #0F0F1E  (deep, modern)
Text Light:        #E0E0E0  (readable)
Success Green:     #10B981  (status)
Error Red:         #EF4444  (warnings)
```

**Typography:**
- **Headings:** Poppins (800/700/600 weight)
- **Body:** Inter (400/500/600 weight)
- **Scale:** 12px → 48px (responsive)

**Theme:** Dark mode, premium feel, modern animations

---

## 🔧 Tech Stack Quick Reference

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3 |
| **3D Graphics** | Three.js + React Three Fiber |
| **Animations** | Framer Motion |
| **Forms** | React Hook Form + Zod |
| **State Management** | Zustand |
| **Routing** | React Router v6 |
| **HTTP Client** | Axios |
| **Backend** | Node.js + Express |
| **Database** | Firebase Firestore |
| **Storage** | Firebase Storage |
| **Auth** | Firebase Auth |
| **Deployment** | Vercel (frontend) + Firebase (backend) |
| **Code Quality** | ESLint + Prettier |
| **Testing** | Vitest + React Testing Library |
| **CI/CD** | GitHub Actions |

---

## 📱 Device Support

- **Desktop:** 1024px+ (Chrome, Firefox, Safari, Edge)
- **Tablet:** 768px+ (iPad, Android tablets)
- **Mobile:** 320px+ (iPhone, Android phones)
- **Large Screens:** 1280px+ (monitors, 4K displays)

**Mobile First:** Default is mobile, `md:` for tablet, `lg:` for desktop.

---

## 🚀 Deployment Strategy

1. **Development:** `npm run dev` (Vite dev server on localhost:5173)
2. **Staging:** Push to `staging` branch → auto-deploys to Vercel preview
3. **Production:** Push to `main` branch → auto-deploys to Vercel + Firebase

**CI/CD:** GitHub Actions runs ESLint, TypeScript check, build verification.

---

## 💬 Key Questions Answered

**Q: What if 3D animation is too complex?**  
A: Graceful fallback to static robot image. Animation enhancement, not requirement.

**Q: How much will hosting cost?**  
A: $0-10/month (Vercel free + Firebase free tier covers this event scale).

**Q: Can we use Bootstrap instead of Tailwind?**  
A: No. Tailwind only. It's in **Rules.md** - strictly forbidden to deviate.

**Q: Do we need a mobile app?**  
A: No. Website-first approach. Mobile app is Phase 2 (future consideration).

**Q: What if we need real-time leaderboard?**  
A: Use Firebase real-time listeners. Polling (30s interval) is fallback.

**Q: How long to develop?**  
A: 12 weeks sequentially, 8-10 weeks with parallelization (2-3 developers).

---

## 📞 Getting Help

1. **Documentation:** Read the relevant file above
2. **Coding Standards:** Check **03_Rules.md**
3. **Features:** Check **01_PRD.md** or **04_Phases.md**
4. **Design:** Check **05_Design.md**
5. **Progress:** Check **06_Memory.md**
6. **Official Docs:** React, Three.js, Tailwind, TypeScript
7. **Team:** Post in discussion / chat

---

## 📝 Document Maintenance

**Responsibility:** Whoever is coding the current phase should update **06_Memory.md** when:
- ✅ Phase complete
- ✅ Major decision made
- ✅ Issue encountered
- ✅ Design changed
- ✅ Dependencies added/removed

**Why?** So next developer doesn't lose context when switching sessions or switching AI tools.

---

## 🎉 Success Definition

Website launches when:
- ✅ All 7 pages complete & styled
- ✅ 3D robot animation smooth & impressive
- ✅ All forms functional & validated
- ✅ Mobile responsive (tested on real devices)
- ✅ Accessibility audit passed (WCAG 2.1 AA)
- ✅ Lighthouse score >85
- ✅ Performance: <3s load time, 60fps animations
- ✅ Zero console errors
- ✅ All links working
- ✅ Deployed to production
- ✅ Domain active with SSL
- ✅ Analytics configured
- ✅ Monitoring active

---

## 🎓 Learning Path

If you're new to the tech stack:

1. **React Fundamentals** (2 hours)
   - Components, hooks, state, effects
   - https://react.dev

2. **TypeScript Basics** (2 hours)
   - Types, interfaces, generics
   - https://www.typescriptlang.org/docs

3. **Tailwind CSS** (1 hour)
   - Utility classes, responsive design
   - https://tailwindcss.com/docs

4. **Three.js & React Three Fiber** (4 hours)
   - 3D graphics, camera, lighting
   - https://threejs.org/docs
   - https://docs.pmnd.rs/react-three-fiber

5. **Zustand** (30 minutes)
   - State management (simpler than Redux)
   - https://github.com/pmndrs/zustand

**Total:** ~10 hours of learning → ready to code

---

## 📦 Project Structure Created

```
📁 gearstorm-website/
├── 📄 00_ENHANCED_PROMPT.md      ← START HERE (complete overview)
├── 📄 01_PRD.md                  ← Project requirements
├── 📄 02_Architecture.md         ← Technical design
├── 📄 03_Rules.md                ← Coding standards
├── 📄 04_Phases.md               ← Implementation roadmap
├── 📄 05_Design.md               ← Design system
├── 📄 06_Memory.md               ← Progress tracking
├── 📄 README.md                  ← This file
│
└── (Use Phase 1 tasks to initialize project structure)
```

---

## ✨ Final Notes

This is a **complete, production-ready project setup**. Everything needed to build a professional robotics competition website is documented here.

The website will be **modern, premium, interactive, and impressive**—something college event websites usually aren't.

**You have everything. Time to build something awesome.** 🚀

---

**Created:** 2026-08-23  
**Version:** 1.0  
**Status:** Ready for Development  
**Next:** Read 00_ENHANCED_PROMPT.md →

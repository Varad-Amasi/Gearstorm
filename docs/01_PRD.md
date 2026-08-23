# GearStorm Website - Project Requirements Document (PRD)

## Executive Summary
GearStorm is a prestigious inter-college robotics competition hosted by IEEE RAS, KLS GIT. The website showcases the event's mechanics, builds excitement, and facilitates registration. It's designed to appeal to college students with a modern, engaging, interactive experience featuring dynamic 3D animations.

---

## 1. Project Overview

### 1.1 Event Overview
- **Event Name:** GearStorm
- **Organizer:** IEEE Robotics & Automation Society (RAS), KLS GIT, Belagavi
- **Event Type:** Inter-college Robotics Competition
- **Rounds:** 2 (Qualification Round + Finals)
- **Audience:** College students (participants & spectators), faculty, industry professionals

### 1.2 Project Scope
Build a modern, interactive 3D website that:
- Educates participants about GearStorm rules, bot specifications, and competition format
- Facilitates online registration
- Displays leaderboards and results
- Showcases past event galleries
- Features scroll-triggered 3D robot animations that assemble as users scroll
- Maintains IEEE RAS brand identity with purple (#6B3A8C) and magenta (#D91E63) color scheme

---

## 2. Target Users & Personas

### 2.1 Primary Users
1. **Participants** (Engineering Students)
   - Age: 18-24
   - Tech-savvy, competitive
   - Need: Clear bot specifications, rules, registration process, leaderboard tracking

2. **Spectators** (College Students)
   - Age: 18-24
   - Interested in robotics, event atmosphere
   - Need: Event overview, gallery, schedule, results

3. **Coordinators/Judges**
   - Need: Leaderboard, result submission, participant details
   - Technical proficiency: Medium to High

### 2.2 Secondary Users
- Faculty members (mentors)
- Industry sponsors
- Alumni

---

## 3. Core Features & Requirements

### 3.1 Mandatory Pages/Sections

#### Home Page
- Eye-catching hero section with GearStorm branding
- Scroll-triggered 3D robot assembly animation (modular build)
- Quick event overview (2-3 sentences)
- CTA buttons: "Register Now", "Learn More"
- Event highlights/statistics section
- Navigation to other key sections

#### Bot Specifications Page
- Detailed bot requirements (dimensions, weight, component specs)
- Visual diagrams/3D models of allowed components
- Constraints & limitations
- Design considerations
- FAQs about bot building

#### Rules & Regulations Page
- Competition rules clearly laid out
- Obstacle descriptions
- Scoring system
  - Time-based scoring
  - Penalty system (obstacle skipping, bot touching)
  - Bonus points (if applicable)
- Round 1 vs Round 2 differences
- Disqualification criteria

#### Leaderboard Page
- Live/updated leaderboard for both rounds
- Participant names, team names, times, penalties, scores
- Filter by round
- Search functionality
- Responsive table design

#### Registration Page
- Team registration form
  - Team name
  - Team size
  - Member details (names, emails, phone)
  - College/Institution
  - Payment status
- Confirmation email
- Registration deadline display

#### Gallery
- Past event photos (if available)
- Robot builds
- Competition moments
- Image carousel/lightbox
- Organized by event year

#### Contact Page
- Contact form
- Organizer details
- Social media links
- Email & phone
- Address (KLS GIT, Belagavi)
- Map embed

---

## 4. Interactive Features & Animations

### 4.1 3D Robot Animation (Priority: HIGH)
- **Trigger:** Page scroll
- **Behavior:** Robot assembles itself modularly as user scrolls
  - Chassis appears first
  - Wheels/locomotion system added
  - Sensors/electronics mounted
  - Gripper/tool attachment (if applicable)
  - Final animation: Robot "boots up" and moves slightly
- **Location:** Home page hero or dedicated section
- **Performance:** Smooth 60fps, optimized for mobile

### 4.2 Scroll-Triggered Parallax Effects
- Background elements move at different speeds
- Text animations (fade-in, slide-in)
- Staggered reveals of content sections

### 4.3 Interactive Elements
- Hover effects on buttons & cards
- Animated counters (participant count, live timer to deadline)
- Smooth section transitions
- Sticky navigation with active section highlighting

### 4.4 Leaderboard Live Updates
- Real-time score updates (optional, via WebSocket or polling)
- Animated score changes
- Highlight new entries/top performers

---

## 5. Visual Design Requirements

### 5.1 Color Palette
- **Primary Purple:** #6B3A8C (IEEE RAS official)
- **Accent Magenta:** #D91E63 (Energy & excitement)
- **Dark Background:** #0F0F1E (Modern, tech-forward)
- **Text Light:** #FFFFFF or #E0E0E0
- **Accent Colors:** Neon cyan (#00D9FF), electric green (#00FF88) for highlights

### 5.2 Typography
- **Headings:** Bold, modern sans-serif (Poppins, Inter, or Montserrat)
- **Body Text:** Clean, readable sans-serif (Open Sans, Roboto)
- **Font Sizes:** Responsive scaling for mobile/tablet/desktop

### 5.3 Visual Identity
- IEEE RAS logo prominently displayed
- GearStorm branding consistent throughout
- Robotics/tech theme (gear icons, circuit patterns, tech elements)
- Modern glassmorphism or neumorphism effects for cards
- Dark mode by default (align with tech aesthetic)

### 5.4 Layout
- Mobile-first responsive design
- Maximum content width: 1400px (desktop)
- Generous whitespace
- Grid-based layout system

---

## 6. Technical Requirements

### 6.1 Performance
- Page load time: <3s (desktop), <5s (mobile)
- Lighthouse score: >85
- Smooth animations at 60fps
- Optimized images (WebP, lazy loading)

### 6.2 Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Color contrast ratio ≥4.5:1

### 6.3 SEO
- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Structured data (schema.org)
- Sitemap

### 6.4 Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 7. Success Metrics

### 7.1 Engagement Metrics
- Page visit duration (goal: >3 minutes on home page)
- Scroll depth (goal: 80%+ reach bottom)
- Registration conversion rate (goal: 10%+ of visitors)
- Return visitor percentage

### 7.2 Technical Metrics
- Page load time
- Bounce rate (<40%)
- Mobile vs desktop traffic ratio
- Animation smoothness (FPS monitoring)

### 7.3 Business Metrics
- Number of registrations
- Number of participating teams
- Social media impressions/shares
- Sponsor visibility/clicks

---

## 8. Project Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Planning & Design | 1 week | All documentation, design mockups |
| Frontend Setup & 3D Integration | 2 weeks | Boilerplate, 3D models, animation system |
| Page Development | 3 weeks | All pages built & styled |
| Backend & Integration | 2 weeks | Forms, registration, leaderboard API |
| Testing & Optimization | 1 week | QA, performance, accessibility testing |
| Deployment & Launch | 1 week | Hosting setup, final tweaks, go-live |
| **Total** | **10 weeks** | **Live website** |

---

## 9. Constraints & Assumptions

### 9.1 Constraints
- Budget: College event (limited resources)
- Timeline: Should align with event date
- Hosting: GitHub Pages or affordable cloud hosting (Vercel, Netlify)
- No backend database required (initially)

### 9.2 Assumptions
- Users have modern browsers
- Mobile traffic will be significant (60%+)
- 3D animations are non-critical for functionality (graceful degradation)
- Event details are finalized before development

---

## 10. Out of Scope (Future Phases)

- Mobile app (website-first approach)
- Advanced analytics/heatmaps
- AI-driven recommendations
- Multi-language support
- Live streaming integration (Phase 2)
- Virtual competition platform
- Detailed past event archives (>5 years)

---

## 11. Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| 3D animation performance issues | High | Early testing on low-end devices, fallback static graphics |
| Registration form bugs | High | Thorough testing, validation, email confirmation |
| Scope creep | Medium | Strict phase gates, change control process |
| Leaderboard sync issues | Medium | Implement robust error handling, manual override option |
| Browser compatibility issues | Medium | Cross-browser testing, polyfills for older browsers |

---

## 12. Questions for Stakeholders

1. **Bot Design:** Do you have existing 3D CAD models of the bot, or should we create a simplified generic robotics bot?
2. **Leaderboard Data:** Will data be manually updated or integrated with a backend system?
3. **Registration Payment:** Is payment processing required, or just registration tracking?
4. **Event Date:** When is the actual event scheduled? (Impacts timeline)
5. **Team Size:** What's the expected number of participating teams?
6. **Sponsors:** Are there sponsor logos to display? Dedicated sponsor page?
7. **Post-Event:** Should the site remain active year-round or reset for next year?

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-23  
**Author:** Claude  
**Status:** Ready for Approval

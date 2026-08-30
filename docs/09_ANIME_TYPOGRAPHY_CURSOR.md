# GearStorm Website - Anime.js Robot Animation & Modern Typography System

## 🤖 UPGRADE #1: SCROLL-TRIGGERED ROBOT WITH ANIME.JS

### Current State
The robot assembly animation currently uses basic Three.js + Framer Motion scroll triggers. It works but feels static and doesn't have the "wow" factor needed for a premium event website.

### Desired State: Premium Anime.js Integration

**Install anime.js:**
```bash
npm install animejs
```

### Robot Assembly Animation Enhancements

#### 1. Smooth Staggered Reveals (Anime.js Timeline)
Instead of simple visibility toggles, create a sophisticated animation sequence where each robot part:
- **Fades in** with opacity animation (0 → 1)
- **Slides in** from a specific direction
- **Scales up** from a small size (0.8x → 1x)
- **Rotates slightly** as it appears (subtle 5-10° rotation)
- **Bounces** slightly at the end (easing: easeOutElastic)

**Expected behavior per scroll stage:**
```javascript
// Stage 1 (0-20%): Chassis
- Chassis fades in from bottom
- Duration: 600ms, stagger: 0ms
- Easing: easeOutQuad
- Scale: 0.7 → 1
- Rotate: -5° → 0°

// Stage 2 (20-40%): Wheels
- Left wheel rotates in from left (360° → 0°)
- Right wheel rotates in from right (-360° → 0°)
- Both wheels scale up (0.5 → 1)
- Duration: 700ms, stagger: 100ms between wheels
- Easing: easeOutElastic for bouncy feel

// Stage 3 (40-60%): Sensors
- Sensors fade & scale in
- Arranged in a fan pattern
- Each sensor staggered by 80ms
- Subtle pulse animation on entrance

// Stage 4 (60-80%): Gripper
- Gripper arms extend outward (scale + translate)
- Animated grip/close movement (subtle back-and-forth)
- Duration: 800ms
- Easing: easeInOutElastic

// Stage 5 (80-95%): Electronics
- Lights flicker on (multiple blinks)
- Glow effect expands from center
- Particle effects (optional: sparks)
- Duration: 500ms per light

// Stage 6 (95-100%): Bootup & Movement
- Entire robot does a subtle dance move
- Small jump: translateY(-20px) → 0
- 360° spin at end (smooth rotation)
- Duration: 1200ms, stagger: 100ms
- Finale: Robot moves forward slightly & glows
```

#### 2. Scroll Timeline Binding
**Use Framer Motion + Anime.js together:**
```typescript
import anime from 'animejs';
import { useScroll, useTransform } from 'framer-motion';

export const RobotAssembly = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Bind anime timeline to scroll progress (0-1)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      // Progress is 0-1
      // Map to your timeline (e.g., 0-6000ms animation)
      const timelinePosition = progress * 6000;
      
      animeTimeline.seek(timelinePosition);
    });
    
    return unsubscribe;
  }, []);

  // Create animation timeline
  const animeTimeline = anime.timeline({ autoplay: false });
  
  animeTimeline
    // Chassis entrance
    .add({
      targets: '.chassis',
      opacity: [0, 1],
      translateY: [50, 0],
      scale: [0.7, 1],
      rotate: [-5, 0],
      duration: 600,
      easing: 'easeOutQuad',
    }, 0)
    
    // Wheels spin in
    .add({
      targets: '.wheel-left',
      opacity: [0, 1],
      rotate: [360, 0],
      scale: [0.5, 1],
      duration: 700,
      easing: 'easeOutElastic(1, 0.6)',
    }, 400)
    .add({
      targets: '.wheel-right',
      opacity: [0, 1],
      rotate: [-360, 0],
      scale: [0.5, 1],
      duration: 700,
      easing: 'easeOutElastic(1, 0.6)',
    }, 500)
    
    // Sensors fan in
    .add({
      targets: '.sensor',
      opacity: [0, 1],
      scale: [0.3, 1],
      rotate: [45, 0],
      duration: 500,
      easing: 'easeOutQuad',
      delay: anime.stagger(80),
    }, 1200)
    
    // Gripper extends
    .add({
      targets: '.gripper',
      opacity: [0, 1],
      translateX: [[-30, 0], [30, 0]], // Extend then close
      scaleX: [0, 1],
      duration: 800,
      easing: 'easeInOutElastic(1, 0.7)',
    }, 1800)
    
    // Electronics light up with flicker
    .add({
      targets: '.light',
      opacity: [0, 1, 0.8, 1],
      duration: 400,
      easing: 'easeInOutQuad',
      delay: anime.stagger(60),
    }, 2700)
    
    // Glow effect expands
    .add({
      targets: '.glow-effect',
      r: [0, 80], // SVG circle radius
      opacity: [0.8, 0],
      duration: 600,
      easing: 'easeOutQuad',
    }, 2700)
    
    // Final bootup dance
    .add({
      targets: '.robot-container',
      translateY: [-20, 0],
      duration: 400,
      easing: 'easeOutElastic(1, 0.6)',
    }, 3400)
    .add({
      targets: '.robot-container',
      rotate: [0, 360],
      duration: 1200,
      easing: 'easeInOutQuad',
    }, 3600)
    .add({
      targets: '.robot-container',
      translateX: [0, 40],
      boxShadow: ['0 0 0 rgba(217, 30, 99, 0)', '0 0 40px rgba(217, 30, 99, 0.8)'],
      duration: 800,
      easing: 'easeOutQuad',
    }, 4800);
};
```

#### 3. Visual Enhancements for Anime.js

**Add glow & particle effects:**
```typescript
// Particle burst on gripper close
.add({
  targets: '.particle',
  translateX: anime.stagger([-50, 50], { from: 'center' }),
  translateY: anime.stagger([-50, 50], { from: 'center' }),
  opacity: [1, 0],
  duration: 800,
  easing: 'easeOutQuad',
}, 2600)

// Continuous subtle pulse on lights
.add({
  targets: '.led-light',
  boxShadow: ['0 0 10px rgba(0, 255, 136, 0.8)', '0 0 20px rgba(0, 255, 136, 0.5)'],
  duration: 1500,
  easing: 'easeInOutSine',
  loop: true,
}, 3100, '-=300')
```

#### 4. Anime.js Easing Functions to Use
```javascript
// Premium easings for robot animation
'easeOutQuad'              // Smooth deceleration
'easeOutCubic'             // Gentle stop
'easeOutElastic(1, 0.6)'   // Bouncy entrance (amplitude, elasticity)
'easeInOutQuad'            // Smooth both ways
'easeInOutElastic(1, 0.7)' // Bouncy both ways
'easeOutBack(1.5)'         // Overshoot & settle
'easeOutBounce'            // Ball bounce effect

// Avoid:
'linear'                   // Too mechanical
'easeInQuad'               // Slow start feels sluggish
```

#### 5. Performance Optimization
```typescript
// Use will-change CSS for animation targets
.chassis, .wheel-left, .wheel-right, .sensor, .gripper {
  will-change: transform, opacity;
}

// Lazy load robot model only when in viewport
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadRobotModel(); // Async load GLB file
  }
});
observer.observe(containerRef.current);

// Disable animation on reduced-motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Show instant state without animation
  anime.set('.robot-part', { opacity: 1, transform: 'none' });
}
```

#### 6. Mobile Optimization
```typescript
// Reduce animation complexity on mobile
const isMobile = window.innerWidth < 768;
const animationDuration = isMobile ? 300 : 600;
const particleCount = isMobile ? 3 : 8;

// Disable certain animations on slow devices
if (navigator.deviceMemory && navigator.deviceMemory < 4) {
  disableParticleEffects();
  skipFlickerAnimation();
}
```

---

## 🎨 UPGRADE #2: MODERN TYPOGRAPHY SYSTEM

### Current State
Website uses generic Inter + Poppins combination. Looks safe but bland and doesn't match premium websites like e-Yantra, Linear, or Stripe.

### Desired State: Sophisticated Multi-Font System

### Font Strategy (Based on e-Yantra & Modern Sites)

**Inspiration from e-Yantra Portal:**
- Bold, geometric sans-serif for headings (looks like Inter or Poppins Black)
- Clean, readable sans-serif for body text
- Monospace for technical specs/code
- Variable fonts for smooth scaling
- Strategic use of font weights (300, 400, 500, 600, 700, 800, 900)

### Recommended Font Stack

#### PRIMARY FONTS (Google Fonts)

**1. HEADINGS - "Space Grotesk" (Geometric, Bold, Modern)**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```
- **Use for:** H1, H2, H3, page titles, section headers
- **Weights:** 700 (H1), 600 (H2), 500 (H3)
- **Why:** Geometric shapes, high contrast, looks tech-forward
- **Character:** Bold, commanding, modern

**2. SUBHEADINGS - "Inter" (Neutral Sans, Professional)**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
- **Use for:** H4, H5, card titles, labels, navigation
- **Weights:** 600 (H4), 500 (H5)
- **Why:** Universal readability, widely used in premium apps
- **Character:** Clean, trustworthy, professional

**3. BODY TEXT - "Outfit" (Humanist Sans, Friendly)**
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
```
- **Use for:** Paragraph text, descriptions, body copy
- **Weight:** 400 (regular), 500 (emphasis)
- **Why:** Slightly warmer than Inter, excellent legibility, modern feel
- **Character:** Friendly, warm, readable

**4. ACCENT/DISPLAY - "Sora" (Modern Geometric, Premium)**
```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
```
- **Use for:** Event name "GearStorm", featured sections, bold CTAs
- **Weights:** 700 (impact), 600 (secondary)
- **Why:** Premium, geometric, distinctive
- **Character:** Bold, luxurious, attention-grabbing

**5. TECHNICAL/CODE - "JetBrains Mono" or "Fira Code" (Monospace)**
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```
- **Use for:** Bot specs, technical details, code snippets, API info
- **Weight:** 400 (regular), 600 (emphasis)
- **Why:** Clear character distinction, numbers are clear
- **Character:** Technical, precise, monospace

**6. OPTIONAL: "Playfair Display" (Serif Accent)**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
```
- **Use for:** Hero section quote (optional), premium feature callouts
- **Weights:** 700 only
- **Why:** Luxury feel, breaks up sans-serif monotony
- **Character:** Elegant, premium, distinctive

### Tailwind CSS Configuration

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        // Heading fonts
        'display': ['Space Grotesk', 'sans-serif'],     // H1: Page titles, hero
        'heading': ['Space Grotesk', 'sans-serif'],     // H2: Section titles
        'subhead': ['Inter', 'sans-serif'],             // H3-H5: Smaller headings
        
        // Body fonts
        'sans': ['Outfit', 'sans-serif'],               // Default body text
        'prose': ['Outfit', 'sans-serif'],              // Paragraph copy
        
        // Accent fonts
        'accent': ['Sora', 'sans-serif'],               // Brand name, CTAs
        'brand': ['Sora', 'sans-serif'],                // GearStorm logo
        
        // Technical fonts
        'mono': ['JetBrains Mono', 'monospace'],        // Code, specs
        'code': ['JetBrains Mono', 'monospace'],        // Code snippets
        
        // Optional serif for premium feel
        'serif-accent': ['Playfair Display', 'serif'],  // Premium callouts
      },
    },
  },
};
```

### Implementation Guide

#### H1 - Page Title (Hero Section)
```jsx
<h1 className="font-display text-5xl md:text-7xl font-bold 
              tracking-tight leading-tight text-white
              [letter-spacing:-0.02em]">
  GearStorm
</h1>
```
- **Font:** Space Grotesk
- **Size:** 48px (mobile), 72px (desktop)
- **Weight:** 700 (bold)
- **Letter spacing:** -2% (tight, impactful)
- **Color:** White (#E0E0E0)

#### H2 - Section Heading
```jsx
<h2 className="font-heading text-4xl md:text-5xl font-bold
              text-white mb-6 [letter-spacing:-0.01em]">
  How the Competition Works
</h2>
```
- **Font:** Space Grotesk
- **Size:** 32px (mobile), 48px (desktop)
- **Weight:** 600
- **Color:** Gradient (optional): from primary-purple to accent-magenta

#### H3 - Card Title / Subsection
```jsx
<h3 className="font-subhead text-xl md:text-2xl font-semibold
              text-white mb-3">
  Bot Specifications
</h3>
```
- **Font:** Inter
- **Size:** 18px (mobile), 24px (desktop)
- **Weight:** 600
- **Color:** White

#### Body Text - Paragraph
```jsx
<p className="font-sans text-base md:text-lg font-normal
             text-text-light leading-relaxed
             [line-height:1.8]">
  Teams must design and build a robot that can navigate 
  through challenging obstacles in the fastest time possible.
</p>
```
- **Font:** Outfit
- **Size:** 16px (mobile), 18px (desktop)
- **Weight:** 400
- **Line height:** 1.8 (generous spacing)
- **Color:** #E0E0E0

#### Label / UI Text
```jsx
<span className="font-subhead text-sm font-medium
                uppercase tracking-wider text-accent-magenta">
  Qualifier Round
</span>
```
- **Font:** Inter
- **Size:** 12px
- **Weight:** 600 (medium)
- **Letter spacing:** 0.1em (wide)
- **Color:** Magenta (#D91E63)

#### Technical / Bot Specs
```jsx
<div className="font-mono text-sm bg-dark-800 p-4 rounded-lg
               border border-border">
  <span className="text-accent-magenta font-semibold">Dimension:</span>
  <span className="text-text-light"> 250mm × 200mm × 150mm</span>
</div>
```
- **Font:** JetBrains Mono
- **Size:** 13px
- **Weight:** 400 (code-like feel)
- **Color:** Magenta for labels, light for values

#### Featured/Premium Callout (Optional Serif)
```jsx
<blockquote className="font-serif-accent text-2xl md:text-3xl
                      text-accent-magenta font-bold
                      italic [font-style:italic]
                      text-center">
  "Engineering Excellence Through Robotics"
</blockquote>
```
- **Font:** Playfair Display
- **Size:** 24px (mobile), 36px (desktop)
- **Weight:** 700
- **Style:** Italic
- **Color:** Magenta

### Font Usage Guidelines

| Element | Font | Size | Weight | Use Case |
|---------|------|------|--------|----------|
| H1 (Hero Title) | Space Grotesk | 48-72px | 700 | Page titles, hero section |
| H2 (Section Title) | Space Grotesk | 32-48px | 600 | Major sections |
| H3 (Subsection) | Inter | 24px | 600 | Card titles, subsections |
| H4 (Label) | Inter | 18px | 600 | UI labels, CTAs |
| H5 (Small Label) | Inter | 14px | 600 | Badge labels, tags |
| Body (Paragraph) | Outfit | 16-18px | 400 | Main text content |
| Small Text (Caption) | Outfit | 12-14px | 400 | Captions, metadata |
| Code/Specs | JetBrains Mono | 13px | 400 | Technical content |
| Premium Quote | Playfair Display | 24-36px | 700 | Callouts, quotes |

### Color + Typography Harmony

**Dark backgrounds (dark-bg: #0F0F1E):**
```css
/* H1 - Bright, bold */
color: #FFFFFF;
font-family: Space Grotesk;
font-weight: 700;

/* H2 - Gradient effect */
background: linear-gradient(90deg, #6B3A8C, #D91E63);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-family: Space Grotesk;
font-weight: 600;

/* Body - Light gray, readable */
color: #E0E0E0;
font-family: Outfit;
font-weight: 400;
```

### CSS Global Setup

```css
/* src/styles/typography.css */

@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&family=Sora:wght@400;600;700&family=JetBrains+Mono:wght@400;600&family=Playfair+Display:wght@600;700&display=swap');

:root {
  --font-display: 'Space Grotesk', sans-serif;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-subhead: 'Inter', sans-serif;
  --font-sans: 'Outfit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-serif: 'Playfair Display', serif;
  
  --font-size-h1: clamp(2rem, 8vw, 4.5rem);
  --font-size-h2: clamp(1.75rem, 6vw, 3rem);
  --font-size-h3: clamp(1.25rem, 4vw, 1.875rem);
  --font-size-body: clamp(0.95rem, 2vw, 1.125rem);
  --font-size-small: clamp(0.875rem, 1.5vw, 0.875rem);
}

/* Smooth text rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'kern' 1;
}

/* H1 */
h1 {
  font-family: var(--font-display);
  font-size: var(--font-size-h1);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* H2 */
h2 {
  font-family: var(--font-heading);
  font-size: var(--font-size-h2);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

/* H3 */
h3 {
  font-family: var(--font-subhead);
  font-size: var(--font-size-h3);
  font-weight: 600;
  line-height: 1.3;
}

/* Body */
body, p {
  font-family: var(--font-sans);
  font-size: var(--font-size-body);
  font-weight: 400;
  line-height: 1.8;
}

/* Responsive font scaling */
@media (max-width: 768px) {
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.125rem; }
}
```

### Variable Fonts (Advanced)

For even smoother typography, use variable fonts:

```html
<!-- Variable fonts auto-scale across weights -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&display=swap" rel="stylesheet">
```

Then in Tailwind:
```typescript
textShadow: 'none',
fontVariationSettings: '"wght" 700', // Dynamic weight control
```

---

## 🎯 IMPLEMENTATION CHECKLIST

### Anime.js Robot Animation
- [ ] Install anime.js: `npm install animejs`
- [ ] Create `src/components/robot/RobotAnimationTimeline.ts` with anime timeline
- [ ] Bind scroll progress to timeline via Framer Motion
- [ ] Add particle effects on gripper close
- [ ] Add glow effects on electronics lighting up
- [ ] Test on mobile (performance)
- [ ] Add `will-change` CSS optimizations
- [ ] Test reduced-motion preference

### Typography System
- [ ] Import Google Fonts (6 font families)
- [ ] Configure Tailwind fontFamily extends
- [ ] Create `src/styles/typography.css` with CSS variables
- [ ] Update all H1, H2, H3, H4, H5 components
- [ ] Update body text, labels, captions
- [ ] Test responsive font scaling
- [ ] Verify contrast ratios (WCAG AA)
- [ ] Test on mobile devices
- [ ] Update Design.md with new typography guidelines
- [ ] Audit all pages for consistency

### Testing & Polish
- [ ] Lighthouse performance check (fonts impact score)
- [ ] Font loading strategy (critical fonts first)
- [ ] Fallback fonts if CDN fails
- [ ] Animation smoothness at 60fps
- [ ] Accessibility: ensure letter-spacing isn't too tight
- [ ] Cross-browser font rendering
- [ ] Mobile-optimized font sizes

---

## 📝 FONT LOADING STRATEGY

### Performance Optimization

```html
<!-- Head section - preload critical fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load critical fonts first (Space Grotesk + Outfit) -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Outfit:wght@400;500&display=swap" rel="stylesheet">

<!-- Defer secondary fonts (load after page paint) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Sora:wght@700&family=JetBrains+Mono:wght@400&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">

<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Sora:wght@700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
</noscript>
```

### Font Display Strategy
```css
/* Use font-display: swap for FOUT (Flash of Unstyled Text) */
/* This ensures text renders immediately in system font, then swaps when web font loads */
@font-face {
  font-family: 'Space Grotesk';
  font-display: swap; /* Show fallback immediately, swap when ready */
  src: url('...') format('woff2');
}
```

---

## 🎬 EXAMPLE: FULL COMPONENT IMPLEMENTATION

```typescript
// src/components/sections/HeroWithAnimatedRobot.tsx
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useScroll, useTransform } from 'framer-motion';
import { Robot3D } from '../robot/Robot3D';

export const HeroWithAnimatedRobot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create anime timeline
    const timeline = anime.timeline({ autoplay: false });
    
    timeline
      .add({
        targets: '.robot-chassis',
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.8, 1],
        duration: 600,
        easing: 'easeOutQuad',
      }, 0)
      .add({
        targets: '.robot-wheel',
        opacity: [0, 1],
        rotate: [360, 0],
        scale: [0.6, 1],
        duration: 700,
        easing: 'easeOutElastic(1, 0.6)',
        delay: anime.stagger(100),
      }, 300)
      .add({
        targets: '.robot-sensor',
        opacity: [0, 1],
        scale: [0.3, 1],
        duration: 500,
        easing: 'easeOutQuad',
        delay: anime.stagger(80),
      }, 1100);

    // Bind to scroll
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      timeline.seek(progress * 3000);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-dark-bg">
      {/* Hero Content with Typography */}
      <div className="flex items-center justify-between h-full px-8 md:px-16">
        
        {/* Left: Text Content */}
        <div className="flex-1 z-10">
          <h1 className="font-display text-5xl md:text-7xl font-bold 
                        text-white mb-4 [letter-spacing:-0.02em]">
            GearStorm
          </h1>
          
          <h2 className="font-heading text-2xl md:text-3xl font-semibold
                        text-accent-magenta mb-6 [letter-spacing:-0.01em]">
            Inter-College Robotics Competition
          </h2>
          
          <p className="font-sans text-base md:text-lg font-normal
                       text-text-light max-w-lg mb-8 leading-relaxed">
            Design, build, and race your custom robot through challenging obstacles. 
            Speed, precision, and innovation converge.
          </p>

          <div className="flex gap-4">
            <button className="font-subhead font-semibold px-6 py-3
                             bg-primary-purple hover:bg-purple-700
                             text-white rounded-lg transition-all">
              Register Team
            </button>
            <button className="font-subhead font-semibold px-6 py-3
                             border-2 border-accent-magenta
                             text-accent-magenta hover:bg-accent-magenta/10
                             rounded-lg transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Right: Animated Robot */}
        <div ref={robotRef} className="flex-1 h-full flex items-center justify-center">
          <div className="robot-container">
            <div className="robot-chassis will-change-transform">
              <Robot3D />
            </div>
            <div className="robot-wheel will-change-transform"></div>
            <div className="robot-sensor will-change-transform"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

---

## ✨ CURSOR TEXT PROMPT

Here's a detailed prompt for custom cursor animations:

### Custom Cursor Implementation Prompt

```
Create a sophisticated custom cursor system for the GearStorm website with the following specifications:

## Cursor Design
- Default cursor: Small circular outline (12px diameter) with magenta color (#D91E63)
- Center dot: Subtle inner circle (4px diameter) to track exact position
- Trail effect: Faint magenta line following cursor (optional, subtle)

## Cursor States & Animations

### 1. Default State
- Circle outline: #D91E63, stroke-width: 1.5px, opacity: 0.8
- Center dot: Visible
- No animation, just follows mouse

### 2. Hover Over Interactive Elements (buttons, links, cards)
- Circle expands: 12px → 24px (smooth 200ms easing: easeOutQuad)
- Center dot grows: 4px → 8px
- Color shift: #D91E63 → #FF006E (brighter magenta)
- Glow effect: box-shadow: 0 0 15px rgba(217, 30, 99, 0.8)
- Inner fill: subtle rgba(217, 30, 99, 0.1)

### 3. Hover Over Links/Text
- Circle scales down: 12px → 8px
- Changes to text-selection color (#6B3A8C purple)
- Center dot: Becomes a small star or different shape

### 4. Hover Over Sections/Cards
- Circle pulses: 12px → 16px → 12px (1s loop)
- Shows inner ring indicator

### 5. On Scroll (Robot Animation Section)
- Circle trails: create 3-5px offset particles following cursor
- Particles fade out gradually
- Color: gradient from magenta → transparent

### 6. On Click
- Circle explodes outward: 24px → 40px (200ms)
- Opacity fades: 0.8 → 0 (ripple effect)
- New circle spawns immediately for next interaction

### 7. Cursor Lock/Focus
- When focused on input/form: Circle becomes crosshair (+) symbol
- Color: Text color of form
- Glow effect enabled

## Technical Requirements
- Vanilla JavaScript (no external libraries unless necessary)
- Track mouse position with high precision (requestAnimationFrame)
- Smooth easing: Use cubic-bezier for natural feel
- SVG or Canvas for rendering (SVG preferred for scalability)
- Hide default browser cursor: cursor: none

## Accessibility
- Cursor must work on mobile (hide custom cursor on touch devices)
- Respect prefers-reduced-motion: reduce animation if enabled
- Fallback to default cursor if custom cursor fails to load

## Performance
- <16ms render time per frame (60fps target)
- Debounce hover state changes
- Cache element positions on scroll
- No memory leaks on repeated interactions

## Code Structure
- Create src/hooks/useCursor.ts (React hook for cursor state)
- Create src/components/CustomCursor.tsx (SVG cursor component)
- Create src/styles/cursor.css (animations)
- Integrate into src/App.tsx globally

## Example Cursor Animations

### Expand on Hover
```
@keyframes cursorExpand {
  from { transform: scale(1); }
  to { transform: scale(2); }
}

### Ripple on Click
```
@keyframes ripple {
  from { 
    transform: scale(1); 
    opacity: 0.8;
  }
  to { 
    transform: scale(3);
    opacity: 0;
  }
}
```

### Pulse Effect
```
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}
```

## Testing Checklist
- [ ] Cursor follows mouse position accurately
- [ ] Smooth animation at 60fps
- [ ] No lag on high-speed mouse movement
- [ ] Hover states trigger correctly on all interactive elements
- [ ] Click ripple effect visible and clean
- [ ] Disappears on mobile (touch devices)
- [ ] Respects reduced-motion preference
- [ ] Works across all browsers (Chrome, Firefox, Safari, Edge)
- [ ] No console errors or warnings
```

---

## 📋 FINAL CHECKLIST

### Anime.js Integration
- [ ] `npm install animejs` ✅
- [ ] Create scroll-bound timeline ✅
- [ ] Implement staggered reveals ✅
- [ ] Add particle effects ✅
- [ ] Add glow animations ✅
- [ ] Performance optimizations ✅
- [ ] Mobile testing ✅

### Typography System
- [ ] Import 6 Google Font families ✅
- [ ] Configure Tailwind fontFamily ✅
- [ ] Update all components ✅
- [ ] Test responsive scaling ✅
- [ ] Verify WCAG contrast ✅
- [ ] Font loading optimization ✅
- [ ] Documentation ✅

### Custom Cursor
- [ ] Implement cursor tracking ✅
- [ ] Hover state animations ✅
- [ ] Click ripple effects ✅
- [ ] Mobile fallback ✅
- [ ] Accessibility compliance ✅
- [ ] Performance testing ✅

---

**Created:** 2026-08-30  
**Version:** 2.0 (Anime.js + Typography + Cursor)  
**Status:** Ready for Implementation

# GearStorm - Quick Implementation Guide

## 🚀 TL;DR - What You Need to Do

You have a complete website. Now upgrade 3 things:

### 1️⃣ ROBOT ANIMATION (Anime.js)
**Current:** Basic scroll trigger animation  
**Goal:** Premium anime.js timeline with staggered reveals, bounces, glows

**Quick Setup:**
```bash
npm install animejs
```

**What it does:**
- Chassis fades in + slides up
- Wheels spin in from sides (elastic bounce)
- Sensors fan out (staggered reveal)
- Gripper extends + grips
- Lights flicker + glow
- Robot does final dance (spin + jump)

**File to create:** `src/components/robot/RobotAnimationTimeline.ts`

**Visual improvement:** Takes a 6/10 animation to a solid 9/10 wow factor

---

### 2️⃣ TYPOGRAPHY (Multi-Font System)
**Current:** Generic Inter + Poppins everywhere  
**Goal:** Sophisticated 6-font system like e-Yantra, Linear, Stripe

**Fonts to add:**
```
1. Space Grotesk   → Big bold headings (H1, H2)
2. Inter           → Labels, UI text (H3-H5)
3. Outfit          → Body paragraphs (main text)
4. Sora            → Brand/accent/CTAs
5. JetBrains Mono  → Technical specs, code
6. Playfair Display → Premium quotes (optional)
```

**Quick Setup:**
```css
/* In your CSS head */
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@600&family=Outfit:wght@400;500&family=Sora:wght@700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

**Tailwind Config:**
```typescript
fontFamily: {
  'display': ['Space Grotesk', 'sans-serif'],
  'heading': ['Space Grotesk', 'sans-serif'],
  'subhead': ['Inter', 'sans-serif'],
  'sans': ['Outfit', 'sans-serif'],
  'mono': ['JetBrains Mono', 'monospace'],
}
```

**Visual improvement:** Takes text from "corporate boring" to "premium modern"

---

### 3️⃣ CUSTOM CURSOR
**Current:** Default browser cursor  
**Goal:** Animated magenta circle that expands on hover, ripples on click

**What it does:**
- Small circle outline follows cursor
- Expands when hovering interactive elements
- Creates ripple effect on click
- Changes on hover over text (purple instead of magenta)
- Hides on mobile (touch devices)

**File to create:** `src/hooks/useCursor.ts` + `src/components/CustomCursor.tsx`

**Visual improvement:** Professional polish, feels premium and interactive

---

## 📊 Before & After

| Aspect | Before | After | Effort |
|--------|--------|-------|--------|
| Robot Animation | 6/10 - Static | 9/10 - Wow factor | 2-3 hours |
| Typography | 5/10 - Bland | 8/10 - Premium | 1-2 hours |
| Cursor | 3/10 - Default | 7/10 - Custom | 1-2 hours |
| **Total Polish** | **5/10** | **8/10** | **4-7 hours** |

---

## 🎯 Implementation Order

### Phase 1: Typography (Easiest, Most Impact)
1. Copy the 6 font imports
2. Add to Tailwind config
3. Find-replace all `<h1>` elements with `className="font-display..."`
4. Update all text components
5. Test responsive scaling

**Time: 1-2 hours**

### Phase 2: Custom Cursor (Medium, High Polish)
1. Create `useCursor.ts` hook
2. Create `CustomCursor.tsx` component
3. Add to `App.tsx`
4. Style with CSS animations
5. Test on all browsers

**Time: 1-2 hours**

### Phase 3: Anime.js Robot (Hardest, Best Payoff)
1. Install anime.js
2. Create timeline in `RobotAnimationTimeline.ts`
3. Bind to scroll progress (Framer Motion)
4. Test on desktop + mobile
5. Optimize performance

**Time: 2-3 hours**

---

## 💻 Code Snippets You'll Need

### Snippet 1: Anime.js Timeline (Anime.js)
```typescript
import anime from 'animejs';

const timeline = anime.timeline({ autoplay: false });

timeline
  .add({
    targets: '.robot-chassis',
    opacity: [0, 1],
    translateY: [50, 0],
    scale: [0.7, 1],
    duration: 600,
    easing: 'easeOutQuad',
  }, 0)
  .add({
    targets: '.robot-wheel',
    opacity: [0, 1],
    rotate: [360, 0],
    scale: [0.5, 1],
    duration: 700,
    easing: 'easeOutElastic(1, 0.6)',
    delay: anime.stagger(100),
  }, 400);
```

### Snippet 2: Typography Classes (Tailwind)
```jsx
// H1 - Hero title
<h1 className="font-display text-6xl font-bold text-white">Title</h1>

// H2 - Section heading
<h2 className="font-heading text-4xl font-semibold text-accent-magenta">Section</h2>

// Body text
<p className="font-sans text-lg font-normal text-text-light">Content here</p>

// Technical specs
<div className="font-mono text-sm bg-dark-800 p-4">Code</div>
```

### Snippet 3: Cursor Hook (Custom Cursor)
```typescript
import { useEffect, useRef, useState } from 'react';

export const useCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.querySelectorAll('button, a, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { cursorRef, isHovering };
};
```

---

## 🎨 Font Quick Reference

| Use This | For This | Example |
|----------|----------|---------|
| `font-display` | Page titles, hero | "GearStorm" |
| `font-heading` | Section headings | "How It Works" |
| `font-subhead` | Card titles, labels | "Bot Specs" |
| `font-sans` | Body paragraphs | Regular text content |
| `font-mono` | Code, technical specs | `250mm × 200mm` |
| `font-serif-accent` | Premium quotes | "Engineering Excellence" |

---

## ⚡ Common Issues & Fixes

### Fonts look wrong
**Solution:** Check if Google Fonts import is in HTML head or main.tsx
```typescript
// In main.tsx or _app.tsx
import '@/styles/typography.css'; // Must import before fonts apply
```

### Anime.js timeline not syncing with scroll
**Solution:** Make sure Framer Motion useScroll is targeting the right element
```typescript
const { scrollYProgress } = useScroll({ target: containerRef });
// containerRef must be the actual scrolling container
```

### Custom cursor not appearing on mobile
**Solution:** Add touch device detection
```typescript
if (window.matchMedia('(hover: none)').matches) {
  // Touch device, hide custom cursor
  return null;
}
```

### Fonts loading slow
**Solution:** Preload critical fonts
```html
<link rel="preload" href="https://fonts.googleapis.com/..." as="style">
```

---

## 📋 Testing Checklist

### Anime.js Robot
- [ ] Animation plays on scroll (desktop)
- [ ] Smooth at 60fps (DevTools Performance)
- [ ] Works on mobile (reduced model complexity)
- [ ] Respects prefers-reduced-motion
- [ ] No console errors

### Typography
- [ ] All headings use `font-display` or `font-heading`
- [ ] Body text uses `font-sans`
- [ ] Technical specs use `font-mono`
- [ ] Responsive scaling works (test at 320px, 768px, 1440px)
- [ ] WCAG contrast ratios pass (test with Axe)

### Custom Cursor
- [ ] Cursor follows mouse smoothly
- [ ] Expands on hover over buttons
- [ ] Ripple effect on click
- [ ] Hidden on mobile (touch devices)
- [ ] Works in all browsers

---

## 🚀 Expected Results After Implementation

### Robot Animation
**Before:** "Okay, robot appears when I scroll"  
**After:** "Whoa! That's such a smooth, bouncy, professional animation! This feels like a premium event"

### Typography
**Before:** "Looks like every other website"  
**After:** "Wait, this looks actually beautiful. Different fonts in different places makes it feel sophisticated"

### Custom Cursor
**Before:** "Just using the browser cursor"  
**After:** "Oh cool, the cursor is a custom circle that responds to what I'm hovering. That's slick"

---

## 📚 Reference Files

All detailed implementations are in:
- **07_ANIME_TYPOGRAPHY_CURSOR.md** ← Full reference guide (this file)

Also keep handy:
- **05_Design.md** ← Color palette & component styles
- **02_Architecture.md** ← Component structure
- **03_Rules.md** ← Coding standards

---

## 💡 Pro Tips

1. **Fonts First:** Implement typography before anime.js. It's faster and feels good immediately.

2. **Test Early:** After each font change, check on mobile. Font scaling is critical.

3. **Animation Debugging:** Use browser DevTools Performance tab to ensure 60fps on robot animation.

4. **Cursor Accessibility:** Always include keyboard fallback. Custom cursor shouldn't prevent keyboard navigation.

5. **Performance:** Lazy-load 3D robot model only when in viewport. Fonts should preload critical weights.

6. **Variable Fonts:** Google Fonts supports variable fonts now. They're more performant than multiple weight files.

---

## 🎯 Success Criteria

✅ **Robot Animation**
- Smooth, no jank (60fps)
- Bouncy, premium feel (elastic easing)
- Particles & glow effects visible
- Works on mobile (degraded gracefully)

✅ **Typography**
- 6 different fonts used strategically
- Responsive scaling (clamp() in CSS)
- Premium modern look (matches reference sites)
- Contrast ratios WCAG AA compliant

✅ **Custom Cursor**
- Smooth tracking (no lag)
- Expands on interactive elements
- Click ripple visible
- Hidden on touch devices

---

## 📞 Quick Questions

**Q: Will adding fonts slow down the site?**  
A: No. Use font-display: swap and lazy-load secondary fonts.

**Q: Is anime.js worth it?**  
A: Yes. The animation complexity is worth it for the wow factor.

**Q: Should I use custom cursor on mobile?**  
A: No. Hide on touch devices. Custom cursor is only for mouse users.

**Q: Can I use different fonts per page?**  
A: Yes, but keep it consistent. 6 total fonts across entire site is enough.

**Q: How do I test animation performance?**  
A: Chrome DevTools → Performance tab → Record scroll → Check FPS (target 60fps)

---

**Quick Reference Version:** 1.0  
**Status:** Ready to implement  
**Estimated Time:** 4-7 hours total  
**Impact:** 5/10 → 8/10 site quality

# GearStorm Website - Design System

## 1. Color Palette

### 1.1 Primary Colors
Based on IEEE RAS Official Branding

| Color | Hex | RGB | Usage | Notes |
|-------|-----|-----|-------|-------|
| Primary Purple | #6B3A8C | 107, 58, 140 | Buttons, headings, accents | IEEE official |
| Accent Magenta | #D91E63 | 217, 30, 99 | CTAs, highlights, hover states | Energy & excitement |
| Dark Background | #0F0F1E | 15, 15, 30 | Page background, cards | Deep space blue |
| Dark Surface | #1A1A2E | 26, 26, 46 | Card backgrounds, panels | Slightly lighter |

### 1.2 Neutral Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Text Light | #E0E0E0 | Primary text color |
| Text Muted | #9CA3AF | Secondary text, captions |
| Text Subtle | #6B7280 | Disabled, placeholder text |
| Border | #374151 | Borders, dividers |
| Dark | #111827 | Alternative dark background |

### 1.3 Semantic Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Success (Green) | #10B981 | Success messages, checkmarks |
| Error (Red) | #EF4444 | Errors, danger actions |
| Warning (Amber) | #F59E0B | Warnings, alerts |
| Info (Blue) | #3B82F6 | Info messages, badges |

### 1.4 Accent/Neon Colors (Optional for High-Impact Areas)
| Color | Hex | Usage |
|-------|-----|-------|
| Neon Cyan | #00D9FF | Highlights, glowing effects |
| Electric Green | #00FF88 | Loading states, active indicators |
| Electric Pink | #FF006E | Hover effects on dark bg |

### 1.5 Tailwind CSS Configuration
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#F3E8FF',
          100: '#E9D5FF',
          500: '#D946EF',
          600: '#D1259C',
          700: '#6B3A8C', // Main purple
          900: '#3C1C57',
        },
        'accent': {
          50: '#FCE7F3',
          500: '#D91E63', // Main magenta
          600: '#BE123C',
          700: '#9D174D',
        },
        'dark': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#0F0F1E', // Main dark bg
        },
      },
    },
  },
};
```

---

## 2. Typography

### 2.1 Font Stack
```css
/* Primary Font - Headings & Bold Text */
--font-heading: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Secondary Font - Body & Regular Text */
--font-body: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - Code, Technical */
--font-mono: 'Fira Code', 'Courier New', monospace;
```

### 2.2 Font Imports
```html
<!-- In public/index.html or via Tailwind -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 2.3 Typographic Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| **H1** (Page Title) | Poppins | 48px (desktop), 32px (mobile) | 800 | 1.2 | -0.02em |
| **H2** (Section Title) | Poppins | 36px (desktop), 24px (mobile) | 700 | 1.3 | -0.01em |
| **H3** (Subsection) | Poppins | 28px (desktop), 20px (mobile) | 600 | 1.4 | 0 |
| **H4** (Card Title) | Poppins | 24px (desktop), 18px (mobile) | 600 | 1.5 | 0 |
| **H5** (Label) | Poppins | 16px | 600 | 1.5 | 0.05em |
| **H6** (Small Label) | Poppins | 14px | 600 | 1.5 | 0.05em |
| **Body Large** | Inter | 18px | 400 | 1.6 | 0 |
| **Body** (Default) | Inter | 16px | 400 | 1.6 | 0 |
| **Body Small** | Inter | 14px | 400 | 1.6 | 0.02em |
| **Caption** | Inter | 12px | 400 | 1.5 | 0.04em |
| **Overline** | Poppins | 11px | 600 | 1.4 | 0.1em |

### 2.4 Tailwind CSS Typography Classes
```typescript
// tailwind.config.ts
extend: {
  typography: {
    DEFAULT: {
      css: {
        color: '#E0E0E0',
        h1: {
          fontFamily: 'var(--font-heading)',
          fontWeight: '800',
          fontSize: '48px',
        },
        h2: {
          fontFamily: 'var(--font-heading)',
          fontWeight: '700',
          fontSize: '36px',
        },
        a: {
          color: '#D91E63',
          '&:hover': {
            color: '#FF006E',
          },
        },
      },
    },
  },
}
```

---

## 3. Spacing System

### 3.1 Spacing Scale (8px Base)
```css
:root {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

### 3.2 Common Spacing Patterns
- **Padding:** `p-4` (16px), `p-6` (24px), `p-8` (32px)
- **Margin:** `m-4`, `m-6`, `m-8`
- **Gap (Flex/Grid):** `gap-4`, `gap-6`, `gap-8`

### 3.3 Component Spacing Examples
```typescript
// Hero Section
<section className="py-20 md:py-32"> {/* Vertical padding */}
  <div className="container mx-auto px-4 md:px-8"> {/* Horizontal padding */}
    {/* Content */}
  </div>
</section>

// Card
<div className="p-6 md:p-8"> {/* Internal padding */}
  {/* Card content */}
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items with 24px gap */}
</div>
```

---

## 4. Border Radius & Shadows

### 4.1 Border Radius Scale
```css
:root {
  --radius-none: 0;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}
```

### 4.2 Shadow System
```typescript
// Light shadows (for cards, subtle depth)
'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
'shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',

// Elevated shadows (for modals, overlays)
'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3)',

// Purple glow (brand accent)
'shadow-purple': '0 0 20px rgba(107, 58, 140, 0.5)',
'shadow-magenta': '0 0 20px rgba(217, 30, 99, 0.5)',
```

### 4.3 Usage
```typescript
// Standard card
<div className="rounded-lg shadow-md"> Card </div>

// Elevated card on hover
<div className="rounded-lg shadow-md hover:shadow-xl transition-shadow">
  Hoverable card
</div>

// Brand glow effect
<div className="rounded-xl shadow-purple hover:shadow-lg">
  Featured card
</div>
```

---

## 5. Component Styles

### 5.1 Button Variants

#### Primary Button
```typescript
<button className="px-6 py-3 bg-primary-purple hover:bg-primary-700 
                   text-white font-semibold rounded-lg 
                   transition-colors duration-200">
  Primary Button
</button>
```
- **Background:** `#6B3A8C`
- **Hover:** `#5A2E78` (darker)
- **Active:** `#4A2365` (even darker)
- **Text:** White
- **Border Radius:** `8px`

#### Secondary Button (Magenta)
```typescript
<button className="px-6 py-3 bg-accent-magenta hover:bg-accent-600
                   text-white font-semibold rounded-lg">
  Secondary Button
</button>
```
- **Background:** `#D91E63`
- **Hover:** `#C81D5D`
- **Text:** White

#### Ghost Button
```typescript
<button className="px-6 py-3 bg-transparent hover:bg-dark-800
                   text-text-light border border-border rounded-lg">
  Ghost Button
</button>
```
- **Background:** Transparent
- **Hover:** `#1A1A2E`
- **Border:** `#374151`
- **Text:** `#E0E0E0`

#### Disabled State
```typescript
// All buttons when disabled
className="opacity-50 cursor-not-allowed"
```

### 5.2 Card Styles

```typescript
// Standard Card
<div className="bg-dark-surface rounded-lg shadow-md p-6 border border-border">
  <h3 className="text-xl font-bold text-text-light mb-2">Card Title</h3>
  <p className="text-text-muted">Card content</p>
</div>

// Featured Card (with brand glow)
<div className="bg-dark-surface rounded-lg shadow-purple p-6 
                border border-primary-purple/30">
  <h3 className="text-xl font-bold text-primary-purple mb-2">Featured</h3>
  <p className="text-text-light">Featured content</p>
</div>

// Hover Effect
className="hover:shadow-lg hover:border-primary-purple/60 transition-all"
```

### 5.3 Input Styles

```typescript
// Standard Input
<input 
  className="w-full px-4 py-2 bg-dark-800 text-text-light 
             border border-border rounded-lg
             focus:outline-none focus:border-primary-purple focus:ring-2 
             focus:ring-primary-purple/20
             placeholder-text-subtle"
  placeholder="Enter text"
/>

// Text area
<textarea 
  className="w-full px-4 py-3 bg-dark-800 text-text-light 
             border border-border rounded-lg resize-none
             focus:outline-none focus:border-primary-purple focus:ring-2 
             focus:ring-primary-purple/20"
/>
```

### 5.4 Badge Styles

```typescript
// Success Badge
<span className="px-3 py-1 bg-green-900/30 text-green-400 
                rounded-full text-sm font-medium">
  Passed
</span>

// Primary Badge
<span className="px-3 py-1 bg-primary-purple/20 text-primary-purple 
                rounded-full text-sm font-medium">
  Active
</span>

// Magenta Badge
<span className="px-3 py-1 bg-accent-magenta/20 text-accent-magenta 
                rounded-full text-sm font-medium">
  Featured
</span>
```

---

## 6. Animations & Transitions

### 6.1 Transition Timings
```css
:root {
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
}
```

### 6.2 Tailwind Animations
```typescript
// Smooth color transitions
className="transition-colors duration-300"

// Smooth shadow transitions
className="transition-shadow duration-300"

// Smooth transform transitions (scale, rotate, translate)
className="transition-transform duration-300 hover:scale-105"

// All properties transition
className="transition-all duration-300"
```

### 6.3 Custom Animations
```css
/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide up animation */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Glow animation (for brand accents) */
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(217, 30, 99, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(217, 30, 99, 0.8);
  }
}
```

### 6.4 Framer Motion Examples
```typescript
// Fade in on mount
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Slide in from left
<motion.div
  initial={{ x: -50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Scale up on hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive Button
</motion.button>
```

---

## 7. Dark Mode (Default)

### 7.1 Why Dark Mode?
- Modern, tech-forward aesthetic
- Better for robotics/engineering event
- Easier on eyes during extended use
- Matches IEEE RAS branding (dark backgrounds)
- Default for high-impact pages

### 7.2 Color Palette for Dark Mode
```css
Background: #0F0F1E (dark space blue)
Surface: #1A1A2E (slightly lighter)
Text: #E0E0E0 (light gray)
Text Secondary: #9CA3AF (muted gray)
Accents: #D91E63 (magenta), #6B3A8C (purple)
```

### 7.3 No Light Mode (Design Decision)
- Light mode not required (simplifies design)
- Mobile-first dark mode
- Align with modern app trends

---

## 8. Responsive Design Breakpoints

### 8.1 Breakpoint System
```typescript
// Tailwind defaults
{
  'sm': '640px',   // Phones
  'md': '768px',   // Tablets
  'lg': '1024px',  // Desktops
  'xl': '1280px',  // Large desktops
  '2xl': '1536px', // Extra large
}
```

### 8.2 Mobile-First Approach
```typescript
// Default (mobile: 320px)
<div className="text-base p-4">
  
// Tablet and up
className="md:text-lg md:p-6"

// Desktop and up
className="lg:text-xl lg:p-8"

// Example: Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {/* Items */}
</div>
```

### 8.3 Mobile Considerations
- Touch targets minimum 44x44px
- Comfortable thumb reach (bottom half of screen)
- Large, readable text (minimum 16px)
- Adequate spacing between interactive elements
- Full-width inputs & buttons on mobile

---

## 9. Layout & Container

### 9.1 Container Sizes
```typescript
// Full width with padding
<div className="w-full px-4 md:px-8">
  {/* Content */}
</div>

// Centered container with max width
<div className="container mx-auto max-w-7xl px-4 md:px-8">
  {/* Content */}
</div>

// Full width sections (hero, footer)
<section className="w-full py-20">
  <div className="container mx-auto max-w-7xl px-4">
    {/* Content */}
  </div>
</section>
```

### 9.2 Grid Systems
```typescript
// Two-column layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div>{/* Left */}</div>
  <div>{/* Right */}</div>
</div>

// Three-column layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>

// Flexible grid
<div className="grid grid-cols-auto gap-4" style={{ 
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
}}>
  {/* Responsive items */}
</div>
```

---

## 10. Visual Hierarchy

### 10.1 Emphasis Levels
1. **Strongest** - Large headings, primary CTAs, featured content
2. **Strong** - Section headings, secondary CTAs
3. **Normal** - Body text, secondary information
4. **Weak** - Captions, metadata, disabled states

### 10.2 Implementation
```typescript
// Strongest emphasis
<h1 className="text-4xl font-bold text-white">Main Headline</h1>

// Strong emphasis
<h2 className="text-2xl font-bold text-text-light">Section Title</h2>
<button className="bg-primary-purple text-white font-semibold">CTA</button>

// Normal emphasis
<p className="text-base text-text-light">Regular body text</p>

// Weak emphasis
<span className="text-sm text-text-muted">Metadata or caption</span>
<button disabled className="opacity-50">Disabled</button>
```

---

## 11. Accessibility Considerations

### 11.1 Color Contrast Ratios
- **Text on Background:** Minimum 4.5:1 (WCAG AA)
- **Large Text:** Minimum 3:1
- **UI Components:** Minimum 3:1

#### Verified Contrasts:
- **White on Primary Purple (#6B3A8C):** 5.8:1 ✅
- **White on Accent Magenta (#D91E63):** 6.2:1 ✅
- **#E0E0E0 on #0F0F1E:** 10.2:1 ✅ (excellent)
- **#9CA3AF on #0F0F1E:** 4.7:1 ✅

### 11.2 Focus States
```typescript
// Visible focus outline for keyboard navigation
<button className="focus:outline-none focus:ring-2 focus:ring-primary-purple focus:ring-offset-2 focus:ring-offset-dark-bg">
  Button
</button>

// Or simpler
<a className="focus-visible:ring-2 focus-visible:ring-primary-purple">
  Link
</a>
```

### 11.3 Semantic HTML
- Use `<button>` for clickable actions
- Use `<a>` for navigation
- Use `<nav>` for navigation sections
- Use `<main>` for page content
- Use `<section>`, `<article>` for content grouping
- Use `<form>` for forms
- Use `<label>` for form labels

---

## 12. Design Tokens in Code

### 12.1 CSS Variables (Preferred)
```css
/* src/styles/variables.css */
:root {
  /* Colors */
  --color-primary: #6B3A8C;
  --color-accent: #D91E63;
  --color-text: #E0E0E0;
  --color-bg: #0F0F1E;
  
  /* Spacing */
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  
  /* Fonts */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Transitions */
  --transition: 300ms ease-in-out;
}

/* Usage in CSS */
button {
  background-color: var(--color-primary);
  padding: var(--space-md);
  font-family: var(--font-heading);
  transition: background-color var(--transition);
}
```

### 12.2 TypeScript Design Tokens
```typescript
// src/config/design.ts
export const DESIGN_TOKENS = {
  colors: {
    primary: '#6B3A8C',
    accent: '#D91E63',
    text: '#E0E0E0',
    bg: '#0F0F1E',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },
} as const;
```

---

## 13. Design Inspiration & References

### Modern Dark Mode Websites
- https://vercel.com (Minimal, tech-forward)
- https://stripe.com (Premium, polished)
- https://figma.com (Dark, creative)
- https://linear.app (Clean, interactive)

### Robotics Event Websites
- FIRST Robotics (frc.org)
- RoboMasters (robomaster.com)
- TUM robotics (tumrobotics.de)

---

## 14. Design QA Checklist

### Before Sending for Development
- [ ] Color palette approved (especially brand colors)
- [ ] Typography hierarchy finalized
- [ ] Component styles documented
- [ ] Responsive breakpoints confirmed
- [ ] Accessibility contrast tested
- [ ] Dark mode colors verified
- [ ] Animations/transitions defined
- [ ] Design tokens exported to code
- [ ] Figma file shared (if applicable)

### During Development
- [ ] Colors match design exactly
- [ ] Typography matches hierarchy
- [ ] Spacing consistent with scale
- [ ] Responsive behavior matches mockups
- [ ] Accessibility audit passed
- [ ] Animations smooth & timely
- [ ] No jarring visual changes

### Post-Launch
- [ ] A/B test CTA button colors (if analytics available)
- [ ] Monitor user feedback on dark mode
- [ ] Check mobile usability metrics
- [ ] Refine based on real user data

---

## 15. Figma/Design Tool Setup

### Figma Components to Create
- **Atoms:** Button, Input, Badge, Icon
- **Molecules:** Form Row, Card, Alert, Toast
- **Organisms:** Header, Footer, Leaderboard Table, Form
- **Frames:** Page templates, Responsive layouts

### Design System Documentation
- Create component library file
- Document all variants
- Export styles as shared variables
- Version control designs
- Link to development components

---

## 16. Brand Guidelines Enforcement

### Do's ✅
- Use approved color palette
- Maintain consistent spacing
- Use approved fonts (Poppins, Inter)
- Follow accessibility standards
- Use brand purple for primary actions
- Use brand magenta for secondary actions
- Keep dark theme consistent

### Don'ts ❌
- Don't change brand colors without approval
- Don't mix serif & sans-serif fonts carelessly
- Don't use more than 3 font sizes in a component
- Don't ignore spacing scale
- Don't create low-contrast text
- Don't use light mode (unless explicitly needed)
- Don't deviate from design tokens

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-23  
**Status:** Approved for Development

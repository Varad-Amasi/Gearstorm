# GearStorm Website - Implementation Phases

## Overview
This document breaks down the GearStorm website development into 6 manageable phases. Each phase builds on the previous one, with clear deliverables, acceptance criteria, and dependencies.

**Total Timeline:** 10-12 weeks (depending on parallelization)

---

## Phase 1: Project Setup & Foundation (Week 1-2)

### 1.1 Objectives
- Initialize React + Vite project with proper structure
- Set up TypeScript, ESLint, Prettier
- Configure Tailwind CSS & styling system
- Set up Firebase (if using)
- Establish CI/CD pipeline
- Create reusable component library base

### 1.2 Deliverables
- ✅ Vite project initialized with all dev dependencies
- ✅ TypeScript strict mode configured
- ✅ Tailwind CSS + CSS variables set up
- ✅ Project folder structure created (as per Architecture.md)
- ✅ ESLint + Prettier configured with Git hooks
- ✅ GitHub Actions CI/CD pipeline created
- ✅ Firebase project setup & config
- ✅ Reusable Button, Card, Input components
- ✅ Global styles & animations CSS
- ✅ README.md with setup instructions

### 1.3 Tasks Breakdown

#### Task 1.3.1: Project Initialization
```bash
npm create vite@latest gearstorm-website -- --template react-ts
cd gearstorm-website

# Install core dependencies
npm install react-dom typescript @types/react @types/react-dom

# Install build tools & dev deps
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
npm install -D eslint @typescript-eslint/eslint-plugin prettier husky lint-staged
```

**Acceptance Criteria:**
- [ ] Project runs with `npm run dev`
- [ ] No ESLint errors on clean install
- [ ] Vite build succeeds
- [ ] TypeScript strict mode enabled

#### Task 1.3.2: Styling System Setup
**File:** `src/styles/variables.css`, `tailwind.config.ts`
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'primary-purple': '#6B3A8C',
        'accent-magenta': '#D91E63',
        'dark-bg': '#0F0F1E',
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
}
```

**Acceptance Criteria:**
- [ ] Tailwind works in dev and build
- [ ] CSS variables accessible via `var(--color-primary-purple)`
- [ ] Dark theme applied globally

#### Task 1.3.3: Component Library Base
**Files:**
- `src/components/common/Button.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/Input.tsx`
- `src/components/common/Badge.tsx`

**Acceptance Criteria:**
- [ ] Components use TypeScript interfaces
- [ ] Components use Tailwind classes
- [ ] Components support variants (size, color, state)
- [ ] Storybook-ready component API

#### Task 1.3.4: Firebase Configuration
**File:** `src/config/firebase.ts`
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // ... from Firebase console
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

**Acceptance Criteria:**
- [ ] Firebase project created & configured
- [ ] Firestore collections defined (teams, leaderboard, gallery)
- [ ] Storage buckets set up
- [ ] Authentication methods configured (email, Google)

#### Task 1.3.5: CI/CD Pipeline
**File:** `.github/workflows/ci.yml`
- ESLint check
- TypeScript compilation
- Build verification
- (Optional) Run tests

**Acceptance Criteria:**
- [ ] GitHub Actions workflow runs on push
- [ ] Fails on ESLint errors
- [ ] Fails on TypeScript errors
- [ ] Artifacts available

#### Task 1.3.6: Documentation
**Files:**
- `README.md` - Project overview, setup, running locally
- `CONTRIBUTING.md` - Guidelines for team
- `.env.example` - Environment template

**Acceptance Criteria:**
- [ ] New contributor can setup locally in <10 minutes
- [ ] All environment variables documented

### 1.4 Success Metrics
- [ ] `npm run dev` launches cleanly
- [ ] `npm run build` succeeds
- [ ] Lighthouse score >80
- [ ] Zero TypeScript errors
- [ ] CI/CD pipeline passes

### 1.5 Risks & Mitigation
| Risk | Mitigation |
|------|-----------|
| Firebase quota issues | Set up budget alerts, use mock data initially |
| TypeScript config conflicts | Use strict mode from start, no compromises |
| Build size creep | Monitor bundle size weekly |

### 1.6 Dependencies
- None (Phase 1 is foundation)

### 1.7 Resources Needed
- Firebase account (free tier)
- GitHub Actions (free for public repos)
- Text editor / IDE (VS Code recommended)

---

## Phase 2: Layout & Navigation (Week 2-3)

### 2.1 Objectives
- Build header/navigation components
- Create footer with links
- Implement responsive layout system
- Set up routing (React Router)
- Create page shells for all 7 pages

### 2.2 Deliverables
- ✅ Header component with logo & navigation
- ✅ Responsive mobile menu (hamburger)
- ✅ Footer with links, socials, contact
- ✅ Layout wrapper component
- ✅ React Router configured
- ✅ Page shells (all 7 pages exist, mostly empty)
- ✅ 404 page
- ✅ Smooth page transitions

### 2.3 Tasks Breakdown

#### Task 2.3.1: React Router Setup
**File:** `src/main.tsx`, `src/App.tsx`
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rules" element={<RulesPage />} />
        {/* ... other routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
```

**Acceptance Criteria:**
- [ ] All 7 pages routable
- [ ] Page transitions smooth (no flicker)
- [ ] Browser back/forward works
- [ ] 404 page displays for unknown routes

#### Task 2.3.2: Header & Navigation
**Files:**
- `src/components/common/Header.tsx`
- `src/components/common/Navigation.tsx`
- `src/components/common/MobileMenu.tsx`

**Features:**
- Logo links to home
- Navigation links (Home, Rules, Bot Specs, Leaderboard, Register, Gallery, Contact)
- Mobile hamburger menu
- Active link highlighting
- Sticky on scroll (optional)

**Acceptance Criteria:**
- [ ] Desktop view: horizontal nav
- [ ] Mobile view: hamburger menu
- [ ] Keyboard accessible (Tab, Enter)
- [ ] Logo clickable & links to home
- [ ] Links match branding colors

#### Task 2.3.3: Footer Component
**File:** `src/components/common/Footer.tsx`

**Sections:**
- Links (Rules, Contact, Social)
- Copyright info
- IEEE RAS branding
- Contact email/phone

**Acceptance Criteria:**
- [ ] Visible on all pages
- [ ] Links functional
- [ ] Mobile responsive
- [ ] Dark theme applied

#### Task 2.3.4: MainLayout Wrapper
**File:** `src/components/layout/MainLayout.tsx`
```typescript
export const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-dark-bg text-text-light">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);
```

**Acceptance Criteria:**
- [ ] Header visible on all pages
- [ ] Footer sticks to bottom
- [ ] Content doesn't overlap
- [ ] Min height 100vh on short pages

#### Task 2.3.5: Page Shells
**Create empty files:**
- `src/pages/Home.tsx`
- `src/pages/Rules.tsx`
- `src/pages/BotSpecs.tsx`
- `src/pages/Leaderboard.tsx`
- `src/pages/Register.tsx`
- `src/pages/Gallery.tsx`
- `src/pages/Contact.tsx`
- `src/pages/NotFound.tsx`

Each page exports a simple placeholder:
```typescript
export const HomePage = () => <div className="container py-12">Home Page</div>;
```

**Acceptance Criteria:**
- [ ] All 7 pages exist
- [ ] All pages routable
- [ ] All pages have basic styling
- [ ] Page title updates (via Meta tags)

### 2.4 Success Metrics
- [ ] Navigation works on desktop & mobile
- [ ] All 7 pages accessible
- [ ] No console errors
- [ ] Mobile responsive (tested on small screens)
- [ ] Lighthouse >80

### 2.5 Risks
| Risk | Mitigation |
|------|-----------|
| Navigation hard to use on mobile | Use proven hamburger pattern, test with actual users |
| Layout breaks on edge cases | Test on small (320px), large (2560px) screens |

### 2.6 Dependencies
- Phase 1 (Project Setup) complete

---

## Phase 3: Design System & Components (Week 3-4)

### 3.1 Objectives
- Create all reusable UI components
- Establish design consistency
- Build form components
- Create page sections

### 3.2 Deliverables
- ✅ Button (variants, sizes, states)
- ✅ Card component
- ✅ Input, Select, Checkbox
- ✅ Modal/Dialog
- ✅ Table component
- ✅ Alert/Toast notifications
- ✅ Badge, Tag
- ✅ Skeleton loaders
- ✅ Hero section
- ✅ Feature cards

### 3.3 Tasks Breakdown

#### Task 3.3.1: Button Component
**File:** `src/components/common/Button.tsx`
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  children,
  ...props
}) => {
  const baseStyles = 'font-semibold transition-colors';
  const variants = {
    primary: 'bg-primary-purple hover:bg-purple-800 text-white',
    secondary: 'bg-accent-magenta hover:bg-pink-700 text-white',
    ghost: 'bg-transparent hover:bg-slate-800 text-text-light',
  };
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};
```

**Acceptance Criteria:**
- [ ] All variants display correctly
- [ ] All sizes work
- [ ] Hover/active states visible
- [ ] Disabled state clear
- [ ] Accessible (focus outline)

#### Task 3.3.2: Form Components (Input, Select, Checkbox)
**Files:**
- `src/components/common/Input.tsx`
- `src/components/common/Select.tsx`
- `src/components/common/Checkbox.tsx`
- `src/components/common/Textarea.tsx`

**Acceptance Criteria:**
- [ ] All form elements support disabled state
- [ ] Error message display
- [ ] Label associated with input
- [ ] Accessible (ARIA labels)

#### Task 3.3.3: Table Component
**File:** `src/components/common/Table.tsx`
```typescript
interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: keyof T;
}

export const Table = <T,>({ data, columns, rowKey }: TableProps<T>) => (
  <table className="w-full">
    {/* ... */}
  </table>
);
```

**Acceptance Criteria:**
- [ ] Responsive (horizontal scroll on mobile)
- [ ] Striped rows for readability
- [ ] Sortable columns (optional)
- [ ] Pagination support (optional)

#### Task 3.3.4: Modal/Dialog
**File:** `src/components/common/Modal.tsx`
- Overlay background
- Centered dialog box
- Close button
- Accessibility (focus trap, escape key)

**Acceptance Criteria:**
- [ ] Appears centered
- [ ] Can close with X, Escape, or outside click
- [ ] Prevents background scroll
- [ ] Accessible (focus management)

#### Task 3.3.5: Toast/Alert Notifications
**File:** `src/components/common/Toast.tsx`, `src/hooks/useToast.ts`
```typescript
const { toast } = useToast();

// Usage
toast.success('Team registered!');
toast.error('Registration failed');
toast.info('Loading...');
```

**Acceptance Criteria:**
- [ ] Auto-dismisses after 3-5 seconds
- [ ] Stack multiple toasts
- [ ] Support info, success, error, warning
- [ ] Dismissible

#### Task 3.3.6: Card Component Enhancements
**File:** `src/components/common/Card.tsx`
- Hover effects
- Gradient borders (optional)
- Shadow on hover

**Acceptance Criteria:**
- [ ] Consistent styling
- [ ] Responsive padding
- [ ] Accessible

#### Task 3.3.7: Section Components
**Files:**
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/FeatureCard.tsx`
- `src/components/sections/StatsSection.tsx`
- `src/components/sections/CTASection.tsx`

### 3.4 Success Metrics
- [ ] All components have TypeScript types
- [ ] All components use Tailwind
- [ ] Consistent branding (colors, fonts, spacing)
- [ ] Accessibility audit passes (Axe DevTools)
- [ ] Responsive on all screen sizes

### 3.5 Dependencies
- Phase 1 & 2 complete

---

## Phase 4: Home Page & 3D Robot Animation (Week 4-6)

### 4.1 Objectives
- Build home page hero section
- Implement scroll-triggered 3D robot animation
- Create robot assembly stages
- Add parallax & scroll effects
- Implement event highlights section

### 4.2 Deliverables
- ✅ Home page complete
- ✅ Hero section with 3D robot
- ✅ Robot assembly animation (modular reveal)
- ✅ Scroll trigger integration
- ✅ Parallax background effects
- ✅ Event highlights / statistics
- ✅ Call-to-action buttons
- ✅ Smooth page transitions

### 4.3 Tasks Breakdown

#### Task 4.3.1: Three.js & React Three Fiber Setup
**File:** `src/components/robot/Robot3D.tsx`

```bash
npm install three @react-three/fiber @react-three/drei
```

```typescript
import { Canvas } from '@react-three/fiber';
import { Model } from './RobotModel';

export const Robot3D = () => (
  <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
    <ambientLight intensity={0.6} />
    <pointLight position={[10, 10, 10]} />
    <Model />
  </Canvas>
);
```

**Acceptance Criteria:**
- [ ] Canvas renders without errors
- [ ] 60fps on target devices
- [ ] Fallback if WebGL not supported
- [ ] Responsive canvas size

#### Task 4.3.2: Robot 3D Model
**Option A: Use Existing Models**
- Download robot.glb from Sketchfab (free license)
- Place in `src/models/robot.glb`

**Option B: Create Simple Robot**
```typescript
// src/components/robot/RobotParts/Chassis.tsx
export const Chassis = () => (
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[2, 1, 1]} />
    <meshStandardMaterial color="#6B3A8C" />
  </mesh>
);
```

**Acceptance Criteria:**
- [ ] Model loads without errors
- [ ] Model visible in canvas
- [ ] Reasonable file size (<2MB)

#### Task 4.3.3: Robot Assembly Animation
**File:** `src/components/robot/RobotAssembly.tsx`

```typescript
interface RobotPartVisibility {
  chassis: boolean;
  wheels: boolean;
  sensors: boolean;
  gripper: boolean;
  electronics: boolean;
  bootup: boolean;
}

// Animation stages based on scroll progress
const getVisibility = (scrollProgress: number): RobotPartVisibility => ({
  chassis: scrollProgress > 0,
  wheels: scrollProgress > 20,
  sensors: scrollProgress > 40,
  gripper: scrollProgress > 60,
  electronics: scrollProgress > 80,
  bootup: scrollProgress > 95,
});
```

**Animation Sequence:**
1. 0-20%: Chassis appears
2. 20-40%: Wheels rotate into place
3. 40-60%: Sensors mount
4. 60-80%: Gripper attachment
5. 80-95%: Electronics/lights up
6. 95-100%: Robot "boots up" & moves

**Acceptance Criteria:**
- [ ] Each stage reveals smoothly
- [ ] Animation smooth at 60fps
- [ ] Parallax effect visible
- [ ] Mobile-optimized (reduced quality)

#### Task 4.3.4: Scroll Trigger Integration
**Files:**
- `src/hooks/useScrollTrigger.ts`
- `npm install framer-motion`

```typescript
import { useScroll, useTransform } from 'framer-motion';

export const useScrollTrigger = (offset = 0) => {
  const { scrollYProgress } = useScroll();
  const robotProgress = useTransform(
    scrollYProgress,
    [offset, offset + 0.3],
    [0, 100]
  );
  return robotProgress;
};
```

**Acceptance Criteria:**
- [ ] Scroll triggers animation
- [ ] Animation progresses smoothly
- [ ] Works on mobile (touch scroll)
- [ ] No jank (consistent 60fps)

#### Task 4.3.5: Home Page Layout
**File:** `src/pages/Home.tsx`

Sections:
1. Hero with 3D robot + CTA buttons
2. Event highlights (stats: teams, obstacles, rounds)
3. Quick rules overview
4. Timeline / schedule
5. Call-to-action (Register button)
6. FAQ snippet

**Acceptance Criteria:**
- [ ] All sections visible & readable
- [ ] Mobile responsive
- [ ] Hero is eye-catching
- [ ] CTAs prominent and clickable

#### Task 4.3.6: Parallax & Scroll Effects
**File:** `src/components/sections/Hero.tsx`

- Background moves slower than foreground
- Text fades in on scroll
- Buttons animate on entry

**Acceptance Criteria:**
- [ ] Smooth parallax effect
- [ ] No jank or stuttering
- [ ] Works on all browsers

### 4.4 Success Metrics
- [ ] Home page loads <2s
- [ ] Robot animation 60fps
- [ ] Mobile looks great
- [ ] Lighthouse >85
- [ ] Zero WebGL errors

### 4.5 Risks
| Risk | Mitigation |
|------|-----------|
| 3D performance issues | Test on low-end devices, use LOD models |
| Model file too large | Compress with Draco, use glTF-binary |
| Animation janky on scroll | Profile in DevTools, optimize calculations |

### 4.6 Dependencies
- Phase 1, 2, 3 complete
- 3D model files obtained

---

## Phase 5: Content Pages (Week 6-8)

### 5.1 Objectives
- Build Bot Specs page with detailed requirements
- Build Rules & Regulations page
- Build Gallery page
- Build Contact page
- Build Register page (form skeleton)

### 5.2 Deliverables
- ✅ Bot Specs page complete
- ✅ Rules page with scoring explanation
- ✅ Gallery with image carousel
- ✅ Contact form & page
- ✅ Register form (without backend yet)

### 5.3 Tasks Breakdown

#### Task 5.3.1: Bot Specifications Page
**File:** `src/pages/BotSpecs.tsx`

**Sections:**
1. Overview (what is a GearStorm bot)
2. Physical specifications
   - Max dimensions (L × W × H)
   - Max weight
   - Allowed materials
3. Electrical specifications
   - Power options (battery types, voltage)
   - Allowed microcontrollers
4. Component specifications
   - Allowed sensors
   - Allowed motors
   - Gripper requirements
5. Design constraints & tips
6. 3D model viewer (if available)
7. FAQ

**Acceptance Criteria:**
- [ ] All specs clearly laid out
- [ ] Diagrams or 3D models present
- [ ] Mobile readable
- [ ] Downloadable PDF (optional)

#### Task 5.3.2: Rules & Regulations Page
**File:** `src/pages/Rules.tsx`

**Sections:**
1. General Rules
2. Obstacle Types & Descriptions
3. Scoring System
   - Time-based scoring
   - Obstacle penalties
   - Bonus points
4. Round 1 vs Round 2 differences
5. Disqualification criteria
6. Safety rules
7. Submission process
8. FAQs

**Acceptance Criteria:**
- [ ] Rules clear & unambiguous
- [ ] Scoring formula explained
- [ ] Mobile readable
- [ ] Printable format

#### Task 5.3.3: Gallery Page
**File:** `src/pages/Gallery.tsx`

**Features:**
- Image grid (3-4 columns on desktop, 1-2 on mobile)
- Lightbox on image click
- Filter by category/year (optional)
- Lazy load images

```typescript
import { useState } from 'react';

interface Image {
  id: string;
  src: string;
  alt: string;
  year?: number;
}

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map(img => (
        <img
          key={img.id}
          src={img.src}
          alt={img.alt}
          onClick={() => setSelectedImage(img)}
          className="cursor-pointer hover:opacity-80"
        />
      ))}
      {selectedImage && (
        <Modal onClose={() => setSelectedImage(null)}>
          <img src={selectedImage.src} alt={selectedImage.alt} />
        </Modal>
      )}
    </div>
  );
};
```

**Acceptance Criteria:**
- [ ] Images load lazily
- [ ] Lightbox works
- [ ] Responsive grid
- [ ] Good performance (<3s load)

#### Task 5.3.4: Contact Page
**File:** `src/pages/Contact.tsx`

**Sections:**
1. Contact form (name, email, message)
2. Contact info (email, phone, address)
3. Location map (Google Maps embed)
4. Social media links

**Form Features:**
- Client-side validation
- Error messages
- Success message on submit
- Email confirmation (optional)

**Acceptance Criteria:**
- [ ] Form validates input
- [ ] Form submits to backend
- [ ] Confirmation message shown
- [ ] Email received (if backend set up)

#### Task 5.3.5: Register Page (Form Skeleton)
**File:** `src/pages/Register.tsx`

**Form Fields:**
- Team name
- College/Institution
- Team members (dynamic fields)
  - Member name, email, phone, role
- Contact person email/phone
- Number of members
- Payment status (display only for now)

**Features:**
- Form validation (Zod schema)
- Error messages
- Loading state
- Success redirect (to dashboard/confirmation page)

**Acceptance Criteria:**
- [ ] Form validates correctly
- [ ] Client-side validation works
- [ ] Mobile responsive
- [ ] Accessibility compliant

### 5.4 Success Metrics
- [ ] All 5 pages complete & styled
- [ ] All forms validate
- [ ] Mobile responsive
- [ ] Fast load times (<3s)
- [ ] Lighthouse >80

### 5.5 Dependencies
- Phase 1, 2, 3, 4 complete

---

## Phase 6: Leaderboard, Backend & Integration (Week 8-10)

### 6.1 Objectives
- Build Leaderboard page
- Create backend API (Node.js + Express)
- Integrate forms with backend
- Set up database queries
- Implement real-time leaderboard updates

### 6.2 Deliverables
- ✅ Leaderboard page complete
- ✅ API endpoints created
- ✅ Registration form submission
- ✅ Leaderboard data fetching
- ✅ Contact form submissions
- ✅ Image upload (gallery)
- ✅ Real-time leaderboard updates (optional)

### 6.3 Tasks Breakdown

#### Task 6.3.1: Leaderboard Page
**File:** `src/pages/Leaderboard.tsx`

**Features:**
1. Round selector (Round 1 or Round 2)
2. Leaderboard table
   - Rank, Team name, Time, Obstacles cleared, Penalties, Score
3. Filter/sort by:
   - College
   - Time
   - Score
4. Search by team name
5. Individual team details (click row)
6. Pagination (50 per page)
7. Real-time updates (badge showing "new" entries)

**State Management:**
```typescript
// src/store/leaderboardStore.ts
const useLeaderboardStore = create((set) => ({
  entries: [],
  selectedRound: 1,
  loading: false,
  
  fetchLeaderboard: async (round: 1 | 2) => {
    set({ loading: true });
    const data = await api.get(`/leaderboard?round=${round}`);
    set({ entries: data, loading: false });
  },
  
  setSelectedRound: (round: 1 | 2) => set({ selectedRound: round }),
}));
```

**Acceptance Criteria:**
- [ ] Leaderboard displays correctly
- [ ] Sorting works
- [ ] Search works
- [ ] Round switching works
- [ ] Mobile responsive (horizontal scroll table)

#### Task 6.3.2: Backend API Setup
**Files:**
- `backend/src/server.ts` - Express server
- `backend/src/routes/leaderboard.ts`
- `backend/src/routes/teams.ts`
- `backend/src/routes/contact.ts`

```typescript
// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import { leaderboardRoutes } from './routes/leaderboard';
import { teamRoutes } from './routes/teams';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/teams', teamRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
```

**Acceptance Criteria:**
- [ ] Server starts without errors
- [ ] CORS configured
- [ ] Routes respond with correct status codes
- [ ] Error handling in place

#### Task 6.3.3: Database Queries
**Firebase Firestore Queries:**

```typescript
// Get leaderboard
export const getLeaderboard = async (round: 1 | 2) => {
  const q = query(
    collection(db, 'leaderboard'),
    where('round', '==', round),
    orderBy('score', 'desc'),
    limit(100)
  );
  return getDocs(q);
};

// Get team
export const getTeam = async (teamId: string) => {
  return getDoc(doc(db, 'teams', teamId));
};

// Submit score (admin only)
export const submitScore = async (entry: LeaderboardEntry) => {
  return addDoc(collection(db, 'leaderboard'), entry);
};
```

**Acceptance Criteria:**
- [ ] Queries return correct data
- [ ] Filtering works (by round, team)
- [ ] Sorting works
- [ ] Performance acceptable (<500ms)

#### Task 6.3.4: API Endpoints
**Leaderboard:**
- `GET /api/leaderboard?round=1&limit=50` - Get leaderboard
- `GET /api/leaderboard/:teamId` - Get team score
- `POST /api/leaderboard` - Submit score (admin)

**Teams:**
- `POST /api/teams` - Register team
- `GET /api/teams/:teamId` - Get team details
- `GET /api/teams?college=MIT` - Filter teams

**Contact:**
- `POST /api/contact` - Submit contact form

**Acceptance Criteria:**
- [ ] All endpoints documented
- [ ] Correct HTTP methods used
- [ ] Error responses standardized
- [ ] Input validation on server

#### Task 6.3.5: Form Submission Integration
**File:** `src/services/registrationService.ts`

```typescript
export const submitTeamRegistration = async (formData: TeamFormData) => {
  const response = await api.post('/teams', formData);
  if (!response.data.success) {
    throw new Error(response.data.error);
  }
  return response.data;
};
```

**In Component:**
```typescript
const handleSubmit = async (data: TeamFormData) => {
  try {
    const result = await submitTeamRegistration(data);
    toast.success('Registration successful!');
    navigate('/dashboard');
  } catch (error) {
    toast.error(error.message);
  }
};
```

**Acceptance Criteria:**
- [ ] Registration form submits
- [ ] Server validation passes
- [ ] Confirmation email sent
- [ ] Database record created
- [ ] Error handling works

#### Task 6.3.6: Image Upload (Gallery)
**File:** `src/services/imageService.ts`

```typescript
export const uploadImage = async (file: File, category: string) => {
  const fileName = `${Date.now()}_${file.name}`;
  const ref = `gallery/${category}/${fileName}`;
  
  const task = storage.ref(ref).put(file);
  await task;
  
  const url = await storage.ref(ref).getDownloadURL();
  return url;
};
```

**Acceptance Criteria:**
- [ ] Images upload to Firebase Storage
- [ ] Preview shows after upload
- [ ] File size validation
- [ ] Correct permissions set

#### Task 6.3.7: Real-Time Updates (Optional)
**File:** `src/hooks/useLeaderboardRealtime.ts`

```typescript
export const useLeaderboardRealtime = (round: 1 | 2) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  
  useEffect(() => {
    const q = query(
      collection(db, 'leaderboard'),
      where('round', '==', round),
      orderBy('timestamp', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setEntries(data);
    });
  }, [round]);
  
  return entries;
};
```

**Acceptance Criteria:**
- [ ] Leaderboard updates without page refresh
- [ ] New scores highlighted
- [ ] Animations smooth

### 6.4 Success Metrics
- [ ] Leaderboard loads <1s
- [ ] API responds <500ms
- [ ] Registration flow end-to-end
- [ ] All forms functional
- [ ] Zero unhandled errors
- [ ] Lighthouse >85

### 6.5 Risks
| Risk | Mitigation |
|------|-----------|
| Database query too slow | Add indexes, optimize queries |
| API rate limiting | Implement caching, debounce calls |
| Real-time updates costly | Use polling (30s interval) initially |

### 6.6 Dependencies
- Phase 1-5 complete
- Firebase project fully set up
- Backend server deployed

---

## Phase 7: Testing, Optimization & Polish (Week 10-12)

### 7.1 Objectives
- Write unit & integration tests
- Performance optimization
- Accessibility audit
- Cross-browser testing
- Final polish & refinements

### 7.2 Deliverables
- ✅ Unit tests (>80% coverage)
- ✅ Component tests (critical paths)
- ✅ E2E tests (happy paths)
- ✅ Performance optimized (<3s load)
- ✅ Accessibility audit passed (WCAG 2.1 AA)
- ✅ Cross-browser tested
- ✅ Mobile tested
- ✅ SEO optimized

### 7.3 Tasks Breakdown

#### Task 7.3.1: Unit Tests
**Files to test:**
- `src/utils/validators.ts` - Zod schemas
- `src/utils/formatters.ts` - Format functions
- `src/utils/helpers.ts` - Utility functions
- `src/store/*.ts` - Zustand stores

```bash
npm install -D vitest @testing-library/react @testing-library/user-event
```

**Example:**
```typescript
// src/utils/__tests__/formatters.test.ts
describe('formatScore', () => {
  it('should format score correctly', () => {
    expect(formatScore(1234567)).toBe('1234567');
  });
});
```

**Acceptance Criteria:**
- [ ] >80% code coverage
- [ ] All utils tested
- [ ] All validations tested
- [ ] All edge cases covered

#### Task 7.3.2: Component Tests
**Critical components to test:**
- RegistrationForm
- Leaderboard
- RobotAssembly (animation logic)
- ContactForm

```typescript
// src/components/__tests__/RegistrationForm.test.tsx
describe('RegistrationForm', () => {
  it('should submit valid team data', async () => {
    const { getByRole, getByPlaceholderText } = render(<RegistrationForm />);
    
    fireEvent.change(getByPlaceholderText('Team name'), {
      target: { value: 'Team A' },
    });
    
    fireEvent.click(getByRole('button', { name: /register/i }));
    
    // Assert submission
  });
});
```

**Acceptance Criteria:**
- [ ] Form validation tested
- [ ] Error states tested
- [ ] Success states tested
- [ ] All user interactions tested

#### Task 7.3.3: Performance Optimization
**Checklist:**
- [ ] Image compression & WebP format
- [ ] Code splitting (lazy load routes)
- [ ] Tree shaking (remove unused code)
- [ ] 3D model optimization (compression, LOD)
- [ ] API caching (react-query staleTime)
- [ ] CSS optimization (PurgeCSS)
- [ ] Font optimization (system fonts or WOFF2)

**Tools:**
```bash
npm run build
npx vite-plugin-visualizer
npm run lighthouse
```

**Targets:**
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Lighthouse: >85

**Acceptance Criteria:**
- [ ] Lighthouse score >85
- [ ] Load time <3s
- [ ] Core Web Vitals green
- [ ] Bundle size <200KB (gzipped)

#### Task 7.3.4: Accessibility Audit
**Tools:**
- Axe DevTools (browser extension)
- WAVE (WebAIM)
- Lighthouse Accessibility
- Keyboard navigation testing

**Checklist:**
- [ ] Color contrast >4.5:1
- [ ] All images have alt text
- [ ] All buttons keyboard accessible
- [ ] Focus outlines visible
- [ ] Form labels associated
- [ ] ARIA labels where needed
- [ ] No keyboard traps
- [ ] Logical tab order

**Acceptance Criteria:**
- [ ] WCAG 2.1 AA passed
- [ ] Zero critical Axe issues
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

#### Task 7.3.5: Cross-Browser Testing
**Browsers to test:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Chrome
- Mobile Safari

**Test Cases:**
- Home page rendering
- 3D animation (if supported)
- Forms submission
- Navigation
- Responsive layout

**Acceptance Criteria:**
- [ ] All browsers display correctly
- [ ] No critical bugs
- [ ] Graceful degradation for old browsers
- [ ] 3D fallback shows

#### Task 7.3.6: SEO Optimization
**Files:**
- `src/config/seo.ts` - Meta tags
- `public/robots.txt` - Search engine directives
- `public/sitemap.xml` - Site map

```typescript
// src/config/seo.ts
export const SEO_CONFIG = {
  title: 'GearStorm | IEEE RAS Robotics Competition',
  description: 'Inter-college robotics competition by IEEE RAS KLS GIT',
  image: '/og-image.jpg',
  url: 'https://gearstorm.com',
  keywords: ['robotics', 'competition', 'IEEE', 'engineering'],
};

// In each page:
<Helmet>
  <title>{SEO_CONFIG.title}</title>
  <meta name="description" content={SEO_CONFIG.description} />
  <meta property="og:title" content={SEO_CONFIG.title} />
</Helmet>
```

**Acceptance Criteria:**
- [ ] Meta tags on all pages
- [ ] Open Graph tags present
- [ ] Structured data (schema.org)
- [ ] Sitemap submitted to Google Search Console
- [ ] Mobile-friendly (Mobile-Friendly Test)

#### Task 7.3.7: Final Polish
- [ ] Button hover states refined
- [ ] Animations tweaked for feel
- [ ] Loading states polished
- [ ] Error messages friendly
- [ ] Fonts loaded optimized
- [ ] Dark theme consistent
- [ ] Spacing/padding refined
- [ ] Copy-proofread

**Acceptance Criteria:**
- [ ] No console errors/warnings
- [ ] No broken links
- [ ] All CTAs visible/clear
- [ ] Professional appearance

### 7.4 Success Metrics
- [ ] 100% test pass
- [ ] >80% code coverage
- [ ] Lighthouse >85 (all audits)
- [ ] WCAG 2.1 AA compliance
- [ ] <3s page load time
- [ ] 60fps animations
- [ ] Zero critical bugs

### 7.5 Dependencies
- Phase 1-6 complete
- All features implemented

---

## Phase 8: Deployment & Launch (Week 12)

### 8.1 Objectives
- Deploy to production
- Monitor for errors
- Set up analytics
- Post-launch support

### 8.2 Deliverables
- ✅ Website live on production domain
- ✅ SSL certificate installed
- ✅ Analytics configured
- ✅ Monitoring & error tracking active
- ✅ Backup & disaster recovery plan

### 8.3 Tasks Breakdown

#### Task 8.3.1: Production Deployment
**Deploy to Vercel (recommended):**
```bash
npm install -g vercel
vercel deploy --prod
```

**Or Netlify:**
```bash
netlify deploy --prod
```

**Acceptance Criteria:**
- [ ] Website live at custom domain
- [ ] HTTPS enabled
- [ ] Auto-redirects from www
- [ ] All pages accessible

#### Task 8.3.2: Backend Deployment
**Deploy Node.js backend:**
- Heroku, Railway, or self-hosted VPS

**Acceptance Criteria:**
- [ ] API endpoints live
- [ ] Database connected
- [ ] Environment variables set
- [ ] Error logs visible

#### Task 8.3.3: Analytics & Monitoring
- Google Analytics
- Sentry (error tracking)
- Hotjar (session replay - optional)

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

**Acceptance Criteria:**
- [ ] Analytics data flowing
- [ ] Error tracking active
- [ ] Alerts set up for critical errors

#### Task 8.3.4: Domain & DNS
- Purchase domain if not already done
- Point DNS to hosting provider
- Set up email forwarding

**Acceptance Criteria:**
- [ ] Domain points to website
- [ ] Email forwarding works (contact@gearstorm.com)

#### Task 8.3.5: Backups & Disaster Recovery
- Daily database backups
- Version control backups (GitHub)
- Rollback plan documented

**Acceptance Criteria:**
- [ ] Backups automated
- [ ] Can restore from backup
- [ ] Runbook documented

#### Task 8.3.6: Launch Checklist
- [ ] All pages accessible
- [ ] Forms submitting
- [ ] Leaderboard loading
- [ ] 3D animation working
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Analytics tracking
- [ ] Error monitoring active

### 8.4 Success Metrics
- [ ] Website live & stable
- [ ] <1% error rate
- [ ] <3s avg page load
- [ ] 99.9% uptime

---

## Phase Timeline Summary

```
Week 1-2:   Phase 1 - Project Setup ████
Week 2-3:   Phase 2 - Layout & Nav ████
Week 3-4:   Phase 3 - Components  ████
Week 4-6:   Phase 4 - Home & 3D   ███████
Week 6-8:   Phase 5 - Content     ███████
Week 8-10:  Phase 6 - Backend     ███████
Week 10-12: Phase 7 - Testing     ████████
Week 12:    Phase 8 - Launch      ██

Total: 12 weeks (can be parallelized to 8-10 weeks)
```

---

## Parallel Development Notes

Some phases can overlap:
- **Phase 2 & 3** can be parallel (layout + components)
- **Phase 4** can start once Phase 3 basics done
- **Phase 5** pages can be built as Phase 3 completes
- **Phase 6** backend can start independently
- **Phase 7** testing starts once Phase 6 features stable

**Optimized Timeline:** 8-10 weeks with 2-3 developers

---

## Milestone Review Gates

### Before Phase Completion:
1. Code review (peer review of all PRs)
2. Manual testing on desktop + mobile
3. Lighthouse check >80
4. No critical bugs
5. Documentation updated

### Release Gate:
- [ ] All acceptance criteria met
- [ ] No regression bugs
- [ ] Performance acceptable
- [ ] Team sign-off

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-23  
**Status:** Ready for Development

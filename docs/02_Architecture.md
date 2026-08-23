# GearStorm Website - Architecture Document

## 1. Technology Stack

### 1.1 Frontend
- **Framework:** React 18+ (with TypeScript)
- **Build Tool:** Vite (fast development & optimized builds)
- **Styling:** Tailwind CSS + CSS Modules
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** Framer Motion, React Scroll Trigger
- **State Management:** Zustand (lightweight, no boilerplate)
- **Form Handling:** React Hook Form + Zod (validation)
- **HTTP Client:** Axios
- **UI Component Library:** shadcn/ui (customizable, accessible)

### 1.2 Backend (Phase 1 - Minimal)
- **API Server:** Node.js + Express (simple API)
- **Database:** Firebase Firestore (scalable, no-ops)
  - OR: MongoDB Atlas (if self-hosted backend needed)
- **Authentication:** Firebase Auth or simple JWT tokens
- **File Storage:** Firebase Storage (images, PDFs)

### 1.3 Deployment & Hosting
- **Frontend Hosting:** Vercel or Netlify (free tier, auto-deploy)
- **Backend Hosting:** Firebase or Heroku free tier
- **Domain:** Custom domain via Namecheap/GoDaddy
- **CDN:** Cloudflare (free tier, performance boost)

### 1.4 Dev Tools
- **Version Control:** Git + GitHub
- **Code Quality:** ESLint, Prettier, Husky (pre-commit hooks)
- **Testing:** Vitest + React Testing Library
- **Deployment:** GitHub Actions (CI/CD)

---

## 2. Project Folder Structure

```
gearstorm-website/
│
├── public/                          # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── og-image.jpg
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── hero-bg.jpg
│   │   │   └── gallery/
│   │   ├── fonts/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx              # Home hero with 3D robot animation
│   │   │   ├── EventHighlights.tsx
│   │   │   ├── ObstacleShowcase.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   ├── robot/
│   │   │   ├── Robot3D.tsx           # Main 3D robot component (Three.js)
│   │   │   ├── RobotAssembly.tsx     # Scroll-triggered assembly animation
│   │   │   └── RobotParts/
│   │   │       ├── Chassis.tsx
│   │   │       ├── Wheels.tsx
│   │   │       ├── Sensors.tsx
│   │   │       ├── Gripper.tsx
│   │   │       └── Electronics.tsx
│   │   │
│   │   ├── leaderboard/
│   │   │   ├── LeaderboardTable.tsx
│   │   │   ├── ScoreCard.tsx
│   │   │   └── FilterBar.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── RegistrationForm.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── SearchForm.tsx
│   │   │
│   │   └── layout/
│   │       ├── MainLayout.tsx
│   │       ├── PageContainer.tsx
│   │       └── Sidebar.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── BotSpecs.tsx
│   │   ├── Rules.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── Register.tsx
│   │   ├── Gallery.tsx
│   │   ├── Contact.tsx
│   │   ├── NotFound.tsx
│   │   └── Dashboard.tsx (admin view)
│   │
│   ├── hooks/
│   │   ├── useScrollTrigger.ts
│   │   ├── useLeaderboard.ts
│   │   ├── useRegistration.ts
│   │   ├── useMediaQuery.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── services/
│   │   ├── api.ts                   # API client setup
│   │   ├── leaderboardService.ts
│   │   ├── registrationService.ts
│   │   ├── imageService.ts
│   │   └── authService.ts
│   │
│   ├── store/
│   │   ├── authStore.ts             # Zustand store
│   │   ├── leaderboardStore.ts
│   │   ├── registrationStore.ts
│   │   └── uiStore.ts
│   │
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── helpers.ts
│   │   └── animations.ts             # Framer Motion configs
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── animations.css
│   │   ├── variables.css             # CSS custom properties
│   │   └── responsive.css
│   │
│   ├── types/
│   │   ├── index.ts
│   │   ├── models.ts                 # Data models (Team, User, etc.)
│   │   ├── api.ts                    # API response types
│   │   └── events.ts
│   │
│   ├── models/                       # 3D models
│   │   ├── robot.glb
│   │   ├── chassis.glb
│   │   └── obstacles.glb
│   │
│   ├── config/
│   │   ├── firebase.ts               # Firebase config
│   │   ├── api.ts                    # API endpoints
│   │   └── seo.ts                    # SEO configuration
│   │
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Entry point
│   └── index.css
│
├── backend/                          # Optional backend folder
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── middleware/
│   └── package.json
│
├── tests/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── setup.ts
│
├── .github/
│   └── workflows/
│       ├── ci.yml                   # ESLint, tests
│       └── deploy.yml               # Auto-deploy on push
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── eslint.config.js
├── prettier.config.js
└── README.md
```

---

## 3. Data Models & Schemas

### 3.1 User/Team Model
```typescript
interface Team {
  id: string;
  name: string;
  college: string;
  members: TeamMember[];
  registrationDate: Date;
  paymentStatus: "pending" | "completed";
  contactEmail: string;
  contactPhone: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Lead" | "Member";
}
```

### 3.2 Leaderboard Entry Model
```typescript
interface LeaderboardEntry {
  teamId: string;
  teamName: string;
  round: 1 | 2;
  time: number;                    // milliseconds
  obstaclesCleared: number;
  penaltyPoints: number;
  totalScore: number;
  rank: number;
  timestamp: Date;
}
```

### 3.3 Bot Specification Model
```typescript
interface BotSpecification {
  maxDimensions: {
    length: number;
    width: number;
    height: number;
  };
  maxWeight: number;
  allowedComponents: string[];
  disallowedComponents: string[];
  powerOptions: string[];
  constraints: Constraint[];
}
```

---

## 4. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT SIDE (React)                       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            PRESENTATION LAYER                         │   │
│  │  Pages: Home, Rules, BotSpecs, Leaderboard, etc.    │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ▲                                   │
│                           │                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           COMPONENT LAYER                            │   │
│  │  Common, Sections, Robot3D, Forms, Leaderboard      │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ▲                                   │
│                           │                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         STATE MANAGEMENT (Zustand)                   │   │
│  │  Auth, Leaderboard, Registration, UI State          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ▲                                   │
│                           │                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          SERVICES LAYER                              │   │
│  │  API calls, Firebase integration, Image handling    │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ▲                                   │
└───────────────────────────┼──────────────────────────────────┘
                            │ HTTP/REST
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                   SERVER SIDE (Node.js + Express)            │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         API ROUTES & CONTROLLERS                     │   │
│  │  /api/teams, /api/leaderboard, /api/register        │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ▲                                   │
│                           │                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          MIDDLEWARE & VALIDATION                     │   │
│  │  Auth, CORS, Input validation, Error handling       │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ▲                                   │
│                           │                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          DATABASE LAYER                              │   │
│  │  Firestore: Teams, Leaderboard, Images              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 5. Key Technical Flows

### 5.1 Page Load Flow
1. **Initial Load** → Vite loads React app
2. **Auth Check** → Verify user session via Firebase
3. **State Hydration** → Load from localStorage if available
4. **Data Fetch** → Parallel requests (leaderboard, teams, images)
5. **Render** → Display cached data while fetching updates
6. **Hydration Complete** → Update UI with fresh data

### 5.2 3D Robot Animation Flow
1. **Page Mount** → Three.js scene initializes
2. **Model Load** → GLB files load asynchronously
3. **Scroll Listener** → Trigger wheel scroll events
4. **Animation State** → Calculate robot assembly progress (0-100%)
5. **Render** → Update 3D model visibility/position
6. **Cleanup** → Dispose Three.js resources on unmount

### 5.3 Registration Flow
1. **Form Submit** → Client-side validation (Zod)
2. **API Call** → POST /api/teams with form data
3. **Server Validation** → Backend validates data
4. **Database Write** → Firestore stores team record
5. **Email Sent** → Confirmation email to team lead
6. **Success Response** → UI shows confirmation, redirect to dashboard
7. **Error Handling** → Display error message, allow retry

### 5.4 Leaderboard Update Flow
1. **Component Mount** → Fetch current leaderboard
2. **Real-Time Listener** → Subscribe to Firestore changes (optional)
3. **Score Update** → Detect new scores via polling (30s interval)
4. **Animate Change** → Framer Motion animates rank changes
5. **Highlight New** → Show notification for new top entries

---

## 6. API Endpoints (Backend)

### Authentication
- `POST /api/auth/register` - Register new team
- `POST /api/auth/login` - Login (if admin dashboard needed)
- `GET /api/auth/profile` - Get current user profile

### Leaderboard
- `GET /api/leaderboard?round=1&limit=50` - Get leaderboard
- `GET /api/leaderboard/:teamId` - Get team score details
- `POST /api/leaderboard` - Submit score (admin only)

### Teams
- `GET /api/teams` - Get all registered teams
- `GET /api/teams/:id` - Get team details
- `POST /api/teams` - Register new team
- `PUT /api/teams/:id` - Update team info
- `DELETE /api/teams/:id` - Remove team

### Utility
- `GET /api/rules` - Fetch rules data
- `GET /api/bot-specs` - Fetch bot specifications
- `GET /api/gallery` - Fetch gallery images

---

## 7. 3D Rendering Pipeline

### 7.1 Three.js Setup
```typescript
// Basic structure
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const pointLight = new THREE.PointLight(0xffffff, 1);
scene.add(ambientLight, pointLight);

// Load model
const gltfLoader = new GLTFLoader();
gltfLoader.load('robot.glb', (gltf) => {
  const robot = gltf.scene;
  scene.add(robot);
});
```

### 7.2 Model Parts Visibility Logic
```typescript
// Control visibility based on scroll progress (0-100)
const scrollProgress = calculateScrollProgress();
chassis.visible = scrollProgress > 0;
wheels.visible = scrollProgress > 25;
sensors.visible = scrollProgress > 50;
gripper.visible = scrollProgress > 75;
bootup.visible = scrollProgress > 90;
```

### 7.3 Performance Optimization
- **LOD (Level of Detail):** Use simpler models on mobile
- **Lazy Loading:** Load 3D models only when in viewport
- **Fallback:** Show static image if WebGL not supported
- **Frustum Culling:** Don't render off-screen objects
- **Texture Optimization:** Use compressed textures (Basis, KTX2)

---

## 8. State Management Pattern (Zustand)

### Example Store Structure
```typescript
// store/leaderboardStore.ts
import create from 'zustand';

interface LeaderboardState {
  entries: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
  selectedRound: 1 | 2;
  
  fetchLeaderboard: (round: 1 | 2) => Promise<void>;
  setSelectedRound: (round: 1 | 2) => void;
}

export const useLeaderboardStore = create<LeaderboardState>((set) => ({
  entries: [],
  loading: false,
  error: null,
  selectedRound: 1,
  
  fetchLeaderboard: async (round) => {
    set({ loading: true });
    try {
      const data = await leaderboardService.getLeaderboard(round);
      set({ entries: data, error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  setSelectedRound: (round) => set({ selectedRound: round }),
}));
```

---

## 9. Environment Variables (.env)

```
# Firebase
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx

# Backend API
VITE_API_BASE_URL=http://localhost:3000/api

# App Config
VITE_APP_NAME=GearStorm
VITE_APP_VERSION=1.0.0
```

---

## 10. Browser Support Matrix

| Browser | Minimum Version | 3D Support | Fallback |
|---------|-----------------|-----------|----------|
| Chrome | 90+ | Full WebGL | N/A |
| Firefox | 88+ | Full WebGL | N/A |
| Safari | 14+ | Limited WebGL | Static images |
| Edge | 90+ | Full WebGL | N/A |
| Mobile Chrome | Latest | Mobile WebGL | Optimized models |
| Mobile Safari | 14+ | Limited | Static images |

---

## 11. Performance Targets

| Metric | Target | Tool to Measure |
|--------|--------|-----------------|
| First Contentful Paint | <1.5s | Lighthouse |
| Largest Contentful Paint | <2.5s | Lighthouse |
| Cumulative Layout Shift | <0.1 | Lighthouse |
| Time to Interactive | <3.5s | Lighthouse |
| Lighthouse Score | >85 | Lighthouse CI |
| 3D Model Load Time | <2s | Performance API |
| Frame Rate (animations) | 60fps | DevTools |

---

## 12. Deployment Strategy

### Development
```bash
npm run dev                 # Local dev server with hot reload
```

### Staging
```bash
npm run build              # Production build
npm run preview            # Test production build locally
```

### Production
```bash
# Push to GitHub → GitHub Actions triggers:
# 1. ESLint + Tests
# 2. Build verification
# 3. Deploy to Vercel/Netlify (auto)
```

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-23  
**Status:** Ready for Implementation

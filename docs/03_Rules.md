# GearStorm Website - Development Rules & Constraints

## 1. Code Quality Standards

### 1.1 TypeScript Strictness
- ✅ **MUST** use `strict: true` in `tsconfig.json`
- ✅ **MUST** have explicit type annotations for all function parameters and returns
- ✅ **MUST** avoid `any` type (use `unknown` if necessary, with type guards)
- ✅ **MUST** use interfaces for all data structures
- ❌ **NEVER** use implicit `any`

### 1.2 Component Structure
```typescript
// ✅ CORRECT
interface Props {
  title: string;
  onClick: () => void;
  children?: React.ReactNode;
}

export const MyComponent: React.FC<Props> = ({ title, onClick, children }) => {
  return <div onClick={onClick}>{title}</div>;
};

// ❌ WRONG
export const MyComponent = (props) => {
  return <div>{props.title}</div>;
};
```

### 1.3 File Naming Conventions
- **Components:** PascalCase (e.g., `RobotAssembly.tsx`)
- **Utilities:** camelCase (e.g., `formatScore.ts`)
- **Styles:** snake_case (e.g., `robot_animation.css`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Index files:** `index.ts` (for barrel exports)

### 1.4 Folder Organization
- One component per file (no file >300 lines)
- Related utilities in same folder
- Consistent 2-level depth maximum
- Clear separation: components, pages, services, hooks, utils

---

## 2. Required Libraries (DO NOT DEVIATE)

### 2.1 Core Frontend
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| react | ^18.0 | UI framework | Latest stable |
| react-dom | ^18.0 | DOM rendering | Match React version |
| typescript | ^5.0 | Type safety | Strict mode enabled |
| vite | ^5.0 | Build tool | Use Vite ONLY (no CRA) |

### 2.2 Styling
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| tailwindcss | ^3.4 | Utility CSS | Primary styling system |
| @tailwindcss/typography | Latest | Content styling | For blog/rules content |
| postcss | ^8.0 | CSS processing | Required for Tailwind |
| autoprefixer | ^10.4 | Vendor prefixes | Required for Tailwind |

### 2.3 3D Graphics & Animations
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| three | ^r128 | WebGL rendering | 3D graphics engine |
| @react-three/fiber | ^8.13 | React Three bridge | Declarative 3D in React |
| @react-three/drei | ^9.88 | 3D utilities | Pre-built components |
| @react-three/postprocessing | Latest | Post-processing effects | Optional: bloom, glow, etc. |
| framer-motion | ^10.0 | DOM animations | Scroll triggers, transitions |

### 2.4 Form Handling & Validation
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| react-hook-form | ^7.0 | Form state | Lightweight, performant |
| zod | ^3.0 | Schema validation | Type-safe validation |
| @hookform/resolvers | ^3.0 | Zod integration | For RHF + Zod |

### 2.5 State Management
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| zustand | ^4.0 | State store | Simple, no boilerplate |

### 2.6 UI Components
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| @radix-ui/primitives | Latest | Accessible primitives | For custom components |
| shadcn/ui | Custom | Pre-built components | Copy/paste into project |

### 2.7 HTTP & Data
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| axios | ^1.6 | HTTP client | Better than fetch for this |
| firebase | ^10.0 | Backend services | Auth, DB, storage |
| react-query | ^3.39 OR @tanstack/react-query | Data fetching | Caching, sync, background refetch |

### 2.8 Utilities
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| react-router-dom | ^6.0 | Routing | SPA navigation |
| classnames | ^2.0 | Class merging | For conditional classes |
| date-fns | ^2.0 | Date formatting | Lightweight date utility |
| clsx | ^2.0 | Alternative to classnames | Slightly smaller |

### 2.9 Development Only
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| vitest | ^1.0 | Unit testing | Vite-native test runner |
| @testing-library/react | ^14.0 | Component testing | Best practice testing |
| eslint | ^8.0 | Code linting | Code quality |
| prettier | ^3.0 | Code formatting | Consistent style |
| husky | ^8.0 | Git hooks | Pre-commit linting |

### 2.10 Strictly FORBIDDEN Libraries
❌ `jQuery` - Don't use
❌ `Bootstrap` - Use Tailwind instead
❌ `Material-UI` - Conflicts with custom design
❌ `Emotion/Styled-components` - Use Tailwind + CSS Modules
❌ `Redux` - Use Zustand (simpler)
❌ `create-react-app` - Use Vite
❌ `Three.js` add-ons like Babylon.js - Stick with Three.js
❌ Underscore.js, Lodash - Use native JS or date-fns
❌ `Angular`, `Vue`, `Svelte` - React only

---

## 3. Naming & Code Organization Rules

### 3.1 React Component Naming
```typescript
// ✅ File structure
src/components/sections/Hero.tsx
src/components/robot/RobotAssembly.tsx
src/components/forms/RegistrationForm.tsx

// ✅ Export pattern
export const ComponentName: React.FC<Props> = (props) => { };

// ✅ Hooks naming
const useScrollProgress = () => { };
const useLeaderboard = () => { };
```

### 3.2 Constants & Configuration
```typescript
// ✅ CORRECT
// src/utils/constants.ts
export const ROBOT_ASSEMBLY_STAGES = {
  CHASSIS: 0,
  WHEELS: 25,
  SENSORS: 50,
  GRIPPER: 75,
  BOOTUP: 90,
} as const;

export const API_ENDPOINTS = {
  LEADERBOARD: '/api/leaderboard',
  TEAMS: '/api/teams',
} as const;

// ❌ WRONG
const STAGE_1 = 0;
const STAGE_2 = 25;
```

### 3.3 Type Definitions Organization
```typescript
// ✅ CORRECT - One type file per domain
// src/types/models.ts
export interface Team {
  id: string;
  name: string;
  // ...
}

export interface LeaderboardEntry {
  // ...
}

// ✅ CORRECT - API response types
// src/types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
```

---

## 4. Error Handling Standards

### 4.1 API Error Handling
```typescript
// ✅ CORRECT
try {
  const response = await api.get('/leaderboard');
  if (!response.data.success) {
    throw new Error(response.data.error || 'Unknown error');
  }
  return response.data;
} catch (error) {
  console.error('Leaderboard fetch failed:', error);
  throw new Error(`Failed to fetch leaderboard: ${error.message}`);
}

// ❌ WRONG
try {
  const response = await api.get('/leaderboard');
  return response; // No error checking
} catch (error) {
  console.log(error); // Insufficient logging
}
```

### 4.2 Component Error Boundaries
```typescript
// ✅ Must wrap major sections
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return <div>Something went wrong: {error.message}</div>;
}

export const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <MainContent />
  </ErrorBoundary>
);
```

### 4.3 Form Validation Errors
```typescript
// ✅ CORRECT
const schema = z.object({
  teamName: z.string().min(3, 'Team name required'),
  email: z.string().email('Invalid email'),
});

// Show errors to user
{errors.teamName && <span className="error">{errors.teamName.message}</span>}
```

---

## 5. Performance Rules

### 5.1 Component Optimization
- ✅ **MUST** use `React.memo()` for expensive components
- ✅ **MUST** memoize callbacks with `useCallback`
- ✅ **MUST** memoize objects/arrays with `useMemo`
- ✅ **MUST** lazy-load pages with `React.lazy()`
- ❌ **NEVER** render lists without keys (must have stable unique keys)

### 5.2 Image Optimization
- ✅ **MUST** use WebP format with fallback
- ✅ **MUST** lazy-load images with `loading="lazy"`
- ✅ **MUST** specify width/height to prevent CLS
- ✅ **MUST** compress images <100KB where possible
- ✅ Use responsive images with `srcset`

### 5.3 Code Splitting
```typescript
// ✅ Split routes
const HomePage = lazy(() => import('./pages/Home'));
const LeaderboardPage = lazy(() => import('./pages/Leaderboard'));

// ✅ Split heavy components
const RobotAssembly = lazy(() => import('./components/robot/RobotAssembly'));
```

### 5.4 Bundle Analysis
```bash
# Check bundle size regularly
npm run build
npx vite-plugin-visualizer
```

---

## 6. Accessibility (A11y) Standards

### 6.1 Semantic HTML
```typescript
// ✅ CORRECT
<header>Navigation here</header>
<nav aria-label="Main navigation">Links</nav>
<main>Content</main>
<section aria-labelledby="section-title">
  <h2 id="section-title">Section Title</h2>
</section>
<footer>Footer</footer>

// ❌ WRONG
<div>Navigation here</div>
<div>Content</div>
```

### 6.2 ARIA Labels
```typescript
// ✅ CORRECT
<button aria-label="Close menu">×</button>
<input placeholder="Team name" aria-label="Team name input" />
<img alt="Robot chassis diagram" src="..." />

// ❌ WRONG
<button>×</button> {/* No aria-label */}
<img src="robot.jpg" /> {/* No alt text */}
```

### 6.3 Color Contrast
- ✅ **MUST** maintain 4.5:1 contrast ratio for text
- ✅ **MUST** not rely on color alone to convey information
- ✅ **MUST** test with accessibility tools (Axe, WAVE)

### 6.4 Keyboard Navigation
- ✅ **MUST** all interactive elements keyboard accessible
- ✅ **MUST** visible focus indicators on buttons/links
- ✅ **MUST** logical tab order

---

## 7. Testing Requirements

### 7.1 Unit Tests
- ✅ **MUST** test utility functions with >80% coverage
- ✅ **MUST** test custom hooks (useScrollProgress, useLeaderboard, etc.)
- ✅ **MUST** test validation schemas (Zod)

### 7.2 Component Tests
- ✅ **SHOULD** test critical components (Forms, Leaderboard)
- ✅ **SHOULD** test user interactions
- ✅ **SHOULD** test error states

### 7.3 E2E Tests (Future)
- Registration flow
- Leaderboard updates
- Filter/search functionality

### 7.4 Test Structure
```typescript
// ✅ CORRECT
describe('RegistrationForm', () => {
  it('should submit valid team data', async () => {
    render(<RegistrationForm />);
    // Test here
  });

  it('should show validation errors', () => {
    // Test here
  });
});
```

---

## 8. API Integration Rules

### 8.1 API Service Pattern
```typescript
// ✅ CORRECT - Centralized API service
// src/services/api.ts
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

export const leaderboardService = {
  getLeaderboard: (round: 1 | 2) => 
    client.get<LeaderboardResponse>(`/leaderboard?round=${round}`),
  getTeamScore: (teamId: string) =>
    client.get<TeamScoreResponse>(`/leaderboard/${teamId}`),
};
```

### 8.2 Request/Response Handling
```typescript
// ✅ Always type responses
interface LeaderboardResponse {
  success: boolean;
  data: LeaderboardEntry[];
  error?: string;
}

// ✅ Handle loading and error states
const { data, isLoading, error } = useQuery(
  ['leaderboard', round],
  () => leaderboardService.getLeaderboard(round)
);
```

### 8.3 Rate Limiting
- ✅ Implement request debouncing for frequent calls
- ✅ Cache responses appropriately (react-query)
- ✅ Don't call API on every keystroke (debounce search)

---

## 9. Styling Rules

### 9.1 Tailwind CSS Only
```typescript
// ✅ CORRECT
<div className="flex items-center justify-between gap-4 p-6 bg-purple-900">
  Content
</div>

// ❌ WRONG
<div style={{ display: 'flex', padding: '24px' }}>
  Content
</div>

// ⚠️ CSS Modules ONLY for:
// - Component-specific animations
// - Complex layout logic
// - Namespace isolation
```

### 9.2 CSS Variables for Branding
```css
/* ✅ CORRECT - src/styles/variables.css */
:root {
  --color-primary-purple: #6B3A8C;
  --color-accent-magenta: #D91E63;
  --color-dark-bg: #0F0F1E;
  --color-text-light: #E0E0E0;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --border-radius-sm: 0.375rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 1rem;
  --transition-fast: 150ms;
  --transition-normal: 300ms;
}
```

### 9.3 Dark Mode (Default)
```typescript
// ✅ Website should default to dark mode
// Only accent color should be bright (purple/magenta)
<div className="bg-slate-950 text-slate-100">
  <!-- Content on dark background -->
</div>
```

---

## 10. Git & Version Control

### 10.1 Commit Messages
```
// ✅ CORRECT
feat: add robot assembly animation
fix: correct leaderboard sorting logic
docs: update API endpoints in README
style: format code with prettier
refactor: extract 3D scene setup to custom hook

// ❌ WRONG
fixed stuff
update
changes
```

### 10.2 Branch Naming
```
feature/robot-assembly-animation
fix/leaderboard-sort-bug
docs/update-readme
refactor/extract-hooks
```

### 10.3 Pull Request Checklist
- [ ] Tests pass locally
- [ ] No ESLint warnings
- [ ] Lighthouse score >85
- [ ] Cross-browser tested
- [ ] Mobile responsive
- [ ] Accessibility checked (Axe DevTools)
- [ ] Meaningful commit messages
- [ ] Updated documentation if needed

---

## 11. Environment Variables Security

### 11.1 What to Store
✅ Public API keys (Firebase project ID)
✅ API endpoints
✅ App version/name
✅ Feature flags

### 11.2 What NOT to Store
❌ Private Firebase keys (keep on backend only)
❌ Database admin credentials
❌ Payment gateway secrets
❌ Email service API keys

### 11.3 Usage Pattern
```typescript
// ✅ CORRECT
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Public
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // Public
};

// ❌ WRONG - Don't hardcode secrets
const API_KEY = 'sk_live_abc123...'; // Exposed!
```

---

## 12. Documentation Standards

### 12.1 Code Comments
```typescript
// ✅ GOOD - Explain WHY, not WHAT
// We need to memoize this to prevent unnecessary 3D scene re-renders
// which cause jank during scroll animations (60fps target)
const memoScene = useMemo(() => createScene(), []);

// ❌ BAD - States obvious facts
// Create a scene // Obviously we're creating a scene!
const scene = createScene();
```

### 12.2 JSDoc for Public Functions
```typescript
/**
 * Calculates robot assembly progress based on scroll depth
 * @param scrollPercentage - Current scroll position as percentage (0-100)
 * @returns Assembly stage (0-100) mapping to robot parts visibility
 * @example
 * const stage = calculateAssemblyStage(50); // Returns 50
 */
export function calculateAssemblyStage(scrollPercentage: number): number {
  // Implementation
}
```

### 12.3 Component Documentation
```typescript
/**
 * Renders 3D robot assembly animation triggered by page scroll
 * 
 * Features:
 * - Progressive component reveal (chassis → wheels → sensors → gripper)
 * - Touch/mobile friendly with fallback static image
 * - Performance optimized for 60fps
 * 
 * @props
 * @param containerRef - DOM ref to Three.js canvas container
 * @param scrollTriggerElement - Element that triggers animation
 * 
 * @example
 * <RobotAssembly containerRef={canvasRef} scrollTriggerElement={heroSection} />
 */
```

---

## 13. Performance Monitoring

### 13.1 Must Monitor
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- 3D model load time
- API response times

### 13.2 Tools
- Web Vitals (npm package)
- Lighthouse CI
- Sentry (error tracking)
- LogRocket (session replay - optional)

```typescript
// ✅ Track Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## 14. Deployment Rules

### 14.1 Pre-Deployment Checklist
- [ ] All tests passing
- [ ] No ESLint errors
- [ ] Lighthouse >85
- [ ] No console errors/warnings
- [ ] Environment variables set correctly
- [ ] SEO meta tags in place
- [ ] 404 page exists
- [ ] Robots.txt updated

### 14.2 Deployment Environments
| Environment | Branch | Auto-Deploy | Notes |
|-------------|--------|-------------|-------|
| Development | `develop` | Yes | Allows experimentation |
| Staging | `staging` | Yes | Test before production |
| Production | `main` | Yes | Users see this |

### 14.3 Rollback Strategy
- Keep 2 previous production builds
- Can rollback via GitHub Actions
- Monitor Sentry for error spikes post-deploy

---

## 15. Prohibited Patterns

❌ **Direct DOM Manipulation**
```typescript
// WRONG
document.getElementById('leaderboard').innerHTML = html;

// RIGHT
<div id="leaderboard">{leaderboardData}</div>
```

❌ **Global State Without Zustand**
```typescript
// WRONG
window.state = { /* ... */ };

// RIGHT
const useGlobalStore = create((set) => ({ /* ... */ }));
```

❌ **Mixing Concerns**
```typescript
// WRONG
const MyComponent = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    api.get('/data').then(setData); // API call in component
  }, []);
  
  // Rendering + API logic mixed
};

// RIGHT
// Use custom hook
const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get('/data').then(setData);
  }, []);
  return data;
};

// Component only renders
const MyComponent = () => {
  const data = useData();
  return <div>{/* render */}</div>;
};
```

❌ **Over-Engineering**
```typescript
// WRONG - Don't wrap everything in Context
<Provider value={{ leaderboard }}>
  <Provider value={{ auth }}>
    <Provider value={{ ui }}>
      <App />
    </Provider>
  </Provider>
</Provider>

// RIGHT - Use Zustand stores directly
const MyComponent = () => {
  const leaderboard = useLeaderboardStore();
  const auth = useAuthStore();
};
```

---

## 16. Before You Start Coding

### Checklist
- [ ] Read all 16 sections of this document
- [ ] Understand the folder structure (Architecture.md)
- [ ] Have database schema ready (PRD.md)
- [ ] Browsers tested: Chrome, Firefox, Safari, Edge
- [ ] Devices tested: Desktop, Tablet, Mobile
- [ ] Accessibility audit planned (Axe DevTools)
- [ ] Performance targets understood (Architecture.md)

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-23  
**Status:** Enforced - No Deviations Without Approval

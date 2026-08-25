# GearStorm

Inter-college robotics competition website by **IEEE RAS, KLS GIT Belagavi**.

## Quick start

### Frontend

```bash
cd gearstorm-website
cp .env.example .env.local   # optional Firebase / GA / Sentry
npm install
npm run dev
```

Vite proxies `/api` and `/uploads` to `http://localhost:3000`.

### Backend API

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API: `http://localhost:3000` · Health: `/api/health` · Docs: [`backend/README.md`](./backend/README.md)

### Quality checks

```bash
cd gearstorm-website
npm run lint
npm run type-check
npm run test
npm run test:coverage
npm run test:e2e:install   # once
npm run test:e2e
npm run build              # also writes dist/stats.html
```

```bash
cd backend
npm run type-check
npm run build
npm run test:store
```

App: [`gearstorm-website/`](./gearstorm-website/) · Docs: [`docs/`](./docs/)

| Doc | Purpose |
|-----|---------|
| [docs/00_ENHANCED_PROMPT.md](./docs/00_ENHANCED_PROMPT.md) | Project vision |
| [docs/04_Phases.md](./docs/04_Phases.md) | Implementation roadmap |
| [docs/06_Memory.md](./docs/06_Memory.md) | Progress tracker |
| [docs/07_QA_Checklist.md](./docs/07_QA_Checklist.md) | Manual QA (a11y / browsers / Lighthouse) |
| [docs/08_Launch.md](./docs/08_Launch.md) | Vercel + API deploy, backups, monitoring |
| [docs/README.md](./docs/README.md) | Full documentation index |

## Production (Phase 8)

- **Frontend → Vercel** (`gearstorm-website/`, see `vercel.json`)
- **API → Railway / Fly / VPS** (`backend/` Dockerfile) — not Vercel serverless
- Set `VITE_API_BASE_URL`, `VITE_SITE_URL`, backend `CORS_ORIGIN` + `ADMIN_API_KEY`
- Full steps: [`docs/08_Launch.md`](./docs/08_Launch.md)

## Status

- Phase 1 — Project foundation ✅
- Phase 2 — Layout & navigation ✅
- Phase 3 — Design system ✅
- Phase 4 — Home + 3D robot ✅
- Phase 5 — Content pages ✅
- Phase 6 — Leaderboard + API ✅
- Phase 7 — Testing, SEO & polish ✅
- Phase 8 — Launch prep (deploy configs + hardening) ✅

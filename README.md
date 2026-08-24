# GearStorm

Inter-college robotics competition website by **IEEE RAS, KLS GIT Belagavi**.

## Quick start

### Frontend

```bash
cd gearstorm-website
cp .env.example .env.local   # optional
npm install
npm run dev
```

Vite proxies `/api` and `/uploads` to `http://localhost:3000`.

### Backend API

```bash
cd backend
npm install
npm run dev
```

API: `http://localhost:3000` · Health: `/api/health` · Docs: [`backend/README.md`](./backend/README.md)

App: [`gearstorm-website/`](./gearstorm-website/) · Docs: [`docs/`](./docs/)

| Doc | Purpose |
|-----|---------|
| [docs/00_ENHANCED_PROMPT.md](./docs/00_ENHANCED_PROMPT.md) | Project vision |
| [docs/04_Phases.md](./docs/04_Phases.md) | Implementation roadmap |
| [docs/06_Memory.md](./docs/06_Memory.md) | Progress tracker |
| [docs/README.md](./docs/README.md) | Full documentation index |

## Status

- Phase 1 — Project foundation ✅
- Phase 2 — Layout & navigation ✅
- Phase 3 — Design system ✅
- Phase 4 — Home + 3D robot ✅
- Phase 5 — Content pages ✅
- Phase 6 — Leaderboard + API ✅
- Next — Phase 7 testing & polish

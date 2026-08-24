# GearStorm API

Express backend for registration, contact, leaderboard, and gallery uploads.

## Quick start

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

`dotenv` loads `backend/.env` on startup. Server: `http://localhost:3000`

## Endpoints

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/health` | Liveness |
| GET | `/api/leaderboard?round=1&limit=50&search=&college=` | Ranked entries (lower adjusted time wins) |
| GET | `/api/leaderboard/:teamId` | Scores for one team |
| POST | `/api/leaderboard` | Admin score submit (`x-admin-key`) |
| GET | `/api/teams` | Public team list (no emails/phones) |
| GET | `/api/teams/:teamId` | Public team summary |
| GET | `/api/teams/:teamId/full` | Full team + PII (`x-admin-key`) |
| POST | `/api/teams` | Register team |
| POST | `/api/contact` | Contact form |
| GET | `/api/gallery` | Gallery metadata |
| POST | `/api/gallery` | Admin image upload (`multipart`, `x-admin-key`) |

## Admin key

Set `ADMIN_API_KEY` in `.env`.

- **Development:** if unset, falls back to `dev-admin-key` and logs a warning.
- **Production (`NODE_ENV=production`):** requests fail closed until `ADMIN_API_KEY` is set.

## Persistence

Local JSON file at `data/store.json` (gitignored). Frontend Firebase env vars do **not** power this API yet — swap the store module for Firestore when you are ready.

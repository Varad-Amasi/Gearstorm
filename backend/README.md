# GearStorm API

Express backend for registration and contact.

## Quick start

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

`dotenv` loads `backend/.env` on startup. Server: `http://localhost:3000`

Production start (after `npm run build`):

```bash
npm start   # node dist/server.js
```

## Endpoints

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/health` | Liveness + JSON store counts |
| GET | `/api/teams` | Public team list (no emails/phones) |
| GET | `/api/teams/:teamId` | Public team summary |
| GET | `/api/teams/:teamId/full` | Full team + PII (`x-admin-key`) |
| POST | `/api/teams` | Register team (rate-limited) |
| POST | `/api/contact` | Contact form (rate-limited) |

## Admin key

Set `ADMIN_API_KEY` in `.env`.

- **Development:** if unset, falls back to `dev-admin-key` and logs a warning.
- **Production (`NODE_ENV=production`):** requests fail closed until `ADMIN_API_KEY` is set.

## CORS

`CORS_ORIGIN` accepts a comma-separated allowlist, e.g.

```env
CORS_ORIGIN=https://gearstorm.vercel.app,http://localhost:5173
```

## Persistence

Local JSON file at `data/store.json` (gitignored), written atomically (temp file + rename).

To also write each registration into Google Sheets, set `GOOGLE_SHEETS_WEBHOOK_URL` to a deployed Apps Script web-app URL (see root README / chat instructions). The JSON store remains the source of truth if the webhook fails.

**Deploy note:** use a persistent volume for `data/` and `uploads/` on Railway/Fly/VPS. Do not run this API on Vercel serverless.

Verify locally:

```bash
npm run test:store
```

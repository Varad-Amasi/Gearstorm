# Phase 8 — Deployment & launch

## Architecture

| Piece | Host | Notes |
|-------|------|-------|
| Frontend SPA | **Vercel** (`gearstorm-website/`) | Static `dist/` + SPA rewrites |
| API | **Railway / Fly / VPS** (`backend/`) | Long-lived Node — **not** Vercel serverless |
| Database | `backend/data/store.json` | Mount a persistent volume; optional Google Sheets webhook for registrations |
| Uploads | `backend/uploads/` | Same volume (or object storage later) |

Do **not** deploy the Express JSON-file API onto Vercel serverless — the filesystem is ephemeral and read-only.

## 1. Deploy the API (Railway example)

1. Create a Railway project from `backend/`.
2. Add a volume mounted at `/app/data` (and `/app/uploads` if possible).
3. Set environment variables:

```env
NODE_ENV=production
PORT=3000
ADMIN_API_KEY=<long-random-secret>
CORS_ORIGIN=https://<your-vercel-domain>,https://<custom-domain>
```

4. Health check: `GET https://<api-host>/api/health`  
   Expect `persistence: "json-file"` and non-zero seed counts after first boot.

5. Optional Docker: `docker build -t gearstorm-api ./backend && docker run -p 3000:3000 --env-file .env -v gearstorm-data:/app/data gearstorm-api`

## 2. Deploy the frontend (Vercel)

1. Import the GitHub repo in Vercel.
2. **Root Directory:** `gearstorm-website`
3. Build: `npm run build` · Output: `dist`
4. Environment variables (Production):

```env
VITE_API_BASE_URL=https://<api-host>/api
VITE_SITE_URL=https://<your-frontend-domain>
VITE_GA_MEASUREMENT_ID=G-XXXXXXXX   # optional
VITE_SENTRY_DSN=https://...@....ingest.sentry.io/...   # optional
```

5. Redeploy after changing env — Vite inlines these at **build** time.
6. Confirm deep links (`/register`, `/gallery`) refresh without 404 (`vercel.json` SPA rewrite).

## 3. Launch checklist

- [ ] `/api/health` OK from production API
- [ ] Register + Contact forms succeed (Network tab → 201)
- [ ] Registration form submits to API (and Sheet webhook if configured)
- [ ] Gallery images resolve from static `/gallery/*` (listed in `galleryImages.ts`)
- [ ] CORS: browser console clean on form submit
- [ ] OG preview uses `/og-image.png`
- [ ] Custom domain + HTTPS on Vercel
- [ ] DNS / email forwarding (organisers)
- [ ] `ADMIN_API_KEY` rotated and stored in team password manager

## 4. Backups & rollback

**Daily backup (API host):**

```bash
# copy JSON store + uploads off the box
cp /app/data/store.json "/backups/store-$(date -u +%Y%m%d).json"
```

Automate with Railway cron, a systemd timer, or `rclone` to object storage.

**Rollback:**

1. Frontend: Vercel → Deployments → Promote previous deployment.
2. Backend: redeploy previous Railway/Docker image; restore `store.json` from backup if data was corrupted.

**Disaster recovery runbook:** GitHub is source of truth for code. Restore `store.json` + `uploads/` from the latest backup onto a fresh API instance, set the same env vars, update `VITE_API_BASE_URL` if the API host changed, rebuild the frontend.

## 5. Monitoring

- **Sentry:** set `VITE_SENTRY_DSN` (frontend). Add a server DSN later if desired.
- **GA4:** set `VITE_GA_MEASUREMENT_ID`.
- **Uptime:** ping `/api/health` every 5 minutes (UptimeRobot / Better Stack).

## 6. Post-launch

- Swap JSON store for Firestore when credentials + migration are ready.
- Configure SMTP so registration `emailQueued` becomes real.
- Run remaining items in [`07_QA_Checklist.md`](./07_QA_Checklist.md) (Lighthouse, Safari).

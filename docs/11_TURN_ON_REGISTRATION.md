# Turn registrations on

Use this when you are ready for teams to register and pay. Do **not** flip the site switch until the API is live and you have tested a real submit.

Related deploy detail: [`08_Launch.md`](./08_Launch.md).

---

## 1. One-line site switch (do this last)

File: `gearstorm-website/src/utils/competition.ts`

```ts
export const REGISTRATION_OPEN = true;
```

That single flag:

- Makes header **Register**, Home / Bot Specs **Register your team**, and the footer **Register** link work again
- Shows the registration form, UPI QR, and submit on `/register`

To close again later, set it back to `false` and redeploy the frontend.

---

## 2. Before you flip the flag

### API (Railway / Fly / VPS — not Vercel)

The form `POST`s to `POST /api/teams` with a payment screenshot. The API writes `backend/data/store.json` and files under `backend/uploads/`. That needs a long-lived host with a **volume**.

1. Deploy `backend/` (see [`08_Launch.md`](./08_Launch.md)).
2. Mount persistent storage at `/app/data` and `/app/uploads`.
3. Set env on the API host:

| Variable | Required | What to put |
|----------|----------|-------------|
| `ADMIN_API_KEY` | Yes in production | Long random secret (password manager) |
| `CORS_ORIGIN` | Yes | Your live site origins, comma-separated, e.g. `https://your-app.vercel.app,https://your-domain.com` |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Optional | Apps Script web-app URL if you want Sheet rows |
| `PUBLIC_BASE_URL` | Optional | API **origin only** (no `/api`), e.g. `https://your-api.up.railway.app` — used for payment-proof links in Sheets |

4. Health check: open `https://<api-host>/api/health` in a browser. It should return JSON.

### Frontend (Vercel)

Vite bakes env in at **build** time. After changing these, **redeploy**.

| Variable | What to put |
|----------|-------------|
| `VITE_API_BASE_URL` | `https://<api-host>/api` (must include `/api`) |
| `VITE_SITE_URL` | Public site URL, no trailing slash |

If `VITE_API_BASE_URL` is missing, the site calls `/api` on the **frontend** host. That will fail on Vercel. Set the Railway URL before opening registrations.

### Payment copy

Confirm these still match the real UPI account:

- `PAYMENT.upiId` and `PAYMENT.qrSrc` in `gearstorm-website/src/utils/competition.ts` (currently `gitupi@okaxis` and `/upi-qr.jpg`)
- Image file: `gearstorm-website/public/upi-qr.jpg`

---

## 3. Flip, then fix the smoke test

1. Set `REGISTRATION_OPEN` to `true`.
2. Update `gearstorm-website/e2e/smoke.spec.ts` so CI does not expect a closed site:

   - Home: expect a **link** named `/register your team/` (not a disabled **button**).
   - Register: restore the old check — heading **Team Registration**, click **Submit registration**, expect a validation `alert`.

3. Commit, push, wait for Vercel to finish.

---

## 4. Live check (5 minutes)

Do this on the **production** URL, not localhost.

- [ ] Header **Register** and Home **Register your team** go to `/register`
- [ ] You see the form and UPI QR (not “Registration is closed”)
- [ ] Browser Network: submit a dummy team → `POST …/api/teams` → **201** (or a clear validation error, not CORS / 404 / timeout)
- [ ] Screenshot lands under API `uploads/`; team appears in `store.json`
- [ ] If Sheets is configured: a new row appears
- [ ] Console has no CORS error on submit

If submit fails, **set `REGISTRATION_OPEN` back to `false`** and redeploy so people stop paying into a broken form.

---

## 5. Local dry run (optional)

```bash
# terminal 1
cd backend && npm run dev

# terminal 2
cd gearstorm-website
# .env.local: VITE_API_BASE_URL=http://localhost:3000/api
npm run dev
```

Set `REGISTRATION_OPEN = true` locally, complete a test registration, then revert the flag if you are not shipping yet.

---

## Quick “I’m ready now” order

1. API health OK + volume mounted  
2. Vercel `VITE_API_BASE_URL` + `VITE_SITE_URL` set and rebuilt  
3. UPI QR / ID confirmed  
4. `REGISTRATION_OPEN = true`  
5. Fix e2e smoke expectations  
6. Push and run the live check  

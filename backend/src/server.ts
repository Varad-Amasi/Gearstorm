import { config as loadEnv } from 'dotenv';
import { createApp } from './app.js';
import { store } from './store/jsonStore.js';

loadEnv();

const port = Number(process.env.PORT ?? 3000);
const app = createApp();

// Ensure seed data exists before accepting traffic.
store.getAll();

app.listen(port, () => {
  console.log(`GearStorm API listening on http://localhost:${port}`);
  console.log(`Health: http://localhost:${port}/api/health`);
  if (!process.env.ADMIN_API_KEY) {
    console.warn(
      '[security] ADMIN_API_KEY unset — using dev-admin-key (dev only). Set it in backend/.env for production.'
    );
  }
});

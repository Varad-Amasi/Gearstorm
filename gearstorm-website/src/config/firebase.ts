import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

/**
 * Firebase web config — values come from Vite env (see `.env.example`).
 * Client-side keys are public; never put admin/service-account secrets here.
 *
 * Note: Phase 6 persistence still uses the Express JSON store. This module
 * initializes only when env vars are present so Firestore/Auth/Storage can be
 * wired later without changing call sites.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (hasFirebaseConfig) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else if (import.meta.env.DEV) {
  console.info(
    '[GearStorm] Firebase env vars missing — running without Firebase. Copy .env.example to .env.local.'
  );
}

export { app, auth, db, storage, hasFirebaseConfig };

/** Planned Firestore collections (unused until the JSON store is swapped). */
export const FIRESTORE_COLLECTIONS = {
  TEAMS: 'teams',
  LEADERBOARD: 'leaderboard',
  GALLERY: 'gallery',
} as const;

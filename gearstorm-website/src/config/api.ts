export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'GearStorm',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
} as const;

export const API_ENDPOINTS = {
  LEADERBOARD: '/leaderboard',
  TEAMS: '/teams',
  CONTACT: '/contact',
} as const;

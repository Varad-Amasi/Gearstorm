/**
 * Parse comma-separated CORS_ORIGIN into an allowlist.
 * Example: `https://gearstorm.vercel.app,http://localhost:5173`
 */
export const parseCorsOrigins = (raw?: string): string[] => {
  const value = (raw ?? 'http://localhost:5173').trim();
  if (!value) {
    return ['http://localhost:5173'];
  }
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export const createCorsOriginChecker = (allowed: string[]) => {
  const allowAll = allowed.includes('*');

  return (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ): void => {
    // Non-browser clients (curl, server-to-server) often omit Origin.
    if (!origin || allowAll || allowed.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  };
};

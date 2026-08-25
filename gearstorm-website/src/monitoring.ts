/**
 * Optional production telemetry. Loads only when env vars are present so local
 * and CI builds stay free of third-party scripts.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const initAnalytics = (): void => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  if (!measurementId || typeof document === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
};

export const initErrorMonitoring = async (): Promise<void> => {
  const dsn = import.meta.env.VITE_SENTRY_DSN?.trim();
  if (!dsn) {
    return;
  }

  try {
    const Sentry = await import('@sentry/react');
    Sentry.init({
      dsn,
      environment: import.meta.env.MODE,
      tracesSampleRate: 0.1,
    });
  } catch (error) {
    console.warn('[monitoring] Sentry init skipped', error);
  }
};

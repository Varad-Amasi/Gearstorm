import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHyperspeedBackground } from '@/components/backgrounds/SiteHyperspeedBackground';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { ToastViewport } from '@/components/common/Toast';
import { RouteErrorBoundary } from '@/components/layout/RouteErrorBoundary';
import { ScrollToTop } from '@/components/layout/ScrollToTop';

const RouteFallback = (): JSX.Element => (
  <div
    className="container-page py-24 text-center text-text-muted"
    role="status"
    aria-live="polite"
  >
    Loading...
  </div>
);

/**
 * Shared page frame: sticky header, routed content, and footer pinned to the
 * bottom on short pages.
 */
export const MainLayout = (): JSX.Element => {
  const mainRef = useRef<HTMLElement>(null);
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash === '#main-content') {
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [hash, pathname]);

  return (
    <div className="relative flex min-h-screen flex-col text-text-light">
      <SiteHyperspeedBackground />
      {/* Transparent shell so the fixed Hyperspeed backdrop shows through gaps */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <ScrollToTop />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-skiplink focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          onClick={() => {
            requestAnimationFrame(() => {
              mainRef.current?.focus({ preventScroll: true });
            });
          }}
        >
          Skip to content
        </a>
        <Header />
        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          className="flex-grow outline-none"
        >
          <RouteErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
          </RouteErrorBoundary>
        </main>
        <Footer />
        <ToastViewport />
      </div>
    </div>
  );
};

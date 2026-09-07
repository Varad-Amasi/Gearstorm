import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top on route change, or to a hash target once it exists
 * (lazy Home + `/gallery` → `/#from-1-0`).
 */
export const ScrollToTop = (): null => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    const id = decodeURIComponent(hash.replace(/^#/, ''));
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    let cancelled = false;
    let attempts = 0;

    const tryScroll = (): void => {
      if (cancelled) {
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < 20) {
        window.setTimeout(tryScroll, 50);
      }
    };

    tryScroll();
    return () => {
      cancelled = true;
    };
  }, [pathname, hash]);

  return null;
};

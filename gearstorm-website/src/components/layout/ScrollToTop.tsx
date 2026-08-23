import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position on route change so new pages start at the top.
 */
export const ScrollToTop = (): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

import { useMediaQuery } from './useMediaQuery';

/**
 * Tracks the user's reduced-motion preference, updating live if it changes.
 */
export const usePrefersReducedMotion = (): boolean =>
  useMediaQuery('(prefers-reduced-motion: reduce)');

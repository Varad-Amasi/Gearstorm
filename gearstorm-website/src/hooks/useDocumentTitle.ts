import { useEffect } from 'react';

const BASE_TITLE = 'GearStorm | IEEE RAS Robotics Competition';

/**
 * Sets the document title (and optional meta description) for the active page.
 *
 * Intentionally does not restore the base title on unmount — with lazy routes
 * wrapped in Suspense, cleanup would flash the base title between pages.
 * The next mounted page overwrites these values instead.
 *
 * @param title - Page-specific title segment, e.g. "Leaderboard"
 * @param description - Optional meta description override for the page
 */
export const useDocumentTitle = (
  title?: string,
  description?: string
): void => {
  useEffect(() => {
    document.title = title ? `${title} | GearStorm` : BASE_TITLE;

    if (!description) {
      return;
    }

    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (meta) {
      meta.content = description;
    }
  }, [title, description]);
};

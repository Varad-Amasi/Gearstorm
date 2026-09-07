/**
 * Site-wide SEO defaults. Per-page titles/descriptions still flow through
 * {@link useDocumentTitle}; Open Graph tags are synced from those values.
 *
 * Set `VITE_SITE_URL` (no trailing slash) for production builds so sitemap,
 * robots, and absolute OG URLs resolve to the real host.
 */
const siteUrl = (
  import.meta.env.VITE_SITE_URL || 'https://gearstorm.example'
).replace(/\/$/, '');

export const SEO_CONFIG = {
  siteName: 'GearStorm 2.0',
  title: 'GearStorm 2.0 | IEEE RAS & ISTE Robotics Competition',
  description:
    'Inter-college robotics with two competitions — Beginner and Advanced — organised in collaboration with IEEE RAS and ISTE of KLS GIT Belagavi.',
  url: siteUrl,
  /** Raster OG image — social crawlers often reject SVG. */
  image: '/og-image.png',
  twitterCard: 'summary_large_image',
  keywords: [
    'GearStorm 2.0',
    'GearStorm',
    'IEEE RAS',
    'ISTE',
    'robotics competition',
    'KLS GIT',
    'Belagavi',
    'inter-college',
    'Beginner',
    'Advanced',
  ],
} as const;

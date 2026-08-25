import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '@/config/seo';

const ensureMeta = (
  selector: string,
  attributes: Record<string, string>
): HTMLMetaElement => {
  let meta = document.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
      meta?.setAttribute(key, value);
    });
    document.head.appendChild(meta);
  }
  return meta;
};

/**
 * Sets the document title and syncs description + Open Graph / Twitter tags.
 *
 * Intentionally does not restore the base title on unmount — with lazy routes
 * wrapped in Suspense, cleanup would flash the base title between pages.
 */
export const useDocumentTitle = (
  title?: string,
  description?: string
): void => {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitle = title ? `${title} | GearStorm` : SEO_CONFIG.title;
    const pageDescription = description ?? SEO_CONFIG.description;
    const pageUrl = `${SEO_CONFIG.url}${pathname === '/' ? '/' : pathname}`;

    document.title = pageTitle;

    const descriptionMeta = ensureMeta('meta[name="description"]', {
      name: 'description',
    });
    descriptionMeta.content = pageDescription;

    const ogTitle = ensureMeta('meta[property="og:title"]', {
      property: 'og:title',
    });
    ogTitle.content = pageTitle;

    const ogDescription = ensureMeta('meta[property="og:description"]', {
      property: 'og:description',
    });
    ogDescription.content = pageDescription;

    const ogType = ensureMeta('meta[property="og:type"]', {
      property: 'og:type',
    });
    ogType.content = 'website';

    const ogUrl = ensureMeta('meta[property="og:url"]', {
      property: 'og:url',
    });
    ogUrl.content = pageUrl;

    const ogImage = ensureMeta('meta[property="og:image"]', {
      property: 'og:image',
    });
    ogImage.content = `${SEO_CONFIG.url}${SEO_CONFIG.image}`;

    const twitterCard = ensureMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
    });
    twitterCard.content = SEO_CONFIG.twitterCard;
  }, [title, description, pathname]);
};

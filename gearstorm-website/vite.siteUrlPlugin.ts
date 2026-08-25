import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

const PLACEHOLDER = 'https://gearstorm.example';

const normalizeSiteUrl = (raw?: string): string => {
  const fallback = PLACEHOLDER;
  const value = (raw || fallback).trim().replace(/\/$/, '');
  return value || fallback;
};

/**
 * Rewrites placeholder site URL in built HTML / sitemap / robots so production
 * builds pick up `VITE_SITE_URL` without hand-editing public assets.
 */
export const siteUrlPlugin = (): Plugin => {
  let outDir = 'dist';
  let siteUrl = PLACEHOLDER;

  return {
    name: 'gearstorm-site-url',
    configResolved(config) {
      outDir = config.build.outDir;
      siteUrl = normalizeSiteUrl(config.env.VITE_SITE_URL);
    },
    transformIndexHtml(html) {
      return html.split(PLACEHOLDER).join(siteUrl);
    },
    closeBundle() {
      const root = resolve(outDir);
      for (const file of ['sitemap.xml', 'robots.txt', 'index.html']) {
        const path = resolve(root, file);
        try {
          const current = readFileSync(path, 'utf8');
          if (current.includes(PLACEHOLDER)) {
            writeFileSync(
              path,
              current.split(PLACEHOLDER).join(siteUrl),
              'utf8'
            );
          }
        } catch {
          // File may be missing in test builds
        }
      }
    },
  };
};

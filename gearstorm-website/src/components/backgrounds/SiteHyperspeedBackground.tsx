import { useTheme } from '@/theme/ThemeProvider';
import '@/components/backgrounds/SiteLightBackground.css';

/**
 * Fixed full-viewport backdrop for the whole site. Decorative only — pointer
 * events are disabled so forms/nav keep working.
 *
 * Deliberately static and quiet in both themes: a deep ink wash with one soft
 * brand tint and a faint grid (dark), and warm paper with a single corner tint
 * (light). No moving WebGL tunnel — a calm, designed backdrop reads as
 * intentional rather than a flashy template.
 */
export const SiteHyperspeedBackground = (): JSX.Element => {
  const { theme } = useTheme();

  if (theme === 'light') {
    return (
      <div
        className="site-light-bg pointer-events-none fixed inset-0 z-0 overflow-hidden print:hidden"
        aria-hidden="true"
      >
        <div className="site-light-bg__wash" />
        <div className="site-light-bg__glow" />
        <div className="site-light-bg__grid" />
      </div>
    );
  }

  return (
    <div
      className="site-static-bg pointer-events-none fixed inset-0 z-0 overflow-hidden print:hidden"
      aria-hidden="true"
    >
      <div className="site-static-bg__wash" />
      <div className="site-static-bg__grid" />
    </div>
  );
};

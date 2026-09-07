import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { MobileMenu } from '@/components/common/MobileMenu';
import { Navigation } from '@/components/common/Navigation';
import { RegisterCta } from '@/components/common/RegisterCta';
import { ThemeToggle } from '@/components/common/ThemeToggle';

const MOBILE_MENU_ID = 'mobile-navigation';

/**
 * Sticky site header with desktop navigation and a mobile menu toggle.
 * Register stays visible on all breakpoints; hamburger is mobile-only.
 */
export const Header = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <header className="sticky top-0 z-header border-b border-border bg-dark-950/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Logo onNavigate={closeMenu} />

        <nav aria-label="Main navigation" className="hidden md:block">
          <Navigation />
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <RegisterCta
            variant="secondary"
            size="sm"
            className="max-md:px-2.5"
            onClick={closeMenu}
          >
            Register
          </RegisterCta>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-text-light transition-colors duration-normal hover:bg-dark-800 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {menuOpen ? '\u00D7' : '\u2630'}
            </span>
          </button>
        </div>
      </div>

      <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} onClose={closeMenu} />
    </header>
  );
};

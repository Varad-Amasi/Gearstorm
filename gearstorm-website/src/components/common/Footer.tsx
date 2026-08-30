import { Link } from 'react-router-dom';
import { EVENT, NAV_LINKS, ORGANIZER, ROUTES } from '@/config/routes';

/**
 * Site footer with navigation, organizer details, and chapter branding.
 */
export const Footer = (): JSX.Element => (
  <footer className="border-t border-border bg-dark-950 pb-[env(safe-area-inset-bottom)]">
    <div className="container-page grid gap-10 py-12 md:grid-cols-3">
      <div>
        <p className="font-brand text-lg font-bold text-text-light">
          {EVENT.name}
        </p>
        <p className="mt-2 max-w-xs text-sm text-text-muted">
          Inter-college robotics competition organised {ORGANIZER.credit}.
        </p>
      </div>

      <nav aria-label="Footer navigation">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-text-subtle">
          Explore
        </h2>
        <ul className="mt-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-sm text-text-muted transition-colors duration-normal hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={ROUTES.REGISTER}
              className="text-sm text-text-muted transition-colors duration-normal hover:text-accent"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-text-subtle">
          Contact
        </h2>
        <address className="mt-4 space-y-2 text-sm not-italic text-text-muted">
          <p>
            <a
              className="transition-colors duration-normal hover:text-accent"
              href={`mailto:${ORGANIZER.email}`}
            >
              {ORGANIZER.email}
            </a>
          </p>
          <p>{ORGANIZER.societiesJoined}</p>
          <p>{ORGANIZER.chapter}</p>
        </address>
      </div>
    </div>

    <div className="border-t border-border">
      <p className="container-page py-6 text-sm text-text-subtle">
        &copy; {new Date().getFullYear()} {ORGANIZER.societiesJoined},{' '}
        {ORGANIZER.chapterShort}. All rights reserved.
      </p>
    </div>
  </footer>
);

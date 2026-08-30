import { Link } from 'react-router-dom';
import { EVENT, ROUTES } from '@/config/routes';

export interface LogoProps {
  onNavigate?: () => void;
}

/**
 * Wordmark that always links back to the home page.
 */
export const Logo = ({ onNavigate }: LogoProps): JSX.Element => (
  <Link
    to={ROUTES.HOME}
    onClick={onNavigate}
    className="group inline-flex min-w-0 items-center gap-2 rounded-md"
    aria-label={`${EVENT.name} home`}
  >
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary font-brand text-lg font-bold text-white transition-colors duration-normal group-hover:bg-accent"
      aria-hidden="true"
    >
      G
    </span>
    <span className="truncate font-brand text-base font-bold tracking-tight text-text-light sm:text-xl">
      {EVENT.shortName} <span className="text-accent">2.0</span>
    </span>
  </Link>
);

import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

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
    className="group inline-flex items-center gap-2 rounded-md"
    aria-label="GearStorm home"
  >
    <span
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-heading text-lg font-extrabold text-white transition-colors duration-normal group-hover:bg-accent"
      aria-hidden="true"
    >
      G
    </span>
    <span className="font-heading text-xl font-extrabold tracking-tight text-text-light">
      GearStorm
    </span>
  </Link>
);

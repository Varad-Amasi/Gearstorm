import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '@/config/routes';

export interface NavigationProps {
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
}

/**
 * Primary site navigation, shared by the desktop header and the mobile menu.
 */
export const Navigation = ({
  orientation = 'horizontal',
  onNavigate,
}: NavigationProps): JSX.Element => (
  <ul
    className={clsx(
      'flex gap-1',
      orientation === 'horizontal'
        ? 'flex-row items-center'
        : 'flex-col items-stretch'
    )}
  >
    {NAV_LINKS.map((link) => (
      <li key={link.path}>
        <NavLink
          to={link.path}
          end={link.path === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            clsx(
              'flex min-h-11 items-center rounded-lg px-3 font-heading text-sm font-medium',
              'transition-colors duration-normal hover:bg-dark-800 hover:text-white',
              isActive ? 'text-accent' : 'text-text-muted'
            )
          }
        >
          {link.label}
        </NavLink>
      </li>
    ))}
  </ul>
);

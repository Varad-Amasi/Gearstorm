import { useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getButtonClasses } from '@/components/common/buttonStyles';
import { Navigation } from '@/components/common/Navigation';
import { ROUTES } from '@/config/routes';
import { useFocusTrap } from '@/hooks/useFocusTrap';

export interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

/**
 * Collapsible navigation panel shown below the header on small screens.
 * Stays in the DOM when closed so `aria-controls` remains valid.
 */
export const MobileMenu = ({
  id,
  open,
  onClose,
}: MobileMenuProps): JSX.Element => {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useFocusTrap(open, panelRef, onClose);

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal={open}
      aria-labelledby={titleId}
      hidden={!open}
      className={
        open
          ? 'animate-slide-down border-t border-border bg-dark-950 md:hidden'
          : 'hidden md:hidden'
      }
    >
      <nav aria-label="Mobile navigation" className="container-page py-4">
        <p id={titleId} className="sr-only">
          Site navigation
        </p>
        <Navigation orientation="vertical" onNavigate={onClose} />
        <Link
          to={ROUTES.REGISTER}
          onClick={onClose}
          className={getButtonClasses('secondary', 'md', 'mt-4 w-full')}
        >
          Register
        </Link>
      </nav>
    </div>
  );
};

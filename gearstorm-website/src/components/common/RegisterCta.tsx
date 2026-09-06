import { Link } from 'react-router-dom';
import {
  getButtonClasses,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/common/buttonStyles';
import { ROUTES } from '@/config/routes';
import { REGISTRATION_OPEN } from '@/utils/competition';

interface RegisterCtaProps {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
}

/**
 * Primary registration control. Flip `REGISTRATION_OPEN` in competition.ts
 * to restore links and the form.
 */
export const RegisterCta = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
}: RegisterCtaProps): JSX.Element => {
  if (REGISTRATION_OPEN) {
    return (
      <Link
        to={ROUTES.REGISTER}
        onClick={onClick}
        className={getButtonClasses(variant, size, className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled
      aria-label={`${children} — opens soon`}
      title="Registration opens soon"
      className={getButtonClasses(variant, size, className)}
    >
      {children}
    </button>
  );
};

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import {
  getButtonClasses,
  type ButtonSize,
  type ButtonVariant,
} from './buttonStyles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

/**
 * Primary interactive button with brand variants.
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps): JSX.Element => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={getButtonClasses(variant, size, className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

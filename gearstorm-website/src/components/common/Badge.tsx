import { clsx } from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant =
  'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary/20 text-primary',
  accent: 'bg-accent/20 text-accent',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  error: 'bg-error/20 text-error',
  info: 'bg-info/20 text-info',
};

/**
 * Compact status / label badge.
 */
export const Badge = ({
  variant = 'primary',
  className,
  children,
  ...props
}: BadgeProps): JSX.Element => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1',
        'font-heading text-sm font-medium',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

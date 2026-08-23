import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  /** Renders a dismiss button when provided. */
  onDismiss?: () => void;
  className?: string;
}

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  success: 'border-success/40 bg-success/10 text-success',
  error: 'border-error/40 bg-error/10 text-error',
  warning: 'border-warning/40 bg-warning/10 text-warning',
  info: 'border-info/40 bg-info/10 text-info',
};

/**
 * Inline contextual message, e.g. form-level validation or page notices.
 */
export const Alert = ({
  variant = 'info',
  title,
  children,
  onDismiss,
  className,
}: AlertProps): JSX.Element => (
  <div
    role={variant === 'error' ? 'alert' : 'status'}
    className={clsx(
      'flex items-start gap-3 rounded-lg border p-4',
      VARIANT_CLASSES[variant],
      className
    )}
  >
    <div className="flex-1">
      {title ? (
        <p className="font-heading text-sm font-semibold">{title}</p>
      ) : null}
      <div className={clsx('text-sm text-text-light', title && 'mt-1')}>
        {children}
      </div>
    </div>
    {onDismiss ? (
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss message"
        className="-m-1 shrink-0 rounded p-1 text-current transition-opacity duration-normal hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M5 5l10 10M15 5L5 15" />
        </svg>
      </button>
    ) : null}
  </div>
);

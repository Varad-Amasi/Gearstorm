import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface TagProps {
  children: ReactNode;
  /** Renders a remove button when provided. */
  onRemove?: () => void;
  className?: string;
}

/**
 * Compact pill for keywords and filters, optionally removable.
 */
export const Tag = ({
  children,
  onRemove,
  className,
}: TagProps): JSX.Element => (
  <span
    className={clsx(
      'inline-flex items-center gap-1.5 rounded-full border border-border bg-dark-800 px-3 py-1 text-sm text-text-light',
      className
    )}
  >
    {children}
    {onRemove ? (
      <button
        type="button"
        onClick={onRemove}
        className="-mr-1 rounded-full p-0.5 text-text-muted transition-colors duration-normal hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        aria-label="Remove tag"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M5 5l10 10M15 5L5 15" />
        </svg>
      </button>
    ) : null}
  </span>
);

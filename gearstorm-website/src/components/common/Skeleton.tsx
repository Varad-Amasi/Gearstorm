import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  /** Number of stacked lines; only meaningful for the `text` variant. */
  lines?: number;
  className?: string;
}

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded',
  rect: 'h-32 rounded-lg',
  circle: 'h-12 w-12 rounded-full',
};

/**
 * Loading placeholder that mirrors the shape of the content it replaces.
 */
export const Skeleton = ({
  variant = 'text',
  lines = 1,
  className,
}: SkeletonProps): JSX.Element => {
  const base = 'animate-pulse-soft bg-dark-700/60';

  if (variant === 'text' && lines > 1) {
    return (
      <div className="flex flex-col gap-2" aria-hidden="true">
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={clsx(
              base,
              VARIANT_CLASSES.text,
              index === lines - 1 ? 'w-3/5' : 'w-full',
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={clsx(
        base,
        VARIANT_CLASSES[variant],
        variant === 'text' && 'w-full',
        className
      )}
    />
  );
};

/**
 * Announces loading state to assistive tech while skeletons render visually.
 */
export const SkeletonGroup = ({
  label = 'Loading content',
  children,
}: {
  label?: string;
  children: ReactNode;
}): JSX.Element => (
  <div role="status" aria-busy="true" aria-label={label}>
    {children}
    <span className="sr-only">{label}</span>
  </div>
);

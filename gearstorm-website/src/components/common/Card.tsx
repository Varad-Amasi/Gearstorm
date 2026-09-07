import { clsx } from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'standard' | 'featured' | 'gradient';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: CardVariant;
  featured?: boolean;
  children?: ReactNode;
}

/**
 * Content card with optional featured (purple glow) or gradient-border
 * treatment.
 */
export const Card = ({
  title,
  description,
  variant = 'standard',
  featured = false,
  children,
  className,
  ...props
}: CardProps): JSX.Element => {
  const resolvedVariant: CardVariant = featured ? 'featured' : variant;

  const body = (
    <>
      {title ? (
        <h3
          className={clsx(
            'mb-2 font-subhead text-xl font-semibold',
            resolvedVariant === 'standard'
              ? 'text-text-light'
              : 'text-primary-500'
          )}
        >
          {title}
        </h3>
      ) : null}
      {description ? <p className="text-text-muted">{description}</p> : null}
      {children}
    </>
  );

  if (resolvedVariant === 'gradient') {
    return (
      <div
        className={clsx(
          'rounded-md bg-gradient-to-br from-primary-700 via-accent to-primary-500 p-px',
          className
        )}
        {...props}
      >
        <div className="h-full rounded-[calc(0.5rem-1px)] bg-dark-800 p-4 sm:p-6 md:p-8">
          {body}
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'rounded-md border p-4 sm:p-6 md:p-8',
        'bg-dark-800/80',
        resolvedVariant === 'featured' ? 'border-accent/50' : 'border-border',
        className
      )}
      {...props}
    >
      {body}
    </div>
  );
};

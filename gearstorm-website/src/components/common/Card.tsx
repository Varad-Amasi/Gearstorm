import { clsx } from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'standard' | 'featured' | 'gradient';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: CardVariant;
  featured?: boolean;
  /** Adds lift-on-hover motion for cards that link somewhere. */
  interactive?: boolean;
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
  interactive = false,
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
            'mb-2 font-heading text-xl font-bold',
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
          'rounded-lg bg-gradient-to-br from-primary via-accent to-primary p-px transition-transform duration-normal',
          interactive && 'hover:-translate-y-1 hover:shadow-purple',
          className
        )}
        {...props}
      >
        <div className="h-full rounded-[calc(0.5rem-1px)] bg-dark-800 p-6 md:p-8">
          {body}
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'rounded-lg border p-6 transition-all duration-normal md:p-8',
        'bg-dark-800',
        resolvedVariant === 'featured'
          ? 'border-primary/30 shadow-purple'
          : 'border-border shadow-md hover:border-primary/60 hover:shadow-lg',
        interactive && 'hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {body}
    </div>
  );
};

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
          'rounded-lg bg-gradient-to-br from-vivid-purple via-accent to-neon-orange p-px transition-transform duration-normal',
          interactive &&
            'hover:shadow-orange motion-safe:hover:-translate-y-1.5 lg:motion-safe:hover:rotate-1',
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
        'rounded-lg border p-4 transition-all duration-normal sm:p-6 md:p-8',
        'bg-dark-800/80 backdrop-blur-sm',
        resolvedVariant === 'featured'
          ? 'border-accent/40 shadow-magenta'
          : 'border-border shadow-md hover:border-neon-orange/70 hover:shadow-orange',
        interactive && 'motion-safe:hover:-translate-y-1.5',
        className
      )}
      {...props}
    >
      {body}
    </div>
  );
};

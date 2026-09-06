import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface CTASectionProps {
  title: string;
  description?: string;
  actions: ReactNode;
  className?: string;
}

/**
 * Closing call-to-action band, typically the last section on a page.
 */
export const CTASection = ({
  title,
  description,
  actions,
  className,
}: CTASectionProps): JSX.Element => (
  <section className={clsx('container-page py-16', className)}>
    <div className="relative overflow-hidden rounded-lg border border-neon-orange/30 bg-gradient-to-br from-dark-800 to-dark-900 p-6 text-left shadow-orange sm:p-8 md:p-12">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-6xl font-extrabold uppercase leading-none text-neon-orange/15 sm:text-7xl md:text-9xl"
      >
        GO
      </p>
      <h2 className="relative z-10 max-w-xl break-words font-display text-2xl font-extrabold uppercase leading-none tracking-tight sm:text-3xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="relative z-10 mt-3 max-w-md font-sans text-lg leading-snug text-text-muted">
          {description}
        </p>
      ) : null}
      <div className="relative z-10 mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {actions}
      </div>
    </div>
  </section>
);

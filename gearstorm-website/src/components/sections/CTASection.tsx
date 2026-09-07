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
    <div className="rounded-md border border-border bg-dark-800/80 p-6 text-left sm:p-8 md:p-10">
      <h2 className="max-w-xl font-heading text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-md font-sans text-lg leading-relaxed text-text-muted">
          {description}
        </p>
      ) : null}
      <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {actions}
      </div>
    </div>
  </section>
);

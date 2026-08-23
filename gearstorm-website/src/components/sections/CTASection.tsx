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
    <div className="rounded-lg border border-primary/30 bg-gradient-to-br from-dark-800 to-dark-900 p-8 text-center shadow-purple md:p-12">
      <h2 className="font-heading text-2xl font-bold md:text-3xl">{title}</h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-2xl text-text-muted">{description}</p>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
    </div>
  </section>
);

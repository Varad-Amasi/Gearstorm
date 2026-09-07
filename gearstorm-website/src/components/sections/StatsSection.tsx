import { clsx } from 'clsx';

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsSectionProps {
  stats: readonly StatItem[];
  title?: string;
  className?: string;
}

/**
 * Row of headline numbers. Overlaps the previous section on large screens.
 */
export const StatsSection = ({
  stats,
  title,
  className,
}: StatsSectionProps): JSX.Element => (
  <section
    className={clsx('container-page relative z-20 py-8 md:py-12', className)}
    aria-label={title ?? 'Event statistics'}
  >
    <dl className="grid grid-cols-2 gap-4 rounded-md border border-border bg-dark-800/80 p-5 sm:gap-6 sm:p-8 md:grid-cols-4">
      {/* Each cell reverses its visual order so the value reads first while the
          markup keeps the required dt-then-dd pairing. */}
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col text-center">
          <dt className="order-2 mt-1 font-subhead text-sm uppercase tracking-wide text-text-muted">
            {stat.label}
          </dt>
          <dd className="order-1 font-heading text-2xl text-text-light md:text-4xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

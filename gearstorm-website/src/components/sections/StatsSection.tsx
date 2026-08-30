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
 * Row of headline numbers. Values animate up from zero in Phase 4.
 */
export const StatsSection = ({
  stats,
  title,
  className,
}: StatsSectionProps): JSX.Element => (
  <section
    className={clsx('container-page py-12', className)}
    aria-label={title ?? 'Event statistics'}
  >
    <dl className="grid grid-cols-2 gap-6 rounded-lg border border-border bg-dark-800 p-8 md:grid-cols-4">
      {/* Each cell reverses its visual order so the value reads first while the
          markup keeps the required dt-then-dd pairing. */}
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col text-center">
          <dt className="order-2 mt-1 text-sm uppercase tracking-wide text-text-muted">
            {stat.label}
          </dt>
          <dd className="font-display order-1 text-3xl font-bold text-primary-500 md:text-4xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

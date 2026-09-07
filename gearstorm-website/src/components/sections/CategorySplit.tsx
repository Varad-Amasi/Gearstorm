import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { CATEGORIES } from '@/utils/competition';

export interface CategoryColumnProps {
  id: 'beginner' | 'advanced';
  /** Prefix so Home / Rules / Bot Specs do not share the same fragment ids. */
  idPrefix?: string;
  children: ReactNode;
}

const columnStyles = {
  beginner: 'border-accent/45',
  advanced: 'border-primary/45',
} as const;

/**
 * Side-by-side Beginner / Advanced panels used on Rules and Bot Specs.
 */
export const CategorySplit = ({
  beginner,
  advanced,
  idPrefix = '',
}: {
  beginner: ReactNode;
  advanced: ReactNode;
  idPrefix?: string;
}): JSX.Element => (
  <div className="grid items-stretch gap-6 lg:grid-cols-2">
    <CategoryColumn id="beginner" idPrefix={idPrefix}>
      {beginner}
    </CategoryColumn>
    <CategoryColumn id="advanced" idPrefix={idPrefix}>
      {advanced}
    </CategoryColumn>
  </div>
);

export const CategoryColumn = ({
  id,
  idPrefix = '',
  children,
}: CategoryColumnProps): JSX.Element => {
  const category = CATEGORIES[id];
  const sectionId = `${idPrefix}${id}`;
  const headingId = `${sectionId}-heading`;
  return (
    <section
      id={sectionId}
      className={clsx(
        'scroll-mt-24 rounded-xl border bg-dark-800/80 p-5 sm:p-6',
        columnStyles[id]
      )}
      aria-labelledby={headingId}
    >
      <Badge variant={id === 'beginner' ? 'accent' : 'primary'}>
        {category.name}
      </Badge>
      <h2
        id={headingId}
        className="mt-3 font-heading text-2xl font-bold tracking-tight"
      >
        {category.name}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {category.summary}
      </p>
      <div className="mt-5">{children}</div>
    </section>
  );
};

export const CategoryJump = ({
  idPrefix = '',
}: {
  idPrefix?: string;
}): JSX.Element => (
  <nav
    aria-label="Beginner and Advanced"
    className="flex flex-wrap gap-3 text-sm"
  >
    <Link
      to={{ hash: `${idPrefix}${CATEGORIES.beginner.id}` }}
      className="font-heading font-semibold text-accent underline-offset-4 hover:underline"
    >
      {CATEGORIES.beginner.name}
    </Link>
    <span className="text-text-subtle" aria-hidden="true">
      ·
    </span>
    <Link
      to={{ hash: `${idPrefix}${CATEGORIES.advanced.id}` }}
      className="font-heading font-semibold text-primary-500 underline-offset-4 hover:underline"
    >
      {CATEGORIES.advanced.name}
    </Link>
  </nav>
);

import type { SpecGroup } from '@/data/botSpecs';
import { Card } from '@/components/common/Card';

export interface SpecTableProps {
  group: SpecGroup;
}

/**
 * Spec card with a definition-list layout for bot limits.
 */
export const SpecTable = ({ group }: SpecTableProps): JSX.Element => (
  <Card title={group.title} description={group.description}>
    <dl className="mt-4 divide-y divide-border">
      {group.rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4"
        >
          <dt className="font-heading text-sm font-semibold text-accent">
            {row.label}
          </dt>
          <dd className="text-text-muted">{row.value}</dd>
        </div>
      ))}
    </dl>
  </Card>
);

import type { ReactNode } from 'react';
import { Card, type CardVariant } from '@/components/common/Card';

export interface FeatureCardProps {
  title: string;
  description: string;
  /** Decorative glyph or icon shown above the title. */
  icon?: ReactNode;
  variant?: CardVariant;
  className?: string;
}

/**
 * Card highlighting a single feature or event detail.
 */
export const FeatureCard = ({
  title,
  description,
  icon,
  variant = 'standard',
  className,
}: FeatureCardProps): JSX.Element => (
  <Card variant={variant} interactive {...(className ? { className } : {})}>
    {icon ? (
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary-500"
        aria-hidden="true"
      >
        {icon}
      </div>
    ) : null}
    <h3 className="mb-2 font-subhead text-xl font-semibold text-text-light">
      {title}
    </h3>
    <p className="text-text-muted">{description}</p>
  </Card>
);

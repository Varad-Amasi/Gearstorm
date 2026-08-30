import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export interface PageContainerProps {
  title: string;
  description?: string;
  eyebrow?: string;
  documentTitle?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Shared page scaffold: sets the document title and renders a consistent
 * heading block above page content.
 */
export const PageContainer = ({
  title,
  description,
  eyebrow,
  documentTitle,
  className,
  children,
}: PageContainerProps): JSX.Element => {
  useDocumentTitle(documentTitle ?? title, description);

  return (
    <div
      className={clsx(
        'container-page animate-fade-in py-12 md:py-16',
        className
      )}
    >
      <header className="max-w-3xl">
        {eyebrow ? (
          <p className="font-subhead mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl font-bold tracking-tight [letter-spacing:-0.02em] md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 font-sans text-lg leading-relaxed text-text-muted [line-height:1.8]">
            {description}
          </p>
        ) : null}
      </header>
      {children ? <div className="mt-10">{children}</div> : null}
    </div>
  );
};

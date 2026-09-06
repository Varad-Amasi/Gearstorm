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
      <header className="relative max-w-3xl">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -left-3 -top-8 hidden select-none font-display text-7xl font-extrabold uppercase leading-none text-vivid-purple/15 md:block"
        >
          {title.slice(0, 4)}
        </p>
        {eyebrow ? (
          <p className="relative z-10 mb-2 font-subhead text-sm font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="relative z-10 break-words font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-xl font-sans text-lg leading-snug text-text-muted">
            {description}
          </p>
        ) : null}
      </header>
      {children ? <div className="mt-10">{children}</div> : null}
    </div>
  );
};

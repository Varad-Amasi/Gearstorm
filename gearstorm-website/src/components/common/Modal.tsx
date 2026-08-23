import { clsx } from 'clsx';
import { useCallback, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/hooks/useFocusTrap';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: ModalSize;
  /** Optional footer area, typically action buttons. */
  footer?: ReactNode;
  children?: ReactNode;
}

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-3xl',
};

/**
 * Accessible centered dialog rendered in a portal. Closes on the X button,
 * Escape, or a click on the backdrop, and traps focus while open.
 */
export const Modal = ({
  open,
  onClose,
  title,
  description,
  size = 'md',
  footer,
  children,
}: ModalProps): JSX.Element | null => {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const handleEscape = useCallback(() => {
    onClose();
  }, [onClose]);

  useFocusTrap(open, panelRef, handleEscape);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={clsx(
          'relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-lg border border-border bg-dark-800 shadow-xl',
          'animate-fade-in',
          SIZE_CLASSES[size]
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div>
            <h2
              id={titleId}
              className="font-heading text-xl font-bold text-text-light"
            >
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mt-1 text-sm text-text-muted">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="-m-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors duration-normal hover:bg-dark-900 hover:text-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        {children ? <div className="p-6">{children}</div> : null}

        {footer ? (
          <div className="flex flex-wrap justify-end gap-3 border-t border-border p-6">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
};

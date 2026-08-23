import { clsx } from 'clsx';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  useToastStore,
  type ToastItem,
  type ToastVariant,
} from '@/store/toastStore';

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  success: 'border-success/50 bg-dark-800 text-success',
  error: 'border-error/50 bg-dark-800 text-error',
  warning: 'border-warning/50 bg-dark-800 text-warning',
  info: 'border-info/50 bg-dark-800 text-info',
};

const VARIANT_ICONS: Record<ToastVariant, string> = {
  success: 'M4 10l4 4 8-8',
  error: 'M6 6l8 8M14 6l-8 8',
  warning: 'M10 5v6M10 14v.5',
  info: 'M10 9v6M10 6v.5',
};

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const Toast = ({ toast, onDismiss }: ToastProps): JSX.Element => {
  const { id, message, variant, duration } = toast;

  useEffect(() => {
    if (duration <= 0) {
      return;
    }
    const timer = window.setTimeout(() => {
      onDismiss(id);
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [id, duration, onDismiss]);

  return (
    <div
      className={clsx(
        'animate-slide-in-right pointer-events-auto flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg',
        VARIANT_CLASSES[variant]
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      >
        <path d={VARIANT_ICONS[variant]} />
      </svg>
      <p className="flex-1 text-sm text-text-light">{message}</p>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
        className="-m-1 shrink-0 rounded p-1 text-text-muted transition-colors duration-normal hover:text-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <svg
          width="16"
          height="16"
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
  );
};

/**
 * Renders the stack of active toasts. Mount once near the app root.
 */
export const ToastViewport = (): JSX.Element | null => {
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 right-4 z-toast flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>,
    document.body
  );
};

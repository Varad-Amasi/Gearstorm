import { useMemo } from 'react';
import { useToastStore, type ToastVariant } from '@/store/toastStore';

type ToastFn = (message: string, duration?: number) => string;

export interface ToastApi {
  success: ToastFn;
  error: ToastFn;
  warning: ToastFn;
  info: ToastFn;
}

export interface UseToastResult {
  toast: ToastApi;
  dismiss: (id: string) => void;
  clear: () => void;
}

/**
 * Imperative toast API.
 *
 * @example
 * const { toast } = useToast();
 * toast.success('Team registered!');
 */
export const useToast = (): UseToastResult => {
  const addToast = useToastStore((state) => state.addToast);
  const dismiss = useToastStore((state) => state.dismissToast);
  const clear = useToastStore((state) => state.clearToasts);

  const toast = useMemo<ToastApi>(() => {
    const push =
      (variant: ToastVariant): ToastFn =>
      (message, duration) =>
        addToast({
          message,
          variant,
          ...(duration === undefined ? {} : { duration }),
        });

    return {
      success: push('success'),
      error: push('error'),
      warning: push('warning'),
      info: push('info'),
    };
  }, [addToast]);

  return { toast, dismiss, clear };
};

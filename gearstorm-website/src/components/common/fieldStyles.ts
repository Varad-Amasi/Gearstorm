import { clsx } from 'clsx';

/**
 * Shared control styling for text inputs, selects, and textareas so every form
 * field renders with identical borders, focus rings, and disabled treatment.
 */
export const getFieldClasses = (hasError = false, className?: string): string =>
  clsx(
    // text-base (16px) avoids iOS Safari zooming the page on focus
    'w-full rounded-lg border bg-dark-900 px-4 py-2 text-base text-text-light',
    'placeholder:text-text-subtle',
    'transition-colors duration-normal',
    'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
    'disabled:cursor-not-allowed disabled:opacity-50',
    hasError ? 'border-error' : 'border-border',
    className
  );

/**
 * Resolves the `aria-describedby` target for a field's error or helper text.
 */
export const getFieldDescribedBy = (
  id: string,
  error?: string,
  helperText?: string
): string | undefined => {
  if (error) {
    return `${id}-error`;
  }
  return helperText ? `${id}-helper` : undefined;
};

import { clsx } from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-600 focus-visible:ring-accent',
  secondary:
    'bg-primary-700 text-white hover:bg-primary-800 focus-visible:ring-primary',
  ghost:
    'border border-border bg-dark-800/80 text-text-light hover:border-text-muted hover:bg-dark-800 focus-visible:ring-primary',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-3 py-2 text-sm',
  md: 'min-h-11 px-6 py-3 text-base',
  lg: 'min-h-12 px-8 py-4 text-lg',
};

/**
 * Builds the button class string so anchors and router links can share the
 * button appearance without rendering a `<button>` element.
 */
export const getButtonClasses = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string
): string =>
  clsx(
    'inline-flex items-center justify-center rounded-md font-subhead font-semibold',
    'transition-[color,background-color,border-color] duration-normal',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

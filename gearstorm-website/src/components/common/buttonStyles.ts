import { clsx } from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white shadow-magenta hover:bg-accent-600 focus-visible:ring-accent',
  secondary:
    'bg-neon-orange text-white shadow-orange hover:bg-[#ff703d] focus-visible:ring-neon-orange',
  ghost:
    'border border-white/40 bg-dark-800/80 text-white hover:border-neon-orange hover:bg-neon-orange/15 hover:text-white focus-visible:ring-vivid-purple',
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
    'inline-flex items-center justify-center rounded-lg font-subhead font-semibold',
    'transition-[color,background-color,border-color,box-shadow,transform] duration-normal',
    'motion-safe:hover:-translate-y-0.5',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

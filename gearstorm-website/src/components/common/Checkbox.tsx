import { clsx } from 'clsx';
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { getFieldDescribedBy } from './fieldStyles';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  id: string;
  label: ReactNode;
  error?: string;
  helperText?: string;
}

/**
 * Checkbox with an associated clickable label, error, and helper text.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, error, helperText, className, ...props }, ref) => (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={getFieldDescribedBy(id, error, helperText)}
          className={clsx(
            'mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border bg-dark-900',
            'accent-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-dark-950',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-error' : 'border-border',
            className
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className="cursor-pointer text-sm text-text-light peer-disabled:cursor-not-allowed"
        >
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
      {!error && helperText ? (
        <p id={`${id}-helper`} className="text-sm text-text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  )
);

Checkbox.displayName = 'Checkbox';

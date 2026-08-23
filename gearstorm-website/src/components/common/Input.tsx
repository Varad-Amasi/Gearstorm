import { clsx } from 'clsx';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { FormField } from './FormField';
import { getFieldClasses, getFieldDescribedBy } from './fieldStyles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
}

/**
 * Labeled text input with error and helper text support.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, helperText, className, required, ...props }, ref) => (
    <FormField
      id={id}
      label={label}
      {...(error ? { error } : {})}
      {...(helperText ? { helperText } : {})}
      required={required ?? false}
    >
      <input
        ref={ref}
        id={id}
        required={required ?? false}
        aria-invalid={error ? true : undefined}
        aria-describedby={getFieldDescribedBy(id, error, helperText)}
        className={getFieldClasses(Boolean(error), clsx('min-h-11', className))}
        {...props}
      />
    </FormField>
  )
);

Input.displayName = 'Input';

import { clsx } from 'clsx';
import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { FormField } from './FormField';
import { getFieldClasses, getFieldDescribedBy } from './fieldStyles';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
}

/**
 * Labeled multi-line text field with error and helper text support.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { id, label, error, helperText, className, required, rows = 4, ...props },
    ref
  ) => (
    <FormField
      id={id}
      label={label}
      {...(error ? { error } : {})}
      {...(helperText ? { helperText } : {})}
      required={required ?? false}
    >
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        required={required ?? false}
        aria-invalid={error ? true : undefined}
        aria-describedby={getFieldDescribedBy(id, error, helperText)}
        className={getFieldClasses(Boolean(error), clsx('resize-y', className))}
        {...props}
      />
    </FormField>
  )
);

Textarea.displayName = 'Textarea';

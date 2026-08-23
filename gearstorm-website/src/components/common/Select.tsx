import { clsx } from 'clsx';
import { forwardRef, type SelectHTMLAttributes } from 'react';
import { FormField } from './FormField';
import { getFieldClasses, getFieldDescribedBy } from './fieldStyles';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: readonly SelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
}

/**
 * Labeled dropdown built on the native `<select>` for full keyboard and
 * screen-reader support.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      options,
      placeholder,
      error,
      helperText,
      className,
      required,
      defaultValue,
      value,
      ...props
    },
    ref
  ) => (
    <FormField
      id={id}
      label={label}
      {...(error ? { error } : {})}
      {...(helperText ? { helperText } : {})}
      required={required ?? false}
    >
      <select
        ref={ref}
        id={id}
        required={required ?? false}
        aria-invalid={error ? true : undefined}
        aria-describedby={getFieldDescribedBy(id, error, helperText)}
        className={getFieldClasses(
          Boolean(error),
          clsx('min-h-11 cursor-pointer appearance-none pr-10', className)
        )}
        {...(value !== undefined ? { value } : {})}
        {...(value === undefined && defaultValue !== undefined
          ? { defaultValue }
          : {})}
        {...(value === undefined && defaultValue === undefined && placeholder
          ? { defaultValue: '' }
          : {})}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled ?? false}
          >
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  )
);

Select.displayName = 'Select';

import type { ReactNode } from 'react';

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * Wraps a form control with its label, error message, and helper text so every
 * field shares the same layout and accessibility wiring.
 */
export const FormField = ({
  id,
  label,
  error,
  helperText,
  required = false,
  children,
}: FormFieldProps): JSX.Element => (
  <div className="flex w-full flex-col gap-1.5">
    <label
      htmlFor={id}
      className="font-subhead text-sm font-semibold uppercase tracking-wide text-text-light"
    >
      {label}
      {required ? (
        <span className="ml-1 text-error" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
    {children}
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
);

import { clsx } from 'clsx';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Controller, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import {
  emptyMember,
  type RegistrationFormValues,
} from '@/schemas/registrationSchema';
import { COMPETITION } from '@/utils/competition';

export interface TeamMemberFieldsProps {
  control: Control<RegistrationFormValues>;
  register: UseFormRegister<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
}

const ROLE_OPTIONS = [
  { value: 'Lead', label: 'Lead' },
  { value: 'Member', label: 'Member' },
] as const;

/**
 * Dynamic team-member field set for registration (3–5 members).
 */
export const TeamMemberFields = ({
  control,
  register,
  errors,
}: TeamMemberFieldsProps): JSX.Element => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  const membersError =
    typeof errors.members?.message === 'string'
      ? errors.members.message
      : typeof errors.members?.root?.message === 'string'
        ? errors.members.root.message
        : undefined;

  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="font-heading text-lg font-semibold text-text-light">
        Team members
      </legend>
      <p className="text-sm text-text-muted">
        Add {COMPETITION.teamSizeMin}–{COMPETITION.teamSizeMax} members. Exactly
        one must be the Lead.
      </p>

      {membersError ? (
        <p className="text-sm text-error" role="alert">
          {membersError}
        </p>
      ) : null}

      {fields.map((field, index) => {
        const memberErrors = errors.members?.[index];
        return (
          <div
            key={field.id}
            className={clsx(
              'rounded-lg border border-border bg-dark-900/40 p-4',
              'grid gap-4 md:grid-cols-2'
            )}
          >
            <div className="flex items-center justify-between gap-3 md:col-span-2">
              <p className="font-heading text-sm font-semibold text-accent">
                Member {index + 1}
              </p>
              {fields.length > COMPETITION.teamSizeMin ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Remove
                </Button>
              ) : null}
            </div>
            <Input
              id={`member-${index}-name`}
              label="Name"
              required
              error={memberErrors?.name?.message}
              {...register(`members.${index}.name`)}
            />
            <Input
              id={`member-${index}-email`}
              label="Email"
              type="email"
              required
              error={memberErrors?.email?.message}
              {...register(`members.${index}.email`)}
            />
            <Input
              id={`member-${index}-phone`}
              label="Phone"
              type="tel"
              required
              error={memberErrors?.phone?.message}
              {...register(`members.${index}.phone`)}
            />
            <Controller
              control={control}
              name={`members.${index}.role`}
              render={({ field: roleField }) => (
                <Select
                  id={`member-${index}-role`}
                  label="Role"
                  options={ROLE_OPTIONS}
                  required
                  value={roleField.value}
                  onChange={roleField.onChange}
                  onBlur={roleField.onBlur}
                  name={roleField.name}
                  ref={roleField.ref}
                  error={memberErrors?.role?.message}
                />
              )}
            />
          </div>
        );
      })}

      {fields.length < COMPETITION.teamSizeMax ? (
        <div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              append(emptyMember());
            }}
          >
            Add member
          </Button>
        </div>
      ) : null}
    </fieldset>
  );
};

import { clsx } from 'clsx';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Controller, useFieldArray } from 'react-hook-form';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import {
  emptyMember,
  type RegistrationFormValues,
  type RegistrationPayload,
} from '@/schemas/registrationSchema';
import { ACADEMIC_YEARS, COMPETITION } from '@/utils/competition';

export interface TeamMemberFieldsProps {
  control: Control<RegistrationFormValues, unknown, RegistrationPayload>;
  register: UseFormRegister<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
}

const YEAR_OPTIONS = ACADEMIC_YEARS.map((year) => ({
  value: year,
  label: year,
}));

/**
 * Dynamic team-member field set for registration (2–4 members).
 * Member 1 is always Lead and cannot be changed; others are Members.
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
        Add {COMPETITION.teamSizeMin}–{COMPETITION.teamSizeMax} members. The
        first person is the Lead (fixed); everyone else is a Member.
      </p>

      {membersError ? (
        <p className="text-sm text-error" role="alert">
          {membersError}
        </p>
      ) : null}

      {fields.map((field, index) => {
        const memberErrors = errors.members?.[index];
        const isLead = index === 0;
        return (
          <div
            key={field.id}
            className={clsx(
              'rounded-lg border border-border bg-dark-900/40 p-4',
              'grid gap-4 md:grid-cols-2'
            )}
          >
            <div className="flex items-center justify-between gap-3 md:col-span-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-heading text-sm font-semibold text-accent">
                  {isLead ? 'Team Lead' : `Member ${index + 1}`}
                </p>
                <Badge variant={isLead ? 'info' : 'primary'}>
                  {isLead ? 'Lead' : 'Member'}
                </Badge>
              </div>
              {!isLead && fields.length > COMPETITION.teamSizeMin ? (
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
              name={`members.${index}.academicYear`}
              render={({ field: yearField }) => (
                <Select
                  id={`member-${index}-year`}
                  label="Academic year"
                  required
                  placeholder="Select year"
                  options={YEAR_OPTIONS}
                  value={yearField.value}
                  onChange={yearField.onChange}
                  onBlur={yearField.onBlur}
                  name={yearField.name}
                  ref={yearField.ref}
                  error={memberErrors?.academicYear?.message}
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
              append(
                emptyMember() as RegistrationFormValues['members'][number]
              );
            }}
          >
            Add member
          </Button>
        </div>
      ) : null}
    </fieldset>
  );
};

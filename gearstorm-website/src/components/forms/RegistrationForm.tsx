import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from '@/components/common/Alert';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { TeamMemberFields } from '@/components/forms/TeamMemberFields';
import { useToast } from '@/hooks/useToast';
import { getErrorMessage } from '@/services/apiClient';
import { submitTeamRegistration } from '@/services/registrationService';
import {
  emptyMember,
  registrationSchema,
  type RegistrationFormValues,
} from '@/schemas/registrationSchema';

const defaultValues = (): RegistrationFormValues => ({
  teamName: '',
  college: '',
  contactEmail: '',
  contactPhone: '',
  members: [{ ...emptyMember(), role: 'Lead' }, emptyMember(), emptyMember()],
});

/**
 * Team registration form — validates with Zod and POSTs to `/api/teams`.
 */
export const RegistrationForm = (): JSX.Element => {
  const { toast } = useToast();
  const [teamId, setTeamId] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: defaultValues(),
  });

  const onSubmit = async (values: RegistrationFormValues): Promise<void> => {
    try {
      const result = await submitTeamRegistration(values);
      setTeamId(result.team.id);
      toast.success('Team registered successfully');
      reset(defaultValues());
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      noValidate
    >
      {teamId ? (
        <Alert
          variant="success"
          title="Registration received"
          onDismiss={() => {
            setTeamId(null);
          }}
        >
          Your team is saved. Reference ID:{' '}
          <code className="text-text-light">{teamId}</code>. Organisers will
          confirm by email once SMTP is configured.
        </Alert>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-text-muted">Payment status</p>
        <Badge variant="warning">Pending — collected offline for now</Badge>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          id="team-name"
          label="Team name"
          required
          error={errors.teamName?.message}
          {...register('teamName')}
        />
        <Input
          id="college"
          label="College / Institution"
          required
          error={errors.college?.message}
          {...register('college')}
        />
        <Input
          id="contact-email"
          label="Primary contact email"
          type="email"
          autoComplete="email"
          required
          error={errors.contactEmail?.message}
          {...register('contactEmail')}
        />
        <Input
          id="contact-phone"
          label="Primary contact phone"
          type="tel"
          autoComplete="tel"
          required
          error={errors.contactPhone?.message}
          {...register('contactPhone')}
        />
      </div>

      <TeamMemberFields control={control} register={register} errors={errors} />

      <div>
        <Button type="submit" loading={isSubmitting}>
          Submit registration
        </Button>
      </div>
    </form>
  );
};

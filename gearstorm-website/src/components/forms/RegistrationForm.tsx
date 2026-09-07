import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from '@/components/common/Alert';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { PaymentDetails } from '@/components/forms/PaymentDetails';
import { TeamMemberFields } from '@/components/forms/TeamMemberFields';
import { useToast } from '@/hooks/useToast';
import { getErrorMessage } from '@/services/apiClient';
import { submitTeamRegistration } from '@/services/registrationService';
import {
  emptyLead,
  emptyMember,
  registrationSchema,
  type RegistrationFormValues,
  type RegistrationPayload,
} from '@/schemas/registrationSchema';
import { COLLEGE_CHOICES, PAYMENT } from '@/utils/competition';

type RegistrationFormDefaults = Omit<RegistrationFormValues, 'paymentProof'> & {
  paymentProof: undefined;
};

const defaultValues = (): RegistrationFormDefaults => ({
  teamName: '',
  collegeChoice: '',
  collegeOther: '',
  paymentUtr: '',
  paymentProof: undefined,
  members: [emptyLead(), emptyMember()],
});

/**
 * Team registration form — validates with Zod and POSTs multipart to `/api/teams`.
 */
export const RegistrationForm = (): JSX.Element => {
  const { toast } = useToast();
  const [teamId, setTeamId] = useState<string | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues, unknown, RegistrationPayload>({
    resolver: zodResolver(registrationSchema),
    defaultValues: defaultValues() as unknown as RegistrationFormValues,
  });

  const paymentProof = watch('paymentProof');
  const collegeChoice = watch('collegeChoice');

  useEffect(() => {
    if (!(paymentProof instanceof File)) {
      setProofPreview((current) => {
        if (current) {
          URL.revokeObjectURL(current);
        }
        return null;
      });
      return;
    }

    const url = URL.createObjectURL(paymentProof);
    setProofPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return url;
    });

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [paymentProof]);

  const onSubmit = async (values: RegistrationPayload): Promise<void> => {
    try {
      const result = await submitTeamRegistration(values);
      setTeamId(result.team.id);
      toast.success('Team registered successfully');
      reset(defaultValues() as unknown as RegistrationFormValues);
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
          verify your UPI payment and confirm your entry.
        </Alert>
      ) : null}

      <div>
        <h2 className="font-heading text-xl font-bold text-text-light">
          Team details
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Use a clear team name — it appears on certificates and communications.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-text-muted">Payment status on submit</p>
        <Badge variant="warning">Pending verification</Badge>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          id="team-name"
          label="Team name"
          required
          error={errors.teamName?.message}
          {...register('teamName')}
        />
        <Controller
          control={control}
          name="collegeChoice"
          render={({ field }) => (
            <Select
              id="college-choice"
              label="College / Institution"
              required
              placeholder="Select college"
              options={[...COLLEGE_CHOICES]}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              error={errors.collegeChoice?.message}
            />
          )}
        />
        {collegeChoice === 'Other' ? (
          <div className="md:col-span-2">
            <Input
              id="college-other"
              label="College name"
              required
              helperText="Enter the full name of your college"
              error={errors.collegeOther?.message}
              {...register('collegeOther')}
            />
          </div>
        ) : null}
      </div>

      <TeamMemberFields control={control} register={register} errors={errors} />

      <fieldset className="flex flex-col gap-4 rounded-lg border border-border bg-dark-900/40 p-4">
        <legend className="px-1 font-heading text-lg font-semibold text-text-light">
          Payment
        </legend>
        <PaymentDetails />
        <p className="text-sm text-text-muted">
          After paying to{' '}
          <span className="font-mono text-text-light">{PAYMENT.upiId}</span>,
          enter the UTR and upload a payment screenshot.
        </p>
        <Input
          id="payment-utr"
          label="UTR / UPI transaction ID"
          required
          helperText="Found on your UPI payment success screen or bank SMS"
          error={errors.paymentUtr?.message}
          {...register('paymentUtr')}
        />
        <Controller
          control={control}
          name="paymentProof"
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <div className="flex flex-col gap-3">
              <Input
                id="payment-proof"
                label="Payment proof screenshot"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
                required
                helperText="JPEG, PNG, WebP, or GIF — max 5 MB"
                error={errors.paymentProof?.message}
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  onChange(file);
                }}
              />
              {proofPreview ? (
                <img
                  src={proofPreview}
                  alt="Selected payment proof preview"
                  className="max-h-48 w-auto max-w-full rounded-lg border border-border object-contain"
                />
              ) : null}
            </div>
          )}
        />
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full sm:w-auto"
        >
          Submit registration
        </Button>
        <p className="text-xs text-text-subtle">
          By submitting you agree to the published competition rules.
        </p>
      </div>
    </form>
  );
};

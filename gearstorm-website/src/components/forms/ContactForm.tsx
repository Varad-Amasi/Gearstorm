import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from '@/components/common/Alert';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { useToast } from '@/hooks/useToast';
import { contactSchema, type ContactFormValues } from '@/schemas/contactSchema';
import { getErrorMessage } from '@/services/apiClient';
import { submitContactMessage } from '@/services/contactService';

/**
 * Contact form with Zod validation. Submits to `/api/contact`.
 */
export const ContactForm = (): JSX.Element => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues): Promise<void> => {
    try {
      await submitContactMessage(values);
      setSubmitted(true);
      toast.success('Message sent');
      reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      noValidate
    >
      {submitted ? (
        <Alert
          variant="success"
          title="Message received"
          onDismiss={() => {
            setSubmitted(false);
          }}
        >
          Thanks for reaching out. The organising team will reply by email.
        </Alert>
      ) : null}

      <Input
        id="contact-name"
        label="Full name"
        autoComplete="name"
        required
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        id="contact-email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        id="contact-subject"
        label="Subject"
        required
        error={errors.subject?.message}
        {...register('subject')}
      />
      <Textarea
        id="contact-message"
        label="Message"
        rows={5}
        required
        error={errors.message?.message}
        {...register('message')}
      />
      <div>
        <Button type="submit" loading={isSubmitting}>
          Send message
        </Button>
      </div>
    </form>
  );
};

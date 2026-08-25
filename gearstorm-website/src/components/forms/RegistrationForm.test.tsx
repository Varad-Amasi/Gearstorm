import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RegistrationForm } from '@/components/forms/RegistrationForm';

vi.mock('@/services/registrationService', () => ({
  submitTeamRegistration: vi.fn(),
}));

vi.mock('@/hooks/useToast', () => ({
  useToast: () => ({
    toast: {
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
    },
    dismiss: vi.fn(),
    clear: vi.fn(),
  }),
}));

import { submitTeamRegistration } from '@/services/registrationService';

describe('RegistrationForm', () => {
  beforeEach(() => {
    vi.mocked(submitTeamRegistration).mockReset();
  });

  it('blocks submit when required team fields are empty', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);

    await user.click(
      screen.getByRole('button', { name: /submit registration/i })
    );

    expect(await screen.findAllByRole('alert')).not.toHaveLength(0);
    expect(submitTeamRegistration).not.toHaveBeenCalled();
  });

  it('submits a valid team payload', async () => {
    const user = userEvent.setup();
    vi.mocked(submitTeamRegistration).mockResolvedValue({
      team: {
        id: 'team-1',
        name: 'Circuit Breakers',
        college: 'KLS GIT',
        paymentStatus: 'pending',
        registrationDate: new Date().toISOString(),
        memberCount: 3,
      },
      emailQueued: false,
      message: 'ok',
    });

    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/team name/i), 'Circuit Breakers');
    await user.type(
      screen.getByLabelText(/college \/ institution/i),
      'KLS GIT'
    );
    await user.type(
      screen.getByLabelText(/primary contact email/i),
      'lead@example.com'
    );
    await user.type(
      screen.getByLabelText(/primary contact phone/i),
      '+91 90000 11111'
    );

    const nameInputs = screen.getAllByLabelText(/^name/i);
    const emailInputs = screen.getAllByLabelText(/^email/i);
    const phoneInputs = screen.getAllByLabelText(/^phone/i);

    const members = [
      {
        name: 'Lead One',
        email: 'lead@example.com',
        phone: '+91 90000 11111',
      },
      {
        name: 'Member Two',
        email: 'm2@example.com',
        phone: '+91 90000 11112',
      },
      {
        name: 'Member Three',
        email: 'm3@example.com',
        phone: '+91 90000 11113',
      },
    ];

    for (let i = 0; i < members.length; i += 1) {
      const member = members[i];
      if (!member) {
        continue;
      }
      await user.type(nameInputs[i]!, member.name);
      await user.type(emailInputs[i]!, member.email);
      await user.type(phoneInputs[i]!, member.phone);
    }

    await user.click(
      screen.getByRole('button', { name: /submit registration/i })
    );

    await waitFor(() => {
      expect(submitTeamRegistration).toHaveBeenCalledTimes(1);
    });
    expect(
      await screen.findByText(/registration received/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/team-1/i)).toBeInTheDocument();
  });
});

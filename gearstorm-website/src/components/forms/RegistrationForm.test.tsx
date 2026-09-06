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
    await user.selectOptions(
      screen.getByLabelText(/college \/ institution/i),
      'KLS GIT'
    );

    const nameInputs = screen.getAllByLabelText(/^name/i);
    const emailInputs = screen.getAllByLabelText(/^email/i);
    const phoneInputs = screen.getAllByLabelText(/^phone/i);
    const yearInputs = screen.getAllByLabelText(/academic year/i);

    const members = [
      {
        name: 'Lead One',
        email: 'lead@example.com',
        phone: '+91 90000 11111',
        year: '4th Year',
      },
      {
        name: 'Member Two',
        email: 'm2@example.com',
        phone: '+91 90000 11112',
        year: '3rd Year',
      },
      {
        name: 'Member Three',
        email: 'm3@example.com',
        phone: '+91 90000 11113',
        year: '2nd Year',
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
      await user.selectOptions(yearInputs[i]!, member.year);
    }

    expect(screen.getByText('Team Lead')).toBeInTheDocument();
    expect(screen.getAllByText('Lead').length).toBeGreaterThan(0);

    await user.type(
      screen.getByLabelText(/utr \/ upi transaction id/i),
      'AXIS1234567890'
    );
    const proof = new File(['fake-proof'], 'upi-proof.jpg', {
      type: 'image/jpeg',
    });
    await user.upload(
      screen.getByLabelText(/payment proof screenshot/i),
      proof
    );

    await user.click(
      screen.getByRole('button', { name: /submit registration/i })
    );

    await waitFor(() => {
      expect(submitTeamRegistration).toHaveBeenCalledTimes(1);
    });
    expect(submitTeamRegistration).toHaveBeenCalledWith(
      expect.objectContaining({
        teamName: 'Circuit Breakers',
        college: 'KLS GIT',
        paymentUtr: 'AXIS1234567890',
        paymentProof: expect.any(File),
        members: expect.arrayContaining([
          expect.objectContaining({
            name: 'Lead One',
            academicYear: '4th Year',
            role: 'Lead',
          }),
        ]),
      })
    );
    expect(
      await screen.findByText(/registration received/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/team-1/i)).toBeInTheDocument();
  });
});

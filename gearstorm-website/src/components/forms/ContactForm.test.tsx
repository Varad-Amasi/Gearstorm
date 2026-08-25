import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from '@/components/forms/ContactForm';

vi.mock('@/services/contactService', () => ({
  submitContactMessage: vi.fn(),
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

import { submitContactMessage } from '@/services/contactService';

const wrap = (ui: ReactNode): JSX.Element => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={client}>{ui}</QueryClientProvider>;
};

describe('ContactForm', () => {
  beforeEach(() => {
    vi.mocked(submitContactMessage).mockReset();
  });

  it('shows validation errors for empty submit', async () => {
    const user = userEvent.setup();
    render(wrap(<ContactForm />));

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findAllByRole('alert')).not.toHaveLength(0);
    expect(submitContactMessage).not.toHaveBeenCalled();
  });

  it('submits valid data and shows success', async () => {
    const user = userEvent.setup();
    vi.mocked(submitContactMessage).mockResolvedValue({
      id: 'c1',
      message: 'ok',
    });

    render(wrap(<ContactForm />));

    await user.type(screen.getByLabelText(/full name/i), 'Asha Kulkarni');
    await user.type(screen.getByLabelText(/^email/i), 'asha@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Bot specs');
    await user.type(
      screen.getByLabelText(/message/i),
      'Please clarify the maximum weight limit for inspection day.'
    );
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(submitContactMessage).toHaveBeenCalledTimes(1);
    });
    expect(await screen.findByText(/message received/i)).toBeInTheDocument();
  });
});

import { describe, expect, it } from 'vitest';
import { ApiError, getErrorMessage } from '@/services/apiClient';

describe('getErrorMessage', () => {
  it('returns ApiError message', () => {
    expect(getErrorMessage(new ApiError('Boom'))).toBe('Boom');
  });

  it('appends flattened field errors when present', () => {
    const error = new ApiError('Validation failed', 400, {
      fieldErrors: { email: ['Enter a valid email'] },
      formErrors: [],
    });
    expect(getErrorMessage(error)).toContain('email: Enter a valid email');
  });

  it('falls back for unknown values', () => {
    expect(getErrorMessage(null)).toBe('Something went wrong');
  });
});

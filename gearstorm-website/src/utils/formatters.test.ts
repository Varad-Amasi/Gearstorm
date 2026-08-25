import { describe, expect, it } from 'vitest';
import { formatRaceTime } from '@/utils/formatters';

describe('formatRaceTime', () => {
  it('formats zero as 0:00.0', () => {
    expect(formatRaceTime(0)).toBe('0:00.0');
  });

  it('formats whole seconds', () => {
    expect(formatRaceTime(65_000)).toBe('1:05.0');
  });

  it('formats fractional seconds', () => {
    expect(formatRaceTime(92_400)).toBe('1:32.4');
  });

  it('clamps negative values to zero', () => {
    expect(formatRaceTime(-500)).toBe('0:00.0');
  });

  it('handles multi-minute durations', () => {
    expect(formatRaceTime(125_500)).toBe('2:05.5');
  });
});

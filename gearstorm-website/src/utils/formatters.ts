/**
 * Formats a millisecond duration as `m:ss.s` for leaderboard display.
 */
export const formatRaceTime = (milliseconds: number): string => {
  const totalSeconds = Math.max(0, milliseconds) / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  return `${minutes}:${seconds.toFixed(1).padStart(4, '0')}`;
};

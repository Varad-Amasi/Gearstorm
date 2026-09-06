type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/**
 * Cheap client hint for skipping extra WebGL / full-screen effects.
 * Chrome exposes `deviceMemory`; other browsers fall back to cores / save-data.
 */
export const isLowPowerClient = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData) {
    return true;
  }
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) {
    return true;
  }
  if (nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 2) {
    return true;
  }
  return false;
};

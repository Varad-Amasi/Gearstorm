/**
 * Detects WebGL support so the 3D hero can fall back to a static visual on
 * browsers or devices without it.
 */
export const isWebGLAvailable = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

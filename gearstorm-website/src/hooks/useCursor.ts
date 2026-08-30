import { useEffect, useRef, useState } from 'react';

export type CursorMode = 'default' | 'hover' | 'text' | 'focus';

export interface CursorState {
  x: number;
  y: number;
  mode: CursorMode;
  visible: boolean;
  enabled: boolean;
}

const INTERACTIVE =
  'a, button, [role="button"], summary, label, .gs-cursor-hover, input[type="submit"], input[type="button"]';
const TEXTISH =
  'p, h1, h2, h3, h4, h5, h6, span, li, td, th, label, [contenteditable="true"]';
const FOCUSABLE =
  'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, select';

const isTouchDevice = (): boolean =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(pointer: coarse)').matches);

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Tracks pointer position and hover/focus modes for the custom cursor.
 * Disabled on touch devices and when reduced-motion is preferred.
 */
export const useCursor = (): CursorState & {
  ripples: Array<{ id: number; x: number; y: number }>;
} => {
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    mode: 'default',
    visible: false,
    enabled: false,
  });
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const rafRef = useRef(0);
  const pending = useRef({ x: 0, y: 0 });
  const modeRef = useRef<CursorMode>('default');
  const rippleId = useRef(0);

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) {
      setState((current) => ({ ...current, enabled: false }));
      return;
    }

    setState((current) => ({ ...current, enabled: true }));
    document.documentElement.classList.add('gs-cursor-active');

    const flush = (): void => {
      rafRef.current = 0;
      setState((current) => ({
        ...current,
        x: pending.current.x,
        y: pending.current.y,
        mode: modeRef.current,
        visible: true,
      }));
    };

    const onMove = (event: MouseEvent): void => {
      pending.current = { x: event.clientX, y: event.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(flush);
      }
    };

    const resolveMode = (target: EventTarget | null): CursorMode => {
      if (!(target instanceof Element)) {
        return 'default';
      }
      if (target.closest(FOCUSABLE)) {
        return 'focus';
      }
      if (target.closest(INTERACTIVE)) {
        return 'hover';
      }
      if (target.closest(TEXTISH)) {
        return 'text';
      }
      return 'default';
    };

    const onOver = (event: MouseEvent): void => {
      modeRef.current = resolveMode(event.target);
    };

    const onDown = (event: MouseEvent): void => {
      const id = (rippleId.current += 1);
      const x = event.clientX;
      const y = event.clientY;
      setRipples((current) => [...current.slice(-4), { id, x, y }]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, 240);
    };

    const onLeave = (): void => {
      setState((current) => ({ ...current, visible: false }));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('gs-cursor-active');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { ...state, ripples };
};

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export type CursorMode = 'default' | 'hover' | 'text' | 'focus';

export interface CursorState {
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

const LERP_CURSOR = 0.28;
const LERP_TRAIL = 0.14;

const isTouchDevice = (): boolean =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(pointer: coarse)').matches);

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Tracks pointer position and hover/focus modes for the custom cursor.
 * Position is applied on the DOM node (lerp) so React does not re-render
 * every frame. Disabled on touch devices and when reduced-motion is preferred.
 */
export const useCursor = (): CursorState & {
  ripples: Array<{ id: number; x: number; y: number }>;
  cursorRef: RefObject<HTMLDivElement>;
  trailRef: RefObject<HTMLDivElement>;
} => {
  const [state, setState] = useState<CursorState>({
    mode: 'default',
    visible: false,
    enabled: false,
  });
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const target = useRef({ x: -80, y: -80 });
  const cursorPos = useRef({ x: -80, y: -80 });
  const trailPos = useRef({ x: -80, y: -80 });
  const modeRef = useRef<CursorMode>('default');
  const rippleId = useRef(0);

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) {
      setState((current) => ({ ...current, enabled: false }));
      return;
    }

    setState((current) => ({ ...current, enabled: true }));
    document.documentElement.classList.add('gs-cursor-active');

    const tick = (): void => {
      cursorPos.current.x +=
        (target.current.x - cursorPos.current.x) * LERP_CURSOR;
      cursorPos.current.y +=
        (target.current.y - cursorPos.current.y) * LERP_CURSOR;
      trailPos.current.x +=
        (target.current.x - trailPos.current.x) * LERP_TRAIL;
      trailPos.current.y +=
        (target.current.y - trailPos.current.y) * LERP_TRAIL;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onMove = (event: MouseEvent): void => {
      target.current = { x: event.clientX, y: event.clientY };
      setState((current) =>
        current.visible ? current : { ...current, visible: true }
      );
    };

    const resolveMode = (targetEl: EventTarget | null): CursorMode => {
      if (!(targetEl instanceof Element)) {
        return 'default';
      }
      if (targetEl.closest(FOCUSABLE)) {
        return 'focus';
      }
      if (targetEl.closest(INTERACTIVE)) {
        return 'hover';
      }
      if (targetEl.closest(TEXTISH)) {
        return 'text';
      }
      return 'default';
    };

    const onOver = (event: MouseEvent): void => {
      const next = resolveMode(event.target);
      if (modeRef.current === next) {
        return;
      }
      modeRef.current = next;
      setState((current) => ({ ...current, mode: next }));
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

  return { ...state, ripples, cursorRef, trailRef };
};

import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface FocusTrapOptions {
  /** Locks body scroll while the trap is active. */
  lockScroll?: boolean;
}

/**
 * Traps keyboard focus inside a container while `active` is true.
 *
 * Handles initial focus, Tab cycling, Escape, optional body scroll lock, and
 * restores focus to the previously focused element on deactivate.
 */
export const useFocusTrap = (
  active: boolean,
  containerRef: RefObject<HTMLElement>,
  onEscape?: () => void,
  options: FocusTrapOptions = {}
): void => {
  const { lockScroll = true } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    if (lockScroll) {
      document.body.style.overflow = 'hidden';
    }

    const getFocusable = (): HTMLElement[] =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && onEscape) {
        event.preventDefault();
        onEscape();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const items = getFocusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (lockScroll) {
        document.body.style.overflow = previousOverflow;
      }
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [active, containerRef, onEscape, lockScroll]);
};

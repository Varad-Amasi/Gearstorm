import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { useCursor } from '@/hooks/useCursor';
import '@/styles/cursor.css';

/**
 * Magenta ring cursor with hover expand, text mode, and click ripples.
 * Renders nothing on touch devices or when reduced-motion is preferred.
 */
export const CustomCursor = (): JSX.Element | null => {
  const { x, y, mode, visible, enabled, ripples } = useCursor();

  if (!enabled) {
    return null;
  }

  return (
    <div className="gs-cursor-root" aria-hidden="true">
      <div
        className={clsx(
          'gs-cursor',
          mode === 'hover' && 'gs-cursor--hover',
          mode === 'text' && 'gs-cursor--text',
          mode === 'focus' && 'gs-cursor--focus',
          !visible && 'opacity-0'
        )}
        style={{
          transform: `translate3d(${x}px, ${y}px, 0)`,
        }}
      >
        <span className="gs-cursor-dot" />
      </div>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="gs-cursor-ripple"
          style={
            {
              '--gs-x': `${ripple.x}px`,
              '--gs-y': `${ripple.y}px`,
              transform: `translate3d(${ripple.x}px, ${ripple.y}px, 0)`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};

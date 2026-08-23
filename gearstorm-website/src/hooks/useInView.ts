import { useEffect, useState, type RefObject } from 'react';

/**
 * Reports whether an element is intersecting the viewport.
 *
 * Starts as `true` so content renders on first paint before the observer
 * reports, then tracks visibility so expensive work (e.g. a WebGL render loop)
 * can pause while the element is off-screen.
 */
export const useInView = (
  ref: RefObject<Element>,
  rootMargin = '200px'
): boolean => {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setInView(entry.isIntersecting);
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return inView;
};

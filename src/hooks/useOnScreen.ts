import { MutableRefObject, useEffect, useState } from 'react';

interface ObserverOptions<T> {
  ref: T | null;
  options: {
    init?: boolean;
    once?: boolean;
    root?: Document | Element;
    rootMargin?: string;
    threshold?: number;
  };
}

export const useOnScreen = <T extends Element>(
  ref: ObserverOptions<MutableRefObject<T>>['ref'],
  options: ObserverOptions<MutableRefObject<HTMLElement>>['options'],
): boolean => {
  const { init = true, once = false, root = null, rootMargin = '0px', threshold = 0 } = options;
  const [isIntersecting, setIntersecting] = useState(init);

  useEffect(() => {
    const { current } = ref;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);

        /**
         * trigger IntersectionObserver only once
         */
        if (entry.isIntersecting && once) {
          observer.unobserve(current);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      observer.unobserve(current);
    };
  }, [ref, once, rootMargin, root, threshold]);

  return isIntersecting;
};

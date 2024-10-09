import {
  DetailedHTMLFactory,
  HTMLAttributes,
  MutableRefObject,
  RefObject,
  useCallback,
  useRef,
} from 'react';

interface DOMRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  rigth?: number;
  bottom: number;
  left: number;
}

interface ScrollProps<T> {
  timing: (t: number) => number;
  duration: number;
  focus: boolean;
  drawAnimate?: (progress: number) => number;
  draw?: ({
    domRect,
    scrollValue,
  }?: {
    domRect?: DOMRect;
    scrollValue?: number;
  }) => (progress: number) => number;
  current?: T | null;
  callback: () => void;
}

const animations = {
  easeOut: (t: number) => 1 + --t * t * t * t * t,
};

const defaultOptions: ScrollProps<RefObject<HTMLElement>> = {
  /**
   * @see https://gist.github.com/gre/1650294
   * @see https://easings.net/en
   */
  timing: animations.easeOut,
  duration: 1000,
  focus: false,
  draw:
    ({ domRect, scrollValue }) =>
    (progress) => {
      const { top } = domRect;

      window.scrollTo(0, scrollValue + (top - window.innerHeight / 3) * progress);

      return scrollValue + Math.abs(top - window.innerHeight / 3) * progress;
    },
  callback: () => {},
};

function animate<T extends HTMLElement>(options: ScrollProps<T>) {
  const { timing, duration, drawAnimate, current, focus, callback } = options;

  const start = window.performance.now();

  const anim = (time) => {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timing(timeFraction);

    const d = drawAnimate(Math.abs(progress));

    if (timeFraction < 1) {
      if (Math.ceil(d) > 1) {
        window.requestAnimationFrame(anim);
      }
    }

    if (timeFraction >= 1) {
      callback();
      if (focus) {
        current.focus();
      }
    }
  };

  window.requestAnimationFrame(anim);
}

export const useScrollTo = <T extends HTMLElement>(
  options?: ScrollProps<T>,
): [RefObject<T>, () => void] => {
  const ref = useRef<T>(null);
  const { duration, timing, draw, focus, callback } = { ...defaultOptions, ...options };

  const scroll = useCallback(() => {
    if (ref.current) {
      const domRect = ref?.current?.getBoundingClientRect();
      const scrollValue = window.pageYOffset;

      animate({
        duration,
        timing,
        drawAnimate: draw({ domRect, scrollValue }),
        current: ref.current,
        focus,
        callback,
      });
    }
  }, [draw, duration, timing, focus]);

  return [ref, scroll];
};

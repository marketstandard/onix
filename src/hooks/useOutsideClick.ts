import { useEffect, useRef } from 'react';

type OutsideClick = (e: MouseEvent) => void;

/**
 * @param {Function} callback
 */
export const useOutsideClick = (cb: OutsideClick) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        cb(e);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [cb]);

  return ref;
};

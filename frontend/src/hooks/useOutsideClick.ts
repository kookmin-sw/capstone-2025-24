import { useEffect, RefObject } from 'react';

type OutsideClickHandler = (event: MouseEvent) => void;

const useOutsideClick = (ref: RefObject<HTMLElement | null>, handler: OutsideClickHandler) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export default useOutsideClick;

import { RefObject, Dispatch, SetStateAction } from 'react';

interface observerProps {
  setInviewPort: Dispatch<SetStateAction<boolean>>;
  element: RefObject<HTMLDivElement | null>;
}

export const useScrollObserver = ({setInviewPort, element}:observerProps) => {
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInviewPort(true);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5,
  });

  if (element.current) {
    observer.observe(element.current);
  }

  return () => observer.disconnect();
};

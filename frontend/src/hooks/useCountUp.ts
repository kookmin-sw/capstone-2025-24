import { useState, useEffect } from 'react';

function useCountUp(target: number, duration: number = 1500): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);

    return () => {
      setCount(0);
    };
  }, [target, duration]);

  return count;
}

export default useCountUp;

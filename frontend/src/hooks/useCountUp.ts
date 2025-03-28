import { useEffect, useState } from 'react';

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(4, -10 * t);
}

export default function useCountNum(end: number, duration = 7000) {
  const [count, setCount] = useState(0);
  const frameRate = 100;
  const totalFrame = Math.round(duration / frameRate);

  useEffect(() => {
    let currentNumber = 0;
    const counter = setInterval(() => {
      const progress = easeOutExpo(++currentNumber / totalFrame);
      setCount(Math.round(end * progress));

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);
  }, [end, frameRate, 0, totalFrame]);

  return count;
}

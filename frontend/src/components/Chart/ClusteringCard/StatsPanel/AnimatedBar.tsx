import { useEffect, useState } from 'react';
import { BarBase, BarFill } from './StatsPanel.style';

interface AnimatedBarProps {
  target: number; // 실제 보여주고 싶은 % 수치
  color: string;
}

const AnimatedBar = ({ target, color }: AnimatedBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(target);
    }, 50); // 마운트 후 살짝 delay

    return () => clearTimeout(timer);
  }, [target]);

  return (
    <BarBase>
      <BarFill $count={width} $fillcolor={color} />
    </BarBase>
  );
};

export default AnimatedBar;
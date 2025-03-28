import { useEffect, useState } from 'react';
import { BarBase, BarFill } from './StatsPanel.style';

interface AnimatedBarProps {
  target: number; // 실제 보여주고 싶은 % 수치
  color: string;
  isVisible: boolean;
}

const AnimatedBar = ({ target, color, isVisible }: AnimatedBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(target);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible, target]);

  return (
    <BarBase>
      <BarFill $count={width} $fillcolor={color} />
    </BarBase>
  );
};

export default AnimatedBar;

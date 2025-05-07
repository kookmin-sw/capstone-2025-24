import * as S from './StatsPanel.style';
import StatsItem from './StatsItem';
import { useEffect, useState } from 'react';
import { statsItem } from '@/types/chart';
import { STATSLABEL } from '@/constants/labelList';
interface StatsPanelProps {
  isVisible: boolean;
  statsData: statsItem | undefined;
}
const StatsPanel = ({ isVisible, statsData }: StatsPanelProps) => {
  const data = Object.values(statsData || {});
  const [total, setTotal] = useState(0);

  const changeToRatio = (target: number) => {
    if (total === 0 || target === 0) return '0.0';
    return ((target / total) * 100).toFixed(1);
  };

  useEffect(() => {
    setTotal(data?.reduce((it, accu) => accu + it, 0));
  }, []);

  return (
    <S.StatsPanelLayout>
      {STATSLABEL.map((it, index) => {
        return (
          <StatsItem
            key={it.key}
            label={it.text}
            count={changeToRatio(data[index])}
            isVisible={isVisible}
            color={it.color}
          />
        );
      })}
    </S.StatsPanelLayout>
  );
};

export default StatsPanel;

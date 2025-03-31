import * as S from './StatsPanel.style';
import StatsItem from './StatsItem';
// import { StatsData } from '../../../../mocks/ClusterData';
import { useEffect, useState } from 'react';
import { statsItem } from '@/types/chartType';
import { CATEGORY } from '@/constants/EventCategory';

interface StatsPanelProps {
  isVisible: boolean;
  statsData: statsItem | undefined;
}
const StatsPanel = ({ isVisible, statsData }: StatsPanelProps) => {
  // 여기서 get할 예정이라 mockData 쓰겠습니다람쥐
  const [data, setData] = useState<number[]>(Object.values(statsData || {}));
  const [total, setTotal] = useState(0);

  const changeToRatio = (target: number) => {
    return ((target / total) * 100).toFixed(1);
  };

  useEffect(() => {
    setTotal(data.reduce((it, accu) => accu + it));
  }, []);

  return (
    <S.StatsPanelLayout>
      <p>정릉 1동</p>
      {CATEGORY.map((it, index) => {
        return <StatsItem key={it} label={it} count={changeToRatio(data[index])} isVisible={isVisible} />;
      })}
    </S.StatsPanelLayout>
  );
};

export default StatsPanel;

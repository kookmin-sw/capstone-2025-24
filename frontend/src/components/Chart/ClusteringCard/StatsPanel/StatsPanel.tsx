import * as S from './StatsPanel.style';
import StatsItem from './StatsItem';
import { StatsData } from '../../../../mocks/ClusterData';
import { useEffect, useState } from 'react';
const StatsPanel = ({ isVisible }: { isVisible: boolean }) => {
  // 여기서 get할 예정이라 mockData 쓰겠습니다람쥐
  const [total, setTotal] = useState(0);

  const changeToRatio = (target: number) => {
    return ((target / total) * 100).toFixed(1);
  };

  useEffect(() => {
    const countList = StatsData.map((it) => it.count);
    setTotal(countList.reduce((it, accu) => accu + it));
  }, []);

  return (
    <S.StatsPanelLayout>
      <p>정릉 1동</p>
      {StatsData.map((it) => {
        return (
          <StatsItem key={it.category} label={it.category} count={changeToRatio(it.count)} isVisible={isVisible} />
        );
      })}
    </S.StatsPanelLayout>
  );
};

export default StatsPanel;

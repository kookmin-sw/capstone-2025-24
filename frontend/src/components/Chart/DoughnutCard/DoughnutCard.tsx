import * as S from './DoughnutCard.style';
import DoughnutChart from './DoughnutChart';
import ChartFilter from './ChartFilter/ChartFilter';
import { useState, useEffect } from 'react';
import useSelectedIndexStore from '../../../stores/useSelectedIndexStore';

interface LegendItem {
  text: string;
  color: string;
}

interface DoughnutCardProps {
  title?: string;
  legendItems: LegendItem[];
}
const DoughnutCard = ({ title, legendItems }: DoughnutCardProps) => {
  const { selectedIndex, setSelectedIndex } = useSelectedIndexStore();

  // 여기서 api get을 해줄 겁니다.
  useEffect(() => {
    // 지금은 이렇게 구현했지만 실제로는 api request를 보내겠지요?
    switch (selectedIndex) {
      case 0:
        setData([21, 9, 7, 4, 1]);
        return;
      case 1:
        setData([10, 20, 30, 15, 20]);
        return;
      case 2:
        setData([4, 2, 25, 7, 12]);
        return;
    }
  }, [selectedIndex]);
  
  const [data, setData] = useState<number[]>([21, 9, 7, 4, 1]);
  return (
    <S.DoughnutCardLayout>
      <S.TitleDiv>
        <S.TitleP>{title}</S.TitleP>
        <ChartFilter />
      </S.TitleDiv>
      <DoughnutChart data={data} legendItems={legendItems}/>
    </S.DoughnutCardLayout>
  );
};

export default DoughnutCard;

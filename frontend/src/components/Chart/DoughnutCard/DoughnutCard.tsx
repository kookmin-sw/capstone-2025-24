import * as S from './DoughnutCard.style';
import DoughnutChart from './DoughnutChart';
import ChartFilter from './ChartFilter/ChartFilter';
import { useState, useEffect, useRef } from 'react';
import useCategoryIndexStore from '../../../stores/categoryIndexStore';
import useRegionIndexStore from '../../../stores/regionIndexStore';
import { CategoryData, CategoryData2, CategoryData3, CategoryItem } from '../../../mocks/DoughnutData';
import { useScrollObserver } from '../../../hooks/useScrollObserver';
import { LegendItem } from './LabelBox';

interface DoughnutCardProps {
  title: string;
  legendItems: LegendItem[];
  type: string;
}

const DoughnutCard = ({ title, legendItems, type }: DoughnutCardProps) => {
  const [data, setData] = useState<CategoryItem>(CategoryData);
  const store = title === '유형별 사건 수' ? useCategoryIndexStore() : useRegionIndexStore();
  const { selectedIndex } = store;
  const [inviewPort, setInviewPort] = useState<boolean>(false);
  const element = useRef<HTMLDivElement | null>(null);

  // 여기서 api get을 해줄 겁니다.
  useEffect(() => {
    // 지금은 이렇게 구현했지만 실제로는 api request를 보내겠지요?
    switch (selectedIndex) {
      case 0:
        setData(CategoryData);
        return;
      case 1:
        setData(CategoryData2);
        return;
      case 2:
        setData(CategoryData3);
        return;
    }
  }, [selectedIndex]);

  useEffect(() => {
    useScrollObserver({ setInviewPort, element });
  });

  return (
    <S.DoughnutCardLayout ref={element}>
      <S.TitleDiv>
        <S.TitleP>{title}</S.TitleP>
        <ChartFilter title={title} />
      </S.TitleDiv>
      {inviewPort && <DoughnutChart data={data} legendItems={legendItems} isVisible={inviewPort} type={type}/>}
    </S.DoughnutCardLayout>
  );
};

export default DoughnutCard;

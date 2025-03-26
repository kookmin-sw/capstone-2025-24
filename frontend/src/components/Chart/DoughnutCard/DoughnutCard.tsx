import * as S from './DoughnutCard.style';
import DoughnutChart from './DoughnutChart';
import ChartFilter from './ChartFilter/ChartFilter';
import { useState, useEffect } from 'react';
import useCategoryIndexStore from '../../../stores/categoryIndexStore';
import useRegionIndexStore from '../../../stores/regionIndexStore';
import { CategoryData, CategoryData2, CategoryData3, CategoryItem } from '../../../mocks/DoughnutData';

interface LegendItem {
  text: string;
  color: string;
}

interface DoughnutCardProps {
  title: string;
  legendItems: LegendItem[];
}
const DoughnutCard = ({ title, legendItems }: DoughnutCardProps) => {
  const [data, setData] = useState<CategoryItem>(CategoryData);
  const store = title === '유형별 사건 수' ? useCategoryIndexStore() : useRegionIndexStore();
  const { selectedIndex } = store;

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

  return (
    <S.DoughnutCardLayout>
      <S.TitleDiv>
        <S.TitleP>{title}</S.TitleP>
        <ChartFilter title={title} />
      </S.TitleDiv>
      <DoughnutChart data={data} legendItems={legendItems} />
    </S.DoughnutCardLayout>
  );
};

export default DoughnutCard;

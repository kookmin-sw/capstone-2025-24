import * as S from './DoughnutCard.style';
import DoughnutChart from './DoughnutChart';
import ChartFilter from './ChartFilter/ChartFilter';
import { useState, useEffect, useRef } from 'react';
import useCategoryIndexStore from '../../../stores/categoryIndexStore';
import useRegionIndexStore from '../../../stores/regionIndexStore';
import { CategoryItem } from '@/types/chartType';
import { CategoryData } from '../../../mocks/DoughnutData';
import { useScrollObserver } from '../../../hooks/useScrollObserver';
import { LegendItem } from './LabelBox';
import { getDataPerCategory } from '@/apis/ChartApi';

interface DoughnutCardProps {
  title: string;
  legendItems: LegendItem[];
  type: string;
}

const DoughnutCard = ({ title, legendItems, type }: DoughnutCardProps) => {
  const [data, setData] = useState<CategoryItem | undefined>(CategoryData);
  const [period, setPeriod] = useState<string>('weekly');
  const store = title === '유형별 사건 수' ? useCategoryIndexStore() : useRegionIndexStore();
  const { selectedIndex } = store;
  const [inviewPort, setInviewPort] = useState<boolean>(false);
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    switch (selectedIndex) {
      case 0:
        setPeriod(() => 'weekly');
        break;
      case 1:
        setPeriod(() => 'monthly');
        break;
      case 2:
        setPeriod(() => 'yearly');
        break;
    }
    const fetchChartData = async () => {
      const data = await getDataPerCategory(period);
      setData(data.applications);
    };

    fetchChartData();
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
      {inviewPort && data && <DoughnutChart data={data} legendItems={legendItems} isVisible={inviewPort} type={type} />}
    </S.DoughnutCardLayout>
  );
};

export default DoughnutCard;

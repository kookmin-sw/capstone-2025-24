import * as S from './DoughnutCard.style';
import DoughnutChart from './DoughnutChart';
import ChartFilter from './ChartFilter/ChartFilter';
import { useState, useEffect, useRef } from 'react';
import { useIndex } from '@/stores/categoryIndexStore';
import { LocationItem, DataItem } from '@/types/chartType';
import { useScrollObserver } from '@/hooks/useScrollObserver';
import { getDataPerCategory, getDataPerLocation } from '@/apis/ChartApi';
import { periodLst } from '@/constants/EventCategory';
import { LABELBYCATEGORY, LABELBYREGION } from '@/constants/labelList';
interface DoughnutCardProps {
  title: string;
  type: string;
}

const DoughnutCard = ({ title, type }: DoughnutCardProps) => {
  const [chartData, setChartData] = useState<DataItem[] | undefined>();
  const { selectedIndex } = useIndex(type);

  const [inviewPort, setInviewPort] = useState<boolean>(false);
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      if (type === 'category') {
        const data = await getDataPerCategory(periodLst[selectedIndex]);
        const formattedData = Object.values(data).map((it, index) => {
          return { text: LABELBYCATEGORY[index].text, count: it as number, color: LABELBYCATEGORY[index].color };
        });
        setChartData(formattedData);
      } else {
        const data = await getDataPerLocation(periodLst[selectedIndex]);
        const formattedData = data.map((it: LocationItem, index: number) => {
          return { text: it.address, count: it.count, color: LABELBYREGION[index].color };
        });
        setChartData(formattedData);
      }
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
        <ChartFilter type={type} />
      </S.TitleDiv>
      {inviewPort && <DoughnutChart data={chartData} isVisible={inviewPort} type={type} />}
    </S.DoughnutCardLayout>
  );
};

export default DoughnutCard;

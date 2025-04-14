import * as S from './LineCard.style';
import CalendarSection from './CalendarSection/CalendarSection';
import { useState, useEffect } from 'react';
import LineChart from './LineChart';
import Dropdown from '../BarCard/BarFilter/Dropdown/Dropdown';
import { CATEGORY_OPTIONS } from '@/constants/dropdownOptions';
import { HourItem } from '@/types/chart';
import { getDataPerTime } from '@/apis/ChartApi';
import { formatDate } from '@/utils/dataFormatter';
import { categoryToEnglish } from '@/utils/categoryMapper.ts';

const LineCard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [category, setCategory] = useState('전체');
  const [timeData, setTimeData] = useState<HourItem[]>([]);
  const handleChange = (_target: string, newValue: string) => {
    setCategory(newValue);
  };
  useEffect(() => {
    const fetchTimeData = async () => {
      const data = await getDataPerTime(categoryToEnglish[category] || undefined, formatDate(selectedDate));
      setTimeData(data);
    };

    fetchTimeData();
  }, [selectedDate, category]);

  return (
    <S.LineCardLayout>
      <S.TitleDiv>
        <S.TitleP>시간대별 사건수</S.TitleP>
        <Dropdown
          items={CATEGORY_OPTIONS}
          width={113}
          placeholder="전체"
          type="category"
          onChange={handleChange}
          value={category}
        />
      </S.TitleDiv>
      <S.ContentDiv>
        <CalendarSection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <LineChart category={category} chartData={timeData} />
      </S.ContentDiv>
    </S.LineCardLayout>
  );
};

export default LineCard;

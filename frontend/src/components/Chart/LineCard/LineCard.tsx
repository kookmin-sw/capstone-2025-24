import * as S from './LineCard.style';
import CalendarSection from './CalendarSection/CalendarSection';
import { useState, useEffect } from 'react';
import LineChart from './LineChart';
import Dropdown from '../BarCard/BarFilter/Dropdown/Dropdown';
import { CATEGORY_OPTIONS } from '../../../constants/dropdownOptions';
// import { hourFormatChanger } from '../../../hooks/dataFormatter';
import { HourItem, HourData } from '../../../mocks/LineData';
const LineCard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [category, setCategory] = useState('전체');
  const [data, setData] = useState<HourItem[]>([]);
  const handleChange = (target: string, newValue: string) => {
    setCategory(newValue);
  };

  useEffect(()=> {
    // api 연결 예정정
    setData(HourData);
  },[selectedDate, category]);

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
        <LineChart category={category} chartData={data}/>
      </S.ContentDiv>
    </S.LineCardLayout>
  );
};

export default LineCard;

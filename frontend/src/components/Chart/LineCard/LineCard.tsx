import * as S from './LineCard.style';
import CalendarSection from './CalendarSection/CalendarSection';
import { useState } from 'react';
import LineChart from './LineChart';
import Dropdown from '../BarCard/BarFilter/Dropdown/Dropdown';
import { CATEGORY_OPTIONS } from '../../../constants/dropdownOptions';
const LineCard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [category, setCategory] = useState('전체');
  const handleChange = (target: 'category' | 'year' | 'month', newValue: string) => {
    setCategory(newValue);
  };
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
        <LineChart category={category}/>
      </S.ContentDiv>
    </S.LineCardLayout>
  );
};

export default LineCard;

import * as S from './BarFilter.style';
import Dropdown from './Dropdown/Dropdown';
import { useState } from 'react';
import {
  CATEGORY_OPTIONS,
  YEAR_OPTIONS,
  MONTH_OPTIONS,
  MONTH_PLACEHOLDER,
} from '../../../../constants/dropdownOptions';

interface filterType {
  category: string;
  year: string;
  month: string;
}
const BarFilter = () => {
  const [filter, setFilter] = useState<filterType>({ category: '전체', year: '2025', month: '월' });
  return (
    <S.BarFilterLayout>
      <Dropdown items={CATEGORY_OPTIONS} width={113} placeholder="전체"/>
      <Dropdown items={YEAR_OPTIONS} width={85} placeholder="2025"/>
      <Dropdown items={MONTH_OPTIONS} width={70} placeholder={MONTH_PLACEHOLDER} />
    </S.BarFilterLayout>
  );
};

export default BarFilter;

import * as S from './BarFilter.style';
import Dropdown from './Dropdown/Dropdown';
import { useEffect } from 'react';
import {
  CATEGORY_OPTIONS,
  YEAR_OPTIONS,
  MONTH_OPTIONS,
  MONTH_PLACEHOLDER,
} from '../../../../constants/dropdownOptions';
import { useFilterStore } from '../../../../stores/filterStore';


const BarFilter = () => {
  const {filter, setFilter} = useFilterStore();

  const handleChange = (target: 'category' | 'year' | 'month', newValue: string) => {
    setFilter(target, newValue);
  };

  useEffect(()=> {
    // filter 값 바뀔 때마다 data 다시 get
  },[filter]);


  return (
    <S.BarFilterLayout>
      <Dropdown
        items={CATEGORY_OPTIONS}
        width={113}
        placeholder="전체"
        type="category"
        onChange={handleChange}
        value={filter.category}
      />
      <Dropdown
        items={YEAR_OPTIONS}
        width={85}
        placeholder="2025"
        type="year"
        onChange={handleChange}
        value={filter.year}
      />
      <Dropdown
        items={MONTH_OPTIONS}
        width={80}
        placeholder={MONTH_PLACEHOLDER}
        type="month"
        onChange={handleChange}
        value={filter.month}
      />
    </S.BarFilterLayout>
  );
};

export default BarFilter;

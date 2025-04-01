import * as S from './BarFilter.style';
import Dropdown from './Dropdown/Dropdown';
import {
  CATEGORY_OPTIONS,
  YEAR_OPTIONS,
  MONTH_OPTIONS,
  MONTH_PLACEHOLDER,
} from '../../../../constants/dropdownOptions';
import { useFilterStore } from '../../../../stores/filterStore';
import { useEffect } from 'react';


const BarFilter = () => {
  const { filter, setFilter } = useFilterStore();
  const now = new Date();
  const nowYear = now.getFullYear();
  const handleChange = (target: 'category' | 'year' | 'month', newValue: string) => {
    setFilter(target, newValue);
  };

  useEffect(()=> {
    if (filter.year==='전체') {
      setFilter('month', '전체');
    }
  },[filter.year])

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
        placeholder={nowYear.toString()}
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

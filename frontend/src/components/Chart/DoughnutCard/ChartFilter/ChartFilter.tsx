// import { useState } from 'react';
import * as S from './ChartFilter.style';
import FilterItem from './FilterItem';
import useCategoryIndexStore from '../../../../stores/useCategoryIndexStore';
import useRegionIndexStore from '../../../../stores/useRegionIndexStore';

interface ChartFilterProps {
  title: string;
}
const ChartFilter = ({title}:ChartFilterProps) => {
  const store = title === '유형별 사건 수' ? useCategoryIndexStore() : useRegionIndexStore();
  const { selectedIndex, setSelectedIndex } = store;
  const range: { type: string }[] = [{ type: '일주일' }, { type: '이번 달' }, { type: '올해' }];

  return (
    <S.ChartFilterLayout>
      {range.map((it, index) => (
        <FilterItem
          key={it.type}
          isSelected={index === selectedIndex}
          text={it.type}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </S.ChartFilterLayout>
  );
};

export default ChartFilter;

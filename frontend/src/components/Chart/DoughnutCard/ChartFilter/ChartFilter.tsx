// import { useState } from 'react';
import * as S from './ChartFilter.style';
import FilterItem from './FilterItem';
import useSelectedIndexStore from '../../../../stores/useSelectedIndexStore';

const ChartFilter = () => {
  const { selectedIndex, setSelectedIndex } = useSelectedIndexStore();
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

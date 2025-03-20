import { useState } from 'react';
import * as S from './ChartFilter.style';
import FilterItem from './FilterItem';

interface rangeType {
  type: string;
}

const ChartFilter = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const range: rangeType[] = [{ type: '일주일' }, { type: '이번 달' }, { type: '올해' }];

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

import * as S from './ChartFilter.style';
import FilterItem from './FilterItem';
import { useIndex } from '@/stores/categoryIndexStore';

interface ChartFilterProps {
  type: string;
}
const ChartFilter = ({ type }: ChartFilterProps) => {
  const { selectedIndex, setSelectedIndex } = useIndex(type);
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

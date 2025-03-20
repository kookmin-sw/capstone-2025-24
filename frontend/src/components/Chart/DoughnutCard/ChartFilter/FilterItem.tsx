import * as S from './ChartFilter.style';

interface FilterItemProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}
const FilterItem = ({ text = '미지정', onClick, isSelected }: FilterItemProps) => {
  return (
    <S.FilterItem isSelected={isSelected} onClick={onClick}>
      {text}
    </S.FilterItem>
  );
};

export default FilterItem;
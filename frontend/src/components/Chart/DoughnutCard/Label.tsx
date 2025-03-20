import * as S from './DoughnutCard.style';

interface LabelProps {
  text?: string;
  count?: number;
  color?: string;
}
const Label = ({ text, count, color }: LabelProps) => {
  return (
    <S.LabelItem>
      <S.ColorChip color={color} />
      <S.LabelP className="category">{text}</S.LabelP>
      <S.LabelP className="count">{count}건</S.LabelP>
    </S.LabelItem>
  );
};

export default Label;

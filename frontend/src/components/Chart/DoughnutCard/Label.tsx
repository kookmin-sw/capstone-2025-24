import * as S from './DoughnutCard.style';
import { addressFormatter } from '@/utils/addressFormatter';
interface LabelProps {
  text?: string;
  count?: number;
  color?: string;
  type?: string;
}
const Label = ({ text, count, color, type }: LabelProps) => {
  return (
    <S.LabelItem>
      <S.ColorChip color={color} />
      <S.LabelP className="category" $type={type || ''}>
        {type === 'category' ? text : addressFormatter(text)}
      </S.LabelP>
      <S.LabelP className="count" $type={type || ''}>
        {count}건
      </S.LabelP>
    </S.LabelItem>
  );
};

export default Label;

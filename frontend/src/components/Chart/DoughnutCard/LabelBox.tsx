import * as S from './DoughnutCard.style';
import Label from './Label';
import { DataItem } from '@/types/chart';

export interface LegendItem {
  text: string;
  color: string;
}

interface LabelBoxProps {
  data: DataItem[] | undefined;
  type: string;
}
const LabelBox = ({ data, type }: LabelBoxProps) => {
  return (
    <S.LabelBoxLayout>
      {data?.map((it) => {
        return <Label color={it.color} text={it.text} count={it.count} key={it.text} type={type} />;
      })}
    </S.LabelBoxLayout>
  );
};

export default LabelBox;

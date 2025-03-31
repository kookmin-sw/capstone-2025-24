import * as S from './DoughnutCard.style';
import Label from './Label';
import { DataItem } from '@/types/chartType';

export interface LegendItem {
  text: string;
  color: string;
}

interface LabelBoxProps {
  data: DataItem[] | undefined;
}
const LabelBox = ({ data}: LabelBoxProps) => {
  return (
    <S.LabelBoxLayout>
      {data?.map((it) => {
        return <Label color={it.color} text={it.text} count={it.count} key={it.text} />;
      })}
    </S.LabelBoxLayout>
  );
};

export default LabelBox;

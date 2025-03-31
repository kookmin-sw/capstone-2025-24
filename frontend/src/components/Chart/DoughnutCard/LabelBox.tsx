import * as S from './DoughnutCard.style';
import Label from './Label';

export interface LegendItem {
  text: string;
  color: string;
}

interface LabelBoxProps {
  data: number[];
  legendItems: LegendItem[];
  type: string;
}
const LabelBox = ({ data, legendItems, type }: LabelBoxProps) => {
  return (
    <S.LabelBoxLayout>
      {legendItems.map((it, i) => {
        return <Label color={it.color} text={it.text} count={data[i]} key={it.text} type={type} />;
      })}
    </S.LabelBoxLayout>
  );
};

export default LabelBox;

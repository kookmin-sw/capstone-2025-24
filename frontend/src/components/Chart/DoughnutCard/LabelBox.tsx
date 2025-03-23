import * as S from './DoughnutCard.style';
import Label from './Label';

interface LegendItem {
  text: string;
  color: string;
}

interface LabelBoxProps {
  data: number[];
  legendItems: LegendItem[];
}
const LabelBox = ({ data, legendItems }: LabelBoxProps) => {
  return (
    <S.LabelBoxLayout>
      {legendItems.map((it, i) => {
        return <Label color={it.color} text={it.text} count={data[i]} key={it.text} />;
      })}
    </S.LabelBoxLayout>
  );
};

export default LabelBox;

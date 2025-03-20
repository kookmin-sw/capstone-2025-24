import * as S from './DoughnutCard.style';
import Label from './Label';
import { LABELBYCATEGORY } from '../../../constants/labelList';

interface LabelBoxProps {
    data:number[];
}
const LabelBox = ({data}:LabelBoxProps) => {

  return (
    <S.LabelBoxLayout>
      {LABELBYCATEGORY.map((it, i) => {
        return <Label color={it.color} text={it.text} count={data[i]} key={it.text} />;
      })}
    </S.LabelBoxLayout>
  );
};

export default LabelBox;

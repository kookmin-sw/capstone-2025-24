import * as S from './DoughnutCard.style';
import Label from './Label';
import { LABELBYCATEGORY } from '../../../constants/labelList';

interface LabelDivProps {
    data:number[];
}
const LabelDiv = ({data}:LabelDivProps) => {

  return (
    <S.LabelLayout>
      {LABELBYCATEGORY.map((it, i) => {
        return <Label color={it.color} text={it.text} count={data[i]} key={it.text} />;
      })}
    </S.LabelLayout>
  );
};

export default LabelDiv;

import * as S from './BarCard.style';
import BarChart from './BarChart';
import { useState } from 'react';

const BarCard = () => {
  const [data, setData] = useState<number[]>([21, 9, 7, 4, 1]);
  return (
    <S.BarCardLayout>
      <S.TitleDiv>
        <S.TitleP>일 ∙ 월별 사건수</S.TitleP>
      </S.TitleDiv>
      <BarChart data={data} />
    </S.BarCardLayout>
  );
};

export default BarCard;

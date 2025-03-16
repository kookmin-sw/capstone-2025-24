import React from 'react';
import * as S from './style.ts';

const AlertItem: React.FC = () => {
  return (
    <div>
      <S.Layout>
        <S.ColorDiv></S.ColorDiv>
        <S.CardDiv>
          <S.DateDiv>2025.03.16. 15:00:00</S.DateDiv>
          <S.CategoryDiv>폭행 감지</S.CategoryDiv>
          <S.AddressDiv>서울특별시 성북구 보국문로 31 </S.AddressDiv>
          <S.ShowButtoon>자세히 보기</S.ShowButtoon>
        </S.CardDiv>
      </S.Layout>
    </div>
  );
};

export default AlertItem;

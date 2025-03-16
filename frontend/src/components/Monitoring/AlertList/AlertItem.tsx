import React from 'react';
import * as S from './style.ts';

interface AlertItemProps {
  category: string;
  date: string;
  address: string;
  state: string;
}

const AlertItem: React.FC<AlertItemProps> = ({ category, date, address, state }) => {
  return (
    <div>
      <S.Layout>
        <S.ColorDiv category={category} />
        <S.CardDiv>
          <S.DateWrapper>
            <S.DateDiv>{date}</S.DateDiv>
            <S.StateCircle state={state} />
          </S.DateWrapper>
          <S.CategoryDiv>{category} 감지</S.CategoryDiv>
          <S.AddressDiv>{address} </S.AddressDiv>
          <S.ShowButtoon>자세히 보기</S.ShowButtoon>
        </S.CardDiv>
      </S.Layout>
    </div>
  );
};

export default AlertItem;

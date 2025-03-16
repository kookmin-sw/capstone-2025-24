import React from 'react';
import * as S from './style.ts';
import AlertItem from './AlertItem.tsx';

const AlertList: React.FC = () => {
  return (
    <S.AlertListLayout>
      <S.TitleDiv>알림 리스트</S.TitleDiv>
      <S.AlertContainer>
        <AlertItem/>
        <AlertItem/>
        <AlertItem/>
        <AlertItem/>
        <AlertItem/>
        <AlertItem/>
        <AlertItem/>
        <AlertItem/>
      </S.AlertContainer>
    </S.AlertListLayout>
  );
};

export default AlertList;

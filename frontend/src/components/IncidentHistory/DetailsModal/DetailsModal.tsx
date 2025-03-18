import React from 'react'
import * as S from './style.ts'
import Information from './Information.tsx'

const DetailsModal: React.FC = () => {
  return (
    <S.Layout>
      <S.TitleDiv>사건 세부 정보</S.TitleDiv>
      <Information />
    </S.Layout>
  );
};

export default DetailsModal;

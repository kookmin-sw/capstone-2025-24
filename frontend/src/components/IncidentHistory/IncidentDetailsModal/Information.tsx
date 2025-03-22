import React from 'react';
import * as S from './IncidentDetailsModal.style.ts';

const Information: React.FC = () => {
  return (
    <S.InformationLayout>
      <S.InfoContainer>
        <S.NameP>위치</S.NameP>
        <S.ValueP>서울특별시 성북구 정릉로 87</S.ValueP>
      </S.InfoContainer>
      <S.InfoContainer>
        <S.NameP>시간</S.NameP>
        <S.ValueP>2025.02.28 15:36:27</S.ValueP>
      </S.InfoContainer>
      <S.InfoContainer>
        <S.NameP>분류</S.NameP>
        <S.ValueP>화재</S.ValueP>
      </S.InfoContainer>
      <S.InfoContainer>
        <S.NameP>담당</S.NameP>
        <S.ValueP>김하나</S.ValueP>
      </S.InfoContainer>
    </S.InformationLayout>
  );
};

export default Information;

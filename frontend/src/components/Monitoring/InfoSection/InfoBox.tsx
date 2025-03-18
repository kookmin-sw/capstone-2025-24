import React from 'react';
import * as S from './style';
// import { MdMyLocation } from 'react-icons/md';

const InfoBox: React.FC = () => {
  return (
    <S.InfoBoxLayout>
      <S.UpperDiv>
        <S.Title>CCTV 위치 정보</S.Title>
        <S.SeoulP>
          <S.LocationIcon />
          서울특별시
        </S.SeoulP>
      </S.UpperDiv>
      <S.Line />
    </S.InfoBoxLayout>
  );
};

export default InfoBox;

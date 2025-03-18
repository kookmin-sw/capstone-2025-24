import React from 'react';
import * as S from './style';
import cctvIcon from '@/assets/cctvIcon.svg';

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
      <S.LocationDiv>
        <S.Location>
          <img src={cctvIcon} alt="cctv-icon" />
          성북구 보국문로 읍천리 35 21-54
        </S.Location>
        <S.Location>
          <img src={cctvIcon} alt="cctv-icon" />
          성북구 보국문로 읍천리 35 21-54
        </S.Location>
        <S.Location>
          <img src={cctvIcon} alt="cctv-icon" />
          성북구 보국문로 읍천리 35 21-54
        </S.Location>
        <S.Location>
          <img src={cctvIcon} alt="cctv-icon" />
          성북구 보국문로 읍천리 35 21-54
        </S.Location>
        <S.Location>
          <img src={cctvIcon} alt="cctv-icon" />
          성북구 보국문로 읍천리 35 21-54
        </S.Location>
      </S.LocationDiv>
    </S.InfoBoxLayout>
  );
};

export default InfoBox;

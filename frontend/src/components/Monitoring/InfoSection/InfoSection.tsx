import React from 'react';
import KakaoMap from './KakaoMap';
import InfoBox from './InfoBox';
import * as S from './style';

const InfoSection: React.FC = () => {
  return (
    <S.InfoLayout>
      <KakaoMap />
      <InfoBox />
    </S.InfoLayout>
  );
};

export default InfoSection;



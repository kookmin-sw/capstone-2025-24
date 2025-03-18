import { useState } from 'react';
import KakaoMap from './KakaoMap';
import InfoBox from './InfoBox';
import * as S from './style';

const InfoSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <S.InfoLayout>
      <KakaoMap setSelectedIndex={setSelectedIndex} />
      <InfoBox selectedIndex={selectedIndex} />
    </S.InfoLayout>
  );
};

export default InfoSection;



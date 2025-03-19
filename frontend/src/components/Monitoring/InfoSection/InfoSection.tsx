import { useState } from 'react';
import KakaoMap from './KakaoMap';
import InfoBox from './InfoBox';
import VideoBox from './VideoBox';
import * as S from './style';

const InfoSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  return (
    <S.InfoLayout>
      <S.InfoContent>
        <KakaoMap selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        <InfoBox selectedIndex={selectedIndex} />
      </S.InfoContent>
      <VideoBox selectedIndex={selectedIndex} />
    </S.InfoLayout>
  );
};

export default InfoSection;

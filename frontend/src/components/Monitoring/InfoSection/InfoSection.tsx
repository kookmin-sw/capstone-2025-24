import { useState } from 'react';
import KakaoMap from './KakaoMap';
import InfoBox from './InfoBox';
import VideoBox from './VideoBox';
import { Locations } from '@/mocks/LocationData';
import * as S from './style';

const InfoSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  return (
    <S.InfoLayout>
      <S.InfoContent>
        <KakaoMap selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} Locations={Locations} />
        <InfoBox selectedIndex={selectedIndex} Locations={Locations} />
      </S.InfoContent>
      <VideoBox selectedIndex={selectedIndex} Locations={Locations} />
    </S.InfoLayout>
  );
};

export default InfoSection;

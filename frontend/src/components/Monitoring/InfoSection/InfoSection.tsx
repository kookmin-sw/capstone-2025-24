import { useState } from 'react';
import KakaoMap from './KakaoMap';
import InfoBox from './InfoBox';
import * as S from './InfoSection.style';
import VideoPlayer from './VideoPlayer';
import { useEffect } from 'react';
import { CctvInfo } from '@/types/cctv';
import { getCctvInfo } from '@/apis/CctvApi';
import { useSelectedCctvStore } from '@/stores/selectedCctvStore';

const InfoSection = () => {
  const [cctv, setCctv] = useState<CctvInfo[]>([]);
  const { setSelectedIndex } = useSelectedCctvStore();

  useEffect(() => {
    const fetchCctv = async () => {
      const data = await getCctvInfo();
      setCctv(data);
      if (data.length > 0) {
        setSelectedIndex(data[0].id);
      }
    };
  
    fetchCctv();
  }, []);
  
  return (
    <S.InfoLayout>
      <S.InfoContent>
        <KakaoMap locations={cctv} />
        <InfoBox locations={cctv} />
      </S.InfoContent>
      <VideoPlayer locations={cctv} />
    </S.InfoLayout>
  );
};

export default InfoSection;

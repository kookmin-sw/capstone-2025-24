import * as S from './InfoSection.style';
import cctvIcon from '@/assets/icons/cctvIcon.svg';
import cctvIconBlue from '@/assets/icons/cctvBlueIcon.svg';
import { CctvInfo } from '@/types/cctv';
import { useSelectedCctvStore } from '@/stores/selectedCctvStore';

interface InfoBoxProps {
  locations: CctvInfo[];
}

const InfoBox = ({ locations }: InfoBoxProps) => {
  const { selectedIndex, setSelectedIndex } = useSelectedCctvStore();
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
        {locations.map((location, index) => (
          <S.Location
            key={index}
            selected={selectedIndex === location.id}
            onClick={() => setSelectedIndex(location.id)}
          >
            <img src={selectedIndex === location.id ? cctvIconBlue : cctvIcon} alt="cctv-icon" />
            {location.address}
          </S.Location>
        ))}
      </S.LocationDiv>
    </S.InfoBoxLayout>
  );
};

export default InfoBox;

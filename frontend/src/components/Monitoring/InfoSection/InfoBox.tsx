import * as S from './InfoSection.style';
import cctvIcon from '@/assets/icons/cctvIcon.svg';
import cctvIconBlue from '@/assets/icons/cctvBlueIcon.svg';
import { CctvInfo } from '@/types/cctv';

interface InfoBoxProps {
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  Locations: CctvInfo[];
}

const InfoBox = ({ selectedIndex, setSelectedIndex, Locations }: InfoBoxProps) => {
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
        {Locations.map((location, index) => (
          <S.Location key={index} selected={selectedIndex === index} onClick={() => setSelectedIndex(index)}>
            <img src={selectedIndex === index ? cctvIconBlue : cctvIcon} alt="cctv-icon" />
            {location.address}
          </S.Location>
        ))}
      </S.LocationDiv>
    </S.InfoBoxLayout>
  );
};

export default InfoBox;

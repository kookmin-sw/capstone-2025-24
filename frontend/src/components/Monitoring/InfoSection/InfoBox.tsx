import * as S from './style';
import cctvIcon from '@/assets/cctvIcon.svg';
import cctvIconBlue from '@/assets/cctvBlueIcon.svg';

interface InfoBoxProps {
  selectedIndex: number | null;
  Locations: {
    address: string;
  }[];
}

const InfoBox = ({ selectedIndex, Locations }: InfoBoxProps) => {
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
          <S.Location key={index} selected={selectedIndex === index}>
            <img src={selectedIndex === index ? cctvIconBlue : cctvIcon} alt="cctv-icon" />
            {location.address}
          </S.Location>
        ))}
      </S.LocationDiv>
    </S.InfoBoxLayout>
  );
};

export default InfoBox;

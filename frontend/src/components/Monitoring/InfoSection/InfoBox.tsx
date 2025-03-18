import * as S from './style';
import cctvIcon from '@/assets/cctvIcon.svg';

interface InfoBoxProps {
  selectedIndex: number | null;
}

const InfoBox = ({ selectedIndex }: InfoBoxProps) => {
  const locations = [
    '서울특별시청',
    '남산타워',
    '경복궁',
    '잠실 롯데타워',
    '여의도공원',
  ];
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
            selected={selectedIndex === index}
          >
            <img src={cctvIcon} alt="cctv-icon" />
            {location}
          </S.Location>
        ))}
      </S.LocationDiv>
    </S.InfoBoxLayout>
  );
};

export default InfoBox;

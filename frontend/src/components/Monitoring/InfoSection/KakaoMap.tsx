import * as S from './style';

const KakaoMap = () => {
  return (
    <>
      <S.Maps id="map" center={{ lat: 33.450701, lng: 126.570667 }} level={3} />
    </>
  );
};

export default KakaoMap;

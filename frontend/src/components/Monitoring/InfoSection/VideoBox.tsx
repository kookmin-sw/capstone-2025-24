import * as S from './style';

interface VideoProps {
  selectedIndex: number | null;
  Locations: {
    cctvUrl: string;
  }[];
}

const VideoBox = ({ selectedIndex, Locations }: VideoProps) => {
  return (
    <S.VideoLayout>
      {selectedIndex !== null && <S.VideoPlayer src={Locations[selectedIndex].cctvUrl} title="CCTV Video" />}
    </S.VideoLayout>
  );
};

export default VideoBox;

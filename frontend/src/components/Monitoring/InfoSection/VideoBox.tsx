import * as S from './style';

interface VideoProps {
  selectedIndex: number | null;
  Locations: {
    cctvUrl: string;
  }[];
}

const VideoBox = ({ selectedIndex, Locations }: VideoProps) => {
  return (
    <div>
      {selectedIndex !== null && <S.VideoPlayer src={Locations[selectedIndex].cctvUrl} title="CCTV Video" />}
    </div>
  );
};

export default VideoBox;

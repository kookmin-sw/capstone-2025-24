// import * as S from './InfoSection.style';
import VideoComponent from '@/components/common/VideoComponent/VideoComponent';

interface VideoProps {
  selectedIndex: number | null;
  Locations: {
    cctvUrl: string;
  }[];
}

const VideoBox = ({ selectedIndex, Locations }: VideoProps) => {
  return (
    // <div>{selectedIndex !== null && <S.VideoPlayer src={Locations[selectedIndex].cctvUrl} title="CCTV Video" />}</div>
    <div>
      {selectedIndex !== null && <VideoComponent w={831} h={467} radius={8} video={Locations[selectedIndex].cctvUrl} />}
    </div>
  );
};

export default VideoBox;

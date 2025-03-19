import { markerPositions } from '../../../mocks/LocationData';
import * as S from './style';

interface VideoProps {
  selectedIndex: number | null;
}

const VideoBox = ({ selectedIndex }: VideoProps) => {
  return (
    <S.VideoLayout>
      {selectedIndex !== null && <S.VideoPlayer src={markerPositions[selectedIndex].cctvUrl} title="CCTV Video" />}
    </S.VideoLayout>
  );
};

export default VideoBox;

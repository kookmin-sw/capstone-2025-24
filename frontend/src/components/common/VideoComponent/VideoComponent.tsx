import * as S from './style';

interface VideoComponentProps {
  w: number;
  h: number;
  radius: number;
  videoUrl: string;
}
const VideoComponent:React.FC<VideoComponentProps> = ({w, h, radius, videoUrl}) => {
  return (
    <S.VideoComponentLayout w={w} h={h} radius={radius}>
      <S.Player url={videoUrl} width="" height=""/>
    </S.VideoComponentLayout>
  );
};

export default VideoComponent;

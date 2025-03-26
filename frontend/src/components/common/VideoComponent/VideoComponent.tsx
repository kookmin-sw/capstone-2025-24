import * as S from './style';

interface VideoComponentProps {
  w: string | number;
  h: string | number;
  radius: number;
  videoUrl?: string;
}
const VideoComponent = ({ w, h, radius, videoUrl }: VideoComponentProps) => {
  return (
    <S.VideoComponentLayout w={w} h={h} radius={radius}>
      <S.Player src={videoUrl} controls autoPlay />
    </S.VideoComponentLayout>
  );
};

export default VideoComponent;

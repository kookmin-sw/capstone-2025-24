import * as S from './style';

interface VideoComponentProps {
  w: string | number;
  h: string | number;
  radius: number;
  video?: string;
}
const VideoComponent = ({ w, h, radius, video }: VideoComponentProps) => {
  return (
    <S.VideoComponentLayout $w={w} $h={h} radius={radius}>
      {video && <S.Player src={video} controls autoPlay playsInline muted />}
    </S.VideoComponentLayout>
  );
};

export default VideoComponent;

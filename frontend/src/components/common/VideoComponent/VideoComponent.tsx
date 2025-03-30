import * as S from './style';

interface VideoComponentProps {
  w: string | number;
  h: string | number;
  radius: number;
  video?: string;
}
const VideoComponent = ({ w, h, radius, video }: VideoComponentProps) => {
  return (
    <S.VideoComponentLayout w={w} h={h} radius={radius}>
      <S.Player src={video} controls autoPlay />
    </S.VideoComponentLayout>
  );
};

export default VideoComponent;

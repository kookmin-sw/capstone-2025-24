import styled from 'styled-components';
import ReactPlayer from 'react-player';

interface VideoProps {
  w: number;
  h: number;
  radius: number;
}
export const VideoComponentLayout = styled.div<VideoProps>`
  display: flex;
  width: ${({ w }) => w}px;
  height: ${({ h }) => h}px;
  overflow: hidden;
  border-radius: ${({ radius }) => radius}px;
`;

export const Player = styled(ReactPlayer)`
  width: 100% !important;
  height: 100% !important;
`;

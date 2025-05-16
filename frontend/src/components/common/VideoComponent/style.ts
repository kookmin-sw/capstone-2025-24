import styled from 'styled-components';

interface VideoProps {
  $w: string | number;
  $h: string | number;
  radius: number;
}

export const VideoComponentLayout = styled.div<VideoProps>`
  display: flex;
  width: ${({ $w }) => (typeof $w === 'number' ? `${$w}px` : $w)};
  height: ${({ $h }) => (typeof $h === 'number' ? `${$h}px` : $h)};
  overflow: hidden;
  border-radius: ${({ radius }) => radius}px;
`;

export const Player = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
// import VideoComponent from '../../common/VideoComponent/VideoComponent.tsx';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoMdClose />
        </CloseButton>
        <Video src={videoUrl} controls autoPlay />
        {/* <VideoComponent w={700} h={800} radius={10} videoUrl={video} /> */}
      </ModalContainer>
    </Overlay>
  );
};

export default VideoModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 50%;
  height: 60%;
  background: black;
  border-radius: 8px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 100;

  &:hover {
    background: rgba(255, 255, 255, 0.7);
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

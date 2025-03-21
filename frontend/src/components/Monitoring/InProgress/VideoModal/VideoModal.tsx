import * as S from './VideoModal.style';
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
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <IoMdClose />
        </S.CloseButton>
        <S.Video src={videoUrl} controls autoPlay />
        {/* <VideoComponent w={700} h={800} radius={10} videoUrl={video} /> */}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default VideoModal;

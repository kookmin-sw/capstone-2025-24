import * as S from './VideoModal.style';
import { IoMdClose } from 'react-icons/io';
import VideoComponent from '@/components/common/VideoComponent/VideoComponent';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <IoMdClose />
        </S.CloseButton>
        <VideoComponent w={'100%'} h={'100%'} radius={0} videoUrl={videoUrl} />
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default VideoModal;

import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';
import VideoComponent from '../../common/VideoComponent/VideoComponent';
import NoDispatchModal from './NoDispatchModal';
import * as S from './AlertModal.style';

interface ModalProps {
  onClose: () => void;
  alertItem: AlertItemProps;
}
interface AlertItemProps {
  category: string;
  date: string;
  address: string;
}

const AlertModal = ({ onClose, alertItem }: ModalProps) => {
  const [isNoDispatch, setIsNoDispatch] = useState(false);
  const { category, date, address } = alertItem;
  const videoUrl = ''; // 추후 api 연동

  const handleOutsideClick = () => {
    if (!isNoDispatch) {
      onClose();
    }
  };

  return (
    <S.Overlay onClick={handleOutsideClick}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        {isNoDispatch ? (
          <NoDispatchModal onBack={() => setIsNoDispatch(false)} />
        ) : (
          <>
            <S.CloseButton onClick={onClose}>
              <IoCloseOutline size={39} />
            </S.CloseButton>
            <S.Title>{category} 감지</S.Title>
            <S.InfoContainer>
              <S.InfoDiv>
                <FaMapMarkerAlt />
                {address}
              </S.InfoDiv>
              <S.InfoDiv>
                <FaClock />
                {date}
              </S.InfoDiv>
            </S.InfoContainer>
            <VideoComponent w={'100%'} h={'100%'} radius={10} videoUrl={videoUrl} />
            <S.ButtonContainer>
              <S.Button className="no" onClick={() => setIsNoDispatch(true)}>
                미출동
              </S.Button>
              <S.Button className="yes">출동하기</S.Button>
            </S.ButtonContainer>
          </>
        )}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default AlertModal;

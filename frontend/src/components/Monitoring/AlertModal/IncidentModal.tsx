import { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';
import VideoComponent from '../../common/VideoComponent/VideoComponent';
import { AlertProps } from '@/types/alert';
import { getVideo } from '@/apis/AlertApi';
import { useItemStore } from '@/stores/itemStore.ts';
import * as S from './AlertModal.style';

interface IncidentModalProps {
  onClose: () => void;
  onFeedbackClick: () => void;
  alertItem: AlertProps;
  onDispatch: () => void;
  isUpdate: boolean;
}

const IncidentModal = ({ onClose, alertItem, onFeedbackClick, onDispatch, isUpdate }: IncidentModalProps) => {
  const { id, category, date, address, video } = alertItem;
  const [videoUrl, setVideoUrl] = useState('');
  const { updateItemState } = useItemStore();

  const fetchVideo = async () => {
    const response = await getVideo(id);
    setVideoUrl(response.video);
  };

  useEffect(() => {
    if (video != undefined) {
      setVideoUrl(video);
    } else {
      fetchVideo();
    }
  }, []);

  return (
    <>
      <S.CloseButton
        onClick={async () => {
          if (isUpdate) updateItemState(alertItem.id, '출동');
          onClose();
        }}
      >
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
      <VideoComponent w="100%" h="100%" radius={10} video={videoUrl} />
      <S.ButtonContainer>
        <S.Button className="no" onClick={onFeedbackClick}>
          미출동
        </S.Button>
        <S.Button className="yes" onClick={onDispatch}>
          출동하기
        </S.Button>
      </S.ButtonContainer>
    </>
  );
};

export default IncidentModal;

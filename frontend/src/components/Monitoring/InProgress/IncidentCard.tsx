import { useState } from 'react';
import useIsModalOpen from '@/hooks/useIsModalOpen';
import { IoMdCamera } from 'react-icons/io';
import FeedbackCard from './FeedbackCard';
import VideoModal from './VideoModal/VideoModal';
import { AlertProps } from '@/types/alert';
import { getVideo } from '@/apis/AlertApi';
import * as S from './InProgress.style';

const IncidentCard = ({ id, category, address, date, police_name }: AlertProps) => {
  const [clickResolve, setClickResolve] = useState(false);
  const [video, setVideo] = useState('');
  const { isModalOpen, openModal, closeModal } = useIsModalOpen();

  const handleVideoModal = async () => {
    openModal();
    const response = await getVideo(id);
    setVideo(response.video);
  };

  return (
    <>
      <S.FlipCard>
        <S.CardInner className={clickResolve ? 'is-resolved' : ''}>
          <S.CardFront>
            <div>
              <S.CardHeader>
                <S.CardTitle>{category} 감지</S.CardTitle>
                <S.VideoButton onClick={handleVideoModal}>
                  <IoMdCamera className="icon" />
                  영상 확인
                </S.VideoButton>
              </S.CardHeader>
              <S.Line />
              <S.CardBody>
                <S.LocationTitle>발생 위치</S.LocationTitle>
                <S.LocationAddress>{address}</S.LocationAddress>
              </S.CardBody>
            </div>
            <div>
              <S.ResolveButton onClick={() => setClickResolve(true)}>사건 해결</S.ResolveButton>
              <S.CardFooter>
                <span>{date.replace(/-/g, '.')}</span>
                <span>{police_name}</span>
              </S.CardFooter>
            </div>
          </S.CardFront>

          <S.CardBack>
            <FeedbackCard onClose={() => setClickResolve(false)} id={id} />
          </S.CardBack>
        </S.CardInner>
      </S.FlipCard>
      <VideoModal isOpen={isModalOpen} onClose={closeModal} video={video} />
    </>
  );
};

export default IncidentCard;

import { useState } from 'react';
import useIsModalOpen from '@/hooks/useIsModalOpen';
import { IoMdCamera } from 'react-icons/io';
import FeedbackCard from './FeedbackCard';
import VideoModal from './VideoModal/VideoModal';
import { IncidentItemProps } from '@/types/alert';
import * as S from './InProgress.style';

const IncidentCard = ({ id, category, address, date, police, videoUrl }: IncidentItemProps) => {
  const [clickResolve, setClickResolve] = useState(false);
  const { isModalOpen, openModal, closeModal } = useIsModalOpen();

  return (
    <>
      <S.FlipCard>
        <S.CardInner className={clickResolve ? 'is-resolved' : ''}>
          <S.CardFront>
            <S.CardHeader>
              <S.CardTitle>{category} 감지</S.CardTitle>
              <S.VideoButton onClick={openModal}>
                <IoMdCamera className="icon" />
                영상 확인
              </S.VideoButton>
            </S.CardHeader>
            <S.Line />
            <S.CardBody>
              <S.LocationTitle>발생 위치</S.LocationTitle>
              <S.LocationAddress>{address}</S.LocationAddress>
              <S.ResolveButton onClick={() => setClickResolve(true)}>사건 해결</S.ResolveButton>
            </S.CardBody>
            <S.CardFooter>
              <span>{date}</span>
              <span>{police}</span>
            </S.CardFooter>
          </S.CardFront>

          <S.CardBack>
            <FeedbackCard onClose={() => setClickResolve(false)} id={id} />
          </S.CardBack>
        </S.CardInner>
      </S.FlipCard>
      <VideoModal isOpen={isModalOpen} onClose={closeModal} videoUrl={videoUrl} />
    </>
  );
};

export default IncidentCard;

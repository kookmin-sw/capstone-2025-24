import { useState } from 'react';
import { IoMdCamera } from 'react-icons/io';
import FeedbackCard from './FeedbackCard';
import VideoModal from './VideoModal/VideoModal';
import { AlertProps } from '@/types/alert';
import { getVideo } from '@/apis/AlertApi';
import { useHighlightStore } from '@/stores/highlightStore';
import { useModalStore } from '@/stores/modalStore';
import * as S from './InProgress.style';

const IncidentCard = ({ id, category, address, date, police_name }: AlertProps) => {
  const [clickResolve, setClickResolve] = useState(false);
  const [video, setVideo] = useState('');
  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);
  const current = useModalStore((s) => s.current);

  const { highlight } = useHighlightStore();
  const isHighlighted = typeof highlight === 'number' && highlight === id;

  const handleVideoModal = async () => {
    open({ type: 'norealtime', id: id });
    const response = await getVideo(id);
    setVideo(response.video);
  };

  return (
    <>
      <S.FlipCard $isHighlighted={isHighlighted}>
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
      {current?.type === 'norealtime' && current.id === id && (
        <VideoModal isOpen={true} onClose={close} video={video} />
      )}
    </>
  );
};

export default IncidentCard;

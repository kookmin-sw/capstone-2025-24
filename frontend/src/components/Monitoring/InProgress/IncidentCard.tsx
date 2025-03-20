import { useState } from 'react';
import { IoMdCamera } from 'react-icons/io';
import FeedbackCard from './FeedbackCard';
import * as S from './InProgress.style';

interface IncidentCardProps {
  // id: number;
  title: string;
  location: string;
  dateTime: string;
  police: string;
  // videoUrl: string;
}

const IncidentCard = ({ title, location, dateTime, police }: IncidentCardProps) => {
  const [clickResolve, setClickResolve] = useState(false);

  return (
    <S.FlipCard>
      <S.CardInner className={clickResolve ? 'is-resolved' : ''}>
        <S.CardFront>
          <S.CardHeader>
            <S.CardTitle>{title} 감지</S.CardTitle>
            <S.VideoButton>
              <IoMdCamera className="icon" />
              영상 확인
            </S.VideoButton>
          </S.CardHeader>
          <S.Line />
          <S.CardBody>
            <S.LocationTitle>발생 위치</S.LocationTitle>
            <S.LocationAddress>{location}</S.LocationAddress>
            <S.ResolveButton onClick={() => setClickResolve(true)}>사건 해결</S.ResolveButton>
          </S.CardBody>
          <S.CardFooter>
            <span>{dateTime}</span>
            <span>{police}</span>
          </S.CardFooter>
        </S.CardFront>

        <S.CardBack>
          <FeedbackCard onClose={() => setClickResolve(false)} />
        </S.CardBack>
      </S.CardInner>
    </S.FlipCard>
  );
};

export default IncidentCard;

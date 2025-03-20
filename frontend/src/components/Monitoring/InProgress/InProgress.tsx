import { InProgresstData } from '../../../mocks/InProgressData.tsx';
import { IoMdCamera } from 'react-icons/io';
import * as S from './InProgress.style.ts';

const InProgress = () => {
  return (
    <S.InProgressLayout>
      <S.Title>출동중인 사건 (총 {InProgresstData.length}건)</S.Title>
      <S.CardGrid>
        {InProgresstData.map((incident) => (
          <S.Card key={incident.id}>
            <S.CardHeader>
              <S.CardTitle>{incident.title} 감지</S.CardTitle>
              <S.VideoButton>
                <IoMdCamera className="icon" />
                영상 확인
              </S.VideoButton>
            </S.CardHeader>
            <S.Line />
            <S.CardBody>
              <S.LocationTitle>발생 위치</S.LocationTitle>
              <S.LocationAddress>{incident.location}</S.LocationAddress>
              <S.ResolveButton>사건 해결</S.ResolveButton>
            </S.CardBody>
            <S.CardFooter>
              <span>{incident.dateTime}</span>
              <span>{incident.police} 순경</span>
            </S.CardFooter>
          </S.Card>
        ))}
      </S.CardGrid>
    </S.InProgressLayout>
  );
};

export default InProgress;

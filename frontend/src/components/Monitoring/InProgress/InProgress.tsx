import { InProgressData } from '../../../mocks/InProgressData';
import IncidentCard from './IncidentCard';
import * as S from './InProgress.style';
import policerEmpty from '../../../assets/images/policerEmpty.png';

const InProgress = () => {
  return (
    <S.InProgressLayout>
      <S.Title>출동중인 사건 (총 {InProgressData.length}건)</S.Title>
      {InProgressData.length > 0 ? (
        <S.CardGrid>
          {InProgressData.map((incident) => (
            <IncidentCard key={incident.id} {...incident} />
          ))}
        </S.CardGrid>
      ) : (
        <S.EmptyView>
          <img src={policerEmpty} alt="empty" />
          출동중인 사건이 없어요
        </S.EmptyView>
      )}
    </S.InProgressLayout>
  );
};

export default InProgress;

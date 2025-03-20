import { InProgressData } from '../../../mocks/InProgressData';
import IncidentCard from './IncidentCard';
import * as S from './InProgress.style';

const InProgress = () => {
  return (
    <S.InProgressLayout>
      <S.Title>출동중인 사건 (총 {InProgressData.length}건)</S.Title>
      <S.CardGrid>
        {InProgressData.map((incident) => (
          <IncidentCard key={incident.id} {...incident} />
        ))}
      </S.CardGrid>
    </S.InProgressLayout>
  );
};

export default InProgress;

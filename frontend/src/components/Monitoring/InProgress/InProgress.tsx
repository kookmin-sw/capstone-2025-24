import { useItemStore } from '@/stores/itemStore';
import IncidentCard from './IncidentCard';
import * as S from './InProgress.style';
import policerEmpty from '@/assets/images/policerEmpty.png';
const InProgress = () => {
  const { items } = useItemStore();

  const incidents = items.filter((item) => item.state === '출동');

  return (
    <S.InProgressLayout id="in-progress-section">
      <S.Title>출동 중인 사건 (총 {incidents.length}건)</S.Title>
      {incidents.length > 0 ? (
        <S.CardGrid>
          {incidents.map((incident) => (
            <IncidentCard key={incident.id} {...incident} />
          ))}
        </S.CardGrid>
      ) : (
        <S.EmptyView>
          <img src={policerEmpty} alt="empty" />
          출동 중인 사건이 없어요
        </S.EmptyView>
      )}
    </S.InProgressLayout>
  );
};

export default InProgress;

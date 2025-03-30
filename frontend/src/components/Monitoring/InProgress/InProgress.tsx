import { useEffect } from 'react';
import { useItemStore } from '@/stores/itemStore';
import IncidentCard from './IncidentCard';
import * as S from './InProgress.style';
import policerEmpty from '@/assets/images/policerEmpty.png';
import { getTotalIncident } from '@/apis/AlertApi';
import { getMappedCategory } from '@/utils/categoryMapper';

const InProgress = () => {
  const { items, setItems, addItem } = useItemStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTotalIncident();
        const incidentData = data.map((item) => ({
          id: item.id,
          level: item.level,
          category: getMappedCategory(item.category),
          date: item.date,
          address: item.address,
          state: item.state,
          video: item.video,
        }));
        incidentData.forEach((incident) => {
          addItem(incident);
        });
      } catch (error) {
        console.error('incident get 호출 에러', error);
      }
    };
    fetchData();
  }, [setItems]);

  const incidents = items.filter((item) => item.state === '출동');

  return (
    <S.InProgressLayout id="in-progress-section">
      <S.Title>출동중인 사건 (총 {incidents.length}건)</S.Title>
      {incidents.length > 0 ? (
        <S.CardGrid>
          {incidents.map((incident) => (
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

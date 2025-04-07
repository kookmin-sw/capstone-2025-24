import { useEffect } from 'react';
import AlertItem from './AlertItem.tsx';
import ToolTip from '@/components/common/ToolTip/ToolTip.tsx';
import EmptyView from './EmptyView.tsx';
import * as S from './AlertList.style.ts';
import { useItemStore } from '@/stores/itemStore.ts';
import { getTotalIncidents } from '@/apis/AlertApi';
import { getMappedCategory } from '@/utils/categoryMapper';

const ToopTipContent = () => {
  return (
    <div>
      각 알림은 24시간이 지나면 <br />
      알림 리스트에서 자동 삭제됩니다.
    </div>
  );
};

const AlertList = () => {
  const { items, setItems } = useItemStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTotalIncidents();
      const alertData = data.map((item) => ({
        ...item,
        category: getMappedCategory(item.category),
      }));
      setItems(alertData);
    };
    fetchData();
  }, [setItems]);

  const alerts = items.filter((item) => item.state === '미확인' || item.state === '확인');

  return (
    <S.AlertListLayout>
      <S.TitleP>
        알림 리스트{' '}
        <ToolTip>
          <ToopTipContent />
        </ToolTip>
      </S.TitleP>
      <S.AlertContainer>
        {alerts.length === 0 ? (
          <EmptyView />
        ) : (
          alerts.map((alert) => (
            <AlertItem
              key={alert.id}
              id={alert.id}
              level={alert.level}
              category={alert.category}
              date={alert.date}
              address={alert.address}
              state={alert.state}
              clicked={sessionStorage.getItem('highlightConsumed') === alert.id.toString()}
            />
          ))
        )}
      </S.AlertContainer>
    </S.AlertListLayout>
  );
};

export default AlertList;

import { useEffect } from 'react';
import AlertItem from './AlertItem.tsx';
import ToolTip from '@/components/common/ToolTip/ToolTip.tsx';
import EmptyView from './EmptyView.tsx';
import * as S from './AlertList.style.ts';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const highlightAlertId = location.state?.highlightAlertId;
  const { items, setItems } = useItemStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTotalIncidents();
      const alertData = data.map((item) => ({
        id: item.id,
        level: item.level,
        category: getMappedCategory(item.category),
        date: item.date,
        address: item.address,
        police_name: item.police_name,
        state: item.state,
        video: item.video,
        memo: item.memo,
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
              clicked={highlightAlertId === alert.id}
            />
          ))
        )}
      </S.AlertContainer>
    </S.AlertListLayout>
  );
};

export default AlertList;

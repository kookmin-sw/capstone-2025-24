import { useEffect } from 'react';
import AlertItem from './AlertItem.tsx';
import ToolTip from '@/components/common/ToolTip/ToolTip.tsx';
import EmptyView from './EmptyView.tsx';
import * as S from './AlertList.style.ts';
import { useLocation } from 'react-router-dom';
import { useItemStore } from '@/stores/itemStore.ts';
import { getTotalAlert } from '@/apis/AlertApi';

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
  const clicked_alert_id = location.state?.clicked_alert_id;
  const { items, setItems } = useItemStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTotalAlert();
        const alertData = data.map((item) => ({
          id: item.id,
          level: item.level,
          category: item.category,
          date: item.date,
          address: item.address,
          state: item.state,
        }));
        setItems(alertData);
      } catch (error) {
        console.error('alert get 호출 에러', error);
      }
    };
    fetchData();
  }, [setItems]);

  const alertItems = items.filter((item) => item.state === '미확인' || item.state === '확인');

  return (
    <S.AlertListLayout>
      <S.TitleP>
        알림 리스트{' '}
        <ToolTip>
          <ToopTipContent />
        </ToolTip>
      </S.TitleP>
      <S.AlertContainer>
        {alertItems.length === 0 ? (
          <EmptyView />
        ) : (
          alertItems.map((alert) => (
            <AlertItem
              key={alert.id}
              id={alert.id}
              level={alert.level}
              category={alert.category}
              date={alert.date}
              address={alert.address}
              state={alert.state}
              clicked={clicked_alert_id === alert.id}
            />
          ))
        )}
      </S.AlertContainer>
    </S.AlertListLayout>
  );
};

export default AlertList;

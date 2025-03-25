import { useEffect } from 'react';
import AlertItem from './AlertItem.tsx';
import ToolTip from '../../common/ToolTip/ToolTip.tsx';
import EmptyView from './EmptyView.tsx';
import { useAlertStore } from '../../../stores/alertStore.ts';
import AlertListData from '../../../mocks/AlertListData.tsx';
import * as S from './style.ts';

const ToopTipContent = () => {
  return (
    <div>
      각 알림은 24시간이 지나면 <br />
      알림 리스트에서 자동 삭제됩니다.
    </div>
  );
};

const AlertList = () => {
  const clicked_alert_id = 1;
  const { alerts, setAlerts } = useAlertStore();

  useEffect(() => {
    setAlerts(AlertListData);
  }, [setAlerts]);

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

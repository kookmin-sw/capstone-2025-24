import * as S from './style.ts';
import AlertItem from './AlertItem.tsx';
import ToolTip from '../../common/ToolTip/ToolTip.tsx';
import EmptyView from './EmptyView.tsx';
import AlertListData from '../../../mocks/AlertListData.tsx';

// 알림 리스트 데이터
const alertdata = AlertListData;

// 클릭된 1단계 푸시 알림의 사건 번호
const clicked_alert_id = 1;

const ToopTipContent = () => {
  return (
    <div>
      각 알림은 24시간이 지나면 <br />알림 리스트에서 자동 삭제됩니다.
    </div>
  );
};

const AlertList = () => {
  return (
    <S.AlertListLayout>
      <S.TitleP>
        알림 리스트 <ToolTip><ToopTipContent/></ToolTip>
      </S.TitleP>
      <S.AlertContainer>
        {alertdata.length === 0 ? (
          <EmptyView />
        ) : (
          alertdata.map((alert) => (
            <AlertItem
              key={alert.id}
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

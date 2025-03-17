import React from 'react';
import * as S from './style.ts';
import AlertItem from './AlertItem.tsx';
import ToopTip from './ToolTip.tsx';

// 알림리스트 mock data
const mockdata = [
  {
    id: 1,
    category: '폭행',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31',
    state: '미확인',
  },
  {
    id: 2,
    category: '화재',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31 서울특별시 성북구 보국문로 31',
    state: '미확인',
  },
  {
    id: 3,
    category: '군중 밀집',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31',
    state: '미확인',
  },
  {
    id: 4,
    category: '쓰러짐',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31',
    state: '확인',
  },
];

// 클릭된 1단계 푸시 알림의 사건 번호
const clicked_alert_id = 3;


const AlertList: React.FC = () => {
  return (
    <S.AlertListLayout>
      <S.TitleDiv>
        알림 리스트 <ToopTip />
      </S.TitleDiv>
      <S.AlertContainer>
        {mockdata.map((alert) => (
          <AlertItem
            key={alert.id}
            category={alert.category}
            date={alert.date}
            address={alert.address}
            state={alert.state}
            clicked={clicked_alert_id===alert.id ? true : false}
          />
        ))}
      </S.AlertContainer>
    </S.AlertListLayout>
  );
};

export default AlertList;

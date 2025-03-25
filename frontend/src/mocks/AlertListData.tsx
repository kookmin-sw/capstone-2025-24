export interface AlertDataType {
  id: number;
  category: string;
  date: string;
  address: string;
  state: '미확인' | '확인' | '미출동' | '출동' | '완료';
}

const AlertListData: AlertDataType[] = [
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
  {
    id: 5,
    category: '쓰러짐',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31',
    state: '확인',
  },
];

export default AlertListData;

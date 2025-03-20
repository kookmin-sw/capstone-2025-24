export interface IncidentDataType {
  id: number;
  category: string;
  date: string;
  address: string;
  police: string;
}

const AlertListData: IncidentDataType[] = [
  {
    id: 1,
    category: '폭행',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31',
    police: '홍길동',
  },
  {
    id: 2,
    category: '화재',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31 서울특별시 성북구 보국문로 31',
    police: '김하나',
  },
  {
    id: 3,
    category: '군중 밀집',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31',
    police: '오해원',
  },
  {
    id: 4,
    category: '쓰러짐',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31',
    police: '김구',
  },
  {
    id: 5,
    category: '폭행',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31',
    police: '홍길동',
  },
  {
    id: 6,
    category: '화재',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31 서울특별시 성북구 보국문로 31',
    police: '김하나',
  },
  {
    id: 7,
    category: '군중 밀집',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31',
    police: '오해원',
  },
  {
    id: 8,
    category: '쓰러짐',
    date: '2024.10.10. 10:10:30',
    address: '서울특별시 성북구 보국문로 31',
    police: '김구',
  },
  
];

export default AlertListData;

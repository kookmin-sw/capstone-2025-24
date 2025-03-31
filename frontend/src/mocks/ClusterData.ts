interface positionItem {
  address: string;
  latitude: number;
  longitude: number;
  count: number;
}

export const ClusterData: positionItem[] = [
  {
    address: '서울특별시 성북구 돈암동',
    latitude: 37.5915,
    longitude: 127.0182,
    count: 42,
  },
  {
    address: '서울특별시 성북구 길음동',
    latitude: 37.6033,
    longitude: 127.0247,
    count: 37,
  },
  {
    address: '서울특별시 성북구 정릉동',
    latitude: 37.6062,
    longitude: 127.0137,
    count: 29,
  },
  {
    address: '서울특별시 성북구 장위동',
    latitude: 37.6179,
    longitude: 127.0477,
    count: 33,
  },
  {
    address: '서울특별시 성북구 삼선동',
    latitude: 37.5897,
    longitude: 127.0144,
    count: 25,
  },
  {
    address: '서울특별시 성북구 동선동',
    latitude: 37.5919,
    longitude: 127.0192,
    count: 40,
  },
  {
    address: '서울특별시 성북구 안암동',
    latitude: 37.5866,
    longitude: 127.0306,
    count: 31,
  },
  {
    address: '서울특별시 성북구 하월곡동',
    latitude: 37.6044,
    longitude: 127.0378,
    count: 27,
  },
  {
    address: '서울특별시 성북구 상월곡동',
    latitude: 37.6069,
    longitude: 127.0349,
    count: 34,
  },
  {
    address: '서울특별시 성북구 석관동',
    latitude: 37.6123,
    longitude: 127.0644,
    count: 36,
  },
  {
    address: '서울특별시 성북구 보문동',
    latitude: 37.5837,
    longitude: 127.0198,
    count: 30,
  },
  {
    address: '서울특별시 성북구 종암동',
    latitude: 37.6012,
    longitude: 127.0325,
    count: 28,
  },
  {
    address: '서울특별시 성북구 월곡동',
    latitude: 37.6031,
    longitude: 127.0413,
    count: 35,
  },
  {
    address: '서울특별시 성북구 동소문동',
    latitude: 37.5927,
    longitude: 127.0175,
    count: 22,
  },
  {
    address: '서울특별시 성북구 대광동',
    latitude: 37.5932,
    longitude: 127.0211,
    count: 26,
  },
];



interface StatsItem {
    category: string;
    count: number;
}

export const StatsData:StatsItem[] = [
  {category: "fireCount", count: 45},
  {category: "assaultCount", count: 28},
  {category: "swoonCount", count: 30},
  {category: "weaponCount", count: 17},
  {category: "crowdCongestionCount", count: 6},
]
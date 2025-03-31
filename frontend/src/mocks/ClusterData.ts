import { positionItem } from '@/types/chartType';

export const ClusterData: positionItem[] = [
  {
    address: '서울특별시 성북구 동선1동',
    latitude: 37.61,
    longitude: 127.016,
    fire_count: 8,
    assault_count: 14,
    crowd_congestion_count: 5,
    weapon_count: 8,
    swoon_count: 23,
  },
  {
    address: '서울특별시 성북구 정릉1동',
    latitude: 37.606,
    longitude: 127.03,
    fire_count: 11,
    assault_count: 10,
    crowd_congestion_count: 9,
    weapon_count: 8,
    swoon_count: 17,
  },
  {
    address: '서울특별시 성북구 길음1동',
    latitude: 37.62,
    longitude: 127.03,
    fire_count: 15,
    assault_count: 12,
    crowd_congestion_count: 6,
    weapon_count: 4,
    swoon_count: 15,
  },
  {
    address: '서울특별시 성북구 보문1동',
    latitude: 37.6,
    longitude: 127.02,
    fire_count: 11,
    assault_count: 10,
    crowd_congestion_count: 8,
    weapon_count: 4,
    swoon_count: 18,
  },
  {
    address: '서울특별시 성북구 삼선1동',
    latitude: 37.615,
    longitude: 127.01,
    fire_count: 13,
    assault_count: 14,
    crowd_congestion_count: 6,
    weapon_count: 4,
    swoon_count: 13,
  },
  {
    address: '서울특별시 성북구 장위1동',
    latitude: 37.615,
    longitude: 127.03,
    fire_count: 5,
    assault_count: 6,
    crowd_congestion_count: 4,
    weapon_count: 9,
    swoon_count: 17,
  },
  {
    address: '서울특별시 성북구 돈암1동',
    latitude: 37.59,
    longitude: 127.0,
    fire_count: 6,
    assault_count: 7,
    crowd_congestion_count: 1,
    weapon_count: 3,
    swoon_count: 8,
  },
];

interface StatsItem {
  category: string;
  count: number;
}

export const StatsData: StatsItem[] = [
  { category: 'fireCount', count: 45 },
  { category: 'assaultCount', count: 28 },
  { category: 'swoonCount', count: 30 },
  { category: 'weaponCount', count: 17 },
  { category: 'crowdCongestionCount', count: 6 },
];

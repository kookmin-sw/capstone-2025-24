export interface overviewType {
  recentCase: number;
  todayCase: number;
  mostCase: string;
  patrolRegion: string;
}

export interface DataItem {
  text: string;
  count: number;
  color: string;
}

export interface eventCountItem {
  fireCount: number;
  assaultCount: number;
  crowdCongestionCount: number;
  weaponCount: number;
  swoonCount: number;
}

export interface HourItem extends eventCountItem{
  hour: number;
}

export interface LocationItem {
  address: string;
  latitude: number;
  longitude: number;
  count: number;
}

export interface BarMonthItem extends eventCountItem{
  month: number;
}

export interface BarDayItem extends eventCountItem{
  day: number;
}

export interface positionItem {
  address: string;
  latitude: number;
  longitude: number;
  fire_count: number;
  assault_count: number;
  crowd_congestion_count: number;
  weapon_count: number;
  swoon_count: number;
}

export interface statsItem {
  fire_count: number;
  assault_count: number;
  crowd_congestion_count: number;
  weapon_count: number;
  swoon_count: number;
}

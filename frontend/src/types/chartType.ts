export interface overviewType {
  recentCase: number;
  todayCase: number;
  mostCase: string;
}

export interface CategoryItem {
  assault: number;
  crowd_congestion: number;
  fire: number;
  swoon: number;
  weapon: number;
}

export interface BarMonthItem {
  month: number;
  fireCount: number;
  assaultCount: number;
  crowdCongestionCount: number;
  weaponCount: number;
  swoonCount: number;
}

export interface BarDayItem {
  day: number;
  fireCount: number;
  assaultCount: number;
  crowdCongestionCount: number;
  weaponCount: number;
  swoonCount: number;
}

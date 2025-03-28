
export interface HourItem {
  hour: number;
  fireCount: number;
  assaultCount: number;
  crowdCongestionCount: number;
  weaponCount: number;
  swoonCount: number;
}

// 백에서 주는 형태
export const HourData: HourItem[] = [
  { hour: 0, fireCount: 3, assaultCount: 3, crowdCongestionCount: 7, weaponCount: 3, swoonCount: 9 },
  { hour: 1, fireCount: 3, assaultCount: 0, crowdCongestionCount: 7, weaponCount: 1, swoonCount: 4 },
  { hour: 2, fireCount: 5, assaultCount: 3, crowdCongestionCount: 7, weaponCount: 7, swoonCount: 8 },
  { hour: 3, fireCount: 6, assaultCount: 7, crowdCongestionCount: 8, weaponCount: 5, swoonCount: 1 },
  { hour: 4, fireCount: 9, assaultCount: 1, crowdCongestionCount: 8, weaponCount: 5, swoonCount: 3 },
  { hour: 5, fireCount: 6, assaultCount: 2, crowdCongestionCount: 5, weaponCount: 3, swoonCount: 3 },
  { hour: 6, fireCount: 4, assaultCount: 6, crowdCongestionCount: 1, weaponCount: 5, swoonCount: 2 },
  { hour: 7, fireCount: 0, assaultCount: 3, crowdCongestionCount: 8, weaponCount: 6, swoonCount: 5 },
  { hour: 8, fireCount: 3, assaultCount: 6, crowdCongestionCount: 0, weaponCount: 4, swoonCount: 2 },
  { hour: 9, fireCount: 3, assaultCount: 7, crowdCongestionCount: 4, weaponCount: 7, swoonCount: 5 },
  { hour: 10, fireCount: 2, assaultCount: 3, crowdCongestionCount: 6, weaponCount: 5, swoonCount: 4 },
  { hour: 11, fireCount: 5, assaultCount: 3, crowdCongestionCount: 1, weaponCount: 2, swoonCount: 2 },
  { hour: 12, fireCount: 7, assaultCount: 1, crowdCongestionCount: 6, weaponCount: 4, swoonCount: 8 },
  { hour: 13, fireCount: 6, assaultCount: 8, crowdCongestionCount: 6, weaponCount: 3, swoonCount: 5 },
  { hour: 14, fireCount: 3, assaultCount: 2, crowdCongestionCount: 4, weaponCount: 1, swoonCount: 6 },
  { hour: 15, fireCount: 4, assaultCount: 2, crowdCongestionCount: 5, weaponCount: 4, swoonCount: 2 },
  { hour: 16, fireCount: 8, assaultCount: 6, crowdCongestionCount: 4, weaponCount: 3, swoonCount: 1 },
  { hour: 17, fireCount: 3, assaultCount: 2, crowdCongestionCount: 7, weaponCount: 2, swoonCount: 2 },
  { hour: 18, fireCount: 1, assaultCount: 2, crowdCongestionCount: 4, weaponCount: 6, swoonCount: 2 },
  { hour: 19, fireCount: 2, assaultCount: 3, crowdCongestionCount: 3, weaponCount: 5, swoonCount: 6 },
  { hour: 20, fireCount: 3, assaultCount: 1, crowdCongestionCount: 3, weaponCount: 3, swoonCount: 1 },
  { hour: 21, fireCount: 6, assaultCount: 1, crowdCongestionCount: 2, weaponCount: 5, swoonCount: 5 },
  { hour: 22, fireCount: 2, assaultCount: 2, crowdCongestionCount: 4, weaponCount: 2, swoonCount: 3 },
  { hour: 23, fireCount: 1, assaultCount: 3, crowdCongestionCount: 2, weaponCount: 1, swoonCount: 4 },
];




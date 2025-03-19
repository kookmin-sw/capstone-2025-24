export const locations: string[] = [
  '중구 세종대로 110',
  '용산구 남산공원길 105',
  '종로구 사직로 161',
  '송파구 올림픽로 300',
  '영등포구 여의공원로 68',
];

export interface MarkerPosition {
  lat: number;
  lng: number;
};

export const markerPositions: MarkerPosition[] = [
  { lat: 37.5665, lng: 126.978 }, // 서울특별시청
  { lat: 37.5512, lng: 126.9882 }, // 남산타워
  { lat: 37.5796, lng: 126.977 }, // 경복궁
  { lat: 37.5112, lng: 127.098 }, // 잠실 롯데타워
  { lat: 37.4824, lng: 126.9013 }, // 여의도공원
];

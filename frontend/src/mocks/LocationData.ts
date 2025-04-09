export interface MarkerPosition {
  position: {
    lat: number;
    lng: number;
  };
  address: string;
  cctvUrl: string;
}

export const Locations: MarkerPosition[] = [
  {
    position: {
      lat: 37.5665,
      lng: 126.978,
    },
    address: '용산구 남산공원길 105',
    cctvUrl:
      'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
  {
    position: {
      lat: 37.5512,
      lng: 126.9882,
    },
    address: '종로구 사직로 161',
    cctvUrl:
      'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
  {
    position: {
      lat: 37.5796,
      lng: 126.977,
    },
    address: '중구 세종대로 110',
    cctvUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
  {
    position: {
      lat: 37.5112,
      lng: 127.098,
    },
    address: '송파구 올림픽로 300',
    cctvUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
  {
    position: {
      lat: 37.4824,
      lng: 126.9013,
    },
    address: '영등포구 여의공원로 68',
    cctvUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
];

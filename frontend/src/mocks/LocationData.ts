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
      'https://www.utic.go.kr/jsp/map/cctvStream.jsp?cctvid=L010029&cctvname=%25EA%25B4%2591%25ED%2599%2594%25EB%25AC%25B8&kind=Seoul&cctvip=undefined&cctvch=51&id=62&cctvpasswd=undefined&cctvport=undefined&minX=126.96688107900106&minY=37.56816579168645&maxX=126.98944520789765&maxY=37.583402893919406',
  },
  {
    position: {
      lat: 37.5512,
      lng: 126.9882,
    },
    address: '종로구 사직로 161',
    cctvUrl:
      'https://www.utic.go.kr/jsp/map/cctvStream.jsp?cctvid=E970086&cctvname=%25EB%2582%25A8%25EC%2582%25B02%25ED%2598%25B8%25ED%2584%25B0%25EB%2584%2590%25EB%2582%25A8%25EB%258B%25A8&kind=EC&cctvip=undefined&cctvch=54&id=544&cctvpasswd=undefined&cctvport=undefined&minX=126.96417797582875&minY=37.53490930120834&maxX=127.02442195076836&maxY=37.56585092940274',
  },
  {
    position: {
      lat: 37.5796,
      lng: 126.977,
    },
    address: '중구 세종대로 110',
    cctvUrl: '',
  },
  {
    position: {
      lat: 37.5112,
      lng: 127.098,
    },
    address: '송파구 올림픽로 300',
    cctvUrl: '',
  },
  {
    position: {
      lat: 37.4824,
      lng: 126.9013,
    },
    address: '영등포구 여의공원로 68',
    cctvUrl: '',
  },
];

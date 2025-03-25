export interface Incident {
  id: number;
  title: string;
  location: string;
  dateTime: string;
  police: string;
  videoUrl: string;
}

export const InProgressData: Incident[] = [
  {
    id: 1,
    title: '흉기난동',
    location: '서울특별시 성북구 보국문로 35길 21-54',
    dateTime: '2025.02.28 15:43:36',
    police: '김하나',
    videoUrl: 'https://github.com/user-attachments/assets/47bdc8a5-68d1-4edd-8d42-6e06272358b9',
  },
  {
    id: 2,
    title: '폭행',
    location: '서울특별시 강남구 테헤란로 87길 12',
    dateTime: '2025.02.28 14:20:10',
    police: '박준영',
    videoUrl: 'https://github.com/user-attachments/assets/47bdc8a5-68d1-4edd-8d42-6e06272358b9',
  },
  {
    id: 3,
    title: '화재',
    location: '서울특별시 마포구 홍익로 5길 9-7',
    dateTime: '2025.02.28 13:55:22',
    police: '이수민',
    videoUrl: '',
  },
  {
    id: 4,
    title: '화재',
    location: '서울특별시 성북구 보국문로 35길 21-54',
    dateTime: '2025.02.28 15:43:36',
    police: '김하나',
    videoUrl: '',
  },
  {
    id: 5,
    title: '군중밀집',
    location: '서울특별시 강남구 테헤란로 87길 12',
    dateTime: '2025.02.28 14:20:10',
    police: '박준영',
    videoUrl: '',
  },
  {
    id: 6,
    title: '폭행',
    location: '서울특별시 마포구 홍익로 5길 9-7',
    dateTime: '2025.02.28 13:55:22',
    police: '이수민',
    videoUrl: '',
  },
  {
    id: 7,
    title: '폭행',
    location: '서울특별시 마포구 홍익로 5길 9-7',
    dateTime: '2025.02.28 13:55:22',
    police: '이수민',
    videoUrl: '',
  },
];

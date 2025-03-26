interface labelItem {
  key: string;
  text: string;
  color: string;
}

export const LABELBYCATEGORY: labelItem[] = [
  { key: 'fireCount', text: '화재', color: '#F08676' },
  { key: 'assultCount', text: '폭행', color: '#A7C972' },
  { key: 'swoonCount', text: '쓰러짐', color: '#79A4E8' },
  { key: 'weaponCount', text: '흉기난동', color: '#7ED1C1' },
  { key: 'crowdCongestionCount', text: '군중밀집', color: '#EBC266' },
];

export const LABELBYREGION: labelItem[] = [
  { key: '1', text: '정릉 1동', color: '#5877FF' },
  { key: '2', text: '정릉 2동', color: '#A8B3E3' },
  { key: '3', text: '정릉 3동', color: '#3257FE' },
  { key: '4', text: '정릉 4동', color: '#849DFF' },
  { key: '5', text: '정릉 5동', color: '#D4D8FF' },
];

export const STATSLABEL: labelItem[] = [
  { key: 'fireCount', text: '화재', color: '#5877FF' },
  { key: 'assultCount', text: '폭행', color: '#A8B3E3' },
  { key: 'swoonCount', text: '쓰러짐', color: '#3257FE' },
  { key: 'weaponCount', text: '흉기난동', color: '#849DFF' },
  { key: 'crowdCongestionCount', text: '군중밀집', color: '#D4D8FF' },
];

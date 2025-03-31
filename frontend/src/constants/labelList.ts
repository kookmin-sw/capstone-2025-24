interface labelItem {
  key: string;
  text: string;
  color: string;
}

interface regionLabelItem {
  key: string;
  color: string;
}
export const LABELBYCATEGORY: labelItem[] = [
  { key: 'crowdCongestionCount', text: '군중밀집', color: '#79A4E8' },
  { key: 'weaponCount', text: '흉기난동', color: '#7ED1C1' },
  { key: 'swoonCount', text: '쓰러짐', color: '#A7C972' },
  { key: 'assaultCount', text: '폭행', color: '#EBC266' },
  { key: 'fireCount', text: '화재', color: '#F08676' },
];

export const LABELBYREGION: regionLabelItem[] = [
  { key: '1', color: '#5877FF' },
  { key: '2', color: '#A8B3E3' },
  { key: '3', color: '#3257FE' },
  { key: '4', color: '#849DFF' },
  { key: '5', color: '#D4D8FF' },
];

export const STATSLABEL: labelItem[] = [
  { key: 'fireCount', text: '화재', color: '#5877FF' },
  { key: 'assaultCount', text: '폭행', color: '#A8B3E3' },
  { key: 'swoonCount', text: '쓰러짐', color: '#3257FE' },
  { key: 'weaponCount', text: '흉기난동', color: '#849DFF' },
  { key: 'crowdCongestionCount', text: '군중밀집', color: '#D4D8FF' },
];

export const EVENT_CATEGORY: { [key: string]: string } = {
  fire: '화재',
  smoke: '연기',
  swoon: '쓰러짐',
  crowd_congestion: '군중밀집',
  weapon: '흉기난동',
  assault: '폭행',
};

export const CATEGORY: string[] = ['화재', '연기', '쓰러짐', '폭행', '흉기난동', '군중밀집'];
export type EventCategory = (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];
export const periodLst: string[] = ['weekly', 'monthly', 'yearly'];

export const EVENT_CATEGORY: { [key: string]: string } = {
  fire: '화재',
  swoon: '쓰러짐',
  crowd_congestion: '군중밀집',
  weapon: '흉기난동',
  assault: '폭행',
};
export type EventCategory = (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];

export const periodLst: string[] = ['weekly', 'monthly', 'yearly'];

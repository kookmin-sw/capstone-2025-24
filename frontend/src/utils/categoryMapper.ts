import { EVENT_CATEGORY } from '@/constants/EventCategory';

export const getMappedCategory = (category: string | null): string => {
  if (!category) return '';
  return EVENT_CATEGORY[category] || category;
};

export const categoryToEnglish: Record<string, string> = {
  화재: 'fire',
  폭행: 'assault',
  군중밀집: 'crowd_congestion',
  흉기난동: 'weapon',
  쓰러짐: 'swoon',
};

export const categoryToKorean: Record<string, string> = {
  fire: '화재',
  assault: '폭행',
  crowd_congestion: '군중밀집',
  weapon: '흉기난동',
  swoon: '쓰러짐',
};

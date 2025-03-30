export const categoryMap: Record<string, string> = {
  fire: '화재',
  assault: '폭행',
  crowd_congestion: '군중밀집',
  weapon: '흉기난동',
  swoon: '쓰러짐',
};

export const getMappedCategory = (category: string): string =>
  categoryMap[category] || category;
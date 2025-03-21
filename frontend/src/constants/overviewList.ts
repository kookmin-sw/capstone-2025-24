interface OverviewItem {
  title: string;
  tooltipText: string;
  $barColor: string;
}

export const OVERVIEW_LIST: OverviewItem[] = [
  {
    title: '최근 발생 사건 수',
    tooltipText: '지난 7일 기준',
    $barColor: '#5873EE',
  },
  {
    title: '오늘 발생 사건 수',
    tooltipText: '지난 24시간 기준',
    $barColor: '#7D92ED',
  },
  {
    title: '최다 발생 사건',
    tooltipText: '이번 달 기준',
    $barColor: '#A8B3E3',
  },
];

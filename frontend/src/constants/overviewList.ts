interface OverviewItem {
  title: string;
  // count: number;
  tooltipText: string;
}

export const OVERVIEW_LIST: OverviewItem[] = [
  {
    title: '최근 발생 사건 수',
    tooltipText: '지난 7일 기준',
  },
  {
    title: '오늘 발생 사건 수',
    tooltipText: '지난 24시간 기준',
  },
  {
    title: '최다 발생 사건',
    tooltipText: '이번 달 기준',
  },
];



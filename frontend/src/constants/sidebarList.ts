import  CCTV  from "../assets/svgs/cctv.svg";
import  CCTV_SOLID  from "../assets/svgs/cctv_solid.svg";
import  CHART  from "../assets/svgs/chart.svg";
import  CHART_SOLID  from "../assets/svgs/chart_solid.svg";
import  DOCU  from "../assets/svgs/docu.svg";
import  DOCU_SOLID  from "../assets/svgs/docu_solid.svg";

export const SIDEBAR_LIST = [
  { 
    id: 1,
    text: '실시간 모니터링',
    icon: CCTV,
    icon_focused: CCTV_SOLID,
  },
  { id: 2,
    text: '사건 기록 조회',
    icon: DOCU,
    icon_focused: DOCU_SOLID,
  },
  {
    id:3,
    text: '통계 차트',
    icon: CHART,
    icon_focused: CHART_SOLID,
  },
];

export type SidebarListTypes = typeof SIDEBAR_LIST;

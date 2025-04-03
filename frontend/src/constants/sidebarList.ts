import CCTV from '@/assets/icons/cctv.svg';
import CCTV_SOLID from '@/assets/icons/cctv_solid.svg';
import CHART from '@/assets/icons/chart.svg';
import CHART_SOLID from '@/assets/icons/chart_solid.svg';
import DOCU from '@/assets/icons/docu.svg';
import DOCU_SOLID from '@/assets/icons/docu_solid.svg';
import { IconType } from 'react-icons';
import { BiSolidCctv } from "react-icons/bi";
import { GrDocument } from "react-icons/gr";
import { GoGraph } from "react-icons/go";
import { IoDocumentSharp } from "react-icons/io5";
interface SidebarItem {
  id: number;
  text: string;
  icon: IconType;
  icon_focused: string;
}

export const SIDEBAR_LIST:SidebarItem[] = [
  {
    id: 1,
    text: '실시간 모니터링',
    icon: BiSolidCctv,
    icon_focused: CCTV_SOLID,
  },
  { id: 2, text: '사건 기록 조회', icon: IoDocumentSharp, icon_focused: DOCU_SOLID },
  {
    id: 3,
    text: '통계 차트',
    icon: GoGraph,
    icon_focused: CHART_SOLID,
  },
];

export type SidebarListTypes = typeof SIDEBAR_LIST;

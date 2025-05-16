import { IconType } from 'react-icons';
import { BiSolidCctv } from 'react-icons/bi';
import { GoGraph } from 'react-icons/go';
import { IoDocumentSharp } from 'react-icons/io5';
interface SidebarItem {
  id: number;
  text: string;
  icon: IconType;
}

export const SIDEBAR_LIST: SidebarItem[] = [
  {
    id: 1,
    text: '모니터링',
    icon: BiSolidCctv,
  },
  { id: 2, text: '사건 기록', icon: IoDocumentSharp },
  {
    id: 3,
    text: '통계 차트',
    icon: GoGraph,
  },
];

export type SidebarListTypes = typeof SIDEBAR_LIST;

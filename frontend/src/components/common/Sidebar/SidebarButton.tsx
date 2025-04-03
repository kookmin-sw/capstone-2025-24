import * as S from './Sidebar.style';
import sidebarStore from '@/stores/sidebarStore';
import { IconType } from 'react-icons';
interface SidebarButtonProps {
  id: number;
  text: string;
  icon: IconType;
  size: string;
  onClick: () => void;
}

const SidebarButton = ({ id, text, icon, size, onClick }: SidebarButtonProps) => {
  const { page } = sidebarStore();
  const Icon = icon;
  return (
    <S.SidebarBtn className={`${page === id ? 'active' : ''}`} onClick={onClick}>
      <Icon />
      {/* <img alt="icon" src={page === id ? icon_focused : icon} style={{ width: size, height: size }} /> */}
      {text}
    </S.SidebarBtn>
  );
};

export default SidebarButton;

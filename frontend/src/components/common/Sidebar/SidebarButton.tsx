import * as S from './Sidebar.style';
import sidebarStore from '@/stores/sidebarStore';
import { IconType } from 'react-icons';
interface SidebarButtonProps {
  id: number;
  text: string;
  icon: IconType;
  onClick: () => void;
}

const SidebarButton = ({ id, text, icon, onClick }: SidebarButtonProps) => {
  const { page } = sidebarStore();
  const Icon = icon;
  return (
    <S.SidebarBtn className={`${page === id ? 'active' : ''}`} onClick={onClick}>
      <Icon />
      {text}
    </S.SidebarBtn>
  );
};

export default SidebarButton;

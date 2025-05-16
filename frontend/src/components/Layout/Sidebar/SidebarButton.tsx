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
    <S.SidebarBtn onClick={onClick}>
      <S.IconDiv className={`${page === id ? 'active' : ''}`}>
        <Icon className='icon'/>
      </S.IconDiv>
      {text}
    </S.SidebarBtn>
  );
};

export default SidebarButton;

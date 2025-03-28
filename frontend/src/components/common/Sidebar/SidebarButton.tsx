import * as S from './Sidebar.style';
import sidebarStore from '@/stores/sidebarStore';

interface SidebarButtonProps {
  id: number;
  text: string;
  icon: string;
  icon_focused: string;
  size: string;
  onClick: () => void;
}

const SidebarButton = ({ id, text, icon, icon_focused, size, onClick }: SidebarButtonProps) => {
  const { page } = sidebarStore();
  // const [isFocused, setIsFocused] = useState(false);
  return (
    <S.SidebarBtn className={`${page === id ? 'active' : ''}`} onClick={onClick}>
      <img alt="icon" src={page === id ? icon_focused : icon} style={{ width: size, height: size }} />
      {text}
    </S.SidebarBtn>
  );
};

export default SidebarButton;

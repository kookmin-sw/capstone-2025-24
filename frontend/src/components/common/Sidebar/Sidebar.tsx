import * as S from './style';
import Profile from './Profile';
import SidebarBtn from './SidebarBtn';
import { SIDEBAR_LIST } from '../../../constants/sidebarList';

interface SidebarProps {
  name: string;
  imgUrl: string;
  level: string;
  territory: string;
}

const Sidebar = ({ name, imgUrl, level, territory }: SidebarProps) => {
  return (
    <S.SidebarLayout>
      <S.LogoDiv>로고</S.LogoDiv>
      <Profile name={name} imgUrl={imgUrl} level={level} territory={territory} />
      <S.BtnDiv>
        {SIDEBAR_LIST.map((it: { text: string; icon: string, icon_focused: string }) => {
          return <SidebarBtn key={it.text} text={it.text} icon={it.icon} icon_focused={it.icon_focused} size={"20px"} onClick={() => console.log(it.text)} />;
        })}
      </S.BtnDiv>
    </S.SidebarLayout>
  );
};

export default Sidebar;

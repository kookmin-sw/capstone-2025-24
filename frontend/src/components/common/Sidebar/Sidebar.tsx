import * as S from './style';
import Profile from './Profile';
import SidebarBtn from './SidebarBtn';
import { SIDEBAR_LIST } from '../../../constants/sidebarList';
import { Outlet } from 'react-router-dom';

export const Sidebar = () => {
  const tmpData = { name: '홍길동', imgUrl: '', level: '순경', territory: '정릉2동 파출소' };
  return (
    <S.SidebarLayout>
      <S.SidebarDiv>
        <S.LogoDiv>로고</S.LogoDiv>
        <Profile name={tmpData.name} imgUrl={tmpData.imgUrl} level={tmpData.level} territory={tmpData.territory} />
        <S.BtnDiv>
          {SIDEBAR_LIST.map((it: { text: string; icon: string; icon_focused: string }) => {
            return (
              <SidebarBtn
                key={it.text}
                text={it.text}
                icon={it.icon}
                icon_focused={it.icon_focused}
                size={'20px'}
                onClick={() => console.log(it.text)}
              />
            );
          })}
        </S.BtnDiv>
      </S.SidebarDiv>
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.SidebarLayout>
  );
};

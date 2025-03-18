import * as S from './style';
import Profile from './Profile';
import SidebarButton from './SidebarButton';
import { SIDEBAR_LIST } from '../../../constants/sidebarList';
import { Outlet, useNavigate } from 'react-router-dom';
import sidebarStore from '../../../stores/sidebarStore';

export const Sidebar = () => {
  const { setPage } = sidebarStore();
  const navigate = useNavigate();
  const tmpData = { name: '홍길동', imgUrl: '', level: '순경', territory: '정릉2동 파출소' };
  const handleNavigate = (target: number) => {
    setPage(() => target);
    switch (target) {
      case 1:
        navigate('/monitoring');
        return;
      case 2:
        navigate('/history');
        return;
      case 3:
        navigate('/chart');
        return;
    }
  };

  return (
    <S.SidebarLayout>
      <S.SidebarDiv>
        <S.LogoDiv>로고</S.LogoDiv>
        <Profile name={tmpData.name} imgUrl={tmpData.imgUrl} level={tmpData.level} territory={tmpData.territory} />
        <S.BtnDiv>
          {SIDEBAR_LIST.map((it: { id: number; text: string; icon: string; icon_focused: string }) => {
            return (
              <SidebarButton
                key={it.text}
                text={it.text}
                icon={it.icon}
                icon_focused={it.icon_focused}
                size={'20px'}
                id={it.id}
                onClick={() => handleNavigate(it.id)}
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

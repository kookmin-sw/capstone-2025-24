import * as S from './Sidebar.style';
import Profile from './Profile';
import SidebarButton from './SidebarButton';
import { SIDEBAR_LIST } from '../../../constants/sidebarList';
import { Outlet, useNavigate } from 'react-router-dom';
import useSidebarStore from '../../../stores/sidebarStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const { setPage } = useSidebarStore();
  const navigate = useNavigate();
  const tmpData = { name: '홍길동', imgUrl: '', level: '순경', territory: '정릉2동 파출소' };

  useEffect(() => {
    switch (location.pathname) {
      case '/history':
        setPage(() => 2);
        break;
      case '/chart':
        setPage(() => 3);
        break;
      default:
        setPage(() => 1);
        break;
    }
  }, [location.pathname, setPage]);

  const handleNavigate = (target: number) => {
    setPage(() => target); // 동기적으로 처리
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
          {SIDEBAR_LIST.map((it) => {
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

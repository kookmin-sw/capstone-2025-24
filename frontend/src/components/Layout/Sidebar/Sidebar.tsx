import * as S from './Sidebar.style';
import Profile from './Profile';
import SidebarButton from './SidebarButton';
import { SIDEBAR_LIST } from '@/constants/sidebarList';
import { useNavigate } from 'react-router-dom';
import useSidebarStore from '@/stores/sidebarStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import logoWhite from '@/assets/icons/logoWhite.svg';

export const Sidebar = () => {
  const location = useLocation();
  const { setPage } = useSidebarStore();
  const navigate = useNavigate();

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
    setPage(() => target);
    switch (target) {
      case 1:
        navigate('/monitoring');
        window.location.reload();
        break;
      case 2:
        navigate('/history');
        window.location.reload();
        break;
      case 3:
        navigate('/chart');
        window.location.reload();
        break;
    }
  };

  return (
    <S.SidebarDiv>
      <div>
        <S.LogoImg src={logoWhite} />
        <Profile />
        <S.BtnDiv>
          {SIDEBAR_LIST.map((it) => {
            const Icon = it.icon;
            return (
              <SidebarButton
                key={it.text}
                text={it.text}
                icon={Icon}
                id={it.id}
                onClick={() => handleNavigate(it.id)}
              />
            );
          })}
        </S.BtnDiv>
      </div>
      <LogoutButton />
    </S.SidebarDiv>
  );
};

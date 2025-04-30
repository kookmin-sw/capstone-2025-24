import { useAuthStore } from '@/stores/authStore';
import * as S from './Sidebar.style';

const LogoutButton = () => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (!confirmLogout) {
      return;
    }

    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 중 문제가 발생했습니다.');
    }
  };

  return (
    <S.LogoutBtn onClick={handleLogout}>
      <S.LogoutLogo />
      로그아웃
    </S.LogoutBtn>
  );
};

export default LogoutButton;

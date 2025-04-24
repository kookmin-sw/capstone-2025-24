import { useAuthStore } from '@/stores/authStore';

const LogoutButton = () => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 중 문제가 발생했습니다.');
    }
  };

  return (
    <button onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;

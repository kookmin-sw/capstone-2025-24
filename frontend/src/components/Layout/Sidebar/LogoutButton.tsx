import { useAuthStore } from '@/stores/authStore';
import * as S from './Sidebar.style';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

const LogoutButton = () => {
  const { logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
      <S.LogoutBtn onClick={() => setIsModalOpen(true)}>
        <S.LogoutLogo />
        로그아웃
      </S.LogoutBtn>

      {isModalOpen && (
        <ConfirmModal
          message="로그아웃 하시겠습니까?"
          onConfirm={handleLogout}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default LogoutButton;

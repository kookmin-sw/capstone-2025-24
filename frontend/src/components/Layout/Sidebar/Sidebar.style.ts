import styled from 'styled-components';
import { RiLogoutBoxRLine } from 'react-icons/ri';

// Layout ---------------------------//
export const Layout = styled.div`
  display: flex;
  height: 100vh;
`;
export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  height: 100vh;
  background-color: var(--gray300);
`;

// Sidebar.tsx --------------------------//
export const SidebarDiv = styled.div`
  width: 100px;
  height: 100vh;
  background-color: #0b227c;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;

export const LogoImg = styled.img`
  width: 45px;
  display: block;
  margin: 20px auto;
`;

export const BtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 34px;
  gap: 15px;
`;

// Profile ----------------------------------//
export const ProfileLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 3px;
`;

export const InfoText = styled.span<{ type?: 'name' | 'rank' | 'officeName' }>`
  font-size: ${({ type }) => (type === 'name' ? '16px' : '12px')};
  font-weight: ${({ type }) => (type === 'name' ? '600' : '')};
  margin-right: 5px;
  color: var(--primary600);
`;

// SidebarButton.tsx --------------------------------------//
export const SidebarBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 16px;
  gap: 12px;
  cursor: default;
  gap: 6px;
  color: var(--primary700);
  background-color: #00ff0000;
  border: none;
`;

export const IconDiv = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00ff0000;

  &:hover {
    background-color: rgba(161, 180, 255, 0.1);
  }

  &.active {
    background-color: #1b349b;
    border: 1px solid #465fc3;
  }

  .icon {
    width: 50%;
    height: 50%;
  }
`;

// LogoutButton.tsx ------------------------------- //
export const LogoutBtn = styled.button`
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  padding-bottom: 20px;
  cursor: pointer;
  background-color: transparent;
  color: #a8b3e3;
  gap: 4px;
`;

export const LogoutLogo = styled(RiLogoutBoxRLine)`
  font-size: 20px;
  color: #a8b3e3;
`;

// ConfirmModal.tsx -----------------------//
export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  width: 350px;
`;

export const Message = styled.p`
  margin-bottom: 20px;
  padding: 20px;
  font-size: 20px;
  font-weight: 500;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const ConfirmBtn = styled.button`
  background: var(--primary900);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
`;

export const CancelBtn = styled.button`
  border: 1px solid #e0e0e0;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: transparent;
  font-size: 15px;
  font-weight: 500;
`;

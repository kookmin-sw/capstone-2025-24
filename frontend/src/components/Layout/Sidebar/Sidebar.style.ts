import { Avatar, Button } from '@mui/material';
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
  width: 220px;
  height: 100vh;
  background-color: rgb(37, 86, 200);

  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LogoImg = styled.img`
  width: 180px;
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
  gap: 4px;
`;

export const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 10px;
  margin: 10px;
  background-color: none;
  font-size: 16px;
  color: white;
  border: 1px solid var(--primary700);
`;

// Profile ----------------------------------//
export const ProfileLayout = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  padding-left: 15px;
  gap: 14px;
`;

export const ProfileAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  border: 1px solid var(--gray500);
`;

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: fit-content;
  gap: 3px;
`;

export const InfoText = styled.span<{ type?: 'name' | 'rank' | 'officeName' }>`
  font-size: ${({ type }) => (type === 'name' ? '20px' : type === 'rank' ? '14px' : '12px')};
  font-weight: ${({ type }) => (type === 'name' ? '600' : '')};
  margin-right: 5px;
  color: var(--primary300);
`;

// SidebarBtn --------------------------------------//
export const SidebarBtn = styled(Button)`
  border: 1px solid rgb(37, 86, 200);
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 90%;
  font-size: 16px;
  border-radius: 7px;
  padding: 8px 6px;
  padding-left: 15px;
  cursor: default;

  gap: 9px;
  color: rgb(243, 243, 243);
  background-color: #00ff0000;
  .IconType {
    color: white;
  }

  &:hover {
    background-color: rgba(161, 180, 255, 0.1);
  }

  &.active {
    background-color: rgba(151, 172, 255, 0.14);
    border: 1px solid rgb(126, 146, 239);
  }
`;

// LogoutButton.tsx ------------------------------- //
export const LogoutBtn = styled.button`
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font-size: 16px;
  padding: 8px 6px;
  padding-left: 15px;
  cursor: pointer;
  background-color: transparent;
  color: var(--gray400);
`;

export const LogoutLogo = styled(RiLogoutBoxRLine)`
  font-size: 20px;
  margin: 15px 8px;
  color: var(--gray400);
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

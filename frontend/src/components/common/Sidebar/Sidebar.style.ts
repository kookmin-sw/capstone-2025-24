import { Avatar, Button } from '@mui/material';
import styled from 'styled-components';

// Layout ---------------------------//
export const Layout = styled.div`
  display: flex;
  height: 100vh;
`;
export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  height: 100vh;
  background-color: #fdfdfd;
`;

// Sidebar --------------------------//
export const SidebarDiv = styled.div`
  width: 240px;
  height: 100vh;
  // background-color:rgb(16, 36, 117);
  background-color:rgb(9, 29, 109);
  // box-shadow: 15px 0px 15px 0px rgba(164, 163, 163, 0.3);
  box-shadow: 10px 0px 10px 0px rgba(200, 200, 200, 0.70);
  z-index: 5;
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
  background-color: var(--gray400);
  font-size: 16px;
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
  border: 1px solid #0b227c;
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
  color: var(--primary700);
  background-color: #00ff0000;
  .IconType {
    color: var(--primary700);
  }

  &:hover {
    background-color: rgba(161, 180, 255, 0.1);
  }

  &.active {
    background-color: rgba(151, 172, 255, 0.14);
    border: 1px solid #465fc3;
  }
`;

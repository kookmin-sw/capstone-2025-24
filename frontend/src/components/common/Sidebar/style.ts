import { Avatar, Button } from '@mui/material';
import styled from 'styled-components';

// Sidebar --------------------------//
export const SidebarDiv = styled.div`
  width: 204px;
  height: 100vh;
  background-color: var(--primary400);
`;
export const SidebarLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
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
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 9px;
  gap: 8px;
`;

export const ProfileAvatar = styled(Avatar)`
  width: 55px;
  height: 55px;
  border: 1px solid var(--gray500);
`;

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: fit-content;
`;

export const InfoText = styled.span<{ type?: 'name' | 'level' | 'territory' }>`
  font-size: ${({ type }) => (type === 'name' ? '20px' : type === 'level' ? '14px' : '12px')};
  font-weight: ${({ type }) => (type === 'name' ? 'bold' : '')};
  margin-right: 5px;
`;

// SidebarBtn --------------------------------------//
export const BtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 34px;
`;

export const SidebarBtnLayout = styled(Button)`
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 95%;
  font-size: 17px;
  border-radius: 10px;
  padding: 8px 6px;
  padding-left: 15px;
  gap: 6px;
  color: black;
  font-weight: bold;
  background-color: #00ff0000;

  &:hover {
    background-color: var(--primary500);
  }

  &:focus {
    background-color: var(--primary900);
    color: white;
  }
`;

// Layout
export const MainContent = styled.div`
`;

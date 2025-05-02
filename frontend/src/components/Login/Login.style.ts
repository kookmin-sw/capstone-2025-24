import styled from 'styled-components';
import { Button } from '@mui/material';

// LoginCard.tsx ------------------------------------//
export const LoginCard = styled.section`
  display: flex;
  width: 60%;
  height: 70%;
  border-radius: 20px;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

// InfoSide.tsx ------------------------------------//
export const InfoSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: rgb(44, 108, 255);
  border-radius: 20px 0 0 20px;
  padding: 24px;
`;

// FormSide.tsx ------------------------------------//
export const FormSideLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 50%;
  height: 100%;
  background-color: white;
  border-radius: 0 20px 20px 0;
  padding-left: 43px;
`;

export const InfoP = styled.span`
  font-size: 16px;
  color: var(--gray600);
  margin: 5px 0 28px 0px;
`;

// LoginForm.tsx ------------------------------------//
export const LoginFormLayout = styled.form``;

export const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LoginInput = styled.input<{ $isFailed: boolean }>`
  width: 330px;
  height: 47px;
  border-radius: 5px;
  border: 1.3px solid ${({ $isFailed }) => ($isFailed ? 'var(--red)' : '#C3C3C3')};
  padding: 17px 15px;
  font-size: 16px;
`;

export const ValidSection = styled.section<{ $isFailed: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: ${({ $isFailed }) => ($isFailed ? 'var(--red)' : 'white')};
  margin-top: 2px;
`;

export const LoginBtn = styled(Button)`
  width: 330px;
  height: 47px;
  background-color:rgb(66, 110, 255);
  color: white;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  margin-top: 30px;
  cursor: pointer;
`;

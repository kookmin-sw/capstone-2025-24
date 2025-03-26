import styled from 'styled-components';
import { Button } from '@mui/material';

// LoginForm.tsx ------------------------------------//
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled.input`
  width: 290px;
  height: 53px;
  border-radius: 10px;
  border: 1px solid var(--gray500);
  padding: 17px 21px;
  font-size: 16px;
  margin: 10px;
`;

export const LoginBtn = styled(Button)`
  width: 290px;
  height: 53px;
  background-color: var(--primary900);
  color: white;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  margin: 15px;
  cursor: pointer;
`;

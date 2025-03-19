import { IoAlertCircleOutline } from 'react-icons/io5';
import styled from 'styled-components';

// ToolTip.tsx
export const InfoIcon = styled(IoAlertCircleOutline)`
  font-size: 18px;
  color: var(--gray600);
  margin: 0px 8px;
  cursor: pointer;
`;

export const TooltipP = styled.p`
  display: flex;
  padding: 0px 10px;
  text-align: center;
  justify-content: center;
  align-items-center;
  font-size: 10px;
  color: var(--gray800)
`;
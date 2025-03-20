import styled from 'styled-components';
import { Button } from '@mui/material';

interface FilterItemProps {
  isSelected: boolean;
}
export const ChartFilterLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  margin-top: 5px;
  width: 175px;
`;

export const FilterItem = styled(Button)<FilterItemProps>`
  flex: 1;
  font-size: 12px;
  min-width: 0; /* ✅ MUI 기본 min-width(64px) 무력화 */
  width: 33%; /* ✅ 부모 크기에 맞춤 */
  font-weight: 600;
  border-radius: 0%;
  color: ${({ isSelected }) => (isSelected ? `var(--primary900)` : `var(--gray500)`)};
  background-color: white;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid ${({ isSelected }) => (isSelected ? `var(--primary900)` : `var(--gray500)`)};
  cursor: pointer;

  &:hover {
    border-bottom: 3px solid ${({ isSelected }) => (isSelected ? `var(--primary900)` : `var(--gray700)`)};
    color: ${({ isSelected }) => (isSelected ? `var(--primary900)` : `var(--gray700)`)};
    transition: all 0.2s; /* hover 상태에서만 transition 적용 */
  }

  &:not(:hover) {
    transition: none; /* isSelected 변경 시 transition 제거 */
  }
`;

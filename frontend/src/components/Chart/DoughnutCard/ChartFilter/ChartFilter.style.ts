import styled from 'styled-components';

export const ChartFilterLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  margin-top: 5px;
  width: 175px;
`;

export const FilterItem = styled.button<{$isSelected:boolean}>`
  flex: 1;
  font-size: 12px;
  min-width: 0;
  width: 33%;
  font-weight: 600;
  border-radius: 0%;
  color: ${({ $isSelected }) => ($isSelected ? `var(--primary900)` : `var(--gray500)`)};
  background-color: white;
  height: 24px;
  justify-content: center;
  align-items: center;
  border: none;
  border-bottom: 3px solid ${({ $isSelected }) => ($isSelected ? `var(--primary900)` : `var(--gray500)`)};
  cursor: pointer;

  &:hover {
    border-bottom: 3px solid ${({ $isSelected }) => ($isSelected ? `var(--primary900)` : `var(--gray700)`)};
    color: ${({ $isSelected }) => ($isSelected ? `var(--primary900)` : `var(--gray700)`)};
    transition: all 0.2s;
  }

  &:not(:hover) {
    transition: none;
  }
`;

import styled from 'styled-components';

interface FilterItemProps {
    isSelected: boolean;
}
export const ChartFilterLayout = styled.div`
  display: flex;
  flex-direction: row;
  /* border: 1px solid blue; */
  width: 40%;
  height: 10%;
`;

export const FilterItem = styled.button<FilterItemProps>`
  display: flex;
  font-size: 12px;
  color: ${({isSelected})=>isSelected?`var(--primary900)`:`var(--gray500)`};
  font-weight: 600;
  background-color: white;
  width: 33%;
  justify-content: center;
  align-items: center;
  border: none;
  border-bottom: 2px solid ${({isSelected})=>isSelected?`var(--primary900)`:`var(--gray500)`};
  cursor: pointer;
`;





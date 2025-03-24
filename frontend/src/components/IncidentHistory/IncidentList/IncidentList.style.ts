import styled from 'styled-components';

// IncidentList.tsx -----------------------------//
export const Layout = styled.div`
  width: 1153px;
  height: 700px;
`;

export const IncidentNum = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 10px 0px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IncidentListDiv = styled.div`
  background-color: white;
  width: 100%;
  height: 580px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  padding: 15px 54px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeaderRow = styled.tr`
  height: 50px;
`;

export const TableHeader = styled.th<{ w: number }>`
  font-size: 18px;
  width: ${(props) => props.w}%;
  font-weight: 600;
  text-align: left;
  border-bottom: 2px solid var(--gray800);
`;

export const TableBodyRow = styled.tr`
  cursor: pointer;
  height: 63px;

  &:hover {
    background: var(--primary300);
  }
`;

export const TableData = styled.td<{ index: number }>`
  padding: 10px;
  border-bottom: ${(props) => (props.index === 8 ? 'none' : '2px solid var(--gray400)')};
`;

export const InfoP = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ active }) => (active ? 'var(--primary800)' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border: 1px solid var(--gray300);
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;
  font-size: 18px;

  &:active {
    background-color: var(--primary700);
  }
`;

export const MoveBtn = styled.button`
  width: 35px;
  height: 35px;
  border: none;
  background-color: white;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:disabled {
    color: var(--gray500);
    cursor: default;
  }
`;

// SortingDropDown.tsx -----------------------//

export const DropdownWrapper = styled.div`
  position: relative;
  width: 69px;
`;

export const DropdownHeader = styled.button<{ isOpen: boolean }>`
  width: 100%;
  height: 26px;
  padding: 0px 10px;
  background: ${({ isOpen }) => (isOpen ? 'var(--primary500)' : 'white')};
  border: 1px solid var(--gray400);
  border-radius: 5px;
  cursor: pointer;
  font-size: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  color: var(--gray800);

  svg {
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

export const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 0 2px var(--gray400) inset;
  margin-top: 6px;
  overflow: hidden;
  padding: 0;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease-in-out;
  text-align: center;

  ${({ isOpen }: { isOpen: boolean }) =>
    isOpen &&
    `
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `}
`;

export const DropdownItem = styled.li<{ isSelected: boolean }>`
  padding: 3px 0px;
  margin: 5px 5px;
  font-size: 11px;
  cursor: pointer;
  transition: background 0.2s ease;
  background: ${({ isSelected }) => (isSelected ? 'var(--primary500)' : 'transparent')};
  color: black;
  border-radius: 5px;
  text-align: center;

  &:hover {
    background: var(--primary500);
  }
`;

// EmptyView.tsx ---------------------------------//
export const EmtyViewLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EmtyViewP = styled.p`
  font-size: 30px;
  color: var(--gray500);
  margin: 30px;
`;

export const EmptyImg = styled.img`
  width: 213px;
  height: 213px;
`;

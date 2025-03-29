import styled from 'styled-components';

// IncidentList.tsx -----------------------------//
export const Layout = styled.div`
  width: 1153px;
  height: 700px;
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
  padding: 0 0 0 10px;
`;

export const TableBodyRow = styled.tr`
  cursor: pointer;
  height: 63px;

  &:hover {
    background: var(--primary300);
  }
`;

export const TableData = styled.td<{ index: number }>`
  padding: 10px 0;
  border-bottom: ${(props) => (props.index === 8 ? 'none' : '2px solid var(--gray400)')};
`;

export const InfoP = styled.p`
  font-size: 18px;
  font-weight: 400;
  padding: 0 0 0 12px;
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

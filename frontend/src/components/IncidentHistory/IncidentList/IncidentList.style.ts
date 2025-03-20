import styled from 'styled-components';

export const Layout = styled.div`
  width: 1153px;
  height: 630px;
`;

export const IncidentNum = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 10px 0px;
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

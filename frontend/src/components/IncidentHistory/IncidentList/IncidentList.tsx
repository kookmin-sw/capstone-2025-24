import * as S from './IncidentList.style.ts';
import IncidentListData from '../../../mocks/IncidentListData.ts';
import { useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import SortingDropDown from './SortingDropDown.tsx';
import EmptyView from './EmptyView.tsx';

interface IncidentListProps {
  onOpen: (id: number) => void;
}

const IncidentList = ({ onOpen }: IncidentListProps) => {
  // 사건 리스트 데이터
  const incidentdata = IncidentListData;

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  // 페이지네이션
  const incident_num = incidentdata.length; // 사건 총 개수 (나중에 백한테 전달받아서 사용)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 한 페이지에 아이템 몇 개 들어가는지
  const startIndex = (currentPage - 1) * itemsPerPage; // 현재페이지의 첫 아이템의 인덱스
  const currentData = incidentdata.slice(startIndex, startIndex + itemsPerPage); // 현재 페이지에 보여지는 사건 데이터
  const totalPages = Math.ceil(incident_num / itemsPerPage); // 총 페이지수 계산
  const pageGroupSize = 5; // 페이지를 1-5 , 6-10, 11-15 이렇게 보여줌
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1; // 페이지네이션 버튼의 시작 숫자
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages); // 페이지네이션의 버튼의 마지막 숫자
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <S.Layout>
      <S.Container>
        <S.IncidentNum>총 {incident_num}건</S.IncidentNum>
        <SortingDropDown />
      </S.Container>

      {/* 리스트 */}
      <S.IncidentListDiv>
        {incidentdata.length === 0 ? (
          <EmptyView />
        ) : (
          <S.Table>
            <thead>
              <S.TableHeaderRow>
                <S.TableHeader w={15}>번호</S.TableHeader>
                <S.TableHeader w={20}>사건 분류</S.TableHeader>
                <S.TableHeader w={23}>날짜</S.TableHeader>
                <S.TableHeader w={30}>위치</S.TableHeader>
                <S.TableHeader w={12}>담당 경찰</S.TableHeader>
              </S.TableHeaderRow>
            </thead>
            <tbody>
              {currentData.map((incident, index) => (
                <S.TableBodyRow key={incident.id} onClick={() => onOpen(incident.id)}>
                  <S.TableData index={index + 1}>
                    <S.InfoP>{startIndex + index + 1}</S.InfoP>
                  </S.TableData>
                  <S.TableData index={index + 1}>
                    <S.InfoP>{incident.category}</S.InfoP>
                  </S.TableData>
                  <S.TableData index={index + 1}>
                    <S.InfoP>{incident.date}</S.InfoP>
                  </S.TableData>
                  <S.TableData index={index + 1}>
                    <S.InfoP>{truncate(incident.address, 19)}</S.InfoP>
                  </S.TableData>
                  <S.TableData index={index + 1}>
                    <S.InfoP>{incident.police}</S.InfoP>
                  </S.TableData>
                </S.TableBodyRow>
              ))}
            </tbody>
          </S.Table>
        )}
      </S.IncidentListDiv>

      {incident_num > 0 && (
        <S.Pagination>
          <S.MoveBtn disabled={startPage <= 1} onClick={() => setCurrentPage(startPage - 1)}>
            <GrFormPrevious />
          </S.MoveBtn>
          {pageNumbers.map((num) => (
            <S.PageButton key={num} onClick={() => setCurrentPage(num)} active={num === currentPage}>
              {num}
            </S.PageButton>
          ))}
          <S.MoveBtn disabled={endPage >= totalPages} onClick={() => setCurrentPage(endPage + 1)}>
            <GrFormNext />
          </S.MoveBtn>
        </S.Pagination>
      )}
    </S.Layout>
  );
};
export default IncidentList;

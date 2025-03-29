import * as S from './IncidentList.style.ts';
import { useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import EmptyView from './EmptyView.tsx';
import IncidentDetailsModal from '../IncidentDetailsModal/IncidentDetailsModal.tsx';
import Filtering from '../Filtering/Filtering.tsx';
import {Incident} from '@/types/incident.ts';

const IncidentList = () => {
  // 사건 리스트 데이터
  const [incidentData, setIncidentData] = useState<Incident[]>([]);

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)} ...` : text;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedIncident, setSelectedIncident] = useState<null | Incident>(null);

  // 페이지네이션
  const incident_num = incidentData.length; // 사건 총 개수 (나중에 백한테 전달받아서 사용)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 한 페이지에 아이템 개수
  const startIndex = (currentPage - 1) * itemsPerPage; // 현재페이지의 첫 아이템의 인덱스
  const totalPages = Math.ceil(incident_num / itemsPerPage); // 총 페이지수 계산
  const pageGroupSize = 5;
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1; // 페이지네이션 버튼의 시작 숫자
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages); // 페이지네이션의 버튼의 마지막 숫자
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div>
      <Filtering setIncidentData={setIncidentData} page={currentPage}/>
      <S.Layout>
        <S.IncidentListDiv>
          {incidentData.length === 0 ? (
            <EmptyView />
          ) : (
            <S.Table>
              <thead>
                <S.TableHeaderRow>
                  <S.TableHeader w={10}>번호</S.TableHeader>
                  <S.TableHeader w={16}>사건 분류</S.TableHeader>
                  <S.TableHeader w={22}>날짜</S.TableHeader>
                  <S.TableHeader w={38}>위치</S.TableHeader>
                  <S.TableHeader w={14}>담당 경찰</S.TableHeader>
                </S.TableHeaderRow>
              </thead>
              <tbody>
                {incidentData.map((incident, index) => (
                  <S.TableBodyRow
                    key={incident.id}
                    onClick={() => {
                      setSelectedIncident(incident);
                      setIsModalOpen(true);
                    }}
                  >
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
                      <S.InfoP>{truncate(incident.location, 22)}</S.InfoP>
                    </S.TableData>
                    <S.TableData index={index + 1}>
                      <S.InfoP>{incident.policeName}</S.InfoP>
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
      {isModalOpen && selectedIncident && (
        <IncidentDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedIncident(null);
          }}
          incident={selectedIncident}
        />
      )}
    </div>
  );
};
export default IncidentList;
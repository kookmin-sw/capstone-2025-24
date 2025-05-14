import * as S from './IncidentList.style.ts';
import { useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import EmptyView from './EmptyView.tsx';
import IncidentDetailsModal from '../IncidentDetailsModal/IncidentDetailsModal.tsx';
import Filtering from '../Filtering/Filtering.tsx';
import { Incident } from '@/types/incident.ts';
import { categoryToKorean } from '@/utils/categoryMapper.ts';
import { useModal } from '@/hooks/useModal';

const IncidentList = () => {
  // 사건 리스트 데이터
  const [incidentData, setIncidentData] = useState<Incident[]>([]);
  const [dataLength, setDataLength] = useState(0);
  const [pageLength, setPageLength] = useState(0);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 한 페이지에 아이템 개수
  const startIndex = (currentPage - 1) * itemsPerPage; // 현재페이지의 첫 아이템의 인덱스
  const pageGroupSize = 5;
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1; // 페이지네이션 버튼의 시작 숫자
  const endPage = Math.min(startPage + pageGroupSize - 1, pageLength); // 페이지네이션의 버튼의 마지막 숫자
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const { openModal, closeModal, currentItem } = useModal();

  const [selectedIncident, setSelectedIncident] = useState<null | Incident>(null);

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)} ...` : text;
  };

  return (
    <div>
      <Filtering
        setIncidentData={setIncidentData}
        page={currentPage}
        dataLength={dataLength}
        setDataLength={setDataLength}
        setPageLength={setPageLength}
        setCurrentPage={setCurrentPage}
      />
      <S.Layout>
        <S.IncidentListDiv>
          {incidentData.length === 0 ? (
            <EmptyView />
          ) : (
            <S.Table>
              <thead>
                <S.TableHeaderRow>
                  <S.TableHeader w={10}>번호</S.TableHeader>
                  <S.TableHeader w={16}>사건 유형</S.TableHeader>
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
                      openModal({ type: 'norealtime', id: incident.id });
                    }}
                  >
                    <S.TableData index={index + 1}>
                      <S.InfoP>{startIndex + index + 1}</S.InfoP>
                    </S.TableData>
                    <S.TableData index={index + 1}>
                      <S.InfoP>{categoryToKorean[incident.category] || incident.category}</S.InfoP>
                    </S.TableData>
                    <S.TableData index={index + 1}>
                      <S.InfoP>{incident.date.replace(/-/g, '.')}</S.InfoP>
                    </S.TableData>
                    <S.TableData index={index + 1}>
                      <S.InfoP>{truncate(incident.address, 25)}</S.InfoP>
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

        {dataLength > 0 && (
          <S.Pagination>
            <S.MoveBtn disabled={startPage <= 1} onClick={() => setCurrentPage(startPage - 1)}>
              <GrFormPrevious />
            </S.MoveBtn>
            {pageNumbers.map((num) => (
              <S.PageButton key={num} onClick={() => setCurrentPage(num)} active={num === currentPage}>
                {num}
              </S.PageButton>
            ))}
            <S.MoveBtn disabled={endPage >= pageLength} onClick={() => setCurrentPage(endPage + 1)}>
              <GrFormNext />
            </S.MoveBtn>
          </S.Pagination>
        )}
      </S.Layout>
      {currentItem?.type === 'norealtime' && selectedIncident && (
        <IncidentDetailsModal
          isOpen={true}
          onClose={() => {
            closeModal();
            setSelectedIncident(null);
          }}
          incident={selectedIncident}
        />
      )}
    </div>
  );
};
export default IncidentList;

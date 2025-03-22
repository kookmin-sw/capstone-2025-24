import * as S from './IncidentHistoryPage.style.ts';
import Filtering from '../../components/IncidentHistory/Filtering/Filtering.tsx';
import IncidentList from '../../components/IncidentHistory/IncidentList/IncidentList.tsx';
import { useState } from 'react';
import IncidentDetailsModal from '../../components/IncidentHistory/IncidentDetailsModal/IncidentDetailsModal.tsx';

const IncidentHistoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incidentId, setIncidentId] = useState<number>(0);

  const handleOpenModal = (id: number) => {
    setIncidentId(id); // incidentId 업데이트
    setIsModalOpen(true); // 모달 열기
  };

  return (
    <div>
      <S.Layout>
        <Filtering />
        <br />
        <IncidentList onOpen={handleOpenModal} />
      </S.Layout>
      {isModalOpen && (
        <IncidentDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} incidentId={incidentId} />
      )}
    </div>
  );
};

export default IncidentHistoryPage;

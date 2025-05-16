import * as S from './IncidentHistoryPage.style.ts';
import IncidentList from '@/components/IncidentHistory/IncidentList/IncidentList.tsx';

const IncidentHistoryPage = () => {

  return (
    <div>
      <S.IncidentHistoyLayout>
        <IncidentList />
      </S.IncidentHistoyLayout>
    </div>
  );
};

export default IncidentHistoryPage;

import * as S from './IncidentHistoryPage.style.ts';
import Filtering from '@/components/IncidentHistory/Filtering/Filtering.tsx';
import IncidentList from '@/components/IncidentHistory/IncidentList/IncidentList.tsx';

const IncidentHistoryPage = () => {

  return (
    <div>
      <S.IncidentHistoyLayout>
        <Filtering />
        <br />
        <IncidentList />
      </S.IncidentHistoyLayout>
    </div>
  );
};

export default IncidentHistoryPage;

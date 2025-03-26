import * as S from './IncidentHistoryPage.style.ts';
import Filtering from '../../components/IncidentHistory/Filtering/Filtering.tsx';
import IncidentList from '../../components/IncidentHistory/IncidentList/IncidentList.tsx';

const IncidentHistoryPage = () => {

  return (
    <div>
      <S.Layout>
        <Filtering />
        <br />
        <IncidentList />
      </S.Layout>
    </div>
  );
};

export default IncidentHistoryPage;

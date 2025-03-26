import Monitoring from '@/components/Monitoring/InfoSection/InfoSection';
import AlertList from '@/components/Monitoring/AlertList/AlertList';
import InProgress from '@/components/Monitoring/InProgress/InProgress';
import * as S from './MonitoringPage.style.ts';

const MonitoringPage = () => {
  return (
    <S.MonitoringLayout>
      <S.TopSection>
        <Monitoring />
        <AlertList />
      </S.TopSection>
      <S.BottomSection>
        <InProgress />
      </S.BottomSection>
    </S.MonitoringLayout>
  );
};

export default MonitoringPage;

import Monitoring from '../../components/Monitoring/InfoSection/InfoSection';
import AlertList from '../../components/Monitoring/AlertList/AlertList';
import * as S from './style.ts';

const MonitoringPage = () => {
  return (
    <S.MonitoringLayout>
      <Monitoring />
      <AlertList />
    </S.MonitoringLayout>
  );
};

export default MonitoringPage;

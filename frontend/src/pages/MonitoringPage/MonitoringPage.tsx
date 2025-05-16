import Monitoring from '@/components/Monitoring/InfoSection/InfoSection';
import AlertList from '@/components/Monitoring/AlertList/AlertList';
import InProgress from '@/components/Monitoring/InProgress/InProgress';
import * as S from './MonitoringPage.style.ts';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

const MonitoringPage = () => {
  const location = useLocation();
  const refreshKeyRef = useRef(location.state?.refresh || 'default'); // monitoring에서 monitoring으로 이동할 때 렌더링 되기 위해

  return (
    <S.MonitoringLayout>
      <S.TopSection key={refreshKeyRef.current}>
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

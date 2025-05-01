import { useEffect, useState } from 'react';
import { useSSE } from '@/hooks/useSSE';
import { useModalStore } from '@/stores/modalStore';
import AlertModal from '@/components/Monitoring/AlertModal/AlertModal';
import PushNotification from './PushNotification/PushNotification';
import { AlertProps } from '@/types/alert';

export default function RealTimeAlert() {
  const { alertData } = useSSE();
  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);
  const current = useModalStore((s) => s.current);

  const [pushAlert, setPushAlert] = useState<AlertProps | null>(null);

  useEffect(() => {
    if (!alertData) return;

    if (alertData.level === 2) {
      open({ type: 'realtime', alertItem: alertData, highlight: true }); // 2단계 : queue 삽입, 모달 open
    } else {
      setPushAlert(alertData); // 1단계 푸쉬 알림
    }
  }, [alertData, open]);

  return (
    <>
      {pushAlert && <PushNotification key={pushAlert.id} id={pushAlert.id} category={pushAlert.category} />}

      {current?.type === 'realtime' && (
        <AlertModal onClose={close} highlight={current.highlight} alertItem={current.alertItem} />
      )}
    </>
  );
}

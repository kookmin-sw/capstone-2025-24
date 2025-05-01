import { useEffect, useState } from 'react';
import { useSSE } from '@/hooks/useSSE';
import { useModalStore } from '@/stores/modalStore';
import AlertModal from '@/components/Monitoring/AlertModal/AlertModal';
import PushNotification from './PushNotification/PushNotification';
import { AlertProps } from '@/types/alert';

export default function RealTimeAlert() {
  const { alertData } = useSSE();
  const openModal = useModalStore((s) => s.open);
  const closeModal = useModalStore((s) => s.close);
  const currentItem = useModalStore((s) => s.currentItem);

  const [pushAlert, setPushAlert] = useState<AlertProps | null>(null);

  useEffect(() => {
    if (!alertData) return;

    if (alertData.level === 2) {
      openModal({ type: 'realtime', alertItem: alertData, highlight: true }); // 2단계 : queue 삽입, 모달 open
    } else {
      setPushAlert(alertData); // 1단계 푸쉬 알림
    }
  }, [alertData, openModal]);

  return (
    <>
      {pushAlert && <PushNotification key={pushAlert.id} id={pushAlert.id} category={pushAlert.category} />}

      {currentItem?.type === 'realtime' && (
        <AlertModal onClose={closeModal} highlight={currentItem.highlight} alertItem={currentItem.alertItem} />
      )}
    </>
  );
}

import { useEffect } from 'react';
import { useSSE } from '@/hooks/useSSE';
import AlertModal from '../Monitoring/AlertModal/AlertModal';
import PushNotification from './PushNotification/PushNotification';
import { useHighlightStore } from '@/stores/highlightStore';

const RealTimeAlert = () => {
  const { alertData, isModalOpen, closeModal } = useSSE();
  const { highlight, setHighlight } = useHighlightStore();

  useEffect(() => {
    if (alertData?.level === 2) {
      setHighlight(true);
    }
  }, [alertData]);

  const handleModalClose = () => {
    setHighlight(false);
    closeModal();
  };

  if (!alertData) return null;

  const { id, level, category, date, address, state } = alertData;

  return (
    <div>
      {level === 2 && isModalOpen && (
        <AlertModal
          onClose={handleModalClose}
          highlight={highlight}
          alertItem={{ id, level, category, date, address, state }}
        />
      )}

      {level === 1 && <PushNotification key={id} id={id} category={category} />}
    </div>
  );
};

export default RealTimeAlert;

import { useState, useEffect } from 'react';
import { useItemStore } from '@/stores/itemStore';
import FeedbackModal from './FeedbackModal';
import IncidentModal from './IncidentModal';
import SubmitModal from './SubmitModal';
import CategorySelectModal from './CategorySelectModal';
import { AlertProps } from '@/types/alert';
import { putAlertState } from '@/apis/AlertApi';
import * as S from './AlertModal.style';

interface ModalProps {
  onClose: () => void;
  alertItem: AlertProps;
}

type ModalStep = 'incident' | 'feedback' | 'category' | 'submit';

const AlertModal = ({ onClose, alertItem }: ModalProps) => {
  const { updateItemState } = useItemStore();
  const [step, setStep] = useState<ModalStep>('incident');

  const handleOutsideClick = () => {
    if (step === 'incident') {
      onClose();
    }
  };

  useEffect(() => {
    if (alertItem.state === '미확인') {
      updateItemState(alertItem.id, '확인');
    }
  }, [alertItem, updateItemState]);

  const handleFeedback = async () => {
    await putAlertState(alertItem.id, '미출동');
    updateItemState(alertItem.id, '미출동'); // 해야되는지 아닌지 잘 몰겠다 하든 안 하든 상관없을 거 같긴 한데
    setStep('feedback');
  };

  const handleDispatch = async () => {
    await putAlertState(alertItem.id, '출동');
    updateItemState(alertItem.id, '출동');
    onClose();

    setTimeout(() => {
      const target = document.getElementById('in-progress-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <S.Overlay onClick={handleOutsideClick}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        {step === 'incident' && (
          <IncidentModal
            onClose={onClose}
            alertItem={alertItem}
            onFeedbackClick={handleFeedback}
            onDispatch={handleDispatch}
          />
        )}
        {step === 'feedback' && (
          <FeedbackModal
            onBack={() => setStep('incident')}
            onSelectCategory={() => setStep('category')}
            onSubmitClick={() => setStep('submit')}
          />
        )}
        {step === 'category' && (
          <CategorySelectModal onBack={() => setStep('feedback')} onSubmit={() => setStep('submit')} />
        )}
        {step === 'submit' && <SubmitModal onClose={onClose} id={alertItem.id} />}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default AlertModal;

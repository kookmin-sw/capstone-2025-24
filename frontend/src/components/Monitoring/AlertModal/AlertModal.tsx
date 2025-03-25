import { useState, useEffect } from 'react';
import { useItemStore } from '../../../stores/itemStore';
import FeedbackModal from './FeedbackModal';
import IncidentModal from './IncidentModal';
import SubmitModal from './SubmitModal';
import CategorySelectModal from './CategorySelectModal';

import * as S from './AlertModal.style';

interface ModalProps {
  onClose: () => void;
  alertItem: AlertItemProps;
}

interface AlertItemProps {
  id: number;
  category: string;
  address: string;
  date: string;
  state: '미확인' | '확인' | '미출동' | '출동' | '완료';
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

  const handleDispatch = () => {
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
            onFeedbackClick={() => setStep('feedback')}
            alertItem={alertItem}
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

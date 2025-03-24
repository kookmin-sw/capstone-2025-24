import { useState } from 'react';
import FeedbackModal from './FeedbackModal';
import IncidentModal from './IncidentModal';
import SubmitModal from './SubmitModal';
import * as S from './AlertModal.style';

interface ModalProps {
  onClose: () => void;
  alertItem: AlertItemProps;
}
interface AlertItemProps {
  category: string;
  date: string;
  address: string;
}

type ModalStep = 'incident' | 'feedback' | 'submit';

const AlertModal = ({ onClose, alertItem }: ModalProps) => {
  const [step, setStep] = useState<ModalStep>('incident');

  const handleOutsideClick = () => {
    if (step === 'incident') {
      onClose();
    }
  };

  return (
    <S.Overlay onClick={handleOutsideClick}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        {step === 'incident' && (
          <IncidentModal onClose={onClose} onFeedbackClick={() => setStep('feedback')} alertItem={alertItem} />
        )}
        {step === 'feedback' && (
          <FeedbackModal onBack={() => setStep('incident')} onSubmitClick={() => setStep('submit')} />
        )}
        {step === 'submit' && <SubmitModal onClose={onClose} />}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default AlertModal;

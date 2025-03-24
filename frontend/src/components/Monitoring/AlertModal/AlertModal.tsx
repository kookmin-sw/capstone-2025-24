import { useState } from 'react';
import NoDispatchModal from './FeedbackModal';
import IncidentModal from './IncidentModal';
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
  const [Step, setStep] = useState<ModalStep>('incident');
  const { category, date, address } = alertItem;
  const videoUrl = ''; // 추후 api 연동

  const handleOutsideClick = () => {
    if (Step === 'incident') {
      onClose();
    }
  };

  return (
    <S.Overlay onClick={handleOutsideClick}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        {Step === 'incident' && (
          <IncidentModal
            onClose={onClose}
            onNoDispatchClick={() => setStep('feedback')}
            category={category}
            date={date}
            address={address}
            videoUrl={videoUrl}
          />
        )}

        {Step === 'feedback' && (
          <NoDispatchModal onBack={() => setStep('incident')} />
        )}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default AlertModal;

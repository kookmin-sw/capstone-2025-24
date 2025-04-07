import { useState, useEffect, useRef } from 'react';
import { useItemStore } from '@/stores/itemStore';
import { useHighlightStore } from '@/stores/highlightStore';
import FeedbackModal from './FeedbackModal';
import IncidentModal from './IncidentModal';
import SubmitModal from './SubmitModal';
import CategorySelectModal from './CategorySelectModal';
import { AlertProps } from '@/types/alert';
import { putAlertState } from '@/apis/AlertApi';
import * as S from './AlertModal.style';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegCheckCircle } from 'react-icons/fa';

interface ModalProps {
  onClose: () => void;
  highlight: boolean;
  alertItem: AlertProps;
}

type ModalStep = 'incident' | 'feedback' | 'category' | 'submit';

const AlertModal = ({ onClose, highlight, alertItem }: ModalProps) => {
  const { updateItemState } = useItemStore();
  const [step, setStep] = useState<ModalStep>('incident');
  const { setHighlight } = useHighlightStore();
  const [isUpdate, setIsUpdate] = useState(false);

  const realTime = useRef(false);

  const handleOutsideClick = () => {
    if (step === 'incident') {
      if (isUpdate) {
        updateItemState(alertItem.id, '출동');
      }
      onClose();
    }
  };

  useEffect(() => {
    if (alertItem.state === '미확인' && !realTime.current) {
      updateItemState(alertItem.id, '확인');
      realTime.current = true;
    }
  }, [alertItem, updateItemState]);

  const handleFeedback = async () => {
    setHighlight(false);
    setStep('feedback');
  };

  const handleDispatch = async () => {
    const response = await putAlertState(alertItem.id, '출동', null);
    if (response == '이미 출동된 사건입니다.') {
      toast('이미 출동된 사건입니다.', {
        className: 'custom-toast',
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        icon: <FaRegCheckCircle size={24} />,
      });
      setIsUpdate(true);
      return;
    }

    updateItemState(alertItem.id, '출동');
    onClose();

    setTimeout(() => {
      const target = document.getElementById('in-progress-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleSubmit = async () => {
    await putAlertState(alertItem.id, '미출동', null);
    setStep('submit');
  };

  return (
    <S.Overlay onClick={handleOutsideClick}>
      <ToastContainer />
      <S.ModalContainer highlight={highlight} onClick={(e) => e.stopPropagation()}>
        {step === 'incident' && (
          <IncidentModal
            onClose={onClose}
            alertItem={alertItem}
            onFeedbackClick={handleFeedback}
            onDispatch={handleDispatch}
            isUpdate={isUpdate}
          />
        )}
        {step === 'feedback' && (
          <FeedbackModal
            onBack={() => setStep('incident')}
            onSelectCategory={() => setStep('category')}
            onSubmitClick={handleSubmit}
          />
        )}
        {step === 'category' && (
          <CategorySelectModal
            onBack={() => setStep('feedback')}
            onSubmit={() => setStep('submit')}
            id={alertItem.id}
          />
        )}
        {step === 'submit' && <SubmitModal onClose={onClose} id={alertItem.id} />}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default AlertModal;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const AlertModal = ({ onClose, alertItem, highlight }: ModalProps & { highlight: boolean }) => {
  const { updateItemState } = useItemStore();
  const { setHighlight } = useHighlightStore(); // 출동하기 클릭 후, 출동 사건 카드 파란색 강조 용도
  const [step, setStep] = useState<ModalStep>('incident');
  const [isUpdate, setIsUpdate] = useState(false);
  const redHighlightEffect = highlight && step === 'incident'; // 실시간 모달 빨간색 강조 용도
  const navigate = useNavigate();

  useEffect(() => { // 실시간 모달 중복으로 들어올 경우, incident step으로 초기화
    setStep('incident');
  }, [alertItem.id]);

  const handleOutsideClick = () => {
    if (step === 'incident') {
      if (isUpdate) updateItemState(alertItem.id, '출동');
      onClose();
    }
  };

  const handleFeedback = async () => {
    setHighlight(false);
    setStep('feedback');
  };

  const handleDispatch = async () => {
    const response = await putAlertState(alertItem.id, '출동', null);
    if (response != '지금 출동합니다.') {
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

    if (location.pathname !== '/monitoring') {
      navigate('/monitoring');
    }

    updateItemState(alertItem.id, '출동');
    onClose();

    setTimeout(() => {
      const target = document.getElementById('in-progress-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setHighlight(alertItem.id);

      setTimeout(() => {
        setHighlight(null);
      }, 4000);
    }, 150);
  };

  const handleSubmit = async () => {
    await putAlertState(alertItem.id, '미출동', null);
    setStep('submit');
  };

  return (
    <S.Overlay onClick={handleOutsideClick}>
      <ToastContainer />
      <S.ModalContainer highlight={redHighlightEffect} onClick={(e) => e.stopPropagation()}>
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

import * as S from './PushNotification.style';
import exclamationMark from '../../../assets/icons/exclamationMark.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useModalStore } from '@/stores/modalStore';

const PushNotification = ({ id, category }: { id: number; category: string | null }) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const currentItem = useModalStore((s) => s.currentItem);
  const closeModal = useModalStore((s) => s.close);

  const handleClick = () => {
    if (currentItem) {
      closeModal();
    }

    sessionStorage.setItem('highlightConsumed', id.toString());
    if (location.pathname === '/monitoring') {
      navigate('/monitoring', { state: { refresh: Date.now() } });
      const target = document.getElementById('pushAlarm');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/monitoring`);
    }

    setVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <S.PushNotificationLayout onClick={handleClick}>
      <S.ExclamationMark src={exclamationMark} />
      <S.ContentContainer>
        <S.ContentP $fontColor={'black'}>{category} 상황 감지</S.ContentP>
        <S.ContentP $fontColor={'#5c5c5c'}>클릭 시 알림 리스트로 이동합니다.</S.ContentP>
      </S.ContentContainer>
    </S.PushNotificationLayout>
  );
};
export default PushNotification;

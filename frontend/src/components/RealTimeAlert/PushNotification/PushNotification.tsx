import * as S from './PushNotification.style';
import exclamationMark from '../../../assets/icons/exclamationMark.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PushNotification = ({ id, category }: { id: number, category: string | null }) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/monitoring`, { state: { highlightAlertId: id } });
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

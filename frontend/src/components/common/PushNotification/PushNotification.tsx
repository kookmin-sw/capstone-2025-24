import * as S from './PushNotification.style';
import exclamationMark from '../../../assets/icons/exclamationMark.svg';
import { useNavigate } from 'react-router-dom';

const PushNotification = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/monitoring`, { state: { clicked_alert_id: 3 } }); // 실제 감지된 사건 id를 전달 
  };
  return (
    <S.PushNotificationLayout onClick={handleClick}>
      <S.ExclamationMark src={exclamationMark} />
      <S.ContentContainer>
        <S.ContentP $fontColor={'black'}>군중 밀집 상황 감지</S.ContentP>
        <S.ContentP $fontColor={'#5c5c5c'}>클릭 시 알림 리스트로 이동합니다.</S.ContentP>
      </S.ContentContainer>
    </S.PushNotificationLayout>
  );
};
export default PushNotification;

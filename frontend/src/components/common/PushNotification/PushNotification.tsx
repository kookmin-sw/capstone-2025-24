import * as S from './PushNotification.style';
import exclamationMark from '../../../assets/icons/exclamationMark.svg';

const PushNotification = () => {
  return (
    <S.PushNotificationLayout>
      <S.ExclamationMark src={exclamationMark} />
      <S.ContentContainer>
        <S.ContentP $fontColor={'black'}>군중 밀집 상황 감지</S.ContentP>
        <S.ContentP $fontColor={'#5c5c5c'}>클릭 시 알림 리스트로 이동합니다.</S.ContentP>
      </S.ContentContainer>
    </S.PushNotificationLayout>
  );
};
export default PushNotification;

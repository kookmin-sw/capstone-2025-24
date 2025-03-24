import * as S from './AlertModal.style';
import checkAnimation from '../../../assets/lottie/checkAnimation.json';

interface SubmitModalProps {
  onClose: () => void;
}

const SubmitModal = ({ onClose }: SubmitModalProps) => {
  return (
    <S.SubmitLayout>
      <S.Check animationData={checkAnimation} loop={false} autoplay />
      <S.SubmitTitle>응답이 제출되었습니다</S.SubmitTitle>
      <S.SubmitDescription>
        응답 내용은 향후 더 나은 서비스의 제공을 위해
        <br />
        AI 성능 최적화에 사용됩니다.
      </S.SubmitDescription>
      <S.CloseSubmitButton onClick={onClose}>닫기</S.CloseSubmitButton>
    </S.SubmitLayout>
  );
};

export default SubmitModal;

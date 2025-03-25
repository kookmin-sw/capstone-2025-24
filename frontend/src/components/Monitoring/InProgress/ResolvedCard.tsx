import * as S from './InProgress.style';
import checkAnimation from '../../../assets/lottie/checkAnimation.json';

interface ResolvedCardProps {
  onClose: () => void;
}

const ResolvedCard = ({ onClose }: ResolvedCardProps) => {
  const handelResolvedIncident = () => {
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <S.ResolveLayout>
      <S.Check animationData={checkAnimation} loop={false} autoplay onComplete={handelResolvedIncident} />
      <S.ResolveTitle>사건이 해결되었습니다</S.ResolveTitle>
      <S.ResolveDescription>해당 사건의 해결 기록은 향후 더 나은 분석을 위해 서비스에 적용됩니다.</S.ResolveDescription>
    </S.ResolveLayout>
  );
};

export default ResolvedCard;

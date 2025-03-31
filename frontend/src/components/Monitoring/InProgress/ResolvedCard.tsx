import { useItemStore } from '@/stores/itemStore';
import { IncidentCardProps } from '@/types/alert';
import checkAnimation from '@/assets/lottie/checkAnimation.json';
import * as S from './InProgress.style';

const ResolvedCard = ({ onClose, id }: IncidentCardProps) => {
  const { removeItem } = useItemStore();
  const handelResolvedIncident = () => {
    setTimeout(() => {
      removeItem(id);
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

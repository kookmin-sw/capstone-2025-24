import { useState } from 'react';
import * as S from './InProgress.style';
import ResolvedCard from './ResolvedCard';
import CategorySelectCard from './CategorySelectCard';

interface FeedbackCardProps {
  onClose: () => void;
}

const FeedbackCard = ({ onClose }: FeedbackCardProps) => {
  const [isCategorySelection, setIsCategorySelection] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  if (isResolved) {
    return <ResolvedCard onClose={onClose} />;
  }

  return isCategorySelection ? (
    <CategorySelectCard onClose={onClose} />
  ) : (
    <>
      <S.FeedbackTitle>AI의 분류가 정확했나요?</S.FeedbackTitle>
      <S.FeedbackDescription>답변은 AI 모델 성능 최적화에 사용됩니다.</S.FeedbackDescription>
      <S.ButtonGroup>
        <S.Button className="yes" onClick={() => setIsResolved(true)}>
          네, 정확했어요
        </S.Button>
        <S.Button className="no" onClick={() => setIsCategorySelection(true)}>
          아니요, 잘못됐어요
        </S.Button>
      </S.ButtonGroup>
      <S.BackButton onClick={onClose}>이전으로 돌아가기</S.BackButton>
    </>
  );
};

export default FeedbackCard;

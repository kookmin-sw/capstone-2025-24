import { useState } from 'react';
import { IncidentCardProps } from '@/types/alert';
import ResolvedCard from './ResolvedCard';
import CategorySelectCard from './CategorySelectCard';
import { putIncidentResolve } from '@/apis/AlertApi';
import * as S from './InProgress.style';

const FeedbackCard = ({ onClose, id }: IncidentCardProps) => {
  const [isCategorySelection, setIsCategorySelection] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  if (isResolved) {
    return <ResolvedCard onClose={onClose} id={id} />;
  }

  const handleClickResolve = async () => {
    await putIncidentResolve(id, '출동', null);
    setIsResolved(true);
  };

  return isCategorySelection ? (
    <CategorySelectCard onClose={() => setIsCategorySelection(false)} id={id} />
  ) : (
    <S.FeedbackLayout>
      <S.FeedbackTitle>AI의 분류가 정확했나요?</S.FeedbackTitle>
      <S.FeedbackDescription>답변은 AI 모델 성능 최적화에 사용됩니다.</S.FeedbackDescription>
      <S.ButtonGroup>
        <S.Button className="yes" onClick={handleClickResolve}>
          네, 정확했어요
        </S.Button>
        <S.Button className="no" onClick={() => setIsCategorySelection(true)}>
          아니요, 잘못됐어요
        </S.Button>
      </S.ButtonGroup>
      <S.BackButton onClick={onClose}>이전으로 돌아가기</S.BackButton>
    </S.FeedbackLayout>
  );
};

export default FeedbackCard;

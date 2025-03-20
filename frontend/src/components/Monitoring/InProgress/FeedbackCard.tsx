import * as S from './InProgress.style';

interface FeedbackCardProps {
  onClose: () => void;
}

const FeedbackCard = ({ onClose }: FeedbackCardProps) => {
  return (
    <>
      <S.FeedbackTitle>AI의 분류가 정확했나요?</S.FeedbackTitle>
      <S.FeedbackDescription>답변은 AI 모델 성능 최적화에 사용됩니다.</S.FeedbackDescription>
      <S.ButtonGroup>
        <S.Button className='yes' onClick={onClose}>네, 정확했어요</S.Button>
        <S.Button className='no' onClick={onClose}>아니요, 잘못됐어요</S.Button>
      </S.ButtonGroup>
    </>
  );
};

export default FeedbackCard;

import * as S from './AlertModal.style';
import questionmark from '@/assets/icons/questionMark.svg';

interface NoDispatchModalContentProps {
  onBack: () => void;
}

const NoDispatchModalContent = ({ onBack }: NoDispatchModalContentProps) => {
  return (
    <S.ReasonLayout>
      <img src={questionmark} alt='questionmark' />
      <S.ReasonTitle>출동하지 않는 이유를 선택해주세요</S.ReasonTitle>
      <S.ButtonGroup>
        <S.WrongButton className="yes">유형 분류가 틀렸어요</S.WrongButton>
        <S.WrongButton className="no">유형 분류는 맞지만 출동이 필요한 상황이 아니에요</S.WrongButton>
      </S.ButtonGroup>
      <S.BackButton onClick={onBack}>이전으로 돌아가기</S.BackButton>
    </S.ReasonLayout>
  );
};

export default NoDispatchModalContent;

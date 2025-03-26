import { useSelectCategory } from '../../../hooks/useSelectCategory';
import * as S from './AlertModal.style';

interface CategorySelectModalProps {
  onBack: () => void;
  onSubmit: () => void;
}

const CategorySelectModal = ({ onBack, onSubmit }: CategorySelectModalProps) => {
  const { selectedCategory, handleSelectCategory } = useSelectCategory();
  const groupedCategories: string[][] = [
    ['화재', '쓰러짐', '폭행'],
    ['흉기난동', '군중밀집'],
    ['기타', '위험 상황이 아니에요'],
  ];

  return (
    <S.SubmitLayout>
      <S.ReasonTitle>
        AI 성능 개선을 위해
        <br />
        올바른 유형을 선택해주세요
      </S.ReasonTitle>
      <S.CategoryContainer>
        {groupedCategories.map((row, index) => (
          <S.CategoryRow key={index}>
            {row.map((category) => (
              <S.Chip
                key={category}
                selected={selectedCategory === category}
                onClick={() => handleSelectCategory(category)}
              >
                {category}
              </S.Chip>
            ))}
          </S.CategoryRow>
        ))}
      </S.CategoryContainer>
      <S.CloseSubmitButton onClick={onSubmit}>선택 완료</S.CloseSubmitButton>
      <S.BackButton onClick={onBack}>이전으로 돌아가기</S.BackButton>
    </S.SubmitLayout>
  );
};

export default CategorySelectModal;

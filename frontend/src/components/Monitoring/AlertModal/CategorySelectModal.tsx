import { useSelectCategory } from '@/hooks/useSelectCategory';
import { putAlertState } from '@/apis/AlertApi';
import { categoryToEnglish } from '@/utils/categoryMapper';
import * as S from './AlertModal.style';

interface CategorySelectModalProps {
  onBack: () => void;
  onSubmit: () => void;
  id: number;
}

const CategorySelectModal = ({ onBack, onSubmit, id }: CategorySelectModalProps) => {
  const { selectedCategory, handleSelectCategory } = useSelectCategory();
  const groupedCategories: string[][] = [
    ['화재', '쓰러짐', '폭행'],
    ['흉기난동', '군중밀집'],
    ['기타', '위험 상황이 아니에요'],
  ];

  const handleSubmit = async () => {
    const categoryToSend =
      selectedCategory === '기타' || selectedCategory === '위험 상황이 아니에요'
        ? null
        : categoryToEnglish[selectedCategory || ''] || selectedCategory;
    await putAlertState(id, '미출동', categoryToSend);
    onSubmit();
  };

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
      <S.CloseSubmitButton onClick={handleSubmit}>선택 완료</S.CloseSubmitButton>
      <S.BackButton onClick={onBack}>이전으로 돌아가기</S.BackButton>
    </S.SubmitLayout>
  );
};

export default CategorySelectModal;

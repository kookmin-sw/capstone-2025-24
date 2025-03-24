import { useState } from 'react';
import { CATEGORY } from '../../../constants/EventCategory';
import * as S from './AlertModal.style';

interface CategorySelectModalProps {
  onBack: () => void;
  onSubmit: () => void;
}

const CategorySelectModal = ({ onBack, onSubmit }: CategorySelectModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const groupedCategories = [];
  for (let i = 0; i < CATEGORY.length; i += 3) {
    groupedCategories.push(CATEGORY.slice(i, i + 3));
  }
  groupedCategories.push(['기타', '위험 상황이 아니에요']);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
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
      <S.CloseSubmitButton onClick={onSubmit}>선택 완료</S.CloseSubmitButton>
      <S.BackButton onClick={onBack}>이전으로 돌아가기</S.BackButton>
    </S.SubmitLayout>
  );
};

export default CategorySelectModal;

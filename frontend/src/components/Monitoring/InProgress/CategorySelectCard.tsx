import { useState } from 'react';
import * as S from './InProgress.style';
import ResolvedCard from './ResolvedCard';
import { CATEGORY } from '../../../constants/EventCategory';

interface CategorySelectCardProps {
  onClose: () => void;
}

const CategorySelectCard = ({ onClose }: CategorySelectCardProps) => {
  const [isResolved, setIsResolved] = useState(false);
  const groupedCategories = [];
  for (let i = 0; i < CATEGORY.length; i += 3) {
    groupedCategories.push(CATEGORY.slice(i, i + 3));
  }
  groupedCategories[groupedCategories.length - 1].push('기타');
  return isResolved ? (
    <ResolvedCard onClose={onClose} />
  ) : (
    <>
      <S.FeedbackTitle>적절한 분류를 선택해주세요</S.FeedbackTitle>
      <S.CategoryContainer>
        {groupedCategories.map((row, index) => (
          <S.CategoryRow key={index}>
            {row.map((category) => (
              <S.Chip key={category}>{category}</S.Chip>
            ))}
          </S.CategoryRow>
        ))}
      </S.CategoryContainer>
      <S.ButtonGroup>
        <S.SelectButton onClick={() => setIsResolved(true)}>선택 완료</S.SelectButton>
      </S.ButtonGroup>
    </>
  );
};

export default CategorySelectCard;

import { useState } from 'react';
import { useSelectCategory } from '@/hooks/useSelectCategory';
import { IncidentCardProps } from '@/types/alert';
import { putIncidentResolve } from '@/apis/AlertApi';
import { postCategoryInEnglish } from '@/utils/categoryMapper';
import ResolvedCard from './ResolvedCard';
import * as S from './InProgress.style';

const CategorySelectCard = ({ onClose, id }: IncidentCardProps) => {
  const [isResolved, setIsResolved] = useState(false);
  const { selectedCategory, handleSelectCategory } = useSelectCategory();
  const groupedCategories: string[][] = [
    ['화재', '쓰러짐', '군중밀집'],
    ['흉기난동', '폭행', '기타'],
  ];

  const handleClickResolve = async () => {
    const categoryToSend = selectedCategory === '기타' ? null : postCategoryInEnglish(selectedCategory || '');
    await putIncidentResolve(id, '출동', categoryToSend);
    setIsResolved(true);
  };

  return isResolved ? (
    <ResolvedCard onClose={onClose} id={id} />
  ) : (
    <>
      <S.FeedbackTitle>적절한 분류를 선택해주세요</S.FeedbackTitle>
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
      <S.SelectButton onClick={handleClickResolve}>선택 완료</S.SelectButton>
      <S.BackButton onClick={onClose}>이전으로 돌아가기</S.BackButton>
    </>
  );
};

export default CategorySelectCard;

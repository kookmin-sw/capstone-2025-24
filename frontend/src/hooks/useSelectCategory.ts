import { useState, useMemo, useCallback } from 'react';
import { CATEGORY } from '../constants/EventCategory';

interface UseSelectCategory {
  noDangerOption?: boolean;
}

export const useSelectCategory = (options?: UseSelectCategory) => {
  const { noDangerOption = false } = options || {};
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const groupedCategories = useMemo(() => {
    const result = [];
    for (let i = 0; i < CATEGORY.length; i += 3) {
      result.push(CATEGORY.slice(i, i + 3));
    }

    if (noDangerOption) {
      result.push(['기타', '위험 상황이 아니에요']);
    } else {
      result[result.length - 1].push('기타');
    }

    return result;
  }, [noDangerOption]);

  const handleSelectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return {
    selectedCategory,
    setSelectedCategory,
    groupedCategories,
    handleSelectCategory,
  };
};
